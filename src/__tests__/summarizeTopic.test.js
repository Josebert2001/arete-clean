import { describe, it, expect } from 'vitest';
import {
  topicToPlainText,
  canSummarize,
  MIN_SUMMARY_CHARS,
  MAX_SUMMARY_CHARS,
} from '../utils/summarizeTopic';

const pad = (n) => 'x'.repeat(n);

describe('topicToPlainText', () => {
  it('includes the title and every prose-bearing section type', () => {
    const text = topicToPlainText({
      title: 'Website Attacks',
      sections: [
        { type: 'definition', heading: 'Injection', text: 'Untrusted data sent to an interpreter.' },
        { type: 'bullets', heading: 'Kinds', items: ['SQL', 'LDAP'] },
        { type: 'table', heading: 'Compare', headers: ['A', 'B'], rows: [['1', '2']] },
      ],
    });
    expect(text).toContain('Website Attacks');
    expect(text).toContain('Untrusted data sent to an interpreter.');
    expect(text).toContain('- SQL');
    expect(text).toContain('1 | 2');
  });

  it('folds in note and casestudy sections, which Simplify skips', () => {
    const text = topicToPlainText({
      title: 'T',
      sections: [
        { type: 'note', text: 'Clarification here', items: ['extra point'] },
        { type: 'casestudy', title: 'Bank breach', prompt: 'What went wrong?', tasks: ['Identify the flaw'] },
      ],
    });
    expect(text).toContain('Clarification here');
    expect(text).toContain('- extra point');
    expect(text).toContain('Bank breach');
    expect(text).toContain('What went wrong?');
    expect(text).toContain('1. Identify the flaw');
  });

  it('skips section types with nothing to summarise', () => {
    const text = topicToPlainText({
      title: 'T',
      sections: [
        { type: 'image', src: '/x.webp', caption: 'A diagram' },
        { type: 'mosca' },
      ],
    });
    expect(text).toBe('T');
  });

  it('returns empty for a topic with no sections', () => {
    expect(topicToPlainText({ title: 'T' })).toBe('');
    expect(topicToPlainText(undefined)).toBe('');
  });
});

describe('canSummarize', () => {
  const topicOfLength = (n, title = 'Website Attacks') => ({
    title,
    sections: [{ type: 'definition', heading: 'H', text: pad(n) }],
  });

  it('offers the button on a substantial topic', () => {
    expect(canSummarize(topicOfLength(MIN_SUMMARY_CHARS + 100))).toBe(true);
  });

  it('hides it on a topic short enough to be its own summary', () => {
    expect(canSummarize(topicOfLength(100))).toBe(false);
  });

  it('hides it above the API cap, so it never offers a call that 400s', () => {
    expect(canSummarize(topicOfLength(MAX_SUMMARY_CHARS + 1000))).toBe(false);
  });

  it('hides it on topics that are already hand-written revision summaries', () => {
    // UUY-CYB 222's topic 13 is the lecturer's own exam guidance — an AI recap
    // would restate the most trustworthy thing on the page, worse.
    const long = pad(MIN_SUMMARY_CHARS + 100);
    expect(canSummarize(topicOfLength(long.length, 'Exam Focus — The Lecturer’s Guaranteed Questions'))).toBe(false);
    expect(canSummarize(topicOfLength(long.length, 'Key Takeaways'))).toBe(false);
  });

  it('hides it on an untitled topic', () => {
    expect(canSummarize({ sections: [{ type: 'text', text: pad(2000) }] })).toBe(false);
  });

  it('accepts pre-serialized text so the caller does not serialize twice', () => {
    const topic = topicOfLength(50);
    expect(canSummarize(topic, pad(MIN_SUMMARY_CHARS + 10))).toBe(true);
  });
});

describe('client and server caps agree', () => {
  it('never offers more text than api/summarize.js accepts', () => {
    // MAX_TEXT_CHARS in api/summarize.js. Keep these two in step by hand — the
    // API is not importable from a browser test.
    expect(MAX_SUMMARY_CHARS).toBe(32000);
  });
});
