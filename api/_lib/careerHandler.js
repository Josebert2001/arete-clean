import { ENTRY_PATHS, placementQuestions } from '../../src/data/careers.js';
import { scorePlacement } from './careerPlacement.js';
import { serviceRoleClient, serviceRoleConfigured } from './serviceRole.js';
import { getStudentFromRequest } from './supabase.js';
import {
  applyApiHeaders,
  enforceRateLimit,
  setRateLimitHeaders,
  denyIfUserRateLimited,
} from './request-policy.js';
import { captureApiError } from './sentry.js';
import { BLUE_ACTIONS, handleBlueAssessment } from './blueAssessmentHandler.js';

const RATE = { namespace: 'career', limit: 30, windowMs: 10 * 60 * 1000 };
// A class can share one campus connection; the binding account budget stays 30.
const IP_RATE = { ...RATE, namespace: 'career-ip', limit: 300 };
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const notReady = (res) =>
  res
    .status(503)
    .json({
      error:
        'Career saving is unavailable on this deployment. Please try again. You can still explore directions and download starter reflections.',
      notConfigured: true,
    });

export default async function careerHandler(req, res) {
  applyApiHeaders(res);
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const limit = enforceRateLimit(req, IP_RATE);
  setRateLimitHeaders(res, limit);
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return res.status(429).json({ error: 'Too many career requests. Please wait a few minutes.' });
  }
  const student = await getStudentFromRequest(req);
  if (!student) return res.status(401).json({ error: 'Sign in to save your career direction.' });
  const body = req.body;
  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body) ||
    Buffer.byteLength(JSON.stringify(body)) > 32768
  )
    return res.status(400).json({ error: 'Invalid career request.' });
  // An async token refresh must not save an old account's in-memory work into
  // a newly signed-in account. This is a precondition, never an owner source.
  if (body.expectedUserId !== undefined && body.expectedUserId !== student.user.id)
    return res
      .status(409)
      .json({ error: 'Your signed-in account changed. Reload before saving career work.' });
  if (!['status', 'submit', 'choose', 'practice', ...BLUE_ACTIONS].includes(body.action))
    return res.status(400).json({ error: 'Unknown career action.' });
  if (process.env.CAREER_PLACEMENT_ENABLED !== 'true' || !serviceRoleConfigured())
    return notReady(res);
  if (
    await denyIfUserRateLimited(req, res, student, RATE, {
      route: 'career',
      message: 'Too many career requests. Please wait a few minutes.',
    })
  )
    return;
  const userId = student.user.id; // Never take an owner or result from the body.
  try {
    if (BLUE_ACTIONS.includes(body.action)) return await handleBlueAssessment(student, body, res);
    if (body.action === 'status') {
      const [profile, notes] = await Promise.all([
        student.db
          .from('career_profiles')
          .select('attempt_id, chosen_path, result, updated_at')
          .eq('user_id', userId)
          .maybeSingle(),
        student.db
          .from('career_practice_notes')
          .select('path, notes, reflected, updated_at')
          .eq('user_id', userId),
      ]);
      if (profile.error || notes.error) throw profile.error || notes.error;
      return res.status(200).json({
        profile: profile.data,
        notes: notes.data ?? [],
        assessmentEnabled: process.env.CAREER_ASSESSMENT_ENABLED === 'true',
      });
    }
    const db = serviceRoleClient();
    if (body.action === 'submit') {
      if (!UUID.test(body.attemptId ?? ''))
        return res.status(400).json({ error: 'Invalid attempt identifier. Reload the quiz.' });
      let result;
      try {
        result = scorePlacement(body.version, body.answers);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
      const saved = await db.rpc('record_career_placement', {
        p_user_id: userId,
        p_attempt_id: body.attemptId,
        p_version: result.version,
        p_answers: body.answers,
        p_result: result,
        p_questions: placementQuestions,
      });
      if (saved.error?.code === '23514')
        return res
          .status(409)
          .json({
            error: 'This attempt was already submitted with different answers. Start a new quiz.',
          });
      if (saved.error) throw saved.error;
      return res.status(200).json({ profile: saved.data });
    }
    if (!ENTRY_PATHS.includes(body.path))
      return res.status(400).json({ error: 'Choose one of the available starter directions.' });
    if (body.action === 'choose') {
      if (!UUID.test(body.attemptId ?? ''))
        return res
          .status(400)
          .json({ error: 'Load your current recommendation before changing direction.' });
      const saved = await db
        .from('career_profiles')
        .update({ chosen_path: body.path, updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('attempt_id', body.attemptId)
        .select('attempt_id, chosen_path, result, updated_at')
        .maybeSingle();
      if (saved.error) throw saved.error;
      if (!saved.data)
        return res
          .status(409)
          .json({ error: 'Your recommendation changed. Reload before choosing a direction.' });
      return res.status(200).json({ profile: saved.data });
    }
    if (
      typeof body.notes !== 'string' ||
      body.notes.length > 6000 ||
      typeof body.reflected !== 'boolean'
    )
      return res.status(400).json({ error: 'Keep your reflection within 6,000 characters.' });
    const saved = await db.from('career_practice_notes').upsert(
      {
        user_id: userId,
        path: body.path,
        notes: body.notes,
        reflected: body.reflected,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,path' },
    );
    if (saved.error) throw saved.error;
    return res.status(200).json({ saved: true });
  } catch (err) {
    const assessment = BLUE_ACTIONS.includes(body.action);
    if (err?.code === '42501')
      return res
        .status(403)
        .json({
          error: assessment
            ? 'This investigation or review is not assigned to you.'
            : 'You do not have permission to access this career record.',
        });
    if (err?.code === '23514' || err?.code === '23505')
      return res
        .status(409)
        .json({
          error: assessment
            ? 'The investigation changed, expired, or already has a submission/result. Reload it before continuing.'
            : 'Your career record changed. Reload it before continuing.',
        });
    await captureApiError(err, { route: 'career', action: body.action });
    return res.status(500).json({
      error:
        body.action === 'status'
          ? 'Could not load your career roadmap. Please try again.'
          : 'Could not save your career work. Please try again.',
    });
  }
}
