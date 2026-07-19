import { Link } from 'react-router-dom';
import {
  ArrowRight, Flame, PlayCircle, Target, BrainCircuit,
  CalendarDays, FileText, Code2, GraduationCap, CheckCircle2,
} from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useAuth } from '../context/AuthContext';
import { useProgress } from './useProgress';
import { getTrackProgress } from '../utils/trackProgress';
import { readLastLocation } from '../utils/lastLocation';
import { readStudyDays, computeStreak } from '../utils/streak';
import { pickDailyChallenge } from '../utils/dailyChallenge';

// ─── The signed-in homepage ───────────────────────────────────────────────────
// Home for a signed-in student is a daily dashboard, not a marketing page:
// greet them, show the streak, and put "continue", today's challenge, and the
// study tools one tap away. Signed-out visitors still get the landing page.

function greetingFor(hour) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Friendly label for the resume card, derived from the stored path.
function describeLocation(path) {
  const m = /^\/tracks\/([a-z]+)\/([\w-]+)/.exec(path || '');
  if (m) {
    const track = trackMeta[m[1]];
    const module = track?.moduleIndex.find(mod => mod.id === m[2]);
    if (track && module) return `${track.label} · ${module.title}`;
    if (track) return `the ${track.label} track`;
  }
  if (path?.startsWith('/courses/')) return 'your course notes';
  if (path?.startsWith('/courses')) return 'the course hub';
  const fixed = {
    '/lab': 'the Code Lab',
    '/tutor': 'the AI Tutor',
    '/cheatsheet': 'the cheatsheet',
    '/explainer': 'the Code Explainer',
    '/planner': 'your study planner',
    '/install': 'the install guide',
  };
  return fixed[path] || 'where you left off';
}

const QUICK_ACTIONS = [
  { to: '/tutor', icon: BrainCircuit, label: 'AI Tutor', hint: 'Ask anything on the curriculum' },
  { to: '/planner', icon: CalendarDays, label: 'Study Planner', hint: 'Your weekly revision timetable' },
  { to: '/cheatsheet', icon: FileText, label: 'Cheatsheet', hint: 'Java · Python · C syntax' },
  { to: '/explainer', icon: Code2, label: 'Code Explainer', hint: 'Paste code, get plain English' },
];

export default function StudentDashboard() {
  const { profile } = useAuth();
  // One hook per track — cloud-merged, so the dashboard matches the track
  // pages on any device.
  const progressBySlug = {
    java: useProgress(trackMeta.java.storageKey).progress,
    python: useProgress(trackMeta.python.storageKey).progress,
    c: useProgress(trackMeta.c.storageKey).progress,
    security: useProgress(trackMeta.security.storageKey).progress,
  };
  const tracks = Object.values(trackMeta).map(track => ({
    track,
    ...getTrackProgress(track, progressBySlug[track.slug]),
  }));
  const completedIds = new Set(
    Object.values(progressBySlug).flatMap(p => p.completedModules || [])
  );
  const challenge = pickDailyChallenge(Object.values(trackMeta), completedIds);
  const streak = computeStreak(readStudyDays());
  const lastPath = readLastLocation();
  const firstName = (profile?.full_name || '').trim().split(/\s+/)[0] || 'there';
  const level = parseInt(String(profile?.level ?? ''), 10) || null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* ── Header: greeting + streak ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 animate-fade-up">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-2">
            {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 className="display-heading text-4xl sm:text-5xl text-ink">
            {greetingFor(new Date().getHours())}, {firstName}.
          </h1>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${
            streak > 0
              ? 'bg-ember-500/10 border-ember-500/30 text-ember-600'
              : 'bg-coffee-100 border-coffee-200 text-coffee-600'
          }`}
        >
          <Flame size={15} />
          {streak > 0 ? `${streak}-day streak` : 'Study today to start a streak'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '80ms' }}>

        {/* ── Left column: continue + tracks ── */}
        <div className="lg:col-span-2 space-y-6">
          {lastPath && (
            <Link
              to={lastPath}
              className="block bg-ink text-cream rounded-2xl p-6 group hover:bg-coffee-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-coffee-400 mb-1.5">Continue</p>
                  <p className="font-display text-xl font-bold leading-snug">
                    Pick up at {describeLocation(lastPath)}
                  </p>
                </div>
                <PlayCircle size={28} className="opacity-80 group-hover:opacity-100 shrink-0 transition-opacity" />
              </div>
            </Link>
          )}

          <div className="bg-paper border border-coffee-200 rounded-2xl p-6">
            <h2 className="display-heading text-2xl text-ink mb-5">Your tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tracks.map(({ track, completed, total, percent, nextModule }) => (
                <div key={track.slug} className="border border-coffee-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-ink">{track.label}</span>
                    <span className="text-xs font-mono text-coffee-600 tabular-nums">{completed}/{total}</span>
                  </div>
                  <div className="h-1.5 bg-coffee-100 rounded-full mb-3 overflow-hidden">
                    <div className={`h-full ${track.dotColor} rounded-full`} style={{ width: `${percent}%` }} />
                  </div>
                  {nextModule ? (
                    <Link
                      to={track.detailPath(nextModule.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-coffee-700 hover:text-ink transition-colors"
                    >
                      {completed > 0 ? 'Continue' : 'Start'}: {nextModule.title} <ArrowRight size={11} />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-moss">
                      <CheckCircle2 size={12} /> Track complete
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: daily challenge, year, tools ── */}
        <div className="space-y-6">
          {challenge && (
            <div className={`${challenge.track.accentBg} ${challenge.track.accentText} rounded-2xl p-6`}>
              <div className="flex items-center gap-2 mb-3 opacity-80">
                <Target size={15} />
                <p className="text-xs font-mono uppercase tracking-widest">Today&rsquo;s challenge</p>
              </div>
              <p className="font-display text-xl font-bold leading-snug mb-1">{challenge.module.title}</p>
              <p className="text-xs opacity-70 mb-4">{challenge.track.fullName}</p>
              <Link
                to={challenge.track.detailPath(challenge.module.id)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold bg-cream/15 hover:bg-cream/25 transition-colors rounded-lg px-3.5 py-2"
              >
                {challenge.track.slug === 'security' ? 'Enter the room' : 'Open the module'} <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {level && (
            <Link
              to={`/courses?level=${level}`}
              className="flex items-center gap-3 bg-paper border border-coffee-200 rounded-2xl p-5 hover:border-coffee-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-coffee-100 flex items-center justify-center shrink-0">
                <GraduationCap size={17} className="text-coffee-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-ink text-sm">Your {level}L courses</p>
                <p className="text-xs text-coffee-600">Outlines, lecture notes, and exam tips</p>
              </div>
              <ArrowRight size={15} className="text-coffee-400 group-hover:text-ink transition-colors" />
            </Link>
          )}

          <div className="bg-paper border border-coffee-200 rounded-2xl p-5">
            <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-4">Tools</p>
            <div className="space-y-1">
              {QUICK_ACTIONS.map(({ to, icon: Icon, label, hint }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-coffee-100 transition-colors group"
                >
                  <Icon size={16} className="text-coffee-600 shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-ink">{label}</span>
                    <span className="hidden sm:inline text-xs text-coffee-600"> — {hint}</span>
                  </div>
                  <ArrowRight size={13} className="text-coffee-300 group-hover:text-coffee-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
