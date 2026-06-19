import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Single-button light/dark switch. Shows the icon of the theme you'd switch TO
// and announces the action to assistive tech.
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`rounded-lg p-2.5 text-ink transition-colors hover:bg-coffee-100 ${className}`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
