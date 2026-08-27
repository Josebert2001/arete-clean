-- Per-user, cross-instance rate limiting for the /api/* endpoints that spend
-- real quota (tutor, explainer, simplify, summarize, run, research).
-- Run manually in the Supabase SQL editor, same as every other migration here.
-- Idempotent: safe to re-run.
--
-- WHY THIS EXISTS
-- The limiter in api/_lib/request-policy.js keeps its counters in a globalThis
-- Map. That is per-lambda-instance memory: Vercel runs many instances at once
-- and each cold start wipes the Map, so the effective ceiling was
-- (limit x concurrent instances x source IPs) rather than the stated limit.
-- Postgres is state every instance shares, so a counter kept here is the real
-- one. The in-memory limiter stays in front of it as a cheap per-IP guard that
-- costs no round-trip on an unauthenticated flood.
--
-- WHY IT IS KEYED ON auth.uid() AND NOT ON AN IP
-- Every endpoint using this now requires sign-in, so there is a stable subject
-- to charge. Rotating IPs — the trivial bypass for the old limiter — buys an
-- abuser nothing here; they would need to create and verify a new account per
-- bucket instead.

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket   TEXT        PRIMARY KEY,
  count    INTEGER     NOT NULL DEFAULT 0,
  reset_at TIMESTAMPTZ NOT NULL
);

-- Lets the sweep at the bottom find expired rows without a full scan.
CREATE INDEX IF NOT EXISTS rate_limits_reset_at_idx ON rate_limits (reset_at);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Deliberately NO policies and no direct grants. The table is reachable only
-- through consume_rate_limit() below, which is SECURITY DEFINER and so runs as
-- the owner, bypassing RLS. A client holding the anon key can neither read the
-- counters (which would leak usage patterns per user) nor write one.
REVOKE ALL ON rate_limits FROM anon, authenticated;

-- Atomically charges one request against a bucket and reports the verdict.
--
-- The window is fixed, not sliding: the first request of a window sets reset_at,
-- and the counter clears on the first request after it passes. Same semantics as
-- the in-memory limiter it backs, so the two agree on what a "limit" means.
--
-- On p_limit / p_window_seconds being caller-supplied: this function is granted
-- to `authenticated`, so a student could invoke it directly with their own token
-- and made-up arguments. That is harmless by construction — the arguments affect
-- only the RETURNED verdict, which the client cannot make the server believe,
-- while the INCREMENT always lands on their own bucket. The worst a student can
-- do to themselves is spend their own allowance faster, or (by passing a long
-- window on an already-expired bucket) lock themselves out for longer. Neither
-- reaches another user: the bucket key is built from auth.uid() in here, never
-- from anything passed in. Note this is exactly why the GLOBAL provider budget
-- is NOT implemented as a sibling function granted to authenticated — see the
-- note at the bottom of this file.
CREATE OR REPLACE FUNCTION consume_rate_limit(
  p_namespace      TEXT,
  p_limit          INTEGER,
  p_window_seconds INTEGER
)
RETURNS TABLE (allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
-- Pinned so a caller cannot shadow `rate_limits` or a built-in with something
-- of their own from a schema earlier in their search_path.
SET search_path = public, pg_temp
AS $$
DECLARE
  v_uid    UUID := auth.uid();
  v_now    TIMESTAMPTZ := NOW();
  v_bucket TEXT;
  v_count  INTEGER;
  v_reset  TIMESTAMPTZ;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'consume_rate_limit requires an authenticated caller';
  END IF;

  IF p_limit IS NULL OR p_limit < 1 OR p_window_seconds IS NULL OR p_window_seconds < 1 THEN
    RAISE EXCEPTION 'consume_rate_limit needs a positive limit and window';
  END IF;

  v_bucket := p_namespace || ':' || v_uid::TEXT;

  -- One statement, so concurrent requests from the same user serialise on the
  -- row lock instead of racing a read-then-write.
  INSERT INTO rate_limits AS rl (bucket, count, reset_at)
  VALUES (v_bucket, 1, v_now + make_interval(secs => p_window_seconds))
  ON CONFLICT (bucket) DO UPDATE
    SET count = CASE WHEN rl.reset_at <= v_now THEN 1 ELSE rl.count + 1 END,
        reset_at = CASE
                     WHEN rl.reset_at <= v_now THEN v_now + make_interval(secs => p_window_seconds)
                     ELSE rl.reset_at
                   END
  RETURNING rl.count, rl.reset_at INTO v_count, v_reset;

  RETURN QUERY SELECT (v_count <= p_limit), GREATEST(0, p_limit - v_count), v_reset;
END;
$$;

REVOKE ALL ON FUNCTION consume_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION consume_rate_limit(TEXT, INTEGER, INTEGER) TO authenticated;

-- Housekeeping. Expired rows are harmless (the function resets them in place)
-- but the table would otherwise grow one row per user per namespace forever.
-- Callable by the dashboard/service role only; wire it to pg_cron if you'd
-- rather it ran nightly than be forgotten.
CREATE OR REPLACE FUNCTION prune_rate_limits()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM rate_limits WHERE reset_at < NOW() - INTERVAL '1 day';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION prune_rate_limits() FROM PUBLIC, anon, authenticated;

-- ─── NOT DONE HERE: the global provider budget ───────────────────────────────
-- A per-user limit bounds what one student can spend; it does not bound what
-- the whole user base can spend in a day. That backstop deliberately does NOT
-- live in this file, because any function granted to `authenticated` that
-- decrements a SHARED counter hands every signed-in student a way to exhaust
-- the budget for everyone — turning a spend control into a denial-of-service
-- lever. Set the hard cap where it cannot be reached from the app at all:
--   * Gemini  — Google Cloud console → APIs & Services → Quotas, plus a
--               billing budget with a hard cap on the project
--   * Groq    — console.groq.com → Settings → Limits
--   * JDoodle — the free plan is already a hard 20/day; nothing to set
-- Those are enforced by the provider, so they hold even if this app is bypassed.

-- PostgREST caches the schema; without this the API answers PGRST202
-- ("Could not find the function public.consume_rate_limit") until it reloads.
-- See 20260728000000_departments.sql for the fuller explanation.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
