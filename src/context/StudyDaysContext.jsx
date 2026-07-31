import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import {
  STUDY_DAYS_KEY, readStudyDays, writeStudyDays, mergeStudyDays, recordStudyActivity,
} from '../utils/streak';

// ─── Study days, synced to the account ────────────────────────────────────────
// The streak belongs to the student, not to the browser they happened to open —
// a phone showing 1 day while the laptop shows 3 is a bug, not two streaks. One
// provider owns the day list for the whole app: the navigation tracker records
// into it and the dashboard reads it, so there is a single pull, a single push,
// and the streak re-renders as soon as the cloud copy lands.
//
// Storage rides on the existing user_progress table under its own storage_key —
// same shape as useProgress, no schema change. Signed-out and offline students
// keep the localStorage-only behaviour they had before.

const StudyDaysContext = createContext({ days: [], recordToday: () => {} });

export function useStudyDays() {
  return useContext(StudyDaysContext);
}

export function StudyDaysProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [days, setDays] = useState(() => readStudyDays());
  const [pulledFor, setPulledFor] = useState(null);

  const recordToday = useCallback((pathname) => {
    const updated = recordStudyActivity(pathname);
    if (updated) setDays(updated); // null on a non-study page or an already-counted day
  }, []);

  // Pull the account's days once per sign-in and union them with this device's.
  useEffect(() => {
    if (!userId || !supabase) return;
    let cancelled = false;
    supabase
      .from('user_progress')
      .select('progress')
      .eq('user_id', userId)
      .eq('storage_key', STUDY_DAYS_KEY)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn('Study days could not be loaded:', error.message);
          return; // leave pulledFor unset: nothing gets pushed over a copy we failed to read
        }
        const cloud = Array.isArray(data?.progress?.days) ? data.progress.days : [];
        // Re-read rather than merging into `days` — recordToday may have written
        // a fresh day to storage while this request was in flight.
        setDays(writeStudyDays(mergeStudyDays(readStudyDays(), cloud)));
        setPulledFor(userId);
      });
    return () => { cancelled = true; };
  }, [userId]);

  // Push the union back, debounced. Only after the pull, so this device's short
  // history can never overwrite a longer one recorded elsewhere.
  useEffect(() => {
    if (!userId || !supabase || pulledFor !== userId || days.length === 0) return;
    const timer = setTimeout(() => {
      supabase
        .from('user_progress')
        .upsert(
          {
            user_id: userId,
            storage_key: STUDY_DAYS_KEY,
            progress: { days },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,storage_key' }
        )
        .then(({ error }) => {
          if (error) console.warn('Study-day cloud sync failed:', error.message);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, [days, userId, pulledFor]);

  return (
    <StudyDaysContext.Provider value={{ days, recordToday }}>
      {children}
    </StudyDaysContext.Provider>
  );
}
