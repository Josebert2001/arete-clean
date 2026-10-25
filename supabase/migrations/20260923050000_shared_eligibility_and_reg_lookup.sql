-- ─── Shared eligibility helper, staff-wide reg lookup, reg_number index ─────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Three findings from a sixth /code-review high pass:
--
-- 1. "Eligible for this offering" (profile department+level match, OR
--    already on offering_students) was copy-pasted across check_in(),
--    discover_open_sessions(), and reset_student_device()'s scoping check —
--    and the copies had already drifted out of sync once (that's exactly
--    what 20260923040000 had to patch). One shared function now, called by
--    all three.
--
-- 2. TeachSession.jsx's manual-add looked up a student by reg_number via a
--    direct client-side `profiles` select, gated by the "lecturers read
--    department roster" RLS policy — which only covers a lecturer's OWN
--    department. A lecturer trying to manually add a genuine cross-
--    department elective (the case discover_open_sessions()/check_in() were
--    already extended to support) got "No student found", even though the
--    student exists. reset_student_device() doesn't have this problem — it
--    looks up profiles from inside its own SECURITY DEFINER body, which
--    bypasses RLS entirely. find_student_by_reg() gives the client the same
--    bypass for this one, deliberate, staff-initiated lookup.
--
-- 3. profiles.reg_number has no index — only a CHECK constraint — yet this
--    feature added two new live, time-pressured lookups by reg_number
--    (manual add, device reset) that would otherwise force a sequential
--    scan of the whole table.

-- ── 3. Index first
CREATE INDEX IF NOT EXISTS profiles_reg_number_idx
  ON profiles (reg_number)
  WHERE reg_number IS NOT NULL;

-- ── 1. Shared eligibility check
CREATE OR REPLACE FUNCTION is_eligible_for_offering(p_offering_id UUID, p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM course_offerings co, profiles p
    WHERE co.id = p_offering_id AND p.id = p_student_id
      AND p.department = co.department AND p.level = co.level
  ) OR EXISTS (
    SELECT 1 FROM offering_students os
    WHERE os.offering_id = p_offering_id AND os.student_id = p_student_id
  );
$$;

REVOKE ALL ON FUNCTION is_eligible_for_offering(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_eligible_for_offering(UUID, UUID) TO authenticated;

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
    AND is_eligible_for_offering(co.id, auth.uid())
  ORDER BY cs.opened_at DESC;
$$;

REVOKE ALL ON FUNCTION discover_open_sessions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION discover_open_sessions() TO authenticated;

CREATE OR REPLACE FUNCTION reset_student_device(p_reg_number TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_sid  UUID;
  v_role TEXT;
BEGIN
  SELECT role INTO v_role FROM user_roles WHERE user_id = auth.uid();
  IF v_role IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Only a lecturer can reset a device.'; RETURN;
  END IF;

  SELECT id INTO v_sid FROM profiles WHERE reg_number = trim(p_reg_number);
  IF v_sid IS NULL THEN
    RETURN QUERY SELECT FALSE, 'No student found with that reg number.'; RETURN;
  END IF;

  IF v_role <> 'admin' AND NOT EXISTS (
    SELECT 1 FROM offering_lecturers ol
    JOIN course_offerings co ON co.id = ol.offering_id
    WHERE ol.lecturer_id = auth.uid() AND is_eligible_for_offering(co.id, v_sid)
  ) THEN
    RETURN QUERY SELECT FALSE, 'That student is not on a roster for a course you teach.'; RETURN;
  END IF;

  DELETE FROM student_devices WHERE student_id = v_sid;
  RETURN QUERY SELECT TRUE, 'Device reset. The student can now check in on a new device.';
END;
$$;

REVOKE ALL ON FUNCTION reset_student_device(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION reset_student_device(TEXT) TO authenticated;

-- check_in() itself, rewritten to call the shared helper instead of its own
-- inline copy of the same predicate.
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

  IF NOT is_eligible_for_offering(v_session.offering_id, v_uid) THEN
    RETURN QUERY SELECT FALSE,
      'This class is not on your course list. Ask your lecturer to add you if you take it as an elective.',
      FALSE;
    RETURN;
  END IF;

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

-- ── 2. Staff-wide reg-number lookup for manual add — bypasses the
-- department-scoped "lecturers read department roster" RLS policy the same
-- deliberate way reset_student_device() already does internally.
CREATE OR REPLACE FUNCTION find_student_by_reg(p_reg_number TEXT)
RETURNS TABLE (id UUID, full_name TEXT, reg_number TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()) THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT p.id, p.full_name, p.reg_number
    FROM profiles p
    WHERE p.reg_number = trim(p_reg_number);
END;
$$;

REVOKE ALL ON FUNCTION find_student_by_reg(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION find_student_by_reg(TEXT) TO authenticated;

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
