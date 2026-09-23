-- ─── Follow-ups from a fifth /code-review high pass ─────────────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Three defects, the first being a regression in the previous migration's own
-- fix:
--
-- 1. discover_open_sessions() was scoped to the student's own department+
--    level only, but check_in() (same migration) explicitly kept an
--    offering_students-based escape hatch for a lecturer-added elective/
--    cross-department student. The two diverged: that student would never
--    see the session in their own discovery list to select it, even though
--    check_in() would have accepted them — so a lecturer's manual add was
--    silently pointless for anything but a one-off in-person marking.
--    discover_open_sessions() now matches check_in()'s exact rule.
--
-- 2. class_sessions had no constraint against two simultaneously open
--    sessions for the same offering. offering_lecturers is explicitly
--    many-to-many (co-teaching), and TeachSession.jsx never checks for an
--    existing open session before inserting — a co-lecturer, or the same
--    lecturer in two tabs, could open two sessions for one real class
--    meeting, splitting check-ins between them and double-counting toward
--    total_held. A partial unique index makes the database itself the
--    single source of truth: at most one open session per offering at a
--    time, enforced under concurrency in a way a client-side check cannot be.
--
-- 3. register_summary()'s roster CTE starts FROM offering_students — an
--    offering with real closed sessions but nobody on the roster yet (a
--    brand-new course nobody has synced/checked into) returned ZERO rows,
--    so Register.jsx's totalHeld (read from the first row) silently showed
--    0 even though classes had genuinely been held. held_sessions_count()
--    gives the lecturer that number independent of roster state.

-- ── 1. discover_open_sessions(): match check_in()'s exact eligibility rule
CREATE OR REPLACE FUNCTION discover_open_sessions()
RETURNS TABLE (
  id           UUID,
  title        TEXT,
  held_on      DATE,
  closes_at    TIMESTAMPTZ,
  status       TEXT,
  offering_id  UUID,
  course_code  TEXT,
  course_title TEXT,
  level        TEXT,
  department   TEXT
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT cs.id, cs.title, cs.held_on, cs.closes_at, cs.status,
         co.id, co.course_code, co.course_title, co.level, co.department
  FROM class_sessions cs
  JOIN course_offerings co ON co.id = cs.offering_id
  WHERE cs.status = 'open' AND now() < cs.closes_at
    AND (
      EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() AND p.department = co.department AND p.level = co.level
      )
      OR EXISTS (
        SELECT 1 FROM offering_students os
        WHERE os.offering_id = co.id AND os.student_id = auth.uid()
      )
    )
  ORDER BY cs.opened_at DESC;
$$;

REVOKE ALL ON FUNCTION discover_open_sessions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION discover_open_sessions() TO authenticated;

-- ── 2. At most one open session per offering, enforced by the database
CREATE UNIQUE INDEX IF NOT EXISTS one_open_session_per_offering
  ON class_sessions (offering_id)
  WHERE status = 'open';

-- ── 3. True "classes held" count, independent of roster state
CREATE OR REPLACE FUNCTION held_sessions_count(p_offering_id UUID)
RETURNS BIGINT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT count(*)
  FROM class_sessions
  WHERE offering_id = p_offering_id
    AND (status = 'closed' OR closes_at < NOW())
    AND is_lecturer_of(p_offering_id);
$$;

REVOKE ALL ON FUNCTION held_sessions_count(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION held_sessions_count(UUID) TO authenticated;

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
