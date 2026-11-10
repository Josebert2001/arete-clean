import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { placementQuestions, PLACEMENT_VERSION } from '../data/careers.js';
import { blueRubric } from '../data/blueAssessment.js';

const mocks = vi.hoisted(() => ({
  student: vi.fn(),
  configured: vi.fn(),
  service: null,
  capture: vi.fn(),
  deleteHandler: vi.fn(),
}));
vi.mock('../../api/_lib/supabase.js', () => ({ getStudentFromRequest: mocks.student }));
vi.mock('../../api/_lib/serviceRole.js', () => ({
  serviceRoleConfigured: mocks.configured,
  serviceRoleClient: () => mocks.service,
}));
vi.mock('../../api/_lib/sentry.js', () => ({ captureApiError: mocks.capture }));
vi.mock('../../api/_lib/accountDelete.js', () => ({ default: mocks.deleteHandler }));
vi.mock('../../api/_lib/request-policy.js', () => ({
  applyApiHeaders: vi.fn(),
  setRateLimitHeaders: vi.fn(),
  enforceRateLimit: () => ({ allowed: true }),
  denyIfUserRateLimited: async () => false,
}));
import handler from '../../api/_lib/careerHandler.js';
import accountRouter from '../../api/account/[action].js';

const ATTEMPT = 'bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb';
function response() {
  return {
    code: 200,
    body: null,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(c) {
      this.code = c;
      return this;
    },
    json(b) {
      this.body = b;
      return this;
    },
    end() {
      return this;
    },
  };
}
function query(data = null, error = null) {
  const result = { data, error };
  const builder = {
    then: (resolve) => Promise.resolve(result).then(resolve),
    maybeSingle: async () => result,
  };
  for (const method of ['select', 'eq', 'update', 'upsert']) builder[method] = vi.fn(() => builder);
  return builder;
}
async function call(body = { action: 'status' }, method = 'POST') {
  const res = response();
  await handler({ method, headers: {}, body }, res);
  return res;
}
beforeEach(() => {
  vi.clearAllMocks();
  process.env.CAREER_PLACEMENT_ENABLED = 'true';
  mocks.configured.mockReturnValue(true);
  mocks.service = {
    from: vi.fn(() => query({ chosen_path: 'blue' })),
    rpc: vi.fn(async () => ({ data: { chosen_path: 'blue' }, error: null })),
  };
  mocks.student.mockResolvedValue({
    user: { id: 'verified-owner' },
    db: { from: vi.fn((name) => query(name === 'career_profiles' ? null : [])) },
  });
});
afterEach(() => {
  delete process.env.CAREER_PLACEMENT_ENABLED;
  delete process.env.CAREER_ASSESSMENT_ENABLED;
});

