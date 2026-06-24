'use client'

import * as React from 'react'
import { MapPin } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

interface MapBlockProps {
  data: {
    addressQuery?: Record<string, string>
  }
  settings?: {
    zoom?: string
    height?: string
  }
  theme?: string
  templeAddress?: {
    line1?: string
    city?: string
    state?: string
    country?: string
    pincode?: string
  }
}

export default function MapBlock({ data, settings, theme = 'classic', templeAddress = {} }: MapBlockProps) {
  const { t } = useLanguage()

  // Get active query string
  const customQuery = data.addressQuery ? t(data.addressQuery) : ''
  
  // Format fallback query from temple profile
  const fallbackQuery = [
    templeAddress.line1,
    templeAddress.city,
    templeAddress.state,
    templeAddress.pincode,
    templeAddress.country || 'India'
  ].filter(Boolean).join(', ')

  const activeQuery = customQuery || fallbackQuery || 'Hindu Temple, India'

  const zoom = settings?.zoom ? Number(settings.zoom) : 15
  const height = settings?.height || '450px'

  // Map embed URL using search query
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(activeQuery)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`

  // Theme styling configurations
  let containerClasses = "my-10 overflow-hidden border transition-all duration-300 "
  let labelClasses = "p-3 flex items-center justify-center gap-2 text-xs font-semibold "

  if (theme === 'heritage') {
    containerClasses += "border-[#D4AF37]/30 bg-red-950 rounded-2xl shadow-lg "
    labelClasses += "bg-red-900 text-[#F5DEB3] font-serif border-t border-[#D4AF37]/20 "
  } else if (theme === 'modern') {
    containerClasses += "border-stone-200/50 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-[2.2rem] shadow-md hover:shadow-lg "
    labelClasses += "bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-300 font-sans "
  } else if (theme === 'divine-glow') {
    containerClasses += "border-amber-500/20 bg-gradient-to-r from-stone-950 to-[#1c0d02] rounded-3xl shadow-[0_4px_35px_rgba(0,0,0,0.5)] "
    labelClasses += "bg-black/40 text-amber-100 font-serif border-t border-amber-500/10 tracking-wide "
  } else {
    // Classic Serene
    containerClasses += "border-stone-200/50 dark:border-stone-850 bg-white dark:bg-stone-950 rounded-2xl shadow-sm "
    labelClasses += "bg-stone-50/50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-serif "
  }

  return (
    <div className={containerClasses}>
      <div style={{ height }} className="w-full relative bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
        {/* Responsive Google Maps Embed frame */}
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          title="Temple Map Location"
          allowFullScreen
        />
      </div>
      <div className={labelClasses}>
        <MapPin className="h-4 w-4 text-saffron-600" />
        <span>Location: {activeQuery}</span>
      </div>
    </div>
  )
}
