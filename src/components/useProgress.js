import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { applyReviews } from '../utils/reviewSchedule';

const EMPTY_PROGRESS = { completedModules: [], quizScores: {} };

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
    return raw ? JSON.parse(raw) : { ...EMPTY_PROGRESS };
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
        if (data?.progress) setProgress(local => mergeProgress(local, data.progress));
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
