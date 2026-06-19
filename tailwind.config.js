/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Theme is toggled by adding/removing the `dark` class on <html>.
  // Colors below resolve to CSS variables (defined in index.css) so every
  // existing `bg-paper` / `text-ink` / `text-coffee-700` utility re-themes
  // automatically when the variables are swapped under `.dark`.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: 'rgb(var(--cream) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        coffee: {
          50:  'rgb(var(--coffee-50) / <alpha-value>)',
          100: 'rgb(var(--coffee-100) / <alpha-value>)',
          200: 'rgb(var(--coffee-200) / <alpha-value>)',
          300: 'rgb(var(--coffee-300) / <alpha-value>)',
          400: 'rgb(var(--coffee-400) / <alpha-value>)',
          500: 'rgb(var(--coffee-500) / <alpha-value>)',
          600: 'rgb(var(--coffee-600) / <alpha-value>)',
          700: 'rgb(var(--coffee-700) / <alpha-value>)',
          800: 'rgb(var(--coffee-800) / <alpha-value>)',
          900: 'rgb(var(--coffee-900) / <alpha-value>)',
        },
        ember: {
          400: 'rgb(var(--ember-400) / <alpha-value>)',
          500: 'rgb(var(--ember-500) / <alpha-value>)',
        },
        moss: 'rgb(var(--moss) / <alpha-value>)',
        rust: 'rgb(var(--rust) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.11 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'steam': 'steam 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        steam: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.7', transform: 'translateY(-6px) scaleX(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
