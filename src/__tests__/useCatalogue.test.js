import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCatalogue } from '../data/useCatalogue';

describe('useCatalogue', () => {
  it('resolves the default Cybersecurity catalogue when signed out (no profile)', async () => {
    // No AuthProvider wrapper: useAuth() falls back to the context's default
    // value (profile: null), same as a signed-out visitor.
    const { result } = renderHook(() => useCatalogue());
    expect(result.current.status).toBe('loading');

    // Generous timeout: this resolves a real dynamic import of the ~800 kB
    // catalogue, which can take well over waitFor's 1s default on a cold
    // transform or a loaded machine.
    await waitFor(() => expect(result.current.status).toBe('ready'), { timeout: 15000 });
    expect(result.current.department.slug).toBe('cybersecurity');
    expect(result.current.catalogue.courses.length).toBeGreaterThan(0);
  });
});
