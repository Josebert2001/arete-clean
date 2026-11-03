import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getDeviceId } from '../utils/deviceId';
import { getLocation } from '../utils/geolocation';

const POLL_MS = 5000;

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

  // True once check_in() has returned ok — stops the poll below, since a
  // student who has already checked in has no reason to keep discovering
  // newly-opened sessions every 5s for the rest of the class.
  const checkedInRef = useRef(false);

  // Guards against a stale response landing after a newer call started (an
  // in-flight poll response resolving after unmount, or after a second call
  // was already issued) — without it, an out-of-order response could
  // overwrite fresher state with older data.
  const loadToken = useRef(0);

  // Load the sessions that are open right now, via discover_open_sessions()
  // rather than a direct `class_sessions` select: that table's own "anyone
  // sees open sessions" policy is row-level only and exposes checkin_code as
  // a column to any signed-in reader, which would let a student read the
  // live board code for a class without being in the room. The function
  // returns only the columns a discovery list needs.
  // `silent` skips the full-page spinner and error state — used by the poll
  // below, so a background refresh never yanks the form out from under a
  // student mid-selection.
  const loadOpen = useCallback(async ({ silent = false } = {}) => {
    const token = ++loadToken.current;
    if (!supabase || !user) { if (token === loadToken.current) setStatus('ready'); return; }
    if (!silent) setStatus('loading');

    const { data, error } = await supabase.rpc('discover_open_sessions');

    if (token !== loadToken.current) return;
    if (error) { if (!silent) setStatus('error'); return; }
    setSessions(data ?? []);
    // Functional update, not a `chosen` dependency: depending on `chosen` here
    // would recreate this callback (and re-fire the load effect) the moment
    // the first session auto-selects, costing a redundant round trip on every
    // load.
    if ((data ?? []).length) setChosen(prev => prev || data[0].id);
    if (!silent) setStatus('ready');
  }, [user]);

  // Load on mount, then poll silently — a student who opens this page before
  // the lecturer starts the class would otherwise see "no class is open"
  // forever, with no way to know without manually reloading.
  useEffect(() => {
    if (authLoading) return;
    (async () => { await loadOpen(); })();
    const poll = setInterval(() => {
      if (!checkedInRef.current) loadOpen({ silent: true });
    }, POLL_MS);
    return () => clearInterval(poll);
  }, [authLoading, loadOpen]);

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
    if (row?.ok) {
      setCode('');
      checkedInRef.current = true;
    }
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
          <span className="mt-3 block text-sm text-coffee-500">
            Class already started but not listed? Check your department and level
            on <Link to="/profile" className="underline">your profile</Link>. If you take this course as a
            carryover or elective, ask your lecturer to add you to it.
          </span>
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
              {sessions.map(s => (
                <option key={s.id} value={s.id}>
                  {s.course_code} · {s.level} {s.title ? `· ${s.title}` : ''}
                </option>
              ))}
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
