-- ─── Geofence hard-block toggle (Phase 2) ───────────────────────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Adds a per-session switch: when a lecturer turns it ON, a student outside the
-- class location is REFUSED (not just flagged). OFF by default, because GPS
-- drifts indoors and would otherwise block students who are genuinely present.
--
-- What this changes:
--   1. NEW column class_sessions.enforce_geofence (default FALSE).
--   2. REPLACES check_in() to refuse an out-of-perimeter check-in when the
--      switch is ON. When OFF, behaviour is unchanged (location is only flagged).
-- Keeps the device-binding logic from the previous migration.


-- ── 1. The switch ───────────────────────────────────────────────────────────
ALTER TABLE class_sessions
  ADD COLUMN IF NOT EXISTS enforce_geofence BOOLEAN NOT NULL DEFAULT FALSE;


-- ── 2. check_in() — device binding + optional geofence hard block ───────────
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

  -- Distance to the class centre (rough metres), computed once and reused for
  -- both the hard block and the soft flag.
  IF v_session.perimeter_lat IS NOT NULL AND p_lat IS NOT NULL THEN
    v_dist := 111320.0 * sqrt(
                power(p_lat - v_session.perimeter_lat, 2) +
                power((p_lng - v_session.perimeter_lng) * cos(radians(v_session.perimeter_lat)), 2)
              );
  END IF;

  -- ── Geofence HARD BLOCK (only when the lecturer turned it on) ────────────
  IF v_session.enforce_geofence THEN
    IF p_lat IS NULL THEN
      RETURN QUERY SELECT FALSE,
        'This class needs your location. Turn location on for your browser and try again.',
        FALSE;
      RETURN;
    END IF;
    IF v_session.perimeter_radius_m IS NOT NULL
       AND v_dist IS NOT NULL
       AND v_dist > v_session.perimeter_radius_m THEN
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
  ELSIF v_bound <> p_device_hash THEN
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

  SELECT full_name, reg_number INTO v_name, v_reg FROM profiles WHERE id = v_uid;

  -- Soft flag (used when the hard block is OFF): outside perimeter → flag it.
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


-- ── 3. Reload ───────────────────────────────────────────────────────────────
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
