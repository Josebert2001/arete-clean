// ─── Spaced-repetition scheduling ─────────────────────────────────────────────
// Pure scheduling logic for the review queue (see docs/review-queue-design.md).
// No React, no storage, no course data — the caller supplies the items and the
// stored state, so this module stays testable and stays out of every chunk that
// does not need it.
//
// The state this operates on lives under the `review-v1` storage key, inside the
// existing user_progress row (keyed user_id + storage_key), so nothing here
// needs a schema migration. One entry per item:
//
//   { b: box 1-5, d: due (day index), n: times seen, l: lapses, t: last review ms }
//
// Everything is day-granular. Storing `d` as an integer day index rather than a
// timestamp keeps the synced blob small — it is re-uploaded whole on every write
// (see useProgress) and students are on metered mobile data.

// ── Item identity ────────────────────────────────────────────────────────────
// Questions are sampled at random and their options reshuffled every attempt, so
// nothing about an item's position is stable. Bank array index is unusable for a
// different reason: we insert questions into the middle of banks routinely, and
// an index-based id would silently re-point at a *different* question rather than
// failing loudly — corrupting history instead of losing it.
//
// So an item is identified by a hash of its prompt text, scoped by course. That
// survives reordering, mid-bank insertion, moving a bank between files, and
// lecture-note renumbering (UUY-CYB 222's topics 5-10 became 7-12 in exactly the
// kind of docs-only change that would otherwise have wiped every student's
// history for that course).
//
// The trade: materially rewording a question resets its history, which is
// arguably correct — a reworded question is a different question. Whitespace is
// normalised first so reflowing a long string in the source does not count.

// Review state lives in its own user_progress row rather than alongside the quiz
// scores, so the growing item map never bloats a record that other pages read.
// user_progress is keyed (user_id, storage_key), so a new key costs no migration.
export const REVIEW_STORAGE_KEY = 'review-v1';

export const ITEM_KINDS = {
  quiz: 'q',   // course.quiz[]      — MCQ
  exam: 'x',   // course.examPrep[]  — written
  card: 'f',   // lecture-note termlist entry — flashcard
};

