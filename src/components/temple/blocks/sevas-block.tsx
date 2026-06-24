'use client'

import * as React from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

interface SevaItem {
  id: string
  name: string
  amount: number
  description: string | null
}

interface SevasBlockProps {
  data: {
    title?: Record<string, string>
    subtitle?: Record<string, string>
  }
  settings?: {
    columns?: '2' | '3' | '4'
    backgroundStyle?: 'light' | 'dark' | 'accent'
  }
  theme?: string
  sevas?: SevaItem[]
}

export default function SevasBlock({ data, settings, theme = 'classic', sevas = [] }: SevasBlockProps) {
  const { t } = useLanguage()

  // Fallback sevas if none in database
  const defaultSevas = [
    { id: '1', name: 'Special Archana', amount: 101, description: 'Personalized name recitation and blessings.' },
    { id: '2', name: 'Maha Abhishekam', amount: 1008, description: 'Elaborate holy bath for the primary deity with milk, honey, and sandal.' },
    { id: '3', name: 'Annadanam Seva', amount: 2500, description: 'Feeding 50 devotees on special occasions and festivals.' }
  ]

  const list = sevas && sevas.length > 0 ? sevas : defaultSevas

  // Container styling
  let containerBg = "py-10 px-6 my-8 rounded-3xl transition-all duration-300 "
  let titleClasses = "font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 text-center "
  let subtitleClasses = "text-center text-xs md:text-sm text-stone-500 mt-2 max-w-xl mx-auto font-light "
  let dividerClasses = "h-[2px] w-12 mx-auto mt-4 mb-8 "
  
  // Card styling
  let cardClasses = "p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full "
  let sevaNameClasses = "font-bold text-lg mb-1 "
  let sevaDescClasses = "text-xs text-stone-500 leading-relaxed "
  let priceClasses = "font-bold text-xl "
  let btnClasses = "px-4 py-2 text-xs font-bold transition-all rounded-xl "

  // Theme configuration
  if (theme === 'heritage') {
    containerBg += settings?.backgroundStyle === 'dark' ? "bg-red-950 text-[#F5DEB3] border border-[#D4AF37]/20 " : "bg-[#FAF9F6] text-stone-850 "
    titleClasses = "font-serif text-3xl font-extrabold text-red-900 dark:text-[#F5DEB3] text-center"
    dividerClasses += "bg-[#D4AF37]"
    cardClasses += "bg-white dark:bg-red-950/40 border-red-900/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-lg "
    sevaNameClasses += "text-red-900 dark:text-white font-serif "
    priceClasses += "text-red-800 dark:text-amber-400 font-serif "
    btnClasses += "bg-gradient-to-r from-red-800 to-red-950 text-[#F5DEB3] border border-[#D4AF37] hover:from-red-750 font-serif "
  } else if (theme === 'modern') {
    containerBg += settings?.backgroundStyle === 'dark' ? "bg-stone-900 text-white " : "bg-[#F8FAFC] text-stone-800 "
    titleClasses = "font-sans text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight text-center"
    dividerClasses += "bg-orange-500"
    cardClasses += "bg-white dark:bg-stone-900 border-stone-200/60 dark:border-stone-800 rounded-[2rem] hover:shadow-xl hover:-translate-y-0.5 "
    sevaNameClasses += "text-stone-900 dark:text-white font-sans font-black "
    priceClasses += "text-stone-900 dark:text-white font-sans font-extrabold "
    btnClasses += "bg-orange-100 text-orange-700 hover:bg-orange-600 hover:text-white font-sans "
  } else if (theme === 'divine-glow') {
    // Luxury theme styling
    containerBg += settings?.backgroundStyle === 'dark' ? "bg-gradient-to-b from-stone-950 to-amber-950 text-amber-100 border border-amber-600/30 " : "bg-gradient-to-b from-amber-50/20 to-orange-50/20 text-stone-850 "
    titleClasses = "font-serif text-3xl font-extrabold text-orange-900 dark:text-amber-400 text-center tracking-wide [text-shadow:0_2px_4px_rgba(234,88,12,0.1)]"
    dividerClasses += "bg-gradient-to-r from-transparent via-amber-500 to-transparent h-[3px] w-24"
    cardClasses += "bg-white/80 dark:bg-stone-950/80 border-amber-500/20 dark:border-amber-500/30 shadow-[0_4px_20px_rgba(234,88,12,0.04)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-sm "
    sevaNameClasses += "text-orange-950 dark:text-white font-serif tracking-wide "
    sevaDescClasses = "text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light "
    priceClasses += "text-amber-600 dark:text-amber-400 font-serif font-black "
    btnClasses += "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-700 font-serif uppercase tracking-wider text-[10px] "
  } else {
    // Classic Serene default
    containerBg += settings?.backgroundStyle === 'dark' ? "bg-stone-900 text-white " : "bg-stone-50/50 text-stone-800 "
    titleClasses = "font-serif text-3xl font-normal text-stone-900 dark:text-white text-center"
    dividerClasses += "bg-saffron-300"
    cardClasses += "bg-white dark:bg-stone-950 border-stone-200/50 dark:border-stone-850 hover:shadow-md "
    sevaNameClasses += "text-stone-900 dark:text-stone-100 font-serif "
    priceClasses += "text-stone-900 dark:text-stone-100 font-serif "
    btnClasses += "bg-saffron-600 hover:bg-saffron-550 text-white font-serif "
  }

  // Handle columns
  let gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  const cols = settings?.columns ? Number(settings.columns) : 3
  if (cols === 2) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
  } else if (cols === 4) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  }

  return (
    <div className={containerBg}>
      {data.title && (
        <div className="text-center">
          <h2 className={titleClasses}>{t(data.title)}</h2>
          {data.subtitle && <p className={subtitleClasses}>{t(data.subtitle)}</p>}
          <div className={dividerClasses} />
        </div>
      )}

      <div className={gridColsClass}>
        {list.map((seva) => (
          <div key={seva.id} className={cardClasses}>
            <div className="flex-1 mb-6">
              <h4 className={sevaNameClasses}>{seva.name}</h4>
              {seva.description && <p className={sevaDescClasses}>{seva.description}</p>}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-stone-100/50 dark:border-stone-800/40">
              <span className={priceClasses}>₹{seva.amount}</span>
              <Link
                href={`/temple/donate?seva=${seva.id}`}
                className={btnClasses}
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
