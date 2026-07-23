import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PWAUpdatePrompt from '../components/PWAUpdatePrompt';

// The `virtual:pwa-register/react` module only exists when vite-plugin-pwa is
// in the build (it isn't in vitest.config.js), so we mock it. `vi.hoisted`
// mutable state lets one factory serve both cases the component branches on.
const state = vi.hoisted(() => ({ needRefresh: false }));

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: () => ({
    offlineReady: [false, vi.fn()],
    needRefresh: [state.needRefresh, vi.fn()],
    updateServiceWorker: vi.fn(),
  }),
}));

describe('PWAUpdatePrompt', () => {
  it('shows the update banner with a Reload button when a new version is waiting', () => {
    state.needRefresh = true;
    render(<PWAUpdatePrompt />);
    expect(screen.getByText(/new version of Areté is available/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('renders nothing when there is no update and the app is not newly offline-ready', () => {
    state.needRefresh = false;
    const { container } = render(<PWAUpdatePrompt />);
    expect(container.firstChild).toBeNull();
  });
});
