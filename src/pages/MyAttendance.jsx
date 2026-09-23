import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const TONE = {
  present: 'bg-moss/15 text-moss',
  manual:  'bg-moss/15 text-moss',
  absent:  'bg-rust/15 text-rust',
};

/**
 * A student's own attendance, grouped by course, with a percentage per course
 * and a threshold flag.
 *
 * The percentage comes from my_attendance_summary() — attended vs. every
 * CLOSED session held for a course, the same "total held" figure the
 * lecturer's register uses. Reading straight off attendance_records instead
 * (this student's own rows only) would always read 100%: a student has no
 * row for a class they missed, only for ones they attended. The per-check-in
 * list below is still read directly from attendance_records — RLS returns
 * only the caller's own rows — since the summary RPC has no per-session detail.
 */
export default function MyAttendance() {
  const { user, authLoading } = useAuth();
  const [status, setStatus]   = useState('loading'); // loading | ready | error
  const [summary, setSummary] = useState([]);
  const [rows, setRows]       = useState([]);

  useEffect(() => {
    if (authLoading || !user || !supabase) return;
    let cancelled = false;

    (async () => {
      const [sumRes, recRes] = await Promise.all([
        supabase.rpc('my_attendance_summary'),
        supabase
          .from('attendance_records')
          .select('id, status, marked_at, class_sessions(held_on, title, course_offerings(id))')
          .eq('student_id', user.id)
          .order('marked_at', { ascending: false }),
      ]);

      if (cancelled) return;
      if (sumRes.error || recRes.error) { setStatus('error'); return; }
      setSummary(sumRes.data ?? []);
      setRows(recRes.data ?? []);
      setStatus('ready');
    })();

    return () => { cancelled = true; };
  }, [authLoading, user]);

  // Per-check-in list, grouped by offering id, for the detail list under each
  // course card — the summary RPC gives the honest percentage, this gives the
  // dates.
  const recordsByOffering = useMemo(() => {
    const map = new Map();
    for (const r of rows) {
      const offeringId = r.class_sessions?.course_offerings?.id;
      if (!offeringId) continue;
      if (!map.has(offeringId)) map.set(offeringId, []);
      map.get(offeringId).push(r);
    }
    return map;
  }, [rows]);

  const courses = useMemo(() => {
    return summary.map(s => {
      const total = Number(s.total_held);
      const present = Number(s.attended);
      const pct = total ? Math.round((present / total) * 100) : 0;
      const threshold = s.threshold_pct ?? 70;
      return {
        offering: s,
        records: recordsByOffering.get(s.offering_id) ?? [],
        total, present, pct, threshold,
        below: total > 0 && pct < threshold,
      };
    });
  }, [summary, recordsByOffering]);

  if (authLoading || status === 'loading') {
    return (
      <div className="mx-auto flex max-w-3xl justify-center px-6 py-24">
        <Loader2 className="h-5 w-5 animate-spin text-coffee-500" />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-coffee-700">Could not load your attendance. Please reload the page.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Attendance</p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">My attendance</h1>
        <p className="mt-2 text-coffee-700">Your record for each course, and your percentage so far.</p>
      </header>

      {courses.length === 0 ? (
        <p className="rounded-2xl border border-coffee-200 bg-cream px-4 py-8 text-center text-coffee-700">
          No courses on your roster yet. It appears here once your lecturer opens a class for your course.
        </p>
      ) : (
        <div className="space-y-6">
          {courses.map(c => (
            <section key={c.offering.offering_id} className="overflow-hidden rounded-2xl border border-coffee-200 bg-cream">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-coffee-200 px-4 py-3">
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    {c.offering.course_code} <span className="text-coffee-500">· {c.offering.level}</span>
                  </p>
                  {c.offering.course_title && (
                    <p className="text-sm text-coffee-700">{c.offering.course_title}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${c.below ? 'text-rust' : 'text-moss'}`}>{c.pct}%</p>
                  <p className="text-xs text-coffee-500">{c.present} of {c.total} classes</p>
                </div>
              </div>

              {c.below && (
                <div className="flex items-center gap-2 bg-rust/10 px-4 py-2 text-xs text-rust">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Below the {c.threshold}% requirement.
                </div>
              )}

              {c.records.length === 0 ? (
                <p className="px-4 py-3 text-sm text-coffee-500">No check-ins recorded yet for this course.</p>
              ) : (
                <ul className="divide-y divide-coffee-200">
                  {c.records.map(r => (
                    <li key={r.id} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-sm text-coffee-700">
                        {r.class_sessions?.held_on}
                        {r.class_sessions?.title ? ` · ${r.class_sessions.title}` : ''}
                      </span>
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${TONE[r.status] ?? TONE.absent}`}>
                        {r.status === 'manual' ? 'present' : r.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
