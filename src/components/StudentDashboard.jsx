import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Flame, PlayCircle, GraduationCap, CheckCircle2,
} from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useAuth } from '../context/AuthContext';
import { useProgress } from './useProgress';
import { getTrackProgress } from '../utils/trackProgress';
import { readLastLocation } from '../utils/lastLocation';
import { useStudyDays } from '../context/StudyDaysContext';
import { computeStreak } from '../utils/streak';
import { shouldShowGettingStarted, readDismissed, writeDismissed } from '../utils/gettingStarted';
import { findDepartmentByName, getDepartment } from '../data/departments';
import GettingStartedCard from './GettingStartedCard';
import ReviewDueCard from './ReviewDueCard';
import { READING_STORAGE_KEY, readTopicTotal, readCourseCount } from './useReadingProgress';

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

export default function StudentDashboard() {
  const { profile } = useAuth();
  const { days } = useStudyDays(); // account-wide, so the streak matches on every device
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
  const { progress: readingProgress } = useProgress(READING_STORAGE_KEY);
  const topicsRead = readTopicTotal(readingProgress);
  const coursesRead = readCourseCount(readingProgress);
  const streak = computeStreak(days);
  const lastPath = readLastLocation();
  const firstName = (profile?.full_name || '').trim().split(/\s+/)[0] || 'there';
  const level = parseInt(String(profile?.level ?? ''), 10) || null;

  // Day-one layout: while nothing is completed yet, replace the streak nag
  // and the (necessarily arbitrary) daily challenge with a checklist of what
  // to try first. Dismissing it is a permanent per-user, per-device choice,
  // same as completing a module — either way the dashboard settles into its
  // standard returning-user layout for good.
  const [dismissed, setDismissed] = useState(() => readDismissed(profile?.id));
  const showGettingStarted = shouldShowGettingStarted({ completedCount: completedIds.size, dismissed });
  const dismissGettingStarted = () => {
    writeDismissed(profile?.id);
    setDismissed(true);
  };

  // A foundation student whose typed department has since been authored. Read
  // from the lightweight registry, never useCatalogue — the dashboard renders on
  // every visit and must not pull a course catalogue for a one-line banner.
  const departmentNowAvailable =
    getDepartment(profile?.department).status === 'foundation'
      ? findDepartmentByName(profile?.department_other)
      : null;

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
        {!showGettingStarted && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${
              streak > 0
                ? 'bg-ember-500/10 border-ember-500/30 text-ember-500'
                : 'bg-coffee-100 border-coffee-200 text-coffee-600'
            }`}
          >
            <Flame size={15} />
            {streak > 0 ? `${streak}-day streak` : 'Study today to start a streak'}
          </div>
        )}
      </div>

      {/* ── Their department's catalogue has landed since they signed up ── */}
      {departmentNowAvailable && (
        <Link
          to="/profile"
          className="group flex items-center gap-3 mb-6 p-4 rounded-2xl border border-moss/30 bg-moss/5 hover:border-moss/50 transition-colors animate-fade-up"
        >
          <GraduationCap size={18} className="text-moss shrink-0" />
          <p className="flex-1 text-sm text-coffee-700 leading-relaxed">
            <span className="font-semibold text-ink">
              {departmentNowAvailable.degree || departmentNowAvailable.name} is ready.
            </span>{' '}
            Switch from the shared foundation courses to your own full curriculum — your progress
            carries over.
          </p>
          <ArrowRight size={15} className="text-moss group-hover:translate-x-0.5 transition-transform shrink-0" />
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '80ms' }}>

        {/* ── Left column: continue + tracks ── */}
        <div className="lg:col-span-2 space-y-6">
          {showGettingStarted && (
            <GettingStartedCard
              profile={profile}
              completedCount={completedIds.size}
              lastPath={lastPath}
              onDismiss={dismissGettingStarted}
            />
          )}
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

        {/* ── Right column: anything due for review, then the student's courses.
            The tools that used to be listed here (Tutor, Planner, Cheatsheet,
            Explainer) are one tap away in the nav and Code Lab, and the daily
            challenge competed with "Continue" for the same job — one clear
            next step reads better than three. ── */}
        <div className="space-y-6">
          <ReviewDueCard />

          {/* Reading counted straight off the progress blob — no denominators,
              because knowing how many topics a course *has* means loading its
              note chunk, and the dashboard must not pull course data for a
              one-line stat (same reason ReviewDueCard avoids useCatalogue). */}
          <Link
            to={level ? `/courses?level=${level}` : '/courses'}
            className="flex items-center gap-3 bg-paper border border-coffee-200 rounded-2xl p-5 hover:border-coffee-400 transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-moss/15 flex items-center justify-center shrink-0">
              <GraduationCap size={17} className="text-moss" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink text-sm">{level ? `Your ${level}L courses` : 'Your courses'}</p>
              <p className="text-xs text-coffee-600">
                {topicsRead > 0
                  ? `${topicsRead} lecture-note topic${topicsRead === 1 ? '' : 's'} read across ${coursesRead} course${coursesRead === 1 ? '' : 's'}`
                  : 'Outlines, lecture notes, and exam tips'}
              </p>
            </div>
            <ArrowRight size={15} className="text-coffee-400 group-hover:text-ink transition-colors shrink-0" />
          </Link>
        </div>

      </div>
    </div>
  );
}
