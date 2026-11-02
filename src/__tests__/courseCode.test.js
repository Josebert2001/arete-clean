import { describe, expect, it } from 'vitest';
import { courses as cyberCourses } from '../data/courses';
import { courses as dataCourses } from '../data/dataScienceCourses';
import { normalizeCourseCode } from '../utils/courseCode';

describe('normalizeCourseCode', () => {
  it('preserves every catalogue code format exactly', () => {
    for (const course of [...cyberCourses, ...dataCourses]) {
      expect(normalizeCourseCode(course.code)).toBe(course.code);
    }
  });

  it.each([
    ['cyb224', 'CYB 224'],
    [' cyb  224 ', 'CYB 224'],
    ['UUY-CYB  221', 'UUY-CYB 221'],
    [' uuy-cyb221 ', 'UUY-CYB 221'],
    ['uniuyo-cyb425', 'UNIUYO-CYB 425'],
    [' gst\t111 ', 'GST 111'],
  ])('normalizes %s to %s', (input, output) => {
    expect(normalizeCourseCode(input)).toBe(output);
  });

  it.each(['', 'CYB 22', 'CYB 2244', 'CYB-224', 'FOO-BAR 123', 'CYB 22A', 'CYB 2 24'])('rejects %s', input => {
    expect(normalizeCourseCode(input)).toBeNull();
  });
});
