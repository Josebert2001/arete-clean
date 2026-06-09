import { useState } from 'react';
import { Play, Loader2, Terminal, RotateCcw, Check, X, AlertTriangle } from 'lucide-react';
import { fetchJsonWithFallback } from '../utils/apiClient';

/*
  CodePlayground — editable code editor with a Run button.
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

export default function CodePlayground({ initialCode = '', language = 'java', stdin = '' }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(null);
  const [kind, setKind] = useState(null);
  const [meta, setMeta] = useState(null);
  const [running, setRunning] = useState(false);

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
      } else if (data.error) {
        setOutput(data.error + (data.detail ? `\n\n${data.detail}` : ''));
        setKind('runtime_error');
      } else {
        setOutput(data.output);
        setKind(data.kind);
        if (data.time || data.memory) {
          setMeta({ time: data.time, memory: data.memory, status: data.status });
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

  const kindStyles = {
    success: { icon: Check, color: 'text-moss', label: 'Success' },
    compile_error: { icon: X, color: 'text-rust', label: 'Compilation Error' },
    runtime_error: { icon: AlertTriangle, color: 'text-rust', label: 'Runtime Error' },
    empty: { icon: Terminal, color: 'text-coffee-400', label: 'No output' },
    limit: { icon: AlertTriangle, color: 'text-coffee-500', label: 'Daily limit reached' },
    not_configured: { icon: AlertTriangle, color: 'text-coffee-500', label: 'Not connected yet' },
  };
  const ks = kind ? kindStyles[kind] || kindStyles.success : null;

  return (
    <div className="rounded-xl overflow-hidden border border-coffee-200">
      {/* Editor header */}
      <div className="bg-ink px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-coffee-400" />
          <span className="text-xs font-mono text-coffee-300 uppercase tracking-wider">
            {LANGUAGE_LABELS[language] || language} · try it yourself
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="text-coffee-400 hover:text-cream p-1.5 rounded transition-colors"
            aria-label="Reset code"
            title="Reset code"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-1.5 bg-ember-500 hover:bg-ember-400 text-cream text-sm font-semibold px-3 py-1.5 rounded-md transition-colors disabled:opacity-60"
          >
            {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            {running ? 'Running' : 'Run'}
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="bg-ink flex">
        {/* Line numbers */}
        <div className="select-none py-4 pl-4 pr-3 text-right" style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', lineHeight: '1.6' }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="text-coffee-700">{i + 1}</div>
          ))}
        </div>
        {/* Textarea */}
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          aria-label={`${LANGUAGE_LABELS[language] || 'Code'} editor`}
          className="flex-1 bg-transparent text-cream py-4 pr-4 outline-none resize-y"
          style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', lineHeight: '1.6', minHeight: '180px' }}
        />
      </div>

      {/* Output panel */}
      {(output !== null || running) && (
        <div className="border-t border-coffee-700 bg-ink">
          <div className="px-4 py-2 flex items-center justify-between border-b border-coffee-800">
            <span className="text-xs font-mono uppercase tracking-wider text-coffee-400">Output</span>
            {ks && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${ks.color}`}>
                <ks.icon size={12} /> {ks.label}
                {meta?.time && <span className="text-coffee-500 ml-2">{meta.time}s</span>}
              </span>
            )}
          </div>
          <pre
            className="px-4 py-3 text-sm whitespace-pre-wrap overflow-x-auto"
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.8rem',
              lineHeight: '1.6',
              color: kind === 'success' ? 'var(--syntax-str)'
                   : kind === 'not_configured' || kind === 'limit' ? 'var(--syntax-num)'
                   : kind === 'compile_error' || kind === 'runtime_error' ? '#E8927C'
                   : 'var(--cream)',
            }}
          >
            {running ? 'Compiling and running...' : output}
          </pre>
        </div>
      )}
    </div>
  );
}
