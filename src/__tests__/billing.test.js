// Server side of Premium: the Paystack adapter, settlement, the two endpoints
// and the daily quota. Everything that touches money is checked here against
// the failure that would cost a student or the project: a forged webhook, an
// underpayment, one student settling another's reference, a double grant, and
// a paying student being charged quota.

import crypto from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  serviceClient: null,
  student: vi.fn(),
  capture: vi.fn(),
}));

vi.mock('../../api/_lib/serviceRole.js', () => ({
  serviceRoleConfigured: () => Boolean(mocks.serviceClient),
  serviceRoleClient: () => mocks.serviceClient,
}));
vi.mock('../../api/_lib/supabase.js', () => ({ getStudentFromRequest: mocks.student }));
vi.mock('../../api/_lib/sentry.js', () => ({ captureApiError: mocks.capture }));

import { isValidWebhookSignature, verifyTransaction } from '../../api/_lib/paystack.js';
import { settlePayment, createCheckout, newReference, REFERENCE_PATTERN } from '../../api/_lib/billing.js';
import { denyIfOverDailyQuota, getPlan } from '../../api/_lib/plan.js';
import billingHandler from '../../api/billing.js';
import webhookHandler from '../../api/paystack-webhook.js';

const SECRET = 'sk_test_secret';
const REF = `arete_${'a'.repeat(32)}`;

// A chainable stand-in for a supabase-js query builder. Every filter returns
// the builder; awaiting it (or calling maybeSingle) resolves to `result`.
function query(result) {
  const calls = [];
  const builder = new Proxy({}, {
    get(_t, prop) {
      if (prop === 'then') return (resolve, reject) => Promise.resolve(result).then(resolve, reject);
      if (prop === 'maybeSingle') return () => Promise.resolve(result);
      if (prop === 'calls') return calls;
      return (...args) => { calls.push([prop, ...args]); return builder; };
    },
  });
  return builder;
}

// Service-role client whose tables answer from `tables[name]` in call order.
function serviceDb(tables = {}, rpcResult = { data: '2027-05-07T00:00:00Z', error: null }) {
  const issued = [];
  return {
    issued,
    from: vi.fn((name) => {
      const queue = tables[name] || [];
      const q = query(queue.length ? queue.shift() : { data: null, error: null });
      issued.push([name, q]);
      return q;
    }),
    rpc: vi.fn(async () => rpcResult),
  };
}

function response() {
  return {
    headers: {}, code: 200, body: undefined,
    setHeader(k, v) { this.headers[k] = v; return this; },
    status(c) { this.code = c; return this; },
    json(b) { this.body = b; return this; },
    end() { return this; },
  };
}

const paystackOk = (data) => ({ ok: true, status: 200, json: async () => ({ status: true, data }) });

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  process.env.PAYSTACK_SECRET_KEY = SECRET;
  mocks.serviceClient = serviceDb();
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.clearAllMocks();
  delete process.env.PAYSTACK_SECRET_KEY;
  delete process.env.PAYSTACK_CALLBACK_URL;
  mocks.serviceClient = null;
});

describe('paystack adapter', () => {
  it('accepts only an HMAC-SHA512 of the exact body under our secret', () => {
    const body = JSON.stringify({ event: 'charge.success', data: { reference: REF } });
    const good = crypto.createHmac('sha512', SECRET).update(body).digest('hex');
    expect(isValidWebhookSignature(body, good)).toBe(true);
    expect(isValidWebhookSignature(body, good.toUpperCase())).toBe(true);
    expect(isValidWebhookSignature(`${body} `, good)).toBe(false);
    expect(isValidWebhookSignature(body, crypto.createHmac('sha512', 'other').update(body).digest('hex'))).toBe(false);
    expect(isValidWebhookSignature(body, 'short')).toBe(false);
    expect(isValidWebhookSignature(body, undefined)).toBe(false);
  });

  it('normalises a verify response and sends the secret key', async () => {
    fetch.mockResolvedValueOnce(paystackOk({ status: 'success', reference: REF, amount: 250000, currency: 'NGN', id: 99 }));
    const tx = await verifyTransaction(REF);
    expect(tx).toEqual({ status: 'success', reference: REF, amountKobo: 250000, currency: 'NGN', transactionId: '99' });
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe(`https://api.paystack.co/transaction/verify/${REF}`);
    expect(init.headers.Authorization).toBe(`Bearer ${SECRET}`);
  });

  it('throws when Paystack answers status:false', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ status: false, message: 'nope' }) });
    await expect(verifyTransaction(REF)).rejects.toThrow(/nope/);
  });
});

