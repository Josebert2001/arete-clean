-- Disposable migrated database only. Uses the Supabase auth schema and roles.
\set ON_ERROR_STOP on
BEGIN;
INSERT INTO auth.users(id) VALUES ('00000000-0000-4000-8000-000000000011'), ('00000000-0000-4000-8000-000000000012'), ('00000000-0000-4000-8000-000000000013');
CREATE TEMP TABLE case_test_ids(label text PRIMARY KEY, id uuid);
GRANT SELECT, INSERT ON case_test_ids TO service_role, authenticated;
SET LOCAL ROLE service_role;
DO $$ BEGIN
  BEGIN
    PERFORM public.start_career_case('00000000-0000-4000-8000-000000000012', 'blue-case-b-v1', '{}');
    RAISE EXCEPTION 'Case started without invitation';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
INSERT INTO public.career_case_invitations(user_id) VALUES ('00000000-0000-4000-8000-000000000011'), ('00000000-0000-4000-8000-000000000012');
INSERT INTO case_test_ids SELECT 'a', (public.start_career_case('00000000-0000-4000-8000-000000000011', 'blue-case-a-v1', '{"sessions":{"S-17":true},"rules":{"R-17":true},"verified":false,"log":[]}')->>'id')::uuid;
INSERT INTO case_test_ids SELECT 'b', (public.start_career_case('00000000-0000-4000-8000-000000000012', 'blue-case-b-v1', '{"verified":false,"log":[]}')->>'id')::uuid;

SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '00000000-0000-4000-8000-000000000011';
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_case_attempts) = 1, 'Owner read isolation failed';
  BEGIN
    UPDATE public.career_case_attempts SET status = 'reviewed';
    RAISE EXCEPTION 'Learner changed assessment state';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    PERFORM public.publish_career_review('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), '{}', '{}', '{"decision":"pass"}');
    RAISE EXCEPTION 'Learner called privileged review function';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
SET LOCAL request.jwt.claim.sub = '00000000-0000-4000-8000-000000000013';
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_case_attempts) = 0, 'Unassigned reviewer read another case';
END $$;

SET LOCAL ROLE service_role;
DO $$ BEGIN
  BEGIN
    PERFORM public.submit_career_case('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), 0, '{"summary":"report"}');
    RAISE EXCEPTION 'Unverified simulation was accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
SELECT public.update_career_simulation('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), 0, '{"sessions":{"S-17":false},"rules":{"R-17":false},"verified":true,"log":[]}');
DO $$ BEGIN
  BEGIN
    PERFORM public.save_career_case_draft('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), 0, '{}');
    RAISE EXCEPTION 'Stale revision overwrote state';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
SELECT public.submit_career_case('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), 1, '{"summary":"report"}');
SELECT public.submit_career_case('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), 1, '{"summary":"report"}');
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_case_submissions) = 1, 'Retry duplicated submission';
  BEGIN
    PERFORM public.submit_career_case('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), 1, '{"summary":"replacement"}');
    RAISE EXCEPTION 'Frozen report was replaced';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
INSERT INTO public.career_review_assignments(attempt_id, reviewer_id) SELECT id, '00000000-0000-4000-8000-000000000013' FROM case_test_ids WHERE label = 'a';
INSERT INTO public.career_review_assignments(attempt_id, reviewer_id) SELECT id, '00000000-0000-4000-8000-000000000011' FROM case_test_ids WHERE label = 'a';
DO $$ BEGIN
  BEGIN
    PERFORM public.publish_career_review('00000000-0000-4000-8000-000000000011', (SELECT id FROM case_test_ids WHERE label = 'a'), '{}', '{}', '{"decision":"pass"}');
    RAISE EXCEPTION 'Self-review was accepted';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '00000000-0000-4000-8000-000000000013';
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_case_attempts) = 1, 'Assigned reviewer case scope wrong';
  ASSERT (SELECT count(*) FROM public.career_case_submissions) = 1, 'Assigned review submission unavailable';
END $$;
SET LOCAL ROLE service_role;
SELECT public.publish_career_review('00000000-0000-4000-8000-000000000013', (SELECT id FROM case_test_ids WHERE label = 'a'), '{"scope":3}', '{"scope":"Reviewed evidence"}', '{"score":75,"decision":"pass"}');
DELETE FROM public.career_review_assignments WHERE reviewer_id = '00000000-0000-4000-8000-000000000013';
SET LOCAL ROLE authenticated;
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_case_submissions) = 0, 'Removed reviewer retained submission access';
  ASSERT (SELECT count(*) FROM public.career_case_reviews) = 0, 'Removed reviewer retained review access';
END $$;
RESET ROLE;
DELETE FROM auth.users WHERE id = '00000000-0000-4000-8000-000000000011';
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_case_attempts) = 1, 'Case cascade affected another owner';
  ASSERT NOT EXISTS (SELECT 1 FROM public.career_case_submissions), 'Submission not deleted';
  ASSERT NOT EXISTS (SELECT 1 FROM public.career_case_reviews), 'Review not deleted';
END $$;
ROLLBACK;
\echo 'Investigation ownership, review assignment, immutable submission, revision and cascade checks passed.'
