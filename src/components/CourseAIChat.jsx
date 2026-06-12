import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, ChevronDown, ChevronUp } from 'lucide-react';
import { getAccessToken } from '../lib/supabase';
import RichText from './RichText';

const HISTORY_LIMIT = 12;

async function askAI(history, moduleContext, onChunk) {
  const token = await getAccessToken();
  let res;
  try {
    res = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages: history, moduleContext }),
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
    return { error: 'AI Tutor is not available right now.' };
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
    // keep whatever arrived
  }

  return answer.trim() ? { answer } : { error: 'No response received. Please try again.' };
}

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
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const stickToBottom = useRef(true);

  const prompts = [
    `What are the key topics I must know for ${course.code}?`,
    course.topics[0] ? `Explain: ${course.topics[0]}` : 'What is this course about?',
    course.topics[2] ? `Explain: ${course.topics[2]}` : `Give me exam tips for ${course.code}`,
    `How does ${course.code} connect to cybersecurity?`,
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
      const data = await askAI(history, moduleContext, onChunk);
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
          {/* Message log */}
          <div
            ref={logRef}
            onScroll={() => {
              const log = logRef.current;
              if (log) stickToBottom.current = log.scrollHeight - log.scrollTop - log.clientHeight < 40;
            }}
            className="h-80 overflow-y-auto p-4 space-y-4 bg-paper"
            role="log"
            aria-label="AI chat messages"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-ember-500 text-cream' : 'bg-ink text-cream'
                }`}>
                  {m.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>
                <div className={`max-w-[88%] ${m.role === 'user' ? 'text-right' : ''}`}>
                  <span className={`block text-[10px] font-mono uppercase tracking-wider mb-1 ${
                    m.role === 'user' ? 'text-ember-500' : 'text-coffee-500'
                  }`}>
                    {m.role === 'user' ? 'You' : 'Tutor'}
                  </span>
                  <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed text-left ${
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
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-ink text-cream flex items-center justify-center shrink-0">
                  <Bot size={13} />
                </div>
                <div className="bg-cream border border-coffee-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
                  <span className="text-xs text-coffee-500 italic">Thinking…</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            {/* Suggested prompts */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {prompts.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-xs bg-coffee-50 border border-coffee-200 rounded-full px-3 py-1.5 text-coffee-700 hover:bg-coffee-100 hover:text-ink hover:border-coffee-500 transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-coffee-200 p-3 flex items-end gap-2.5 bg-cream/40">
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
              className="flex-1 resize-none bg-paper border border-coffee-200 rounded-lg px-4 py-2.5 text-sm text-ink focus:border-coffee-500 outline-none"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-lg bg-ink text-cream hover:bg-coffee-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
