import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, User, Bot, ArrowRight } from 'lucide-react';
import { trackConfig } from '../data/trackConfig';
import { fetchJsonWithFallback } from '../utils/apiClient';

// Force the Coming Soon screen during local dev without removing the live
// chat. The server also signals "not configured" at runtime (see askAI below).
const DEMO_MODE = false;

// Focus options grouped by track — each value is a ready-to-send context label.
const FOCUS_GROUPS = Object.values(trackConfig).map(t => ({
  label: t.label,
  options: t.modules.map(m => ({
    key: `${t.slug}-${m.id}`,
    value: `${t.label} — Module ${String(m.number).padStart(2, '0')}: ${m.title}`,
  })),
}));

async function askAI(question, moduleContext) {
  return fetchJsonWithFallback(
    '/api/tutor',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, moduleContext }),
    },
    'The AI Tutor needs the Vercel API routes. Run the app with `vercel dev` or deploy it to use this feature.'
  );
}

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

export default function AITutor() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your Arete tutor. I know the full B.Sc. Cybersecurity curriculum — every course from 100L to 400L, all three programming tracks (Java, Python, C), cryptography, networking, ethical hacking, digital forensics, and more. Ask me anything. What are you working on?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
  const [comingSoon, setComingSoon] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const question = (text || input).trim();
    if (!question || loading) return;

    setMessages(m => [...m, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);

    try {
      const data = await askAI(question, selectedModule);
      if (data.notConfigured) {
        setComingSoon(true);
        return;
      }
      if (data.error) throw new Error(data.error);
      setMessages(m => [...m, { role: 'bot', text: data.answer }]);
    } catch (e) {
      const text = e?.message && e.message !== 'Request failed'
        ? e.message
        : 'Something went wrong. Please try again.';
      setMessages(m => [...m, { role: 'bot', text }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="display-heading text-5xl text-ink mb-3">AI Tutor</h1>
        <p className="text-lg text-coffee-700">
          Stuck on a concept or an error? Ask in plain English and get a clear explanation.
        </p>
      </div>

      {(DEMO_MODE || comingSoon) ? (
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
                <span className="font-mono text-coffee-400 shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="border-t border-coffee-200 pt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-coffee-700">In the meantime —</p>
              <Link to="/tracks" className="btn-ghost text-sm">
                Read the modules <ArrowRight size={14} />
              </Link>
            </div>
          </div>
      ) : (
        <>
          {/* Module context selector */}
          <div className="mb-4">
            <label className="text-xs font-medium text-coffee-700 block mb-1.5">Focus on a language or module (optional)</label>
            <select
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
              className="w-full bg-paper border border-coffee-200 rounded-lg px-3 py-2 text-sm text-ink focus:border-coffee-500 outline-none"
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
          </div>

          {/* Chat window */}
          <div className="bg-paper border border-coffee-200 rounded-xl overflow-hidden">
            <div className="h-[420px] overflow-y-auto p-5 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    m.role === 'user' ? 'bg-ember-500 text-cream' : 'bg-ink text-cream'
                  }`}>
                    {m.role === 'user' ? <User size={15} /> : <Bot size={15} />}
                  </div>
                  <div className={`max-w-[90%] sm:max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-ember-500 text-cream'
                      : 'bg-cream border border-coffee-200 text-ink'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ink text-cream flex items-center justify-center flex-shrink-0">
                    <Bot size={15} />
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
              <div ref={endRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {SUGGESTED.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    aria-label={`Ask: ${s}`}
                    className="text-xs bg-coffee-50 border border-coffee-200 rounded-full px-3 py-2 text-coffee-700 hover:bg-coffee-100 hover:text-ink hover:border-coffee-500 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-coffee-200 p-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about Java, Python, C, or a course concept..."
                aria-label="Ask a programming or CS question"
                className="flex-1 bg-paper border border-coffee-200 rounded-lg px-4 py-2.5 text-sm text-ink focus:border-coffee-500 outline-none"
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="btn-primary px-4 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
