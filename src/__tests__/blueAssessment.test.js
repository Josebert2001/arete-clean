import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { applySimulation, blueCases, initialSimulation, learnerCase, scoreBlueReview, validateBlueDraft, validateBlueReport } from '../../api/_lib/blueCases.js';
import { blueRubric } from '../data/blueAssessment.js';

const mocks = vi.hoisted(() => ({ service: { rpc: vi.fn() } }));
vi.mock('../../api/_lib/serviceRole.js', () => ({ serviceRoleClient: () => mocks.service }));
import { handleBlueAssessment } from '../../api/_lib/blueAssessmentHandler.js';

const VERSION = 'blue-case-a-v1';
const ID = '11111111-1111-4111-8111-111111111111';
const validReport = () => ({
  ...Object.fromEntries(['summary', 'findings', 'timeline', 'containment', 'recommendations'].map(key => [key, 'A report section that cites the supplied records, states limitations, and explains a justified next action.'])),
  citations: ['EMAIL-01', 'WEB-01', 'AUTH-01', 'AUTH-02', 'MAIL-01', 'NOTE-01'], assistanceDeclaration: true,
});
function query(data) {
  const q = { then: resolve => Promise.resolve({ data, error: null }).then(resolve), maybeSingle: async () => ({ data, error: null }) };
  for (const method of ['select', 'eq', 'order', 'in', 'neq', 'limit']) q[method] = vi.fn(() => q);
  return q;
}
function response() { return { code: 200, body: null, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } }; }
beforeEach(() => { mocks.service.rpc.mockReset().mockResolvedValue({ data: {}, error: null }); process.env.CAREER_ASSESSMENT_ENABLED = 'true'; });
afterEach(() => { delete process.env.CAREER_ASSESSMENT_ENABLED; });

