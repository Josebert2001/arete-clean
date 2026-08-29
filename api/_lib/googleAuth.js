// ============================================================================
//  Arete — Google OAuth helper (Vercel functions)
//  Shared plumbing for the "Connect Google" flow: builds the OAuth2 client,
//  signs/verifies the redirect-flow `state` param (CSRF protection), and
//  reads/writes the student's stored refresh token via the Supabase
//  service-role client from _lib/serviceRole.js — which is now the single file
//  that reads SUPABASE_SERVICE_ROLE_KEY (api/extract.js is the second caller).
//  Every query below is scoped by an already-verified user id, never by
//  anything taken from a request body; RLS does not apply to this client.
// ============================================================================

import crypto from 'crypto';
// google-auth-library directly, NOT the `googleapis` barrel: the barrel pulls
// every Google API surface (~200 MB on disk) and measured ~4.5s to import,
// against ~240ms for this package. googleAuth.js is imported by all five
// api/google/* endpoints — including status.js, which the Planner hits on
// every mount — so the barrel was charging that to a cold start each time.
//
// This is the same package googleapis resolves for its own auth (10.9.0, one
// copy on disk), though `google.auth.OAuth2 !== OAuth2Client` because the two
// arrive via the ESM and CJS builds respectively. That's fine for the client
// handed to google.calendar() in calendar-sync.js: googleapis-common's
// apirequest.js duck-types the auth object on `getRequestHeaders` and never
// uses instanceof.
import { OAuth2Client } from 'google-auth-library';
import { serviceRoleClient } from './serviceRole.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// drive.file is added back here once Drive import (Phase 4) ships — until
// then, don't ask users to grant a permission the app doesn't use yet.
export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
];

export function googleConfigured() {
  return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REDIRECT_URI);
}

export function createOAuth2Client() {
  if (!googleConfigured()) return null;
  return new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
}

// ─── Refresh-token encryption at rest ────────────────────────────────────────
// A Google refresh token is a long-lived credential: whoever holds one can mint
// access tokens and write to that student's Calendar until it is revoked.
// Column-level GRANTs already keep it away from `authenticated` (see
// supabase/migrations/20260719000000_google_connections.sql), but that only
// governs who may SELECT it — a leaked service-role key or a database dump
// handed over every token in plaintext.
//
// The key is DERIVED from GOOGLE_CLIENT_SECRET rather than being a new env var,
// which is what makes this work with zero configuration: the secret already
// lives in Vercel's environment and never in the database, so a dump on its own
// is now useless. It is the same trust boundary signState() already relies on.
// HKDF with a distinct `info` string keeps this key independent of the one used
// for state signing, so neither can be used to attack the other.
//
// ROTATION: re-issuing GOOGLE_CLIENT_SECRET makes existing ciphertexts
// undecryptable. That is acceptable — rotating it invalidates the OAuth client
// anyway, so every student has to reconnect regardless, and clientForUser()
// returns null for a token it cannot read rather than throwing.
const ENC_PREFIX = 'v1';

function encryptionKey() {
  if (!GOOGLE_CLIENT_SECRET) return null;
  return Buffer.from(
    crypto.hkdfSync('sha256', GOOGLE_CLIENT_SECRET, 'arete-google-token-salt', 'arete-google-refresh-token', 32)
  );
}

// Returns `v1.<iv>.<tag>.<ciphertext>`, or the plaintext unchanged when no key
// is available — the feature degrades rather than storing nothing.
export function encryptRefreshToken(plain) {
  const key = encryptionKey();
  if (!key || typeof plain !== 'string' || !plain) return plain;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(plain, 'utf-8'), cipher.final()]);
  return [
    ENC_PREFIX,
    iv.toString('base64url'),
    cipher.getAuthTag().toString('base64url'),
    ct.toString('base64url'),
  ].join('.');
}

// Accepts either a `v1.…` ciphertext or a legacy plaintext token, so rows
// written before this existed keep working. Returns null when a ciphertext
// cannot be authenticated — a tampered or undecryptable token must not be
// silently treated as a usable credential.
export function decryptRefreshToken(stored) {
  if (typeof stored !== 'string' || !stored) return null;
  if (!stored.startsWith(`${ENC_PREFIX}.`)) return stored; // legacy plaintext

  const key = encryptionKey();
  if (!key) return null;

  try {
    const [, ivB64, tagB64, ctB64] = stored.split('.');
    if (!ivB64 || !tagB64 || !ctB64) return null;
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(ctB64, 'base64url')), decipher.final()]).toString('utf-8');
  } catch {
    return null;
  }
}

