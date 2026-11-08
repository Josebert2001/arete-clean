// ============================================================================
//  Arete — Paystack webhook (Vercel)
//
//  Set this URL in Paystack → Settings → API Keys & Webhooks:
//      https://www.aretecyb.tech/api/paystack-webhook
//
//  Settles a payment when the student pays but never comes back to the site
//  (closed the tab, lost signal mid-redirect — common on campus data). The
//  browser's own return trip through api/billing.js does the same thing; both
//  are idempotent, see api/_lib/billing.js.
//
//  TRUST
//  The signature proves the request came from Paystack. Even so, the body is
//  used only for its `reference`: settlePayment() then asks Paystack's verify
//  API for the real status and amount before granting anything, so a replayed
//  or reordered event cannot buy more than was paid for.
//
//  RAW BODY
//  The HMAC is over the exact bytes Paystack sent. Vercel's Node runtime parses
//  JSON bodies before the handler runs; when it hands us a string or Buffer we
//  sign that, and otherwise we re-serialise — which is what Paystack's own Node
//  example does, and matches because Paystack sends compact JSON. If that ever
//  stops matching, the webhook answers 401 and payments still settle through
//  the browser path; the failure is logged so it gets noticed.
// ============================================================================

import { isValidWebhookSignature, paystackConfigured } from './_lib/paystack.js';
import { settlePayment, REFERENCE_PATTERN } from './_lib/billing.js';
import { captureApiError } from './_lib/sentry.js';

function rawBodyOf(req) {
  const body = req.body;
  if (typeof body === 'string') return body;
  if (Buffer.isBuffer(body)) return body.toString('utf8');
  return JSON.stringify(body ?? {});
}

function parsedBodyOf(req) {
  const body = req.body;
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    try { return JSON.parse(String(body)); } catch { return null; }
  }
  return body ?? null;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!paystackConfigured()) return res.status(503).json({ error: 'Billing is not configured.' });

  const signature = req.headers?.['x-paystack-signature'];
  if (!isValidWebhookSignature(rawBodyOf(req), signature)) {
    console.error(JSON.stringify({ route: 'paystack-webhook', denied: 'bad_signature', hasSignature: Boolean(signature) }));
    return res.status(401).json({ error: 'Invalid signature.' });
  }

  const event = parsedBodyOf(req);
  const reference = event?.data?.reference;

  // Acknowledge everything we do not act on, or Paystack keeps retrying it.
  if (event?.event !== 'charge.success' || typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)) {
    return res.status(200).json({ received: true, ignored: true });
  }

  try {
    const outcome = await settlePayment(reference);
    if (outcome.status !== 'granted') {
      console.error(JSON.stringify({ route: 'paystack-webhook', reference, outcome: outcome.status }));
    }
    return res.status(200).json({ received: true, status: outcome.status });
  } catch (err) {
    // 500 makes Paystack retry later, which is what we want when the database
    // or Paystack's verify API was briefly unreachable.
    console.error('paystack-webhook: settle failed:', err);
    await captureApiError(err, { route: 'paystack-webhook' });
    return res.status(500).json({ error: 'Could not process event.' });
  }
}
