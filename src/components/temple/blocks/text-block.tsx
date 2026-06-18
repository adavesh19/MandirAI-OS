'use client'

import * as React from 'react'
import { useLanguage } from '@/components/shared/language-context'

interface TextBlockProps {
  data: {
    heading?: Record<string, string>
    html?: Record<string, string>
  }
  settings?: {
    align?: 'left' | 'center' | 'justify'
    size?: 'small' | 'medium' | 'large'
  }
  theme?: 'classic' | 'heritage' | 'modern' | 'divine-glow'
}

export default function TextBlock({ data, settings, theme = 'classic' }: TextBlockProps) {
  const { t } = useLanguage()

  const htmlContent = data.html 
    ? t(data.html) 
    : '<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>'

  let containerClasses = "max-w-4xl mx-auto px-6 py-12 space-y-6 relative "
  let headingClasses = "text-3xl "
  let bodyClasses = "prose dark:prose-invert mx-auto leading-loose "
  let dividerNode = null

  // Alignment settings
  const align = settings?.align || 'center'
  if (align === 'left') {
    containerClasses += "text-left "
    bodyClasses += "text-left "
  } else if (align === 'justify') {
    containerClasses += "text-justify "
    bodyClasses += "text-justify "
  } else {
    containerClasses += "text-center "
    bodyClasses += "text-center "
  }

  // Sizing settings
  const size = settings?.size || 'medium'
  if (size === 'small') {
    bodyClasses += "prose-sm "
  } else if (size === 'large') {
    bodyClasses += "prose-xl "
  } else {
    bodyClasses += "prose-lg "
  }

  if (theme === 'heritage') {
    containerClasses += "font-serif text-stone-850 dark:text-stone-250 bg-[#FAF6F0]/30 border border-[#D4AF37]/10 p-10 rounded-3xl "
    headingClasses += "font-serif font-black text-red-900 dark:text-red-200 text-center "
    bodyClasses += "font-serif text-stone-850 dark:text-stone-300 "
    dividerNode = (
      <div className="flex items-center justify-center gap-3 my-4">
        <div className="h-[1px] w-16 bg-red-200" />
        <div className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37]" />
        <div className="h-[1px] w-16 bg-red-200" />
      </div>
    )
  } else if (theme === 'modern') {
    containerClasses += "font-sans text-stone-800 dark:text-stone-200 "
    headingClasses += "font-sans font-extrabold text-stone-900 dark:text-white tracking-tight "
    bodyClasses += "font-sans text-stone-600 dark:text-stone-450 "
    dividerNode = <div className="h-1 w-12 bg-orange-500 mx-auto my-4 rounded-full" />
  } else if (theme === 'divine-glow') {
    containerClasses += "font-serif text-amber-100/90 bg-gradient-to-b from-stone-950/40 to-[#1c0d02]/30 border border-amber-500/20 p-10 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-sm "
    headingClasses += "font-serif font-extrabold text-[#FFFDD0] [text-shadow:0_1px_3px_rgba(234,88,12,0.15)] "
    bodyClasses += "font-serif text-amber-100/80 "
    dividerNode = (
      <div className="flex items-center justify-center gap-3 my-4">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500" />
        <div className="w-2 h-2 rotate-45 border border-amber-400 bg-amber-950" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500" />
      </div>
    )
  } else {
    containerClasses += "font-serif text-stone-800 dark:text-stone-250 "
    headingClasses += "font-serif font-bold text-stone-900 dark:text-stone-50 "
    bodyClasses += "font-serif text-stone-600 dark:text-stone-300 font-light "
    dividerNode = <div className="h-8 w-[1px] bg-saffron-300 mx-auto my-4" />
  }

  return (
    <div className={containerClasses}>
      {/* Corner Ornaments for Heritage */}
      {theme === 'heritage' && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-lg m-4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/30 rounded-tr-lg m-4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/30 rounded-bl-lg m-4 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-lg m-4 pointer-events-none" />
        </>
      )}

      {data.heading && (
        <>
          <h2 className={headingClasses}>
            {t(data.heading)}
          </h2>
          {dividerNode}
        </>
      )}
      
      <div 
        className={bodyClasses}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  )
}
