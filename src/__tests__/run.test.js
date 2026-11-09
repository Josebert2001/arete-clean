import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  student: vi.fn(), ipLimit: vi.fn(), userLimit: vi.fn(), capture: vi.fn(),
}));
vi.mock('../../api/_lib/supabase.js', () => ({ getStudentFromRequest: mocks.student }));
vi.mock('../../api/_lib/sentry.js', () => ({ captureApiError: mocks.capture }));
vi.mock('../../api/_lib/request-policy.js', async () => {
  const actual = await vi.importActual('../../api/_lib/request-policy.js');
  return {
    ...actual,
    enforceRateLimit: mocks.ipLimit,
    setRateLimitHeaders: (res, value) => res.setHeader('X-RateLimit-Remaining', String(value.remaining)),
    logRequest: vi.fn(), denyIfUserRateLimited: mocks.userLimit,
  };
});
import handler from '../../api/run.js';

function response() {
  return {
    headers: {}, code: 200, body: undefined,
    setHeader(key, value) { this.headers[key] = value; return this; },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
    end() { return this; },
  };
}
async function call(body = { source_code: 'print(1)' }, method = 'POST') {
  const res = response();
  await handler({ method, body, headers: {} }, res);
  return res;
}
const ok = (body) => ({ ok: true, json: async () => body });

