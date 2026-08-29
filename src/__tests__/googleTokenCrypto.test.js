import { describe, it, expect, beforeAll } from 'vitest';

// A Google refresh token is a long-lived credential — whoever holds one can mint
// access tokens against that student's Calendar until it is revoked. These tests
// pin the two properties that matter: a stored value is not readable as a token,
// and a value that cannot be authenticated is rejected rather than passed
// through as if it were one.
//
// GOOGLE_CLIENT_SECRET must be set before the module loads: the key is derived
// from it at call time, but the module reads the env var at import.
let enc;

beforeAll(async () => {
  process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret-for-key-derivation';
  enc = await import('../../api/_lib/googleAuth.js');
});

const TOKEN = '1//0gLd7Xk-EXAMPLE-refresh-token-value-9aBcD';

describe('refresh-token encryption at rest', () => {
  it('round-trips a token', () => {
    const stored = enc.encryptRefreshToken(TOKEN);
    expect(enc.decryptRefreshToken(stored)).toBe(TOKEN);
  });

  it('does not leave the token readable in the stored value', () => {
    const stored = enc.encryptRefreshToken(TOKEN);
    expect(stored).not.toContain(TOKEN);
    expect(stored.startsWith('v1.')).toBe(true);
  });

  it('produces a different ciphertext each time, so equal tokens are not linkable', () => {
    // A fresh random IV per encryption — otherwise two students who somehow
    // shared a token, or the same token re-saved, would be visibly identical.
    expect(enc.encryptRefreshToken(TOKEN)).not.toBe(enc.encryptRefreshToken(TOKEN));
  });

  it('reads a legacy plaintext row unchanged, so existing connections keep working', () => {
    expect(enc.decryptRefreshToken(TOKEN)).toBe(TOKEN);
    expect(enc.isLegacyPlaintextToken(TOKEN)).toBe(true);
  });

  it('does not mistake its own ciphertext for a legacy value', () => {
    expect(enc.isLegacyPlaintextToken(enc.encryptRefreshToken(TOKEN))).toBe(false);
  });

  it('rejects a tampered ciphertext instead of returning garbage', () => {
    const stored = enc.encryptRefreshToken(TOKEN);
    const [v, iv, tag, ct] = stored.split('.');
    // Flip a character in the ciphertext body; GCM's auth tag must catch it.
    const flipped = ct[0] === 'A' ? 'B' + ct.slice(1) : 'A' + ct.slice(1);
    expect(enc.decryptRefreshToken([v, iv, tag, flipped].join('.'))).toBeNull();
  });

  it('rejects a ciphertext whose auth tag does not match', () => {
    const stored = enc.encryptRefreshToken(TOKEN);
    const [v, iv, tag, ct] = stored.split('.');
    const badTag = tag[0] === 'A' ? 'B' + tag.slice(1) : 'A' + tag.slice(1);
    expect(enc.decryptRefreshToken([v, iv, badTag, ct].join('.'))).toBeNull();
  });

  it('rejects a malformed v1 value rather than throwing', () => {
    expect(enc.decryptRefreshToken('v1.')).toBeNull();
    expect(enc.decryptRefreshToken('v1.only-one-part')).toBeNull();
    expect(enc.decryptRefreshToken('v1.a.b')).toBeNull();
  });

  it('returns null for empty or non-string input', () => {
    expect(enc.decryptRefreshToken(null)).toBeNull();
    expect(enc.decryptRefreshToken(undefined)).toBeNull();
    expect(enc.decryptRefreshToken('')).toBeNull();
    expect(enc.decryptRefreshToken(42)).toBeNull();
    expect(enc.isLegacyPlaintextToken('')).toBe(false);
  });
});
