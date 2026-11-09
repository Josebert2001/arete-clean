import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ configured: vi.fn(), client: vi.fn() }));
vi.mock('../../api/_lib/serviceRole.js', () => ({ serviceRoleConfigured: mocks.configured, serviceRoleClient: mocks.client }));
import handler from '../../api/cron/sweep-materials.js';

const oldSecret = process.env.CRON_SECRET;
let list;
let remove;
function response() {
  return { code: null, body: null, setHeader() { return this; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, end() { return this; } };
}
async function call(auth = 'Bearer secret') {
  const res = response();
  await handler({ method: 'GET', headers: { authorization: auth, 'x-real-ip': '192.0.2.210' } }, res);
  return res;
}
beforeEach(() => {
  process.env.CRON_SECRET = 'secret';
  mocks.configured.mockReturnValue(true);
  list = vi.fn(async folder => folder === ''
    ? { data: [{ name: 'cyb-224', id: null }], error: null }
    : { data: [
      { id: '1', name: 'orphan.pdf', created_at: '2020-01-01T00:00:00Z' },
      { id: '2', name: 'kept.pdf', created_at: '2020-01-01T00:00:00Z' },
      { id: '3', name: 'fresh.pdf', created_at: new Date().toISOString() },
    ], error: null });
  remove = vi.fn(async () => ({ error: null }));
  mocks.client.mockReturnValue({
    storage: { from: () => ({ list, remove }) },
    from: () => ({ select: () => ({ in: async () => ({ data: [{ file_path: 'cyb-224/kept.pdf' }], error: null }) }) }),
  });
});
afterEach(() => {
  if (oldSecret === undefined) delete process.env.CRON_SECRET; else process.env.CRON_SECRET = oldSecret;
  vi.clearAllMocks();
});

describe('material orphan sweep', () => {
  it('requires the cron secret', async () => {
    expect((await call('Bearer wrong')).code).toBe(401);
    expect(mocks.client).not.toHaveBeenCalled();
  });
  it('returns 503 when secrets are unset', async () => {
    delete process.env.CRON_SECRET;
    expect((await call()).code).toBe(503);
  });
  it('removes only old unregistered objects', async () => {
    const res = await call();
    expect(res.code).toBe(200);
    expect(res.body).toEqual({ scanned: 3, removed: 1 });
    expect(remove).toHaveBeenCalledWith(['cyb-224/orphan.pdf']);
  });
});
