// Per-track progress summary shared by the dashboard views (Home dashboard,
// ProgressDashboard). Kept out of the component files so both can import it
// without triggering react-refresh's only-export-components rule.
export function getTrackProgress(track, progress) {
  const completed = (progress.completedModules || []).filter(id =>
    track.moduleIndex.some(m => m.id === id)
  );
  const total = track.moduleIndex.length;
  const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  const nextModule = track.moduleIndex.find(m => !completed.includes(m.id)) || null;
  return { completed: completed.length, total, percent, nextModule };
}
