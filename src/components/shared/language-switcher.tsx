'use client'

import * as React from 'react'
import { useLanguage, type Language } from './language-context'
import { Globe } from 'lucide-react'

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English',  native: 'EN'  },
  { code: 'hi', label: 'Hindi',    native: 'हि'  },
  { code: 'kn', label: 'Kannada',  native: 'ಕ'   },
  { code: 'ta', label: 'Tamil',    native: 'த'   },
  { code: 'te', label: 'Telugu',   native: 'తె'  },
]

export default function LanguageSwitcher() {
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white hover:bg-saffron-50 hover:border-saffron-300 text-stone-700 hover:text-saffron-700 text-xs font-semibold transition-all shadow-sm"
        title="Switch Language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5 text-saffron-500" />
        <span>{current.native}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden z-50 min-w-[150px] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === language}
              onClick={() => {
                setLanguage(lang.code)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-saffron-50 transition-colors text-left ${
                lang.code === language
                  ? 'bg-saffron-50 text-saffron-700 font-bold'
                  : 'text-stone-700'
              }`}
            >
              <span className="text-base w-6 text-center leading-none">{lang.native}</span>
              <span>{lang.label}</span>
              {lang.code === language && (
                <span className="ml-auto text-saffron-500 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
