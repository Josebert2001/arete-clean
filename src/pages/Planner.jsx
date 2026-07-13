import { useMemo, useState } from 'react';
import { CalendarDays, Download, GraduationCap, Sparkles, ExternalLink, Clock, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { levelMeta, LEVELS } from '../data/courses';
import { generateStudyPlan, DEFAULT_STUDY_DAYS, DEFAULT_SLOT_TIMES } from '../utils/studyPlan';
import { buildIcs, downloadIcs, googleCalendarLink } from '../utils/ics';

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
  return LEVELS.includes(n) ? n : 100;
}

export default function Planner() {
  usePageTitle('Study Planner');
  const { profile } = useAuth();

  const [session, setSession]   = useState(currentSession());
  const [level, setLevel]       = useState(() => levelFromProfile(profile));
  const [semester, setSemester] = useState(1);
  const [startISO, setStartISO] = useState(nextMondayISO());
  const [studyDays, setStudyDays] = useState(DEFAULT_STUDY_DAYS);

  const sessionStart = useMemo(() => {
    // Parse as local midnight so weekday maths matches the picker.
    const [y, m, d] = startISO.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [startISO]);

  const plan = useMemo(() => {
    try {
      const days = studyDays.length ? studyDays : DEFAULT_STUDY_DAYS;
      return generateStudyPlan({ level, semester, sessionStart, studyDays: days, slotTimes: DEFAULT_SLOT_TIMES });
    } catch {
      return null;
    }
  }, [level, semester, sessionStart, studyDays]);

  const toggleDay = (code) =>
    setStudyDays(prev => (prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]));

  const handleDownload = () => {
    if (!plan?.events.length) return;
    const ics = buildIcs(plan.events, { calendarName: `Areté ${level}L Sem ${semester} — ${session}` });
    downloadIcs(`arete-study-plan-${level}L-sem${semester}.ics`, ics);
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
              {LEVELS.map(l => (
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
                  {levelMeta[l].label}
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
                  <p className="text-xs text-coffee-500 mt-0.5">{plan.meta.totalUnits} credit units this semester</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink text-cream text-sm font-semibold hover:bg-coffee-700 transition-colors shrink-0"
                >
                  <Download size={15} /> Add to calendar
                </button>
              </div>

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
                {studyDays.length === 0
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
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
