import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { careerRequest } from '../utils/careerApi';

// No shared localStorage: a different account must never inherit career work.
export function useCareer() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [state, setState] = useState({ owner: null, status: 'loading', profile: null, notes: [], error: '' });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let cancelled = false;
    if (!userId) return;
    careerRequest('status', {}, userId).then(data => {
      if (!cancelled) setState({ owner: userId, status: 'ready', profile: data.profile, notes: data.notes, error: '' });
    }).catch(err => {
      if (!cancelled) setState({ owner: userId, status: 'error', profile: null, notes: [], error: err.message });
    });
    return () => { cancelled = true; };
  }, [userId, revision]);
  const refresh = useCallback(() => setRevision(value => value + 1), []);
  const visible = state.owner === userId && userId
    ? state : { status: userId ? 'loading' : 'signed_out', profile: null, notes: [], error: '' };
  return { ...visible, refresh };
}
