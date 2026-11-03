-- ─── Attendance register helper (Phase 1 finish) ────────────────────────────
-- Run in the Supabase SQL editor. Idempotent.
--
-- Adds one read-only function the lecturer register page calls. It returns, for
-- one offering, every student who has any attendance, with:
--   - how many CLOSED sessions they were present for
--   - the total number of CLOSED sessions held for the offering
-- The page turns those two numbers into a percentage. Per-check-in timestamps
-- (the evidence trail) are read separately by the page from attendance_records.
--
-- "Held" = opened AND closed, per the agreed rule: a still-open session does not
-- yet count toward the denominator.

CREATE OR REPLACE FUNCTION register_summary(p_offering_id UUID)
RETURNS TABLE (
  student_id      UUID,
  full_name       TEXT,
  reg_number      TEXT,
  attended        BIGINT,
  total_held      BIGINT
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  WITH closed_sessions AS (
    SELECT id
    FROM class_sessions
    WHERE offering_id = p_offering_id
      AND status = 'closed'
  ),
  held AS (
    SELECT count(*) AS n FROM closed_sessions
  ),
  present AS (
    SELECT ar.student_id,
           count(*) FILTER (
             WHERE ar.status IN ('present','manual')
               AND ar.session_id IN (SELECT id FROM closed_sessions)
           ) AS attended,
           max(ar.full_name_snapshot)  AS full_name,
           max(ar.reg_number_snapshot) AS reg_number
    FROM attendance_records ar
    WHERE ar.session_id IN (SELECT id FROM closed_sessions)
    GROUP BY ar.student_id
  )
  SELECT p.student_id,
         p.full_name,
         p.reg_number,
         p.attended,
         (SELECT n FROM held) AS total_held
  FROM present p
  WHERE is_lecturer_of(p_offering_id)   -- only a lecturer of this offering gets rows
  ORDER BY p.full_name;
$$;

REVOKE ALL ON FUNCTION register_summary(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION register_summary(UUID) TO authenticated;

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
