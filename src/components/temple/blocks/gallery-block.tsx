'use client'

import * as React from 'react'
import { useLanguage } from '@/components/shared/language-context'

interface GalleryImage {
  url: string
  caption?: Record<string, string>
}

interface GalleryBlockProps {
  data: {
    title?: Record<string, string>
    images?: GalleryImage[]
  }
  settings?: {
    columns?: '2' | '3' | '4'
  }
  theme?: string
}

export default function GalleryBlock({ data, settings, theme = 'classic' }: GalleryBlockProps) {
  const { t } = useLanguage()

  const defaultImages = [
    { url: 'https://images.unsplash.com/photo-1602631985686-2bb068645004?auto=format&fit=crop&w=600&q=80', caption: { en: 'Temple Sanctum' } },
    { url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80', caption: { en: 'Prayer Hall' } },
    { url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80', caption: { en: 'Evening Aarti' } }
  ]

  const list = data.images && data.images.length > 0 ? data.images : defaultImages

  let titleClasses = "font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 "
  let dividerClasses = "h-6 w-[1px] mx-auto mt-2 "
  let cardClasses = "group relative flex flex-col overflow-hidden transition-all duration-300 "
  let captionClasses = "p-3 text-center "
  let captionTextClasses = "text-xs font-semibold truncate "

  if (theme === 'heritage') {
    titleClasses = "font-serif text-3xl font-extrabold text-red-900 dark:text-red-200 "
    dividerClasses += "bg-[#D4AF37] "
    cardClasses += "bg-red-950/20 border border-[#D4AF37]/30 rounded-2xl hover:border-[#D4AF37] hover:shadow-lg "
    captionClasses += "bg-red-950/50 "
    captionTextClasses += "text-[#F5DEB3] font-serif "
  } else if (theme === 'modern') {
    titleClasses = "font-sans text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight "
    dividerClasses += "bg-orange-500 "
    cardClasses += "bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800 rounded-[2.2rem] hover:shadow-xl hover:-translate-y-1 "
    captionTextClasses += "text-stone-850 dark:text-stone-200 font-sans font-bold "
  } else if (theme === 'divine-glow') {
    titleClasses = "font-serif text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDD0] to-[#F4C430] tracking-wide "
    dividerClasses += "bg-amber-500/30 "
    cardClasses += "bg-[#130700] border border-amber-500/20 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] "
    captionClasses += "bg-black/40 "
    captionTextClasses += "text-amber-100 font-serif "
  } else {
    dividerClasses += "bg-saffron-300 "
    cardClasses += "bg-white dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850 rounded-2xl shadow-sm hover:shadow-md "
    captionTextClasses += "text-stone-700 dark:text-stone-300 font-serif "
  }

  // Column grid layout setting
  let gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  const columns = settings?.columns ? Number(settings.columns) : 3
  if (columns === 2) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
  } else if (columns === 4) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  }

  return (
    <div className="space-y-6 my-10 w-full">
      {data.title && (
        <div className="text-center">
          <h2 className={titleClasses}>
            {t(data.title)}
          </h2>
          <div className={dividerClasses} />
        </div>
      )}

      <div className={gridColsClass}>
        {list.map((img, i) => (
          <div 
            key={i} 
            className={cardClasses}
          >
            <div className="aspect-[4/3] relative w-full overflow-hidden bg-stone-200 dark:bg-stone-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.caption ? t(img.caption) : 'Gallery Image'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {img.caption && (
              <div className={captionClasses}>
                <p className={captionTextClasses}>
                  {t(img.caption)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
