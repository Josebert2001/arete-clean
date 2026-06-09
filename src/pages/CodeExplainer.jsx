import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Copy, Check, ArrowRight } from 'lucide-react';
import { fetchJsonWithFallback } from '../utils/apiClient';

// Force the Coming Soon screen during local dev. The server also signals
// "not configured" at runtime — see askExplainer below.
const DEMO_MODE = false;

async function askExplainer(code, language) {
  return fetchJsonWithFallback(
    '/api/explainer',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    },
    'The Code Explainer needs the Vercel API routes. Run the app with `vercel dev` or deploy it to use this feature.'
  );
}

const LANGUAGES = [
  { value: '', label: 'Auto-detect' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
];

const SAMPLES = {
  java: `public class Mystery {
    public static void main(String[] args) {
        int[] nums = {4, 8, 15, 16, 23, 42};
        int sum = 0;
        for (int n : nums) {
            sum += n;
        }
        System.out.println("Total: " + sum);
    }
}`,
  python: `nums = [4, 8, 15, 16, 23, 42]
total = 0
for n in nums:
    total += n
print(f"Total: {total}")`,
  c: `#include <stdio.h>

int main(void) {
    int nums[] = {4, 8, 15, 16, 23, 42};
    int sum = 0;
    for (int i = 0; i < 6; i++) {
        sum += nums[i];
    }
    printf("Total: %d\\n", sum);
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    int nums[] = {4, 8, 15, 16, 23, 42};
    int sum = 0;
    for (int n : nums) {
        sum += n;
    }
    cout << "Total: " << sum << endl;
    return 0;
}`,
};

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  const explain = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setExplanation('');
    try {
      const data = await askExplainer(code, language);
      if (data.notConfigured) {
        setComingSoon(true);
        return;
      }
      if (data.error) throw new Error(data.error);
      setExplanation(data.explanation);
    } catch (e) {
      setExplanation(
        e?.message && e.message !== 'Request failed'
          ? e.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => setCode(SAMPLES[language] || SAMPLES.java);

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
      <div className="mb-8">
        <h1 className="display-heading text-5xl text-ink mb-3">Code Explainer</h1>
        <p className="text-lg text-coffee-700">
          Paste confusing Java, Python, C, or C++ code and get a clear, plain-English breakdown of what it does.
        </p>
      </div>

      {(DEMO_MODE || comingSoon) ? (
        <div className="bg-paper border border-coffee-200 rounded-2xl p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-pulse" />
            Coming Soon
          </div>
          <h2 className="display-heading text-3xl text-ink mb-4">Line-by-line. On its way.</h2>
          <p className="text-coffee-700 leading-relaxed mb-8 max-w-lg">
            Paste Java, Python, C, or C++ code and get a plain-English walkthrough of what it does — line by line where it matters, with notes on common mistakes and what the output will be.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Plain-English breakdown of every line that matters',
              'What the output will be before you run it',
              'Common mistakes hidden in the code',
              'Suggestions for cleaner alternatives',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-coffee-700">
                <span className="font-mono text-coffee-400 shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="border-t border-coffee-200 pt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-coffee-700">For now, read the annotated examples —</p>
            <Link to="/tracks" className="btn-ghost text-sm">
              Go to modules <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Input */}
          <div className="mb-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <label htmlFor="explainer-lang" className="text-sm font-medium text-ink">Your code</label>
                <select
                  id="explainer-lang"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  aria-label="Code language"
                  className="bg-paper border border-coffee-200 rounded-md px-2 py-1 text-xs text-ink focus:border-coffee-500 outline-none"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.value || 'auto'} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <button onClick={loadSample} className="text-xs text-coffee-700 hover:text-ink underline">
                Load sample
              </button>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Paste your code here..."
              aria-label="Paste your code for explanation"
              rows={8}
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
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-coffee-500 italic">Analyzing…</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-coffee-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              ) : (
                <p className="text-sm text-coffee-700 leading-relaxed whitespace-pre-wrap">{explanation}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
