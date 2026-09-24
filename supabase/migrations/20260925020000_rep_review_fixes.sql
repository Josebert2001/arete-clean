-- ─── Course reps: review fixes ──────────────────────────────────────────────
-- Run manually in the Supabase SQL editor. Idempotent: safe to re-run.
-- Requires 20260925010000_rep_security.sql.
--
--   1. revoke_lecturer_invite() raced accept: it read the invite unlocked and
--      updated it by id alone, so a cancel landing just after an accept
--      relabelled a live lecturer's invite 'revoked'. Now locked, and the
--      update only fires on the status it read.
--   2. "Student of this class" relied on profiles.department/level, which a
--      student edits freely at /profile. Now also: has this account ever been
--      marked in any class of that department + level? That history is not
--      student-editable. Checked at accept AND again at approval.
--   3. A rep could delete any lecturer link on their cohort's courses,
--      including the admin's own assignments, and nothing recorded it. Reps
--      may now only remove links that came in through an invite (created by a
--      non-admin); removing those is already logged as 'removed'.
--   4. The admin's approval view leaned on reg number, which is optional.
--      admin_list_invites now also returns when the account was created and
--      how many classes it has been marked in as a student.
--   5. invite_lecturer's replies told a rep whether an email had an account,
--      and whether it was a rep or a classmate. It now answers the same for
--      every address; those checks happen at accept time instead.
--   6. The audit flags were computed live on every row of the log at read
--      time, and the "course rep" flag vanished once a rep was removed. Both
--      flags are now stamped on the row when the change happens.
--   7. An invite only works while its sender is still the rep for that class
--      (or an admin); removing or moving a rep cancels their open invites.
--   8. The new audit columns (invited_by, created_by, …) no longer block
--      deleting an account: they go NULL instead.
--   9. A rep is appointed for a real department, not the 'general'
--      foundation pool, which spans many programmes.


-- ═══ Shared: is this account a student of that cohort? ═════════════════════
CREATE OR REPLACE FUNCTION is_student_of_cohort(p_user_id UUID, p_department TEXT, p_level TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT
    (NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = p_user_id)
     AND EXISTS (SELECT 1 FROM profiles
                 WHERE id = p_user_id AND department = p_department AND level = p_level))
    OR EXISTS (
      SELECT 1
      FROM attendance_records ar
      JOIN class_sessions   cs ON cs.id = ar.session_id
      JOIN course_offerings co ON co.id = cs.offering_id
      WHERE ar.student_id = p_user_id
        AND co.department = p_department AND co.level = p_level
    );
$$;

REVOKE ALL ON FUNCTION is_student_of_cohort(UUID, TEXT, TEXT) FROM PUBLIC;
-- Called only from the SECURITY DEFINER functions below; no client grant.

-- Is THAT user an admin? SECURITY DEFINER because a plain subquery on
-- user_roles inside a policy runs under the caller's RLS ("read own role"),
-- where a rep can never see an admin's row — so the check was always false.
CREATE OR REPLACE FUNCTION is_admin_user(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM user_roles WHERE user_id = p_user_id AND role = 'admin');
$$;

