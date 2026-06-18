'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, MapPin, Heart, BookOpen, Sparkles } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function DivineGlowTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()

  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  return (
    <div className="bg-gradient-to-b from-[#170a01] via-[#0d0500] to-[#1c0c01] min-h-screen font-serif text-[#FAF9F6] selection:bg-amber-900 selection:text-amber-200">
      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-transparent">
          <BlockRenderer blocks={page.blocks} theme="divine-glow" sevas={sevas} templeAddress={temple.address} />
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────
              HERO SECTION — Luxury glowing ambient atmosphere
          ───────────────────────────────────────────────────────── */}
          <section className="relative min-h-[85vh] flex items-center justify-center border-b border-amber-500/20 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

            {/* Mandala Watermark */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
              <div className="w-[700px] h-[700px] border-[16px] border-double border-amber-400 rounded-full animate-spin-slow" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
              <div className="flex justify-center mb-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 w-12 h-12 bg-amber-500/30 rounded-full blur-md animate-pulse" />
                  <span className="text-4xl relative z-10">🕉️</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDD0] via-[#F4C430] to-[#E5A93B] drop-shadow-[0_2px_10px_rgba(234,88,12,0.3)] leading-tight">
                {titleText}
              </h1>

              <div className="flex items-center justify-center gap-4 py-2">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
              </div>

              <p className="text-lg md:text-xl text-amber-100/80 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                {descText}
              </p>

              <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="relative group overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold tracking-widest uppercase text-xs px-10 py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all">
                  <span className="relative z-10">Make an Offering</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              INFO STRIP — Glowing Divider
          ───────────────────────────────────────────────────────── */}
          <section className="bg-stone-950/80 backdrop-blur-md text-amber-100 py-8 border-y border-amber-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-amber-500/10">
                <div className="flex flex-col items-center text-center gap-2 md:px-4">
                  <Clock className="h-5 w-5 text-amber-450" />
                  <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-semibold font-sans">Darshan Hours</p>
                  <p className="font-bold tracking-wide">{temple.timings.morning_open} – {temple.timings.morning_close}</p>
                  <p className="font-bold tracking-wide">{temple.timings.evening_open} – {temple.timings.evening_close}</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2 pt-6 md:pt-0 md:px-4">
                  <MapPin className="h-5 w-5 text-amber-455" />
                  <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-semibold font-sans">Sacred Abode</p>
                  <p className="font-bold tracking-wide">{temple.address?.city || 'Sacred Location'}</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2 pt-6 md:pt-0 md:px-4">
                  <Phone className="h-5 w-5 text-amber-455" />
                  <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-semibold font-sans">Contact Desk</p>
                  <p className="font-bold tracking-wide">{temple.contactPhone || 'Contact Not Available'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              ABOUT SECTION
          ───────────────────────────────────────────────────────── */}
          <section className="py-24 relative overflow-hidden">
            {/* Glowing accents in corner */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
              <h2 className="text-4xl text-[#FFFDD0] font-bold tracking-wide">About the Temple</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
                <div className="w-2 h-2 rotate-45 border border-amber-500 bg-amber-950" />
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
              </div>

              <div className="prose prose-invert prose-lg mx-auto text-amber-100/70 leading-loose text-justify font-serif"
                dangerouslySetInnerHTML={{ __html: htmlContent }} />

              <div className="pt-6">
                <Link href={`/temple/${temple.slug}/history`}
                  className="inline-flex items-center gap-2 text-[#F4C430] hover:text-[#FFFDD0] font-bold border-b border-[#F4C430]/30 hover:border-[#FFFDD0] pb-1 transition-colors uppercase tracking-widest text-xs">
                  <BookOpen className="h-4 w-4" /> Discover Legend & History
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────
          SEVAS & OFFERINGS
          ───────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-amber-500/15 bg-black/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDD0] to-[#F4C430]">Sacred Offerings</h2>
            <p className="text-amber-150/70 font-light max-w-xl mx-auto text-sm">Participate in auspicious poojas and rituals. Select an offering below to book online.</p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(sevas && sevas.length > 0 ? sevas : [
              { id: '1', name: 'Nitya Archana', amount: 101, description: 'Basic daily chanting with deity blessings' },
              { id: '2', name: 'Maha Abhishekam', amount: 1008, description: 'Elaborate holy bath with milk, panchamrutam, and flowers' },
              { id: '3', name: 'Annadanam Seva', amount: 2501, description: 'Sponsor food feeding program for 50 visiting pilgrims' },
            ]).map((seva) => (
              <div key={seva.id} className="relative group bg-[#130700] border border-amber-500/20 p-8 rounded-2xl flex flex-col justify-between h-full shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all">
                <div className="flex-1 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide font-serif">{seva.name}</h3>
                  {seva.description && <p className="text-amber-100/60 text-xs leading-relaxed font-light">{seva.description}</p>}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-amber-500/10">
                  <span className="text-2xl font-extrabold text-[#F4C430] font-serif">₹{seva.amount}</span>
                  <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-colors shadow-sm">
                    Book Seva
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center space-y-6">
            <p className="text-amber-150/70 text-xs font-sans">You can also make a general contribution to support temple conservation work:</p>
            <Link href={`/temple/${temple.slug}/donate`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black px-10 py-4 uppercase tracking-widest text-xs rounded-xl shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 transition-all">
              <Heart className="h-4 w-4 animate-pulse fill-white" /> Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
