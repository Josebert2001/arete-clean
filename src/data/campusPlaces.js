// Campus places — the list behind /campus-map.
//
// Areté does not draw its own map or compute its own routes. Each place hands
// off to Google Maps, which already does GPS, live tracking and walking
// directions on the student's phone. See src/utils/placeLinks.js.
//
// lat / lng: leave them null until someone has taken the real position
// (stand at the entrance and copy the coordinates, or right-click the building
// in Google Maps' satellite view → the first menu line is "lat, lng"). A place
// with no coordinates still works — it opens a Google Maps *search* for its
// name — but only a place with coordinates gets exact walking directions.
//
// Coordinates outside UYO_BOUNDS are ignored rather than linked, so a typo or a
// placeholder can never send a student to the wrong town. The previous map
// prototype shipped invented positions ~68 km north of Uyo; this guard is why
// that cannot happen again silently.
//
// The names below were carried over from that prototype and have not all been
// checked against the real campus. Confirm each one (and its official name)
// when you add its coordinates.

export const UYO_BOUNDS = {
  south: 4.95,
  north: 5.15,
  west: 7.85,
  east: 8.05,
};

export const PLACE_CATEGORIES = {
  building: { label: 'Building', color: 'bg-ember' },
  office: { label: 'Office', color: 'bg-moss' },
  sports: { label: 'Sports', color: 'bg-rust' },
  facility: { label: 'Facility', color: 'bg-coffee-700' },
  entrance: { label: 'Entrance', color: 'bg-ink' },
};

export const places = [
  { id: 'main-gate', name: 'Main Gate', category: 'entrance', lat: null, lng: null },
  { id: 'gate-2', name: 'Gate 2 (East)', category: 'entrance', lat: null, lng: null },
  { id: 'admin-block', name: 'Administration Block', category: 'building', lat: null, lng: null },
  { id: 'library', name: 'University Library', category: 'building', lat: null, lng: null },
  { id: 'lecture-theatre-1', name: 'Lecture Theatre 1', category: 'building', lat: null, lng: null },
  { id: 'lecture-theatre-2', name: 'Lecture Theatre 2', category: 'building', lat: null, lng: null },
  { id: 'faculty-science', name: 'Faculty of Science', category: 'building', lat: null, lng: null },
  { id: 'faculty-engineering', name: 'Faculty of Engineering', category: 'building', lat: null, lng: null },
  { id: 'law-faculty', name: 'Faculty of Law', category: 'building', lat: null, lng: null },
  { id: 'education-block', name: 'Faculty of Education', category: 'building', lat: null, lng: null },
  { id: 'env-block', name: 'Environmental Science Block', category: 'building', lat: null, lng: null },
  { id: 'postgraduate-building', name: 'Postgraduate Building', category: 'building', lat: null, lng: null },
  { id: 'ict-center', name: 'ICT Center', category: 'building', lat: null, lng: null },
  { id: 'vc-office', name: "Vice Chancellor's Office", category: 'office', lat: null, lng: null },
  { id: 'student-affairs', name: 'Student Affairs', category: 'office', lat: null, lng: null },
  { id: 'exam-office', name: 'Exams & Records', category: 'office', lat: null, lng: null },
  { id: 'student-centre', name: 'Student Centre', category: 'facility', lat: null, lng: null },
  { id: 'cafeteria', name: 'Cafeteria', category: 'facility', lat: null, lng: null },
  { id: 'medical-centre', name: 'Medical Centre', category: 'facility', lat: null, lng: null },
  { id: 'sports-complex', name: 'Sports Complex', category: 'sports', lat: null, lng: null },
];
