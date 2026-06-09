import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Sparkles, BookOpen, GraduationCap, Shield, CheckCircle2,
} from 'lucide-react';
import { getCoursesByLevelAndSemester } from '../data/courses';

// Only the two active levels
const levelCards = [
  {
    level: 100,
    icon: GraduationCap,
    color: 'bg-moss',
    text: 'text-cream',
    description: 'Mathematics, Physics, Computing foundations, Intro Security',
  },
  {
    level: 200,
    icon: Shield,
    color: 'bg-ink',
    text: 'text-cream',
    description: 'Programming, Cybersecurity, Networking, Ethical Hacking',
  },
];

// ─── Subject colours ──────────────────────────────────────────────────────────

const subjectStyles = {
  cs:    { bg: 'bg-ink',        text: 'text-cream' },
  cyb:   { bg: 'bg-rust',       text: 'text-cream' },
  math:  { bg: 'bg-moss',       text: 'text-cream' },
  stats: { bg: 'bg-ember-500',  text: 'text-cream' },
  gst:   { bg: 'bg-coffee-700', text: 'text-cream' },
  phy:   { bg: 'bg-moss',       text: 'text-cream' },
  sen:   { bg: 'bg-ink',        text: 'text-cream' },
  ent:   { bg: 'bg-coffee-600', text: 'text-cream' },
  ins:   { bg: 'bg-ember-500',  text: 'text-cream' },
  siwes: { bg: 'bg-coffee-700', text: 'text-cream' },
};

// ─── Mini course card ─────────────────────────────────────────────────────────

function CourseCard({ course }) {
  const style = subjectStyles[course.subject] || subjectStyles.cs;
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="bg-paper border border-coffee-200 rounded-xl p-5 group flex flex-col gap-3 hover:border-coffee-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold ${style.bg} ${style.text}`}>
          {course.code}
        </span>
        <div className="flex items-center gap-1.5">
          {course.hasInteractiveModules ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-moss/15 text-moss rounded-full text-xs font-medium">
              <Sparkles size={9} />
              Interactive
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-coffee-100 text-coffee-600 rounded-full text-xs font-medium">
              <BookOpen size={9} />
              Resources
            </span>
          )}
          <span className="text-xs text-coffee-500 font-mono">{course.units}u</span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold text-base text-ink group-hover:text-coffee-700 transition-colors leading-snug mb-1">
          {course.title}
        </h3>
        <p className="text-xs text-coffee-600 leading-relaxed line-clamp-2">{course.description}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-ink group-hover:gap-2 transition-all">
        {course.hasInteractiveModules ? 'Open track' : 'View resources'} <ArrowRight size={11} />
      </span>
    </Link>
  );
}

// ─── Semester picker (shown below hero after level is chosen) ─────────────────

function SemesterStep({ level, onSelect }) {
  const sem1Courses = getCoursesByLevelAndSemester(level, 1);
  const sem2Courses = getCoursesByLevelAndSemester(level, 2);

  return (
    <div className="animate-fade-up">
      <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-2">{level}L · Pick a semester</p>
      <h2 className="display-heading text-2xl sm:text-3xl text-ink mb-6">Which semester are you in?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect(1)}
          className="bg-paper border-2 border-coffee-200 rounded-2xl p-6 text-left group hover:border-ink hover:shadow-md active:scale-95 transition-all flex flex-col gap-4"
        >
          <div>
            <span className="text-xs font-mono text-coffee-500 uppercase tracking-widest">Semester 1</span>
            <h3 className="font-display font-bold text-2xl text-ink mt-1">First Semester</h3>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-coffee-700">{sem1Courses.length} courses · {sem1Courses.reduce((s, c) => s + c.units, 0)} units</span>
            <span className="inline-flex items-center gap-1 font-medium text-ink opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
              View <ArrowRight size={13} />
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelect(2)}
          className="bg-paper border-2 border-coffee-200 rounded-2xl p-6 text-left group hover:border-ink hover:shadow-md active:scale-95 transition-all flex flex-col gap-4"
        >
          <div>
            <span className="text-xs font-mono text-coffee-500 uppercase tracking-widest">Semester 2</span>
            <h3 className="font-display font-bold text-2xl text-ink mt-1">Second Semester</h3>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-coffee-700">{sem2Courses.length} courses · {sem2Courses.reduce((s, c) => s + c.units, 0)} units</span>
            <span className="inline-flex items-center gap-1 font-medium text-ink opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
              View <ArrowRight size={13} />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Course listing (shown below hero after semester is chosen) ───────────────

