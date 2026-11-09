-- Areté Premium: payments and the passes they buy.
-- Run manually in the Supabase SQL editor, same as every other migration here.
-- Idempotent: safe to re-run. Apply BEFORE setting PAYSTACK_SECRET_KEY in
-- Vercel — billing stays switched off until that key exists, so deploying the
-- code first is harmless, but turning billing on without these tables makes
-- every checkout fail.
--
-- TWO TABLES, AND WHY
--   billing_payments — one row per checkout attempt, created by api/billing.js
--                      BEFORE the student is sent to Paystack. It pins the
--                      price and duration that were quoted, so a later price
--                      change cannot alter what an in-flight payment buys, and
--                      it binds the Paystack reference to the account that
--                      started it (the reference is the only thing Paystack
--                      hands back).
--   premium_passes   — the entitlement itself: "this account is Premium from
--                      X to Y". A student is Premium while any pass has
--                      ends_at > NOW(). Kept separate from payments so a pass
--                      can also come from somewhere that is not a payment —
--                      a manual grant, a sponsor, a trial — without inventing
--                      a fake payment row.
--
-- WHO MAY WRITE
-- Nobody signed in. Both tables are read-own for `authenticated` and have no
-- INSERT/UPDATE/DELETE grant at all; the only writer is the service role, from
-- api/billing.js and api/paystack-webhook.js, after Paystack itself confirms the
-- payment. profiles is deliberately NOT where Premium lives: students can UPDATE
-- their own profile row, so a premium_until column there would be self-grantable.

CREATE TABLE IF NOT EXISTS billing_payments (
  reference               TEXT        PRIMARY KEY,
  -- SET NULL, not CASCADE: deleting an account removes who paid, but keeps the
  -- bare financial record (reference, amount, date) the books need.
  user_id                 UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  plan                    TEXT        NOT NULL,
  amount_kobo             INTEGER     NOT NULL CHECK (amount_kobo > 0),
  currency                TEXT        NOT NULL DEFAULT 'NGN',
  duration_days           INTEGER     NOT NULL CHECK (duration_days > 0),
  provider                TEXT        NOT NULL DEFAULT 'paystack',
  status                  TEXT        NOT NULL DEFAULT 'pending'
                                      CHECK (status IN ('pending', 'success', 'failed', 'abandoned')),
  provider_transaction_id TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at                 TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS billing_payments_user_idx
  ON billing_payments (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS premium_passes (
  id         BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source     TEXT        NOT NULL CHECK (source IN ('paystack', 'manual', 'sponsor', 'trial')),
  -- UNIQUE is the idempotency guarantee: the browser's return trip and the
  -- webhook both try to settle the same payment, and only one pass can exist
  -- for it however they interleave.
  reference  TEXT        UNIQUE REFERENCES billing_payments(reference) ON DELETE SET NULL,
  starts_at  TIMESTAMPTZ NOT NULL,
  ends_at    TIMESTAMPTZ NOT NULL,
  note       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

CREATE INDEX IF NOT EXISTS premium_passes_user_ends_idx
  ON premium_passes (user_id, ends_at DESC);

ALTER TABLE billing_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_passes   ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON billing_payments FROM anon, authenticated;
REVOKE ALL ON premium_passes   FROM anon, authenticated;
GRANT SELECT ON billing_payments TO authenticated;
GRANT SELECT ON premium_passes   TO authenticated;

DROP POLICY IF EXISTS billing_payments_select_own ON billing_payments;
CREATE POLICY billing_payments_select_own ON billing_payments
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS premium_passes_select_own ON premium_passes;
CREATE POLICY premium_passes_select_own ON premium_passes
  FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Turns a confirmed payment into a pass, exactly once.
--
-- Called by the service role only, and only after the server has asked Paystack
-- for the transaction and seen status = success. The amount/currency check is
-- repeated here so the database refuses an underpayment even if a caller forgets
-- to check.
--
-- A new pass starts when the student's current one ends (or now, if they have
-- none), so renewing early adds a full term instead of overlapping. The advisory
-- lock serialises two payments by the SAME student settling at once — without
-- it both would read the same "current end" and the second term would be lost.
-- Payments by different students do not contend.
CREATE OR REPLACE FUNCTION grant_premium_pass(
  p_reference               TEXT,
  p_paid_amount_kobo        INTEGER,
  p_paid_currency           TEXT,
  p_provider_transaction_id TEXT
)
RETURNS TIMESTAMPTZ
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_pay   billing_payments%ROWTYPE;
  v_start TIMESTAMPTZ;
  v_end   TIMESTAMPTZ;
BEGIN
  SELECT * INTO v_pay FROM billing_payments WHERE reference = p_reference FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'grant_premium_pass: unknown payment reference';
  END IF;

  -- Already settled (the other path got here first): report the same answer.
  IF v_pay.status = 'success' THEN
    SELECT ends_at INTO v_end FROM premium_passes WHERE reference = p_reference;
    RETURN v_end;
  END IF;

  IF v_pay.user_id IS NULL THEN
    RAISE EXCEPTION 'grant_premium_pass: payment has no account';
  END IF;

  IF p_paid_currency IS DISTINCT FROM v_pay.currency
     OR p_paid_amount_kobo IS NULL
     OR p_paid_amount_kobo < v_pay.amount_kobo THEN
    RAISE EXCEPTION 'grant_premium_pass: paid amount does not cover the pass';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended('premium:' || v_pay.user_id::TEXT, 0));

  SELECT GREATEST(NOW(), COALESCE(MAX(ends_at), NOW()))
    INTO v_start
    FROM premium_passes
   WHERE user_id = v_pay.user_id;

  v_end := v_start + make_interval(days => v_pay.duration_days);

  INSERT INTO premium_passes (user_id, source, reference, starts_at, ends_at)
  VALUES (v_pay.user_id, 'paystack', p_reference, v_start, v_end);

  UPDATE billing_payments
     SET status = 'success',
         paid_at = NOW(),
         provider_transaction_id = p_provider_transaction_id
   WHERE reference = p_reference;

  RETURN v_end;
END;
$$;

REVOKE ALL ON FUNCTION grant_premium_pass(TEXT, INTEGER, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION grant_premium_pass(TEXT, INTEGER, TEXT, TEXT) TO service_role;

-- ─── Granting Premium by hand ─────────────────────────────────────────────────
-- For a student who paid you directly, a sponsor-funded cohort, or a support
-- case. Run in the SQL editor; replace the email and the note:
--
--   INSERT INTO premium_passes (user_id, source, starts_at, ends_at, note)
--   SELECT id, 'manual', NOW(), NOW() + INTERVAL '180 days', 'paid by transfer 08/11'
--     FROM auth.users WHERE email = 'student@example.com';
--
-- source must be one of 'manual', 'sponsor' or 'trial' — 'paystack' is reserved
-- for passes created by grant_premium_pass().

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
