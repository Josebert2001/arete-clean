import { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles, X, ExternalLink, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApiAvailability } from '../utils/apiClient';
import { explainSelection } from '../utils/researchSelection';
import RichText from './RichText';

const MIN_CHARS = 15;   // ignore stray clicks / single-word taps
const CARD_WIDTH = 420;

// Wraps a block of readable content. When a signed-in student highlights a
// passage, a floating "Explain this" button appears; clicking it researches the
// passage online and expands a plain-language explanation inline, just below the
// selection. Falls back to rendering children untouched when the feature is
// unavailable or the student isn't signed in.
export default function ExplainSelection({ context, children }) {
  const { user } = useAuth();
  const availability = useApiAvailability('/api/research');
  const enabled = Boolean(user) && availability === 'ready';

  const wrapRef = useRef(null);
  const abortRef = useRef(null);
  const [button, setButton] = useState(null); // { top, left, text }
  const [panel, setPanel] = useState(null);    // { top, left, status, explanation, sources, error }

  // Where to anchor an overlay, in coordinates relative to the wrapper's box.
  const anchorFor = useCallback((rect) => {
    const wrap = wrapRef.current;
    const wrapRect = wrap.getBoundingClientRect();
    const maxLeft = Math.max(0, wrap.clientWidth - CARD_WIDTH);
    return {
      top: rect.bottom - wrapRect.top + 6,
      left: Math.min(Math.max(0, rect.left - wrapRect.left), maxLeft),
    };
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!enabled) return;
    // Defer so the browser has finalized the selection.
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
      const text = sel.toString().trim();
      if (text.length < MIN_CHARS) return;

      const range = sel.getRangeAt(0);
      // Only react to selections that live inside this wrapper.
      if (!wrapRef.current?.contains(range.commonAncestorContainer)) return;

      const rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      setButton({ ...anchorFor(rect), text });
    }, 0);
  }, [enabled, anchorFor]);

  // Dismiss the floating button when the student clicks elsewhere.
  useEffect(() => {
    if (!button) return undefined;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setButton(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [button]);

  // Abort any in-flight lookup on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  const runLookup = async () => {
    if (!button) return;
    const { top, left, text } = button;
    setButton(null);
    setPanel({ top, left, status: 'loading' });

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const data = await explainSelection({ selection: text, context, signal: controller.signal });
    if (controller.signal.aborted || data.aborted) return;

    if (data.notConfigured || data.error) {
      setPanel({ top, left, status: 'error', error: data.error || 'Explain-this is unavailable right now.' });
      return;
    }
    setPanel({
      top,
      left,
      status: 'done',
      explanation: data.explanation || '',
      sources: Array.isArray(data.sources) ? data.sources : [],
    });
  };

  const closePanel = () => {
    abortRef.current?.abort();
    setPanel(null);
  };

  if (!enabled) return <>{children}</>;

  return (
    <div ref={wrapRef} className="relative">
      <div onMouseUp={handleMouseUp}>{children}</div>

      {button && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()} // keep the text selection alive
          onClick={runLookup}
          style={{ top: button.top, left: button.left }}
          className="absolute z-20 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream shadow-lg ring-1 ring-ink/10 transition-transform hover:scale-[1.03]"
          aria-label="Explain the selected text with web research"
        >
          <Sparkles size={13} className="text-ember-400" />
          Explain this
        </button>
      )}

      {panel && (
        <div
          style={{ top: panel.top, left: panel.left, width: CARD_WIDTH, maxWidth: '92vw' }}
          className="absolute z-20 rounded-xl border border-coffee-200 bg-paper shadow-xl"
          role="region"
          aria-label="Explanation"
        >
          <div className="flex items-center justify-between gap-2 border-b border-coffee-100 px-4 py-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-coffee-600">
              <Sparkles size={12} className="text-ember-500" />
              Explained
            </span>
            <button
              type="button"
              onClick={closePanel}
              className="text-coffee-400 transition-colors hover:text-ink"
              aria-label="Close explanation"
            >
              <X size={15} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-4 py-3.5">
            {panel.status === 'loading' && (
              <div className="flex items-center gap-2.5 py-2 text-sm text-coffee-500">
                <Globe size={15} className="animate-pulse text-coffee-400" />
                <span className="italic">Searching the web…</span>
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-coffee-400" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-coffee-400" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-coffee-400" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}

            {panel.status === 'error' && (
              <p className="rounded-lg border border-rust/25 bg-rust/10 px-3 py-2.5 text-sm text-rust">
                {panel.error}
              </p>
            )}

            {panel.status === 'done' && (
              <div className="text-sm text-ink">
                <RichText text={panel.explanation} />

                {panel.sources.length > 0 && (
                  <div className="mt-4 border-t border-coffee-100 pt-3">
                    <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-coffee-500">
                      Sources
                    </p>
                    <ul className="space-y-1.5">
                      {panel.sources.map((s, i) => (
                        <li key={i} className="flex gap-2 text-xs">
                          <ExternalLink size={12} className="mt-0.5 shrink-0 text-coffee-400" />
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-coffee-700 underline decoration-coffee-300 underline-offset-2 hover:text-ink"
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
