// Searching the campus map.
//
// Students do not type "Computer-Based Test Examination Centre". They type
// "cbt". They do not type "University Health Centre", they type "clinic". The
// prototype matched a lowercased substring of the pin's official name and
// nothing else, which meant the map could only be searched by people who
// already knew what the building was called — the exact people who do not need
// a map.
//
// Kept out of the component so the ranking can be tested without a DOM.

// Lowercase, strip punctuation, collapse whitespace. Hyphens become spaces so
// "y-building" and "y building" are the same query, and "CYB211" survives as
// "cyb211" rather than being split.
export function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Every string a pin can be found by: its name, its hand-written aliases, and
// its category label — so "hostel" or "gate" lists the whole category even when
// no individual pin is named that.
function haystack(pin, categories) {
  const terms = [pin.name, ...(pin.aliases ?? [])];
  const label = categories?.[pin.category]?.label;
  if (label) terms.push(label);
  return terms.filter(Boolean).map(normalize);
}

// Higher is better; 0 means no match.
//
// Ranked rather than filtered because substring matching alone buries the
// obvious answer: searching "gate" with a plain filter puts "Main Gate" below
// any building whose description happens to contain the word.
//
// Two rules, composed in this order:
//
//   1. Match quality wins first — exact beats prefix beats word-start beats
//      substring — regardless of which field it came from. So "entrance", an
//      exact hit on a category, surfaces Main Gate ahead of a facility merely
//      *called* "Entrance Lodge", which matches only by prefix. Someone typing
//      that word wants the way in.
//   2. Within the same quality, name beats alias beats category label (the
//      `tier` subtraction below), so an alias can never displace a pin that is
//      genuinely named the thing being searched for.
//
// The tier penalties are deliberately smaller than the gap between quality
// bands, which is what makes rule 1 dominate rule 2.
function scoreTerm(term, q) {
  if (term === q) return 100;
  if (term.startsWith(q)) return 80;
  // Start of any word inside the term — "sci" finding "Faculty of Science".
  if (term.includes(` ${q}`)) return 60;
  if (term.includes(q)) return 30;
  return 0;
}

export function scorePin(pin, query, categories) {
  const q = normalize(query);
  if (!q) return 0;
  const terms = haystack(pin, categories);
  const aliasCount = pin.aliases?.length ?? 0;

  let best = 0;
  for (let i = 0; i < terms.length; i++) {
    const raw = scoreTerm(terms[i], q);
    if (raw === 0) continue;
    // haystack order is [name, ...aliases, categoryLabel]. The official name
    // outranks an alias, which outranks a category label, so an exact alias hit
    // can never displace an exact name hit — searching "gate" must put Main Gate
    // above every other pin that merely sits in the Entrance category.
    const tier = i === 0 ? 0 : i <= aliasCount ? 5 : 12;
    best = Math.max(best, raw - tier);
  }
  return Math.max(0, best);
}

// Ranked search over destination pins. An empty query returns the list
// unchanged — the picker shows everything until the student starts typing.
export function searchDestinations(query, destinations, categories) {
  const q = normalize(query);
  if (!q) return destinations;
  return destinations
    .map((pin) => ({ pin, score: scorePin(pin, q, categories) }))
    .filter((r) => r.score > 0)
    // Stable within a score band: named buildings before "Unnamed building N",
    // then alphabetical, so the same query always produces the same order.
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const aNamed = a.pin.source ? 0 : 1;
      const bNamed = b.pin.source ? 0 : 1;
      if (aNamed !== bNamed) return aNamed - bNamed;
      return a.pin.name.localeCompare(b.pin.name);
    })
    .map((r) => r.pin);
}
