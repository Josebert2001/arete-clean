-- ─── Post-review fixes ───────────────────────────────────────────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Five defects found by two independent /code-review high passes on the
-- attendance feature:
--
-- 1. "lecturers manage their sessions" WITH CHECK required created_by =
--    auth.uid(), so only the lecturer who opened a session could update it —
--    contradicting the documented "all linked lecturers have equal rights"
--    co-teaching model. A co-lecturer covering a class could not even close
--    the session they were sitting in front of. created_by is attribution
--    only; nothing else in the schema treats it as a security boundary, so
--    the fix is simply to match USING (any lecturer of the offering).
--
-- 2. register_summary() never returned threshold_pct, so Register.jsx
--    hardcoded a 70% requirement — while MyAttendance.jsx (via
--    my_attendance_summary(), which already selects it) correctly used the
--    real per-offering value. A student below a custom threshold (say 75%)
--    could show as compliant on the lecturer's official printed/exported
--    register while their own attendance page correctly flagged them.
--
-- 3. reset_student_device() authorized on is_staff() alone: any lecturer, for
--    ANY student campus-wide, not just one they teach. Scope lecturers to a
--    student who is on the roster for an offering they teach; admins are
--    unscoped by design (they oversee everything, not one course).
--
-- 4. offering_students (the roster) was populated only by
--    sync_offering_roster(), called only from the lecturer-only Register.jsx
--    page, and only for students whose profile department+level matches the
--    offering exactly. Two consequences: (a) a student's own real check-ins
--    were invisible on /my-attendance until a lecturer happened to open
--    /register for that offering first; (b) a student whose profile doesn't
--    match exactly (a foundation/general student, or one who changed
--    department after checking in) was dropped from the register entirely,
--    even with real attendance rows. Fix at the source: check_in() now also
--    adds the checking-in student straight onto that offering's roster, so
--    roster membership no longer depends on a lecturer's page-load timing or
--    an exact profile match — anyone who actually attended is on it.
--
-- 5. The geofence hard block only compared distance when perimeter_radius_m
--    IS NOT NULL — enforce_geofence = TRUE with a null radius silently
--    admitted every check-in instead of blocking. Unreachable via the
--    shipped UI today (TeachSession.jsx always sets both together), but the
--    hard block should fail closed, not open, against a future write path or
--    a manual edit that sets one without the other.

-- ── 1. Co-teaching: any linked lecturer may update a session, not just its opener
DROP POLICY IF EXISTS "lecturers manage their sessions" ON class_sessions;
CREATE POLICY "lecturers manage their sessions" ON class_sessions
  FOR ALL
  USING      (is_lecturer_of(offering_id))
  WITH CHECK (is_lecturer_of(offering_id));

-- ── 2. register_summary() now returns the offering's real threshold
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
      AND status = 'closed'
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
  WHERE is_lecturer_of(p_offering_id)   -- only a lecturer of this offering gets rows
  ORDER BY r.full_name;
$$;

REVOKE ALL ON FUNCTION register_summary(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION register_summary(UUID) TO authenticated;

-- ── 3. reset_student_device(): scope lecturers to a student on their own roster
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

  -- Admins oversee every course by design and stay unscoped; a lecturer must
  -- actually teach this student — is_staff() alone let any lecturer reset any
  -- student campus-wide regardless of whether they ever taught them.
  IF v_role <> 'admin' AND NOT EXISTS (
    SELECT 1 FROM offering_students os
    JOIN offering_lecturers ol ON ol.offering_id = os.offering_id
    WHERE os.student_id = v_sid AND ol.lecturer_id = auth.uid()
  ) THEN
    RETURN QUERY SELECT FALSE, 'That student is not on a roster for a course you teach.'; RETURN;
  END IF;

  DELETE FROM student_devices WHERE student_id = v_sid;
  RETURN QUERY SELECT TRUE, 'Device reset. The student can now check in on a new device.';
END;
$$;

REVOKE ALL ON FUNCTION reset_student_device(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION reset_student_device(TEXT) TO authenticated;

-- ── 4 & 5. check_in(): self-adds the student to the roster, and the geofence
-- hard block fails closed on a missing radius. Device-binding race fix from
-- 20260921000000 is unchanged.
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
  -- Fails CLOSED on a missing radius/centre, not open: a hard block the
  -- lecturer believes is on must never silently admit everyone.
  IF v_session.enforce_geofence THEN
    IF p_lat IS NULL THEN
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
    IF v_dist IS NOT NULL AND v_dist > v_session.perimeter_radius_m THEN
      RETURN QUERY SELECT FALSE,
        'You appear to be outside the class location, so check-in was blocked.',
        FALSE;
      RETURN;
    END IF;
  END IF;

  -- ── Device binding (bind on first check-in; else must match) ────────────
  -- Race-safe: after the insert, re-read what is actually in the table rather
  -- than trusting the pre-insert v_bound local. A concurrent first check-in
  -- from a different device may have already won the row.
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

  -- Put the student on the offering's roster themselves, rather than relying
  -- solely on a lecturer's Register-page sync (dept+level match) to have run
  -- first. Guarantees a real check-in is never invisible on the student's own
  -- /my-attendance, and is never silently dropped from the lecturer's
  -- register just because a profile doesn't match the offering's dept/level.
  INSERT INTO offering_students (offering_id, student_id)
  VALUES (v_session.offering_id, v_uid)
  ON CONFLICT (offering_id, student_id) DO NOTHING;

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

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
