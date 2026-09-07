// Campus map data — pins (destinations + waypoints) and walkable edges.
// Edit this file to update locations without touching component code.
// Destination pins appear in the search picker; waypoints only shape routes.

export const CAMPUS_CENTER = [5.6500, 7.9300];
export const CAMPUS_ZOOM = 17;
export const MAP_BOUNDS = {
  south: 5.6440,
  north: 5.6560,
  west: 7.9240,
  east: 7.9360,
};

export const CATEGORIES = {
  building: { label: 'Building', color: 'ember' },
  office: { label: 'Office', color: 'moss' },
  sports: { label: 'Sports', color: 'rust' },
  facility: { label: 'Facility', color: 'coffee-700' },
  entrance: { label: 'Entrance', color: 'ink' },
};

// Resolves a palette key (e.g. 'moss', 'coffee-700') to a CSS color that
// follows the active light/dark theme.
export function categoryColor(key) {
  return key ? `rgb(var(--${key}))` : 'rgb(var(--ember))';
}

// pins: destinations (searchable) + waypoints (route shape)
export const pins = [
  // --- Destinations ---
  { id: 'main-gate', name: 'Main Gate', type: 'destination', category: 'entrance', lat: 5.6465, lng: 7.9290 },
  { id: 'admin-block', name: 'Administration Block', type: 'destination', category: 'building', lat: 5.6480, lng: 7.9295 },
  { id: 'library', name: 'University Library', type: 'destination', category: 'building', lat: 5.6500, lng: 7.9310 },
  { id: 'student-affairs', name: 'Student Affairs', type: 'destination', category: 'office', lat: 5.6485, lng: 7.9305 },
  { id: 'lecture-theatre-1', name: 'Lecture Theatre 1', type: 'destination', category: 'building', lat: 5.6510, lng: 7.9300 },
  { id: 'lecture-theatre-2', name: 'Lecture Theatre 2', type: 'destination', category: 'building', lat: 5.6515, lng: 7.9320 },
  { id: 'faculty-science', name: 'Faculty of Science', type: 'destination', category: 'building', lat: 5.6520, lng: 7.9310 },
  { id: 'faculty-engineering', name: 'Faculty of Engineering', type: 'destination', category: 'building', lat: 5.6530, lng: 7.9290 },
  { id: 'ict-center', name: 'ICT Center', type: 'destination', category: 'building', lat: 5.6505, lng: 7.9285 },
  { id: 'student-centre', name: 'Student Centre', type: 'destination', category: 'facility', lat: 5.6495, lng: 7.9325 },
  { id: 'cafeteria', name: 'Cafeteria', type: 'destination', category: 'facility', lat: 5.6490, lng: 7.9330 },
  { id: 'sports-complex', name: 'Sports Complex', type: 'destination', category: 'sports', lat: 5.6540, lng: 7.9315 },
  { id: 'medical-centre', name: 'Medical Centre', type: 'destination', category: 'facility', lat: 5.6475, lng: 7.9320 },
  { id: 'vc-office', name: "Vice Chancellor's Office", type: 'destination', category: 'office', lat: 5.6482, lng: 7.9288 },
  { id: 'exam-office', name: 'Exams & Records', type: 'destination', category: 'office', lat: 5.6478, lng: 7.9300 },
  { id: 'postgraduate-building', name: 'Postgraduate Building', type: 'destination', category: 'building', lat: 5.6535, lng: 7.9330 },
  { id: 'law-faculty', name: 'Faculty of Law', type: 'destination', category: 'building', lat: 5.6525, lng: 7.9340 },
  { id: 'education-block', name: 'Faculty of Education', type: 'destination', category: 'building', lat: 5.6510, lng: 7.9345 },
  { id: 'env-block', name: 'Environmental Science Block', type: 'destination', category: 'building', lat: 5.6500, lng: 7.9350 },
  { id: 'gate-2', name: 'Gate 2 (East)', type: 'destination', category: 'entrance', lat: 5.6500, lng: 7.9360 },

  // --- Waypoints (route shape, not searchable) ---
  { id: 'w1', type: 'waypoint', lat: 5.6470, lng: 7.9292 },
  { id: 'w2', type: 'waypoint', lat: 5.6475, lng: 7.9295 },
  { id: 'w3', type: 'waypoint', lat: 5.6490, lng: 7.9298 },
  { id: 'w4', type: 'waypoint', lat: 5.6498, lng: 7.9302 },
  { id: 'w5', type: 'waypoint', lat: 5.6502, lng: 7.9290 },
  { id: 'w6', type: 'waypoint', lat: 5.6508, lng: 7.9295 },
  { id: 'w7', type: 'waypoint', lat: 5.6515, lng: 7.9305 },
  { id: 'w8', type: 'waypoint', lat: 5.6518, lng: 7.9300 },
  { id: 'w9', type: 'waypoint', lat: 5.6525, lng: 7.9295 },
  { id: 'w10', type: 'waypoint', lat: 5.6535, lng: 7.9305 },
  { id: 'w11', type: 'waypoint', lat: 5.6490, lng: 7.9315 },
  { id: 'w12', type: 'waypoint', lat: 5.6495, lng: 7.9320 },
  { id: 'w13', type: 'waypoint', lat: 5.6505, lng: 7.9315 },
  { id: 'w14', type: 'waypoint', lat: 5.6520, lng: 7.9325 },
  { id: 'w15', type: 'waypoint', lat: 5.6530, lng: 7.9335 },
  { id: 'w16', type: 'waypoint', lat: 5.6485, lng: 7.9325 },
  { id: 'w17', type: 'waypoint', lat: 5.6500, lng: 7.9340 },
  { id: 'w18', type: 'waypoint', lat: 5.6505, lng: 7.9345 },
  { id: 'w19', type: 'waypoint', lat: 5.6515, lng: 7.9335 },
  { id: 'w20', type: 'waypoint', lat: 5.6480, lng: 7.9310 },
];

