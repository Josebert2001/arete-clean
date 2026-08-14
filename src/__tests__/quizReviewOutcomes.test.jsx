// Quiz reports per-item outcomes so the review scheduler can record what a
// student actually got right. The things worth guarding: an id built inside the
// quiz must match one built from the source bank (options are reshuffled every
// attempt), outcomes must survive stepping back and forth, and a caller that
// does not opt in must be completely unaffected.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../components/Quiz';
import { quizItemId } from '../utils/reviewSchedule';

const questions = [
  {
    question: 'Which port does HTTPS use by default?',
    options: ['443', '80'],
    correctIndex: 0,
    explanation: 'HTTPS listens on 443.',
  },
  {
    question: 'What does XSS stand for?',
    options: ['Cross-site scripting', 'Extended style sheets'],
    correctIndex: 0,
    explanation: 'Cross-site scripting injects script into a page.',
  },
];

// Options are shuffled per attempt, so find the button by its option text.
const pick = (text) => fireEvent.click(screen.getByText(text).closest('button'));
const advance = () => fireEvent.click(screen.getByRole('button', { name: /next question|see results/i }));

const idFor = (q) => quizItemId('uuy-cyb-222', q);

describe('Quiz review outcomes', () => {
  it('reports one outcome per question, keyed by item id', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} itemIdFor={idFor} />);

    pick('443');
    advance();
    pick('Cross-site scripting');
    advance();

    const [, , outcomes] = onComplete.mock.calls[0];
    expect(outcomes).toHaveLength(2);
    expect(outcomes.every((o) => o.correct)).toBe(true);
  });

  it('builds ids that match ones built from the source bank', () => {
    // Force shuffleOptions to actually reorder every question: with two options
    // its Fisher-Yates swaps only when random() < 0.5, so without this the test
    // could pass on an attempt where nothing moved and never exercise the sort.
    const random = vi.spyOn(Math, 'random').mockReturnValue(0);
    try {
      const onComplete = vi.fn();
      render(<Quiz questions={questions} onComplete={onComplete} itemIdFor={idFor} />);

      // Options are now rendered in reverse declaration order.
      expect(screen.getAllByRole('button')[0]).toHaveTextContent('80');

      pick('443');
      advance();
      pick('Cross-site scripting');
      advance();

      const [, , outcomes] = onComplete.mock.calls[0];
      // Ids still line up with the source bank, because quizItemId sorts a
      // question's options before hashing them.
      const fromBank = questions.map((q) => idFor(q)).sort();
      expect(outcomes.map((o) => o.id).sort()).toEqual(fromBank);
    } finally {
      random.mockRestore();
    }
  });

  it('marks a wrong answer as not correct', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} itemIdFor={idFor} />);

    pick('80');                       // wrong
    advance();
    pick('Cross-site scripting');     // right
    advance();

    const [, , outcomes] = onComplete.mock.calls[0];
    const byId = Object.fromEntries(outcomes.map((o) => [o.id, o.correct]));
    expect(byId[idFor(questions[0])]).toBe(false);
    expect(byId[idFor(questions[1])]).toBe(true);
  });

  it('records a revisited question once, with its original answer', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} itemIdFor={idFor} />);

    pick('443');
    advance();
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    advance();                        // forward again; the answer is locked
    pick('Extended style sheets');    // wrong
    advance();

    const [score, total, outcomes] = onComplete.mock.calls[0];
    expect(score).toBe(1);
    expect(total).toBe(2);
    expect(outcomes).toHaveLength(2);
    expect(outcomes.filter((o) => o.correct)).toHaveLength(1);
  });

  it('reports outcomes exactly once, at the end of the attempt', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} itemIdFor={idFor} />);

    pick('443');
    advance();
    expect(onComplete).not.toHaveBeenCalled();   // nothing written mid-quiz

    pick('Cross-site scripting');
    advance();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('passes an empty outcome list when the caller does not opt in', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} />);

    pick('443');
    advance();
    pick('Cross-site scripting');
    advance();

    const [score, total, outcomes] = onComplete.mock.calls[0];
    expect(score).toBe(2);
    expect(total).toBe(2);
    expect(outcomes).toEqual([]);
  });
});
