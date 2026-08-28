// The publicly readable slice of the catalogue — the single source of truth for
// "what a logged-out visitor and Googlebot can see".
//
// Two very different callers share it on purpose:
//   * the browser, when CourseDetail resolves a slug for a signed-out visitor;
//   * scripts/prerender.mjs at build time, which renders one static HTML file
//     per course so a crawler gets real syllabus text instead of an empty
//     <div id="root">.
// If those two disagreed about which courses are public, or about a page's
// title and canonical URL, the indexed page and the live page would drift.
//
// Only `status: 'full'` departments are listed. Foundation mode is a filtered
// view of courses.js, so every one of its courses is already covered by the
// Cybersecurity catalogue and listing it again would publish duplicates of the
// same slug under the same URL.

import { departments, DEFAULT_DEPARTMENT, YEAR_LEVELS } from './departments';
import { noteTopicCount } from './lectureNotes/index.js';

export const SITE_URL = 'https://www.aretecyb.tech';
export const SITE_NAME = 'Areté';
export const INSTITUTION = 'University of Uyo';

// Order matters: the first department carrying a slug owns its public page.
// The shared foundation courses (GST/MTH/PHY/…) appear in both authored
// catalogues, and one URL can only have one canonical page — so Cybersecurity,
// the older and more fully annotated catalogue, wins the tie.
const PUBLIC_DEPARTMENT_SLUGS = [DEFAULT_DEPARTMENT, 'dataScience'];

let cached = null;

// Every course with a public page, deduped by slug, each tagged with the
// department whose catalogue it was taken from. Loads both catalogue chunks —
// fine at build time, and on the client this only ever runs for a signed-out
// visitor who has opened a course page directly.
export async function loadPublicCourses() {
  if (cached) return cached;
  const seen = new Set();
  const out = [];
  for (const slug of PUBLIC_DEPARTMENT_SLUGS) {
    const department = departments[slug];
    if (!department || department.status !== 'full') continue;
    const catalogue = await department.loadCatalogue();
    for (const course of catalogue.courses) {
      if (seen.has(course.slug)) continue;
      seen.add(course.slug);
      out.push({ course, department });
    }
  }
  cached = out;
  return out;
}

// The public entry for one slug, or null. Deliberately searches every authored
// catalogue rather than the default one: a Data Science-only course (DTS 101)
// has a public page too, and resolving it through useCatalogue would 404 for
// anyone who is not signed in as a Data Science student.
export async function resolvePublicCourse(slug) {
  const all = await loadPublicCourses();
  return all.find((entry) => entry.course.slug === slug) || null;
}

// The public index, grouped by year. Lives here rather than in the page so the
// prerendered /courses and the client-rendered one list the same courses in the
// same order — and so the SSR bundle need not pull react-router in to get it.
export function groupByLevel(entries) {
  return YEAR_LEVELS.map((level) => ({
    level,
    courses: entries
      .filter((e) => e.course.level === level)
      .map((e) => e.course)
      .sort((a, b) => (a.semester - b.semester) || a.code.localeCompare(b.code)),
  })).filter((g) => g.courses.length > 0);
}

// What a student gets once they sign in, computed from the course data itself
// so a newly authored note file or question bank shows up with no extra
// authoring. Drives both the preview page's "what's inside" list and the
// meta description, which is why it returns text rather than booleans.
export function courseOfferings(course) {
  const out = [];
  const topics = noteTopicCount(course);
  if (topics > 0) out.push(`${topics} lecture-note ${topics === 1 ? 'topic' : 'topics'}`);
  if (course?.quiz?.length) out.push(`${course.quiz.length} practice questions`);
  if (course?.examPrep?.length) out.push(`${course.examPrep.length} past-paper questions`);
  if (course?.textbooks?.length) out.push(`${course.textbooks.length} recommended textbooks`);
  return out;
}

const SEMESTERS = { 1: 'First Semester', 2: 'Second Semester' };

// `<title>` for a course page. Front-loaded with the course code because that
// is what students actually type into Google ("cyb 224 uniuyo"), and kept near
// 60 characters so it survives the search-result truncation.
export function courseTitle(course) {
  return `${course.code} — ${course.title} · ${INSTITUTION}`;
}

export function courseDescription(course) {
  const offerings = courseOfferings(course);
  const lead = `${course.code} (${course.units} units, ${course.level} Level) at the ${INSTITUTION}.`;
  const detail = offerings.length
    ? ` Course outline, ${offerings.slice(0, 3).join(', ')}.`
    : ` Full course outline, recommended textbooks and study tips.`;
  const body = course.description ? ` ${course.description}` : '';
  return `${lead}${detail}${body}`.replace(/\s+/g, ' ').trim().slice(0, 300);
}

export function courseUrl(slug) {
  return `${SITE_URL}/courses/${slug}`;
}

// The index page's own head text. Here, not in either caller, for the same
// reason as the course versions above: scripts/prerender.mjs writes it into
// the served bytes and CoursePublic re-applies it after a client-side
// navigation, and a crawl that sees one title and a render that sees another
// is exactly the drift this module exists to prevent.
export function indexTitle() {
  return `${INSTITUTION} course outlines · ${SITE_NAME}`;
}

export function indexDescription(count) {
  return (
    `Outlines, recommended textbooks and study tips for all ${count} ${INSTITUTION} courses ` +
    `on ${SITE_NAME} — Cybersecurity, Data Science and the shared GST, MTH, PHY, STA and COS courses.`
  );
}

// schema.org Course. `hasCourseInstance` is not decoration — Google's Course
// rich result requires it, and drops the whole block without it.
export function courseJsonLd(course, department) {
  const weeklyHours = Math.round(((course.lh || 0) + (course.ph || 0)) / 15) || 1;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.code} — ${course.title}`,
    description: course.description || courseDescription(course),
    courseCode: course.code,
    url: courseUrl(course.slug),
    inLanguage: 'en',
    educationalLevel: `${course.level} Level`,
    teaches: course.topics || undefined,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: INSTITUTION,
      sameAs: 'https://www.uniuyo.edu.ng/',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: department?.degree || undefined,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${weeklyHours}H`,
      name: SEMESTERS[course.semester] || undefined,
    },
  };
}

export function courseBreadcrumbJsonLd(course) {
  const crumbs = [
    { name: 'Areté', item: `${SITE_URL}/` },
    { name: 'Courses', item: `${SITE_URL}/courses` },
    { name: `${course.level} Level`, item: `${SITE_URL}/courses?level=${course.level}` },
    { name: course.code, item: courseUrl(course.slug) },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}