describe('references', () => {
  it('mints references that match the accepted pattern and are unique', () => {
    const a = newReference();
    const b = newReference();
    expect(REFERENCE_PATTERN.test(a)).toBe(true);
    expect(a).not.toBe(b);
  });
});

describe('createCheckout', () => {
  it('records the quoted price on a pending row before redirecting to Paystack', async () => {
    process.env.PAYSTACK_CALLBACK_URL = 'https://preview.example/premium';
    mocks.serviceClient = serviceDb({ billing_payments: [{ error: null }] });
    fetch.mockResolvedValueOnce(paystackOk({ authorization_url: 'https://checkout.paystack.com/x' }));

    const out = await createCheckout({ user: { id: 'u1', email: 's@uniuyo.edu.ng' } });

    expect(out.authorizationUrl).toBe('https://checkout.paystack.com/x');
    const [, insertQuery] = mocks.serviceClient.issued[0];
    const [, row] = insertQuery.calls.find(([op]) => op === 'insert');
    expect(row).toMatchObject({ user_id: 'u1', amount_kobo: 250000, currency: 'NGN', duration_days: 180, status: 'pending' });
    expect(row.reference).toBe(out.reference);

    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({ email: 's@uniuyo.edu.ng', amount: 250000, reference: out.reference, callback_url: 'https://preview.example/premium' });
  });
});

