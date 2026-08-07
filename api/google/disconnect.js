// ============================================================================
//  Arete — Disconnect Google (Vercel)
//  Best-effort revoke against Google, then deletes the row via the caller's
//  own RLS-scoped client (the DELETE policy already restricts this to the
//  caller's own row — no service-role client needed for the delete itself).
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from '../_lib/request-policy.js';
import { getStudentFromRequest } from '../_lib/supabase.js';
import { getRefreshTokenForUser } from '../_lib/googleAuth.js';

const RATE_LIMIT = {
  namespace: 'google-disconnect',
  limit: 6,
  windowMs: 10 * 60 * 1000,
};

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'google-disconnect');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: 'Too many requests.' });
  }

  const student = await getStudentFromRequest(req);
  if (!student) {
    return res.status(401).json({ error: 'Please sign in.' });
  }

  const refreshToken = await getRefreshTokenForUser(student.user.id);
  if (refreshToken) {
    try {
      await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(refreshToken)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
    } catch {
      // Best-effort — proceed to delete our own record regardless.
    }
  }

  const { error } = await student.db.from('google_connections').delete().eq('user_id', student.user.id);
  if (error) {
    return res.status(500).json({ error: 'Could not disconnect Google. Please try again.' });
  }

  return res.status(200).json({ success: true });
}
