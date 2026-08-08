import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, Download, GraduationCap, Sparkles, ExternalLink, Clock, Info,
  RefreshCw, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { useCatalogue } from '../data/useCatalogue';
import { YEAR_LEVELS } from '../data/departments';
import { generateStudyPlan, DEFAULT_STUDY_DAYS, DEFAULT_SLOT_TIMES } from '../utils/studyPlan';
import { collectCourseSignals } from '../utils/planSignals';
import { buildIcs, downloadIcs, googleCalendarLink } from '../utils/ics';
import { syncPlanToGoogleCalendar } from '../utils/googleApi';
import { useGoogleConnection } from '../components/useGoogleConnection';
import GoogleConnectButton from '../components/GoogleConnectButton';

const DAY_CHIPS = [
  { code: 'MO', label: 'Mon' },
  { code: 'TU', label: 'Tue' },
  { code: 'WE', label: 'Wed' },
  { code: 'TH', label: 'Thu' },
  { code: 'FR', label: 'Fri' },
  { code: 'SA', label: 'Sat' },
];
const DAY_FULL = { MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday', TH: 'Thursday', FR: 'Friday', SA: 'Saturday', SU: 'Sunday' };

// Nigerian academic sessions run roughly Oct–Sep; from ~September onward we're in
// the session that ends the following year.
function currentSession() {
  const now = new Date();
  const y = now.getFullYear();
  return now.getMonth() >= 8 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}
function sessionOptions() {
  const [start] = currentSession().split('/').map(Number);
  return [start - 1, start, start + 1].map(s => `${s}/${s + 1}`);
}

// Default the semester start to the next Monday — a clean anchor for weekly blocks.
function nextMondayISO() {
  const d = new Date();
  const delta = (1 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + delta);
  return d.toISOString().slice(0, 10);
}

// Parse a stored profile level like "200L" → 200; fall back to 100.
function levelFromProfile(profile) {
  const n = parseInt(String(profile?.level ?? ''), 10);
  return YEAR_LEVELS.includes(n) ? n : 100;
}

export default function Planner() {
  usePageTitle('Study Planner');
  const { profile, user } = useAuth();
  const { catalogue, department, status: catalogueStatus } = useCatalogue();
  const google = useGoogleConnection();

  const [session, setSession]   = useState(currentSession());
  const [level, setLevel]       = useState(() => levelFromProfile(profile));
  const [semester, setSemester] = useState(1);
  const [startISO, setStartISO] = useState(nextMondayISO());
  const [studyDays, setStudyDays] = useState(DEFAULT_STUDY_DAYS);
  const [syncing, setSyncing]   = useState(false);
  const [syncResult, setSyncResult] = useState(null); // { success, message, htmlLink }

  // Google's OAuth redirect lands back here with ?google=connected|denied|error.
  // Surface it once, then clean the URL so a refresh doesn't re-show it.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('google');
    if (!status) return;
    window.history.replaceState({}, '', window.location.pathname);
    // Deferred to a microtask so setState isn't called synchronously from
    // the effect body — same pattern as useGoogleConnection.js.
    Promise.resolve().then(() => {
      if (status === 'connected') {
        setSyncResult({ success: true, message: 'Google account connected. You can now sync your plan.' });
        google.refresh();
      } else if (status === 'denied') {
        setSyncResult({ success: false, message: 'Google connection was cancelled.' });
      } else {
        setSyncResult({ success: false, message: 'Could not connect Google. Please try again.' });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sessionStart = useMemo(() => {
    // Parse as local midnight so weekday maths matches the picker.
    const [y, m, d] = startISO.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [startISO]);

  // Foundation-mode students who've picked their own courses (see
  // CoursePicker.jsx) get a plan built from just that subset; everyone else
  // (including every CYB student) keeps the full level+semester list.
  //
  // Gated on foundation mode exactly as Courses.jsx gates its "My courses"
  // filter. The pins are slugs from the FOUNDATION list, so applying them to a
  // full department's catalogue would filter the plan down to courses that
  // aren't in it — an empty timetable with nothing on screen to explain why.
  // ProfileSettings clears the pins on a department switch, so this is the
  // belt to that braces; the failure it prevents is silent.
  const selectedCourses = department?.status === 'foundation' ? profile?.selected_courses : null;
  const getCoursesForPlan = useMemo(() => {
    if (!catalogue) return null;
    if (!selectedCourses?.length) return catalogue.getCoursesByLevelAndSemester;
    const selectedSet = new Set(selectedCourses);
    return (lvl, sem) => catalogue.getCoursesByLevelAndSemester(lvl, sem).filter(c => selectedSet.has(c.slug));
  }, [catalogue, selectedCourses]);

  // Quiz scores + track completion recorded on this device (useProgress mirrors
  // them to Supabase). Empty for new/signed-out students — the plan then falls
  // back to plain units weighting.
  const courseSignals = useMemo(
    () => getCoursesForPlan ? collectCourseSignals(getCoursesForPlan(level, semester)) : {},
    [getCoursesForPlan, level, semester]
  );

  const plan = useMemo(() => {
    if (!getCoursesForPlan) return null;
    try {
      const days = studyDays.length ? studyDays : DEFAULT_STUDY_DAYS;
      return generateStudyPlan({
        level, semester, sessionStart, studyDays: days, slotTimes: DEFAULT_SLOT_TIMES, courseSignals,
        getCoursesByLevelAndSemester: getCoursesForPlan,
      });
    } catch {
      return null;
    }
  }, [getCoursesForPlan, level, semester, sessionStart, studyDays, courseSignals]);

  const toggleDay = (code) =>
    setStudyDays(prev => (prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]));

  const handleDownload = () => {
    if (!plan?.events.length) return;
    const ics = buildIcs(plan.events, { calendarName: `Areté ${level}L Sem ${semester} — ${session}` });
    downloadIcs(`arete-study-plan-${level}L-sem${semester}.ics`, ics);
  };

  const handleSync = async () => {
    if (!plan?.events.length) return;
    setSyncResult(null);

    if (!google.connected) {
      try { await google.connect('/planner'); } catch {
        setSyncResult({ success: false, message: 'Could not start the Google connection.' });
      }
      return;
    }

    setSyncing(true);
    try {
      const calendarName = `${level}L Sem ${semester} — ${session}`;
      const data = await syncPlanToGoogleCalendar(plan.events, calendarName);
      if (data.success) {
        setSyncResult({ success: true, message: `Synced ${data.eventCount} weekly blocks to Google Calendar.`, htmlLink: data.htmlLink });
      } else if (data.kind === 'reconnect_required') {
        setSyncResult({ success: false, message: 'Your Google connection expired. Reconnecting…' });
        google.refresh();
      } else {
        setSyncResult({ success: false, message: data.error || 'Could not sync to Google Calendar.' });
      }
    } catch {
      setSyncResult({ success: false, message: 'Could not sync to Google Calendar. Please try again.' });
    } finally {
      setSyncing(false);
    }
  };

  // Group the plan's events by day for a readable weekly preview.
  const byDay = useMemo(() => {
    const map = {};
    for (const ev of plan?.events ?? []) (map[ev.byday] ??= []).push(ev);
    for (const day of Object.keys(map)) map[day].sort((a, b) => a.start.localeCompare(b.start));
    return map;
  }, [plan]);

  const orderedDays = DAY_CHIPS.map(c => c.code).filter(code => byDay[code]?.length);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-coffee-500 mb-3">
          <Sparkles size={12} className="text-ember" /> Study Planner
        </span>
        <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-3">
          Build your semester study timetable
        </h1>
        <p className="text-coffee-700 leading-relaxed max-w-2xl">
          Pick your session, level, and semester — Areté lays out weekly study blocks from your
          courses, weighted by credit units, and adds them straight to your calendar.
          Works with Google, Apple, and Outlook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8">

        {/* ─── Controls ─────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Session + Semester */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
                <CalendarDays size={12} /> Session
              </label>
              <select
                value={session}
                onChange={e => setSession(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
              >
                {sessionOptions().map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
                <Clock size={12} /> Semester
              </label>
              <select
                value={semester}
                onChange={e => setSemester(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
              >
                <option value={1}>First semester</option>
                <option value={2}>Second semester</option>
              </select>
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-3">
              <GraduationCap size={12} /> Your level
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {YEAR_LEVELS.map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    level === l
                      ? 'bg-ink border-ink text-cream shadow-sm'
                      : 'bg-cream border-coffee-200 text-coffee-700 hover:border-coffee-400 hover:text-ink'
                  }`}
                >
                  {l}L
                </button>
              ))}
            </div>
          </div>

          {/* Semester start */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
              <CalendarDays size={12} /> Semester starts
            </label>
            <input
              type="date"
              value={startISO}
              onChange={e => setStartISO(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
            />
            <p className="text-xs text-coffee-500 mt-1.5">Weekly blocks repeat for 15 teaching weeks from this date.</p>
          </div>

          {/* Study days */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-3">
              Study days
            </label>
            <div className="flex flex-wrap gap-2">
              {DAY_CHIPS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => toggleDay(code)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                    studyDays.includes(code)
                      ? 'bg-moss/10 border-moss/40 text-moss'
                      : 'bg-cream border-coffee-200 text-coffee-600 hover:border-coffee-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Preview + actions ────────────────────────────────── */}
        <div>
          {plan && plan.events.length > 0 ? (
            <div className="bg-paper border border-coffee-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-coffee-100 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {plan.courses.length} courses · {plan.meta.blocksPerWeek} blocks/week
                  </p>
                  <p className="text-xs text-coffee-500 mt-0.5">
                    {plan.meta.totalUnits} credit units this semester
                    {selectedCourses?.length > 0 && ' · scoped to your picked courses'}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSync}
                    disabled={syncing || !user}
                    title={!user ? 'Sign in to sync with Google Calendar' : undefined}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-coffee-200 text-ink text-sm font-semibold hover:border-coffee-400 transition-colors disabled:opacity-50"
                  >
                    {syncing ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
                    {google.connected ? 'Sync to Google' : 'Connect & sync'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink text-cream text-sm font-semibold hover:bg-coffee-700 transition-colors"
                  >
                    <Download size={15} /> Add to calendar
                  </button>
                </div>
              </div>

              {plan.adjustments.length > 0 && (
                <div className="px-5 py-3 border-b border-coffee-100 bg-moss/5">
                  <p className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-moss mb-1.5">
                    <Sparkles size={11} /> Personalized to your progress
                  </p>
                  <ul className="space-y-1">
                    {plan.adjustments.map(a => (
                      <li key={a.code} className="text-xs text-coffee-700">
                        <span className="font-semibold text-ink">{a.code}</span>{' '}
                        {a.delta > 0 ? `+${a.delta}` : a.delta} block — {a.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {syncResult && (
                <div className={`px-5 py-3 border-b border-coffee-100 flex items-start gap-2 ${syncResult.success ? 'bg-moss/5' : 'bg-rust/5'}`}>
                  {syncResult.success
                    ? <CheckCircle2 size={14} className="text-moss mt-0.5 shrink-0" />
                    : <AlertCircle size={14} className="text-rust mt-0.5 shrink-0" />}
                  <p className={`text-xs ${syncResult.success ? 'text-moss' : 'text-rust'}`}>
                    {syncResult.message}
                    {syncResult.htmlLink && (
                      <a href={syncResult.htmlLink} target="_blank" rel="noopener noreferrer" className="ml-1.5 underline">
                        Open in Google Calendar
                      </a>
                    )}
                  </p>
                </div>
              )}

              <div className="divide-y divide-coffee-100 max-h-[28rem] overflow-y-auto">
                {orderedDays.map(day => (
                  <div key={day} className="px-5 py-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-2.5">{DAY_FULL[day]}</p>
                    <ul className="space-y-2.5">
                      {byDay[day].map(ev => (
                        <li key={ev.uid} className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-ink truncate">{ev.title}</p>
                            <p className="text-xs text-coffee-500">{ev.start}–{ev.end}</p>
                          </div>
                          <a
                            href={googleCalendarLink(ev)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-coffee-600 hover:text-ember transition-colors shrink-0"
                          >
                            Google <ExternalLink size={11} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {plan.unplaced.length > 0 && (
                <div className="px-5 py-3 bg-cream border-t border-coffee-100 flex items-start gap-2">
                  <Info size={13} className="text-rust mt-0.5 shrink-0" />
                  <p className="text-xs text-coffee-600">
                    {plan.unplaced.length} study block{plan.unplaced.length > 1 ? 's' : ''} couldn't fit — add more study days to make room.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-paper border border-dashed border-coffee-300 rounded-2xl px-6 py-16 text-center">
              <p className="text-sm text-coffee-600">
                {catalogueStatus === 'error'
                  ? 'Your courses didn\'t download — check your connection and reload the page.'
                  : !catalogue
                    ? 'Loading your courses…'
                    : studyDays.length === 0
                      ? 'Pick at least one study day to build your plan.'
                      : 'No courses found for this level and semester yet.'}
              </p>
            </div>
          )}

          <p className="text-xs text-coffee-500 mt-4 leading-relaxed flex items-start gap-1.5">
            <Info size={12} className="mt-0.5 shrink-0" />
            <span>
              "Add to calendar" downloads an <span className="font-mono">.ics</span> file — open it to import the whole
              semester at once. The per-row <span className="font-medium">Google</span> links add a single block.
              "Sync to Google" pushes the whole plan straight into a dedicated calendar on your Google account.
            </span>
          </p>

          {plan && plan.adjustments.length === 0 && (
            <p className="text-xs text-coffee-500 mt-2 leading-relaxed flex items-start gap-1.5">
              <Sparkles size={12} className="mt-0.5 shrink-0 text-ember" />
              <span>
                Take course practice quizzes and the planner adapts automatically — courses with low
                scores earn extra weekly time, and mostly-finished tracks free time up.
              </span>
            </p>
          )}

          {user && <GoogleConnectButton returnTo="/planner" className="mt-3" />}
        </div>
      </div>
    </div>
  );
}
