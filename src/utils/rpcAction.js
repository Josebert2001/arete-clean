import { supabase } from '../lib/supabase';

/**
 * Calls one of the attendance "action" RPCs — the SECURITY DEFINER functions
 * that answer a single `{ ok, message }` row (admin_set_role, invite_lecturer,
 * accept_lecturer_invite, …) — and flattens the reply for a status line.
 *
 * `failText` is shown when the call itself fails (network, missing function);
 * a refusal from the function arrives as ok: false with its own message.
 * `row` is the raw reply, for functions that return extra columns.
 */
export async function rpcAction(name, args, failText = 'Something went wrong. Please try again.') {
  const { data, error } = await supabase.rpc(name, args);
  if (error) return { ok: false, text: failText, row: null };
  const row = Array.isArray(data) ? data[0] : data;
  return { ok: !!row?.ok, text: row?.message ?? 'Done.', row };
}
