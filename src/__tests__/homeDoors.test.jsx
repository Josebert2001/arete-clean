import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mocks = vi.hoisted(() => ({ auth: {} }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => mocks.auth }));
vi.mock('../components/ProgressDashboard', () => ({ default: () => null }));
vi.mock('../components/StudentDashboard', () => ({ default: () => <div>STUDENT DASHBOARD</div> }));
vi.mock('../components/IndependentLearningHome', () => ({ default: () => <div>INDEPENDENT HOME</div> }));

import Home from '../pages/Home';

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

describe('signed-out homepage', () => {
  beforeEach(() => {
    mocks.auth = { user: null, profile: null, authEnabled: true, authLoading: false };
  });

  it('asks one question with a door for each audience', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /UniUyo student/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /learning cybersecurity or coding/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Find my courses/ })).toHaveAttribute('href', '/courses');
    expect(screen.getByRole('link', { name: /Try a free exercise/ })).toHaveAttribute('href', '/cybersecurity');
  });

  it('signs a non-student up through the security entry, a student through the plain one', () => {
    renderHome();
    const signUps = screen.getAllByRole('link', { name: 'Create a free account' }).map(a => a.getAttribute('href'));
    expect(signUps).toEqual(['/signin', '/signin?learn=cybersecurity']);
  });

  it('no longer shows a level grid to someone who is not a student', () => {
    renderHome();
    expect(screen.queryByText(/Pick your level/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/SIWES/)).not.toBeInTheDocument();
  });

  it('hides the account links when sign-in is not configured', () => {
    mocks.auth = { user: null, profile: null, authEnabled: false, authLoading: false };
    renderHome();
    expect(screen.queryByRole('link', { name: 'Create a free account' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Find my courses/ })).toBeInTheDocument();
  });

  it.each([
    [{ learning_mode: 'independent' }, 'INDEPENDENT HOME'],
    [{ learning_mode: 'university', department: 'cybersecurity', level: 200 }, 'STUDENT DASHBOARD'],
  ])('sends a signed-in %j to their own home', (profile, text) => {
    mocks.auth = { user: { id: 'u' }, profile, authEnabled: true, authLoading: false };
    renderHome();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
