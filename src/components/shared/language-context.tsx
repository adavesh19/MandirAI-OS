'use client'

import * as React from 'react'

export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te'

interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
  t: (field: Record<string, string> | any) => string
}

const LanguageContext = React.createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>('en')

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('temple_lang', lang)
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('temple_lang') as Language
      if (saved && ['en', 'hi', 'kn', 'ta', 'te'].includes(saved)) {
        setLanguageState(saved)
      }
    }
  }, [])

  const t = (field: Record<string, string> | any) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[language] || field['en'] || Object.values(field)[0] as string || ''
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
