import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, Lock, Plus, Search, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useLecturer } from '../components/useLecturer';
import { departments, getDepartment } from '../data/departments';
import { currentAcademicSession, isAcademicSession } from '../utils/academicSession';

const LEVELS = ['100L', '200L', '300L', '400L'];
const DEPARTMENT_OPTIONS = Object.values(departments);

/**
 * Admin console for attendance: who is a lecturer, which course offerings
 * exist, and which lecturers run each one. Everything that used to need the
 * Supabase SQL editor, except granting the very first admin.
 *
 * Like the lecturer pages, the gate here only decides what the UI shows. The
 * real boundary is in the database (migration 20260924000000): role changes
 * and user lookup go through admin-only SECURITY DEFINER functions, and the
 * offering tables carry admin-only write policies.
 */
export default function Admin() {
  const { status: roleStatus, role } = useLecturer();
  const [staff, setStaff]         = useState([]);
  const [staffError, setStaffError] = useState('');

  const loadStaff = useCallback(async () => {
    const { data, error } = await supabase.rpc('admin_list_staff');
    if (error) { setStaffError('Could not load the staff list. Please reload.'); return; }
    setStaffError('');
    setStaff(data ?? []);
  }, []);

  useEffect(() => {
    if (role !== 'admin') return;
    (async () => { await loadStaff(); })();
  }, [role, loadStaff]);

  if (roleStatus === 'loading') {
    return <Centered><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></Centered>;
  }
  if (roleStatus === 'error') {
    return <Centered><p className="text-coffee-700">Could not check your access. Please reload the page.</p></Centered>;
  }
  if (role !== 'admin') {
    return (
      <Centered>
        <Lock className="mb-3 h-6 w-6 text-coffee-400" />
        <h1 className="display-heading mb-2 text-2xl text-ink">Admins only</h1>
        <p className="text-coffee-700">This page is for setting up lecturers and courses for attendance.</p>
      </Centered>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Admin</p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">Attendance setup</h1>
        <p className="mt-2 text-coffee-700">
          Make someone a lecturer, create the courses they teach, then assign them. They can
          run attendance from Take Attendance straight away.
        </p>
      </header>

      {staffError && <Alert>{staffError}</Alert>}

      <StaffPanel staff={staff} onChange={loadStaff} />
      <OfferingsPanel staff={staff} />
    </div>
  );
}

// ── Lecturers ──────────────────────────────────────────────────────────────
function StaffPanel({ staff, onChange }) {
  const { user } = useAuth();
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState(null);
  const [busy, setBusy]       = useState(false);
  const [message, setMessage] = useState(null); // { ok, text }
  const [confirmRemove, setConfirmRemove] = useState(null);

  async function search(e) {
    e.preventDefault();
    if (query.trim().length < 3) {
      setMessage({ ok: false, text: 'Type at least 3 characters of an email, name or reg number.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    const { data, error } = await supabase.rpc('admin_find_users', { p_query: query.trim() });
    setBusy(false);
    if (error) { setMessage({ ok: false, text: 'Search failed. Please try again.' }); return; }
    setResults(data ?? []);
  }

  async function setRole(userId, nextRole) {
    setBusy(true);
    setMessage(null);
    const { data, error } = await supabase.rpc('admin_set_role', { p_user_id: userId, p_role: nextRole });
    setBusy(false);
    setConfirmRemove(null);
    if (error) { setMessage({ ok: false, text: 'Could not change the role. Please try again.' }); return; }
    const row = Array.isArray(data) ? data[0] : data;
    setMessage({ ok: !!row?.ok, text: row?.message ?? 'Done.' });
    if (row?.ok) {
      setResults(rs => rs?.map(r => (r.id === userId ? { ...r, role: nextRole } : r)) ?? rs);
      onChange();
    }
  }

  function roleButtons(person) {
    if (person.id === user?.id) return <span className="text-xs text-coffee-500">You</span>;
    if (confirmRemove === person.id) {
      return (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-rust">Removes them from all their courses.</span>
          <button type="button" disabled={busy} onClick={() => setRole(person.id, null)} className="btn-primary text-xs">Confirm remove</button>
          <button type="button" onClick={() => setConfirmRemove(null)} className="btn-ghost text-xs">Cancel</button>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap gap-2">
        {person.role !== 'lecturer' && (
          <button type="button" disabled={busy} onClick={() => setRole(person.id, 'lecturer')} className="btn-ghost text-xs">Make lecturer</button>
        )}
        {person.role !== 'admin' && (
          <button type="button" disabled={busy} onClick={() => setRole(person.id, 'admin')} className="btn-ghost text-xs">Make admin</button>
        )}
        {person.role && (
          <button type="button" disabled={busy} onClick={() => setConfirmRemove(person.id)} className="btn-ghost text-xs text-rust">Remove role</button>
        )}
      </div>
    );
  }

  return (
    <section className="mb-10 rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Lecturers</h2>
      <p className="mb-4 text-sm text-coffee-700">
        The lecturer must have signed in to Areté once before you can find them.
      </p>

      <form onSubmit={search} className="mb-4 flex flex-wrap gap-2">
        <label htmlFor="admin-user-search" className="sr-only">Email, name or reg number</label>
        <input
          id="admin-user-search"
          type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Email, name or reg number"
          className="min-w-0 flex-1 rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-sm text-ink"
        />
        <button type="submit" disabled={busy} className="btn-primary inline-flex items-center gap-1.5 text-sm disabled:opacity-60">
          <Search className="h-4 w-4" /> Search
        </button>
      </form>

      {message && (
        <p role="status" className={`mb-4 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>{message.text}</p>
      )}

      {results && (
        results.length === 0 ? (
          <p className="mb-6 text-sm text-coffee-700">Nobody found. Check the spelling, or ask them to sign in once first.</p>
        ) : (
          <ul className="mb-6 divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
            {results.map(r => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <PersonLabel person={r} />
                {roleButtons(r)}
              </li>
            ))}
          </ul>
        )
      )}

      <h3 className="mb-2 text-sm font-medium text-ink">Current staff ({staff.length})</h3>
      {staff.length === 0 ? (
        <p className="text-sm text-coffee-700">No lecturers yet. Search above to add one.</p>
      ) : (
        <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
          {staff.map(s => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <PersonLabel person={s} />
              {roleButtons(s)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PersonLabel({ person }) {
  return (
    <div className="min-w-0">
      <p className="truncate font-medium text-ink">
        {person.full_name || person.email}
        {person.role && (
          <span className="ml-2 rounded-md bg-ember/15 px-1.5 py-0.5 align-middle text-xs font-medium capitalize text-ember">{person.role}</span>
        )}
      </p>
      <p className="truncate text-xs text-coffee-500">
        {person.email}{person.reg_number ? ` · ${person.reg_number}` : ''}
      </p>
    </div>
  );
}

// ── Course offerings ───────────────────────────────────────────────────────
function OfferingsPanel({ staff }) {
  const [status, setStatus]       = useState('loading');
  const [offerings, setOfferings] = useState([]);
  const [links, setLinks]         = useState([]);
  const [error, setError]         = useState('');
  const [busy, setBusy]           = useState(false);

  const load = useCallback(async () => {
    const [offRes, linkRes] = await Promise.all([
      supabase.from('course_offerings').select('*')
        .order('academic_session', { ascending: false })
        .order('course_code'),
      supabase.from('offering_lecturers').select('offering_id, lecturer_id'),
    ]);
    if (offRes.error || linkRes.error) { setStatus('error'); return; }
    setOfferings(offRes.data ?? []);
    setLinks(linkRes.data ?? []);
    setStatus('ready');
  }, []);

  useEffect(() => { (async () => { await load(); })(); }, [load]);

  const staffById = useMemo(() => new Map(staff.map(s => [s.id, s])), [staff]);

  async function assign(offeringId, lecturerId) {
    if (!lecturerId) return;
    setBusy(true);
    setError('');
    const { error: e } = await supabase.from('offering_lecturers').insert({ offering_id: offeringId, lecturer_id: lecturerId });
    setBusy(false);
    if (e) { setError(e.code === '23505' ? 'That lecturer is already on this course.' : 'Could not assign the lecturer.'); return; }
    load();
  }

  async function unassign(offeringId, lecturerId) {
    setBusy(true);
    setError('');
    const { error: e } = await supabase.from('offering_lecturers').delete()
      .eq('offering_id', offeringId).eq('lecturer_id', lecturerId);
    setBusy(false);
    if (e) { setError('Could not remove the lecturer.'); return; }
    load();
  }

  return (
    <section className="rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Courses</h2>
      <p className="mb-4 text-sm text-coffee-700">
        A course here is one run of a course, e.g. CYB 224 for 200L in 2026/2027. Students
        whose profile has the same department and level can check in to it.
      </p>

      <NewOfferingForm onCreated={load} />

      {error && <Alert>{error}</Alert>}

      {status === 'loading' && <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></div>}
      {status === 'error' && <p className="text-sm text-rust">Could not load courses. Please reload the page.</p>}
      {status === 'ready' && (
        offerings.length === 0 ? (
          <p className="text-sm text-coffee-700">No courses yet. Create the first one above.</p>
        ) : (
          <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
            {offerings.map(o => {
              const assigned = links.filter(l => l.offering_id === o.id).map(l => l.lecturer_id);
              const available = staff.filter(s => !assigned.includes(s.id));
              return (
                <li key={o.id} className="px-4 py-3">
                  <p className="font-medium text-ink">
                    {o.course_code}{o.course_title ? ` · ${o.course_title}` : ''}
                  </p>
                  <p className="text-xs text-coffee-500">
                    {getDepartment(o.department).name} · {o.level} · {o.academic_session} · needs {o.threshold_pct}%
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {assigned.length === 0 && <span className="text-xs text-rust">No lecturer assigned</span>}
                    {assigned.map(id => {
                      const s = staffById.get(id);
                      return (
                        <span key={id} className="inline-flex items-center gap-1 rounded-md bg-coffee-100 px-2 py-0.5 text-xs text-coffee-700">
                          {s?.full_name || s?.email || 'Former lecturer'}
                          <button
                            type="button" disabled={busy}
                            onClick={() => unassign(o.id, id)}
                            aria-label={`Remove ${s?.full_name || s?.email || 'lecturer'} from ${o.course_code}`}
                            className="text-coffee-500 hover:text-rust"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                    {available.length > 0 && (
                      <select
                        id={`assign-${o.id}`}
                        aria-label={`Assign a lecturer to ${o.course_code}`}
                        value=""
                        disabled={busy}
                        onChange={e => assign(o.id, e.target.value)}
                        className="rounded-lg border border-coffee-300 bg-paper px-2 py-1 text-xs text-ink"
                      >
                        <option value="">+ Assign lecturer…</option>
                        {available.map(s => (
                          <option key={s.id} value={s.id}>{s.full_name || s.email}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )
      )}
    </section>
  );
}

function NewOfferingForm({ onCreated }) {
  const [department, setDepartment] = useState('cybersecurity');
  const [level, setLevel]           = useState('100L');
  const [code, setCode]             = useState('');
  const [title, setTitle]           = useState('');
  const [session, setSession]       = useState(currentAcademicSession());
  const [threshold, setThreshold]   = useState(70);
  const [catalogue, setCatalogue]   = useState([]);
  const [busy, setBusy]             = useState(false);
  const [message, setMessage]       = useState(null);

  // The department's catalogue feeds the course-code suggestions. A failed
  // chunk load only loses the suggestions; the admin can still type a code.
  useEffect(() => {
    let cancelled = false;
    getDepartment(department).loadCatalogue()
      .then(c => { if (!cancelled) setCatalogue(c.courses); })
      .catch(() => { if (!cancelled) setCatalogue([]); });
    return () => { cancelled = true; };
  }, [department]);

  const suggestions = useMemo(
    () => catalogue.filter(c => `${c.level}L` === level),
    [catalogue, level],
  );

  function onCodeChange(value) {
    setCode(value);
    const match = catalogue.find(c => c.code.toLowerCase() === value.trim().toLowerCase());
    if (match) {
      setTitle(match.title);
      setLevel(`${match.level}L`);
    }
  }

  async function create(e) {
    e.preventDefault();
    setMessage(null);
    if (!code.trim()) { setMessage({ ok: false, text: 'Enter a course code.' }); return; }
    if (!isAcademicSession(session)) { setMessage({ ok: false, text: 'Write the session as two consecutive years, e.g. 2026/2027.' }); return; }

    setBusy(true);
    const { error } = await supabase.from('course_offerings').insert({
      course_code:      code.trim().toUpperCase(),
      course_title:     title.trim() || null,
      department,
      level,
      academic_session: session.trim(),
      threshold_pct:    Math.min(100, Math.max(1, Number(threshold) || 70)),
    });
    setBusy(false);
    if (error) {
      setMessage({ ok: false, text: error.code === '23505' ? 'That course already exists for this level and session.' : 'Could not create the course.' });
      return;
    }
    setMessage({ ok: true, text: `${code.trim().toUpperCase()} created. Now assign a lecturer below.` });
    setCode('');
    setTitle('');
    onCreated();
  }

  const field = 'w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-sm text-ink';

  return (
    <form onSubmit={create} className="mb-6 rounded-xl border border-coffee-200 bg-paper p-4">
      <p className="mb-3 text-sm font-medium text-ink">New course</p>
      <div className="grid gap-3 sm:grid-cols-2">
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
        <label className="block" htmlFor="offering-code">
          <span className="mb-1 block text-xs font-medium text-ink">Course code</span>
          <input
            id="offering-code" list="offering-code-options" value={code}
            onChange={e => onCodeChange(e.target.value)}
            placeholder="e.g. CYB 224" autoComplete="off" className={field}
          />
          <datalist id="offering-code-options">
            {suggestions.map(c => <option key={c.slug} value={c.code}>{c.title}</option>)}
          </datalist>
        </label>
        <label className="block" htmlFor="offering-title">
          <span className="mb-1 block text-xs font-medium text-ink">Title <span className="text-coffee-500">(optional)</span></span>
          <input id="offering-title" value={title} onChange={e => setTitle(e.target.value)} className={field} />
        </label>
        <label className="block" htmlFor="offering-session">
          <span className="mb-1 block text-xs font-medium text-ink">Academic session</span>
          <input id="offering-session" value={session} onChange={e => setSession(e.target.value)} placeholder="2026/2027" className={field} />
        </label>
        <label className="block" htmlFor="offering-threshold">
          <span className="mb-1 block text-xs font-medium text-ink">Attendance required (%)</span>
          <input id="offering-threshold" type="number" min={1} max={100} value={threshold} onChange={e => setThreshold(e.target.value)} className={field} />
        </label>
      </div>
      <button type="submit" disabled={busy} className="btn-primary mt-4 inline-flex items-center gap-1.5 text-sm disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create course
      </button>
      {message && <p role="status" className={`mt-3 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>{message.text}</p>}
    </form>
  );
}

function Alert({ children }) {
  return (
    <div role="alert" className="mb-6 rounded-xl border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-rust">
      {children}
    </div>
  );
}

function Centered({ children }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      {children}
    </div>
  );
}
