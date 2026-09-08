import { GraduationCap, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE_FAQS } from '../data/publicCatalogue';

// What a crawler gets for "/". Home.jsx cannot be prerendered — it reads
// AuthContext, calls useNavigate, and swaps itself for the signed-in dashboard
// — so a raw HTTP fetch of the site's most-linked URL returned an empty
// <div id="root"> and nothing else. This is the same page's claims, written
// once, in markup that needs no JavaScript.
//
// Same constraints as CoursePreview: no hooks, no context, no react-router, no
// browser. It is rendered through renderToStaticMarkup at build time and then
// thrown away the instant main.jsx calls createRoot(), which is why it does not
// need to look identical to the live page — it needs to be *true* and readable.

const LEVELS = [
  { level: 100, year: 'First year', text: 'Mathematics, physics, statistics and computing foundations.' },
  { level: 200, year: 'Second year', text: 'Core programming, logic, computer architecture and systems analysis.' },
  { level: 300, year: 'Third year', text: 'Specialist courses and the SIWES industrial placement.' },
  { level: 400, year: 'Final year', text: 'Advanced electives, research methods and the final-year project.' },
];

const INSIDE = [
  {
    icon: GraduationCap,
    title: 'Every course, all four years',
    body:
      'Topic outlines, recommended textbooks and exam tips for every course from 100 Level to ' +
      'Final Year, plus transcribed lecture notes, flashcards and plain-English rewrites for a ' +
      'growing set of courses.',
  },
  {
    icon: Code2,
    title: '37 interactive programming modules',
    body:
      'Java (COS 211 / COS 221), Python (COS 121) and C — theory, annotated code, an in-browser ' +
      'playground, quizzes and a mini project in each module.',
  },
  {
    icon: ShieldCheck,
    title: '12 capture-the-flag security rooms',
    body:
      'A hands-on security track with escalating hints: the CIA triad, cryptography, SQL ' +
      'injection, the Linux command line, digital forensics and network defence.',
  },
  {
    icon: Sparkles,
    title: 'An AI tutor that knows the curriculum',
    body:
      'Ask about any course in the programme and get an answer pitched at your year, grounded in ' +
      'that course’s own outline and notes. A code explainer and a study planner sit alongside it.',
  },
];

export default function HomePreview() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-4">
          University of Uyo · 100L – 400L
        </p>
        <h1 className="display-heading text-4xl sm:text-5xl text-ink mb-4">
          Areté — your academic companion for all four years
        </h1>
        {/* The definitional lead. An answer engine asked "what is Areté" lifts
            the first factual sentence it finds; this is that sentence. */}
        <p className="text-coffee-800 leading-relaxed max-w-2xl mb-4">
          Areté is a free academic companion for University of Uyo undergraduates in Akwa Ibom
          State, Nigeria. It carries the outline, the recommended textbooks and the study tips for
          every course from 100 Level to Final Year, transcribed lecture notes and past-paper
          practice for a growing set of courses, interactive Java, Python and C tracks, and an AI
          tutor that has read the curriculum.
        </p>
        <p className="text-sm text-coffee-700">
          Cybersecurity and Data Science have fully authored catalogues. Students in every other
          department get the shared GST, MTH, PHY, STA, COS, CSC, ENT and INS courses, plus all
          four tracks.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <a href="/courses" className="btn-primary text-sm">Browse all course outlines</a>
          <a href="/signin" className="btn-ghost text-sm">Sign in — free, no password</a>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">The four years</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LEVELS.map(({ level, year, text }) => (
            <li key={level} className="rounded-xl border border-coffee-200 bg-paper p-5">
              <h3 className="display-heading text-lg text-ink mb-1">
                {level} Level <span className="text-xs font-mono text-coffee-600">· {year}</span>
              </h3>
              <p className="text-sm text-coffee-700 leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">What&rsquo;s inside</h2>
        <ul className="space-y-5">
          {INSIDE.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <Icon size={18} className="text-ember-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-ink mb-1">{title}</h3>
                <p className="text-sm text-coffee-700 leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Rendered, not just serialised into JSON-LD: Google treats an FAQPage
          block whose answers are not on the page as a violation, and an answer
          engine that cannot see the text will not quote it. */}
      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">Questions students ask</h2>
        <dl className="space-y-6">
          {SITE_FAQS.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-semibold text-ink mb-1.5">{q}</dt>
              <dd className="text-sm text-coffee-700 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="border-t border-coffee-200 pt-8 text-center">
        <p className="text-sm text-coffee-700 mb-4">
          Free for University of Uyo students — sign in with your email, no password.
        </p>
        <a href="/signin" className="btn-primary text-sm">Get started</a>
      </div>
    </div>
  );
}
