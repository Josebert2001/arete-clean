import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [repScope, setRepScope]   = useState(null);

  // Guards against a stale response landing after a newer call started —
  // e.g. one user signs out and another signs in on a shared/kiosk browser
  // before the first call's Promise.all resolves. Without this, that stale
  // response can overwrite the new user's role/offerings with the previous
  // user's.
  const loadToken = useRef(0);

  const load = useCallback(async () => {
    const token = ++loadToken.current;

    if (!supabase || !user) {
      if (token !== loadToken.current) return;
      setRole(null);
      setOfferings([]);
      setRepScope(null);
      setStatus('ready');
      return;
    }
    setStatus('loading');

    // Three reads at once: the user's role, the offerings they're linked to
    // (joined to the offering details the console needs to show), and whether
    // they are a course rep. Reps live in their own table, not user_roles — see
    // migration 20260925000000 for why.
    const [roleRes, offerRes, repRes] = await Promise.all([
      supabase.from('user_roles').select('role').eq('user_id', user.id).maybeSingle(),
      supabase
        .from('offering_lecturers')
        .select('offering_id, course_offerings(id, course_code, course_title, department, level, academic_session)')
        .eq('lecturer_id', user.id),
      supabase.from('course_reps').select('department, level').eq('user_id', user.id).maybeSingle(),
    ]);

    if (token !== loadToken.current) return;
    // A database without the course-reps migration yet answers "table not
    // found" — that means nobody is a rep, not that the page is broken.
    const repTableMissing = repRes.error && ['42P01', 'PGRST205'].includes(repRes.error.code);
    if (roleRes.error || offerRes.error || (repRes.error && !repTableMissing)) {
      setStatus('error');
      return;
    }

    // Flatten the joined rows into a plain list of offerings.
    const list = (offerRes.data ?? [])
      .map(r => r.course_offerings)
      .filter(Boolean);

    setRole(roleRes.data?.role ?? null);
    setOfferings(list);
    setRepScope(repRes.data ?? null);
    setStatus('ready');
  }, [user]);

  useEffect(() => {
    if (authLoading) return;   // wait for sign-in to settle, or we query as nobody
    (async () => { await load(); })();
  }, [authLoading, load]);

  return {
    status,
    role,
    offerings,
    isLecturer: role === 'lecturer' || role === 'admin',
    repScope,          // { department, level } for a course rep, else null
    reload: load,
  };
}