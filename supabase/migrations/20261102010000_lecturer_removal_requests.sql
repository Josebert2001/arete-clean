-- --- Lecturer removal approval after classes begin --------------------------
-- Run manually in the Supabase SQL editor. Idempotent: safe to re-run.
-- Requires 20260925020000_rep_review_fixes.sql (and its earlier attendance,
-- admin, course-rep and security migrations) to be applied first.
--
-- A rep could silently remove an invite-made lecturer mid-semester. Once any
-- class has ever been opened, direct rep deletion and accepted-invite revocation
-- are blocked; the rep must give a reason and an admin decides. Before the
-- first class, the existing direct-removal path stays available. A previously
-- removed lecturer's next accepted invite waits for admin reinstatement.
-- The removal log records every deleted offering link, including direct admin
-- removals that leave no invite behind. It has no foreign keys so cascades from
-- deleted offerings or accounts cannot block deletion or erase this history.

CREATE TABLE IF NOT EXISTS lecturer_removal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offering_id UUID NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  lecturer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT NOT NULL CHECK (length(trim(reason)) BETWEEN 10 AND 500 AND reason = trim(reason)),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  decided_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS lecturer_removal_one_pending
  ON lecturer_removal_requests (offering_id, lecturer_id) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS lecturer_removal_requests_status_created_idx
  ON lecturer_removal_requests (status, created_at DESC);

ALTER TABLE lecturer_removal_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admins and reps read removal requests" ON lecturer_removal_requests;
CREATE POLICY "admins and reps read removal requests" ON lecturer_removal_requests
  FOR SELECT USING (is_admin() OR is_rep_of_offering(offering_id));
REVOKE ALL ON lecturer_removal_requests FROM anon, authenticated;
GRANT SELECT ON lecturer_removal_requests TO authenticated;

-- Like attendance_audit, this history outlives the offering and account. An
-- AFTER DELETE trigger must also be able to write during their cascades.
CREATE TABLE IF NOT EXISTS offering_lecturer_removals (
  id BIGSERIAL PRIMARY KEY,
  offering_id UUID NOT NULL,
  lecturer_id UUID NOT NULL,
  removed_by UUID,
  removed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  link_created_by UUID
);
CREATE INDEX IF NOT EXISTS offering_lecturer_removals_pair_idx
  ON offering_lecturer_removals (offering_id, lecturer_id);

ALTER TABLE offering_lecturer_removals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admins read lecturer removals" ON offering_lecturer_removals;
CREATE POLICY "admins read lecturer removals" ON offering_lecturer_removals
  FOR SELECT USING (is_admin());
REVOKE ALL ON offering_lecturer_removals FROM anon, authenticated;
GRANT SELECT ON offering_lecturer_removals TO authenticated;

CREATE OR REPLACE FUNCTION log_offering_lecturer_removal()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO offering_lecturer_removals
    (offering_id, lecturer_id, removed_by, link_created_by)
  VALUES (OLD.offering_id, OLD.lecturer_id, auth.uid(), OLD.created_by);
  RETURN OLD;
EXCEPTION WHEN OTHERS THEN
  -- A logging failure must not block a link deletion or a parent cascade.
  RAISE WARNING 'Could not log lecturer link removal: %', SQLERRM;
  RETURN OLD;
END;
$$;
REVOKE ALL ON FUNCTION log_offering_lecturer_removal() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION log_offering_lecturer_removal() TO authenticated;

DROP TRIGGER IF EXISTS log_offering_lecturer_removal ON offering_lecturers;
CREATE TRIGGER log_offering_lecturer_removal
  AFTER DELETE ON offering_lecturers
  FOR EACH ROW EXECUTE FUNCTION log_offering_lecturer_removal();

-- One historical marker per offering and lecturer is enough to require review.
-- Existing log rows also make this safe to re-run after the trigger is active.
INSERT INTO offering_lecturer_removals
  (offering_id, lecturer_id, removed_by, removed_at, link_created_by)
SELECT history.offering_id, history.lecturer_id, history.removed_by,
       history.removed_at, history.link_created_by
