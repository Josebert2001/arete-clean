import { fetchJsonWithFallback } from './apiClient';
import { authHeaders } from '../lib/supabase';

// The paste-your-own Code Explainer page's request. The endpoint requires
// sign-in (api/explainer.js answers 401 without a token); this call once sent
// no Authorization header, so every signed-in student was told "Please sign in
// to use the code explainer." The in-app "Explain this code" buttons go through
// utils/explainCode.js instead.
export async function askExplainer(code, language) {
  return fetchJsonWithFallback(
    '/api/explainer',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ code, language }),
    },
    'The Code Explainer needs the Vercel API routes. Run the app with `vercel dev` or deploy it to use this feature.'
  );
}
