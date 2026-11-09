import { fetchJsonWithFallback } from './apiClient.js';
import { authHeaders } from '../lib/supabase.js';

const UNAVAILABLE = 'Payments need the Vercel API routes. Run the app with `vercel dev` or deploy it to use this feature.';

async function billing(body) {
  return fetchJsonWithFallback(
    '/api/billing',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify(body),
    },
    UNAVAILABLE,
  );
}

// { enabled, signedIn, premium, premiumUntil, pass } — or { error } when the
// API is unreachable, which PlanContext treats as "billing off".
export function getBillingStatus() {
  return billing({ action: 'status' });
}

// { authorizationUrl, reference } on success; { error } otherwise.
export function startCheckout() {
  return billing({ action: 'checkout' });
}

// { status: 'granted' | 'pending' | 'failed' | 'abandoned' | 'unknown' | 'mismatch', premiumUntil? }
export function verifyPayment(reference) {
  return billing({ action: 'verify', reference });
}

// Paystack appends both ?trxref= and ?reference= to the callback URL.
export function referenceFromSearch(search) {
  const params = new URLSearchParams(search);
  return params.get('reference') || params.get('trxref') || '';
}
