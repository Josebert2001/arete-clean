// CourseExamPrep.jsx is the written-exam counterpart to CourseQuiz — no options,
// no correctIndex, and a score the student assigns themselves. Two things carry
// real risk and are guarded here:
//
//   1. The self-marking arithmetic. A longform score is derived by parsing the
//      trailing "(2)" off each mark-scheme line, so a parsing regression would
//      silently award the wrong marks with nothing visibly broken.
//   2. The recall matcher. It is deliberately lenient — case, punctuation,
//      articles and aliases all forgive — and equally must not credit a blank
//      or a wrong answer, nor let one correct entry claim two items.
//
// The shipped CYB 122 bank is also checked against the shape the component
// actually consumes, since the two are authored separately.
//
// Interaction goes through fireEvent rather than user-event, matching
// profileForm.test.jsx — user-event is not a dependency of this project.

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseExamPrep from '../components/CourseExamPrep';
import { cyb122ExamPrep } from '../data/lectureNotes/cyb122ExamPrep';
import { cyb221ExamPrep } from '../data/lectureNotes/cyb221ExamPrep';

const longform = {
  type: 'longform',
  marks: 5,
  source: '§12',
  question: 'Distinguish due care from due diligence.',
  modelAnswer: 'Due care establishes the standard; due diligence sustains it.',
  markScheme: [
    'Due care defined (2)',
    'Due diligence defined (2)',
    'States the discriminator (1)',
  ],
};

const recall = {
  type: 'recall',
  marks: 3,
  source: '§12',
  question: 'Name the three stages of risk management.',
  items: [
    { name: 'Risk identification', aliases: ['identification'], explain: 'Documenting the security posture.' },
    { name: 'Risk assessment', aliases: ['assessment'], explain: 'Determining exposure.' },
    { name: 'Risk control', aliases: ['control'], explain: 'Applying controls.' },
  ],
};

// A code question carries a listing with the stem, an answer listing, or both.
// The two must be told apart: the stem is visible from the start, the answer
// listing only after the reveal.
const codeQuestion = {
  type: 'longform',
  marks: 4,
  language: 'python',
  source: 'Topic 10 · Practical 1',
  question: 'Find the fault in the echo server below.',
  code: 'while True:\n    data = conn.recv(1024)\n    conn.close()',
  modelAnswer: 'close() is inside the loop, so the second read fails.',
  modelCode: 'while True:\n    data = conn.recv(1024)\nconn.close()  # after the loop',
  markScheme: ['Fault located (2)', 'Correction given (2)'],
};

const courseWith = (examPrep) => ({ slug: 'test-course', code: 'TST 101', examPrep });

// The picker sits in front of every question, so each test starts a set first.
const startEverything = () =>
  fireEvent.click(screen.getByRole('button', { name: /Everything/ }));

const typeInto = (input, value) => fireEvent.change(input, { target: { value } });

// Longform reveal is gated on the answer box, so most tests write first.
const answerThen = (text) => {
  typeInto(screen.getByRole('textbox'), text);
  fireEvent.click(screen.getByRole('button', { name: /Reveal model answer/ }));
};

