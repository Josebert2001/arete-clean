// ============================================================================
//  Arete — Start the "Connect Google" OAuth flow (Vercel)
//  Signed-in student asks for a Google consent URL (Calendar + Drive scopes),
//  redirects their browser to it, and lands back on api/google/callback.js.
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest, denyIfUserRateLimited } from '../_lib/request-policy.js';
import { getStudentFromRequest } from '../_lib/supabase.js';
import { createOAuth2Client, googleConfigured, signState, GOOGLE_SCOPES } from '../_lib/googleAuth.js';

const RATE_LIMIT = {
  namespace: 'google-connect',
  limit: 6,
  windowMs: 10 * 60 * 1000,
};

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (req.body?.probe) {
    return res.status(200).json({ configured: googleConfigured() });
  }

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'google-connect');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' });
  }

  const student = await getStudentFromRequest(req);
  if (!student) {
    logRequest(req, 'google-connect', { denied: 'unauthorized' });
    return res.status(401).json({ error: 'Please sign in to connect Google.' });
  }

  // Per-student budget, shared across instances (the per-IP check above is only
  // a cheap pre-auth guard and is wiped by lambda cold starts). Bounds how often
  // one account can re-issue OAuth consent requests.
  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'google-connect',
    message: 'You have started the Google connection flow a lot just now. Please wait a few minutes and try again.',
  })) return;

  if (!googleConfigured()) {
    return res.status(200).json({ notConfigured: true, error: 'Google isn’t connected yet on this deployment.' });
  }

  const returnTo = typeof req.body?.returnTo === 'string' ? req.body.returnTo.slice(0, 200) : '/planner';
  const state = signState({ uid: student.user.id, returnTo });
  if (!state) {
    return res.status(200).json({ notConfigured: true, error: 'Google isn’t connected yet on this deployment.' });
  }

  const oauth2Client = createOAuth2Client();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    // Forces Google to reissue a refresh_token even on a reconnect — without
    // this, a second consent for an already-authorized app returns no
    // refresh_token at all, silently leaving the old (possibly revoked) one.
    prompt: 'consent',
    scope: GOOGLE_SCOPES,
    state,
  });

  return res.status(200).json({ url });
}
