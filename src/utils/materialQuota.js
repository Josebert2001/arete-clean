// Live registered rows per student. Storage permits 40 objects to leave room
// for uploads awaiting registration and short-lived failures.
export const MATERIAL_QUOTA = Object.freeze({ maxFiles: 30, maxBytes: 150 * 1024 * 1024 });
