import { describe, it, expect } from 'vitest';
import { generateStudyPlan, DEFAULT_STUDY_DAYS, DEFAULT_SLOT_TIMES } from '../utils/studyPlan';

const MONDAY = new Date(2026, 0, 5); // a Monday

describe('generateStudyPlan', () => {
  it('throws on missing/invalid inputs', () => {
    expect(() => generateStudyPlan({ semester: 1, sessionStart: MONDAY })).toThrow();
    expect(() => generateStudyPlan({ level: 100, semester: 1, sessionStart: new Date('nope') })).toThrow();
  });

  it('generates study events for a real level+semester', () => {
    const plan = generateStudyPlan({ level: 100, semester: 1, sessionStart: MONDAY });
    expect(plan.courses.length).toBeGreaterThan(0);
    expect(plan.events.length).toBeGreaterThan(0);
    // Every event carries the fields the ICS builder needs.
    for (const ev of plan.events) {
      expect(ev).toMatchObject({
        uid: expect.any(String),
        title: expect.stringContaining('Study'),
        byday: expect.any(String),
        start: expect.any(String),
        end: expect.any(String),
      });
      expect(DEFAULT_STUDY_DAYS).toContain(ev.byday);
      expect(ev.firstDate).toBeInstanceOf(Date);
      expect(ev.untilDate).toBeInstanceOf(Date);
    }
  });

  it('is deterministic — same inputs produce identical plans', () => {
    const a = generateStudyPlan({ level: 200, semester: 1, sessionStart: MONDAY });
    const b = generateStudyPlan({ level: 200, semester: 1, sessionStart: MONDAY });
    expect(a.events.map(e => e.uid)).toEqual(b.events.map(e => e.uid));
  });

  it('weights heavier courses with more weekly blocks', () => {
    const plan = generateStudyPlan({ level: 100, semester: 1, sessionStart: MONDAY });
    const byCode = {};
    for (const ev of plan.events) {
      const code = ev.title.split(' — ')[0];
      byCode[code] = (byCode[code] || 0) + 1;
    }
    // A 3-unit course should get at least as many blocks as a 1-unit course.
    const threeUnit = plan.courses.find(c => c.units >= 3);
    const oneUnit   = plan.courses.find(c => c.units <= 1);
    if (threeUnit && oneUnit && byCode[threeUnit.code] && byCode[oneUnit.code]) {
      expect(byCode[threeUnit.code]).toBeGreaterThanOrEqual(byCode[oneUnit.code]);
    }
  });

  it('sets the series end ~weeks after the start', () => {
    const plan = generateStudyPlan({ level: 100, semester: 1, sessionStart: MONDAY, weeks: 15 });
    const ev = plan.events[0];
    const diffDays = Math.round((ev.untilDate - ev.firstDate) / 86400000);
    expect(diffDays).toBe(14 * 7); // (weeks-1)*7
  });

  it('respects a custom capacity and reports capacity in meta', () => {
    const plan = generateStudyPlan({
      level: 100, semester: 1, sessionStart: MONDAY,
      studyDays: ['MO'], slotTimes: ['17:00'],
    });
    expect(plan.meta.capacity).toBe(1);
    expect(plan.events.length).toBeLessThanOrEqual(1);
  });
});
