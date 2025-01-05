'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type FontType = 'inter' | 'dyslexic'

interface FontContextType {
  fontType: FontType
  setFontType: (font: FontType) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontType, setFontType] = useState<FontType>('inter')

  useEffect(() => {
    const savedFont = localStorage.getItem('fontType') as FontType
    if (savedFont) {
      setFontType(savedFont)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('fontType', fontType)
    document.body.className = document.body.className.replace(/font-(inter|dyslexic)/, `font-${fontType}`)
  }, [fontType])

  return (
    <FontContext.Provider value={{ fontType, setFontType }}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}