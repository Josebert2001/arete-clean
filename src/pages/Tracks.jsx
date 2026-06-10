import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useProgress } from '../components/useProgress';

function JavaMark() {
  return (
    <svg viewBox="0 0 64 64" className="w-7 h-7" aria-hidden>
      <path d="M22 12 c2 6 -4 9 -4 14 c0 4 4 6 4 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 8 c3 8 -5 11 -5 16 c0 5 5 7 5 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 44 c10 5 26 5 36 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 52 c8 4 20 4 28 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PythonMark() {
  return (
    <svg viewBox="0 0 64 64" className="w-7 h-7" aria-hidden>
      <path d="M22 10 h14 c4 0 7 3 7 7 v10 h-18 c-3 0 -5 2 -5 5 v6 h-4 c-4 0 -6 -3 -6 -7 v-14 c0 -4 3 -7 7 -7 z" fill="currentColor" opacity="0.85" />
      <circle cx="26" cy="16" r="2" fill="#FAF4EA" />
      <path d="M42 54 h-14 c-4 0 -7 -3 -7 -7 v-10 h18 c3 0 5 -2 5 -5 v-6 h4 c4 0 6 3 6 7 v14 c0 4 -3 7 -7 7 z" fill="currentColor" opacity="0.6" />
      <circle cx="38" cy="48" r="2" fill="#FAF4EA" />
    </svg>
  );
}

function CMark() {
  return (
    <svg viewBox="0 0 64 64" className="w-7 h-7" aria-hidden>
      <path d="M48 22 a18 18 0 1 0 0 20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

// Presentation extras local to this page (logos + marketing copy).
const trackExtras = {
  java: {
    Mark: JavaMark,
    why: 'COS 211 / 221 · Required for your degree. Deep interactive track with full module content, quizzes, and a live Java playground.',
    bullets: ['13 full modules', 'Live code playground', 'Practice quizzes', 'Mini projects'],
  },
  python: {
    Mark: PythonMark,
    why: 'COS 121 · Intro to programming. Also the most widely-used language in data science, AI, automation, and cybersecurity scripting.',
    bullets: ['12 full modules', 'Python 3 playground', 'Practice quizzes', 'Mini projects'],
  },
  c: {
    Mark: CMark,
    why: 'Teaches how computers actually work: memory, pointers, and systems thinking. Foundation of every lower-level language.',
    bullets: ['12 full modules', 'C playground', 'Practice quizzes', 'Mini projects'],
  },
};

function ProgressPill({ storageKey, total }) {
  const { progress } = useProgress(storageKey);
  const count = progress.completedModules.length;
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-moss font-medium">
      <CheckCircle2 size={11} /> {count}/{total} done
    </span>
  );
}

function TrackCard({ track }) {
  const meta = trackExtras[track.slug];
  const Mark = meta.Mark;

  return (
    <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 hover:border-coffee-400 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between gap-4">
        <div className={`w-14 h-14 rounded-xl ${track.accentBg} ${track.accentText} flex items-center justify-center shrink-0`}>
          <Mark />
        </div>
        <ProgressPill storageKey={track.storageKey} total={track.moduleCount} />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-display font-bold text-2xl text-ink">{track.label}</h2>
          {track.courseCode && (
            <span className={`text-xs font-mono px-2 py-0.5 rounded ${track.accentBg} ${track.accentText}`}>
              {track.courseCode}
            </span>
          )}
        </div>
        <p className="text-sm text-coffee-600 italic mb-3">{track.tagline}</p>
        <p className="text-sm text-coffee-700 leading-relaxed">{meta.why}</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {meta.bullets.map(b => (
          <li key={b} className="flex items-center gap-1.5 text-xs text-coffee-700">
            <span className={`w-1.5 h-1.5 rounded-full ${track.dotColor} shrink-0`} />
            {b}
          </li>
        ))}
      </ul>

      <Link
        to={track.listPath}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${track.accentBg} ${track.accentText} hover:opacity-90`}
      >
        Open {track.label} track <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export default function Tracks() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Interactive Learning</div>
        <h1 className="display-heading text-5xl sm:text-6xl text-ink mb-4 leading-tight">Language Tracks</h1>
        <p className="text-lg text-coffee-700 max-w-2xl leading-relaxed">
          Three fully interactive programming tracks — theory, code examples, runnable playgrounds,
          practice quizzes, and guided mini projects. Pick a language and start building.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(trackMeta).map(track => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </div>

      <div className="mt-12 p-6 bg-cream border border-coffee-200 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-ink mb-1">Also: full course resources for every Cybersecurity subject</h3>
          <p className="text-sm text-coffee-700">Topics, textbooks, study tips, and search terms for all 11 courses — not just the programming ones.</p>
        </div>
        <Link to="/courses" className="btn-ghost shrink-0">
          Course Hub <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
