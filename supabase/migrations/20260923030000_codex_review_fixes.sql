-- ─── Fixes from the automated Codex PR review ────────────────────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Four findings from Codex's review of PR #92:
--
-- 1. (P1) A session a lecturer never explicitly closes — window expires while
--    they've navigated away, laptop sleeps, whatever — stays status = 'open'
--    forever. register_summary()/my_attendance_summary() only ever counted
--    status = 'closed' sessions toward total_held, so that class's real
--    attendance silently never affected anyone's percentage or the register.
--    Both now treat "closed OR expired" (closes_at already in the past) as
--    held, at read time — no background job needed to flip the status.
--
-- 2. (P1) discover_open_sessions() showed every open session campus-wide to
--    any signed-in student, and check_in() never checked the student
--    actually belonged in that course before recording attendance and
--    self-enrolling them on the roster. A student who obtained an unrelated
--    class's live code (shoulder-surfed, shared by a friend in the room)
--    could check into a course that has nothing to do with their programme.
--    Fixed at both ends, matching how the rest of Areté already scopes
--    course access:
--      - discover_open_sessions() now only returns sessions for offerings
--        matching the caller's own profile department+level.
--      - check_in() now requires EITHER that same department+level match, OR
--        that the student is already on offering_students for that
--        offering — the escape hatch for a legitimate elective/cross-
--        department case, via the same manual roster add a lecturer already
--        has (see reset_student_device()'s own note on manual admin actions).
--
-- 3. (P2) course_offerings' UNIQUE(course_code, department, level,
--    academic_session, group_label) allows duplicate "unsplit" offerings —
--    Postgres does not treat two NULL group_labels as equal, so a dashboard
--    mistake can create a second row for the same course/level/session, each
--    with its own sessions, roster, and register. NULLS NOT DISTINCT makes
--    Postgres treat them as equal, closing the gap.

-- ── 3. Fix first — the constraint change needs its own statement
ALTER TABLE course_offerings
  DROP CONSTRAINT IF EXISTS course_offerings_course_code_department_level_academic_sess_key;
ALTER TABLE course_offerings
  ADD CONSTRAINT course_offerings_unique_offering
  UNIQUE NULLS NOT DISTINCT (course_code, department, level, academic_session, group_label);

-- ── 1 & 2. discover_open_sessions(): own department+level only
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
  JOIN profiles p ON p.id = auth.uid() AND p.department = co.department AND p.level = co.level
  WHERE cs.status = 'open' AND now() < cs.closes_at
  ORDER BY cs.opened_at DESC;
$$;

REVOKE ALL ON FUNCTION discover_open_sessions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION discover_open_sessions() TO authenticated;

