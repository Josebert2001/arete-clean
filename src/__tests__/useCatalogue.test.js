import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCatalogue } from '../data/useCatalogue';
import * as authModule from '../context/AuthContext';

afterEach(() => vi.restoreAllMocks());

// Drives useCatalogue with an exact auth state instead of a real AuthProvider,
// so each phase of sign-in can be asserted on its own.
const mockAuth = (state) =>
  vi.spyOn(authModule, 'useAuth').mockReturnValue({
    user: null, profile: null, authLoading: false, profileLoading: false, ...state,
  });

describe('useCatalogue', () => {
  it('resolves the default Cybersecurity catalogue when signed out (no profile)', async () => {
    // No AuthProvider wrapper: useAuth() falls back to the context's default
    // value (signed out, nothing loading), same as a signed-out visitor.
    const { result } = renderHook(() => useCatalogue());
    expect(result.current.status).toBe('loading');

    // Generous timeout: this resolves a real dynamic import of the ~800 kB
    // catalogue, which can take well over waitFor's 1s default on a cold
    // transform or a loaded machine.
    await waitFor(() => expect(result.current.status).toBe('ready'), { timeout: 15000 });
    expect(result.current.department.slug).toBe('cybersecurity');
    expect(result.current.catalogue.courses.length).toBeGreaterThan(0);
  });

  it('resolves a department catalogue from the signed-in profile', async () => {
    mockAuth({ user: { id: 'u1' }, profile: { department: 'dataScience' } });
    const { result } = renderHook(() => useCatalogue());

    await waitFor(() => expect(result.current.status).toBe('ready'), { timeout: 15000 });
    expect(result.current.department.slug).toBe('dataScience');
    expect(result.current.catalogue.getCourseBySlug('dts-226')).toBeTruthy();
    // A Cybersecurity-only course must not leak into another department.
    expect(result.current.catalogue.getCourseBySlug('cyb-311')).toBeUndefined();
  });

  // Regression: auth resolves asynchronously, so `profile` is null on the first
  // render of every session. Reading the department straight off it resolved
  // DEFAULT_DEPARTMENT and painted a full Cybersecurity Course Hub before
  // swapping to the student's real catalogue.
  it('stays loading while a signed-in student\'s profile is still resolving', async () => {
    mockAuth({ user: { id: 'u1' }, profile: null, profileLoading: true });
    const { result } = renderHook(() => useCatalogue());

    expect(result.current.status).toBe('loading');
    expect(result.current.catalogue).toBeNull();
    // Give a wrongly-resolved default catalogue every chance to appear.
    await new Promise(r => setTimeout(r, 50));
    expect(result.current.status).toBe('loading');
    expect(result.current.catalogue).toBeNull();
  });

  it('stays loading while auth itself is still resolving', async () => {
    mockAuth({ user: null, profile: null, authLoading: true });
    const { result } = renderHook(() => useCatalogue());

    await new Promise(r => setTimeout(r, 50));
    expect(result.current.status).toBe('loading');
    expect(result.current.catalogue).toBeNull();
  });
});
