import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

const mocks = vi.hoisted(() => ({ plan: {}, user: null, profile: null }));
vi.mock('../context/PlanContext', () => ({ usePlan: () => mocks.plan }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: mocks.user, profile: mocks.profile, authEnabled: false }),
}));
vi.mock('../components/useLecturer', () => ({
  useLecturer: () => ({ isLecturer: false, role: null, repScope: null }),
}));
vi.mock('../components/ThemeToggle', () => ({ default: () => null }));

beforeEach(() => {
  mocks.plan = { status: 'ready', enabled: true, isPremium: false };
  mocks.user = { id: 'student' };
  mocks.profile = null;
});

describe('Navbar Premium link', () => {
  it.each(['/career', '/career-quiz', '/career/practice/blue'])(
    'keeps Careers (under More) active for %s while preserving existing navigation',
    (pathname) => {
      render(
        <MemoryRouter initialEntries={[pathname]}>
          <Navbar />
        </MemoryRouter>,
      );
      // Not in the main row while career saving is off; More lights up instead.
      expect(screen.queryByRole('link', { name: 'Careers' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /More/ })).toHaveClass('bg-ink', 'text-cream');
      fireEvent.click(screen.getByRole('button', { name: /More/ }));
      expect(screen.getByRole('link', { name: 'Careers' })).toHaveAttribute('href', '/careers');
      expect(screen.getByRole('link', { name: 'Careers' })).toHaveClass('bg-ink', 'text-cream');
      fireEvent.click(screen.getByRole('button', { name: /More/ }));
      expect(screen.getByRole('link', { name: 'Courses' })).toHaveAttribute('href', '/courses');
      expect(screen.getByRole('link', { name: 'Code Lab' })).toHaveAttribute('href', '/lab');
      fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
      // The phone menu lists it in its More section.
      expect(screen.getAllByRole('link', { name: 'Careers' })).toHaveLength(1);
      expect(screen.getAllByRole('link', { name: 'Premium' })).toHaveLength(2);
    },
  );
  it.each([true, false])('offers Premium in both menus (signed in: %s)', (signedIn) => {
    if (!signedIn) mocks.user = null;
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Premium' })).toHaveAttribute('href', '/premium');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    expect(screen.getAllByRole('link', { name: 'Premium' })).toHaveLength(2);
  });

  it.each([{ enabled: false }, { isPremium: true }, { status: 'loading' }, { status: 'error' }])(
    'hides the offer for %j',
    (state) => {
      Object.assign(mocks.plan, state);
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
      expect(screen.queryByRole('link', { name: 'Premium' })).not.toBeInTheDocument();
    },
  );
});

describe('Navbar layout', () => {
  it('keeps occasional links out of the main row, under More', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Courses' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Check In' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /More/ }));
    for (const name of ['Check In', 'My Attendance', 'Study Planner', 'Campus Places']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
  });

  it('shows the Cybersecurity landing link only to signed-out visitors', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.queryByRole('link', { name: 'Cybersecurity' })).not.toBeInTheDocument();
  });

  it('keeps a signed-out visitor\'s lone extra link under More, so their longer row fits', () => {
    mocks.user = null;
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Cybersecurity' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Campus Places' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /More/ }));
    expect(screen.getByRole('link', { name: 'Campus Places' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Check In' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Study Planner' })).not.toBeInTheDocument();
  });

  it('gives an independent learner no university links', () => {
    mocks.profile = { learning_mode: 'independent', department: 'general', level: null };
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.queryByRole('link', { name: 'Courses' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Code Lab' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /More/ }));
    for (const name of ['Check In', 'My Attendance', 'Campus Places']) {
      expect(screen.queryByRole('link', { name })).not.toBeInTheDocument();
    }
  });
});
