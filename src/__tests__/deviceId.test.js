import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getDeviceId } from '../utils/deviceId';

describe('getDeviceId', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('generates and persists an id across calls', () => {
    const first = getDeviceId();
    const second = getDeviceId();
    expect(first).toBe(second);
    expect(localStorage.getItem('arete-device-id')).toBe(first);
  });

  it('reuses an id already in storage instead of generating a new one', () => {
    localStorage.setItem('arete-device-id', 'existing-id');
    expect(getDeviceId()).toBe('existing-id');
  });

  it('falls back to a one-off id when localStorage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    const id = getDeviceId();
    expect(id.startsWith('nostore-')).toBe(true);
    spy.mockRestore();
  });
});
