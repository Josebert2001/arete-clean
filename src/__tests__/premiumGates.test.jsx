// The client-side free-tier gates: a free student gets FREE_DAILY_LIMITS.quiz
// starts a day and then an upgrade card instead of the length picker. Premium,
// and any state where billing is not confirmed on, must never see a gate.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PREMIUM_PASS, FREE_DAILY_LIMITS } from '../data/plans';

const plan = vi.hoisted(() => ({ value: null }));
vi.mock('../context/PlanContext', () => ({ usePlan: () => plan.value }));

import CourseQuiz from '../components/CourseQuiz';

const q = (question) => ({ question, options: ['Yes', 'No'], correctIndex: 0, explanation: 'Because.' });
const course = { slug: 'gate-101', code: 'GATE 101', quiz: [q('One?'), q('Two?'), q('Three?')] };

const renderQuiz = () => render(<MemoryRouter><CourseQuiz course={course} /></MemoryRouter>);
const backToPicker = () => fireEvent.click(screen.getByRole('button', { name: /back to the question picker/i }));

describe('quiz gate', () => {
  beforeEach(() => {
    localStorage.clear();
    plan.value = { gatesActive: true, isPremium: false, pass: PREMIUM_PASS };
  });

  it('counts down the free starts, then shows the upgrade card', () => {
    renderQuiz();
    const limit = FREE_DAILY_LIMITS.quiz;
    expect(screen.getByText(new RegExp(`${limit} of ${limit} free quizzes left today`))).toBeInTheDocument();

    for (let i = 0; i < limit; i++) {
      fireEvent.click(screen.getByRole('button', { name: /full · all 3 questions/i }));
      backToPicker();
    }

    expect(screen.getByText(new RegExp(`used today's ${limit} free practice quizzes`, 'i'))).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /full · all/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get premium · ₦2,500/i })).toHaveAttribute('href', '/premium');
  });

  it('never gates when billing is not confirmed on or the student is Premium', () => {
    plan.value = { gatesActive: false, isPremium: true, pass: PREMIUM_PASS };
    renderQuiz();
    for (let i = 0; i < FREE_DAILY_LIMITS.quiz + 2; i++) {
      fireEvent.click(screen.getByRole('button', { name: /full · all 3 questions/i }));
      backToPicker();
    }
    expect(screen.queryByText(/free quizzes left/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /full · all 3 questions/i })).toBeInTheDocument();
    expect(localStorage.getItem('arete-daily-usage-v1')).toBeNull();
  });
});
