import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, ArrowRight, Square, Plus } from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useApiAvailability } from '../utils/apiClient';
import { streamTutor } from '../utils/tutorStream';
import RichText from '../components/RichText';
import { usePageTitle } from '../utils/usePageTitle';

// Force the Coming Soon screen during local dev without removing the live
// chat. The server also signals "not configured" at runtime.
const DEMO_MODE = false;

const UNAVAILABLE_MESSAGE = 'The AI Tutor needs the Vercel API routes. Run the app with `vercel dev` or deploy it to use this feature.';

// Focus options grouped by track — each value is a ready-to-send context label.
const FOCUS_GROUPS = Object.values(trackMeta).map(t => ({
  label: t.label,
  options: t.moduleIndex.map(m => ({
    key: `${t.slug}-${m.id}`,
    value: `${t.label} — Module ${String(m.number).padStart(2, '0')}: ${m.title}`,
  })),
}));

// How many prior messages to send back as context (the model sees the rest
// of the conversation through them; older turns are dropped to save tokens).
const HISTORY_LIMIT = 12;

const SUGGESTED = [
  'What is the difference between == and .equals() in Java?',
  'Explain pointers in C with a simple example',
  'What is the CIA triad and why does it matter?',
  'How does RSA encryption work?',
  'What is the OWASP Top 10?',
  'How are Python lists different from dictionaries?',
  'Explain SQL injection with an example',
  'What is Big-O notation, in plain English?',
];

const GREETING = { role: 'bot', text: "Hi! I'm your Arete tutor. I know the full B.Sc. Cybersecurity curriculum — every course from 100L to 400L, all three programming tracks (Java, Python, C), cryptography, networking, ethical hacking, digital forensics, and more. Ask me anything. What are you working on?" };

// Persist the conversation for the browser session so a reload doesn't wipe it.
const CHAT_STORAGE_KEY = 'arete-tutor-chat-v1';

function loadStoredMessages() {
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch { /* sessionStorage unavailable or corrupt — fall back to greeting */ }
  return [GREETING];
}

