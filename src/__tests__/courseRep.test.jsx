import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseRep from '../pages/CourseRep';
import NewOfferingForm from '../components/NewOfferingForm';
import { currentAcademicSession } from '../utils/academicSession';

const mocks = vi.hoisted(() => ({
  state: {
    repScope: { department: 'cybersecurity', level: '200L' },
    rpcCalls: [],
    fromCalls: [],
    inserts: [],
    lecturers: [],
    deletedLinks: [],
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
    insert: async (values) => { mocks.state.inserts.push(values); return { error: null }; },
    then: (resolve) => resolve({ data: table === 'course_offerings' ? mocks.state.offerings : table === 'offering_lecturers' ? mocks.state.deletedLinks : [], error: null }),
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
      if (name === 'rep_request_lecturer_removal') return { data: [{ ok: true, message: 'Removal requested.' }], error: null };
      if (name === 'rep_cancel_removal_request') return { data: [{ ok: true, message: 'Removal request cancelled.' }], error: null };
      return { data: null, error: null };
    },
  },
}));

beforeEach(() => {
  mocks.state.repScope = { department: 'cybersecurity', level: '200L', academic_session: currentAcademicSession(), active: true };
  mocks.state.rpcCalls = [];
  mocks.state.fromCalls = [];
  mocks.state.inserts = [];
  mocks.state.lecturers = [];
  mocks.state.deletedLinks = [];
});

