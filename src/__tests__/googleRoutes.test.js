import { beforeAll, beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  student: vi.fn(), ipLimit: vi.fn(), userLimit: vi.fn(), capture: vi.fn(),
  authUrl: vi.fn(), getToken: vi.fn(), service: vi.fn(), calendar: vi.fn(),
}));
vi.mock('../../api/_lib/supabase.js', () => ({ getStudentFromRequest: mocks.student }));
vi.mock('../../api/_lib/serviceRole.js', () => ({ serviceRoleClient: mocks.service }));
vi.mock('../../api/_lib/sentry.js', () => ({ captureApiError: mocks.capture }));
vi.mock('google-auth-library', () => ({
  OAuth2Client: class {
    constructor(id, secret, redirectUri) { this.config = { id, secret, redirectUri }; }
    generateAuthUrl(options) { return mocks.authUrl(this.config, options); }
    getToken(code) { return mocks.getToken(code); }
    setCredentials(credentials) { this.credentials = credentials; }
    on() {}
  },
}));
vi.mock('googleapis', () => ({ google: { calendar: mocks.calendar } }));
vi.mock('../../api/_lib/request-policy.js', () => ({
  PROBE_RATE_LIMIT: { namespace: 'probe', limit: 60, windowMs: 600000 },
  applyApiHeaders: (res) => res.setHeader('Cache-Control', 'no-store'),
  enforceRateLimit: mocks.ipLimit,
  setRateLimitHeaders: (res, value) => res.setHeader('X-RateLimit-Remaining', String(value.remaining)),
  logRequest: vi.fn(), denyIfUserRateLimited: mocks.userLimit,
}));

let connect, callback, status, disconnect, sync, auth;
const EVENT = { title: 'Study', byday: 'MO', start: '09:00', end: '10:00', firstDate: '2026-11-02', untilDate: '2026-12-02' };

function response() {
  return {
    headers: {}, code: 200, body: undefined, location: undefined,
    setHeader(key, value) { this.headers[key] = value; return this; },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
    send(body) { this.body = body; return this; },
    end() { return this; },
    redirect(code, location) { this.code = code; this.location = location; return this; },
  };
}
async function call(handler, { method = 'POST', body = {}, query = {} } = {}) {
  const res = response();
  await handler({ method, body, query, headers: {} }, res);
  return res;
}
function dbWith(result = { data: null, error: null }) {
  const chain = {
    select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue(result),
    delete: vi.fn().mockReturnThis(),
  };
  // Supabase's delete().eq() is the awaited value; status's select().eq().maybeSingle() resolves above.
  chain.eq.mockImplementation(() => ({ ...chain, then: (resolve) => Promise.resolve(result).then(resolve) }));
  return { from: vi.fn().mockReturnValue(chain), chain };
}

beforeAll(async () => {
  process.env.GOOGLE_CLIENT_ID = 'google-id';
  process.env.GOOGLE_CLIENT_SECRET = 'google-secret';
  process.env.GOOGLE_REDIRECT_URI = 'https://arete.example/api/google/callback';
  auth = await import('../../api/_lib/googleAuth.js');
  connect = (await import('../../api/google/connect.js')).default;
  callback = (await import('../../api/google/callback.js')).default;
  status = (await import('../../api/google/status.js')).default;
  disconnect = (await import('../../api/google/disconnect.js')).default;
  sync = (await import('../../api/google/calendar-sync.js')).default;
});
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  mocks.ipLimit.mockReturnValue({ allowed: true, remaining: 5, resetAt: Date.now() + 600000 });
  mocks.userLimit.mockResolvedValue(false);
  mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db: dbWith() });
  mocks.authUrl.mockImplementation((_config, options) => `https://accounts.google.test/consent?state=${encodeURIComponent(options.state)}`);
  mocks.getToken.mockResolvedValue({ tokens: { refresh_token: 'plain-refresh-token' } });
  mocks.service.mockReturnValue({ from: () => ({ upsert: async () => ({ error: null }) }) });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.clearAllMocks(); });

