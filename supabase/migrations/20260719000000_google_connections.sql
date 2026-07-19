-- Google OAuth connection storage for Calendar sync + Drive import.
-- Run this in the Supabase SQL editor (or `supabase db push` yourself) —
-- Claude Code does not execute Supabase migrations.

CREATE TABLE IF NOT EXISTS google_connections (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  refresh_token TEXT        NOT NULL,
  scope         TEXT        NOT NULL,
  connected_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE google_connections ENABLE ROW LEVEL SECURITY;

-- Defense-in-depth: authenticated users can see THAT a connection exists
-- (scope/dates) but never refresh_token, even if a future query bug does
-- `select *` against this table.
REVOKE ALL ON google_connections FROM authenticated, anon;
GRANT SELECT (user_id, scope, connected_at, updated_at) ON google_connections TO authenticated;
GRANT DELETE ON google_connections TO authenticated;

DROP POLICY IF EXISTS "Users read own connection status" ON google_connections;
CREATE POLICY "Users read own connection status" ON google_connections
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own connection" ON google_connections;
CREATE POLICY "Users delete own connection" ON google_connections
  FOR DELETE USING (auth.uid() = user_id);

-- Deliberately no INSERT/UPDATE policy for authenticated/anon — every write
-- goes through api/google/callback.js using the Supabase service-role key
-- (server-only), which bypasses RLS by design.
