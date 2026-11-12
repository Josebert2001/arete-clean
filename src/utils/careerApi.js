import { authHeaders } from '../lib/supabase';
import { fetchJsonWithFallback } from './apiClient';

export async function careerRequest(action, fields = {}, expectedUserId) {
  const result = await fetchJsonWithFallback('/api/account/career', {
    method: 'POST', cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
    body: JSON.stringify({ ...fields, action, expectedUserId }),
  }, 'Career matching needs the application API. Use a Vercel preview or vercel dev.');
  if (result.error) throw new Error(result.error);
  return result;
}
