'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, X } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

export default function LaunchBanner() {
  const [dismissed, setDismissed] = React.useState(false)
  const { t, isKannada } = useLanguage()

  if (dismissed) return null

  return (
    <div className="relative bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 text-white text-xs sm:text-sm font-medium py-2.5 px-4 shadow-md z-50 overflow-hidden">
      {/* Background glow and decorative sparkle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          <span className="flex items-center justify-center p-1 rounded-full bg-white/20 text-yellow-200 shrink-0">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          </span>
          <p className="tracking-tight leading-snug text-center sm:text-left">
            <span className="font-extrabold uppercase tracking-wide bg-white/25 px-2 py-0.5 rounded text-[11px] mr-2">
              {isKannada ? 'ವಿಶೇಷ ಕೊಡುಗೆ' : 'Special Launch'}
            </span>
            <span className="font-semibold">
              {t('banner.launchOffer')}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/onboarding?plan=launch-299"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-saffron-900 font-bold hover:bg-yellow-100 transition-all text-xs shadow-sm hover:scale-105"
          >
            <span>{t('banner.claimOffer')}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
