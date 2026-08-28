import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// A second, deliberately minimal build: compiles src/prerender/entry-server.jsx
// (and the components + catalogue it imports) into a Node-loadable bundle for
// scripts/prerender.mjs.
//
// It does NOT reuse vite.config.js. That config carries VitePWA, whose
// closeBundle hook writes a service worker and a precache manifest — running it
// a second time against a different outDir produces a second, wrong sw.js and
// the manifest it generates would be built from dist-ssr instead of dist.
// Nothing in this build ships to the browser, so it needs neither.
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/prerender/entry-server.jsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    // Course data is data, not app shell: it must land in the bundle rather
    // than being split into chunks a plain `import()` from Node would have to
    // resolve by hash.
    target: 'node20',
    minify: false,
  },
})