describe('CourseExamPrep', () => {
  // Written answers persist to localStorage, so each test starts from a clean
  // slate rather than inheriting the previous one's typing.
  beforeEach(() => localStorage.clear());

  it('renders nothing for a course with no examPrep bank', () => {
    const { container } = render(<CourseExamPrep course={courseWith([])} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('hides the model answer until the student asks to reveal it', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();

    expect(screen.getByText(longform.question)).toBeInTheDocument();
    expect(screen.queryByText(longform.modelAnswer)).not.toBeInTheDocument();

    answerThen('due care sets the standard');
    expect(screen.getByText(longform.modelAnswer)).toBeInTheDocument();
  });

  // The gate exists to defeat the fluency illusion, not to catch cheats — so it
  // must actually hold, and the escape hatch must actually work.
  it('will not reveal until something has been written', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();

    const reveal = screen.getByRole('button', { name: /Reveal model answer/ });
    expect(reveal).toBeDisabled();

    // Whitespace alone is not an answer.
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } });
    expect(screen.getByRole('button', { name: /Reveal model answer/ })).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'due care' } });
    expect(screen.getByRole('button', { name: /Reveal model answer/ })).toBeEnabled();
  });

  it('lets a student skip the answer box deliberately', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();

    fireEvent.click(screen.getByRole('button', { name: /Skip — just show me/ }));
    expect(screen.getByText(longform.modelAnswer)).toBeInTheDocument();
  });

  it('keeps a written answer across a remount, so a reload does not lose it', () => {
    const { unmount } = render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();
    typeInto(screen.getByRole('textbox'), 'a long answer worth not losing');
    unmount();

    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();
    expect(screen.getByRole('textbox')).toHaveValue('a long answer worth not losing');
  });

  it('shows what the student wrote alongside the mark scheme', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();

    answerThen('due care establishes it, due diligence sustains it');
    expect(screen.getByText('due care establishes it, due diligence sustains it')).toBeInTheDocument();
  });

  it('awards the marks carried by each ticked mark-scheme point', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();
    answerThen('my answer');

    // Nothing ticked yet.
    expect(screen.getByText('0 / 5')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Due care defined/ }));
    expect(screen.getByText('2 / 5')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /States the discriminator/ }));
    expect(screen.getByText('3 / 5')).toBeInTheDocument();

    // Ticking is a toggle, so un-ticking must give the marks back.
    fireEvent.click(screen.getByRole('button', { name: /Due care defined/ }));
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  it('credits recall answers leniently but does not credit wrong or blank ones', () => {
    render(<CourseExamPrep course={courseWith([recall])} />);
    startEverything();

    const blanks = screen.getAllByRole('textbox');
    expect(blanks).toHaveLength(3);

    typeInto(blanks[0], 'identification');   // an alias, lowercase
    typeInto(blanks[1], 'RISK ASSESSMENT');  // full name, wrong case
    typeInto(blanks[2], 'benchmarking');     // wrong — belongs to another list

    fireEvent.click(screen.getByRole('button', { name: /Check my recall/ }));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('scores zero when every blank is left empty', () => {
    render(<CourseExamPrep course={courseWith([recall])} />);
    startEverything();

    fireEvent.click(screen.getByRole('button', { name: /Check my recall/ }));
    expect(screen.getByText('0 / 3')).toBeInTheDocument();
  });

  it('does not let one correct answer claim two of the same item', () => {
    render(<CourseExamPrep course={courseWith([recall])} />);
    startEverything();

    const blanks = screen.getAllByRole('textbox');
    blanks.forEach((b) => typeInto(b, 'risk control'));

    fireEvent.click(screen.getByRole('button', { name: /Check my recall/ }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it("reveals every item's explanation after a recall check, including missed ones", () => {
    render(<CourseExamPrep course={courseWith([recall])} />);
    startEverything();

    fireEvent.click(screen.getByRole('button', { name: /Check my recall/ }));
    for (const item of recall.items) {
      expect(screen.getByText(item.explain)).toBeInTheDocument();
    }
  });

  // The listing has to go through CodeBlock rather than into the question or
  // model-answer prose: those render as paragraphs, and CSS collapses runs of
  // spaces there, which would destroy the indentation that is the answer.
  it('shows a code question its stem listing, and withholds the answer listing', () => {
    const { container } = render(<CourseExamPrep course={courseWith([codeQuestion])} />);
    startEverything();

    expect(container.textContent).toContain('data = conn.recv(1024)');
    expect(container.textContent).not.toContain('# after the loop');

    answerThen('close() runs too early');
    expect(container.textContent).toContain('# after the loop');
  });

  it('offers a code-questions set only when the bank has some', () => {
    const { unmount } = render(<CourseExamPrep course={courseWith([longform, recall])} />);
    expect(screen.queryByRole('button', { name: /code questions/i })).not.toBeInTheDocument();
    unmount();

    render(<CourseExamPrep course={courseWith([longform, codeQuestion])} />);
    expect(screen.getByRole('button', { name: /code questions/i })).toBeInTheDocument();
  });
});

describe('the shipped CYB 122 written-exam bank', () => {
  it('is weighted towards the lectured sections 7-12', () => {
    const lectured = cyb122ExamPrep.filter(
      (q) => parseInt(q.source.replace('§', ''), 10) >= 7,
    );
    expect(lectured.length).toBeGreaterThan(cyb122ExamPrep.length / 2);
  });

  it('gives every longform question a mark scheme totalling its stated marks', () => {
    for (const q of cyb122ExamPrep.filter((x) => x.type === 'longform')) {
      const total = q.markScheme.reduce((sum, point) => {
        const m = point.match(/\(([0-9.]+)\)\s*$/);
        expect(m, `no mark value on "${point}"`).not.toBeNull();
        return sum + parseFloat(m[1]);
      }, 0);
      expect(total, `mark scheme for "${q.question}"`).toBeCloseTo(q.marks, 3);
    }
  });

  it('gives every recall drill one item per mark, each with an explanation', () => {
    for (const q of cyb122ExamPrep.filter((x) => x.type === 'recall')) {
      expect(q.items).toHaveLength(q.marks);
      for (const item of q.items) {
        expect(item.name).toBeTruthy();
        expect(item.explain).toBeTruthy();
      }
    }
  });
});

// Half of UUY-CYB 221's manual is twelve Python practicals, and students
// expect the paper to set "write / debug / explain this listing" questions on
// them. A bank that quietly stops at the theory is the failure mode this
// guards against, one practical at a time.
describe('the shipped UUY-CYB 221 written-exam bank', () => {
  const PRACTICAL_TOPICS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  it.each(PRACTICAL_TOPICS)('covers the practical in Topic %i', (topic) => {
    const questions = cyb221ExamPrep.filter((q) => q.source.startsWith(`Topic ${topic} ·`));
    expect(questions.length).toBeGreaterThan(0);
  });

  it('carries a listing on every practical question, in a named language', () => {
    for (const q of cyb221ExamPrep.filter((x) => x.code || x.modelCode)) {
      expect(q.type).toBe('longform');
      expect(q.language, `language missing on "${q.question}"`).toBeTruthy();
    }
  });
});
