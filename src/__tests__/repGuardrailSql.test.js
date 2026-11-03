import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const migration = name => readFileSync(`supabase/migrations/${name}.sql`, 'utf8');
const terms = migration('20261102020000_rep_terms');
const removals = migration('20261102010000_lecturer_removal_requests');
const threshold = migration('20261102000000_offering_threshold_ownership');
const courseCodes = migration('20261102040000_offering_course_codes');
const courseCodeJs = readFileSync('src/utils/courseCode.js', 'utf8');
const review = migration('20260925020000_rep_review_fixes');

function definition(sql, name) {
  const start = sql.indexOf(`FUNCTION ${name}(`);
  expect(start).toBeGreaterThan(-1);
  return sql.slice(start, sql.indexOf('$$;', start) + 3);
}

describe('rep migration guards', () => {
  it('uses the exact JavaScript whitespace class for SQL edge trimming and collapsing', () => {
    const whitespaceClass = courseCodeJs.match(/WHITESPACE_CLASS = String\.raw`([^`]+)`/)?.[1];
    expect(whitespaceClass).toBeDefined();
    const normalizer = definition(courseCodes, 'normalize_offering_course_code');
    expect(normalizer).toContain(`^${whitespaceClass}+|${whitespaceClass}+$`);
    expect(normalizer).toContain(`'${whitespaceClass}+', ' ', 'g'`);
    expect(normalizer).not.toMatch(/\bbtrim\(|\[\[:space:\]\]/);
  });

  it('normalizes and validates codes on both inserts and code updates, after the threshold trigger', () => {
    expect(courseCodes).toMatch(/CREATE TRIGGER normalize_offering_course_code\s+BEFORE INSERT OR UPDATE OF course_code ON course_offerings\s+FOR EACH ROW EXECUTE FUNCTION normalize_offering_course_code_trigger\(\)/);
    const trigger = definition(courseCodes, 'normalize_offering_course_code_trigger');
    expect(trigger).toContain('NEW.course_code := normalize_offering_course_code(NEW.course_code)');
    expect(trigger).toMatch(/NEW\.course_code !~ '\^\(\[A-Z\]\{3\}\|\(UUY\|UNIUYO\)-\[A-Z\]\{3\}\) \[0-9\]\{3\}\$'/);
    expect(trigger).toContain('RAISE EXCEPTION');
    expect(courseCodes).toContain('DROP TRIGGER IF EXISTS normalize_offering_course_code ON course_offerings');
    expect(courseCodes).toContain('other.group_label IS NOT DISTINCT FROM c.group_label');
    expect(courseCodes).toContain('RAISE NOTICE');
    expect(courseCodes).toContain("NOTIFY pgrst, 'reload schema';");
  });
  it('matches the offering session in every current-term rep authority join', () => {
    for (const name of ['is_rep_of_offering', 'inviter_still_valid', 'rep_cohort_lecturers', 'admin_decide_removal']) {
      const sql = definition(terms, name);
      expect(sql).toMatch(/co\.academic_session\s*=\s*r\.academic_session/);
      expect(sql).toMatch(/r\.academic_session\s*=\s*current_academic_session\(\)/);
    }
    expect(definition(terms, 'admin_set_course_rep')).toMatch(/co\.academic_session\s*=\s*current_academic_session\(\)/);
  });

  it('limits rep offering inserts to the current session while the earlier threshold trigger stays independent', () => {
    expect(terms).toMatch(/CREATE POLICY "reps create cohort offerings"[\s\S]*?WITH CHECK \([\s\S]*?is_rep_for\(department, level\)[\s\S]*?academic_session = current_academic_session\(\)[\s\S]*?created_by = auth\.uid\(\)/);
    expect(definition(threshold, 'enforce_offering_insert_threshold')).toContain('is_rep_for(NEW.department, NEW.level)');
    expect(definition(threshold, 'enforce_offering_insert_threshold')).not.toContain('current_academic_session()');
  });

  it('requires admin approval for a previously removed lecturer without losing acceptance guards', () => {
    const accept = definition(removals, 'accept_lecturer_invite');
    expect(accept).toMatch(/FROM offering_lecturer_removals logged\s+WHERE logged\.offering_id = v_inv\.offering_id AND logged\.lecturer_id = auth\.uid\(\)/);
    expect(accept).toMatch(/old_inv\.offering_id = v_inv\.offering_id AND old_inv\.accepted_by = auth\.uid\(\)[\s\S]*?old_inv\.status = 'removed'/);
    expect(accept).toMatch(/rr\.offering_id = v_inv\.offering_id AND rr\.lecturer_id = auth\.uid\(\)[\s\S]*?rr\.status = 'approved'/);
    expect(accept).toMatch(/IF v_role IS NULL OR v_removed THEN[\s\S]*?status = 'awaiting_approval'/);
    const priorAccept = definition(review, 'accept_lecturer_invite');
    for (const guard of [
      'v_inv.id IS NULL OR v_inv.email IS DISTINCT FROM v_email',
      "v_inv.status <> 'pending'",
      'v_inv.expires_at < NOW()',
      'EXISTS (SELECT 1 FROM course_reps WHERE user_id = auth.uid())',
      'NOT inviter_still_valid(v_inv.invited_by, v_inv.offering_id)',
      'is_student_of_cohort(auth.uid(), v_off.department, v_off.level)',
    ]) {
      expect(priorAccept).toContain(guard);
      expect(accept).toContain(guard);
    }
    const adminList = definition(removals, 'admin_list_invites');
    expect(adminList).toContain('is_reinstatement BOOLEAN');
    expect(adminList).toMatch(/FROM offering_lecturer_removals logged\s+WHERE logged\.offering_id = i\.offering_id AND logged\.lecturer_id = i\.accepted_by/);
    expect(adminList).toContain("old_inv.status = 'removed'");
    expect(adminList).toContain("rr.status = 'approved'");

    const approve = definition(review, 'admin_decide_invite');
    expect(approve).toMatch(/INSERT INTO user_roles[\s\S]*?ON CONFLICT \(user_id\) DO NOTHING/);
    expect(approve).toMatch(/INSERT INTO offering_lecturers[\s\S]*?ON CONFLICT \(offering_id, lecturer_id\) DO NOTHING/);
  });

  it('logs every deleted link without foreign keys or client writes', () => {
    const table = removals.match(/CREATE TABLE IF NOT EXISTS offering_lecturer_removals\s*\([\s\S]*?\);/)?.[0];
    expect(table).toBeDefined();
    expect(table).not.toMatch(/REFERENCES\b/i);
    expect(table).toMatch(/offering_id UUID NOT NULL/);
    expect(table).toMatch(/lecturer_id UUID NOT NULL/);
    expect(removals).toMatch(/CREATE INDEX IF NOT EXISTS offering_lecturer_removals_pair_idx\s+ON offering_lecturer_removals \(offering_id, lecturer_id\)/);
    expect(removals).toMatch(/CREATE POLICY "admins read lecturer removals" ON offering_lecturer_removals\s+FOR SELECT USING \(is_admin\(\)\)/);
    expect(removals).toContain('REVOKE ALL ON offering_lecturer_removals FROM anon, authenticated');
    expect(removals).toContain('GRANT SELECT ON offering_lecturer_removals TO authenticated');
    const logger = definition(removals, 'log_offering_lecturer_removal');
    expect(logger).toContain('SECURITY DEFINER');
    expect(logger).toContain('SET search_path = public, pg_temp');
    expect(logger).toMatch(/VALUES \(OLD\.offering_id, OLD\.lecturer_id, auth\.uid\(\), OLD\.created_by\)/);
    expect(logger).not.toMatch(/\bEXCEPTION\b/i);
    expect(logger).toMatch(/VALUES \(OLD\.offering_id, OLD\.lecturer_id, auth\.uid\(\), OLD\.created_by\);\s*RETURN OLD;\s*END;/);
    expect(removals).toMatch(/CREATE TRIGGER log_offering_lecturer_removal\s+AFTER DELETE ON offering_lecturers\s+FOR EACH ROW EXECUTE FUNCTION log_offering_lecturer_removal\(\)/);
    expect(removals).toMatch(/FROM lecturer_invites[\s\S]*?WHERE status = 'removed' AND accepted_by IS NOT NULL[\s\S]*?FROM lecturer_removal_requests[\s\S]*?WHERE status = 'approved'/);
    expect(removals).toMatch(/WHERE NOT EXISTS \(\s*SELECT 1 FROM offering_lecturer_removals logged/);
    expect(removals).toContain("NOTIFY pgrst, 'reload schema';");
  });

  it('backfills unlinked lecturers from class and attendance evidence only once', () => {
    const evidence = removals.match(/-- Direct admin assignments removed before this trigger[\s\S]*?\n\);/)?.[0];
    expect(evidence).toBeDefined();
    expect(evidence).toMatch(/cs\.created_by AS lecturer_id, cs\.opened_at AS evidence_at\s+FROM class_sessions cs\s+UNION ALL/);
    expect(evidence).toMatch(/ar\.marked_by AS lecturer_id, ar\.marked_at AS evidence_at\s+FROM attendance_records ar\s+JOIN class_sessions cs ON cs\.id = ar\.session_id/);
    expect(evidence).toMatch(/WHERE ar\.marked_by <> ar\.student_id/);
    expect(evidence).toMatch(/MAX\(activity\.evidence_at\) AS latest_at[\s\S]*?GROUP BY activity\.offering_id, activity\.lecturer_id/);
    expect(evidence).toMatch(/SELECT evidence\.offering_id, evidence\.lecturer_id, NULL::UUID,\s*evidence\.latest_at, NULL::UUID/);
    expect(evidence).toMatch(/NOT EXISTS \(\s*SELECT 1 FROM offering_lecturers current_link\s+WHERE current_link\.offering_id = evidence\.offering_id\s+AND current_link\.lecturer_id = evidence\.lecturer_id/);
    expect(evidence).toMatch(/NOT EXISTS \(\s*SELECT 1 FROM offering_lecturer_removals logged\s+WHERE logged\.offering_id = evidence\.offering_id\s+AND logged\.lecturer_id = evidence\.lecturer_id/);
  });

  it('keeps the first class recorded after its sessions are deleted', () => {
    expect(removals).toContain('ADD COLUMN IF NOT EXISTS first_class_at TIMESTAMPTZ');
    const trigger = definition(removals, 'record_offering_first_class');
    expect(trigger).toContain('SECURITY DEFINER');
    expect(trigger).toContain('SET search_path = public, pg_temp');
    expect(trigger).toContain('is_admin() OR is_lecturer_of(NEW.offering_id)');
    expect(trigger).toMatch(/UPDATE course_offerings SET first_class_at = NEW\.opened_at[\s\S]*?first_class_at IS NULL/);
    expect(removals).toMatch(/CREATE TRIGGER record_offering_first_class\s+AFTER INSERT ON class_sessions/);
    expect(removals).toMatch(/SET first_class_at = sessions\.first_opened_at[\s\S]*?MIN\(opened_at\)[\s\S]*?co\.first_class_at IS NULL/);
    const auditBackfill = removals.match(/UPDATE course_offerings co SET first_class_at = audit\.first_changed_at[\s\S]*?;/)?.[0];
    expect(auditBackfill).toMatch(/FROM \(SELECT offering_id, MIN\(changed_at\) AS first_changed_at\s+FROM attendance_audit GROUP BY offering_id\) audit/);
    expect(auditBackfill).toMatch(/WHERE co\.id = audit\.offering_id AND co\.first_class_at IS NULL;/);
    const helper = definition(removals, 'offering_has_class_sessions');
    expect(helper).toContain('first_class_at IS NOT NULL');
    expect(helper).toContain('EXISTS (SELECT 1 FROM class_sessions WHERE offering_id = p_offering_id)');
    expect(removals).toContain('NOT offering_has_class_sessions(offering_id)');
    expect(definition(removals, 'revoke_lecturer_invite')).toContain('offering_has_class_sessions(v_inv.offering_id)');
    expect(definition(removals, 'rep_request_lecturer_removal')).toContain('offering_has_class_sessions(p_offering_id)');
    expect(definition(terms, 'admin_decide_removal')).toContain('offering_has_class_sessions(v_request.offering_id)');
    expect(definition(terms, 'rep_cohort_lecturers')).toContain('offering_has_class_sessions(ol.offering_id)');
  });
});
