// A student mid-quiz can step back to re-read a question they've already
// answered. The thing worth guarding is that revisiting doesn't disturb the
// score: answers are recorded by index and the score is derived from them, so
// walking back and forth over a question must count it exactly once.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../components/Quiz';

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

// Options are shuffled per attempt, so a test can't assume a position — find
// the button by the text of the option it needs.
const pick = (text) => fireEvent.click(screen.getByText(text).closest('button'));

describe('Quiz navigation', () => {
  it('has no Previous button on the first question', () => {
    render(<Quiz questions={questions} />);
    expect(screen.queryByRole('button', { name: /previous/i })).toBeNull();
  });

  it('steps back to an answered question with its answer and explanation intact', () => {
    render(<Quiz questions={questions} />);

    pick('443');
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    expect(screen.getByText('What does XSS stand for?')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByText('Which port does HTTPS use by default?')).toBeInTheDocument();
    // The earlier answer is still shown, feedback and all.
    expect(screen.getByText('HTTPS listens on 443.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument();
  });

  it('counts a revisited question once', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} />);

    pick('443');
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    pick('Cross-site scripting');
    fireEvent.click(screen.getByRole('button', { name: /see results/i }));

    // Third argument is the review-outcome list, empty without an itemIdFor prop.
    expect(onComplete).toHaveBeenCalledWith(2, 2, []);
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('keeps a locked answer locked when the student returns to it', () => {
    const onComplete = vi.fn();
    render(<Quiz questions={questions} onComplete={onComplete} />);

    pick('80'); // wrong
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    pick('443'); // too late — the answer was locked when it was given
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    pick('Cross-site scripting');
    fireEvent.click(screen.getByRole('button', { name: /see results/i }));

    expect(onComplete).toHaveBeenCalledWith(1, 2, []);
  });
});
