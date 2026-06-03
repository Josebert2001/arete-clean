import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Layers, Coffee, Code2, Terminal } from 'lucide-react';
import { firstSemesterCourses, secondSemesterCourses } from '../data/courses';
import { trackConfig } from '../data/trackConfig';

const trackIcons = { java: Coffee, python: Code2, c: Terminal };

// The three languages with full interactive tracks — the headline of the app.
function InteractiveTracks() {
  const tracks = Object.values(trackConfig);
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-5">
        <Sparkles size={16} className="text-moss" />
        <h2 className="display-heading text-2xl text-ink">Interactive tracks</h2>
        <span className="text-xs font-mono text-coffee-700">Java · Python · C</span>
      </div>
      <p className="text-sm text-coffee-700 max-w-2xl mb-6 leading-relaxed">
        Three languages have full interactive tracks — theory, annotated code, a runnable
        playground, quizzes, and mini projects. Every other course below has curated study resources.
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
  cs:    { bg: 'bg-ink',        text: 'text-cream',      light: 'bg-coffee-100 text-coffee-800' },
  math:  { bg: 'bg-moss',       text: 'text-cream',      light: 'bg-moss/10 text-moss' },
  stats: { bg: 'bg-ember-500',  text: 'text-cream',      light: 'bg-ember-500/10 text-ember-500' },
  gst:   { bg: 'bg-coffee-700', text: 'text-cream',      light: 'bg-coffee-100 text-coffee-700' },
  ele:   { bg: 'bg-rust',       text: 'text-cream',      light: 'bg-rust/10 text-rust' },
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

function SemesterSection({ title, courses, index }) {
  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-coffee-700">{`0${index}`}</span>
          <h2 className="display-heading text-3xl text-ink">{title}</h2>
        </div>
        <div className="h-px flex-1 bg-coffee-200" />
        <span className="text-sm text-coffee-700 font-mono shrink-0">
          {courses.length} course{courses.length !== 1 ? 's' : ''} · {courses.reduce((s, c) => s + c.units, 0)} units
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(c => <CourseCard key={c.slug} course={c} />)}
      </div>
    </div>
  );
}

export default function Courses() {
  const totalUnits = [...firstSemesterCourses, ...secondSemesterCourses].reduce((s, c) => s + c.units, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-5">
          <Layers size={12} />
          <span>200L · Cybersecurity · University of Uyo</span>
        </div>
        <h1 className="display-heading text-5xl sm:text-6xl text-ink mb-4 leading-tight">
          Course Hub
        </h1>
        <p className="text-lg text-coffee-700 max-w-2xl leading-relaxed">
          Java, Python, and C have full interactive tracks — start there. Every other 200L Cybersecurity
          course has curated study resources: a topic outline, recommended textbooks, study tips, and what to search.
        </p>

        <div className="flex flex-wrap gap-6 mt-8 text-sm">
          {[
            { label: 'Interactive Tracks', value: 3 },
            { label: 'Total Courses', value: firstSemesterCourses.length + secondSemesterCourses.length },
            { label: 'Total Units', value: totalUnits },
            { label: 'Semesters', value: 2 },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display font-bold text-2xl text-ink">{stat.value}</span>
              <span className="text-xs text-coffee-700 font-mono uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive tracks — the headline */}
      <InteractiveTracks />

      {/* Study resources for every course */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={16} className="text-coffee-700" />
          <h2 className="display-heading text-2xl text-ink">Study resources — every course</h2>
        </div>
        <div className="space-y-14">
          <SemesterSection title="First Semester" courses={firstSemesterCourses} index={1} />
          <SemesterSection title="Second Semester" courses={secondSemesterCourses} index={2} />
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-14 p-6 bg-cream border border-coffee-200 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-ink mb-1">Course missing or details wrong?</h3>
          <p className="text-sm text-coffee-700">
            Departments sometimes adjust course offerings. If something looks off, the interactive Java modules in COS 222 are always up to date.
          </p>
        </div>
        <Link to="/tracks/java" className="btn-ghost shrink-0">
          Java Modules <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
