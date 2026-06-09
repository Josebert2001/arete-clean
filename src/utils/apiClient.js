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