REVOKE ALL ON FUNCTION is_admin_user(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_admin_user(UUID) TO authenticated;

-- Is this invite's sender still entitled to send it? An admin, or the rep for
-- the offering's cohort right now.
CREATE OR REPLACE FUNCTION inviter_still_valid(p_inviter UUID, p_offering_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT is_admin_user(p_inviter) OR EXISTS (
    SELECT 1 FROM course_offerings co
    JOIN course_reps r ON r.department = co.department AND r.level = co.level
    WHERE co.id = p_offering_id AND r.user_id = p_inviter
  );
$$;

REVOKE ALL ON FUNCTION inviter_still_valid(UUID, UUID) FROM PUBLIC;


-- ═══ 1. revoke: locked, status-guarded ══════════════════════════════════════
CREATE OR REPLACE FUNCTION revoke_lecturer_invite(p_invite_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_inv lecturer_invites%ROWTYPE;
BEGIN
  SELECT * INTO v_inv FROM lecturer_invites WHERE id = p_invite_id FOR UPDATE;
  IF v_inv.id IS NULL OR NOT (is_admin() OR is_rep_of_offering(v_inv.offering_id)) THEN
    RETURN QUERY SELECT FALSE, 'Invite not found.'; RETURN;
  END IF;

  IF v_inv.status IN ('pending', 'awaiting_approval') THEN
    UPDATE lecturer_invites SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
     WHERE id = p_invite_id AND status = v_inv.status;
    RETURN QUERY SELECT TRUE, 'Invite cancelled.'; RETURN;
  END IF;

  IF v_inv.status = 'accepted' THEN
    -- Only the link this invite made. If the lecturer was already on the
    -- course through the admin, accept kept the admin's row (ON CONFLICT DO
    -- NOTHING) — a rep must not be able to remove that one by this route.
    DELETE FROM offering_lecturers
     WHERE offering_id = v_inv.offering_id AND lecturer_id = v_inv.accepted_by
       AND (is_admin() OR (created_by IS NOT NULL AND NOT is_admin_user(created_by)));
    IF NOT FOUND THEN
      RETURN QUERY SELECT FALSE, 'This lecturer was assigned by the admin; only the admin can remove them.'; RETURN;
    END IF;
    RETURN QUERY SELECT TRUE, 'Lecturer removed from the course.'; RETURN;
  END IF;

  RETURN QUERY SELECT FALSE, 'This invite is already closed.';
END;
$$;


-- ═══ 2. accept + approve: history-based classmate check ═════════════════════
CREATE OR REPLACE FUNCTION accept_lecturer_invite(p_invite_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT, pending_approval BOOLEAN)
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
    RETURN QUERY SELECT FALSE, 'Invite not found for this account.', FALSE; RETURN;
  END IF;
  IF v_inv.status <> 'pending' THEN
    RETURN QUERY SELECT FALSE, 'This invite is no longer open.', FALSE; RETURN;
  END IF;
  IF v_inv.expires_at < NOW() THEN
    RETURN QUERY SELECT FALSE, 'This invite has expired. Ask the course rep to send a new one.', FALSE; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = auth.uid()) THEN
    RETURN QUERY SELECT FALSE, 'A course rep cannot be a lecturer.', FALSE; RETURN;
  END IF;
  IF NOT inviter_still_valid(v_inv.invited_by, v_inv.offering_id) THEN
    RETURN QUERY SELECT FALSE, 'Whoever sent this invite is no longer the course rep. Ask the current rep for a new one.', FALSE; RETURN;
  END IF;

  SELECT * INTO v_off FROM course_offerings WHERE id = v_inv.offering_id;
  SELECT role INTO v_role FROM user_roles WHERE user_id = auth.uid();

  IF is_student_of_cohort(auth.uid(), v_off.department, v_off.level) THEN
    RETURN QUERY SELECT FALSE, 'Students in this class cannot accept a lecturer invite for it.', FALSE; RETURN;
  END IF;

  IF v_role IS NULL THEN
    UPDATE lecturer_invites
       SET status = 'awaiting_approval', accepted_by = auth.uid(), accepted_at = NOW()
     WHERE id = p_invite_id;
    RETURN QUERY SELECT TRUE,
      'Accepted. An admin will confirm you as a lecturer, then ' || v_off.course_code || ' will appear under Take Attendance.',
      TRUE;
    RETURN;
  END IF;

  INSERT INTO offering_lecturers (offering_id, lecturer_id, created_by)
  VALUES (v_inv.offering_id, auth.uid(), v_inv.invited_by)
  ON CONFLICT (offering_id, lecturer_id) DO NOTHING;

  UPDATE lecturer_invites
     SET status = 'accepted', accepted_by = auth.uid(), accepted_at = NOW()
   WHERE id = p_invite_id;

  RETURN QUERY SELECT TRUE, 'You now teach ' || v_off.course_code || '. Open Take Attendance to start a class.', FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION admin_decide_invite(p_invite_id UUID, p_approve BOOLEAN)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_inv lecturer_invites%ROWTYPE;
  v_off course_offerings%ROWTYPE;
BEGIN
  IF NOT is_admin() THEN
    RETURN QUERY SELECT FALSE, 'Only an admin can approve lecturers.'; RETURN;
  END IF;

  SELECT * INTO v_inv FROM lecturer_invites WHERE id = p_invite_id FOR UPDATE;
  IF v_inv.id IS NULL OR v_inv.status <> 'awaiting_approval' THEN
    RETURN QUERY SELECT FALSE, 'This invite is not waiting for approval.'; RETURN;
  END IF;

  IF NOT p_approve THEN
    UPDATE lecturer_invites SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
     WHERE id = p_invite_id;
    RETURN QUERY SELECT TRUE, 'Rejected. They were not made a lecturer.'; RETURN;
  END IF;

  SELECT * INTO v_off FROM course_offerings WHERE id = v_inv.offering_id;
  IF NOT inviter_still_valid(v_inv.invited_by, v_inv.offering_id) THEN
    RETURN QUERY SELECT FALSE, 'The rep who sent this invite has since been removed. Reject it, or assign the lecturer yourself.'; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = v_inv.accepted_by) THEN
    RETURN QUERY SELECT FALSE, 'This person is a course rep and cannot be a lecturer.'; RETURN;
  END IF;
  IF is_student_of_cohort(v_inv.accepted_by, v_off.department, v_off.level) THEN
    RETURN QUERY SELECT FALSE, 'This account is a student of that class and cannot be its lecturer.'; RETURN;
  END IF;

  INSERT INTO user_roles (user_id, role, granted_by)
  VALUES (v_inv.accepted_by, 'lecturer', auth.uid())
  ON CONFLICT (user_id) DO NOTHING;   -- never downgrade an admin

  INSERT INTO offering_lecturers (offering_id, lecturer_id, created_by)
  VALUES (v_inv.offering_id, v_inv.accepted_by, v_inv.invited_by)
  ON CONFLICT (offering_id, lecturer_id) DO NOTHING;

  UPDATE lecturer_invites
     SET status = 'accepted', approved_by = auth.uid(), approved_at = NOW()
   WHERE id = p_invite_id;

  RETURN QUERY SELECT TRUE, 'Approved. They can now run attendance for this course.';
