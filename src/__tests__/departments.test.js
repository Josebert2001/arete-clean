import { describe, it, expect } from 'vitest';
import { departments, getDepartment, DEFAULT_DEPARTMENT, SELECTABLE_DEPARTMENTS, YEAR_LEVELS } from '../data/departments';
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
});
