import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { connectGoogle, disconnectGoogle, getGoogleStatus } from '../utils/googleApi';

// Tracks whether the signed-in student has connected their Google account
// (Calendar + Drive scopes). Separate from AuthContext's own Google
// sign-in — this is a feature-level grant, not a login method.
export function useGoogleConnection() {
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  // Set when the last check could not reach a verdict (rate limited, offline,
  // server error). Distinct from `connected: false`, which is a real answer.
  const [statusError, setStatusError] = useState('');

  const refresh = useCallback(async () => {
    if (!user) { setConnected(false); setStatusError(''); setLoading(false); return; }
    setLoading(true);
    try {
      const data = await getGoogleStatus();

      // /api/google/status now charges a per-user, Postgres-backed budget, so a
      // 429 is a normal outcome for a student who reopens the Planner a lot —
      // and it resolves rather than throwing (fetchJsonWithFallback returns the
      // body plus responseStatus). Treating any non-answer as "not connected"
      // would show the Connect button to someone already connected, and one tap
      // would spend a `google-connect` grant on a redundant OAuth consent. So:
      // keep whatever we last knew and report why it is stale.
      if (data.responseStatus && data.responseStatus !== 200) {
        setStatusError(
          data.kind === 'rate_limited'
            ? 'Checked your Google connection too often just now. This will sort itself out in a few minutes.'
            : 'Could not check your Google connection just now.'
        );
        return;
      }
      if (typeof data.connected !== 'boolean') {
        setStatusError('Could not check your Google connection just now.');
        return;
      }

      setStatusError('');
      setConnected(data.connected);
      setConfigured(data.configured !== false);
    } catch {
      // Network-level failure — again indeterminate, not a disconnection.
      setStatusError('Could not check your Google connection just now.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // refresh() itself may set state synchronously (the `!user` branch), so
    // it's invoked from inside a microtask rather than as a direct effect
    // statement — same pattern as useApiAvailability in utils/apiClient.js.
    Promise.resolve().then(() => refresh());
  }, [refresh]);

  const connect = useCallback((returnTo) => connectGoogle(returnTo), []);

  const disconnect = useCallback(async () => {
    const data = await disconnectGoogle();
    // Same trap as refresh(): a denied disconnect resolves with a 429/500 body
    // rather than throwing, so flipping the flag unconditionally would show the
    // account as disconnected while the row and the refresh token still exist.
    if (data?.responseStatus && data.responseStatus !== 200) {
      throw new Error(data.error || 'Could not disconnect Google. Please try again.');
    }
    setConnected(false);
    setStatusError('');
  }, []);

  return { connected, configured, loading, statusError, connect, disconnect, refresh };
}
