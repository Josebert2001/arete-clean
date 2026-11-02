-- --- Course rep terms end with the academic session -------------------------
-- Run manually in the Supabase SQL editor. Idempotent: safe to re-run.
-- Requires 20261102010000_lecturer_removal_requests.sql (and its earlier
-- attendance, course-rep, security and review migrations) to be applied first.
--
-- A rep used to keep control of a department and level after their class moved
-- on. Stamp each appointment with a session and require the current term for
-- every rep permission, including matching the offering's session. Rep-created
-- offerings must use the current session. Existing appointments are current for this backfill.

-- Keep the September boundary in sync with src/utils/academicSession.js.
CREATE OR REPLACE FUNCTION current_academic_session()
RETURNS TEXT
LANGUAGE SQL STABLE
SET search_path = public, pg_temp
AS $$
  SELECT (start_year::TEXT || '/' || (start_year + 1)::TEXT)
  FROM (
    SELECT CASE WHEN EXTRACT(MONTH FROM now() AT TIME ZONE 'Africa/Lagos') >= 9
      THEN EXTRACT(YEAR FROM now() AT TIME ZONE 'Africa/Lagos')::INTEGER
      ELSE EXTRACT(YEAR FROM now() AT TIME ZONE 'Africa/Lagos')::INTEGER - 1 END AS start_year
  ) years;
$$;
REVOKE ALL ON FUNCTION current_academic_session() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION current_academic_session() TO authenticated;

ALTER TABLE course_reps ADD COLUMN IF NOT EXISTS academic_session TEXT;
UPDATE course_reps SET academic_session = current_academic_session() WHERE academic_session IS NULL;
ALTER TABLE course_reps ALTER COLUMN academic_session SET NOT NULL;
ALTER TABLE course_reps ALTER COLUMN academic_session SET DEFAULT current_academic_session();
ALTER TABLE course_reps DROP CONSTRAINT IF EXISTS course_reps_academic_session_format;
ALTER TABLE course_reps ADD CONSTRAINT course_reps_academic_session_format
  CHECK (academic_session ~ '^[0-9]{4}/[0-9]{4}$'
    AND split_part(academic_session, '/', 2)::INTEGER = split_part(academic_session, '/', 1)::INTEGER + 1);

CREATE OR REPLACE FUNCTION is_rep_for(p_department TEXT, p_level TEXT)
RETURNS BOOLEAN LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM course_reps
    WHERE user_id = auth.uid() AND department = p_department AND level = p_level
      AND academic_session = current_academic_session());
