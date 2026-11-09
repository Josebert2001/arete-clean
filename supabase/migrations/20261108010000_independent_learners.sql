-- Apply before deploying independent-learner onboarding. Existing university
-- profiles retain their mode and academic metadata. No records are deleted.
BEGIN;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS learning_mode TEXT NOT NULL DEFAULT 'university';
ALTER TABLE public.profiles ALTER COLUMN level DROP NOT NULL;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_learning_mode_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_learning_mode_check
  CHECK (learning_mode IN ('university', 'independent'));
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_learning_context_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_learning_context_check CHECK (
  (learning_mode = 'university' AND level IS NOT NULL)
  OR (learning_mode = 'independent' AND level IS NULL AND reg_number IS NULL
      AND department = 'general' AND department_other IS NULL)
);
NOTIFY pgrst, 'reload schema';
COMMIT;
