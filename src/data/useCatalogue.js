import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDepartment, DEFAULT_DEPARTMENT } from './departments';

// Loads the signed-in student's department catalogue, code-split per
// department (see departments.js). Signed-out students / profiles still
// loading get the default Cybersecurity catalogue, matching today's
// behaviour. Returns { catalogue, department, status } where status is
// 'loading' | 'ready' | 'error'. catalogue is null unless status is 'ready',
// so callers must handle the null case before indexing into it.
export function useCatalogue() {
  const { profile } = useAuth();
  const slug = profile?.department || DEFAULT_DEPARTMENT;
  const [state, setState] = useState({ slug, catalogue: null, status: 'loading' });

  useEffect(() => {
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
  }, [slug]);

  // Until the effect for a new slug resolves, report loading rather than the
  // resolved state left over from the previous department.
  if (state.slug !== slug) return { catalogue: null, department: getDepartment(slug), status: 'loading' };
  return { catalogue: state.catalogue, department: getDepartment(slug), status: state.status };
}
