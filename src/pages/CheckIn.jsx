import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getDeviceId } from '../utils/deviceId';

/**
 * Student check-in. Shows the sessions open right now, lets the student pick
 * one, enter the code from the board, and mark themselves present.
 *
 * The student writes nothing directly to the database: submitting calls the
 * server-side check_in() function, which verifies the code, the open window and
 * the device before recording anything. The browser cannot bypass those checks.
 */
export default function CheckIn() {
  const { user, authLoading } = useAuth();
  const [status, setStatus]   = useState('loading'); // loading | ready | error
  const [sessions, setSessions] = useState([]);
  const [chosen, setChosen]   = useState('');
  const [code, setCode]       = useState('');
  const [busy, setBusy]       = useState(false);
  const [result, setResult]   = useState(null); // { ok, message }

  // Load the sessions that are open right now. RLS lets a student read a session
  // only once they've been marked in it, so for *discovery* of open sessions we
  // read from course_offerings + class_sessions the offerings anyone may read.
  const loadOpen = useCallback(async () => {
    if (!supabase || !user) { setStatus('ready'); return; }
    setStatus('loading');

    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from('class_sessions')
      .select('id, title, held_on, closes_at, status, course_offerings(course_code, course_title, level, department)')
      .eq('status', 'open')
      .gt('closes_at', nowIso)
      .order('opened_at', { ascending: false });

    if (error) { setStatus('error'); return; }
    setSessions(data ?? []);
    if ((data ?? []).length && !chosen) setChosen(data[0].id);
    setStatus('ready');
  }, [user, chosen]);

  useEffect(() => {
    if (authLoading) return;
    loadOpen();
  }, [authLoading, loadOpen]);

  // Ask the browser for location — used only as a flag, never a block. If the
  // student refuses or it times out, we check in without coordinates.
  function getLocation() {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve({ lat: null, lng: null });
      navigator.geolocation.getCurrentPosition(
        p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => resolve({ lat: null, lng: null }),
        { timeout: 5000, maximumAge: 60000 },
      );
    });
  }

  async function submit() {
    if (!chosen || !code.trim()) return;
    setBusy(true);
    setResult(null);

    const { lat, lng } = await getLocation();

    const { data, error } = await supabase.rpc('check_in', {
      p_session_id:  chosen,
      p_code:        code.trim(),
      p_device_hash: getDeviceId(),
      p_lat:         lat,
      p_lng:         lng,
    });

    if (error) {
      setResult({ ok: false, message: 'Something went wrong. Please try again.' });
      setBusy(false);
      return;
    }

    // check_in returns a single row: { ok, message, flagged }
    const row = Array.isArray(data) ? data[0] : data;
    setResult({ ok: row?.ok ?? false, message: row?.message ?? 'Unknown response.' });
    if (row?.ok) setCode('');
    setBusy(false);
  }

  if (authLoading || status === 'loading') {
    return <Centered><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></Centered>;
  }
  if (status === 'error') {
    return <Centered><p className="text-coffee-700">Could not load classes. Please reload the page.</p></Centered>;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Attendance</p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">Check in</h1>
        <p className="mt-2 text-coffee-700">
          Pick your class, type the code your lecturer is showing, and tap check in.
        </p>
      </header>

      {result && (
        <div
          role="alert"
          className={`mb-6 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
            result.ok
              ? 'border-moss/30 bg-moss/10 text-moss'
              : 'border-rust/30 bg-rust/10 text-rust'
          }`}
        >
          {result.ok && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
          <span>{result.message}</span>
        </div>
      )}

      {sessions.length === 0 ? (
        <p className="rounded-2xl border border-coffee-200 bg-cream px-4 py-8 text-center text-coffee-700">
          No class is open for check-in right now. It appears here the moment your
          lecturer opens one.
        </p>
      ) : (
        <div className="rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
          <label className="mb-4 block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Class</span>
            <select
              value={chosen}
              onChange={e => setChosen(e.target.value)}
              className="w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-ink"
            >
              {sessions.map(s => {
                const o = s.course_offerings;
                return (
                  <option key={s.id} value={s.id}>
                    {o?.course_code} · {o?.level} {s.title ? `· ${s.title}` : ''}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="mb-5 block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Code on the board</span>
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. 4827"
              className="w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-center text-2xl font-mono tracking-widest text-ink"
            />
          </label>

          <button
            type="button"
            onClick={submit}
            disabled={busy || !code.trim()}
            className="btn-primary inline-flex w-full items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            Check in
          </button>

          <p className="mt-3 text-center text-xs text-coffee-500">
            Your location may be recorded to confirm you are in class.
          </p>
        </div>
      )}
    </div>
  );
}

function Centered({ children }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      {children}
    </div>
  );
}
