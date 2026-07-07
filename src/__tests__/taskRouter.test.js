import { describe, it, expect } from 'vitest';
import { classifyTaskTier } from '../../api/_lib/taskRouter.js';

const user = (content) => [{ role: 'user', content }];

describe('classifyTaskTier', () => {
  it('routes bare greetings to the light tier', () => {
    for (const g of ['hello', 'Hi', 'hey!', 'good morning', 'Good Afternoon.', 'yo', 'hello 👋']) {
      expect(classifyTaskTier(user(g))).toBe('light');
    }
  });

  it('routes acknowledgements and filler to the light tier', () => {
    for (const a of ['thanks', 'Thank you!', 'ok', 'okay', 'got it', 'cool', 'yes', 'no', '👍']) {
      expect(classifyTaskTier(user(a))).toBe('light');
    }
  });

  it('routes real questions to the strong tier', () => {
    for (const q of [
      'what is the CIA triad?',
      'why does this loop run forever?',
      'explain RSA key generation step by step',
      'hello, can you explain subnetting', // greeting word + a real question
      'derive the ALE formula for me',
    ]) {
      expect(classifyTaskTier(user(q))).toBe('strong');
    }
  });

  it('ignores a leading [Studying: ...] tag when classifying', () => {
    expect(classifyTaskTier(user('[Studying: Java Module 05] hi'))).toBe('light');
    expect(classifyTaskTier(user('[Studying: Java Module 05] why is my recursion overflowing?'))).toBe('strong');
  });

  it('treats empty or missing input as light, never throwing', () => {
    expect(classifyTaskTier(user('   '))).toBe('light');
    expect(classifyTaskTier([])).toBe('light');
    expect(classifyTaskTier(null)).toBe('light');
    expect(classifyTaskTier(undefined)).toBe('light');
  });

  it('uses the LAST user message to decide the tier', () => {
    const convo = [
      { role: 'user', content: 'explain pointers' },
      { role: 'assistant', content: '...' },
      { role: 'user', content: 'thanks' },
    ];
    expect(classifyTaskTier(convo)).toBe('light');
  });
});
