import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, AlertCircle } from 'lucide-react';
import { modules } from '../data/modules';

/*
 ============================================================================
  GROQ INTEGRATION POINT  —  Josebert, wire this up later
 ============================================================================
  1. Get a free API key from https://console.groq.com
  2. For production, DO NOT expose the key in frontend code.
     Create a small backend route (Node/Express) that proxies the request.
     Your stack already has Express — reuse it.

  3. Replace the askAI() function below with a real call. Example shape:

  async function askAI(question, moduleContext) {
    const res = await fetch('/api/tutor', {           // your backend route
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, moduleContext })
    });
    const data = await res.json();
    return data.answer;
  }

  4. On the backend, call Groq:

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },   // see below
      { role: 'user', content: question }
    ]
  });

  SUGGESTED SYSTEM PROMPT:
  "You are a friendly Java tutor for COS 222 students at the University of Uyo.
   Explain concepts simply, use Nigerian/student-relatable examples, always show
   short Java code where helpful, and never give full project solutions — guide
   them to figure it out. Keep answers concise."
 ============================================================================
*/

const DEMO_MODE = true; // set to false once Groq is wired up

async function askAI(question, moduleContext) {
  // ---- DEMO RESPONSE (remove once Groq is connected) ----
  await new Promise(r => setTimeout(r, 900));
  return `🔌 **AI Tutor is in demo mode.**\n\nOnce you wire up Groq (see the comment block in AITutor.jsx), I'll answer questions like:\n\n*"${question}"*\n\n...with real, module-aware explanations and code examples — tailored for COS 222 students.\n\nFor now, head to the **Modules** section for full theory and examples on this topic.`;
}

const SUGGESTED = [
  'What is the difference between == and .equals()?',
  'Explain OOP like I am 5 years old',
  'When should I use ArrayList vs array?',
  'Why does my program throw NullPointerException?',
];

export default function AITutor() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your Java tutor. Ask me anything about COS 222 — concepts, errors, syntax, or how to approach a mini project. What are you stuck on?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');
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
      const answer = await askAI(question, selectedModule);
      setMessages(m => [...m, { role: 'bot', text: answer }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'bot', text: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Ask anything</div>
        <h1 className="display-heading text-5xl text-ink mb-3">AI Tutor</h1>
        <p className="text-lg text-coffee-700">
          Stuck on a concept or an error? Ask in plain English and get a clear explanation.
        </p>
      </div>

      {DEMO_MODE && (
        <div className="flex items-center gap-2 text-sm bg-coffee-100 border border-coffee-200 rounded-lg px-4 py-3 mb-6 text-coffee-700">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>Demo mode — connect Groq to enable real answers (see code comments).</span>
        </div>
      )}

      {/* Module context selector */}
      <div className="mb-4">
        <label className="text-xs font-medium text-coffee-700 block mb-1.5">Focus on a module (optional)</label>
        <select
          value={selectedModule}
          onChange={e => setSelectedModule(e.target.value)}
          className="w-full bg-paper border border-coffee-200 rounded-lg px-3 py-2 text-sm text-ink focus:border-coffee-500 outline-none"
        >
          <option value="">General Java</option>
          {modules.map(m => (
            <option key={m.id} value={m.id}>Module {m.number}: {m.title}</option>
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
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
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
              <div className="bg-cream border border-coffee-200 rounded-xl px-4 py-3 flex gap-1.5">
                <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
                className="text-xs bg-coffee-50 border border-coffee-200 rounded-full px-3 py-1.5 text-coffee-700 hover:border-coffee-500 transition-colors"
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
            placeholder="Ask a Java question..."
            className="flex-1 bg-paper border border-coffee-200 rounded-lg px-4 py-2.5 text-sm text-ink focus:border-coffee-500 outline-none"
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="btn-primary px-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
