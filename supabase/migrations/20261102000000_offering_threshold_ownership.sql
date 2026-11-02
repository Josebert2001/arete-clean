-- ─── Offering attendance threshold ownership ────────────────────────────────
-- Run manually in the Supabase SQL editor. Idempotent: safe to re-run.
-- Requires 20260925020000_rep_review_fixes.sql (and its attendance, admin,
-- course-rep, and rep-security predecessors) to be applied first.
--
-- Course reps could choose an exam-eligibility threshold when creating an
-- offering, while linked lecturers could not change it. Force rep inserts to
-- the existing 70% default, then let only admins or linked lecturers set a
-- new 1–100% value through an audited SECURITY DEFINER function.
-- The later rep-terms migration restricts rep inserts to its current session;
-- this trigger only owns the threshold and keeps its cohort check independent.

ALTER TABLE course_offerings
  ADD COLUMN IF NOT EXISTS threshold_set_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS threshold_set_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION enforce_offering_insert_threshold()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- No signed-in user means a trusted context (SQL editor, service role):
  -- keep whatever threshold it chose. Admins keep theirs too.
  IF auth.uid() IS NULL OR is_admin() THEN
    RETURN NEW;
  END IF;

  -- RLS also checks the rep's cohort. Repeat the check here so this trigger
  -- never becomes an alternate route to create an unauthorized offering.
  IF NOT (is_rep_for(NEW.department, NEW.level) AND NEW.created_by = auth.uid()) THEN
    RAISE EXCEPTION 'Only the course rep for this class can create its offering.';
  END IF;

  NEW.threshold_pct := 70;
  NEW.threshold_set_by := NULL;
  NEW.threshold_set_at := NULL;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION enforce_offering_insert_threshold() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION enforce_offering_insert_threshold() TO authenticated;

DROP TRIGGER IF EXISTS enforce_offering_insert_threshold ON course_offerings;
CREATE TRIGGER enforce_offering_insert_threshold
  BEFORE INSERT ON course_offerings
  FOR EACH ROW EXECUTE FUNCTION enforce_offering_insert_threshold();

CREATE OR REPLACE FUNCTION set_offering_threshold(p_offering_id UUID, p_pct INT)
RETURNS TABLE(ok BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT FALSE, 'You must be signed in.'; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM course_reps WHERE user_id = auth.uid()) THEN
    RETURN QUERY SELECT FALSE, 'Course reps cannot set attendance requirements.'; RETURN;
  END IF;
  IF p_pct IS NULL OR p_pct NOT BETWEEN 1 AND 100 THEN
    RETURN QUERY SELECT FALSE, 'Enter a percentage from 1 to 100.'; RETURN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM course_offerings WHERE id = p_offering_id) THEN
    RETURN QUERY SELECT FALSE, 'Course not found.'; RETURN;
  END IF;
  IF NOT is_admin() AND NOT (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'lecturer')
    AND EXISTS (SELECT 1 FROM offering_lecturers
                WHERE offering_id = p_offering_id AND lecturer_id = auth.uid())
  ) THEN
    RETURN QUERY SELECT FALSE, 'Only an admin or a linked lecturer can set this requirement.'; RETURN;
  END IF;

  UPDATE course_offerings
     SET threshold_pct = p_pct,
         threshold_set_by = auth.uid(),
         threshold_set_at = NOW()
   WHERE id = p_offering_id;
  RETURN QUERY SELECT TRUE, 'Attendance requirement updated.';
END;
$$;

REVOKE ALL ON FUNCTION set_offering_threshold(UUID, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION set_offering_threshold(UUID, INT) TO authenticated;

NOTIFY pgrst, 'reload schema';
