import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// The inline script in index.html sets data-theme before first paint;
// this hook takes over from there and persists manual changes.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage unavailable (private mode) — theme still applies for this visit
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
