import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'prompt',
      injectRegister: false,        // registration lives in PWAUpdatePrompt.jsx
      manifest: false,              // keep hand-written public/manifest.webmanifest
      // Oversized assets are the design here, not an accident — see the note on
      // maximumFileSizeToCacheInBytes below. Without this the plugin fails the
      // build over the two chunks we intend to leave out; with it they are
      // listed as a warning, which is the reporting we actually want.
      showMaximumFileSizeToCacheInBytesWarning: true,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        globIgnores: ['og-image.png', 'lecture-notes/**', 'install/**'],
        /*
         * Precache the shell, not the syllabus. Every build artefact under this
         * cap is precached — index.html, the CSS, the icons, the app chunk and
         * all the small route chunks — which is everything needed to open the
         * app offline. The heavy data chunks blow straight past it and are
         * skipped: today that is the Cybersecurity catalogue (846 kB, all 57
         * courses in one chunk) and the MTH 121 notes (785 kB).
         *
         * Those are picked up instead by the same-origin /assets rule below, on
         * the first visit that actually needs them — so a student pays for the
         * catalogue they open, not for every department's. Deliberately a size
         * cap rather than a list of filenames: a new department catalogue or
         * lecture-note chunk lands on the right side of this automatically,
         * where a name list would silently start precaching megabytes.
         */
        maximumFileSizeToCacheInBytes: 300 * 1024,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//, /\/[^/?]+\.[a-z0-9]+(?:\?|$)/i],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false,         // prompt-mode: Reload click sends SKIP_WAITING
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 24, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            /*
             * The catalogue and lecture-note chunks the precache skipped. Once
             * a student opens a course, its whole department catalogue is on
             * the device and every course in it works offline.
             *
             * CacheFirst is safe here despite never revalidating: these
             * filenames carry Vite's content hash, so a URL's bytes can never
             * change — a rebuilt chunk is a different filename, which misses
             * the cache and is fetched fresh. maxEntries evicts the chunks
             * older deploys left behind.
             */
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && url.pathname.startsWith('/assets/') && url.pathname.endsWith('.js'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'course-data',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 180 },
            },
          },
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && url.pathname.startsWith('/lecture-notes/'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'lecture-notes',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
      devOptions: { enabled: false },  // npm run dev untouched; test via build+preview
    }),
  ],
  server: { port: 5173, open: true },
})
