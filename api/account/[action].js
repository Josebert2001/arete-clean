// Consolidate account operations to preserve Vercel Hobby's function budget.
// Existing /api/account/delete requests keep their URL and behavior.
const ROUTES = {
  delete: () => import('../_lib/accountDelete.js'),
  career: () => import('../_lib/careerHandler.js'),
};

export default async function accountRouter(req, res) {
  let action;
  try {
    const pathname = new URL(req.url || '', 'http://localhost').pathname;
    const match = pathname.match(/^\/api\/account\/([^/]+)\/?$/);
    if (match) action = decodeURIComponent(match[1]);
  } catch { /* malformed path: reject below */ }
  // Vercel merges query strings with route parameters. The path alone chooses
  // the handler, so ?action=delete cannot redirect a career request to deletion.
  if (!action || !Object.hasOwn(ROUTES, action)) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(404).json({ error: 'Unknown account operation.' });
  }
  const { default: handler } = await ROUTES[action]();
  return handler(req, res);
}
