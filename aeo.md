# AEO (Answer Engine Optimization) Comprehensive Audit & Strategy Guide
**Project:** Areté — Academic Companion for B.Sc. Cybersecurity & Science Programmes  
**Domain:** [https://www.aretecyb.tech](https://www.aretecyb.tech)  
**Institution:** University of Uyo, Akwa Ibom, Nigeria  
**Audit Date:** September 2026  

---

## 1. Executive Summary & Overview

### What is AEO?
**Answer Engine Optimization (AEO)** is the practice of structuring content, metadata, entity authority, and technical infrastructure so AI answer engines (**ChatGPT Search**, **Perplexity AI**, **Google AI Overviews / Gemini**, **Claude**, and **Microsoft Copilot**) discover, understand, and cite your site as the primary, authoritative answer to user queries.

While traditional SEO focuses on ranking blue links on Search Engine Results Pages (SERPs), **AEO focuses on synthetic answer inclusion and direct source citation**.

### Overall AEO Scorecard

| Dimension | Rating | Current Status |
| :--- | :---: | :--- |
| **1. AI Crawler Accessibility & Rendering** | **🟡 6.0 / 10** | Course slugs are prerendered, but the **Homepage (`/`) and `/install` serve empty `<div id="root"></div>` shells** to raw HTTP crawlers. Modern AI bots lack explicit rules in `robots.txt`. |
| **2. Machine Ingestion (`llms.txt`)** | **🔴 0.0 / 10** | **No `/llms.txt` or `/llms-full.txt` exists.** AI agents cannot cleanly ingest the curriculum manifest in pure markdown. |
| **3. Structured Data & Entity Graph** | **🟡 6.5 / 10** | Has valid `Course`, `BreadcrumbList`, and `EducationalOrganization` schemas. **Lacks `FAQPage`, `DefinedTermSet`, and `sameAs` entity links to Wikipedia/Wikidata.** |
| **4. Direct Answerability & Content Layout** | **🟡 5.5 / 10** | High-quality outlines and textbooks, but lacks direct "Question $\rightarrow$ Concise Answer" snippets and query-optimized headings. |
| **5. Walled Garden Paradox & E-E-A-T** | **🔴 4.0 / 10** | **1.5MB+ of proprietary lecture notes, exam prep, and CTF writeups are 100% auth-gated and invisible to AI bots.** |

**Overall AEO Maturity Score:** **5.4 / 10 (Solid Foundation, Substantial Untapped Growth)**

---

## 2. Current Architecture & Strengths

1. **Build-Time Prerendering Pipeline (`scripts/prerender.mjs` & `src/prerender/entry-server.jsx`)**:
   - Prerenders static HTML for `/courses` and individual course pages (`/courses/:slug`).
   - Injects canonical links, dynamic meta descriptions, and page-specific titles.
   - Solves the classic client-side SPA crawlability issue for core course pages.

2. **Valid Schema.org Rich Results**:
   - Course pages contain Google-compliant `Course` JSON-LD with `courseCode`, `hasCourseInstance`, `educationalLevel`, and `provider` (`CollegeOrUniversity`).
   - Proper `BreadcrumbList` markup aiding hierarchical understanding.

3. **Semantic HTML Structure (`CoursePreview.jsx`)**:
   - Clean use of `<nav aria-label="Breadcrumb">`, `<header>`, `<section>`, `<ol>`, and `<ul>`.
   - Distinct sections for course outlines, textbooks, and study tips (`How to pass {course.code}`).

---

## 3. Detailed Audit Findings (The 5 Pillars)

### Pillar 1: AI Crawler Accessibility & Rendering
* **The "Prerender Gap" on Landing Pages:**
  In `scripts/prerender.mjs`, `collectPages()` only produces entries for `/courses` and `/courses/:slug`. The `STATIC_PAGES` array (`/`, `/install`, `/privacy`, `/terms`) is added to `sitemap.xml`, but **never baked into `dist/` HTML files**.
  * **Consequence:** AI scrapers like `GPTBot`, `PerplexityBot`, and `ClaudeBot` (which avoid running heavy client-side JavaScript) only receive an empty `<div id="root"></div>` shell when visiting the root or the install guide.
* **`robots.txt` AI Directives:**
  `public/robots.txt` uses a blanket `User-agent: *` with disallow rules for gated routes. It does not explicitly recognize or grant crawler permissions for verified AI search bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`).

### Pillar 2: Machine Ingestion & `llms.txt`
* **Lack of Markdown Manifest:**
  Modern answer engines rely on `/llms.txt` (the Answer.AI / LLM manifest standard) to quickly discover and understand documentation, API catalogs, and course directories.
* **Current State:** No `public/llms.txt` or `public/llms-full.txt` exists, leaving AI models to infer site structure from incomplete HTML crawls.

### Pillar 3: Semantic Knowledge Graph & Schema.org
* **Missing `FAQPage` Schema:**
  AI answer engines prioritize Question/Answer nodes to construct direct answers. The site has no structured Q&A data.
* **Weak Entity Disambiguation (`sameAs`):**
  The `EducationalOrganization` entity identifies "Areté" and "University of Uyo", but lacks `sameAs` links to authoritative entity databases (UniUyo Wikipedia, Wikidata Q1529944, official portal).
* **Missing Creator / Author Entity (E-E-A-T):**
  The site references "JRsolvy" in meta tags, but lacks a structured `Person` or `author` schema with credentials and institutional affiliation.

### Pillar 4: Direct Answerability & Content Layout
* **No "Inverted Pyramid" Definitional Lead:**
  Course pages lead with general descriptions rather than extractable definition snippets.
  * *Sub-optimal:* Generic introductory sentence followed by auth-gate prompt.
  * *Optimal for AEO:* A direct 1–2 sentence factual summary: *"CYB 224 (Information Security Architecture) is a 3-unit, 200-level course offered in the Second Semester at the University of Uyo focusing on access control, security models, and defense-in-depth."*
* **Topic Lists vs. Semantic Headings:**
  Course outlines are listed as `<ol><li>{topic}</li></ol>`. Conversational answer engines prefer query-focused subheadings or expandable Q&A items.

### Pillar 5: The "Walled Garden" Paradox
* **100% Gating of Core Differentiating Knowledge:**
  Areté contains over **1.5MB of handcrafted academic notes** in `src/data/lectureNotes/` (`ent221.js`, `cyb221.js`, `cos221.js`, exam prep, CTF challenges).
* **The AEO Impact:** Because all study routes sit behind `RequireAuth` and redirect to `/signin`, AI models cannot read or reference these materials when answering detailed student inquiries.

---

## 4. Prioritized Action Plan & Roadmap

```
+-------------------------------------------------------------------------+
|                              AEO ROADMAP                                |
|                                                                         |
|  [P0: Immediate Quick Wins]                                             |
|  - Add public/llms.txt                                                  |
|  - Prerender / and /install in prerender.mjs                            |
|  - Update robots.txt with explicit AI crawler permissions               |
|                                                                         |
|  [P1: Knowledge Graph & Structured Data]                                |
|  - Generate FAQPage JSON-LD schema for all course pages                 |
|  - Enrich index.html schema with sameAs Wikipedia/Wikidata links        |
|  - Add Author / Person schema for E-E-A-T credibility                   |
|                                                                         |
|  [P2: Content & Freemium Ingestion Strategy]                            |
|  - Add FAQ accordion to CoursePreview.jsx                               |
|  - Publicly expose "Topic 1" or concept glossaries for each course      |
|  - Establish backlinks/citations from institutional domains             |
+-------------------------------------------------------------------------+
```

---

## 5. Technical Implementation Details & Code Snippets

### P0.1: Add `public/llms.txt`

Create `public/llms.txt`:

```markdown
# Areté — Academic Companion for University of Uyo

> ἀρετή (ar-eh-TAY) · Academic aid and curriculum companion for B.Sc. Cybersecurity and Science undergraduates at the University of Uyo, Akwa Ibom State, Nigeria.

- Website: https://www.aretecyb.tech
- Institution: University of Uyo (https://www.uniuyo.edu.ng/)
- Audience: 100L – 400L Undergraduates in Cybersecurity, Computer Science, and Data Science

## Core Curricula & Course Directory
Areté provides syllabi, textbooks, study tips, and lecture outlines for 57 university courses across 4 years:

- Course Hub: https://www.aretecyb.tech/courses
- 100 Level: Mathematics, physics, statistics, and computing foundations (COS 121, MTH 111, MTH 121, PHY 111, PHY 121).
- 200 Level: Core systems, Java programming, computer architecture, discrete mathematics (COS 211, COS 221, CYB 221, CYB 224).
- 300 Level: Specialist cybersecurity, operating systems, digital forensics, SIWES industrial training.
- 400 Level: Cryptography, software security, research methodology, final projects.

## Interactive Learning Tracks
- Java Track (COS 211 / COS 221): 13 modules covering OOP, collections, threading, GUI, and mini-projects.
- Python Track (COS 121): 12 modules covering syntax, data structures, algorithms, and libraries.
- C Track: 12 modules covering memory management, pointers, structs, and systems programming.
- Hands-on Security / CTF Track: 12 capture-the-flag challenge rooms covering CIA triad, cryptography, SQL injection, Linux CLI, digital forensics, and network defense.

## Academic Tools & Features
- AI Curriculum Tutor: Conversational assistant calibrated to the student's year and course outline.
- Code Explainer: Plain-English explanations for Java, Python, C, and C++ snippets.
- Study Planner: Generates weekly study schedules and exports .ics calendars anchored to Africa/Lagos time.
- Install Guides: Step-by-step setup guides for JDK 17, NetBeans, Python, and C compilers (https://www.aretecyb.tech/install).
```

---

### P0.2: Update `public/robots.txt`

Explicitly allow reputable AI crawlers:

```robots.txt
# AI Search and Answer Engine Bots
User-agent: GPTBot
Allow: /
Allow: /courses/
Allow: /install
Disallow: /api/
Disallow: /signin

User-agent: PerplexityBot
Allow: /
Allow: /courses/
Allow: /install
Disallow: /api/
Disallow: /signin

User-agent: ClaudeBot
Allow: /
Allow: /courses/
Allow: /install
Disallow: /api/
Disallow: /signin

User-agent: Applebot-Extended
Allow: /
Allow: /courses/
Allow: /install

# Default crawler rules
User-agent: *
Allow: /
Disallow: /api/
Disallow: /signin
Disallow: /setup-profile
Disallow: /welcome
Disallow: /profile
Disallow: /tutor
Disallow: /explainer
Disallow: /planner
Disallow: /review
Disallow: /lab

Sitemap: https://www.aretecyb.tech/sitemap.xml
```

---

### P0.3: Prerender `/` and `/install` in `scripts/prerender.mjs`

Ensure `scripts/prerender.mjs` generates real static HTML for `/` and `/install`:

```javascript
// In src/prerender/entry-server.jsx
import Home from '../pages/Home';
import Install from '../pages/Install';

export async function collectPages() {
  const entries = await loadPublicCourses();
  const pages = [];

  // Prerender Homepage
  pages.push({
    path: '/',
    title: 'Areté — Academic Companion · University of Uyo',
    description: 'Academic companion for University of Uyo students — course outlines, textbooks, interactive Java, Python & C tracks, and an AI tutor.',
    canonical: `${SITE_URL}/`,
    changefreq: 'weekly',
    priority: '1.0',
    jsonLd: [], // default site-level jsonLd is in index.html
    html: renderToStaticMarkup(<HomeStaticPreview />),
  });

  // Prerender Install Guide
  pages.push({
    path: '/install',
    title: 'Install Guides — JDK, NetBeans, Python & C · Areté',
    description: 'Step-by-step installation guides for Java JDK 17, NetBeans, Python, and C development environments for University of Uyo students.',
    canonical: `${SITE_URL}/install`,
    changefreq: 'monthly',
    priority: '0.7',
    jsonLd: [installGuideJsonLd()],
    html: renderToStaticMarkup(<InstallStaticPreview />),
  });

  // Course Hub and Course Pages
  // ... existing course mapping ...
  return pages;
}
```

---

### P1.1: Add `FAQPage` JSON-LD to Course Pages

In `src/data/publicCatalogue.js`:

```javascript
export function courseFaqJsonLd(course) {
  const questions = [
    {
      q: `What is ${course.code} (${course.title}) at the University of Uyo?`,
      a: `${course.code} is a ${course.units}-unit course offered in the ${course.semester === 1 ? 'First' : 'Second'} Semester for ${course.level} Level students at the University of Uyo.${course.description ? ' ' + course.description : ''}`
    }
  ];

  if (course.topics?.length) {
    questions.push({
      q: `What topics are taught in ${course.code}?`,
      a: `Key topics in ${course.code} include: ${course.topics.slice(0, 6).join(', ')}.`
    });
  }

  if (course.textbooks?.length) {
    questions.push({
      q: `What are the recommended textbooks for ${course.code}?`,
      a: `Recommended reading includes: ${course.textbooks.map(b => b.title + (b.authors ? ' by ' + b.authors : '')).join('; ')}.`
    });
  }

  if (course.studyTips?.length) {
    questions.push({
      q: `How do I pass ${course.code}?`,
      a: course.studyTips.join(' ')
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}
```

Include `courseFaqJsonLd(course)` in `src/prerender/entry-server.jsx` under `jsonLd: [...]`.

---

### P1.2: Enrich `index.html` Structured Data

Update the `EducationalOrganization` schema in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Areté",
  "alternateName": ["Arete UniUyo", "Areté Cybersecurity"],
  "url": "https://www.aretecyb.tech/",
  "logo": "https://www.aretecyb.tech/icon-512.png",
  "description": "Academic companion for University of Uyo students — course outlines, transcribed lecture notes, past-paper practice, interactive Java, Python and C tracks, and an AI tutor that knows the curriculum.",
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "University of Uyo",
    "sameAs": [
      "https://en.wikipedia.org/wiki/University_of_Uyo",
      "https://www.wikidata.org/wiki/Q1529944",
      "https://www.uniuyo.edu.ng/"
    ]
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Akwa Ibom State, Nigeria"
  },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "University of Uyo undergraduates"
  }
}
```

---

### P2: Public Excerpt ("Freemium") Strategy for Lecture Notes

To unlock the massive value currently hidden inside `src/data/lectureNotes/`:
1. **Public Preview of Topic 1:**
   Allow signed-out visitors and crawlers to read **Topic 1** of every lecture note file on `/courses/:slug`.
2. **Concept Glossary Extraction:**
   Extract key term definitions (e.g. *CIA Triad*, *Access Control Matrices*, *Public Key Infrastructure*) into a public "Key Concepts" block with Schema.org `DefinedTermSet`.
3. **Conversion Call-to-Action:**
   Place the sign-in prompt after Topic 1: *"Sign in (free, no password) to read Topics 2–8, take quizzes, and chat with the AI tutor."*
   * **Result:** AI engines index and cite Areté for academic definitions while user acquisition and engagement remain preserved.

---

## 6. Testing & Validation Checklist

1. **Schema Validation:**
   - Test URLs with the [Google Rich Results Test](https://search.google.com/test/rich-results).
   - Validate JSON-LD syntax on the [Schema.org Validator](https://validator.schema.org/).
2. **AI Crawler Testing:**
   - Fetch pages using non-JavaScript tools (`curl -A "GPTBot/1.0" https://www.aretecyb.tech/courses/cyb-224`) to verify that the raw HTML payload contains the full text.
3. **Synthetic Answer Engine Queries (Monitor Monthly):**
   - Query ChatGPT, Perplexity, and Gemini:
     - *"What courses are offered in 200L Cybersecurity at University of Uyo?"*
     - *"What is the syllabus for CYB 224 at UniUyo?"*
     - *"What textbooks are required for COS 211 UniUyo?"*
    - Measure citation frequency and direct links back to `https://www.aretecyb.tech/courses/:slug`.

---

## 7. Independent Verification — Muse Spark Audit (2026-09-08)

Scope: `src/data/publicCatalogue.js`, `src/components/CoursePreview.jsx`, `src/components/CourseIndexPreview.jsx`, `src/pages/CoursePublic.jsx`, `src/prerender/entry-server.jsx`, `scripts/prerender.mjs`, `index.html`, `public/robots.txt`, `vercel.json`, `src/utils/usePageTitle.js`, live course data (`courses.js` 57 courses + `dataScienceCourses.js` 55 courses = 95 unique slugs), `src/__tests__/publicCatalogue.test.js`, `public/sitemap.xml`.

This section confirms the audit above where verified, and adds gaps it did not cover. Nothing above was edited.

### Confirmed
- Prerender pipeline, canonical discipline, distinct front-loaded titles (`courseTitle()`), and Course + BreadcrumbList + CollectionPage JSON-LD are all as described and correct.
- No FAQPage / Q&A-shaped content anywhere — agreed this is the highest-lift gap.
- Descriptions are metadata-first (`"${code} (${units} units, ${level} Level) at the University..."` in `publicCatalogue.js:101`) rather than answer-first — agreed.
- Course data quality is high: 0 courses missing `description`/`topics`/`studyTips`/`textbooks` across the Cybersecurity catalogue; average description ~248 chars.

### New findings (not covered above)
1. **Related-link anchor text is code-only** (`CoursePreview.jsx:137-144` renders just `CYB 101` with the full title only in the `title` attribute). Answer engines and screen readers weight visible link text — render the title in text, not just the tooltip.
2. **Breadcrumb uses a query URL** (`publicCatalogue.js:167` and `CoursePreview.jsx:52` link to `/courses?level=${level}`). The no-JS fetch that answer engines do receives the unfiltered hub HTML, so the crumb promises a filtered view the bytes do not contain. Link to `/courses` (optionally with a level anchor) instead.
3. **Description truncation can cut mid-word** (`publicCatalogue.js:106`, `.slice(0, 300)` with no word-boundary or sentence-boundary guard). Truncated mid-word answers quote badly.
4. **Course pages inherit `og:type=website`** from the `index.html` shell — `prerender.mjs:83-92` rewrites url/title/description but never `og:type`, so all 95 course pages carry the homepage's type instead of `article`.
5. **Shared-slug framing loss is confirmed and quantified.** ENT 221 (and the other cross-catalogue slugs) carry materially different `description`/`topics`/`studyTips` per department, but `loadPublicCourses()` dedupes by slug keeping the Cybersecurity wording — the Data Science framing is invisible to engines. Accepted canonical tradeoff, but worth knowing the second wording exists and is unindexed.
6. **Content-coverage context for P2 planning:** only 10 note files (`cos121, cos221, cyb121, cyb122, cyb123, cyb221, ent221, gst121, mth121, phy128` — 111 topics total) cover ~10/95 public courses, so a "Topic 1 public preview" strategy initially applies to roughly a tenth of the catalogue. Separately, `CLAUDE.md` says two question banks exist but the data now carries ~8 quiz sets and ~7 examPrep banks — update the doc before planning P2 excerpt work off it.
7. **Freshness signals absent (extends §3 Pillar 1):** no `lastmod` in either `dist` or `public/sitemap.xml`, no `datePublished`/`dateModified` on Course JSON-LD. Even a build-date `lastmod` is better than none for answer-engine recency weighting.

---

## 8. Implementation Status (2026-09-08)

P0, P1 and every §7 finding are **implemented** on branch `feat/aeo-p0-p1`. P2 (the freemium lecture-note excerpt) is **deferred** — it changes what is gated, which is a product decision, not a technical one.

| Item | Status | Where it landed |
| :--- | :---: | :--- |
| P0.1 `llms.txt` | ✅ | `collectLlmsTxt()` in `src/prerender/entry-server.jsx` — **generated**, not the hand-written draft in §5. Also emits `llms-full.txt` (151 kB): the whole public corpus — outline, textbooks and study tips for all 95 courses — in one fetch. |
| P0.2 `robots.txt` AI directives | ✅ | `public/robots.txt`. **Not as drafted in §5** — see the correction below. |
| P0.3 Prerender `/` and `/install` | ✅ | `HomePreview.jsx`, `InstallPreview.jsx`, `installGuides.js`. `/` went from 0 → 3,671 chars of no-JS text, `/install` 0 → 6,744. |
| P1.1 `FAQPage` JSON-LD | ✅ | `courseFaqs()` + `faqJsonLd()` in `publicCatalogue.js`, **rendered visibly** by `CoursePreview`/`HomePreview` — hidden FAQ markup is a Google violation. Site-level FAQ on `/`. |
| P1.2 Enriched entity graph | ✅ | `index.html` — `EducationalOrganization`, a `CollegeOrUniversity` node with `sameAs`, a `Person` author node for E-E-A-T, all cross-linked by `@id`. |
| Pillar 4 definitional lead | ✅ | `courseSummary()` — the inverted-pyramid sentence now opens every course page and its first FAQ answer. |
| §7.1 related-link anchor text | ✅ | `CoursePreview.jsx` — title is visible link text, not a `title=""` tooltip. |
| §7.2 breadcrumb query URL | ✅ | Now `/courses#level-200`, with matching `id`s in `CourseIndexPreview`. |
| §7.3 mid-word truncation | ✅ | `clip()` in `publicCatalogue.js` — prefers a sentence end, falls back to a word boundary. |
| §7.4 `og:type` inheritance | ✅ | `page.ogType` in `prerender.mjs`; course pages and `/install` are `article`. |
| §7.7 freshness signals | ✅ | `<lastmod>` on every sitemap URL + `dateModified` on Course JSON-LD, both from one `buildDate`. |
| P2 freemium excerpt | ⏸ Deferred | Product decision. Note §7.6 still applies: only 10 note files cover ~10 of 95 courses. |

### Correction to §5: the `robots.txt` snippet in this document is unsafe

The drafted per-bot groups grant more than they appear to. **robots.txt has no inheritance**: the moment a named `User-agent: GPTBot` group matches, the `User-agent: *` group stops applying to that bot entirely. The §5 draft repeats only `Disallow: /api/` and `Disallow: /signin` under each bot, so it would have handed `GPTBot`, `PerplexityBot` and `ClaudeBot` the whole gated surface — `/tutor`, `/profile`, `/planner`, `/review`, `/lab`, `/setup-profile`, `/welcome`.

The shipped file lists every agent as extra `User-agent:` tokens on a **single** group, so the named bots match those exact rules. `aeo.test.js` asserts there is only one group.

### Correction to §3 Pillar 3: the Wikidata ID

This document cites **Q1529944** for the University of Uyo. That is a different entity. The correct ID is **Q7896523** ("university in Akwa Ibom State, Nigeria"), verified against the Wikidata search API. A `sameAs` pointing at the wrong entity validates cleanly and teaches every engine a wrong fact, so this one is worth checking rather than copying.

### Also corrected while implementing

- §5's `llms.txt` draft claims "57 university courses" and lists 100L/200L courses that are Cybersecurity-specific. The real public set is **95 slugs across two catalogues**. Generating the manifest removes the whole class of error.
- §5's `courseFaqJsonLd` draft emits JSON-LD with no corresponding visible content, which Google penalises. The shipped version renders the same array.
