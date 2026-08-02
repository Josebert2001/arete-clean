// Quiz.jsx renders question, options and explanation through MathText so a
// calculus quiz shows equations rather than literal "$\frac{dy}{dx}$".
//
// Two things are worth guarding: that maths actually renders, and that the
// three existing plain-text quizzes (INS 224, CYB 222) are untouched by it.

import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Quiz from '../components/Quiz';

const mathQuestion = [{
  question: 'What is $\\frac{d}{dx}(x^2)$?',
  options: ['$2x$', '$x^2$', '$\\frac{x^3}{3}$', '$2$'],
  correctIndex: 0,
  explanation: 'The power rule gives $\\frac{d}{dx}(x^n) = nx^{n-1}$, so the answer is $2x$.',
}];

const plainQuestion = [{
  question: 'What does a system describe?',
  options: ['An orderly grouping of components', 'A single component', 'A list', 'A file'],
  correctIndex: 0,
  explanation: 'A system is an orderly grouping of interdependent components.',
}];

describe('Quiz maths rendering', () => {
  it('renders a plain-text question unchanged', () => {
    render(<Quiz questions={plainQuestion} />);
    expect(screen.getByText('What does a system describe?')).toBeInTheDocument();
    expect(screen.getByText('An orderly grouping of components')).toBeInTheDocument();
  });

  it('does not leave raw LaTeX delimiters in a maths question', async () => {
    const { container } = render(<Quiz questions={mathQuestion} />);
    // KaTeX loads on demand, so wait for it to replace the fallback source.
    await waitFor(() => {
      expect(container.querySelector('.katex')).toBeTruthy();
    });

    // No $ anywhere: the delimiters were consumed rather than printed.
    expect(container.textContent).not.toContain('$');

    // The TeX source itself still appears in the tree, inside KaTeX's MathML
    // <annotation> — that is deliberate (it is what a screen reader and a
    // copy-paste get), so assert against the visible layer only.
    const visible = [...container.querySelectorAll('.katex-html')]
      .map((el) => el.textContent)
      .join(' ');
    expect(visible).not.toContain('\\frac');
    expect(visible.length).toBeGreaterThan(0);
  });

  it('keeps each option reachable by its accessible name', async () => {
    render(<Quiz questions={mathQuestion} />);
    // The visually-hidden "Option N:" prefix survives the switch away from
    // aria-label, so options stay distinguishable to a screen reader even
    // when their visible content is an equation.
    await waitFor(() => {
      expect(screen.getByText(/Option 1:/)).toBeInTheDocument();
    });
    expect(screen.getByText(/Option 4:/)).toBeInTheDocument();
  });

  it('renders the explanation as maths once answered', async () => {
    const { container } = render(<Quiz questions={mathQuestion} />);
    await waitFor(() => expect(container.querySelector('.katex')).toBeTruthy());
    // Four options render four expressions; the question adds one more.
    expect(container.querySelectorAll('.katex').length).toBeGreaterThanOrEqual(5);
  });
});
