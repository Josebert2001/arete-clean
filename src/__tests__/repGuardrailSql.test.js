import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const migration = name => readFileSync(`supabase/migrations/${name}.sql`, 'utf8');
const terms = migration('20261102020000_rep_terms');
const removals = migration('20261102010000_lecturer_removal_requests');
const threshold = migration('20261102000000_offering_threshold_ownership');
const review = migration('20260925020000_rep_review_fixes');

function definition(sql, name) {
  const start = sql.indexOf(`FUNCTION ${name}(`);
  expect(start).toBeGreaterThan(-1);
  return sql.slice(start, sql.indexOf('$$;', start) + 3);
}

describe('rep migration guards', () => {
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
    expect(accept).toMatch(/old_inv\.offering_id = v_inv\.offering_id AND old_inv\.accepted_by = auth\.uid\(\)[\s\S]*?old_inv\.status = 'removed'/);
    expect(accept).toMatch(/rr\.offering_id = v_inv\.offering_id AND rr\.lecturer_id = auth\.uid\(\)[\s\S]*?rr\.status = 'approved'/);
    expect(accept).toMatch(/IF v_role IS NULL OR v_removed THEN[\s\S]*?status = 'awaiting_approval'/);
    expect(accept).toContain('v_inv.email IS DISTINCT FROM v_email');
    expect(accept).toContain('v_inv.expires_at < NOW()');
    expect(accept).toContain('inviter_still_valid(v_inv.invited_by, v_inv.offering_id)');
    expect(accept).toContain('is_student_of_cohort(auth.uid(), v_off.department, v_off.level)');
    const adminList = definition(removals, 'admin_list_invites');
    expect(adminList).toContain('is_reinstatement BOOLEAN');
    expect(adminList).toContain("old_inv.status = 'removed'");
    expect(adminList).toContain("rr.status = 'approved'");

    const approve = definition(review, 'admin_decide_invite');
    expect(approve).toMatch(/INSERT INTO user_roles[\s\S]*?ON CONFLICT \(user_id\) DO NOTHING/);
    expect(approve).toMatch(/INSERT INTO offering_lecturers[\s\S]*?ON CONFLICT \(offering_id, lecturer_id\) DO NOTHING/);
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
