// Stub for the `virtual:pwa-register/react` module, which only exists when
// vite-plugin-pwa runs in the build. vitest.config.js aliases the virtual
// specifier here so Vite's import-analysis can resolve it; individual tests
// override behavior with vi.mock. This default is an inert no-op.
export function useRegisterSW() {
  return {
    offlineReady: [false, () => {}],
    needRefresh: [false, () => {}],
    updateServiceWorker: () => {},
  };
}
