'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, MapPin, Heart, BookOpen, Star } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function HeritageGrandTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-serif text-stone-800 selection:bg-red-200">
      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-[#FAF9F6] dark:bg-stone-950">
          <BlockRenderer blocks={page.blocks} theme="heritage" sevas={sevas} templeAddress={temple.address} />
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────
              HERO SECTION — Rich, Traditional, Grand
          ───────────────────────────────────────────────────────── */}
          <section className="relative min-h-[85vh] flex items-center justify-center border-b-8 border-red-900">
            {/* Background Image/Pattern */}
            <div className="absolute inset-0 bg-stone-900 overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
              <div className="flex justify-center mb-6">
                <span className="text-4xl">🕉️</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-[#F5DEB3] drop-shadow-xl tracking-wide leading-tight">
                {titleText}
              </h1>
              
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <Star className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
                <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>

              <p className="text-xl text-stone-200 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {descText}
              </p>

              <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-[#F5DEB3] border-2 border-[#D4AF37] px-10 py-4 font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  Make an Offering
                </Link>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              INFO BAR — Gold Accents
          ───────────────────────────────────────────────────────── */}
          <section className="bg-red-900 text-[#F5DEB3] py-6 border-b-4 border-[#D4AF37]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-red-200">Darshan</p>
                    <p className="font-bold tracking-wide">{temple.timings.morning_open} – {temple.timings.morning_close} | {temple.timings.evening_open} – {temple.timings.evening_close}</p>
                  </div>
                </div>
                <div className="hidden md:block h-10 w-px bg-red-800" />
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-red-200">Location</p>
                    <p className="font-bold tracking-wide">{temple.address?.city || 'Sacred Location'}</p>
                  </div>
                </div>
                <div className="hidden md:block h-10 w-px bg-red-800" />
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-red-200">Contact</p>
                    <p className="font-bold tracking-wide">{temple.contactPhone || 'Contact Not Available'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              ABOUT SECTION — Ornamental
          ───────────────────────────────────────────────────────── */}
          <section className="py-24 relative overflow-hidden">
            {/* Corner Ornaments */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-red-900/10 rounded-tl-full m-8 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-red-900/10 rounded-tr-full m-8 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-red-900/10 rounded-bl-full m-8 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-red-900/10 rounded-br-full m-8 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl text-red-900 font-bold mb-6">About the Temple</h2>
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-24 bg-red-200" />
                <div className="w-3 h-3 rotate-45 bg-[#D4AF37]" />
                <div className="h-px w-24 bg-red-200" />
              </div>
              
              <div className="prose prose-stone prose-lg mx-auto text-stone-700 leading-loose text-justify font-serif"
                dangerouslySetInnerHTML={{ __html: htmlContent }} />

              <div className="mt-12">
                <Link href={`/temple/${temple.slug}/history`}
                  className="inline-flex items-center gap-2 text-red-900 font-bold border-b-2 border-red-900 hover:text-[#D4AF37] hover:border-[#D4AF37] pb-1 transition-colors uppercase tracking-widest text-sm">
                  <BookOpen className="h-4 w-4" /> Explore History
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────
          SEVAS & OFFERINGS — Grid Layout
      ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-red-900 text-[#F5DEB3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Sacred Sevas</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-[#D4AF37]/30" />
              <div className="w-3 h-3 rotate-45 bg-[#D4AF37]" />
              <div className="h-px w-24 bg-[#D4AF37]/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(sevas && sevas.length > 0 ? sevas : [
              { id: '1', name: 'Maha Pooja', amount: 1001, description: 'Complete traditional ritual' },
              { id: '2', name: 'Abhishekam', amount: 501, description: 'Holy bath offering' },
              { id: '3', name: 'Archana', amount: 101, description: 'Name recitation' },
            ]).map((seva) => (
              <div key={seva.id} className="bg-red-950 border border-[#D4AF37]/30 p-8 text-center hover:border-[#D4AF37] transition-colors relative group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{seva.name}</h3>
                  {seva.description && <p className="text-red-200 text-sm mb-6">{seva.description}</p>}
                  <p className="text-3xl font-bold text-[#D4AF37] mb-8">₹{seva.amount}</p>
                  <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`}
                    className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-red-900 px-6 py-2 uppercase tracking-widest text-sm font-bold transition-colors">
                    Book Seva
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-red-200 mb-6 font-sans">For general donations toward temple maintenance and Annadanam:</p>
            <Link href={`/temple/${temple.slug}/donate`}
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-red-900 font-black px-10 py-4 uppercase tracking-widest transition-colors shadow-xl">
              <Heart className="h-5 w-5" /> Make a Donation
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
