import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// PKCE flow: OAuth returns a short-lived ?code= that the client exchanges for
// tokens behind the scenes, so the access/refresh tokens never appear in the
// URL fragment (address bar, history, logs). detectSessionInUrl (default true)
// performs the exchange automatically on the /signin redirect.
export const supabase = (url && key)
  ? createClient(url, key, { auth: { flowType: 'pkce' } })
  : null;
export const isConfigured = Boolean(url && key);

// Current session token for authenticating /api/* calls; null when signed out.
// getSession() refreshes an expired token automatically.
export async function getAccessToken() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}
