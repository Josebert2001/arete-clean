// Applies the saved/system theme before first paint to avoid a flash of the
// wrong theme. Loaded as an external same-origin script so it satisfies the
// strict CSP (script-src 'self') without needing an inline-script hash. Must
// stay render-blocking (no async/defer) in <head> so the class lands pre-paint.
(function () {
  try {
    var stored = localStorage.getItem('arete-theme');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) {
      document.documentElement.classList.add('dark');
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', '#000000');
    }
  } catch (e) { /* ignore */ }
})();
