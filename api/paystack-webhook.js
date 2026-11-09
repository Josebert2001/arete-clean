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
//  The HMAC is over the exact bytes Paystack sent. Vercel's Node req.body is a
//  lazy getter: read the stream BEFORE touching it, capped at 1 MB, then verify
//  those bytes before parsing JSON. If the stream was already consumed (or a
//  test supplies only req.body), keep the string/Buffer as-is and re-serialise
//  only a parsed object. That fallback cannot recover the original formatting.
// ============================================================================

import { isValidWebhookSignature, paystackConfigured } from './_lib/paystack.js';
import { settlePayment, revokePayment, REFERENCE_PATTERN } from './_lib/billing.js';
import { captureApiError } from './_lib/sentry.js';

const MAX_BODY_BYTES = 1024 * 1024;

async function rawBodyOf(req) {
  if (typeof req[Symbol.asyncIterator] === 'function' && !req.readableEnded) {
    const chunks = [];
    let size = 0;
    // Keep the socket open on an early exit so the 413 can reach Paystack.
    const stream = typeof req.iterator === 'function' ? req.iterator({ destroyOnReturn: false }) : req;
    for await (const chunk of stream) {
      const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += bytes.length;
      if (size > MAX_BODY_BYTES) {
        req.resume?.();
        const err = new Error('Webhook body too large.');
        err.statusCode = 413;
        throw err;
      }
      chunks.push(bytes);
    }
    if (size) return Buffer.concat(chunks);
  }
  const body = req.body;
  const bytes = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body ?? {}));
  if (bytes.length > MAX_BODY_BYTES) {
    const err = new Error('Webhook body too large.');
    err.statusCode = 413;
    throw err;
  }
  return bytes;
}

function parsedBodyOf(raw) {
  try { return JSON.parse(raw.toString('utf8')); } catch { return null; }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!paystackConfigured()) return res.status(503).json({ error: 'Billing is not configured.' });

  const signature = req.headers?.['x-paystack-signature'];
  let raw;
  try {
    raw = await rawBodyOf(req);
  } catch (err) {
    if (err.statusCode === 413) return res.status(413).json({ error: 'Webhook body too large.' });
    console.error('paystack-webhook: reading body failed:', err);
    return res.status(500).json({ error: 'Could not read event.' });
  }
  if (!isValidWebhookSignature(raw, signature)) {
    console.error(JSON.stringify({ route: 'paystack-webhook', denied: 'bad_signature', hasSignature: Boolean(signature) }));
    return res.status(401).json({ error: 'Invalid signature.' });
  }

  const event = parsedBodyOf(raw);
  const refund = event?.event === 'refund.processed';
  const reference = refund
    ? (event?.data?.transaction_reference ?? event?.data?.transaction?.reference ?? event?.data?.reference)
    : event?.data?.reference;

  // Acknowledge everything we do not act on, or Paystack keeps retrying it.
  if ((event?.event !== 'charge.success' && !refund) || typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)) {
    return res.status(200).json({ received: true, ignored: true });
  }

  try {
    const outcome = await (refund ? revokePayment(reference) : settlePayment(reference));
    if (!['granted', 'revoked', 'already', 'refunded'].includes(outcome.status)) {
      console.error(JSON.stringify({ route: 'paystack-webhook', reference, outcome: outcome.status }));
    }
    return res.status(200).json({ received: true, status: outcome.status });
  } catch (err) {
    // 500 makes Paystack retry later, which is what we want when the database
    // or Paystack's verify API was briefly unreachable.
    console.error('paystack-webhook: processing failed:', err);
    await captureApiError(err, { route: 'paystack-webhook' });
    return res.status(500).json({ error: 'Could not process event.' });
  }
}
