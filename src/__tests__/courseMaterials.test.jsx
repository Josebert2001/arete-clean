import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CourseMaterials from '../components/CourseMaterials';

const mocks = vi.hoisted(() => ({ requests: [], deletes: [] }));

vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'student' } }) }));
vi.mock('../lib/supabase', () => ({
  isConfigured: true,
  getAccessToken: vi.fn(),
  supabase: {
    from(table) {
      if (table === 'course_materials') {
        return { delete: () => ({ eq: () => new Promise(resolve => mocks.deletes.push(resolve)) }) };
      }
      if (table !== 'course_materials_visible') throw new Error(`Unexpected table: ${table}`);
      const query = {
        select: () => query,
        eq: () => query,
        order: () => new Promise(resolve => mocks.requests.push(resolve)),
      };
      return query;
    },
    storage: { from: () => ({
      getPublicUrl: path => ({ data: { publicUrl: `/materials/${path}` } }),
      remove: async () => ({ error: null }),
      upload: async () => ({ error: null }),
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
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({}) })));
});
afterEach(() => vi.unstubAllGlobals());

describe('CourseMaterials loads', () => {
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
