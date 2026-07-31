// ─── Study streak ─────────────────────────────────────────────────────────────
// Records which local calendar days the student opened a study page, and
// computes the current consecutive-day streak. localStorage is the working
// copy — writes here are synchronous, so streaks keep working offline and
// signed out — while StudyDaysContext unions this device's days with the
// account's, so a student studying on their phone and their laptop sees one
// streak rather than one per browser.

import { isResumable } from './lastLocation';

export const STUDY_DAYS_KEY = 'arete-study-days-v1';
const MAX_DAYS = 400; // bound storage; more than a year of history is never shown
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

// Local calendar day as YYYY-MM-DD (not UTC — streaks follow the student's clock).
export function toDayString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function readStudyDays() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STUDY_DAYS_KEY);
    const days = raw ? JSON.parse(raw) : [];
    return Array.isArray(days) ? days : [];
  } catch {
    return [];
  }
}

export function writeStudyDays(days) {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STUDY_DAYS_KEY, JSON.stringify(days));
    } catch { /* private mode — streaks are a nicety */ }
  }
  return days;
}

// A study day is an immutable fact ("this day was studied"), so two devices can
// never disagree about one — the union is always the correct merge, whichever
// device pushed last and whatever clocks they were on.
export function mergeStudyDays(local, cloud) {
  const all = [...(local || []), ...(cloud || [])].filter(d => DAY_RE.test(d));
  return [...new Set(all)].sort().slice(-MAX_DAYS);
}

// Marks today as a study day when the student opens a study page. Non-study
// pages (home, sign-in, …) don't count — reuses the resumable-path list.
// Returns the new day list when a day was added, else null, so the caller can
// sync the change without re-reading storage on every navigation.
export function recordStudyActivity(pathname, now = new Date()) {
  if (!isResumable(pathname) || typeof localStorage === 'undefined') return null;
  const today = toDayString(now);
  const days = readStudyDays();
  if (days.includes(today)) return null;
  return writeStudyDays([...days, today].slice(-MAX_DAYS));
}

// Consecutive days ending today — or yesterday, so a streak isn't shown as
// broken in the morning before the student has studied.
export function computeStreak(days, now = new Date()) {
  const set = new Set(days);
  const cursor = new Date(now);
  if (!set.has(toDayString(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(toDayString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
