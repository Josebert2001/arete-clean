import { useState } from 'react';
import { Wand2, AlertCircle, Copy, Check } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

/*
 ============================================================================
  GROQ INTEGRATION POINT  —  Code Explainer
 ============================================================================
  Same setup as AITutor.jsx. Wire askExplainer() to your backend → Groq.

  SUGGESTED SYSTEM PROMPT:
  "You are a Java code explainer for beginner students. Given Java code, explain
   what it does in plain English, line by line where useful. Point out common
   mistakes and what the output would be. Be concise and encouraging."

  Send the user's pasted code as the user message.
 ============================================================================
*/

const DEMO_MODE = true;

async function askExplainer(code) {
  await new Promise(r => setTimeout(r, 1000));
  return `🔌 **Code Explainer is in demo mode.**

Once Groq is connected, paste any Java code here and get:
• A plain-English breakdown of what it does
• Line-by-line explanation of the tricky parts
• What the output will be
• Common mistakes to watch for

See the comment block in CodeExplainer.jsx to wire it up.`;
}

const SAMPLE = `public class Mystery {
    public static void main(String[] args) {
        int[] nums = {4, 8, 15, 16, 23, 42};
        int sum = 0;
        for (int n : nums) {
            sum += n;
        }
        System.out.println("Total: " + sum);
    }
}`;

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const explain = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setExplanation('');
    try {
      const result = await askExplainer(code);
      setExplanation(result);
    } catch {
      setExplanation('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => setCode(SAMPLE);

  const copyExplanation = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(explanation);
    } else {
      const el = document.createElement('textarea');
      el.value = explanation;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Understand any code</div>
        <h1 className="display-heading text-5xl text-ink mb-3">Code Explainer</h1>
        <p className="text-lg text-coffee-700">
          Paste confusing Java code and get a clear, plain-English breakdown of what it does.
        </p>
      </div>

      {DEMO_MODE && (
        <div className="flex items-center gap-2 text-sm bg-coffee-100 border border-coffee-200 rounded-lg px-4 py-3 mb-6 text-coffee-700">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>Demo mode — connect Groq to enable real explanations (see code comments).</span>
        </div>
      )}

      {/* Input */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-ink">Your Java code</label>
          <button onClick={loadSample} className="text-xs text-coffee-700 hover:text-ink underline">
            Load sample
          </button>
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Paste your Java code here..."
          aria-label="Paste your Java code for explanation"
          rows={12}
          className="w-full bg-ink text-cream font-mono text-sm rounded-xl p-4 outline-none border-2 border-transparent focus:border-ember-500 resize-y"
          style={{ lineHeight: 1.6 }}
        />
      </div>

      <button
        onClick={explain}
        disabled={loading || !code.trim()}
        aria-label="Explain this code"
        className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed mb-8"
      >
        {loading ? 'Analyzing...' : <><Wand2 size={16} /> Explain this code</>}
      </button>

      {/* Output */}
      {(explanation || loading) && (
        <div className="bg-paper border border-coffee-200 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-ink flex items-center gap-2">
              <Wand2 size={16} className="text-coffee-500" /> Explanation
            </h3>
            {explanation && !loading && (
              <button
                onClick={copyExplanation}
                className="text-xs text-coffee-700 hover:text-ink inline-flex items-center gap-1"
              >
                {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <p className="text-sm text-coffee-700 leading-relaxed whitespace-pre-wrap">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}
