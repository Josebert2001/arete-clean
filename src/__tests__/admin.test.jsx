import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Admin from '../pages/Admin';

const mocks = vi.hoisted(() => ({
  state: {
    role: 'admin',
    user: { id: 'me' },
    rpcCalls: [],
    staff: [{ id: 'l1', email: 'ada@uniuyo.edu.ng', full_name: 'Dr Ada', role: 'lecturer' }],
    found: [
      { id: 'u2', email: 'bassey@uniuyo.edu.ng', full_name: 'Bassey Etim', reg_number: null, role: null },
      { id: 'u3', email: 'ini@uniuyo.edu.ng', full_name: 'Ini Rep', reg_number: '22/CY/001', department: 'cybersecurity', level: '200L', role: null },
    ],
    invites: [{
      id: 'i1', email: 'second@gmail.com', status: 'awaiting_approval',
      created_at: '2026-09-20T10:00:00Z', expires_at: '2026-10-04T10:00:00Z',
      course_code: 'CYB 224', department: 'cybersecurity', level: '200L', academic_session: '2026/2027',
      invited_by_name: 'Ini Rep', accepted_by_name: 'Second Account',
      accepted_by_email: 'second@gmail.com', accepted_by_reg: '22/CY/009',
    }],
    changes: [{
      id: 1, action: 'insert', changed_at: '2026-09-21T09:00:00Z', course_code: 'CYB 224', held_on: '2026-09-21',
      student_name: 'Ini Rep', student_reg: '22/CY/001', actor_name: 'Second Account', actor_role: 'lecturer',
      old_status: null, new_status: 'manual', reason: 'Phone died',
      student_is_rep: true, actor_invited_by_rep: true,
    }],
  },
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: mocks.state.user, authLoading: false }),
}));

vi.mock('../components/useLecturer', () => ({
  useLecturer: () => ({ status: 'ready', role: mocks.state.role, isLecturer: !!mocks.state.role, offerings: [] }),
}));

// Chainable stand-in for supabase.from(...): every query resolves empty.
function query() {
  const q = {
    select: () => q, order: () => q, eq: () => q, delete: () => q,
    insert: async () => ({ error: null }),
    then: (resolve) => resolve({ data: [], error: null }),
  };
  return q;
}

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => query(),
    rpc: async (name, args) => {
      mocks.state.rpcCalls.push({ name, args });
      if (name === 'admin_list_staff') return { data: mocks.state.staff, error: null };
      if (name === 'admin_find_users') return { data: mocks.state.found, error: null };
      if (name === 'admin_set_role') return { data: [{ ok: true, message: 'Now a lecturer.' }], error: null };
      if (name === 'admin_set_course_rep') return { data: [{ ok: true, message: 'Now a course rep.' }], error: null };
      if (name === 'admin_list_course_reps') return { data: [], error: null };
      if (name === 'admin_list_invites') return { data: mocks.state.invites, error: null };
      if (name === 'admin_decide_invite') return { data: [{ ok: true, message: 'Approved.' }], error: null };
      if (name === 'admin_list_attendance_changes') return { data: mocks.state.changes, error: null };
      return { data: null, error: null };
    },
  },
}));

beforeEach(() => {
  mocks.state.role = 'admin';
  mocks.state.rpcCalls = [];
});

describe('Admin page', () => {
  it('blocks anyone who is not an admin, including lecturers', () => {
    mocks.state.role = 'lecturer';
    render(<Admin />);
    expect(screen.getByText('Admins only')).toBeInTheDocument();
    expect(mocks.state.rpcCalls).toHaveLength(0);
  });

  it('lists current staff', async () => {
    render(<Admin />);
    expect(await screen.findByText('Dr Ada')).toBeInTheDocument();
  });

  it('finds a user and makes them a lecturer', async () => {
    render(<Admin />);
    fireEvent.change(screen.getByLabelText('Email, name or reg number'), { target: { value: 'bassey' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(await screen.findByText('Bassey Etim')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Make lecturer' })[0]);
    await waitFor(() => expect(screen.getByText('Now a lecturer.')).toBeInTheDocument());
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_set_role', args: { p_user_id: 'u2', p_role: 'lecturer' } });
  });

  it('appoints a course rep for the class on their own profile', async () => {
    render(<Admin />);
    fireEvent.change(screen.getByLabelText('Email, name or reg number'), { target: { value: 'ini' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(await screen.findByText('Ini Rep')).toBeInTheDocument();

    // Only the student with a department + level on their profile can be made rep.
    const repButtons = screen.getAllByRole('button', { name: /Make course rep/ });
    expect(repButtons).toHaveLength(1);
    fireEvent.click(repButtons[0]);
    await waitFor(() => expect(screen.getByText('Now a course rep.')).toBeInTheDocument());
    expect(mocks.state.rpcCalls).toContainEqual({
      name: 'admin_set_course_rep',
      args: { p_user_id: 'u3', p_department: 'cybersecurity', p_level: '200L' },
    });
  });

  it('shows who accepted an invite, warns on a student account, and approves', async () => {
    render(<Admin />);
    expect(await screen.findByText(/reg number 22\/CY\/009 \(a student account\)/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    await waitFor(() => expect(screen.getByText('Approved.')).toBeInTheDocument());
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_decide_invite', args: { p_invite_id: 'i1', p_approve: true } });
  });

  it('lists flagged attendance changes by default', async () => {
    render(<Admin />);
    expect(await screen.findByText('Lecturer via rep invite')).toBeInTheDocument();
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_list_attendance_changes', args: { p_flagged_only: true } });
  });
});
