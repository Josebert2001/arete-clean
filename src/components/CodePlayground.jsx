import { useState } from 'react';
import { Play, Loader2, Terminal, RotateCcw, Check, X, AlertTriangle } from 'lucide-react';
import { fetchJsonWithFallback } from '../utils/apiClient';

/*
  CodePlayground - editable code editor with a Run button.
  Supports Java, Python, and C. Calls /api/run (the Vercel serverless function)
  which proxies to the JDoodle Compiler API.

  Works without configuration too: if the API keys aren't set yet, the function
  returns a friendly "not connected" message instead of crashing.
*/

const LANGUAGE_LABELS = {
  java: 'Java',
  python: 'Python',
  c: 'C',
  cpp: 'C++',
};

const DAILY_LIMIT = 20;
const CREDITS_KEY = () => `jdoodle-credits-${new Date().toISOString().slice(0, 10)}`;

function loadCachedCredits() {
  try {
    const raw = localStorage.getItem(CREDITS_KEY());
    return raw !== null ? Number(raw) : null;
  } catch {
    return null;
  }
}

function saveCachedCredits(remaining) {
  try {
    localStorage.setItem(CREDITS_KEY(), String(remaining));
  } catch { /* storage unavailable */ }
}

export default function CodePlayground({ initialCode = '', language = 'java', stdin = '' }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(null);
  const [kind, setKind] = useState(null);
  const [meta, setMeta] = useState(null);
  const [running, setRunning] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState(() => loadCachedCredits());

  const run = async () => {
    if (!code.trim() || running) return;
    setRunning(true);
    setOutput(null);
    setKind(null);
    setMeta(null);

    try {
      const data = await fetchJsonWithFallback(
        '/api/run',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source_code: code, language, stdin }),
        },
        'The code runner needs the Vercel API routes. Run the app with `vercel dev` or deploy it to use this feature.'
      );

      if (data.notConfigured) {
        setOutput(data.output);
        setKind('not_configured');
      } else if (data.kind === 'limit' || data.responseStatus === 429) {
        setOutput(data.output || data.error || 'Daily run limit reached. Please try again later.');
        setKind('limit');
        setCreditsRemaining(0);
        saveCachedCredits(0);
      } else if (data.error) {
        setOutput(data.error + (data.detail ? `\n\n${data.detail}` : ''));
        setKind('runtime_error');
      } else {
        setOutput(data.output);
        setKind(data.kind);
        if (data.time || data.memory) {
          setMeta({ time: data.time, memory: data.memory, status: data.status });
        }
        if (data.creditsRemaining !== null && data.creditsRemaining !== undefined) {
          setCreditsRemaining(data.creditsRemaining);
          saveCachedCredits(data.creditsRemaining);
        }
      }
    } catch {
      setOutput('Could not reach the code runner. Check your connection and try again.');
      setKind('runtime_error');
    } finally {
      setRunning(false);
    }
  };

  const reset = () => {
    setCode(initialCode);
    setOutput(null);
    setKind(null);
    setMeta(null);
  };

  const lineCount = code.split('\n').length;

  // Tones come from the fixed code surface (see .code-surface in index.css),
  // not the theme palette: moss/rust invert with the theme and measured
  // 2.0-2.6:1 against this background in dark mode.
  const kindStyles = {
    success: { icon: Check, color: 'code-surface-ok', label: 'Success' },
    compile_error: { icon: X, color: 'code-surface-error', label: 'Compilation Error' },
    runtime_error: { icon: AlertTriangle, color: 'code-surface-error', label: 'Runtime Error' },
    empty: { icon: Terminal, color: 'code-surface-line', label: 'No output' },
    limit: { icon: AlertTriangle, color: 'code-surface-muted', label: 'Daily limit reached' },
    not_configured: { icon: AlertTriangle, color: 'code-surface-muted', label: 'Not connected yet' },
  };
  const ks = kind ? kindStyles[kind] || kindStyles.success : null;

  return (
    <div className="overflow-hidden rounded-xl border border-coffee-200">
      {/* Editor header */}
      <div className="code-surface flex flex-col gap-3 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <Terminal size={14} className="code-surface-line" />
          <span className="truncate text-xs font-mono uppercase tracking-wider code-surface-muted">
            {LANGUAGE_LABELS[language] || language} · try it yourself
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          {creditsRemaining !== null && (
            <span
              className={`text-xs font-mono ${
                creditsRemaining <= 3
                  ? 'code-surface-error'
                  : creditsRemaining <= 8
                  ? 'code-surface-muted'
                  : 'code-surface-line'
              }`}
              title={`Shared daily run limit: ${creditsRemaining} of ${DAILY_LIMIT} runs remaining today`}
            >
              {creditsRemaining}/{DAILY_LIMIT} runs left
            </span>
          )}
          <button
            onClick={reset}
            className="rounded p-1.5 code-surface-line transition-colors hover:text-[color:var(--syntax-plain)]"
            aria-label="Reset code"
            title="Reset code"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={run}
            disabled={running || creditsRemaining === 0}
            title={creditsRemaining === 0 ? 'Daily run limit reached — try again tomorrow' : 'Run code (Ctrl+Enter)'}
            className="inline-flex items-center gap-1.5 rounded-md bg-ember-500 px-3 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-ember-400 disabled:opacity-60"
          >
            {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            {running ? 'Running' : 'Run'}
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="code-surface flex flex-col sm:flex-row">
        {/* Line numbers */}
        <div
          className="hidden select-none py-4 pl-4 pr-3 text-right sm:block"
          style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', lineHeight: '1.6' }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="code-surface-line">{i + 1}</div>
          ))}
        </div>
        {/* Textarea */}
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              e.preventDefault();
              run();
            }
          }}
          spellCheck={false}
          aria-label={`${LANGUAGE_LABELS[language] || 'Code'} editor`}
          title="Ctrl+Enter to run"
          className="flex-1 resize-y bg-transparent px-4 py-4 text-sm outline-none sm:text-[0.8rem]"
          style={{ fontFamily: 'JetBrains Mono', lineHeight: '1.6', minHeight: '220px' }}
        />
      </div>

      {/* Output panel */}
      {(output !== null || running) && (
        <div className="code-surface border-t code-surface-edge">
          <div className="flex flex-col gap-2 border-b code-surface-edge px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs font-mono uppercase tracking-wider code-surface-line">Output</span>
            {ks && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${ks.color}`}>
                <ks.icon size={12} /> {ks.label}
                {meta?.time && <span className="ml-2 code-surface-line">{meta.time}s</span>}
              </span>
            )}
          </div>
          <pre
            className="overflow-x-auto px-4 py-3 text-sm whitespace-pre-wrap"
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.8rem',
              lineHeight: '1.6',
              color: kind === 'success' ? 'var(--syntax-str)'
                : kind === 'not_configured' || kind === 'limit' ? 'var(--syntax-num)'
                  : kind === 'compile_error' || kind === 'runtime_error' ? 'var(--syntax-err)'
                    : 'var(--syntax-plain)',
            }}
          >
            {running ? 'Compiling and running...' : output}
          </pre>
        </div>
      )}
    </div>
  );
}
