import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ student: vi.fn(), configured: vi.fn(), client: vi.fn(), token: vi.fn(), capture: vi.fn() }));
vi.mock('../../api/_lib/sentry.js', () => ({ captureApiError: mocks.capture }));
vi.mock('../../api/_lib/supabase.js', () => ({ getStudentFromRequest: mocks.student }));
vi.mock('../../api/_lib/serviceRole.js', () => ({ serviceRoleConfigured: mocks.configured, serviceRoleClient: mocks.client }));
vi.mock('../../api/_lib/googleAuth.js', () => ({ getRefreshTokenForUser: mocks.token }));
vi.mock('../../api/_lib/request-policy.js', async () => ({
  ...await vi.importActual('../../api/_lib/request-policy.js'),
  enforceRateLimit: () => ({ allowed: true, remaining: 1 }),
  denyIfUserRateLimited: async () => false,
}));
import handler from '../../api/_lib/accountDelete.js';

function response() {
  return { code: null, body: null, setHeader() { return this; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, end() { return this; } };
}
async function call(body = { confirm: 'DELETE' }) {
  const res = response();
  await handler({ method: 'POST', headers: {}, body }, res);
  return res;
}
let role;
let remove;
let deleteUser;
beforeEach(() => {
  role = null;
  remove = vi.fn(async () => ({ error: null }));
  deleteUser = vi.fn(async () => ({ error: null }));
  mocks.student.mockResolvedValue({ user: { id: 'student-1', email: 'ada@example.com' } });
  mocks.configured.mockReturnValue(true);
  mocks.token.mockResolvedValue(null);
  mocks.client.mockImplementation(() => ({
    storage: { from: () => ({ remove }) }, auth: { admin: { deleteUser } },
    from(name) {
      const q = {
        mode: 'select',
        select() { if (q.mode === 'delete') return Promise.resolve({ data: [{ file_path: 'course/file.pdf' }], error: null }); return q; },
        delete() { q.mode = 'delete'; return q; }, eq() { return q; },
        maybeSingle: async () => ({ data: name === 'user_roles' ? role : null, error: null }),
        limit: async () => ({ data: [], error: null }),
        then(resolve) { return Promise.resolve({ data: null, error: null }).then(resolve); },
      };
      return q;
    },
  }));
});
afterEach(() => vi.clearAllMocks());

describe('account deletion', () => {
  it('requires typed confirmation', async () => {
    expect((await call({ confirm: 'delete' })).code).toBe(400);
    expect(mocks.client).not.toHaveBeenCalled();
  });
  it('refuses staff accounts', async () => {
    role = { role: 'lecturer' };
    expect((await call()).code).toBe(409);
    expect(deleteUser).not.toHaveBeenCalled();
  });
  it('removes uploaded bytes and then the auth user', async () => {
    expect((await call()).body).toEqual({ deleted: true });
    expect(remove).toHaveBeenCalledWith(['course/file.pdf']);
    expect(deleteUser).toHaveBeenCalledWith('student-1');
  });
  it('reports a failed deletion to Sentry, not just the console', async () => {
    const failure = new Error('auth admin unavailable');
    deleteUser.mockResolvedValue({ error: failure });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect((await call()).code).toBe(500);
    expect(mocks.capture).toHaveBeenCalledWith(failure, { route: 'account-delete' });
  });
});
