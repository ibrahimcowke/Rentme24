import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeType = 'classic' | 'forest' | 'royal' | 'midnight' | 'sunset';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('guriflow-theme');
      return (saved as ThemeType) || 'classic';
    }
    return 'classic';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all possible theme classes
    const themes: ThemeType[] = ['classic', 'forest', 'royal', 'midnight', 'sunset'];
    themes.forEach(t => root.classList.remove(`theme-${t}`));
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Compatibility: Also set data-theme for css variables
    root.setAttribute('data-theme', theme);
    
    // Automatically handle dark class for specific themes
    if (theme === 'midnight') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('guriflow-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
