-- Course offering codes: apply manually after 20261102020000_rep_terms.sql.
-- Existing rows are audited before the backfill, then remaining rows are
-- listed for manual review. Only valid non-normal rows
-- without another offering in the same unique key are updated. Rows that would
-- collide, or have an invalid code, remain untouched for manual review so their
-- sessions, rosters, and registers are never silently merged or deleted.
-- Re-running this migration is safe; the final SELECT shows remaining rows.
-- Rep inserts must match the seeded class catalogue; their supplied title is
-- replaced by its canonical title. Admin and trusted inserts keep free text.
-- Deploy order: apply this migration, then run
-- supabase/seed/catalogue_courses.sql in the Supabase SQL editor. Until seeded,
-- the empty catalogue refuses every rep insert (admin inserts still work).

CREATE TABLE IF NOT EXISTS public.catalogue_courses (
  department TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('100L', '200L', '300L', '400L')),
  course_code TEXT NOT NULL,
  course_title TEXT NOT NULL,
  PRIMARY KEY (department, level, course_code)
);

ALTER TABLE public.catalogue_courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "authenticated read catalogue courses" ON public.catalogue_courses;
CREATE POLICY "authenticated read catalogue courses" ON public.catalogue_courses
  FOR SELECT TO authenticated USING (true);
REVOKE ALL ON TABLE public.catalogue_courses FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.catalogue_courses TO authenticated;

CREATE OR REPLACE FUNCTION normalize_offering_course_code(p_code TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT regexp_replace(
    regexp_replace(
      regexp_replace(upper(p_code), '^[ \t\n\v\f\r\u00A0\uFEFF\u2000-\u200B\u202F\u205F\u3000]+|[ \t\n\v\f\r\u00A0\uFEFF\u2000-\u200B\u202F\u205F\u3000]+$', '', 'g'),
      '[ \t\n\v\f\r\u00A0\uFEFF\u2000-\u200B\u202F\u205F\u3000]+', ' ', 'g'
    ),
    '([A-Z])([0-9]{3})$', '\1 \2'
  );
$$;

REVOKE ALL ON FUNCTION normalize_offering_course_code(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION normalize_offering_course_code(TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION normalize_offering_course_code_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE
  v_catalogue_title TEXT;
BEGIN
  NEW.course_code := normalize_offering_course_code(NEW.course_code);
  IF NEW.course_code IS NULL OR NEW.course_code !~ '^([A-Z]{3}|(UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$' THEN
    RAISE EXCEPTION 'Invalid course code. Use ABC 123, UUY-ABC 123, or UNIUYO-ABC 123.';
  END IF;
  IF TG_OP = 'INSERT' AND auth.uid() IS NOT NULL AND NOT is_admin() THEN
    SELECT course_title INTO v_catalogue_title
      FROM public.catalogue_courses
     WHERE department = NEW.department
       AND level = NEW.level
       AND course_code = NEW.course_code;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'That course is not in your class catalogue. Ask the admin to add it.';
    END IF;
    NEW.course_title := v_catalogue_title;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION normalize_offering_course_code_trigger() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION normalize_offering_course_code_trigger() TO authenticated;

DROP TRIGGER IF EXISTS normalize_offering_course_code ON course_offerings;
CREATE TRIGGER normalize_offering_course_code
  BEFORE INSERT OR UPDATE OF course_code ON course_offerings
  FOR EACH ROW EXECUTE FUNCTION normalize_offering_course_code_trigger();

-- PostgreSQL fires same-kind triggers alphabetically. On INSERT,
-- enforce_offering_insert_threshold runs first and checks rep ownership; this
-- trigger then normalizes the code and checks the rep catalogue title.
DO $$
DECLARE
  v_non_normal BIGINT;
  v_collisions BIGINT;
BEGIN
  WITH candidates AS (
    SELECT co.id, co.course_code, co.department, co.level, co.academic_session,
           co.group_label, normalize_offering_course_code(co.course_code) AS normal_code
    FROM course_offerings co
  ), audited AS (
    SELECT c.*,
           EXISTS (
             SELECT 1 FROM candidates other
             WHERE other.id <> c.id
               AND other.normal_code = c.normal_code
               AND other.department = c.department
               AND other.level = c.level
               AND other.academic_session = c.academic_session
               AND other.group_label IS NOT DISTINCT FROM c.group_label
           ) AS would_collide
    FROM candidates c
  )
  SELECT count(*) FILTER (WHERE course_code IS DISTINCT FROM normal_code),
         count(*) FILTER (WHERE course_code IS DISTINCT FROM normal_code AND would_collide)
    INTO v_non_normal, v_collisions
    FROM audited;
  RAISE NOTICE 'Course offerings outside normal form: %; rows that would collide: %', v_non_normal, v_collisions;
END;
$$;

-- Keep every member of a collision group unchanged, including its normal row.
WITH candidates AS (
  SELECT co.id, co.course_code, co.department, co.level, co.academic_session,
         co.group_label, normalize_offering_course_code(co.course_code) AS normal_code
  FROM course_offerings co
), safe AS (
  SELECT c.id, c.normal_code FROM candidates c
  WHERE c.course_code IS DISTINCT FROM c.normal_code
    AND c.normal_code ~ '^([A-Z]{3}|(UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$'
    AND NOT EXISTS (
      SELECT 1 FROM candidates other
      WHERE other.id <> c.id AND other.normal_code = c.normal_code
        AND other.department = c.department AND other.level = c.level
        AND other.academic_session = c.academic_session
        AND other.group_label IS NOT DISTINCT FROM c.group_label
    )
)
UPDATE course_offerings co SET course_code = safe.normal_code
FROM safe WHERE co.id = safe.id;

-- Inspect rows still needing manual review after the backfill: collisions
-- and invalid codes. The audit NOTICE above counts pre-backfill rows.
WITH candidates AS (
  SELECT co.id, co.course_code, co.department, co.level, co.academic_session,
         co.group_label, normalize_offering_course_code(co.course_code) AS normal_code
  FROM course_offerings co
)
SELECT c.id, c.course_code, c.normal_code, c.department, c.level,
       c.academic_session, c.group_label,
       c.normal_code !~ '^([A-Z]{3}|(UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$' AS invalid_format,
       EXISTS (
         SELECT 1 FROM candidates other
         WHERE other.id <> c.id AND other.normal_code = c.normal_code
           AND other.department = c.department AND other.level = c.level
           AND other.academic_session = c.academic_session
           AND other.group_label IS NOT DISTINCT FROM c.group_label
       ) AS would_collide
FROM candidates c
WHERE c.course_code IS DISTINCT FROM c.normal_code
   OR c.normal_code !~ '^([A-Z]{3}|(UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$'
ORDER BY c.department, c.level, c.academic_session, c.course_code;

NOTIFY pgrst, 'reload schema';
