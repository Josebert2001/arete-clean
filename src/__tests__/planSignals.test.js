import { describe, it, expect, beforeEach } from 'vitest';
import { collectCourseSignals } from '../utils/planSignals';
import { trackMeta } from '../data/trackMeta';

const COURSE = { slug: 'ent-221', code: 'ENT 221' };
// Matches the java track by courseCode; interactiveTrackPath match is the
// COS 221 case (a second course reusing the same track).
const JAVA_COURSE = { slug: 'cos-211', code: 'COS 211' };
const JAVA_REUSE = { slug: 'cos-221', code: 'COS 221', interactiveTrackPath: '/tracks/java' };

const javaTrack = trackMeta.java;
const javaModuleIds = javaTrack.moduleIndex.map(m => m.id);

describe('collectCourseSignals', () => {
  beforeEach(() => localStorage.clear());

  it('returns an empty map when nothing is stored', () => {
    expect(collectCourseSignals([COURSE, JAVA_COURSE])).toEqual({});
  });

  it('survives corrupt records', () => {
    localStorage.setItem('course-quizzes-v1', '{broken json');
    localStorage.setItem(javaTrack.storageKey, 'also broken');
    expect(collectCourseSignals([COURSE, JAVA_COURSE])).toEqual({});
  });

  it('reads a course practice-quiz score by slug', () => {
    localStorage.setItem('course-quizzes-v1', JSON.stringify({
      quizScores: { 'ent-221': { score: 9, total: 20, date: Date.now() } },
    }));
    expect(collectCourseSignals([COURSE])).toEqual({
      'ent-221': { quizPercent: 45 },
    });
  });

  it('links track progress via courseCode and interactiveTrackPath', () => {
    localStorage.setItem(javaTrack.storageKey, JSON.stringify({
      completedModules: javaModuleIds.slice(0, 12), // 12/13 ≈ 92%
      quizScores: { [javaModuleIds[0]]: { score: 9, total: 10 } },
    }));
    const signals = collectCourseSignals([JAVA_COURSE, JAVA_REUSE]);
    expect(signals['cos-211']).toEqual({ quizPercent: 90, trackPercent: 92, trackLabel: 'Java' });
    expect(signals['cos-221']).toEqual({ quizPercent: 90, trackPercent: 92, trackLabel: 'Java' });
  });

  it('prefers the course quiz over the linked track quiz average', () => {
    localStorage.setItem('course-quizzes-v1', JSON.stringify({
      quizScores: { 'cos-211': { score: 4, total: 10 } },
    }));
    localStorage.setItem(javaTrack.storageKey, JSON.stringify({
      completedModules: javaModuleIds.slice(0, 2),
      quizScores: { [javaModuleIds[0]]: { score: 10, total: 10 } },
    }));
    expect(collectCourseSignals([JAVA_COURSE])['cos-211'].quizPercent).toBe(40);
  });
});
