'use client'

import * as React from 'react'
import { translations, type Language } from './translations'

export type { Language }

interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
  isKannada: boolean
  isEnglish: boolean
  t: (keyOrField: string | Record<string, string> | any, fallback?: string) => string
}

const LanguageContext = React.createContext<LanguageContextProps | undefined>(undefined)

export function triggerGoogleTranslate(lang: string) {
  if (typeof window === 'undefined') return
  try {
    const hostname = window.location.hostname
    const cookieVal = lang === 'en' ? '' : `/en/${lang}`

    // Clear previous cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`

    if (lang !== 'en') {
      document.cookie = `googtrans=${cookieVal}; path=/;`
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${hostname};`
    }

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (select) {
      select.value = lang
      select.dispatchEvent(new Event('change'))
    }
  } catch (err) {
    console.error('Google Translate trigger error:', err)
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>('en')

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('temple_lang', lang)
        document.documentElement.lang = lang === 'kn' ? 'kn-IN' : 'en-IN'
        triggerGoogleTranslate(lang)
      } catch (e) {
        // ignore localStorage errors in private mode
      }
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const match = document.cookie.match(/googtrans=\/[a-zA-Z-]+\/([a-zA-Z-]+)/)
        const cookieLang = match && match[1] ? (match[1].toLowerCase() as Language) : null
        const saved = (cookieLang || localStorage.getItem('temple_lang')) as Language
        if (saved && ['en', 'kn', 'hi', 'ta', 'te'].includes(saved)) {
          setLanguageState(saved)
          document.documentElement.lang = saved === 'kn' ? 'kn-IN' : 'en-IN'
          if (saved !== 'en') {
            setTimeout(() => triggerGoogleTranslate(saved), 600)
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const t = (keyOrField: string | Record<string, string> | any, fallback = ''): string => {
    if (!keyOrField) return fallback

    // If it's a string dictionary key (e.g., 'nav.features')
    if (typeof keyOrField === 'string') {
      if (translations[keyOrField]) {
        return translations[keyOrField][language] || translations[keyOrField]['en'] || fallback || keyOrField
      }
      return fallback || keyOrField
    }

    // If it's a multilingual object { en: '...', kn: '...' }
    if (typeof keyOrField === 'object') {
      return (
        keyOrField[language] ||
        keyOrField['en'] ||
        keyOrField['kn'] ||
        Object.values(keyOrField)[0] ||
        fallback
      )
    }

    return fallback
  }

  const value: LanguageContextProps = {
    language,
    setLanguage,
    isKannada: language === 'kn',
    isEnglish: language === 'en',
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    // Return a safe fallback context if rendered outside provider so it never crashes
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      isKannada: false,
      isEnglish: true,
      t: (keyOrField: any, fallback = '') => {
        if (!keyOrField) return fallback
        if (typeof keyOrField === 'string') return keyOrField
        if (typeof keyOrField === 'object') return keyOrField['en'] || keyOrField['kn'] || fallback
        return fallback
      },
    }
  }
  return context
}

