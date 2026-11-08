// Accept only fields the signed-in student already received through RLS.
// In particular, Google refresh tokens and uploaded file bytes are excluded.
export function assembleUserData({ profile, progress, attendance, materials, google }) {
  return {
    exportedAt: new Date().toISOString(),
    profile,
    progress,
    attendance,
    materials: materials.map(({ id, course_code, course_slug, department, display_name, file_size, file_type, description, uploaded_at }) => ({
      id, course_code, course_slug, department, display_name, file_size, file_type, description, uploaded_at,
    })),
    googleConnection: { connected: Boolean(google?.connected), scope: google?.scope ?? null, connectedAt: google?.connectedAt ?? null },
    feedback: null, // feedback has INSERT-only RLS; students cannot read it back.
  };
}
