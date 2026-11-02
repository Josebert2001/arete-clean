import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseRep from '../pages/CourseRep';

const mocks = vi.hoisted(() => ({
  state: {
    repScope: { department: 'cybersecurity', level: '200L' },
    rpcCalls: [],
    fromCalls: [],
    lecturers: [],
    offerings: [{ id: 'o1', course_code: 'CYB 224', course_title: 'Cyber Law', department: 'cybersecurity', level: '200L', academic_session: '2026/2027', threshold_pct: 70 }],
  },
}));

vi.mock('../components/useLecturer', () => ({
  useLecturer: () => ({ status: 'ready', role: null, isLecturer: false, offerings: [], repScope: mocks.state.repScope }),
}));

// Chainable stand-in for supabase.from(...). Records every filter so the test
// can check the rep only ever asks for their own cohort.
function query(table) {
  const call = { table, filters: [] };
  mocks.state.fromCalls.push(call);
  const q = {
    select: () => q, order: () => q, delete: () => q, in: () => q,
    eq: (col, val) => { call.filters.push([col, val]); return q; },
    insert: async () => ({ error: null }),
    then: (resolve) => resolve({ data: table === 'course_offerings' ? mocks.state.offerings : [], error: null }),
  };
  return q;
}

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: (table) => query(table),
    rpc: async (name, args) => {
      mocks.state.rpcCalls.push({ name, args });
      if (name === 'rep_cohort_lecturers') return { data: mocks.state.lecturers, error: null };
      if (name === 'invite_lecturer') return { data: [{ ok: true, message: 'Invite sent.' }], error: null };
      return { data: null, error: null };
    },
  },
}));

beforeEach(() => {
  mocks.state.repScope = { department: 'cybersecurity', level: '200L' };
  mocks.state.rpcCalls = [];
  mocks.state.fromCalls = [];
  mocks.state.lecturers = [];
});

describe('Course rep page', () => {
  it('blocks anyone who is not a course rep', () => {
    mocks.state.repScope = null;
    render(<CourseRep />);
    expect(screen.getByText('Course reps only')).toBeInTheDocument();
    expect(mocks.state.rpcCalls).toHaveLength(0);
  });

  it('loads only the rep’s own class and hides the department/level pickers', async () => {
    render(<CourseRep />);
    expect(await screen.findByText(/CYB 224 · Cyber Law/)).toBeInTheDocument();
    const offeringQuery = mocks.state.fromCalls.find(c => c.table === 'course_offerings');
    expect(offeringQuery.filters).toEqual([['department', 'cybersecurity'], ['level', '200L']]);
    expect(screen.queryByLabelText('Department')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Level')).not.toBeInTheDocument();
  });

  it('invites a lecturer by email', async () => {
    render(<CourseRep />);
    const input = await screen.findByLabelText('Lecturer\'s email for CYB 224');
    fireEvent.change(input, { target: { value: 'dr.ada@uniuyo.edu.ng' } });
    fireEvent.click(screen.getByRole('button', { name: /Invite/ }));
    await waitFor(() => expect(screen.getByText('Invite sent.')).toBeInTheDocument());
    expect(mocks.state.rpcCalls).toContainEqual({
      name: 'invite_lecturer',
      args: { p_offering_id: 'o1', p_email: 'dr.ada@uniuyo.edu.ng' },
    });
  });

  it('offers removal only for lecturers that came in through an invite', async () => {
    mocks.state.lecturers = [
      { offering_id: 'o1', lecturer_id: 'l1', full_name: 'Dr Admin-Assigned', email: 'a@x', removable: false },
      { offering_id: 'o1', lecturer_id: 'l2', full_name: 'Dr Invited', email: 'b@x', removable: true },
    ];
    render(<CourseRep />);
    expect(await screen.findByText('Dr Admin-Assigned')).toBeInTheDocument();
    expect(screen.queryByLabelText('Remove Dr Admin-Assigned from CYB 224')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Remove Dr Invited from CYB 224')).toBeInTheDocument();
  });
});
