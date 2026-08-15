// Finishing a written set feeds the review scheduler. Unlike an MCQ the outcome
// is not binary — the student self-marks out of the question's marks — so the
// thing worth guarding is that the pass fraction is applied, that the outcome is
// keyed by the same id examItemId produces, and that a whole set commits in one
// write rather than one per question.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseExamPrep from '../components/CourseExamPrep';
import { REVIEW_STORAGE_KEY, examItemId, REVIEW_PASS_FRACTION } from '../utils/reviewSchedule';

vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'u1' } }) }));
vi.mock('../lib/supabase', () => ({ supabase: null }));

// 10 marks in two equal halves, so ticking one point lands at exactly 50% —
// below the 0.7 pass fraction — and ticking both lands at 100%.
const question = {
  type: 'longform',
  marks: 10,
  source: 'Topic 7 — Risks & Threats',
  question: 'Define web-based risk.',
  modelAnswer: 'Any threat, vulnerability or exposure associated with using the internet.',
  markScheme: ['Definition given (5)', 'Three consequences named (5)'],
};

const course = { slug: 'uuy-cyb-222', code: 'UUY-CYB 222', examPrep: [question] };

const stored = () => JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || '{}');
const itemId = examItemId(course.slug, question);

// Walk one question end to end, ticking `points` mark-scheme lines.
const runSet = (points) => {
  render(<CourseExamPrep course={course} />);
  fireEvent.click(screen.getByRole('button', { name: /Everything/ }));

  fireEvent.change(screen.getByLabelText(/your answer/i), { target: { value: 'my attempt' } });
  fireEvent.click(screen.getByRole('button', { name: /reveal model answer/i }));

  for (const label of points) {
    fireEvent.click(screen.getByText(label).closest('button'));
  }
  fireEvent.click(screen.getByRole('button', { name: /see results|next question/i }));
};

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('CourseExamPrep review outcomes', () => {
  it('records a well-marked answer as recalled', () => {
    runSet(['Definition given (5)', 'Three consequences named (5)']);   // 10/10
    const item = stored().items[itemId];
    expect(item).toBeDefined();
    expect(item.b).toBe(2);          // new item answered correctly enters at box 2
  });

  it('records a poorly-marked answer as forgotten', () => {
    runSet(['Definition given (5)']);                                    // 5/10 = 0.5
    expect(stored().items[itemId].b).toBe(1);
  });

  it('records an unmarked answer as forgotten', () => {
    runSet([]);                                                          // 0/10
    expect(stored().items[itemId].b).toBe(1);
  });

  it('applies the pass fraction rather than any-marks-is-a-pass', () => {
    // 0.5 sits below REVIEW_PASS_FRACTION, so half marks must not count as
    // recalled. If the threshold ever moves this assertion should be revisited.
    expect(0.5).toBeLessThan(REVIEW_PASS_FRACTION);
    runSet(['Definition given (5)']);
    expect(stored().items[itemId].b).toBe(1);
  });

  it('keys the outcome by the same id examItemId produces', () => {
    runSet(['Definition given (5)', 'Three consequences named (5)']);
    expect(Object.keys(stored().items)).toEqual([itemId]);
  });

  it('writes review state under its own key, not the exam-score record', () => {
    runSet(['Definition given (5)', 'Three consequences named (5)']);
    // The self-marked percentage still lands in the exam-prep record…
    const scores = JSON.parse(localStorage.getItem('course-exam-prep-v1') || '{}');
    expect(scores.quizScores?.[course.slug]).toBeDefined();
    // …and the growing item map stays out of it.
    expect(scores.items).toBeUndefined();
    expect(stored().items[itemId]).toBeDefined();
  });
});
