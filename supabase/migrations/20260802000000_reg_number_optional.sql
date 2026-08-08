-- ─── Reg number becomes optional ──────────────────────────────────────────────
-- Run manually in the Supabase SQL editor (same as every other migration here).
-- Idempotent: safe to re-run.
--
-- Fresh students often don't have a reg number yet at signup — it was the
-- only hard blocker in the onboarding funnel. The format CHECK
-- (profiles_reg_number_valid, added in setup-supabase.mjs) is left in place:
-- in Postgres a CHECK passes automatically on NULL, so it still rejects junk
-- whenever a value IS provided. The client must always save NULL (never '')
-- for "no reg number yet", or the CHECK fires on the empty string.

ALTER TABLE profiles ALTER COLUMN reg_number DROP NOT NULL;

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
