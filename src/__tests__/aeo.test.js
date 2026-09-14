import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  loadPublicCourses,
  courseSummary,
  courseAudience,
  courseFaqs,
  courseFaqJsonLd,
  siteFaqJsonLd,
  courseJsonLd,
  courseBreadcrumbJsonLd,
  courseDescription,
  homeTitle,
  homeDescription,
  installTitle,
  installDescription,
  SITE_FAQS,
  SITE_URL,
} from '../data/publicCatalogue';
import { tracks, installHowToJsonLd } from '../data/installGuides';

// The answer-engine surface. None of this shows up as a broken screen when it
// regresses — it shows up as a course that stops being cited, or as Google
// dropping a rich result because an FAQPage claimed text the page never
// rendered. Nothing here asserts style; everything asserts a contract some
// external consumer relies on.

let entries;

beforeAll(async () => {
  entries = await loadPublicCourses();
});

describe('the definitional lead', () => {
  it('opens every course with the facts an engine can lift', () => {
    for (const { course } of entries) {
      const summary = courseSummary(course);
      expect(summary, course.code).toContain(course.code);
      expect(summary, course.code).toContain(course.title);
      expect(summary, course.code).toContain(`${course.units}-unit`);
      expect(summary, course.code).toContain(`${course.level} Level`);
      expect(summary, course.code).toContain('University of Uyo');
    }
  });
});

describe('whole-university framing', () => {
  // Areté serves every University of Uyo department. 29 of the 95 public pages
  // are foundation courses taken across programmes, and they were labelled with
  // whichever degree won the slug dedupe — so GST 111, Communication in
  // English, announced itself as a B.Sc. Cybersecurity page. Those are also the
  // highest-volume searches, i.e. the widest door into the site, and the
  // mislabel closed it on everyone outside two departments.
  //
  // The wording is "across programmes", never "every programme takes it": the
  // flag covers alternatives too (Cybersecurity takes GST 212/312 where Data
  // Science takes GST 211/311), so the stronger claim would be false on some
  // of these pages.
  const foundation = () => entries.filter((e) => e.course.crossDepartmental);

  it('has foundation courses to talk about', () => {
    expect(foundation().length).toBeGreaterThanOrEqual(20);
  });

  it('never names one degree on a course taken across programmes', () => {
    for (const { course, department } of foundation()) {
      const audience = courseAudience(course, department);
      expect(audience, course.code).not.toMatch(/B\.Sc\./);
      expect(audience, course.code).toMatch(/across University of Uyo programmes, not one department/);
    }
  });

  it('still names the degree on a course that really belongs to one', () => {
    const owned = entries.find(
      (e) => !e.course.crossDepartmental && !e.course.sharedMaterials && e.department?.degree
    );
    expect(courseAudience(owned.course, owned.department)).toContain(owned.department.degree);
  });

  it('drops the degree from JSON-LD `about` on a foundation course', () => {
    for (const { course, department } of foundation()) {
      const ld = courseJsonLd(course, department);
      expect(ld.about, course.code).toBeUndefined();
      expect(ld.audience.audienceType, course.code).toMatch(/all programmes/);
    }
  });

  it('says so in the extractable summary sentence, not only in a badge', () => {
    for (const { course } of foundation()) {
      expect(courseSummary(course), course.code).toMatch(/foundation course/i);
    }
  });

  it('never overclaims that literally every programme takes it', () => {
    // GST 211 and GST 212 are alternatives. "Every programme takes GST 211" is
    // checkable and wrong, and a falsifiable claim in an FAQ answer is worse
    // than a vaguer true one.
    for (const { course, department } of foundation()) {
      const text = [
        courseAudience(course, department),
        courseSummary(course),
        ...courseFaqs(course).map((f) => f.a),
      ].join(' ');
      expect(text, course.code).not.toMatch(/every (undergraduate )?programme (at|in) the/i);
      expect(text, course.code).not.toMatch(/every programme takes/i);
    }
  });

  it('answers "which programmes take this" on every foundation course', () => {
    for (const { course } of foundation()) {
      const q = courseFaqs(course).find((f) => /which programmes/i.test(f.q));
      expect(q, course.code).toBeTruthy();
      expect(q.a, course.code).toMatch(/across University of Uyo programmes/);
    }
  });

  it('tells a student from any other department the site is for them too', () => {
    const answers = SITE_FAQS.map((f) => f.a).join(' ');
    expect(answers).toMatch(/every department|all of them|whatever their department/i);
    // The one question a student who found aretecyb.tech actually asks.
    expect(SITE_FAQS.some((f) => /only for cybersecurity/i.test(f.q))).toBe(true);
  });
});

describe('descriptions', () => {
  it('never truncates mid-word', () => {
    // The failure this guards: a 300-char slice landing inside "mechanisms"
    // and an engine quoting "...access control mecha" back at a student.
    for (const { course } of entries) {
      const desc = courseDescription(course);
      expect(desc.length, course.code).toBeLessThanOrEqual(300);
      if (desc.endsWith('…')) {
        // An ellipsis is only allowed where a whole word ended before it.
        expect(desc.slice(0, -1), course.code).toMatch(/[\w)\].,;:'"]$/);
      }
    }
  });
});

