import { beforeAll, beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { buildGoogleEventResource } from '../../api/_lib/googleEvents.js';

const mocks = vi.hoisted(() => ({
  student: vi.fn(), ipLimit: vi.fn(), userLimit: vi.fn(), capture: vi.fn(), log: vi.fn(),
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
  logRequest: mocks.log, denyIfUserRateLimited: mocks.userLimit,
}));

let connect, callback, status, disconnect, sync, auth;
const EVENT = { title: 'Study', byday: 'MO', start: '09:00', end: '10:00', firstDate: '2026-11-02', untilDate: '2026-12-02' };
const CALENDAR_DESCRIPTION = 'Created by Areté study planner. Re-syncing replaces this calendar.';

describe('Google event calendar dates', () => {
  it('keeps the Tuesday anchor and final day in every server timezone', () => {
    // UTC midnight Tuesday is still Monday in New York. The first Monday on
    // or after this calendar date is the 9th, never the 2nd.
    const resource = buildGoogleEventResource({ ...EVENT, firstDate: '2026-11-03' });
    expect(resource.start.dateTime).toBe('2026-11-09T09:00:00');
    expect(resource.end.dateTime).toBe('2026-11-09T10:00:00');
    expect(resource.recurrence).toEqual(['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261202T225900Z']);
  });
});

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
async function call(handler, { method = 'POST', body = {}, query = {}, headers = {} } = {}) {
  const res = response();
  await handler({ method, body, query, headers }, res);
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
  connect = (await import('../../api/_google/connect.js')).default;
  callback = (await import('../../api/_google/callback.js')).default;
  status = (await import('../../api/_google/status.js')).default;
  disconnect = (await import('../../api/_google/disconnect.js')).default;
  sync = (await import('../../api/_google/calendar-sync.js')).default;
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
  it('uses the configured IP and user budgets for every route', async () => {
    mocks.service.mockReturnValue(null);
    for (const [handler, name, limit, options] of [
      [connect, 'google-connect', 6, {}],
      [callback, 'google-callback', 20, { method: 'GET' }],
      [status, 'google-status', 30, {}],
      [disconnect, 'google-disconnect', 6, {}],
      [sync, 'google-calendar-sync', 6, {}],
    ]) {
      mocks.ipLimit.mockClear();
      mocks.userLimit.mockClear();
      await call(handler, options);
      const budget = { namespace: name, limit, windowMs: 600000 };
      expect(mocks.ipLimit).toHaveBeenCalledWith(expect.any(Object), budget);
      if (handler !== callback) expect(mocks.userLimit).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Object), budget, expect.any(Object));
      else expect(mocks.userLimit).not.toHaveBeenCalled();
    }
    mocks.ipLimit.mockClear();
    await call(connect, { body: { probe: true } });
    expect(mocks.ipLimit).toHaveBeenCalledWith(expect.any(Object), { namespace: 'probe', limit: 60, windowMs: 600000 });
  });
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
    const nonce = res.headers['Set-Cookie'].match(/^arete_google_oauth=([^;]+)/)?.[1];
    expect(nonce).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(res.headers['Set-Cookie']).toContain('HttpOnly; Secure; SameSite=Lax; Path=/api/google; Max-Age=600');
    expect(auth.verifyState(state)).toEqual({ uid: 'student-1', returnTo: '/planner', nonceHash: expect.stringMatching(/^[a-f0-9]{64}$/) });
    expect(auth.verifyState(state).nonceHash).toBe((await import('crypto')).default.createHash('sha256').update(nonce).digest('hex'));
    expect(res.body.url).toContain(encodeURIComponent(state));
  });
  it('callback rejects missing state before exchanging code', async () => {
    expect((await call(callback, { method: 'GET', query: { code: 'oauth-code' } })).location).toBe('/planner?google=error');
    expect(mocks.getToken).not.toHaveBeenCalled();
  });
  it('callback rejects a tampered signature with the matching OAuth cookie and saves nothing', async () => {
    const started = await call(connect);
    const state = mocks.authUrl.mock.calls[0][1].state;
    const cookie = started.headers['Set-Cookie'].split(';')[0];
    const headers = { cookie };
    const upsert = vi.fn().mockResolvedValue({ error: null });
    mocks.service.mockReturnValue({ from: () => ({ upsert }) });
    expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state }, headers })).location).toBe('/planner?google=connected');
    expect(upsert).toHaveBeenCalledTimes(1);

    mocks.getToken.mockClear();
    upsert.mockClear();
    const [payload, signature] = state.split('.');
    const tampered = `${payload}.${signature[0] === 'A' ? 'B' : 'A'}${signature.slice(1)}`;
    expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state: tampered }, headers })).location).toBe('/planner?google=error');
    expect(mocks.getToken).not.toHaveBeenCalled();
    expect(upsert).not.toHaveBeenCalled();
  });
  it('callback rejects expired state with the matching OAuth cookie and saves nothing', async () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-11-03T12:00:00Z'));
      const started = await call(connect);
      const state = mocks.authUrl.mock.calls[0][1].state;
      const headers = { cookie: started.headers['Set-Cookie'].split(';')[0] };
      const upsert = vi.fn().mockResolvedValue({ error: null });
      mocks.service.mockReturnValue({ from: () => ({ upsert }) });
      expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state }, headers })).location).toBe('/planner?google=connected');
      expect(upsert).toHaveBeenCalledTimes(1);

      mocks.getToken.mockClear();
      upsert.mockClear();
      vi.advanceTimersByTime(11 * 60 * 1000);
      expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state }, headers })).location).toBe('/planner?google=error');
      expect(mocks.getToken).not.toHaveBeenCalled();
      expect(upsert).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
  it('rejects a signed state in another browser without the matching cookie and saves nothing', async () => {
    const started = await call(connect);
    const state = mocks.authUrl.mock.calls[0][1].state;
    const wrong = await call(callback, { method: 'GET', query: { code: 'oauth-code', state }, headers: { cookie: 'arete_google_oauth=another-browser' } });
    expect(wrong.location).toBe('/planner?google=error');
    expect(wrong.headers['Set-Cookie']).toContain('Max-Age=0');
    expect(mocks.log).toHaveBeenCalledWith(expect.any(Object), 'google-callback', { denied: 'state_not_bound' });
    expect(mocks.getToken).not.toHaveBeenCalled();
    expect(mocks.service).not.toHaveBeenCalled();
    const missing = await call(callback, { method: 'GET', query: { code: 'oauth-code', state } });
    expect(missing.location).toBe('/planner?google=error');
    expect(mocks.service).not.toHaveBeenCalled();
    expect(started.headers['Set-Cookie']).toContain('Max-Age=600');
  });
  it('callback handles Google denial and stores a refresh token encrypted for the signed state user', async () => {
    const nonce = 'matching-browser-nonce';
    const nonceHash = (await import('crypto')).default.createHash('sha256').update(nonce).digest('hex');
    const state = auth.signState({ uid: 'student-2', returnTo: '/planner', nonceHash });
    const headers = { cookie: `arete_google_oauth=${nonce}` };
    expect((await call(callback, { method: 'GET', query: { state, error: 'access_denied' }, headers })).location).toBe('/planner?google=denied');
    expect(mocks.getToken).not.toHaveBeenCalled();
    const upsert = vi.fn().mockResolvedValue({ error: null });
    mocks.service.mockReturnValue({ from: () => ({ upsert }) });
    const res = await call(callback, { method: 'GET', query: { state, code: 'oauth-code' }, headers });
    expect(res.headers['Set-Cookie']).toBe('arete_google_oauth=; HttpOnly; Secure; SameSite=Lax; Path=/api/google; Max-Age=0');
    expect(mocks.getToken).toHaveBeenCalledWith('oauth-code');
    expect(res.location).toBe('/planner?google=connected');
    const stored = upsert.mock.calls[0][0];
    expect(stored.user_id).toBe('student-2');
    expect(stored.refresh_token).toMatch(/^v1\./);
    expect(stored.refresh_token).not.toContain('plain-refresh-token');
    expect(auth.decryptRefreshToken(stored.refresh_token)).toBe('plain-refresh-token');
  });
  it.each([
    [[], '/planner?google=error'],
    [[{ user_id: 'student-1' }], '/planner?google=connected'],
  ])('callback without a refresh token redirects based on updated rows', async (rows, location) => {
    const started = await call(connect);
    const state = mocks.authUrl.mock.calls[0][1].state;
    const headers = { cookie: started.headers['Set-Cookie'].split(';')[0] };
    mocks.getToken.mockResolvedValue({ tokens: { access_token: 'short-lived' } });
    const select = vi.fn().mockResolvedValue({ data: rows, error: null });
    const eq = vi.fn().mockReturnValue({ select });
    const update = vi.fn().mockReturnValue({ eq });
    mocks.service.mockReturnValue({ from: () => ({ update }) });
    expect((await call(callback, { method: 'GET', query: { code: 'oauth-code', state }, headers })).location).toBe(location);
    expect(update).toHaveBeenCalledTimes(1);
    expect(eq).toHaveBeenCalledWith('user_id', 'student-1');
    expect(select).toHaveBeenCalledWith('user_id');
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
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) }) });
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db: dbWith({ error: { message: 'denied' } }) });
    expect((await call(disconnect)).code).toBe(500);
  });
  it('disconnect leaves the row untouched when the service-role client is unavailable', async () => {
    const db = dbWith();
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db });
    mocks.service.mockReturnValue(null);
    expect(await call(disconnect)).toMatchObject({ code: 500, body: { error: 'Could not read your Google connection' } });
    expect(fetch).not.toHaveBeenCalled();
    expect(db.chain.delete).not.toHaveBeenCalled();
  });
  it('disconnect does not revoke or delete when token lookup returns an error', async () => {
    const db = dbWith();
    mocks.student.mockResolvedValue({ user: { id: 'student-1' }, db });
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: { message: 'unavailable' } }) }) }) }) });
    expect(await call(disconnect)).toMatchObject({ code: 500, body: { error: 'Could not read your Google connection' } });
    expect(fetch).not.toHaveBeenCalled();
    expect(db.chain.delete).not.toHaveBeenCalled();
  });
});

