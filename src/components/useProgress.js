import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const EMPTY_PROGRESS = { completedModules: [], quizScores: {} };

// Union of completed modules; for quiz scores, the most recent attempt wins.
function mergeProgress(local, cloud) {
  if (!cloud) return local;
  const completedModules = [...new Set([...(local.completedModules || []), ...(cloud.completedModules || [])])];
  const quizScores = { ...(cloud.quizScores || {}) };
  for (const [id, score] of Object.entries(local.quizScores || {})) {
    if (!quizScores[id] || (score.date || 0) >= (quizScores[id].date || 0)) {
      quizScores[id] = score;
    }
  }
  return { completedModules, quizScores };
}

function readProgress(storageKey) {
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

  const reset = () => setProgress({ completedModules: [], quizScores: {} });

  const isComplete = (moduleId) => progress.completedModules.includes(moduleId);

  return { progress, markComplete, markIncomplete, setQuizScore, reset, isComplete };
}
