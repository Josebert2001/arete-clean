import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Admin from '../pages/Admin';

const mocks = vi.hoisted(() => ({
  state: {
    role: 'admin',
    user: { id: 'me' },
    rpcCalls: [],
    inserts: [],
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
    removalRequests: [],
    removalListError: null,
    reps: [],
    billingSummary: null,
    billingError: null,
    billingReject: false,
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
    insert: async (values) => { mocks.state.inserts.push(values); return { error: null }; },
    then: (resolve) => resolve({ data: [], error: null }),
  };
  return q;
}

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => query(),
    rpc: async (name, args) => {
      mocks.state.rpcCalls.push({ name, args });
      if (name === 'admin_billing_summary') {
        if (mocks.state.billingReject) throw new Error('Network unavailable');
        return { data: mocks.state.billingSummary, error: mocks.state.billingError };
      }
      if (name === 'admin_list_staff') return { data: mocks.state.staff, error: null };
      if (name === 'admin_find_users') return { data: mocks.state.found, error: null };
      if (name === 'admin_set_role') return { data: [{ ok: true, message: 'Now a lecturer.' }], error: null };
      if (name === 'admin_set_course_rep') return { data: [{ ok: true, message: 'Now a course rep.' }], error: null };
      if (name === 'admin_list_course_reps') return { data: mocks.state.reps, error: null };
      if (name === 'admin_renew_course_rep') return { data: [{ ok: true, message: 'Now a course rep.' }], error: null };
      if (name === 'admin_list_invites') return { data: mocks.state.invites, error: null };
      if (name === 'admin_decide_invite') return { data: [{ ok: true, message: 'Approved.' }], error: null };
      if (name === 'admin_list_attendance_changes') return { data: mocks.state.changes, error: null };
      if (name === 'admin_list_removal_requests') return { data: mocks.state.removalRequests, error: mocks.state.removalListError };
      if (name === 'admin_decide_removal') return { data: [{ ok: true, message: args.p_approve ? 'Approved. Lecturer removed from the course.' : 'Removal request rejected.' }], error: null };
      return { data: null, error: null };
    },
  },
}));

