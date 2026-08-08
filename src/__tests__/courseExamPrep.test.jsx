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

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseExamPrep from '../components/CourseExamPrep';
import { cyb122ExamPrep } from '../data/lectureNotes/cyb122ExamPrep';

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

const courseWith = (examPrep) => ({ slug: 'test-course', code: 'TST 101', examPrep });

// The picker sits in front of every question, so each test starts a set first.
const startEverything = () =>
  fireEvent.click(screen.getByRole('button', { name: /Everything/ }));

const typeInto = (input, value) => fireEvent.change(input, { target: { value } });

describe('CourseExamPrep', () => {
  it('renders nothing for a course with no examPrep bank', () => {
    const { container } = render(<CourseExamPrep course={courseWith([])} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('hides the model answer until the student asks to reveal it', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();

    expect(screen.getByText(longform.question)).toBeInTheDocument();
    expect(screen.queryByText(longform.modelAnswer)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Reveal model answer/ }));
    expect(screen.getByText(longform.modelAnswer)).toBeInTheDocument();
  });

  it('awards the marks carried by each ticked mark-scheme point', () => {
    render(<CourseExamPrep course={courseWith([longform])} />);
    startEverything();
    fireEvent.click(screen.getByRole('button', { name: /Reveal model answer/ }));

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
