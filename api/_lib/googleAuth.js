// ============================================================================
//  Arete — Google OAuth helper (Vercel functions)
//  Shared plumbing for the "Connect Google" flow: builds the OAuth2 client,
//  signs/verifies the redirect-flow `state` param (CSRF protection), and
//  reads/writes the student's stored refresh token via the Supabase
//  service-role client — the only file in the codebase allowed to touch
//  SUPABASE_SERVICE_ROLE_KEY.
// ============================================================================

import crypto from 'crypto';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
  return new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
}

// Lazily created — most requests (status checks, disconnect) never need it.
let _serviceClient = null;
export function serviceRoleClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return null;
  if (!_serviceClient) {
    _serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _serviceClient;
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
  return data?.refresh_token ?? null;
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
      refresh_token: tokens.refresh_token,
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
