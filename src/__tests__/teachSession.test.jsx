import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeachSession from '../pages/TeachSession';

const mocks = vi.hoisted(() => ({
  state: { session: null, rpcCalls: [] },
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'lec' }, authLoading: false }),
}));

const offering = { id: 'o1', course_code: 'CYB 224', level: '200L', academic_session: '2026/2027' };
vi.mock('../components/useLecturer', () => ({
  useLecturer: () => ({ status: 'ready', role: 'lecturer', isLecturer: true, offerings: [offering] }),
}));

// class_sessions rehydrate → maybeSingle(); attendance_records → awaited list.
function query() {
  const q = {
    select: () => q, eq: () => q, gt: () => q, order: () => q,
    maybeSingle: async () => ({ data: mocks.state.session, error: null }),
    then: (resolve) => resolve({ data: [], error: null }),
  };
  return q;
}

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => query(),
    rpc: async (name) => { mocks.state.rpcCalls.push(name); return { data: true, error: null }; },
  },
}));

const base = { id: 's1', offering_id: 'o1', status: 'open', checkin_code: 'K7QX' };

beforeEach(() => { mocks.state.rpcCalls = []; });

describe('TeachSession', () => {
  it('shows the code for the projector while check-in is open', async () => {
    mocks.state.session = { ...base, closes_at: new Date(Date.now() + 3 * 60000).toISOString() };
    render(<TeachSession />);
    expect(await screen.findByText('K7QX')).toBeInTheDocument();
    expect(screen.getByText('Show this code on the projector')).toBeInTheDocument();
    expect(screen.getByText(/check-in closes in [23]:\d\d/)).toBeInTheDocument();
  });

  it('replaces the code with an ended state once the window has passed', async () => {
    mocks.state.session = { ...base, closes_at: new Date(Date.now() - 1000).toISOString() };
    render(<TeachSession />);
    expect(await screen.findByText('Check-in window has ended')).toBeInTheDocument();
    expect(screen.queryByText('K7QX')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Extend 5 minutes' })).toBeInTheDocument();
  });
});
