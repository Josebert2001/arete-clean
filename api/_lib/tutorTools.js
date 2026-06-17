// ============================================================================
//  Arete — Agentic tutor tools (Vercel functions)
//  Read-only tools the AI Tutor can call mid-conversation: the student's
//  saved progress (RLS-scoped via their own token) and on-demand course /
//  module detail from the knowledge base.
// ============================================================================

import { tool } from 'ai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { findCourse, findModule } from './courseData.js';
import { trackMeta } from '../../src/data/trackMeta.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// Anonymous read-only client — course_materials has a public read policy.
function getAnonDb() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Truncate each note to keep the AI prompt within safe limits.
const MAX_NOTE_CHARS = 6_000;
const MAX_NOTES = 3;

// display_name/description are set by students at upload time. Strip newlines,
// "=" (so a crafted name can't forge a "=== ... ===" note boundary), and
// control chars before interpolating them into the note header.
function sanitizeLabel(value) {
  return String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/=/g, '')
    // eslint-disable-next-line no-control-regex -- deliberately strip control chars to block prompt injection
    .replace(/[\x00-\x1F\x7F]/g, '')
    .slice(0, 120)
    .trim();
}

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
        const outline = findCourse(courseCode);
        if (!outline) {
          return `No course found matching "${courseCode}". Use a course code from the catalogue index.`;
        }

        const db = getAnonDb();
        if (!db) return outline;

        const { data } = await db
          .from('course_materials')
          .select('display_name, description, extracted_text')
          .eq('course_code', courseCode)
          .not('extracted_text', 'is', null)
          .order('uploaded_at', { ascending: false })
          .limit(MAX_NOTES);

        if (!data || data.length === 0) return outline;

        const notes = data
          .map(m => {
            const name = sanitizeLabel(m.display_name) || 'Untitled note';
            const desc = sanitizeLabel(m.description);
            const label = desc ? `${name} — ${desc}` : name;
            const body = m.extracted_text.slice(0, MAX_NOTE_CHARS);
            const truncated = m.extracted_text.length > MAX_NOTE_CHARS ? ' [truncated]' : '';
            return `=== Uploaded note: ${label}${truncated} ===\n${body}`;
          })
          .join('\n\n');

        return `${outline}\n\n${notes}`;
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
