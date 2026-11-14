import { useCallback, useEffect, useState } from 'react';
import { cleanNote, DEFAULT_GUIDANCE, isGuidanceMode } from '../utils/missionSteps';

// The learner's own notes on a module's steps, and the guidance level they
// last chose.
//
// Both live in THIS browser only. Step ticks sync through useProgress like the
// rest of a learner's progress; free-text notes deliberately do not. The
// progress blob is serialised into the tutor's prompt (getStudentProgress) and
// its shape is fixed by sanitizeProgress(), so putting paragraphs of learner
// prose into it would be both a prompt-injection surface and a size problem.
// The page says so next to the note field, and the write-up download is how a
// learner takes their notes with them.

const NOTES_PREFIX = 'arete-mission-notes-v1';
const GUIDANCE_KEY = 'arete-guidance-mode-v1';

function notesKey(userId, moduleId) {
  return `${NOTES_PREFIX}:${userId || 'guest'}:${moduleId}`;
}

function readNotes(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const clean = {};
    for (const [stepKey, value] of Object.entries(raw)) {
      if (typeof value === 'string' && value) clean[stepKey] = cleanNote(value);
    }
    return clean;
  } catch {
    // Storage blocked or the entry is corrupt: start with no notes.
    return {};
  }
}

export function useMissionNotes(userId, moduleId) {
  const key = moduleId ? notesKey(userId, moduleId) : null;
  const [state, setState] = useState(() => ({ key, notes: key ? readNotes(key) : {} }));

  // Another module (or another account) on a mounted page: reload during
  // render so one module's notes are never shown, or saved, under another's key.
  if (state.key !== key) {
    setState({ key, notes: key ? readNotes(key) : {} });
  }

  useEffect(() => {
    if (!state.key) return;
    try {
      if (Object.keys(state.notes).length === 0) localStorage.removeItem(state.key);
      else localStorage.setItem(state.key, JSON.stringify(state.notes));
    } catch {
      // Quota or blocked storage: the note stays in memory for this visit.
    }
  }, [state]);

  const setNote = useCallback((stepKey, value) => {
    setState(current => {
      const next = { ...current.notes };
      const text = cleanNote(value);
      if (text) next[stepKey] = text;
      else delete next[stepKey];
      return { key: current.key, notes: next };
    });
  }, []);

  return { notes: state.key === key ? state.notes : {}, setNote };
}

export function useGuidanceMode() {
  const [mode, setModeState] = useState(() => {
    try {
      const stored = localStorage.getItem(GUIDANCE_KEY);
      return isGuidanceMode(stored) ? stored : DEFAULT_GUIDANCE;
    } catch {
      return DEFAULT_GUIDANCE;
    }
  });

  const setMode = useCallback((next) => {
    if (!isGuidanceMode(next)) return;
    setModeState(next);
    try {
      localStorage.setItem(GUIDANCE_KEY, next);
    } catch {
      // Preference only; the choice still holds for this visit.
    }
  }, []);

  return [mode, setMode];
}
