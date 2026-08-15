// The /review page's job is to show the right state: nothing tracked yet,
// caught up, or work due. The queue maths is covered in reviewSchedule.test.js —
// what is worth guarding here is that the page reads the stored item map, wires
// a session to <Quiz>, and never renders a stale catalogue.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Review from '../pages/Review';
import { REVIEW_STORAGE_KEY, quizItemId, dayIndex } from '../utils/reviewSchedule';

const mcq = (question) => ({ question, options: ['right', 'wrong'], correctIndex: 0 });

const courses = [
  { slug: 'uuy-cyb-222', code: 'UUY-CYB 222', title: 'Web Security', quiz: [mcq('What is XSS?'), mcq('What is CSRF?')] },
];

let authValue = { profile: null, user: { id: 'u1' } };
let catalogueValue = { catalogue: { courses }, department: { status: 'full' }, status: 'ready' };

vi.mock('../context/AuthContext', () => ({
  useAuth: () => authValue,
}));
vi.mock('../data/useCatalogue', () => ({
  useCatalogue: () => catalogueValue,
}));
// The page only needs localStorage-backed progress here; the Supabase half of
// useProgress is inert without a client.
vi.mock('../lib/supabase', () => ({ supabase: null }));

const renderPage = () => render(<MemoryRouter><Review /></MemoryRouter>);

const seed = (map) => localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify({ items: map }));

beforeEach(() => {
  localStorage.clear();
  authValue = { profile: null, user: { id: 'u1' } };
  catalogueValue = { catalogue: { courses }, department: { status: 'full' }, status: 'ready' };
});
afterEach(() => localStorage.clear());

describe('Review page', () => {
  it('offers a starter set to a student with no history at all', () => {
    // A queue is due work plus a capped intake of unseen questions, so a brand
    // new student gets something to do rather than an empty page.
    renderPage();
    expect(screen.getByRole('button', { name: /start 2 questions/i })).toBeInTheDocument();
    expect(screen.getByText(/questions you haven't seen yet/i)).toBeInTheDocument();
  });

  it('says there is nothing when no course has a bank', () => {
    catalogueValue = { catalogue: { courses: [{ slug: 'phy-128', code: 'PHY 128' }] }, department: { status: 'full' }, status: 'ready' };
    renderPage();
    expect(screen.getByText(/nothing to review yet/i)).toBeInTheDocument();
  });

  it('reports being caught up once everything is scheduled ahead', () => {
    const today = dayIndex();
    seed({
      [quizItemId('uuy-cyb-222', courses[0].quiz[0])]: { b: 3, d: today + 5, n: 2, l: 0, t: 1 },
      [quizItemId('uuy-cyb-222', courses[0].quiz[1])]: { b: 4, d: today + 20, n: 3, l: 0, t: 1 },
    });
    renderPage();
    expect(screen.getByText(/you're caught up/i)).toBeInTheDocument();
  });

  it('offers a session when work is due', () => {
    const today = dayIndex();
    seed({
      [quizItemId('uuy-cyb-222', courses[0].quiz[0])]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [quizItemId('uuy-cyb-222', courses[0].quiz[1])]: { b: 4, d: today + 20, n: 3, l: 0, t: 1 },
    });
    renderPage();
    // Only the due one is offered; the other is scheduled well ahead.
    expect(screen.getByRole('button', { name: /start 1 question/i })).toBeInTheDocument();
    expect(screen.getByText(/1 due for review/i)).toBeInTheDocument();
  });

  it('names the real session length when new questions top up the due ones', () => {
    const today = dayIndex();
    seed({ [quizItemId('uuy-cyb-222', courses[0].quiz[0])]: { b: 1, d: today, n: 1, l: 0, t: 1 } });
    renderPage();
    // 1 due + 1 never-seen. Labelling from the due count alone would promise 1
    // question and then hand over 2.
    expect(screen.getByRole('button', { name: /start 2 questions/i })).toBeInTheDocument();
    expect(screen.getByText(/1 due for review, plus 1 you haven't seen yet/i)).toBeInTheDocument();
  });

  it('starts a session that renders the due question', () => {
    const today = dayIndex();
    seed({
      [quizItemId('uuy-cyb-222', courses[0].quiz[1])]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [quizItemId('uuy-cyb-222', courses[0].quiz[0])]: { b: 4, d: today + 20, n: 3, l: 0, t: 1 },
    });
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /start 1 question/i }));
    expect(screen.getByText('What is CSRF?')).toBeInTheDocument();
  });

  it('records the session and reports it on finish', () => {
    const today = dayIndex();
    const id = quizItemId('uuy-cyb-222', courses[0].quiz[0]);
    seed({
      [id]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [quizItemId('uuy-cyb-222', courses[0].quiz[1])]: { b: 4, d: today + 20, n: 3, l: 0, t: 1 },
    });
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /start 1 question/i }));
    fireEvent.click(screen.getByText('right').closest('button'));
    fireEvent.click(screen.getByRole('button', { name: /see results/i }));

    expect(screen.getByText(/session saved/i)).toBeInTheDocument();
    // Answered correctly, so it advanced a box and is no longer due today.
    const stored = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY));
    expect(stored.items[id].b).toBe(2);
    expect(stored.items[id].d).toBeGreaterThan(today);
  });

  it('surfaces repeatedly-missed items as reading rather than queueing them', () => {
    const today = dayIndex();
    seed({
      [quizItemId('uuy-cyb-222', courses[0].quiz[0])]: { b: 1, d: today, n: 30, l: 8, t: 1 },
      [quizItemId('uuy-cyb-222', courses[0].quiz[1])]: { b: 4, d: today + 20, n: 3, l: 0, t: 1 },
    });
    renderPage();

    expect(screen.getByText(/worth re-reading/i)).toBeInTheDocument();
    expect(screen.getByText('What is XSS?')).toBeInTheDocument();
    // A leech is withheld from the queue, so there is no session to start.
    expect(screen.queryByRole('button', { name: /start \d+ question/i })).toBeNull();
  });

  it('shows a load failure instead of an empty page', () => {
    catalogueValue = { catalogue: null, department: null, status: 'error' };
    renderPage();
    expect(screen.getByText(/didn't download/i)).toBeInTheDocument();
  });

  it('waits rather than rendering an empty pool while the catalogue loads', () => {
    catalogueValue = { catalogue: null, department: null, status: 'loading' };
    renderPage();
    expect(screen.getByText(/loading your courses/i)).toBeInTheDocument();
    expect(screen.queryByText(/nothing to review yet/i)).toBeNull();
  });

  it('respects foundation pins so a student is not drilled on courses they do not take', () => {
    authValue = { profile: { selected_courses: ['gst-111'] }, user: { id: 'u1' } };
    catalogueValue = { catalogue: { courses }, department: { status: 'foundation' }, status: 'ready' };
    renderPage();
    // uuy-cyb-222 is not pinned, so nothing is in the pool at all.
    expect(screen.getByText(/nothing to review yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start \d+ question/i })).toBeNull();
  });
});
