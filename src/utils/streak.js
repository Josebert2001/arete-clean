// ─── Study streak (device-local) ──────────────────────────────────────────────
// Records which local calendar days the student opened a study page, and
// computes the current consecutive-day streak. Deliberately local-only for now:
// a streak is a nudge, not a record — losing it on a new device is acceptable
// and not worth a schema change yet.

import { isResumable } from './lastLocation';

const KEY = 'arete-study-days-v1';
const MAX_DAYS = 400; // bound storage; more than a year of history is never shown

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
    const raw = localStorage.getItem(KEY);
    const days = raw ? JSON.parse(raw) : [];
    return Array.isArray(days) ? days : [];
  } catch {
    return [];
  }
}

// Marks today as a study day when the student opens a study page. Non-study
// pages (home, sign-in, …) don't count — reuses the resumable-path list.
export function recordStudyActivity(pathname, now = new Date()) {
  if (!isResumable(pathname) || typeof localStorage === 'undefined') return;
  const today = toDayString(now);
  const days = readStudyDays();
  if (days.includes(today)) return;
  days.push(today);
  try {
    localStorage.setItem(KEY, JSON.stringify(days.slice(-MAX_DAYS)));
  } catch { /* private mode — streaks are a nicety */ }
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
