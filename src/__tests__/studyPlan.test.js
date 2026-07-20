import { describe, it, expect } from 'vitest';
import { generateStudyPlan, DEFAULT_STUDY_DAYS } from '../utils/studyPlan';

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

describe('progress-aware weighting', () => {
  // A roomy grid so adjusted blocks never spill into `unplaced`.
  const ROOMY = {
    level: 100, semester: 1, sessionStart: MONDAY,
    studyDays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
    slotTimes: ['08:00', '09:15', '10:30', '11:45'],
  };

  const blocksByCode = (plan) => {
    const map = {};
    for (const ev of plan.events) {
      const code = ev.title.split(' — ')[0];
      map[code] = (map[code] || 0) + 1;
    }
    return map;
  };

  it('gives a weak-quiz course an extra weekly block, with a reason', () => {
    const base = generateStudyPlan(ROOMY);
    const course = base.courses[0];
    const plan = generateStudyPlan({ ...ROOMY, courseSignals: { [course.slug]: { quizPercent: 40 } } });

    expect(blocksByCode(plan)[course.code]).toBe(blocksByCode(base)[course.code] + 1);
    expect(plan.adjustments).toEqual([
      { code: course.code, delta: 1, reason: expect.stringContaining('40%') },
    ]);
    expect(plan.meta.personalized).toBe(true);
  });

  it('frees a block from a strong-quiz multi-block course, never below one', () => {
    const base = generateStudyPlan(ROOMY);
    const counts = blocksByCode(base);
    const multi = base.courses.find(c => counts[c.code] >= 2);
    const single = base.courses.find(c => counts[c.code] === 1);
    const signals = {
      [multi.slug]: { quizPercent: 95 },
      ...(single && { [single.slug]: { quizPercent: 95 } }),
    };
    const plan = generateStudyPlan({ ...ROOMY, courseSignals: signals });

    expect(blocksByCode(plan)[multi.code]).toBe(counts[multi.code] - 1);
    if (single) expect(blocksByCode(plan)[single.code]).toBe(1); // floor holds
  });

  it('frees a block when the linked track is mostly complete', () => {
    const base = generateStudyPlan(ROOMY);
    const counts = blocksByCode(base);
    const multi = base.courses.find(c => counts[c.code] >= 2);
    const plan = generateStudyPlan({
      ...ROOMY,
      courseSignals: { [multi.slug]: { trackPercent: 92, trackLabel: 'Python' } },
    });

    expect(blocksByCode(plan)[multi.code]).toBe(counts[multi.code] - 1);
    expect(plan.adjustments[0].reason).toContain('Python track 92%');
  });

  it('leaves middling scores alone and stays deterministic with signals', () => {
    const base = generateStudyPlan(ROOMY);
    const course = base.courses[0];
    const signals = { [course.slug]: { quizPercent: 70 } };
    const a = generateStudyPlan({ ...ROOMY, courseSignals: signals });
    const b = generateStudyPlan({ ...ROOMY, courseSignals: signals });

    expect(a.adjustments).toEqual([]);
    expect(a.meta.personalized).toBe(false);
    expect(blocksByCode(a)).toEqual(blocksByCode(base));
    expect(a.events.map(e => e.uid)).toEqual(b.events.map(e => e.uid));
  });
});
