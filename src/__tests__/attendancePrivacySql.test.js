import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const sql = readFileSync('supabase/migrations/20261102050000_attendance_privacy.sql', 'utf8');
const checkIn = sql.slice(sql.indexOf('CREATE OR REPLACE FUNCTION check_in('));
const privacy = readFileSync('src/pages/Privacy.jsx', 'utf8');

describe('attendance privacy migration', () => {
  it('stores coordinates only when the same geofence switch used for blocking is on', () => {
    expect(checkIn).toMatch(/IF v_session\.enforce_geofence THEN[\s\S]*?IF p_lat IS NULL OR p_lng IS NULL THEN/);
    const attendanceInsert = checkIn.match(/INSERT INTO attendance_records \([\s\S]*?ON CONFLICT \(session_id, student_id\) DO NOTHING;/)?.[0];
    expect(attendanceInsert).toBeDefined();
    expect(attendanceInsert).toMatch(/device_hash, checkin_lat, checkin_lng, location_flagged,[\s\S]*?v_device_hash,\s*CASE WHEN v_session\.enforce_geofence THEN p_lat ELSE NULL END,\s*CASE WHEN v_session\.enforce_geofence THEN p_lng ELSE NULL END,\s*v_flag_loc,/);
    expect(sql).toMatch(/-- Owner choice only: removing historical coordinates is irreversible\./);
    expect(sql).toMatch(/-- UPDATE attendance_records ar[\s\S]*?--\s+WHERE ar\.session_id = cs\.id AND NOT cs\.enforce_geofence;/);
  });

  it('hashes the incoming device ID before every write and comparison', () => {
    expect(checkIn).toMatch(/v_device_hash := encode\(extensions\.digest\(p_device_hash, 'sha256'\), 'hex'\);/);
    expect(checkIn).toMatch(/INSERT INTO student_devices \(student_id, device_hash\)\s*VALUES \(v_uid, v_device_hash\)/);
    expect(checkIn).toMatch(/IF v_bound <> v_device_hash THEN/);
    expect(checkIn).toMatch(/INSERT INTO session_devices \(session_id, device_hash, student_id\)\s*VALUES \(p_session_id, v_device_hash, v_uid\)/);
    expect(checkIn).toMatch(/device_hash, checkin_lat, checkin_lng, location_flagged,[\s\S]*?\) VALUES \([\s\S]*?v_device_hash,/);
    expect(checkIn.match(/p_device_hash/g)).toHaveLength(4); // argument, two validation uses, digest input
  });

  it('backfills each device table once without double hashing existing digests', () => {
    for (const table of ['student_devices', 'session_devices', 'attendance_records']) {
      expect(sql).toMatch(new RegExp(`UPDATE ${table}\\s+SET device_hash = encode\\(extensions\\.digest\\(device_hash, 'sha256'\\), 'hex'\\)\\s+WHERE (?:device_hash IS NOT NULL AND )?device_hash !~ '\\^\\[0-9a-f\\]\\{64\\}\\$';`));
    }
  });

  it('describes the new storage behavior in the privacy policy', () => {
    expect(privacy).toContain('Without an enforced boundary, successful check-ins do not store your coordinates.');
    expect(privacy).toContain('stores a one-way SHA-256 hash of that identifier');
    expect(privacy).toContain('Last updated: 2 November 2026');
  });
});
