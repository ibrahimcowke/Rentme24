import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('guriflow-theme');
      if (saved) return saved as Theme;
      return 'system';
    }
    return 'system';
  });

  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        setActiveTheme(newTheme);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (theme === 'system') {
      handleThemeChange(mediaQuery);
      mediaQuery.addEventListener('change', handleThemeChange);
    } else {
      setActiveTheme(theme);
    }

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (activeTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('guriflow-theme', theme);
  }, [activeTheme, theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      isDark: activeTheme === 'dark' 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