// FNV-1a, 32-bit, rendered base36. Synchronous on purpose: the SHA-256 helper
// used for CTF flags is async, which is wrong for building a list during render.
export function hashPrompt(text) {
  const s = String(text ?? '').trim().replace(/\s+/g, ' ');
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

// Because `kind` is part of the id, a collision can only occur between two items
// of the same kind in the same course. The largest such set today is ENT 221's
// 767 flashcards (~7e-5 chance), and the consequence is two cards sharing a
// schedule — never corrupted content.
export function itemId(kind, courseSlug, prompt) {
  return `${kind}:${courseSlug}:${hashPrompt(prompt)}`;
}

// Per-kind identity. Use these rather than calling itemId directly — what counts
// as "the prompt" differs by kind, and getting it wrong conflates two items into
// one shared schedule.
//
// A separator keeps fields from bleeding into each other, so a question ending
// in one word cannot collide with a shorter question plus a longer answer. It
// has to survive hashPrompt's whitespace normalisation, so it cannot be a space
// or a newline; U+001F (unit separator) never appears in authored content.
const SEP = '\u001f';

// A stem alone is not unique across a bank, so the options are part of the
// identity. Sorted, because Quiz.jsx reshuffles options on every attempt and an
// id built from a rendered question must match one built from the source bank.
export function quizItemId(courseSlug, q) {
  const options = [...(q?.options ?? [])].sort().join(SEP);
  return itemId(ITEM_KINDS.quiz, courseSlug, `${q?.question ?? ''}${SEP}${options}`);
}

export function examItemId(courseSlug, q) {
  return itemId(ITEM_KINDS.exam, courseSlug, q?.question ?? '');
}

// The term alone is NOT an identity: 45 terms in ENT 221 appear in more than one
// termlist with genuinely different definitions (e.g. "Need for Achievement" is
// defined one way in note 1 and another in note 2). Hashing the term alone would
// give both the same schedule, so the student would drill one definition and be
// credited for the other. The definition is therefore part of the identity.
export function cardItemId(courseSlug, item) {
  return itemId(ITEM_KINDS.card, courseSlug, `${item?.term ?? ''}${SEP}${item?.def ?? ''}`);
}

// ── Time ─────────────────────────────────────────────────────────────────────
// Days since the epoch, keyed off the *local* calendar date, so "due today"
// rolls over at the student's midnight rather than at 01:00 in Nigeria (UTC+1).
export function dayIndex(when = new Date()) {
  const d = when instanceof Date ? when : new Date(when);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

// ── Scheduling ───────────────────────────────────────────────────────────────
// Leitner boxes rather than SM-2. An MCQ outcome is binary, so SM-2's 0-5 grade
// could only come from students rating their own recall — which is the exact
// self-assessment weakness this feature exists to correct. Leitner needs one
// integer of state and explains itself in a sentence: get it right and you see
// it later, get it wrong and you see it tomorrow.
export const BOX_INTERVALS = [1, 3, 7, 21, 60];   // days, indexed by box - 1
export const MAX_BOX = BOX_INTERVALS.length;

// A written answer is self-marked out of the question's `marks`. Anything at or
// above this fraction counts as recalled.
export const REVIEW_PASS_FRACTION = 0.7;

// Missed this many times and rescheduling stops helping — the student needs to
// go and read the source, not see the card again tomorrow.
export const LEECH_THRESHOLD = 8;

/**
 * Advance one item's schedule after an answer.
 *
 * @param {Object|undefined} prev    stored state, or undefined for a first sighting
 * @param {boolean}          correct whether the student recalled it
 * @param {number}          [today]  day index (defaults to the local today)
 * @param {number}          [now]    ms timestamp, stored for cross-device merge
 * @returns {Object} the item's new state
 */
export function schedule(prev, correct, today = dayIndex(), now = Date.now()) {
  // Right first time should not force a next-day review, so a new item enters at
  // box 2. A wrong answer always drops to box 1 regardless of how high it was.
  const box = correct ? (prev ? Math.min(prev.b + 1, MAX_BOX) : 2) : 1;

  // A lapse is forgetting something you had already been shown. Getting an item
  // wrong the very first time you ever see it is not a lapse — counting it would
  // make a student who simply started a new bank look like they were struggling.
  const lapsed = !correct && prev != null;

  return {
    b: box,
    d: today + BOX_INTERVALS[box - 1],
    n: (prev?.n ?? 0) + 1,
    l: (prev?.l ?? 0) + (lapsed ? 1 : 0),
    t: now,
  };
}

// Written questions carry partial credit; map the self-marked fraction to the
// binary outcome the scheduler wants.
export function gradeFromMarks(awarded, marks) {
  if (!(marks > 0)) return false;
  return awarded / marks >= REVIEW_PASS_FRACTION;
}

export function isLeech(state) {
  return (state?.l ?? 0) >= LEECH_THRESHOLD;
}

export function isDue(state, today = dayIndex()) {
  return state != null && state.d <= today;
}

// ── Queue construction ───────────────────────────────────────────────────────
export const DEFAULT_LIMIT = 20;
export const DEFAULT_NEW_CAP = 10;

// Fisher-Yates on a copy, so the caller's array is never mutated.
function shuffled(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Pick the items to review now.
 *
 * `available` is the candidate pool the caller has already filtered to the
 * student's own catalogue (and to profiles.selected_courses when that is set —
 * otherwise a foundation student gets drilled on courses they do not take).
 * Each entry needs an `id`; everything else is passed through untouched.
 *
 * @param {Object}   items       stored review state, keyed by item id
 * @param {Object[]} available   candidate items, each with an `id`
 * @param {Object}  [opts]
 * @param {number}  [opts.today]   day index
 * @param {number}  [opts.limit]   total queue size
 * @param {number}  [opts.newCap]  most never-seen items to introduce at once
 * @param {Function}[opts.shuffle] injectable for deterministic tests
 * @returns {Object[]} the selected items, interleaved
 */
export function buildQueue(items = {}, available = [], opts = {}) {
  const {
    today = dayIndex(),
    limit = DEFAULT_LIMIT,
    newCap = DEFAULT_NEW_CAP,
    shuffle = shuffled,
  } = opts;

  if (limit <= 0) return [];

  const due = [];
  const fresh = [];
  for (const item of available) {
    const state = items?.[item?.id];
    if (!state) {
      fresh.push(item);
    } else if (!isLeech(state) && isDue(state, today)) {
      // Leeches are deliberately withheld — see selectLeeches().
      due.push({ item, state });
    }
  }

  // Most overdue first, then weakest box first. This ordering decides which
  // items survive the `limit` cut; the shuffle below then decides presentation
  // order, because interleaving across courses beats blocked practice.
  due.sort((a, b) => (a.state.d - b.state.d) || (a.state.b - b.state.b));

  const dueItems = due.slice(0, limit).map((d) => d.item);
  const room = Math.max(0, limit - dueItems.length);
  const newItems = fresh.slice(0, Math.min(newCap, room));

  return shuffle([...dueItems, ...newItems]);
}

// Items the student keeps failing. Surfaced separately so the UI can send them
// to the source material instead of round-tripping them through the queue.
export function selectLeeches(items = {}, available = []) {
  return available.filter((item) => isLeech(items?.[item?.id]));
}

// For the dashboard's "N due today" card. Counts the same population buildQueue
// would draw from, uncapped, so the badge does not disagree with the queue.
export function dueCount(items = {}, available = [], today = dayIndex()) {
  let n = 0;
  for (const item of available) {
    const state = items?.[item?.id];
    if (state && !isLeech(state) && isDue(state, today)) n++;
  }
  return n;
}

/**
 * Apply a whole session's outcomes to the stored item map, in one pass.
 *
 * Deliberately batch-shaped. useProgress re-uploads the entire progress blob on
 * every state change (debounced 1s), so recording one outcome at a time would
 * push the whole map on every tap — tens of kB per question, on metered mobile
 * data. Callers accumulate outcomes during a session and commit once at the end.
 *
 * @param {Object}   items      current item map
 * @param {Object[]} outcomes   [{ id, correct }]
 * @returns {Object} a new item map, pruned
 */
export function applyReviews(items = {}, outcomes = [], today = dayIndex(), now = Date.now()) {
  const next = { ...items };
  for (const outcome of outcomes) {
    if (!outcome?.id) continue;
    next[outcome.id] = schedule(next[outcome.id], !!outcome.correct, today, now);
  }
  return pruneItems(next, today);
}

// ── Housekeeping ─────────────────────────────────────────────────────────────
// The item map only grows, and it is re-uploaded whole on every write. Drop
// well-learned items nobody has looked at in a long time: they are at the top
// box, so re-introducing them as new later costs one extra review at worst.
export const PRUNE_AFTER_DAYS = 180;

export function pruneItems(items = {}, today = dayIndex()) {
  const kept = {};
  for (const [id, state] of Object.entries(items)) {
    const stale = state.b >= MAX_BOX && today - state.d > PRUNE_AFTER_DAYS;
    if (!stale) kept[id] = state;
  }
  return kept;
}
