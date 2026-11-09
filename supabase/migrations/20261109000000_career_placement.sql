-- Career guidance is separate from assessed competency and academic profiles.
-- Apply manually before enabling CAREER_PLACEMENT_ENABLED on the API deployment.
BEGIN;

CREATE TABLE public.career_placement_attempts (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  id uuid NOT NULL,
  version text NOT NULL,
  answers jsonb NOT NULL CHECK (jsonb_typeof(answers) = 'object'),
  question_snapshot jsonb NOT NULL CHECK (jsonb_typeof(question_snapshot) = 'array'),
  result jsonb NOT NULL CHECK (jsonb_typeof(result) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, id)
);
CREATE TABLE public.career_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_id uuid NOT NULL,
  chosen_path text CHECK (chosen_path IN ('blue', 'red', 'grc', 'appsec')),
  result jsonb NOT NULL CHECK (jsonb_typeof(result) = 'object'),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id, attempt_id) REFERENCES public.career_placement_attempts(user_id, id) ON DELETE CASCADE
);
CREATE TABLE public.career_practice_notes (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path text NOT NULL CHECK (path IN ('blue', 'red', 'grc', 'appsec')),
  notes text NOT NULL CHECK (char_length(notes) <= 6000),
  reflected boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, path)
);

ALTER TABLE public.career_placement_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_practice_notes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.career_placement_attempts, public.career_profiles, public.career_practice_notes FROM anon, authenticated;
GRANT SELECT ON public.career_placement_attempts, public.career_profiles, public.career_practice_notes TO authenticated;
GRANT ALL ON public.career_placement_attempts, public.career_profiles, public.career_practice_notes TO service_role;
CREATE POLICY career_attempt_read_own ON public.career_placement_attempts FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY career_profile_read_own ON public.career_profiles FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY career_notes_read_own ON public.career_practice_notes FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);

-- Only the trusted API may supply a computed result. Both writes commit together.
CREATE FUNCTION public.record_career_placement(p_user_id uuid, p_attempt_id uuid, p_version text, p_answers jsonb, p_result jsonb, p_questions jsonb DEFAULT '[]'::jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE
  inserted_count integer;
  old_attempt public.career_placement_attempts;
  saved_profile public.career_profiles;
BEGIN
  -- Serialize retries and distinct simultaneous submissions for this owner.
  PERFORM pg_advisory_xact_lock(hashtextextended('career:' || p_user_id::text, 0));
  INSERT INTO public.career_placement_attempts(user_id, id, version, answers, result, question_snapshot)
    VALUES (p_user_id, p_attempt_id, p_version, p_answers, p_result, p_questions)
    ON CONFLICT (user_id, id) DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  IF inserted_count = 0 THEN
    SELECT * INTO old_attempt FROM public.career_placement_attempts WHERE user_id = p_user_id AND id = p_attempt_id;
    IF old_attempt.version IS DISTINCT FROM p_version OR old_attempt.answers IS DISTINCT FROM p_answers THEN
      RAISE EXCEPTION 'Attempt identifier already used' USING ERRCODE = '23514';
    END IF;
    -- A delayed retry must not undo a later attempt or a manual path choice.
  ELSE
    INSERT INTO public.career_profiles(user_id, attempt_id, chosen_path, result)
      VALUES (p_user_id, p_attempt_id, p_result->>'recommendedPath', p_result)
      ON CONFLICT (user_id) DO UPDATE SET attempt_id = EXCLUDED.attempt_id,
        chosen_path = EXCLUDED.chosen_path, result = EXCLUDED.result, updated_at = now();
  END IF;
  SELECT * INTO saved_profile FROM public.career_profiles WHERE user_id = p_user_id;
  RETURN to_jsonb(saved_profile);
END;
$$;
REVOKE ALL ON FUNCTION public.record_career_placement(uuid, uuid, text, jsonb, jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_career_placement(uuid, uuid, text, jsonb, jsonb, jsonb) TO service_role;

NOTIFY pgrst, 'reload schema';
COMMIT;
