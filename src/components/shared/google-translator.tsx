'use client'

import * as React from 'react'
import Script from 'next/script'
import { Globe, Check, Sparkles } from 'lucide-react'

declare global {
  interface Window {
    google?: any
    googleTranslateElementInit?: () => void
  }
}

export type SupportedLang = 'en' | 'kn' | 'hi' | 'ta' | 'te' | 'mr' | 'gu' | 'bn' | 'ml'

const LANGUAGES: { code: SupportedLang; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
]

interface GoogleTranslatorProps {
  variant?: 'toggle' | 'dropdown' | 'full'
  className?: string
}

export default function GoogleTranslator({ variant = 'dropdown', className = '' }: GoogleTranslatorProps) {
  const [currentLang, setCurrentLang] = React.useState<SupportedLang>('en')
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Initialize and check current Google Translate cookie
  React.useEffect(() => {
    // Read googtrans cookie
    const getGoogleCookieLang = (): SupportedLang => {
      if (typeof document === 'undefined') return 'en'
      const match = document.cookie.match(/googtrans=\/[a-zA-Z-]+\/([a-zA-Z-]+)/)
      if (match && match[1]) {
        const code = match[1].toLowerCase() as SupportedLang
        if (LANGUAGES.some((l) => l.code === code)) {
          return code
        }
      }
      // Check saved localStorage
      const saved = localStorage.getItem('google_trans_lang') as SupportedLang
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        return saved
      }
      return 'en'
    }

    const detected = getGoogleCookieLang()
    setCurrentLang(detected)

    // Define global callback if not yet defined
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,kn,hi,te,ta,mr,gu,bn,ml',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              'google_translate_element'
            )
            setIsScriptLoaded(true)
          } catch (e) {
            console.error('Google Translate init error:', e)
          }
        }
      }
    } else {
      setIsScriptLoaded(true)
    }

    // Close on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Programmatically change language via Google Translate
  const changeLanguage = (langCode: SupportedLang) => {
    setCurrentLang(langCode)
    setIsOpen(false)

    try {
      localStorage.setItem('google_trans_lang', langCode)
      localStorage.setItem('temple_lang', langCode)

      // Set cookies for Google Translate across root domain and current path
      const hostname = window.location.hostname
      const cookieValue = `/en/${langCode}`

      // Clear existing googtrans
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`

      if (langCode !== 'en') {
        document.cookie = `googtrans=${cookieValue}; path=/;`
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${hostname};`
        document.cookie = `googtrans=${cookieValue}; path=/; domain=.${hostname};`
      }

      // Find the Google Translate select dropdown element if already rendered
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (select) {
        select.value = langCode
        select.dispatchEvent(new Event('change'))
      } else {
        // Reload page so Google Translate script translates the entire DOM with the new cookie
        window.location.reload()
      }
    } catch (err) {
      console.error('Error changing language:', err)
    }
  }

  const currentObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0]

  return (
    <>
      {/* Hidden container for Google's native Translate Element */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Load Google Translate Element script if not already on page */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.googleTranslateElementInit) {
            window.googleTranslateElementInit()
          }
        }}
      />

      {/* Variant 1: Quick Toggle Pill (English | ಕನ್ನಡ) with dropdown */}
      {variant === 'toggle' ? (
        <div className={`inline-flex items-center rounded-full bg-stone-100 p-0.5 border border-stone-200 shadow-sm dark:bg-stone-900 dark:border-stone-800 ${className}`}>
          <button
            type="button"
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
              currentLang === 'en'
                ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-800 dark:text-white'
                : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
            title="Translate to English"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => changeLanguage('kn')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
              currentLang === 'kn'
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-saffron-700 dark:text-stone-300 dark:hover:text-saffron-400'
            }`}
            title="ಗೂಗಲ್ ಅನುವಾದ ಮೂಲಕ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ (Translate to Kannada)"
          >
            ಕನ್ನಡ
          </button>
        </div>
      ) : (
        /* Variant 2: Modern Dropdown with Google Translate Badge */
        <div ref={dropdownRef} className={`relative inline-block notranslate ${className}`}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200/90 bg-white/95 hover:bg-saffron-50 hover:border-saffron-300 text-stone-700 hover:text-saffron-700 text-xs font-bold transition-all shadow-sm dark:bg-stone-900 dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-850"
            title="Google Translator — Change Language / ಭಾಷೆ ಆಯ್ಕೆ"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <Globe className="h-3.5 w-3.5 text-saffron-600 shrink-0" />
            <span className="font-semibold">{currentObj.native}</span>
            <span className="text-[9px] text-stone-400">▼</span>
          </button>

          {isOpen && (
            <div
              role="listbox"
              className="absolute right-0 top-full mt-2 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-50 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-150"
            >
              {/* Header with Google Translate credit */}
              <div className="px-3.5 py-2 text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-950/70">
                <span>Google Translate</span>
                <span className="text-[10px] text-saffron-600 dark:text-saffron-400 font-extrabold">LIVE</span>
              </div>

              {/* Priority 1 & 2: English and Kannada */}
              <div className="py-1">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLang === lang.code
                  const isPriority = lang.code === 'en' || lang.code === 'kn'
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left ${
                        isSelected
                          ? 'bg-saffron-50 text-saffron-800 font-bold dark:bg-saffron-950/50 dark:text-saffron-300'
                          : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800/80'
                      } ${isPriority ? 'font-semibold' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{lang.native}</span>
                        <span className="text-[11px] text-stone-400">({lang.name})</span>
                        {lang.code === 'kn' && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-saffron-100 text-saffron-700 dark:bg-saffron-950 dark:text-saffron-300 font-bold">
                            ಕನ್ನಡ
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-saffron-600 dark:text-saffron-400 shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
