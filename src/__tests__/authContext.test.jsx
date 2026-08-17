import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Shared handle so the test can drive the mocked Supabase auth client: fire
// arbitrary auth events and count how many times the profile row was fetched.
const mocks = vi.hoisted(() => ({
  state: { listener: null, profileSelects: 0, session: { user: { id: 'u1' } }, profileError: null },
}));

vi.mock('../lib/supabase', () => ({
  isConfigured: true,
  getAccessToken: async () => null,
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: mocks.state.session } }),
      onAuthStateChange: (cb) => {
        mocks.state.listener = cb;
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => {
            mocks.state.profileSelects += 1;
            if (mocks.state.profileError) return { data: null, error: mocks.state.profileError };
            return { data: { id: 'u1', full_name: 'Ada', department: 'cybersecurity' } };
          },
        }),
      }),
    }),
  },
}));

// Records every render so the test can assert on the *sequence* of states, not
// just the settled one — a profileLoading blip is invisible from the end state.
const renders = [];

function Probe() {
  const { user, profile, authLoading, profileLoading } = useAuth();
  renders.push({ user, profile, authLoading, profileLoading });
  return (
    <div>
      <span data-testid="uid">{user?.id ?? 'none'}</span>
      <span data-testid="name">{profile?.full_name ?? 'none'}</span>
    </div>
  );
}

const renderProvider = () => render(<AuthProvider><Probe /></AuthProvider>);

beforeEach(() => {
  renders.length = 0;
  mocks.state.listener = null;
  mocks.state.profileSelects = 0;
  mocks.state.session = { user: { id: 'u1' } };
  mocks.state.profileError = null;
  sessionStorage.clear();
  localStorage.clear();
});

describe('AuthContext session handling', () => {
  it('loads the session and profile once on mount', async () => {
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('name')).toHaveTextContent('Ada'));
    expect(screen.getByTestId('uid')).toHaveTextContent('u1');
    // getSession and the INITIAL_SESSION event both announce the same student;
    // only one of them may fetch the profile.
    expect(mocks.state.profileSelects).toBe(1);
  });

  // Regression: supabase-js runs _recoverAndRefresh() on every hidden→visible
  // transition and ends it with an unconditional SIGNED_IN notification. Acting
  // on that re-announcement refetched the profile, which flipped profileLoading
  // and made useCatalogue report 'loading' again — every catalogue page
  // remounted, so returning from another tab looked like a page refresh.
  it('ignores a re-announced session for the student already signed in', async () => {
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('name')).toHaveTextContent('Ada'));

    const settledUser = renders.at(-1).user;
    const settledProfile = renders.at(-1).profile;
    renders.length = 0;

    // Two tab switches back, plus the hourly token refresh.
    await act(async () => {
      await mocks.state.listener('SIGNED_IN', mocks.state.session);
      await mocks.state.listener('TOKEN_REFRESHED', mocks.state.session);
      await mocks.state.listener('SIGNED_IN', mocks.state.session);
    });

    expect(mocks.state.profileSelects).toBe(1);
    expect(renders.some(r => r.profileLoading)).toBe(false);
    // Object identity must hold too: a fresh `user` object alone re-runs every
    // effect that depends on it.
    expect(renders.every(r => r.user === settledUser)).toBe(true);
    expect(renders.every(r => r.profile === settledProfile)).toBe(true);
    // A re-announcement is not a sign-in, so it must not re-arm the one-shot
    // "resume where you left off" redirect in AuthStateWatcher.
    expect(sessionStorage.getItem('arete-just-signed-in')).toBeNull();
  });

  it('still applies a real sign-out and a later sign-in', async () => {
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('name')).toHaveTextContent('Ada'));

    await act(async () => { await mocks.state.listener('SIGNED_OUT', null); });
    expect(screen.getByTestId('uid')).toHaveTextContent('none');
    expect(screen.getByTestId('name')).toHaveTextContent('none');

    await act(async () => { await mocks.state.listener('SIGNED_IN', { user: { id: 'u2' } }); });
    await waitFor(() => expect(screen.getByTestId('uid')).toHaveTextContent('u2'));
    expect(mocks.state.profileSelects).toBe(2);
    expect(sessionStorage.getItem('arete-just-signed-in')).toBe('1');
  });

  // Regression: reopening the installed PWA while offline restores the
  // cached Supabase session (no network needed to decode a stored JWT), but
  // the profile row fetch fails. That failure must not read as "this student
  // has no profile" — that sent already-onboarded students back to
  // setup-profile every time they opened the app offline.
  it('falls back to the cached profile when the fetch fails offline', async () => {
    const { unmount } = renderProvider();
    await waitFor(() => expect(screen.getByTestId('name')).toHaveTextContent('Ada'));
    unmount();

    // Simulate reopening the app offline: a fresh provider instance, same
    // cached session, but the profile fetch now fails.
    mocks.state.profileError = { message: 'Failed to fetch' };
    renderProvider();

    await waitFor(() => expect(screen.getByTestId('uid')).toHaveTextContent('u1'));
    expect(screen.getByTestId('name')).toHaveTextContent('Ada');
  });
});
