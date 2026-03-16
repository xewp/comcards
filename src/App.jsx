import { useState } from 'react';
import Home from './pages/Home';

/**
 * App
 * Root component. Manages dark mode state and applies the `dark` class
 * to the document root for TailwindCSS dark mode support.
 */
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Persist dark mode preference in localStorage
    try {
      return localStorage.getItem('comfortCards_darkMode') === 'true';
    } catch {
      return false;
    }
  });

  const handleSetDarkMode = (updater) => {
    setDarkMode(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try { localStorage.setItem('comfortCards_darkMode', next); } catch {}
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Apply on first render
  if (darkMode) {
    document.documentElement.classList.add('dark');
  }

  return (
    <Home darkMode={darkMode} setDarkMode={handleSetDarkMode} />
  );
}
