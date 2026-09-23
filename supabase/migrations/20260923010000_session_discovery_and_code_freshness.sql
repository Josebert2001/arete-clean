-- ─── Stop leaking checkin_code, and reject a stale rotation ─────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Two defects found by /code-review high:
--
-- 1. "anyone sees open sessions" (20260917010000_open_sessions.sql) is a
--    row-level policy on the WHOLE class_sessions row — it has no way to hide
--    one column. Any signed-in user could
--    `supabase.from('class_sessions').select('checkin_code').eq('status','open')`
--    directly and read the live board code for any open class anywhere,
--    skipping the whole point of a rotating code shown only in the room, then
--    call check_in() and mark themselves present without ever attending.
--    CheckIn.jsx never asked for that column, but the policy let anyone who
--    did. Fixed the way every other cross-cutting read in this schema is
--    fixed: drop the row-level policy, replace discovery with a SECURITY
--    DEFINER function that returns only the columns a discovery list needs.
--
-- 2. check_in() checked the code against class_sessions.checkin_code and the
--    session's closes_at, but never against code_rotated_at — so if
--    TeachSession.jsx's client-side 30s rotation silently stops (backgrounded
--    tab, sleeping laptop, a failed rotate_code call), the same code the
--    lecturer displayed minutes or hours ago keeps working for the rest of
--    the session window, even though the UI promises "changes every 30
--    seconds automatically". check_in() now also rejects a code older than a
--    45s grace window (30s rotation + slack for client/network lag).

-- ── 1. Replace row-level "anyone sees open sessions" with a column-safe function
DROP POLICY IF EXISTS "anyone sees open sessions" ON class_sessions;

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
  ORDER BY cs.opened_at DESC;
$$;

REVOKE ALL ON FUNCTION discover_open_sessions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION discover_open_sessions() TO authenticated;

-- ── 2. check_in(): reject a code older than the rotation grace window
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
  -- The code itself matched, but it may be stale if client-side rotation
  -- stopped (backgrounded tab, sleeping laptop, a failed rotate_code call).
  -- 45s = the 30s rotation interval plus slack for client/network lag.
  IF NOW() - v_session.code_rotated_at > INTERVAL '45 seconds' THEN
    RETURN QUERY SELECT FALSE, 'That code has expired. Read the current one and try again.', FALSE; RETURN;
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
