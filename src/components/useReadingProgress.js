// ─── Lecture-note reading progress ───────────────────────────────────────────
// Records which lecture-note topics a student has read, so finishing a course's
// notes shows up somewhere. Until this existed, reading was the only study
// activity on Areté that left no trace: tracks record `completedModules`,
// quizzes record scores, the review queue records items — notes recorded
// nothing, and a student who read all 13 topics of UUY-CYB 222 still saw a
// dashboard of zeroes.
//
// Storage rides on the existing useProgress hook under its own key, so it gets
// localStorage persistence, the debounced Supabase push and cross-device union
// merging for free. `user_progress` is keyed (user_id, storage_key), so a new
// key costs no migration.

import { useCallback, useEffect, useRef } from 'react';
import { useProgress } from './useProgress';
import { hashPrompt } from '../utils/reviewSchedule';

// Its own row rather than sharing `course-quizzes-v1`: the Planner and the
// course pages read the quiz-score blob on every visit, and reading marks would
// grow it for no benefit to those readers.
export const READING_STORAGE_KEY = 'course-reading-v1';

// Topics are identified by a hash of their title, never by `number` or array
// index. Both of those move: reviewSchedule.js records UUY-CYB 222's topics 5-10
// becoming 7-12 in a docs-only edit, and an index-based id would silently
// re-point at a *different* topic rather than failing loudly. Retitling a topic
// resets its read mark, which is the same trade the review queue already makes
// and is arguably correct — a retitled topic is a different topic.
//
// The slug prefix is what lets readCountFor count a course's marks without the
// topic list, which matters because notes load lazily (see lectureNotes/index.js)
// and a course card cannot enumerate topics it has not downloaded.
export function topicReadId(courseSlug, topic) {
  return `${courseSlug}#${hashPrompt(topic?.title ?? '')}`;
}

// ── Pure counters ────────────────────────────────────────────────────────────
// Read straight off a progress blob, so callers that must not pull a catalogue
// (the dashboard) or must not mount 57 hooks (the course list) can still count.

function readIds(progress) {
  return progress?.completedModules ?? [];
}

export function readCountFor(progress, courseSlug) {
  if (!courseSlug) return 0;
  const prefix = `${courseSlug}#`;
  return readIds(progress).filter((id) => id.startsWith(prefix)).length;
}

export function readTopicTotal(progress) {
  return readIds(progress).length;
}

export function readCourseCount(progress) {
  const slugs = new Set();
  for (const id of readIds(progress)) {
    const hash = id.indexOf('#');
    if (hash > 0) slugs.add(id.slice(0, hash));
  }
  return slugs.size;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useReadingProgress(courseSlug) {
  const { progress, markComplete, markIncomplete } = useProgress(READING_STORAGE_KEY);

  const isRead = useCallback(
    (topic) => readIds(progress).includes(topicReadId(courseSlug, topic)),
    [progress, courseSlug],
  );

  const setRead = useCallback(
    (topic, read) => {
      const id = topicReadId(courseSlug, topic);
      if (read) markComplete(id);
      else markIncomplete(id);
    },
    // markComplete/markIncomplete are recreated every render by useProgress;
    // depending on them would defeat the memo without changing behaviour.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseSlug],
  );

  return { isRead, setRead, readCount: readCountFor(progress, courseSlug) };
}

// ── Auto-marking ─────────────────────────────────────────────────────────────
// Reaching the end of a topic marks it read, because a button alone gets
// ignored and a dashboard that stays empty teaches students the feature is
// broken. Three things have to be true before a topic marks itself:
//
//   1. The end-of-topic sentinel came into view — they reached the bottom.
//   2. The panel itself was *visible* for a dwell scaled to the topic's length.
//      Time is accumulated only while the panel intersects the viewport, not
//      from a wall clock: "Expand all" then a fast scroll to the end of the page
//      sweeps every sentinel into view, but each panel is on screen for about a
//      second on the way past, so nothing but the topic they actually stopped on
//      can reach its dwell.
//   3. It is not already read. This only ever marks read, never unread — the
//      manual toggle always wins.

const CHARS_PER_SECOND = 25;          // ~250 wpm at ~6 chars a word
// A fraction of the estimated read time, not the whole of it. This is a floor on
// plausible engagement, not a reading-time model: students skim, re-read and
// already know some of the material, and a threshold that demanded the full
// estimate would refuse to credit anyone who reads quickly.
//
// The fraction matters because real topics are 5,000-25,000 characters. Requiring
// the full estimate would put every one of them on the ceiling, and the scaling
// would do nothing; at a quarter, the clamps only bite below ~1,500 and above
// ~9,000 characters, so most topics land somewhere in between.
const DWELL_FRACTION = 0.25;
const MIN_DWELL_MS = 15_000;
const MAX_DWELL_MS = 90_000;

export function dwellMsFor(charCount) {
  const estimatedMs = (Number(charCount) || 0) / CHARS_PER_SECOND * 1000;
  return Math.min(MAX_DWELL_MS, Math.max(MIN_DWELL_MS, estimatedMs * DWELL_FRACTION));
}

/**
 * Marks a topic read once the student has reached its end and spent long enough
 * looking at it. Returns refs for the panel (dwell) and the end sentinel.
 *
 * @param {Object}   opts
 * @param {boolean}  opts.active     panel open and topic not already read
 * @param {number}   opts.charCount  serialized length of the topic, for the dwell
 * @param {Function} opts.onRead     called at most once per open
 * @returns {{ panelRef: Object, sentinelRef: Object }}
 */
export function useAutoMarkRead({ active, charCount, onRead }) {
  const panelRef = useRef(null);
  const sentinelRef = useRef(null);

  // Latest callback without re-running the observers on every render.
  const onReadRef = useRef(onRead);
  useEffect(() => { onReadRef.current = onRead; });

  useEffect(() => {
    // No IntersectionObserver (old WebView, jsdom) means no auto-marking at all
    // — the manual toggle still works, which is why this degrades silently.
    if (!active || typeof IntersectionObserver === 'undefined') return undefined;
    const panel = panelRef.current;
    const sentinel = sentinelRef.current;
    if (!panel || !sentinel) return undefined;

    // All of this is effect-local rather than component state: nothing here
    // needs to render, and the whole thing tears down and resets when the panel
    // closes or the topic is marked read (both flip `active`).
    const target = dwellMsFor(charCount);
    let reachedEnd = false;
    let dwelled = false;
    let accumulated = 0;
    let visibleSince = null;
    let timer = null;
    let fired = false;

    const finish = () => {
      if (fired || !reachedEnd || !dwelled) return;
      fired = true;
      onReadRef.current?.();
    };

    const endObserver = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        reachedEnd = true;
        finish();
      }
    });
    endObserver.observe(sentinel);

    const dwellObserver = new IntersectionObserver((entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (visible && visibleSince === null) {
        visibleSince = Date.now();
        timer = setTimeout(() => {
          dwelled = true;
          finish();
        }, Math.max(0, target - accumulated));
      } else if (!visible && visibleSince !== null) {
        accumulated += Date.now() - visibleSince;
        visibleSince = null;
        clearTimeout(timer);
        timer = null;
      }
    });
    dwellObserver.observe(panel);

    return () => {
      clearTimeout(timer);
      endObserver.disconnect();
      dwellObserver.disconnect();
    };
  }, [active, charCount]);

  return { panelRef, sentinelRef };
}
