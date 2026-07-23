import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // vite-plugin-pwa isn't loaded here, so its virtual module can't resolve.
      // Point it at a stub; tests override behavior with vi.mock.
      'virtual:pwa-register/react': fileURLToPath(
        new URL('./src/__tests__/stubs/pwaRegister.js', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
  },
});
