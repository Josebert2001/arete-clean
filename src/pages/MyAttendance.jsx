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
 * and a 70% flag. Read-only by design: attendance_records has no student write
 * path except the check_in() function, and the read policy returns only the
 * student's own rows. The nested class_sessions/course_offerings reads work
 * because a student may read sessions they were marked in.
 */
export default function MyAttendance() {
  const { user, authLoading } = useAuth();
  const [status, setStatus]   = useState('loading'); // loading | ready | error
  const [rows, setRows]       = useState([]);

  useEffect(() => {
    if (authLoading || !user || !supabase) return;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('attendance_records')
        .select('id, status, marked_at, class_sessions(held_on, title, course_offerings(id, course_code, course_title, level, threshold_pct))')
        .eq('student_id', user.id)
        .order('marked_at', { ascending: false });

      if (cancelled) return;
      if (error) { setStatus('error'); return; }
      setRows(data ?? []);
      setStatus('ready');
    })();

    return () => { cancelled = true; };
  }, [authLoading, user]);

  // Group records by course offering, compute a percentage per course.
  // Denominator here is the number of THIS student's records for the course.
  // (The lecturer's register uses the stricter "all sessions opened" figure;
  // for the student's own view, showing their marked classes is clear and
  // honest — the authoritative percentage is on the lecturer's register.)
  const courses = useMemo(() => {
    const map = new Map();
    for (const r of rows) {
      const o = r.class_sessions?.course_offerings;
      if (!o) continue;
      if (!map.has(o.id)) {
        map.set(o.id, { offering: o, records: [] });
      }
      map.get(o.id).records.push(r);
    }
    return [...map.values()].map(group => {
      const total = group.records.length;
      const present = group.records.filter(r => r.status === 'present' || r.status === 'manual').length;
      const pct = total ? Math.round((present / total) * 100) : 0;
      const threshold = group.offering.threshold_pct ?? 70;
      return { ...group, total, present, pct, threshold, below: pct < threshold };
    });
  }, [rows]);

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
          No attendance recorded yet. It appears here once you check into a class.
        </p>
      ) : (
        <div className="space-y-6">
          {courses.map(c => (
            <section key={c.offering.id} className="overflow-hidden rounded-2xl border border-coffee-200 bg-cream">
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
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