describe('settlePayment', () => {
  const pending = { reference: REF, user_id: 'u1', amount_kobo: 250000, currency: 'NGN', status: 'pending' };

  it('ignores references we did not mint without touching the database', async () => {
    expect(await settlePayment('T123456')).toEqual({ status: 'unknown' });
    expect(mocks.serviceClient.from).not.toHaveBeenCalled();
  });

  it("will not settle (or reveal) another student's payment", async () => {
    mocks.serviceClient = serviceDb({ billing_payments: [{ data: pending, error: null }] });
    expect(await settlePayment(REF, { expectedUserId: 'someone-else' })).toEqual({ status: 'unknown' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('grants once Paystack confirms the full amount', async () => {
    mocks.serviceClient = serviceDb({ billing_payments: [{ data: pending, error: null }] });
    fetch.mockResolvedValueOnce(paystackOk({ status: 'success', reference: REF, amount: 250000, currency: 'NGN', id: 7 }));
    const out = await settlePayment(REF, { expectedUserId: 'u1' });
    expect(out).toEqual({ status: 'granted', premiumUntil: '2027-05-07T00:00:00Z' });
    expect(mocks.serviceClient.rpc).toHaveBeenCalledWith('grant_premium_pass', {
      p_reference: REF, p_paid_amount_kobo: 250000, p_paid_currency: 'NGN', p_provider_transaction_id: '7',
    });
  });

  it('refuses an underpayment or a different currency', async () => {
    for (const tx of [{ amount: 100, currency: 'NGN' }, { amount: 250000, currency: 'USD' }]) {
      mocks.serviceClient = serviceDb({ billing_payments: [{ data: pending, error: null }] });
      fetch.mockResolvedValueOnce(paystackOk({ status: 'success', reference: REF, id: 1, ...tx }));
      expect(await settlePayment(REF)).toEqual({ status: 'mismatch' });
      expect(mocks.serviceClient.rpc).not.toHaveBeenCalled();
    }
  });

  it('does not ask Paystack again for a payment already settled', async () => {
    mocks.serviceClient = serviceDb({
      billing_payments: [{ data: { ...pending, status: 'success' }, error: null }],
      premium_passes: [{ data: { ends_at: '2027-01-01T00:00:00Z' }, error: null }],
    });
    expect(await settlePayment(REF)).toEqual({ status: 'granted', premiumUntil: '2027-01-01T00:00:00Z' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('marks an abandoned checkout and reports pending for one still in progress', async () => {
    mocks.serviceClient = serviceDb({ billing_payments: [{ data: pending, error: null }, { error: null }] });
    fetch.mockResolvedValueOnce(paystackOk({ status: 'abandoned', reference: REF }));
    expect(await settlePayment(REF)).toEqual({ status: 'abandoned' });
    const [, update] = mocks.serviceClient.issued[1];
    expect(update.calls.find(([op]) => op === 'update')[1]).toEqual({ status: 'abandoned' });

    mocks.serviceClient = serviceDb({ billing_payments: [{ data: pending, error: null }] });
    fetch.mockResolvedValueOnce(paystackOk({ status: 'ongoing', reference: REF }));
    expect(await settlePayment(REF)).toEqual({ status: 'pending' });
  });
});

describe('api/paystack-webhook', () => {
  const sign = (body) => crypto.createHmac('sha512', SECRET).update(body).digest('hex');
  const call = async (event, signature) => {
    const res = response();
    const raw = JSON.stringify(event);
    await webhookHandler({ method: 'POST', body: event, headers: { 'x-paystack-signature': signature ?? sign(raw) } }, res);
    return res;
  };

  it('rejects a forged event', async () => {
    const res = await call({ event: 'charge.success', data: { reference: REF } }, 'f'.repeat(128));
    expect(res.code).toBe(401);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('acknowledges events it does not act on', async () => {
    const res = await call({ event: 'transfer.success', data: { reference: REF } });
    expect(res.code).toBe(200);
    expect(res.body.ignored).toBe(true);
  });

  it('settles a signed charge.success by re-verifying with Paystack', async () => {
    mocks.serviceClient = serviceDb({ billing_payments: [{ data: { reference: REF, user_id: 'u1', amount_kobo: 250000, currency: 'NGN', status: 'pending' }, error: null }] });
    fetch.mockResolvedValueOnce(paystackOk({ status: 'success', reference: REF, amount: 250000, currency: 'NGN', id: 3 }));
    const res = await call({ event: 'charge.success', data: { reference: REF, amount: 1 } });
    expect(res.code).toBe(200);
    expect(res.body.status).toBe('granted');
  });

  it('answers 500 on an infrastructure failure so Paystack retries', async () => {
    mocks.serviceClient = serviceDb({ billing_payments: [{ data: null, error: { message: 'db down' } }] });
    const res = await call({ event: 'charge.success', data: { reference: REF } });
    expect(res.code).toBe(500);
  });
});

describe('api/billing', () => {
  const call = async (body) => {
    const res = response();
    await billingHandler({ method: 'POST', body, headers: {} }, res);
    return res;
  };
  const studentDb = (passes) => ({ from: () => query({ data: passes, error: null }), rpc: vi.fn(async () => ({ data: [{ allowed: true, remaining: 1, reset_at: new Date(Date.now() + 1000).toISOString() }], error: null })) });

  it('reports billing off when the Paystack key is missing', async () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    mocks.student.mockResolvedValue(null);
    const res = await call({ action: 'status' });
    expect(res.body).toMatchObject({ enabled: false, premium: false, pass: { priceKobo: 250000 } });
  });

  it("reports the signed-in student's active pass", async () => {
    mocks.student.mockResolvedValue({ user: { id: 'u1' }, db: studentDb([{ ends_at: '2027-05-07T00:00:00Z' }]) });
    const res = await call({ action: 'status' });
    expect(res.body).toMatchObject({ enabled: true, signedIn: true, premium: true, premiumUntil: '2027-05-07T00:00:00Z' });
  });

  it('requires sign-in to check out or verify', async () => {
    mocks.student.mockResolvedValue(null);
    expect((await call({ action: 'checkout' })).code).toBe(401);
    expect((await call({ action: 'verify', reference: REF })).code).toBe(401);
  });

  it('answers 503 for checkout while billing is off', async () => {
    mocks.serviceClient = null;
    mocks.student.mockResolvedValue({ user: { id: 'u1', email: 'a@b.c' }, db: studentDb([]) });
    const res = await call({ action: 'checkout' });
    expect(res.code).toBe(503);
    expect(res.body.notConfigured).toBe(true);
  });

  it("verifies only against the caller's own account", async () => {
    mocks.serviceClient = serviceDb({ billing_payments: [{ data: { reference: REF, user_id: 'u2', amount_kobo: 250000, currency: 'NGN', status: 'pending' }, error: null }] });
    mocks.student.mockResolvedValue({ user: { id: 'u1' }, db: studentDb([]) });
    const res = await call({ action: 'verify', reference: REF });
    expect(res.body).toEqual({ status: 'unknown' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects unknown actions', async () => {
    expect((await call({ action: 'refund' })).code).toBe(400);
  });
});

describe('daily quota', () => {
  const freeStudent = (rpcRow, passes = []) => ({
    user: { id: 'u1' },
    db: { from: () => query({ data: passes, error: null }), rpc: vi.fn(async () => ({ data: [rpcRow], error: null })) },
  });
  const later = () => new Date(Date.now() + 5 * 3600 * 1000).toISOString();

  it('meters nothing while billing is off', async () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    const student = freeStudent({ allowed: false, remaining: 0, reset_at: later() });
    expect(await denyIfOverDailyQuota({ headers: {} }, response(), student, 'tutor')).toBe(false);
    expect(student.db.rpc).not.toHaveBeenCalled();
  });

  it('never charges a Premium student', async () => {
    const student = freeStudent({ allowed: false, remaining: 0, reset_at: later() }, [{ ends_at: later() }]);
    expect(await denyIfOverDailyQuota({ headers: {} }, response(), student, 'tutor')).toBe(false);
    expect(student.db.rpc).not.toHaveBeenCalled();
  });

  it('charges a 24-hour bucket per feature and reports what is left', async () => {
    const student = freeStudent({ allowed: true, remaining: 7, reset_at: later() });
    const res = response();
    expect(await denyIfOverDailyQuota({ headers: {} }, res, student, 'tutor')).toBe(false);
    expect(student.db.rpc).toHaveBeenCalledWith('consume_rate_limit', { p_namespace: 'daily:tutor', p_limit: 10, p_window_seconds: 86400 });
    expect(res.headers['X-Quota-Remaining']).toBe('7');
  });

  it('answers 429 quota_exceeded with an upgrade path once spent', async () => {
    const res = response();
    expect(await denyIfOverDailyQuota({ headers: {} }, res, freeStudent({ allowed: false, remaining: 0, reset_at: later() }), 'explainer')).toBe(true);
    expect(res.code).toBe(429);
    expect(res.body).toMatchObject({ kind: 'quota_exceeded', feature: 'explainer', limit: 5, upgradePath: '/premium' });
    expect(res.body.error).toMatch(/5 free code explanations/);
  });

  it('fails open when the plan cannot be read', async () => {
    const student = { user: { id: 'u1' }, db: { from: () => query({ data: null, error: { message: 'relation does not exist' } }), rpc: vi.fn() } };
    expect((await getPlan(student)).unknown).toBe(true);
    expect(await denyIfOverDailyQuota({ headers: {} }, response(), student, 'tutor')).toBe(false);
    expect(student.db.rpc).not.toHaveBeenCalled();
  });

  it('leaves unmetered features alone', async () => {
    const student = freeStudent({ allowed: false, remaining: 0, reset_at: later() });
    expect(await denyIfOverDailyQuota({ headers: {} }, response(), student, 'extract')).toBe(false);
  });
});
