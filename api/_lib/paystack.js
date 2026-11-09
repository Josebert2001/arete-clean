// ============================================================================
//  Arete — Paystack adapter (Vercel functions)
//
//  The only file that talks to Paystack or reads PAYSTACK_SECRET_KEY. Swapping
//  to another gateway (Flutterwave, say) means rewriting these three functions
//  and nothing else: api/_lib/billing.js only ever sees the normalised shapes
//  returned here.
//
//  Plain fetch, no SDK — Paystack's API is three calls and a header check.
//  Checkout is a full-page redirect to Paystack's hosted page, so there is no
//  third-party script on our origin and no CSP change in vercel.json.
// ============================================================================

import crypto from 'node:crypto';

const API_BASE = 'https://api.paystack.co';
// Paystack's API is usually quick; a hung request must not hold a function
// instance (and the student's spinner) for the platform's whole timeout.
const TIMEOUT_MS = 15000;

function secretKey() {
  return process.env.PAYSTACK_SECRET_KEY || '';
}

export function paystackConfigured() {
  return Boolean(secretKey());
}

async function paystackFetch(path, { method = 'GET', body } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${secretKey()}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.status) {
      const err = new Error(`Paystack ${method} ${path.split('/').slice(0, 3).join('/')} failed: ${json?.message || res.status}`);
      err.statusCode = res.status;
      throw err;
    }
    return json.data;
  } finally {
    clearTimeout(timer);
  }
}

// Starts a hosted checkout. Returns the URL to send the student to.
// `reference` is ours (minted in billing.js), so the same string comes back on
// the callback URL and in the webhook and can be matched to billing_payments.
export async function initializeTransaction({ email, amountKobo, currency, reference, callbackUrl, metadata }) {
  const data = await paystackFetch('/transaction/initialize', {
    method: 'POST',
    body: {
      email,
      amount: amountKobo,
      currency,
      reference,
      callback_url: callbackUrl,
      metadata: {
        ...metadata,
        // Paystack shows a "Cancel payment" link that returns here.
        cancel_action: callbackUrl,
      },
    },
  });
  if (!data?.authorization_url) throw new Error('Paystack initialize returned no authorization_url');
  return { authorizationUrl: data.authorization_url };
}

// The authoritative check. Nothing is ever granted on the strength of a
// redirect or a webhook body alone — both only trigger this lookup, which asks
// Paystack directly with our secret key.
export async function verifyTransaction(reference) {
  const data = await paystackFetch(`/transaction/verify/${encodeURIComponent(reference)}`);
  return {
    // 'success' | 'failed' | 'abandoned' | 'ongoing' | 'pending' | 'processing' | 'queued' | 'reversed'
    status: String(data?.status || ''),
    reference: String(data?.reference || ''),
    amountKobo: Number(data?.amount),
    currency: String(data?.currency || ''),
    transactionId: data?.id != null ? String(data.id) : null,
  };
}

// Webhook authenticity: HMAC-SHA512 of the raw request body with the secret
// key, hex-encoded, in the x-paystack-signature header. Compared in constant
// time so the comparison leaks nothing about how close a forgery came.
export function isValidWebhookSignature(rawBody, signature) {
  const key = secretKey();
  if (!key || typeof signature !== 'string' || !signature) return false;
  const expected = crypto.createHmac('sha512', key).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature.trim().toLowerCase(), 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
