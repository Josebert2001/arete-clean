import { useCallback, useRef } from 'react';
import { hasExplained, loadExplained } from '../data/lectureNotes/explained';
import { explanationHash } from '../utils/explainCode';

// Resolves a pre-generated code walkthrough for a course, or null.
//
// Returns { getPregenerated, hasPregenerated } to spread onto <ExplainCode>.
// The flag is synchronous (the glob map is built at compile time) so the button
// can render offline; the getter is async.
// Async on purpose: the generated map is a lazy chunk, so a component cannot
// know at render time whether an explanation exists. Asking for it inside the
// click handler — where a spinner is already acceptable — sidesteps the whole
// question, and after the first call the promise is held here so the chunk is
// fetched once per course, not once per listing.
//
// A course with no generated file resolves null and the caller falls through to
// the live API, which is the same path a course whose listing was just edited
// takes (the hash stops matching).
export function useExplanations(key) {
  const ref = useRef({ key: null, promise: null });

  const getPregenerated = useCallback(async (code, language, mode) => {
    if (!key) return null;
    if (ref.current.key !== key) {
      ref.current = { key, promise: loadExplained(key) };
    }
    const map = await ref.current.promise;
    return map?.[explanationHash(code, language, mode)] ?? null;
  }, [key]);

  return { getPregenerated, hasPregenerated: hasExplained(key) };
}
