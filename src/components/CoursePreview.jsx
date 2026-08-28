import { BookOpen, GraduationCap, Lightbulb, ListChecks, Lock } from 'lucide-react';
import { courseOfferings } from '../data/publicCatalogue';

// The public face of a course: everything a prospective student — or a search
// crawler — should be able to read without an account. The syllabus, the set
// texts and the study tips are the whole point; they are the text that makes
// this page findable for "cyb 224 uniuyo" at all.
//
// What stays behind the sign-in gate is the *work*: the transcribed lecture
// notes, the question banks, the AI tutor, progress tracking. Those are what
// the account is for, so the page names them rather than hiding their
// existence.
//
// Deliberately free of hooks, context and react-router. It is rendered twice
// from very different places — by the SPA for a signed-out visitor, and by
// scripts/prerender.mjs through renderToStaticMarkup at build time — and the
// build-time render has no Router and no browser. Plain <a> for the same
// reason: a full page load on a preview page costs nothing and the href is
// unambiguously crawlable.

const SEMESTERS = { 1: 'First Semester', 2: 'Second Semester' };

function Pill({ children }) {
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded bg-coffee-100 text-coffee-700">
      {children}
    </span>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <Icon size={16} className="text-ember-500" />
        <h2 className="display-heading text-xl text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function CoursePreview({ course, department, siblings = [] }) {
  const offerings = courseOfferings(course);
  const related = siblings.filter((c) => c.slug !== course.slug).slice(0, 8);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-coffee-600">
        <a href="/courses" className="hover:text-ember-500">Courses</a>
        <span className="mx-2 opacity-50">/</span>
        <a href={`/courses?level=${course.level}`} className="hover:text-ember-500">
          {course.level} Level
        </a>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-coffee-800">{course.code}</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-ink text-cream">{course.code}</span>
          <Pill>{course.units} units</Pill>
          <Pill>{course.level} Level</Pill>
          {SEMESTERS[course.semester] && <Pill>{SEMESTERS[course.semester]}</Pill>}
        </div>
        <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-3">{course.title}</h1>
        <p className="text-sm text-coffee-600 mb-4">
          {department?.degree ? `${department.degree}, ` : ''}University of Uyo
        </p>
        {course.description && (
          <p className="text-coffee-800 leading-relaxed">{course.description}</p>
        )}
      </header>

      {offerings.length > 0 && (
        <div className="rounded-xl border border-coffee-200 bg-paper p-5 mb-10">
          <p className="text-sm font-semibold text-ink mb-2">
            On Areté, {course.code} comes with
          </p>
          <ul className="text-sm text-coffee-700 leading-relaxed list-disc pl-5 space-y-1">
            {offerings.map((item) => <li key={item}>{item}</li>)}
            <li>an AI tutor that has read this course&rsquo;s outline and notes</li>
          </ul>
          <a href="/signin" className="btn-primary text-sm mt-5 inline-flex items-center gap-2">
            <Lock size={14} /> Sign in to study {course.code}
          </a>
          <p className="text-xs text-coffee-600 mt-3">
            Free for University of Uyo students — sign in with your email, no password.
          </p>
        </div>
      )}

      {course.topics?.length > 0 && (
        <Section icon={ListChecks} title="Course outline">
          <ol className="space-y-2.5">
            {course.topics.map((topic, i) => (
              <li key={topic} className="flex gap-3 text-sm text-coffee-800 leading-relaxed">
                <span className="font-mono text-xs text-coffee-500 pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {course.textbooks?.length > 0 && (
        <Section icon={BookOpen} title="Recommended textbooks">
          <ul className="space-y-3">
            {course.textbooks.map((book) => (
              <li key={book.title} className="text-sm leading-relaxed">
                <span className="font-semibold text-ink">{book.title}</span>
                {book.authors && <span className="text-coffee-700"> — {book.authors}</span>}
                {book.note && <p className="text-xs text-coffee-600 mt-0.5">{book.note}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {course.studyTips?.length > 0 && (
        <Section icon={Lightbulb} title={`How to pass ${course.code}`}>
          <ul className="space-y-2 list-disc pl-5">
            {course.studyTips.map((tip) => (
              <li key={tip} className="text-sm text-coffee-800 leading-relaxed">{tip}</li>
            ))}
          </ul>
        </Section>
      )}

      {related.length > 0 && (
        <Section icon={GraduationCap} title={`Other ${course.level} Level courses`}>
          <ul className="flex flex-wrap gap-2">
            {related.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/courses/${c.slug}`}
                  className="inline-block text-xs font-mono px-2.5 py-1 rounded border border-coffee-200 text-coffee-700 hover:border-ember-500 hover:text-ember-500 transition-colors"
                  title={c.title}
                >
                  {c.code}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="border-t border-coffee-200 pt-8 text-center">
        <p className="text-sm text-coffee-700 mb-4">
          Lecture notes, practice questions and the AI tutor for {course.code} are available once
          you sign in.
        </p>
        <a href="/signin" className="btn-primary text-sm">Sign in to Areté</a>
      </div>
    </div>
  );
}
