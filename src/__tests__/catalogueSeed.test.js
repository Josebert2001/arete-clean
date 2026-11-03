import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { courses as cybersecurityCourses } from '../data/courses.js';
import { courses as dataScienceCourses } from '../data/dataScienceCourses.js';
import { catalogueRows, generateCatalogueSeed } from '../../scripts/gen-catalogue-seed.mjs';

describe('catalogue seed generator', () => {
  it('escapes apostrophes, preserves Unicode, and sorts deterministically', () => {
    const sources = [{ department: 'cybersecurity', courses: [
      { level: 200, code: 'CYB 224', title: "Areté's — course" },
      { level: 100, code: 'CYB 111', title: 'First course' },
    ] }];
    const reversed = [{ ...sources[0], courses: [...sources[0].courses].reverse() }];
    const sql = generateCatalogueSeed(sources);
    expect(sql).toBe(generateCatalogueSeed(reversed));
    expect(sql).toContain("'Areté''s — course'");
    expect(sql.indexOf("'CYB 111'")).toBeLessThan(sql.indexOf("'CYB 224'"));
    expect(sql).toContain('ON CONFLICT (department, level, course_code)');
    expect(sql).toContain('DO UPDATE SET course_title = EXCLUDED.course_title');
    expect(sql).toContain('DELETE FROM public.catalogue_courses');
  });

  it('includes every course with its own department and database level', () => {
    const rows = catalogueRows();
    const expected = [
      ...cybersecurityCourses.map(course => ({ department: 'cybersecurity', course })),
      ...dataScienceCourses.map(course => ({ department: 'dataScience', course })),
    ];
    const uniqueKeys = new Set(expected.map(({ department, course }) =>
      `${department}|${course.level}L|${course.code}`));
    expect(rows).toHaveLength(uniqueKeys.size);
    expect(new Set(rows.map(row => `${row.department}|${row.level}|${row.course_code}`)).size)
      .toBe(uniqueKeys.size);
    for (const { department, course } of expected) {
      const row = rows.find(row => row.department === department &&
        row.level === `${course.level}L` && row.course_code === course.code);
      expect(row).toBeDefined();
      const first = expected.find(entry => entry.department === department &&
        entry.course.level === course.level && entry.course.code === course.code);
      expect(row.course_title).toBe(first.course.title);
    }
  });

  it('keeps the committed seed identical to the generator output', async () => {
    const committed = await readFile(resolve('supabase/seed/catalogue_courses.sql'), 'utf8');
    expect(committed).toBe(generateCatalogueSeed());
  });

  it('checks seed drift during prebuild validation', async () => {
    const validator = await readFile(resolve('scripts/validate-modules.mjs'), 'utf8');
    expect(validator).toMatch(/committedSeed === generateCatalogueSeed\(\)/);
    expect(validator).toContain('run npm run gen:catalogue-seed');
  });
});

describe('offering course-code migration', () => {
  it('checks rep inserts against the catalogue and replaces the supplied title', async () => {
    const sql = await readFile(resolve('supabase/migrations/20261102040000_offering_course_codes.sql'), 'utf8');
    const trigger = sql.split('CREATE OR REPLACE FUNCTION normalize_offering_course_code_trigger()')[1]
      .split('DROP TRIGGER IF EXISTS normalize_offering_course_code')[0];
    expect(trigger).toMatch(/IF TG_OP = 'INSERT' AND auth\.uid\(\) IS NOT NULL AND NOT is_admin\(\) THEN/);
    expect(trigger).toMatch(/FROM public\.catalogue_courses\s+WHERE department = NEW\.department\s+AND level = NEW\.level\s+AND course_code = NEW\.course_code/);
    expect(trigger).toMatch(/IF NOT FOUND THEN\s+RAISE EXCEPTION 'That course is not in your class catalogue\. Ask the admin to add it\.';/);
    expect(trigger).toMatch(/NEW\.course_title := v_catalogue_title;/);
    expect(sql).toMatch(/BEFORE INSERT OR UPDATE OF course_code ON course_offerings/);
    expect(sql).toMatch(/REVOKE ALL ON TABLE public\.catalogue_courses FROM PUBLIC, anon, authenticated;/);
    expect(sql).toMatch(/GRANT SELECT ON TABLE public\.catalogue_courses TO authenticated;/);
    expect(sql).toMatch(/CREATE TABLE IF NOT EXISTS public\.catalogue_courses/);
    expect(sql).toMatch(/PRIMARY KEY \(department, level, course_code\)/);
    expect(sql).toMatch(/ALTER TABLE public\.catalogue_courses ENABLE ROW LEVEL SECURITY/);
  });
});