$$;
REVOKE ALL ON FUNCTION is_rep_for(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_rep_for(TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION is_rep_of_offering(p_offering_id UUID)
RETURNS BOOLEAN LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM course_offerings co
    JOIN course_reps r ON r.department = co.department AND r.level = co.level
      AND co.academic_session = r.academic_session
    WHERE co.id = p_offering_id AND r.user_id = auth.uid()
      AND r.academic_session = current_academic_session());
$$;
REVOKE ALL ON FUNCTION is_rep_of_offering(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_rep_of_offering(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION inviter_still_valid(p_inviter UUID, p_offering_id UUID)
RETURNS BOOLEAN LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
  SELECT is_admin_user(p_inviter) OR EXISTS (
    SELECT 1 FROM course_offerings co
    JOIN course_reps r ON r.department = co.department AND r.level = co.level
      AND co.academic_session = r.academic_session
    WHERE co.id = p_offering_id AND r.user_id = p_inviter
      AND r.academic_session = current_academic_session());
$$;
REVOKE ALL ON FUNCTION inviter_still_valid(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION inviter_still_valid(UUID, UUID) TO authenticated;

-- Return shape follows 20261102010000, including removal request evidence.
CREATE OR REPLACE FUNCTION rep_cohort_lecturers()
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
    JOIN course_reps r ON r.department = co.department AND r.level = co.level
      AND co.academic_session = r.academic_session
      AND r.user_id = auth.uid() AND r.academic_session = current_academic_session()
    LEFT JOIN auth.users u ON u.id = ol.lecturer_id
    LEFT JOIN profiles p ON p.id = ol.lecturer_id;
END;
$$;
REVOKE ALL ON FUNCTION rep_cohort_lecturers() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rep_cohort_lecturers() TO authenticated;

DROP POLICY IF EXISTS "reps create cohort offerings" ON course_offerings;
CREATE POLICY "reps create cohort offerings" ON course_offerings
  FOR INSERT WITH CHECK (
    is_rep_for(department, level)
    AND academic_session = current_academic_session()
    AND created_by = auth.uid()
  );

-- Preserve the review migration's account, department and invite guards.
CREATE OR REPLACE FUNCTION admin_set_course_rep(p_user_id UUID, p_department TEXT, p_level TEXT)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN
    RETURN QUERY SELECT FALSE, 'Only an admin can appoint course reps.'; RETURN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'No such account.'; RETURN;
  END IF;

  IF p_department IS NULL OR p_level IS NULL THEN
    UPDATE lecturer_invites SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
      WHERE invited_by = p_user_id AND status IN ('pending','awaiting_approval');
    DELETE FROM course_reps WHERE user_id = p_user_id;
    RETURN QUERY SELECT TRUE, 'No longer a course rep. Their open invites were cancelled.'; RETURN;
  END IF;
  IF p_level NOT IN ('100L','200L','300L','400L') THEN
    RETURN QUERY SELECT FALSE, 'Unknown level.'; RETURN;
  END IF;
  IF p_department = 'general' OR p_department !~ '^[a-zA-Z]+$' THEN
    RETURN QUERY SELECT FALSE, 'A course rep needs a real department on their profile, not foundation mode.'; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'Lecturers and admins cannot be course reps. Remove their role first.'; RETURN;
  END IF;

  UPDATE lecturer_invites li SET status = 'revoked', revoked_by = auth.uid(), revoked_at = NOW()
   WHERE li.invited_by = p_user_id AND li.status IN ('pending','awaiting_approval')
     AND NOT EXISTS (SELECT 1 FROM course_offerings co
       WHERE co.id = li.offering_id AND co.department = p_department AND co.level = p_level
         AND co.academic_session = current_academic_session());

  INSERT INTO course_reps (user_id, department, level, academic_session, appointed_by)
  VALUES (p_user_id, p_department, p_level, current_academic_session(), auth.uid())
  ON CONFLICT (user_id) DO UPDATE
    SET department = EXCLUDED.department, level = EXCLUDED.level,
        academic_session = EXCLUDED.academic_session,
        appointed_by = EXCLUDED.appointed_by, appointed_at = NOW();
  RETURN QUERY SELECT TRUE, 'Now a course rep.';
END;
$$;
REVOKE ALL ON FUNCTION admin_set_course_rep(UUID, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_set_course_rep(UUID, TEXT, TEXT) TO authenticated;

DROP FUNCTION IF EXISTS admin_list_course_reps();
CREATE FUNCTION admin_list_course_reps()
RETURNS TABLE (id UUID, email TEXT, full_name TEXT, reg_number TEXT,
  department TEXT, level TEXT, appointed_at TIMESTAMPTZ,
  academic_session TEXT, active BOOLEAN)
LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT is_admin() THEN RETURN; END IF;
  RETURN QUERY
    SELECT r.user_id, u.email::TEXT, p.full_name, p.reg_number, r.department,
      r.level, r.appointed_at, r.academic_session,
      r.academic_session = current_academic_session()
    FROM course_reps r
    JOIN auth.users u ON u.id = r.user_id
    LEFT JOIN profiles p ON p.id = r.user_id
    ORDER BY r.department, r.level, p.full_name NULLS LAST;
END;
$$;
REVOKE ALL ON FUNCTION admin_list_course_reps() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_list_course_reps() TO authenticated;

CREATE OR REPLACE FUNCTION admin_renew_course_rep(p_user_id UUID, p_next_level BOOLEAN)
RETURNS TABLE (ok BOOLEAN, message TEXT)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_rep course_reps%ROWTYPE;
  v_level TEXT;
BEGIN
  IF NOT is_admin() THEN
    RETURN QUERY SELECT FALSE, 'Only an admin can renew course reps.'; RETURN;
  END IF;
  IF p_next_level IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Choose whether to advance the level.'; RETURN;
  END IF;
  SELECT * INTO v_rep FROM course_reps WHERE user_id = p_user_id FOR UPDATE;
  IF v_rep.user_id IS NULL THEN
    RETURN QUERY SELECT FALSE, 'Course rep not found.'; RETURN;
  END IF;
  IF v_rep.academic_session = current_academic_session() THEN
    RETURN QUERY SELECT FALSE, 'This course rep already has an active term.'; RETURN;
  END IF;
  IF p_next_level AND v_rep.level = '400L' THEN
    RETURN QUERY SELECT FALSE, 'Cannot renew beyond 400L.'; RETURN;
  END IF;
  v_level := CASE WHEN p_next_level THEN (split_part(v_rep.level, 'L', 1)::INTEGER + 100)::TEXT || 'L'
    ELSE v_rep.level END;
  -- Reuse the appointment path so its guards and moved-invite cancellation apply.
  RETURN QUERY SELECT * FROM admin_set_course_rep(p_user_id, v_rep.department, v_level);
END;
$$;
REVOKE ALL ON FUNCTION admin_renew_course_rep(UUID, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_renew_course_rep(UUID, BOOLEAN) TO authenticated;

-- The approval path in 20261102010000 also checks that the requester is still
-- the rep. An expired request must not pass that check.
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
        AND co.academic_session = r.academic_session
      WHERE co.id = v_request.offering_id AND r.user_id = v_request.requested_by
        AND r.academic_session = current_academic_session()
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
