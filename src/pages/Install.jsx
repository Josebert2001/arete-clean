import { useState } from 'react';
import { Download, CheckCircle2, AlertTriangle, Terminal, ExternalLink, ImageOff } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

function StepImage({ src, alt, caption }) {
  const [errored, setErrored] = useState(false);
  if (!src) return null;
  return (
    <figure className="mt-4 border border-coffee-200 rounded-lg overflow-hidden bg-cream/40">
      {errored ? (
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 text-coffee-700 text-xs">
          <ImageOff size={22} className="mb-2 opacity-60" />
          <div className="font-mono">screenshot pending — drop {src} into public/install/</div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="block w-full h-auto"
        />
      )}
      {caption && (
        <figcaption className="text-xs text-coffee-700 px-3 py-2 border-t border-coffee-200 bg-paper">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const tracks = [
  {
    key: 'java',
    label: 'Java',
    accent: 'bg-ink text-cream',
    eyebrow: 'One-time setup',
    title: 'Install Java',
    intro: "Do this before Week 1. Three steps, about 20 minutes. Take your time and don't skip the verification.",
    steps: [
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
        image: '/install/java-jdk-download.png',
        imageCaption: 'The Oracle JDK download page. Pick JDK 17 → your OS.',
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
        image: '/install/java-netbeans-download.png',
        imageCaption: 'Apache NetBeans download page — pick the latest stable release.',
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
          'See "Hello, World!" in the Output panel',
        ],
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        image: '/install/java-hello-run.png',
        imageCaption: 'NetBeans Output panel showing "Hello, World!" — that means your setup works.',
      },
    ],
    troubleshooting: [
      { title: '"JDK not found"', text: 'go to Tools → Java Platforms in NetBeans and manually point to your JDK folder.' },
      { title: 'F6 not working', text: 'right-click the project → Run instead.' },
      { title: 'No laptop, only Android?', text: 'ask in the class WhatsApp group for online compiler options to follow along.' },
    ],
  },
  {
    key: 'python',
    label: 'Python',
    accent: 'bg-moss text-cream',
    eyebrow: 'One-time setup',
    title: 'Install Python + JupyterLab',
    intro: 'You will run all Python lessons inside JupyterLab notebooks. The easiest path is to install Anaconda — it bundles Python, Jupyter, and the data libraries (NumPy, pandas, matplotlib) in one installer.',
    steps: [
      {
        title: 'Download & Install Anaconda',
        body: 'Anaconda is a free Python distribution. It ships with JupyterLab, Jupyter Notebook, and ~250 scientific packages pre-installed. ~700 MB download.',
        actions: [
          { label: 'Go to anaconda.com/download', url: 'https://www.anaconda.com/download' },
        ],
        checklist: [
          'Pick the installer for your OS (Windows / macOS / Linux)',
          'Choose the 64-bit Python 3.x graphical installer',
          'Run the installer with default settings',
          'On Windows, leave "Register Anaconda as my default Python" checked',
          'Skip the "Add to PATH" option — Anaconda warns against it; use Anaconda Prompt instead',
        ],
        image: '/install/python-anaconda-download.png',
        imageCaption: 'Anaconda download page — grab the Python 3.x 64-bit graphical installer.',
      },
      {
        title: 'Launch JupyterLab',
        body: 'JupyterLab is the modern notebook interface. You can also use the classic Jupyter Notebook — both come with Anaconda.',
        checklist: [
          'Open Anaconda Navigator from your Start menu / Applications',
          'On the Home tab, find the JupyterLab tile and click Launch',
          'JupyterLab opens in your browser at http://localhost:8888',
          'Alternative: open Anaconda Prompt and run the command below',
        ],
        code: `# From Anaconda Prompt (Windows) or Terminal (mac/Linux)
jupyter lab

# Classic notebook interface (also works):
jupyter notebook`,
        image: '/install/python-navigator-jupyter.png',
        imageCaption: 'Anaconda Navigator → the JupyterLab tile has a Launch button.',
      },
      {
        title: 'Verify Your Setup',
        body: 'Create your first notebook and run a cell.',
        checklist: [
          'In JupyterLab, click File → New → Notebook',
          'Pick the "Python 3" kernel',
          'Type the code below into the first cell',
          'Press Shift + Enter to run it',
          'See the output appear right below the cell',
        ],
        code: `name = "Arete"
print(f"Hello from {name}!")
print(2 + 2)`,
        image: '/install/python-jupyterlab-cell.png',
        imageCaption: 'A cell run in JupyterLab — output appears right below.',
      },
    ],
    troubleshooting: [
      { title: 'Installer too big or slow?', text: 'use Miniconda (anaconda.com/download/success → Miniconda) — ~100 MB. Then run pip install jupyterlab after install.' },
      { title: '"jupyter is not recognized"', text: 'open Anaconda Prompt (search it in the Start menu) instead of regular cmd / PowerShell. Anaconda only adds itself to that shell.' },
      { title: 'Port 8888 already in use', text: 'run jupyter lab --port 8889 to use a different port.' },
      { title: 'No laptop, only Android?', text: 'use Google Colab (colab.research.google.com) — same notebook interface, runs in the browser, free Google account is enough.' },
    ],
  },
  {
    key: 'c',
    label: 'C',
    accent: 'bg-ember-500 text-cream',
    eyebrow: 'One-time setup',
    title: 'Install C (GCC + VS Code)',
    intro: 'C is compiled with GCC. On Windows you get GCC by installing MinGW-w64; macOS already has it via the Command Line Tools; Linux usually ships it. We pair it with VS Code as the editor.',
    steps: [
      {
        title: 'Install GCC (the compiler)',
        body: 'GCC turns your .c files into runnable programs.',
        actions: [
          { label: 'Windows: MSYS2 (recommended) — msys2.org', url: 'https://www.msys2.org/' },
        ],
        checklist: [
          'Windows: download and run the MSYS2 installer, then open "MSYS2 MSYS" and run: pacman -S mingw-w64-ucrt-x86_64-gcc',
          'Windows: add C:\\msys64\\ucrt64\\bin to your PATH (System Properties → Environment Variables)',
          'macOS: open Terminal and run: xcode-select --install',
          'Linux (Ubuntu/Debian): sudo apt update && sudo apt install build-essential',
          'Open a new terminal and run gcc --version to confirm',
        ],
        code: `# After install, this should print a version (not "not found"):
gcc --version`,
        image: '/install/c-msys2-pacman.png',
        imageCaption: 'MSYS2 terminal after installing GCC — gcc --version should print the version line.',
      },
      {
        title: 'Install VS Code + C/C++ Extension',
        body: 'VS Code is a free, lightweight editor with great C tooling.',
        actions: [
          { label: 'Go to code.visualstudio.com/download', url: 'https://code.visualstudio.com/download' },
        ],
        checklist: [
          'Download and install VS Code with default options',
          'Open VS Code → Extensions sidebar (Ctrl+Shift+X)',
          'Search for "C/C++" by Microsoft and install it',
          'Optional but recommended: install "Code Runner" too (run files with one click)',
        ],
        image: '/install/c-vscode-cpp-ext.png',
        imageCaption: 'VS Code Extensions panel — install the official "C/C++" extension by Microsoft.',
      },
      {
        title: 'Verify Your Setup',
        body: 'Write, compile, and run your first C program.',
        checklist: [
          'Make a new folder, e.g. C:\\arete-c or ~/arete-c',
          'Open it in VS Code (File → Open Folder)',
          'Create a new file called hello.c with the code below',
          'Open the integrated terminal (Ctrl + `)',
          'Run: gcc hello.c -o hello',
          'Run: ./hello   (or hello.exe on Windows)',
          'See "Hello, World!" printed',
        ],
        code: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
        image: '/install/c-vscode-hello-run.png',
        imageCaption: 'VS Code terminal running ./hello — "Hello, World!" confirms the toolchain works.',
      },
    ],
    troubleshooting: [
      { title: '"gcc is not recognized"', text: 'GCC is not on PATH. On Windows, confirm C:\\msys64\\ucrt64\\bin (or wherever you installed it) is in the System PATH, then open a fresh terminal.' },
      { title: 'VS Code says "include errors detected"', text: 'click the lightbulb → "Edit includePath" or set "C_Cpp.default.compilerPath" to your gcc.exe location in settings.' },
      { title: './hello prints nothing', text: 'on Windows, use hello.exe — the ./ prefix is Linux/macOS only. In PowerShell you can also run .\\hello.exe.' },
      { title: 'No laptop?', text: 'use an online compiler such as onlinegdb.com or replit.com (search "C") to follow along.' },
    ],
  },
];

export default function Install() {
  const [active, setActive] = useState('java');
  const [checked, setChecked] = useState({});

  const current = tracks.find(t => t.key === active);
  const trackChecked = checked[active] || [];

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
        role="tablist"
        aria-label="Choose a language"
        className="inline-flex flex-wrap gap-1 bg-coffee-100 border border-coffee-200 rounded-xl p-1 mb-8"
      >
        {tracks.map(t => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
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
                    <span className={`text-sm leading-relaxed ${isChecked ? 'text-coffee-400 line-through' : 'text-coffee-700'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {step.code && (
              <div className="ml-10 sm:ml-[3.25rem]">
                <CodeBlock code={step.code} />
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
