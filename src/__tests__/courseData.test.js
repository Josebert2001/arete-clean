import { describe, it, expect } from 'vitest';
import { findCourseEntry, findModule, COURSE_INDEX, getCourseIndexForDepartment } from '../../api/_lib/courseData.js';

// Backs the AI Tutor's getCourseOutline / getModuleDetail tools. The recent
// hardening guarantees: a loosely-formatted code resolves to the CANONICAL
// course code (so the DB note lookup matches), and an exact code match never
// gets dragged into a distinct "UUY-" course by the suffix fallback.

describe('findCourseEntry — canonical code resolution', () => {
  it('resolves a spaced uppercase code to its canonical form', () => {
    const entry = findCourseEntry('CYB 222');
    expect(entry).not.toBeNull();
    expect(entry.code).toBe('CYB 222');
    expect(entry.outline).toContain('Cybersecurity Innovation');
  });

  it('resolves a lowercase / unspaced code to the same canonical entry', () => {
    expect(findCourseEntry('cyb222').code).toBe('CYB 222');
    expect(findCourseEntry('  CyB 222 ').code).toBe('CYB 222');
  });

  it('does not let an exact match for "CYB 222" leak into "UUY-CYB 222"', () => {
    const entry = findCourseEntry('CYB 222');
    // The canonical code is the plain one, and the outline is the plain course's,
    // not the distinct UUY-CYB 222 (Web and Mobile Application Security) block.
    expect(entry.code).toBe('CYB 222');
    expect(entry.outline).not.toContain('Web and Mobile Application Security');
  });

  it('falls back to a suffix match only when nothing matches exactly', () => {
    // "CYB 424" has no exact catalogue entry, but "UUY-CYB 424" does.
    const entry = findCourseEntry('CYB 424');
    expect(entry).not.toBeNull();
    expect(entry.code).toBe('UUY-CYB 424');
  });

  it('returns null for an unknown code', () => {
    expect(findCourseEntry('ZZZ 999')).toBeNull();
    expect(findCourseEntry('')).toBeNull();
  });
});

describe('findCourseEntry — lecture-note grounding', () => {
  // The tutor was answering course questions from the model's general knowledge
  // because getCourseOutline never saw courses.js's lectureNotes. The outline
  // must now carry the real topic list + content so answers are grounded.
  it('includes the real lecture-note topic titles for CYB 222', () => {
    const { outline } = findCourseEntry('CYB 222');
    expect(outline).toContain('LECTURE NOTES');
    expect(outline).toContain('ALL TOPICS');
    // The exact topics rendered on the course page, not a generic grouping.
    expect(outline).toContain('Zero Trust Architecture');
    expect(outline).toContain('Post-Quantum Cryptography');
    expect(outline).toContain('Deepfake Detection');
  });

  it('lists every topic title even when body content is truncated', () => {
    const { outline } = findCourseEntry('CYB 222');
    const allTopicsBlock = outline.slice(outline.indexOf('ALL TOPICS'), outline.indexOf('TOPIC DETAIL'));
    // CYB 222 has 10 topics (numbered 0–9); all must appear in the title list.
    for (let n = 0; n <= 9; n++) {
      expect(allTopicsBlock).toContain(`Topic ${n}:`);
    }
  });

  it('omits the lecture-notes block for a course that has none', () => {
    // CYB 211 has a catalogue entry but no lectureNotes in courses.js.
    const { outline } = findCourseEntry('CYB 211');
    expect(outline).not.toContain('LECTURE NOTES');
  });
});

describe('getCourseIndexForDepartment — per-department catalogue scoping (Phase 4)', () => {
  it('returns the full catalogue index for cybersecurity, an unknown slug, or no slug at all', () => {
    expect(getCourseIndexForDepartment('cybersecurity')).toBe(COURSE_INDEX);
    expect(getCourseIndexForDepartment('some-unregistered-department')).toBe(COURSE_INDEX);
    expect(getCourseIndexForDepartment(undefined)).toBe(COURSE_INDEX);
  });

  it('scopes "general" (foundation mode) to just the shared courses', () => {
    const index = getCourseIndexForDepartment('general');
    // Shared/cross-departmental courses are present.
    expect(index).toContain('GST 111');
    expect(index).toContain('COS 121');
    expect(index).toContain('MTH 121');
    // Cybersecurity-only courses are not.
    expect(index).not.toContain('CYB 211');
    expect(index).not.toContain('UUY-CYB 121');
    expect(index).not.toContain('CYB 222');
  });

  it('drops a section entirely when none of its courses are cross-departmental', () => {
    // 300L Second Semester is entirely SIWES (all Cybersecurity-only), so a
    // foundation-mode student's index should have no trace of that section.
    const index = getCourseIndexForDepartment('general');
    expect(index).not.toContain('SIWES');
  });

  it('retitles the catalogue header away from the Cybersecurity-specific one', () => {
    const index = getCourseIndexForDepartment('general');
    expect(index).not.toContain('CYBERSECURITY');
    expect(index).toContain('SHARED FOUNDATION COURSES');
  });

  it('strips the per-semester unit totals, which would misstate a filtered list', () => {
    // "── 200 LEVEL · FIRST SEMESTER (15 units)" counts the whole Cybersecurity
    // semester; above a foundation student's 5 units of shared courses it is a
    // false fact fed straight into the tutor's prompt.
    const index = getCourseIndexForDepartment('general');
    expect(index).toMatch(/── 200 LEVEL · FIRST SEMESTER/);
    expect(index).not.toMatch(/──.*\(\d+\s*units?\)/i);
    // The full Cybersecurity index keeps its (accurate) totals.
    expect(getCourseIndexForDepartment('cybersecurity')).toMatch(/──.*\(\d+\s*units?\)/i);
  });
});

describe('findCourseEntry — department scoping (Phase 4)', () => {
  it('resolves a Cybersecurity-only course when unscoped (default behaviour unchanged)', () => {
    expect(findCourseEntry('CYB 222')).not.toBeNull();
    expect(findCourseEntry('CYB 222', 'cybersecurity')).not.toBeNull();
  });

  it('returns null for a Cybersecurity-only course under the foundation department', () => {
    expect(findCourseEntry('CYB 222', 'general')).toBeNull();
    expect(findCourseEntry('UUY-CYB 121', 'general')).toBeNull();
  });

  it('still resolves a shared course under the foundation department, lecture notes included', () => {
    const entry = findCourseEntry('GST 121', 'general');
    expect(entry).not.toBeNull();
    expect(entry.code).toBe('GST 121');
    expect(entry.outline).toContain('LECTURE NOTES');
  });
});

describe('findModule — track module lookup', () => {
  it('returns the requested Java module block', () => {
    const block = findModule('java', 1);
    expect(block).toContain('Module 01');
    expect(block).toContain('Java Foundations');
  });

  it('is case-insensitive on the track name', () => {
    expect(findModule('PYTHON', 1)).toContain('Python Foundations');
  });

  it('scopes a module number to its own track', () => {
    expect(findModule('c', 8)).toContain('Pointers');
  });

  it('returns null for an unknown track', () => {
    expect(findModule('rust', 1)).toBeNull();
  });

  it('returns null for an out-of-range module number', () => {
    expect(findModule('python', 99)).toBeNull();
  });
});
