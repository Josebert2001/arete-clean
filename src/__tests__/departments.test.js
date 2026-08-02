import { describe, it, expect } from 'vitest';
import {
  departments, getDepartment, DEFAULT_DEPARTMENT, SELECTABLE_DEPARTMENTS, YEAR_LEVELS,
  materialsDepartmentFor,
} from '../data/departments';
import { getCrossDepartmentalCourses, LEVELS as CATALOGUE_LEVELS } from '../data/courses';

describe('department registry', () => {
  it('defaults to cybersecurity', () => {
    expect(DEFAULT_DEPARTMENT).toBe('cybersecurity');
  });

  it('falls back to the default department for an unknown or missing slug', () => {
    expect(getDepartment('nonexistent')).toBe(departments.cybersecurity);
    expect(getDepartment(undefined)).toBe(departments.cybersecurity);
  });

  it('only lists full departments as selectable at signup', () => {
    expect(SELECTABLE_DEPARTMENTS.length).toBeGreaterThan(0);
    expect(SELECTABLE_DEPARTMENTS.every(d => d.status === 'full')).toBe(true);
    expect(SELECTABLE_DEPARTMENTS.some(d => d.slug === 'general')).toBe(false);
  });
});

describe('YEAR_LEVELS — the lightweight copy of the level list', () => {
  // Pages that only need to validate or render a level import YEAR_LEVELS
  // instead of courses.js, whose LEVELS export drags the ~800 kB catalogue
  // along with it. That saving is only safe while the two agree.
  it('is identical to the catalogue\'s own LEVELS', () => {
    expect(YEAR_LEVELS).toEqual(CATALOGUE_LEVELS);
  });
});

describe('cybersecurity catalogue', () => {
  it('resolves the full course list', async () => {
    const catalogue = await departments.cybersecurity.loadCatalogue();
    expect(catalogue.LEVELS).toEqual([100, 200, 300, 400]);
    expect(catalogue.courses.length).toBeGreaterThan(50);
    expect(catalogue.getCourseBySlug('gst-111')).toBeTruthy();
  });
});

describe('data science catalogue', () => {
  it('resolves its own standalone course list', async () => {
    const catalogue = await departments.dataScience.loadCatalogue();
    expect(catalogue.LEVELS).toEqual([100, 200, 300, 400]);
    expect(catalogue.courses.length).toBeGreaterThan(50);
    expect(catalogue.getCourseBySlug('dts-226')).toBeTruthy();
  });

  it('does not leak Cybersecurity-only courses', async () => {
    const [dts, cyb] = await Promise.all([
      departments.dataScience.loadCatalogue(),
      departments.cybersecurity.loadCatalogue(),
    ]);
    const cybOnly = cyb.courses.find(c => !c.crossDepartmental);
    expect(dts.getCourseBySlug(cybOnly.slug)).toBeUndefined();
  });

  // Lecture notes are the one layer shared between catalogues (see the header
  // comment in departments.js) — re-authoring the course prose per department
  // must not cost Data Science students the transcribed workbook content.
  it('carries the shared lecture notes for courses that have them', async () => {
    const catalogue = await departments.dataScience.loadCatalogue();
    expect(catalogue.getCourseBySlug('mth-121').lectureNotes?.length).toBeGreaterThan(0);
    expect(catalogue.getCourseBySlug('gst-121').lectureNotes?.length).toBeGreaterThan(0);
  });

  it('is offered at signup alongside Cybersecurity', () => {
    expect(SELECTABLE_DEPARTMENTS.map(d => d.slug)).toContain('dataScience');
  });
});

describe('general (foundation) catalogue', () => {
  it('resolves to exactly the cross-departmental courses', async () => {
    const catalogue = await departments.general.loadCatalogue();
    const expected = getCrossDepartmentalCourses().map(c => c.slug).sort();
    expect(catalogue.courses.map(c => c.slug).sort()).toEqual(expected);
  });

  it('excludes courses that are not flagged cross-departmental', async () => {
    const [general, cyb] = await Promise.all([
      departments.general.loadCatalogue(),
      departments.cybersecurity.loadCatalogue(),
    ]);
    const cybOnly = cyb.courses.find(c => !c.crossDepartmental);
    expect(cybOnly).toBeTruthy();
    expect(general.getCourseBySlug(cybOnly.slug)).toBeUndefined();
  });

  it('computes levelMeta totalUnits from the filtered courses only, not the full catalogue', async () => {
    const catalogue = await departments.general.loadCatalogue();
    const level100Units = catalogue.courses
      .filter(c => c.level === 100)
      .reduce((s, c) => s + c.units, 0);
    expect(catalogue.levelMeta[100].totalUnits).toBe(level100Units);
  });

  it('getCoursesByLevelAndSemester only returns courses from the resolved catalogue', async () => {
    const catalogue = await departments.general.loadCatalogue();
    const sem1 = catalogue.getCoursesByLevelAndSemester(100, 1);
    expect(sem1.every(c => c.crossDepartmental)).toBe(true);
  });

  // Foundation mode is a filtered view of the Cybersecurity catalogue, so it
  // used to inherit that catalogue's levelMeta wholesale — including "Third
  // Year (incl. SIWES)", which is wrong for a student whose own programme's
  // SIWES isn't in Areté at all.
  it('uses neutral level descriptions, not the Cybersecurity ones', async () => {
    const [general, cyb] = await Promise.all([
      departments.general.loadCatalogue(),
      departments.cybersecurity.loadCatalogue(),
    ]);
    expect(cyb.levelMeta[300].description).toMatch(/SIWES/);
    expect(general.levelMeta[300].description).toBe('Third Year');
    for (const level of general.LEVELS) {
      expect(general.levelMeta[level].description).not.toMatch(/SIWES/);
    }
  });

  // The shared 300L second semester is empty (every 300L2 course in the
  // Cybersecurity catalogue is SIWES, which is department-specific), so the
  // Course Hub must not render a SIWES section for foundation students.
  it('has no SIWES courses at all', async () => {
    const catalogue = await departments.general.loadCatalogue();
    expect(catalogue.courses.some(c => c.subject === 'siwes')).toBe(false);
    expect(catalogue.getCoursesByLevelAndSemester(300, 2)).toEqual([]);
  });
});

describe('materialsDepartmentFor — which uploads pool a course belongs to', () => {
  it('pools shared courses under general, whichever department is asking', () => {
    const shared = { crossDepartmental: true };
    expect(materialsDepartmentFor(shared, 'cybersecurity')).toBe('general');
    expect(materialsDepartmentFor(shared, 'dataScience')).toBe('general');
    expect(materialsDepartmentFor(shared, 'general')).toBe('general');
  });

  it('scopes specialist courses to the catalogue that owns them', () => {
    expect(materialsDepartmentFor({ crossDepartmental: false }, 'dataScience')).toBe('dataScience');
    expect(materialsDepartmentFor({}, 'cybersecurity')).toBe('cybersecurity');
  });

  it('falls back to the default department for a missing slug', () => {
    expect(materialsDepartmentFor({}, undefined)).toBe(DEFAULT_DEPARTMENT);
  });
});
