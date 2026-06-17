import { useState, useEffect } from 'react';
import { loadTrack } from './trackConfig';

// Loads a track's full content, code-split per track (see trackConfig.js).
// Returns { track, status } where status is 'loading' | 'ready' | 'not-found'.
// track is null until the chunk resolves.
export function useTrack(slug) {
  const [state, setState] = useState({ slug, track: null, status: 'loading' });

  useEffect(() => {
    let active = true;
    loadTrack(slug).then(track => {
      if (active) setState({ slug, track, status: track ? 'ready' : 'not-found' });
    });
    return () => { active = false; };
  }, [slug]);

  // Until the effect for a new slug resolves, report loading rather than the
  // resolved state left over from the previous slug.
  if (state.slug !== slug) return { track: null, status: 'loading' };
  return { track: state.track, status: state.status };
}
