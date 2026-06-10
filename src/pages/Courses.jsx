import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Coffee, Code2, Terminal, GraduationCap, Shield } from 'lucide-react';
import { courses, getCoursesByLevelAndSemester, LEVELS, levelMeta } from '../data/courses';
import { trackConfig } from '../data/trackConfig';

const trackIcons = { java: Coffee, python: Code2, c: Terminal };

function InteractiveTracks() {
  const tracks = Object.values(trackConfig);
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

export default function Courses() {
  const [activeLevel, setActiveLevel] = useState(null);

  const totalCourses = courses.length;
  const totalUnits = courses.reduce((s, c) => s + c.units, 0);
  const interactiveCourses = courses.filter(c => c.hasInteractiveModules).length;

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

      {/* Level tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveLevel(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeLevel === null ? 'bg-ink text-cream' : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
          }`}
        >
          All Years
        </button>
        {LEVELS.map(level => {
          const meta = levelMeta[level];
          return (
            <button
              key={level}
              onClick={() => setActiveLevel(activeLevel === level ? null : level)}
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

      {/* Interactive tracks — only show when all years or 100L/200L selected */}
      {(activeLevel === null || activeLevel === 100 || activeLevel === 200) && (
        <InteractiveTracks />
      )}

      {/* Course listings */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <Shield size={16} className="text-rust" />
          <h2 className="display-heading text-2xl text-ink">
            {activeLevel ? `${levelMeta[activeLevel].label} — ${levelMeta[activeLevel].description}` : 'All courses by year'}
          </h2>
        </div>

        {activeLevel ? (
          <LevelView level={activeLevel} />
        ) : (
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
        )}
      </div>

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
