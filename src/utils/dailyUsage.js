// Per-browser daily counter for the free-tier gates that run on the client
// (practice quizzes and exam prep — see FREE_DAILY_LIMITS in data/plans.js).
//
// Keyed by account id so two students sharing a phone don't spend each other's
// allowance, and by calendar day in the device's own time zone so it refills at
// local midnight. Lives in localStorage only: these question banks ship in the
// bundle, so a server-side count would not make the gate any harder to get
// round, and it would make starting a quiz depend on the network — which the
// offline PWA must not.

const STORAGE_KEY = 'arete-daily-usage-v1';

export function todayKey(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    // Storage blocked or the value is corrupt: start from zero. Erring this way
    // gives a free student a fresh allowance, never locks one out.
    return {};
  }
}

function bucketKey(feature, userId) {
  return `${userId || 'anon'}:${feature}`;
}

export function usedToday(feature, userId, now = new Date()) {
  const entry = readAll()[bucketKey(feature, userId)];
  return entry && entry.day === todayKey(now) ? Number(entry.count) || 0 : 0;
}

// Records one use and returns the new count for today.
export function recordUse(feature, userId, now = new Date()) {
  const all = readAll();
  const key = bucketKey(feature, userId);
  const day = todayKey(now);
  const count = (all[key]?.day === day ? Number(all[key].count) || 0 : 0) + 1;

  // Drop other days' entries while we're here, so the record never grows.
  const next = {};
  for (const [k, v] of Object.entries(all)) {
    if (v?.day === day) next[k] = v;
  }
  next[key] = { day, count };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.error('dailyUsage: could not save usage count:', err);
  }
  return count;
}