beforeEach(() => {
  mocks.state.role = 'admin';
  mocks.state.rpcCalls = [];
  mocks.state.inserts = [];
  mocks.state.removalRequests = [];
  mocks.state.removalListError = null;
  mocks.state.reps = [];
  mocks.state.invites[0].is_reinstatement = false;
  mocks.state.billingError = null;
  mocks.state.billingReject = false;
  mocks.state.billingSummary = {
    payments: {
      counts: { success: 4, pending: 2, refunded: 1 },
      revenue_kobo: 1000000, revenue_30d_kobo: 750000,
      monthly: [{ month: '2026-10', revenue_kobo: 250000 }, { month: '2026-11', revenue_kobo: 750000 }],
    },
    passes: { active: 3, expiring_14d: 1 },
    usage: { signups_7d: 12, signups_30d: 45, weekly_active: 20, daily_students: { 'daily:tutor': 8, 'daily:run': 6 } },
    conversion: 0.15,
  };
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

  it('renders aggregate payments, passes and usage', async () => {
    render(<Admin />);
    const panel = within(screen.getByRole('heading', { name: 'Premium and usage' }).closest('section'));
    expect(await panel.findByText('₦10,000')).toBeInTheDocument();
    for (const [label, value] of [
      ['Successful revenue · last 30 days', '₦7,500'],
      ['Active passes', '3'], ['Passes expiring · next 14 days', '1'],
      ['Signups · last 7 days', '12'], ['Signups · last 30 days', '45'],
      ['Weekly active students', '20'], ['Active passes / weekly active', '15%'],
    ]) {
      expect(within(panel.getByText(label).parentElement).getByText(value)).toBeInTheDocument();
    }
    expect(panel.getByText('success: 4')).toBeInTheDocument();
    expect(panel.getByText('pending: 2')).toBeInTheDocument();
    expect(panel.getByText('refunded: 1')).toBeInTheDocument();
    expect(panel.getByRole('row', { name: '2026-10 ₦2,500' })).toBeInTheDocument();
    expect(panel.getByRole('row', { name: '2026-11 ₦7,500' })).toBeInTheDocument();
    expect(panel.getByText('AI Tutor messages: 8')).toBeInTheDocument();
    expect(panel.getByText('code runs: 6')).toBeInTheDocument();
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_billing_summary', args: undefined });
  });

  it('shows no conversion when there are no weekly active students', async () => {
    mocks.state.billingSummary.usage.weekly_active = 0;
    mocks.state.billingSummary.conversion = null;
    render(<Admin />);
    expect(await screen.findByText('—')).toBeInTheDocument();
  });

  it.each([
    { code: 'PGRST202' },
    { message: 'Could not find the function public.admin_billing_summary in the schema cache' },
  ])('shows the migration note for a missing summary RPC: %j', async (error) => {
    mocks.state.billingError = error;
    render(<Admin />);
    expect(await screen.findByText('Apply migration 20261108030000 to see payments.')).toBeInTheDocument();
    expect(screen.getByText('Dr Ada')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Courses' })).toBeInTheDocument();
  });

  it.each([false, true])('keeps other sections working when billing fails (rejected promise: %s)', async (reject) => {
    mocks.state.billingError = { code: '42501', message: 'Permission denied' };
    mocks.state.billingReject = reject;
    render(<Admin />);
    expect(await screen.findByText('Could not load payments and usage. Please reload the page.')).toBeInTheDocument();
    expect(screen.getByText('Dr Ada')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Invite log' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create course' })).toBeEnabled();
    expect(screen.getByText('Lecturer via rep invite')).toBeInTheDocument();
  });

  it('keeps the threshold field for admin offering creation', async () => {
    render(<Admin />);
    const threshold = await screen.findByLabelText('Attendance required (%)');
    fireEvent.change(threshold, { target: { value: '85' } });
    fireEvent.change(screen.getByLabelText('Course code'), { target: { value: 'CYB 225' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create course' }));
    await waitFor(() => expect(mocks.state.inserts).toHaveLength(1));
    expect(mocks.state.inserts[0].threshold_pct).toBe(85);
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

  it('shows expired terms and renews at the same or next level', async () => {
    mocks.state.reps = [{ id: 'r1', email: 'rep@uniuyo.edu.ng', department: 'cybersecurity', level: '200L', academic_session: '2025/2026', active: false }];
    render(<Admin />);
    expect(await screen.findByText('Expired')).toBeInTheDocument();
    expect(screen.getByText(/2025\/2026/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Renew (same level)' }));
    await waitFor(() => expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_renew_course_rep', args: { p_user_id: 'r1', p_next_level: false } }));
    fireEvent.click(screen.getByRole('button', { name: 'Renew at 300L' }));
    await waitFor(() => expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_renew_course_rep', args: { p_user_id: 'r1', p_next_level: true } }));
  });

  it('does not offer a level beyond 400L', async () => {
    mocks.state.reps = [{ id: 'r1', email: 'rep@uniuyo.edu.ng', department: 'cybersecurity', level: '400L', academic_session: '2025/2026', active: false }];
    render(<Admin />);
    expect(await screen.findByText('Expired')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Renew at/ })).not.toBeInTheDocument();
  });

  it('shows who accepted an invite, warns on a student account, and approves', async () => {
    render(<Admin />);
    expect(await screen.findByText(/reg number 22\/CY\/009 \(a student account\)/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    await waitFor(() => expect(screen.getByText('Approved.')).toBeInTheDocument());
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_decide_invite', args: { p_invite_id: 'i1', p_approve: true } });
  });

  it('marks an invite from a previously removed lecturer for reinstatement review', async () => {
    mocks.state.invites = [{ ...mocks.state.invites[0], is_reinstatement: true }];
    render(<Admin />);
    expect(await screen.findByText('Reinstatement after removal — review before approving')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    await waitFor(() => expect(mocks.state.rpcCalls).toContainEqual({
      name: 'admin_decide_invite', args: { p_invite_id: 'i1', p_approve: true },
    }));
  });

  it('lists flagged attendance changes by default', async () => {
    render(<Admin />);
    expect(await screen.findByText('Lecturer via rep invite')).toBeInTheDocument();
    expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_list_attendance_changes', args: { p_flagged_only: true } });
  });

  it('shows pending removal evidence and approves or rejects via the admin RPC', async () => {
    mocks.state.removalRequests = [{
      id: 'r1', course_code: 'CYB 224', department: 'cybersecurity', level: '200L',
      academic_session: '2026/2027', lecturer_name: 'Dr Invited', lecturer_email: 'invited@uniuyo.edu.ng',
      requester_name: 'Ini Rep', reason: 'Lecturer missed multiple scheduled classes.',
      created_at: '2026-10-01T10:00:00Z', classes_held: 3,
    }];
    render(<Admin />);
    expect(await screen.findByText('Lecturer missed multiple scheduled classes.')).toBeInTheDocument();
    expect(screen.getByText(/3 classes held/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reject removal' }));
    await waitFor(() => expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_decide_removal', args: { p_request_id: 'r1', p_approve: false } }));
    fireEvent.click(screen.getByRole('button', { name: 'Approve removal' }));
    await waitFor(() => expect(mocks.state.rpcCalls).toContainEqual({ name: 'admin_decide_removal', args: { p_request_id: 'r1', p_approve: true } }));
  });

  it('hides the removal panel when its RPC is not installed', async () => {
    mocks.state.removalListError = { code: 'PGRST202' };
    render(<Admin />);
    await waitFor(() => expect(screen.queryByText('Lecturer removal requests')).not.toBeInTheDocument());
    expect(await screen.findByText('Dr Ada')).toBeInTheDocument();
    expect(screen.getByText('Invite log')).toBeInTheDocument();
  });
});
