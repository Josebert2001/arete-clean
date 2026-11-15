import { describe, expect, it } from 'vitest';
import { tutorGreeting } from '../utils/tutorGreeting';

describe('tutorGreeting', () => {
  it('never promises an independent learner a university curriculum', () => {
    const text = tutorGreeting({ learning_mode: 'independent', department: 'general', level: null });
    expect(text).not.toMatch(/B\.Sc\.|100L|curriculum|courses on Areté/);
    expect(text).toMatch(/Security/);
  });

  it('names the student\'s own degree', () => {
    expect(tutorGreeting({ department: 'dataScience', level: 200 })).toMatch(/B\.Sc\. Data Science/);
    expect(tutorGreeting({ department: 'cybersecurity', level: 100 })).toMatch(/B\.Sc\. Cybersecurity/);
  });

  it('does not claim a full degree for a foundation student', () => {
    const text = tutorGreeting({ department: 'general', level: 100 });
    expect(text).not.toMatch(/B\.Sc\./);
    expect(text).toMatch(/foundation courses/);
  });

  it('counts the four learning paths', () => {
    expect(tutorGreeting({ department: 'cybersecurity', level: 300 })).toMatch(/Java, Python, C and Security/);
  });
});
