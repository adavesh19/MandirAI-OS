'use client'

import * as React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/shared/language-context'

interface HeroBlockProps {
  data: {
    title?: Record<string, string>
    subtitle?: Record<string, string>
    ctaText?: Record<string, string>
    ctaLink?: string
  }
  settings?: {
    backgroundImage?: string
    alignment?: 'left' | 'center' | 'right'
    symbol?: 'none' | 'om' | 'flag' | 'lamp'
  }
  theme?: string
}

export default function HeroBlock({ data, settings, theme = 'classic' }: HeroBlockProps) {
  const { t } = useLanguage()
  const alignmentClass = settings?.alignment === 'left' ? 'text-left items-start' : settings?.alignment === 'right' ? 'text-right items-end' : 'text-center items-center'

  // Style customization based on theme
  let containerBgStyle = {}
  let overlayGradient = ''
  let containerClasses = "relative min-h-[65vh] flex flex-col justify-center items-center px-6 py-24 overflow-hidden rounded-3xl transition-all duration-300 "
  let titleClasses = "font-serif text-3xl md:text-5xl font-black leading-tight drop-shadow-sm "
  let subtitleClasses = "text-base md:text-lg max-w-2xl font-light leading-relaxed "
  let badgeText = "Sacred Presence"
  let badgeClasses = "text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-2 mb-2 "

  const symbols: Record<string, string> = {
    none: '',
    om: '🕉️',
    flag: '🚩',
    lamp: '🪔'
  }
  const symbolIcon = settings?.symbol ? symbols[settings.symbol] : '🕉️'

  if (theme === 'heritage') {
    overlayGradient = settings?.backgroundImage 
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(69,10,10,0.85))'
      : 'linear-gradient(to bottom, rgba(127,29,29,0.98), rgba(69,10,10,0.99))'
    containerClasses += "border-4 border-[#D4AF37] bg-red-950 text-[#F5DEB3] shadow-xl "
    titleClasses += "font-serif text-4xl md:text-6xl text-[#F5DEB3] tracking-wide font-extrabold "
    subtitleClasses += "font-serif text-red-100/90 font-normal "
    badgeClasses += "text-[#D4AF37] "
  } else if (theme === 'modern') {
    overlayGradient = settings?.backgroundImage
      ? 'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.75))'
      : 'linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(99,102,241,0.05) 100%)'
    containerClasses += "border border-stone-200/50 bg-[#F8FAFC] dark:bg-stone-900 shadow-xl "
    titleClasses += "font-sans font-extrabold text-stone-900 dark:text-white tracking-tight text-4xl md:text-6xl "
    subtitleClasses += "font-sans text-stone-500 dark:text-stone-400 font-medium "
    badgeClasses += "text-orange-600 dark:text-orange-400 "
    badgeText = "Spiritual Center"
  } else if (theme === 'divine-glow') {
    overlayGradient = settings?.backgroundImage 
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(23,10,1,0.9))'
      : 'linear-gradient(to bottom, rgba(23,10,1,0.9), rgba(13,5,0,0.98))'
    containerClasses += "border border-amber-500/20 bg-gradient-to-b from-[#1c0d02] to-[#0d0500] text-amber-100 shadow-xl shadow-amber-950/20 "
    titleClasses += "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDD0] via-[#F4C430] to-[#E5A93B] tracking-wide font-extrabold text-4xl md:text-6xl "
    subtitleClasses += "font-serif text-amber-100/80 "
    badgeClasses += "text-amber-400 "
    badgeText = "Sacred Presence"
  } else {
    // Classic
    overlayGradient = settings?.backgroundImage
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.65))'
      : 'linear-gradient(to bottom, rgba(251,191,36,0.06), rgba(234,88,12,0.06))'
    containerClasses += "border border-stone-200/40 bg-white dark:bg-stone-950 shadow-sm "
    titleClasses += "font-serif text-stone-900 dark:text-stone-55 font-bold "
    subtitleClasses += "font-serif text-stone-600 dark:text-stone-300 "
    badgeClasses += "text-saffron-600 dark:text-saffron-400 "
  }

  containerBgStyle = {
    backgroundImage: settings?.backgroundImage 
      ? `${overlayGradient}, url(${settings.backgroundImage})` 
      : overlayGradient
  }

  return (
    <div className={containerClasses} style={containerBgStyle}>
      {/* Heritage double gold lining frame */}
      {theme === 'heritage' && (
        <div className="absolute inset-2 border-2 border-double border-[#D4AF37]/50 rounded-2xl pointer-events-none" />
      )}

      {/* Decorative Traditional Watermark for Classic/Heritage */}
      {theme !== 'modern' && !settings?.backgroundImage && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-[25px] border-double border-saffron-900 rounded-full animate-spin-slow" />
        </div>
      )}

      <div className={`relative z-10 max-w-4xl mx-auto space-y-5 flex flex-col ${alignmentClass}`}>
        {settings?.symbol !== 'none' && (
          <div className={badgeClasses}>
            <div className={`h-[1px] w-8 ${theme === 'heritage' ? 'bg-[#D4AF37]' : theme === 'modern' ? 'bg-orange-500' : 'bg-saffron-400'}`} />
            <span>{symbolIcon} {badgeText}</span>
            <div className={`h-[1px] w-8 ${theme === 'heritage' ? 'bg-[#D4AF37]' : theme === 'modern' ? 'bg-orange-500' : 'bg-saffron-400'}`} />
          </div>
        )}

        <h1 className={titleClasses}>
          {data.title ? t(data.title) : 'Temple Name'}
        </h1>

        <p className={subtitleClasses}>
          {data.subtitle ? t(data.subtitle) : 'Spiritual and peaceful environment.'}
        </p>

        {/* CTA Link button */}
        {data.ctaText && (data.ctaText.en || data.ctaText.hi || data.ctaText.kn || data.ctaText.ta || data.ctaText.te) && (
          <div className="pt-2">
            <Link 
              href={data.ctaLink || '#'}
              className={
                theme === 'heritage'
                  ? 'inline-block bg-gradient-to-r from-red-800 to-red-900 text-[#F5DEB3] border border-[#D4AF37] px-8 py-3.5 font-bold uppercase tracking-wider text-xs rounded-lg shadow-md hover:from-red-750 transition-all font-serif'
                  : theme === 'modern'
                    ? 'inline-block bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 font-bold rounded-2xl text-xs transition-all shadow-md font-sans'
                    : 'inline-block bg-saffron-600 hover:bg-saffron-550 text-white px-8 py-3.5 font-bold rounded-2xl text-xs transition-all shadow-sm font-serif'
              }
            >
              {t(data.ctaText)}
            </Link>
          </div>
        )}

        {/* Traditional Gold Accent lines for Heritage */}
        {theme === 'heritage' && (
          <div className="flex items-center gap-3 pt-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-amber-400 text-xs">✨</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        )}
      </div>
    </div>
  )
}