// True for a value still stored in the clear, so callers can migrate it.
export function isLegacyPlaintextToken(stored) {
  return typeof stored === 'string' && stored.length > 0 && !stored.startsWith(`${ENC_PREFIX}.`);
}

const STATE_TTL_MS = 10 * 60 * 1000;

// Signs { uid, returnTo } into a compact, tamper-evident token used as the
// OAuth `state` param — verified on callback so a forged redirect can't graft
// tokens onto someone else's account. Keyed off GOOGLE_CLIENT_SECRET so no
// extra secret needs provisioning.
export function signState({ uid, returnTo }) {
  if (!GOOGLE_CLIENT_SECRET) return null;
  const payload = JSON.stringify({ uid, returnTo, exp: Date.now() + STATE_TTL_MS });
  const b64 = Buffer.from(payload, 'utf-8').toString('base64url');
  const sig = crypto.createHmac('sha256', GOOGLE_CLIENT_SECRET).update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

// Returns { uid, returnTo } for a valid, unexpired state, or null.
export function verifyState(token) {
  if (!GOOGLE_CLIENT_SECRET || typeof token !== 'string') return null;
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return null;

  const expected = crypto.createHmac('sha256', GOOGLE_CLIENT_SECRET).update(b64).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(b64, 'base64url').toString('utf-8'));
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;
    if (typeof payload.uid !== 'string' || !payload.uid) return null;
    return { uid: payload.uid, returnTo: typeof payload.returnTo === 'string' ? payload.returnTo : '/planner' };
  } catch {
    return null;
  }
}

// Server-only lookup, always scoped by the already-verified user id — never
// by anything the client supplies directly.
export async function getRefreshTokenForUser(userId) {
  const db = serviceRoleClient();
  if (!db) return null;
  const { data } = await db
    .from('google_connections')
    .select('refresh_token')
    .eq('user_id', userId)
    .maybeSingle();

  const stored = data?.refresh_token ?? null;
  if (!stored) return null;

  const plain = decryptRefreshToken(stored);

  // Lazily migrate a row written before encryption existed: re-store it
  // encrypted the first time it is used, so no separate backfill is needed and
  // nobody has to reconnect. Best-effort — a failed rewrite must not stop the
  // caller getting the token it just decrypted successfully.
  if (plain && isLegacyPlaintextToken(stored) && encryptionKey()) {
    db.from('google_connections')
      .update({ refresh_token: encryptRefreshToken(plain) })
      .eq('user_id', userId)
      .then(({ error }) => {
        if (error) console.error('google token re-encryption failed:', error.message);
      }, () => {});
  }

  return plain;
}

// Upserts the connection row after a successful token exchange. Only
// overwrites refresh_token when Google actually issued one (it's omitted on
// a re-consent unless prompt=consent forced a fresh one, which connect.js
// always sets — but stay defensive here regardless).
export async function saveGoogleConnection(userId, tokens) {
  const db = serviceRoleClient();
  if (!db) return false;

  if (tokens.refresh_token) {
    const { error } = await db.from('google_connections').upsert({
      user_id: userId,
      // Encrypted at rest — see encryptRefreshToken. Never store the raw token.
      refresh_token: encryptRefreshToken(tokens.refresh_token),
      scope: tokens.scope || GOOGLE_SCOPES.join(' '),
      updated_at: new Date().toISOString(),
    });
    return !error;
  }

  const { error } = await db
    .from('google_connections')
    .update({ scope: tokens.scope || GOOGLE_SCOPES.join(' '), updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  return !error;
}

// Best-effort revoke + row delete. Called with the server-role client since
// we need the refresh_token (never exposed to the caller's own RLS-scoped
// client) to hit Google's revoke endpoint.
export async function deleteGoogleConnection(userId) {
  const db = serviceRoleClient();
  if (!db) return false;
  const { error } = await db.from('google_connections').delete().eq('user_id', userId);
  return !error;
}

// Builds an OAuth2 client pre-loaded with a user's stored refresh token, and
// re-persists a rotated refresh token if Google ever issues one mid-session.
export async function clientForUser(userId) {
  const refreshToken = await getRefreshTokenForUser(userId);
  if (!refreshToken) return null;

  const oauth2Client = createOAuth2Client();
  if (!oauth2Client) return null;

  oauth2Client.setCredentials({ refresh_token: refreshToken });
  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      saveGoogleConnection(userId, tokens).catch(() => {});
    }
  });
  return oauth2Client;
}
