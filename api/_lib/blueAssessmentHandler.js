import { randomInt } from 'node:crypto';
import { blueCases, learnerCase, initialSimulation, applySimulation, validateBlueReport, validateBlueDraft, scoreBlueReview } from './blueCases.js';
import { serviceRoleClient } from './serviceRole.js';

export const BLUE_ACTIONS = ['assessmentStatus', 'assessmentStart', 'assessmentAction', 'assessmentDraft', 'assessmentSubmit', 'reviewQueue', 'reviewSubmit'];
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
async function checked(promise) { const result = await promise; if (result.error) throw result.error; return result.data; }

export async function handleBlueAssessment(student, body, res) {
  if (process.env.CAREER_ASSESSMENT_ENABLED !== 'true') return res.status(503).json({ error: 'Independent investigations are being prepared. Starter reflections remain available.' });
  const userId = student.user.id;
  const db = serviceRoleClient();
  const read = student.db;
  if (body.action === 'assessmentStatus') {
    const attempts = await checked(read.from('career_case_attempts').select('*').eq('user_id', userId).order('created_at', { ascending: false }));
    const attempt = attempts?.[0] ?? null;
    const [submission, review] = attempt ? await Promise.all([
      checked(read.from('career_case_submissions').select('*').eq('user_id', userId).eq('attempt_id', attempt.id).maybeSingle()),
      checked(read.from('career_case_reviews').select('*').eq('user_id', userId).eq('attempt_id', attempt.id).maybeSingle()),
    ]) : [null, null];
    const visibleAttempt = attempt ? { ...attempt, expired: attempt.status === 'in_progress' && new Date(attempt.deadline_at).getTime() <= Date.now() } : null;
    const invitation = await checked(read.from('career_case_invitations').select('expires_at').eq('user_id', userId).maybeSingle());
    return res.status(200).json({ attempt: visibleAttempt, case: attempt ? learnerCase(attempt.case_version) : null, submission, review, eligible: Boolean(invitation && new Date(invitation.expires_at).getTime() > Date.now()), remainingAttempts: Math.max(0, 2 - (attempts?.length || 0)) });
  }
  if (body.action === 'assessmentStart') {
    const invitation = await checked(read.from('career_case_invitations').select('expires_at').eq('user_id', userId).maybeSingle());
    if (!invitation || new Date(invitation.expires_at).getTime() <= Date.now()) return res.status(403).json({ error: 'An active pilot invitation is required to start an assessed investigation. Starter practice remains available.' });
    const profile = await checked(read.from('career_profiles').select('chosen_path').eq('user_id', userId).maybeSingle());
    if (profile?.chosen_path !== 'blue') return res.status(400).json({ error: 'Choose the blue-team direction on your roadmap before starting this investigation.' });
    const past = await checked(read.from('career_case_attempts').select('case_version, status').eq('user_id', userId));
    if ((past ?? []).some(attempt => attempt.status === 'submitted')) return res.status(409).json({ error: 'Wait for the submitted investigation to be reviewed before reassessment.' });
    const available = Object.keys(blueCases).filter(version => !(past ?? []).some(attempt => attempt.case_version === version));
    // The transaction returns an existing active attempt even if no new variant remains.
    const version = available.length ? available[randomInt(available.length)] : Object.keys(blueCases)[0];
    const attempt = await checked(db.rpc('start_career_case', { p_user_id: userId, p_case_version: version, p_simulation: initialSimulation(version) }));
    return res.status(200).json({ attempt, case: learnerCase(attempt.case_version) });
  }
  if (body.action === 'reviewQueue') {
    const assignments = await checked(read.from('career_review_assignments').select('attempt_id').eq('reviewer_id', userId).limit(50));
    const ids = (assignments ?? []).map(row => row.attempt_id);
    if (!ids.length) return res.status(200).json({ queue: [] });
    const [attempts, submissions, reviews] = await Promise.all([
      checked(read.from('career_case_attempts').select('*').in('id', ids).neq('user_id', userId)),
      checked(read.from('career_case_submissions').select('*').in('attempt_id', ids)),
      checked(read.from('career_case_reviews').select('*').eq('reviewer_id', userId).in('attempt_id', ids)),
    ]);
    return res.status(200).json({ queue: (attempts ?? []).filter(attempt => submissions.some(sub => sub.attempt_id === attempt.id) && (attempt.status === 'submitted' || reviews.some(review => review.attempt_id === attempt.id))).map(attempt => ({
      attempt, case: learnerCase(attempt.case_version), interpretation: blueCases[attempt.case_version].key,
      submission: submissions.find(sub => sub.attempt_id === attempt.id), review: reviews.find(review => review.attempt_id === attempt.id) ?? null,
    })) });
  }
  if (!UUID.test(body.attemptId ?? '')) return res.status(400).json({ error: 'Invalid investigation identifier.' });
  if (body.action === 'reviewSubmit') {
    let scored;
    try { scored = scoreBlueReview(body.levels, body.feedback); }
    catch (err) { return res.status(400).json({ error: err.message }); }
    // The transaction rechecks assignment, submission status, and self-review.
    const review = await checked(db.rpc('publish_career_review', {
      p_reviewer_id: userId, p_attempt_id: body.attemptId, p_levels: scored.levels,
      p_feedback: scored.feedback, p_result: { score: scored.score, decision: scored.decision, method: 'human-reviewed synthetic case' },
    }));
    return res.status(200).json({ review });
  }
  const attempt = await checked(read.from('career_case_attempts').select('*').eq('id', body.attemptId).eq('user_id', userId).maybeSingle());
  if (!attempt) return res.status(404).json({ error: 'Investigation not found.' });
  if (!Number.isInteger(body.revision) || body.revision !== attempt.revision) return res.status(409).json({ error: 'This investigation changed in another tab. Reload it before saving.' });
  if (body.action === 'assessmentAction') {
    if (attempt.status !== 'in_progress') return res.status(409).json({ error: 'This investigation is no longer editable.' });
    let simulation;
    try { simulation = applySimulation(attempt.case_version, attempt.simulation, body.operation, body.target, body.reason); }
    catch (err) { return res.status(400).json({ error: err.message }); }
    const updated = await checked(db.rpc('update_career_simulation', { p_user_id: userId, p_attempt_id: attempt.id, p_revision: attempt.revision, p_simulation: simulation }));
    return res.status(200).json({ attempt: updated });
  }
  if (body.action === 'assessmentDraft') {
    let draft;
    try { draft = validateBlueDraft(body.report); }
    catch (err) { return res.status(400).json({ error: err.message }); }
    const updated = await checked(db.rpc('save_career_case_draft', { p_user_id: userId, p_attempt_id: attempt.id, p_revision: attempt.revision, p_draft: draft }));
    return res.status(200).json({ attempt: updated });
  }
  let report;
  try { report = validateBlueReport(attempt.case_version, body.report); }
  catch (err) { return res.status(400).json({ error: err.message }); }
  const submission = await checked(db.rpc('submit_career_case', { p_user_id: userId, p_attempt_id: attempt.id, p_revision: attempt.revision, p_report: report }));
  return res.status(200).json({ submission });
}
