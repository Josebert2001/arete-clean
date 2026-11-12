import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { trackMeta } from '../data/trackMeta';

const mocks = vi.hoisted(() => ({ profile: null }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: null, profile: mocks.profile }) }));
vi.mock('../lib/supabase', () => ({ supabase: null }));

import CodeLab from '../pages/CodeLab';

const open = () => render(<MemoryRouter><CodeLab /></MemoryRouter>);
const shelf = name => screen.getByRole('region', { name });
const cardTitles = region => within(region).getAllByRole('heading', { level: 3 }).map(h => h.textContent);
const total = Object.values(trackMeta).reduce((sum, t) => sum + t.moduleCount, 0);

beforeEach(() => {
  localStorage.clear();
  mocks.profile = null;
});

describe('Code Lab catalogue', () => {
  it('shows a shelf per path with a four-card preview and a starting point for a new learner', () => {
    open();
    for (const track of Object.values(trackMeta)) {
      expect(cardTitles(shelf(track.label))).toHaveLength(4);
    }
    expect(screen.getByText('Start here')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start here.*Java Foundations.*Begin/s })).toHaveAttribute('href', '/tracks/java/foundations');
    expect(screen.getByRole('link', { name: /All 12 rooms in order/ })).toHaveAttribute('href', '/tracks/security');
    expect(screen.getByRole('link', { name: /Cheatsheets/ })).toHaveAttribute('href', '/cheatsheet');
  });

  it('narrows to one path and shows all of it', () => {
    open();
    fireEvent.click(screen.getByRole('button', { name: 'Security' }));
    expect(screen.getByRole('button', { name: 'Security' })).toHaveAttribute('aria-pressed', 'true');
    expect(cardTitles(shelf('Security'))).toHaveLength(12);
    expect(screen.queryByRole('region', { name: 'Java' })).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(`12 of ${total} modules match.`);
  });

  it('filters by level across every path, and recovers from a combination with no match', () => {
    open();
    fireEvent.click(screen.getByRole('button', { name: 'Advanced' }));
    const shown = screen.getAllByRole('heading', { level: 3 });
    expect(shown.length).toBeGreaterThan(0);
    expect(shown.length).toBeLessThan(total);
    expect(screen.queryByText('Beginner', { selector: 'span' })).not.toBeInTheDocument();

    expect(shown).toHaveLength(5);
    expect(screen.queryByRole('region', { name: 'Python' })).not.toBeInTheDocument();

    // Python has no Advanced module: the page says so and offers the way back.
    fireEvent.click(screen.getByRole('button', { name: 'Python' }));
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0);
    expect(screen.getByText('No module matches that path and level together.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show everything' }));
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(16);
    expect(screen.getByRole('button', { name: 'All paths' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('offers to continue a started module and shows its step progress', () => {
    localStorage.setItem('mission-steps-v1', JSON.stringify({ completedModules: ['sec-hashing#learn-1', 'sec-hashing#check'], quizScores: {} }));
    localStorage.setItem(trackMeta.security.storageKey, JSON.stringify({ completedModules: ['sec-intro', 'sec-encoding', 'sec-classical-crypto'], quizScores: {} }));
    open();
    const resume = screen.getByRole('link', { name: /Pick up where you left off/ });
    expect(resume).toHaveAttribute('href', '/tracks/security/sec-hashing');
    expect(resume).toHaveTextContent('room 4 of 12');
    expect(resume).toHaveTextContent('2 of');
    const security = shelf('Security');
    expect(cardTitles(security)[0]).toBe('Hashing & File Integrity');
    expect(within(security).getByText(/In progress · 2 of \d+ steps/)).toBeInTheDocument();
    expect(within(security).getByText(/3 of 12 done/)).toBeInTheDocument();
    expect(screen.getByText(/You have completed 3\./)).toBeInTheDocument();
  });

  it('puts Security first for an independent learner', () => {
    mocks.profile = { learning_mode: 'independent' };
    open();
    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Security');
    expect(screen.getByRole('link', { name: /Start here/ })).toHaveAttribute('href', '/tracks/security/sec-intro');
  });
});
