import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { applyReviews, MAX_BOX } from '../utils/reviewSchedule';

const EMPTY_PROGRESS = { completedModules: [], quizScores: {} };

// ─── Shape validation ────────────────────────────────────────────────────────
// A progress blob crosses two trust boundaries before anything reads it back:
// the browser's own localStorage, and the `user_progress.progress` JSONB column
// — which is written straight from the client, so it holds whatever that
// student's browser (or a hand-written PostgREST call with their own token) put
// there. Nothing downstream re-checks it: the dashboards index into it, and the
// tutor's getStudentProgress tool serialises it into the model prompt.
//
// RLS keeps each blob to its own author, so today the blast radius is a student
// garbling their own session. This exists so that stays true if progress ever
// becomes visible ACROSS users — a leaderboard, a class view — where one
// student's blob would land on another student's screen.
//
// Deliberately lenient: a bad ENTRY is dropped, never the whole blob. Wiping a
// student's real progress because one quiz score went malformed would be a
// worse bug than the one this prevents.

// Generous enough that no real student reaches them; low enough that a crafted
// blob can't be used to make every dashboard render tens of thousands of nodes.
const MAX_ENTRIES = 5000;
const MAX_ID_LENGTH = 200;

// Ids are strings everywhere they are produced — module ids from the data files
// ('foundations', 'sec-intro'), reading ids as `${slug}#${hash}`, review ids as
// `q:${course}:${hash}`. A non-string id could never match any of them, so it
// is junk regardless of where it came from.
function validId(id) {
  return typeof id === 'string' && id.length > 0 && id.length <= MAX_ID_LENGTH;
}

function finite(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

export function sanitizeProgress(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ...EMPTY_PROGRESS };

  const completedModules = Array.isArray(raw.completedModules)
    ? [...new Set(raw.completedModules.filter(validId))].slice(0, MAX_ENTRIES)
    : [];

  const quizScores = {};
  if (raw.quizScores && typeof raw.quizScores === 'object' && !Array.isArray(raw.quizScores)) {
    for (const [id, s] of Object.entries(raw.quizScores)) {
      if (Object.keys(quizScores).length >= MAX_ENTRIES) break;
      if (!validId(id) || !s || typeof s !== 'object') continue;
      // score/total drive the percentage maths on every dashboard; a missing
      // date only costs a merge tie-break, so it defaults instead of rejecting.
      if (!finite(s.score) || !finite(s.total)) continue;
      quizScores[id] = { score: s.score, total: s.total, date: finite(s.date) ? s.date : 0 };
    }
  }

  const clean = { completedModules, quizScores };

  // `items` only exists on the review-queue record. Left absent otherwise so a
  // track record doesn't grow an empty key — mergeProgress relies on that.
  if (raw.items && typeof raw.items === 'object' && !Array.isArray(raw.items)) {
    const items = {};
    for (const [id, state] of Object.entries(raw.items)) {
      if (Object.keys(items).length >= MAX_ENTRIES) break;
      if (!validId(id) || !state || typeof state !== 'object') continue;
      // b and d drive the scheduling maths (isDue, pruneItems); without them
      // the item is unusable. n/l/t are counters that default cleanly.
      if (!finite(state.b) || !finite(state.d)) continue;
      items[id] = {
        // Clamped to the range schedule() itself produces, so a forged box
        // number can't park an item outside the ladder forever.
        b: Math.min(Math.max(Math.round(state.b), 1), MAX_BOX),
        d: Math.round(state.d),
        n: finite(state.n) ? Math.max(0, Math.round(state.n)) : 0,
        l: finite(state.l) ? Math.max(0, Math.round(state.l)) : 0,
        t: finite(state.t) ? state.t : 0,
      };
    }
    clean.items = items;
  }

  return clean;
}

// Union of completed modules; for quiz scores, the most recent attempt wins.
//
// Review-queue state (`items`, under the review-v1 key) merges per item rather
// than per bank, so a student who reviews on their phone and then opens a laptop
// keeps both sessions instead of losing one. Same last-write-wins rule as
// quizScores, just at a finer granularity.
export function mergeProgress(local, cloud) {
  if (!cloud) return local;
  const completedModules = [...new Set([...(local.completedModules || []), ...(cloud.completedModules || [])])];
  const quizScores = { ...(cloud.quizScores || {}) };
  for (const [id, score] of Object.entries(local.quizScores || {})) {
    if (!quizScores[id] || (score.date || 0) >= (quizScores[id].date || 0)) {
      quizScores[id] = score;
    }
  }

  const merged = { completedModules, quizScores };

  // Only carried when one side actually has review state, so the track progress
  // records that never review anything don't grow an empty key.
  if (local?.items || cloud?.items) {
    const items = { ...(cloud.items || {}) };
    for (const [id, item] of Object.entries(local.items || {})) {
      if (!items[id] || (item?.t || 0) >= (items[id]?.t || 0)) {
        items[id] = item;
      }
    }
    merged.items = items;
  }

  return merged;
}

