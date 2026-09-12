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
import {
  SITE_URL,
  SITE_NAME,
  INSTITUTION,
  INSTITUTION_SHORT,
  homeTitle,
  homeDescription,
} from './siteMeta';
import { clip } from '../utils/text.js';

// Re-exported so every existing caller keeps importing them from here. They are
// defined in siteMeta.js, a leaf module, so usePageTitle can read the home
// title without pulling this file's registries in — see the note there.
export { SITE_URL, SITE_NAME, INSTITUTION, INSTITUTION_SHORT, homeTitle, homeDescription };

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

// Google truncates a displayed title at roughly this many characters. Nothing
// is lost for ranking past it — the whole tag is still read — but the suffix
// stops being *shown*, and here the suffix is the institution, i.e. the word
// that tells a student scanning results that this page is about their school.
const TITLE_DISPLAY_CHARS = 65;

// `<title>` for a course page. Front-loaded with the course code because that
// is what students actually type into Google ("cyb 224 uniuyo").
//
// 36 of the 95 course titles run past the display limit with the institution
// spelled out. Swapping in the short form rescues 21 of them; the other 15 are
// long because the course's own name is long ("Business Intelligence in Small
// and Medium-Scale Enterprises"), and that is the course's name — it is not
// ours to abbreviate. Truncating a real title to fit a pixel budget would
// trade a fact for a cosmetic win.
export function courseTitle(course) {
  const full = `${course.code} — ${course.title} · ${INSTITUTION}`;
  if (full.length <= TITLE_DISPLAY_CHARS) return full;
  return `${course.code} — ${course.title} · ${INSTITUTION_SHORT}`;
}

// Who actually takes this course.
//
// 22 of the 95 public pages are foundation courses that EVERY University of Uyo
// programme takes — GST 111, MTH 111, COS 111, STA 111, ENT 221 — and they are
// also the highest-volume searches ("gst 111 uniuyo"). They were labelled with
// the degree of whichever catalogue happened to win the slug dedupe, which told
// a Microbiology student, and every answer engine, that a page about
// Communication in English was for Cybersecurity students. Areté is for the
// whole university; these pages are the widest door into it and must not close
// it on the reader in their first line.
// "across programmes", not "by every programme": the flag covers alternatives
// as well as universals — Cybersecurity takes GST 212/312 where Data Science
// takes GST 211/311 — so a blanket "every programme takes this" would be a
// falsifiable claim on some of these pages. The point stands either way: the
// course belongs to the university, not to one department.
export function courseAudience(course, department) {
  if (course?.crossDepartmental) {
    return `Foundation course — taken across ${INSTITUTION} programmes, not one department`;
  }
  if (course?.sharedMaterials) {
    return `Shared across ${INSTITUTION} programmes`;
  }
  return department?.degree ? `${department.degree}, ${INSTITUTION}` : INSTITUTION;
}

// The same fact, phrased for schema.org's `audience`.
function courseAudienceType(course, department) {
  if (course?.crossDepartmental || course?.sharedMaterials) {
    return `${INSTITUTION} undergraduates, all programmes`;
  }
  return department?.degree
    ? `${department.degree} undergraduates at the ${INSTITUTION}`
    : `${INSTITUTION} undergraduates`;
}

// The one-sentence factual answer to "what is this course", assembled from the
// fields rather than prose. Answer engines extract a definition and cite the
// page it came from; a page that opens with a sign-in pitch gives them nothing
// to lift, so this sentence leads both the visible page and the first FAQ.
export function courseSummary(course) {
  const semester = SEMESTERS[course.semester];
  const parts = [
    `${course.code} (${course.title}) is a ${course.units}-unit,`,
    `${course.level} Level course`,
    semester ? `taught in the ${semester}` : null,
    `at the ${INSTITUTION}, Akwa Ibom State, Nigeria.`,
  ].filter(Boolean);
  const base = parts.join(' ');
  // Said in the extractable sentence, not only in a badge further down: this
  // is the fact that decides whether a student from another department reads
  // on, and it is the one an engine quotes.
  if (course?.crossDepartmental) {
    return `${base} It is a foundation course taken by undergraduates across the university's programmes, not one department's course.`;
  }
  return base;
}

