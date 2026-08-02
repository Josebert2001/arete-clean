import { describe, it, expect } from 'vitest';
import {
  departments, getDepartment, DEFAULT_DEPARTMENT, SELECTABLE_DEPARTMENTS, YEAR_LEVELS,
  materialsDepartmentFor, findDepartmentByName,
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

  it('pools a course another department also takes, without making it a foundation course', () => {
    const shared = { sharedMaterials: true };
    expect(materialsDepartmentFor(shared, 'cybersecurity')).toBe('general');
    expect(materialsDepartmentFor(shared, 'dataScience')).toBe('general');
  });
});

// Tells a foundation student their catalogue has arrived. The false-positive
// direction is the dangerous one — pointing a Computer Science student at the
// Data Science curriculum is worse than saying nothing — so the near-miss cases
// matter more than the matches.
describe('findDepartmentByName — has the student\'s typed department been authored?', () => {
  it('matches however the student capitalised or spaced it', () => {
    for (const typed of ['Data Science', 'data science', 'DATA SCIENCE', '  Data  Science  ', 'data-science']) {
      expect(findDepartmentByName(typed)?.slug).toBe('dataScience');
    }
  });

  it('sees through the wrappers students actually type', () => {
    for (const typed of ['Department of Data Science', 'B.Sc. Data Science', 'BSc Data Science', 'Data Science Programme']) {
      expect(findDepartmentByName(typed)?.slug).toBe('dataScience');
    }
    expect(findDepartmentByName('Department of Cybersecurity')?.slug).toBe('cybersecurity');
  });

  it('does NOT match a different department that merely reads alike', () => {
    for (const typed of ['Computer Science', 'Data Management', 'Science', 'Statistics', 'Computer Engineering']) {
      expect(findDepartmentByName(typed)).toBeNull();
    }
  });

  it('returns null for nothing at all, so a blank field offers no switch', () => {
    for (const typed of ['', '   ', null, undefined]) {
      expect(findDepartmentByName(typed)).toBeNull();
    }
  });

  it('never resolves to foundation mode, which is not a department to switch to', () => {
    expect(findDepartmentByName('Other departments')).toBeNull();
    expect(findDepartmentByName('general')).toBeNull();
  });
});

// The bug this guards against: CYB 211 was crossDepartmental in the Data Science
// catalogue but not in the Cybersecurity one, so the same course resolved to
// 'general' for one department and 'cybersecurity' for the other — each saw an
// empty materials list for notes the other had uploaded, with nothing to explain
// why. Assert the invariant over the real catalogues rather than one course, so
// authoring department #3 cannot reintroduce it.
describe('materials pooling agrees across every catalogue carrying the same course', () => {
  const normalize = (code) => String(code).toUpperCase().replace(/[^A-Z0-9]/g, '');

  it('resolves one pool per course code, whichever catalogue it is read from', async () => {
    const loaded = await Promise.all(
      Object.entries(departments).map(async ([slug, dept]) => [slug, await dept.loadCatalogue()])
    );

    const poolsByCode = new Map();
    for (const [slug, catalogue] of loaded) {
      for (const course of catalogue.courses) {
        const code = normalize(course.code);
        if (!poolsByCode.has(code)) poolsByCode.set(code, new Map());
        poolsByCode.get(code).set(slug, materialsDepartmentFor(course, slug));
      }
    }

    const disagreements = [];
    for (const [code, byDepartment] of poolsByCode) {
      const pools = new Set(byDepartment.values());
      if (pools.size > 1) {
        disagreements.push(
          `${code}: ${[...byDepartment].map(([d, p]) => `${d}→${p}`).join(', ')}`
        );
      }
    }

    expect(disagreements).toEqual([]);
  });
});

// Lecture notes are the one layer shared between catalogues (see the header
// comment in departments.js): the prose is re-authored per department, but the
// transcribed workbook content must not be. COS 121 and ENT 221 were authored
// inline in courses.js rather than in lectureNotes/, so Data Science students
// silently got no notes for either. Assert both-or-neither over every shared
// course instead of naming individual ones, which is what let that slip through.
describe('shared courses carry the same lecture notes in every catalogue', () => {
  const normalize = (code) => String(code).toUpperCase().replace(/[^A-Z0-9]/g, '');

  it('gives every catalogue the notes for a course, or none of them', async () => {
    const loaded = await Promise.all(
      Object.entries(departments).map(async ([slug, dept]) => [slug, await dept.loadCatalogue()])
    );

    const notesByCode = new Map();
    for (const [slug, catalogue] of loaded) {
      for (const course of catalogue.courses) {
        const code = normalize(course.code);
        if (!notesByCode.has(code)) notesByCode.set(code, new Map());
        // A code can repeat within a catalogue (CYB 311 is both Cryptography and
        // SIWES I); the copy that has notes is the one that matters here.
        const count = course.lectureNotes?.length ?? 0;
        notesByCode.get(code).set(slug, Math.max(count, notesByCode.get(code).get(slug) ?? 0));
      }
    }

    const gaps = [];
    for (const [code, byDepartment] of notesByCode) {
      const counts = [...byDepartment.values()];
      if (counts.some(n => n > 0) && counts.some(n => n === 0)) {
        gaps.push(`${code}: ${[...byDepartment].map(([d, n]) => `${d}=${n}`).join(', ')}`);
      }
    }

    expect(gaps).toEqual([]);
  });
});

