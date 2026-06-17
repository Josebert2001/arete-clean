// Full track config — lightweight metadata PLUS the complete module content
// (theory, code examples, quizzes). Each track's heavy data lives in its own
// file (modules.js / pythonModules.js / cModules.js, ~80 kB each). Loading it
// lazily and per-track means visiting one track never downloads the other two:
// Vite splits each import() into a separate chunk. Pages should consume this
// through the useTrack hook; everything else should import ./trackMeta.

import { trackMeta } from './trackMeta';

const loaders = {
  java: () => import('./modules').then(m => ({ modules: m.modules, getModuleById: m.getModuleById })),
  python: () => import('./pythonModules').then(m => ({ modules: m.pythonModules, getModuleById: m.getPythonModuleById })),
  c: () => import('./cModules').then(m => ({ modules: m.cModules, getModuleById: m.getCModuleById })),
};

// Resolves to the full track (metadata + module content) for a known slug, or
// null for an unknown one. Async because module content is code-split per track.
export async function loadTrack(slug) {
  const meta = trackMeta[slug];
  const loader = loaders[slug];
  if (!meta || !loader) return null;
  const data = await loader();
  return { ...meta, ...data };
}
