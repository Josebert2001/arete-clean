import { describe, it, expect } from 'vitest';
import {
  READING_STORAGE_KEY,
  topicReadId,
  readCountFor,
  readTopicTotal,
  readCourseCount,
  dwellMsFor,
} from '../components/useReadingProgress';
import { noteTopicCount, NOTE_TOPIC_COUNTS } from '../data/lectureNotes/index.js';

const topic = (title, number) => ({ title, number, sections: [] });

const progressWith = (...ids) => ({ completedModules: ids, quizScores: {} });

describe('topicReadId', () => {
  it('is stable for the same course and title', () => {
    const t = topic('Website Attacks', '8');
    expect(topicReadId('uuy-cyb-222', t)).toBe(topicReadId('uuy-cyb-222', t));
  });

  it('survives renumbering — the number is not part of the identity', () => {
    // The exact case reviewSchedule.js documents: UUY-CYB 222's topics were
    // renumbered in a docs-only edit. A student's read marks must not reset.
    expect(topicReadId('uuy-cyb-222', topic('Risks & Threats', '5')))
      .toBe(topicReadId('uuy-cyb-222', topic('Risks & Threats', '7')));
  });

  it('separates the same topic title in different courses', () => {
    expect(topicReadId('uuy-cyb-222', topic('Introduction')))
      .not.toBe(topicReadId('cyb-122', topic('Introduction')));
  });

  it('changes when the topic is retitled', () => {
    expect(topicReadId('uuy-cyb-222', topic('Website Attacks')))
      .not.toBe(topicReadId('uuy-cyb-222', topic('Web Attacks')));
  });

  it('is prefixed by the slug, which is what lets the cards count without the topics', () => {
    expect(topicReadId('uuy-cyb-222', topic('Website Attacks'))).toMatch(/^uuy-cyb-222#/);
  });

  it('tolerates a missing topic', () => {
    expect(() => topicReadId('uuy-cyb-222', undefined)).not.toThrow();
  });
});

describe('readCountFor', () => {
  const progress = progressWith(
    topicReadId('uuy-cyb-222', topic('One')),
    topicReadId('uuy-cyb-222', topic('Two')),
    topicReadId('cyb-122', topic('One')),
  );

  it('counts only the requested course', () => {
    expect(readCountFor(progress, 'uuy-cyb-222')).toBe(2);
    expect(readCountFor(progress, 'cyb-122')).toBe(1);
  });

  it('returns 0 for an untouched course, a missing slug and empty progress', () => {
    expect(readCountFor(progress, 'gst-111')).toBe(0);
    expect(readCountFor(progress, undefined)).toBe(0);
    expect(readCountFor({}, 'uuy-cyb-222')).toBe(0);
  });

  it('does not count a slug that is merely a prefix of another', () => {
    // 'cyb-12' must not pick up 'cyb-122' marks — the '#' separator is what
    // makes the prefix test exact.
    expect(readCountFor(progress, 'cyb-12')).toBe(0);
  });
});

describe('dashboard counters', () => {
  const progress = progressWith(
    topicReadId('uuy-cyb-222', topic('One')),
    topicReadId('uuy-cyb-222', topic('Two')),
    topicReadId('cyb-122', topic('One')),
  );

  it('totals topics and distinct courses', () => {
    expect(readTopicTotal(progress)).toBe(3);
    expect(readCourseCount(progress)).toBe(2);
  });

  it('handles empty progress', () => {
    expect(readTopicTotal({})).toBe(0);
    expect(readCourseCount({})).toBe(0);
  });
});

describe('dwellMsFor', () => {
  it('floors short topics at 15s and caps long ones at 90s', () => {
    expect(dwellMsFor(0)).toBe(15_000);
    expect(dwellMsFor(100)).toBe(15_000);
    expect(dwellMsFor(10_000_000)).toBe(90_000);
  });

  it('scales across the range real topics actually fall in', () => {
    // 5,000 chars → 200s estimated read → a quarter of that. If this ever
    // clamps, the scaling has stopped doing anything and the constants need
    // revisiting — see the note on DWELL_FRACTION.
    expect(dwellMsFor(5_000)).toBe(50_000);
    expect(dwellMsFor(5_000)).toBeGreaterThan(dwellMsFor(2_000));
    expect(dwellMsFor(8_000)).toBeGreaterThan(dwellMsFor(5_000));
  });

  it('never demands the full estimated reading time', () => {
    const chars = 6_000;
    const fullEstimateMs = (chars / 25) * 1000;
    expect(dwellMsFor(chars)).toBeLessThan(fullEstimateMs);
  });

  it('treats junk input as the floor rather than NaN', () => {
    expect(dwellMsFor(undefined)).toBe(15_000);
    expect(dwellMsFor('abc')).toBe(15_000);
  });
});

describe('noteTopicCount', () => {
  it('reads the static map for a lazily-loaded course', () => {
    expect(noteTopicCount({ notesKey: 'cyb122' })).toBe(NOTE_TOPIC_COUNTS.cyb122);
  });

  it('counts inline notes directly (UUY-CYB 222 still holds its own)', () => {
    expect(noteTopicCount({ lectureNotes: [topic('a'), topic('b')] })).toBe(2);
  });

  it('is 0 for a course with no notes and for junk', () => {
    expect(noteTopicCount({ slug: 'gst-111' })).toBe(0);
    expect(noteTopicCount(undefined)).toBe(0);
    expect(noteTopicCount({ notesKey: 'nope' })).toBe(0);
  });
});

describe('storage key', () => {
  it('is its own record, not shared with the quiz-score blob', () => {
    expect(READING_STORAGE_KEY).toBe('course-reading-v1');
    expect(READING_STORAGE_KEY).not.toBe('course-quizzes-v1');
  });
});
