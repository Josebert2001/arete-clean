-- ─── Attendance admin console ───────────────────────────────────────────────
-- Run manually in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- Until now, making someone a lecturer, creating a course offering and linking
-- the two could only be done from the SQL editor. This backs the in-app /admin
-- page so an admin can do all three from the UI.
--
-- BOOTSTRAP (once, by hand): the first admin still has to be granted here, or
-- any signed-in user could make themselves admin:
--   INSERT INTO user_roles (user_id, role)
--   SELECT id, 'admin' FROM auth.users WHERE email = '<your email>'
--   ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
--
-- What this adds:
--   1. is_admin() helper.
--   2. Admin write policies on course_offerings and offering_lecturers, and
--      read-all on offering_lecturers.
--   3. admin_find_users() / admin_list_staff() / admin_set_role() — role
--      changes and user lookup go through SECURITY DEFINER functions, because
--      emails live in auth.users (not readable from the client) and user_roles
--      must stay unwritable by direct table access.
--   4. A trigger that closes an offering's EXPIRED open session before a new
--      one is inserted. Without it, a lecturer who never clicked "Close
--      session" left status = 'open' behind, and one_open_session_per_offering
--      rejected every later session for that course, permanently.


-- ═══ 1. is_admin() ══════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin');
$$;

REVOKE ALL ON FUNCTION is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;


-- ═══ 2. Admin policies ══════════════════════════════════════════════════════
-- Permissive policies are OR'd with the existing read policies, so lecturers
-- and students keep exactly the access they have today.
DROP POLICY IF EXISTS "admins manage offerings" ON course_offerings;
CREATE POLICY "admins manage offerings" ON course_offerings
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admins manage lecturer links" ON offering_lecturers;
CREATE POLICY "admins manage lecturer links" ON offering_lecturers
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON course_offerings   TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON offering_lecturers TO authenticated;


-- ═══ 3. User lookup and roles ═══════════════════════════════════════════════
-- Search by email, name or reg number. Admin-only; returns nothing otherwise.
CREATE OR REPLACE FUNCTION admin_find_users(p_query TEXT)
RETURNS TABLE (id UUID, email TEXT, full_name TEXT, reg_number TEXT, department TEXT, level TEXT, role TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
DECLARE
  v_q TEXT := trim(coalesce(p_query, ''));
BEGIN
  IF NOT is_admin() OR length(v_q) < 3 THEN
    RETURN;
  END IF;
  RETURN QUERY
    SELECT u.id, u.email::TEXT, p.full_name, p.reg_number, p.department, p.level, r.role
    FROM auth.users u
    LEFT JOIN profiles   p ON p.id = u.id
    LEFT JOIN user_roles r ON r.user_id = u.id
    WHERE u.email ILIKE '%' || v_q || '%'
       OR p.full_name ILIKE '%' || v_q || '%'
       OR p.reg_number = v_q
    ORDER BY p.full_name NULLS LAST, u.email
    LIMIT 20;
END;
$$;

REVOKE ALL ON FUNCTION admin_find_users(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_find_users(TEXT) TO authenticated;

-- Every lecturer/admin, for the staff list and the "assign lecturer" picker.
CREATE OR REPLACE FUNCTION admin_list_staff()
RETURNS TABLE (id UUID, email TEXT, full_name TEXT, role TEXT)
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
    SELECT u.id, u.email::TEXT, p.full_name, r.role
    FROM user_roles r
    JOIN auth.users u ON u.id = r.user_id
    LEFT JOIN profiles p ON p.id = r.user_id
    ORDER BY p.full_name NULLS LAST, u.email;
END;
$$;

REVOKE ALL ON FUNCTION admin_list_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_list_staff() TO authenticated;

-- p_role: 'lecturer', 'admin', or NULL to remove the role. An admin cannot
-- change their own role, so the last admin can never lock everyone out.
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

  INSERT INTO user_roles (user_id, role, granted_by)
  VALUES (p_user_id, p_role, auth.uid())
  ON CONFLICT (user_id) DO UPDATE
    SET role = EXCLUDED.role, granted_by = EXCLUDED.granted_by, granted_at = NOW();
  RETURN QUERY SELECT TRUE, CASE WHEN p_role = 'admin' THEN 'Now an admin.' ELSE 'Now a lecturer.' END;
END;
$$;

REVOKE ALL ON FUNCTION admin_set_role(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_set_role(UUID, TEXT) TO authenticated;


-- ═══ 4. Expired sessions never block the next class ═════════════════════════
-- Runs BEFORE the new row reaches one_open_session_per_offering, so the stale
-- row is already 'closed' when the unique index is checked. held counts are
-- unaffected: they already treated "closes_at < NOW()" as held.
CREATE OR REPLACE FUNCTION close_expired_sessions_for_offering()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE class_sessions
     SET status = 'closed'
   WHERE offering_id = NEW.offering_id
     AND status = 'open'
     AND closes_at < NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS close_expired_before_open ON class_sessions;
CREATE TRIGGER close_expired_before_open
  BEFORE INSERT ON class_sessions
  FOR EACH ROW EXECUTE FUNCTION close_expired_sessions_for_offering();

-- One-off: close every session already stuck in that state.
UPDATE class_sessions SET status = 'closed' WHERE status = 'open' AND closes_at < NOW();


NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
