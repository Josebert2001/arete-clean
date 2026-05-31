import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cos222-progress-v1';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { completedModules: [], quizScores: {} };
    } catch {
      return { completedModules: [], quizScores: {} };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      // ignore
    }
  }, [progress]);

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
