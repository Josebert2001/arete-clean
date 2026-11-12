import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Download, BookMarked, Bug, PlayCircle } from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useProgress } from '../components/useProgress';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { readLastModulePath } from '../utils/lastLocation';
import {
  LEVELS, buildCatalogue, filterCatalogue, shelfItems, pickResume, trackSummary,
} from '../utils/labCatalogue';

// Same record TrackModuleDetail ticks steps into.
const STEPS_STORAGE_KEY = 'mission-steps-v1';

// ─── Language marks (carried over from the old Tracks page) ───────────────────

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
      <circle cx="26" cy="16" r="2" fill="#FAF6EC" />
      <path d="M42 54 h-14 c-4 0 -7 -3 -7 -7 v-10 h18 c3 0 5 -2 5 -5 v-6 h4 c4 0 6 3 6 7 v14 c0 4 -3 7 -7 7 z" fill="currentColor" opacity="0.6" />
      <circle cx="38" cy="48" r="2" fill="#FAF6EC" />
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

function SecurityMark() {
  return (
    <svg viewBox="0 0 64 64" className="w-7 h-7" aria-hidden>
      <path d="M32 8 L52 16 V32 C52 44 43 52 32 56 C21 52 12 44 12 32 V16 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 32 l6 6 l11 -13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRACK_MARKS = { java: JavaMark, python: PythonMark, c: CMark, security: SecurityMark };

// A security module is a "room"; everything else is a "module".
const unitWord = (slug, count = 1) => {
  const word = slug === 'security' ? 'room' : 'module';
  return count === 1 ? word : `${word}s`;
};

// The tools that live inside Code Lab and are not in the main nav.
const TOOLS = [
  { to: '/install', icon: Download, title: 'Install guide', text: 'Set up Java, Python and a C compiler on your own laptop.' },
  { to: '/cheatsheet', icon: BookMarked, title: 'Cheatsheets', text: 'The syntax you reach for most, one page per language.' },
  { to: '/explainer', icon: Bug, title: 'Code Explainer', text: 'Paste any snippet and get a plain-English breakdown.' },
];

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
        active ? 'border-ink bg-ink text-cream' : 'border-coffee-200 bg-paper text-coffee-700 hover:border-coffee-500 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function ModuleCard({ item, track }) {
  const percent = item.steps ? Math.round((item.stepsDone / item.steps) * 100) : 0;
  return (
    <Link
      to={item.path}
      className="group flex h-full flex-col rounded-xl border border-coffee-200 bg-paper p-5 transition-all hover:border-coffee-500 hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-bold ${
          item.status === 'done' ? 'bg-moss text-cream' : `${track.accentBg} ${track.accentText}`
        }`}>
          {item.status === 'done' ? <CheckCircle2 size={16} aria-hidden /> : String(item.number).padStart(2, '0')}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-coffee-600">{item.level}</span>
      </div>

      <h3 className="mb-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-coffee-700">{item.title}</h3>

      <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-coffee-700">
        <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden /> ~{item.hours}h</span>
        <span>{item.steps} steps</span>
      </p>

      {item.status === 'done' && <p className="mt-2 text-xs font-medium text-moss">Completed</p>}
      {item.status === 'started' && (
        <div className="mt-2">
          <p className="mb-1 text-xs font-medium text-ink">In progress · {item.stepsDone} of {item.steps} steps</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-coffee-100">
            <div className={`h-full ${track.dotColor}`} style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}
    </Link>
  );
}

function Shelf({ track, items, shown }) {
  const Mark = TRACK_MARKS[track.slug];
  const summary = trackSummary(items);
  return (
    <section aria-labelledby={`shelf-${track.slug}`} className="mb-12">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${track.accentBg} ${track.accentText}`}>
            {Mark && <Mark />}
          </span>
          <div>
            <h2 id={`shelf-${track.slug}`} className="font-display text-2xl font-bold text-ink">{track.label}</h2>
            <p className="text-sm text-coffee-700">
              {summary.done > 0 ? `${summary.done} of ${summary.total} done` : `${summary.total} ${unitWord(track.slug, summary.total)}`}
              {' · '}about {summary.hours} hours · {track.tagline}
            </p>
          </div>
        </div>
        <Link to={track.listPath} className="inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:underline">
          All {summary.total} {unitWord(track.slug, summary.total)} in order <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map(item => <ModuleCard key={item.key} item={item} track={track} />)}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CodeLab() {
  usePageTitle('Code Lab');
  const { profile } = useAuth();
  const [trackFilter, setTrackFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // One hook per track: each track's progress is its own record.
  const java = useProgress(trackMeta.java.storageKey).progress;
  const python = useProgress(trackMeta.python.storageKey).progress;
  const c = useProgress(trackMeta.c.storageKey).progress;
  const security = useProgress(trackMeta.security.storageKey).progress;
  const ticked = useProgress(STEPS_STORAGE_KEY).progress;

  // Independent learners come for security, so its shelf leads for them.
  const independent = profile?.learning_mode === 'independent';
  const tracks = useMemo(() => {
    const all = Object.values(trackMeta);
    return independent ? [...all.filter(t => t.slug === 'security'), ...all.filter(t => t.slug !== 'security')] : all;
  }, [independent]);

  const items = useMemo(() => buildCatalogue(tracks, {
    java: java.completedModules,
    python: python.completedModules,
    c: c.completedModules,
    security: security.completedModules,
  }, ticked.completedModules), [tracks, java, python, c, security, ticked]);

  const filters = { track: trackFilter, level: levelFilter };
  const visible = filterCatalogue(items, filters);
  const resume = useMemo(() => pickResume(items, readLastModulePath()), [items]);
  const starter = items[0];
  const totalDone = items.filter(item => item.status === 'done').length;
  const filtered = trackFilter !== 'all' || levelFilter !== 'all';

  const featured = resume?.item || starter;
  const featuredTrack = trackMeta[featured.trackSlug];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="display-heading mb-3 text-5xl text-ink sm:text-6xl">Code Lab</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-coffee-700">
          {items.length} hands-on modules across {tracks.length} paths. Every one is a guided, step-by-step page you can
          finish in your browser.
          {totalDone > 0 && <span className="text-ink"> You have completed {totalDone}.</span>}
        </p>
      </header>

      {/* Resume, or a starting point for a learner with no history */}
      <Link
        to={featured.path}
        className="group mb-10 flex flex-col gap-4 rounded-2xl bg-ink p-6 text-cream transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ember-400">
            {resume ? 'Pick up where you left off' : 'Start here'}
          </p>
          <p className="display-heading mb-1 text-2xl sm:text-3xl">{featured.title}</p>
          <p className="text-sm text-cream/80">
            {featuredTrack.label} · {unitWord(featured.trackSlug)} {featured.number} of {featuredTrack.moduleCount} · {featured.level} · ~{featured.hours}h
            {featured.status === 'started' && ` · ${featured.stepsDone} of ${featured.steps} steps done`}
          </p>
        </div>
        <span className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-semibold text-ink">
          <PlayCircle size={16} /> {resume ? 'Continue' : 'Begin'}
        </span>
      </Link>

      {/* Filters */}
      <div className="mb-10 space-y-3">
        <div role="group" aria-label="Filter by path" className="flex flex-wrap gap-2">
          <Chip active={trackFilter === 'all'} onClick={() => setTrackFilter('all')}>All paths</Chip>
          {tracks.map(track => (
            <Chip key={track.slug} active={trackFilter === track.slug} onClick={() => setTrackFilter(track.slug)}>
              {track.label}
            </Chip>
          ))}
        </div>
        <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">
          <Chip active={levelFilter === 'all'} onClick={() => setLevelFilter('all')}>All levels</Chip>
          {LEVELS.map(level => (
            <Chip key={level} active={levelFilter === level} onClick={() => setLevelFilter(level)}>{level}</Chip>
          ))}
        </div>
        <p role="status" className="text-sm text-coffee-700">
          {filtered
            ? `${visible.length} of ${items.length} modules match.`
            : 'Each path shows what is next for you. Choose a path or a level to see everything in it.'}
        </p>
      </div>

      {/* Shelves */}
      {tracks.map(track => {
        const trackItems = items.filter(item => item.trackSlug === track.slug);
        const matching = filterCatalogue(trackItems, filters);
        if (matching.length === 0) return null;
        return <Shelf key={track.slug} track={track} items={trackItems} shown={shelfItems(matching, filters)} />;
      })}

      {visible.length === 0 && (
        <div className="mb-12 rounded-xl border border-coffee-200 bg-paper p-8 text-center">
          <p className="mb-4 text-coffee-700">No module matches that path and level together.</p>
          <button type="button" className="btn-ghost mx-auto" onClick={() => { setTrackFilter('all'); setLevelFilter('all'); }}>
            Show everything
          </button>
        </div>
      )}

      {/* Tools that live inside Code Lab */}
      <section aria-labelledby="lab-tools">
        <h2 id="lab-tools" className="mb-4 font-display text-xl font-bold text-ink">Tools</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TOOLS.map(tool => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group flex items-start gap-3 rounded-xl border border-coffee-200 bg-paper p-5 transition-colors hover:border-ink"
            >
              <tool.icon size={18} className="mt-0.5 flex-shrink-0 text-coffee-500 group-hover:text-ink" />
              <span>
                <span className="block font-display font-bold text-ink">{tool.title}</span>
                <span className="block text-sm leading-relaxed text-coffee-700">{tool.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
