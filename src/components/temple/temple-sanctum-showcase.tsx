'use client'

import React, { useState } from 'react'
import { Sparkles, MapPin, Eye, BookOpen, Shield, Heart, Flower2, Compass } from 'lucide-react'

interface TempleSanctumShowcaseProps {
  deityImageUrl?: string | null
  templeImageUrl?: string | null
  templeName: string
  primaryDeity: string
  historyText?: string | null
  description?: string | null
  themeVariant?: 'classic' | 'modern' | 'heritage' | 'divine' | 'tech' | 'celestial'
}

export default function TempleSanctumShowcase({
  deityImageUrl,
  templeImageUrl,
  templeName,
  primaryDeity,
  historyText,
  description,
  themeVariant = 'classic'
}: TempleSanctumShowcaseProps) {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null)

  // Fallbacks if not uploaded
  const fallbackGod = 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&w=1200&q=80'
  const fallbackMath = 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&w=1200&q=80'

  const godImage = deityImageUrl || fallbackGod
  const mathImage = templeImageUrl || fallbackMath

  const isDark = ['heritage', 'divine', 'tech', 'celestial'].includes(themeVariant)

  return (
    <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 relative z-10 ${
      isDark ? 'text-white' : 'text-[#2c1810]'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Sacred Sanctum & Kshetra Purana
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Divine Darshan & Sacred Heritage
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-stone-300' : 'text-[#2c1810]/75'
          }`}>
            Step into the sacred presence of {primaryDeity} and experience the living spiritual legacy of our holy kshetra.
          </p>
        </div>

        {/* 2-Column Divine Showcase: God Image + Math Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* 1. GOD / PRESIDING DEITY SHOWCASE */}
          <div className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl border ${
            isDark 
              ? 'bg-stone-900/80 backdrop-blur-2xl border-amber-500/30 hover:border-amber-400/60'
              : 'bg-white/85 backdrop-blur-2xl border-[#c8923f]/30 hover:border-[#c8923f]/60'
          }`}>
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5 text-amber-500" />
                  Pradhana Vigraha Darshan
                </span>
                <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                  Moolavar Sannidhi
                </span>
              </div>

              {/* God Photo Container with Sacred Frame */}
              <div 
                onClick={() => setActiveImageModal(godImage)}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl group cursor-pointer mb-6"
              >
                <img
                  src={godImage}
                  alt={`Sacred Darshan of ${primaryDeity}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Divine Glow & Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                      Presiding Deity
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow-md">
                      {primaryDeity}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl mb-2">
                Blessed Sanctum of {primaryDeity}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-[#2c1810]/75'
              }`}>
                {description || `The sanctum sanctorum radiates centuries of divine tapasya, Vedic archana, and eternal blessings. Devotees from across the world receive spiritual peace and fulfillment upon darshan.`}
              </p>
            </div>

            {/* Sacred Highlights List */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-amber-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Nitya Maha Pooja Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Vedic Panchamrita Snana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Special Alankaram Aradhana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Akhand Deepa Jyoti</span>
              </div>
            </div>
          </div>

          {/* 2. MATH / TEMPLE COMPLEX SHOWCASE */}
          <div className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl border ${
            isDark 
              ? 'bg-stone-900/80 backdrop-blur-2xl border-amber-500/30 hover:border-amber-400/60'
              : 'bg-white/85 backdrop-blur-2xl border-[#c8923f]/30 hover:border-[#c8923f]/60'
          }`}>
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-orange-500" />
                  Kshetra & Matha Complex
                </span>
                <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                  Praakaram & Architecture
                </span>
              </div>

              {/* Math / Temple Photo Container */}
              <div 
                onClick={() => setActiveImageModal(mathImage)}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-orange-400/40 shadow-2xl group cursor-pointer mb-6"
              >
                <img
                  src={mathImage}
                  alt={`Sacred Complex of ${templeName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                      Holy Kshetra
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow-md">
                      {templeName}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl mb-2">
                Sthala Purana & Sacred History
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-[#2c1810]/75'
              }`}>
                {historyText || `Established as an authentic center of Vedic dharma and satvik devotion, this holy complex offers peaceful praakaram corridors, nitya annadanam halls, and consecrated prayer sanctums for all devotees.`}
              </p>
            </div>

            {/* Kshetra Attributes */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-amber-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Nitya Annadanam Free Meals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Veda Pathashala Heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Goshala Cow Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>100% Tax Exemption 80G</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Screen Image Zoom Modal */}
      {activeImageModal && (
        <div 
          onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <img src={activeImageModal} alt="Enlarged Sacred View" className="w-full h-full object-contain max-h-[85vh] mx-auto" />
            <button 
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/70 text-white font-bold text-xs hover:bg-black transition-colors"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
