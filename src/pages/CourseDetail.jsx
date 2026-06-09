import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Search, Lightbulb, CheckCircle2, Sparkles, ChevronRight, Clock, FileText } from 'lucide-react';
import { getCourseBySlug, courses } from '../data/courses';
import LectureNotes from '../components/LectureNotes';

const subjectStyles = {
  cs:    { codeBg: 'bg-ink',        codeText: 'text-cream',  accent: 'text-ink',        tag: 'bg-coffee-100 text-coffee-800' },
  cyb:   { codeBg: 'bg-rust',       codeText: 'text-cream',  accent: 'text-rust',       tag: 'bg-rust/10 text-rust' },
  math:  { codeBg: 'bg-moss',       codeText: 'text-cream',  accent: 'text-moss',       tag: 'bg-moss/10 text-moss' },
  stats: { codeBg: 'bg-ember-500',  codeText: 'text-cream',  accent: 'text-ember-500',  tag: 'bg-ember-500/10 text-ember-500' },
  gst:   { codeBg: 'bg-coffee-700', codeText: 'text-cream',  accent: 'text-coffee-700', tag: 'bg-coffee-100 text-coffee-700' },
  phy:   { codeBg: 'bg-moss',       codeText: 'text-cream',  accent: 'text-moss',       tag: 'bg-moss/10 text-moss' },
  sen:   { codeBg: 'bg-ink',        codeText: 'text-cream',  accent: 'text-ink',        tag: 'bg-coffee-100 text-coffee-800' },
  ent:   { codeBg: 'bg-coffee-600', codeText: 'text-cream',  accent: 'text-coffee-600', tag: 'bg-coffee-100 text-coffee-700' },
  ins:   { codeBg: 'bg-ember-500',  codeText: 'text-cream',  accent: 'text-ember-500',  tag: 'bg-ember-500/10 text-ember-500' },
  siwes: { codeBg: 'bg-coffee-700', codeText: 'text-cream',  accent: 'text-coffee-700', tag: 'bg-coffee-100 text-coffee-700' },
  ele:   { codeBg: 'bg-rust',       codeText: 'text-cream',  accent: 'text-rust',       tag: 'bg-rust/10 text-rust' },
};

const subjectLabels = {
  cs:    'Computer Science',
  cyb:   'Cybersecurity',
  math:  'Mathematics',
  stats: 'Statistics',
  gst:   'General Studies',
  phy:   'Physics',
  sen:   'Software Engineering',
  ent:   'Entrepreneurship',
  ins:   'Information Systems',
  siwes: 'Industrial Training / SIWES',
  ele:   'Electronics',
};

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const [activeTab, setActiveTab] = useState('resources');

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

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Back + breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-coffee-700 mb-8">
        <Link to="/courses" className="flex items-center gap-1.5 hover:text-ink transition-colors">
          <ArrowLeft size={14} />
          All Courses
        </Link>
        <ChevronRight size={12} className="text-coffee-400" />
        <span className="text-ink font-medium">{course.code}</span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold ${style.codeBg} ${style.codeText}`}>
            {course.code}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${style.tag}`}>
            {subjectLabels[course.subject]}
          </span>
          <span className="text-xs font-mono text-coffee-700 px-2.5 py-1 bg-coffee-100 rounded-full">
            {course.level}L · Semester {course.semester} · {course.units} units
          </span>
          {(course.lh > 0 || course.ph > 0) && (
            <span className="text-xs font-mono text-coffee-600 px-2.5 py-1 bg-coffee-50 border border-coffee-100 rounded-full">
              {course.lh > 0 ? `${course.lh}h lecture` : ''}{course.lh > 0 && course.ph > 0 ? ' · ' : ''}{course.ph > 0 ? `${course.ph}h practical` : ''}
            </span>
          )}
          {course.hasInteractiveModules ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-moss/15 text-moss rounded-full">
              <Sparkles size={11} />
              Full interactive modules available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-coffee-100 text-coffee-600 rounded-full">
              <BookOpen size={11} />
              Study resources
            </span>
          )}
          {hasNotes && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-rust/10 text-rust rounded-full">
              <FileText size={11} />
              Lecture notes available
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
          <div className="flex flex-col gap-2 shrink-0">
            <Link to={course.interactiveTrackPath || '/tracks'} className="btn-primary whitespace-nowrap">
              Open Modules <ArrowRight size={15} />
            </Link>
            <Link to="/tutor" className="btn-ghost whitespace-nowrap text-center text-sm">
              Ask AI Tutor
            </Link>
          </div>
        </div>
      )}

      {/* Tab bar — only show when course has lecture notes */}
      {hasNotes && (
        <div className="flex gap-2 mb-8 border-b border-coffee-200 pb-0">
          {[
            { key: 'resources', label: 'Study Resources', icon: BookOpen },
            { key: 'notes', label: 'Lecture Notes', icon: FileText, badge: `${course.lectureNotes.length} topics` },
          ].map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all -mb-px ${
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
      )}

      {/* Lecture Notes tab */}
      {hasNotes && activeTab === 'notes' && (
        <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8 mb-8">
          <LectureNotes topics={course.lectureNotes} />
        </div>
      )}

      {/* Resources tab (always visible when no notes; conditional when notes exist) */}
      {(!hasNotes || activeTab === 'resources') && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left column — Topics + nav */}
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

          {/* Prev / next course */}
          <div className="bg-paper border border-coffee-200 rounded-xl p-4 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-3">Other Courses</p>
            {prev && (
              <Link
                to={`/courses/${prev.slug}`}
                className="flex items-center gap-2 text-sm text-coffee-700 hover:text-ink transition-colors group"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="truncate">{prev.code} · {prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                to={`/courses/${next.slug}`}
                className="flex items-center gap-2 text-sm text-coffee-700 hover:text-ink transition-colors group"
              >
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                <span className="truncate">{next.code} · {next.title}</span>
              </Link>
            )}
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

          {/* Past questions placeholder */}
          <div className="bg-cream border border-dashed border-coffee-300 rounded-xl p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-coffee-100 flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={18} className="text-coffee-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-bold text-ink">Past Questions</h2>
                <span className="text-xs font-mono px-2 py-0.5 bg-coffee-100 text-coffee-600 rounded-full">Planned</span>
              </div>
              <p className="text-sm text-coffee-700 leading-relaxed">
                Past examination questions for {course.code} are planned for a future release. When they arrive, they’ll appear here with worked solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Bottom nav */}
      <div className="mt-12 pt-8 border-t border-coffee-200 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            to={`/courses/${prev.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-coffee-700 hover:text-ink transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>
              <span className="block text-xs text-coffee-500 font-normal">Previous</span>
              {prev.code} · {prev.title}
            </span>
          </Link>
        ) : <div />}

        <Link to="/courses" className="text-sm text-coffee-700 hover:text-ink transition-colors">
          All Courses
        </Link>

        {next ? (
          <Link
            to={`/courses/${next.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-coffee-700 hover:text-ink transition-colors group text-right"
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
