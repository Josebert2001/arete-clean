import { renderToStaticMarkup } from 'react-dom/server';
import CoursePreview from '../components/CoursePreview';
import CourseIndexPreview from '../components/CourseIndexPreview';
import {
  loadPublicCourses,
  groupByLevel,
  courseTitle,
  courseDescription,
  courseJsonLd,
  courseBreadcrumbJsonLd,
  indexTitle,
  indexDescription,
  SITE_URL,
  INSTITUTION,
} from '../data/publicCatalogue';

// Build-time only. `vite build --config vite.ssr.config.js` compiles this to
// dist-ssr/entry-server.js, which scripts/prerender.mjs then imports from plain
// Node to write one static HTML file per public page.
//
// renderToStaticMarkup, not renderToString: nothing here is hydrated. main.jsx
// calls createRoot().render(), which discards whatever is already in #root and
// renders fresh, so React never compares the two trees and the data-reactroot
// markers renderToString adds would be dead weight on 112 files.

// Every page that gets its own static file. Ordered so the index comes first —
// it is the hub that links the rest.
export async function collectPages() {
  const entries = await loadPublicCourses();
  const pages = [];

  pages.push({
    path: '/courses',
    title: indexTitle(),
    description: indexDescription(entries.length),
    canonical: `${SITE_URL}/courses`,
    changefreq: 'weekly',
    priority: '0.9',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${INSTITUTION} course outlines`,
        url: `${SITE_URL}/courses`,
        hasPart: entries.map(({ course }) => ({
          '@type': 'Course',
          name: `${course.code} — ${course.title}`,
          url: `${SITE_URL}/courses/${course.slug}`,
        })),
      },
    ],
    html: renderToStaticMarkup(<CourseIndexPreview groups={groupByLevel(entries)} />),
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
      changefreq: 'monthly',
      priority: '0.8',
      jsonLd: [courseJsonLd(course, department), courseBreadcrumbJsonLd(course)],
      html: renderToStaticMarkup(
        <CoursePreview course={course} department={department} siblings={siblings} />
      ),
    });
  }

  return pages;
}
