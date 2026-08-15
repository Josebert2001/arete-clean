import { describe, it, expect } from 'vitest';
import { collectReviewItems, toQuizQuestions, quizQuestionId } from '../utils/reviewItems';
import { ITEM_KINDS, quizItemId, examItemId } from '../utils/reviewSchedule';

const mcq = (question) => ({ question, options: ['a', 'b'], correctIndex: 0 });

const courses = [
  {
    slug: 'uuy-cyb-222',
    code: 'UUY-CYB 222',
    title: 'Web and Mobile Applications Security',
    quiz: [mcq('What is a web application?'), mcq('What does XSS stand for?')],
    examPrep: [{ type: 'longform', question: 'Define web-based risk.', marks: 5, source: 'Topic 7' }],
  },
  {
    slug: 'gst-111',
    code: 'GST 111',
    title: 'Communication in English',
    quiz: [mcq('What is a morpheme?')],
  },
  { slug: 'phy-128', code: 'PHY 128', title: 'Heat and Properties of Matter' }, // no banks
];

describe('collectReviewItems', () => {
  it('flattens quiz and exam banks across courses', () => {
    const items = collectReviewItems(courses);
    expect(items).toHaveLength(4);
  });

  it('tags each item with its kind and course', () => {
    const items = collectReviewItems(courses);
    const exam = items.find((i) => i.kind === ITEM_KINDS.exam);
    expect(exam.courseSlug).toBe('uuy-cyb-222');
    expect(exam.courseCode).toBe('UUY-CYB 222');
    expect(exam.question.question).toBe('Define web-based risk.');
  });

  it('builds ids matching the per-kind helpers', () => {
    const items = collectReviewItems(courses);
    const first = items[0];
    expect(first.id).toBe(quizItemId('uuy-cyb-222', courses[0].quiz[0]));
    const exam = items.find((i) => i.kind === ITEM_KINDS.exam);
    expect(exam.id).toBe(examItemId('uuy-cyb-222', courses[0].examPrep[0]));
  });

  it('produces unique ids across the pool', () => {
    const items = collectReviewItems(courses);
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
  });

  it('skips courses with no banks', () => {
    const items = collectReviewItems(courses);
    expect(items.some((i) => i.courseSlug === 'phy-128')).toBe(false);
  });

  it('honours a kinds filter', () => {
    const items = collectReviewItems(courses, { kinds: [ITEM_KINDS.quiz] });
    expect(items).toHaveLength(3);
    expect(items.every((i) => i.kind === ITEM_KINDS.quiz)).toBe(true);
  });

  it('applies foundation pins when given', () => {
    const items = collectReviewItems(courses, { selectedCourses: ['gst-111'] });
    expect(items).toHaveLength(1);
    expect(items[0].courseSlug).toBe('gst-111');
  });

  it('ignores an empty pin list rather than filtering everything away', () => {
    expect(collectReviewItems(courses, { selectedCourses: [] })).toHaveLength(4);
    expect(collectReviewItems(courses, { selectedCourses: null })).toHaveLength(4);
  });

  it('tolerates an empty or malformed catalogue', () => {
    expect(collectReviewItems([])).toEqual([]);
    expect(collectReviewItems(undefined)).toEqual([]);
    expect(collectReviewItems([{ code: 'no slug' }])).toEqual([]);
  });
});

describe('toQuizQuestions', () => {
  it('keeps only MCQ items', () => {
    const questions = toQuizQuestions(collectReviewItems(courses));
    expect(questions).toHaveLength(3);
    expect(questions.every((q) => Array.isArray(q.options))).toBe(true);
  });

  it('carries the course slug on the question so Quiz can rebuild the id', () => {
    const questions = toQuizQuestions(collectReviewItems(courses));
    expect(questions[0].courseSlug).toBe('uuy-cyb-222');
  });

  it('round-trips an id through a shuffled copy, as Quiz produces', () => {
    const items = collectReviewItems(courses, { kinds: [ITEM_KINDS.quiz] });
    const questions = toQuizQuestions(items);
    // Quiz spreads the question and reorders its options; the slug rides along.
    const asShuffled = { ...questions[0], options: [...questions[0].options].reverse() };
    expect(quizQuestionId(asShuffled)).toBe(items[0].id);
  });

  it('returns an empty list for an empty queue', () => {
    expect(toQuizQuestions([])).toEqual([]);
    expect(toQuizQuestions()).toEqual([]);
  });
});
