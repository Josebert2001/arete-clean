-- Student uploads can be wrong or harmful. Give students a private reporting
-- path and admins a review/removal path. Run manually; safe to re-run.
-- The owner-executed course_materials_visible view bypasses base-table RLS,
-- so the hidden filter belongs in the view itself.

ALTER TABLE public.course_materials
  ADD COLUMN IF NOT EXISTS moderation_status text NOT NULL DEFAULT 'visible',
  ADD COLUMN IF NOT EXISTS moderated_by uuid,
  ADD COLUMN IF NOT EXISTS moderated_at timestamptz,
  ADD COLUMN IF NOT EXISTS moderation_note text;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'course_materials_moderation_status_check') THEN
    ALTER TABLE public.course_materials ADD CONSTRAINT course_materials_moderation_status_check
      CHECK (moderation_status IN ('visible', 'hidden'));
  END IF;
END $$;

CREATE OR REPLACE VIEW public.course_materials_visible AS
  SELECT id, course_code, course_slug, department, display_name,
         file_path, file_size, file_type, description, extracted_text, uploaded_at,
         (uploaded_by = auth.uid()) AS uploaded_by_me
  FROM public.course_materials
  WHERE moderation_status = 'visible';
REVOKE ALL ON public.course_materials_visible FROM anon, PUBLIC;
GRANT SELECT ON public.course_materials_visible TO authenticated;

CREATE TABLE IF NOT EXISTS public.material_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid NOT NULL REFERENCES public.course_materials(id) ON DELETE CASCADE,
  reporter uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  reason text NOT NULL CHECK (reason IN ('wrong', 'offensive', 'copyright', 'personal_info', 'spam', 'other')),
  details text CHECK (char_length(details) <= 500),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution text,
  UNIQUE (material_id, reporter)
);
ALTER TABLE public.material_reports ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.material_reports TO authenticated;
REVOKE DELETE ON public.material_reports FROM authenticated;
DROP POLICY IF EXISTS "reporter reads own reports" ON public.material_reports;
CREATE POLICY "reporter reads own reports" ON public.material_reports
  FOR SELECT TO authenticated USING (reporter = auth.uid());
DROP POLICY IF EXISTS "reporter inserts own report" ON public.material_reports;
CREATE POLICY "reporter inserts own report" ON public.material_reports
  FOR INSERT TO authenticated WITH CHECK (reporter = auth.uid());
DROP POLICY IF EXISTS "admin reads material reports" ON public.material_reports;
CREATE POLICY "admin reads material reports" ON public.material_reports
  FOR SELECT TO authenticated USING (public.is_admin());
DROP POLICY IF EXISTS "admin updates material reports" ON public.material_reports;
CREATE POLICY "admin updates material reports" ON public.material_reports
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.report_material(p_material_id uuid, p_reason text, p_details text DEFAULT NULL)
RETURNS TABLE (ok boolean, message text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_count integer;
BEGIN
  IF auth.uid() IS NULL THEN RETURN QUERY SELECT false, 'Sign in to report a file.'; RETURN; END IF;
  IF p_reason NOT IN ('wrong', 'offensive', 'copyright', 'personal_info', 'spam', 'other')
     OR char_length(coalesce(p_details, '')) > 500 THEN
    RETURN QUERY SELECT false, 'Choose a valid reason and keep details under 500 characters.'; RETURN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM course_materials WHERE id = p_material_id) THEN
    RETURN QUERY SELECT false, 'This file is no longer available.'; RETURN;
  END IF;
  -- Serialise simultaneous reports so the third distinct reporter always
  -- observes the first two before deciding whether to hide the file.
  PERFORM 1 FROM course_materials WHERE id = p_material_id FOR UPDATE;
  INSERT INTO material_reports (material_id, reporter, reason, details)
    VALUES (p_material_id, auth.uid(), p_reason, nullif(trim(p_details), ''))
    ON CONFLICT (material_id, reporter) DO NOTHING;
  SELECT count(DISTINCT reporter) INTO v_count FROM material_reports
    WHERE material_id = p_material_id AND resolved_at IS NULL;
  IF v_count >= 3 THEN
    UPDATE course_materials SET moderation_status = 'hidden'
      WHERE id = p_material_id AND moderation_status = 'visible';
    RETURN QUERY SELECT true, 'Report received. This file is hidden pending admin review.';
  ELSE
    RETURN QUERY SELECT true, 'Report received. An admin can review this file.';
  END IF;
