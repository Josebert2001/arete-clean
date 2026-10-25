-- ─── Attendance Management System (Phase 1) ─────────────────────────────────
-- Run manually in the Supabase SQL editor, same as every other migration here.
-- Idempotent: safe to re-run.
--
-- Creates the whole attendance feature: six new tables, the functions that gate
-- check-in, and the row-level security (RLS) that enforces who can see and do
-- what. Touches NO existing table except one ADDITIVE read policy on `profiles`
-- (section 6) — nothing currently deployed can break.
--
-- READING ORDER OF THIS FILE
--   1. All six tables (so later functions can reference them).
--   2. Helper functions the policies call.
--   3. The check-in / code-rotation functions students and lecturers use.
--   4. RLS: enable it and attach policies.
-- Tables are created before any function or policy that names them, because
-- Supabase checks function bodies at creation time.
--
-- THE MODEL IN ONE PARAGRAPH
--   A course_offering is the anchor: "CYB 224 · 200L · Cybersecurity · 2025/2026".
--   Lecturers are linked to it many-to-many (offering_lecturers), so a co-taught
--   course has one shared register. A class_session is one class held under an
--   offering, opened by any linked lecturer, showing a rotating code. A student
--   marks present through the check_in() function, which writes one
--   attendance_records row. session_devices enforces one-device-one-check-in.


-- ═══ SECTION 1: TABLES ══════════════════════════════════════════════════════

-- 1a. Roles. Kept OFF `profiles` because the existing "Users manage own profile"
-- policy is FOR ALL, so a role column there would be self-assignable from the
-- browser. No row here = an ordinary student; existing accounts need no backfill.
CREATE TABLE IF NOT EXISTS user_roles (
  user_id    UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT        NOT NULL CHECK (role IN ('lecturer', 'admin')),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  granted_by UUID        REFERENCES auth.users(id)
);

-- 1b. Course-offering — the anchor a student's attendance attaches to. Not tied
-- to a lecturer, which is what pools a co-taught course into one register.
-- course_code / department / level mirror the values used elsewhere in Areté.
CREATE TABLE IF NOT EXISTS course_offerings (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  course_code      TEXT        NOT NULL,          -- e.g. 'CYB 224'
  course_title     TEXT,
  department       TEXT        NOT NULL,          -- e.g. 'cybersecurity'
  level            TEXT        NOT NULL CHECK (level IN ('100L','200L','300L','400L')),
  academic_session TEXT        NOT NULL,          -- e.g. '2025/2026'
  group_label      TEXT,                          -- nullable; for a rare A/B split, unused by default
  threshold_pct    SMALLINT    NOT NULL DEFAULT 70 CHECK (threshold_pct BETWEEN 1 AND 100),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (course_code, department, level, academic_session, group_label)
);

-- 1c. Which lecturers may run an offering (many-to-many). All linked lecturers
-- have equal rights. Rows are created from the dashboard / service role.
CREATE TABLE IF NOT EXISTS offering_lecturers (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  offering_id UUID        NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  lecturer_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (offering_id, lecturer_id)
);

-- 1d. One class held. closes_at = opened_at + the lecturer's chosen window.
-- checkin_code is the CURRENT rotating code; code_rotated_at is when it last
-- changed. Perimeter is optional; when set, an out-of-range check-in is flagged.
CREATE TABLE IF NOT EXISTS class_sessions (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  offering_id      UUID        NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  title            TEXT,
  held_on          DATE        NOT NULL DEFAULT CURRENT_DATE,
  opened_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closes_at        TIMESTAMPTZ NOT NULL,
  status           TEXT        NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  checkin_code     TEXT        NOT NULL,
  code_rotated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  perimeter_lat    DOUBLE PRECISION,
  perimeter_lng    DOUBLE PRECISION,
  perimeter_radius_m INTEGER,
  created_by       UUID        NOT NULL REFERENCES auth.users(id),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 1e. One attendance row per student per session. The *_snapshot columns freeze
-- identity at marking time (profiles are student-editable). UNIQUE(session_id,
-- student_id) is the "one check-in per student per session" rule, enforced by
-- the database.
CREATE TABLE IF NOT EXISTS attendance_records (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id          UUID        NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE,
  student_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status              TEXT        NOT NULL DEFAULT 'present' CHECK (status IN ('present','absent','manual')),
  capture             TEXT        NOT NULL DEFAULT 'self' CHECK (capture IN ('self','manual')),
  full_name_snapshot  TEXT,
  reg_number_snapshot TEXT,
  device_hash         TEXT,
  checkin_lat         DOUBLE PRECISION,
  checkin_lng         DOUBLE PRECISION,
  location_flagged    BOOLEAN     NOT NULL DEFAULT FALSE,
  device_flagged      BOOLEAN     NOT NULL DEFAULT FALSE,
  manual_reason       TEXT,
  marked_by           UUID        NOT NULL REFERENCES auth.users(id),
  marked_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_id, student_id)
);

