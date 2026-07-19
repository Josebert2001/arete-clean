// ============================================================================
//  Arete — Google OAuth redirect target (Vercel)
//  Google sends the browser here after consent. This is the one endpoint in
//  the Google integration that Google itself calls via a top-level GET
//  redirect — there's no Bearer token to check; the signed `state` param is
//  the only trust boundary, so it must be verified before anything else.
// ============================================================================

import { enforceRateLimit, setRateLimitHeaders, logRequest } from '../_lib/request-policy.js';
import { captureApiError } from '../_lib/sentry.js';
import { createOAuth2Client, googleConfigured, verifyState, saveGoogleConnection } from '../_lib/googleAuth.js';

const RATE_LIMIT = {
  namespace: 'google-callback',
  limit: 20,
  windowMs: 10 * 60 * 1000,
};

// Only ever same-origin app paths — never an external URL, so a forged
// `returnTo` inside a validly-signed state can't be used as an open redirect.
function safeReturnTo(returnTo) {
  if (typeof returnTo !== 'string' || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
    return '/planner';
  }
  return returnTo;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'google-callback');
    return res.status(429).send('Too many requests. Please try again shortly.');
  }

  const { code, state, error: googleError } = req.query || {};
  const parsed = verifyState(state);
  const returnTo = safeReturnTo(parsed?.returnTo);

  if (googleError) {
    return res.redirect(302, `${returnTo}?google=denied`);
  }
  if (!parsed || !code || !googleConfigured()) {
    logRequest(req, 'google-callback', { denied: 'bad_state' });
    return res.redirect(302, `${returnTo}?google=error`);
  }

  try {
    const oauth2Client = createOAuth2Client();
    const { tokens } = await oauth2Client.getToken(String(code));
    const saved = await saveGoogleConnection(parsed.uid, tokens);
    return res.redirect(302, `${returnTo}?google=${saved ? 'connected' : 'error'}`);
  } catch (err) {
    console.error('google callback error:', err);
    await captureApiError(err, { route: 'google-callback' });
    return res.redirect(302, `${returnTo}?google=error`);
  }
}
