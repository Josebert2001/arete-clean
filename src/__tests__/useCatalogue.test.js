import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCatalogue } from '../data/useCatalogue';

describe('useCatalogue', () => {
  it('resolves the default Cybersecurity catalogue when signed out (no profile)', async () => {
    // No AuthProvider wrapper: useAuth() falls back to the context's default
    // value (profile: null), same as a signed-out visitor.
    const { result } = renderHook(() => useCatalogue());
    expect(result.current.status).toBe('loading');

    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(result.current.department.slug).toBe('cybersecurity');
    expect(result.current.catalogue.courses.length).toBeGreaterThan(0);
  });
});
