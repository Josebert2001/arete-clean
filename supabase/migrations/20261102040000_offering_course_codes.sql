-- Course offering codes: apply manually after 20261102020000_rep_terms.sql.
-- Existing rows are audited before the backfill. Only valid non-normal rows
-- without another offering in the same unique key are updated. Rows that would
-- collide, or have an invalid code, remain untouched for manual review so their
-- sessions, rosters, and registers are never silently merged or deleted.
-- Re-running this migration is safe; the SELECT below shows remaining rows.

CREATE OR REPLACE FUNCTION normalize_offering_course_code(p_code TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT regexp_replace(
    btrim(regexp_replace(upper(p_code), '[[:space:]]+', ' ', 'g')),
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
BEGIN
  NEW.course_code := normalize_offering_course_code(NEW.course_code);
  IF NEW.course_code IS NULL OR NEW.course_code !~ '^([A-Z]{3}|(UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$' THEN
    RAISE EXCEPTION 'Invalid course code. Use ABC 123, UUY-ABC 123, or UNIUYO-ABC 123.';
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
-- trigger then changes only course_code. Neither trigger depends on the other.
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

-- Inspect any remaining legacy rows, including invalid codes and collisions.
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

NOTIFY pgrst, 'reload schema';
