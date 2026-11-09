// ============================================================================
//  Arete — Premium checkout and settlement (Vercel functions)
//
//  Checkout, settlement and revocation, shared by api/billing.js (the browser's calls) and
//  api/paystack-webhook.js (Paystack's server-to-server notice):
//
//    createCheckout(student)        → pending billing_payments row + Paystack URL
//    settlePayment(reference, opts) → ask Paystack, and grant the pass if paid
//    revokePayment(reference)       → verify reversal, then remove unused time
//
//  settlePayment is safe to call any number of times, from either path, in any
//  order: grant_premium_pass() locks the payment row and a pass is UNIQUE on its
//  reference, so a payment buys exactly one term however the browser's return
//  trip and the webhook race.
//
//  Writes go through the service-role client (see serviceRole.js rules): every
//  query here is scoped by a reference we minted or a user id from a verified
//  token, never by an id taken from a request body.
// ============================================================================

import crypto from 'node:crypto';
import { PREMIUM_PASS } from '../../src/data/plans.js';
import { SITE_URL } from '../../src/data/siteMeta.js';
import { serviceRoleClient } from './serviceRole.js';
import { captureApiError } from './sentry.js';
import { initializeTransaction, verifyTransaction } from './paystack.js';

// arete_ + 32 hex chars. Checked on every inbound reference so nothing else —
// a Paystack transaction started outside this app, a typo, an injection
// attempt — is ever looked up.
export const REFERENCE_PATTERN = /^arete_[a-f0-9]{32}$/;

export function newReference() {
  return `arete_${crypto.randomUUID().replace(/-/g, '')}`;
}

// Where Paystack sends the student after paying. Paystack appends
// ?trxref=…&reference=… itself. Overridable for preview deployments and local
// `vercel dev`, which do not live at SITE_URL.
export function callbackUrl() {
  return process.env.PAYSTACK_CALLBACK_URL || `${SITE_URL}/premium`;
}

export async function createCheckout(student) {
  const db = serviceRoleClient();
  if (!db) throw new Error('billing: service role is not configured');

  const email = student.user.email;
  if (!email) {
    const err = new Error('Your account has no email address, which Paystack needs for the receipt.');
    err.userFacing = true;
    throw err;
  }

  const reference = newReference();
  const { error: insertError } = await db.from('billing_payments').insert({
    reference,
    user_id: student.user.id,
    plan: PREMIUM_PASS.id,
    amount_kobo: PREMIUM_PASS.priceKobo,
    currency: PREMIUM_PASS.currency,
    duration_days: PREMIUM_PASS.durationDays,
    provider: 'paystack',
    status: 'pending',
  });
  if (insertError) throw new Error(`billing: could not record checkout: ${insertError.message}`);

  const { authorizationUrl } = await initializeTransaction({
    email,
    amountKobo: PREMIUM_PASS.priceKobo,
    currency: PREMIUM_PASS.currency,
    reference,
    callbackUrl: callbackUrl(),
    metadata: { user_id: student.user.id, plan: PREMIUM_PASS.id },
  });

  return { reference, authorizationUrl };
}

const TERMINAL_FAILURES = new Set(['failed', 'abandoned', 'reversed']);

// Resolves to one of:
//   { status: 'granted', premiumUntil }  — paid; pass exists (now or already)
//   { status: 'pending' }                — Paystack has not finished it yet
//   { status: 'failed' | 'abandoned' }   — the student did not pay
//   { status: 'unknown' }                — no such payment for this caller
//   { status: 'mismatch' }               — Paystack's record disagrees with ours
// Throws only on infrastructure failure (Paystack or the database unreachable),
// so the webhook can answer 500 and let Paystack retry.
//
// expectedUserId: the browser path passes the signed-in student's id, so one
// student cannot settle (or probe for) another student's reference. The
// webhook passes nothing — its authority is the signature it already checked.
export async function settlePayment(reference, { expectedUserId } = {}) {
  if (typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)) {
    return { status: 'unknown' };
  }

  const db = serviceRoleClient();
  if (!db) throw new Error('billing: service role is not configured');

  const { data: payment, error: readError } = await db
    .from('billing_payments')
    .select('reference, user_id, amount_kobo, currency, status')
    .eq('reference', reference)
    .maybeSingle();
  if (readError) throw new Error(`billing: could not read payment: ${readError.message}`);
  if (!payment) return { status: 'unknown' };
  if (expectedUserId && payment.user_id !== expectedUserId) return { status: 'unknown' };

  if (payment.status === 'refunded') return { status: 'refunded' };

  if (payment.status === 'success') {
    return { status: 'granted', premiumUntil: await passEnd(db, reference) };
  }

  const tx = await verifyTransaction(reference);

  if (tx.status !== 'success') {
    if (TERMINAL_FAILURES.has(tx.status) && payment.status === 'pending') {
      const { error } = await db
        .from('billing_payments')
        .update({ status: tx.status === 'abandoned' ? 'abandoned' : 'failed' })
        .eq('reference', reference)
        .eq('status', 'pending');
      if (error) console.error('billing: could not mark payment as failed:', error.message);
    }
    return { status: TERMINAL_FAILURES.has(tx.status) ? (tx.status === 'abandoned' ? 'abandoned' : 'failed') : 'pending' };
  }

  // Paystack says paid. Before granting, make sure it paid for THIS row: the
  // same reference, our currency, and at least the amount we quoted.
  if (tx.reference !== reference || tx.currency !== payment.currency || !(tx.amountKobo >= payment.amount_kobo)) {
    console.error('billing: Paystack record does not match payment', JSON.stringify({
      reference, paidAmount: tx.amountKobo, paidCurrency: tx.currency, expected: payment.amount_kobo,
    }));
    return { status: 'mismatch' };
  }

  const { data: endsAt, error: grantError } = await db.rpc('grant_premium_pass', {
    p_reference: reference,
    p_paid_amount_kobo: tx.amountKobo,
    p_paid_currency: tx.currency,
    p_provider_transaction_id: tx.transactionId,
  });
  if (grantError) throw new Error(`billing: grant_premium_pass failed: ${grantError.message}`);

  return { status: 'granted', premiumUntil: endsAt ?? await passEnd(db, reference) };
}

// A refund notice is only a trigger: the provider must confirm a full reversal.
export async function revokePayment(reference) {
  if (typeof reference !== 'string' || !REFERENCE_PATTERN.test(reference)) return { status: 'unknown' };
  const db = serviceRoleClient();
  if (!db) throw new Error('billing: service role is not configured');
  const { data: payment, error: readError } = await db
    .from('billing_payments')
    .select('reference')
    .eq('reference', reference)
    .maybeSingle();
  if (readError) throw new Error(`billing: could not read refund payment: ${readError.message}`);
  if (!payment) return { status: 'unknown' };

  const tx = await verifyTransaction(reference);
  if (tx.status !== 'reversed' || tx.reference !== reference) {
    const err = new Error('billing: refund needs manual review; transaction is not confirmed reversed');
    console.error(err.message, { reference, providerStatus: tx.status, providerReference: tx.reference });
    await captureApiError(err, { route: 'billing-refund', reference });
    return { status: 'not_reversed' };
  }
  const { data, error } = await db.rpc('revoke_premium_pass', { p_reference: reference });
  if (error) throw new Error(`billing: revoke_premium_pass failed: ${error.message}`);
  return { status: data };
}

async function passEnd(db, reference) {
  const { data, error } = await db
    .from('premium_passes')
    .select('ends_at')
    .eq('reference', reference)
    .maybeSingle();
  if (error) console.error('billing: could not read pass end:', error.message);
  return data?.ends_at ?? null;
}
