import { useState, useEffect } from 'react';

const EMPTY_PROGRESS = { completedModules: [], quizScores: {} };

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
  const [progress, setProgress] = useState(() => readProgress(storageKey));
  const [loadedKey, setLoadedKey] = useState(storageKey);

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
