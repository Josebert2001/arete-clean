// A track module laid out as a guided sequence of numbered steps.
//
// The module data files (modules.js, pythonModules.js, cModules.js,
// securityModules.js) are unchanged: every step here is DERIVED from fields a
// module already carries — theory sections, code examples, the playground, the
// practice questions, the flag challenge and the mini project. That is on
// purpose. 49 modules were authored against that shape and validated by
// scripts/validate-modules.mjs; a second "steps" field would be a second copy
// of the same lesson that could drift from the first.
//
// Pure functions only — no React, no storage — so the page, the module list
// and the tests all agree on what a module's steps are.

// How much help the page shows. The steps themselves never change, only what
// is unfolded, so a learner can drop to more guidance mid-module without
// losing their place.
export const GUIDANCE_MODES = [
  {
    key: 'guided',
    label: 'Step by step',
    blurb: 'Every explanation, example and hint, in order. Start here if the topic is new.',
  },
  {
    key: 'hints',
    label: 'Some guidance',
    blurb: 'The steps and their goals. Explanations and hints stay folded until you open them.',
  },
  {
    key: 'solo',
    label: 'On my own',
    blurb: 'Only the brief and the tasks. For when you know the topic and want to prove it.',
  },
];

export const DEFAULT_GUIDANCE = 'guided';

export function isGuidanceMode(value) {
  return GUIDANCE_MODES.some(mode => mode.key === value);
}

// Step kinds that teach rather than test. "On my own" leaves these out.
const TEACHING_KINDS = new Set(['learn', 'code']);

const KIND_LABEL = {
  brief: 'Brief',
  learn: 'Learn',
  code: 'Read',
  try: 'Run',
  check: 'Check',
  flag: 'Capture',
  build: 'Build',
  wrap: 'Wrap up',
};

export function kindLabel(kind) {
  return KIND_LABEL[kind] || 'Step';
}

// Every step of a module, in order. Keys are stable strings: they are stored
// in progress (see stepId) and in the learner's notes, so renaming one orphans
// what a learner already saved under it.
export function buildMissionSteps(mod) {
  if (!mod) return [];
  const steps = [{ key: 'brief', kind: 'brief', title: 'What you are here to do' }];

  (mod.theory || []).forEach((section, index) => {
    steps.push({ key: `learn-${index + 1}`, kind: 'learn', title: section.heading, section });
  });

  if (Array.isArray(mod.codeExamples) && mod.codeExamples.length > 0) {
    steps.push({
      key: 'code',
      kind: 'code',
      title: mod.codeExamples.length === 1 ? 'Read the worked example' : `Read the ${mod.codeExamples.length} worked examples`,
    });
  }
  if (typeof mod.playground === 'string' && mod.playground.length > 0) {
    steps.push({ key: 'try', kind: 'try', title: 'Run it yourself' });
  }
  if (Array.isArray(mod.practiceQuestions) && mod.practiceQuestions.length > 0) {
    steps.push({ key: 'check', kind: 'check', title: 'Check yourself' });
  }
  if (mod.challenge) {
    steps.push({ key: 'flag', kind: 'flag', title: mod.challenge.title || 'Capture the flag' });
  }
  if (mod.miniProject) {
    steps.push({ key: 'build', kind: 'build', title: mod.miniProject.title || 'Build it yourself' });
  }
  steps.push({ key: 'wrap', kind: 'wrap', title: 'Wrap up' });
  return steps;
}

// The steps a guidance mode actually shows.
export function visibleSteps(steps, mode) {
  if (mode !== 'solo') return steps;
  return steps.filter(step => !TEACHING_KINDS.has(step.kind));
}

// Steps that count towards "n of m done". The brief and the wrap-up frame the
// work; ticking them would only pad the number.
export function countableSteps(steps) {
  return steps.filter(step => step.kind !== 'brief' && step.kind !== 'wrap');
}

