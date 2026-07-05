import { useState } from 'react';
import { Flag, CheckCircle2, Lightbulb, Terminal, ChevronRight } from 'lucide-react';
import CodeBlock from './CodeBlock';

// Renders a CTF-style flag challenge and validates the submitted flag entirely
// client-side: it SHA-256-hashes the trimmed input and compares to the stored
// challenge.flagHash. Only the hash is in the bundle, so the answer can't be
// read from source. No backend, no API cost.
//
// Web Crypto (crypto.subtle) needs a secure context — HTTPS in production,
// localhost in dev — both of which Arete runs in. We guard for its absence so
// the component degrades gracefully rather than throwing.

const SOLVED_STORE_KEY = 'arete-solved-flags-v1';

function readSolved() {
  try {
    const raw = localStorage.getItem(SOLVED_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistSolved(challengeId) {
  try {
    const set = new Set(readSolved());
    set.add(challengeId);
    localStorage.setItem(SOLVED_STORE_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage unavailable (private mode / disabled) — solved state just
    // won't persist across reloads. Not fatal.
  }
}

async function sha256Hex(text) {
  if (typeof crypto === 'undefined' || !crypto.subtle) return null;
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const KIND_LABEL = {
  inspect: 'Inspect',
  decode: 'Decode',
  crack: 'Crack',
  analyze: 'Analyse',
};

function MaterialBlock({ block }) {
  if (block.type === 'code') {
    return <CodeBlock code={block.content} language={block.language || 'text'} showLineNumbers={false} />;
  }

  if (block.type === 'table') {
    return (
      <div className="overflow-x-auto rounded-lg border border-coffee-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-coffee-50">
              {block.columns.map((col, i) => (
                <th key={i} className="text-left font-mono text-xs uppercase tracking-wide text-coffee-700 px-3 py-2 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-t border-coffee-200">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 font-mono text-xs text-ink whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 'terminal' and 'text' — a monospace transcript block.
  return (
    <div className="rounded-lg border border-coffee-200 bg-ink/95 overflow-x-auto">
      {block.type === 'terminal' && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-cream/10">
          <Terminal size={12} className="text-cream/50" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-cream/40">terminal</span>
        </div>
      )}
      <pre className="px-4 py-3 text-xs sm:text-sm text-cream/90 font-mono leading-relaxed whitespace-pre">
        {block.content}
      </pre>
    </div>
  );
}

export default function FlagChallenge({ challenge, moduleId, onSolve }) {
  const [solved, setSolved] = useState(() => readSolved().includes(moduleId));
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'checking' | 'wrong' | 'format'
  const [hintsShown, setHintsShown] = useState(0);
  const [checkError, setCheckError] = useState('');

  const kindLabel = KIND_LABEL[challenge.kind] || 'Challenge';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guess = value.trim();
    if (!guess) return;

    // Gentle nudge if it isn't even flag-shaped, rather than a blunt "wrong".
    if (!/^ARETE\{.*\}$/i.test(guess)) {
      setStatus('format');
      return;
    }

    setStatus('checking');
    setCheckError('');
    const hex = await sha256Hex(guess);
    if (hex === null) {
      setStatus('idle');
      setCheckError('Flag checking needs a secure context (HTTPS or localhost). It should work on the live site.');
      return;
    }

    if (hex === challenge.flagHash) {
      setSolved(true);
      persistSolved(moduleId);
      if (onSolve) onSolve();
    } else {
      setStatus('wrong');
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Brief */}
      <div className="bg-ink text-cream rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-ember-400 text-xs font-mono uppercase tracking-wider mb-3">
          <Flag size={14} /> {kindLabel} challenge
        </div>
        <h3 className="display-heading text-2xl mb-3">{challenge.title}</h3>
        <p className="text-cream/90 leading-relaxed">{challenge.brief}</p>
        {challenge.flagFormat && (
          <p className="text-xs font-mono text-cream/60 mt-4">
            Flag format: <span className="text-ember-400">{challenge.flagFormat}</span>
          </p>
        )}
      </div>

      {/* Material to work on */}
      <div className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-wider text-coffee-700">The evidence</p>
        {challenge.material.map((block, i) => (
          <MaterialBlock key={i} block={block} />
        ))}
      </div>

      {/* Hints */}
      <div className="bg-paper border border-coffee-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-display font-bold text-ink flex items-center gap-2">
            <Lightbulb size={17} className="text-coffee-500" /> Hints
          </h4>
          <span className="text-xs font-mono text-coffee-500">
            {hintsShown} / {challenge.hints.length} revealed
          </span>
        </div>

        {hintsShown === 0 ? (
          <p className="text-sm text-coffee-700">
            Try it yourself first. Reveal a hint only if you get stuck — that&rsquo;s how the skill sticks.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {challenge.hints.slice(0, hintsShown).map((hint, i) => (
              <li key={i} className="flex gap-3 text-sm text-coffee-700">
                <span className="font-mono text-coffee-500 flex-shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{hint}</span>
              </li>
            ))}
          </ul>
        )}

        {hintsShown < challenge.hints.length && (
          <button
            onClick={() => setHintsShown((n) => n + 1)}
            className="btn-ghost mt-4 text-sm"
          >
            <Lightbulb size={14} /> Reveal {hintsShown === 0 ? 'a hint' : 'another hint'}
          </button>
        )}
        {hintsShown >= challenge.hints.length && !solved && (
          <p className="text-xs text-coffee-500 mt-4">
            Still stuck after every hint? Ask the{' '}
            <a href="/tutor" className="underline hover:text-ink">AI Tutor</a> to walk you through the technique.
          </p>
        )}
      </div>

      {/* Flag submission / solved state */}
      {solved ? (
        <div className="bg-moss/10 border border-moss/30 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center gap-2 text-moss font-bold mb-3">
            <CheckCircle2 size={20} /> Flag captured!
          </div>
          <p className="text-sm text-coffee-800 leading-relaxed">
            <span className="font-bold text-ink">How it worked: </span>
            {challenge.writeup}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-paper border border-coffee-200 rounded-xl p-5">
          <label htmlFor="flag-input" className="block text-sm font-medium text-ink mb-2">
            Submit the flag
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="flag-input"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder={challenge.flagFormat || 'ARETE{...}'}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-coffee-200 bg-cream font-mono text-sm text-ink focus:border-ember-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'checking' || !value.trim()}
              className="btn-primary justify-center sm:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'checking' ? 'Checking…' : 'Submit'}
              <ChevronRight size={16} />
            </button>
          </div>

          <div aria-live="polite" className="mt-3 min-h-[1.25rem]">
            {status === 'wrong' && (
              <p className="text-sm text-rust">
                Not the right flag. Re-read the evidence, check every character (case matters), or reveal a hint.
              </p>
            )}
            {status === 'format' && (
              <p className="text-sm text-coffee-700">
                Flags look like <span className="font-mono text-ink">ARETE{'{'}...{'}'}</span> — include the wrapper.
              </p>
            )}
            {checkError && <p className="text-sm text-rust">{checkError}</p>}
          </div>
        </form>
      )}
    </div>
  );
}