export default function AITutor() {
  usePageTitle('AI Tutor');
  const [messages, setMessages] = useState(loadStoredMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [responding, setResponding] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [comingSoon, setComingSoon] = useState(false);
  const availability = useApiAvailability('/api/tutor');
  const logRef = useRef(null);
  const stickToBottom = useRef(true);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const showComingSoon = DEMO_MODE || comingSoon || availability === 'unavailable';

  // Abort any in-flight stream if the page unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  // Persist the conversation across reloads within the session.
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch { /* storage full or unavailable — non-fatal */ }
  }, [messages]);

  const newChat = () => {
    abortRef.current?.abort();
    setMessages([GREETING]);
    setInput('');
    try { sessionStorage.removeItem(CHAT_STORAGE_KEY); } catch { /* non-fatal */ }
  };

  // Follow the stream only while the reader is already at the bottom — once
  // they scroll up to re-read, stop yanking the view down on every chunk.
  const handleLogScroll = () => {
    const log = logRef.current;
    if (!log) return;
    stickToBottom.current = log.scrollHeight - log.scrollTop - log.clientHeight < 40;
  };

  useEffect(() => {
    const log = logRef.current;
    if (log && stickToBottom.current) log.scrollTop = log.scrollHeight;
  }, [messages, loading]);

  // Auto-grow the input up to ~5 lines so pasted errors stay visible.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
    // Only show a scrollbar once the cap is actually hit — sub-pixel rounding
    // otherwise paints a phantom thumb on the empty single-line input.
    el.style.overflowY = el.scrollHeight > 128 ? 'auto' : 'hidden';
  }, [input]);

  const send = async (text) => {
    const question = (text || input).trim();
    if (!question || responding) return;

    // Conversation history for the API — skip the canned greeting at index 0
    // and any error bubbles (they are UI feedback, not part of the dialogue).
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
        moduleContext: selectedModule,
        signal: controller.signal,
        onChunk,
        onStatus: setStatus,
        unavailableMessage: UNAVAILABLE_MESSAGE,
      });
      if (data.aborted) return;          // user stopped — keep the partial answer
      if (data.notConfigured) {
        setComingSoon(true);
        return;
      }
      if (data.error) throw new Error(data.error);
      if (data.truncated) {
        setMessages(m => [...m, {
          role: 'bot',
          text: 'That answer was cut off — the AI hit an error mid-response. Send again to retry.',
          error: true,
        }]);
      }
      // Streamed answer is already rendered via onChunk.
    } catch (e) {
      const text = e?.message && e.message !== 'Request failed'
        ? e.message
        : 'Something went wrong. Please try again.';
      setMessages(m => [...m, { role: 'bot', text, error: true }]);
    } finally {
      setLoading(false);
      setStatus('');
      setResponding(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  if (showComingSoon) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="display-heading text-5xl text-ink mb-3">AI Tutor</h1>
          <p className="text-lg text-coffee-700">
            Stuck on a concept or an error? Ask in plain English and get a clear explanation.
          </p>
        </div>
        <div className="bg-paper border border-coffee-200 rounded-2xl p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-pulse" />
            Coming Soon
          </div>
          <h2 className="display-heading text-3xl text-ink mb-4">Real answers. On their way.</h2>
          <p className="text-coffee-700 leading-relaxed mb-8 max-w-lg">
            The AI Tutor knows the complete B.Sc. Cybersecurity curriculum — every course from 100L to 400L, all three programming tracks, and the full module content. Ask about concepts, errors, exam topics, or how to approach a problem and get a precise, curriculum-aligned answer.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Explain any programming concept at your level',
              'Debug errors — paste the message and get a fix',
              'Understand why something works the way it does',
              'Get unstuck on mini projects without spoiling the answer',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-coffee-700">
                <span className="font-mono text-coffee-500 shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="border-t border-coffee-200 pt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-coffee-700">In the meantime —</p>
              <Link to="/lab" className="btn-ghost text-sm">
                Read the modules <ArrowRight size={14} />
              </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Chat owns the viewport below the sticky navbar (~69px mobile / ~77px
    // desktop): compact header row, transcript takes the remaining height,
    // composer pinned at the bottom. dvh keeps the composer visible above
    // mobile keyboards.
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6 py-4 h-[calc(100dvh-69px)] sm:h-[calc(100dvh-77px)]">
      {/* Compact header: title, focus selector, new chat */}
      <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-coffee-200 pb-3">
        <h1 className="display-heading text-2xl text-ink">AI Tutor</h1>
        <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.15em] text-coffee-500">
          a study transcript
        </span>
        <select
          value={selectedModule}
          onChange={e => setSelectedModule(e.target.value)}
          aria-label="Focus on a language or module (optional)"
          className="ml-auto min-w-0 max-w-[240px] flex-1 sm:flex-none bg-paper border border-coffee-200 rounded-lg px-2.5 py-1.5 text-xs text-ink focus:border-coffee-500 outline-none"
        >
          <option value="">General — any language or topic</option>
          {FOCUS_GROUPS.map(group => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map(o => (
                <option key={o.key} value={o.value}>{o.value}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {messages.length > 1 && (
          <button
            onClick={newChat}
            className="btn-ghost text-sm shrink-0"
            aria-label="Start a new chat"
          >
            <Plus size={15} /> New chat
          </button>
        )}
      </div>

      {/* Transcript — an editorial Q&A, not chat bubbles. Questions are set
          in Fraunces italic with an ember Q marker; answers read as typeset
          prose. A hairline rule closes each exchange. */}
      <div
        ref={logRef}
        onScroll={handleLogScroll}
        className="flex-1 min-h-0 overflow-y-auto py-6"
        role="log"
        aria-label="Chat messages"
      >
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex items-baseline gap-3 sm:gap-4 pt-2">
              <span
                className="display-heading italic text-2xl leading-none text-ember-500 select-none w-5 sm:w-6 shrink-0 text-right"
                aria-hidden
              >
                Q
              </span>
              <p className="font-display italic font-medium text-lg sm:text-xl leading-snug text-ink whitespace-pre-wrap min-w-0">
                {m.text}
              </p>
            </div>
          ) : i === 0 ? (
            // Canned greeting — a standfirst that opens the session, not an answer.
            <div key={i} className="border-b border-coffee-200 pb-6">
              <p className="font-display text-[17px] leading-relaxed text-coffee-700">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={i} className="pl-8 sm:pl-10 mt-4 border-b border-coffee-200 pb-6 mb-2">
              <span
                className={`block text-[10px] font-mono uppercase tracking-[0.15em] mb-2 ${
                  m.error ? 'text-rust' : 'text-coffee-500'
                }`}
              >
                {m.error ? 'Interrupted' : 'Tutor'}
              </span>
              <div className={`text-[15px] leading-relaxed ${m.error ? 'text-rust' : 'text-ink'}`}>
                <RichText text={m.text} />
              </div>
            </div>
          )
        )}

        {messages.length <= 1 && (
          <div className="pt-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-coffee-500 mb-4">
              Try asking
            </p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {SUGGESTED.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  aria-label={`Ask: ${s}`}
                  className="group flex items-baseline gap-3 text-left"
                >
                  <span className="font-mono text-[11px] text-coffee-400 group-hover:text-ember-500 transition-colors shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-coffee-700 group-hover:text-ink border-b border-transparent group-hover:border-ember-500 transition-all pb-0.5">
                    {s}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="pl-8 sm:pl-10 mt-4 flex items-baseline gap-2.5" aria-live="polite">
            <span className="font-display italic text-sm text-coffee-500">{status || 'Thinking'}</span>
            <span className="flex gap-1" aria-hidden>
              <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '400ms' }} />
              <span className="w-1 h-1 bg-coffee-400 rounded-full steam" style={{ animationDelay: '800ms' }} />
            </span>
          </div>
        )}
      </div>

      {/* Composer — the next line of the transcript. Textarea so pasted
          errors/code keep their line breaks; Enter sends, Shift+Enter inserts
          a newline. */}
      <div className="border-t-2 border-coffee-200 pt-3 pb-1">
        <div className="flex items-end gap-3 sm:gap-4">
          <span
            className="hidden sm:block display-heading italic text-2xl leading-none text-ember-500 select-none w-6 shrink-0 text-right pb-2"
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
            placeholder={availability === 'checking' ? 'Connecting to AI Tutor…' : 'Ask your next question…'}
            aria-label="Ask a programming or CS question"
            className="flex-1 min-w-0 resize-none bg-transparent border-0 border-b border-coffee-300 focus:border-ember-500 px-1 py-2 font-display italic text-base text-ink placeholder:text-coffee-400 outline-none transition-colors"
          />
          {responding ? (
            <button
              onClick={stop}
              aria-label="Stop response"
              className="btn-ghost shrink-0 justify-center px-4"
            >
              <Square size={15} /> Stop
            </button>
          ) : (
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              aria-label="Send message"
              className="btn-primary shrink-0 justify-center px-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          )}
        </div>
        <p className="hidden sm:block pt-1.5 pl-10 text-[10px] font-mono text-coffee-400">
          Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