-- 1f. Enforces "one device = one check-in per session". A second insert with the
-- same (session_id, device_hash) fails on the unique constraint, so one phone
-- cannot mark two students in the same class. Reached only through check_in().
CREATE TABLE IF NOT EXISTS session_devices (
  session_id  UUID        NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE,
  device_hash TEXT        NOT NULL,
  student_id  UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (session_id, device_hash)
);

-- Indexes for the common lookups.
CREATE INDEX IF NOT EXISTS offering_lecturers_lecturer_idx ON offering_lecturers (lecturer_id);
CREATE INDEX IF NOT EXISTS class_sessions_offering_idx     ON class_sessions (offering_id, held_on DESC);
CREATE INDEX IF NOT EXISTS attendance_session_idx          ON attendance_records (session_id);
CREATE INDEX IF NOT EXISTS attendance_student_idx          ON attendance_records (student_id, marked_at DESC);


-- ═══ SECTION 2: HELPER FUNCTIONS ════════════════════════════════════════════
-- SECURITY DEFINER so a policy can ask "does this lecturer teach here?" without
-- triggering the referenced table's own RLS (which would nest policies and can
-- recurse). search_path pinned — standard hardening so the body can't be
-- hijacked by the caller's search_path.

CREATE OR REPLACE FUNCTION is_lecturer_of(p_offering_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM offering_lecturers ol
    WHERE ol.offering_id = p_offering_id
      AND ol.lecturer_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION is_lecturer_of_session(p_session_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM class_sessions cs
    JOIN offering_lecturers ol ON ol.offering_id = cs.offering_id
    WHERE cs.id = p_session_id
      AND ol.lecturer_id = auth.uid()
  );
$$;

-- Does the caller teach ANY offering in this department? Backs the additive
-- roster read policy on profiles (section 6).
CREATE OR REPLACE FUNCTION teaches_in_department(p_department TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM offering_lecturers ol
    JOIN course_offerings co ON co.id = ol.offering_id
    WHERE ol.lecturer_id = auth.uid()
      AND co.department  = p_department
  );
$$;

REVOKE ALL ON FUNCTION is_lecturer_of(UUID)         FROM PUBLIC;
REVOKE ALL ON FUNCTION is_lecturer_of_session(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION teaches_in_department(TEXT)  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_lecturer_of(UUID)         TO authenticated;
GRANT EXECUTE ON FUNCTION is_lecturer_of_session(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION teaches_in_department(TEXT)  TO authenticated;


-- ═══ SECTION 3: CHECK-IN & CODE ROTATION ════════════════════════════════════

-- Student check-in. This is the ONLY way a student writes an attendance row —
-- attendance_records has no direct student INSERT policy (section 4). Doing it
-- server-side means the browser cannot skip the window check, forge the code,
-- reuse a device, or fake the time. All checks use server time (NOW()), so a
-- phone clock is irrelevant.
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

  -- One device = one check-in per session.
  BEGIN
    INSERT INTO session_devices (session_id, device_hash, student_id)
    VALUES (p_session_id, p_device_hash, v_uid);
  EXCEPTION WHEN unique_violation THEN
    RETURN QUERY SELECT FALSE, 'This device has already checked in for this class.', FALSE; RETURN;
  END;

  -- Identity snapshot from the caller's own profile.
  SELECT full_name, reg_number INTO v_name, v_reg FROM profiles WHERE id = v_uid;

  -- Location flag (never a block): outside the perimeter, if one is set.
  IF v_session.perimeter_lat IS NOT NULL AND p_lat IS NOT NULL THEN
    -- Rough metres: haversine is overkill at campus scale; a flat approximation
    -- is fine for a soft flag. 111320 m per degree latitude.
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

-- Lecturer rotates the visible code. Only a lecturer of the session may call it.
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
     SET checkin_code = p_new_code, code_rotated_at = NOW()
   WHERE id = p_session_id AND status = 'open';
  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION rotate_code(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rotate_code(UUID, TEXT) TO authenticated;


-- ═══ SECTION 4: ROW-LEVEL SECURITY ══════════════════════════════════════════

-- user_roles: read own only. No write policy → clients can never grant a role.
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read own role" ON user_roles;
CREATE POLICY "read own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- course_offerings: any signed-in user may read the list (students pick from it).
-- No client write policy — offerings are created from the dashboard.
ALTER TABLE course_offerings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read offerings" ON course_offerings;
CREATE POLICY "read offerings" ON course_offerings
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- offering_lecturers: a lecturer sees their own links. Written from dashboard.
ALTER TABLE offering_lecturers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read own links" ON offering_lecturers;
CREATE POLICY "read own links" ON offering_lecturers
  FOR SELECT USING (auth.uid() = lecturer_id);

-- class_sessions:
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;
-- Lecturer: full control of sessions of offerings they teach.
DROP POLICY IF EXISTS "lecturers manage their sessions" ON class_sessions;
CREATE POLICY "lecturers manage their sessions" ON class_sessions
  FOR ALL
  USING      (is_lecturer_of(offering_id))
  WITH CHECK (is_lecturer_of(offering_id) AND created_by = auth.uid());
-- Student: read only sessions they were marked in (so their history page can
-- show the class details). Enumerating other timetables is thereby prevented.
DROP POLICY IF EXISTS "students read attended sessions" ON class_sessions;
CREATE POLICY "students read attended sessions" ON class_sessions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM attendance_records ar
            WHERE ar.session_id = class_sessions.id AND ar.student_id = auth.uid())
  );

-- attendance_records:
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
-- Lecturer: full control of records in their sessions (validate, manual add).
DROP POLICY IF EXISTS "lecturers manage their records" ON attendance_records;
CREATE POLICY "lecturers manage their records" ON attendance_records
  FOR ALL
  USING      (is_lecturer_of_session(session_id))
  WITH CHECK (is_lecturer_of_session(session_id) AND marked_by = auth.uid());
-- Student: read OWN rows only. Note there is deliberately NO student INSERT
-- policy — the only way a student creates a row is through check_in() above,
-- which is SECURITY DEFINER and so bypasses this. A direct table insert from
-- the browser is denied.
DROP POLICY IF EXISTS "students read own records" ON attendance_records;
CREATE POLICY "students read own records" ON attendance_records
  FOR SELECT USING (auth.uid() = student_id);

-- session_devices: reachable only through check_in(); no client policies, and
-- direct access revoked. (RLS on, no permissive policy = all client access denied.)
ALTER TABLE session_devices ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON session_devices FROM anon, authenticated;

-- profiles: the ONE existing-table change, and it is ADDITIVE — a second
-- permissive SELECT policy. Postgres ORs permissive policies, so the current
-- "Users manage own profile" is untouched and every student keeps their exact
-- access. This only ADDS a lecturer's ability to read the profiles of students
-- in a department they teach, for the roster. Without it the roster is empty.
DROP POLICY IF EXISTS "lecturers read department roster" ON profiles;
CREATE POLICY "lecturers read department roster" ON profiles
  FOR SELECT USING (teaches_in_department(department));


-- ═══ SECTION 5: RELOAD ══════════════════════════════════════════════════════
-- PostgREST caches the schema; reload it after DDL — see
-- 20260728000000_departments.sql for why the queue poke is also needed.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
