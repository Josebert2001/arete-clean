import { useCallback, useEffect, useState } from 'react';
import { Loader2, Lock, Mail, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLecturer } from '../components/useLecturer';
import NewOfferingForm from '../components/NewOfferingForm';
import { getDepartment } from '../data/departments';

/**
 * Course-rep console: the rep's own class only. They create its courses,
 * invite lecturers by email, and remove lecturers or cancel invites. The
 * invited lecturer accepts at /invitations.
 *
 * The gate here only decides what the UI shows. Every write is scoped to the
 * rep's department + level by the database (migration 20260925000000), and the
 * admin sees everything a rep does in the invite log on /admin.
 */
export default function CourseRep() {
  const { status: roleStatus, repScope } = useLecturer();

  if (roleStatus === 'loading') {
    return <Centered><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></Centered>;
  }
  if (roleStatus === 'error') {
    return <Centered><p className="text-coffee-700">Could not check your access. Please reload the page.</p></Centered>;
  }
  if (!repScope) {
    return (
      <Centered>
        <Lock className="mb-3 h-6 w-6 text-coffee-400" />
        <h1 className="display-heading mb-2 text-2xl text-ink">Course reps only</h1>
        <p className="text-coffee-700">This page is for a class's course rep to add their lecturers.</p>
      </Centered>
    );
  }

  return <RepConsole scope={repScope} />;
}

function RepConsole({ scope }) {
  const [status, setStatus]       = useState('loading');
  const [offerings, setOfferings] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [invites, setInvites]     = useState([]);
  const [busy, setBusy]           = useState(false);
  const [message, setMessage]     = useState(null);

  const load = useCallback(async () => {
    const [offRes, lecRes, invRes] = await Promise.all([
      supabase.from('course_offerings').select('*')
        .eq('department', scope.department).eq('level', scope.level)
        .order('academic_session', { ascending: false })
        .order('course_code'),
      supabase.rpc('rep_cohort_lecturers'),
      supabase.from('lecturer_invites').select('id, offering_id, email, status, expires_at')
        .in('status', ['pending', 'awaiting_approval']),
    ]);
    if (offRes.error || lecRes.error || invRes.error) { setStatus('error'); return; }
    setOfferings(offRes.data ?? []);
    setLecturers(lecRes.data ?? []);
    setInvites(invRes.data ?? []);
    setStatus('ready');
  }, [scope.department, scope.level]);

  useEffect(() => { (async () => { await load(); })(); }, [load]);

  async function rpc(name, args) {
    setBusy(true);
    setMessage(null);
    const { data, error } = await supabase.rpc(name, args);
    setBusy(false);
    if (error) { setMessage({ ok: false, text: 'Something went wrong. Please try again.' }); return false; }
    const row = Array.isArray(data) ? data[0] : data;
    setMessage({ ok: !!row?.ok, text: row?.message ?? 'Done.' });
    if (row?.ok) load();
    return !!row?.ok;
  }

  async function removeLecturer(offeringId, lecturerId) {
    setBusy(true);
    setMessage(null);
    const { error } = await supabase.from('offering_lecturers').delete()
      .eq('offering_id', offeringId).eq('lecturer_id', lecturerId);
    setBusy(false);
    if (error) { setMessage({ ok: false, text: 'Could not remove the lecturer.' }); return; }
    setMessage({ ok: true, text: 'Lecturer removed from the course.' });
    load();
  }

  const inviteLink = `${window.location.origin}/invitations`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Course rep</p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">
          {getDepartment(scope.department).name} · {scope.level}
        </h1>
        <p className="mt-2 text-coffee-700">
          Add your class&apos;s courses, then invite each lecturer by email. They become the
          course&apos;s lecturer once they sign in with that email and accept at{' '}
          <span className="font-mono text-sm text-ink">{inviteLink}</span>. Send them that link.
          Someone new to Areté as a lecturer is also confirmed by the admin first.
        </p>
      </header>

      <NewOfferingForm scope={scope} onCreated={load} />

      {message && (
        <p role="status" className={`mb-4 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>{message.text}</p>
      )}

      {status === 'loading' && <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></div>}
      {status === 'error' && <p className="text-sm text-rust">Could not load your class&apos;s courses. Please reload the page.</p>}
      {status === 'ready' && (
        offerings.length === 0 ? (
          <p className="text-sm text-coffee-700">No courses yet. Create the first one above.</p>
        ) : (
          <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
            {offerings.map(o => (
              <OfferingRow
                key={o.id}
                offering={o}
                lecturers={lecturers.filter(l => l.offering_id === o.id)}
                invites={invites.filter(i => i.offering_id === o.id)}
                busy={busy}
                onInvite={email => rpc('invite_lecturer', { p_offering_id: o.id, p_email: email })}
                onRevoke={id => rpc('revoke_lecturer_invite', { p_invite_id: id })}
                onRemove={lecturerId => removeLecturer(o.id, lecturerId)}
              />
            ))}
          </ul>
        )
      )}
    </div>
  );
}

function OfferingRow({ offering: o, lecturers, invites, busy, onInvite, onRevoke, onRemove }) {
  const [email, setEmail] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    if (await onInvite(email.trim())) setEmail('');
  }

  return (
    <li className="px-4 py-3">
      <p className="font-medium text-ink">
        {o.course_code}{o.course_title ? ` · ${o.course_title}` : ''}
      </p>
      <p className="text-xs text-coffee-500">{o.academic_session} · needs {o.threshold_pct}%</p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {lecturers.length === 0 && invites.length === 0 && (
          <span className="text-xs text-rust">No lecturer yet</span>
        )}
        {lecturers.map(l => (
          <span key={l.lecturer_id} className="inline-flex items-center gap-1 rounded-md bg-coffee-100 px-2 py-0.5 text-xs text-coffee-700">
            {l.full_name || l.email}
            <button
              type="button" disabled={busy}
              onClick={() => onRemove(l.lecturer_id)}
              aria-label={`Remove ${l.full_name || l.email} from ${o.course_code}`}
              className="text-coffee-500 hover:text-rust"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {invites.map(i => (
          <span key={i.id} className="inline-flex items-center gap-1 rounded-md bg-ember/15 px-2 py-0.5 text-xs text-ember">
            {i.email} · {i.status === 'awaiting_approval' ? 'awaiting admin approval' : 'invited'}
            <button
              type="button" disabled={busy}
              onClick={() => onRevoke(i.id)}
              aria-label={`Cancel invite for ${i.email}`}
              className="hover:text-rust"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <form onSubmit={submit} className="mt-3 flex flex-wrap gap-2">
        <label htmlFor={`invite-${o.id}`} className="sr-only">Lecturer&apos;s email for {o.course_code}</label>
        <input
          id={`invite-${o.id}`}
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Lecturer's email"
          className="min-w-0 flex-1 rounded-lg border border-coffee-300 bg-paper px-3 py-1.5 text-sm text-ink"
        />
        <button type="submit" disabled={busy || !email.trim()} className="btn-ghost inline-flex items-center gap-1.5 text-xs disabled:opacity-60">
          <Mail className="h-3.5 w-3.5" /> Invite
        </button>
      </form>
    </li>
  );
}

function Centered({ children }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      {children}
    </div>
  );
}
