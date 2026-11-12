import { describe, it, expect } from 'vitest';
import {
  buildMissionSteps, visibleSteps, countableSteps, stepId, levelLabel, timeLabel,
  proofLines, buildWriteup, cleanNote, NOTE_MAX_CHARS, isGuidanceMode,
} from '../utils/missionSteps';
import { securityModules } from '../data/securityModules';
import { modules as javaModules } from '../data/modules';

const room = {
  id: 'sec-test', number: 2, title: 'Encoding Is Not Encryption', subtitle: 'Base64 and friends',
  difficulty: 1, estimatedHours: 2,
  theory: [{ heading: 'What encoding is', body: '…' }, { heading: 'Why it is not secret', body: '…' }],
  codeExamples: [{ title: 'Decode it', code: 'x', explanation: 'y' }],
  practiceQuestions: [{ question: 'q', options: ['a', 'b'], correctIndex: 0, explanation: 'e' }],
  challenge: { title: 'Find the hidden note' },
  miniProject: { title: 'Write a decoder', description: 'd', hints: ['h'] },
};
const track = { label: 'Security', modules: [{ id: 'a' }, room] };

describe('buildMissionSteps', () => {
  it('lays a module out as brief → learn → read → check → flag → build → wrap', () => {
    expect(buildMissionSteps(room).map(step => step.key)).toEqual([
      'brief', 'learn-1', 'learn-2', 'code', 'check', 'flag', 'build', 'wrap',
    ]);
  });

  it('adds a run step only when the module ships a playground', () => {
    expect(buildMissionSteps(room).some(step => step.kind === 'try')).toBe(false);
    expect(buildMissionSteps({ ...room, playground: 'print(1)' }).map(step => step.kind)).toContain('try');
  });

  it('returns nothing for a missing module rather than throwing', () => {
    expect(buildMissionSteps(null)).toEqual([]);
  });

  it('gives every real module unique step keys, a brief first and a wrap-up last', () => {
    for (const mod of [...securityModules, ...javaModules]) {
      const steps = buildMissionSteps(mod);
      const keys = steps.map(step => step.key);
      expect(new Set(keys).size, mod.id).toBe(keys.length);
      expect(keys[0]).toBe('brief');
      expect(keys.at(-1)).toBe('wrap');
      expect(countableSteps(steps).length, mod.id).toBeGreaterThan(1);
    }
  });
});

describe('guidance modes', () => {
  it('"on my own" hides the teaching steps and keeps every task', () => {
    const kinds = visibleSteps(buildMissionSteps(room), 'solo').map(step => step.kind);
    expect(kinds).toEqual(['brief', 'check', 'flag', 'build', 'wrap']);
  });

  it('the other modes show every step', () => {
    const steps = buildMissionSteps(room);
    expect(visibleSteps(steps, 'guided')).toBe(steps);
    expect(visibleSteps(steps, 'hints')).toBe(steps);
  });

  it('recognises only the three real modes', () => {
    expect(isGuidanceMode('hints')).toBe(true);
    expect(isGuidanceMode('expert')).toBe(false);
    expect(isGuidanceMode(null)).toBe(false);
  });
});

describe('labels', () => {
  it('does not count the brief or the wrap-up as work', () => {
    expect(countableSteps(buildMissionSteps(room)).map(step => step.key)).toEqual(['learn-1', 'learn-2', 'code', 'check', 'flag', 'build']);
  });

  it('builds a progress id that survives the progress sanitiser\'s id rules', () => {
    const id = stepId('sec-test', 'learn-1');
    expect(id).toBe('sec-test#learn-1');
    expect(id.length).toBeLessThanOrEqual(200);
  });

  it('names levels and times in plain words', () => {
    expect([1, 2, 3, 4, 5].map(levelLabel)).toEqual(['Beginner', 'Beginner', 'Intermediate', 'Advanced', 'Advanced']);
    expect(timeLabel(2)).toBe('About 2 hours');
    expect(timeLabel(1)).toBe('About 1 hour');
    expect(timeLabel(0.5)).toBe('About 30 min');
    expect(timeLabel(undefined)).toBe('Self-paced');
  });

  it('states how the learner proves the module from its own content', () => {
    expect(proofLines(room)).toEqual(['Answer 1 practice question', 'Capture the flag', 'Go further: Write a decoder']);
    expect(proofLines({ ...room, challenge: undefined })).toContain('Build: Write a decoder');
  });
});

describe('buildWriteup', () => {
  const base = { track, mod: room, steps: buildMissionSteps(room), date: new Date('2026-11-10T09:00:00Z') };

  it('records ticked steps, notes and evidence', () => {
    const text = buildWriteup({
      ...base, completed: true, doneKeys: ['learn-1', 'flag'],
      notes: { 'learn-1': 'Encoding is reversible by anyone.', brief: 'Preparing for CYB 224.' },
      quizScore: { score: 4, total: 5 },
    });
    expect(text).toContain('# Encoding Is Not Encryption');
    expect(text).toContain('Security path · Part 2 of 2 · Beginner · About 2 hours');
    expect(text).toContain('**Status:** Completed · 2026-11-10');
    expect(text).toContain('- [x] **Learn:** What encoding is\n  > Encoding is reversible by anyone.');
    expect(text).toContain('- [ ] **Learn:** Why it is not secret');
    expect(text).toContain('Practice questions: 4 of 5');
    expect(text).toContain('Flag challenge: captured');
    expect(text).toContain('## Why I did this\n\nPreparing for CYB 224.');
  });

  it('says in progress, and never calls itself a certificate of anything', () => {
    const text = buildWriteup(base);
    expect(text).toContain('**Status:** In progress');
    expect(text).toContain('Flag challenge: not captured yet');
    expect(text).toMatch(/not a certificate\.\n$/);
    expect(text).not.toMatch(/certified|accredited|University of Uyo/i);
  });

  it('caps a note instead of writing an unbounded one', () => {
    expect(cleanNote('x'.repeat(NOTE_MAX_CHARS + 50))).toHaveLength(NOTE_MAX_CHARS);
    expect(cleanNote(42)).toBe('');
  });

  it('is empty without a track or module', () => {
    expect(buildWriteup({})).toBe('');
  });
});
