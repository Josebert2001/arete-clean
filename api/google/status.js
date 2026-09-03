// ============================================================================
//  Arete — Google connection status (Vercel)
//  Reads via the caller's own RLS-scoped Supabase client (never service-role)
//  so this endpoint can only ever see the signed-in student's own row, and
//  even then only the columns google_connections grants to `authenticated`
//  (never refresh_token — see the SQL in the Google-integration setup notes).
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest, denyIfUserRateLimited } from '../_lib/request-policy.js';
import { getStudentFromRequest } from '../_lib/supabase.js';
import { googleConfigured } from '../_lib/googleAuth.js';

const RATE_LIMIT = {
  namespace: 'google-status',
  limit: 30,
  windowMs: 10 * 60 * 1000,
};

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'google-status');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: 'Too many requests.' });
  }

  const student = await getStudentFromRequest(req);
  if (!student) {
    return res.status(401).json({ error: 'Please sign in.' });
  }

  // Per-student budget shared across instances, matching the other endpoints.
  // Read-only, so the bucket is generous but still cross-instance.
  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'google-status',
    message: 'Too many requests. Please wait a few minutes and try again.',
  })) return;

  if (!googleConfigured()) {
    return res.status(200).json({ configured: false, connected: false });
  }

  const { data } = await student.db
    .from('google_connections')
    .select('scope, connected_at, updated_at')
    .eq('user_id', student.user.id)
    .maybeSingle();

  return res.status(200).json({
    configured: true,
    connected: Boolean(data),
    scope: data?.scope ?? null,
    connectedAt: data?.connected_at ?? null,
  });
}
