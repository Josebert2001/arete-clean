import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, denyIfUserRateLimited } from '../_lib/request-policy.js';
import { getStudentFromRequest } from '../_lib/supabase.js';
import { serviceRoleClient, serviceRoleConfigured } from '../_lib/serviceRole.js';
import { getRefreshTokenForUser } from '../_lib/googleAuth.js';

const RATE_LIMIT = { namespace: 'account-delete', limit: 2, windowMs: 24 * 60 * 60 * 1000 };

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const limit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, limit);
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return res.status(429).json({ error: 'Account deletion request limit reached. Please try again tomorrow.' });
  }
  const student = await getStudentFromRequest(req);
  if (!student) return res.status(401).json({ error: 'Sign in required.' });
  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'account-delete', message: 'Account deletion request limit reached. Please try again tomorrow.',
  })) return;
  if (req.body?.confirm !== 'DELETE') return res.status(400).json({ error: 'Type DELETE to confirm.' });
  if (!serviceRoleConfigured()) return res.status(503).json({ error: 'Account deletion is unavailable right now.' });

  const userId = student.user.id;
  const db = serviceRoleClient();
  try {
    const [role, rep, lecturerLink] = await Promise.all([
      db.from('user_roles').select('role').eq('user_id', userId).maybeSingle(),
      db.from('course_reps').select('user_id').eq('user_id', userId).maybeSingle(),
      db.from('offering_lecturers').select('lecturer_id').eq('lecturer_id', userId).limit(1),
    ]);
    if (role.error || rep.error || lecturerLink.error) throw new Error('Could not verify account roles');
    if (role.data || rep.data || lecturerLink.data?.length) {
      return res.status(409).json({ error: 'Staff, lecturers, and course reps must contact an admin before deleting their account.' });
    }

    const refreshToken = await getRefreshTokenForUser(userId);
    if (refreshToken) {
      try {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(refreshToken)}`, { method: 'POST' });
      } catch (err) { console.error('account/delete: Google revoke failed:', err); }
    }
    const { error: googleError } = await db.from('google_connections').delete().eq('user_id', userId);
    if (googleError) throw googleError;

    if (student.user.email) {
      const { error: inviteError } = await db.from('lecturer_invites').delete().eq('email', student.user.email.toLowerCase());
      if (inviteError) throw inviteError;
    }

    const { data: uploads, error: uploadError } = await db.from('course_materials')
      .delete().eq('uploaded_by', userId).select('file_path');
    if (uploadError) throw uploadError;
    const paths = (uploads ?? []).map(row => row.file_path).filter(Boolean);
    for (let i = 0; i < paths.length; i += 50) {
      const { error: storageError } = await db.storage.from('course-materials').remove(paths.slice(i, i + 50));
      if (storageError) throw storageError;
    }

    // Delete attendance rather than retain counts: student_id is NOT NULL and
    // ON DELETE CASCADE. Remove the associated audit snapshots too; deleting
    // attendance fires the audit trigger and those JSONB copies include PII.
    const { error: attendanceError } = await db.from('attendance_records').delete().eq('student_id', userId);
    if (attendanceError) throw attendanceError;
    const { error: auditError } = await db.from('attendance_audit').delete().eq('student_id', userId);
    if (auditError) throw auditError;

    // Remaining roster/device/progress/feedback FKs cascade on auth-user delete.
    const { error: deleteError } = await db.auth.admin.deleteUser(userId);
    if (deleteError) throw deleteError;
    return res.status(200).json({ deleted: true });
  } catch (err) {
    console.error('account/delete failed:', err);
    return res.status(500).json({ error: 'Could not delete your account. Please contact support.' });
  }
}
