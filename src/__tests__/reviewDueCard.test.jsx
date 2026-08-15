// The dashboard's only entry point to /review. Two things matter: it must not
// shout at a student who has nothing tracked, and it must never pull a course
// catalogue — the dashboard renders on every visit.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewDueCard from '../components/ReviewDueCard';
import { REVIEW_STORAGE_KEY, dayIndex, LEECH_THRESHOLD } from '../utils/reviewSchedule';

vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'u1' } }) }));
vi.mock('../lib/supabase', () => ({ supabase: null }));

// Fails the test rather than the render if the card ever reaches for a
// catalogue: useCatalogue would pull the whole department course list.
const catalogueSpy = vi.fn();
vi.mock('../data/useCatalogue', () => ({
  useCatalogue: (...args) => {
    catalogueSpy(...args);
    return { catalogue: null, department: null, status: 'loading' };
  },
}));

const seed = (map) => localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify({ items: map }));
const renderCard = () => render(<MemoryRouter><ReviewDueCard /></MemoryRouter>);

beforeEach(() => {
  localStorage.clear();
  catalogueSpy.mockClear();
});
afterEach(() => localStorage.clear());

describe('ReviewDueCard', () => {
  it('renders nothing before the student has answered anything', () => {
    const { container } = renderCard();
    expect(container).toBeEmptyDOMElement();
  });

  it('counts what is due and links to the queue', () => {
    const today = dayIndex();
    seed({
      a: { b: 1, d: today, n: 1, l: 0, t: 1 },
      b: { b: 2, d: today - 3, n: 2, l: 0, t: 1 },
      c: { b: 4, d: today + 12, n: 5, l: 0, t: 1 },
    });
    renderCard();

    expect(screen.getByText('2 questions due for review')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/review');
  });

  it('uses the singular for a single due question', () => {
    seed({ a: { b: 1, d: dayIndex(), n: 1, l: 0, t: 1 } });
    renderCard();
    expect(screen.getByText('1 question due for review')).toBeInTheDocument();
  });

  it('stays calm and reports the tracked count when nothing is due', () => {
    const today = dayIndex();
    seed({
      a: { b: 4, d: today + 10, n: 5, l: 0, t: 1 },
      b: { b: 3, d: today + 2, n: 3, l: 0, t: 1 },
    });
    renderCard();

    expect(screen.getByText('Nothing due right now')).toBeInTheDocument();
    expect(screen.getByText('2 questions being tracked')).toBeInTheDocument();
  });

  it('does not count leeches, so the card agrees with the queue', () => {
    const today = dayIndex();
    seed({
      a: { b: 1, d: today, n: 1, l: 0, t: 1 },
      leech: { b: 1, d: today, n: 30, l: LEECH_THRESHOLD, t: 1 },
    });
    renderCard();
    expect(screen.getByText('1 question due for review')).toBeInTheDocument();
  });

  it('never loads a course catalogue for its count', () => {
    seed({ a: { b: 1, d: dayIndex(), n: 1, l: 0, t: 1 } });
    renderCard();
    expect(catalogueSpy).not.toHaveBeenCalled();
  });
});
