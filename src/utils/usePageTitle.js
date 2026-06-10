import { useEffect } from 'react';

const DEFAULT_TITLE = 'Arete — Code Your Excellence';

// Sets the document title for the current page and restores the default on
// unmount so the SPA's tab label always matches what's on screen.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Arete` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