describe('career API authority', () => {
  it('requires verified identity and a supported HTTP method', async () => {
    expect((await call({}, 'GET')).code).toBe(405);
    mocks.student.mockResolvedValue(null);
    expect((await call()).code).toBe(401);
    expect(mocks.service.rpc).not.toHaveBeenCalled();
  });
  it('fails closed when disabled or the server writer is absent', async () => {
    delete process.env.CAREER_PLACEMENT_ENABLED;
    const disabled = await call();
    expect(disabled.code).toBe(503);
    expect(disabled.body.notConfigured).toBe(true);
    process.env.CAREER_PLACEMENT_ENABLED = 'true';
    mocks.configured.mockReturnValue(false);
    expect((await call()).code).toBe(503);
    expect(mocks.service.from).not.toHaveBeenCalled();
  });
  it('scopes status reads to the verified owner and disables response caching', async () => {
    const student = await mocks.student();
    const res = await call();
    expect(res.code).toBe(200);
    expect(res.headers['Cache-Control']).toBe('private, no-store');
    for (const result of student.db.from.mock.results)
      expect(result.value.eq).toHaveBeenCalledWith('user_id', 'verified-owner');
  });
  it.each([
    'assessmentStatus',
    'assessmentStart',
    'assessmentAction',
    'assessmentDraft',
    'assessmentSubmit',
    'reviewQueue',
    'reviewSubmit',
  ])('keeps %s disabled without touching assessment tables', async (action) => {
    process.env.CAREER_ASSESSMENT_ENABLED = 'false';
    const student = await mocks.student();
    const res = await call({ action });
    expect(res.code).toBe(503);
    expect(student.db.from).not.toHaveBeenCalled();
    expect(mocks.service.from).not.toHaveBeenCalled();
    expect(mocks.service.rpc).not.toHaveBeenCalled();
  });
  it.each([undefined, 'false', 'true'])(
    'reports assessment availability from the server flag: %s',
    async (flag) => {
      if (flag === undefined) delete process.env.CAREER_ASSESSMENT_ENABLED;
      else process.env.CAREER_ASSESSMENT_ENABLED = flag;
      const res = await call();
      expect(res.body.assessmentEnabled).toBe(flag === 'true');
      const student = await mocks.student();
      expect(student.db.from.mock.calls.map(([table]) => table)).toEqual([
        'career_profiles',
        'career_practice_notes',
      ]);
    },
  );
  it('computes the recommendation rather than accepting a supplied score or owner', async () => {
    const answers = Object.fromEntries(
      placementQuestions.map((q) => [
        q.id,
        q.kind === 'interest' ? (q.path === 'blue' ? 4 : 0) : 3,
      ]),
    );
    const res = await call({
      action: 'submit',
      version: PLACEMENT_VERSION,
      attemptId: ATTEMPT,
      answers,
      user_id: 'another-owner',
      result: { recommendedPath: 'red', score: 100 },
    });
    expect(res.code).toBe(200);
    expect(mocks.service.rpc).toHaveBeenCalledWith(
      'record_career_placement',
      expect.objectContaining({
        p_user_id: 'verified-owner',
        p_attempt_id: ATTEMPT,
        p_questions: placementQuestions,
        p_result: expect.objectContaining({ recommendedPath: 'blue', needsBridge: true }),
      }),
    );
  });
  it('rejects invalid answers and attempt IDs before writing', async () => {
    expect(
      (
        await call({
          action: 'submit',
          version: PLACEMENT_VERSION,
          attemptId: ATTEMPT,
          answers: {},
        })
      ).code,
    ).toBe(400);
    expect((await call({ action: 'submit', attemptId: 'not-a-uuid' })).code).toBe(400);
    expect(mocks.service.rpc).not.toHaveBeenCalled();
  });
  it('rejects stale-account work if token refresh resolves to a different account', async () => {
    expect(
      (
        await call({
          action: 'practice',
          expectedUserId: 'old-owner',
          path: 'blue',
          notes: 'Old account work',
          reflected: false,
        })
      ).code,
    ).toBe(409);
    expect(mocks.service.from).not.toHaveBeenCalled();
    expect(mocks.service.rpc).not.toHaveBeenCalled();
  });
  it('preserves database denial of an unassigned review instead of publishing a result', async () => {
    process.env.CAREER_ASSESSMENT_ENABLED = 'true';
    mocks.service.rpc.mockResolvedValue({
      data: null,
      error: { code: '42501', message: 'Review not assigned' },
    });
    const levels = Object.fromEntries(blueRubric.map((item) => [item.id, 3]));
    const feedback = Object.fromEntries(
      blueRubric.map((item) => [
        item.id,
        'A detailed criterion explanation with citations and a practical improvement.',
      ]),
    );
    const res = await call({ action: 'reviewSubmit', attemptId: ATTEMPT, levels, feedback });
    expect(res.code).toBe(403);
    expect(res.body).not.toHaveProperty('review');
  });
  it('only permits entry paths and guards path changes against stale attempts', async () => {
    expect((await call({ action: 'choose', path: 'purple', attemptId: ATTEMPT })).code).toBe(400);
    const q = query(null);
    mocks.service.from.mockReturnValue(q);
    expect((await call({ action: 'choose', path: 'red', attemptId: ATTEMPT })).code).toBe(409);
    expect(q.eq).toHaveBeenCalledWith('user_id', 'verified-owner');
    expect(q.eq).toHaveBeenCalledWith('attempt_id', ATTEMPT);
  });
  it('bounds private practice notes and derives their owner', async () => {
    expect(
      (await call({ action: 'practice', path: 'blue', notes: 'x'.repeat(6001), reflected: true }))
        .code,
    ).toBe(400);
    const q = query();
    mocks.service.from.mockReturnValue(q);
    expect(
      (
        await call({
          action: 'practice',
          path: 'blue',
          notes: 'AUTH-02 supports further investigation.',
          reflected: true,
          user_id: 'forged',
        })
      ).body.saved,
    ).toBe(true);
    expect(q.upsert).toHaveBeenCalledWith(expect.objectContaining({ user_id: 'verified-owner' }), {
      onConflict: 'user_id,path',
    });
  });
  it('accepts a valid Unicode reflection while bounding the entire request', async () => {
    expect(
      (await call({ action: 'practice', path: 'blue', notes: 'あ'.repeat(6000), reflected: false }))
        .code,
    ).toBe(200);
    expect(
      (
        await call({
          action: 'practice',
          path: 'blue',
          notes: 'A reflection',
          reflected: false,
          extra: 'x'.repeat(33000),
        })
      ).code,
    ).toBe(400);
  });
  it.each(['42P01', 'PGRST205', 'XX000'])(
    'reports a real status database error (%s) as a failure, not a disabled deployment',
    async (code) => {
      const student = await mocks.student();
      const error = { code, message: 'private database detail' };
      student.db.from.mockReturnValue(query(null, error));
      const res = await call();
      expect(res.code).toBe(500);
      expect(res.body).toEqual({ error: 'Could not load your career roadmap. Please try again.' });
      expect(res.body).not.toHaveProperty('notConfigured');
      expect(JSON.stringify(res.body)).not.toContain('private database detail');
      expect(mocks.capture).toHaveBeenCalledWith(error, { route: 'career', action: 'status' });
    },
  );
  it('reports a failed submission without claiming the deployment is disabled or leaking database details', async () => {
    const error = { code: 'XX000', message: 'private database detail' };
    mocks.service.rpc.mockResolvedValue({ data: null, error });
    const answers = Object.fromEntries(
      placementQuestions.map((q) => [q.id, q.kind === 'interest' ? 2 : 3]),
    );
    const res = await call({
      action: 'submit',
      version: PLACEMENT_VERSION,
      attemptId: ATTEMPT,
      answers,
    });
    expect(res.code).toBe(500);
    expect(res.body).toEqual({ error: 'Could not save your career work. Please try again.' });
    expect(mocks.capture).toHaveBeenCalledWith(error, { route: 'career', action: 'submit' });
  });
  it('preserves the deletion route and rejects unknown account operations', async () => {
    const req = { method: 'POST', url: '/api/account/delete', query: { action: 'delete' } };
    const res = response();
    await accountRouter(req, res);
    expect(mocks.deleteHandler).toHaveBeenCalledWith(req, res);
    const other = response();
    await accountRouter({ url: '/api/account/unknown', query: { action: 'delete' } }, other);
    expect(other.code).toBe(404);
    const career = response();
    await accountRouter(
      {
        method: 'GET',
        url: '/api/account/career?action=delete',
        query: { action: 'delete' },
        headers: {},
      },
      career,
    );
    expect(career.code).toBe(405);
    expect(mocks.deleteHandler).toHaveBeenCalledTimes(1);
  });
});
