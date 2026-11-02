import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from '../pages/Register';

const mocks = vi.hoisted(() => ({
  state: {
    threshold: 70,
    columnMissing: false,
    rpcMissing: false,
    rpcCalls: [],
  },
}));

vi.mock('../components/useLecturer', () => ({
  useLecturer: () => ({
    status: 'ready', isLecturer: true,
    offerings: [{ id: 'o1', course_code: 'CYB 224', department: 'cybersecurity', level: '200L', academic_session: '2026/2027' }],
  }),
}));

vi.mock('../lib/supabase', () => ({
  supabase: {
    rpc: async (name, args) => {
      mocks.state.rpcCalls.push({ name, args });
      if (name === 'sync_offering_roster') return { data: null, error: null };
      if (name === 'register_summary') return { data: [{ student_id: 's1', full_name: 'Student', attended: 1, total_held: 1, threshold_pct: mocks.state.threshold }], error: null };
      if (name === 'held_sessions_count') return { data: 1, error: null };
      if (name === 'set_offering_threshold') {
        if (mocks.state.rpcMissing) return { data: null, error: { code: 'PGRST202' } };
        mocks.state.threshold = args.p_pct;
        return { data: [{ ok: true, message: 'Attendance requirement updated.' }], error: null };
      }
      return { data: null, error: { code: 'unexpected' } };
    },
    from: (table) => {
      if (table === 'course_offerings') {
        const q = { select: () => q, eq: () => q, maybeSingle: async () => mocks.state.columnMissing
          ? { data: null, error: { code: '42703' } }
          : { data: { threshold_pct: mocks.state.threshold, threshold_set_at: null }, error: null } };
        return q;
      }
      const q = { select: () => q, eq: () => q, order: async () => ({ data: [], error: null }) };
      return q;
    },
  },
}));

beforeEach(() => {
  mocks.state.threshold = 70;
  mocks.state.columnMissing = false;
  mocks.state.rpcMissing = false;
  mocks.state.rpcCalls = [];
});

describe('Lecturer register threshold', () => {
  it('saves a valid percentage through the RPC and reloads the displayed value', async () => {
    render(<Register />);
    fireEvent.click(await screen.findByRole('button', { name: 'Edit requirement' }));
    fireEvent.change(screen.getByLabelText('New requirement (%)'), { target: { value: '85' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.getByText(/Attendance requirement:/).parentElement).toHaveTextContent('85%'));
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'set_offering_threshold', args: { p_offering_id: 'o1', p_pct: 85 } });
  });

  it('shows the value read-only before the migration adds the column', async () => {
    mocks.state.columnMissing = true;
    render(<Register />);
    await waitFor(() => expect(screen.getByText(/Attendance requirement:/).parentElement).toHaveTextContent('70%'));
    expect(screen.queryByRole('button', { name: 'Edit requirement' })).not.toBeInTheDocument();
  });

  it('hides editing when the RPC is missing', async () => {
    mocks.state.rpcMissing = true;
    render(<Register />);
    fireEvent.click(await screen.findByRole('button', { name: 'Edit requirement' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Edit requirement' })).not.toBeInTheDocument());
    expect(screen.getByText(/Attendance requirement:/).parentElement).toHaveTextContent('70%');
  });
});
