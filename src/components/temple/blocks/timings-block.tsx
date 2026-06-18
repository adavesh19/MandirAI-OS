'use client'

import * as React from 'react'
import { Clock, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

interface TimingsBlockProps {
  data: {
    morning?: Record<string, string>
    evening?: Record<string, string>
    location?: Record<string, string>
    contact?: Record<string, string>
  }
  settings?: any
  theme?: 'classic' | 'heritage' | 'modern' | 'divine-glow'
}

export default function TimingsBlock({ data, settings, theme = 'classic' }: TimingsBlockProps) {
  const { t } = useLanguage()

  let cardClasses = "border overflow-hidden my-8 transition-all duration-300 "
  let gridClasses = "grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x "
  let sectionClasses = "p-6 flex flex-col items-center text-center md:items-start md:text-left gap-2.5 "
  let iconClasses = "h-6 w-6 mb-1 "
  let labelClasses = "text-[10px] uppercase font-bold tracking-wider "
  let textClasses = "text-sm font-serif leading-relaxed "

  if (theme === 'heritage') {
    cardClasses += "bg-red-950 border-[#D4AF37]/30 rounded-2xl shadow-md "
    gridClasses += "divide-[#D4AF37]/20 "
    iconClasses += "text-[#D4AF37] "
    labelClasses += "text-amber-400/80 "
    textClasses += "text-[#F5DEB3] font-medium "
  } else if (theme === 'modern') {
    cardClasses += "bg-white dark:bg-stone-900 border-stone-200/50 dark:border-stone-800 rounded-[2.2rem] shadow-md hover:shadow-lg "
    gridClasses += "divide-stone-100 dark:divide-stone-800 "
    iconClasses += "text-orange-600 "
    labelClasses += "text-stone-400 font-sans "
    textClasses += "text-stone-800 dark:text-stone-200 font-sans font-semibold "
  } else if (theme === 'divine-glow') {
    cardClasses += "bg-gradient-to-r from-stone-950/80 to-[#1c0d02]/85 border-amber-500/20 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] "
    gridClasses += "divide-amber-500/10 "
    iconClasses += "text-amber-400 "
    labelClasses += "text-amber-500/70 font-sans "
    textClasses += "text-amber-100 font-serif "
  } else {
    cardClasses += "bg-white dark:bg-stone-955 border-stone-200/50 dark:border-stone-855 rounded-2xl shadow-sm "
    gridClasses += "divide-stone-100 dark:divide-stone-800 "
    iconClasses += "text-saffron-600 "
    labelClasses += "text-stone-400 font-sans "
    textClasses += "text-stone-800 dark:text-stone-100 font-serif "
  }

  return (
    <div className={cardClasses}>
      <div className={gridClasses}>
        {/* Timings */}
        <div className={sectionClasses}>
          <Clock className={iconClasses} />
          <h4 className={labelClasses}>Darshan Timings</h4>
          <p className={textClasses}>
            {data.morning ? `${t(data.morning)} (Morning)` : '06:00 AM - 12:00 PM'}
          </p>
          <p className={textClasses}>
            {data.evening ? `${t(data.evening)} (Evening)` : '04:00 PM - 09:00 PM'}
          </p>
        </div>

        {/* Location */}
        <div className={sectionClasses}>
          <MapPin className={iconClasses} />
          <h4 className={labelClasses}>Temple Location</h4>
          <p className={textClasses}>
            {data.location ? t(data.location) : 'Temple Address'}
          </p>
        </div>

        {/* Contact info */}
        <div className={sectionClasses}>
          <Phone className={iconClasses} />
          <h4 className={labelClasses}>Contact & Inquiries</h4>
          <p className={textClasses}>
            {data.contact ? t(data.contact) : 'Contact Phone'}
          </p>
        </div>
      </div>
    </div>
  )
}