describe('Google Calendar sync', () => {
  it('returns 500 when the connection lookup returns an error', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: { message: 'unavailable' } }) }) }) }) });
    expect(await call(sync, { body: { events: [EVENT] } })).toMatchObject({ code: 500, body: { error: 'Could not read your Google connection' } });
    expect(mocks.calendar).not.toHaveBeenCalled();
  });
  it('rejects empty, oversized, and malformed plans before connecting', async () => {
    for (const events of [[], Array(61).fill(EVENT), [{ ...EVENT, byday: 'XX' }], [{ ...EVENT, start: '25:00' }]]) {
      expect((await call(sync, { body: { events } })).code).toBe(400);
    }
    expect(mocks.service).not.toHaveBeenCalled();
  });
  it('reports unavailable service-role access as a connection read error', async () => {
    mocks.service.mockReturnValue(null);
    expect(await call(sync, { body: { events: [EVENT] } })).toMatchObject({ code: 500, body: { error: 'Could not read your Google connection' } });
    expect(mocks.calendar).not.toHaveBeenCalled();
  });
  it('requires an existing connection when the token row is absent', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) }) });
    expect(await call(sync, { body: { events: [EVENT] } })).toMatchObject({ code: 409, body: { kind: 'not_connected' } });
  });
  it('re-sync replaces a matching secondary calendar and inserts each event once', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const list = vi.fn().mockResolvedValue({ data: { items: [{ id: 'old', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false }] } });
    const remove = vi.fn().mockResolvedValue({});
    const insertCalendar = vi.fn().mockResolvedValue({ data: { id: 'new' } });
    const insertEvent = vi.fn().mockResolvedValue({});
    mocks.calendar.mockReturnValue({ calendarList: { list }, calendars: { delete: remove, insert: insertCalendar }, events: { insert: insertEvent } });
    const event = { ...EVENT, title: 'Midnight study', start: '00:15', end: '01:15', firstDate: '2026-11-03', untilDate: '2026-12-02', location: 'Library', description: 'Read chapter 2', alarmMinutes: 15 };
    const res = await call(sync, { body: { events: [event] } });
    expect(remove).toHaveBeenCalledWith({ calendarId: 'old' });
    expect(insertCalendar).toHaveBeenCalledTimes(1);
    expect(insertCalendar).toHaveBeenCalledWith({ requestBody: {
      summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, timeZone: 'Africa/Lagos',
    } });
    expect(insertEvent).toHaveBeenCalledTimes(1);
    expect(insertEvent).toHaveBeenCalledWith({ calendarId: 'new', requestBody: {
      summary: 'Midnight study',
      start: { dateTime: '2026-11-09T00:15:00', timeZone: 'Africa/Lagos' },
      end: { dateTime: '2026-11-09T01:15:00', timeZone: 'Africa/Lagos' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261202T225900Z'],
      location: 'Library', description: 'Read chapter 2',
      reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 15 }] },
    } });
    expect(res.body).toMatchObject({ success: true, eventCount: 1, calendarId: 'new' });
  });
  it('leaves same-named calendars without the exact ownership marker alone', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const remove = vi.fn();
    const insert = vi.fn().mockResolvedValue({ data: { id: 'new' } });
    mocks.calendar.mockReturnValue({
      calendarList: { list: vi.fn().mockResolvedValue({ data: { items: [
        { id: 'student-calendar', summary: 'Areté — Study Plan', primary: false },
        { id: 'different-description', summary: 'Areté — Study Plan', description: 'Student notes', primary: false },
      ] } }) },
      calendars: { delete: remove, insert }, events: { insert: vi.fn() },
    });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(200);
    expect(remove).not.toHaveBeenCalled();
    expect(insert).toHaveBeenCalledWith({ requestBody: {
      summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, timeZone: 'Africa/Lagos',
    } });
  });
  it('deletes every matching secondary calendar on one page', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const list = vi.fn().mockResolvedValue({ data: { items: [
      { id: 'old-1', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false },
      { id: 'primary', summary: 'Areté — Study Plan', primary: true },
      { id: 'other', summary: 'Other', primary: false },
      { id: 'old-2', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false },
    ] } });
    const remove = vi.fn().mockResolvedValue({});
    const insert = vi.fn().mockResolvedValue({ data: { id: 'new' } });
    mocks.calendar.mockReturnValue({ calendarList: { list }, calendars: { delete: remove, insert }, events: { insert: vi.fn() } });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(200);
    expect(remove.mock.calls.map(([args]) => args.calendarId)).toEqual(['old-1', 'old-2']);
    expect(insert).toHaveBeenCalledTimes(1);
  });
  it('finds a matching secondary calendar on the second calendarList page', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const list = vi.fn()
      .mockResolvedValueOnce({ data: { items: [{ id: 'other', summary: 'Other' }], nextPageToken: 'next-page' } })
      .mockResolvedValueOnce({ data: { items: [{ id: 'old-2', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false }] } });
    const remove = vi.fn().mockResolvedValue({});
    const insert = vi.fn().mockResolvedValue({ data: { id: 'new' } });
    mocks.calendar.mockReturnValue({ calendarList: { list }, calendars: { delete: remove, insert }, events: { insert: vi.fn() } });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(200);
    expect(list).toHaveBeenNthCalledWith(1, { maxResults: 250 });
    expect(list).toHaveBeenNthCalledWith(2, { maxResults: 250, pageToken: 'next-page' });
    expect(remove).toHaveBeenCalledExactlyOnceWith({ calendarId: 'old-2' });
    expect(insert).toHaveBeenCalledTimes(1);
  });
  it('stops before creating a replacement when the second stale-calendar delete fails', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const remove = vi.fn().mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('delete failed'));
    const insert = vi.fn();
    mocks.calendar.mockReturnValue({
      calendarList: { list: vi.fn().mockResolvedValue({ data: { items: [
        { id: 'old-1', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false },
        { id: 'old-2', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false },
      ] } }) },
      calendars: { delete: remove, insert },
    });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(500);
    expect(remove.mock.calls.map(([args]) => args.calendarId)).toEqual(['old-1', 'old-2']);
    expect(insert).not.toHaveBeenCalled();
  });
  it('handles Google API errors explicitly', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    mocks.calendar.mockReturnValue({ calendarList: { list: vi.fn().mockRejectedValue(new Error('Google unavailable')) } });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(500);
    expect(mocks.capture).toHaveBeenCalledWith(expect.any(Error), { route: 'google-calendar-sync' });
  });
  it('stops before creating a duplicate if deleting the stale calendar fails', async () => {
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) }) }) });
    const insert = vi.fn();
    mocks.calendar.mockReturnValue({
      calendarList: { list: vi.fn().mockResolvedValue({ data: { items: [{ id: 'old', summary: 'Areté — Study Plan', description: CALENDAR_DESCRIPTION, primary: false }] } }) },
      calendars: { delete: vi.fn().mockRejectedValue(new Error('delete failed')), insert },
    });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(500);
    expect(insert).not.toHaveBeenCalled();
  });
  it('returns 500 if invalid_grant cleanup fails', async () => {
    const select = () => ({ eq: () => ({ maybeSingle: async () => ({ data: { refresh_token: auth.encryptRefreshToken('refresh-token') } }) }) });
    const remove = vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: { message: 'delete failed' } }) });
    mocks.service.mockReturnValue({ from: () => ({ select, delete: remove }) });
    mocks.calendar.mockReturnValue({ calendarList: { list: vi.fn().mockRejectedValue(new Error('invalid_grant')) } });
    expect((await call(sync, { body: { events: [EVENT] } })).code).toBe(500);
    expect(remove).toHaveBeenCalled();
  });
});

