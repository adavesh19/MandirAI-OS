'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, MapPin, Phone, Heart, CalendarDays, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function ModernElegantTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans text-stone-800 selection:bg-orange-200">
      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-[#f8f9fa] dark:bg-stone-950">
          <BlockRenderer blocks={page.blocks} theme="modern" sevas={sevas} templeAddress={temple.address} />
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────
              HERO SECTION — Split layout, very modern
          ───────────────────────────────────────────────────────── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Spiritual Center
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
                  {titleText}
                </h1>
                
                <p className="text-xl text-stone-500 font-medium leading-relaxed max-w-lg">
                  {descText}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href={`/temple/${temple.slug}/donate`}
                    className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                    <Heart className="h-5 w-5" /> Make an Offering
                  </Link>
                  <a href="#sevas"
                    className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" /> Book a Seva
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-tr from-orange-100 to-stone-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <span className="text-8xl mb-4">🛕</span>
                    <p className="text-stone-400 font-medium">Add your beautiful temple photography via the Website Manager</p>
                  </div>
                </div>
                {/* Floating Info Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-stone-100 max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-100 p-2 rounded-xl">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-stone-900">Open Today</h3>
                  </div>
                  <p className="text-sm text-stone-500 font-medium">{temple.timings.morning_open} - {temple.timings.morning_close}</p>
                  <p className="text-sm text-stone-500 font-medium">{temple.timings.evening_open} - {temple.timings.evening_close}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              QUICK INFO — Clean Grid
          ───────────────────────────────────────────────────────── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-stone-50 p-3 rounded-2xl">
                  <MapPin className="h-6 w-6 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">Our Location</h3>
                  <p className="text-stone-500">{temple.address?.city || 'Sacred Address'}</p>
                  <Link href={`/temple/${temple.slug}/contact`} className="text-orange-600 font-semibold text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Get Directions <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-stone-50 p-3 rounded-2xl">
                  <Phone className="h-6 w-6 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">Contact Us</h3>
                  <p className="text-stone-500">{temple.contactPhone || 'Phone Not Available'}</p>
                  <p className="text-stone-500">{temple.contactEmail || ''}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              ABOUT SECTION
          ───────────────────────────────────────────────────────── */}
          <section className="bg-white py-24 mt-12 border-t border-stone-100">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-4">About Us</h2>
              <h3 className="text-4xl font-extrabold text-stone-900 mb-8 leading-tight">Welcome to {temple.name}</h3>
              
              <div className="prose prose-lg mx-auto text-stone-500 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: htmlContent }} />
                
              <div className="mt-12">
                <Link href={`/temple/${temple.slug}/history`}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold px-8 py-3 rounded-xl inline-flex items-center gap-2 transition-colors">
                  Read Full History
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────
          SEVAS
      ───────────────────────────────────────────────────────── */}
      <section id="sevas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">Offerings</h2>
            <h3 className="text-4xl font-extrabold text-stone-900">Book a Seva</h3>
          </div>
          <Link href={`/temple/${temple.slug}/donate`}
            className="text-stone-500 hover:text-stone-900 font-bold flex items-center gap-2 transition-colors">
            Make a General Donation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(sevas && sevas.length > 0 ? sevas : [
            { id: '1', name: 'Archana', amount: 51, description: 'Daily basic offering' },
            { id: '2', name: 'Abhishekam', amount: 501, description: 'Sacred bath for the deity' },
            { id: '3', name: 'Annadanam', amount: 1001, description: 'Food donation for devotees' },
          ]).map((seva) => (
            <div key={seva.id} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col h-full">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">{seva.name}</h4>
                {seva.description && <p className="text-stone-500">{seva.description}</p>}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-2xl font-black text-stone-900">₹{seva.amount}</span>
                <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`}
                  className="bg-orange-100 text-orange-700 hover:bg-orange-600 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
