'use client'

import * as React from 'react'
import { useLanguage, type Language } from './language-context'

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN'  },
  { code: 'hi', label: 'हि'  },
  { code: 'kn', label: 'ಕ'   },
  { code: 'ta', label: 'த'   },
  { code: 'te', label: 'తె'  },
]

export default function LanguageSwitcherInline({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={`flex items-center gap-1 bg-black/10 rounded-full p-1 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          aria-pressed={l.code === language}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            l.code === language
              ? 'bg-white text-saffron-700 shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