END;
$$;


-- ═══ 3. Reps remove only invite-made links ══════════════════════════════════
-- created_by NULL = predates the audit column (set up by the admin); a link
-- created by an admin is the admin's to change.
DROP POLICY IF EXISTS "reps remove cohort links" ON offering_lecturers;
CREATE POLICY "reps remove cohort links" ON offering_lecturers
  FOR DELETE USING (
    is_rep_of_offering(offering_id)
    AND created_by IS NOT NULL
    AND NOT is_admin_user(created_by)
  );

-- The rep page needs to know which links it may remove.
DROP FUNCTION IF EXISTS rep_cohort_lecturers();
CREATE FUNCTION rep_cohort_lecturers()
RETURNS TABLE (offering_id UUID, lecturer_id UUID, full_name TEXT, email TEXT, removable BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
    SELECT ol.offering_id, ol.lecturer_id, p.full_name, u.email::TEXT,
           (ol.created_by IS NOT NULL
            AND NOT is_admin_user(ol.created_by))
    FROM offering_lecturers ol
    JOIN course_offerings co ON co.id = ol.offering_id
    JOIN course_reps r ON r.department = co.department AND r.level = co.level AND r.user_id = auth.uid()
    LEFT JOIN auth.users u ON u.id = ol.lecturer_id
    LEFT JOIN profiles   p ON p.id = ol.lecturer_id;
END;
$$;

REVOKE ALL ON FUNCTION rep_cohort_lecturers() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rep_cohort_lecturers() TO authenticated;


-- ═══ 4. Approval evidence beyond reg number ═════════════════════════════════
DROP FUNCTION IF EXISTS admin_list_invites();
CREATE FUNCTION admin_list_invites()
RETURNS TABLE (
  id UUID, email TEXT, status TEXT, created_at TIMESTAMPTZ, expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ, revoked_at TIMESTAMPTZ,
  course_code TEXT, department TEXT, level TEXT, academic_session TEXT,
  invited_by_name TEXT, accepted_by_name TEXT, accepted_by_email TEXT, accepted_by_reg TEXT,
  accepted_by_joined_at TIMESTAMPTZ, accepted_by_classes_attended BIGINT
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
           coalesce(pa.full_name, ua.email::TEXT),
           ua.email::TEXT,
           pa.reg_number,
           ua.created_at,
           CASE WHEN i.accepted_by IS NULL THEN NULL
                ELSE (SELECT count(*) FROM attendance_records ar WHERE ar.student_id = i.accepted_by) END
    FROM lecturer_invites i
    JOIN course_offerings co ON co.id = i.offering_id
    LEFT JOIN auth.users ui ON ui.id = i.invited_by
    LEFT JOIN profiles   pi ON pi.id = i.invited_by
    LEFT JOIN auth.users ua ON ua.id = i.accepted_by
    LEFT JOIN profiles   pa ON pa.id = i.accepted_by
    ORDER BY (i.status = 'awaiting_approval') DESC, i.created_at DESC
    LIMIT 200;
END;
$$;

REVOKE ALL ON FUNCTION admin_list_invites() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_list_invites() TO authenticated;


-- ═══ 5. invite_lecturer: same answer for every address ══════════════════════
CREATE OR REPLACE FUNCTION invite_lecturer(p_offering_id UUID, p_email TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_email TEXT := lower(trim(coalesce(p_email, '')));
BEGIN
  IF NOT (is_rep_of_offering(p_offering_id) OR is_admin()) THEN
    RETURN QUERY SELECT FALSE, 'Only the course rep for this class can invite its lecturers.'; RETURN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM course_offerings WHERE id = p_offering_id) THEN
    RETURN QUERY SELECT FALSE, 'Course not found.'; RETURN;
  END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RETURN QUERY SELECT FALSE, 'Enter a valid email address.'; RETURN;
  END IF;
  IF v_email = (SELECT lower(email) FROM auth.users WHERE id = auth.uid()) THEN
    RETURN QUERY SELECT FALSE, 'You cannot invite yourself.'; RETURN;
  END IF;

  -- Not a leak: the rep already sees who teaches their cohort's courses.
  -- Without it, re-inviting an admin-assigned lecturer produced an 'accepted'
  -- invite over the admin's link that revoke could then use to delete it.
  IF EXISTS (SELECT 1 FROM offering_lecturers ol JOIN auth.users u ON u.id = ol.lecturer_id
             WHERE ol.offering_id = p_offering_id AND lower(u.email) = v_email) THEN
    RETURN QUERY SELECT FALSE, 'That lecturer is already on this course.'; RETURN;
  END IF;

  UPDATE lecturer_invites SET status = 'revoked', revoked_at = NOW()
   WHERE offering_id = p_offering_id AND email = v_email
     AND status = 'pending' AND expires_at < NOW();

  BEGIN
    INSERT INTO lecturer_invites (offering_id, email, invited_by)
    VALUES (p_offering_id, v_email, auth.uid());
  EXCEPTION WHEN unique_violation THEN
    RETURN QUERY SELECT FALSE, 'That email already has an open invite for this course.'; RETURN;
  END;

  RETURN QUERY SELECT TRUE, 'Invite sent. Ask them to sign in with ' || v_email || ' and open Invitations.';
END;
$$;


-- ═══ 6. Audit flags stamped at write time ═══════════════════════════════════

-- Add the columns and stamp rows already logged — ONCE. On a re-run the
-- columns exist and this is skipped, so write-time stamps are never
-- overwritten from the current state (which would erase a removed rep's flags).
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_schema = 'public' AND table_name = 'attendance_audit'
                   AND column_name = 'student_was_rep') THEN
    ALTER TABLE attendance_audit ADD COLUMN student_was_rep      BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE attendance_audit ADD COLUMN actor_via_rep_invite BOOLEAN NOT NULL DEFAULT FALSE;
    UPDATE attendance_audit au SET
      student_was_rep = EXISTS (SELECT 1 FROM course_reps r WHERE r.user_id = au.student_id),
      actor_via_rep_invite = EXISTS (SELECT 1 FROM lecturer_invites li
                                     WHERE li.accepted_by = au.changed_by AND li.offering_id = au.offering_id
                                       AND li.status IN ('accepted','removed'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS lecturer_invites_accepted_idx ON lecturer_invites (accepted_by, offering_id);
CREATE INDEX IF NOT EXISTS attendance_audit_flagged_idx
  ON attendance_audit (changed_at DESC) WHERE student_was_rep OR actor_via_rep_invite;

CREATE OR REPLACE FUNCTION log_attendance_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_row      attendance_records%ROWTYPE;
  v_offering UUID;
BEGIN
  v_row := CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;

  -- A student's own check-in through check_in() is not an audit event.
  IF TG_OP = 'INSERT' AND NEW.capture = 'self' AND NEW.marked_by = NEW.student_id THEN
    RETURN NEW;
  END IF;

  SELECT offering_id INTO v_offering FROM class_sessions WHERE id = v_row.session_id;

  INSERT INTO attendance_audit (
    action, record_id, session_id, offering_id, student_id, old_row, new_row, changed_by,
    student_was_rep, actor_via_rep_invite
  ) VALUES (
    lower(TG_OP), v_row.id, v_row.session_id, v_offering, v_row.student_id,
    CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END,
    CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE to_jsonb(NEW) END,
    auth.uid(),
    EXISTS (SELECT 1 FROM course_reps WHERE user_id = v_row.student_id),
    EXISTS (SELECT 1 FROM lecturer_invites
            WHERE accepted_by = auth.uid() AND offering_id = v_offering
              AND status IN ('accepted','removed'))
  );
  RETURN v_row;
END;
$$;

CREATE OR REPLACE FUNCTION admin_list_attendance_changes(p_flagged_only BOOLEAN DEFAULT FALSE)
RETURNS TABLE (
  id BIGINT, action TEXT, changed_at TIMESTAMPTZ,
  course_code TEXT, held_on DATE,
  student_name TEXT, student_reg TEXT,
  actor_name TEXT, actor_role TEXT,
  old_status TEXT, new_status TEXT, reason TEXT,
  student_is_rep BOOLEAN, actor_invited_by_rep BOOLEAN
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
    WITH a AS (
      SELECT au.*, coalesce(au.new_row, au.old_row) AS snap
      FROM attendance_audit au
      WHERE NOT p_flagged_only OR au.student_was_rep OR au.actor_via_rep_invite
      ORDER BY au.changed_at DESC
      LIMIT 200
    )
    SELECT a.id, a.action, a.changed_at,
           co.course_code, cs.held_on,
           coalesce(ps.full_name, a.snap ->> 'full_name_snapshot'),
           coalesce(ps.reg_number, a.snap ->> 'reg_number_snapshot'),
           coalesce(pc.full_name, uc.email::TEXT), coalesce(ur.role, 'student'),
           a.old_row ->> 'status', a.new_row ->> 'status',
           a.snap ->> 'manual_reason',
           a.student_was_rep, a.actor_via_rep_invite
    FROM a
    LEFT JOIN course_offerings co ON co.id = a.offering_id
    LEFT JOIN class_sessions   cs ON cs.id = a.session_id
    LEFT JOIN profiles         ps ON ps.id = a.student_id
    LEFT JOIN profiles         pc ON pc.id = a.changed_by
    LEFT JOIN auth.users       uc ON uc.id = a.changed_by
    LEFT JOIN user_roles       ur ON ur.user_id = a.changed_by
    ORDER BY a.changed_at DESC;
END;
$$;


-- ═══ 7 + 9. admin_set_course_rep: real departments; moving a rep cancels ═══
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
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'No such account.'; RETURN;
  END IF;

  -- Leaving (or changing) a class ends the invites sent for the old one.
  UPDATE lecturer_invites li SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
   WHERE li.invited_by = p_user_id AND li.status IN ('pending','awaiting_approval')
     AND (p_department IS NULL OR p_level IS NULL OR NOT EXISTS (
           SELECT 1 FROM course_offerings co
           WHERE co.id = li.offering_id AND co.department = p_department AND co.level = p_level));

  IF p_department IS NULL OR p_level IS NULL THEN
    DELETE FROM course_reps WHERE user_id = p_user_id;
    RETURN QUERY SELECT TRUE, 'No longer a course rep. Their open invites were cancelled.'; RETURN;
  END IF;

  IF p_level NOT IN ('100L','200L','300L','400L') THEN
    RETURN QUERY SELECT FALSE, 'Unknown level.'; RETURN;
  END IF;
  -- 'general' is the foundation pool: students of many programmes, not one class.
  IF p_department = 'general' OR p_department !~ '^[a-zA-Z]+$' THEN
    RETURN QUERY SELECT FALSE, 'A course rep needs a real department on their profile, not foundation mode.'; RETURN;
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


-- ═══ 8. Audit columns don't block account deletion ══════════════════════════
ALTER TABLE lecturer_invites ALTER COLUMN invited_by DROP NOT NULL;

ALTER TABLE lecturer_invites DROP CONSTRAINT IF EXISTS lecturer_invites_invited_by_fkey;
ALTER TABLE lecturer_invites ADD  CONSTRAINT lecturer_invites_invited_by_fkey
  FOREIGN KEY (invited_by)  REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE lecturer_invites DROP CONSTRAINT IF EXISTS lecturer_invites_accepted_by_fkey;
ALTER TABLE lecturer_invites ADD  CONSTRAINT lecturer_invites_accepted_by_fkey
  FOREIGN KEY (accepted_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE lecturer_invites DROP CONSTRAINT IF EXISTS lecturer_invites_revoked_by_fkey;
ALTER TABLE lecturer_invites ADD  CONSTRAINT lecturer_invites_revoked_by_fkey
  FOREIGN KEY (revoked_by)  REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE lecturer_invites DROP CONSTRAINT IF EXISTS lecturer_invites_approved_by_fkey;
ALTER TABLE lecturer_invites ADD  CONSTRAINT lecturer_invites_approved_by_fkey
  FOREIGN KEY (approved_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE course_reps DROP CONSTRAINT IF EXISTS course_reps_appointed_by_fkey;
ALTER TABLE course_reps ADD  CONSTRAINT course_reps_appointed_by_fkey
  FOREIGN KEY (appointed_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE course_offerings DROP CONSTRAINT IF EXISTS course_offerings_created_by_fkey;
ALTER TABLE course_offerings ADD  CONSTRAINT course_offerings_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE offering_lecturers DROP CONSTRAINT IF EXISTS offering_lecturers_created_by_fkey;
ALTER TABLE offering_lecturers ADD  CONSTRAINT offering_lecturers_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;


NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
