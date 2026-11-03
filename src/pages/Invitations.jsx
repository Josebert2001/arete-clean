import { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getDepartment } from '../data/departments';
import { rpcAction } from '../utils/rpcAction';

/**
 * Where an invited lecturer accepts a course rep's invite. The invite is
 * matched to the signed-in email by the database, so this page only ever
 * lists invites addressed to this account. Accepting grants the lecturer role
 * and links them to the course — straight away for an existing lecturer, and
 * after the admin approves them for anyone becoming a lecturer for the first
 * time (migration 20260925010000).
 */
export default function Invitations() {
  const { user } = useAuth();
  const [status, setStatus]   = useState('loading');
  const [invites, setInvites] = useState([]);
  const [busy, setBusy]       = useState(false);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    // The function, not a table read: it also says why an invite can't be
    // accepted (sender no longer rep, you're in that class, …), which the
    // browser can't work out under RLS.
    const { data, error } = await supabase.rpc('my_lecturer_invites');
    if (error) { setStatus('error'); return; }
    setInvites(data ?? []);
    setStatus('ready');
  }, []);

  useEffect(() => { (async () => { await load(); })(); }, [load]);

  async function accept(id) {
    setBusy(true);
    setMessage(null);
    const res = await rpcAction('accept_lecturer_invite', { p_invite_id: id }, 'Could not accept the invite. Please try again.');
    setBusy(false);
    setMessage({ ...res, linked: res.ok && !res.row?.pending_approval });
    if (res.ok) load();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Attendance</p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">Lecturer invitations</h1>
        <p className="mt-2 text-coffee-700">
          A course rep has asked you to run attendance for their class. Accept to become the
          course&apos;s lecturer on Areté.
        </p>
      </header>

      {message && (
        <p role="status" className={`mb-4 text-sm ${message.ok ? 'text-moss' : 'text-rust'}`}>
          {message.text}{' '}
          {/* A full page load, not <Link>: the navbar holds its own copy of the
              role, and only a fresh load swaps its student links for lecturer ones. */}
          {message.linked && <a href="/teach" className="underline">Take Attendance</a>}
        </p>
      )}

      {status === 'loading' && <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></div>}
      {status === 'error' && <p className="text-sm text-rust">Could not load your invitations. Please reload the page.</p>}
      {status === 'ready' && (
        invites.length === 0 ? (
          <p className="text-sm text-coffee-700">
            No open invitations for {user?.email}. If you expected one, check you signed in with the
            email the course rep used.
          </p>
        ) : (
          <ul className="divide-y divide-coffee-200 rounded-xl border border-coffee-200 bg-paper">
            {invites.map(i => {
              return (
                <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">
                      {i.course_code}{i.course_title ? ` · ${i.course_title}` : ''}
                    </p>
                    <p className="text-xs text-coffee-500">
                      {getDepartment(i.department).name} · {i.level} · {i.academic_session}
                    </p>
                    {i.blocked_reason && <p className="mt-1 text-xs text-rust">{i.blocked_reason}</p>}
                  </div>
                  {i.status === 'awaiting_approval' ? (
                    <span className="text-sm text-coffee-700">Waiting for admin approval</span>
                  ) : i.blocked_reason ? null : (
                    <button type="button" disabled={busy} onClick={() => accept(i.id)} className="btn-primary text-sm">
                      Accept
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )
      )}
    </div>
  );
}