// The five handlers above are deployed as one function, api/google/[action].js
// (Vercel Hobby allows 12 functions per deployment). These pin the routing.
describe('Google router', () => {
  let router, actionFromRequest;
  beforeAll(async () => {
    ({ default: router, actionFromRequest } = await import('../../api/google/[action].js'));
  });
  async function route(url, options = {}) {
    const res = response();
    await router({ method: 'POST', body: {}, query: {}, headers: {}, url, ...options }, res);
    return res;
  }

  it('reads the action from the path, ignoring the query string', () => {
    expect(actionFromRequest({ url: '/api/google/status' })).toBe('status');
    expect(actionFromRequest({ url: '/api/google/calendar-sync/' })).toBe('calendar-sync');
    expect(actionFromRequest({ url: '/api/google/callback?code=x&state=y&action=connect' })).toBe('callback');
    expect(actionFromRequest({ url: '/api/google/a/b' })).toBeNull();
    expect(actionFromRequest({ url: '/api/google/%E0%A4%A' })).toBeNull();
    expect(actionFromRequest({})).toBeNull();
  });

  it('dispatches each public URL to its handler', async () => {
    expect((await route('/api/google/status')).body).toEqual({ configured: true, connected: false, scope: null, connectedAt: null });
    expect((await route('/api/google/connect', { body: { probe: true } })).body).toEqual({ configured: true });
    mocks.service.mockReturnValue({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }) }) }) });
    expect((await route('/api/google/disconnect')).body).toEqual({ success: true });
    expect((await route('/api/google/calendar-sync', { body: { events: [] } })).code).toBe(400);
    const cb = await route('/api/google/callback?state=bad', { method: 'GET', query: { state: 'bad' } });
    expect(cb.location).toBe('/planner?google=error');
  });

  it('answers 404 for unknown or inherited action names', async () => {
    for (const url of ['/api/google/nope', '/api/google/constructor', '/api/google/__proto__', '/api/google/', '/api/google/status/extra']) {
      const res = await route(url);
      expect(res.code).toBe(404);
      expect(res.body).toEqual({ error: 'Not found' });
    }
  });
});
