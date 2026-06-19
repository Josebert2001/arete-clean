// Rasterizes the Arete "A+" logo (public/arete.svg) to PNG favicons and PWA icons.
// Dependency-free: draws the same geometry as the SVG with 4x4 supersampled
// anti-aliasing and encodes PNG via Node's built-in zlib. Re-run after editing
// the logo geometry below:  node scripts/gen-favicon.mjs
//
// Three styles:
//   badge    - rounded badge, transparent outside  (favicons, "any" PWA icons)
//   solid    - full-bleed ink, art near edges       (apple-touch-icon)
//   maskable - full-bleed ink, art in 80% safe zone (Android adaptive icons)
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Palette (mirrors tailwind.config.js / arete.svg)
const INK = [0x1c, 0x18, 0x14];
const GOLD = [0xcf, 0xa6, 0x65];
const EMBER = [0xe0, 0x7a, 0x2c];

// Stroke segments in the 32x32 SVG coordinate space.
const A_W = 2.6;
const PLUS_W = 2.4;
const strokes = [
  // The "A": left leg -> apex -> right leg, then the crossbar.
  { pts: [[7.5, 24], [13.5, 8]], w: A_W, color: GOLD },
  { pts: [[13.5, 8], [19.5, 24]], w: A_W, color: GOLD },
  { pts: [[9.4, 19], [17.6, 19]], w: A_W, color: GOLD },
  // The "+".
  { pts: [[23.7, 10.5], [28.3, 10.5]], w: PLUS_W, color: EMBER },
  { pts: [[26, 8.2], [26, 12.8]], w: PLUS_W, color: EMBER },
];
// Bounding-box center of the art, used to recenter when scaling for solid styles.
const ART_CX = 17.9; // (7.5 + 28.3) / 2
const ART_CY = 16;   // (8 + 24) / 2

// Distance from point p to segment a-b.
function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy || 1;
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx, cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

// Color of a stroke covering (cx, cy) in art-space, or null.
function strokeAt(cx, cy) {
  for (const s of strokes) {
    if (segDist(cx, cy, s.pts[0][0], s.pts[0][1], s.pts[1][0], s.pts[1][1]) <= s.w / 2) {
      return s.color;
    }
  }
  return null;
}

// Signed distance to the rounded-rect badge (32x32, r=8). <=0 is inside.
function inBadge(x, y) {
  const qx = Math.max(Math.abs(x - 16) - 8, 0);
  const qy = Math.max(Math.abs(y - 16) - 8, 0);
  return Math.hypot(qx, qy) - 8 <= 0;
}

// Color (RGB) + coverage(0/1) for a point in 32-space, per style.
function sampleColor(x, y, style) {
  if (style.mode === 'badge') {
    if (!inBadge(x, y)) return null;        // transparent corners
    return strokeAt(x, y) || INK;
  }
  // solid / maskable: full-bleed ink, art recentered + scaled into the canvas.
  const cx = ART_CX + (x - 16) / style.scale;
  const cy = ART_CY + (y - 16) / style.scale;
  return strokeAt(cx, cy) || INK;
}

function render(size, style) {
  const SS = 4; // supersample factor per axis
  const scale = 32 / size;
  const data = Buffer.alloc(size * size * 4);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0, covered = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (px + (sx + 0.5) / SS) * scale;
          const y = (py + (sy + 0.5) / SS) * scale;
          const c = sampleColor(x, y, style);
          if (c) { r += c[0]; g += c[1]; b += c[2]; covered++; }
        }
      }
      const i = (py * size + px) * 4;
      if (covered > 0) {
        data[i] = Math.round(r / covered);
        data[i + 1] = Math.round(g / covered);
        data[i + 2] = Math.round(b / covered);
      }
      data[i + 3] = Math.round((covered / (SS * SS)) * 255); // alpha = coverage
    }
  }
  return data;
}

// --- Minimal PNG encoder (RGBA, 8-bit) ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(size, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const BADGE = { mode: 'badge' };
const SOLID = { mode: 'solid', scale: 0.82 };       // art reaches near edges
const MASKABLE = { mode: 'maskable', scale: 0.66 }; // art inside 80% safe zone

const targets = [
  { name: 'favicon-16.png', size: 16, style: BADGE },
  { name: 'favicon-32.png', size: 32, style: BADGE },
  { name: 'icon-192.png', size: 192, style: BADGE },
  { name: 'icon-512.png', size: 512, style: BADGE },
  { name: 'apple-touch-icon.png', size: 180, style: SOLID },
  { name: 'icon-192-maskable.png', size: 192, style: MASKABLE },
  { name: 'icon-512-maskable.png', size: 512, style: MASKABLE },
];

for (const { name, size, style } of targets) {
  const png = encodePNG(size, render(size, style));
  writeFileSync(join(PUBLIC, name), png);
  console.error(`wrote public/${name} (${png.length} bytes)`);
}
