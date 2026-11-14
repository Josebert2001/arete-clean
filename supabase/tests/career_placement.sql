-- Run against a disposable migrated database, never production.
-- Requires Supabase's auth.users/auth.uid and anon/authenticated/service_role roles.
\set ON_ERROR_STOP on
BEGIN;
INSERT INTO auth.users(id) VALUES
  ('00000000-0000-4000-8000-000000000001'),
  ('00000000-0000-4000-8000-000000000002');

SET LOCAL ROLE service_role;
SELECT public.record_career_placement(
  '00000000-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'test-v1',
  '{"I1":4}', '{"recommendedPath":"blue"}');
SELECT public.record_career_placement(
  '00000000-0000-4000-8000-000000000002', '11111111-1111-4111-8111-111111111111', 'test-v1',
  '{"I1":0}', '{"recommendedPath":"red"}');
INSERT INTO public.career_practice_notes(user_id, path, notes) VALUES
  ('00000000-0000-4000-8000-000000000001', 'blue', 'Owner A reflection'),
  ('00000000-0000-4000-8000-000000000002', 'red', 'Owner B reflection');

SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.career_profiles) = 1, 'Profile isolation failed';
  ASSERT (SELECT chosen_path FROM public.career_profiles) = 'blue', 'Read another owner profile';
  ASSERT (SELECT count(*) FROM public.career_placement_attempts) = 1, 'Attempt isolation failed';
  ASSERT (SELECT notes FROM public.career_practice_notes) = 'Owner A reflection', 'Practice isolation failed';
  ASSERT NOT EXISTS (SELECT 1 FROM public.career_profiles WHERE user_id = '00000000-0000-4000-8000-000000000002'), 'Owner B visible';
  BEGIN
    UPDATE public.career_profiles SET chosen_path = 'red';
    RAISE EXCEPTION 'Authenticated caller forged a profile';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    DELETE FROM public.career_placement_attempts;
    RAISE EXCEPTION 'Authenticated caller deleted history';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    PERFORM public.record_career_placement('00000000-0000-4000-8000-000000000001', gen_random_uuid(), 'forged', '{}', '{"recommendedPath":"red"}');
    RAISE EXCEPTION 'Authenticated caller executed server-only scoring writer';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;

SET LOCAL ROLE anon;
DO $$ BEGIN
  BEGIN
    PERFORM * FROM public.career_profiles;
    RAISE EXCEPTION 'Anonymous caller read profiles';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;

SET LOCAL ROLE service_role;
UPDATE public.career_profiles SET chosen_path = 'grc' WHERE user_id = '00000000-0000-4000-8000-000000000001';
SELECT public.record_career_placement(
  '00000000-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'test-v1',
  '{"I1":4}', '{"recommendedPath":"blue"}');
DO $$ BEGIN
  ASSERT (SELECT chosen_path FROM public.career_profiles WHERE user_id = '00000000-0000-4000-8000-000000000001') = 'grc', 'Retry undid chosen path';
  ASSERT (SELECT count(*) FROM public.career_placement_attempts) = 2, 'Retry duplicated an attempt';
  BEGIN
    PERFORM public.record_career_placement('00000000-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'test-v1', '{"I1":1}', '{"recommendedPath":"red"}');
    RAISE EXCEPTION 'Idempotency key accepted different answers';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;

SELECT public.record_career_placement(
  '00000000-0000-4000-8000-000000000001', '22222222-2222-4222-8222-222222222222', 'test-v2',
  '{"I1":1}', '{"recommendedPath":"red"}');
SELECT public.record_career_placement(
  '00000000-0000-4000-8000-000000000001', '11111111-1111-4111-8111-111111111111', 'test-v1',
  '{"I1":4}', '{"recommendedPath":"blue"}');
DO $$ BEGIN
  ASSERT (SELECT attempt_id FROM public.career_profiles WHERE user_id = '00000000-0000-4000-8000-000000000001') = '22222222-2222-4222-8222-222222222222', 'Delayed retry replaced newer attempt';
  ASSERT (SELECT count(*) FROM public.career_placement_attempts WHERE user_id = '00000000-0000-4000-8000-000000000001') = 2, 'Retake lost prior history';
END $$;

RESET ROLE;
DELETE FROM auth.users WHERE id = '00000000-0000-4000-8000-000000000001';
DO $$ BEGIN
  ASSERT NOT EXISTS (SELECT 1 FROM public.career_profiles WHERE user_id = '00000000-0000-4000-8000-000000000001'), 'Profile did not cascade';
  ASSERT NOT EXISTS (SELECT 1 FROM public.career_placement_attempts WHERE user_id = '00000000-0000-4000-8000-000000000001'), 'Attempts did not cascade';
  ASSERT NOT EXISTS (SELECT 1 FROM public.career_practice_notes WHERE user_id = '00000000-0000-4000-8000-000000000001'), 'Notes did not cascade';
  ASSERT (SELECT count(*) FROM public.career_profiles) = 1, 'Deletion affected another owner';
END $$;
ROLLBACK;
\echo 'Career isolation, privilege, retry, history and deletion checks passed.'
