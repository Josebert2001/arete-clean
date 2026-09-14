import { GraduationCap } from 'lucide-react';

// The public course index — every course Areté covers, grouped by level, as
// plain links. Its job is link equity: without a crawlable hub page, the 112
// prerendered course pages are reachable only through the sitemap, which
// Google treats as a hint rather than a structure.
//
// Same constraints as CoursePreview: no hooks, no router, no browser. Rendered
// by the SPA for signed-out visitors and by scripts/prerender.mjs at build.

const LEVEL_LABELS = {
  100: 'First Year',
  200: 'Second Year',
  300: 'Third Year',
  400: 'Final Year',
};

export default function CourseIndexPreview({ groups = [] }) {
  const total = groups.reduce((n, g) => n + g.courses.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-3">
          University of Uyo course outlines
        </h1>
        <p className="text-coffee-800 leading-relaxed max-w-2xl">
          Every one of the {total} courses on Areté, from 100 Level to Final Year — the outline,
          the recommended textbooks and the study tips for each. The GST, MTH, PHY, STA, COS, CSC,
          ENT and INS foundation courses are taken across the university&rsquo;s programmes and are
          here for every student, whatever their department. Cybersecurity and Data Science have
          their full departmental catalogues authored on top of that.
        </p>
        <a href="/signin" className="btn-primary text-sm mt-6 inline-block">
          Sign in to study
        </a>
      </header>

      {/* id, not a ?level= query: the level breadcrumb on every course page
          points here, and a fragment resolves inside the bytes that were
          actually sent — a query string promises a filtered page the static
          file cannot produce. */}
      {groups.map((group) => (
        <section key={group.level} id={`level-${group.level}`} className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <GraduationCap size={16} className="text-ember-500" />
            <h2 className="display-heading text-xl text-ink">
              {group.level} Level
            </h2>
            <span className="text-xs font-mono text-coffee-600">
              {LEVEL_LABELS[group.level]} · {group.courses.length} courses
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {group.courses.map((course) => (
              <li key={course.slug}>
                <a
                  href={`/courses/${course.slug}`}
                  className="flex gap-3 py-1.5 text-sm text-coffee-800 hover:text-ember-500 transition-colors"
                >
                  <span className="font-mono text-xs text-coffee-500 pt-0.5 w-20 shrink-0">
                    {course.code}
                  </span>
                  <span>{course.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
