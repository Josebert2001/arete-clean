import { describe, expect, it } from 'vitest';
import { assembleUserData } from '../utils/userDataExport.js';

describe('assembleUserData', () => {
  it('keeps student-readable records and omits file bytes and Google tokens', () => {
    const data = assembleUserData({
      profile: { id: 'student', full_name: 'Ada' }, progress: [{ storage_key: 'java-v1' }],
      attendance: [{ session_id: 'class-1' }],
      materials: [{ id: 'file-1', display_name: 'notes.pdf', file_path: 'private-path', extracted_text: 'body' }],
      google: { connected: true, scope: 'calendar', refresh_token: 'secret' },
      career: { attempts: [{ version: 'career-v1', answers: { I1: 4 } }], practiceNotes: [{ notes: 'My reflection' }] },
    });
    expect(data.profile.full_name).toBe('Ada');
    expect(data.progress).toHaveLength(1);
    expect(data.attendance).toHaveLength(1);
    expect(data.career.attempts[0].answers).toEqual({ I1: 4 });
    expect(data.career.practiceNotes[0].notes).toBe('My reflection');
    expect(data.materials).toEqual([{ id: 'file-1', display_name: 'notes.pdf' }]);
    expect(data.googleConnection).toMatchObject({ connected: true, scope: 'calendar' });
    expect(JSON.stringify(data)).not.toMatch(/private-path|body|secret/);
  });
});
