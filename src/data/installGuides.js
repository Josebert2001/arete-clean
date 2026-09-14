// The three toolchain setup guides, as data.
//
// Lifted out of src/pages/Install.jsx so the build-time renderer can read them
// too: InstallPreview.jsx bakes all three into dist/install/index.html, and a
// crawler that runs no JavaScript would otherwise see the empty SPA shell where
// the only "how do I install the JDK at UniUyo" answer on the site lives.
// Install.jsx still owns the interactive parts (the tab picker, the tickable
// checklists); this file owns nothing but the words, so the two renders cannot
// drift.

export const tracks = [
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
        body: 'NetBeans is the IDE used in COS 211 / 221 labs. It has a drag-and-drop GUI designer you will use later.',
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
    title: 'Install C (GCC + NetBeans)',
    intro: "C is compiled with GCC. On Windows you get GCC by installing MinGW-w64 (we use MSYS2); macOS provides it via Command Line Tools; Linux usually ships it. You'll write and run your C code in NetBeans — the same IDE you set up for Java, just with the C/C++ plugin added.",
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
        title: 'Add C/C++ support to NetBeans',
        body: "If you've already set up Java, you have NetBeans. Now add the C/C++ plugin so NetBeans can build C projects.",
        checklist: [
          'Open NetBeans → Tools → Plugins',
          'Switch to the "Available Plugins" tab and click "Check for Newest"',
          'Search for "C/C++" and install the C/C++ plugin (accept the license, restart when prompted)',
          'After restart: Tools → Options → C/C++ → Build Tools',
          'Add a Tool Collection — point Base Directory to your gcc folder (e.g. C:\\msys64\\ucrt64\\bin)',
          'Click "Set as Default" so new C projects use it',
        ],
        image: '/install/c-netbeans-plugin.png',
        imageCaption: 'NetBeans → Tools → Plugins → install the C/C++ plugin, then point Build Tools at your gcc.',
      },
      {
        title: 'Verify Your Setup',
        body: 'Write, compile, and run your first C program inside NetBeans.',
        checklist: [
          'File → New Project → C/C++ → C/C++ Application',
          'Name it "HelloC" and finish the wizard',
          'Open main.c and replace its contents with the code below',
          'Right-click the project → Run (or press F6)',
          'See "Hello, World!" in the Output panel',
        ],
        code: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
        image: '/install/c-netbeans-hello-run.png',
        imageCaption: 'NetBeans Output panel showing "Hello, World!" — your C toolchain works.',
      },
    ],
    troubleshooting: [
      { title: '"gcc is not recognized"', text: 'GCC is not on PATH. On Windows, confirm C:\\msys64\\ucrt64\\bin (or wherever you installed it) is in the System PATH, then open a fresh terminal — and re-open NetBeans so it picks up the new PATH.' },
      { title: 'No "C/C++ Application" option in New Project', text: 'the C/C++ plugin did not install. Reopen Tools → Plugins → Available, search "C/C++", and install it. Restart NetBeans.' },
      { title: '"No build tool collections"', text: 'Tools → Options → C/C++ → Build Tools → Add. Point Base Directory at the folder containing gcc.exe (e.g. C:\\msys64\\ucrt64\\bin).' },
      { title: 'No laptop?', text: 'use an online compiler such as onlinegdb.com or replit.com (search "C") to follow along.' },
    ],
  },
];

// schema.org HowTo, one per track. The install guide is the site's only
// procedural content, and "how to install the JDK for NetBeans" is exactly the
// shape of question an answer engine answers from a HowTo block rather than
// from prose.
export function installHowToJsonLd(track, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: track.title,
    description: track.intro,
    url: `${siteUrl}/install#${track.key}`,
    inLanguage: 'en',
    totalTime: 'PT20M',
    step: track.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.body,
      url: `${siteUrl}/install#${track.key}-step-${i + 1}`,
      itemListElement: step.checklist.map((item) => ({
        '@type': 'HowToDirection',
        text: item,
      })),
    })),
  };
}
