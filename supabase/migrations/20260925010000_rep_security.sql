-- ─── Course reps: admin approval + attendance audit log ─────────────────────
-- Run manually in the Supabase SQL editor. Idempotent: safe to re-run.
-- Requires 20260925000000_course_reps.sql.
--
-- Closes the gap that migration left open: a rep could invite a second email
-- of their own, accept it, and — as a "lecturer" — mark themselves present.
--
--   1. First-time lecturers need admin approval. Accepting an invite as
--      someone who is NOT yet a lecturer parks it as 'awaiting_approval'; no
--      role is granted and no course is linked until the admin approves. An
--      existing lecturer (or admin) accepting is still linked immediately —
--      the admin approves each PERSON once, not each course.
--   2. attendance_audit — every manual insert, every edit and every delete on
--      attendance_records, with who did it and the before/after. Written by a
--      trigger, readable by admins only, unwritable by any client. Ordinary
--      self check-ins are not logged: check_in() already controls those, and
--      logging them would double the table for no signal.


-- ═══ 1. Approval step ═══════════════════════════════════════════════════════
ALTER TABLE lecturer_invites DROP CONSTRAINT IF EXISTS lecturer_invites_status_check;
ALTER TABLE lecturer_invites ADD CONSTRAINT lecturer_invites_status_check
  CHECK (status IN ('pending','awaiting_approval','accepted','revoked','removed'));

-- An invite awaiting approval is still live: it blocks a duplicate invite.
DROP INDEX IF EXISTS lecturer_invites_one_pending;
CREATE UNIQUE INDEX lecturer_invites_one_pending
  ON lecturer_invites (offering_id, email) WHERE status IN ('pending','awaiting_approval');

ALTER TABLE lecturer_invites ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);
ALTER TABLE lecturer_invites ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

-- Return type changes (adds pending_approval), so drop first.
DROP FUNCTION IF EXISTS accept_lecturer_invite(UUID);
CREATE FUNCTION accept_lecturer_invite(p_invite_id UUID)
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

  SELECT * INTO v_off FROM course_offerings WHERE id = v_inv.offering_id;
  SELECT role INTO v_role FROM user_roles WHERE user_id = auth.uid();

  IF v_role IS NULL AND EXISTS (
       SELECT 1 FROM profiles
       WHERE id = auth.uid() AND department = v_off.department AND level = v_off.level) THEN
    RETURN QUERY SELECT FALSE, 'Students in this class cannot accept a lecturer invite for it.', FALSE; RETURN;
  END IF;

  -- Not yet a lecturer: park it for the admin. Nothing is granted here.
  IF v_role IS NULL THEN
    UPDATE lecturer_invites
       SET status = 'awaiting_approval', accepted_by = auth.uid(), accepted_at = NOW()
     WHERE id = p_invite_id;
    RETURN QUERY SELECT TRUE,
      'Accepted. An admin will confirm you as a lecturer, then ' || v_off.course_code || ' will appear under Take Attendance.',
      TRUE;
    RETURN;
  END IF;

  -- Already a lecturer or admin: link straight away.
  INSERT INTO offering_lecturers (offering_id, lecturer_id, created_by)
  VALUES (v_inv.offering_id, auth.uid(), v_inv.invited_by)
  ON CONFLICT (offering_id, lecturer_id) DO NOTHING;

  UPDATE lecturer_invites
     SET status = 'accepted', accepted_by = auth.uid(), accepted_at = NOW()
   WHERE id = p_invite_id;

  RETURN QUERY SELECT TRUE, 'You now teach ' || v_off.course_code || '. Open Take Attendance to start a class.', FALSE;
END;
$$;

REVOKE ALL ON FUNCTION accept_lecturer_invite(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION accept_lecturer_invite(UUID) TO authenticated;

-- Admin decides on an invite awaiting approval. Every guard from accept is
-- re-checked, because the account may have changed since (e.g. been made rep).
CREATE OR REPLACE FUNCTION admin_decide_invite(p_invite_id UUID, p_approve BOOLEAN)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_inv lecturer_invites%ROWTYPE;
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

  IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = v_inv.accepted_by) THEN
    RETURN QUERY SELECT FALSE, 'This person is a course rep and cannot be a lecturer.'; RETURN;
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

