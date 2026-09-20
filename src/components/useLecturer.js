import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

/**
 * Answers "is the signed-in user a lecturer, and which courses do they teach?"
 *
 * This decides what the UI SHOWS. It is not the security boundary — every read
 * and write is independently enforced by row-level security in the database,
 * so a student who forces the lecturer screen open still sees and writes
 * nothing.
 *
 * Roles live in `user_roles` (not on `profiles`) because the existing profile
 * policy lets a student edit their own row — a role column there would be
 * self-assignable. `user_roles` has a read-own policy and no write policy, so a
 * role can only be granted from the Supabase dashboard.
 *
 * status is always one of: 'loading' | 'ready' | 'error'. Handle 'error', or a
 * failed request leaves the page spinning forever.
 */
export function useLecturer() {
  const { user, authLoading } = useAuth();
  const [status, setStatus]       = useState('loading');
  const [role, setRole]           = useState(null);
  const [offerings, setOfferings] = useState([]);

  const load = useCallback(async () => {
    if (!supabase || !user) {
      setRole(null);
      setOfferings([]);
      setStatus('ready');
      return;
    }
    setStatus('loading');

    // Two reads at once: the user's role, and the offerings they're linked to
    // (joined to the offering details the console needs to show).
    const [roleRes, offerRes] = await Promise.all([
      supabase.from('user_roles').select('role').eq('user_id', user.id).maybeSingle(),
      supabase
        .from('offering_lecturers')
        .select('offering_id, course_offerings(id, course_code, course_title, department, level, academic_session)')
        .eq('lecturer_id', user.id),
    ]);

    if (roleRes.error || offerRes.error) {
      setStatus('error');
      return;
    }

    // Flatten the joined rows into a plain list of offerings.
    const list = (offerRes.data ?? [])
      .map(r => r.course_offerings)
      .filter(Boolean);

    setRole(roleRes.data?.role ?? null);
    setOfferings(list);
    setStatus('ready');
  }, [user]);

  useEffect(() => {
    if (authLoading) return;   // wait for sign-in to settle, or we query as nobody
    load();
  }, [authLoading, load]);

  return {
    status,
    role,
    offerings,
    isLecturer: role === 'lecturer' || role === 'admin',
    reload: load,
  };
}