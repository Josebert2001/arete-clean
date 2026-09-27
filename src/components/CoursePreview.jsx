import {
  BookOpen,
  FileText,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Lock,
  Sparkles,
} from 'lucide-react';
import { courseAudience, courseFaqs, courseOfferings, courseSummary } from '../data/publicCatalogue';

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

// One section of a lecture-note topic, prose only. publicNotes.js filters the
// section list down to these three types precisely because this component is
// hook-free and build-rendered — figures, code, maths and tables belong to
// LectureNotes.jsx, which has the components and the browser to do them justice.
function PreviewSection({ section }) {
  if (section.type === 'bullets') {
    return (
      <div className="mb-4">
        {section.heading && (
          <h4 className="text-sm font-semibold text-ink mb-1.5">{section.heading}</h4>
        )}
        <ul className="list-disc pl-5 space-y-1 text-sm text-coffee-800 leading-relaxed">
          {section.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
  if (section.type === 'termlist') {
    return (
      <dl className="mb-4 space-y-2">
        {(section.items || []).map(({ term, def }) => (
          <div key={term}>
            <dt className="text-sm font-semibold text-ink inline">{term} — </dt>
            <dd className="text-sm text-coffee-800 leading-relaxed inline">{def}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (section.type === 'note') {
    return (
      <div className="mb-4 rounded-lg bg-coffee-100 px-4 py-3">
        {section.text && (
          <p className="text-sm text-coffee-800 leading-relaxed">{section.text}</p>
        )}
        {section.items?.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 text-sm text-coffee-800 leading-relaxed mt-1.5">
            {section.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )}
      </div>
    );
  }
  if (section.type === 'definition') {
    return (
      <div className="mb-4 rounded-lg border-l-2 border-ember-500 bg-paper pl-4 py-2.5">
        {section.heading && (
          <h4 className="text-sm font-semibold text-ink mb-1">{section.heading}</h4>
        )}
        <p className="text-sm text-coffee-800 leading-relaxed">{section.text}</p>
      </div>
    );
  }
  // `text` sections carry a heading too — 62 of the 139 in the note files do.
  // Dropping it published a run of headless paragraphs: COS 221's topic 1
  // became four consecutive definitions of `boolean`, `byte`, `char` and
  // `short` with nothing saying which was which.
  return (
    <div className="mb-4">
      {section.heading && (
        <h4 className="text-sm font-semibold text-ink mb-1.5">{section.heading}</h4>
      )}
      <p className="text-sm text-coffee-800 leading-relaxed">{section.text}</p>
    </div>
  );
}

export default function CoursePreview({ course, department, siblings = [], notes = null }) {
  const offerings = courseOfferings(course);
  const related = siblings.filter((c) => c.slug !== course.slug).slice(0, 8);
  const faqs = courseFaqs(course);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-coffee-600">
        <a href="/courses" className="hover:text-ember-500">Courses</a>
        <span className="mx-2 opacity-50">/</span>
        {/* An anchor on /courses, not ?level= — see courseBreadcrumbJsonLd. */}
        <a href={`/courses#level-${course.level}`} className="hover:text-ember-500">
          {course.level} Level
        </a>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-coffee-800">{course.code}</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Pill>{course.units} units</Pill>
          <Pill>{course.level} Level</Pill>
          {SEMESTERS[course.semester] && <Pill>{SEMESTERS[course.semester]}</Pill>}
        </div>
        {/* The code belongs IN the heading, not in a badge above it. Students
            search by code ("gst 111 uniuyo") and an <h1> is weighted far more
            heavily than a sibling <span> for matching that query — the badge
            put the one word the page is looked up by outside the one element
            that says what the page is about. It is not repeated as a badge now
            that it is here; the breadcrumb above still carries it. */}
        <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-3">
          <span className="font-mono text-2xl sm:text-3xl text-coffee-600">{course.code}</span>
          {' — '}
          {course.title}
        </h1>
        {/* Not "B.Sc. Cybersecurity" on GST 111. Areté serves the whole
            university, and 22 of these pages are courses every programme
            takes — naming one department there tells every other student the
            page is not for them. */}
        <p className="text-sm text-coffee-600 mb-4">{courseAudience(course, department)}</p>
        {/* Definitional lead. The page used to open with prose written for a
            student who already knows what the course is; an answer engine
            extracts the first factual sentence, so this states the facts —
            code, title, units, level, semester, institution — in one. */}
        <p className="text-coffee-800 leading-relaxed font-medium">{courseSummary(course)}</p>
        {course.description && (
          <p className="text-coffee-800 leading-relaxed mt-3">{course.description}</p>
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

      {/* ── The public slice of the lecture notes ────────────────────────
          What a signed-out visitor and a crawler get: the table of contents,
          the glossary, and the prose of the first topic. See publicNotes.js
          for what each costs and why the rest stays gated. */}

      {notes?.outline?.length > 0 && (
        <Section icon={FileText} title={`What the ${course.code} lecture notes cover`}>
          {/* Titles only. It is a table of contents, not the content — and it
              is the thing a student weighing an account most wants to know:
              does this match what my lecturer actually taught? */}
          <ol className="space-y-2">
            {notes.outline.map((title, i) => (
              <li key={title} className="flex gap-3 text-sm text-coffee-800 leading-relaxed">
                <span className="font-mono text-xs text-coffee-500 pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{title}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-coffee-600 mt-4">
            {notes.topicCount} transcribed {notes.topicCount === 1 ? 'topic' : 'topics'}, taken from
            the lecturer&rsquo;s own workbook. Readable in full once you sign in.
          </p>
        </Section>
      )}

      {notes?.glossary?.length > 0 && (
        <Section icon={Sparkles} title={`${course.code} key concepts`}>
          <dl className="space-y-4">
            {notes.glossary.map(({ term, definition }) => (
              <div key={term}>
                <dt className="text-sm font-semibold text-ink">{term}</dt>
                <dd className="text-sm text-coffee-700 leading-relaxed mt-0.5">{definition}</dd>
              </div>
            ))}
          </dl>
          {notes.glossaryTruncated && (
            <p className="text-xs text-coffee-600 mt-4">
              The {notes.topicCount} topics define many more terms than these — the full set, with
              flashcards, is in the notes.
            </p>
          )}
        </Section>
      )}

      {notes?.preview && (
        <Section icon={BookOpen} title={`Read the start of “${notes.preview.title}”`}>
          <div className="rounded-xl border border-coffee-200 bg-cream/50 p-5">
            {notes.preview.sections.map((section, i) => (
              <PreviewSection key={i} section={section} />
            ))}
            <div className="border-t border-coffee-200 pt-4 mt-1">
              <p className="text-sm text-coffee-700 mb-3">
                {notes.preview.truncated
                  ? `That is the opening of topic 1 of ${notes.topicCount}.`
                  : `That is topic 1 of ${notes.topicCount}.`}{' '}
                Sign in — free, no password — to read the rest, take the practice questions, and
                ask the AI tutor about any of it.
              </p>
              <a href="/signin" className="btn-primary text-sm inline-flex items-center gap-2">
                <Lock size={14} /> Read all {notes.topicCount} {course.code} topics
              </a>
            </div>
          </div>
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

      {faqs.length > 0 && (
        <Section icon={HelpCircle} title={`${course.code} — questions and answers`}>
          {/* Rendered, not merely serialised into the FAQPage JSON-LD:
              Google requires an FAQPage's answers to be visible on the page,
              and an engine that cannot read the text will not quote it. */}
          <dl className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-semibold text-ink mb-1.5">{q}</dt>
                <dd className="text-sm text-coffee-700 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {related.length > 0 && (
        <Section icon={GraduationCap} title={`Other ${course.level} Level courses`}>
          {/* The course title is visible link text, not a title="" tooltip.
              Answer engines and screen readers weigh what the anchor says, and
              "CYB 101" on its own says nothing about where the link goes. */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {related.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/courses/${c.slug}`}
                  className="flex gap-3 py-1.5 text-sm text-coffee-700 hover:text-ember-500 transition-colors"
                >
                  <span className="font-mono text-xs text-coffee-500 pt-0.5 w-20 shrink-0">
                    {c.code}
                  </span>
                  <span>{c.title}</span>
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