// Walkable edges — which pins connect directly
export const edges = [
  // Main gate approach
  { a: 'main-gate', b: 'w1' },
  { a: 'w1', b: 'w2' },
  { a: 'w2', b: 'admin-block' },
  { a: 'w2', b: 'vc-office' },
  { a: 'admin-block', b: 'w3' },
  { a: 'vc-office', b: 'w3' },

  // Central spine
  { a: 'w3', b: 'student-affairs' },
  { a: 'student-affairs', b: 'w4' },
  { a: 'w4', b: 'library' },
  { a: 'w4', b: 'exam-office' },
  { a: 'exam-office', b: 'w20' },
  { a: 'w20', b: 'medical-centre' },
  { a: 'medical-centre', b: 'w16' },

  // Library to LT1
  { a: 'library', b: 'w5' },
  { a: 'w5', b: 'ict-center' },
  { a: 'ict-center', b: 'w6' },
  { a: 'w6', b: 'lecture-theatre-1' },

  // LT1 to Science / Engineering
  { a: 'lecture-theatre-1', b: 'w7' },
  { a: 'w7', b: 'w8' },
  { a: 'w8', b: 'faculty-science' },
  { a: 'w7', b: 'faculty-science' },
  { a: 'faculty-science', b: 'w9' },
  { a: 'w9', b: 'faculty-engineering' },
  { a: 'w9', b: 'w10' },
  { a: 'w10', b: 'sports-complex' },

  // LT1 to LT2
  { a: 'lecture-theatre-1', b: 'lecture-theatre-2' },
  { a: 'lecture-theatre-2', b: 'w14' },
  { a: 'w14', b: 'postgraduate-building' },

  // Student centre / cafeteria area
  { a: 'library', b: 'w11' },
  { a: 'w11', b: 'w12' },
  { a: 'w12', b: 'student-centre' },
  { a: 'w12', b: 'cafeteria' },
  { a: 'student-centre', b: 'w13' },
  { a: 'w13', b: 'w11' },
  { a: 'cafeteria', b: 'w16' },

  // East side — Law, Education, Env Sci, Gate 2
  { a: 'w14', b: 'w15' },
  { a: 'w15', b: 'law-faculty' },
  { a: 'law-faculty', b: 'w17' },
  { a: 'w17', b: 'education-block' },
  { a: 'education-block', b: 'w18' },
  { a: 'w18', b: 'env-block' },
  { a: 'env-block', b: 'gate-2' },

  // Cross-links
  { a: 'w19', b: 'education-block' },
  { a: 'w19', b: 'lecture-theatre-2' },
  { a: 'w19', b: 'w14' },
  { a: 'sports-complex', b: 'w15' },
  { a: 'faculty-engineering', b: 'w10' },
];