END $$;
REVOKE ALL ON FUNCTION public.report_material(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.report_material(uuid, text, text) TO authenticated;

-- Direct table INSERT is allowed by RLS too. Apply the threshold there as
-- well, so bypassing the RPC cannot leave a third report visible.
CREATE OR REPLACE FUNCTION public.hide_material_after_report()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp AS $$
BEGIN
  PERFORM 1 FROM course_materials WHERE id = NEW.material_id FOR UPDATE;
  IF (SELECT count(DISTINCT reporter) FROM material_reports
      WHERE material_id = NEW.material_id AND resolved_at IS NULL) >= 3 THEN
    UPDATE course_materials SET moderation_status = 'hidden'
      WHERE id = NEW.material_id AND moderation_status = 'visible';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS hide_material_after_report ON public.material_reports;
CREATE TRIGGER hide_material_after_report AFTER INSERT ON public.material_reports
  FOR EACH ROW EXECUTE FUNCTION public.hide_material_after_report();

CREATE OR REPLACE FUNCTION public.material_reporting_available() RETURNS boolean
LANGUAGE sql STABLE SET search_path = public, pg_temp AS $$ SELECT true; $$;
REVOKE ALL ON FUNCTION public.material_reporting_available() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.material_reporting_available() TO authenticated;

CREATE OR REPLACE FUNCTION public.moderate_material(p_material_id uuid, p_action text, p_note text DEFAULT NULL)
RETURNS TABLE (ok boolean, message text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
BEGIN
  IF NOT public.is_admin() THEN RETURN QUERY SELECT false, 'Admins only.'; RETURN; END IF;
  IF p_action NOT IN ('hide', 'restore', 'dismiss') THEN
    RETURN QUERY SELECT false, 'Unknown moderation action.'; RETURN;
  END IF;
  UPDATE course_materials SET moderation_status = CASE WHEN p_action = 'hide' THEN 'hidden' ELSE 'visible' END,
    moderated_by = auth.uid(), moderated_at = now(), moderation_note = left(p_note, 500)
    WHERE id = p_material_id;
  IF NOT FOUND THEN RETURN QUERY SELECT false, 'File no longer exists.'; RETURN; END IF;
  UPDATE material_reports SET resolved_at = now(), resolved_by = auth.uid(), resolution = p_action
    WHERE material_id = p_material_id AND resolved_at IS NULL;
  RETURN QUERY SELECT true, 'Material review saved.';
END $$;
REVOKE ALL ON FUNCTION public.moderate_material(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.moderate_material(uuid, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_material_reports()
RETURNS TABLE (material_id uuid, course_code text, display_name text, file_path text,
  moderation_status text, report_count bigint, reasons text)
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp AS $$
  SELECT m.id, m.course_code, m.display_name, m.file_path, m.moderation_status,
         count(r.id), string_agg(DISTINCT r.reason, ', ' ORDER BY r.reason)
  FROM course_materials m JOIN material_reports r ON r.material_id = m.id AND r.resolved_at IS NULL
  WHERE public.is_admin()
  GROUP BY m.id;
$$;
REVOKE ALL ON FUNCTION public.admin_material_reports() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_material_reports() TO authenticated;

DROP POLICY IF EXISTS "admins delete materials" ON public.course_materials;
CREATE POLICY "admins delete materials" ON public.course_materials
  FOR DELETE TO authenticated USING (public.is_admin());
DROP POLICY IF EXISTS "admins delete course material objects" ON storage.objects;
CREATE POLICY "admins delete course material objects" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'course-materials' AND public.is_admin());
-- Supabase Storage's remove API also SELECTs the object before deleting it.
DROP POLICY IF EXISTS "admins read course material objects" ON storage.objects;
CREATE POLICY "admins read course material objects" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'course-materials' AND public.is_admin());

NOTIFY pgrst, 'reload schema';
