import { renderToStaticMarkup } from 'react-dom/server';
import CoursePreview from '../components/CoursePreview';
import CourseIndexPreview from '../components/CourseIndexPreview';
import HomePreview from '../components/HomePreview';
import InstallPreview from '../components/InstallPreview';
import { tracks, installHowToJsonLd } from '../data/installGuides';
import {
  loadPublicCourses,
  groupByLevel,
  courseTitle,
  courseDescription,
  courseJsonLd,
  courseBreadcrumbJsonLd,
  courseFaqJsonLd,
  siteFaqJsonLd,
  homeTitle,
  homeDescription,
  installTitle,
  installDescription,
  indexTitle,
  indexDescription,
  SITE_URL,
  SITE_NAME,
  INSTITUTION,
} from '../data/publicCatalogue';

// Build-time only. `vite build --config vite.ssr.config.js` compiles this to
// dist-ssr/entry-server.js, which scripts/prerender.mjs then imports from plain
// Node to write one static HTML file per public page.
//
// renderToStaticMarkup, not renderToString: nothing here is hydrated. main.jsx
// calls createRoot().render(), which discards whatever is already in #root and
// renders fresh, so React never compares the two trees and the data-reactroot
// markers renderToString adds would be dead weight on 114 files.

// Every page that gets its own static file.
//
// `buildDate` is threaded through from the caller rather than read here so that
// one deploy's sitemap `lastmod` and its pages' `dateModified` cannot disagree
// by a millisecond boundary.
export async function collectPages({ buildDate } = {}) {
  const entries = await loadPublicCourses();
  const pages = [];

  // "/" writes dist/index.html — the same file Vercel serves as the SPA
  // fallback for every non-prerendered route. That is fine and deliberate:
  // main.jsx clears #root on load, so the only request this markup ever
  // answers is one that has not run JS, and for "/" that request is exactly
  // the one that used to receive an empty div.
  pages.push({
    path: '/',
    title: homeTitle(),
    description: homeDescription(),
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    changefreq: 'weekly',
    priority: '1.0',
    // The EducationalOrganization and WebSite blocks already live in
    // index.html and are therefore on this page too; only the FAQ is new.
    jsonLd: [siteFaqJsonLd()],
    html: renderToStaticMarkup(<HomePreview />),
  });

  pages.push({
    path: '/courses',
    title: indexTitle(),
    description: indexDescription(entries.length),
    canonical: `${SITE_URL}/courses`,
    ogType: 'website',
    changefreq: 'weekly',
    priority: '0.9',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${INSTITUTION} course outlines`,
        url: `${SITE_URL}/courses`,
        dateModified: buildDate || undefined,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
        hasPart: entries.map(({ course }) => ({
          '@type': 'Course',
          name: `${course.code} — ${course.title}`,
          url: `${SITE_URL}/courses/${course.slug}`,
        })),
      },
    ],
    html: renderToStaticMarkup(<CourseIndexPreview groups={groupByLevel(entries)} />),
  });

  pages.push({
    path: '/install',
    title: installTitle(),
    description: installDescription(),
    canonical: `${SITE_URL}/install`,
    ogType: 'article',
    changefreq: 'monthly',
    priority: '0.6',
    jsonLd: tracks.map((track) => installHowToJsonLd(track, SITE_URL)),
    html: renderToStaticMarkup(<InstallPreview />),
  });

  for (const { course, department } of entries) {
    const siblings = entries
      .filter((e) => e.course.level === course.level)
      .map((e) => e.course);
    pages.push({
      path: `/courses/${course.slug}`,
      title: courseTitle(course),
      description: courseDescription(course),
      canonical: `${SITE_URL}/courses/${course.slug}`,
      // Course pages used to inherit the shell's og:type=website, which told
      // every social and answer-engine unfurler that 95 syllabus pages were
      // each the site's front door.
      ogType: 'article',
      changefreq: 'monthly',
      priority: '0.8',
      jsonLd: [
        courseJsonLd(course, department, { dateModified: buildDate }),
        courseBreadcrumbJsonLd(course),
        courseFaqJsonLd(course),
      ],
      html: renderToStaticMarkup(
        <CoursePreview course={course} department={department} siblings={siblings} />
      ),
    });
  }

  return pages;
}

// The markdown manifest answer engines fetch to learn a site's shape without
// crawling it — /llms.txt is the index, /llms-full.txt is the whole public
// corpus in one file.
//
// Generated from the same `entries` the HTML is generated from, never
// hand-maintained: a hand-written manifest claiming "57 courses" is wrong the
// day a catalogue is added, and a manifest an engine trusts and finds wrong is
// worse than no manifest.
export async function collectLlmsTxt({ buildDate } = {}) {
  const entries = await loadPublicCourses();
  const groups = groupByLevel(entries);
  const stamp = (buildDate || new Date().toISOString()).slice(0, 10);
  const units = (n) => `${n} ${n === 1 ? 'unit' : 'units'}`;
  const semester = (n) => `${n === 1 ? 'First' : 'Second'} Semester`;

  // One physical line per paragraph. A hard-wrapped blockquote leaves trailing
  // spaces at every break, which in markdown is a line-break directive — the
  // summary an engine quotes should not arrive pre-broken.
  const header = [
    `# ${SITE_NAME} — academic companion for the ${INSTITUTION}`,
    '',
    `> ἀρετή (ar-eh-TAY). A free study companion for ${INSTITUTION} undergraduates in Akwa Ibom ` +
      `State, Nigeria: the outline, recommended textbooks and study tips for all ${entries.length} ` +
      'courses from 100 Level to Final Year, transcribed lecture notes and past-paper practice for ' +
      'a growing set of them, interactive Java, Python and C tracks, a capture-the-flag security ' +
      'track, and an AI tutor that has read the curriculum.',
    '',
    `- Site: ${SITE_URL}`,
    `- Institution: ${INSTITUTION} (https://www.uniuyo.edu.ng/, https://www.wikidata.org/wiki/Q7896523)`,
    '- Audience: 100 Level – 400 Level undergraduates',
    '- Departments with a fully authored catalogue: Cybersecurity, Data Science. Every other ' +
      'department gets the shared GST, MTH, PHY, STA, COS, CSC, ENT and INS courses.',
    '- Access: course outlines, textbooks and study tips are public. Lecture notes, question ' +
      'banks, the AI tutor and progress tracking need a free account (email code, no password).',
    `- Last generated: ${stamp}`,
    '',
    '',
  ].join('\n');

  const index = [
    '## Courses',
    '',
    `- [All ${entries.length} course outlines](${SITE_URL}/courses): the hub, grouped by year.`,
    '',
    ...groups.flatMap((group) => [
      `### ${group.level} Level`,
      '',
      ...group.courses.map(
        (c) =>
          `- [${c.code} — ${c.title}](${SITE_URL}/courses/${c.slug}): ` +
          `${units(c.units)}, ${semester(c.semester)}.` +
          (c.description ? ` ${c.description.replace(/\s+/g, ' ').trim()}` : ''),
      ),
      '',
    ]),
  ].join('\n');

  const tools = [
    '## Guides and tools',
    '',
    `- [Install Java, Python and C](${SITE_URL}/install): JDK 17 + Apache NetBeans for the COS 211`,
    '  and COS 221 labs, Anaconda + JupyterLab for Python, GCC via MSYS2 for C.',
    '- AI Tutor: answers scoped to a student\'s year, department and course outline (account only).',
    '- Code Explainer: line-by-line plain-English walkthroughs of Java, Python, C and C++ listings.',
    '- Study Planner: weekly timetables exported to .ics or synced to Google Calendar.',
    `- [Privacy policy](${SITE_URL}/privacy) · [Terms](${SITE_URL}/terms)`,
    '',
  ].join('\n');

  // The full corpus. Everything a signed-out visitor can already read, in one
  // fetch, so an engine answering "what is on the CYB 224 syllabus" does not
  // have to crawl 95 HTML files to find out.
  const full = [
    header,
    ...groups.flatMap((group) => [
      `## ${group.level} Level`,
      '',
      ...group.courses.flatMap((c) => {
        const lines = [
          `### ${c.code} — ${c.title}`,
          '',
          `- URL: ${SITE_URL}/courses/${c.slug}`,
          `- ${units(c.units)} · ${c.level} Level · ${semester(c.semester)}`,
          '',
        ];
        if (c.description) lines.push(c.description.replace(/\s+/g, ' ').trim(), '');
        if (c.topics?.length) {
          lines.push('**Outline**', '', ...c.topics.map((t, i) => `${i + 1}. ${t}`), '');
        }
        if (c.textbooks?.length) {
          lines.push(
            '**Recommended textbooks**',
            '',
            ...c.textbooks.map((b) => `- ${b.title}${b.authors ? ` — ${b.authors}` : ''}`),
            '',
          );
        }
        if (c.studyTips?.length) {
          lines.push('**How to pass**', '', ...c.studyTips.map((t) => `- ${t}`), '');
        }
        return lines;
      }),
    ]),
  ].join('\n');

  return {
    'llms.txt': `${header}${index}\n${tools}`,
    'llms-full.txt': full,
  };
}
