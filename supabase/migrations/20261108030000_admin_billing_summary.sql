-- Admin-only Premium and usage totals. No student rows or emails leave here.
-- Run manually after 20261108000000 and 20261108020000 (Premium),
-- 20260924000000 (is_admin), and 20260827000000 (rate_limits).
-- Idempotent: safe to re-run.
CREATE OR REPLACE FUNCTION admin_billing_summary()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now TIMESTAMPTZ := NOW();
  -- Calendar-month revenue uses UTC, independent of the SQL session timezone.
  v_month TIMESTAMPTZ := date_trunc('month', NOW() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC';
  v_active BIGINT;
  v_expiring BIGINT;
  v_weekly BIGINT;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Admins only' USING ERRCODE = '42501';
  END IF;

  SELECT count(*) FILTER (WHERE v_now BETWEEN starts_at AND ends_at),
         count(*) FILTER (WHERE ends_at > v_now AND ends_at <= v_now + INTERVAL '14 days')
    INTO v_active, v_expiring
    FROM public.premium_passes;

  -- A weekly active student has synced progress, not merely signed up.
  -- useProgress writes updated_at on every sync; count each account once.
  SELECT count(DISTINCT user_id) INTO v_weekly
    FROM public.user_progress
    WHERE updated_at >= v_now - INTERVAL '7 days' AND updated_at <= v_now;

  RETURN jsonb_build_object(
    'payments', jsonb_build_object(
      'counts', COALESCE((
        SELECT jsonb_object_agg(status, total)
        FROM (SELECT status, count(*) AS total FROM public.billing_payments GROUP BY status) AS counts
      ), '{}'::JSONB),
      'revenue_kobo', (SELECT COALESCE(sum(amount_kobo), 0) FROM public.billing_payments WHERE status = 'success'),
      'revenue_30d_kobo', (
        SELECT COALESCE(sum(amount_kobo), 0) FROM public.billing_payments
        WHERE status = 'success' AND paid_at >= v_now - INTERVAL '30 days' AND paid_at <= v_now
      ),
      'monthly', (
        SELECT jsonb_agg(jsonb_build_object(
          'month', to_char(month_start AT TIME ZONE 'UTC', 'YYYY-MM'),
          'revenue_kobo', (
            SELECT COALESCE(sum(amount_kobo), 0) FROM public.billing_payments
            WHERE status = 'success' AND paid_at >= month_start
              AND paid_at < (((month_start AT TIME ZONE 'UTC') + INTERVAL '1 month') AT TIME ZONE 'UTC')
          )
        ) ORDER BY month_start)
        FROM (
          SELECT ((v_month AT TIME ZONE 'UTC') - make_interval(months => n)) AT TIME ZONE 'UTC' AS month_start
          FROM generate_series(0, 5) AS months(n)
        ) AS calendar
      )
    ),
    'passes', jsonb_build_object('active', v_active, 'expiring_14d', v_expiring),
    'usage', jsonb_build_object(
      'signups_7d', (SELECT count(*) FROM public.profiles WHERE created_at >= v_now - INTERVAL '7 days' AND created_at <= v_now),
      'signups_30d', (SELECT count(*) FROM public.profiles WHERE created_at >= v_now - INTERVAL '30 days' AND created_at <= v_now),
      'weekly_active', v_weekly,
      'daily_students', COALESCE((
        SELECT jsonb_object_agg(namespace, students)
        FROM (
          -- consume_rate_limit keys p_namespace || ':' || auth.uid().
          -- Match exactly daily:<feature>:<UUID>, never the 10-minute buckets.
          SELECT 'daily:' || split_part(bucket, ':', 2) AS namespace,
                 count(DISTINCT split_part(bucket, ':', 3)) AS students
          FROM public.rate_limits
          WHERE reset_at > v_now AND count > 0
            AND bucket ~ '^daily:[^:]+:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
          GROUP BY split_part(bucket, ':', 2)
        ) AS daily
      ), '{}'::JSONB)
    ),
    'conversion', v_active::NUMERIC / NULLIF(v_weekly, 0)
  );
END;
$$;

REVOKE ALL ON FUNCTION admin_billing_summary() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_billing_summary() TO authenticated;

NOTIFY pgrst, 'reload schema';
