// FeedbackPrompt has no trigger button: it appears on its own once the student
// has used the app for a while, and must then stay gone. Two things carry the
// risk and are guarded here:
//
//   1. The gate. Appearing too early asks a student to rate something they
//      have not used; appearing again after a dismissal or a rating is the
//      nagging that makes people stop reading prompts at all.
//   2. The suppression record. It is the only thing standing between "asks
//      once a month" and "asks on every navigation", and localStorage can be
//      unavailable or corrupt, so both paths are exercised.
//
// Interaction goes through fireEvent rather than user-event, matching the
// other component tests — user-event is not a dependency of this project.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import FeedbackPrompt from '../components/FeedbackPrompt';

let mockUser = { id: 'u1' };
let mockAuthEnabled = true;
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, authEnabled: mockAuthEnabled }),
}));

const insertMock = vi.fn(() => Promise.resolve({ error: null }));
vi.mock('../lib/supabase', () => ({
  supabase: { from: () => ({ insert: (...args) => insertMock(...args) }) },
}));

const PROMPT_KEY = 'feedback-prompt-v1';
const SESSION_KEY = 'feedback-session-v1';
const MIN_SESSION_MS = 3 * 60 * 1000;

// The component counts distinct pathnames, so the harness needs real
// navigation. Each link visits a page the prompt should count.
const PAGES = ['/', '/courses', '/courses/ins-224', '/planner', '/tracks', '/profile'];

function Harness() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <nav>
        {PAGES.map((p) => <Link key={p} to={p}>go {p}</Link>)}
      </nav>
      <Routes>
        {PAGES.map((p) => <Route key={p} path={p} element={<div>page {p}</div>} />)}
      </Routes>
      <FeedbackPrompt />
    </MemoryRouter>
  );
}

// Navigate until `total` distinct pathnames have been seen this session —
// counting the entry page, since the component counts that one too.
const visitDistinctPages = (total) => {
  for (const p of PAGES.slice(1, total)) {
    fireEvent.click(screen.getByText(`go ${p}`));
  }
};

const panel = () => screen.queryByRole('dialog', { name: 'Feedback on Areté' });

beforeEach(() => {
  mockUser = { id: 'u1' };
  mockAuthEnabled = true;
  insertMock.mockClear();
  insertMock.mockImplementation(() => Promise.resolve({ error: null }));
  localStorage.clear();
  sessionStorage.clear();
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('FeedbackPrompt · when it appears', () => {
  it('stays hidden while the student has barely used the app', () => {
    render(<Harness />);
    visitDistinctPages(4);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS + 1000); });
    // Four distinct pages, one short of the threshold — so however long the
    // student lingers, it must not open.
    expect(panel()).not.toBeInTheDocument();
  });

  it('stays hidden when enough pages are seen but too quickly', () => {
    render(<Harness />);
    visitDistinctPages(5);
    expect(panel()).not.toBeInTheDocument();
  });

  it('appears once both the page count and the dwell time are met', () => {
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).toBeInTheDocument();
  });

  it('renders nothing when signed out', () => {
    mockUser = null;
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).not.toBeInTheDocument();
  });

  it('renders nothing when Supabase is not configured', () => {
    mockAuthEnabled = false;
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).not.toBeInTheDocument();
  });
});

describe('FeedbackPrompt · when it stays away', () => {
  it('does not ask again in the same session once dismissed', () => {
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });

    fireEvent.click(screen.getByRole('button', { name: 'Close feedback' }));
    expect(panel()).not.toBeInTheDocument();

    // Keep browsing: no second ask.
    fireEvent.click(screen.getByText('go /profile'));
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).not.toBeInTheDocument();
  });

  it('honours a dismissal from a previous session for 30 days, then asks again', () => {
    const dayMs = 24 * 60 * 60 * 1000;
    localStorage.setItem(PROMPT_KEY, JSON.stringify({ status: 'dismissed', at: Date.now() - 29 * dayMs }));
    const { unmount } = render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).not.toBeInTheDocument();
    unmount();

    localStorage.setItem(PROMPT_KEY, JSON.stringify({ status: 'dismissed', at: Date.now() - 31 * dayMs }));
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).toBeInTheDocument();
  });

  it('never asks a student who has already rated', () => {
    localStorage.setItem(PROMPT_KEY, JSON.stringify({ status: 'rated', at: 0 }));
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).not.toBeInTheDocument();
  });

  it('treats a corrupt record as never asked, rather than silencing itself', () => {
    localStorage.setItem(PROMPT_KEY, 'not json');
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).toBeInTheDocument();
  });

  // Progress towards the gate is kept in sessionStorage precisely so a reload
  // does not throw it away: a PWA cold start or a shared course link would
  // otherwise reset a student to zero every time, and they would never be
  // asked at all.
  it('carries page count and dwell time across a full page reload', () => {
    const { unmount } = render(<Harness />);
    visitDistinctPages(5);
    expect(panel()).not.toBeInTheDocument();

    // A reload: everything in memory goes, sessionStorage stays.
    unmount();
    expect(JSON.parse(sessionStorage.getItem(SESSION_KEY)).pages).toHaveLength(5);

    render(<Harness />);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
    expect(panel()).toBeInTheDocument();
  });

  it('closes on Escape and records the dismissal', () => {
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(panel()).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(PROMPT_KEY)).status).toBe('dismissed');
  });
});

describe('FeedbackPrompt · submitting', () => {
  const openPrompt = () => {
    render(<Harness />);
    visitDistinctPages(5);
    act(() => { vi.advanceTimersByTime(MIN_SESSION_MS); });
  };

  it('disables submit until a rating is picked', () => {
    openPrompt();
    const submit = screen.getByRole('button', { name: 'Send feedback' });
    expect(submit).toBeDisabled();

    fireEvent.click(screen.getByRole('radio', { name: '4 stars' }));
    expect(submit).not.toBeDisabled();
  });

  it('submits the rating and message, then shows a thank-you state', async () => {
    openPrompt();
    fireEvent.click(screen.getByRole('radio', { name: '5 stars' }));
    fireEvent.change(screen.getByLabelText('Feedback message'), {
      target: { value: 'Loving the AI Tutor.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send feedback' }));

    await waitFor(() => expect(screen.getByText('Thanks — that helps.')).toBeInTheDocument());

    expect(insertMock).toHaveBeenCalledWith({
      user_id: 'u1',
      rating: 5,
      message: 'Loving the AI Tutor.',
      // The page the student was on when they answered — the last one visited.
      page: '/tracks',
    });
    // Recorded on arrival, not on close — a reload before pressing Close must
    // not re-ask a student who has already answered.
    expect(JSON.parse(localStorage.getItem(PROMPT_KEY)).status).toBe('rated');
  });

  it('shows an error and keeps the draft when the insert fails', async () => {
    insertMock.mockImplementation(() => Promise.resolve({ error: new Error('boom') }));
    openPrompt();
    fireEvent.click(screen.getByRole('radio', { name: '3 stars' }));
    fireEvent.click(screen.getByRole('button', { name: 'Send feedback' }));

    await waitFor(() => expect(screen.getByText(/Couldn't send that/)).toBeInTheDocument());
    expect(screen.getByRole('radio', { name: '3 stars' })).toHaveAttribute('aria-checked', 'true');
    // A failed send is not an answer: nothing is recorded, so the student is
    // asked again rather than silenced by a network blip.
    expect(localStorage.getItem(PROMPT_KEY)).toBeNull();
  });
});
