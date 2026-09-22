import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckIn from '../pages/CheckIn';

const mocks = vi.hoisted(() => ({
  state: {
    sessions: [],
    rpcResult: { data: [{ ok: true, message: 'Checked in. You are marked present.', flagged: false }], error: null },
    // Stable reference: loadOpen's useCallback depends on `user`, so a fresh
    // object on every render would recreate it every render and loop forever.
    user: { id: 'u1' },
  },
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: mocks.state.user, authLoading: false }),
}));

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          gt: () => ({
            order: async () => ({ data: mocks.state.sessions, error: null }),
          }),
        }),
      }),
    }),
    rpc: async (_name, _args) => mocks.state.rpcResult,
  },
}));

const openSession = {
  id: 's1',
  title: 'Week 3 — Access control',
  held_on: '2026-09-22',
  closes_at: new Date(Date.now() + 60000).toISOString(),
  status: 'open',
  course_offerings: { course_code: 'CYB 224', course_title: 'Cyber Law', level: '200L', department: 'cybersecurity' },
};

beforeEach(() => {
  mocks.state.sessions = [];
  mocks.state.rpcResult = { data: [{ ok: true, message: 'Checked in. You are marked present.', flagged: false }], error: null };
});

describe('CheckIn', () => {
  it('shows the empty state when no class is open', async () => {
    render(<CheckIn />);
    await waitFor(() =>
      expect(screen.getByText(/No class is open for check-in right now/)).toBeInTheDocument(),
    );
  });

  it('submits the code for the open session and shows the success message', async () => {
    mocks.state.sessions = [openSession];
    render(<CheckIn />);

    await waitFor(() => expect(screen.getByPlaceholderText('e.g. 4827')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('e.g. 4827'), { target: { value: '4827' } });
    fireEvent.click(screen.getByRole('button', { name: /check in/i }));

    await waitFor(() =>
      expect(screen.getByText('Checked in. You are marked present.')).toBeInTheDocument(),
    );
  });

  it('shows the server message when check-in is rejected', async () => {
    mocks.state.sessions = [openSession];
    mocks.state.rpcResult = { data: [{ ok: false, message: 'That code is wrong or has changed. Read the current one and try again.', flagged: false }], error: null };
    render(<CheckIn />);

    await waitFor(() => expect(screen.getByPlaceholderText('e.g. 4827')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('e.g. 4827'), { target: { value: 'WRONG' } });
    fireEvent.click(screen.getByRole('button', { name: /check in/i }));

    await waitFor(() =>
      expect(screen.getByText(/That code is wrong or has changed/)).toBeInTheDocument(),
    );
  });
});
