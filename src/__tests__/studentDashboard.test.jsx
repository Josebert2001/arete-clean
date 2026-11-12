import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentDashboard from '../components/StudentDashboard';

const mocks = vi.hoisted(() => ({ progress: {}, profile: null }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ profile: mocks.profile }) }));
vi.mock('../context/StudyDaysContext', () => ({ useStudyDays: () => ({ days: [] }) }));
vi.mock('../components/useProgress', () => ({
  useProgress: (key) => ({ progress: mocks.progress[key] || {} }),
}));
vi.mock('../components/ReviewDueCard', () => ({ default: () => null }));
vi.mock('../components/GettingStartedCard', () => ({ default: () => <div>Getting started</div> }));
vi.mock('../utils/gettingStarted', () => ({
  shouldShowGettingStarted: () => false, readDismissed: () => true, writeDismissed: () => {},
}));
vi.mock('../utils/lastLocation', () => ({ readLastLocation: () => null }));
vi.mock('../components/useReadingProgress', () => ({
  READING_STORAGE_KEY: 'reading', readTopicTotal: (p) => p.topics || 0, readCourseCount: (p) => p.courses || 0,
}));

beforeEach(() => {
  mocks.progress = {};
  mocks.profile = { id: 'u1', full_name: 'Ada Lovelace', level: '300', department: 'cybersecurity' };
});

const renderDash = () => render(<MemoryRouter><StudentDashboard /></MemoryRouter>);

describe('StudentDashboard', () => {
  it('links to the student\'s own level and leaves tools to the nav', () => {
    renderDash();
    expect(screen.getByRole('link', { name: /Your 300L courses/ })).toHaveAttribute('href', '/courses?level=300');
    expect(screen.queryByText('Tools')).not.toBeInTheDocument();
    expect(screen.queryByText(/Today.s challenge/)).not.toBeInTheDocument();
  });

  it('folds reading progress into the courses card', () => {
    mocks.progress.reading = { topics: 4, courses: 2 };
    renderDash();
    expect(screen.getByRole('link', { name: /4 lecture-note topics read across 2 courses/ })).toBeInTheDocument();
  });

  it('copes with a profile that has no level', () => {
    mocks.profile = { ...mocks.profile, level: null };
    renderDash();
    expect(screen.getByRole('link', { name: /Your courses/ })).toHaveAttribute('href', '/courses');
  });
});
