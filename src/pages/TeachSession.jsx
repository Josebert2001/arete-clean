import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarCheck, Loader2, Lock, Plus, RefreshCw, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useLecturer } from '../components/useLecturer';
import { getLocation } from '../utils/geolocation';

// A short, easy-to-read code (no confusable 0/O/1/I). Shown on the board and
// rotated every 30s so a forwarded screenshot is stale before it arrives.
function makeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

const ROTATE_MS = 30000;

export default function TeachSession() {
  const { user } = useAuth();
  const { status: roleStatus, isLecturer, offerings } = useLecturer();

  const [offeringId, setOfferingId] = useState('');
  const [windowMin, setWindowMin]   = useState(5);
  const [geofence, setGeofence]     = useState(false);
  const [radius, setRadius]         = useState(100);
  const [title, setTitle]           = useState('');
  const [session, setSession]       = useState(null);
  const [records, setRecords]       = useState([]);
  const [busy, setBusy]             = useState(false);
  const [error, setError]           = useState('');

  // Manual add
  const [manualReg, setManualReg]   = useState('');
  const [resetReg, setResetReg]     = useState('');
  const [resetMsg, setResetMsg]     = useState('');

  const pollRef = useRef(null);
  const rotateRef = useRef(null);

  // Derived, not stateful — see the same pattern in Register.jsx for why.
  const effectiveOfferingId = offeringId || offerings[0]?.id || '';

  const offering = useMemo(
    () => offerings.find(o => o.id === effectiveOfferingId) ?? null,
    [offerings, effectiveOfferingId],
  );

  // Load who has checked in, for the live list. Shared by the mount effect,
  // the poll, and the manual Refresh button, so an error surfaces the same
  // way regardless of which one triggered it.
  const loadRecords = useCallback(async (sessionId) => {
    const { data, error: e } = await supabase
      .from('attendance_records')
      .select('id, status, capture, full_name_snapshot, reg_number_snapshot, location_flagged, marked_at')
      .eq('session_id', sessionId)
      .order('marked_at', { ascending: false });
    if (e) { setError('Could not load the check-in list. Please try again.'); return; }
    setRecords(data ?? []);
  }, []);

  // While a session is open: poll the check-in list every few seconds, and
  // rotate the code every 30s. Depends on session?.id, not session itself —
  // rotate_code's own setSession() replaces the session object every 30s, and
  // depending on the whole object tore this effect down and rebuilt both
  // intervals (plus an extra loadRecords call) on every single rotation.
  useEffect(() => {
    const sessionId = session?.id;
    if (!sessionId) return;
    let cancelled = false;

    (async () => { await loadRecords(sessionId); })();
    pollRef.current = setInterval(() => loadRecords(sessionId), 4000);

    // Guards against two overlapping rotate_code calls (a slow/reordered
    // response): only the response to the MOST RECENT rotation may commit —
    // otherwise an older request resolving after a newer one could overwrite
    // the displayed code with a stale value the database no longer has.
    let rotateToken = 0;
    rotateRef.current = setInterval(async () => {
      const token = ++rotateToken;
      const next = makeCode();
      // rotate_code() returns FOUND — false when its UPDATE ... WHERE
      // status = 'open' matched no row (e.g. a co-lecturer closed the
      // session from another tab). Checking only `error` would still be null
      // in that case, and the UI would display a code that was never
      // actually persisted.
      const { data, error: e } = await supabase.rpc('rotate_code', { p_session_id: sessionId, p_new_code: next });
      if (cancelled || token !== rotateToken) return;
      if (e || !data) { setError('Could not rotate the code. The one on screen may be stale.'); return; }
      setSession(s => (s ? { ...s, checkin_code: next } : s));
    }, ROTATE_MS);

    return () => {
      cancelled = true;
      clearInterval(pollRef.current);
      clearInterval(rotateRef.current);
    };
  }, [session?.id, loadRecords]);

  async function openSession() {
    if (!offering) return;
    setBusy(true);
    setError('');

    const code = makeCode();
    const closesAt = new Date(Date.now() + windowMin * 60000).toISOString();

    // Geofence fields — only set when the lecturer turned the hard block on.
    let geoFields = {};
    if (geofence) {
      const { lat, lng } = await getLocation({ timeout: 8000 });
      if (lat === null) {
        setError('Could not get your location to set the class area. Turn on location, or uncheck the hard block.');
        setBusy(false);
        return;
      }
      geoFields = {
        perimeter_lat: lat,
        perimeter_lng: lng,
        perimeter_radius_m: radius,
        enforce_geofence: true,
      };
    }

    const { data, error: e } = await supabase
      .from('class_sessions')
      .insert({
        offering_id:  offering.id,
        title:        title.trim() || null,
        closes_at:    closesAt,
        checkin_code: code,
        created_by:   user.id,
        ...geoFields,
      })
      .select()
      .single();

    if (e) {
      setError('Could not open the session. You may not be assigned to this course.');
      setBusy(false);
      return;
    }
    setSession(data);
    setBusy(false);
  }

  async function closeSession() {
    if (!session) return;
    setBusy(true);
    const { error: e } = await supabase
      .from('class_sessions')
      .update({ status: 'closed' })
      .eq('id', session.id);
    setBusy(false);
    if (e) { setError('Could not close the session.'); return; }
    setSession(null);
    setRecords([]);
  }

  async function addManual() {
    if (!session || !manualReg.trim()) return;
    setBusy(true);
    setError('');

    // Find the real student account by the reg number the lecturer typed.
    // Lecturers may read profiles in their department (see RLS), so this
    // lookup is allowed. Manual attendance must link to the STUDENT'S account
    // (not the lecturer's) so it counts toward that student's own percentage.
    const { data: found, error: findErr } = await supabase
      .from('profiles')
      .select('id, full_name, reg_number')
      .eq('reg_number', manualReg.trim())
      .maybeSingle();

    if (findErr) {
      setError('Could not look up that reg number. Try again.');
      setBusy(false);
      return;
    }
    if (!found) {
      setError('No student found with that reg number. Check it and try again.');
      setBusy(false);
      return;
    }

    const { error: e } = await supabase
      .from('attendance_records')
      .insert({
        session_id:          session.id,
        student_id:          found.id,             // the real student's account
        status:              'manual',
        capture:             'manual',
        full_name_snapshot:  found.full_name,
        reg_number_snapshot: found.reg_number,
        manual_reason:       'no network / no device',
        marked_by:           user.id,
      });

    // Manual add bypasses check_in(), which is where an ordinary check-in
    // also puts the student on the roster — do the same here, or a manually
    // added student stays invisible on their own /my-attendance and on the
    // register itself if their profile doesn't match the offering's dept/level.
    if (!e) {
      await supabase
        .from('offering_students')
        .upsert({ offering_id: session.offering_id, student_id: found.id }, { onConflict: 'offering_id,student_id' });
    }

    setBusy(false);
    if (e) { setError('Could not add. This student may already be marked for this class.'); return; }
    setManualReg('');
    loadRecords(session.id);
  }

  // Lecturer resets a student's bound device (changed / lost phone). The
  // student's next check-in binds their new device.
  async function resetDevice() {
    if (!resetReg.trim()) return;
    setBusy(true);
    setResetMsg('');
    const { data, error: e } = await supabase.rpc('reset_student_device', { p_reg_number: resetReg.trim() });
    setBusy(false);
    if (e) { setResetMsg('Could not reset. Please try again.'); return; }
    const row = Array.isArray(data) ? data[0] : data;
    setResetMsg(row?.message ?? 'Done.');
    if (row?.ok) setResetReg('');
  }

  if (roleStatus === 'loading') {
    return <Centered><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></Centered>;
  }
  if (!isLecturer) {
    return (
      <Centered>
        <Lock className="mb-3 h-6 w-6 text-coffee-400" />
        <h1 className="display-heading mb-2 text-2xl text-ink">Lecturers only</h1>
        <p className="text-coffee-700">This page is for staff running class attendance.</p>
      </Centered>
    );
  }
  if (!offerings.length) {
    return (
      <Centered>
        <h1 className="display-heading mb-2 text-2xl text-ink">No courses assigned</h1>
        <p className="text-coffee-700">
          Your account is a lecturer account, but no courses are linked to it yet.
          Ask the department admin to link your courses.
        </p>
      </Centered>
    );
  }

  const presentCount = records.filter(r => r.status === 'present' || r.status === 'manual').length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Lecturer</p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">Run a class</h1>
      </header>

      {error && (
        <div role="alert" className="mb-6 rounded-xl border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-rust">
          {error}
        </div>
      )}

      {!session ? (
        <>
        <div className="rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Course</span>
              <select
                value={effectiveOfferingId}
                onChange={e => setOfferingId(e.target.value)}
                className="w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-ink"
              >
                {offerings.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.course_code} · {o.level} · {o.academic_session}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Check-in open for (minutes)</span>
              <input
                type="number" min={1} max={60}
                value={windowMin}
                onChange={e => setWindowMin(Number(e.target.value) || 5)}
                className="w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-ink"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-ink">Topic <span className="text-coffee-500">(optional)</span></span>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Week 3 — Access control"
                className="w-full rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-ink"
              />
            </label>

            <div className="sm:col-span-2 rounded-lg border border-coffee-200 bg-paper p-3">
              <label className="flex items-start gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={geofence}
                  onChange={e => setGeofence(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  Block check-ins outside the class location
                  <span className="block text-xs text-coffee-500">
                    Uses your current location as the class centre. Leave off unless
                    you have a strong signal — GPS can wrongly block students indoors.
                  </span>
                </span>
              </label>
              {geofence && (
                <label className="mt-3 block">
                  <span className="mb-1 block text-xs font-medium text-ink">Allowed distance (metres)</span>
                  <input
                    type="number" min={20} max={1000}
                    value={radius}
                    onChange={e => setRadius(Number(e.target.value) || 100)}
                    className="w-40 rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-sm text-ink"
                  />
                </label>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={openSession}
            disabled={busy}
            className="btn-primary mt-5 inline-flex items-center gap-2 text-sm disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
            Open session
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-coffee-200 bg-cream p-5 sm:p-6">
          <p className="mb-1 text-sm font-medium text-ink">Reset a student's device</p>
          <p className="mb-3 text-xs text-coffee-500">
            Use this when a student changed or lost their phone. Their next check-in
            registers the new device.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text" value={resetReg} onChange={e => setResetReg(e.target.value)}
              placeholder="Reg number"
              className="flex-1 rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-sm text-ink"
            />
            <button type="button" onClick={resetDevice} disabled={busy || !resetReg.trim()} className="btn-ghost text-sm disabled:opacity-60">
              Reset device
            </button>
          </div>
          {resetMsg && <p className="mt-2 text-sm text-coffee-700">{resetMsg}</p>}
        </div>
        </>
      ) : (
        <>
          {/* The big code for the projector */}
          <div className="mb-6 rounded-2xl border border-ember/30 bg-ember/5 p-6 text-center">
            <p className="mb-2 text-sm font-medium text-coffee-700">Write this code on the board</p>
            <p className="font-mono text-6xl font-bold tracking-[0.3em] text-ember">{session.checkin_code}</p>
            <p className="mt-3 text-xs text-coffee-500">Changes every 30 seconds automatically.</p>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-coffee-700">
              <Users className="h-4 w-4" /> {presentCount} checked in
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => loadRecords(session.id)} className="btn-ghost text-sm">
                <RefreshCw className="mr-1.5 inline h-4 w-4" /> Refresh
              </button>
              <button type="button" onClick={closeSession} disabled={busy} className="btn-primary text-sm disabled:opacity-60">
                <X className="mr-1.5 inline h-4 w-4" /> Close session
              </button>
            </div>
          </div>

          {/* Manual add */}
          <div className="mb-6 rounded-xl border border-coffee-200 bg-cream p-4">
            <p className="mb-2 text-sm font-medium text-ink">Add a student manually (no network / no phone)</p>
            <div className="flex flex-wrap gap-2">
              <input
                type="text" value={manualReg} onChange={e => setManualReg(e.target.value)}
                placeholder="Reg number"
                className="flex-1 rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-sm text-ink"
              />
              <button type="button" onClick={addManual} disabled={busy || !manualReg.trim()} className="btn-ghost text-sm disabled:opacity-60">
                <Plus className="mr-1.5 inline h-4 w-4" /> Add
              </button>
            </div>
          </div>

          {/* Live list */}
          {records.length === 0 ? (
            <p className="rounded-xl border border-coffee-200 bg-cream px-4 py-6 text-center text-coffee-700">
              No check-ins yet. Students appear here as they enter the code.
            </p>
          ) : (
            <ul className="divide-y divide-coffee-200 overflow-hidden rounded-2xl border border-coffee-200 bg-cream">
              {records.map(r => (
                <li key={r.id} className="flex items-center justify-between px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{r.full_name_snapshot || '(no name)'}</p>
                    <p className="font-mono text-xs text-coffee-500">{r.reg_number_snapshot || '—'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.location_flagged && (
                      <span className="rounded-md bg-ember/15 px-2 py-0.5 text-xs font-medium text-ember">⚠ location</span>
                    )}
                    {r.capture === 'manual' && (
                      <span className="rounded-md bg-coffee-100 px-2 py-0.5 text-xs font-medium text-coffee-700">manual</span>
                    )}
                    <span className="rounded-md bg-moss/15 px-2 py-0.5 text-xs font-medium capitalize text-moss">present</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
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
