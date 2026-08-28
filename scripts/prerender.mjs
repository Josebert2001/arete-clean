// Bakes the public course pages into static HTML, and regenerates sitemap.xml.
//
// Why this exists: Areté is a client-rendered SPA served from one index.html,
// and every study route sits behind RequireAuth. A crawler asking for
// /courses/cyb-224 used to get an empty <div id="root"> that resolved, after
// JS, to a redirect to /signin — a page robots.txt disallows. The site had one
// indexable page. This step gives each course its own file with the outline,
// the set texts and the study tips already in the bytes.
//
// Runs AFTER `vite build`, deliberately:
//   * it needs dist/index.html with the hashed asset tags Vite injected;
//   * VitePWA's precache manifest is generated during that build, so the files
//     written here are never added to it. That is the intent — 112 HTML files
//     have no business in a service-worker precache. They are still served
//     normally on a first (uncached) navigation, which is the only visit a
//     crawler ever makes.
//
// Vercel checks the filesystem before applying vercel.json rewrites, so
// dist/courses/cyb-224/index.html wins over the SPA catch-all without any
// routing change.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const SITE_URL = 'https://www.aretecyb.tech';

// Public routes that are not prerendered but are still crawlable: they render
// client-side without hitting the auth gate, so Googlebot's JS pass indexes
// them fine. The gated routes (/lab, /tracks/*, /tutor, /explainer,
// /cheatsheet) are deliberately absent — listing a URL that redirects to a
// disallowed sign-in page is worse than not listing it.
const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/install', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');

// Rewrites one attribute on the <meta>/<link> tag identified by `matcher`.
// Throws when the tag is missing rather than passing the HTML through: a silent
// no-op here ships 113 pages carrying the landing page's description and a
// canonical pointing at "/", which tells Google every course page is a
// duplicate of the home page — the exact failure this script exists to fix.
function setTagAttr(html, matcher, attr, value) {
  const re = new RegExp(`(<(?:meta|link)[^>]*${matcher}[^>]*?\\b${attr}=")[^"]*(")`, 'i');
  if (!re.test(html)) {
    throw new Error(`prerender: no <meta|link> matching ${matcher} with a ${attr} attribute in dist/index.html`);
  }
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

function setTitle(html, title) {
  if (!/<title>[\s\S]*?<\/title>/i.test(html)) {
    throw new Error('prerender: no <title> in dist/index.html');
  }
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`);
}

// `</` inside a JSON string would close the script element early. Nothing else
// needs escaping — this is a data block, not executable script.
const jsonLdBlock = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/<\//g, '<\\/')}</script>`;

function buildPage(shell, page) {
  let html = shell;
  html = setTitle(html, page.title);
  html = setTagAttr(html, 'name="description"', 'content', page.description);
  html = setTagAttr(html, 'rel="canonical"', 'href', page.canonical);
  html = setTagAttr(html, 'property="og:url"', 'content', page.canonical);
  html = setTagAttr(html, 'property="og:title"', 'content', page.title);
  html = setTagAttr(html, 'property="og:description"', 'content', page.description);
  html = setTagAttr(html, 'name="twitter:title"', 'content', page.title);
  html = setTagAttr(html, 'name="twitter:description"', 'content', page.description);

  const blocks = (page.jsonLd || []).map(jsonLdBlock).join('');
  html = html.replace('</head>', `${blocks}</head>`);

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
  }
  // createRoot() in main.jsx clears this container and renders fresh, so there
  // is no hydration contract to honour — the markup only has to be correct for
  // the request that has not run JS yet.
  return html.replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
}

function buildSitemap(urls) {
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(SITE_URL + u.path)}</loc>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main() {
  const shell = await readFile(path.join(dist, 'index.html'), 'utf8');
  // pathToFileURL, not a bare path: a Windows absolute path ("C:\…") is not a
  // valid ESM specifier and import() rejects it.
  const entry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href;
  const { collectPages } = await import(entry);

  const pages = await collectPages();

  for (const page of pages) {
    const dir = path.join(dist, page.path.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), buildPage(shell, page), 'utf8');
  }

  const sitemap = buildSitemap([
    ...STATIC_PAGES,
    ...pages.map((p) => ({ path: p.path, changefreq: p.changefreq, priority: p.priority })),
  ]);
  // Written to both: dist/ is what deploys, public/ keeps the copy in git from
  // going stale as courses are added (Vite copies public/ into dist at the
  // START of a build, so the repo copy is what a build without this step ships).
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');

  process.stdout.write(
    `prerendered ${pages.length} pages · sitemap has ${STATIC_PAGES.length + pages.length} urls\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
