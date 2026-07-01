import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Search, Lightbulb, CheckCircle2, Sparkles, FileText, Paperclip, GraduationCap } from 'lucide-react';
import { getCourseBySlug, courses } from '../data/courses';
import LectureNotes from '../components/LectureNotes';
import CourseQuiz from '../components/CourseQuiz';
import CourseMaterials from '../components/CourseMaterials';
import CourseAIChat from '../components/CourseAIChat';
import ExplainSelection from '../components/ExplainSelection';
import Breadcrumbs from '../components/Breadcrumbs';
import { usePageTitle } from '../utils/usePageTitle';

const subjectStyles = {
  cs:    { codeBg: 'bg-ink',        codeText: 'text-cream' },
  cyb:   { codeBg: 'bg-rust',       codeText: 'text-cream' },
  math:  { codeBg: 'bg-moss',       codeText: 'text-cream' },
  stats: { codeBg: 'bg-ember-500',  codeText: 'text-cream' },
  gst:   { codeBg: 'bg-coffee-700', codeText: 'text-cream' },
  phy:   { codeBg: 'bg-moss',       codeText: 'text-cream' },
  sen:   { codeBg: 'bg-ink',        codeText: 'text-cream' },
  ent:   { codeBg: 'bg-coffee-600', codeText: 'text-cream' },
  ins:   { codeBg: 'bg-ember-500',  codeText: 'text-cream' },
  siwes: { codeBg: 'bg-coffee-700', codeText: 'text-cream' },
  ele:   { codeBg: 'bg-rust',       codeText: 'text-cream' },
};

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const [activeTab, setActiveTab] = useState('resources');

  // Reset to the default tab when moving to another course (prev/next nav)
  // so a tab the new course doesn't have can't stay selected.
  const [lastSlug, setLastSlug] = useState(slug);
  if (lastSlug !== slug) {
    setLastSlug(slug);
    setActiveTab('resources');
  }

  usePageTitle(course ? `${course.code} — ${course.title}` : 'Course not found');

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-coffee-700 mb-6">Course not found.</p>
        <Link to="/courses" className="btn-ghost">← Back to All Courses</Link>
      </div>
    );
  }

  const style = subjectStyles[course.subject] || subjectStyles.cs;
  const courseIndex = courses.findIndex(c => c.slug === slug);
  const prev = courseIndex > 0 ? courses[courseIndex - 1] : null;
  const next = courseIndex < courses.length - 1 ? courses[courseIndex + 1] : null;
  const hasNotes = course.lectureNotes?.length > 0;
  const hasQuiz = course.quiz?.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'All Courses', to: '/courses' },
        { label: course.code },
      ]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold ${style.codeBg} ${style.codeText}`}>
            {course.code}
          </span>
          <span className="text-xs font-mono text-coffee-700 px-2.5 py-1 bg-coffee-100 rounded-full">
            {course.level}L · Semester {course.semester} · {course.units} units
          </span>
          {course.hasInteractiveModules ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-moss/15 text-moss rounded-full">
              <Sparkles size={11} />
              Interactive track
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-coffee-100 text-coffee-600 rounded-full">
              <BookOpen size={11} />
              Study resources
            </span>
          )}
        </div>

        <h1 className="display-heading text-4xl sm:text-5xl text-ink mb-4 leading-tight">
          {course.title}
        </h1>
        <p className="text-lg text-coffee-700 max-w-3xl leading-relaxed">{course.description}</p>
      </div>

      {/* Interactive track banner */}
      {course.hasInteractiveModules && (
        <div className="mb-10 bg-ink text-cream rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <div className="text-xs font-mono text-coffee-400 uppercase tracking-wider mb-2">
              {course.interactiveModuleCount || 13} Full Interactive Modules
            </div>
            <h2 className="font-display font-bold text-2xl text-cream mb-1">
              This course has its own learning track on Arete.
            </h2>
            <p className="text-sm text-coffee-400 leading-relaxed max-w-lg">
              Theory, annotated code examples, a runnable {course.interactiveLabel || 'Java'} playground,
              practice quizzes with scoring, and guided mini projects.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto shrink-0">
            <Link to={course.interactiveTrackPath || '/lab'} className="btn-primary w-full justify-center sm:w-auto whitespace-nowrap">
              Open Modules <ArrowRight size={15} />
            </Link>
            <Link to="/tutor" className="btn-ghost w-full justify-center sm:w-auto whitespace-nowrap text-center text-sm">
              Ask AI Tutor
            </Link>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex gap-2 mb-8 border-b border-coffee-200 pb-0 overflow-x-auto">
        {[
          { key: 'resources', label: 'Study Resources', icon: BookOpen },
          ...(hasNotes ? [{ key: 'notes', label: 'Lecture Notes', icon: FileText, badge: `${course.lectureNotes.length} topics` }] : []),
          ...(hasQuiz ? [{ key: 'quiz', label: 'Practice Quiz', icon: GraduationCap, badge: `${course.quiz.length} Q` }] : []),
          { key: 'materials', label: 'Materials', icon: Paperclip },
        ].map(({ key, label, icon: Icon, badge }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all -mb-px whitespace-nowrap ${
              activeTab === key
                ? 'border-ink text-ink bg-paper'
                : 'border-transparent text-coffee-600 hover:text-ink hover:border-coffee-300'
            }`}
          >
            <Icon size={14} />
            {label}
            {badge && (
              <span className="text-xs font-mono px-1.5 py-0.5 bg-coffee-100 text-coffee-600 rounded-full">{badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Lecture Notes tab */}
      {activeTab === 'notes' && hasNotes && (
        <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8 mb-8">
          <ExplainSelection context={{ courseCode: course.code, courseTitle: course.title }}>
            <LectureNotes topics={course.lectureNotes} />
          </ExplainSelection>
        </div>
      )}

      {/* Practice Quiz tab */}
      {activeTab === 'quiz' && hasQuiz && (
        <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8 mb-8">
          <CourseQuiz course={course} />
        </div>
      )}

      {/* Materials tab */}
      {activeTab === 'materials' && (
        <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8 mb-8">
          <CourseMaterials courseCode={course.code} courseSlug={slug} />
        </div>
      )}

      {/* Resources tab */}
      {activeTab === 'resources' && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left column — Topics */}
        <div className="lg:col-span-1 space-y-6">

          {/* Topics */}
          <div className="bg-paper border border-coffee-200 rounded-xl p-5">
            <h2 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-moss" />
              Topics Covered
            </h2>
            <ol className="space-y-2">
              {course.topics.map((topic, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-mono text-xs text-coffee-400 tabular-nums mt-0.5 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-coffee-700 leading-snug">{topic}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right column — Resources */}
        <div className="lg:col-span-2 space-y-6">

          {/* Textbooks */}
          <div className="bg-paper border border-coffee-200 rounded-xl p-5">
            <h2 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-coffee-700" />
              Recommended Textbooks
            </h2>
            <div className="space-y-4">
              {course.textbooks.map((book, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-coffee-100 last:border-0 last:pb-0">
                  <span className="font-mono text-xs text-coffee-400 tabular-nums mt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-medium text-ink text-sm leading-snug mb-0.5">{book.title}</p>
                    <p className="text-xs text-coffee-700">{book.authors}</p>
                    {book.note && (
                      <p className="text-xs text-coffee-500 mt-1 italic">{book.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search terms */}
          <div className="bg-paper border border-coffee-200 rounded-xl p-5">
            <h2 className="font-display font-bold text-ink mb-1 flex items-center gap-2">
              <Search size={16} className="text-coffee-700" />
              What to Search
            </h2>
            <p className="text-xs text-coffee-600 mb-4">
              Paste any of these into YouTube or Google for free, quality resources.
            </p>
            <div className="space-y-2">
              {course.searchTerms.map((term, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 bg-coffee-50 border border-coffee-100 rounded-lg group"
                >
                  <ExternalLink size={12} className="text-coffee-400 shrink-0" />
                  <span className="text-sm text-ink font-mono">{term}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Study tips */}
          <div className="bg-paper border border-coffee-200 rounded-xl p-5">
            <h2 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
              <Lightbulb size={16} className="text-ember-500" />
              Study Tips
            </h2>
            <ul className="space-y-3">
              {course.studyTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-ember-500/10 text-ember-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-coffee-700 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      )}

      {/* AI course assistant */}
      <div className="mt-10">
        <CourseAIChat course={course} />
      </div>

      {/* Bottom nav */}
      <div className="mt-12 pt-8 border-t border-coffee-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {prev ? (
          <Link
            to={`/courses/${prev.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-coffee-700 hover:text-ink transition-colors group sm:max-w-[40%]"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>
              <span className="block text-xs text-coffee-500 font-normal">Previous</span>
              {prev.code} · {prev.title}
            </span>
          </Link>
        ) : <div />}

        <Link to="/courses" className="text-sm text-coffee-700 hover:text-ink transition-colors self-start sm:self-auto">
          All Courses
        </Link>

        {next ? (
          <Link
            to={`/courses/${next.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-coffee-700 hover:text-ink transition-colors group text-right sm:max-w-[40%] sm:justify-end"
          >
            <span>
              <span className="block text-xs text-coffee-500 font-normal">Next</span>
              {next.code} · {next.title}
            </span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
