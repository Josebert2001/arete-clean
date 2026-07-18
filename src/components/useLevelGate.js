import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Where the last-picked year is remembered, so the resume-on-login flow can
// land a returning student back on it (Courses normalises a bare /courses URL
// to this stored level). Shared so Home and the Course Hub agree.
export const LEVEL_STORAGE_KEY = 'arete-selected-level';

// ─── Shared gating logic ──────────────────────────────────────────────────────
// Wraps a level pick: signed-out students see a sign-in prompt (study pages
// require an account); signed-in users (Supabase restores their session
// automatically, so they're never re-asked) pass straight through.
// `onProceed(level)` runs when the student should actually go to that year.

export function useLevelGate(onProceed) {
  const navigate = useNavigate();
  const { user, authEnabled } = useAuth();
  const [gateLevel, setGateLevel] = useState(null);

  function requestLevel(level) {
    if (typeof level === 'number' && authEnabled && !user) {
      setGateLevel(level);
      return;
    }
    onProceed(level);
  }

  function gateSignIn() {
    // Remember the chosen year so the resume-on-login flow returns the student
    // to it after they sign in.
    try { localStorage.setItem(LEVEL_STORAGE_KEY, String(gateLevel)); } catch { /* private mode */ }
    navigate('/signin');
  }

  function closeGate() {
    setGateLevel(null);
  }

  return { gateLevel, requestLevel, gateSignIn, closeGate };
}
