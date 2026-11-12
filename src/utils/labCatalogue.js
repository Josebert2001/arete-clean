// The Code Lab catalogue: every module of every track as one filterable list.
//
// Built from trackMeta.moduleIndex alone — id, number, title, difficulty, hours
// and steps — so /lab never downloads a track's full module content just to
// draw a card. Pure functions: the page owns the hooks and passes progress in.

import { levelLabel, stepId } from './missionSteps';

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// How many cards a shelf shows while every track is on screen. Four fills one
// row at desktop width; the shelf's own link opens the rest.
export const SHELF_PREVIEW = 4;

// Steps ticked on a module, from the shared mission-steps progress record.
// Counted by prefix rather than by rebuilding the step list, which would need
// the module's full content. Capped at the module's own total: "On my own"
// hides some steps, and a tick saved under a key the module no longer has must
// not read as more than complete.
export function stepsDone(moduleId, tickedIds, total) {
  const prefix = stepId(moduleId, '');
  let count = 0;
  for (const id of tickedIds) {
    if (typeof id === 'string' && id.startsWith(prefix)) count += 1;
  }
  return Math.min(count, total);
}

// One catalogue item per module, with the learner's state on it.
//   tracks        Object.values(trackMeta), in display order
//   completedBy   { [trackSlug]: string[] }  completed module ids per track
//   tickedIds     string[]                   mission-steps completedModules
export function buildCatalogue(tracks, completedBy = {}, tickedIds = []) {
  return tracks.flatMap(track => {
    const completed = new Set(completedBy[track.slug] || []);
    return track.moduleIndex.map(mod => {
      const done = completed.has(mod.id);
      const ticked = stepsDone(mod.id, tickedIds, mod.steps);
      return {
        key: `${track.slug}/${mod.id}`,
        trackSlug: track.slug,
        id: mod.id,
        number: mod.number,
        title: mod.title,
        level: levelLabel(mod.difficulty),
        hours: mod.hours,
        steps: mod.steps,
        stepsDone: done ? mod.steps : ticked,
        status: done ? 'done' : ticked > 0 ? 'started' : 'new',
        path: track.detailPath(mod.id),
      };
    });
  });
}

export function filterCatalogue(items, { track = 'all', level = 'all' } = {}) {
  return items.filter(item => (track === 'all' || item.trackSlug === track)
    && (level === 'all' || item.level === level));
}

// The cards one shelf shows. With every track on screen and no level chosen, a
// shelf is a preview: SHELF_PREVIEW cards starting at the learner's next
// unfinished module, so the row moves forward as they do instead of always
// showing module 1. Any filter means the learner asked for a specific set, so
// they get all of it.
export function shelfItems(trackItems, { track = 'all', level = 'all' } = {}) {
  if (track !== 'all' || level !== 'all') return trackItems;
  const nextIndex = trackItems.findIndex(item => item.status !== 'done');
  if (nextIndex === -1) return trackItems.slice(-SHELF_PREVIEW);
  const start = Math.min(nextIndex, Math.max(0, trackItems.length - SHELF_PREVIEW));
  return trackItems.slice(start, start + SHELF_PREVIEW);
}

// Where "pick up where you left off" points, most specific signal first:
//   1. the module page the learner last had open on this device, if unfinished
//   2. any module with steps ticked but not completed
//   3. the next module of the track they have completed the most of
// Returns null for a learner with no history at all — the page then offers a
// starting point instead of pretending there is something to resume.
export function pickResume(items, lastPath = null) {
  const open = items.filter(item => item.status !== 'done');
  const last = lastPath ? open.find(item => item.path === lastPath) : null;
  if (last && last.status === 'started') return { item: last, reason: 'last' };

  const started = open.find(item => item.status === 'started');
  if (started) return { item: started, reason: 'started' };
  if (last) return { item: last, reason: 'last' };

  const doneByTrack = new Map();
  for (const item of items) {
    if (item.status === 'done') doneByTrack.set(item.trackSlug, (doneByTrack.get(item.trackSlug) || 0) + 1);
  }
  let best = null;
  for (const [slug, count] of doneByTrack) {
    const next = open.find(item => item.trackSlug === slug);
    if (next && (!best || count > best.count)) best = { item: next, count };
  }
  return best ? { item: best.item, reason: 'next' } : null;
}

export function trackSummary(trackItems) {
  const done = trackItems.filter(item => item.status === 'done').length;
  const hours = trackItems.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
  return { total: trackItems.length, done, hours };
}
