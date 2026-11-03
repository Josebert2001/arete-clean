// CourseQuiz is the MCQ picker: it decides which questions a student draws and
// how many. The chapter pills added on top of the length buttons narrow the
// *pool* rather than starting a set of their own, so what needs guarding is
// that every length control downstream honours the narrowed pool — a "Full"
// button or a custom-number bound still quoting the whole bank would hand the
// student the year's material when they asked for one chapter.
//
// The ENT 221 bank is also checked against the notes it was written from: the
// pill a student clicks is the chapter's own title, so a label that drifts from
// the lecture notes is a label pointing at a heading that does not exist.
//
// Interaction goes through fireEvent rather than user-event, matching
// courseExamPrep.test.jsx — user-event is not a dependency of this project.

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseQuiz from '../components/CourseQuiz';
import { ent221Quiz } from '../data/lectureNotes/ent221Quiz';
import { ent221LectureNotes } from '../data/lectureNotes/ent221';

const q = (question, chapter) => ({
  ...(chapter ? { chapter } : {}),
  question,
  options: ['Yes', 'No'],
  correctIndex: 0,
  explanation: `Because ${question}`,
});

const CH1 = 'Chapter 1 · The Concept of Entrepreneurship';
const CH2 = 'Chapter 2 · Forms of Business Ownership';

const chaptered = [
  q('What does entreprendre mean?', CH1),
  q('Who is an intrapreneur?', CH1),
  q('What is a sole proprietorship?', CH2),
];

const plain = [q('What does entreprendre mean?'), q('Who is an intrapreneur?')];

const courseWith = (quiz, slug = 'ent-221') => ({ slug, code: 'ENT 221', quiz });

const startButton = (name) => screen.getByRole('button', { name });

beforeEach(() => {
  localStorage.clear();
});

describe('the chapter picker', () => {
  it('offers one pill per chapter, with its question count', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);

    expect(screen.getByText(/Pick by chapter/i)).toBeInTheDocument();
    expect(startButton(new RegExp(`${CH1} \\(2\\)`))).toBeInTheDocument();
    expect(startButton(new RegExp(`${CH2} \\(1\\)`))).toBeInTheDocument();
  });

  it('renders no pills for a bank that declares no chapters', () => {
    render(<CourseQuiz course={courseWith(plain)} />);

    expect(screen.queryByText(/Pick by chapter/i)).not.toBeInTheDocument();
    expect(startButton(/Full · all 2 questions/)).toBeInTheDocument();
  });

  it('narrows the pool the length buttons draw from', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);
    expect(startButton(/Full · all 3 questions/)).toBeInTheDocument();

    fireEvent.click(startButton(new RegExp(CH2)));

    expect(screen.getByText(/Drawing from/)).toBeInTheDocument();
    expect(startButton(/Full · all 1 question$/)).toBeInTheDocument();
  });

  it('draws only the selected chapter’s questions', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);

    fireEvent.click(startButton(new RegExp(CH2)));
    fireEvent.click(startButton(/Full · all 1 question$/));

    expect(screen.getByText('What is a sole proprietorship?')).toBeInTheDocument();
    expect(screen.queryByText('Who is an intrapreneur?')).not.toBeInTheDocument();
  });

  it('adds up the pool across several selected chapters', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);

    fireEvent.click(startButton(new RegExp(CH1)));
    fireEvent.click(startButton(new RegExp(CH2)));

    expect(screen.getByText(/2 chapters/)).toBeInTheDocument();
    expect(startButton(/Full · all 3 questions/)).toBeInTheDocument();
  });

  it('bounds the custom number by the narrowed pool, not the whole bank', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);

    fireEvent.click(startButton(new RegExp(CH2)));
    fireEvent.change(screen.getByLabelText(/Number of questions/i), { target: { value: '3' } });
    fireEvent.click(startButton(/^Start$/));

    expect(screen.getByText('Enter a number between 1 and 1.')).toBeInTheDocument();
  });

  it('clears the selection back to the whole bank', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);

    fireEvent.click(startButton(new RegExp(CH2)));
    fireEvent.click(startButton(/^Clear$/));

    expect(screen.queryByText(/Drawing from/)).not.toBeInTheDocument();
    expect(startButton(/Full · all 3 questions/)).toBeInTheDocument();
  });

  it('clears a stale bound error when the pool changes', () => {
    render(<CourseQuiz course={courseWith(chaptered)} />);

    fireEvent.change(screen.getByLabelText(/Number of questions/i), { target: { value: '9' } });
    fireEvent.click(startButton(/^Start$/));
    expect(screen.getByText('Enter a number between 1 and 3.')).toBeInTheDocument();

    fireEvent.click(startButton(new RegExp(CH2)));
    expect(screen.queryByText(/Enter a number between/)).not.toBeInTheDocument();
  });
});

