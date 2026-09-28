'use client'

import * as React from 'react'
import { useLanguage, type Language } from './language-context'
import { Globe, Check } from 'lucide-react'

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
]

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle'
  className?: string
}

export default function LanguageSwitcher({ variant = 'dropdown', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0]

  if (variant === 'toggle') {
    return (
      <div className={`inline-flex items-center rounded-full bg-stone-100 p-0.5 border border-stone-200/90 shadow-sm dark:bg-stone-850 dark:border-stone-700 notranslate ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
            language === 'en'
              ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-900 dark:text-white'
              : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
          }`}
          title="Google Translate to English"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage('kn')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
            language === 'kn'
              ? 'bg-saffron-600 text-white shadow-sm'
              : 'text-stone-600 hover:text-saffron-700 dark:text-stone-300 dark:hover:text-saffron-400'
          }`}
          title="Google Translate to Kannada (ಕನ್ನಡ ಅನುವಾದ)"
        >
          ಕನ್ನಡ
        </button>
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200/90 bg-white/90 hover:bg-saffron-50 hover:border-saffron-300 text-stone-700 hover:text-saffron-700 text-xs font-semibold transition-all shadow-sm dark:bg-stone-900/90 dark:border-stone-800 dark:text-stone-200 dark:hover:bg-stone-800"
        title="Switch Language / ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
        <span className="font-medium">{current.native}</span>
        <span className="text-[10px] text-stone-400">▼</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-50 min-w-[170px] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800">
            Select Language / ಭಾಷೆ
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={lang.code === language}
              onClick={() => {
                setLanguage(lang.code)
                setOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs hover:bg-saffron-50 dark:hover:bg-stone-800 transition-colors text-left ${
                lang.code === language
                  ? 'bg-saffron-50/80 text-saffron-700 font-bold dark:bg-saffron-950/40 dark:text-saffron-300'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang.native}</span>
                <span className="text-[11px] text-stone-400">({lang.label})</span>
              </div>
              {lang.code === language && (
                <Check className="h-3.5 w-3.5 text-saffron-600 dark:text-saffron-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

