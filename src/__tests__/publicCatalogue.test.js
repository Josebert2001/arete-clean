import { describe, it, expect, beforeAll } from 'vitest';
import {
  loadPublicCourses,
  resolvePublicCourse,
  groupByLevel,
  courseTitle,
  courseDescription,
  courseJsonLd,
  courseBreadcrumbJsonLd,
  indexTitle,
  indexDescription,
  courseUrl,
  SITE_URL,
} from '../data/publicCatalogue';

// These are the pages scripts/prerender.mjs turns into static HTML, so a
// regression here does not show up as a broken screen — it shows up weeks
// later as a course that Google never indexed, or 95 pages sharing a title.

let entries;

beforeAll(async () => {
  entries = await loadPublicCourses();
});

describe('the public course set', () => {
  it('covers both authored catalogues', () => {
    expect(entries.length).toBeGreaterThan(90);
  });

  it('has one entry per slug', () => {
    // A duplicate slug means two courses claiming one URL: the prerenderer
    // would write one file over the other and the loser vanishes from the site.
    const slugs = entries.map((e) => e.course.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every course a title, a slug and a level', () => {
    for (const { course } of entries) {
      expect(course.slug, `${course.code} slug`).toMatch(/^[a-z0-9-]+$/);
      expect(course.title, `${course.code} title`).toBeTruthy();
      expect([100, 200, 300, 400]).toContain(course.level);
    }
  });

  it('resolves a Data Science-only slug, which the default catalogue lacks', async () => {
    // The whole reason resolvePublicCourse walks every catalogue rather than
    // going through useCatalogue: a signed-out visitor has no department.
    const dsOnly = entries.find((e) => e.department.slug === 'dataScience');
    expect(dsOnly).toBeTruthy();
    const found = await resolvePublicCourse(dsOnly.course.slug);
    expect(found?.course.code).toBe(dsOnly.course.code);
  });

  it('returns null for an unknown slug instead of throwing', async () => {
    expect(await resolvePublicCourse('not-a-course')).toBeNull();
  });
});

describe('page metadata', () => {
  it('gives every course a distinct title carrying its course code', () => {
    const titles = entries.map((e) => courseTitle(e.course));
    expect(new Set(titles).size).toBe(titles.length);
    for (const { course } of entries) {
      expect(courseTitle(course)).toContain(course.code);
    }
  });

  it('keeps descriptions within the length a search result will hold', () => {
    for (const { course } of entries) {
      const desc = courseDescription(course);
      expect(desc.length, `${course.code}`).toBeGreaterThan(40);
      expect(desc.length, `${course.code}`).toBeLessThanOrEqual(300);
      expect(desc).toContain(course.code);
    }
  });

  it('builds canonical URLs under the site origin', () => {
    expect(courseUrl('cyb-224')).toBe(`${SITE_URL}/courses/cyb-224`);
  });

  it('describes the index page with the real course count', () => {
    expect(indexTitle()).toContain('University of Uyo');
    expect(indexDescription(entries.length)).toContain(String(entries.length));
  });
});

describe('structured data', () => {
  it('emits the fields Google requires on a Course', () => {
    // Drop hasCourseInstance and Google discards the whole block silently.
    for (const { course, department } of entries) {
      const ld = courseJsonLd(course, department);
      expect(ld['@type']).toBe('Course');
      expect(ld.name).toContain(course.code);
      expect(ld.description, `${course.code} description`).toBeTruthy();
      expect(ld.provider?.name).toBe('University of Uyo');
      expect(ld.hasCourseInstance?.courseMode).toBe('online');
      expect(ld.hasCourseInstance?.courseWorkload).toMatch(/^PT\d+H$/);
      expect(ld.url).toBe(courseUrl(course.slug));
    }
  });

  it('numbers breadcrumb positions from one, in order', () => {
    const ld = courseBreadcrumbJsonLd(entries[0].course);
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2, 3, 4]);
    expect(ld.itemListElement.at(-1).item).toBe(courseUrl(entries[0].course.slug));
  });
});

describe('groupByLevel', () => {
  it('places every course in exactly one level group', () => {
    const groups = groupByLevel(entries);
    const total = groups.reduce((n, g) => n + g.courses.length, 0);
    expect(total).toBe(entries.length);
  });

  it('orders each group by semester then course code', () => {
    for (const group of groupByLevel(entries)) {
      const keys = group.courses.map((c) => `${c.semester}-${c.code}`);
      expect(keys).toEqual([...keys].sort());
    }
  });
});
