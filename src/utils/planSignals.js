// ─── Planner personalization signals ─────────────────────────────────────────
// Collects the per-course study signals the planner personalizes with, read
// from the same localStorage records useProgress mirrors to Supabase:
//   - course practice quizzes ('course-quizzes-v1', keyed by course slug)
//   - programming-track progress (trackMeta storageKeys), linked to a course
//     via the track's courseCode or the course's interactiveTrackPath.
// Fail-soft by design: a missing or corrupt record simply contributes no
// signal, so a signed-out or brand-new student gets the plain units-weighted
// plan. This is the planner's one impure edge — generateStudyPlan itself stays
// pure and takes the collected signals as an argument.

import { trackMeta } from '../data/trackMeta';

const COURSE_QUIZ_KEY = 'course-quizzes-v1';

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function percent(entry) {
  return entry && entry.total ? Math.round((entry.score / entry.total) * 100) : null;
}

// One track's saved progress → completion % and average module-quiz %.
// Returns null when there's nothing recorded, so untouched tracks add no noise.
function summarizeTrack(track) {
  const progress = readJson(track.storageKey);
  if (!progress) return null;

  const ids = new Set(track.moduleIndex.map(m => m.id));
  const completed = (progress.completedModules || []).filter(id => ids.has(id)).length;
  const completionPercent = ids.size ? Math.round((completed / ids.size) * 100) : 0;

  const quizPcts = Object.entries(progress.quizScores || {})
    .filter(([id]) => ids.has(id))
    .map(([, s]) => percent(s))
    .filter(p => p != null);
  const quizPercent = quizPcts.length
    ? Math.round(quizPcts.reduce((a, b) => a + b, 0) / quizPcts.length)
    : null;

  if (completed === 0 && quizPercent == null) return null;
  return { completionPercent, quizPercent, label: track.label };
}

/**
 * Build a { [courseSlug]: { quizPercent?, trackPercent?, trackLabel? } } map
 * for the given courses. A course's quizPercent prefers its own practice-quiz
 * score and falls back to the linked track's module-quiz average.
 */
export function collectCourseSignals(courses) {
  const signals = {};
  const courseQuizzes = readJson(COURSE_QUIZ_KEY)?.quizScores || {};

  const trackSummaries = Object.values(trackMeta)
    .map(track => ({ track, summary: summarizeTrack(track) }))
    .filter(x => x.summary);

  for (const course of courses || []) {
    const sig = {};
    const direct = percent(courseQuizzes[course.slug]);
    const linked = trackSummaries.find(({ track }) =>
      track.courseCode === course.code || track.listPath === course.interactiveTrackPath
    )?.summary;

    const quizPercent = direct ?? linked?.quizPercent ?? null;
    if (quizPercent != null) sig.quizPercent = quizPercent;
    if (linked) {
      sig.trackPercent = linked.completionPercent;
      sig.trackLabel = linked.label;
    }
    if (Object.keys(sig).length) signals[course.slug] = sig;
  }
  return signals;
}