export function courseDescription(course) {
  const offerings = courseOfferings(course);
  const lead = `${course.code} (${course.units} units, ${course.level} Level) at the ${INSTITUTION}.`;
  const detail = offerings.length
    ? ` Course outline, ${offerings.slice(0, 3).join(', ')}.`
    : ` Full course outline, recommended textbooks and study tips.`;
  const body = course.description ? ` ${course.description}` : '';
  return clip(`${lead}${detail}${body}`.replace(/\s+/g, ' ').trim(), 300);
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
    `Outlines, recommended textbooks and study tips for all ${count} ${INSTITUTION} courses on ` +
    `${SITE_NAME} — including the GST, MTH, PHY, STA, COS, CSC, ENT and INS foundation courses ` +
    `taken across the university's undergraduate programmes, plus the full Cybersecurity and ` +
    `Data Science catalogues.`
  );
}

// ─── Head text for the two other prerendered pages ──────────────────────────
// Same reason these live here as the course versions: scripts/prerender.mjs
// writes them into the bytes and the page re-applies them after a client-side
// navigation. Two copies of the string is how they drift.

export function installTitle() {
  return `Install Java, Python & C — setup guides · ${SITE_NAME}`;
}

export function installDescription() {
  return (
    `Step-by-step setup guides for ${INSTITUTION} students: JDK 17 and Apache NetBeans for the ` +
    `COS 211/221 Java labs, Anaconda and JupyterLab for Python, and GCC via MSYS2 for C — with ` +
    `verification steps and the errors that actually come up.`
  );
}

export function aboutTitle() {
  return `About Areté — who builds it and where the material comes from`;
}

