import { useEffect, useState } from 'react';

// Probes an AI endpoint on mount so pages can show the unconfigured state
// immediately instead of after the user has composed a message.
// Returns 'checking' | 'ready' | 'unavailable'.
export function useApiAvailability(url) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchJsonWithFallback(
          url,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ probe: true }),
          },
          'unavailable'
        );
        if (cancelled) return;
        setStatus(data.configured ? 'ready' : 'unavailable');
      } catch {
        if (!cancelled) setStatus('unavailable');
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  return status;
}

export async function fetchJsonWithFallback(url, options, fallbackError) {
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';

  // Vite serves /api/* as static files during local dev, so the request can
  // succeed with JavaScript content instead of JSON. Surface a useful message
  // instead of letting the caller parse a blank or broken payload.
  if (!contentType.toLowerCase().includes('application/json')) {
    return { error: fallbackError };
  }

  const data = await res.json().catch(() => ({}));
  return { ...data, responseStatus: res.status };
}
