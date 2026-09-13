// Why this file exists: every failure mode in speechText.js is silent.
// A voice reading `\dfrac{1}{3}` aloud does not throw — it says "backslash
// dee-frac open brace one" and wastes the student's time. Nothing downstream can
// detect that, so the assertions have to live here.
//
// The corpus guard at the bottom is the important one. The unit tests below pin
// individual behaviours; the guard is what catches a note authored next month in
// a shape nobody anticipated.

import { describe, it, expect } from 'vitest';
import {
  sectionToSpeech,
  topicToSpeechUnits,
  topicToSpeechText,
  speakableCharCount,
  canNarrate,
  skippedSummary,
  applyPronunciation,
  mathToSpeech,
  MIN_NARRATE_CHARS,
} from '../utils/speechText.js';
import { noteLoaders } from '../data/lectureNotes/index.js';

// Anything a synthesiser would read as punctuation-soup rather than words.
const RESIDUE = /[\\{}$^|]|```/;

describe('mathToSpeech', () => {
  it('converts the shapes these notes actually use', () => {
    expect(mathToSpeech('f(x)').speech).toBe('f of x');
    expect(mathToSpeech('x^2').speech).toBe('x squared');
    expect(mathToSpeech('x^3').speech).toBe('x cubed');
    expect(mathToSpeech('t_0').speech).toBe('t sub 0');
    expect(mathToSpeech('\\frac{dy}{dx}').speech).toBe('dy over dx');
    expect(mathToSpeech('\\sqrt{x}').speech).toBe('the square root of x');
    expect(mathToSpeech('a = b').speech).toBe('a equals b');
  });

  it('reports incompleteness instead of guessing', () => {
    // A construct it does not cover must never be half-read.
    expect(mathToSpeech('\\oint_C \\vec{F}').complete).toBe(false);
    // `|` has too many meanings here (absolute value, set-builder, stray pipe).
    expect(mathToSpeech('\\{x | x > 0\\}').complete).toBe(false);
  });

  it('marks covered expressions complete', () => {
    expect(mathToSpeech('f(x)').complete).toBe(true);
    expect(mathToSpeech('\\frac{1}{3} + \\frac{3}{4}').complete).toBe(true);
  });

  it('never returns LaTeX residue on the complete path', () => {
    for (const tex of ['f(x)', 'x^2', '\\frac{dy}{dx}', 'a = b + c', '\\sqrt{x^3}']) {
      const { speech, complete } = mathToSpeech(tex);
      if (complete) expect(speech).not.toMatch(RESIDUE);
    }
  });

  it('carries the outline index the renderer keys its sections on', () => {
    // The join for highlight-follows-voice. It must be the buildOutline index,
    // NOT the unit's position: a group that produces no speech is dropped from
    // the array, so the two part company as soon as a topic opens with a figure.
    const topic = {
      title: 'T',
      sections: [
        // A download link: the one type that is dropped in silence rather than
        // announced, so it takes an outline slot and produces no unit.
        { type: 'resource', href: '/notes.pdf', label: 'Handout' }, // outline 0
        { type: 'text', heading: 'First', text: 'Some prose.' },    // outline 1
        { type: 'text', heading: 'Second', text: 'More prose.' },   // outline 2
      ],
    };
    const units = topicToSpeechUnits(topic);
    expect(units.map((u) => u.heading)).toEqual(['First', 'Second']);
    expect(units.map((u) => u.outlineIndex)).toEqual([1, 2]);
  });

  it('converts maths inside a heading, not only inside the body', () => {
    // MTH 121 has seven of these. Leaving the `$` pairs in the heading let them
    // reach applyPronunciation, where "$x$." tripped the currency rule and the
    // student heard a bare "dollars" between the heading and the first sentence.
    const speech = (section) => sectionToSpeech(section).speech;

    expect(speech({ type: 'text', heading: 'Integrating powers of $x$', text: 'Recall it.' }))
      .toBe('Integrating powers of x. Recall it.');
    expect(speech({ type: 'text', heading: 'Continuity at $x = a$', text: 'All three hold.' }))
      .toBe('Continuity at x equals a. All three hold.');
    // A caption is authored prose on the same footing.
    expect(speech({ type: 'image', caption: 'The graph of $y = x^2$' }))
      .toBe('Figure. The graph of y equals x squared.');
  });

  it('names the whole exponent, not just a leading 2 or 3', () => {
    // "squared" is a reading of the entire exponent. Matching a bare digit
    // wherever it followed a caret split real corpus formulas down the middle:
    // PHY 128's I^2R and MTH 121's d^2y came out with the exponent fused to the
    // next symbol, and 2^256 read as "2 squared 56" while still reporting
    // complete — so the refusal path could not catch it.
    expect(mathToSpeech('I^2R').speech).toBe('I squared R');
    expect(mathToSpeech('d^2y').speech).toBe('d squared y');
    expect(mathToSpeech('P = I^2R').speech).toBe('P equals I squared R');
    expect(mathToSpeech('2^{24}').speech).toBe('2 to the power 24');
    expect(mathToSpeech('x^{2n}').speech).toBe('x to the power 2n');
    expect(mathToSpeech('e^{2x}').speech).toBe('e to the power 2x');
    // Still the plain readings for the plain cases.
    expect(mathToSpeech('E = mc^2').speech).toBe('E equals mc squared');
    expect(mathToSpeech('10^3').speech).toBe('10 cubed');
  });
});

describe('sectionToSpeech — announced, never read', () => {
  it('never emits a code listing body, and names language and length', () => {
    const r = sectionToSpeech({
      type: 'code', language: 'python', code: 'for x in y:\n    print(x)\n',
    });
    expect(r.speech).toContain('Code listing on screen');
    expect(r.speech).toContain('Python');
    expect(r.speech).toContain('2 lines');
    expect(r.speech).not.toContain('print');
    expect(r.skipped).toEqual([{ kind: 'code', label: expect.stringContaining('Code listing') }]);
  });

  it('calls program output what it is, not a listing', () => {
    // Same distinction ExplainCode makes — calling it code sends the student
    // looking for code that is not there.
    const r = sectionToSpeech({ type: 'code', language: 'output', code: 'Hello\nWorld' });
    expect(r.speech).toBe('Program output on screen.');
    expect(r.skipped[0].kind).toBe('output');
  });

  it('says "1 line", not "1 lines"', () => {
    expect(sectionToSpeech({ type: 'code', language: 'java', code: 'int x;' }).speech)
      .toBe('Code listing on screen — Java, 1 line.');
  });

  it('never emits section.tex raw for an uncoverable equation', () => {
    const r = sectionToSpeech({ type: 'math', tex: '\\oint_C \\vec{F} \\cdot d\\vec{r}' });
    expect(r.speech).not.toMatch(RESIDUE);
    expect(r.speech).toContain('An equation on screen');
    expect(r.skipped[0].kind).toBe('math');
  });

  it('speaks a simple equation rather than announcing it', () => {
    const r = sectionToSpeech({ type: 'math', tex: 'a^2 + b^2' });
    expect(r.speech).toContain('a squared plus b squared');
    expect(r.skipped).toEqual([]);
  });

  it('speaks table headers and never a pipe row', () => {
    const r = sectionToSpeech({
      type: 'table',
      headers: ['A', 'B', 'A and B'],
      rows: [['F', 'F', 'F'], ['T', 'T', 'T']],
    });
    expect(r.speech).toContain('A table on screen comparing A, B, A and B');
    expect(r.speech).not.toContain('|');
    expect(r.speech).not.toContain('F');
  });

  it('speaks a figure caption, and falls back to alt then to a bare marker', () => {
    expect(sectionToSpeech({ type: 'image', src: 'a.png', caption: 'The OSI model' }).speech)
      .toContain('Figure. The OSI model');
    expect(sectionToSpeech({ type: 'image', src: 'a.png', alt: 'A router' }).speech)
      .toContain('Figure. A router');
    expect(sectionToSpeech({ type: 'image', src: 'a.png' }).speech)
      .toBe('A figure on screen.');
  });

  it('announces the interactive calculator rather than skipping it silently', () => {
    const r = sectionToSpeech({ type: 'mosca', heading: 'MOSCA' });
    expect(r.speech).toContain('An interactive calculator on screen');
  });

  it('drops a resource link with nothing to announce', () => {
    const r = sectionToSpeech({ type: 'resource', href: '/x.pdf', label: 'Slides' });
    expect(r).toEqual({ speech: '', prose: '', skipped: [] });
  });

  it('gives every skipped entry a spoken label — no silent drops', () => {
    const sections = [
      { type: 'code', language: 'java', code: 'x' },
      { type: 'math', tex: '\\oint x' },
      { type: 'table', headers: ['A'], rows: [['1']] },
      { type: 'image', src: 'a.png' },
      { type: 'mosca' },
    ];
    for (const s of sections) {
      for (const skip of sectionToSpeech(s).skipped) {
        expect(skip.label).toBeTruthy();
        expect(sectionToSpeech(s).speech).toContain(skip.label);
      }
    }
  });
});

describe('sectionToSpeech — spoken types', () => {
  it('converts inline maths inside ordinary prose', () => {
    const r = sectionToSpeech({
      type: 'text',
      text: 'If $y$ is a function of $x$, the derivative of $y$ with respect to $x$ is a rate.',
    });
    expect(r.speech).not.toMatch(RESIDUE);
    expect(r.speech).toContain('If y is a function of x');
  });

  it('announces an inline expression it cannot read, and records the skip', () => {
    const r = sectionToSpeech({ type: 'text', text: 'Consider $\\oint_C \\vec{F}$ here.' });
    expect(r.speech).toContain('an expression on screen');
    expect(r.speech).not.toMatch(RESIDUE);
    expect(r.skipped).toEqual([{ kind: 'math', label: 'an expression on screen' }]);
  });

  it('turns a termlist into "Term. Definition." so the voice pauses', () => {
    const r = sectionToSpeech({
      type: 'termlist',
      items: [{ term: 'Firewall', def: 'Filters traffic' }, { term: 'Router' }],
    });
    expect(r.speech).toContain('Firewall. Filters traffic.');
    expect(r.speech).toContain('Router');
  });

  it('prefixes a note so the change of register is audible', () => {
    expect(sectionToSpeech({ type: 'note', text: 'Watch the order.' }).speech)
      .toBe('Note. Watch the order.');
  });

  it('numbers case-study tasks and accepts both the title and heading shapes', () => {
    const fromNotes = sectionToSpeech({ type: 'casestudy', title: 'Breach', tasks: ['Assess', 'Report'] });
    expect(fromNotes.speech).toContain('Task 1. Assess');
    expect(fromNotes.speech).toContain('Task 2. Report');
    // The four inline-note courses key it as `heading` instead.
    expect(sectionToSpeech({ type: 'casestudy', heading: 'Breach', prompt: 'What now?' }).speech)
      .toContain('Breach');
  });

  it('labels both halves of a proscons block', () => {
    const r = sectionToSpeech({ type: 'proscons', advantages: ['Fast'], disadvantages: ['Costly'] });
    expect(r.speech).toContain('Advantages. Fast.');
    expect(r.speech).toContain('Disadvantages. Costly.');
  });
});

describe('applyPronunciation', () => {
  it('spells out this curriculum\'s acronyms', () => {
    expect(applyPronunciation('the OSI model')).toBe('the O S I model');
    expect(applyPronunciation('an SQL injection')).toBe('an S Q L injection');
    expect(applyPronunciation('TCP/IP')).toBe('T C P I P');
  });

  it('does not mangle a word that merely contains an acronym', () => {
    // The regression the \b anchors exist for.
    expect(applyPronunciation('MACROS and Mac')).toBe('MACROS and Mac');
    expect(applyPronunciation('HTTPS')).toBe('H T T P S');
  });

  it('expands abbreviations a voice reads wrongly', () => {
    expect(applyPronunciation('e.g. this')).toContain('for example');
    expect(applyPronunciation('i.e. that')).toContain('that is');
    expect(applyPronunciation('A, B, etc.')).toContain('and so on');
  });

  it('reads currency as money, not as a maths delimiter', () => {
    expect(applyPronunciation('a loss of $500,000')).toBe('a loss of 500,000 dollars');
    expect(applyPronunciation('$5 million')).toBe('5 million dollars');
  });

  it('reads the abbreviated scales the notes actually use', () => {
    // cyb122.js writes "$3.4M" and "$234K" far more often than it spells the
    // scale out, and knowing only the words stranded the letter on the wrong
    // side of the unit — "3.4 dollarsM".
    expect(applyPronunciation('for $3.4M')).toBe('for 3.4 million dollars');
    expect(applyPronunciation('$234K per respondent')).toBe('234 thousand dollars per respondent');
    expect(applyPronunciation('$1.2bn')).toBe('1.2 billion dollars');
  });

  it('does not read an ordinary word as a scale, or eat the space before it', () => {
    expect(applyPronunciation('$40 billed monthly')).toBe('40 dollars billed monthly');
    expect(applyPronunciation('$25 Metres away')).toBe('25 dollars Metres away');
  });

  it('needs a digit before it will say "dollars" at all', () => {
    // `[\d,.]+` also matched a lone "." or ",", so any unbalanced `$` followed
    // by punctuation spoke the word "dollars" attached to nothing.
    expect(applyPronunciation('the $ sign.')).toBe('the sign.');
    expect(applyPronunciation('cost $.')).toBe('cost.');
    expect(applyPronunciation('powers of $x$.')).toBe('powers of x.');
  });

  it('strips markdown that would otherwise be read aloud', () => {
    expect(applyPronunciation('a **bold** and `code` word')).toBe('a bold and code word');
  });

  it('drops structural leftovers rather than speaking them', () => {
    // Prose that DISCUSSES a symbol keeps its meaning in the words around it.
    expect(applyPronunciation('the curly braces {')).toBe('the curly braces');
    // The emptied bracket pair goes too, rather than being read as "open close".
    expect(applyPronunciation('the currency symbol ($)')).toBe('the currency symbol');
    // Escape sequences are prose in COS 221's Java String API topic.
    expect(applyPronunciation('use \\\\ to escape, and \\t for a tab'))
      .toBe('use to escape, and for a tab');
  });
});

describe('topicToSpeechUnits', () => {
  const topic = {
    title: 'Networking',
    sections: [
      { type: 'text', heading: 'Intro', text: 'Networks connect computers.' },
      { type: 'code', language: 'java', code: 'a;\nb;' },
      { type: 'text', heading: 'Later', text: 'They use protocols.' },
    ],
  };

  it('produces one unit per heading group, in buildOutline order', () => {
    const units = topicToSpeechUnits(topic);
    expect(units.map((u) => u.heading)).toEqual(['Intro', 'Later']);
  });

  it('keeps a skipped section inside the unit it belongs to', () => {
    const [first] = topicToSpeechUnits(topic);
    expect(first.skipped).toHaveLength(1);
    expect(first.speech).toContain('Code listing on screen');
  });

  it('counts body prose only — not headings, not markers', () => {
    const [first] = topicToSpeechUnits(topic);
    expect(first.proseChars).toBe('Networks connect computers.'.length);
    expect(first.charCount).toBeGreaterThan(first.proseChars);
  });

  it('content-addresses each unit so pre-rendered audio invalidates on an edit', () => {
    const a = topicToSpeechUnits(topic)[0].hash;
    const edited = structuredClone(topic);
    edited.sections[0].text = 'Networks connect machines.';
    expect(topicToSpeechUnits(edited)[0].hash).not.toBe(a);
    // …and is stable when nothing changed.
    expect(topicToSpeechUnits(topic)[0].hash).toBe(a);
  });

  it('drops a unit that produced no speech instead of playing silence', () => {
    const units = topicToSpeechUnits({
      sections: [{ type: 'resource', href: '/a.pdf' }, { type: 'text', text: 'Real content.' }],
    });
    expect(units).toHaveLength(1);
  });

  it('estimates a duration', () => {
    expect(topicToSpeechUnits(topic)[0].estimatedSeconds).toBeGreaterThan(0);
  });
});

describe('canNarrate', () => {
  const prose = (n) => ({ sections: [{ type: 'text', text: 'word '.repeat(n) }] });

  it('rejects a topic below the floor and accepts one above it', () => {
    expect(canNarrate(prose(10))).toBe(false);
    expect(canNarrate(prose(200))).toBe(true);
    expect(speakableCharCount(prose(200))).toBeGreaterThanOrEqual(MIN_NARRATE_CHARS);
  });

  it('is not fooled by a topic made almost entirely of listings', () => {
    // The defect the floor exists for: markers would otherwise carry it over.
    const listings = {
      sections: Array.from({ length: 12 }, () => ({
        type: 'code', language: 'python', code: 'x = 1\ny = 2\nprint(x + y)',
      })).concat({ type: 'text', text: 'Try these.' }),
    };
    expect(topicToSpeechText(listings).length).toBeGreaterThan(MIN_NARRATE_CHARS);
    expect(canNarrate(listings)).toBe(false);
  });

  it('handles an empty or malformed topic', () => {
    expect(canNarrate(null)).toBe(false);
    expect(canNarrate({})).toBe(false);
    expect(canNarrate({ sections: [] })).toBe(false);
  });
});

describe('skippedSummary', () => {
  it('counts skips by kind for the "what you\'ll miss" caption', () => {
    expect(skippedSummary({
      sections: [
        { type: 'text', text: 'Real prose here to anchor the unit.' },
        { type: 'code', language: 'java', code: 'a;' },
        { type: 'code', language: 'java', code: 'b;' },
        { type: 'table', headers: ['A'], rows: [['1']] },
      ],
    })).toEqual({ code: 2, table: 1 });
  });
});

// ── The guard ───────────────────────────────────────────────────────────────
// Every real topic, end to end. This is what catches a note authored later in a
// shape none of the cases above anticipated — which is exactly how 205 sections
// of inline $...$ maths went unnoticed until the corpus was run through.

describe('the real corpus', () => {
  it('never speaks LaTeX, a code fence, a pipe row or a stray brace', async () => {
    const offenders = [];

    for (const [key, load] of Object.entries(noteLoaders)) {
      for (const topic of await load()) {
        const speech = topicToSpeechText(topic);
        if (RESIDUE.test(speech)) {
          offenders.push(`${key} — ${topic.title}: ${JSON.stringify(speech.match(RESIDUE)?.[0])}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  }, 30_000);

  it('offers narration for the great majority of topics, and refuses the listing-only ones', async () => {
    let total = 0;
    const refused = [];

    for (const [key, load] of Object.entries(noteLoaders)) {
      for (const topic of await load()) {
        total += 1;
        if (!canNarrate(topic)) refused.push(`${key} — ${topic.title}`);
      }
    }

    expect(total).toBeGreaterThan(100);
    // Five COS 121 practicals are prose-thin wrappers around their listings.
    // A number creeping up here means the floor or the prose count has drifted.
    expect(refused.length).toBeLessThanOrEqual(8);
    expect(refused.every((r) => r.startsWith('cos121'))).toBe(true);
  }, 30_000);
});
