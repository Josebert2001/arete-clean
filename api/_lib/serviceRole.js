// ============================================================================
//  Arete — Supabase service-role client (Vercel functions)
//
//  THE ONLY FILE IN THE CODEBASE THAT READS SUPABASE_SERVICE_ROLE_KEY.
//
//  This key bypasses Row Level Security completely, so every use of it is a
//  place where the database's own protections do not apply and the calling code
//  is solely responsible for scoping the query. Keeping the read in one module
//  means that list of places stays greppable: search for `serviceRoleClient(`.
//
//  Previously this lived inside googleAuth.js, which was fine while the Google
//  flow was the only privileged writer. api/extract.js is now a second one — it
//  writes course_materials.extracted_text, which must NOT be settable by the
//  browser — so the client moved here rather than the key being read in two
//  places.
//
//  RULES FOR ANY NEW CALLER
//  1. Always scope the query by an ALREADY-VERIFIED user id (from
//     getStudentFromRequest), never by an id or filter taken from the request
//     body. RLS is not there to catch your mistake any more.
//  2. Prefer the caller's own RLS-scoped client (`student.db`) whenever the
//     operation is something the user is genuinely allowed to do themselves.
//     Reach for this only when the server must write something the user must
//     not be able to forge.
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// True when a privileged write is possible at all. Callers use this to degrade
// gracefully (see api/extract.js) rather than throwing on a deployment that
// hasn't been given the key.
export function serviceRoleConfigured() {
  return Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);
}

// Lazily created — most requests never need it, and building it eagerly would
// charge every cold start for a client that usually goes unused.
let _serviceClient = null;

export function serviceRoleClient() {
  if (!serviceRoleConfigured()) return null;
  if (!_serviceClient) {
    _serviceClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _serviceClient;
}
