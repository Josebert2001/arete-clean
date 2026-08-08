import { useState, useRef, useEffect } from 'react';
import { Bot, Send, ChevronDown, ChevronUp, Square } from 'lucide-react';
import { streamTutor } from '../utils/tutorStream';
import RichText from './RichText';

const HISTORY_LIMIT = 12;

export default function CourseAIChat({ course }) {
  const moduleContext = `${course.code} — ${course.title}`;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi! I'm your course assistant for ${course.code}. Ask me anything about ${course.title} — concepts, exam topics, definitions, or anything you're confused about while studying.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [responding, setResponding] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const stickToBottom = useRef(true);
  const abortRef = useRef(null);

  // Abort any in-flight stream if the component unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const prompts = [
    `What are the key topics I must know for ${course.code}?`,
    course.topics[0] ? `Explain: ${course.topics[0]}` : 'What is this course about?',
    course.topics[2] ? `Explain: ${course.topics[2]}` : `Give me exam tips for ${course.code}`,
    `How is ${course.code} applied in practice?`,
  ];

  useEffect(() => {
    const log = logRef.current;
    if (log && stickToBottom.current) log.scrollTop = log.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [input]);

  // Auto-focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const send = async (text) => {
    const question = (text || input).trim();
    if (!question || responding) return;

    const history = [
      ...messages.slice(1).filter(m => !m.error).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
      { role: 'user', content: question },
    ].slice(-HISTORY_LIMIT);

    setMessages(m => [...m, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);
    setStatus('');
    setResponding(true);
    stickToBottom.current = true;

    const controller = new AbortController();
    abortRef.current = controller;

    let streaming = false;
    const onChunk = (partial) => {
      if (!streaming) {
        streaming = true;
        setLoading(false);
        setMessages(m => [...m, { role: 'bot', text: partial }]);
      } else {
        setMessages(m => [...m.slice(0, -1), { ...m[m.length - 1], text: partial }]);
      }
    };

    try {
      const data = await streamTutor({
        messages: history,
        moduleContext,
        signal: controller.signal,
        onChunk,
        onStatus: setStatus,
      });
      if (data.aborted) return;          // user stopped — keep the partial answer
      if (data.notConfigured || data.error) {
        throw new Error(data.error || 'AI Tutor is not available right now.');
      }
      if (data.truncated) {
        setMessages(m => [...m, {
          role: 'bot',
          text: 'That answer was cut off — the AI hit an error mid-response. Send again to retry.',
          error: true,
        }]);
      }
    } catch (e) {
      const errText = e?.message && e.message !== 'Request failed'
        ? e.message
        : 'Something went wrong. Please try again.';
      setMessages(m => [...m, { role: 'bot', text: errText, error: true }]);
    } finally {
      setLoading(false);
      setStatus('');
      setResponding(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  return (
    <div className="border border-coffee-200 rounded-xl overflow-hidden bg-paper">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-coffee-50 transition-colors text-left"
        aria-expanded={open}
        aria-label={open ? 'Close AI course assistant' : 'Open AI course assistant'}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ink text-cream flex items-center justify-center shrink-0">
            <Bot size={16} />
          </div>
          <div>
            <div className="font-display font-bold text-ink text-sm leading-tight">
              Ask AI about {course.code}
            </div>
            <div className="text-xs text-coffee-600 mt-0.5">
              Get answers about {course.title} while you study
            </div>
          </div>
        </div>
        {open
          ? <ChevronUp size={18} className="text-coffee-500 shrink-0" />
          : <ChevronDown size={18} className="text-coffee-500 shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-coffee-200">
          {/* Transcript — an editorial Q&A, mirroring the full AI Tutor page:
              questions in Fraunces italic with an ember Q marker, answers as
              typeset prose under a "Tutor" label, a hairline closing each. */}
          <div
            ref={logRef}
            onScroll={() => {
              const log = logRef.current;
              if (log) stickToBottom.current = log.scrollHeight - log.scrollTop - log.clientHeight < 40;
            }}
            className="h-80 overflow-y-auto px-4 py-3 bg-paper"
            role="log"
            aria-label="AI chat messages"
          >
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="flex items-baseline gap-2.5 pt-2">
                  <span
                    className="display-heading italic text-xl leading-none text-ember-500 select-none w-4 shrink-0 text-right"
                    aria-hidden
                  >
                    Q
                  </span>
                  <p className="font-display italic font-medium text-base leading-snug text-ink whitespace-pre-wrap min-w-0">
                    {m.text}
                  </p>
                </div>
              ) : i === 0 ? (
                // Canned greeting — a standfirst that opens the session, not an answer.
                <div key={i} className="border-b border-coffee-200 pb-4">
                  <p className="font-display text-[15px] leading-relaxed text-coffee-700">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={i} className="pl-6 mt-3 border-b border-coffee-200 pb-4 mb-1">
                  <span
                    className={`block text-[10px] font-mono uppercase tracking-[0.15em] mb-1.5 ${
                      m.error ? 'text-rust' : 'text-coffee-500'
                    }`}
                  >
                    {m.error ? 'Interrupted' : 'Tutor'}
                  </span>
                  <div className={`text-sm leading-relaxed ${m.error ? 'text-rust' : 'text-ink'}`}>
                    <RichText text={m.text} />
                  </div>
                </div>
              )
            )}

            {loading && (
              <div className="pl-6 mt-3 flex items-baseline gap-2.5" aria-live="polite">
                <span className="font-display italic text-sm text-coffee-500">{status || 'Thinking'}</span>
                <span className="flex gap-1" aria-hidden>
                  <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '400ms' }} />
                  <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '800ms' }} />
                </span>
              </div>
            )}

            {/* Suggested prompts — the numbered opening list from the Tutor page */}
            {messages.length <= 1 && (
              <div className="pt-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-coffee-500 mb-3">
                  Try asking
                </p>
                <div className="space-y-2.5">
                  {prompts.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => send(s)}
                      aria-label={`Ask: ${s}`}
                      className="group flex w-full items-baseline gap-2.5 text-left"
                    >
                      <span className="font-mono text-[11px] text-coffee-400 group-hover:text-ember-500 transition-colors shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-coffee-700 group-hover:text-ink border-b border-transparent group-hover:border-ember-500 transition-all pb-0.5">
                        {s}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer — the next line of the transcript, matching the Tutor page */}
          <div className="border-t-2 border-coffee-200 p-3 flex items-end gap-2.5 bg-cream/40">
            <span
              className="display-heading italic text-xl leading-none text-ember-500 select-none w-4 shrink-0 text-right pb-2.5"
              aria-hidden
            >
              Q
            </span>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={`Ask about ${course.code}…`}
              aria-label="Ask the AI about this course"
              className="flex-1 min-w-0 resize-none bg-transparent border-0 border-b border-coffee-300 focus:border-ember-500 px-1 py-2 font-display italic text-sm text-ink placeholder:text-coffee-400 outline-none transition-colors"
            />
            {responding ? (
              <button
                onClick={stop}
                aria-label="Stop response"
                className="p-2.5 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors shrink-0"
              >
                <Square size={15} />
              </button>
            ) : (
              <button
                onClick={() => send()}
                disabled={!input.trim()}
                aria-label="Send message"
                className="p-2.5 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={15} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
