import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import InstallAppButton from '../components/InstallAppButton';

// A stand-in for Chromium's BeforeInstallPromptEvent. jsdom has no such class,
// and the real one is only constructible by the browser.
function fireBeforeInstallPrompt({ outcome = 'accepted' } = {}) {
  // cancelable matters: the real event is, and preventDefault() on a
  // non-cancelable event is silently a no-op, which would make the assertion
  // below pass or fail for the wrong reason.
  const event = new Event('beforeinstallprompt', { cancelable: true });
  event.prompt = vi.fn();
  event.userChoice = Promise.resolve({ outcome, platform: 'web' });
  act(() => { window.dispatchEvent(event); });
  return event;
}

// display-mode: standalone is how a browser reports "already installed".
function mockDisplayMode(standalone) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: standalone && query.includes('standalone'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

const button = () => screen.queryByRole('button', { name: /install areté/i });

beforeEach(() => mockDisplayMode(false));
afterEach(() => vi.restoreAllMocks());

describe('InstallAppButton', () => {
  it('renders nothing until the browser offers an install', () => {
    render(<InstallAppButton />);
    expect(button()).toBeNull();
  });

  it('appears once beforeinstallprompt fires, and suppresses the default mini-infobar', () => {
    render(<InstallAppButton />);
    const event = fireBeforeInstallPrompt();

    expect(button()).toBeInTheDocument();
    // Not cancelling would let Chrome show its own infobar alongside ours.
    expect(event.defaultPrevented).toBe(true);
  });

  it('opens the install dialog on click and spends the event', async () => {
    render(<InstallAppButton />);
    const event = fireBeforeInstallPrompt();

    await act(async () => { button().click(); });

    expect(event.prompt).toHaveBeenCalledTimes(1);
    // The event is single-use: reusing a spent one throws, so the button must
    // retire itself rather than stay clickable.
    await waitFor(() => expect(button()).toBeNull());
  });

  it('retires the button even when the student declines', async () => {
    render(<InstallAppButton />);
    fireBeforeInstallPrompt({ outcome: 'dismissed' });

    await act(async () => { button().click(); });

    await waitFor(() => expect(button()).toBeNull());
  });

  it('disappears when the install completes', async () => {
    render(<InstallAppButton />);
    fireBeforeInstallPrompt();
    expect(button()).toBeInTheDocument();

    act(() => { window.dispatchEvent(new Event('appinstalled')); });
    await waitFor(() => expect(button()).toBeNull());
  });

  // Running from the home screen means the app is already installed; a stray
  // beforeinstallprompt must not offer to install it a second time.
  it('stays hidden when already running installed', () => {
    mockDisplayMode(true);
    render(<InstallAppButton />);
    fireBeforeInstallPrompt();
    expect(button()).toBeNull();
  });
});
