import { useState, useEffect } from 'react';
import { loadNotesFor } from '../data/lectureNotes/index.js';

// Stable identity so a caller can use `notes` as an effect dependency without
// re-running on every render of a course that has none.
const EMPTY = [];

// Fetches a course's lecture notes, which live in their own chunk (see
// data/lectureNotes/index.js). Courses with no notes never issue a request.
//
// Whether a course HAS notes is known synchronously from `notesKey`, so the
// Lecture Notes tab renders from the start — only its topic count and the
// outline coverage badges arrive with the chunk. A tab that popped into
// existence a beat after the page settled would be worse than a badge that
// fills in.
//
// Only the keyed case is asynchronous. Absent notes and the handful of courses
// that still hold their notes inline are both resolved during render, so the
// effect never sets state synchronously.
//
// Status is 'idle' (no notes), 'loading', 'ready' or 'error'. Handle 'error':
// a failed chunk load on a flaky connection must not leave the tab blank and
// unexplained.
export function useLectureNotes(course) {
  const key = course?.notesKey ?? null;
  const inline = course?.lectureNotes?.length ? course.lectureNotes : null;
  const hasNotes = Boolean(key) || Boolean(inline);

  // Carries the key it was loaded for, so a switch to another course reads as
  // 'loading' immediately rather than briefly showing the previous course's
  // notes — no extra setState, and no stale render in between.
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    if (!key) return undefined;
    let cancelled = false;
    loadNotesFor(course).then(
      (notes) => { if (!cancelled) setLoaded({ key, notes: notes ?? EMPTY }); },
      () => { if (!cancelled) setLoaded({ key, error: true }); },
    );
    return () => { cancelled = true; };
    // `notesKey` fully determines what gets loaded; depending on the whole
    // `course` object would refetch on every new object identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!hasNotes) return { status: 'idle', notes: EMPTY, hasNotes: false };
  if (!key) return { status: 'ready', notes: inline, hasNotes: true };
  if (loaded?.key !== key) return { status: 'loading', notes: EMPTY, hasNotes: true };
  if (loaded.error) return { status: 'error', notes: EMPTY, hasNotes: true };
  return { status: 'ready', notes: loaded.notes, hasNotes: true };
}
