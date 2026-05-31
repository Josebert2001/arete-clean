import { useState } from 'react';
import { Download, CheckCircle2, AlertTriangle, Terminal, ExternalLink } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function Install() {
  const [checked, setChecked] = useState([]);

  const toggle = (i) => {
    setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  };

  const steps = [
    {
      title: 'Download & Install the JDK',
      body: 'The JDK (Java Development Kit) contains everything you need to write and run Java.',
      actions: [
        { label: 'Go to oracle.com/java/technologies/downloads', url: 'https://www.oracle.com/java/technologies/downloads/' },
      ],
      checklist: [
        'Download JDK 17 (LTS — stable, widely used)',
        'Run the installer with default settings',
        'Note your install path (e.g. C:\\Program Files\\Java\\jdk-17)',
      ],
    },
    {
      title: 'Download & Install NetBeans IDE',
      body: 'NetBeans is the IDE used in COS 222 labs. It has a drag-and-drop GUI designer you will use later.',
      actions: [
        { label: 'Go to netbeans.apache.org/front/main/download', url: 'https://netbeans.apache.org/front/main/download/' },
      ],
      checklist: [
        'Download the latest Apache NetBeans',
        'During install, it auto-detects your JDK',
        'Complete with default settings',
      ],
    },
    {
      title: 'Verify Your Setup',
      body: 'Confirm everything works by running your first program.',
      checklist: [
        'Open NetBeans',
        'File → New Project → Java Application',
        'Name it "HelloWorld"',
        'Add the print line below to main()',
        'Press F6 to run',
        'See "Hello, World!" in the Output panel ✓',
      ],
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">One-time setup</div>
        <h1 className="display-heading text-5xl text-ink mb-4">Install Java</h1>
        <p className="text-lg text-coffee-700">
          Do this before Week 1. Three steps, about 20 minutes. Take your time and don't skip the verification.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, si) => (
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
              <div className="ml-13 mb-4 flex flex-col gap-2" style={{ marginLeft: '3.25rem' }}>
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

            <div className="space-y-2" style={{ marginLeft: '3.25rem' }}>
              {step.checklist.map((item, ci) => {
                const key = `${si}-${ci}`;
                const isChecked = checked.includes(key);
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
                    <span className={`text-sm leading-relaxed ${isChecked ? 'text-coffee-400 line-through' : 'text-coffee-700'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {step.code && (
              <div style={{ marginLeft: '3.25rem' }}>
                <CodeBlock code={step.code} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Troubleshooting */}
      <div className="mt-8 bg-cream border border-coffee-200 rounded-xl p-6">
        <h3 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-rust" /> Troubleshooting
        </h3>
        <ul className="space-y-3 text-sm text-coffee-700">
          <li className="flex gap-2">
            <Terminal size={14} className="flex-shrink-0 mt-0.5 text-coffee-500" />
            <span><b className="text-ink">"JDK not found"</b> — go to Tools → Java Platforms in NetBeans and manually point to your JDK folder.</span>
          </li>
          <li className="flex gap-2">
            <Terminal size={14} className="flex-shrink-0 mt-0.5 text-coffee-500" />
            <span><b className="text-ink">F6 not working</b> — right-click the project → Run instead.</span>
          </li>
          <li className="flex gap-2">
            <Terminal size={14} className="flex-shrink-0 mt-0.5 text-coffee-500" />
            <span><b className="text-ink">No laptop, only Android?</b> — ask in the class WhatsApp group for online compiler options to follow along.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