REVOKE ALL ON FUNCTION admin_decide_invite(UUID, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_decide_invite(UUID, BOOLEAN) TO authenticated;

-- A rep or admin can also withdraw an invite while it awaits approval.
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

  IF v_inv.status IN ('pending', 'awaiting_approval') THEN
    UPDATE lecturer_invites SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
     WHERE id = p_invite_id;
    RETURN QUERY SELECT TRUE, 'Invite cancelled.'; RETURN;
  END IF;

  IF v_inv.status = 'accepted' THEN
    DELETE FROM offering_lecturers
     WHERE offering_id = v_inv.offering_id AND lecturer_id = v_inv.accepted_by;
    RETURN QUERY SELECT TRUE, 'Lecturer removed from the course.'; RETURN;
  END IF;

  RETURN QUERY SELECT FALSE, 'This invite is already closed.';
END;
$$;

-- The admin's log now also shows WHO accepted — email and reg number. A reg
-- number on a would-be lecturer is the tell for a student's second account.
DROP FUNCTION IF EXISTS admin_list_invites();
CREATE FUNCTION admin_list_invites()
RETURNS TABLE (
  id UUID, email TEXT, status TEXT, created_at TIMESTAMPTZ, expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ, revoked_at TIMESTAMPTZ,
  course_code TEXT, department TEXT, level TEXT, academic_session TEXT,
  invited_by_name TEXT, accepted_by_name TEXT, accepted_by_email TEXT, accepted_by_reg TEXT
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
           pa.reg_number
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


-- ═══ 2. Attendance audit log ════════════════════════════════════════════════
-- No foreign keys on the record / session / offering ids: the log must outlive
-- a deleted record, which is exactly the event it exists to catch.
CREATE TABLE IF NOT EXISTS attendance_audit (
  id          BIGSERIAL   PRIMARY KEY,
  action      TEXT        NOT NULL CHECK (action IN ('insert','update','delete')),
  record_id   UUID        NOT NULL,
  session_id  UUID        NOT NULL,
  offering_id UUID,
  student_id  UUID        NOT NULL,
  old_row     JSONB,
  new_row     JSONB,
  changed_by  UUID,
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS attendance_audit_changed_at_idx ON attendance_audit (changed_at DESC);

ALTER TABLE attendance_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON attendance_audit FROM anon, authenticated;
-- Admins read it through admin_list_attendance_changes(); no client policy.

CREATE OR REPLACE FUNCTION log_attendance_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_row attendance_records%ROWTYPE;
BEGIN
  v_row := CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;

  -- A student's own check-in through check_in() is not an audit event.
  IF TG_OP = 'INSERT' AND NEW.capture = 'self' AND NEW.marked_by = NEW.student_id THEN
    RETURN NEW;
  END IF;

  INSERT INTO attendance_audit (action, record_id, session_id, offering_id, student_id, old_row, new_row, changed_by)
  VALUES (
    lower(TG_OP), v_row.id, v_row.session_id,
    (SELECT offering_id FROM class_sessions WHERE id = v_row.session_id),
    v_row.student_id,
    CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END,
    CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE to_jsonb(NEW) END,
    auth.uid()
  );
  RETURN v_row;
END;
$$;

DROP TRIGGER IF EXISTS log_attendance_change ON attendance_records;
CREATE TRIGGER log_attendance_change
  AFTER INSERT OR UPDATE OR DELETE ON attendance_records
  FOR EACH ROW EXECUTE FUNCTION log_attendance_change();

-- The admin's view. Two flags pick out what to look at first:
--   student_is_rep      — the change was to a course rep's own attendance.
--   actor_invited_by_rep — whoever made it became this course's lecturer
--                          through a rep's invite.
-- Both together is the self-marking pattern this whole design guards against.
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
      SELECT au.*,
             coalesce(au.new_row, au.old_row) AS snap,
             EXISTS (SELECT 1 FROM course_reps r WHERE r.user_id = au.student_id) AS s_rep,
             EXISTS (SELECT 1 FROM lecturer_invites li
                     WHERE li.accepted_by = au.changed_by AND li.offering_id = au.offering_id
                       AND li.status IN ('accepted','removed')) AS a_rep
      FROM attendance_audit au
    )
    SELECT a.id, a.action, a.changed_at,
           co.course_code, cs.held_on,
           coalesce(ps.full_name, a.snap ->> 'full_name_snapshot'),
           coalesce(ps.reg_number, a.snap ->> 'reg_number_snapshot'),
           coalesce(pc.full_name, uc.email::TEXT), coalesce(ur.role, 'student'),
           a.old_row ->> 'status', a.new_row ->> 'status',
           a.snap ->> 'manual_reason',
           a.s_rep, a.a_rep
    FROM a
    LEFT JOIN course_offerings co ON co.id = a.offering_id
    LEFT JOIN class_sessions   cs ON cs.id = a.session_id
    LEFT JOIN profiles         ps ON ps.id = a.student_id
    LEFT JOIN profiles         pc ON pc.id = a.changed_by
    LEFT JOIN auth.users       uc ON uc.id = a.changed_by
    LEFT JOIN user_roles       ur ON ur.user_id = a.changed_by
    WHERE NOT p_flagged_only OR a.s_rep OR a.a_rep
    ORDER BY a.changed_at DESC
    LIMIT 200;
END;
$$;

REVOKE ALL ON FUNCTION admin_list_attendance_changes(BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_list_attendance_changes(BOOLEAN) TO authenticated;


NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
