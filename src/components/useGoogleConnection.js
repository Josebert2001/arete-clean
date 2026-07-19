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

  const refresh = useCallback(async () => {
    if (!user) { setConnected(false); setLoading(false); return; }
    setLoading(true);
    try {
      const data = await getGoogleStatus();
      setConnected(Boolean(data.connected));
      setConfigured(data.configured !== false);
    } catch {
      setConnected(false);
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
    await disconnectGoogle();
    setConnected(false);
  }, []);

  return { connected, configured, loading, connect, disconnect, refresh };
}
