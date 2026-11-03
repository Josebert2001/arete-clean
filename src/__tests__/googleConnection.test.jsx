import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { useGoogleConnection } from '../components/useGoogleConnection';
import GoogleConnectButton from '../components/GoogleConnectButton';

const mocks = vi.hoisted(() => ({ status: vi.fn(), connect: vi.fn() }));
vi.mock('../context/AuthContext', () => {
  const auth = { user: { id: 'student-1' } };
  return { useAuth: () => auth };
});
vi.mock('../utils/googleApi', () => ({
  getGoogleStatus: mocks.status,
  connectGoogle: mocks.connect,
  disconnectGoogle: vi.fn(),
}));

afterEach(() => vi.clearAllMocks());

it('keeps the first failed status unknown, offers retry, and never starts consent', async () => {
  mocks.status.mockResolvedValue({ responseStatus: 500, error: 'database unavailable' });
  const hook = renderHook(() => useGoogleConnection());
  await waitFor(() => expect(hook.result.current.loading).toBe(false));
  expect(hook.result.current.connected).toBeNull();
  hook.unmount();

  render(<GoogleConnectButton returnTo="/planner" />);
  await screen.findByText('Retry');
  expect(screen.queryByText('Connect Google')).not.toBeInTheDocument();
  expect(mocks.connect).not.toHaveBeenCalled();
  mocks.status.mockResolvedValueOnce({ responseStatus: 200, configured: true, connected: false });
  fireEvent.click(screen.getByText('Retry'));
  await screen.findByText('Connect Google');
});

it('keeps the last known connection on a later failed check', async () => {
  mocks.status.mockResolvedValueOnce({ responseStatus: 200, configured: true, connected: true });
  const hook = renderHook(() => useGoogleConnection());
  await waitFor(() => expect(hook.result.current.connected).toBe(true));
  mocks.status.mockResolvedValueOnce({ responseStatus: 500 });
  await hook.result.current.refresh();
  expect(hook.result.current.connected).toBe(true);
});