describe('Google connection routes', () => {
  it('requires sign-in for connect, status, disconnect, and sync', async () => {
    mocks.student.mockResolvedValue(null);
    for (const handler of [connect, status, disconnect, sync]) {
      expect((await call(handler)).code).toBe(401);
    }
    expect(fetch).not.toHaveBeenCalled();
  });
  it('connect signs state and requests exactly the declared Calendar scope', async () => {
    const res = await call(connect, { body: { returnTo: '/planner' } });
    expect(res.code).toBe(200);
    expect(mocks.authUrl).toHaveBeenCalledWith(
      { id: 'google-id', secret: 'google-secret', redirectUri: 'https://arete.example/api/google/callback' },
      expect.objectContaining({ access_type: 'offline', prompt: 'consent', scope: auth.GOOGLE_SCOPES }),
    );
    expect(auth.GOOGLE_SCOPES).toEqual(['https://www.googleapis.com/auth/calendar.events']);
    const state = mocks.authUrl.mock.calls[0][1].state;
    expect(auth.verifyState(state)).toEqual({ uid: 'student-1', returnTo: '/planner' });
    expect(res.body.url).toContain(encodeURIComponent(state));
  });
  it('callback rejects missing, tampered, and expired state before exchanging code', async () => {
    const valid = auth.signState({ uid: 'student-1', returnTo: '/planner' });
    const [payload, signature] = valid.split('.');
    const tampered = `${payload}.${signature[0] === 'A' ? 'B' : 'A'}${signature.slice(1)}`;
    const realNow = Date.now();
    for (const state of [undefined, tampered]) {
      expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state } })).location).toBe('/planner?google=error');
    }
    vi.spyOn(Date, 'now').mockReturnValue(realNow + 11 * 60 * 1000);
    expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state: valid } })).location).toBe('/planner?google=error');
    expect(mocks.getToken).not.toHaveBeenCalled();
  });
  it('callback handles Google denial and stores a refresh token encrypted for the signed state user', async () => {
    const state = auth.signState({ uid: 'student-2', returnTo: '/planner' });
    expect((await call(callback, { method: 'GET', query: { state, error: 'access_denied' } })).location).toBe('/planner?google=denied');
    expect(mocks.getToken).not.toHaveBeenCalled();
    const upsert = vi.fn().mockResolvedValue({ error: null });
    mocks.service.mockReturnValue({ from: () => ({ upsert }) });
    const res = await call(callback, { method: 'GET', query: { state, code: 'oauth-code' } });
    expect(mocks.getToken).toHaveBeenCalledWith('oauth-code');
    expect(res.location).toBe('/planner?google=connected');
    const stored = upsert.mock.calls[0][0];
    expect(stored.user_id).toBe('student-2');
    expect(stored.refresh_token).toMatch(/^v1\./);
    expect(stored.refresh_token).not.toContain('plain-refresh-token');
    expect(auth.decryptRefreshToken(stored.refresh_token)).toBe('plain-refresh-token');
  });
  it('status reports the scoped connection without exposing its refresh token', async () => {
    const db = dbWith({ data: { scope: 'calendar.events', connected_at: '2026-11-02', refresh_token: 'secret' }, error: null });
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db });
    const res = await call(status);
    expect(db.from).toHaveBeenCalledWith('google_connections');
    expect(db.chain.select).toHaveBeenCalledWith('scope, connected_at, updated_at');
    expect(db.chain.eq).toHaveBeenCalledWith('user_id', 'student-1');
    expect(res.body).toEqual({ configured: true, connected: true, scope: 'calendar.events', connectedAt: '2026-11-02' });
  });
  // supabase-js returns { error } instead of throwing; that must not read as "not connected".
  it('status reports a database read error explicitly', async () => {
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db: dbWith({ data: null, error: { message: 'database unavailable' } }) });
    expect((await call(status)).code).toBe(500);
  });
  it('disconnect revokes the token and deletes only the signed-in user row', async () => {
    const db = dbWith({ error: null });
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db });
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh & token') } }) }) }) }) });
    const res = await call(disconnect);
    expect(fetch).toHaveBeenCalledWith('https://oauth2.googleapis.com/revoke?token=refresh%20%26%20token', expect.objectContaining({ method: 'POST' }));
    expect(db.chain.delete).toHaveBeenCalled();
    expect(db.chain.eq).toHaveBeenCalledWith('user_id', 'student-1');
    expect(res.body).toEqual({ success: true });
  });
  it('disconnect reports a failed row deletion', async () => {
    mocks.service.mockReturnValue(null);
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db: dbWith({ error: { message: 'denied' } }) });
    expect((await call(disconnect)).code).toBe(500);
  });
});

describe('Google Calendar sync', () => {
  it('rejects empty, oversized, and malformed plans before connecting', async () => {
    for (const events of [[], Array(61).fill(EVENT), [{ ...EVENT, byday: 'XX' }], [{ ...EVENT, start: '25:00' }]]) {
      expect((await call(sync, { body: { events } })).code).toBe(400);
    }
    expect(mocks.service).not.toHaveBeenCalled();
  });
  it('requires an existing connection', async () => {
    mocks.service.mockReturnValue(null);
    expect(await call(sync, { body: { events: [EVENT] } })).toMatchObject({ code: 409, body: { kind: 'not_connected' } });
  });
  it('re-sync replaces a matching secondary calendar and inserts each event once', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const list = vi.fn().mockResolvedValue({ data: { items: [{ id: 'old', summary: 'Areté — Study Plan', primary: false }] } });
    const remove = vi.fn().mockResolvedValue({});
    const insertCalendar = vi.fn().mockResolvedValue({ data: { id: 'new' } });
    const insertEvent = vi.fn().mockResolvedValue({});
    mocks.calendar.mockReturnValue({ calendarList: { list }, calendars: { delete: remove, insert: insertCalendar }, events: { insert: insertEvent } });
    const res = await call(sync, { body: { events: [EVENT] } });
    expect(remove).toHaveBeenCalledWith({ calendarId: 'old' });
    expect(insertCalendar).toHaveBeenCalledTimes(1);
    expect(insertEvent).toHaveBeenCalledTimes(1);
    expect(insertEvent).toHaveBeenCalledWith({ calendarId: 'new', requestBody: expect.objectContaining({ summary: 'Study' }) });
    expect(res.body).toMatchObject({ success: true, eventCount: 1, calendarId: 'new' });
  });
  it('handles Google API errors explicitly', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    mocks.calendar.mockReturnValue({ calendarList: { list: vi.fn().mockRejectedValue(new Error('Google unavailable')) } });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(500);
    expect(mocks.capture).toHaveBeenCalledWith(expect.any(Error), { route: 'google-calendar-sync' });
  });
});