// CourseDetail renders CourseQuiz at a fixed position and does not remount it
// on prev/next navigation between courses (getStoredTab/setActiveTabState
// change, the element doesn't) — so a stale `selected` from the course just
// left could otherwise survive into a course whose bank uses different
// chapter labels, or none at all, silently emptying the pool.
describe('navigating to a different course', () => {
  it('drops a stale chapter selection instead of carrying it over', () => {
    const { rerender } = render(<CourseQuiz course={courseWith(chaptered)} />);
    fireEvent.click(startButton(new RegExp(CH2)));
    expect(screen.getByText(/Drawing from/)).toBeInTheDocument();

    // Same shape of course (still has `chapter` tags), different slug — the
    // component instance is reused, only the prop changes.
    rerender(<CourseQuiz course={courseWith(chaptered, 'other-course')} />);

    expect(screen.queryByText(/Drawing from/)).not.toBeInTheDocument();
    expect(startButton(/Full · all 3 questions/)).toBeInTheDocument();
  });

  it('drops a stale bound error along with the selection', () => {
    const { rerender } = render(<CourseQuiz course={courseWith(chaptered)} />);
    fireEvent.click(startButton(new RegExp(CH2)));
    fireEvent.change(screen.getByLabelText(/Number of questions/i), { target: { value: '5' } });
    fireEvent.click(startButton(/^Start$/));
    expect(screen.getByText('Enter a number between 1 and 1.')).toBeInTheDocument();

    rerender(<CourseQuiz course={courseWith(chaptered, 'other-course')} />);

    expect(screen.queryByText(/Enter a number between/)).not.toBeInTheDocument();
  });

  it('does not crash when the new course’s bank has no matching chapters', () => {
    const { rerender } = render(<CourseQuiz course={courseWith(chaptered)} />);
    fireEvent.click(startButton(new RegExp(CH2)));

    // A bank with no `chapter` at all — the pool-filter would otherwise stay
    // narrowed to a label this bank never has, going to zero.
    rerender(<CourseQuiz course={courseWith(plain, 'other-course')} />);

    expect(startButton(/Full · all 2 questions/)).toBeInTheDocument();
    fireEvent.click(startButton(/Full · all 2 questions/));
    // "Full" shuffles the pool along with everything else in it, so which
    // question lands first isn't fixed — only that the quiz actually started
    // with both of this bank's questions rather than throwing.
    expect(screen.getByText(/Question 1 of 2/)).toBeInTheDocument();
  });
});

// The shipped bank. Its pills are only as good as its tags: an untagged
// question belongs to no chapter and can never be drawn from the picker, and a
// label that does not match the notes points at a heading the student cannot
// find.
describe('the ENT 221 bank', () => {
  const labels = ent221LectureNotes.map((t) => `Chapter ${t.number} · ${t.title}`);

  it('tags every question with a chapter from the lecture notes', () => {
    expect(ent221Quiz.length).toBeGreaterThan(0);
    for (const question of ent221Quiz) {
      expect(labels, `unknown chapter on "${question.question}"`).toContain(question.chapter);
    }
  });

  it('leaves no chapter without questions to draw', () => {
    for (const label of labels) {
      expect(
        ent221Quiz.filter((question) => question.chapter === label).length,
        `no questions for "${label}"`,
      ).toBeGreaterThan(0);
    }
  });
});
