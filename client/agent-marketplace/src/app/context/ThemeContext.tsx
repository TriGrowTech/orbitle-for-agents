import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';
type ThemeColor = 'navy' | 'red' | 'cyan';
type ThemeFont = 'inter' | 'roboto' | 'poppins' | 'lato' | 'montserrat' | 'work-sans';

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  headingFont: ThemeFont;
  bodyFont: ThemeFont;
  toggleMode: () => void;
  setThemeColor: (color: ThemeColor) => void;
  setHeadingFont: (font: ThemeFont) => void;
  setBodyFont: (font: ThemeFont) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [color, setColor] = useState<ThemeColor>('navy');
  const [headingFont, setHeadingFontState] = useState<ThemeFont>('inter');
  const [bodyFont, setBodyFontState] = useState<ThemeFont>('inter');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    root.setAttribute('data-theme-color', color);
    root.setAttribute('data-heading-font', headingFont);
    root.setAttribute('data-body-font', bodyFont);
  }, [mode, color, headingFont, bodyFont]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setThemeColor = (newColor: ThemeColor) => {
    setColor(newColor);
  };

  const setHeadingFont = (newFont: ThemeFont) => {
    setHeadingFontState(newFont);
  };

  const setBodyFont = (newFont: ThemeFont) => {
    setBodyFontState(newFont);
  };

  return (
    <ThemeContext.Provider value={{ mode, color, headingFont, bodyFont, toggleMode, setThemeColor, setHeadingFont, setBodyFont }}>
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