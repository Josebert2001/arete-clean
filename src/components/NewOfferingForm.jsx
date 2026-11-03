import { useEffect, useMemo, useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { departments, getDepartment } from '../data/departments';
import { currentAcademicSession, isAcademicSession } from '../utils/academicSession';
import { normalizeCourseCode } from '../utils/courseCode';

const LEVELS = ['100L', '200L', '300L', '400L'];
const DEPARTMENT_OPTIONS = Object.values(departments);

/**
 * "New course" form, shared by the admin page and the course-rep page.
 *
 * Pass `scope` ({ department, level, academic_session }) to lock the form to
 * the rep's current cohort and session.
 */
export default function NewOfferingForm({ onCreated, scope = null }) {
  const [department, setDepartment] = useState(scope?.department ?? 'cybersecurity');
  const [level, setLevel]           = useState(scope?.level ?? '100L');
  const [code, setCode]             = useState('');
  const [title, setTitle]           = useState('');
  const [session, setSession]       = useState(currentAcademicSession());
  const [threshold, setThreshold]   = useState(70);
  const [catalogue, setCatalogue]   = useState([]);
  const [catalogueError, setCatalogueError] = useState(false);
  const [busy, setBusy]             = useState(false);
  const [message, setMessage]       = useState(null);
  const offeringSession = scope ? currentAcademicSession() : session;

  useEffect(() => {
    let cancelled = false;
    getDepartment(department).loadCatalogue()
      .then(c => { if (!cancelled) { setCatalogue(c.courses); setCatalogueError(false); } })
      .catch(() => { if (!cancelled) { setCatalogue([]); setCatalogueError(true); } });
    return () => { cancelled = true; };
  }, [department]);

  const suggestions = useMemo(
    () => catalogue.filter(c => `${c.level}L` === level),
    [catalogue, level],
  );

  function onCodeChange(value) {
    setCode(value);
    const normalized = normalizeCourseCode(value);
    const match = catalogue.find(c => c.code === normalized);
    if (match) {
      setTitle(match.title);
      if (!scope) setLevel(`${match.level}L`);
    }
  }

  async function create(e) {
    e.preventDefault();
    setMessage(null);
    const normalizedCode = normalizeCourseCode(code);
    if (!normalizedCode) { setMessage({ ok: false, text: 'Enter a valid course code, such as CYB 224.' }); return; }
    const selectedCourse = suggestions.find(c => c.code === normalizedCode);
    if (scope && !selectedCourse) { setMessage({ ok: false, text: 'Choose a course from your class catalogue.' }); return; }
    if (!isAcademicSession(offeringSession)) { setMessage({ ok: false, text: 'Write the session as two consecutive years, e.g. 2026/2027.' }); return; }

    setBusy(true);
    const values = {
      course_code:      normalizedCode,
      course_title:     scope ? selectedCourse.title : title.trim() || null,
      department,
      level,
      academic_session: offeringSession.trim(),
      ...(!scope ? { threshold_pct: Math.min(100, Math.max(1, Number(threshold) || 70)) } : {}),
    };
    let error;
    try {
      ({ error } = await supabase.from('course_offerings').insert(values));
    } catch {
      error = { message: 'Network error' };
    }
    setBusy(false);
    if (error) {
      setMessage({ ok: false, text: error.code === '23505' ? 'That course already exists for this level and session.' : 'Could not create the course.' });
      return;
    }
    setMessage({ ok: true, text: `${normalizedCode} created. Now add its lecturer below.` });
    setCode('');
    setTitle('');
    onCreated();
  }

  const field = 'w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-sm text-ink';

  return (
    <form onSubmit={create} className="mb-6 rounded-xl border border-coffee-200 bg-paper p-4">
      <p className="mb-3 text-sm font-medium text-ink">New course</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {scope ? (
          <p className="text-sm text-coffee-700 sm:col-span-2">
            For {getDepartment(scope.department).name} · {scope.level}
          </p>
        ) : (
          <>
            <label className="block" htmlFor="offering-department">
              <span className="mb-1 block text-xs font-medium text-ink">Department</span>
              <select id="offering-department" value={department} onChange={e => setDepartment(e.target.value)} className={field}>
                {DEPARTMENT_OPTIONS.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
            </label>
            <label className="block" htmlFor="offering-level">
              <span className="mb-1 block text-xs font-medium text-ink">Level</span>
              <select id="offering-level" value={level} onChange={e => setLevel(e.target.value)} className={field}>
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </label>
          </>
        )}
        <label className="block" htmlFor="offering-code">
          <span className="mb-1 block text-xs font-medium text-ink">Course code</span>
          {scope ? (
            <select id="offering-code" value={code} onChange={e => onCodeChange(e.target.value)} className={field}>
              <option value="">Choose a course</option>
              {suggestions.map(c => <option key={c.slug} value={c.code}>{c.code} · {c.title}</option>)}
            </select>
          ) : (
            <>
              <input id="offering-code" list="offering-code-options" value={code}
                onChange={e => onCodeChange(e.target.value)}
                placeholder="e.g. CYB 224" autoComplete="off" className={field} />
              <datalist id="offering-code-options">
                {suggestions.map(c => <option key={c.slug} value={c.code}>{c.title}</option>)}
              </datalist>
              {code && <p className="mt-1 text-xs text-coffee-700">Code to save: {normalizeCourseCode(code) ?? 'Invalid course code'}</p>}
            </>
          )}
        </label>
        {scope && catalogueError && <p role="status" className="text-sm text-rust sm:col-span-2">Could not load your course catalogue. Try again later.</p>}
        <label className="block" htmlFor="offering-title">
          <span className="mb-1 block text-xs font-medium text-ink">Title <span className="text-coffee-500">(optional)</span></span>
          <input id="offering-title" value={title} onChange={scope ? undefined : e => setTitle(e.target.value)} readOnly={!!scope} className={field} />
        </label>
        <label className="block" htmlFor="offering-session">
          <span className="mb-1 block text-xs font-medium text-ink">Academic session</span>
          <input id="offering-session" value={offeringSession} onChange={scope ? undefined : e => setSession(e.target.value)} readOnly={!!scope} placeholder="2026/2027" className={field} />
        </label>
        {scope ? (
          <p className="text-sm text-coffee-700 sm:col-span-2">The lecturer sets the attendance requirement.</p>
        ) : (
          <label className="block" htmlFor="offering-threshold">
            <span className="mb-1 block text-xs font-medium text-ink">Attendance required (%)</span>
            <input id="offering-threshold" type="number" min={1} max={100} value={threshold} onChange={e => setThreshold(e.target.value)} className={field} />
          </label>
        )}
      </div>
      <button type="submit" disabled={busy} className="btn-primary mt-4 inline-flex items-center gap-1.5 text-sm disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create course
      </button>
      {message && <p role="status" className={`mt-3 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>{message.text}</p>}
    </form>
  );
}
