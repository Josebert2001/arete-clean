-- ─── Device binding (Phase 2) ───────────────────────────────────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Locks each student to ONE device across all classes. First successful
-- check-in binds the student to the device they used; every later check-in must
-- come from that same device. A lecturer can RESET a student (e.g. they changed
-- or lost their phone), after which the student's next check-in binds the new
-- device.
--
-- This strengthens anti-proxy: "borrow a friend's phone to mark me" now fails,
-- because the friend's phone is bound to the friend (or unbound), not to the
-- absent student.
--
-- What this changes:
--   1. NEW table student_devices (one row per student).
--   2. REPLACES check_in() to enforce the binding (adds a binding step; the rest
--      of the function is unchanged).
--   3. NEW reset_student_device() for lecturers, and is_staff() helper.
-- No other table, policy, or function is touched.


-- ── 1. One device per student ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_devices (
  student_id  UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  device_hash TEXT        NOT NULL,
  bound_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE student_devices ENABLE ROW LEVEL SECURITY;

-- A student may READ their own binding (so their page can show "device
-- registered"). No client write policy: writes happen only inside the
-- SECURITY DEFINER functions below, so a student cannot rebind their own device
-- to dodge the lock.
DROP POLICY IF EXISTS "read own device" ON student_devices;
CREATE POLICY "read own device" ON student_devices
  FOR SELECT USING (auth.uid() = student_id);


-- ── 2. Is the caller a lecturer/admin? ──────────────────────────────────────
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('lecturer', 'admin')
  );
$$;

REVOKE ALL ON FUNCTION is_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_staff() TO authenticated;


-- ── 3. check_in() — now enforces the device binding ─────────────────────────
-- Identical to the previous version EXCEPT the "device binding" block, added
-- right after the code check and before the per-session device record.
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

  -- ── Device binding ──────────────────────────────────────────────────────
  -- First ever check-in binds this student to this device. Afterwards, only
  -- that device works until a lecturer resets them.
  SELECT device_hash INTO v_bound FROM student_devices WHERE student_id = v_uid;
  IF v_bound IS NULL THEN
    INSERT INTO student_devices (student_id, device_hash)
    VALUES (v_uid, p_device_hash)
    ON CONFLICT (student_id) DO NOTHING;   -- guards a race on first check-in
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

  IF v_session.perimeter_lat IS NOT NULL AND p_lat IS NOT NULL THEN
    v_dist := 111320.0 * sqrt(
                power(p_lat - v_session.perimeter_lat, 2) +
                power((p_lng - v_session.perimeter_lng) * cos(radians(v_session.perimeter_lat)), 2)
              );
    IF v_session.perimeter_radius_m IS NOT NULL AND v_dist > v_session.perimeter_radius_m THEN
      v_flag_loc := TRUE;
    END IF;
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


-- ── 4. Lecturer reset — clears a student's device binding ───────────────────
-- Takes the reg number the lecturer types; looks up the student and removes
-- their binding. The student's next check-in binds their new device.
CREATE OR REPLACE FUNCTION reset_student_device(p_reg_number TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_sid UUID;
BEGIN
  IF NOT is_staff() THEN
    RETURN QUERY SELECT FALSE, 'Only a lecturer can reset a device.'; RETURN;
  END IF;

  SELECT id INTO v_sid FROM profiles WHERE reg_number = trim(p_reg_number);
  IF v_sid IS NULL THEN
    RETURN QUERY SELECT FALSE, 'No student found with that reg number.'; RETURN;
  END IF;

  DELETE FROM student_devices WHERE student_id = v_sid;
  RETURN QUERY SELECT TRUE, 'Device reset. The student can now check in on a new device.';
END;
$$;

REVOKE ALL ON FUNCTION reset_student_device(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION reset_student_device(TEXT) TO authenticated;


-- ── 5. Reload ───────────────────────────────────────────────────────────────
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
