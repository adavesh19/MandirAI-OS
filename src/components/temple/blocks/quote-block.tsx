'use client'

import * as React from 'react'
import { useLanguage } from '@/components/shared/language-context'

interface QuoteBlockProps {
  data: {
    shloka?: Record<string, string>
    translation?: Record<string, string>
    source?: Record<string, string>
  }
  settings?: {
    alignment?: 'left' | 'center' | 'right'
    borderStyle?: 'simple' | 'ornate' | 'double-gold' | 'glass'
  }
  theme?: 'classic' | 'heritage' | 'modern' | 'divine-glow'
}

export default function QuoteBlock({ data, settings, theme = 'classic' }: QuoteBlockProps) {
  const { t } = useLanguage()

  const alignClass = settings?.alignment === 'left' ? 'text-left items-start' : settings?.alignment === 'right' ? 'text-right items-end' : 'text-center items-center'

  // Block defaults
  const defaultShloka = { en: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।' }
  const defaultTranslation = {
    en: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.',
    hi: 'कर्म पर ही तुम्हारा अधिकार है, उसके फलों पर कभी नहीं।',
    kn: 'ಕರ್ಮದಲ್ಲಿ ಮಾತ್ರ ನಿನಗೆ ಅಧಿಕಾರವಿರಲಿ, ಅದರ ಫಲಗಳಲ್ಲಿ ಎಂದೂ ಬೇಡ.',
    ta: 'உன் கடமைகளைச் செய்ய மட்டுமே உனக்கு அதிகாரம் உண்டு, அதன் பலன்களில் இல்லை.',
    te: 'కర్మలను ఆచరించుటకే నీకు అధికారము కలదు, వాటి ఫలములపై ఎన్నడూ లేదు.'
  }
  const defaultSource = { en: 'Bhagavad Gita 2.47' }

  const shlokaText = data.shloka ? t(data.shloka) : t(defaultShloka)
  const translationText = data.translation ? t(data.translation) : t(defaultTranslation)
  const sourceText = data.source ? t(data.source) : t(defaultSource)

  let containerClasses = "my-10 p-8 rounded-3xl border transition-all duration-300 flex flex-col " + alignClass + " "
  let shlokaClasses = "font-serif text-xl md:text-2xl font-bold mb-4 tracking-wide leading-relaxed "
  let transClasses = "text-sm md:text-base font-light italic leading-relaxed max-w-3xl "
  let sourceClasses = "text-xs uppercase font-bold tracking-widest mt-4 "

  if (theme === 'heritage') {
    containerClasses += "bg-red-950/20 border-[#D4AF37]/40 text-[#F5DEB3] shadow-md "
    shlokaClasses += "text-red-900 dark:text-amber-400 font-extrabold "
    transClasses += "text-stone-300 font-serif "
    sourceClasses += "text-[#D4AF37]/90 font-serif "
    if (settings?.borderStyle === 'double-gold' || !settings?.borderStyle) {
      containerClasses += "border-4 border-double "
    }
  } else if (theme === 'modern') {
    containerClasses += "bg-white dark:bg-stone-900 border-stone-200/50 dark:border-stone-800 rounded-[2.2rem] shadow-sm "
    shlokaClasses += "text-stone-900 dark:text-white font-sans font-black "
    transClasses += "text-stone-500 dark:text-stone-400 font-medium "
    sourceClasses += "text-orange-600 "
    if (settings?.borderStyle === 'glass') {
      containerClasses += "bg-white/40 dark:bg-stone-900/40 backdrop-blur-md "
    }
  } else if (theme === 'divine-glow') {
    containerClasses += "bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 border-amber-500/30 text-amber-950 dark:text-amber-100 shadow-[0_4px_30px_rgba(234,88,12,0.02)] "
    shlokaClasses += "text-orange-900 dark:text-amber-400 font-serif font-black [text-shadow:0_2px_8px_rgba(245,158,11,0.25)] "
    transClasses += "text-stone-700 dark:text-stone-300 font-serif font-light "
    sourceClasses += "text-amber-600 dark:text-amber-400 font-serif "
    if (settings?.borderStyle === 'ornate' || !settings?.borderStyle) {
      containerClasses += "relative overflow-hidden "
    }
  } else {
    // Classic Serene
    containerClasses += "bg-white dark:bg-stone-950 border-stone-200/40 dark:border-stone-850 shadow-sm "
    shlokaClasses += "text-stone-950 dark:text-stone-50 font-serif font-normal "
    transClasses += "text-stone-600 dark:text-stone-300 font-serif "
    sourceClasses += "text-saffron-600 dark:text-saffron-400 font-serif "
  }

  return (
    <div className={containerClasses}>
      {/* Decorative Ornate Corners for Divine Glow */}
      {theme === 'divine-glow' && (
        <div className="absolute inset-2 border border-dashed border-amber-500/10 pointer-events-none rounded-[1.8rem]" />
      )}

      {shlokaText && <p className={shlokaClasses}>&ldquo;{shlokaText}&rdquo;</p>}
      {translationText && <p className={transClasses}>{translationText}</p>}
      {sourceText && <span className={sourceClasses}>— {sourceText}</span>}
    </div>
  )
}
