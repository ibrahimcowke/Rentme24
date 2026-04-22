import React, { createContext, useContext, useEffect, useState } from 'react';

type ColorTheme = 'default' | 'royal' | 'emerald' | 'rose';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  colorTheme: ColorTheme;
  setMode: (mode: ThemeMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('guriflow-mode');
      if (saved) return saved as ThemeMode;
      return 'system';
    }
    return 'system';
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('guriflow-color-theme');
      if (saved) return saved as ColorTheme;
      return 'default';
    }
    return 'default';
  });

  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleModeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (mode === 'system') {
        const newMode = e.matches ? 'dark' : 'light';
        setActiveMode(newMode);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (mode === 'system') {
      handleModeChange(mediaQuery);
      mediaQuery.addEventListener('change', handleModeChange);
    } else {
      setActiveMode(mode);
    }

    return () => mediaQuery.removeEventListener('change', handleModeChange);
  }, [mode]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle light/dark class
    if (activeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Handle color theme data attribute
    root.setAttribute('data-theme', colorTheme);

    localStorage.setItem('guriflow-mode', mode);
    localStorage.setItem('guriflow-color-theme', colorTheme);
  }, [activeMode, mode, colorTheme]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      colorTheme,
      setMode, 
      setColorTheme,
      toggleTheme,
      isDark: activeMode === 'dark' 
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
