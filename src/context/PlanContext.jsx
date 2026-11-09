import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { getBillingStatus } from '../utils/billingApi';
import { PREMIUM_PASS } from '../data/plans';

// Who is Premium, and whether billing is switched on at all.
//
// Fetched once per signed-in account from /api/billing (action: 'status'),
// which answers from premium_passes via the student's own RLS-scoped client.
//
// `gatesActive` is the one flag the client-side gates read. It is true only
// when the server said billing is on AND this student is not Premium. Every
// other state — still loading, API unreachable (offline PWA, local `npm run
// dev` with no API), billing not configured — leaves it false, so a gate never
// blocks a student on a guess. The server-side quotas are the ones that hold;
// these are a courtesy that matches them.
const OFF = {
  status: 'loading',
  enabled: false,
  premium: false,
  premiumUntil: null,
  pass: PREMIUM_PASS,
};

const PlanContext = createContext({
  ...OFF,
  status: 'ready',
  isPremium: false,
  gatesActive: false,
  refresh: () => {},
});

export function PlanProvider({ children }) {
  const { user, authLoading } = useAuth();
  const userId = user?.id ?? null;
  const [state, setState] = useState(OFF);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (authLoading) return undefined;
    let cancelled = false;
    (async () => {
      let data;
      try {
        data = await getBillingStatus();
      } catch (err) {
        data = { error: err?.message || 'unreachable' };
      }
      if (cancelled) return;
      if (typeof data?.enabled !== 'boolean') {
        setState({ ...OFF, status: 'error' });
        return;
      }
      setState({
        status: 'ready',
        enabled: data.enabled,
        premium: Boolean(data.premium),
        premiumUntil: data.premiumUntil ?? null,
        pass: data.pass ?? PREMIUM_PASS,
      });
    })();
    return () => { cancelled = true; };
  }, [authLoading, userId, nonce]);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  // A pass that lapses mid-session should stop counting without a reload, so
  // re-ask the server the moment it ends. setTimeout tops out near 24.8 days;
  // a pass further out than that is re-checked on the next page load anyway.
  useEffect(() => {
    if (!state.premium || !state.premiumUntil) return undefined;
    const ms = new Date(state.premiumUntil).getTime() - Date.now();
    if (!Number.isFinite(ms) || ms > 2 ** 31 - 1) return undefined;
    const timer = setTimeout(refresh, Math.max(0, ms) + 1000);
    return () => clearTimeout(timer);
  }, [state.premium, state.premiumUntil, refresh]);

  const value = useMemo(() => {
    const isPremium = Boolean(state.premium);
    return {
      ...state,
      isPremium,
      gatesActive: state.status === 'ready' && state.enabled && Boolean(userId) && !isPremium,
      refresh,
    };
  }, [state, userId, refresh]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- Hook and context are co-located; Fast Refresh reloads this file fully.
export function usePlan() {
  return useContext(PlanContext);
}
