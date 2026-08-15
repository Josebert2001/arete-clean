// The dashboard's only entry point to /review. Two things matter: it must not
// shout at a student who has nothing tracked, and it must never pull a course
// catalogue — the dashboard renders on every visit.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewDueCard from '../components/ReviewDueCard';
import { REVIEW_STORAGE_KEY, dayIndex, LEECH_THRESHOLD } from '../utils/reviewSchedule';

// Ids carry their kind — the card counts only what /review can actually offer.
const Q = (n) => `q:uuy-cyb-222:mcq${n}`;
const X = (n) => `x:uuy-cyb-222:written${n}`;

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
      [Q(1)]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [Q(2)]: { b: 2, d: today - 3, n: 2, l: 0, t: 1 },
      [Q(3)]: { b: 4, d: today + 12, n: 5, l: 0, t: 1 },
    });
    renderCard();

    expect(screen.getByText('2 questions due for review')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/review');
  });

  it('uses the singular for a single due question', () => {
    seed({ [Q(1)]: { b: 1, d: dayIndex(), n: 1, l: 0, t: 1 } });
    renderCard();
    expect(screen.getByText('1 question due for review')).toBeInTheDocument();
  });

  it('stays calm and reports the tracked count when nothing is due', () => {
    const today = dayIndex();
    seed({
      [Q(1)]: { b: 4, d: today + 10, n: 5, l: 0, t: 1 },
      [Q(2)]: { b: 3, d: today + 2, n: 3, l: 0, t: 1 },
    });
    renderCard();

    expect(screen.getByText('Nothing due right now')).toBeInTheDocument();
    expect(screen.getByText('2 questions being tracked')).toBeInTheDocument();
  });

  it('does not count leeches, so the card agrees with the queue', () => {
    const today = dayIndex();
    seed({
      [Q(1)]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [Q(2)]: { b: 1, d: today, n: 30, l: LEECH_THRESHOLD, t: 1 },
    });
    renderCard();
    expect(screen.getByText('1 question due for review')).toBeInTheDocument();
  });

  it('ignores written questions, which /review does not yet offer in a session', () => {
    const today = dayIndex();
    seed({
      [Q(1)]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [X(1)]: { b: 1, d: today, n: 1, l: 0, t: 1 },
      [X(2)]: { b: 1, d: today, n: 1, l: 0, t: 1 },
    });
    renderCard();
    // Promising 3 and handing over 1 is the failure this guards against.
    expect(screen.getByText('1 question due for review')).toBeInTheDocument();
  });

  it('stays hidden when the only tracked items are kinds it does not count', () => {
    seed({ [X(1)]: { b: 1, d: dayIndex(), n: 1, l: 0, t: 1 } });
    const { container } = renderCard();
    expect(container).toBeEmptyDOMElement();
  });

  it('never loads a course catalogue for its count', () => {
    seed({ [Q(1)]: { b: 1, d: dayIndex(), n: 1, l: 0, t: 1 } });
    renderCard();
    expect(catalogueSpy).not.toHaveBeenCalled();
  });
});
