import { useState } from 'react';
import { Download, CheckCircle2, AlertTriangle, Terminal, ExternalLink, ImageOff } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { tracks } from '../data/installGuides';
import { usePageMeta } from '../utils/usePageTitle';
import { installDescription, installTitle } from '../data/publicCatalogue';

function StepImage({ src, alt, caption }) {
  const [errored, setErrored] = useState(false);
  if (!src) return null;

  // Missing screenshot: hide the figure for students; show a reminder of
  // where to drop the file only during local development.
  if (errored) {
    if (!import.meta.env.DEV) return null;
    return (
      <figure className="mt-4 border border-dashed border-coffee-300 rounded-lg bg-cream/40">
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 text-coffee-700 text-xs">
          <ImageOff size={22} className="mb-2 opacity-60" />
          <div className="font-mono">screenshot pending — drop {src} into public/install/ (dev-only note)</div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="mt-4 border border-coffee-200 rounded-lg overflow-hidden bg-cream/40">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className="block w-full h-auto"
      />
      {caption && (
        <figcaption className="text-xs text-coffee-700 px-3 py-2 border-t border-coffee-200 bg-paper">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function Install() {
  const [active, setActive] = useState('java');
  const [checked, setChecked] = useState({});

  const current = tracks.find(t => t.key === active);
  const trackChecked = checked[active] || [];
  // One title for the route, not one per tab: /install is prerendered now, and
  // usePageMeta's whole point is that a client render must not contradict the
  // bytes a crawler already read.
  usePageMeta(installTitle(), installDescription(), '/install');

  const toggle = (key) => {
    setChecked(prev => {
      const list = prev[active] || [];
      const next = list.includes(key) ? list.filter(x => x !== key) : [...list, key];
      return { ...prev, [active]: next };
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">{current.eyebrow}</div>
        <h1 className="display-heading text-5xl text-ink mb-4">{current.title}</h1>
        <p className="text-lg text-coffee-700">{current.intro}</p>
      </div>

      <div
        role="group"
        aria-label="Choose a language"
        className="inline-flex flex-wrap gap-1 bg-coffee-100 border border-coffee-200 rounded-xl p-1 mb-8"
      >
        {tracks.map(t => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              aria-pressed={isActive}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? t.accent : 'text-ink hover:bg-paper'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {current.steps.map((step, si) => (
          <div key={si} className="bg-paper border border-coffee-200 rounded-xl p-6 sm:p-7">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-9 h-9 rounded-lg bg-ink text-cream flex items-center justify-center font-display font-bold flex-shrink-0">
                {si + 1}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-ink mb-1">{step.title}</h2>
                <p className="text-sm text-coffee-700 leading-relaxed">{step.body}</p>
              </div>
            </div>

            {step.actions && (
              <div className="ml-10 sm:ml-[3.25rem] mb-4 flex flex-col gap-2">
                {step.actions.map((a, ai) => (
                  <a
                    key={ai}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-coffee-700 hover:text-ink bg-coffee-50 border border-coffee-200 rounded-lg px-3 py-2 w-fit"
                  >
                    <Download size={14} /> {a.label} <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            )}

            <div className="space-y-2 ml-10 sm:ml-[3.25rem]">
              {step.checklist.map((item, ci) => {
                const key = `${si}-${ci}`;
                const isChecked = trackChecked.includes(key);
                return (
                  <button
                    key={ci}
                    onClick={() => toggle(key)}
                    role="checkbox"
                    aria-checked={isChecked}
                    aria-label={item}
                    className="flex items-start gap-3 text-left w-full group"
                  >
                    {isChecked
                      ? <CheckCircle2 size={18} className="text-moss flex-shrink-0 mt-0.5" />
                      : <div className="w-[18px] h-[18px] rounded-full border-2 border-coffee-300 flex-shrink-0 mt-0.5 group-hover:border-coffee-500" />}
                    <span className={`checklist-item text-sm leading-relaxed ${isChecked ? 'text-coffee-400 line-through opacity-60' : 'text-coffee-700'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {step.code && (
              <div className="ml-10 sm:ml-[3.25rem]">
                <CodeBlock code={step.code} language={current.key} />
              </div>
            )}

            {step.image && (
              <div className="ml-10 sm:ml-[3.25rem]">
                <StepImage src={step.image} alt={step.title} caption={step.imageCaption} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-cream border border-coffee-200 rounded-xl p-6">
        <h3 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-rust" /> Troubleshooting
        </h3>
        <ul className="space-y-3 text-sm text-coffee-700">
          {current.troubleshooting.map((t, i) => (
            <li key={i} className="flex gap-2">
              <Terminal size={14} className="flex-shrink-0 mt-0.5 text-coffee-500" />
              <span><b className="text-ink">{t.title}</b> — {t.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
