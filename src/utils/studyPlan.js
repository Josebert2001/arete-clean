// ─── Study-plan generator ─────────────────────────────────────────────────────
// Turns a student's level + semester into a weekly revision timetable, built
// entirely from data Arete already has (courses.js). No lecture times required —
// this schedules *study* blocks, weighting each course by its credit units so
// heavier courses get more weekly time, then spreads the blocks across the
// chosen study days/slots. The output is a list of PlanEvents (see utils/ics.js)
// that flow straight into the .ics builder and Google-Calendar links.
//
// Pure and deterministic: same inputs → same plan, which keeps it unit-testable.

import { getCoursesByLevelAndSemester } from '../data/courses';

// A typical Nigerian university teaching semester runs ~15 weeks.
export const DEFAULT_WEEKS = 15;

// Evening study grid, tuned for students who have daytime lectures. Each entry
// is a start time; blocks are `slotMinutes` long back-to-back from there.
export const DEFAULT_STUDY_DAYS = ['MO', 'TU', 'WE', 'TH', 'SA'];
export const DEFAULT_SLOT_TIMES = ['17:00', '18:15'];
const SLOT_MINUTES = 60;

const DAY_LABEL = { MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday', TH: 'Thursday', FR: 'Friday', SA: 'Saturday', SU: 'Sunday' };

function addMinutes(hhmm, mins) {
  const [h, m] = hhmm.split(':').map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

// How many weekly study blocks a course earns, scaled by credit units. 1-2 units
// → 1 block, 3-4 units → 2 blocks, 5+ → 3. Keeps the week from ballooning while
// still favouring the heavier courses.
function blocksForUnits(units) {
  if (units >= 5) return 3;
  if (units >= 3) return 2;
  return 1;
}

// Personalization thresholds (see utils/planSignals.js for where signals come
// from). A quiz average below WEAK earns a course one extra weekly block; a
// strong quiz average or a mostly-finished linked track frees one block up.
export const WEAK_QUIZ_PCT = 55;
export const STRONG_QUIZ_PCT = 80;
export const STRONG_TRACK_PCT = 80;

// Apply a course's progress signal to its base block count. Returns the final
// count plus a human-readable reason when an adjustment fired, so the UI can
// show students why their plan differs from the plain units weighting.
function adjustBlocks(base, sig) {
  if (!sig) return { blocks: base, reason: null };
  if (sig.quizPercent != null && sig.quizPercent < WEAK_QUIZ_PCT) {
    return { blocks: base + 1, reason: `quiz average ${sig.quizPercent}% — added an extra weekly block` };
  }
  if (sig.quizPercent != null && sig.quizPercent >= STRONG_QUIZ_PCT && base > 1) {
    return { blocks: base - 1, reason: `quiz average ${sig.quizPercent}% — freed one block up` };
  }
  if (sig.trackPercent != null && sig.trackPercent >= STRONG_TRACK_PCT && base > 1) {
    return { blocks: base - 1, reason: `${sig.trackLabel} track ${sig.trackPercent}% complete — freed one block up` };
  }
  return { blocks: base, reason: null };
}

// Build the ordered grid of available (day, time) slots, column-major so we fill
// one time-slot across all days before moving to the next — spreads a course's
// sessions out over the week instead of stacking them on one day.
function buildSlotGrid(studyDays, slotTimes) {
  const slots = [];
  for (const time of slotTimes) {
    for (const day of studyDays) {
      slots.push({ day, time });
    }
  }
  return slots;
}

/**
 * Generate a weekly study plan.
 *
 * @param {Object}  opts
 * @param {number}  opts.level        100 | 200 | 300 | 400
 * @param {number}  opts.semester     1 | 2
 * @param {Date}    opts.sessionStart Date the semester's teaching starts
 * @param {number} [opts.weeks]       teaching weeks (default 15)
 * @param {string[]}[opts.studyDays]  BYDAY codes to schedule on
 * @param {string[]}[opts.slotTimes]  HH:MM start times per day
 * @param {number} [opts.alarmMinutes] reminder lead time (default 30)
 * @param {Object} [opts.courseSignals] per-slug progress signals from
 *   collectCourseSignals() — quiz averages and linked-track completion used to
 *   personalize the block weighting. Omit for the plain units-only plan.
 * @returns {{ events: Array, courses: Array, unplaced: Array, adjustments: Array, meta: Object }}
 */
export function generateStudyPlan({
  level,
  semester,
  sessionStart,
  weeks = DEFAULT_WEEKS,
  studyDays = DEFAULT_STUDY_DAYS,
  slotTimes = DEFAULT_SLOT_TIMES,
  alarmMinutes = 30,
  courseSignals = {},
}) {
  if (!level || !semester || !(sessionStart instanceof Date) || Number.isNaN(sessionStart.getTime())) {
    throw new Error('generateStudyPlan requires level, semester, and a valid sessionStart date');
  }

  const courses = getCoursesByLevelAndSemester(level, semester);
  const untilDate = new Date(sessionStart);
  untilDate.setDate(untilDate.getDate() + (weeks - 1) * 7);

  const grid = buildSlotGrid(studyDays, slotTimes);

  // Expand each course into its share of weekly blocks. Courses flagged weak
  // by their quiz history sort first so their extra blocks claim the
  // earliest/most-spread slots; then heaviest courses, as before.
  const demands = courses
    .map(c => {
      const base = blocksForUnits(c.units);
      const { blocks, reason } = adjustBlocks(base, courseSignals[c.slug]);
      return { course: c, blocks, base, reason };
    })
    .sort((a, b) =>
      (b.blocks > b.base) - (a.blocks > a.base) ||
      b.course.units - a.course.units ||
      a.course.code.localeCompare(b.course.code)
    );

  const adjustments = demands
    .filter(d => d.reason)
    .map(d => ({ code: d.course.code, delta: d.blocks - d.base, reason: d.reason }));

  const requests = [];
  for (const { course, blocks } of demands) {
    for (let i = 0; i < blocks; i++) requests.push({ course, index: i, total: blocks });
  }

  const events = [];
  const unplaced = [];
  requests.forEach((req, i) => {
    const slot = grid[i]; // round-robin across the week's slots
    if (!slot) { unplaced.push(req); return; } // more blocks than slots available
    const { course } = req;
    const topics = Array.isArray(course.topics) ? course.topics : [];
    // Rotate which topics this block highlights so the two blocks of a course
    // point at different material.
    const focus = topics.length
      ? topics.filter((_, ti) => ti % req.total === req.index).slice(0, 3)
      : [];

    events.push({
      uid: `arete-${course.slug}-${slot.day}-${slot.time.replace(':', '')}`,
      title: `${course.code} — Study`,
      location: 'Self-study',
      description:
        `${course.title} (${course.units} units).` +
        (focus.length ? ` Focus: ${focus.join('; ')}.` : '') +
        ' Auto-generated by Areté.',
      byday: slot.day,
      start: slot.time,
      end: addMinutes(slot.time, SLOT_MINUTES),
      firstDate: sessionStart,
      untilDate,
      alarmMinutes,
    });
  });

  return {
    events,
    courses,
    unplaced,
    adjustments,
    meta: {
      level,
      semester,
      weeks,
      totalUnits: courses.reduce((s, c) => s + c.units, 0),
      blocksPerWeek: events.length,
      capacity: grid.length,
      personalized: adjustments.length > 0,
      dayLabels: studyDays.map(d => DAY_LABEL[d]),
    },
  };
}
