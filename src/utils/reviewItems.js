// ─── Review candidate pool ────────────────────────────────────────────────────
// Turns a department catalogue into the flat list of reviewable items that
// buildQueue selects from. Kept separate from reviewSchedule.js because that
// module is deliberately ignorant of course shape — this one knows what a course
// looks like, and nothing else knows how to schedule.

import { quizItemId, examItemId, ITEM_KINDS } from './reviewSchedule';

// Lecture-note flashcards are NOT collected here. Notes are loaded lazily per
// course (see lectureNotes/index.js) — pulling every note file to build a
// candidate pool would drag ~1.36 MB into the review page and undo the
// code-splitting that keeps the catalogue light. Because an item id embeds its
// course slug, cards can be added later by loading notes only for the courses
// the student actually has due cards in.
const DEFAULT_KINDS = [ITEM_KINDS.quiz, ITEM_KINDS.exam];

/**
 * Flatten a catalogue's banks into review candidates.
 *
 * @param {Object[]} courses           the catalogue's course list
 * @param {Object}  [opts]
 * @param {string[]}[opts.selectedCourses] foundation-mode pins (slugs). Applied
 *        only when the caller passes them — they are slugs from the FOUNDATION
 *        list, so applying them to a full department catalogue would filter it
 *        down to nothing. Callers follow Planner.jsx and pass null unless the
 *        student is in foundation mode.
 * @param {string[]}[opts.kinds]       which ITEM_KINDS to include
 * @returns {Object[]} items of { id, kind, courseSlug, courseCode, question }
 */
export function collectReviewItems(courses = [], opts = {}) {
  const { selectedCourses = null, kinds = DEFAULT_KINDS } = opts;
  const pins = selectedCourses?.length ? new Set(selectedCourses) : null;
  const wanted = new Set(kinds);
  const items = [];

  for (const course of courses) {
    if (!course?.slug) continue;
    if (pins && !pins.has(course.slug)) continue;

    const meta = { courseSlug: course.slug, courseCode: course.code, courseTitle: course.title };

    if (wanted.has(ITEM_KINDS.quiz)) {
      for (const question of course.quiz || []) {
        items.push({ id: quizItemId(course.slug, question), kind: ITEM_KINDS.quiz, ...meta, question });
      }
    }
    if (wanted.has(ITEM_KINDS.exam)) {
      for (const question of course.examPrep || []) {
        items.push({ id: examItemId(course.slug, question), kind: ITEM_KINDS.exam, ...meta, question });
      }
    }
  }

  return items;
}

/**
 * Shape a queue of MCQ items for <Quiz>.
 *
 * Quiz builds each item's id by calling `itemIdFor` with the *shuffled* copy of
 * the question, which no longer knows which course it came from — so the slug
 * rides along on the question object. shuffleOptions spreads the question, so
 * the extra field survives into the copy Quiz hands back.
 */
export function toQuizQuestions(queue = []) {
  return queue
    .filter((item) => item.kind === ITEM_KINDS.quiz)
    .map((item) => ({ ...item.question, courseSlug: item.courseSlug }));
}

// Companion to toQuizQuestions: rebuild the id from a question Quiz hands back.
export function quizQuestionId(question) {
  return quizItemId(question?.courseSlug, question);
}
