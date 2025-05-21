'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