// Progress id for one step. Same `${owner}#${part}` shape reading progress
// uses, so it passes sanitizeProgress() in useProgress.js unchanged.
export function stepId(moduleId, stepKey) {
  return `${moduleId}#${stepKey}`;
}

export function levelLabel(difficulty) {
  const value = Number(difficulty) || 1;
  if (value <= 2) return 'Beginner';
  if (value === 3) return 'Intermediate';
  return 'Advanced';
}

export function timeLabel(estimatedHours) {
  const hours = Number(estimatedHours);
  if (!Number.isFinite(hours) || hours <= 0) return 'Self-paced';
  if (hours < 1) return `About ${Math.round(hours * 60)} min`;
  return `About ${hours} hour${hours === 1 ? '' : 's'}`;
}

// How a learner shows they finished, in the module's own terms.
export function proofLines(mod) {
  const lines = [];
  const questions = mod?.practiceQuestions?.length || 0;
  if (questions) lines.push(`Answer ${questions} practice question${questions === 1 ? '' : 's'}`);
  if (mod?.challenge) lines.push('Capture the flag');
  if (mod?.miniProject?.title) lines.push(`${mod.challenge ? 'Go further' : 'Build'}: ${mod.miniProject.title}`);
  return lines;
}

const NOTE_MAX = 600;

// Notes are the learner's own words; trimmed and capped before they are stored
// or written into the write-up.
export function cleanNote(value) {
  return typeof value === 'string' ? value.slice(0, NOTE_MAX) : '';
}
export const NOTE_MAX_CHARS = NOTE_MAX;

// The learner's record of a module, as Markdown they can keep, print or paste
// into a portfolio. Deliberately labelled a self-reported study record: Areté
// did not watch the work happen, and the file must not read like a certificate.
export function buildWriteup({ track, mod, steps, doneKeys = [], notes = {}, quizScore = null, completed = false, date = new Date() }) {
  if (!track || !mod) return '';
  const done = new Set(doneKeys);
  const total = track.modules?.length || 0;
  const day = date.toISOString().slice(0, 10);
  const out = [];

  out.push(`# ${mod.title}`);
  out.push('');
  out.push(`${track.label} path${total ? ` · Part ${mod.number} of ${total}` : ''} · ${levelLabel(mod.difficulty)} · ${timeLabel(mod.estimatedHours)}`);
  out.push('');
  out.push(`**Status:** ${completed ? 'Completed' : 'In progress'} · ${day}`);
  if (mod.subtitle) {
    out.push('');
    out.push(`> ${mod.subtitle}`);
  }

  const briefNote = cleanNote(notes.brief).trim();
  if (briefNote) {
    out.push('', '## Why I did this', '', briefNote);
  }

  out.push('', '## What I worked through', '');
  for (const step of countableSteps(steps)) {
    out.push(`- [${done.has(step.key) ? 'x' : ' '}] **${kindLabel(step.kind)}:** ${step.title}`);
    const note = cleanNote(notes[step.key]).trim();
    if (note) {
      for (const line of note.split('\n')) out.push(`  > ${line}`);
    }
  }

  const evidence = [];
  if (quizScore && Number.isFinite(quizScore.score) && Number.isFinite(quizScore.total)) {
    evidence.push(`Practice questions: ${quizScore.score} of ${quizScore.total}`);
  }
  if (mod.challenge) evidence.push(`Flag challenge: ${done.has('flag') ? 'captured' : 'not captured yet'}`);
  if (evidence.length) {
    out.push('', '## Evidence', '');
    for (const line of evidence) out.push(`- ${line}`);
  }

  const wrapNote = cleanNote(notes.wrap).trim();
  if (wrapNote) {
    out.push('', '## What I would tell someone starting this', '', wrapNote);
  }

  out.push('', '---', '', 'Self-reported study record written on Areté. It is the learner\'s own account of their work, not a certificate.');
  return out.join('\n') + '\n';
}
