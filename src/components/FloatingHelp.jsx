import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, X, MessageCircle, Mail, Bot, Send, User, ChevronLeft } from 'lucide-react';
import { getAccessToken } from '../lib/supabase';
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

async function askAI(history, onChunk) {
  const token = await getAccessToken();
  let res;
  try {
    res = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages: history }),
    });
  } catch {
    return { error: 'Network error — check your connection and try again.' };
  }

  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => ({}));
    return { ...data, responseStatus: res.status };
  }

  if (!res.ok || !res.body || !contentType.includes('text/plain')) {
    return { error: 'AI Tutor is not available right now. Try the full page instead.' };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let answer = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      answer += decoder.decode(value, { stream: true });
      onChunk(answer);
    }
    answer += decoder.decode();
  } catch {
    // keep whatever arrived mid-stream
  }

  return answer.trim() ? { answer } : { error: 'No response received. Please try again.' };
}

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('help'); // 'help' | 'chat'
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your Arete tutor. Ask me anything about your cybersecurity courses, programming tracks, or any concept you're studying." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const stickToBottom = useRef(true);

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
    if (!question || loading) return;

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
    stickToBottom.current = true;

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
      const data = await askAI(history, onChunk);
      if (data.notConfigured || data.error) {
        throw new Error(data.error || 'AI Tutor is not available right now.');
      }
    } catch (e) {
      const errText = e?.message && e.message !== 'Request failed'
        ? e.message
        : 'Something went wrong. Please try again.';
      setMessages(m => [...m, { role: 'bot', text: errText, error: true }]);
    } finally {
      setLoading(false);
    }
  };

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
                            `Hi ${c.name}, I'm stuck on the ${c.track} track on Arete and need help.`
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
                          href={`mailto:${c.email}?subject=${encodeURIComponent(`Arete ${c.track} track — need help`)}`}
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
                className="h-72 overflow-y-auto p-3 space-y-3 bg-paper"
                role="log"
                aria-label="AI chat messages"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      m.role === 'user' ? 'bg-ember-500 text-cream' : 'bg-ink text-cream'
                    }`}>
                      {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`max-w-[85%] ${m.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`rounded-xl px-3 py-2 text-xs leading-relaxed text-left ${
                        m.role === 'user'
                          ? 'bg-ember-500 text-cream rounded-tr-sm whitespace-pre-wrap'
                          : m.error
                          ? 'bg-red-50 border border-red-200 text-red-700 rounded-tl-sm'
                          : 'bg-cream border border-coffee-200 text-ink rounded-tl-sm'
                      }`}>
                        {m.role === 'user' ? m.text : <RichText text={m.text} />}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-md bg-ink text-cream flex items-center justify-center shrink-0">
                      <Bot size={12} />
                    </div>
                    <div className="bg-cream border border-coffee-200 rounded-xl px-3 py-2 flex items-center gap-2">
                      <span className="text-xs text-coffee-500 italic">Thinking…</span>
                      <span className="flex gap-1">
                        <span className="w-1 h-1 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}

                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {MINI_SUGGESTED.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => send(s)}
                        className="text-[11px] bg-coffee-50 border border-coffee-200 rounded-full px-2.5 py-1 text-coffee-700 hover:bg-coffee-100 hover:text-ink hover:border-coffee-500 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-coffee-200 p-2.5 flex items-end gap-2">
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
                  className="flex-1 resize-none bg-paper border border-coffee-200 rounded-lg px-3 py-2 text-xs text-ink focus:border-coffee-500 outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="p-2 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={14} />
                </button>
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