describe('Course rep page', () => {
  it('shows admins the normalized free-text code before saving it', async () => {
    const onCreated = vi.fn();
    render(<NewOfferingForm onCreated={onCreated} />);
    fireEvent.change(screen.getByLabelText('Course code'), { target: { value: '  cyb  224 ' } });
    expect(screen.getByText('Code to save: CYB 224')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Create course' }));
    await waitFor(() => expect(mocks.state.inserts).toHaveLength(1));
    expect(mocks.state.inserts[0].course_code).toBe('CYB 224');
    expect(onCreated).toHaveBeenCalledOnce();
  });

  it('blocks anyone who is not a course rep', () => {
    mocks.state.repScope = null;
    render(<CourseRep />);
    expect(screen.getByText('Course reps only')).toBeInTheDocument();
    expect(mocks.state.rpcCalls).toHaveLength(0);
  });

  it('shows an expired term notice without loading the console', () => {
    mocks.state.repScope = { department: 'cybersecurity', level: '200L', academic_session: '2025/2026', active: false };
    render(<CourseRep />);
    expect(screen.getByText('Your course rep term for 2025/2026 has ended. Ask the admin to renew it.')).toBeInTheDocument();
    expect(screen.queryByText('No courses yet. Create the first one above.')).not.toBeInTheDocument();
    expect(mocks.state.rpcCalls).toHaveLength(0);
    expect(mocks.state.fromCalls).toHaveLength(0);
  });

  it('keeps the console available with the legacy rep scope', async () => {
    render(<CourseRep />);
    expect(await screen.findByText(/CYB 224 · Cyber Law/)).toBeInTheDocument();
  });

  it('loads only the rep’s own class and hides the department/level pickers', async () => {
    render(<CourseRep />);
    expect(await screen.findByText(/CYB 224 · Cyber Law/)).toBeInTheDocument();
    const offeringQuery = mocks.state.fromCalls.find(c => c.table === 'course_offerings');
    expect(offeringQuery.filters).toEqual([['department', 'cybersecurity'], ['level', '200L'], ['academic_session', currentAcademicSession()]]);
    expect(screen.getByText('Older sessions are managed by the admin.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Department')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Level')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Attendance required (%)')).not.toBeInTheDocument();
    expect(screen.getByText('The lecturer sets the attendance requirement.')).toBeInTheDocument();
  });

  it('uses a catalogue code and title and omits the threshold when a rep creates an offering', async () => {
    render(<CourseRep />);
    const code = screen.getByLabelText('Course code');
    await screen.findByRole('option', { name: /CYB 224/ }, { timeout: 5000 });
    const session = screen.getByLabelText('Academic session');
    expect(session).toHaveValue(currentAcademicSession());
    expect(session).toHaveAttribute('readonly');
    fireEvent.change(session, { target: { value: '2025/2026' } });
    expect(session).toHaveValue(currentAcademicSession());
    fireEvent.change(code, { target: { value: 'CYB 224' } });
    expect(screen.getByLabelText(/Title/)).toHaveValue('Information and Big Data Security');
    expect(screen.getByLabelText(/Title/)).toHaveAttribute('readonly');
    fireEvent.click(screen.getByRole('button', { name: 'Create course' }));
    await waitFor(() => expect(mocks.state.inserts).toHaveLength(1));
    expect(mocks.state.inserts[0]).not.toHaveProperty('threshold_pct');
    expect(mocks.state.inserts[0]).toMatchObject({ course_code: 'CYB 224', course_title: 'Information and Big Data Security' });
    expect(mocks.state.inserts[0].academic_session).toBe(currentAcademicSession());
  });

  it('rejects a valid code from another level when a rep submits it', async () => {
    render(<CourseRep />);
    const code = screen.getByLabelText('Course code');
    await screen.findByRole('option', { name: /CYB 224/ }, { timeout: 5000 });
    expect(code.tagName).toBe('SELECT');
    expect(code.querySelector('option[value="CYB 311"]')).toBeNull();
    const otherLevelOption = document.createElement('option');
    otherLevelOption.value = 'CYB 311';
    otherLevelOption.textContent = 'CYB 311';
    code.append(otherLevelOption);
    fireEvent.change(code, { target: { value: 'CYB 311' } });
    expect(code).toHaveValue('CYB 311');
    fireEvent.click(screen.getByRole('button', { name: 'Create course' }));
    expect(mocks.state.inserts).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent('Choose a course from your class catalogue.');
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
      { offering_id: 'o1', lecturer_id: 'l2', full_name: 'Dr Invited', email: 'b@x', removable: true, removal_requires_request: false },
    ];
    render(<CourseRep />);
    expect(await screen.findByText('Dr Admin-Assigned')).toBeInTheDocument();
    expect(screen.queryByLabelText('Remove Dr Admin-Assigned from CYB 224')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Remove Dr Invited from CYB 224')).toBeInTheDocument();
  });

  it('hides direct removal when the old RPC omits the removal guard', async () => {
    mocks.state.lecturers = [{ offering_id: 'o1', lecturer_id: 'l2', full_name: 'Dr Invited', removable: true }];
    render(<CourseRep />);
    expect(await screen.findByText('Removal is handled by the admin for now.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Remove Dr Invited from CYB 224')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Request removal' })).not.toBeInTheDocument();
  });

  it('still removes an invite-made lecturer directly before the first class', async () => {
    mocks.state.lecturers = [{ offering_id: 'o1', lecturer_id: 'l2', full_name: 'Dr Invited', removable: true, removal_requires_request: false }];
    mocks.state.deletedLinks = [{ id: 'link1' }];
    render(<CourseRep />);
    fireEvent.click(await screen.findByLabelText('Remove Dr Invited from CYB 224'));
    await waitFor(() => expect(screen.getByText('Lecturer removed from the course.')).toBeInTheDocument());
    expect(mocks.state.fromCalls.find(c => c.table === 'offering_lecturers').filters).toEqual([['offering_id', 'o1'], ['lecturer_id', 'l2']]);
  });

  it('requires a reason for removal after classes begin', async () => {
    mocks.state.lecturers = [{ offering_id: 'o1', lecturer_id: 'l2', full_name: 'Dr Invited', removable: true, removal_requires_request: true }];
    render(<CourseRep />);
    fireEvent.click(await screen.findByRole('button', { name: 'Request removal' }));
    expect(screen.queryByLabelText('Remove Dr Invited from CYB 224')).not.toBeInTheDocument();
    const reason = screen.getByLabelText('Reason for removing Dr Invited');
    fireEvent.change(reason, { target: { value: 'too short' } });
    expect(screen.getByRole('button', { name: 'Send request' })).toBeDisabled();
    fireEvent.change(reason, { target: { value: '  Lecturer has missed several scheduled classes.  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send request' }));
    await waitFor(() => expect(screen.getByText('Removal requested.')).toBeInTheDocument());
    expect(mocks.state.rpcCalls).toContainEqual({
      name: 'rep_request_lecturer_removal',
      args: { p_offering_id: 'o1', p_lecturer_id: 'l2', p_reason: 'Lecturer has missed several scheduled classes.' },
    });
  });

  it('shows a pending request and lets the current rep cancel it', async () => {
    mocks.state.lecturers = [{ offering_id: 'o1', lecturer_id: 'l2', full_name: 'Dr Invited', removable: true, removal_requires_request: true, pending_request_id: 'r1' }];
    render(<CourseRep />);
    expect(await screen.findByText('removal requested')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Request removal' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel request' }));
    await waitFor(() => expect(mocks.state.rpcCalls).toContainEqual({ name: 'rep_cancel_removal_request', args: { p_request_id: 'r1' } }));
  });
});