describe('independent case content and simulator', () => {
  it('does not deliver interpretation keys to learners and keeps variants meaningfully different', () => {
    expect(learnerCase(VERSION)).not.toHaveProperty('key');
    expect(learnerCase('blue-case-b-v1').artifacts[0].text).toContain('purchasing team confirms');
    expect(blueCases[VERSION].key.account).not.toBe(blueCases['blue-case-b-v1'].key.account);
  });
  it('records allowed state changes without changing the original snapshot', () => {
    const original = initialSimulation(VERSION);
    const revoked = applySimulation(VERSION, original, 'revoke_session', 'S-17', 'The audit links this session to the unauthorized rule.');
    const removed = applySimulation(VERSION, revoked, 'remove_rule', 'R-17', 'The owner denies requesting this external forwarding rule.');
    const verified = applySimulation(VERSION, removed, 'verify', '', 'Check that session access is denied and the rule is absent.');
    expect(original.sessions['S-17']).toBe(true);
    expect(verified.sessions['S-17']).toBe(false);
    expect(verified.rules['R-17']).toBe(false);
    expect(verified.sessions['S-APPROVED']).toBe(true);
    expect(verified.verified).toBe(true);
    expect(verified.log[2].observations.sessions['S-17']).toBe(false);
    expect(applySimulation(VERSION, verified, 'remove_rule', 'R-APPROVED', 'This deliberate mistake must remain visible to the reviewer.').verified).toBe(false);
  });
  it('rejects arbitrary commands, outside targets, short reasons and excessive actions', () => {
    expect(() => applySimulation(VERSION, initialSimulation(VERSION), 'exec', 'shell', 'No arbitrary command execution is supported.')).toThrow();
    expect(() => applySimulation(VERSION, initialSimulation(VERSION), 'revoke_session', 'outside', 'An outside target is not part of this case.')).toThrow();
    expect(() => applySimulation(VERSION, initialSimulation(VERSION), 'verify', '', 'yes')).toThrow();
    const full = initialSimulation(VERSION); full.log = Array(30).fill({});
    expect(() => applySimulation(VERSION, full, 'verify', '', 'A thirty-first operation must be rejected.')).toThrow(/limit/);
  });
  it('accepts incomplete private drafts but requires a complete cited independent report', () => {
    expect(validateBlueDraft({ summary: 'Draft', citations: [] }).summary).toBe('Draft');
    expect(validateBlueReport(VERSION, validReport()).citations).toHaveLength(6);
    expect(() => validateBlueReport(VERSION, { ...validReport(), citations: ['EMAIL-01'] })).toThrow(/six/);
    expect(() => validateBlueReport(VERSION, { ...validReport(), citations: ['FORGED'] })).toThrow(/assigned/);
    expect(() => validateBlueReport(VERSION, { ...validReport(), assistanceDeclaration: false })).toThrow(/declaration/);
    expect(() => validateBlueDraft({ summary: 'x'.repeat(2001), citations: [] })).toThrow(/2,000/);
  });
});
describe('human review scoring', () => {
  const notes = Object.fromEntries(blueRubric.map(item => [item.id, 'The submitted report supports this level with cited evidence; improve the stated limitation.']));
  it('calculates weights on the server and passes competent work', () => {
    const result = scoreBlueReview(Object.fromEntries(blueRubric.map(item => [item.id, 3])), notes);
    expect(result).toMatchObject({ score: 75, decision: 'pass' });
  });
  it('requires every critical criterion even with a high total', () => {
    const levels = Object.fromEntries(blueRubric.map(item => [item.id, 4])); levels.containment = 2;
    expect(scoreBlueReview(levels, notes)).toMatchObject({ score: 90, decision: 'needs_revision' });
  });
  it('rejects invented levels and unexplained judgments', () => {
    const levels = Object.fromEntries(blueRubric.map(item => [item.id, 3]));
    expect(() => scoreBlueReview({ ...levels, scope: 8 }, notes)).toThrow();
    expect(() => scoreBlueReview(levels, { ...notes, evidence: 'Good' })).toThrow();
  });
});
describe('assessment API boundaries', () => {
  it('rejects an uninvited learner before creating an assessment', async () => {
    const res = response();
    await handleBlueAssessment({ user: { id: 'owner' }, db: { from: () => query(null) } }, { action: 'assessmentStart' }, res);
    expect(res.code).toBe(403); expect(mocks.service.rpc).not.toHaveBeenCalled();
  });
  it('returns expiry and retry availability without exposing a case interpretation key', async () => {
    const student = { user: { id: 'owner' }, db: { from: table => query(table === 'career_case_attempts' ? [{ id: ID, case_version: VERSION, status: 'in_progress', deadline_at: '2000-01-01T00:00:00Z' }] : null) } };
    const res = response(); await handleBlueAssessment(student, { action: 'assessmentStatus' }, res);
    expect(res.body.attempt.expired).toBe(true);
    expect(res.body.remainingAttempts).toBe(1);
    expect(res.body.case).not.toHaveProperty('key');
  });
  it('keeps independent cases off until the pilot is explicitly enabled', async () => {
    delete process.env.CAREER_ASSESSMENT_ENABLED;
    const res = response(); await handleBlueAssessment({ user: { id: 'owner' } }, { action: 'assessmentStart' }, res);
    expect(res.code).toBe(503); expect(mocks.service.rpc).not.toHaveBeenCalled();
  });
  it('uses the owner-scoped current simulation rather than a forged request state', async () => {
    const attempt = { id: ID, case_version: VERSION, revision: 2, status: 'in_progress', simulation: initialSimulation(VERSION) };
    const q = query(attempt); const student = { user: { id: 'owner' }, db: { from: () => q } };
    const res = response();
    await handleBlueAssessment(student, { action: 'assessmentAction', attemptId: ID, revision: 2, operation: 'verify', reason: 'Verify the currently recorded server state.', simulation: { sessions: { 'S-17': false } } }, res);
    expect(res.code).toBe(200);
    expect(q.eq).toHaveBeenCalledWith('user_id', 'owner');
    expect(mocks.service.rpc).toHaveBeenCalledWith('update_career_simulation', expect.objectContaining({ p_user_id: 'owner', p_revision: 2, p_simulation: expect.objectContaining({ sessions: expect.objectContaining({ 'S-17': true }) }) }));
  });
  it('rejects stale revisions and unavailable owner records before writing', async () => {
    const student = { user: { id: 'owner' }, db: { from: () => query({ id: ID, revision: 4 }) } };
    const stale = response(); await handleBlueAssessment(student, { action: 'assessmentSubmit', attemptId: ID, revision: 3 }, stale);
    expect(stale.code).toBe(409); expect(mocks.service.rpc).not.toHaveBeenCalled();
    student.db.from = () => query(null);
    const hidden = response(); await handleBlueAssessment(student, { action: 'assessmentSubmit', attemptId: ID, revision: 4 }, hidden);
    expect(hidden.code).toBe(404);
  });
  it('publishes only server-calculated totals with the verified reviewer identity', async () => {
    const levels = Object.fromEntries(blueRubric.map(item => [item.id, 3]));
    const feedback = Object.fromEntries(blueRubric.map(item => [item.id, 'A reasoned explanation citing the report and relevant artifact evidence.']));
    const res = response(); await handleBlueAssessment({ user: { id: 'reviewer' } }, { action: 'reviewSubmit', attemptId: ID, levels, feedback, score: 100, reviewer_id: 'forged' }, res);
    expect(mocks.service.rpc).toHaveBeenCalledWith('publish_career_review', expect.objectContaining({ p_reviewer_id: 'reviewer', p_result: { score: 75, decision: 'pass', method: 'human-reviewed synthetic case' } }));
  });
});
