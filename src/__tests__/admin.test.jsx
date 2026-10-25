import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Admin from '../pages/Admin';

const mocks = vi.hoisted(() => ({
  state: {
    role: 'admin',
    user: { id: 'me' },
    rpcCalls: [],
    staff: [{ id: 'l1', email: 'ada@uniuyo.edu.ng', full_name: 'Dr Ada', role: 'lecturer' }],
    found: [{ id: 'u2', email: 'bassey@uniuyo.edu.ng', full_name: 'Bassey Etim', reg_number: null, role: null }],
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
});
