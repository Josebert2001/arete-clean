// ============================================================================
//  Arete — Premium billing endpoint (Vercel)
//
//  POST /api/billing  { action: 'status' }              → plan + whether billing is on
//  POST /api/billing  { action: 'checkout' }            → { authorizationUrl } to redirect to
//  POST /api/billing  { action: 'verify', reference }   → settle on return from Paystack
//
//  One function for the three browser calls rather than three files, to keep
//  the deployment's function count down.
//
//  The webhook (api/paystack-webhook.js) is the other way a payment settles: it
//  covers the student who pays and closes the tab before the redirect lands.
//  Either path alone is enough; both together are what make "I paid but I'm
//  not Premium" a non-event.
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest, denyIfUserRateLimited, PROBE_RATE_LIMIT } from './_lib/request-policy.js';
import { captureApiError } from './_lib/sentry.js';
import { getStudentFromRequest } from './_lib/supabase.js';
import { billingEnabled, getPlan } from './_lib/plan.js';
import { createCheckout, settlePayment } from './_lib/billing.js';
import { PREMIUM_PASS } from '../src/data/plans.js';

// Checkout and verify are cheap for us but each costs a Paystack API call.
// Generous enough for a student who retries a failed transfer a few times.
const RATE_LIMIT = {
  namespace: 'billing',
  limit: 12,
  windowMs: 10 * 60 * 1000,
};

function publicPass() {
  const { name, priceKobo, currency, durationDays } = PREMIUM_PASS;
  return { name, priceKobo, currency, durationDays };
}

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const action = req.body?.action;

  // ── status ────────────────────────────────────────────────────────────────
  // Fired once per page load by PlanContext, signed in or not, so it shares the
  // probe bucket rather than spending the billing one.
  if (action === 'status') {
    const probeLimit = enforceRateLimit(req, PROBE_RATE_LIMIT);
    setRateLimitHeaders(res, probeLimit);
    if (!probeLimit.allowed) {
      res.setHeader('Retry-After', String(probeLimit.retryAfterSeconds));
      return res.status(429).json({ error: 'Too many requests.' });
    }

    const enabled = billingEnabled();
    const student = await getStudentFromRequest(req);
    // While billing is off nothing is gated, so the lookup would answer a
    // question nobody asks — and before the migration is applied it would log
    // a missing-table error on every page load.
    const plan = student && enabled ? await getPlan(student) : { premium: false, premiumUntil: null };
    return res.status(200).json({
      enabled,
      signedIn: Boolean(student),
      premium: plan.premium,
      premiumUntil: plan.premiumUntil,
      pass: publicPass(),
    });
  }

  if (action !== 'checkout' && action !== 'verify') {
    return res.status(400).json({ error: 'Unknown billing action.' });
  }

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'billing', { blocked: 'rate_limit' });
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many payment requests from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  const student = await getStudentFromRequest(req);
  if (!student) {
    logRequest(req, 'billing', { denied: 'unauthorized' });
    return res.status(401).json({ error: 'Please sign in to buy Premium.', kind: 'unauthorized' });
  }

  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'billing',
    message: 'You have made several payment requests in a row. Please wait a few minutes and try again.',
  })) return;

  if (!billingEnabled()) {
    return res.status(503).json({
      notConfigured: true,
      error: "Payments aren't switched on yet. Everything is free in the meantime.",
    });
  }

  // ── checkout ──────────────────────────────────────────────────────────────
  if (action === 'checkout') {
    try {
      const { authorizationUrl, reference } = await createCheckout(student);
      return res.status(200).json({ authorizationUrl, reference });
    } catch (err) {
      if (err?.userFacing) return res.status(400).json({ error: err.message });
      console.error('billing checkout error:', err);
      await captureApiError(err, { route: 'billing', phase: 'checkout' });
      return res.status(502).json({ error: 'Could not start the payment. Please try again in a moment.' });
    }
  }

  // ── verify ────────────────────────────────────────────────────────────────
  const reference = typeof req.body?.reference === 'string' ? req.body.reference.trim() : '';
  if (!reference) return res.status(400).json({ error: 'No payment reference provided.' });

  try {
    const outcome = await settlePayment(reference, { expectedUserId: student.user.id });
    return res.status(200).json(outcome);
  } catch (err) {
    console.error('billing verify error:', err);
    await captureApiError(err, { route: 'billing', phase: 'verify' });
    // Not a "failed" verdict — the payment may well have gone through. The
    // webhook will still settle it; tell the student to check back.
    return res.status(502).json({
      status: 'pending',
      error: "We couldn't confirm your payment just now. If you were charged, Premium will switch on within a few minutes — refresh this page to check.",
    });
  }
}
