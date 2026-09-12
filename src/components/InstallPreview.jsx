import { AlertTriangle, ExternalLink, Terminal } from 'lucide-react';
import { tracks } from '../data/installGuides';

// What a crawler gets for "/install". The live page is a tab picker holding one
// track at a time behind useState; this renders all three at once, because a
// static file has no tabs and an answer engine asked "how do I set up GCC for
// NetBeans" should find the C steps in the same bytes as the Java ones.
//
// The ids match the fragment URLs in installHowToJsonLd(), so a HowToStep's
// `url` points at markup that actually exists in this file.
//
// No hooks, no router, no browser — see CoursePreview for why.

function CodeSample({ code }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-coffee-200 bg-cream p-4 text-xs leading-relaxed text-coffee-800">
      <code>{code}</code>
    </pre>
  );
}

export default function InstallPreview() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">
          One-time setup
        </p>
        <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-4">
          Install Java, Python and C
        </h1>
        <p className="text-coffee-800 leading-relaxed">
          The three toolchains University of Uyo computing courses use: JDK 17 with Apache NetBeans
          for the COS 211 and COS 221 Java labs, Anaconda with JupyterLab for Python, and GCC via
          MSYS2 for C. Each guide is three steps, ends with a program you run to prove the setup
          works, and lists the errors that actually come up.
        </p>
        <nav aria-label="Setup guides" className="mt-5 flex flex-wrap gap-2 text-sm">
          {tracks.map((t) => (
            <a
              key={t.key}
              href={`#${t.key}`}
              className="rounded-lg border border-coffee-200 px-3 py-1.5 text-coffee-700 hover:border-ember-500 hover:text-ember-500 transition-colors"
            >
              {t.title}
            </a>
          ))}
        </nav>
      </header>

      {tracks.map((track) => (
        <section key={track.key} id={track.key} className="mb-14">
          <h2 className="display-heading text-2xl text-ink mb-2">{track.title}</h2>
          <p className="text-sm text-coffee-700 leading-relaxed mb-6">{track.intro}</p>

          <ol className="space-y-6">
            {track.steps.map((step, si) => (
              <li
                key={step.title}
                id={`${track.key}-step-${si + 1}`}
                className="rounded-xl border border-coffee-200 bg-paper p-5 sm:p-6"
              >
                <h3 className="font-display text-lg font-bold text-ink mb-1">
                  Step {si + 1} — {step.title}
                </h3>
                <p className="text-sm text-coffee-700 leading-relaxed">{step.body}</p>

                {step.actions?.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {step.actions.map((a) => (
                      <li key={a.url}>
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-coffee-700 hover:text-ember-500"
                        >
                          {a.label} <ExternalLink size={12} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-coffee-700 leading-relaxed">
                  {step.checklist.map((item) => <li key={item}>{item}</li>)}
                </ul>

                {step.code && <CodeSample code={step.code} />}
              </li>
            ))}
          </ol>

          {track.troubleshooting?.length > 0 && (
            <div className="mt-6 rounded-xl border border-coffee-200 bg-cream p-5">
              <h3 className="font-display font-bold text-ink mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-rust" />
                {track.label} troubleshooting
              </h3>
              <ul className="space-y-2.5 text-sm text-coffee-700">
                {track.troubleshooting.map((t) => (
                  <li key={t.title} className="flex gap-2">
                    <Terminal size={14} className="shrink-0 mt-0.5 text-coffee-500" />
                    <span><b className="text-ink">{t.title}</b> — {t.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      <div className="border-t border-coffee-200 pt-8 text-center">
        <p className="text-sm text-coffee-700 mb-4">
          Once your toolchain runs, the Java, Python and C tracks pick up from here.
        </p>
        <a href="/signin" className="btn-primary text-sm">Sign in to Areté</a>
      </div>
    </div>
  );
}
