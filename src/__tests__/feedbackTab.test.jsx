import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeedbackTab from '../components/FeedbackTab';

let mockUser = { id: 'u1' };
let mockAuthEnabled = true;
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, authEnabled: mockAuthEnabled }),
}));

const insertMock = vi.fn(() => Promise.resolve({ error: null }));
vi.mock('../lib/supabase', () => ({
  supabase: { from: () => ({ insert: (...args) => insertMock(...args) }) },
}));

const renderTab = () => render(<MemoryRouter><FeedbackTab /></MemoryRouter>);

beforeEach(() => {
  mockUser = { id: 'u1' };
  mockAuthEnabled = true;
  insertMock.mockClear();
  insertMock.mockImplementation(() => Promise.resolve({ error: null }));
});

describe('FeedbackTab', () => {
  it('renders nothing when signed out', () => {
    mockUser = null;
    const { container } = renderTab();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when Supabase is not configured', () => {
    mockAuthEnabled = false;
    const { container } = renderTab();
    expect(container).toBeEmptyDOMElement();
  });

  it('opens the panel and disables submit until a rating is picked', () => {
    renderTab();
    fireEvent.click(screen.getByRole('button', { name: 'Give feedback' }));
    const submit = screen.getByRole('button', { name: 'Send feedback' });
    expect(submit).toBeDisabled();

    fireEvent.click(screen.getByRole('radio', { name: '4 stars' }));
    expect(submit).not.toBeDisabled();
  });

  it('submits the rating and message, then shows a thank-you state', async () => {
    renderTab();
    fireEvent.click(screen.getByRole('button', { name: 'Give feedback' }));
    fireEvent.click(screen.getByRole('radio', { name: '5 stars' }));
    fireEvent.change(screen.getByLabelText('Feedback message'), {
      target: { value: 'Loving the AI Tutor.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send feedback' }));

    await waitFor(() => expect(screen.getByText("Thanks — that helps.")).toBeInTheDocument());

    expect(insertMock).toHaveBeenCalledWith({
      user_id: 'u1',
      rating: 5,
      message: 'Loving the AI Tutor.',
      page: '/',
    });
  });

  it('shows an error and keeps the draft when the insert fails', async () => {
    insertMock.mockImplementation(() => Promise.resolve({ error: new Error('boom') }));
    renderTab();
    fireEvent.click(screen.getByRole('button', { name: 'Give feedback' }));
    fireEvent.click(screen.getByRole('radio', { name: '3 stars' }));
    fireEvent.click(screen.getByRole('button', { name: 'Send feedback' }));

    await waitFor(() => expect(screen.getByText(/Couldn't send that/)).toBeInTheDocument());
    expect(screen.getByRole('radio', { name: '3 stars' })).toHaveAttribute('aria-checked', 'true');
  });
});
