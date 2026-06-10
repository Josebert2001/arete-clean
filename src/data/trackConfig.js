// Full track config — metadata PLUS the complete module content (theory, code
// examples, quizzes). Importing this pulls ~240 kB of module data into the
// chunk, so only the track pages (TrackModules, TrackModuleDetail) should use
// it. Everything else should import the lightweight ./trackMeta instead.

import { trackMeta } from './trackMeta';
import { modules, getModuleById } from './modules';
import { pythonModules, getPythonModuleById } from './pythonModules';
import { cModules, getCModuleById } from './cModules';

export const trackConfig = {
  java: { ...trackMeta.java, modules, getModuleById },
  python: { ...trackMeta.python, modules: pythonModules, getModuleById: getPythonModuleById },
  c: { ...trackMeta.c, modules: cModules, getModuleById: getCModuleById },
};

export function getTrack(slug) {
  return trackConfig[slug] || null;
}
