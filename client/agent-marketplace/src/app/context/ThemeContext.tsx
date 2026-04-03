import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';
type ThemeColor = 'navy' | 'red' | 'cyan';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  toggleMode: () => void;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [color, setColor] = useState<ThemeColor>('navy');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    root.setAttribute('data-theme-color', color);
    root.setAttribute('data-heading-font', 'poppins');
    root.setAttribute('data-body-font', 'montserrat');
  }, [mode, color]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setThemeColor = (newColor: ThemeColor) => {
    setColor(newColor);
  };

  return (
    <ThemeContext.Provider value={{ mode, color, toggleMode, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}