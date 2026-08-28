import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { enforceUserRateLimit } from '../../api/_lib/request-policy.js';

// The per-user limiter is the one that actually caps a student (the in-memory
// one in front of it is per-lambda-instance and only guards the pre-auth path),
// so its fail-open behaviour is load-bearing: migrations in this project are
// applied by hand, which means deployed code can legitimately run against a
// database where consume_rate_limit() does not exist yet.

const CONFIG = { namespace: 'summarize', limit: 10, windowMs: 10 * 60 * 1000 };

// Minimal stand-in for the RLS-scoped client getStudentFromRequest returns.
function studentWithRpc(impl) {
  return { db: { rpc: vi.fn(impl) } };
}

describe('enforceUserRateLimit', () => {
  beforeEach(() => {
    // The helper logs on every failure path; keep the suite output readable
    // while still asserting the calls happen.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('passes the namespace, limit and window (in seconds) to the RPC', async () => {
    const student = studentWithRpc(async () => ({
      data: [{ allowed: true, remaining: 9, reset_at: new Date(Date.now() + 600_000).toISOString() }],
      error: null,
    }));

    await enforceUserRateLimit(student, CONFIG);

    expect(student.db.rpc).toHaveBeenCalledWith('consume_rate_limit', {
      p_namespace: 'summarize',
      p_limit: 10,
      p_window_seconds: 600,
    });
  });

  it('allows the request and reports the remaining allowance', async () => {
    const resetAt = new Date(Date.now() + 600_000);
    const student = studentWithRpc(async () => ({
      data: [{ allowed: true, remaining: 7, reset_at: resetAt.toISOString() }],
      error: null,
    }));

    const verdict = await enforceUserRateLimit(student, CONFIG);

    expect(verdict.allowed).toBe(true);
    expect(verdict.remaining).toBe(7);
    expect(verdict.degraded).toBe(false);
    expect(verdict.resetAt).toBe(resetAt.getTime());
  });

  it('denies the request when the allowance is spent', async () => {
    const student = studentWithRpc(async () => ({
      data: [{ allowed: false, remaining: 0, reset_at: new Date(Date.now() + 120_000).toISOString() }],
      error: null,
    }));

    const verdict = await enforceUserRateLimit(student, CONFIG);

    expect(verdict.allowed).toBe(false);
    expect(verdict.remaining).toBe(0);
    // Retry-After must be a positive whole number of seconds, never 0 or NaN.
    expect(verdict.retryAfterSeconds).toBeGreaterThan(0);
    expect(Number.isInteger(verdict.retryAfterSeconds)).toBe(true);
  });

  it('fails open when the function is missing from the database', async () => {
    // What Supabase returns before the migration has been run by hand.
    const student = studentWithRpc(async () => ({
      data: null,
      error: { message: 'Could not find the function public.consume_rate_limit' },
    }));

    const verdict = await enforceUserRateLimit(student, CONFIG);

    expect(verdict.allowed).toBe(true);
    expect(verdict.degraded).toBe(true);
    expect(console.error).toHaveBeenCalled();
  });

  it('fails open when the RPC throws', async () => {
    const student = studentWithRpc(async () => { throw new TypeError('fetch failed'); });

    const verdict = await enforceUserRateLimit(student, CONFIG);

    expect(verdict.allowed).toBe(true);
    expect(verdict.degraded).toBe(true);
  });

  it('fails open on an unexpected response shape rather than guessing', async () => {
    const student = studentWithRpc(async () => ({ data: [], error: null }));

    const verdict = await enforceUserRateLimit(student, CONFIG);

    expect(verdict.allowed).toBe(true);
    expect(verdict.degraded).toBe(true);
  });

  it('fails open when there is no student client at all', async () => {
    const verdict = await enforceUserRateLimit(null, CONFIG);

    expect(verdict.allowed).toBe(true);
    expect(verdict.degraded).toBe(true);
  });

  it('survives an unparseable reset_at instead of emitting NaN headers', async () => {
    const student = studentWithRpc(async () => ({
      data: [{ allowed: true, remaining: 3, reset_at: 'not a timestamp' }],
      error: null,
    }));

    const verdict = await enforceUserRateLimit(student, CONFIG);

    expect(Number.isFinite(verdict.resetAt)).toBe(true);
    expect(Number.isInteger(verdict.retryAfterSeconds)).toBe(true);
  });
});
