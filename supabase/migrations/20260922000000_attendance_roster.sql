-- ─── Attendance roster (Phase 3) ─────────────────────────────────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Fixes a real gap in the register: register_summary() only ever aggregated
-- over attendance_records, so a student who never checked in for a course
-- never appeared on it at all — no roster, no absentees, just a list of
-- people who showed up at least once. That is not an attendance register.
--
-- This adds a roster table and syncs it from the same department+level
-- scoping the rest of Areté already uses (see src/data/departments.js),
-- instead of inventing a new enrollment concept. A lecturer's Register page
-- calls sync_offering_roster() on every load, so the roster stays current
-- with no separate admin step — and it is purely additive (ON CONFLICT DO
-- NOTHING), so a manually-added carryover/elective student is never dropped
-- by a re-sync.
--
-- What this changes:
--   1. NEW table offering_students (the roster).
--   2. NEW sync_offering_roster() — lecturer-only, additive.
--   3. REPLACES register_summary() to LEFT JOIN the roster instead of only
--      aggregating attendance_records, so a 0-attendance student shows up.
--   4. NEW my_attendance_summary() — the student-facing equivalent. The old
--      MyAttendance.jsx query counted only the student's own attendance rows,
--      which are all 'present'/'manual' by construction, so it always read
--      100%. This returns a real attended/total_held per offering instead.


-- ═══ 1. ROSTER TABLE ═════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS offering_students (
  offering_id UUID        NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  student_id  UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (offering_id, student_id)
);

CREATE INDEX IF NOT EXISTS offering_students_student_idx ON offering_students (student_id);

ALTER TABLE offering_students ENABLE ROW LEVEL SECURITY;

-- Lecturer: full control of the roster for offerings they teach — same
-- pattern as "lecturers manage their sessions" on class_sessions. Lets them
-- remove a stale row by hand via the SQL editor if ever needed; no UI for it
-- yet, sync is additive-only.
DROP POLICY IF EXISTS "lecturers manage their roster" ON offering_students;
CREATE POLICY "lecturers manage their roster" ON offering_students
  FOR ALL
  USING      (is_lecturer_of(offering_id))
  WITH CHECK (is_lecturer_of(offering_id));

-- Student: read their own roster rows only (which offerings they're on).
DROP POLICY IF EXISTS "students read own roster rows" ON offering_students;
CREATE POLICY "students read own roster rows" ON offering_students
  FOR SELECT USING (auth.uid() = student_id);


-- ═══ 2. ROSTER SYNC ══════════════════════════════════════════════════════════
-- Adds every student whose profile currently matches the offering's
-- department + level and isn't already on the roster. Never removes a row,
-- so a manually-added edge case (carryover, elective) survives a re-sync.
-- SECURITY DEFINER (bypasses RLS to read profiles broadly), so it checks
-- is_lecturer_of() itself — same defense-in-depth pattern as rotate_code().
CREATE OR REPLACE FUNCTION sync_offering_roster(p_offering_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_added INTEGER;
BEGIN
  IF NOT is_lecturer_of(p_offering_id) THEN
    RAISE EXCEPTION 'Only a lecturer of this offering may sync its roster.';
  END IF;

  WITH ins AS (
    INSERT INTO offering_students (offering_id, student_id)
    SELECT co.id, p.id
    FROM course_offerings co
    JOIN profiles p
      ON p.department = co.department
     AND p.level      = co.level
    WHERE co.id = p_offering_id
    ON CONFLICT (offering_id, student_id) DO NOTHING
    RETURNING 1
  )
  SELECT count(*) INTO v_added FROM ins;

  RETURN v_added;
END;
$$;

REVOKE ALL ON FUNCTION sync_offering_roster(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION sync_offering_roster(UUID) TO authenticated;


-- ═══ 3. register_summary() — now roster-aware ═══════════════════════════════
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
  roster AS (
    SELECT os.student_id, p.full_name, p.reg_number
    FROM offering_students os
    JOIN profiles p ON p.id = os.student_id
    WHERE os.offering_id = p_offering_id
  ),
  present AS (
    SELECT ar.student_id,
           count(*) FILTER (
             WHERE ar.status IN ('present','manual')
               AND ar.session_id IN (SELECT id FROM closed_sessions)
           ) AS attended
    FROM attendance_records ar
    WHERE ar.session_id IN (SELECT id FROM closed_sessions)
    GROUP BY ar.student_id
  )
  SELECT r.student_id,
         r.full_name,
         r.reg_number,
         COALESCE(pr.attended, 0) AS attended,
         (SELECT n FROM held) AS total_held
  FROM roster r
  LEFT JOIN present pr ON pr.student_id = r.student_id
  WHERE is_lecturer_of(p_offering_id)   -- only a lecturer of this offering gets rows
  ORDER BY r.full_name;
$$;

REVOKE ALL ON FUNCTION register_summary(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION register_summary(UUID) TO authenticated;


-- ═══ 4. my_attendance_summary() — the student-facing, honest percentage ═════
CREATE OR REPLACE FUNCTION my_attendance_summary()
RETURNS TABLE (
  offering_id      UUID,
  course_code      TEXT,
  course_title     TEXT,
  level            TEXT,
  academic_session TEXT,
  threshold_pct    SMALLINT,
  attended         BIGINT,
  total_held       BIGINT
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  WITH mine AS (
    SELECT co.*
    FROM offering_students os
    JOIN course_offerings co ON co.id = os.offering_id
    WHERE os.student_id = auth.uid()
  ),
  closed AS (
    SELECT cs.id, cs.offering_id
    FROM class_sessions cs
    JOIN mine m ON m.id = cs.offering_id
    WHERE cs.status = 'closed'
  ),
  held AS (
    SELECT offering_id, count(*) AS n FROM closed GROUP BY offering_id
  ),
  present AS (
    SELECT c.offering_id, count(*) AS n
    FROM attendance_records ar
    JOIN closed c ON c.id = ar.session_id
    WHERE ar.student_id = auth.uid()
      AND ar.status IN ('present','manual')
    GROUP BY c.offering_id
  )
  SELECT m.id, m.course_code, m.course_title, m.level, m.academic_session, m.threshold_pct,
         COALESCE(pr.n, 0) AS attended,
         COALESCE(h.n, 0)  AS total_held
  FROM mine m
  LEFT JOIN held h    ON h.offering_id = m.id
  LEFT JOIN present pr ON pr.offering_id = m.id
  ORDER BY m.course_code;
$$;

REVOKE ALL ON FUNCTION my_attendance_summary() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION my_attendance_summary() TO authenticated;


-- ═══ 5. Reload ═══════════════════════════════════════════════════════════════
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
