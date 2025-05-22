'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: null,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      try {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      } catch (error) {
        setTheme('light');
      }
    }
    
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
