import { describe, it, expect } from 'vitest';
import { findCourseEntry, findModule } from '../../api/_lib/courseData.js';

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