-- ── 1 & 2. check_in(): eligibility check, and expired sessions count as held
CREATE OR REPLACE FUNCTION check_in(
  p_session_id  UUID,
  p_code        TEXT,
  p_device_hash TEXT,
  p_lat         DOUBLE PRECISION DEFAULT NULL,
  p_lng         DOUBLE PRECISION DEFAULT NULL
)
RETURNS TABLE (ok BOOLEAN, message TEXT, flagged BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_uid       UUID := auth.uid();
  v_session   class_sessions%ROWTYPE;
  v_name      TEXT;
  v_reg       TEXT;
  v_flag_loc  BOOLEAN := FALSE;
  v_dist      DOUBLE PRECISION;
  v_bound     TEXT;
  v_eligible  BOOLEAN;
BEGIN
  IF v_uid IS NULL THEN
    RETURN QUERY SELECT FALSE, 'You must be signed in to check in.', FALSE; RETURN;
  END IF;
  IF p_device_hash IS NULL OR length(p_device_hash) < 8 THEN
    RETURN QUERY SELECT FALSE, 'This device could not be identified.', FALSE; RETURN;
  END IF;

  SELECT * INTO v_session FROM class_sessions WHERE id = p_session_id;
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'That class session was not found.', FALSE; RETURN;
  END IF;
  IF v_session.status <> 'open' OR NOW() > v_session.closes_at THEN
    RETURN QUERY SELECT FALSE, 'Check-in for this class is closed.', FALSE; RETURN;
  END IF;
  IF upper(trim(p_code)) <> upper(trim(v_session.checkin_code)) THEN
    RETURN QUERY SELECT FALSE, 'That code is wrong or has changed. Read the current one and try again.', FALSE; RETURN;
  END IF;
  IF NOW() - v_session.code_rotated_at > INTERVAL '45 seconds' THEN
    RETURN QUERY SELECT FALSE, 'That code has expired. Read the current one and try again.', FALSE; RETURN;
  END IF;

  -- Eligibility: the student's own department+level must match the offering,
  -- OR they must already be on its roster (a lecturer's manual add — the
  -- controlled exception path for a genuine elective/cross-department case).
  -- Without this, discover_open_sessions()'s own scoping is the only guard,
  -- and a direct RPC call with a session id obtained another way (shared
  -- code, a leaked link) would bypass it entirely.
  SELECT EXISTS (
    SELECT 1 FROM course_offerings co, profiles p
    WHERE co.id = v_session.offering_id AND p.id = v_uid
      AND p.department = co.department AND p.level = co.level
  ) OR EXISTS (
    SELECT 1 FROM offering_students os
    WHERE os.offering_id = v_session.offering_id AND os.student_id = v_uid
  ) INTO v_eligible;

  IF NOT v_eligible THEN
    RETURN QUERY SELECT FALSE,
      'This class is not on your course list. Ask your lecturer to add you if you take it as an elective.',
      FALSE;
    RETURN;
  END IF;

  -- Distance to the class centre (rough metres), computed once and reused for
  -- both the hard block and the soft flag.
  IF v_session.perimeter_lat IS NOT NULL AND p_lat IS NOT NULL AND p_lng IS NOT NULL THEN
    v_dist := 111320.0 * sqrt(
                power(p_lat - v_session.perimeter_lat, 2) +
                power((p_lng - v_session.perimeter_lng) * cos(radians(v_session.perimeter_lat)), 2)
              );
  END IF;

  IF v_session.enforce_geofence THEN
    IF p_lat IS NULL OR p_lng IS NULL THEN
      RETURN QUERY SELECT FALSE,
        'This class needs your location. Turn location on for your browser and try again.',
        FALSE;
      RETURN;
    END IF;
    IF v_session.perimeter_radius_m IS NULL OR v_session.perimeter_lat IS NULL THEN
      RETURN QUERY SELECT FALSE,
        'This class has not set a location yet. Ask your lecturer to reopen the session.',
        FALSE;
      RETURN;
    END IF;
    IF v_dist IS NULL OR v_dist > v_session.perimeter_radius_m THEN
      RETURN QUERY SELECT FALSE,
        'You appear to be outside the class location, so check-in was blocked.',
        FALSE;
      RETURN;
    END IF;
  END IF;

  SELECT device_hash INTO v_bound FROM student_devices WHERE student_id = v_uid;
  IF v_bound IS NULL THEN
    INSERT INTO student_devices (student_id, device_hash)
    VALUES (v_uid, p_device_hash)
    ON CONFLICT (student_id) DO NOTHING;

    SELECT device_hash INTO v_bound FROM student_devices WHERE student_id = v_uid;
  END IF;

  IF v_bound <> p_device_hash THEN
    RETURN QUERY SELECT FALSE,
      'This is not your registered device. Ask your lecturer to reset your device, then try again.',
      FALSE;
    RETURN;
  END IF;

  BEGIN
    INSERT INTO session_devices (session_id, device_hash, student_id)
    VALUES (p_session_id, p_device_hash, v_uid);
  EXCEPTION WHEN unique_violation THEN
    RETURN QUERY SELECT FALSE, 'This device has already checked in for this class.', FALSE; RETURN;
  END;

  INSERT INTO offering_students (offering_id, student_id)
  VALUES (v_session.offering_id, v_uid)
  ON CONFLICT (offering_id, student_id) DO NOTHING;

  SELECT full_name, reg_number INTO v_name, v_reg FROM profiles WHERE id = v_uid;

  IF v_session.perimeter_radius_m IS NOT NULL AND v_dist IS NOT NULL
     AND v_dist > v_session.perimeter_radius_m THEN
    v_flag_loc := TRUE;
  END IF;

  INSERT INTO attendance_records (
    session_id, student_id, status, capture,
    full_name_snapshot, reg_number_snapshot,
    device_hash, checkin_lat, checkin_lng, location_flagged,
    marked_by, marked_at
  ) VALUES (
    p_session_id, v_uid, 'present', 'self',
    v_name, v_reg,
    p_device_hash, p_lat, p_lng, v_flag_loc,
    v_uid, NOW()
  )
  ON CONFLICT (session_id, student_id) DO NOTHING;

  RETURN QUERY SELECT TRUE,
    CASE WHEN v_flag_loc THEN 'Checked in — your location looked off, so a lecturer will confirm it.'
         ELSE 'Checked in. You are marked present.' END,
    v_flag_loc;
END;
$$;

REVOKE ALL ON FUNCTION check_in(UUID, TEXT, TEXT, DOUBLE PRECISION, DOUBLE PRECISION) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION check_in(UUID, TEXT, TEXT, DOUBLE PRECISION, DOUBLE PRECISION) TO authenticated;

-- ── 1. register_summary(): expired-but-unclosed sessions count as held
CREATE OR REPLACE FUNCTION register_summary(p_offering_id UUID)
RETURNS TABLE (
  student_id      UUID,
  full_name       TEXT,
  reg_number      TEXT,
  attended        BIGINT,
  total_held      BIGINT,
  threshold_pct   SMALLINT
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
      AND (status = 'closed' OR closes_at < NOW())
  ),
  held AS (
    SELECT count(*) AS n FROM closed_sessions
  ),
  roster AS (
    SELECT os.student_id, p.full_name, p.reg_number, co.threshold_pct
    FROM offering_students os
    JOIN profiles p           ON p.id = os.student_id
    JOIN course_offerings co  ON co.id = os.offering_id
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
         (SELECT n FROM held) AS total_held,
         r.threshold_pct
  FROM roster r
  LEFT JOIN present pr ON pr.student_id = r.student_id
  WHERE is_lecturer_of(p_offering_id)
  ORDER BY r.full_name;
$$;

REVOKE ALL ON FUNCTION register_summary(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION register_summary(UUID) TO authenticated;

-- ── 1. my_attendance_summary(): same "closed OR expired" rule
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
    WHERE cs.status = 'closed' OR cs.closes_at < NOW()
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

-- ── 2. sync_offering_roster() is untouched — department+level matching is
-- already its rule; discover_open_sessions() and check_in() now apply the
-- same rule at the two points that actually needed it.

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
