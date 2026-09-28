'use client'

import * as React from 'react'
import Script from 'next/script'
import { LanguageProvider } from '@/components/shared/language-context'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Define global Google Translate element init callback
    if (typeof window !== 'undefined' && !window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,kn,hi,ta,te,mr,gu,bn,ml',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              'google_translate_element'
            )
          } catch (e) {
            // ignore
          }
        }
      }
    }
  }, [])

  return (
    <LanguageProvider>
      {/* Global Google Translate Element */}
      <div id="google_translate_element" className="notranslate hidden" style={{ display: 'none' }} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      {children}
    </LanguageProvider>
  )
}

