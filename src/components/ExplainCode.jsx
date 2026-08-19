import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import RichText from './RichText';
import {
  canExplainCode,
  getCachedExplanation,
  requestCodeExplanation,
} from '../utils/explainCode';

// "Explain this code" — sits under a listing and asks /api/explainer for a
// plain-English walkthrough: what the program does, the important lines, what
// it prints, and the bugs it can see.
//
// Deliberately the same visual language as Simplify in LectureNotes (the ember
// spark, the pill, the coffee-50 result card), because to a student they are
// the same promise: "I don't understand this, say it another way". The label is
// what distinguishes them.
//
// Renders nothing at all when no model provider is configured, or when the
// snippet is too short to be worth a call — the AI features in this project
// degrade to absent, never to a button that errors.
export default function ExplainCode({
  code,
  language = 'python',
  ready,
  mode = 'walkthrough',
  label,
  hint,
  className = '',
}) {
  const [state, setState] = useState({ status: 'idle', text: '', error: '' });
  const abortRef = useRef(null);
  useEffect(() => () => abortRef.current?.abort(), []);

  if (!ready || !canExplainCode(code)) return null;

  const onExplain = async () => {
    if (state.status === 'done') {
      setState({ status: 'idle', text: '', error: '' });
      return;
    }
    const cached = getCachedExplanation(code, language, mode);
    if (cached) {
      setState({ status: 'done', text: cached, error: '' });
      return;
    }
    setState({ status: 'loading', text: '', error: '' });
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const data = await requestCodeExplanation({ code, language, mode, signal: controller.signal });
    if (controller.signal.aborted || data.aborted) return;
    if (data.explanation) {
      setState({ status: 'done', text: data.explanation, error: '' });
    } else {
      setState({ status: 'error', text: '', error: data.error || 'Failed to explain this code.' });
    }
  };

  return (
    <div className={`-mt-2 mb-4 ${className}`}>
      <button
        type="button"
        onClick={onExplain}
        disabled={state.status === 'loading'}
        className="inline-flex items-center gap-1.5 rounded-full border border-coffee-200 bg-paper px-2.5 py-1 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-60"
      >
        <Sparkles
          size={11}
          className={state.status === 'loading' ? 'animate-pulse text-ember-500' : 'text-ember-500'}
        />
        {state.status === 'loading' ? 'Reading the code…'
          : state.status === 'done' ? 'Hide explanation'
            : state.status === 'error' ? 'Retry'
              : label || 'Explain this code line by line'}
      </button>

      {/* Only while idle: once the explanation is on screen it speaks for
          itself, and the caveat would just push it down the page. */}
      {hint && state.status === 'idle' && (
        <p className="mt-1.5 text-xs text-coffee-600 leading-relaxed">{hint}</p>
      )}

      {state.status === 'error' && (
        <p className="mt-2 rounded-lg border border-rust/25 bg-rust/10 px-3 py-2 text-sm text-rust">
          {state.error}
        </p>
      )}

      {state.status === 'done' && (
        <div className="mt-3 bg-coffee-50 border border-coffee-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={13} className="text-ember-500 shrink-0" />
            <span className="text-xs font-mono font-bold text-coffee-600 uppercase tracking-wider">
              Line by line
            </span>
          </div>
          <div className="text-reading text-ink">
            <RichText text={state.text} />
          </div>
        </div>
      )}
    </div>
  );
}
