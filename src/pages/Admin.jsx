import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, Lock, Search, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useLecturer } from '../components/useLecturer';
import { getDepartment } from '../data/departments';
import NewOfferingForm from '../components/NewOfferingForm';
import { rpcAction } from '../utils/rpcAction';

/**
 * Admin console for attendance: who is a lecturer, which course offerings
 * exist, and which lecturers run each one. Everything that used to need the
 * Supabase SQL editor, except granting the very first admin.
 *
 * Like the lecturer pages, the gate here only decides what the UI shows. The
 * real boundary is in the database (migration 20260924000000): role changes
 * and user lookup go through admin-only SECURITY DEFINER functions, and the
 * offering tables carry admin-only write policies.
 *
 * Course reps (migration 20260925000000) are appointed here and then invite
 * their own cohort's lecturers; the invite log below is the admin's view of
 * everything they do.
 */
export default function Admin() {
  const { status: roleStatus, role } = useLecturer();
  const [staff, setStaff]         = useState([]);
  const [reps, setReps]           = useState([]);
  const [staffError, setStaffError] = useState('');

  const loadStaff = useCallback(async () => {
    const [staffRes, repRes] = await Promise.all([
      supabase.rpc('admin_list_staff'),
      supabase.rpc('admin_list_course_reps'),
    ]);
    if (staffRes.error || repRes.error) { setStaffError('Could not load the staff list. Please reload.'); return; }
    setStaffError('');
    setStaff(staffRes.data ?? []);
    setReps(repRes.data ?? []);
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
          Make someone a lecturer, create the courses they teach, then assign them. Or appoint
          a course rep to invite their class's lecturers, and review what they did below.
        </p>
      </header>

      {staffError && <Alert>{staffError}</Alert>}

      <StaffPanel staff={staff} reps={reps} onChange={loadStaff} />
      <RepsPanel reps={reps} onChange={loadStaff} />
      <OfferingsPanel staff={staff} />
      <InviteLog />
      <AttendanceChanges />
    </div>
  );
}

// ── Lecturers ──────────────────────────────────────────────────────────────
function StaffPanel({ staff, reps, onChange }) {
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
    const res = await rpcAction('admin_set_role', { p_user_id: userId, p_role: nextRole }, 'Could not change the role. Please try again.');
    setBusy(false);
    setConfirmRemove(null);
    setMessage(res);
    if (res.ok) {
      setResults(rs => rs?.map(r => (r.id === userId ? { ...r, role: nextRole } : r)) ?? rs);
      onChange();
    }
  }

  async function makeRep(person) {
    setMessage(null);
    setBusy(true);
    const res = await rpcAction('admin_set_course_rep', {
      p_user_id: person.id, p_department: person.department, p_level: person.level,
    }, 'Could not appoint the course rep. Please try again.');
    setBusy(false);
    setMessage(res);
    if (res.ok) onChange();
  }

  const repIds = new Set(reps.map(r => r.id));

  function roleButtons(person) {
    if (person.id === user?.id) return <span className="text-xs text-coffee-500">You</span>;
    if (repIds.has(person.id)) return <span className="text-xs text-coffee-500">Course rep</span>;
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
        {/* A rep is scoped to the class on their own profile — no class, no button. */}
        {!person.role && person.department && person.level && (
          <button type="button" disabled={busy} onClick={() => makeRep(person)} className="btn-ghost text-xs">
            Make course rep ({getDepartment(person.department).name} {person.level})
          </button>
        )}
        {person.role && (
          <button type="button" disabled={busy} onClick={() => setConfirmRemove(person.id)} className="btn-ghost text-xs text-rust">Remove role</button>
        )}
      </div>
    );
  }

  return (
    <section className="mb-10 rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Lecturers and course reps</h2>
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

// ── Course reps ────────────────────────────────────────────────────────────
function RepsPanel({ reps, onChange }) {
  const [busy, setBusy]       = useState(false);
  const [message, setMessage] = useState(null);

  async function remove(rep) {
    setBusy(true);
    setMessage(null);
    const res = await rpcAction('admin_set_course_rep', {
      p_user_id: rep.id, p_department: null, p_level: null,
    }, 'Could not remove the course rep.');
    setBusy(false);
    setMessage(res);
    if (res.ok) onChange();
  }

  return (
    <section className="mb-10 rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Course reps ({reps.length})</h2>
      <p className="mb-4 text-sm text-coffee-700">
        A rep can create courses and invite lecturers for their own class only. They stay a
        student: they still check in, and cannot mark attendance. Removing a rep keeps the
        lecturers they added; review those in the invite log.
      </p>
      {message && (
        <p role="status" className={`mb-4 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>{message.text}</p>
      )}
      {reps.length === 0 ? (
        <p className="text-sm text-coffee-700">No course reps yet. Search for a student above and choose Make course rep.</p>
      ) : (
        <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
          {reps.map(r => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{r.full_name || r.email}</p>
                <p className="truncate text-xs text-coffee-500">
                  {getDepartment(r.department).name} · {r.level} · {r.email}
                </p>
              </div>
              <button type="button" disabled={busy} onClick={() => remove(r)} className="btn-ghost text-xs text-rust">
                Remove as rep
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ── Invite log ─────────────────────────────────────────────────────────────
const INVITE_STATUS = {
  pending:  { label: 'Pending',   className: 'bg-ember/15 text-ember' },
  awaiting_approval: { label: 'Needs your approval', className: 'bg-rust/15 text-rust' },
  accepted: { label: 'On course', className: 'bg-moss/15 text-moss' },
  revoked:  { label: 'Cancelled', className: 'bg-coffee-100 text-coffee-600' },
  removed:  { label: 'Removed',   className: 'bg-coffee-100 text-coffee-600' },
};

function InviteLog() {
  const [status, setStatus]   = useState('loading');
  const [invites, setInvites] = useState([]);
  const [busy, setBusy]       = useState(false);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase.rpc('admin_list_invites');
    if (error) { setStatus('error'); return; }
    const now = Date.now();
    setInvites((data ?? []).map(i => ({
      ...i,
      account_age_days: i.accepted_by_joined_at
        ? Math.floor((now - new Date(i.accepted_by_joined_at).getTime()) / 86400000)
        : null,
    })));
    setStatus('ready');
  }, []);

  useEffect(() => { (async () => { await load(); })(); }, [load]);

  async function decide(invite, approve) {
    setBusy(true);
    setMessage(null);
    const res = await rpcAction('admin_decide_invite', { p_invite_id: invite.id, p_approve: approve }, 'Could not update the invite.');
    setBusy(false);
    setMessage(res);
    if (res.ok) load();
  }

  async function revoke(invite) {
    setBusy(true);
    setMessage(null);
    const res = await rpcAction('revoke_lecturer_invite', { p_invite_id: invite.id }, 'Could not update the invite.');
    setBusy(false);
    setMessage(res);
    if (res.ok) load();
  }

  return (
    <section className="mt-10 rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Invite log</h2>
      <p className="mb-4 text-sm text-coffee-700">
        Every lecturer invite sent by a course rep (or by you), newest first. Someone who
        is not yet a lecturer only becomes one when you approve them here. Before
        approving, check the account: a new account, a reg number, or any classes
        attended as a student all point to a student&apos;s second account.
      </p>
      {message && (
        <p role="status" className={`mb-4 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>{message.text}</p>
      )}
      {status === 'loading' && <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></div>}
      {status === 'error' && <p className="text-sm text-rust">Could not load the invite log. Please reload the page.</p>}
      {status === 'ready' && (
        invites.length === 0 ? (
          <p className="text-sm text-coffee-700">No invites yet.</p>
        ) : (
          <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
            {invites.map(i => {
              const expired = i.status === 'pending' && new Date(i.expires_at) < new Date();
              const badge = expired ? { label: 'Expired', className: 'bg-coffee-100 text-coffee-600' } : INVITE_STATUS[i.status];
              return (
                <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">
                      {i.accepted_by_name || i.email}
                      <span className={`ml-2 rounded-md px-1.5 py-0.5 align-middle text-xs font-medium ${badge.className}`}>{badge.label}</span>
                    </p>
                    <p className="truncate text-xs text-coffee-500">
                      {i.course_code} · {getDepartment(i.department).name} {i.level} · {i.academic_session}
                      {' · invited by '}{i.invited_by_name || 'unknown'} on {new Date(i.created_at).toLocaleDateString()}
                    </p>
                    {i.accepted_by_email && <AccountEvidence invite={i} />}
                  </div>
                  {i.status === 'awaiting_approval' && (
                    <div className="flex flex-wrap gap-2">
                      <button type="button" disabled={busy} onClick={() => decide(i, true)} className="btn-primary text-xs">Approve</button>
                      <button type="button" disabled={busy} onClick={() => decide(i, false)} className="btn-ghost text-xs text-rust">Reject</button>
                    </div>
                  )}
                  {(i.status === 'accepted' || (i.status === 'pending' && !expired)) && (
                    <button type="button" disabled={busy} onClick={() => revoke(i)} className="btn-ghost text-xs text-rust">
                      {i.status === 'accepted' ? 'Remove from course' : 'Cancel invite'}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )
      )}
    </section>
  );
}

// What the admin needs to judge a would-be lecturer. Reg number alone isn't
// enough — it's optional, and a fresh second account has none.
function AccountEvidence({ invite: i }) {
  const ageDays = i.account_age_days;
  const attended = Number(i.accepted_by_classes_attended ?? 0);
  const warn = 'font-medium text-rust';
  return (
    <p className="text-xs text-coffee-500">
      Accepted by {i.accepted_by_email}
      {' · '}
      {ageDays === null ? 'account age unknown'
        : <span className={ageDays < 14 ? warn : undefined}>account {ageDays === 0 ? 'created today' : `${ageDays} days old`}</span>}
      {' · '}
      <span className={attended > 0 ? warn : undefined}>
        {attended > 0 ? `checked in to ${attended} class${attended === 1 ? '' : 'es'} as a student` : 'no classes attended as a student'}
      </span>
      {i.accepted_by_reg && <span className={warn}> · reg number {i.accepted_by_reg} (a student account)</span>}
    </p>
  );
}

// ── Attendance changes (audit log) ─────────────────────────────────────────
const ACTION_LABEL = { insert: 'Added', update: 'Changed', delete: 'Deleted' };

function AttendanceChanges() {
  const [status, setStatus]         = useState('loading');
  const [changes, setChanges]       = useState([]);
  const [flaggedOnly, setFlaggedOnly] = useState(true);

  const load = useCallback(async () => {
    setStatus('loading');
    const { data, error } = await supabase.rpc('admin_list_attendance_changes', { p_flagged_only: flaggedOnly });
    if (error) { setStatus('error'); return; }
    setChanges(data ?? []);
    setStatus('ready');
  }, [flaggedOnly]);

  useEffect(() => { (async () => { await load(); })(); }, [load]);

  return (
    <section className="mt-10 rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Attendance changes</h2>
      <p className="mb-4 text-sm text-coffee-700">
        Every attendance mark a lecturer added, changed or deleted by hand. Flagged: the
        student is a course rep, or the lecturer was brought in by a rep&apos;s invite. Both
        together on one row is the pattern to check first.
      </p>
      <label className="mb-4 inline-flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" checked={flaggedOnly} onChange={e => setFlaggedOnly(e.target.checked)} />
        Flagged only
      </label>

      {status === 'loading' && <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></div>}
      {status === 'error' && <p className="text-sm text-rust">Could not load attendance changes. Please reload the page.</p>}
      {status === 'ready' && (
        changes.length === 0 ? (
          <p className="text-sm text-coffee-700">{flaggedOnly ? 'Nothing flagged.' : 'No manual changes yet.'}</p>
        ) : (
          <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
            {changes.map(c => (
              <li key={c.id} className="px-4 py-3">
                <p className="font-medium text-ink">
                  {ACTION_LABEL[c.action]} · {c.student_name || 'Unknown student'}
                  {c.student_reg ? ` (${c.student_reg})` : ''}
                  {c.student_is_rep && <Flag>Course rep</Flag>}
                  {c.actor_invited_by_rep && <Flag>Lecturer via rep invite</Flag>}
                </p>
                <p className="text-xs text-coffee-500">
                  {c.course_code ?? 'Deleted course'}{c.held_on ? ` · class of ${c.held_on}` : ''}
                  {' · by '}{c.actor_name || 'unknown'} ({c.actor_role})
                  {' · '}{new Date(c.changed_at).toLocaleString()}
                </p>
                <p className="text-xs text-coffee-700">
                  {c.old_status && c.new_status ? `${c.old_status} → ${c.new_status}` : (c.new_status || c.old_status)}
                  {c.reason ? ` · reason: ${c.reason}` : ''}
                </p>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}

function Flag({ children }) {
  return <span className="ml-2 rounded-md bg-rust/15 px-1.5 py-0.5 align-middle text-xs font-medium text-rust">{children}</span>;
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
