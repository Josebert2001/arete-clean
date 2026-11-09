import { describe, it, expect } from 'vitest';
import { isMissingColumnError, PROFILE_COLUMNS, BASE_PROFILE_COLUMNS } from '../utils/profileSchema';

describe('isMissingColumnError', () => {
  it('recognises a select on an unapplied column (Postgres 42703)', () => {
    expect(isMissingColumnError({ code: '42703', message: 'column profiles.learning_mode does not exist' }, 'learning_mode')).toBe(true);
  });

  it('recognises a write to an unapplied column (PostgREST PGRST204)', () => {
    expect(isMissingColumnError({ code: 'PGRST204', message: "Could not find the 'learning_mode' column of 'profiles' in the schema cache" }, 'learning_mode')).toBe(true);
  });

  it('does not mistake other failures for a missing migration', () => {
    expect(isMissingColumnError(null, 'learning_mode')).toBe(false);
    expect(isMissingColumnError({ message: 'Failed to fetch' }, 'learning_mode')).toBe(false);
    expect(isMissingColumnError({ code: '42703', message: 'column profiles.other does not exist' }, 'learning_mode')).toBe(false);
  });

  it('keeps the fallback select free of the optional column', () => {
    expect(BASE_PROFILE_COLUMNS).not.toContain('learning_mode');
    expect(PROFILE_COLUMNS).toContain('learning_mode');
  });
});
