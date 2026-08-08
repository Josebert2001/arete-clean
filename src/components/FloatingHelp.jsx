import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, X, MessageCircle, Mail, Bot, Send, ChevronLeft, Square } from 'lucide-react';
import { streamTutor } from '../utils/tutorStream';
import RichText from './RichText';

// Edit these to set the humans students can reach for each track.
// phone is in international format with no +, spaces, or dashes (used in wa.me link).
// email is optional — omit it to show WhatsApp only.
// Tracks without a mentor yet fall back to the AI Tutor (set phone to null).
const CONTACTS = [
  {
    track: 'Java',
    name: null,
    role: 'Mentor coming soon — ask the AI Tutor meanwhile',
    phone: null,
  },
  {
    track: 'C',
    name: 'Mally',
    role: 'C track mentor',
    phone: '2348146212376',
  },
  {
    track: 'Python',
    name: 'Edikan',
    role: 'Python track mentor',
    phone: '2348139576211',
  },
];

const MINI_SUGGESTED = [
  'Explain pointers in C',
  'What is the CIA triad?',
  '== vs .equals() in Java?',
  'What is Big-O notation?',
];

const HISTORY_LIMIT = 12;

const UNAVAILABLE_MESSAGE = 'AI Tutor is not available right now. Try the full page instead.';

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('help'); // 'help' | 'chat'
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your Areté tutor. Ask me anything about your courses, the programming tracks, or any concept you're studying." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [responding, setResponding] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const stickToBottom = useRef(true);
  const abortRef = useRef(null);

  // Abort any in-flight stream if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        setView('help');
        toggleRef.current?.focus();
      }
    }
    function onClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
        setView('help');
      }
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log && stickToBottom.current) log.scrollTop = log.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  }, [input]);

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
        signal: controller.signal,
        onChunk,
        onStatus: setStatus,
        unavailableMessage: UNAVAILABLE_MESSAGE,
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

  const closePanel = () => {
    setOpen(false);
    setView('help');
    toggleRef.current?.focus();
  };

  return (
    <div ref={panelRef} className="fixed bottom-3 right-3 z-50 print:hidden sm:bottom-5 sm:right-5">
      {open && (
        <div className="mb-3 w-[min(22rem,calc(100vw-1.5rem))] bg-paper border border-coffee-200 rounded-xl shadow-xl overflow-hidden">

          {view === 'help' ? (
            <>
              <div className="flex items-start justify-between px-4 py-3 border-b border-coffee-200 bg-cream/60">
                <div>
                  <h3 className="font-display font-bold text-ink text-base leading-tight">Need help?</h3>
                  <p className="text-xs text-coffee-700 mt-0.5">
                    Chat with the AI or reach a mentor.
                  </p>
                </div>
                <button
                  onClick={closePanel}
                  aria-label="Close help"
                  className="text-coffee-700 hover:text-ink p-1 -mr-1 -mt-1"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-4 py-3 border-b border-coffee-100">
                <button
                  onClick={() => setView('chat')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors text-sm font-medium"
                >
                  <Bot size={16} className="shrink-0" />
                  <div className="text-left">
                    <div>Ask AI Tutor</div>
                    <div className="text-[10px] text-coffee-300 font-normal">Instant answers on any course topic</div>
                  </div>
                </button>
              </div>

              <ul className="divide-y divide-coffee-100">
                {CONTACTS.map((c) => (
                  <li key={c.track} className="px-4 py-3">
                    <div className="min-w-0 mb-2">
                      <div className="font-display font-bold text-ink text-sm">{c.track} track</div>
                      <div className="text-xs text-coffee-700 truncate">
                        {c.name ? `${c.name} · ${c.role}` : c.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {c.phone ? (
                        <a
                          href={`https://wa.me/${c.phone}?text=${encodeURIComponent(
                            `Hi ${c.name}, I'm stuck on the ${c.track} track on Areté and need help.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ink text-cream text-xs font-medium hover:bg-coffee-700 transition-colors"
                        >
                          <MessageCircle size={14} />
                          WhatsApp
                        </a>
                      ) : (
                        <button
                          onClick={() => setView('chat')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ink text-cream text-xs font-medium hover:bg-coffee-700 transition-colors"
                        >
                          <Bot size={14} />
                          Ask AI Tutor
                        </button>
                      )}
                      {c.email && (
                        <a
                          href={`mailto:${c.email}?subject=${encodeURIComponent(`Areté ${c.track} track — need help`)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-coffee-300 text-ink text-xs font-medium hover:bg-coffee-100 transition-colors"
                        >
                          <Mail size={14} />
                          Email
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-4 py-2.5 text-[11px] text-coffee-600 bg-cream/40 border-t border-coffee-100">
                Replies usually within a day. For track-specific help, ask in your class group.
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-coffee-200 bg-cream/60">
                <button
                  onClick={() => setView('help')}
                  aria-label="Back to help options"
                  className="text-coffee-700 hover:text-ink p-1 -ml-1 shrink-0"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-ink text-cream flex items-center justify-center shrink-0">
                    <Bot size={13} />
                  </div>
                  <span className="font-display font-bold text-ink text-sm">AI Tutor</span>
                </div>
                <button
                  onClick={closePanel}
                  aria-label="Close"
                  className="text-coffee-700 hover:text-ink p-1 -mr-1 shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={logRef}
                onScroll={() => {
                  const log = logRef.current;
                  if (log) stickToBottom.current = log.scrollHeight - log.scrollTop - log.clientHeight < 40;
                }}
                className="h-72 overflow-y-auto px-3 py-2.5 bg-paper"
                role="log"
                aria-label="AI chat messages"
              >
                {messages.map((m, i) =>
                  m.role === 'user' ? (
                    <div key={i} className="flex items-baseline gap-2 pt-2">
                      <span
                        className="display-heading italic text-lg leading-none text-ember-500 select-none w-3.5 shrink-0 text-right"
                        aria-hidden
                      >
                        Q
                      </span>
                      <p className="font-display italic font-medium text-[15px] leading-snug text-ink whitespace-pre-wrap min-w-0">
                        {m.text}
                      </p>
                    </div>
                  ) : i === 0 ? (
                    // Canned greeting — a standfirst that opens the session, not an answer.
                    <div key={i} className="border-b border-coffee-200 pb-3">
                      <p className="font-display text-[13px] leading-relaxed text-coffee-700">
                        {m.text}
                      </p>
                    </div>
                  ) : (
                    <div key={i} className="pl-5 mt-2.5 border-b border-coffee-200 pb-3 mb-1">
                      <span
                        className={`block text-[9px] font-mono uppercase tracking-[0.15em] mb-1 ${
                          m.error ? 'text-rust' : 'text-coffee-500'
                        }`}
                      >
                        {m.error ? 'Interrupted' : 'Tutor'}
                      </span>
                      <div className={`text-xs leading-relaxed ${m.error ? 'text-rust' : 'text-ink'}`}>
                        <RichText text={m.text} />
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="pl-5 mt-2.5 flex items-baseline gap-2" aria-live="polite">
                    <span className="font-display italic text-xs text-coffee-500">{status || 'Thinking'}</span>
                    <span className="flex gap-1" aria-hidden>
                      <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '400ms' }} />
                      <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '800ms' }} />
                    </span>
                  </div>
                )}

                {messages.length <= 1 && (
                  <div className="pt-3.5">
                    <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-coffee-500 mb-2.5">
                      Try asking
                    </p>
                    <div className="space-y-2">
                      {MINI_SUGGESTED.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => send(s)}
                          aria-label={`Ask: ${s}`}
                          className="group flex w-full items-baseline gap-2 text-left"
                        >
                          <span className="font-mono text-[10px] text-coffee-400 group-hover:text-ember-500 transition-colors shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[11px] text-coffee-700 group-hover:text-ink border-b border-transparent group-hover:border-ember-500 transition-all pb-0.5">
                            {s}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-coffee-200 p-2.5 flex items-end gap-2">
                <span
                  className="display-heading italic text-lg leading-none text-ember-500 select-none w-3.5 shrink-0 text-right pb-2"
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
                  placeholder="Ask anything about your courses…"
                  aria-label="Ask the AI tutor"
                  className="flex-1 min-w-0 resize-none bg-transparent border-0 border-b border-coffee-300 focus:border-ember-500 px-1 py-1.5 font-display italic text-xs text-ink placeholder:text-coffee-400 outline-none transition-colors"
                />
                {responding ? (
                  <button
                    onClick={stop}
                    aria-label="Stop response"
                    className="p-2 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors shrink-0"
                  >
                    <Square size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => send()}
                    disabled={!input.trim()}
                    aria-label="Send message"
                    className="p-2 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send size={14} />
                  </button>
                )}
              </div>

              <div className="px-3 py-1.5 text-[10px] text-coffee-500 bg-cream/40 border-t border-coffee-100 text-center">
                For a full session, open the{' '}
                <Link
                  to="/tutor"
                  onClick={closePanel}
                  className="underline hover:text-ink"
                >
                  AI Tutor page
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      <button
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close help' : 'Open help'}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-ink px-3 py-3 text-cream shadow-lg transition-colors hover:bg-coffee-700 sm:px-4"
      >
        <HelpCircle size={18} />
        <span className="text-sm font-medium hidden sm:inline">Need help?</span>
      </button>
    </div>
  );
}