function CoursesStep({ level, semester, onBack, onChangeSemester }) {
  const courses = getCoursesByLevelAndSemester(level, semester);
  const otherSemester = semester === 1 ? 2 : 1;
  const otherCourses = getCoursesByLevelAndSemester(level, otherSemester);
  const semLabel = semester === 1 ? 'First Semester' : 'Second Semester';

  return (
    <div className="animate-fade-up">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-coffee-700 hover:text-ink transition-colors mb-5"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-1">
            {level}L · {semLabel}
          </p>
          <h2 className="display-heading text-2xl sm:text-3xl text-ink">
            {courses.length} courses · {courses.reduce((s, c) => s + c.units, 0)} units
          </h2>
        </div>
        <Link to="/courses" className="btn-ghost text-sm shrink-0 mt-1">
          Full course hub <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {courses.map(c => <CourseCard key={c.slug} course={c} />)}
      </div>

      {otherCourses.length > 0 && (
        <div className="border border-dashed border-coffee-300 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-coffee-500 uppercase tracking-widest mb-1">Also available</p>
            <h3 className="font-display font-bold text-lg text-ink">
              {level}L {otherSemester === 1 ? 'First' : 'Second'} Semester
            </h3>
            <p className="text-sm text-coffee-700 mt-0.5">
              {otherCourses.length} courses · {otherCourses.reduce((s, c) => s + c.units, 0)} units
            </p>
          </div>
          <button
            onClick={() => onChangeSemester(otherSemester)}
            className="btn-ghost shrink-0 text-sm"
          >
            Browse Semester {otherSemester} <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const belowRef = useRef(null);

  function selectLevel(level) {
    setSelectedLevel(level);
    setSelectedSemester(null);
    setTimeout(() => belowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  function selectSemester(sem) {
    setSelectedSemester(sem);
  }

  function goBackToSemesters() {
    setSelectedSemester(null);
  }

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* Two-column hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-8">

          {/* Left — welcome text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-6">
              <Sparkles size={12} />
              <span>Dept of Cybersecurity · University of Uyo · 100L – 400L</span>
            </div>

            <div className="flex items-baseline gap-4 mb-3">
              <h1 className="display-heading text-5xl sm:text-7xl lg:text-8xl text-ink tracking-tight">Arete</h1>
              <span className="font-display text-lg text-coffee-600 italic hidden sm:inline">ἀρετή</span>
            </div>

            <p className="display-heading text-2xl sm:text-3xl text-coffee-700 mb-3 leading-snug">
              Your academic companion.<br />
              <span className="underline-sketch text-ink">All four years.</span>
            </p>

            <p className="text-base text-coffee-700 max-w-xl leading-relaxed mb-6">
              Every course from 100L to 400L — topic outlines, textbooks, study tips, interactive programming tracks, and an AI tutor that knows the full curriculum.
            </p>

            <Link to="/courses" className="btn-ghost text-sm">
              Browse all courses <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — level picker */}
          <div className="animate-fade-up lg:pt-2" style={{ animationDelay: '100ms' }}>
            <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">
              Pick your level to get started
            </p>

            <div className="grid grid-cols-2 gap-3">
              {levelCards.map(({ level, icon: Icon, color, text, description }) => {
                const isSelected = selectedLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => selectLevel(level)}
                    className={`${color} ${text} rounded-2xl p-5 text-left group transition-all duration-200 flex flex-col gap-3 ${
                      isSelected
                        ? 'scale-[1.03] shadow-xl ring-4 ring-offset-2 ring-coffee-300'
                        : 'hover:scale-[1.03] hover:shadow-xl ring-2 ring-transparent hover:ring-white/20'
                    }`}
                  >
                    <Icon size={22} className="opacity-80" />
                    <div>
                      <div className="font-display font-bold text-2xl leading-none mb-1">{level}L</div>
                      <div className="text-xs opacity-70 leading-relaxed">{description}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
                      {isSelected
                        ? <><CheckCircle2 size={12} /> Selected</>
                        : <>Select <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" /></>
                      }
                    </span>
                  </button>
                );
              })}
            </div>

            {!selectedLevel && (
              <p className="text-xs text-coffee-500 mt-3 font-mono">
                300L and 400L interactive track modules are planned
              </p>
            )}
          </div>

        </div>

        {/* ── BELOW HERO: semester + courses flow ─────────────── */}
        {selectedLevel && (
          <div ref={belowRef} className="bg-cream border border-coffee-200 rounded-2xl p-6 sm:p-8">
            {!selectedSemester ? (
              <SemesterStep
                key={`sem-${selectedLevel}`}
                level={selectedLevel}
                onSelect={selectSemester}
              />
            ) : (
              <CoursesStep
                key={`courses-${selectedLevel}-${selectedSemester}`}
                level={selectedLevel}
                semester={selectedSemester}
                onBack={goBackToSemesters}
                onChangeSemester={selectSemester}
              />
            )}
          </div>
        )}

      </section>

      {/* ── WHAT'S INSIDE ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-8 mb-12">
          <h2 className="display-heading text-4xl sm:text-5xl text-ink shrink-0">What's inside</h2>
          <div className="h-px flex-1 bg-coffee-200" />
        </div>

        <div className="border-t border-coffee-200">
          {[
            { num: '01', title: 'All 4 Years', body: 'Every course from 100L to 400L — study resources, topic outlines, recommended textbooks, and search terms for free online materials.' },
            { num: '02', title: '37 Modules', body: 'Java (COS 211), Python (COS 121), and C — full interactive tracks with theory, annotated code, live playgrounds, quizzes, and mini projects.' },
            { num: '03', title: 'AI Tutor', body: 'Ask any question about any course in the programme. Knows the full curriculum from 100L to 400L and explains concepts at the right level for your year.' },
            { num: '04', title: 'Code Explainer', body: "Paste Java, Python, C, or C++ code and get a plain-English breakdown. Useful when a lecturer's example isn't clicking or you're debugging your own code." },
          ].map((f, i) => (
            <div key={i} className="py-7 border-b border-coffee-200 flex gap-5 group">
              <span className="font-mono text-xs text-coffee-400 tabular-nums pt-1.5 w-6 shrink-0">{f.num}</span>
              <div className="flex-1 sm:flex sm:items-baseline sm:gap-6 md:gap-12">
                <h3 className="display-heading text-2xl text-ink group-hover:text-coffee-600 transition-colors duration-200 mb-1 sm:mb-0 sm:w-48 shrink-0">{f.title}</h3>
                <p className="text-coffee-700 leading-relaxed text-sm sm:text-base">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block" aria-hidden>
          <span className="display-heading leading-none text-coffee-100" style={{ fontSize: 'clamp(10rem, 22vw, 20rem)' }}>ἀ</span>
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="display-heading text-ink leading-none mb-1" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}>
            "Excellence is never
          </p>
          <p className="display-heading text-coffee-500 leading-none mb-1 italic" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)', paddingLeft: 'clamp(1.5rem, 4vw, 4rem)' }}>
            an accident.
          </p>
          <p className="display-heading text-ink leading-none mb-10" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}>
            It is the result<br />of practice."
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-display text-sm text-coffee-600 italic">— Adapted from Aristotle</span>
            <div className="h-px bg-coffee-200 flex-1 min-w-12 max-w-32" />
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink border-b border-ink/25 hover:text-coffee-700 hover:border-coffee-700 transition-all pb-0.5"
            >
              Open course hub <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
