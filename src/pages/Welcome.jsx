import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, BookOpen, BrainCircuit, CalendarDays, CloudUpload, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { getDepartment } from '../data/departments';

export default function Welcome() {
  usePageTitle('Welcome');
  const { user, profile, authLoading } = useAuth();

  if (!authLoading && !user) return <Navigate to="/signin" replace />;

  if (authLoading || !profile) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-16 w-16 bg-coffee-100 rounded-2xl mb-8" />
        <div className="h-3 w-32 bg-coffee-100 rounded mb-4" />
        <div className="h-12 w-48 bg-coffee-100 rounded mb-4" />
        <div className="h-4 w-full max-w-md bg-coffee-100 rounded" />
      </div>
    );
  }

  const firstName = profile.full_name.split(' ')[0];
  // Read from the lightweight department registry, never useCatalogue: Welcome
  // is a one-time hand-off screen shown once right after signup, and pulling
  // the ~800 kB course catalogue here would cost every new student that
  // download for decoration. The real course list is one click away on
  // /courses, which needs the catalogue anyway.
  const department = getDepartment(profile.department);
  const isFoundation = department.status === 'foundation';
  const ownDepartment = profile.department_other?.trim();
  const journeyLabel = isFoundation
    ? (ownDepartment || 'academic')
    : department.degree || department.name;

  const quickLinks = [
    {
      to: '/courses',
      icon: BookOpen,
      label: 'Browse Courses',
      // Promising a "full curriculum" to a foundation student contradicts the
      // note directly below this card — they have the shared courses only.
      desc: isFoundation
        ? 'The foundation courses shared across programmes — pick the ones you take.'
        : 'Your full curriculum — every course from 100L to 400L.',
    },
    {
      to: '/tutor',
      icon: BrainCircuit,
      label: 'Open AI Tutor',
      desc: 'Ask anything. Get curriculum-aligned answers, instantly.',
    },
    {
      to: '/lab',
      icon: Code2,
      label: 'Explore Code Lab',
      desc: 'Java, Python and C tracks, plus 12 capture-the-flag security rooms.',
    },
    {
      to: '/planner',
      icon: CalendarDays,
      label: 'Build a Study Plan',
      desc: 'A weekly timetable from your courses, synced to your calendar.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24 animate-fade-in">

      {/* Hero */}
      <div className="mb-14">
        <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center mb-8 font-display font-bold text-3xl text-coffee-300 select-none">
          {firstName[0]?.toUpperCase()}
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-3">
          Welcome to Areté
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-ink mb-5 leading-none tracking-tight">
          {firstName}.
        </h1>
        <p className="text-lg text-coffee-700 leading-relaxed max-w-lg">
          You're all set. Areté is here for every course, every concept, and every late-night
          debugging session across your{' '}
          <span className="font-semibold text-ink">{journeyLabel} journey</span>.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-paper border border-coffee-200 rounded-2xl overflow-hidden mb-10">
        <div className="flex items-start justify-between gap-4 p-5 bg-ink/[0.02] border-b border-coffee-100">
          <div>
            <p className="font-semibold text-ink">{profile.full_name}</p>
            <p className="text-xs font-mono text-coffee-600 mt-1">{profile.reg_number}</p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 bg-ink text-cream rounded-full font-semibold shrink-0 mt-0.5">
            {profile.level}
          </span>
        </div>

        {isFoundation && (
          <div className="px-5 py-4">
            <p className="text-xs text-coffee-600 leading-relaxed mb-2">
              <span className="font-medium text-coffee-700">Foundation mode: </span>
              You have all 4 interactive tracks and the courses shared across University of Uyo
              programmes. Your full {ownDepartment || 'department'} curriculum is on the way.
            </p>
            <Link to="/courses" className="text-xs font-medium text-moss hover:text-ink transition-colors">
              Pick the courses that match your programme →
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-moss/5 border-t border-moss/10">
          <CloudUpload size={13} className="text-moss shrink-0" />
          <p className="text-xs text-moss">Progress is syncing to the cloud automatically.</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="mb-12">
        <p className="text-xs font-medium text-coffee-500 uppercase tracking-wider mb-4">
          Where to start
        </p>
        <div className="space-y-3">
          {quickLinks.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-coffee-200 bg-paper hover:border-coffee-400 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-coffee-100 group-hover:bg-coffee-200 flex items-center justify-center shrink-0 transition-colors">
                <Icon size={18} className="text-coffee-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">{label}</p>
                <p className="text-xs text-coffee-600 mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <ArrowRight size={15} className="text-coffee-300 group-hover:text-ink group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      <Link
        to="/"
        className="text-sm text-coffee-500 hover:text-ink underline underline-offset-2 transition-colors"
      >
        Go to home →
      </Link>
    </div>
  );
}
