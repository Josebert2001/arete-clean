import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, Coffee, Code2, Terminal, GraduationCap, Shield, Search, X } from 'lucide-react';
import { courses, getCoursesByLevelAndSemester, LEVELS, levelMeta } from '../data/courses';
import { trackMeta } from '../data/trackMeta';
import { usePageTitle } from '../utils/usePageTitle';

const trackIcons = { java: Coffee, python: Code2, c: Terminal };

function InteractiveTracks() {
  const tracks = Object.values(trackMeta);
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-5">
        <Sparkles size={16} className="text-moss" />
        <h2 className="display-heading text-2xl text-ink">Interactive learning tracks</h2>
        <span className="text-xs font-mono text-coffee-700">Java · Python · C</span>
      </div>
      <p className="text-sm text-coffee-700 max-w-2xl mb-6 leading-relaxed">
        Three programming courses have full interactive tracks on Arete — theory, annotated code, a
        live in-browser playground, 7-question quizzes, and mini projects. Every other course has
        curated study resources below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tracks.map(track => {
          const Icon = trackIcons[track.slug] || Code2;
          return (
            <Link
              key={track.slug}
              to={track.listPath}
              className={`${track.accentBg} ${track.accentText} rounded-xl p-5 group hover:opacity-90 transition-all flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between">
                <Icon size={22} className="opacity-80" />
                <div className="flex items-center gap-2">
                  {track.courseCode && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/15">{track.courseCode}</span>
                  )}
                  <span className="text-xs font-mono opacity-60">{track.moduleCount} modules</span>
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-0.5">{track.label}</h3>
                <p className="text-xs opacity-75 leading-relaxed">{track.tagline}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                Open track <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const subjectStyles = {
  cs:    { bg: 'bg-ink',        text: 'text-cream',  light: 'bg-coffee-100 text-coffee-800' },
  cyb:   { bg: 'bg-rust',       text: 'text-cream',  light: 'bg-rust/10 text-rust' },
  math:  { bg: 'bg-moss',       text: 'text-cream',  light: 'bg-moss/10 text-moss' },
  stats: { bg: 'bg-ember-500',  text: 'text-cream',  light: 'bg-ember-500/10 text-ember-500' },
  gst:   { bg: 'bg-coffee-700', text: 'text-cream',  light: 'bg-coffee-100 text-coffee-700' },
  phy:   { bg: 'bg-moss',       text: 'text-cream',  light: 'bg-moss/10 text-moss' },
  sen:   { bg: 'bg-ink',        text: 'text-cream',  light: 'bg-coffee-100 text-coffee-800' },
  ent:   { bg: 'bg-coffee-600', text: 'text-cream',  light: 'bg-coffee-100 text-coffee-700' },
  ins:   { bg: 'bg-ember-500',  text: 'text-cream',  light: 'bg-ember-500/10 text-ember-500' },
  siwes: { bg: 'bg-coffee-700', text: 'text-cream',  light: 'bg-coffee-100 text-coffee-700' },
  ele:   { bg: 'bg-rust',       text: 'text-cream',  light: 'bg-rust/10 text-rust' },
};

function CourseCard({ course }) {
  const style = subjectStyles[course.subject] || subjectStyles.cs;
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="module-card bg-paper border border-coffee-200 rounded-xl p-5 group flex flex-col gap-3 hover:border-coffee-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold ${style.bg} ${style.text}`}>
          {course.code}
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {course.hasInteractiveModules ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-moss/15 text-moss rounded-full text-xs font-medium">
              <Sparkles size={10} />
              Interactive track
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-coffee-100 text-coffee-600 rounded-full text-xs font-medium">
              <BookOpen size={10} />
              Study resources
            </span>
          )}
          <span className="text-xs text-coffee-700 font-mono whitespace-nowrap">{course.units} units</span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold text-lg text-ink group-hover:text-coffee-700 transition-colors leading-snug mb-1">
          {course.title}
        </h3>
        <p className="text-sm text-coffee-700 leading-relaxed line-clamp-2">{course.description}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-coffee-700 pt-1 border-t border-coffee-100">
        <span className="flex items-center gap-1">
          <BookOpen size={11} />
          {course.topics.length} topics
        </span>
        <span className="flex items-center gap-1 text-ink font-medium group-hover:gap-2 transition-all">
          {course.hasInteractiveModules ? 'Open track' : 'View resources'} <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

function SemesterSection({ title, semCourses, index }) {
  if (!semCourses.length) return null;
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-coffee-700">{`0${index}`}</span>
          <h2 className="display-heading text-2xl sm:text-3xl text-ink">{title}</h2>
        </div>
        <div className="h-px flex-1 bg-coffee-200" />
        <span className="text-sm text-coffee-700 font-mono shrink-0">
          {semCourses.length} course{semCourses.length !== 1 ? 's' : ''} · {semCourses.reduce((s, c) => s + c.units, 0)} units
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {semCourses.map(c => <CourseCard key={c.slug} course={c} />)}
      </div>
    </div>
  );
}

function LevelView({ level }) {
  const sem1 = getCoursesByLevelAndSemester(level, 1);
  const sem2 = getCoursesByLevelAndSemester(level, 2);
  const isSiwes = level === 300;

  return (
    <div className="space-y-14">
      <SemesterSection title="First Semester" semCourses={sem1} index={1} />
      {isSiwes ? (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-coffee-700">02</span>
              <h2 className="display-heading text-2xl sm:text-3xl text-ink">Second Semester — SIWES</h2>
            </div>
            <div className="h-px flex-1 bg-coffee-200" />
            <span className="text-sm text-coffee-700 font-mono shrink-0">
              {sem2.length} components · {sem2.reduce((s, c) => s + c.units, 0)} units
            </span>
          </div>
          <div className="mb-6 p-4 bg-coffee-50 border border-coffee-200 rounded-xl text-sm text-coffee-700 leading-relaxed">
            <strong className="text-ink">SIWES (Student Industrial Work Experience Scheme)</strong> — the full second semester of 300L is spent on industrial training. Students are placed in organisations in cybersecurity, IT, or technology roles. This is your first sustained professional experience; treat it with the same seriousness as your academic work.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sem2.map(c => <CourseCard key={c.slug} course={c} />)}
          </div>
        </div>
      ) : (
        <SemesterSection title="Second Semester" semCourses={sem2} index={2} />
      )}
    </div>
  );
}

// ─── Level picker (shown until a level is chosen) ─────────────────────────────

function LevelPicker({ onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Shield size={16} className="text-rust" />
        <h2 className="display-heading text-2xl text-ink">Pick your level</h2>
      </div>
      <p className="text-sm text-coffee-700 max-w-2xl mb-8 leading-relaxed">
        Choose your year, then your semester — you'll only see the courses that matter to you right now.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {LEVELS.map(level => {
          const meta = levelMeta[level];
          const count = courses.filter(c => c.level === level).length;
          return (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className="bg-paper border-2 border-coffee-200 rounded-2xl p-6 text-left group hover:border-ink hover:shadow-md active:scale-95 transition-all flex flex-col gap-4"
            >
              <div>
                <span className="text-xs font-mono text-coffee-500 uppercase tracking-widest">{meta.label}</span>
                <h3 className="font-display font-bold text-2xl text-ink mt-1">{meta.description}</h3>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-coffee-700">{count} courses · {meta.totalUnits} units</span>
                <span className="inline-flex items-center gap-1 font-medium text-ink opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  View <ArrowRight size={13} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onSelect('all')}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee-700 hover:text-ink transition-colors"
      >
        Or browse all {courses.length} courses across all four years <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ─── Semester picker (after a level is chosen) ────────────────────────────────

function SemesterPicker({ level, onSelect, onShowAll, onBack }) {
  const meta = levelMeta[level];
  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-coffee-700 hover:text-ink transition-colors mb-5"
      >
        <ArrowLeft size={14} /> Change level
      </button>

      <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-2">{meta.label} · Pick a semester</p>
      <h2 className="display-heading text-2xl sm:text-3xl text-ink mb-6">Which semester are you in?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[1, 2].map(sem => {
          const semCourses = getCoursesByLevelAndSemester(level, sem);
          if (!semCourses.length) return null;
          const isSiwes = level === 300 && sem === 2;
          return (
            <button
              key={sem}
              onClick={() => onSelect(sem)}
              className="bg-paper border-2 border-coffee-200 rounded-2xl p-6 text-left group hover:border-ink hover:shadow-md active:scale-95 transition-all flex flex-col gap-4"
            >
              <div>
                <span className="text-xs font-mono text-coffee-500 uppercase tracking-widest">Semester {sem}</span>
                <h3 className="font-display font-bold text-2xl text-ink mt-1">
                  {sem === 1 ? 'First Semester' : isSiwes ? 'Second Semester — SIWES' : 'Second Semester'}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-coffee-700">
                  {semCourses.length} {isSiwes ? 'components' : 'courses'} · {semCourses.reduce((s, c) => s + c.units, 0)} units
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-ink opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  View <ArrowRight size={13} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onShowAll}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee-700 hover:text-ink transition-colors"
      >
        Or show the full course list for all four years <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ─── One semester's courses (final step of the picker flow) ───────────────────

function SemesterCoursesView({ level, semester, onBack, onSwitchSemester, onShowAll }) {
  const meta = levelMeta[level];
  const semCourses = getCoursesByLevelAndSemester(level, semester);
  const otherSemester = semester === 1 ? 2 : 1;
  const otherCourses = getCoursesByLevelAndSemester(level, otherSemester);
  const isSiwes = level === 300 && semester === 2;
  const otherIsSiwes = level === 300 && otherSemester === 2;
  const semLabel = semester === 1 ? 'First Semester' : isSiwes ? 'Second Semester — SIWES' : 'Second Semester';

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-coffee-700 hover:text-ink transition-colors mb-5"
      >
        <ArrowLeft size={14} /> Change semester
      </button>

      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-1">
          {meta.label} · {semLabel}
        </p>
        <h2 className="display-heading text-2xl sm:text-3xl text-ink">
          {semCourses.length} {isSiwes ? 'components' : 'courses'} · {semCourses.reduce((s, c) => s + c.units, 0)} units
        </h2>
      </div>

      {isSiwes && (
        <div className="mb-6 p-4 bg-coffee-50 border border-coffee-200 rounded-xl text-sm text-coffee-700 leading-relaxed">
          <strong className="text-ink">SIWES (Student Industrial Work Experience Scheme)</strong> — the full second semester of 300L is spent on industrial training. Students are placed in organisations in cybersecurity, IT, or technology roles. This is your first sustained professional experience; treat it with the same seriousness as your academic work.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {semCourses.map(c => <CourseCard key={c.slug} course={c} />)}
      </div>

      {otherCourses.length > 0 && (
        <div className="border border-dashed border-coffee-300 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono text-coffee-500 uppercase tracking-widest mb-1">Also available</p>
            <h3 className="font-display font-bold text-lg text-ink">
              {meta.label} {otherSemester === 1 ? 'First' : 'Second'} Semester{otherIsSiwes ? ' — SIWES' : ''}
            </h3>
            <p className="text-sm text-coffee-700 mt-0.5">
              {otherCourses.length} {otherIsSiwes ? 'components' : 'courses'} · {otherCourses.reduce((s, c) => s + c.units, 0)} units
            </p>
          </div>
          <button onClick={() => onSwitchSemester(otherSemester)} className="btn-ghost shrink-0 text-sm">
            Browse Semester {otherSemester} <ArrowRight size={13} />
          </button>
        </div>
      )}

      <button
        onClick={onShowAll}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee-700 hover:text-ink transition-colors"
      >
        Show the full course list for all four years <ArrowRight size={13} />
      </button>
    </div>
  );
}

const LEVEL_STORAGE_KEY = 'arete-selected-level';

// 'all' | 100 | 200 | 300 | 400 | null (invalid/absent)
function parseLevel(value) {
  if (value === 'all') return 'all';
  const n = Number(value);
  return LEVELS.includes(n) ? n : null;
}

// 1 | 2 | null (invalid/absent)
function parseSemester(value) {
  const n = Number(value);
  return n === 1 || n === 2 ? n : null;
}

function getStoredLevel() {
  try {
    return parseLevel(localStorage.getItem(LEVEL_STORAGE_KEY));
  } catch {
    return null;
  }
}

const TYPE_FILTERS = [
  { id: 'all', label: 'All types' },
  { id: 'interactive', label: 'Interactive tracks' },
  { id: 'resources', label: 'Study resources' },
];

const SEMESTER_FILTERS = [
  { id: 0, label: 'Both semesters' },
  { id: 1, label: '1st semester' },
  { id: 2, label: '2nd semester' },
];

export default function Courses() {
  usePageTitle('Course Hub');
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState(0);

  // The URL is the source of truth; the last remembered level fills in when
  // the param is absent. null level = show the level picker. The semester is
  // deliberately not remembered — picking a level always asks for it, one
  // question at a time.
  const paramLevel = parseLevel(searchParams.get('level'));
  const activeLevel = paramLevel !== null ? paramLevel : getStoredLevel();
  const activeSemester = typeof activeLevel === 'number' ? parseSemester(searchParams.get('semester')) : null;

  function selectLevel(level) {
    setSearchParams({ level: String(level) });
  }

  function selectSemester(sem) {
    setSearchParams({ level: String(activeLevel), semester: String(sem) });
  }

  function clearLevel() {
    try {
      localStorage.removeItem(LEVEL_STORAGE_KEY);
    } catch { /* private mode — nothing stored anyway */ }
    setSearchParams({});
  }

  // Normalise a bare /courses URL to the remembered level so back/forward and
  // link sharing always reflect what is on screen.
  useEffect(() => {
    if (paramLevel === null) {
      const stored = getStoredLevel();
      if (stored !== null) setSearchParams({ level: String(stored) }, { replace: true });
    }
  }, [paramLevel, setSearchParams]);

  useEffect(() => {
    if (activeLevel === null) return;
    try {
      localStorage.setItem(LEVEL_STORAGE_KEY, String(activeLevel));
    } catch { /* private mode — picker shows again next visit */ }
  }, [activeLevel]);

  const totalCourses = courses.length;
  const totalUnits = courses.reduce((s, c) => s + c.units, 0);
  const interactiveCourses = courses.filter(c => c.hasInteractiveModules).length;

  const trimmedQuery = query.trim().toLowerCase();
  const isFiltering = trimmedQuery !== '' || typeFilter !== 'all' || semesterFilter !== 0;

  // hiddenByLevel counts matches outside the selected year so a search never
  // dead-ends just because the wrong level tab is active.
  const { filteredCourses, hiddenByLevel } = useMemo(() => {
    if (!isFiltering) return { filteredCourses: [], hiddenByLevel: 0 };
    const matches = (c, ignoreLevel) => {
      if (!ignoreLevel && typeof activeLevel === 'number' && c.level !== activeLevel) return false;
      if (semesterFilter !== 0 && c.semester !== semesterFilter) return false;
      if (typeFilter === 'interactive' && !c.hasInteractiveModules) return false;
      if (typeFilter === 'resources' && c.hasInteractiveModules) return false;
      if (trimmedQuery) {
        const haystack = [c.code, c.title, c.description, ...(c.topics || [])].join(' ').toLowerCase();
        if (!haystack.includes(trimmedQuery)) return false;
      }
      return true;
    };
    const inLevel = courses.filter(c => matches(c, false));
    const anyLevel = typeof activeLevel === 'number' ? courses.filter(c => matches(c, true)) : inLevel;
    return { filteredCourses: inLevel, hiddenByLevel: anyLevel.length - inLevel.length };
  }, [isFiltering, activeLevel, semesterFilter, typeFilter, trimmedQuery]);

  const clearFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setSemesterFilter(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-5">
          <GraduationCap size={12} />
          <span>B.Sc. Cybersecurity · University of Uyo · 100L – 400L</span>
        </div>
        <h1 className="display-heading text-5xl sm:text-6xl text-ink mb-4 leading-tight">
          Course Hub
        </h1>
        <p className="text-lg text-coffee-700 max-w-2xl leading-relaxed">
          Your complete academic companion for the B.Sc. Cybersecurity programme. Every course across all four years — study resources, recommended textbooks, topic outlines, and interactive learning tracks for the programming courses.
        </p>

        <div className="flex flex-wrap gap-6 mt-8 text-sm">
          {[
            { label: 'Years Covered', value: 4 },
            { label: 'Total Courses', value: totalCourses },
            { label: 'Total Units', value: totalUnits },
            { label: 'Interactive Tracks', value: interactiveCourses },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display font-bold text-2xl text-ink">{stat.value}</span>
              <span className="text-xs text-coffee-700 font-mono uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & filters */}
      <div className="mb-8 space-y-3">
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-500" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search courses — code, title, or topic (e.g. COS 121, networks, calculus)"
            aria-label="Search courses"
            className="w-full pl-10 pr-10 py-2.5 bg-paper border border-coffee-200 rounded-xl text-sm text-ink placeholder:text-coffee-500 focus:outline-none focus:border-coffee-500 focus:ring-1 focus:ring-coffee-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-500 hover:text-ink transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                typeFilter === f.id ? 'bg-ink text-cream' : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="w-px h-4 bg-coffee-200 mx-1" aria-hidden="true" />
          {SEMESTER_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setSemesterFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                semesterFilter === f.id ? 'bg-ink text-cream' : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
              }`}
            >
              {f.label}
            </button>
          ))}
          {isFiltering && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-rust hover:bg-rust/10 transition-colors inline-flex items-center gap-1"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Level tabs — hidden on the level-picker screen, where the cards do this job */}
      {activeLevel !== null && (
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => selectLevel('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeLevel === 'all' ? 'bg-ink text-cream' : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
          }`}
        >
          All Years
        </button>
        {LEVELS.map(level => {
          const meta = levelMeta[level];
          return (
            <button
              key={level}
              onClick={() => selectLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeLevel === level ? 'bg-ink text-cream' : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
              }`}
            >
              {meta.label}
              <span className={`text-xs font-mono ${activeLevel === level ? 'text-cream/60' : 'text-coffee-500'}`}>
                {meta.totalUnits}u
              </span>
            </button>
          );
        })}
      </div>
      )}

      {/* Interactive tracks — only on the full catalogue view; the stepper
          flow already badges track courses on their cards */}
      {!isFiltering && activeLevel === 'all' && (
        <InteractiveTracks />
      )}

      {/* Search results */}
      {isFiltering && (
        <div aria-live="polite">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Search size={16} className="text-moss" />
            <h2 className="display-heading text-2xl text-ink">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              {typeof activeLevel === 'number' && (
                <span className="text-coffee-500"> in {levelMeta[activeLevel].label}</span>
              )}
            </h2>
            {hiddenByLevel > 0 && (
              <button
                onClick={() => selectLevel('all')}
                className="text-sm font-medium text-moss hover:text-ink transition-colors inline-flex items-center gap-1"
              >
                +{hiddenByLevel} more in other years — show all <ArrowRight size={13} />
              </button>
            )}
          </div>
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map(c => <CourseCard key={c.slug} course={c} />)}
            </div>
          ) : (
            <div className="p-8 bg-cream border border-coffee-200 rounded-xl text-center">
              <p className="text-ink font-display font-bold mb-1">
                {hiddenByLevel > 0
                  ? `No matches in ${levelMeta[activeLevel].label}`
                  : 'No courses match your search'}
              </p>
              <p className="text-sm text-coffee-700 mb-4">
                {hiddenByLevel > 0
                  ? `${hiddenByLevel} course${hiddenByLevel !== 1 ? 's' : ''} in other years match${hiddenByLevel === 1 ? 'es' : ''} your search.`
                  : `Try a different keyword, or clear the filters to browse all ${totalCourses} courses.`}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {hiddenByLevel > 0 && (
                  <button onClick={() => selectLevel('all')} className="btn-primary inline-flex items-center gap-1.5 text-sm">
                    Search all years <ArrowRight size={14} />
                  </button>
                )}
                <button onClick={clearFilters} className="btn-ghost inline-flex items-center gap-1.5">
                  <X size={14} /> Clear search & filters
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course listings — level picker → semester picker → that semester's courses */}
      {!isFiltering && (
        activeLevel === null ? (
          <LevelPicker onSelect={selectLevel} />
        ) : activeLevel === 'all' ? (
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Shield size={16} className="text-rust" />
              <h2 className="display-heading text-2xl text-ink">All courses by year</h2>
            </div>

            <div className="space-y-20">
              {LEVELS.map(level => (
                <div key={level}>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 mb-10">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-coffee-700">{levelMeta[level].label}</span>
                      <h3 className="display-heading text-3xl sm:text-4xl text-ink">{levelMeta[level].description}</h3>
                    </div>
                    <div className="h-px flex-1 bg-coffee-200" />
                    <span className="text-sm text-coffee-700 font-mono shrink-0">
                      {getCoursesByLevelAndSemester(level, 1).length + getCoursesByLevelAndSemester(level, 2).length} courses · {levelMeta[level].totalUnits} units
                    </span>
                  </div>
                  <LevelView level={level} />
                </div>
              ))}
            </div>
          </div>
        ) : activeSemester === null ? (
          <SemesterPicker
            level={activeLevel}
            onSelect={selectSemester}
            onShowAll={() => selectLevel('all')}
            onBack={clearLevel}
          />
        ) : (
          <SemesterCoursesView
            level={activeLevel}
            semester={activeSemester}
            onBack={() => selectLevel(activeLevel)}
            onSwitchSemester={selectSemester}
            onShowAll={() => selectLevel('all')}
          />
        )
      )}

      {/* Bottom note */}
      <div className="mt-16 p-6 bg-cream border border-coffee-200 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-ink mb-1">Course details or resources need updating?</h3>
          <p className="text-sm text-coffee-700">
            Course offerings can change. The interactive Java and Python modules are always current and maintained separately.
          </p>
        </div>
        <Link to="/tutor" className="btn-ghost shrink-0">
          Ask AI Tutor <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