describe('FAQ', () => {
  it('gives every course at least a what-is and a how-to-pass answer', () => {
    for (const { course } of entries) {
      const faqs = courseFaqs(course);
      expect(faqs.length, course.code).toBeGreaterThanOrEqual(2);
      for (const { q, a } of faqs) {
        expect(q, course.code).toMatch(/\?$/);
        expect(a.length, `${course.code} — ${q}`).toBeGreaterThan(20);
      }
    }
  });

  it('asks about the course by its code, so the question matches the query', () => {
    for (const { course } of entries) {
      expect(courseFaqs(course)[0].q).toContain(course.code);
    }
  });

  it('serialises to a valid FAQPage with one Question per visible pair', () => {
    const { course } = entries[0];
    const ld = courseFaqJsonLd(course);
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity).toHaveLength(courseFaqs(course).length);
    for (const node of ld.mainEntity) {
      expect(node['@type']).toBe('Question');
      expect(node.acceptedAnswer['@type']).toBe('Answer');
      expect(node.acceptedAnswer.text).toBeTruthy();
    }
  });

  it('builds the site FAQ from the same array the home page renders', () => {
    // Google treats an FAQPage whose answers are not on the page as a
    // violation, so the JSON-LD must be a projection of SITE_FAQS, not a
    // second hand-written list.
    const ld = siteFaqJsonLd();
    expect(ld.mainEntity.map((n) => n.name)).toEqual(SITE_FAQS.map((f) => f.q));
  });
});

describe('structured data', () => {
  it('links the provider to the verified University of Uyo entity', () => {
    const { course, department } = entries[0];
    const ld = courseJsonLd(course, department);
    // Q7896523, not the Q1529944 an earlier audit asserted. A sameAs pointing
    // at the wrong entity validates cleanly and teaches engines a wrong fact.
    expect(ld.provider.sameAs).toContain('https://www.wikidata.org/wiki/Q7896523');
    expect(ld.provider.sameAs).toContain('https://en.wikipedia.org/wiki/University_of_Uyo');
  });

  it('carries dateModified only when the build supplies one', () => {
    const { course, department } = entries[0];
    expect(courseJsonLd(course, department).dateModified).toBeUndefined();
    expect(
      courseJsonLd(course, department, { dateModified: '2026-09-08T00:00:00.000Z' }).dateModified
    ).toBe('2026-09-08T00:00:00.000Z');
  });

  it('points the level breadcrumb at a fragment the hub actually contains', () => {
    // /courses?level=200 promised a filtered page that the static hub HTML
    // never contains. CourseIndexPreview renders id="level-200".
    for (const { course } of entries.slice(0, 12)) {
      const crumb = courseBreadcrumbJsonLd(course).itemListElement[2];
      expect(crumb.item).toBe(`${SITE_URL}/courses#level-${course.level}`);
    }
  });
});

describe('install guides', () => {
  it('emits a HowTo per track with every step numbered from one', () => {
    expect(tracks).toHaveLength(3);
    for (const track of tracks) {
      const ld = installHowToJsonLd(track, SITE_URL);
      expect(ld['@type']).toBe('HowTo');
      expect(ld.name).toBe(track.title);
      expect(ld.step.map((s) => s.position)).toEqual(track.steps.map((_, i) => i + 1));
      for (const step of ld.step) {
        // The fragment must resolve in InstallPreview's markup, which numbers
        // its <li> ids the same way.
        expect(step.url).toMatch(new RegExp(`/install#${track.key}-step-\\d+$`));
        expect(step.itemListElement.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('head text for the prerendered pages', () => {
  it('keeps titles and descriptions within search-result length', () => {
    for (const [title, desc] of [
      [homeTitle(), homeDescription()],
      [installTitle(), installDescription()],
    ]) {
      expect(title.length).toBeLessThanOrEqual(75);
      expect(desc.length).toBeGreaterThan(80);
      expect(desc.length).toBeLessThanOrEqual(320);
    }
  });

  it('names the institution on the home page, which is what students search', () => {
    expect(homeTitle()).toContain('University of Uyo');
    expect(homeDescription()).toContain('University of Uyo');
  });
});

describe('robots.txt', () => {
  const robots = readFileSync(path.resolve('public/robots.txt'), 'utf8');

  // Comments and blank lines are ignored by every conforming parser (RFC 9309
  // §2.2), so a group is a run of User-agent lines plus the rules that follow
  // it — not a blank-line-delimited block.
  const lines = robots
    .split('\n')
    .map((l) => l.replace(/#.*$/, '').trim())
    .filter(Boolean);
  const isAgent = (l) => l.toLowerCase().startsWith('user-agent:');
  const agents = lines.filter(isAgent).map((l) => l.slice(l.indexOf(':') + 1).trim());
  const groupStarts = lines.filter((l, i) => isAgent(l) && (i === 0 || !isAgent(lines[i - 1])));

  it('names the answer-engine crawlers', () => {
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      expect(agents).toContain(bot);
    }
    expect(agents).toContain('*');
  });

  it('keeps every agent in one group, so none escapes the gated-route rules', () => {
    // robots.txt has no inheritance: the moment a named group matches an
    // agent, the * group stops applying to it. A second group here — however
    // well-meant — is how GPTBot silently acquires /tutor and /profile.
    expect(groupStarts).toHaveLength(1);
    for (const gated of ['/api/', '/signin', '/profile', '/tutor', '/lab']) {
      expect(lines).toContain(`Disallow: ${gated}`);
    }
  });

  it('still points at the sitemap', () => {
    expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
