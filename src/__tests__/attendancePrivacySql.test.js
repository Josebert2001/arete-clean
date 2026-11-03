import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const sql = readFileSync('supabase/migrations/20261102050000_attendance_privacy.sql', 'utf8');
const checkIn = sql.slice(sql.indexOf('CREATE OR REPLACE FUNCTION check_in('));
const backfill = sql.slice(sql.indexOf('DO $$'), sql.indexOf('-- Owner choice only:'));
const privacy = readFileSync('src/pages/Privacy.jsx', 'utf8');

describe('attendance privacy migration', () => {
  it('stores coordinates only when the same geofence switch used for blocking is on', () => {
    expect(checkIn).toMatch(/IF v_session\.enforce_geofence THEN[\s\S]*?IF p_lat IS NULL OR p_lng IS NULL THEN/);
    const attendanceInsert = checkIn.match(/INSERT INTO attendance_records \([\s\S]*?ON CONFLICT \(session_id, student_id\) DO NOTHING;/)?.[0];
    expect(attendanceInsert).toBeDefined();
    expect(attendanceInsert).toMatch(/device_hash, checkin_lat, checkin_lng, location_flagged,[\s\S]*?v_device_hash,\s*CASE WHEN v_session\.enforce_geofence THEN p_lat ELSE NULL END,\s*CASE WHEN v_session\.enforce_geofence THEN p_lng ELSE NULL END,\s*v_flag_loc,/);
    expect(sql).toMatch(/-- Owner choice only: removing historical coordinates is irreversible\./);
    expect(sql).toMatch(/-- UPDATE attendance_records ar[\s\S]*?--\s+WHERE ar\.session_id = cs\.id AND NOT cs\.enforce_geofence;/);
    expect(sql).toMatch(/-- UPDATE attendance_audit au[\s\S]*?old_row - 'checkin_lat' - 'checkin_lng'[\s\S]*?new_row - 'checkin_lat' - 'checkin_lng'[\s\S]*?--\s+WHERE au\.session_id = cs\.id AND NOT cs\.enforce_geofence;/);
  });

  it('hashes the incoming device ID before every write and comparison', () => {
    expect(checkIn).toMatch(/SET search_path = public, extensions, pg_temp/);
    expect(checkIn).toMatch(/v_device_hash := encode\(digest\(p_device_hash, 'sha256'\), 'hex'\);/);
    expect(checkIn).toMatch(/INSERT INTO student_devices \(student_id, device_hash\)\s*VALUES \(v_uid, v_device_hash\)/);
    expect(checkIn).toMatch(/IF v_bound <> v_device_hash THEN/);
    expect(checkIn).toMatch(/INSERT INTO session_devices \(session_id, device_hash, student_id\)\s*VALUES \(p_session_id, v_device_hash, v_uid\)/);
    expect(checkIn).toMatch(/device_hash, checkin_lat, checkin_lng, location_flagged,[\s\S]*?\) VALUES \([\s\S]*?v_device_hash,/);
    expect(checkIn.match(/p_device_hash/g)).toHaveLength(4); // argument, two validation uses, digest input
  });

  it('uses a private marker to hash every existing device ID exactly once', () => {
    expect(sql).toMatch(/CREATE TABLE IF NOT EXISTS privacy_migrations \(\s*name TEXT PRIMARY KEY,\s*applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW\(\)/);
    expect(sql).toMatch(/ALTER TABLE privacy_migrations ENABLE ROW LEVEL SECURITY;/);
    expect(sql).toMatch(/REVOKE ALL ON TABLE privacy_migrations FROM PUBLIC, anon, authenticated;/);
    expect(backfill).toMatch(/IF NOT EXISTS \(SELECT 1 FROM privacy_migrations WHERE name = 'device_hash_sha256'\) THEN/);
    expect(backfill).toMatch(/INSERT INTO privacy_migrations \(name\) VALUES \('device_hash_sha256'\);[\s\S]*?END IF;/);
    expect(sql).toMatch(/SET LOCAL search_path = public, extensions, pg_temp;\s*DO \$\$/);
    for (const table of ['student_devices', 'attendance_records']) {
      expect(backfill).toMatch(new RegExp(`UPDATE ${table}\\s+SET device_hash = encode\\(digest\\(device_hash, 'sha256'\\), 'hex'\\)\\s+WHERE device_hash IS NOT NULL;`));
    }
    // session_devices has device_hash in its PRIMARY KEY, which an in-place UPDATE
    // checks row by row; it is rewritten (copy hashed, empty, re-insert) instead.
    expect(backfill).not.toMatch(/UPDATE session_devices/);
    expect(backfill).toMatch(/CREATE TEMP TABLE session_devices_hashed ON COMMIT DROP AS[\s\S]*?SELECT DISTINCT ON \(session_id, hashed\)[\s\S]*?encode\(digest\(device_hash, 'sha256'\), 'hex'\) AS hashed/);
    expect(backfill).toMatch(/DELETE FROM session_devices;\s*INSERT INTO session_devices \(session_id, device_hash, student_id, created_at\)\s*SELECT session_id, device_hash, student_id, created_at FROM session_devices_hashed;/);
    expect(backfill).not.toMatch(/device_hash\s*!~/);
    expect(sql).not.toMatch(/(?:extensions|public)\.digest\(/);
  });

  it('keeps the audit trigger off during attendance backfill and hashes old audit snapshots', () => {
    expect(backfill).toMatch(/DISABLE TRIGGER log_attendance_change'[\s\S]*?UPDATE attendance_records[\s\S]*?ENABLE TRIGGER log_attendance_change'/);
    expect(backfill).toMatch(/EXCEPTION WHEN OTHERS THEN\s*EXECUTE 'ALTER TABLE attendance_records ENABLE TRIGGER log_attendance_change';\s*RAISE;/);
    expect(backfill).toMatch(/UPDATE attendance_audit[\s\S]*?old_row = CASE[\s\S]*?jsonb_set\(old_row, '\{device_hash\}', to_jsonb\(encode\(digest\(old_row ->> 'device_hash', 'sha256'\), 'hex'\)\)\)/);
    expect(backfill).toMatch(/new_row = CASE[\s\S]*?jsonb_set\(new_row, '\{device_hash\}', to_jsonb\(encode\(digest\(new_row ->> 'device_hash', 'sha256'\), 'hex'\)\)\)/);
    expect(backfill).toMatch(/old_row \? 'device_hash' AND old_row -> 'device_hash' <> 'null'::jsonb/);
    expect(backfill).toMatch(/new_row \? 'device_hash' AND new_row -> 'device_hash' <> 'null'::jsonb/);
  });

  it('commits the backfill and function replacement atomically', () => {
    expect(sql).toMatch(/^--[^]*?\bBEGIN;[\s\S]*?CREATE TABLE IF NOT EXISTS privacy_migrations/);
    expect(sql).toMatch(/GRANT EXECUTE ON FUNCTION check_in\([^;]+ TO authenticated;\s*COMMIT;\s*NOTIFY pgrst, 'reload schema';\s*$/);
  });

  it('describes the new storage behavior in the privacy policy', () => {
    expect(privacy).toContain('Without an enforced boundary, successful check-ins do not store your coordinates.');
    expect(privacy).toContain('stores only a one-way SHA-256 hash of that identifier in device bindings, successful check-ins, and attendance audit snapshots');
    expect(privacy).toContain('Last updated: 2 November 2026');
  });
});
