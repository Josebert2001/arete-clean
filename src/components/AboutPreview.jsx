// From siteMeta, the leaf module, not from publicCatalogue's re-export: this
// component needs two strings, and reaching them through publicCatalogue would
// pull the department and lecture-note registries into the /about chunk for no
// reason. HomePreview has to go through publicCatalogue because it renders
// SITE_FAQS; this one does not.
import { SITE_URL, INSTITUTION } from '../data/siteMeta';

// The page behind the Person node in index.html's structured data. That node
// claimed an author with `url` pointing at the site root — a page that says
// nothing about who wrote any of this — which is the shape of an E-E-A-T signal
// without the substance of one. For educational material, "who transcribed this
// and from what" is the question that decides whether an answer engine will
// repeat it, and it had no answer anywhere on the site.
//
// Same constraints as HomePreview and CoursePreview: no hooks, no context, no
// react-router, no browser. Rendered through renderToStaticMarkup at build time
// and thrown away the moment main.jsx calls createRoot(), so it must be true and
// readable rather than identical to anything.
//
// Everything here is a fact already published on the site or visible in the
// repository. Nothing is invented — not a founding date, not a headcount, not a
// qualification. An About page that pads is worse than none: it is the one page
// whose entire job is to be checkable.

const SOURCING = [
  {
    title: 'Course outlines, units and semesters',
    body:
      `Transcribed from the ${INSTITUTION}'s own curriculum — the Students' Information Handbook ` +
      'and departmental course listings. Where a course carries a code prefixed UUY-, that is a ' +
      'departmental course with no faculty-wide code, recorded as the department teaches it.',
  },
  {
    title: 'Lecture notes',
    body:
      "Transcribed from lecturers' workbooks and handouts rather than paraphrased, so what a " +
      'student reads here is what was taught in that hall. Where a handout conflicts with the ' +
      'standard definition of a term, the notes teach the standard one and say plainly that the ' +
      'handout differs — a student sitting that lecturer\'s paper needs to know both.',
  },
  {
    title: 'Question banks',
    body:
      'Written against the lecture notes they test, and every question names the section it came ' +
      'from, so a student who drops a mark knows exactly what to re-read. Written-answer ' +
      'questions carry a mark scheme whose points sum to the marks on the question; the build ' +
      'fails if they ever stop summing.',
  },
  {
    title: 'What is not here',
    body:
      'Past question papers are not republished, and no material is taken from another study ' +
      'site. Courses outside the authored catalogues are absent rather than filled in with ' +
      'plausible-looking outlines — a guessed outline read before an exam is worse than no page.',
  },
];

const PEOPLE = [
  {
    name: 'Josebert',
    role: 'Director of Software & Hardware',
    body:
      'Builds and maintains the platform — the catalogue data, the course pages, the programming ' +
      'tracks, the AI tutor and the campus map.',
  },
  {
    name: 'Barry',
    role: 'Director of Academic',
    body:
      'Owns the academic material — which courses are authored next, how the lecture notes are ' +
      'transcribed, and whether a question bank is fit to revise from.',
  },
];

export default function AboutPreview() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-coffee-600">
        <a href="/" className="hover:text-ember-500">Areté</a>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-coffee-800">About</span>
      </nav>

      <header className="mb-10">
        <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-4">
          About Areté
        </h1>
        {/* The definitional lead, same as every other public page: the first
            factual sentence is the one an engine lifts. */}
        <p className="text-coffee-800 leading-relaxed font-medium mb-4">
          Areté is a free study companion for {INSTITUTION} undergraduates in Akwa Ibom State,
          Nigeria, built by two students in the university&rsquo;s Cybersecurity department. It
          carries course outlines, recommended textbooks and study tips for the foundation courses
          taken across the university&rsquo;s programmes and for the full Cybersecurity and Data
          Science catalogues, with transcribed lecture notes, past-paper practice, interactive
          Java, Python and C tracks and an AI tutor on top of them.
        </p>
        <p className="text-sm text-coffee-700 leading-relaxed">
          <b className="text-ink">Areté is independent.</b> It is not affiliated with, endorsed by
          or operated by the {INSTITUTION}, and it is not the university&rsquo;s official learning
          platform. The university runs its own systems for registration, results and
          lecturer-delivered course material. Areté sits beside them and answers a different
          question: what is on this course, and how do I revise it.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">Who builds it</h2>
        <ul className="space-y-5">
          {PEOPLE.map(({ name, role, body }) => (
            <li key={name} className="rounded-xl border border-coffee-200 bg-paper p-5">
              <h3 className="font-semibold text-ink">{name}</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-coffee-600 mt-1 mb-2">
                {role}
              </p>
              <p className="text-sm text-coffee-700 leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-coffee-700 leading-relaxed mt-5">
          Both are students of the Cybersecurity department at the {INSTITUTION} — which is why
          that catalogue was authored first, and why the site lives at aretecyb.tech. Areté is for
          the whole university; the domain is where it started, not who it is for.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">Where the material comes from</h2>
        <ul className="space-y-5">
          {SOURCING.map(({ title, body }) => (
            <li key={title}>
              <h3 className="font-semibold text-ink mb-1">{title}</h3>
              <p className="text-sm text-coffee-700 leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">Why it exists</h2>
        <p className="text-sm text-coffee-700 leading-relaxed mb-3">
          A student who misses a lecture, or who is handed a lab manual and never taught the code
          in it, has nowhere to go. Course outlines circulate as photographs of a noticeboard,
          lecture notes as a photocopy of a photocopy, and past questions as whatever the year
          above kept. None of it is searchable, and none of it survives the semester.
        </p>
        <p className="text-sm text-coffee-700 leading-relaxed">
          Areté is the attempt to keep it in one readable place: the outline and the set texts
          public so anyone can check what a course covers, and the notes, practice and tutor behind
          a free account so there is a record of who is actually using it and which department to
          author next.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="display-heading text-2xl text-ink mb-5">What it costs</h2>
        <p className="text-sm text-coffee-700 leading-relaxed">
          Nothing. Course outlines, recommended textbooks and study tips are public and need no
          account. The lecture notes, question banks, AI tutor and progress tracking need a free
          account — sign in with your university or personal email and a one-time code arrives;
          there is no password and no payment.
        </p>
      </section>

      <div className="border-t border-coffee-200 pt-8">
        <p className="text-sm text-coffee-700 mb-4">
          Corrections are welcome, and a wrong course outline is worth reporting — use the feedback
          tab on any page.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/courses" className="btn-primary text-sm">Browse all course outlines</a>
          <a href="/signin" className="btn-ghost text-sm">Sign in — free, no password</a>
        </div>
        <p className="text-xs text-coffee-600 mt-5">
          <a href={`${SITE_URL}/llms.txt`} className="hover:text-ember-500">llms.txt</a>
          <span className="mx-2 opacity-50">·</span>
          <a href="/privacy" className="hover:text-ember-500">Privacy</a>
          <span className="mx-2 opacity-50">·</span>
          <a href="/terms" className="hover:text-ember-500">Terms</a>
        </p>
      </div>
    </div>
  );
}
