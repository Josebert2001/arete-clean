import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CourseMaterials from '../components/CourseMaterials';

const mocks = vi.hoisted(() => ({ requests: [], deletes: [], uploads: [], removedPaths: [], reports: [], reportingAvailable: true, holdUploads: false, sign: null }));

vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'student' } }) }));
vi.mock('../lib/supabase', () => ({
  isConfigured: true,
  getAccessToken: vi.fn(),
  supabase: {
    rpc(name, args) {
      if (name === 'material_reporting_available') return Promise.resolve(mocks.reportingAvailable ? { data: true, error: null } : { data: null, error: { code: 'PGRST202' } });
      if (name === 'my_material_upload_count') return Promise.resolve({ data: 0, error: null });
      if (name === 'report_material') { mocks.reports.push(args); return Promise.resolve({ data: [{ ok: true, message: 'Report received.' }], error: null }); }
      throw new Error(`Unexpected RPC: ${name}`);
    },
    from(table) {
      if (table === 'course_materials') {
        return { delete: () => ({ eq: () => new Promise(resolve => mocks.deletes.push(resolve)) }) };
      }
      if (table !== 'course_materials_visible') throw new Error(`Unexpected table: ${table}`);
      const query = {
        select: (_columns, options) => options?.head ? { eq: () => Promise.resolve({ count: 0, error: null }) } : query,
        eq: () => query,
        order: () => new Promise(resolve => mocks.requests.push(resolve)),
      };
      return query;
    },
    storage: { from: () => ({
      getPublicUrl: path => ({ data: { publicUrl: `/materials/${path}` } }),
      createSignedUrls: (paths, ttl) => mocks.sign(paths, ttl),
      remove: async paths => { mocks.removedPaths.push(paths); return { error: null }; },
      upload: () => mocks.holdUploads
        ? new Promise(resolve => mocks.uploads.push(resolve))
        : Promise.resolve({ error: null }),
    }) },
  },
}));

const props = { courseCode: 'CSC 101', courseSlug: 'csc-101', department: 'general' };
const material = (id, name, mine = false) => ({
  id, display_name: name, file_path: `${id}.pdf`, file_size: 100,
  file_type: 'pdf', description: null, uploaded_at: new Date().toISOString(),
  uploaded_by_me: mine,
});

beforeEach(() => {
  mocks.requests.length = 0;
  mocks.deletes.length = 0;
  mocks.uploads.length = 0;
  mocks.removedPaths.length = 0;
  mocks.reports.length = 0;
  mocks.reportingAvailable = true;
  mocks.holdUploads = false;
  // Default: signing refused, as on a database without the private-bucket migration.
  mocks.sign = vi.fn(async () => ({ data: null, error: new Error('not allowed') }));
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({}) })));
});
afterEach(() => vi.unstubAllGlobals());

