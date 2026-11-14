import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export async function inventory(checkout) {
  const load = name => import(pathToFileURL(path.join(checkout, 'src/data', name)).href);
  const [{ courses: cyber }, { courses: science }, { trackMeta }] = await Promise.all([
    load('courses.js'), load('dataScienceCourses.js'), load('trackMeta.js'),
  ]);
  const app = fs.readFileSync(path.join(checkout, 'src/App.jsx'), 'utf8');
  const patterns = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map(match => match[1]);
  const cases = [];
  const add = (url, actor = 'student', state = 'default', pattern = url) => {
    const id = `${actor}__${url}__${state}`.replace(/[^a-zA-Z0-9_-]+/g, '_');
    if (!cases.some(item => item.id === id)) cases.push({ id, url, actor, state, pattern });
  };
  const publicPaths = new Set(['/', '/cybersecurity', '/courses', '/install', '/campus-map', '/signin', '/about', '/privacy', '/terms', '/premium']);
  const roles = { '/admin': 'admin', '/rep': 'rep', '/teach': 'lecturer', '/register': 'lecturer', '/invitations': 'lecturer', '/setup-profile': 'new' };
  for (const pattern of patterns) {
    if (pattern.includes(':')) continue;
    if (pattern === '*') add('/visual-not-found', 'guest', 'default', '*');
    else add(pattern, roles[pattern] || (publicPaths.has(pattern) ? 'guest' : 'student'), 'default', pattern);
  }
  for (const actor of ['student', 'science', 'independent', 'foundation']) add('/', actor);
  for (const actor of ['student', 'science', 'foundation']) {
    add('/courses', actor);
    for (const level of [100, 200, 300, 400]) {
      add(`/courses?level=${level}`, actor, 'level', '/courses');
      for (const semester of [1, 2]) add(`/courses?level=${level}&semester=${semester}`, actor, 'semester', '/courses');
    }
  }
  for (const actor of ['student', 'premium']) add('/premium', actor);
  for (const actor of ['student', 'independent', 'foundation']) add('/welcome', actor);
  for (const actor of ['student', 'science']) add('/planner', actor);
  for (const [actor, courses] of [['student', cyber], ['science', science]]) {
    for (const course of courses) add(`/courses/${course.slug}`, actor, 'default', '/courses/:slug');
  }
  for (const slug of new Set([...cyber, ...science].filter(course => course.slug).map(course => course.slug))) {
    add(`/courses/${slug}`, 'guest', 'public', '/courses/:slug');
  }
  for (const track of Object.values(trackMeta)) {
    add(track.listPath, 'student', 'default', '/tracks/:lang');
    for (const mod of track.moduleIndex) {
      add(track.detailPath(mod.id), 'student', 'default', '/tracks/:lang/:id');
      if (track.slug === 'java') add(`/modules/${mod.id}`, 'student', 'redirect', '/modules/:id');
    }
  }
  add('/courses/missing-course', 'guest', 'not-found', '/courses/:slug');
  add('/tracks/missing', 'student', 'not-found', '/tracks/:lang');
  add('/tracks/java/missing-module', 'student', 'not-found', '/tracks/:lang/:id');
  for (const url of ['/admin', '/rep', '/teach', '/register']) add(url, 'student', 'access-denied');
  const missing = patterns.filter(pattern => !cases.some(item => item.pattern === pattern));
  if (missing.length) throw new Error(`Routes without a capture case: ${missing.join(', ')}`);
  return { patterns, cases, cyberCount: cyber.length, scienceCount: science.length };
}
