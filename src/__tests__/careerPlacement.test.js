import { describe, expect, it } from 'vitest';
import { scorePlacement } from '../../api/_lib/careerPlacement.js';
import { ENTRY_PATHS, PLACEMENT_VERSION, placementQuestions, careerStarters } from '../data/careers.js';
import { signInEntryQuery, rememberCareerEntry, hasCareerEntry, clearSecurityEntry } from '../utils/learningEntry.js';

const correct = [0, 1, 1, 1, 2, 2, 1, 0, 2, 2, 2, 0, 0, 1, 1, 1, 0, 2];
function answersFor(path) {
  let knowledge = 0;
  return Object.fromEntries(placementQuestions.map(q => [q.id, q.kind === 'interest' ? (q.path === path ? 4 : 1) : correct[knowledge++]]));
}
describe('server career recommendation', () => {
  it('only permits fixed sign-in entry values, never a supplied redirect URL', () => {
    expect(signInEntryQuery('career')).toBe('?learn=career');
    expect(signInEntryQuery(true)).toBe('?learn=cybersecurity');
    expect(signInEntryQuery('https://untrusted.example')).toBe('');
    clearSecurityEntry(); rememberCareerEntry('?learn=https://untrusted.example');
    expect(hasCareerEntry()).toBe(false);
    rememberCareerEntry('?learn=career'); expect(hasCareerEntry()).toBe(true);
    clearSecurityEntry();
  });
  it.each(ENTRY_PATHS)('recommends %s from stronger interest and observed judgment', path => {
    const result = scorePlacement(PLACEMENT_VERSION, answersFor(path));
    expect(result.recommendedPath).toBe(path);
    expect(result.ranked[0]).toMatchObject({ path, score: 100, correct: 3 });
    expect(result.needsBridge).toBe(false);
    expect(result.foundationCorrect).toBe(6);
    expect(careerStarters[path].evidence.length).toBeGreaterThanOrEqual(3);
  });
  it('keeps foundation gaps separate from the selected career', () => {
    const answers = answersFor('red');
    ['B1', 'B2', 'B3', 'B4'].forEach(id => { answers[id] = 3; });
    const result = scorePlacement(PLACEMENT_VERSION, answers);
    expect(result.recommendedPath).toBe('red');
    expect(result.needsBridge).toBe(true);
    expect(result.missedFoundations).toEqual(['B1', 'B2', 'B3', 'B4']);
  });
  it('awards partial judgment credit without rescoring older rule versions', () => {
    const answers = answersFor('blue');
    answers.J1 = 1;
    const partial = scorePlacement(PLACEMENT_VERSION, answers);
    expect(partial.ranked[0]).toMatchObject({ path: 'blue', credit: 5, score: 94.2 });
    answers.J1 = 2;
    expect(scorePlacement(PLACEMENT_VERSION, answers).ranked[0]).toMatchObject({ credit: 4, score: 88.3 });
    expect(() => scorePlacement('career-v1', answers)).toThrow(/changed/);
  });
  it('does not turn an exact blue/red tie into an arbitrary assignment', () => {
    const answers = answersFor('blue');
    placementQuestions.filter(q => q.path === 'red' && q.kind === 'interest').forEach(q => { answers[q.id] = 4; });
    const result = scorePlacement(PLACEMENT_VERSION, answers);
    expect(result.recommendedPath).toBeNull();
    expect(result.purpleInterest).toBe(true);
    expect(result.closeMatches).toEqual(['blue', 'red']);
  });
  it('offers discovery when interests are all uncertain or evidence is very weak', () => {
    for (const interestValue of [0, 2]) {
      const answers = Object.fromEntries(placementQuestions.map(q => [q.id, q.kind === 'interest' ? interestValue : 3]));
      const result = scorePlacement(PLACEMENT_VERSION, answers);
      expect(result.discovery).toBe(true);
      expect(result.recommendedPath).toBeNull();
    }
  });
  it('rejects missing, fractional, unknown, and out-of-range responses and stale versions', () => {
    const answers = answersFor('grc');
    expect(() => scorePlacement('old-version', answers)).toThrow(/changed/);
    expect(() => scorePlacement(PLACEMENT_VERSION, {})).toThrow(/30/);
    for (const invalid of [-1, 5, 1.5, '4', null]) {
      expect(() => scorePlacement(PLACEMENT_VERSION, { ...answers, I1: invalid })).toThrow(/I1/);
    }
    expect(() => scorePlacement(PLACEMENT_VERSION, { ...answers, forged: 4 })).toThrow();
    expect(placementQuestions).toHaveLength(30);
    expect(placementQuestions.some(q => 'correctIndex' in q || 'answer' in q)).toBe(false);
  });
});
