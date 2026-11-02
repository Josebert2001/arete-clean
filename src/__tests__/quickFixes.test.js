import { describe, it, expect } from 'vitest';
import { courses } from '../data/courses';

// Lint regressions are caught by `npm run lint` in CI, not re-run here.
describe('quick fixes', () => {
  it('keeps CYB 222 question 89 meaningful after its options are shuffled', () => {
    const question = courses.find(course => course.code === 'CYB 222').quiz[89];
    expect(question.question).toMatch(/pre-selected group of organisations/);
    expect(question.options[question.correctIndex]).toBe('Consortium (federated) blockchain');
    expect(question.options).toContain('Permissionless blockchain');
    expect(question.options.join(' ')).not.toMatch(/of the above/i);
    const correctLength = question.options[question.correctIndex].length;
    expect(correctLength - Math.max(...question.options.filter((_, index) => index !== question.correctIndex).map(option => option.length))).toBeLessThanOrEqual(25);
  });
});