describe('api/run', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    process.env.JDOODLE_CLIENT_ID = 'private-id';
    process.env.JDOODLE_CLIENT_SECRET = 'private-secret';
    mocks.student.mockResolvedValue({ user: { id: 'student' } });
    mocks.ipLimit.mockReturnValue({ allowed: true, remaining: 9, resetAt: Date.now() + 600000 });
    mocks.userLimit.mockResolvedValue(false);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(ok({ output: '1\n', cpuTime: '0.01', memory: '10' })).mockResolvedValueOnce(ok({ used: 3 })));
  });
  afterEach(() => {
    vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.clearAllMocks();
    delete process.env.JDOODLE_CLIENT_ID; delete process.env.JDOODLE_CLIENT_SECRET;
    delete process.env.RUNNER_PROVIDER; delete process.env.JUDGE0_URL; delete process.env.JUDGE0_AUTH_TOKEN;
  });

  it('handles preflight and rejects other methods before auth', async () => {
    const preflight = await call(null, 'OPTIONS');
    expect(preflight.code).toBe(200);
    expect(preflight.headers).toMatchObject({
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-store',
      Vary: 'Origin',
    });
    expect(preflight.headers['Access-Control-Allow-Origin']).not.toBe('*');
    expect((await call(null, 'GET')).body).toEqual({ error: 'Method not allowed' });
    expect(mocks.student).not.toHaveBeenCalled();
  });
  it('enforces the device and signed-in user limits before JDoodle', async () => {
    mocks.ipLimit.mockReturnValueOnce({ allowed: false, remaining: 0, retryAfterSeconds: 42 });
    const blocked = await call();
    expect(blocked.code).toBe(429);
    expect(blocked.headers['Retry-After']).toBe('42');
    expect(mocks.student).not.toHaveBeenCalled();
    mocks.userLimit.mockImplementationOnce(async (_req, res) => { res.status(429).json({ kind: 'rate_limited' }); return true; });
    expect((await call()).body.kind).toBe('rate_limited');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('uses the configured run budget for both device and signed-in user limits', async () => {
    await call();
    const budget = { namespace: 'run', limit: 10, windowMs: 600000 };
    expect(mocks.ipLimit).toHaveBeenCalledWith(expect.any(Object), budget);
    expect(mocks.userLimit).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Object), budget, expect.any(Object));
  });
  it('requires sign-in', async () => {
    mocks.student.mockResolvedValueOnce(null);
    expect((await call()).code).toBe(401);
    expect(fetch).not.toHaveBeenCalled();
  });
  it('returns the exact graceful fallback when either key is absent', async () => {
    delete process.env.JDOODLE_CLIENT_SECRET;
    expect((await call()).body).toEqual({
      notConfigured: true,
      output: "The code runner isn't connected yet.\n\nOnce the JDoodle API keys are added (see api/run.js setup instructions), you'll be able to compile and run your code right here.",
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([
    [{}, 'No source code provided'],
    [{ source_code: ' '.repeat(2) }, 'No source code provided'],
    [{ source_code: 'a'.repeat(10001) }, 'Code exceeds the 10,000 character limit.'],
    [{ source_code: 'x', stdin: 1 }, 'Invalid stdin value.'],
    [{ source_code: 'x', stdin: 'a'.repeat(1001) }, 'stdin exceeds the 1,000 character limit.'],
  ])('rejects invalid input %#', async (body, error) => {
    expect(await call(body)).toMatchObject({ code: 400, body: { error } });
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each(['not-allowed', 'python3', 'constructor', 42])('rejects unsupported language %s without calling the runner', async (language) => {
    expect(await call({ source_code: 'print(1)', language })).toMatchObject({ code: 400, body: { error: 'Unsupported language. Use java, python, c or cpp.' } });
    expect(fetch).not.toHaveBeenCalled();
  });
  it('sends credentials only to JDoodle and defaults a missing language to Java', async () => {
    const res = await call({ source_code: 'hello' });
    expect(res.body).toMatchObject({ output: '1\n', kind: 'success', creditsUsed: 3, creditsRemaining: 17 });
    expect(fetch).toHaveBeenCalledTimes(2);
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('https://api.jdoodle.com/v1/execute');
    expect(JSON.parse(options.body)).toMatchObject({ clientId: 'private-id', clientSecret: 'private-secret', language: 'java', versionIndex: '6' });
    expect(fetch.mock.calls[1][0]).toBe('https://api.jdoodle.com/v1/credit-spent');
    expect(JSON.stringify(res.body)).not.toMatch(/private-id|private-secret/);
  });
  it('recognizes the upstream daily quota without leaking its error', async () => {
    fetch.mockReset().mockResolvedValueOnce(ok({ error: 'Credit limit reached: private-secret' })).mockResolvedValueOnce(ok({ used: 20 }));
    const res = await call();
    expect(res.body).toMatchObject({ kind: 'limit', status: 'Daily limit reached', creditsRemaining: 0 });
    expect(JSON.stringify(res.body)).not.toContain('private-secret');
  });
  it('handles non-quota upstream errors explicitly', async () => {
    fetch.mockReset().mockResolvedValueOnce(ok({ error: 'bad request' })).mockResolvedValueOnce(ok({ used: 1 }));
    expect((await call()).body).toMatchObject({ kind: 'runtime_error', status: 'Error' });
  });
  it('returns an internal error if the upstream response is not JSON', async () => {
    fetch.mockReset().mockResolvedValueOnce({ json: async () => { throw new SyntaxError('invalid JSON'); } }).mockResolvedValueOnce(ok({ used: 2 }));
    const res = await call();
    expect(res).toMatchObject({ code: 500, body: { error: 'Internal error running code. Please try again.' } });
    expect(mocks.capture).toHaveBeenCalledWith(expect.any(SyntaxError), { route: 'run' });
  });
  it('runs Java through Judge0 and preserves the playground reply shape', async () => {
    process.env.RUNNER_PROVIDER = 'judge0';
    process.env.JUDGE0_URL = 'https://judge.example/';
    process.env.JUDGE0_AUTH_TOKEN = 'private-token';
    fetch.mockReset().mockResolvedValueOnce(ok({ token: 'submission-1' })).mockResolvedValueOnce(ok({
      status: { id: 3 }, stdout: Buffer.from('hello\n').toString('base64'), stderr: null,
      compile_output: null, time: '0.01', memory: 1000,
    }));
    const res = await call({ source_code: 'class Main {}', language: 'java' });
    expect(res.body).toMatchObject({ output: 'hello', kind: 'success', creditsUsed: null, creditsRemaining: null });
    expect(fetch).toHaveBeenCalledTimes(2);
    const [url, options] = fetch.mock.calls[0];
    expect(url.href).toContain('/submissions?base64_encoded=true');
    expect(options.headers['X-Auth-Token']).toBe('private-token');
    expect(JSON.parse(options.body).language_id).toBe(62);
    expect(JSON.stringify(res.body)).not.toContain('private-token');
  });
  it('maps Judge0 compiler output to a compile error', async () => {
    process.env.RUNNER_PROVIDER = 'judge0';
    process.env.JUDGE0_URL = 'https://judge.example/';
    fetch.mockReset().mockResolvedValueOnce(ok({ token: 'submission-2' })).mockResolvedValueOnce(ok({
      status: { id: 6 }, stdout: null, stderr: null,
      compile_output: Buffer.from('syntax error').toString('base64'),
    }));
    expect((await call({ source_code: 'bad', language: 'c' })).body).toMatchObject({ output: 'syntax error', kind: 'compile_error' });
  });
});