// The bug this guards against: `covers`/`partial` are 1-based indices into a
// course's `topics` array, and they used to sit on the note objects. Notes are
// shared verbatim between catalogues while each department writes its own
// topics, so Data Science students got MTH 121's badges pointing at the
// Cybersecurity outline — Unit Four ("Integration") labelled as covering
// "Applications of differentiation", and the two integration items reading "no
// notes yet". A shared note file must therefore not carry indices of its own.
describe('outline coverage indices belong to the course, not the shared notes', () => {
  const normalize = (code) => String(code).toUpperCase().replace(/[^A-Z0-9]/g, '');

  it('never lets a course inherit another department\'s topic indices', async () => {
    const loaded = await Promise.all(
      Object.entries(departments).map(async ([slug, dept]) => [slug, await dept.loadCatalogue()])
    );

    // A note object reached from more than one department is shared, so any
    // covers/partial on it can only be right for whichever catalogue authored
    // them. The owning course must override with its own `noteCoverage`.
    const departmentsByNotes = new Map();
    for (const [slug, catalogue] of loaded) {
      for (const course of catalogue.courses) {
        if (!course.lectureNotes?.length) continue;
        if (!departmentsByNotes.has(course.lectureNotes)) departmentsByNotes.set(course.lectureNotes, new Set());
        departmentsByNotes.get(course.lectureNotes).add(slug);
      }
    }

    const inherited = [];
    for (const [slug, catalogue] of loaded) {
      for (const course of catalogue.courses) {
        const notes = course.lectureNotes;
        if (!notes?.length) continue;
        if (departmentsByNotes.get(notes).size < 2) continue;
        for (const note of notes) {
          const declaresInline = note.covers?.length || note.partial?.length;
          if (declaresInline && !course.noteCoverage?.[note.number]) {
            inherited.push(`${slug} ${normalize(course.code)} note ${note.number}`);
          }
        }
      }
    }

    expect(
      inherited,
      `shared lecture notes carry topic indices with no per-course override:\n\n${inherited.join('\n')}`
    ).toEqual([]);
  });

  it('keeps every declared index inside its own course outline', async () => {
    const loaded = await Promise.all(
      Object.entries(departments).map(async ([slug, dept]) => [slug, await dept.loadCatalogue()])
    );

    const outOfRange = [];
    for (const [slug, catalogue] of loaded) {
      for (const course of catalogue.courses) {
        for (const note of course.lectureNotes || []) {
          const source = course.noteCoverage?.[note.number] ?? note;
          for (const n of [...(source.covers || []), ...(source.partial || [])]) {
            if (!Number.isInteger(n) || n < 1 || n > (course.topics?.length ?? 0)) {
              outOfRange.push(`${slug} ${normalize(course.code)} note ${note.number} → #${n} of ${course.topics?.length ?? 0}`);
            }
          }
        }
      }
    }

    expect(outOfRange, `coverage index outside the course outline:\n\n${outOfRange.join('\n')}`).toEqual([]);
  });

  it('does not leave a noteCoverage entry pointing at a note that does not exist', async () => {
    const loaded = await Promise.all(
      Object.entries(departments).map(async ([slug, dept]) => [slug, await dept.loadCatalogue()])
    );

    const orphans = [];
    for (const [slug, catalogue] of loaded) {
      for (const course of catalogue.courses) {
        if (!course.noteCoverage) continue;
        const numbers = new Set((course.lectureNotes || []).map(n => String(n.number)));
        for (const key of Object.keys(course.noteCoverage)) {
          if (!numbers.has(String(key))) orphans.push(`${slug} ${normalize(course.code)} → note ${key}`);
        }
      }
    }

    expect(orphans, `noteCoverage keyed to a missing note:\n\n${orphans.join('\n')}`).toEqual([]);
  });
});
