// The `profiles` columns the app reads, split by the migration that added them.
//
// Migrations here are applied by hand in the Supabase SQL editor, so deployed
// code can meet a database that does not have a column yet. PostgREST rejects
// the WHOLE select when one named column is missing — for every user, signed
// up or not — and AuthContext would read that as "no profile", sending every
// student without a cached copy back to setup. Selecting the optional column
// separately lets the app fall back to the columns that are known to exist.
export const BASE_PROFILE_COLUMNS =
  'id, full_name, reg_number, level, department, department_other, selected_courses, created_at';

// Added by supabase/migrations/20261108010000_independent_learners.sql.
export const LEARNING_MODE_COLUMN = 'learning_mode';

export const PROFILE_COLUMNS = `${BASE_PROFILE_COLUMNS}, ${LEARNING_MODE_COLUMN}`;

// True when a PostgREST/Postgres error says `column` does not exist: 42703 is
// Postgres's undefined_column (a select), PGRST204 is PostgREST's "not in the
// schema cache" (an insert/update). Both name the column in the message, which
// keeps an unrelated failure from being mistaken for an unapplied migration.
export function isMissingColumnError(error, column) {
  if (!error || !column) return false;
  if (error.code !== '42703' && error.code !== 'PGRST204') return false;
  return String(error.message ?? '').includes(column);
}
