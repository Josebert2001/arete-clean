-- Areté Premium — refunds remove the unused time a payment bought.
-- WHY
-- A refunded charge must not keep its pass or regain one from a delayed charge
-- event. Renewals must move earlier by the unused time, preserving paid time.
-- Run manually after 20261108000000_premium_billing.sql; never from app code.
-- Idempotent: safe to re-run. Only the service role may grant or revoke passes.

ALTER TABLE billing_payments DROP CONSTRAINT IF EXISTS billing_payments_status_check;
ALTER TABLE billing_payments ADD CONSTRAINT billing_payments_status_check
  CHECK (status IN ('pending', 'success', 'failed', 'abandoned', 'refunded'));

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

  IF v_pay.status = 'refunded' THEN
    RAISE EXCEPTION 'grant_premium_pass: payment was refunded';
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

CREATE OR REPLACE FUNCTION revoke_premium_pass(p_reference TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_pay billing_payments%ROWTYPE;
  v_pass premium_passes%ROWTYPE;
  v_unused INTERVAL;
BEGIN
  SELECT * INTO v_pay FROM billing_payments WHERE reference = p_reference FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'revoke_premium_pass: unknown payment reference';
  END IF;
  IF v_pay.status = 'refunded' THEN
    RETURN 'already';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended('premium:' || v_pay.user_id::TEXT, 0));

  SELECT * INTO v_pass FROM premium_passes WHERE reference = p_reference;
  IF FOUND THEN
    v_unused := GREATEST(INTERVAL '0', v_pass.ends_at - GREATEST(v_pass.starts_at, NOW()));
    DELETE FROM premium_passes WHERE id = v_pass.id;
    UPDATE premium_passes
       SET starts_at = starts_at - v_unused,
           ends_at = ends_at - v_unused
     WHERE user_id = v_pass.user_id AND starts_at >= v_pass.ends_at;
  END IF;

  UPDATE billing_payments SET status = 'refunded' WHERE reference = p_reference;
  RETURN 'revoked';
END;
$$;

REVOKE ALL ON FUNCTION revoke_premium_pass(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION revoke_premium_pass(TEXT) TO service_role;

-- Revoking by hand (SQL editor, after confirming the full refund):
--   SELECT revoke_premium_pass('arete_REPLACE_WITH_ORIGINAL_REFERENCE');
-- This also prevents a delayed charge.success from granting the pass again.

NOTIFY pgrst, 'reload schema';
