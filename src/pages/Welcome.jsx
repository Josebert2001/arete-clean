import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, BookOpen, BrainCircuit, CloudUpload, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';

const LEVEL_FOCUS = {
  '100L': 'CSC 101, MTH 101, GST 111 — foundations of computing and mathematics.',
  '200L': 'CYB 201, CSC 201, MTH 202 — core cybersecurity principles and data structures.',
  '300L': 'CYB 301, CYB 311, CSC 301 — networks, cryptography, and ethical hacking.',
  '400L': 'CYB 401, CYB 411, CYB 421 — digital forensics, advanced security, and final year project.',
};

const QUICK_LINKS = [
  {
    to: '/courses',
    icon: BookOpen,
    label: 'Browse Courses',
    desc: 'Your full curriculum — every course from 100L to 400L.',
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
    desc: 'Java, Python, C — write and run code right in your browser.',
  },
];

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

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24 animate-fade-in">

      {/* Hero */}
      <div className="mb-14">
        <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center mb-8 font-display font-bold text-3xl text-coffee-300 select-none">
          {firstName[0]?.toUpperCase()}
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-3">
          Welcome to Arete
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-ink mb-5 leading-none tracking-tight">
          {firstName}.
        </h1>
        <p className="text-lg text-coffee-700 leading-relaxed max-w-lg">
          You're all set. Arete is here for every course, every concept, and every late-night
          debugging session across your{' '}
          <span className="font-semibold text-ink">B.Sc. Cybersecurity journey</span>.
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
        {LEVEL_FOCUS[profile.level] && (
          <div className="px-5 py-4">
            <p className="text-xs text-coffee-600 leading-relaxed">
              <span className="font-medium text-coffee-700">This year: </span>
              {LEVEL_FOCUS[profile.level]}
            </p>
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
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
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
