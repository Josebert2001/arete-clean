-- ─── Grace period for the previous check-in code ────────────────────────────
-- Run in the Supabase SQL editor (or `supabase db push`). Idempotent.
--
-- The code on the lecturer's screen rotates every 30s, and check_in() only
-- ever accepted the CURRENT code. A student who read the code at second 28
-- and submitted at second 32 was told "That code is wrong or has changed" —
-- on campus data, where a request can easily take a few seconds, that hit
-- students who did everything right.
--
-- rotate_code() now keeps the outgoing code in previous_code, and check_in()
-- accepts it for 20 seconds after the rotation. A forwarded screenshot still
-- goes stale within ~50s at most (30s on screen + 20s grace).
--
-- Only the code check in check_in() changes; everything else is identical to
-- 20260923050000_shared_eligibility_and_reg_lookup.sql.

ALTER TABLE class_sessions ADD COLUMN IF NOT EXISTS previous_code TEXT;

CREATE OR REPLACE FUNCTION rotate_code(p_session_id UUID, p_new_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_lecturer_of_session(p_session_id) THEN
    RAISE EXCEPTION 'Only a lecturer of this class may rotate its code.';
  END IF;
  UPDATE class_sessions
     SET previous_code = checkin_code, checkin_code = p_new_code, code_rotated_at = NOW()
   WHERE id = p_session_id AND status = 'open';
  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION rotate_code(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rotate_code(UUID, TEXT) TO authenticated;

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
  v_code      TEXT := upper(trim(p_code));
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

  -- The current code, while the lecturer's screen is still rotating it (45s
  -- covers one missed rotation), or the one it just replaced, for 20s.
  IF NOT (
    (v_code = upper(trim(v_session.checkin_code))
       AND NOW() - v_session.code_rotated_at <= INTERVAL '45 seconds')
    OR
    (v_session.previous_code IS NOT NULL
       AND v_code = upper(trim(v_session.previous_code))
       AND NOW() - v_session.code_rotated_at <= INTERVAL '20 seconds')
  ) THEN
    RETURN QUERY SELECT FALSE, 'That code is wrong or has expired. Read the current one and try again.', FALSE; RETURN;
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

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
