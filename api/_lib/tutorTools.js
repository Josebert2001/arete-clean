// ============================================================================
//  Arete — Agentic tutor tools (Vercel functions)
//  Read-only tools the AI Tutor can call mid-conversation: the student's
//  saved progress (RLS-scoped via their own token) and on-demand course /
//  module detail from the knowledge base.
// ============================================================================

import { tool } from 'ai';
import { z } from 'zod';
import { findCourse, findModule } from './courseData.js';
import { trackMeta } from '../../src/data/trackMeta.js';

const TRACK_BY_STORAGE_KEY = Object.fromEntries(
  Object.values(trackMeta).map(t => [t.storageKey, t])
);

function summarizeTrackProgress(track, progress) {
  const titleById = Object.fromEntries(
    track.moduleIndex.map(m => [m.id, `Module ${String(m.number).padStart(2, '0')}: ${m.title}`])
  );
  const completed = (progress.completedModules || []).map(id => titleById[id] || id);
  const quizAttempts = Object.entries(progress.quizScores || {}).map(([id, s]) => ({
    module: titleById[id] || id,
    score: `${s.score}/${s.total}`,
    percent: s.total ? Math.round((s.score / s.total) * 100) : null,
    date: s.date ? new Date(s.date).toISOString().slice(0, 10) : null,
  }));

  return {
    track: track.fullName,
    completedModules: completed,
    completedCount: completed.length,
    totalModules: track.moduleCount,
    quizAttempts,
  };
}

// student is the result of getStudentFromRequest(req) — null when anonymous.
export function buildTutorTools(student) {
  return {
    getStudentProgress: tool({
      description:
        "Fetch the signed-in student's saved progress across all programming tracks: completed modules and quiz scores with dates. Call this before recommending what to study, review, or do next.",
      inputSchema: z.object({}),
      execute: async () => {
        if (!student) {
          return {
            signedIn: false,
            note: 'The student is not signed in, so no saved progress is available. You can suggest signing in to track progress across devices.',
          };
        }

        const { data, error } = await student.db
          .from('user_progress')
          .select('storage_key, progress, updated_at');

        if (error) {
          return { signedIn: true, error: 'Progress could not be loaded right now.' };
        }

        const tracks = (data || [])
          .filter(row => TRACK_BY_STORAGE_KEY[row.storage_key])
          .map(row => summarizeTrackProgress(TRACK_BY_STORAGE_KEY[row.storage_key], row.progress || {}));

        return {
          signedIn: true,
          tracks,
          ...(tracks.length === 0 && {
            note: 'No saved progress yet — the student has not completed any modules or quizzes while signed in.',
          }),
        };
      },
    }),

    getCourseOutline: tool({
      description:
        'Get the full catalogue entry for one course: topics/skills covered, textbooks, exam tips, and uploaded lecture notes where available. Use the course code from the catalogue index.',
      inputSchema: z.object({
        courseCode: z.string().describe('Course code, e.g. "CYB 224", "COS 111", "MTH 121"'),
      }),
      execute: async ({ courseCode }) => {
        return (
          findCourse(courseCode) ||
          `No course found matching "${courseCode}". Use a course code from the catalogue index.`
        );
      },
    }),

    getModuleDetail: tool({
      description:
        "Get one interactive programming module's full content summary: theory topics, code examples, practice question areas, and mini project.",
      inputSchema: z.object({
        track: z.enum(['java', 'python', 'c']),
        moduleNumber: z.number().int().min(1).max(13).describe('Module number within the track (Java has 13, Python and C have 12)'),
      }),
      execute: async ({ track, moduleNumber }) => {
        return (
          findModule(track, moduleNumber) ||
          `No module ${moduleNumber} in the ${track} track.`
        );
      },
    }),
  };
}
