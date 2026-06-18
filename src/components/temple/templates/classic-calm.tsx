'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function ClassicCalmTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = React.useState<'seva' | 'donate'>('seva')
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  return (
    <div className="bg-stone-50 min-h-screen font-sans selection:bg-saffron-200">
      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-white dark:bg-stone-950">
          <BlockRenderer blocks={page.blocks} theme="classic" sevas={sevas} templeAddress={temple.address} />
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────
              HERO SECTION — Minimalist, Typography Focused
          ───────────────────────────────────────────────────────── */}
          <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-white">
            {/* Subtle mandala watermark in background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <div className="w-[800px] h-[800px] border-[40px] border-double border-saffron-900 rounded-full" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-3">
                <div className="h-[1px] w-12 bg-saffron-300" />
                <span className="text-saffron-600 font-semibold tracking-[0.2em] uppercase text-xs">
                  {temple.templeType ? `${temple.templeType} Temple` : 'Sacred Space'}
                </span>
                <div className="h-[1px] w-12 bg-saffron-300" />
              </div>

              <h1 className="font-serif text-5xl md:text-7xl text-stone-900 font-normal leading-tight">
                {titleText}
              </h1>

              <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                {descText}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-4 rounded-none tracking-widest text-sm uppercase transition-colors">
                  Make an Offering
                </Link>
                <a href="#explore" className="text-stone-500 hover:text-stone-900 uppercase tracking-widest text-sm font-medium transition-colors border-b border-transparent hover:border-stone-900 pb-1">
                  Explore Temple
                </a>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              INFO STRIP — Timings & Quick Info
          ───────────────────────────────────────────────────────── */}
          <section className="border-y border-stone-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                <div className="py-8 md:px-8 text-center md:text-left flex flex-col items-center md:items-start gap-2">
                  <Clock className="h-5 w-5 text-saffron-500 mb-2" />
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Darshan Timings</p>
                  <p className="text-stone-800 font-serif text-lg">{temple.timings.morning_open} - {temple.timings.morning_close}</p>
                  <p className="text-stone-800 font-serif text-lg">{temple.timings.evening_open} - {temple.timings.evening_close}</p>
                </div>
                <div className="py-8 md:px-8 text-center md:text-left flex flex-col items-center md:items-start gap-2">
                  <MapPin className="h-5 w-5 text-saffron-500 mb-2" />
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Location</p>
                  <p className="text-stone-800 font-serif text-lg leading-relaxed">
                    {temple.address?.city || 'Our sacred location'}
                    <br />
                    <Link href={`/temple/${temple.slug}/contact`} className="text-sm text-saffron-600 hover:text-saffron-700 font-sans tracking-wide mt-2 inline-block">
                      Get Directions &rarr;
                    </Link>
                  </p>
                </div>
                <div className="py-8 md:px-8 text-center md:text-left flex flex-col items-center md:items-start gap-2">
                  <Phone className="h-5 w-5 text-saffron-500 mb-2" />
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Contact</p>
                  <p className="text-stone-800 font-serif text-lg">{temple.contactPhone || 'Contact details not available'}</p>
                  <p className="text-stone-600 font-sans text-sm">{temple.contactEmail || ''}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              ABOUT SECTION
          ───────────────────────────────────────────────────────── */}
          <section id="explore" className="py-24 bg-stone-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
              <h2 className="font-serif text-4xl text-stone-900">About the Temple</h2>
              <div className="h-10 w-[1px] bg-saffron-300 mx-auto" />
              <div className="prose prose-stone prose-lg mx-auto text-stone-600 font-light leading-loose"
                dangerouslySetInnerHTML={{ __html: htmlContent }} />
              
              <div className="pt-8">
                <Link href={`/temple/${temple.slug}/history`}
                  className="inline-flex items-center gap-2 text-stone-900 uppercase tracking-widest text-sm font-semibold hover:text-saffron-600 transition-colors">
                  Read Our History <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────
          SEVAS & OFFERINGS
      ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl text-stone-900">Sacred Offerings</h2>
            <p className="text-stone-500 max-w-2xl mx-auto font-light">Participate in daily rituals or make a heartfelt donation to support the temple.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Sevas List */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-stone-200" />
                <h3 className="font-serif text-2xl text-stone-800">Book a Seva</h3>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              
              <div className="space-y-6">
                {(sevas && sevas.length > 0 ? sevas : [
                  { id: '1', name: 'Archana', amount: 51, description: 'Daily basic offering' },
                  { id: '2', name: 'Abhishekam', amount: 501, description: 'Sacred bath for the deity' },
                  { id: '3', name: 'Annadanam', amount: 1001, description: 'Food donation for devotees' },
                ]).map((seva) => (
                  <div key={seva.id} className="group flex justify-between items-start pb-6 border-b border-stone-100 hover:border-saffron-200 transition-colors">
                    <div>
                      <h4 className="font-serif text-lg text-stone-900 group-hover:text-saffron-600 transition-colors">{seva.name}</h4>
                      {seva.description && <p className="text-sm text-stone-500 mt-1">{seva.description}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg text-stone-900">₹{seva.amount}</p>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} className="text-xs text-saffron-600 uppercase tracking-wider font-semibold hover:underline mt-1 inline-block">
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Donation Card */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-stone-200" />
                <h3 className="font-serif text-2xl text-stone-800">Make a Donation</h3>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              <div className="bg-stone-50 p-8 sm:p-12 text-center">
                <Heart className="h-8 w-8 text-saffron-500 mx-auto mb-6" />
                <h4 className="font-serif text-2xl text-stone-900 mb-4">Support Our Temple</h4>
                <p className="text-stone-600 font-light mb-8 leading-relaxed">
                  Your generous contributions help us maintain the temple premises, conduct daily rituals, and serve the community through various charitable activities.
                </p>
                <Link href={`/temple/${temple.slug}/donate`}
                  className="inline-block bg-stone-900 hover:bg-saffron-700 text-white px-8 py-4 uppercase tracking-widest text-sm transition-colors w-full sm:w-auto">
                  Donate Online
                </Link>
                <p className="text-xs text-stone-400 mt-6 uppercase tracking-wider">All donations are 80G tax exempt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