export function aboutDescription() {
  return (
    `Areté is an independent study companion for ${INSTITUTION} students, built by Josebert and ` +
    `Barry of the Cybersecurity department. Not affiliated with the university. How the course ` +
    `outlines, transcribed lecture notes and question banks are sourced, and what is free.`
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
// Answer engines build a reply out of Question/Answer pairs before they build
// one out of prose, and Google requires an FAQPage block's content to be
// visible on the page — so these are rendered by CoursePreview/HomePreview and
// serialised into JSON-LD from the same array. One source, never two.

export function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// Every answer here is derived from catalogue fields, so a newly authored note
// file or textbook list shows up with no extra writing — and nothing can claim
// something the course data does not actually say.
export function courseFaqs(course) {
  const items = [
    {
      q: `What is ${course.code} at the ${INSTITUTION}?`,
      a: course.description ? `${courseSummary(course)} ${course.description}` : courseSummary(course),
    },
  ];

  // Second, because for a foundation course it is the question that decides
  // whether the reader is in the right place at all.
  if (course.crossDepartmental) {
    items.push({
      q: `Which programmes take ${course.code}?`,
      a:
        `${course.code} is a foundation course taken by undergraduates across ${INSTITUTION} ` +
        `programmes — it belongs to the university, not to one department. Whatever your ` +
        `department, Areté covers it with the same outline, textbooks and study tips.`,
    });
  } else if (course.sharedMaterials) {
    items.push({
      q: `Which programmes take ${course.code}?`,
      a:
        `${course.code} is taken by more than one ${INSTITUTION} programme, and the notes ` +
        `uploaded for it are shared between them.`,
    });
  }

  if (course.topics?.length) {
    items.push({
      q: `What topics are covered in ${course.code}?`,
      a:
        `The ${course.code} outline covers ${course.topics.length} topics: ` +
        `${course.topics.join('; ')}.`,
    });
  }

  if (course.textbooks?.length) {
    items.push({
      q: `What textbooks are recommended for ${course.code}?`,
      a:
        `Recommended reading for ${course.code}: ` +
        course.textbooks
          .map((b) => (b.authors ? `${b.title} by ${b.authors}` : b.title))
          .join('; ') +
        '.',
    });
  }

  if (course.studyTips?.length) {
    items.push({
      q: `How do I pass ${course.code}?`,
      a: course.studyTips.join(' '),
    });
  }

  const offerings = courseOfferings(course);
  if (offerings.length) {
    items.push({
      q: `Where can I find ${course.code} lecture notes and past questions?`,
      a:
        `Areté (${courseUrl(course.slug)}) carries ${offerings.join(', ')} for ${course.code}, ` +
        `plus an AI tutor that has read the outline. It is free for ${INSTITUTION} students — ` +
        `sign in with your email, no password.`,
    });
  }

  return items;
}

export function courseFaqJsonLd(course) {
  return faqJsonLd(courseFaqs(course));
}

// The site-level questions, for the home page. Deliberately the questions a
// student actually asks a chatbot — "is there a site with UniUyo course notes",
// "is it free" — rather than the ones a brochure answers.
export const SITE_FAQS = [
  {
    q: 'What is Areté?',
    a:
      `Areté is a free web app for ${INSTITUTION} undergraduates in Akwa Ibom State, Nigeria — ` +
      `for students in every department, not one. It carries the outline, recommended textbooks ` +
      `and study tips for the foundation courses taken across the university's programmes and ` +
      `for the full Cybersecurity and Data Science catalogues, 100 Level to Final Year, with ` +
      `transcribed lecture notes and past-paper practice for a growing set of those courses, ` +
      `interactive Java, Python and C tracks, a hands-on capture-the-flag security track, and an ` +
      `AI tutor that has read the curriculum.`,
  },
  {
    q: `Which ${INSTITUTION} departments does Areté cover?`,
    a:
      `All of them, at the foundation level. The GST, MTH, PHY, STA, COS, CSC, ENT and INS ` +
      `courses that undergraduate programmes across the university pass through are on Areté ` +
      `for every student, whatever their department — with the same outlines, textbooks, ` +
      `lecture notes and practice as anyone else. On top of that, ` +
      `Cybersecurity and Data Science have their full departmental catalogues authored. If your ` +
      `department is not one of those two, you sign up in foundation mode, keep all four ` +
      `programming tracks, and tell Areté your department — that is the signal used to decide ` +
      `which catalogue is written next, and your progress carries over when it is.`,
  },
  {
    q: `Is Areté only for Cybersecurity students?`,
    a:
      `No. Areté is built for the whole ${INSTITUTION}. Its two fully authored catalogues are ` +
      `Cybersecurity and Data Science, but the foundation courses taken across programmes — ` +
      `Communication in English (GST 111), Elementary Mathematics (MTH 111/121), General ` +
      `Physics (PHY 111/121), Descriptive Statistics (STA 111), Entrepreneurship (ENT 221) and ` +
      `the rest — are covered for students in every department, and the Java, Python, C and ` +
      `security tracks are open to everyone.`,
  },
  // Asked verbatim by students, and the single most useful thing an answer
  // engine can be told about Areté: what it is NOT. An engine with no
  // disambiguation either guesses — and "unofficial study site" guessed wrong
  // as "the university's LMS" is a claim Areté has no right to — or declines to
  // mention it at all. Saying it plainly is both the honest answer and the one
  // that gets quoted.
  {
    q: `Is Areté the official ${INSTITUTION} learning platform?`,
    a:
      `No. Areté is an independent study companion built by ${INSTITUTION} students, and is not ` +
      `affiliated with or endorsed by the university. The university runs its own official ` +
      `systems for registration, results and lecturer-delivered course material; Areté sits ` +
      `beside them with course outlines, transcribed lecture notes, past-paper practice and an ` +
      `AI tutor. Use both — they answer different questions.`,
  },
  {
    q: 'Who built Areté, and where do the notes come from?',
    a:
      `Areté is built by Josebert (software and hardware) and Barry (academic), students in the ` +
      `Cybersecurity department at the ${INSTITUTION}. Course outlines, units and semesters ` +
      `follow the university's own curriculum; the lecture notes are transcribed from lecturers' ` +
      `workbooks and handouts rather than paraphrased, and where a handout conflicts with the ` +
      `standard definition the notes teach the standard one and name the conflict. More at ` +
      `${SITE_URL}/about.`,
  },
  {
    q: 'Is Areté free?',
    a:
      `Yes. Areté is free for ${INSTITUTION} students. Sign in with your university or personal ` +
      `email — a one-time code is sent to you, there is no password and no payment.`,
  },
  {
    q: 'Do I need an account to read a course outline?',
    a:
      `No. Every course outline, its recommended textbooks and its study tips are public at ` +
      `${SITE_URL}/courses. An account is only needed for the lecture notes, the question banks, ` +
      `the AI tutor and progress tracking.`,
  },
  {
    q: 'What programming languages does Areté teach?',
    a:
      `Java (13 modules, matching the COS 211 and COS 221 NetBeans labs), Python (12 modules), ` +
      `and C (12 modules) — each with theory, annotated code, an in-browser playground, quizzes ` +
      `and a mini project. A twelve-room security track teaches capture-the-flag skills: the CIA ` +
      `triad, cryptography, SQL injection, the Linux command line, digital forensics and network ` +
      `defence.`,
  },
];

export function siteFaqJsonLd() {
  return faqJsonLd(SITE_FAQS);
}

// ─── Structured data ────────────────────────────────────────────────────────

// schema.org Course. `hasCourseInstance` is not decoration — Google's Course
// rich result requires it, and drops the whole block without it.
//
// `dateModified` is passed in rather than read from a clock: it is the build
// stamp, supplied by scripts/prerender.mjs so that every page in one deploy
// agrees with that deploy's sitemap `lastmod`. Omitted on the client, where
// there is no build to date.
export function courseJsonLd(course, department, { dateModified } = {}) {
  const weeklyHours = Math.round(((course.lh || 0) + (course.ph || 0)) / 15) || 1;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.code} — ${course.title}`,
    description: course.description || courseDescription(course),
    abstract: courseSummary(course),
    courseCode: course.code,
    url: courseUrl(course.slug),
    inLanguage: 'en',
    educationalLevel: `${course.level} Level`,
    teaches: course.topics || undefined,
    numberOfCredits: course.units || undefined,
    dateModified: dateModified || undefined,
    isAccessibleForFree: true,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: INSTITUTION,
      // Q7896523 is the university itself — checked against the Wikidata search
      // API, not inferred. A sameAs pointing at the wrong entity does not fail
      // validation; it just teaches every engine the wrong fact.
      sameAs: [
        'https://www.uniuyo.edu.ng/',
        'https://en.wikipedia.org/wiki/University_of_Uyo',
        'https://www.wikidata.org/wiki/Q7896523',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    // Only a course that really belongs to one degree names it. A foundation
    // course claiming `about: "B.Sc. Cybersecurity"` is the machine-readable
    // form of the same mislabel — see courseAudience().
    about:
      course.crossDepartmental || course.sharedMaterials ? undefined : department?.degree || undefined,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: courseAudienceType(course, department),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${weeklyHours}H`,
      name: SEMESTERS[course.semester] || undefined,
    },
  };
}

// The level crumb points at an anchor on /courses, not at /courses?level=200.
// The query form promises a filtered view, and the no-JS fetch an answer engine
// makes returns the unfiltered hub — the crumb described bytes that were never
// sent. CourseIndexPreview gives each level section a matching id.
export function courseBreadcrumbJsonLd(course) {
  const crumbs = [
    { name: 'Areté', item: `${SITE_URL}/` },
    { name: 'Courses', item: `${SITE_URL}/courses` },
    { name: `${course.level} Level`, item: `${SITE_URL}/courses#level-${course.level}` },
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
