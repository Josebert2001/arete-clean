-- ─── Course reps: delegated lecturer assignment ─────────────────────────────
-- Run manually in the Supabase SQL editor. Requires 20260924000000 (is_admin()).
-- Idempotent ONLY until 20260925010000 is applied: that file changes the
-- return types of accept_lecturer_invite / admin_list_invites, so re-running
-- this one afterwards fails. Once the later files are in, re-run those instead.
--
-- An admin appoints a student as the course rep for ONE cohort (department +
-- level). The rep can then, for that cohort only:
--   - create course offerings,
--   - invite a lecturer to an offering by email,
--   - remove a lecturer from an offering,
--   - revoke an invite.
-- The invited person becomes a lecturer only when they sign in with that email
-- and accept. The admin sees every invite and every link, with who made it.
--
-- WHY A SEPARATE TABLE, NOT A 'course_rep' VALUE IN user_roles
--   Several existing checks treat ANY user_roles row as staff —
--   reset_student_device() and find_student_by_reg() test "role IS NOT NULL" /
--   "EXISTS in user_roles". A rep stored there would silently inherit those
--   lecturer powers. In course_reps, a rep stays an ordinary student in every
--   existing check: they still check in, and they can't touch attendance.
--
-- THE GUARDRAILS (all enforced here, not in the UI)
--   - Only someone with no user_roles row can be appointed rep, and a rep can
--     never accept a lecturer invite — a rep is never also a lecturer.
--   - A rep cannot invite their own email.
--   - An invite cannot be accepted by a student of the offering's own
--     department + level (the rep's classmates) — checked at invite time when
--     the account already exists, and again at accept time.
--   - Reps cannot delete offerings (that would cascade-delete attendance).


-- ═══ 1. Tables ══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS course_reps (
  user_id      UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  department   TEXT        NOT NULL,
  level        TEXT        NOT NULL CHECK (level IN ('100L','200L','300L','400L')),
  appointed_by UUID        REFERENCES auth.users(id),
  appointed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lecturer_invites (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  offering_id UUID        NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  email       TEXT        NOT NULL CHECK (email = lower(trim(email)) AND email LIKE '%_@_%'),
  invited_by  UUID        NOT NULL REFERENCES auth.users(id),
  status      TEXT        NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','accepted','revoked','removed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '14 days',
  accepted_by UUID        REFERENCES auth.users(id),
  accepted_at TIMESTAMPTZ,
  revoked_by  UUID        REFERENCES auth.users(id),
  revoked_at  TIMESTAMPTZ
);

-- One live invite per person per course.
CREATE UNIQUE INDEX IF NOT EXISTS lecturer_invites_one_pending
  ON lecturer_invites (offering_id, email) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS lecturer_invites_email_idx ON lecturer_invites (email);

-- Who created a course or a lecturer link — the admin's audit trail. NULL on
-- rows that predate this migration.
ALTER TABLE course_offerings   ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();
ALTER TABLE offering_lecturers ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();


-- ═══ 2. Helpers ═════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION is_rep_for(p_department TEXT, p_level TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM course_reps
    WHERE user_id = auth.uid() AND department = p_department AND level = p_level
  );
$$;

CREATE OR REPLACE FUNCTION is_rep_of_offering(p_offering_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM course_offerings co
    JOIN course_reps r ON r.department = co.department AND r.level = co.level
    WHERE co.id = p_offering_id AND r.user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION is_rep_for(TEXT, TEXT)    FROM PUBLIC;
REVOKE ALL ON FUNCTION is_rep_of_offering(UUID)  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_rep_for(TEXT, TEXT)   TO authenticated;
GRANT EXECUTE ON FUNCTION is_rep_of_offering(UUID) TO authenticated;


-- ═══ 3. RLS ═════════════════════════════════════════════════════════════════
-- course_reps: a rep reads their own row; admins read all. No client writes —
-- appointments go through admin_set_course_rep().
ALTER TABLE course_reps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read own rep row or admin" ON course_reps;
CREATE POLICY "read own rep row or admin" ON course_reps
  FOR SELECT USING (auth.uid() = user_id OR is_admin());
GRANT SELECT ON course_reps TO authenticated;

-- lecturer_invites: read by the admin, by a rep of that course's cohort, and by
-- the invitee (matched on their signed-in email). Every write goes through the
-- functions below.
ALTER TABLE lecturer_invites ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read invites" ON lecturer_invites;
CREATE POLICY "read invites" ON lecturer_invites
  FOR SELECT USING (
    is_admin()
    OR is_rep_of_offering(offering_id)
    OR email = lower(auth.jwt() ->> 'email')
  );
REVOKE INSERT, UPDATE, DELETE ON lecturer_invites FROM anon, authenticated;
GRANT SELECT ON lecturer_invites TO authenticated;

-- course_offerings: a rep may create offerings for their own cohort only.
-- Deliberately no UPDATE/DELETE for reps.
DROP POLICY IF EXISTS "reps create cohort offerings" ON course_offerings;
CREATE POLICY "reps create cohort offerings" ON course_offerings
  FOR INSERT WITH CHECK (is_rep_for(department, level) AND created_by = auth.uid());

-- offering_lecturers: a rep sees and removes the links on their cohort's
-- courses. Adding a link is only possible by the invitee accepting.
DROP POLICY IF EXISTS "reps read cohort links" ON offering_lecturers;
CREATE POLICY "reps read cohort links" ON offering_lecturers
  FOR SELECT USING (is_rep_of_offering(offering_id));
DROP POLICY IF EXISTS "reps remove cohort links" ON offering_lecturers;
CREATE POLICY "reps remove cohort links" ON offering_lecturers
  FOR DELETE USING (is_rep_of_offering(offering_id));

-- When a link an invite created is removed (by a rep or the admin), mark the
-- invite 'removed' so the admin's log shows the lecturer is no longer on it.
CREATE OR REPLACE FUNCTION mark_invite_removed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE lecturer_invites
     SET status = 'removed', revoked_by = auth.uid(), revoked_at = NOW()
   WHERE offering_id = OLD.offering_id
     AND accepted_by = OLD.lecturer_id
     AND status = 'accepted';
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS mark_invite_removed ON offering_lecturers;
CREATE TRIGGER mark_invite_removed
  AFTER DELETE ON offering_lecturers
  FOR EACH ROW EXECUTE FUNCTION mark_invite_removed();


-- ═══ 4. Admin: appoint / remove reps, list reps, full invite log ════════════
-- p_department / p_level NULL removes the rep. Links and invites a removed rep
-- made are kept, for the admin to review in the invite log.
CREATE OR REPLACE FUNCTION admin_set_course_rep(p_user_id UUID, p_department TEXT, p_level TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN QUERY SELECT FALSE, 'Only an admin can appoint course reps.'; RETURN;
  END IF;

  IF p_department IS NULL OR p_level IS NULL THEN
    DELETE FROM course_reps WHERE user_id = p_user_id;
    RETURN QUERY SELECT TRUE, 'No longer a course rep.'; RETURN;
  END IF;

  IF p_level NOT IN ('100L','200L','300L','400L') THEN
    RETURN QUERY SELECT FALSE, 'Unknown level.'; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'Lecturers and admins cannot be course reps. Remove their role first.'; RETURN;
  END IF;

  INSERT INTO course_reps (user_id, department, level, appointed_by)
  VALUES (p_user_id, p_department, p_level, auth.uid())
  ON CONFLICT (user_id) DO UPDATE
    SET department = EXCLUDED.department, level = EXCLUDED.level,
        appointed_by = EXCLUDED.appointed_by, appointed_at = NOW();
  RETURN QUERY SELECT TRUE, 'Now a course rep.';
END;
$$;

CREATE OR REPLACE FUNCTION admin_list_course_reps()
RETURNS TABLE (id UUID, email TEXT, full_name TEXT, reg_number TEXT, department TEXT, level TEXT, appointed_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT r.user_id, u.email::TEXT, p.full_name, p.reg_number, r.department, r.level, r.appointed_at
    FROM course_reps r
    JOIN auth.users u ON u.id = r.user_id
    LEFT JOIN profiles p ON p.id = r.user_id
    ORDER BY r.department, r.level, p.full_name NULLS LAST;
END;
$$;

-- Every invite, newest first, with the names the admin needs to read it.
CREATE OR REPLACE FUNCTION admin_list_invites()
RETURNS TABLE (
  id UUID, email TEXT, status TEXT, created_at TIMESTAMPTZ, expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ, revoked_at TIMESTAMPTZ,
  course_code TEXT, department TEXT, level TEXT, academic_session TEXT,
  invited_by_name TEXT, accepted_by_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT i.id, i.email, i.status, i.created_at, i.expires_at, i.accepted_at, i.revoked_at,
           co.course_code, co.department, co.level, co.academic_session,
           coalesce(pi.full_name, ui.email::TEXT),
           coalesce(pa.full_name, ua.email::TEXT)
    FROM lecturer_invites i
    JOIN course_offerings co ON co.id = i.offering_id
    LEFT JOIN auth.users ui ON ui.id = i.invited_by
    LEFT JOIN profiles   pi ON pi.id = i.invited_by
    LEFT JOIN auth.users ua ON ua.id = i.accepted_by
    LEFT JOIN profiles   pa ON pa.id = i.accepted_by
    ORDER BY i.created_at DESC
    LIMIT 200;
END;
$$;

REVOKE ALL ON FUNCTION admin_set_course_rep(UUID, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION admin_list_course_reps()              FROM PUBLIC;
REVOKE ALL ON FUNCTION admin_list_invites()                  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_set_course_rep(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION admin_list_course_reps()              TO authenticated;
GRANT EXECUTE ON FUNCTION admin_list_invites()                  TO authenticated;


-- ═══ 5. Rep: invite, list the cohort's lecturers ════════════════════════════
CREATE OR REPLACE FUNCTION invite_lecturer(p_offering_id UUID, p_email TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_email TEXT := lower(trim(coalesce(p_email, '')));
  v_off   course_offerings%ROWTYPE;
  v_uid   UUID;
BEGIN
  IF NOT (is_rep_of_offering(p_offering_id) OR is_admin()) THEN
    RETURN QUERY SELECT FALSE, 'Only the course rep for this class can invite its lecturers.'; RETURN;
  END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RETURN QUERY SELECT FALSE, 'Enter a valid email address.'; RETURN;
  END IF;
  IF v_email = (SELECT lower(email) FROM auth.users WHERE id = auth.uid()) THEN
    RETURN QUERY SELECT FALSE, 'You cannot invite yourself.'; RETURN;
  END IF;

  SELECT * INTO v_off FROM course_offerings WHERE id = p_offering_id;
  IF v_off.id IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Course not found.'; RETURN;
  END IF;

  -- If the account already exists, refuse classmates and reps now rather than
  -- leaving an invite that can never be accepted.
  SELECT id INTO v_uid FROM auth.users WHERE lower(email) = v_email;
  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = v_uid) THEN
      RETURN QUERY SELECT FALSE, 'That person is a course rep and cannot be a lecturer.'; RETURN;
    END IF;
    IF EXISTS (SELECT 1 FROM profiles
               WHERE id = v_uid AND department = v_off.department AND level = v_off.level
                 AND NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = v_uid)) THEN
      RETURN QUERY SELECT FALSE, 'That account belongs to a student in this class, not a lecturer.'; RETURN;
    END IF;
    IF EXISTS (SELECT 1 FROM offering_lecturers WHERE offering_id = p_offering_id AND lecturer_id = v_uid) THEN
      RETURN QUERY SELECT FALSE, 'That lecturer is already on this course.'; RETURN;
    END IF;
  END IF;

  -- An expired pending invite would block the unique index; retire it first.
  UPDATE lecturer_invites SET status = 'revoked', revoked_at = NOW()
   WHERE offering_id = p_offering_id AND email = v_email
     AND status = 'pending' AND expires_at < NOW();

  BEGIN
    INSERT INTO lecturer_invites (offering_id, email, invited_by)
    VALUES (p_offering_id, v_email, auth.uid());
  EXCEPTION WHEN unique_violation THEN
    RETURN QUERY SELECT FALSE, 'That person already has a pending invite for this course.'; RETURN;
  END;

  RETURN QUERY SELECT TRUE, 'Invite sent. Ask them to sign in with ' || v_email || ' and open Invitations.';
END;
$$;

-- Cancel a pending invite. Admin: any. Rep: their cohort's.
CREATE OR REPLACE FUNCTION revoke_lecturer_invite(p_invite_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_inv lecturer_invites%ROWTYPE;
BEGIN
  SELECT * INTO v_inv FROM lecturer_invites WHERE id = p_invite_id;
  IF v_inv.id IS NULL OR NOT (is_admin() OR is_rep_of_offering(v_inv.offering_id)) THEN
    RETURN QUERY SELECT FALSE, 'Invite not found.'; RETURN;
  END IF;

  IF v_inv.status = 'pending' THEN
    UPDATE lecturer_invites SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
     WHERE id = p_invite_id;
    RETURN QUERY SELECT TRUE, 'Invite cancelled.'; RETURN;
  END IF;

  -- Accepted: take the lecturer off the course. The trigger marks it 'removed'.
  -- Their lecturer role stays — they may teach other courses.
  IF v_inv.status = 'accepted' THEN
    DELETE FROM offering_lecturers
     WHERE offering_id = v_inv.offering_id AND lecturer_id = v_inv.accepted_by;
    RETURN QUERY SELECT TRUE, 'Lecturer removed from the course.'; RETURN;
  END IF;

  RETURN QUERY SELECT FALSE, 'This invite is already closed.';
END;
$$;

-- The lecturers on the rep's cohort courses, with names (profiles of lecturers
-- are not readable to a student under RLS).
CREATE OR REPLACE FUNCTION rep_cohort_lecturers()
RETURNS TABLE (offering_id UUID, lecturer_id UUID, full_name TEXT, email TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
    SELECT ol.offering_id, ol.lecturer_id, p.full_name, u.email::TEXT
    FROM offering_lecturers ol
    JOIN course_offerings co ON co.id = ol.offering_id
    JOIN course_reps r ON r.department = co.department AND r.level = co.level AND r.user_id = auth.uid()
    LEFT JOIN auth.users u ON u.id = ol.lecturer_id
    LEFT JOIN profiles   p ON p.id = ol.lecturer_id;
END;
$$;

REVOKE ALL ON FUNCTION invite_lecturer(UUID, TEXT)      FROM PUBLIC;
REVOKE ALL ON FUNCTION revoke_lecturer_invite(UUID)     FROM PUBLIC;
REVOKE ALL ON FUNCTION rep_cohort_lecturers()           FROM PUBLIC;
GRANT EXECUTE ON FUNCTION invite_lecturer(UUID, TEXT)  TO authenticated;
GRANT EXECUTE ON FUNCTION revoke_lecturer_invite(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION rep_cohort_lecturers()       TO authenticated;


-- ═══ 6. Invitee: accept ═════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION accept_lecturer_invite(p_invite_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_inv   lecturer_invites%ROWTYPE;
  v_off   course_offerings%ROWTYPE;
  v_email TEXT;
  v_role  TEXT;
BEGIN
  SELECT lower(email) INTO v_email FROM auth.users WHERE id = auth.uid();
  SELECT * INTO v_inv FROM lecturer_invites WHERE id = p_invite_id FOR UPDATE;

  IF v_inv.id IS NULL OR v_inv.email IS DISTINCT FROM v_email THEN
    RETURN QUERY SELECT FALSE, 'Invite not found for this account.'; RETURN;
  END IF;
  IF v_inv.status <> 'pending' THEN
    RETURN QUERY SELECT FALSE, 'This invite is no longer open.'; RETURN;
  END IF;
  IF v_inv.expires_at < NOW() THEN
    RETURN QUERY SELECT FALSE, 'This invite has expired. Ask the course rep to send a new one.'; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = auth.uid()) THEN
    RETURN QUERY SELECT FALSE, 'A course rep cannot be a lecturer.'; RETURN;
  END IF;

  SELECT * INTO v_off FROM course_offerings WHERE id = v_inv.offering_id;
  SELECT role INTO v_role FROM user_roles WHERE user_id = auth.uid();

  IF v_role IS NULL AND EXISTS (
       SELECT 1 FROM profiles
       WHERE id = auth.uid() AND department = v_off.department AND level = v_off.level) THEN
    RETURN QUERY SELECT FALSE, 'Students in this class cannot accept a lecturer invite for it.'; RETURN;
  END IF;

  -- Never downgrade an admin; otherwise grant lecturer.
  IF v_role IS NULL THEN
    INSERT INTO user_roles (user_id, role, granted_by)
    VALUES (auth.uid(), 'lecturer', v_inv.invited_by);
  END IF;

  INSERT INTO offering_lecturers (offering_id, lecturer_id, created_by)
  VALUES (v_inv.offering_id, auth.uid(), v_inv.invited_by)
  ON CONFLICT (offering_id, lecturer_id) DO NOTHING;

  UPDATE lecturer_invites
     SET status = 'accepted', accepted_by = auth.uid(), accepted_at = NOW()
   WHERE id = p_invite_id;

  RETURN QUERY SELECT TRUE, 'You now teach ' || v_off.course_code || '. Open Take Attendance to start a class.';
END;
$$;

REVOKE ALL ON FUNCTION accept_lecturer_invite(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION accept_lecturer_invite(UUID) TO authenticated;


-- ═══ 7. admin_set_role(): a sitting rep cannot be made staff ════════════════
-- Same as 20260924000000 plus the course_reps check, so the "a rep is never
-- also a lecturer" rule holds from the admin's side too.
CREATE OR REPLACE FUNCTION admin_set_role(p_user_id UUID, p_role TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN QUERY SELECT FALSE, 'Only an admin can change roles.'; RETURN;
  END IF;
  IF p_user_id = auth.uid() THEN
    RETURN QUERY SELECT FALSE, 'You cannot change your own role.'; RETURN;
  END IF;
  IF p_role IS NOT NULL AND p_role NOT IN ('lecturer', 'admin') THEN
    RETURN QUERY SELECT FALSE, 'Unknown role.'; RETURN;
  END IF;

  IF p_role IS NULL THEN
    DELETE FROM offering_lecturers WHERE lecturer_id = p_user_id;
    DELETE FROM user_roles WHERE user_id = p_user_id;
    RETURN QUERY SELECT TRUE, 'Role removed.'; RETURN;
  END IF;

  IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'This person is a course rep. Remove them as rep first.'; RETURN;
  END IF;

  INSERT INTO user_roles (user_id, role, granted_by)
  VALUES (p_user_id, p_role, auth.uid())
  ON CONFLICT (user_id) DO UPDATE
    SET role = EXCLUDED.role, granted_by = EXCLUDED.granted_by, granted_at = NOW();
  RETURN QUERY SELECT TRUE, CASE WHEN p_role = 'admin' THEN 'Now an admin.' ELSE 'Now a lecturer.' END;
END;
$$;

REVOKE ALL ON FUNCTION admin_set_role(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_set_role(UUID, TEXT) TO authenticated;


NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