FROM (
  SELECT DISTINCT ON (offering_id, lecturer_id)
         offering_id, lecturer_id, removed_by, removed_at, link_created_by
  FROM (
    SELECT offering_id, accepted_by AS lecturer_id, revoked_by AS removed_by,
           coalesce(revoked_at, accepted_at, created_at) AS removed_at,
           invited_by AS link_created_by
    FROM lecturer_invites
    WHERE status = 'removed' AND accepted_by IS NOT NULL
    UNION ALL
    SELECT offering_id, lecturer_id, decided_by AS removed_by,
           coalesce(decided_at, created_at) AS removed_at,
           NULL::UUID AS link_created_by
    FROM lecturer_removal_requests
    WHERE status = 'approved'
  ) prior
  ORDER BY offering_id, lecturer_id, removed_at DESC
) history
WHERE NOT EXISTS (
  SELECT 1 FROM offering_lecturer_removals logged
  WHERE logged.offering_id = history.offering_id
    AND logged.lecturer_id = history.lecturer_id
);

-- Based on the latest acceptance definition in 20260925020000. A lecturer
-- removed from this offering needs admin approval even if they kept their role.
CREATE OR REPLACE FUNCTION accept_lecturer_invite(p_invite_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT, pending_approval BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_inv   lecturer_invites%ROWTYPE;
  v_off   course_offerings%ROWTYPE;
  v_email TEXT;
  v_role  TEXT;
  v_removed BOOLEAN;
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

  SELECT EXISTS (
    SELECT 1 FROM offering_lecturer_removals logged
    WHERE logged.offering_id = v_inv.offering_id AND logged.lecturer_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM lecturer_invites old_inv
    WHERE old_inv.offering_id = v_inv.offering_id AND old_inv.accepted_by = auth.uid()
      AND old_inv.status = 'removed'
  ) OR EXISTS (
    SELECT 1 FROM lecturer_removal_requests rr
    WHERE rr.offering_id = v_inv.offering_id AND rr.lecturer_id = auth.uid()
      AND rr.status = 'approved'
  ) INTO v_removed;

  IF v_role IS NULL OR v_removed THEN
    UPDATE lecturer_invites
       SET status = 'awaiting_approval', accepted_by = auth.uid(), accepted_at = NOW()
     WHERE id = p_invite_id;
    RETURN QUERY SELECT TRUE,
      CASE WHEN v_removed
        THEN 'Accepted. An admin must approve your reinstatement to ' || v_off.course_code || '.'
        ELSE 'Accepted. An admin will confirm you as a lecturer, then ' || v_off.course_code || ' will appear under Take Attendance.' END,
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
REVOKE ALL ON FUNCTION accept_lecturer_invite(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION accept_lecturer_invite(UUID) TO authenticated;

-- admin_decide_invite() from 20260925020000 already keeps an existing lecturer
-- role (ON CONFLICT DO NOTHING) and adds the offering link on approval.

-- Match the review migration's return columns and add reinstatement evidence.
DROP FUNCTION IF EXISTS admin_list_invites();
CREATE FUNCTION admin_list_invites()
RETURNS TABLE (
  id UUID, email TEXT, status TEXT, created_at TIMESTAMPTZ, expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ, revoked_at TIMESTAMPTZ,
  course_code TEXT, department TEXT, level TEXT, academic_session TEXT,
  invited_by_name TEXT, accepted_by_name TEXT, accepted_by_email TEXT, accepted_by_reg TEXT,
  accepted_by_joined_at TIMESTAMPTZ, accepted_by_classes_attended BIGINT,
  is_reinstatement BOOLEAN
)
LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN RETURN; END IF;
  RETURN QUERY
    SELECT i.id, i.email, i.status, i.created_at, i.expires_at, i.accepted_at, i.revoked_at,
           co.course_code, co.department, co.level, co.academic_session,
           coalesce(pi.full_name, ui.email::TEXT),
           coalesce(pa.full_name, ua.email::TEXT), ua.email::TEXT, pa.reg_number, ua.created_at,
           CASE WHEN i.accepted_by IS NULL THEN NULL
                ELSE (SELECT count(*) FROM attendance_records ar WHERE ar.student_id = i.accepted_by) END,
           i.accepted_by IS NOT NULL AND (
             EXISTS (SELECT 1 FROM offering_lecturer_removals logged
               WHERE logged.offering_id = i.offering_id AND logged.lecturer_id = i.accepted_by)
             OR EXISTS (SELECT 1 FROM lecturer_invites old_inv
               WHERE old_inv.id <> i.id AND old_inv.offering_id = i.offering_id
                 AND old_inv.accepted_by = i.accepted_by AND old_inv.status = 'removed')
             OR EXISTS (SELECT 1 FROM lecturer_removal_requests rr
               WHERE rr.offering_id = i.offering_id AND rr.lecturer_id = i.accepted_by
                 AND rr.status = 'approved')
           )
    FROM lecturer_invites i
    JOIN course_offerings co ON co.id = i.offering_id
    LEFT JOIN auth.users ui ON ui.id = i.invited_by
    LEFT JOIN profiles pi ON pi.id = i.invited_by
    LEFT JOIN auth.users ua ON ua.id = i.accepted_by
    LEFT JOIN profiles pa ON pa.id = i.accepted_by
    ORDER BY (i.status = 'awaiting_approval') DESC, i.created_at DESC
    LIMIT 200;
END;
$$;
REVOKE ALL ON FUNCTION admin_list_invites() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_list_invites() TO authenticated;

-- Preserve the first class even when a linked lecturer deletes every session.
-- opened_at is the class start timestamp (held_on is only a date).
ALTER TABLE course_offerings ADD COLUMN IF NOT EXISTS first_class_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION record_offering_first_class()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Repeat the insert authorization because this trigger writes as its owner.
  IF auth.uid() IS NOT NULL AND NOT (is_admin() OR is_lecturer_of(NEW.offering_id)) THEN
    RAISE EXCEPTION 'Only a linked lecturer or admin can start this class.';
  END IF;
  UPDATE course_offerings SET first_class_at = NEW.opened_at
    WHERE id = NEW.offering_id AND first_class_at IS NULL;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION record_offering_first_class() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION record_offering_first_class() TO authenticated;

DROP TRIGGER IF EXISTS record_offering_first_class ON class_sessions;
CREATE TRIGGER record_offering_first_class
  AFTER INSERT ON class_sessions
  FOR EACH ROW EXECUTE FUNCTION record_offering_first_class();

UPDATE course_offerings co SET first_class_at = sessions.first_opened_at
FROM (SELECT offering_id, MIN(opened_at) AS first_opened_at
      FROM class_sessions GROUP BY offering_id) sessions
WHERE co.id = sessions.offering_id AND co.first_class_at IS NULL;

-- The admin's existing DELETE policy remains separate. This only narrows the
-- rep's policy, including direct table deletes from an older frontend.
-- A SECURITY DEFINER helper is necessary: a rep's class_sessions SELECT
-- policy may hide a session, so a subquery in the DELETE policy is unsafe.
CREATE OR REPLACE FUNCTION offering_has_class_sessions(p_offering_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM course_offerings
                 WHERE id = p_offering_id AND first_class_at IS NOT NULL)
      OR EXISTS (SELECT 1 FROM class_sessions WHERE offering_id = p_offering_id);
$$;
REVOKE ALL ON FUNCTION offering_has_class_sessions(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION offering_has_class_sessions(UUID) TO authenticated;

DROP POLICY IF EXISTS "reps remove cohort links" ON offering_lecturers;
CREATE POLICY "reps remove cohort links" ON offering_lecturers
  FOR DELETE USING (
    is_rep_of_offering(offering_id)
    AND created_by IS NOT NULL
    AND NOT is_admin_user(created_by)
    AND NOT offering_has_class_sessions(offering_id)
  );

CREATE OR REPLACE FUNCTION revoke_lecturer_invite(p_invite_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql SECURITY DEFINER
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
    IF NOT is_admin() AND offering_has_class_sessions(v_inv.offering_id) THEN
      RETURN QUERY SELECT FALSE, 'Classes have started. Request lecturer removal for admin approval.'; RETURN;
    END IF;
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
REVOKE ALL ON FUNCTION revoke_lecturer_invite(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION revoke_lecturer_invite(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION rep_request_lecturer_removal(p_offering_id UUID, p_lecturer_id UUID, p_reason TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_reason TEXT := trim(coalesce(p_reason, ''));
BEGIN
  IF NOT is_rep_of_offering(p_offering_id) THEN
    RETURN QUERY SELECT FALSE, 'Only this course rep can request removal.'; RETURN;
  END IF;
  IF length(v_reason) NOT BETWEEN 10 AND 500 THEN
    RETURN QUERY SELECT FALSE, 'Give a reason between 10 and 500 characters.'; RETURN;
  END IF;
  PERFORM 1 FROM offering_lecturers ol
    WHERE ol.offering_id = p_offering_id AND ol.lecturer_id = p_lecturer_id
      AND ol.created_by IS NOT NULL AND NOT is_admin_user(ol.created_by)
    FOR UPDATE;
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'This lecturer cannot be removed by a course rep.'; RETURN;
  END IF;
  IF NOT offering_has_class_sessions(p_offering_id) THEN
    RETURN QUERY SELECT FALSE, 'No class has started; remove this lecturer directly.'; RETURN;
  END IF;
  BEGIN
    INSERT INTO lecturer_removal_requests (offering_id, lecturer_id, requested_by, reason)
    VALUES (p_offering_id, p_lecturer_id, auth.uid(), v_reason);
  EXCEPTION WHEN unique_violation THEN
    RETURN QUERY SELECT FALSE, 'A removal request is already pending.'; RETURN;
  END;
  RETURN QUERY SELECT TRUE, 'Removal requested. An admin will review it.';
END;
$$;
REVOKE ALL ON FUNCTION rep_request_lecturer_removal(UUID, UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rep_request_lecturer_removal(UUID, UUID, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION rep_cancel_removal_request(p_request_id UUID)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_request lecturer_removal_requests%ROWTYPE;
BEGIN
  SELECT * INTO v_request FROM lecturer_removal_requests WHERE id = p_request_id FOR UPDATE;
  IF v_request.id IS NULL OR NOT is_rep_of_offering(v_request.offering_id) THEN
    RETURN QUERY SELECT FALSE, 'Removal request not found.'; RETURN;
  END IF;
  IF v_request.status <> 'pending' THEN
    RETURN QUERY SELECT FALSE, 'This request has already been decided.'; RETURN;
  END IF;
  UPDATE lecturer_removal_requests
    SET status = 'cancelled', decided_by = auth.uid(), decided_at = NOW()
    WHERE id = p_request_id;
  RETURN QUERY SELECT TRUE, 'Removal request cancelled.';
END;
$$;
REVOKE ALL ON FUNCTION rep_cancel_removal_request(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rep_cancel_removal_request(UUID) TO authenticated;

DROP FUNCTION IF EXISTS rep_cohort_lecturers();
CREATE FUNCTION rep_cohort_lecturers()
RETURNS TABLE (
  offering_id UUID, lecturer_id UUID, full_name TEXT, email TEXT,
  removable BOOLEAN, removal_requires_request BOOLEAN, pending_request_id UUID
)
LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
    SELECT ol.offering_id, ol.lecturer_id, p.full_name, u.email::TEXT,
           (ol.created_by IS NOT NULL AND NOT is_admin_user(ol.created_by)),
           offering_has_class_sessions(ol.offering_id),
           (SELECT rr.id FROM lecturer_removal_requests rr
             WHERE rr.offering_id = ol.offering_id AND rr.lecturer_id = ol.lecturer_id
               AND rr.status = 'pending')
    FROM offering_lecturers ol
    JOIN course_offerings co ON co.id = ol.offering_id
    JOIN course_reps r ON r.department = co.department AND r.level = co.level AND r.user_id = auth.uid()
    LEFT JOIN auth.users u ON u.id = ol.lecturer_id
    LEFT JOIN profiles p ON p.id = ol.lecturer_id;
END;
$$;
REVOKE ALL ON FUNCTION rep_cohort_lecturers() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rep_cohort_lecturers() TO authenticated;

CREATE OR REPLACE FUNCTION admin_list_removal_requests(p_pending_only BOOLEAN DEFAULT TRUE)
RETURNS TABLE (
  id UUID, offering_id UUID, lecturer_id UUID, course_code TEXT, department TEXT,
  level TEXT, academic_session TEXT, lecturer_name TEXT, lecturer_email TEXT,
  requester_name TEXT, reason TEXT, status TEXT, created_at TIMESTAMPTZ,
  decided_at TIMESTAMPTZ, classes_held BIGINT
)
LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN RETURN; END IF;
  RETURN QUERY
    SELECT rr.id, rr.offering_id, rr.lecturer_id, co.course_code, co.department,
           co.level, co.academic_session, lp.full_name, lu.email::TEXT,
           coalesce(rp.full_name, ru.email::TEXT), rr.reason, rr.status,
           rr.created_at, rr.decided_at,
           (SELECT count(*) FROM class_sessions cs WHERE cs.offering_id = rr.offering_id)
    FROM lecturer_removal_requests rr
    JOIN course_offerings co ON co.id = rr.offering_id
    LEFT JOIN auth.users lu ON lu.id = rr.lecturer_id
    LEFT JOIN profiles lp ON lp.id = rr.lecturer_id
    LEFT JOIN auth.users ru ON ru.id = rr.requested_by
    LEFT JOIN profiles rp ON rp.id = rr.requested_by
    WHERE NOT coalesce(p_pending_only, TRUE) OR rr.status = 'pending'
    ORDER BY rr.created_at DESC
    LIMIT 200;
END;
$$;
REVOKE ALL ON FUNCTION admin_list_removal_requests(BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_list_removal_requests(BOOLEAN) TO authenticated;

CREATE OR REPLACE FUNCTION admin_decide_removal(p_request_id UUID, p_approve BOOLEAN)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_request lecturer_removal_requests%ROWTYPE;
  v_link offering_lecturers%ROWTYPE;
BEGIN
  IF NOT is_admin() THEN
    RETURN QUERY SELECT FALSE, 'Only an admin can decide removal requests.'; RETURN;
  END IF;
  IF p_approve IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Choose approve or reject.'; RETURN;
  END IF;
  SELECT * INTO v_request FROM lecturer_removal_requests WHERE id = p_request_id FOR UPDATE;
  IF v_request.id IS NULL OR v_request.status <> 'pending' THEN
    RETURN QUERY SELECT FALSE, 'This request is no longer pending.'; RETURN;
  END IF;
  IF p_approve THEN
    IF v_request.requested_by IS NULL OR NOT EXISTS (
      SELECT 1 FROM course_offerings co
      JOIN course_reps r ON r.department = co.department AND r.level = co.level
      WHERE co.id = v_request.offering_id AND r.user_id = v_request.requested_by
    ) THEN
      RETURN QUERY SELECT FALSE, 'The requester is no longer this course rep. Reject the request.'; RETURN;
    END IF;
    SELECT * INTO v_link FROM offering_lecturers
      WHERE offering_id = v_request.offering_id AND lecturer_id = v_request.lecturer_id FOR UPDATE;
    IF v_link.id IS NULL THEN
      RETURN QUERY SELECT FALSE, 'The lecturer is no longer on this course. Reject the request.'; RETURN;
    END IF;
    IF v_link.created_by IS NULL OR is_admin_user(v_link.created_by) THEN
      RETURN QUERY SELECT FALSE, 'This lecturer is now admin-assigned. Reject the request.'; RETURN;
    END IF;
    IF NOT offering_has_class_sessions(v_request.offering_id) THEN
      RETURN QUERY SELECT FALSE, 'No class has started. Reject the request.'; RETURN;
    END IF;
    DELETE FROM offering_lecturers
      WHERE offering_id = v_request.offering_id AND lecturer_id = v_request.lecturer_id;
  END IF;
  UPDATE lecturer_removal_requests
    SET status = CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END,
        decided_by = auth.uid(), decided_at = NOW()
    WHERE id = p_request_id;
  RETURN QUERY SELECT TRUE, CASE WHEN p_approve
    THEN 'Approved. Lecturer removed from the course.' ELSE 'Removal request rejected.' END;
END;
$$;
REVOKE ALL ON FUNCTION admin_decide_removal(UUID, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_decide_removal(UUID, BOOLEAN) TO authenticated;

NOTIFY pgrst, 'reload schema';
