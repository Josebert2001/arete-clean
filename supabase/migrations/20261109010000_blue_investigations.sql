-- Apply after career placement. Keep CAREER_ASSESSMENT_ENABLED=false until
-- practitioner review, assignment and preview integration checks are complete.
BEGIN;
CREATE TABLE public.career_case_invitations (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '7 days',
  CHECK (expires_at > invited_at)
);
ALTER TABLE public.career_case_invitations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.career_case_invitations FROM anon, authenticated;
GRANT SELECT ON public.career_case_invitations TO authenticated;
GRANT ALL ON public.career_case_invitations TO service_role;
CREATE POLICY career_invitation_read ON public.career_case_invitations FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE TABLE public.career_case_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_version text NOT NULL CHECK (case_version IN ('blue-case-a-v1', 'blue-case-b-v1')),
  rubric_version text NOT NULL DEFAULT 'blue-investigation-v1',
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'reviewed', 'expired')),
  simulation jsonb NOT NULL CHECK (jsonb_typeof(simulation) = 'object'),
  draft jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(draft) = 'object'),
  revision integer NOT NULL DEFAULT 0 CHECK (revision >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  deadline_at timestamptz NOT NULL DEFAULT now() + interval '7 days',
  UNIQUE (user_id, case_version)
);
CREATE UNIQUE INDEX career_one_active_case ON public.career_case_attempts(user_id) WHERE status = 'in_progress';
CREATE TABLE public.career_case_submissions (
  attempt_id uuid PRIMARY KEY REFERENCES public.career_case_attempts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report jsonb NOT NULL CHECK (jsonb_typeof(report) = 'object'),
  simulation jsonb NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.career_review_assignments (
  attempt_id uuid NOT NULL REFERENCES public.career_case_attempts(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (attempt_id, reviewer_id)
);
CREATE TABLE public.career_case_reviews (
  attempt_id uuid PRIMARY KEY REFERENCES public.career_case_attempts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  levels jsonb NOT NULL,
  feedback jsonb NOT NULL,
  result jsonb NOT NULL,
  reviewed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.career_case_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_case_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_review_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_case_reviews ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.career_case_attempts, public.career_case_submissions, public.career_review_assignments, public.career_case_reviews FROM anon, authenticated;
GRANT SELECT ON public.career_case_attempts, public.career_case_submissions, public.career_review_assignments, public.career_case_reviews TO authenticated;
GRANT ALL ON public.career_case_attempts, public.career_case_submissions, public.career_review_assignments, public.career_case_reviews TO service_role;
CREATE POLICY career_assignment_read ON public.career_review_assignments FOR SELECT TO authenticated USING (reviewer_id = (SELECT auth.uid()));
CREATE POLICY career_case_read ON public.career_case_attempts FOR SELECT TO authenticated USING (
  user_id = (SELECT auth.uid()) OR EXISTS (SELECT 1 FROM public.career_review_assignments a WHERE a.attempt_id = career_case_attempts.id AND a.reviewer_id = (SELECT auth.uid()))
);
CREATE POLICY career_submission_read ON public.career_case_submissions FOR SELECT TO authenticated USING (
  user_id = (SELECT auth.uid()) OR EXISTS (SELECT 1 FROM public.career_review_assignments a WHERE a.attempt_id = career_case_submissions.attempt_id AND a.reviewer_id = (SELECT auth.uid()))
);
CREATE POLICY career_review_read ON public.career_case_reviews FOR SELECT TO authenticated USING (
  user_id = (SELECT auth.uid()) OR (reviewer_id = (SELECT auth.uid()) AND EXISTS (SELECT 1 FROM public.career_review_assignments a WHERE a.attempt_id = career_case_reviews.attempt_id AND a.reviewer_id = (SELECT auth.uid())))
);

CREATE FUNCTION public.start_career_case(p_user_id uuid, p_case_version text, p_simulation jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE saved public.career_case_attempts;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtextextended('career-case:' || p_user_id::text, 0));
  UPDATE public.career_case_attempts SET status = 'expired' WHERE user_id = p_user_id AND status = 'in_progress' AND deadline_at <= now();
  SELECT * INTO saved FROM public.career_case_attempts WHERE user_id = p_user_id AND status = 'in_progress';
  IF FOUND THEN RETURN to_jsonb(saved); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.career_case_invitations WHERE user_id = p_user_id AND expires_at > now()) THEN
    RAISE EXCEPTION 'An active pilot invitation is required' USING ERRCODE = '42501';
  END IF;
  IF EXISTS (SELECT 1 FROM public.career_case_attempts WHERE user_id = p_user_id AND status = 'submitted')
    OR EXISTS (SELECT 1 FROM public.career_case_reviews WHERE user_id = p_user_id AND result->>'decision' = 'pass') THEN
    RAISE EXCEPTION 'A submitted or passed case does not permit reassessment' USING ERRCODE = '23514';
  END IF;
  IF (SELECT count(*) FROM public.career_case_attempts WHERE user_id = p_user_id) >= 2 THEN
    RAISE EXCEPTION 'No unseen case attempts remain' USING ERRCODE = '23514';
  END IF;
  INSERT INTO public.career_case_attempts(user_id, case_version, simulation) VALUES (p_user_id, p_case_version, p_simulation) RETURNING * INTO saved;
  RETURN to_jsonb(saved);
END $$;

CREATE FUNCTION public.submit_career_case(p_user_id uuid, p_attempt_id uuid, p_revision integer, p_report jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE attempt public.career_case_attempts; saved public.career_case_submissions;
BEGIN
  SELECT * INTO attempt FROM public.career_case_attempts WHERE id = p_attempt_id AND user_id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Case unavailable' USING ERRCODE = '42501'; END IF;
  SELECT * INTO saved FROM public.career_case_submissions WHERE attempt_id = p_attempt_id;
  IF FOUND THEN
    IF saved.report IS DISTINCT FROM p_report THEN RAISE EXCEPTION 'Submission already frozen' USING ERRCODE = '23514'; END IF;
    RETURN to_jsonb(saved);
  END IF;
  IF attempt.status <> 'in_progress' OR attempt.deadline_at <= now() OR attempt.revision <> p_revision THEN
    RAISE EXCEPTION 'Case expired, submitted or changed; reload it' USING ERRCODE = '23514';
  END IF;
  IF NOT coalesce((attempt.simulation->>'verified')::boolean, false) THEN
    RAISE EXCEPTION 'Record a verification check before submission' USING ERRCODE = '23514';
  END IF;
  INSERT INTO public.career_case_submissions(attempt_id, user_id, report, simulation)
    VALUES (p_attempt_id, p_user_id, p_report, attempt.simulation) RETURNING * INTO saved;
  UPDATE public.career_case_attempts SET status = 'submitted' WHERE id = p_attempt_id;
  RETURN to_jsonb(saved);
END $$;

CREATE FUNCTION public.update_career_simulation(p_user_id uuid, p_attempt_id uuid, p_revision integer, p_simulation jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE saved public.career_case_attempts;
BEGIN
  UPDATE public.career_case_attempts SET simulation = p_simulation, revision = revision + 1
    WHERE id = p_attempt_id AND user_id = p_user_id AND revision = p_revision
      AND status = 'in_progress' AND deadline_at > now() RETURNING * INTO saved;
  IF NOT FOUND THEN RAISE EXCEPTION 'Case expired, submitted or changed; reload it' USING ERRCODE = '23514'; END IF;
  RETURN to_jsonb(saved);
END $$;

CREATE FUNCTION public.save_career_case_draft(p_user_id uuid, p_attempt_id uuid, p_revision integer, p_draft jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE saved public.career_case_attempts;
BEGIN
  UPDATE public.career_case_attempts SET draft = p_draft, revision = revision + 1
    WHERE id = p_attempt_id AND user_id = p_user_id AND revision = p_revision
      AND status = 'in_progress' AND deadline_at > now() RETURNING * INTO saved;
  IF NOT FOUND THEN RAISE EXCEPTION 'Case expired, submitted or changed; reload it' USING ERRCODE = '23514'; END IF;
  RETURN to_jsonb(saved);
END $$;

CREATE FUNCTION public.publish_career_review(p_reviewer_id uuid, p_attempt_id uuid, p_levels jsonb, p_feedback jsonb, p_result jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE attempt public.career_case_attempts; saved public.career_case_reviews;
BEGIN
  SELECT * INTO attempt FROM public.career_case_attempts WHERE id = p_attempt_id FOR UPDATE;
  IF NOT FOUND OR attempt.user_id = p_reviewer_id OR NOT EXISTS (
    SELECT 1 FROM public.career_review_assignments WHERE attempt_id = p_attempt_id AND reviewer_id = p_reviewer_id
  ) THEN RAISE EXCEPTION 'Review not assigned' USING ERRCODE = '42501'; END IF;
  SELECT * INTO saved FROM public.career_case_reviews WHERE attempt_id = p_attempt_id;
  IF FOUND THEN
    IF saved.reviewer_id = p_reviewer_id AND saved.levels = p_levels AND saved.feedback = p_feedback THEN RETURN to_jsonb(saved); END IF;
    RAISE EXCEPTION 'Review already published; support correction required' USING ERRCODE = '23514';
  END IF;
  IF attempt.status <> 'submitted' THEN RAISE EXCEPTION 'Case is not submitted' USING ERRCODE = '23514'; END IF;
  INSERT INTO public.career_case_reviews(attempt_id, user_id, reviewer_id, levels, feedback, result)
    VALUES (p_attempt_id, attempt.user_id, p_reviewer_id, p_levels, p_feedback, p_result) RETURNING * INTO saved;
  UPDATE public.career_case_attempts SET status = 'reviewed' WHERE id = p_attempt_id;
  RETURN to_jsonb(saved);
END $$;
REVOKE ALL ON FUNCTION public.start_career_case(uuid, text, jsonb), public.submit_career_case(uuid, uuid, integer, jsonb), public.publish_career_review(uuid, uuid, jsonb, jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.start_career_case(uuid, text, jsonb), public.submit_career_case(uuid, uuid, integer, jsonb), public.publish_career_review(uuid, uuid, jsonb, jsonb, jsonb) TO service_role;
REVOKE ALL ON FUNCTION public.update_career_simulation(uuid, uuid, integer, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_career_simulation(uuid, uuid, integer, jsonb) TO service_role;
REVOKE ALL ON FUNCTION public.save_career_case_draft(uuid, uuid, integer, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.save_career_case_draft(uuid, uuid, integer, jsonb) TO service_role;
NOTIFY pgrst, 'reload schema';
COMMIT;