export function readProgress(storageKey) {
  if (!storageKey || typeof localStorage === 'undefined') {
    return { ...EMPTY_PROGRESS };
  }

  try {
    const raw = localStorage.getItem(storageKey);
    // Sanitised on the way in: localStorage is editable by anything running on
    // the origin, including the student themselves via devtools.
    return raw ? sanitizeProgress(JSON.parse(raw)) : { ...EMPTY_PROGRESS };
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export function useProgress(storageKey = 'cos222-progress-v1') {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => readProgress(storageKey));
  const [loadedKey, setLoadedKey] = useState(storageKey);
  const [pulledKey, setPulledKey] = useState(null);
  const syncKey = user && storageKey ? `${user.id}:${storageKey}` : null;

  // Pull cloud progress once per user/track and merge it into local state.
  useEffect(() => {
    if (!syncKey || !supabase) return;
    let cancelled = false;
    const [userId, key] = [syncKey.slice(0, syncKey.indexOf(':')), syncKey.slice(syncKey.indexOf(':') + 1)];
    supabase
      .from('user_progress')
      .select('progress')
      .eq('user_id', userId)
      .eq('storage_key', key)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        // The column is client-written, so treat what comes back as untrusted
        // even though RLS guarantees it is this student's own row.
        if (data?.progress) setProgress(local => mergeProgress(local, sanitizeProgress(data.progress)));
        setPulledKey(syncKey);
      });
    return () => { cancelled = true; };
  }, [syncKey]);

  // Push changes to the cloud, debounced. Only after the initial pull so a
  // stale local state can't overwrite newer cloud progress.
  useEffect(() => {
    if (!user || !supabase || !storageKey || pulledKey !== syncKey) return;
    const timer = setTimeout(() => {
      supabase
        .from('user_progress')
        .upsert(
          { user_id: user.id, storage_key: storageKey, progress, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,storage_key' }
        )
        .then(({ error }) => {
          if (error) console.warn('Progress cloud sync failed:', error.message);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, [progress, user, storageKey, pulledKey, syncKey]);

  // If the storageKey changes on a mounted instance (e.g. switching tracks
  // within the same route), reload from the new key during render — before any
  // effect can persist the previous track's progress into it.
  if (loadedKey !== storageKey) {
    setLoadedKey(storageKey);
    setProgress(readProgress(storageKey));
  }

  useEffect(() => {
    if (!storageKey || loadedKey !== storageKey || typeof localStorage === 'undefined') return; // mid key-change; skip the stale write
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (e) {
      console.warn('Progress could not be saved to localStorage:', e);
    }
  }, [progress, storageKey, loadedKey]);

  const markComplete = (moduleId) => {
    setProgress(p => p.completedModules.includes(moduleId)
      ? p
      : { ...p, completedModules: [...p.completedModules, moduleId] });
  };

  const markIncomplete = (moduleId) => {
    setProgress(p => ({
      ...p,
      completedModules: p.completedModules.filter(id => id !== moduleId)
    }));
  };

  const setQuizScore = (moduleId, score, total) => {
    setProgress(p => ({
      ...p,
      quizScores: { ...p.quizScores, [moduleId]: { score, total, date: Date.now() } }
    }));
  };

  // Commit a whole review session's outcomes at once: [{ id, correct }].
  //
  // One setProgress call for the entire batch, so the debounced cloud push
  // uploads the progress blob once per session rather than once per question.
  // Calling this per answered item would defeat the point — see applyReviews.
  const recordReviews = (outcomes) => {
    if (!Array.isArray(outcomes) || outcomes.length === 0) return;
    setProgress(p => ({ ...p, items: applyReviews(p.items, outcomes) }));
  };

  const reset = () => setProgress({ completedModules: [], quizScores: {} });

  const isComplete = (moduleId) => progress.completedModules.includes(moduleId);

  return { progress, markComplete, markIncomplete, setQuizScore, recordReviews, reset, isComplete };
}
