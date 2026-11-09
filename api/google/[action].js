// ============================================================================
//  Arete — Google integration router (Vercel)
//  One serverless function serving /api/google/{connect,callback,status,
//  disconnect,calendar-sync}. The handlers live in api/_google/ (underscore
//  folders are not deployed as functions) and are unchanged; this file only
//  picks one. It exists because Vercel's Hobby plan caps a deployment at 12
//  functions, and five separate Google files pushed the project past it.
//  The public URLs are identical, so GOOGLE_REDIRECT_URI and the
//  `Path=/api/google` OAuth cookie need no change.
//
//  Handlers are imported lazily: calendar-sync pulls in `googleapis`, which
//  takes seconds to load, and status/connect must not pay that on a cold start
//  (see the note at the top of api/_lib/googleAuth.js).
// ============================================================================

const ROUTES = {
  connect: () => import('../_google/connect.js'),
  callback: () => import('../_google/callback.js'),
  status: () => import('../_google/status.js'),
  disconnect: () => import('../_google/disconnect.js'),
  'calendar-sync': () => import('../_google/calendar-sync.js'),
};

// The action comes from the request path, not req.query: Vercel merges the
// dynamic segment into req.query alongside the query string, so a
// `?action=` parameter must never be able to choose a different handler.
export function actionFromRequest(req) {
  try {
    const { pathname } = new URL(req.url || '', 'http://localhost');
    const match = pathname.match(/^\/api\/google\/([^/]+)\/?$/);
    if (match) return decodeURIComponent(match[1]);
  } catch {
    // Malformed URL or escape sequence — fall through to "no action".
  }
  return null;
}

export default async function handler(req, res) {
  const action = actionFromRequest(req);
  const load = action && Object.hasOwn(ROUTES, action) ? ROUTES[action] : null;
  if (!load) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(404).json({ error: 'Not found' });
  }
  const { default: routeHandler } = await load();
  return routeHandler(req, res);
}
