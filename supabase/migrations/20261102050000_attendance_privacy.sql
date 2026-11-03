-- Attendance data minimisation. Run after attendance migrations through
-- 20260925020000. Idempotent; the browser still sends its raw random ID.
-- Hash existing IDs before replacing check_in() so old bindings still match.
BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS privacy_migrations (
  name TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE privacy_migrations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE privacy_migrations FROM PUBLIC, anon, authenticated;

-- Resolve digest from either supported pgcrypto schema. Keep temporary objects last.
SET LOCAL search_path = public, extensions, pg_temp;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM privacy_migrations WHERE name = 'device_hash_sha256') THEN
    UPDATE student_devices
       SET device_hash = encode(digest(device_hash, 'sha256'), 'hex')
     WHERE device_hash IS NOT NULL;

    -- session_devices' PRIMARY KEY (session_id, device_hash) is checked row by
    -- row during an UPDATE, so hashing in place can abort on a deliberate
    -- collision: one student checks in with id A and another, in the same
    -- class, with the literal SHA-256 of A. Rewrite the table instead: copy
    -- it hashed (a crafted pair merges into its earliest row), empty it, and
    -- insert the copy back. Three plain statements, no snapshot subtleties.
    CREATE TEMP TABLE session_devices_hashed ON COMMIT DROP AS
      SELECT DISTINCT ON (session_id, hashed)
             session_id, hashed AS device_hash, student_id, created_at
        FROM (SELECT session_id, encode(digest(device_hash, 'sha256'), 'hex') AS hashed,
                     student_id, created_at
                FROM session_devices) h
       ORDER BY session_id, hashed, created_at;
    DELETE FROM session_devices;
    INSERT INTO session_devices (session_id, device_hash, student_id, created_at)
      SELECT session_id, device_hash, student_id, created_at FROM session_devices_hashed;

    -- The UPDATE trigger copies OLD and NEW rows, including raw IDs and coordinates.
    EXECUTE 'ALTER TABLE attendance_records DISABLE TRIGGER log_attendance_change';
    BEGIN
      UPDATE attendance_records
         SET device_hash = encode(digest(device_hash, 'sha256'), 'hex')
       WHERE device_hash IS NOT NULL;
      EXECUTE 'ALTER TABLE attendance_records ENABLE TRIGGER log_attendance_change';
    EXCEPTION WHEN OTHERS THEN
      EXECUTE 'ALTER TABLE attendance_records ENABLE TRIGGER log_attendance_change';
      RAISE;
    END;

    UPDATE attendance_audit
       SET old_row = CASE
             WHEN old_row ? 'device_hash' AND old_row -> 'device_hash' <> 'null'::jsonb
             THEN jsonb_set(old_row, '{device_hash}', to_jsonb(encode(digest(old_row ->> 'device_hash', 'sha256'), 'hex')))
             ELSE old_row END,
           new_row = CASE
             WHEN new_row ? 'device_hash' AND new_row -> 'device_hash' <> 'null'::jsonb
             THEN jsonb_set(new_row, '{device_hash}', to_jsonb(encode(digest(new_row ->> 'device_hash', 'sha256'), 'hex')))
             ELSE new_row END
     WHERE (old_row ? 'device_hash' AND old_row -> 'device_hash' <> 'null'::jsonb)
        OR (new_row ? 'device_hash' AND new_row -> 'device_hash' <> 'null'::jsonb);

    INSERT INTO privacy_migrations (name) VALUES ('device_hash_sha256');
  END IF;
END;
$$;

-- Owner choice only: removing historical coordinates is irreversible.
-- To purge coordinates from past check-ins without an enforced geofence,
-- review and run this separately in the Supabase SQL editor:
-- UPDATE attendance_records ar
--    SET checkin_lat = NULL, checkin_lng = NULL
--   FROM class_sessions cs
--  WHERE ar.session_id = cs.id AND NOT cs.enforce_geofence;
-- UPDATE attendance_audit au
--    SET old_row = old_row - 'checkin_lat' - 'checkin_lng',
--        new_row = new_row - 'checkin_lat' - 'checkin_lng'
--   FROM class_sessions cs
--  WHERE au.session_id = cs.id AND NOT cs.enforce_geofence;

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
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_uid       UUID := auth.uid();
  v_session   class_sessions%ROWTYPE;
  v_name      TEXT;
  v_reg       TEXT;
  v_flag_loc  BOOLEAN := FALSE;
  v_dist      DOUBLE PRECISION;
  v_bound     TEXT;
  v_device_hash TEXT;
  v_code      TEXT := upper(trim(p_code));
BEGIN
  IF v_uid IS NULL THEN
    RETURN QUERY SELECT FALSE, 'You must be signed in to check in.', FALSE; RETURN;
  END IF;
  IF p_device_hash IS NULL OR length(p_device_hash) < 8 THEN
    RETURN QUERY SELECT FALSE, 'This device could not be identified.', FALSE; RETURN;
  END IF;
  v_device_hash := encode(digest(p_device_hash, 'sha256'), 'hex');

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
    VALUES (v_uid, v_device_hash)
    ON CONFLICT (student_id) DO NOTHING;

    SELECT device_hash INTO v_bound FROM student_devices WHERE student_id = v_uid;
  END IF;

  IF v_bound <> v_device_hash THEN
    RETURN QUERY SELECT FALSE,
      'This is not your registered device. Ask your lecturer to reset your device, then try again.',
      FALSE;
    RETURN;
  END IF;

  BEGIN
    INSERT INTO session_devices (session_id, device_hash, student_id)
    VALUES (p_session_id, v_device_hash, v_uid);
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
    v_device_hash,
    CASE WHEN v_session.enforce_geofence THEN p_lat ELSE NULL END,
    CASE WHEN v_session.enforce_geofence THEN p_lng ELSE NULL END,
    v_flag_loc,
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

COMMIT;

NOTIFY pgrst, 'reload schema';