describe('CourseMaterials loads', () => {
  it('removes an uploaded object if registration fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Quota reached.' }) });
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [], error: null }));
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    fireEvent.change(view.container.querySelector('input[type="file"]'), { target: { files: [new File(['notes'], 'a.pdf', { type: 'application/pdf' })] } });
    fireEvent.click(screen.getByRole('button', { name: 'Upload to CSC 101' }));
    await waitFor(() => expect(screen.getByText('Quota reached.')).toBeInTheDocument());
    expect(mocks.removedPaths).toHaveLength(1);
    expect(mocks.removedPaths[0][0]).toMatch(/^csc-101\//);
  });
  it('opens a material through a signed link, and falls back to the public URL when signing is refused', async () => {
    mocks.sign = vi.fn(async paths => ({
      data: paths.map(path => (path === '2.pdf'
        ? { path, signedUrl: `/signed/${path}?token=t`, error: null }
        : { path, signedUrl: null, error: 'Object not found' })),
      error: null,
    }));
    render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [material(2, 'Peer.pdf'), material(3, 'Other.pdf')], error: null }));
    await waitFor(() => expect(screen.getByText('Peer.pdf').closest('a')).toHaveAttribute('href', '/signed/2.pdf?token=t'));
    expect(mocks.sign).toHaveBeenCalledWith(['2.pdf', '3.pdf'], 6 * 60 * 60);
    expect(screen.getByText('Other.pdf').closest('a')).toHaveAttribute('href', '/materials/3.pdf');
  });
  it('labels uploads and lets a student report someone else’s file', async () => {
    render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [material(2, 'Peer.pdf')], error: null }));
    expect(screen.getByText('Student upload · not reviewed')).toBeInTheDocument();
    fireEvent.click(await screen.findByRole('button', { name: 'Report' }));
    fireEvent.change(screen.getByLabelText('Reason for report'), { target: { value: 'copyright' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit report' }));
    await waitFor(() => expect(mocks.reports[0]).toMatchObject({ p_material_id: 2, p_reason: 'copyright' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Report received.');
  });

  it('hides reporting when the migration RPC is absent', async () => {
    mocks.reportingAvailable = false;
    render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [material(2, 'Peer.pdf')], error: null }));
    expect(screen.queryByRole('button', { name: 'Report' })).not.toBeInTheDocument();
  });
  it('ignores an older course response that resolves after the new course', async () => {
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    view.rerender(<CourseMaterials {...props} courseSlug="csc-102" />);
    await waitFor(() => expect(mocks.requests).toHaveLength(2));

    await act(async () => mocks.requests[1]({ data: [material(2, 'Course B.pdf')], error: null }));
    expect(screen.getByText('Course B.pdf')).toBeInTheDocument();
    await act(async () => mocks.requests[0]({ data: [material(1, 'Course A.pdf')], error: null }));
    expect(screen.getByText('Course B.pdf')).toBeInTheDocument();
    expect(screen.queryByText('Course A.pdf')).not.toBeInTheDocument();
  });

  it('clears a previous error as soon as the next course load begins', async () => {
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: null, error: new Error('offline') }));
    expect(screen.getByText("Couldn't load materials")).toBeInTheDocument();

    view.rerender(<CourseMaterials {...props} courseSlug="csc-102" />);
    await waitFor(() => expect(mocks.requests).toHaveLength(2));
    expect(screen.queryByText("Couldn't load materials")).not.toBeInTheDocument();
  });

  it('does not let an upload for the previous course replace the current course list', async () => {
    mocks.holdUploads = true;
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [], error: null }));

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    fireEvent.change(view.container.querySelector('input[type="file"]'), {
      target: { files: [new File(['notes'], 'a.pdf', { type: 'application/pdf' })] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload to CSC 101' }));
    await waitFor(() => expect(mocks.uploads).toHaveLength(1));

    view.rerender(<CourseMaterials {...props} courseSlug="csc-102" department="cybersecurity" />);
    await waitFor(() => expect(mocks.requests).toHaveLength(2));
    await act(async () => mocks.uploads[0]({ error: null }));
    expect(mocks.requests).toHaveLength(2);
    expect(screen.queryByRole('heading', { name: 'Upload a Material' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
    expect(view.container.querySelector('input[type="file"]').value).toBe('');
    expect(screen.getByRole('button', { name: 'Upload to CSC 101' })).toBeDisabled();

    await act(async () => mocks.requests[1]({ data: [material(2, 'Course B.pdf')], error: null }));
    expect(screen.getByText('Course B.pdf')).toBeInTheDocument();
    expect(screen.queryByText('Course A.pdf')).not.toBeInTheDocument();
  });

  it('clears a selected file and description when the materials pool changes without an upload', async () => {
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [], error: null }));

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    fireEvent.change(view.container.querySelector('input[type="file"]'), {
      target: { files: [new File(['notes'], 'a.pdf', { type: 'application/pdf' })] },
    });
    fireEvent.change(screen.getByPlaceholderText(/Week 5 lecture notes/), {
      target: { value: 'Course A notes' },
    });
    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    fireEvent.change(view.container.querySelector('input[type="file"]'), {
      target: { files: [new File(['notes'], 'wrong.exe')] },
    });
    expect(screen.getByText(/File type .exe is not allowed/)).toBeInTheDocument();

    view.rerender(<CourseMaterials {...props} department="cybersecurity" />);
    expect(screen.queryByRole('heading', { name: 'Upload a Material' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
    expect(view.container.querySelector('input[type="file"]').value).toBe('');
    expect(screen.getByPlaceholderText(/Week 5 lecture notes/)).toHaveValue('');
    expect(screen.queryByText(/File type .exe is not allowed/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload to CSC 101' })).toBeDisabled();
  });

  it('clears the previous course success message when the course changes', async () => {
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [], error: null }));

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    fireEvent.change(view.container.querySelector('input[type="file"]'), {
      target: { files: [new File(['notes'], 'a.pdf', { type: 'application/pdf' })] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload to CSC 101' }));
    await waitFor(() => expect(screen.getByText(/Material uploaded and now visible/)).toBeInTheDocument());

    view.rerender(<CourseMaterials {...props} courseSlug="csc-102" />);
    expect(screen.queryByText(/Material uploaded and now visible/)).not.toBeInTheDocument();
  });

  it('loads newly uploaded files after a delete wins over an in-flight upload refresh', async () => {
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [material(1, 'My notes.pdf', true)], error: null }));

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await waitFor(() => expect(mocks.deletes).toHaveLength(1));

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    fireEvent.change(view.container.querySelector('input[type="file"]'), {
      target: { files: [new File(['notes'], 'new.pdf', { type: 'application/pdf' })] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload to CSC 101' }));
    await waitFor(() => expect(mocks.requests).toHaveLength(2));

    await act(async () => mocks.deletes[0]({ error: null }));
    await waitFor(() => expect(mocks.requests).toHaveLength(3));

    await act(async () => mocks.requests[1]({ data: [material(1, 'My notes.pdf', true)], error: null }));
    await act(async () => mocks.requests[2]({ data: [material(2, 'New upload.pdf')], error: null }));
    expect(screen.queryByText('My notes.pdf')).not.toBeInTheDocument();
    expect(screen.getByText('New upload.pdf')).toBeInTheDocument();
  });

  it('does not restore a deleted card from a refresh started before deletion completes', async () => {
    const view = render(<CourseMaterials {...props} />);
    await waitFor(() => expect(mocks.requests).toHaveLength(1));
    await act(async () => mocks.requests[0]({ data: [material(1, 'My notes.pdf', true)], error: null }));

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await waitFor(() => expect(mocks.deletes).toHaveLength(1));

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    fireEvent.change(view.container.querySelector('input[type="file"]'), {
      target: { files: [new File(['notes'], 'new.pdf', { type: 'application/pdf' })] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload to CSC 101' }));
    await waitFor(() => expect(mocks.requests).toHaveLength(2));

    await act(async () => mocks.deletes[0]({ error: null }));
    expect(screen.queryByText('My notes.pdf')).not.toBeInTheDocument();
    await act(async () => mocks.requests[1]({ data: [material(1, 'My notes.pdf', true)], error: null }));
    expect(screen.queryByText('My notes.pdf')).not.toBeInTheDocument();
  });
});
