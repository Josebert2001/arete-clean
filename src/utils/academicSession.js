// The academic session a date falls in, as UniUyo writes it: '2026/2027'.
// A session starts in September, so January–August belong to the session that
// began the previous year. Used as the default on the admin page's new-offering
// form; the admin can still type another.
export function currentAcademicSession(date = new Date()) {
  const y = date.getFullYear();
  const start = date.getMonth() >= 8 ? y : y - 1;
  return `${start}/${start + 1}`;
}

export function isAcademicSession(value) {
  const m = /^(\d{4})\/(\d{4})$/.exec(String(value).trim());
  return !!m && Number(m[2]) === Number(m[1]) + 1;
}
