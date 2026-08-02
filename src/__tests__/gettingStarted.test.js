import { describe, it, expect, beforeEach } from 'vitest';
import {
  deriveGettingStartedSteps,
  shouldShowGettingStarted,
  readDismissed,
  writeDismissed,
  readClicked,
  writeClicked,
} from '../utils/gettingStarted';

describe('deriveGettingStartedSteps — full department', () => {
  it('points the courses step at the student\'s own year', () => {
    const [courses] = deriveGettingStartedSteps({ levelNumber: 300, isFoundation: false });
    expect(courses).toMatchObject({
      id: 'courses',
      label: 'Open your 300L courses',
      to: '/courses?level=300',
      done: false,
    });
  });

  it('marks the courses step done once clicked', () => {
    const [courses] = deriveGettingStartedSteps({
      levelNumber: 300, isFoundation: false, clicked: { courses: true },
    });
    expect(courses.done).toBe(true);
  });

  it('marks the courses step done from the student\'s last-visited page too', () => {
    const [courses] = deriveGettingStartedSteps({
      levelNumber: 300, isFoundation: false, lastPath: '/courses/mth-111',
    });
    expect(courses.done).toBe(true);
  });

  it('falls back to a plain courses link when the level is unrecognised', () => {
    const [courses] = deriveGettingStartedSteps({ levelNumber: null, isFoundation: false });
    expect(courses).toMatchObject({ label: 'Open your courses', to: '/courses' });
  });
});

describe('deriveGettingStartedSteps — foundation mode', () => {
  it('points the courses step at picking a programme instead', () => {
    const [courses] = deriveGettingStartedSteps({ isFoundation: true, hasSelectedCourses: false });
    expect(courses).toMatchObject({
      id: 'courses',
      label: "Pick the courses your programme takes",
      to: '/courses',
      done: false,
    });
  });

  it('marks the courses step done once the student has pinned any courses', () => {
    const [courses] = deriveGettingStartedSteps({ isFoundation: true, hasSelectedCourses: true });
    expect(courses.done).toBe(true);
  });
});

describe('deriveGettingStartedSteps — module and tutor steps', () => {
  it('marks the module step done only once something is completed', () => {
    const withNone = deriveGettingStartedSteps({ completedCount: 0 });
    const withOne = deriveGettingStartedSteps({ completedCount: 1 });
    expect(withNone.find(s => s.id === 'module').done).toBe(false);
    expect(withOne.find(s => s.id === 'module').done).toBe(true);
  });

  it('marks the tutor step done from a click or from having visited /tutor', () => {
    const untouched = deriveGettingStartedSteps({});
    const clicked = deriveGettingStartedSteps({ clicked: { tutor: true } });
    const visited = deriveGettingStartedSteps({ lastPath: '/tutor' });
    expect(untouched.find(s => s.id === 'tutor').done).toBe(false);
    expect(clicked.find(s => s.id === 'tutor').done).toBe(true);
    expect(visited.find(s => s.id === 'tutor').done).toBe(true);
  });
});

describe('deriveGettingStartedSteps — reg number step', () => {
  it('is included and never done while the student has no reg number', () => {
    const steps = deriveGettingStartedSteps({ hasRegNumber: false });
    const reg = steps.find(s => s.id === 'reg');
    expect(reg).toMatchObject({ label: 'Add your reg number', to: '/profile', done: false });
  });

  it('disappears once the student has a reg number', () => {
    const steps = deriveGettingStartedSteps({ hasRegNumber: true });
    expect(steps.find(s => s.id === 'reg')).toBeUndefined();
  });
});

describe('shouldShowGettingStarted', () => {
  it.each([
    [0, false, true],
    [0, true, false],
    [1, false, false],
    [1, true, false],
  ])('completedCount=%i dismissed=%s → %s', (completedCount, dismissed, expected) => {
    expect(shouldShowGettingStarted({ completedCount, dismissed })).toBe(expected);
  });
});

describe('dismissed persistence', () => {
  beforeEach(() => localStorage.clear());

  it('is false until written, then true for that user only', () => {
    expect(readDismissed('u1')).toBe(false);
    writeDismissed('u1');
    expect(readDismissed('u1')).toBe(true);
    expect(readDismissed('u2')).toBe(false);
  });

  it('is always false without a user id', () => {
    expect(readDismissed(null)).toBe(false);
    expect(readDismissed(undefined)).toBe(false);
  });
});

describe('clicked persistence', () => {
  beforeEach(() => localStorage.clear());

  it('accumulates clicked step ids per user', () => {
    expect(readClicked('u1')).toEqual({});
    writeClicked('u1', 'courses');
    expect(readClicked('u1')).toEqual({ courses: true });
    writeClicked('u1', 'tutor');
    expect(readClicked('u1')).toEqual({ courses: true, tutor: true });
    expect(readClicked('u2')).toEqual({});
  });

  it('tolerates a missing user id without throwing', () => {
    expect(() => writeClicked(undefined, 'courses')).not.toThrow();
    expect(readClicked(undefined)).toEqual({});
  });
});
