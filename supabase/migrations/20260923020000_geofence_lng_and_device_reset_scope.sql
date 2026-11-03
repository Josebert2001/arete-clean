-- ─── Geofence lng check, and an unblockable device-reset deadlock ───────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Two more defects found by /code-review high:
--
-- 1. check_in()'s geofence hard block validated p_lat IS NULL but never
--    p_lng — a NULL p_lng makes v_dist NULL, and the hard-block condition
--    (v_dist IS NOT NULL AND v_dist > radius) is then simply false, silently
--    admitting a check-in from anywhere. The exact same "fail closed, not
--    open" bug this file's predecessor fixed for a missing radius, just for
--    the other coordinate.
--
-- 2. reset_student_device()'s new scoping (20260923000000) requires the
--    target student already be on offering_students for a course the caller
--    teaches — but offering_students is only populated by a successful
--    check_in() or a lecturer's Register-page visit (which itself only
--    backfills an exact department+level match). A student whose device got
--    bound elsewhere and who has never successfully checked into THIS
--    lecturer's class — the exact situation reset_student_device exists to
--    fix — could never be added to the roster, so the lecturer could never
--    reset them: a deadlock. Widened to also allow a department+level match
--    against a course the caller teaches, independent of roster history —
--    the same rule sync_offering_roster() already uses to populate the
--    roster in the first place, just checked directly instead of requiring
--    it to have run.

-- ── 1. check_in(): validate p_lng too, not just p_lat
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

  -- Distance to the class centre (rough metres), computed once and reused for
  -- both the hard block and the soft flag.
  IF v_session.perimeter_lat IS NOT NULL AND p_lat IS NOT NULL AND p_lng IS NOT NULL THEN
    v_dist := 111320.0 * sqrt(
                power(p_lat - v_session.perimeter_lat, 2) +
                power((p_lng - v_session.perimeter_lng) * cos(radians(v_session.perimeter_lat)), 2)
              );
  END IF;

  -- ── Geofence HARD BLOCK (only when the lecturer turned it on) ────────────
  -- Fails CLOSED on a missing coordinate/radius/centre, not open: a hard
  -- block the lecturer believes is on must never silently admit everyone.
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

  -- ── Device binding (bind on first check-in; else must match) ────────────
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

  -- One device = one check-in per session.
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

-- ── 2. reset_student_device(): also allow a direct department+level match
-- against a course the caller teaches, not just prior roster membership —
-- the same rule sync_offering_roster() uses, checked directly so a student
-- who has never successfully checked in (the exact case this function exists
-- to unblock) isn't permanently stuck.
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
    SELECT 1 FROM offering_students os
    JOIN offering_lecturers ol ON ol.offering_id = os.offering_id
    WHERE os.student_id = v_sid AND ol.lecturer_id = auth.uid()
  ) AND NOT EXISTS (
    SELECT 1
    FROM profiles p
    JOIN course_offerings co ON co.department = p.department AND co.level = p.level
    JOIN offering_lecturers ol ON ol.offering_id = co.id
    WHERE p.id = v_sid AND ol.lecturer_id = auth.uid()
  ) THEN
    RETURN QUERY SELECT FALSE, 'That student is not on a roster for a course you teach.'; RETURN;
  END IF;

  DELETE FROM student_devices WHERE student_id = v_sid;
  RETURN QUERY SELECT TRUE, 'Device reset. The student can now check in on a new device.';
END;
$$;

REVOKE ALL ON FUNCTION reset_student_device(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION reset_student_device(TEXT) TO authenticated;

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
