import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDepartment, DEFAULT_DEPARTMENT } from './departments';

// Loads the signed-in student's department catalogue, code-split per
// department (see departments.js). Signed-out visitors get the default
// Cybersecurity catalogue. Returns { catalogue, department, status } where
// status is 'loading' | 'ready' | 'error'. catalogue is null unless status is
// 'ready', so callers must handle the null case before indexing into it.
export function useCatalogue() {
  const { user, profile, authLoading, profileLoading } = useAuth();
  // Auth resolves asynchronously, so `profile` is null on the first render of
  // EVERY session — signed-in or not. Reading the department straight off it
  // would resolve DEFAULT_DEPARTMENT, paint a full Cybersecurity Course Hub,
  // and only then swap to the student's real catalogue. Hold at 'loading'
  // until we actually know who they are; a genuinely signed-out visitor
  // settles immediately and still gets the default.
  const resolving = authLoading || (Boolean(user) && (profileLoading || !profile));
  const slug = profile?.department || DEFAULT_DEPARTMENT;
  const [state, setState] = useState({ slug, catalogue: null, status: 'loading' });

  useEffect(() => {
    if (resolving) return;
    let active = true;
    getDepartment(slug).loadCatalogue()
      .then(catalogue => {
        if (active) setState({ slug, catalogue, status: 'ready' });
      })
      .catch(() => {
        // A failed dynamic import (stale chunk after a deploy, offline) would
        // otherwise leave every catalogue page stuck on its loading skeleton
        // forever. Report it as a state the pages render a retry for.
        if (active) setState({ slug, catalogue: null, status: 'error' });
      });
    return () => { active = false; };
  }, [slug, resolving]);

  // Until the effect for a new slug resolves — or while we still don't know
  // which department to load — report loading rather than the resolved state
  // left over from the previous department.
  if (resolving || state.slug !== slug) {
    return { catalogue: null, department: resolving ? null : getDepartment(slug), status: 'loading' };
  }
  return { catalogue: state.catalogue, department: getDepartment(slug), status: state.status };
}
