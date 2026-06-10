// ============================================================================
//  Arete — Server-side Supabase helper (Vercel functions)
//  Resolves the signed-in student from a request's Bearer token and returns
//  a Supabase client scoped to that user, so Row Level Security applies to
//  every query (no service-role key in the request path).
//
//  Uses the same env vars as the frontend (set in Vercel → Environment
//  Variables): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY.
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// Returns { user, db } for a valid signed-in student, or null when the
// request is anonymous, the token is invalid/expired, or Supabase isn't
// configured. Callers treat null as "anonymous student" — never an error.
export async function getStudentFromRequest(req) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const authHeader = req.headers?.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  if (!token) return null;

  const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const { data, error } = await db.auth.getUser(token);
    if (error || !data?.user) return null;
    return { user: data.user, db };
  } catch {
    return null;
  }
}
