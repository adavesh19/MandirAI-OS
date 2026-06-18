import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Calendar, MapPin, Users, ArrowRight, Star, Terminal, Cpu, Database, Activity } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface PageProps {
  params: Promise<{ slug: string }>
}

function parseJson(value: unknown): Record<string, string> {
  if (!value) return {}
  if (typeof value === 'object' && !Array.isArray(value)) return value as Record<string, string>
  if (typeof value === 'string') {
    try { return JSON.parse(value) } catch { return {} }
  }
  return {}
}

function getEnglish(json: unknown, fallback = ''): string {
  const obj = parseJson(json)
  return obj.en || obj.english || Object.values(obj)[0] || fallback
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

const EVENT_TYPE_CONFIG: Record<string, { label: string; icon: string; bg: string; text: string }> = {
  FESTIVAL:    { label: 'Festival',    icon: '🪔', bg: 'bg-amber-100 text-amber-800', bgDark: 'bg-amber-950/40 text-amber-400 border border-amber-900/30' },
  POOJA:       { label: 'Pooja',       icon: '🙏', bg: 'bg-orange-100 text-orange-800', bgDark: 'bg-orange-950/40 text-orange-400 border border-orange-900/30' },
  SATSANG:     { label: 'Satsang',     icon: '🎶', bg: 'bg-rose-100 text-rose-800', bgDark: 'bg-rose-950/40 text-rose-400 border border-rose-900/30' },
  PRAVACHAN:   { label: 'Pravachan',   icon: '📿', bg: 'bg-purple-100 text-purple-800', bgDark: 'bg-purple-950/40 text-purple-400 border border-purple-900/30' },
  CULTURAL:    { label: 'Cultural',    icon: '🎭', bg: 'bg-blue-100 text-blue-800', bgDark: 'bg-blue-950/40 text-blue-400 border border-blue-900/30' },
  CHARITABLE:  { label: 'Charitable',  icon: '🤲', bg: 'bg-emerald-100 text-emerald-800', bgDark: 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' },
  WORKSHOP:    { label: 'Workshop',    icon: '📚', bg: 'bg-teal-100 text-teal-800', bgDark: 'bg-teal-950/40 text-teal-400 border border-teal-900/30' },
  YATRA:       { label: 'Yatra',       icon: '🚩', bg: 'bg-red-100 text-red-800', bgDark: 'bg-red-950/40 text-red-400 border border-red-900/30' },
  OTHER:       { label: 'Event',       icon: '⭐', bg: 'bg-stone-100 text-stone-800', bgDark: 'bg-slate-900/50 text-slate-400 border border-slate-800' },
} as any

export default async function EventsPage({ params }: PageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const events = await prisma.event.findMany({
    where: {
      templeId: temple.id,
      status: { in: ['PUBLISHED', 'ONGOING'] },
      endDate: { gte: new Date() },
    },
    orderBy: { startDate: 'asc' },
  })

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  // ── SEO: Event JSON-LD ──
  const jsonLdEvents = events.map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: getEnglish(e.title, 'Untitled Event'),
    description: getEnglish(e.description, ''),
    startDate: e.startDate.toISOString(),
    endDate: e.endDate.toISOString(),
    eventStatus: e.status === 'ONGOING' ? 'https://schema.org/EventMovedOnline' : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: e.location || temple.name,
    },
    offers: {
      '@type': 'Offer',
      price: e.isFree ? '0' : Number(e.ticketPrice).toString(),
      priceCurrency: 'INR',
      availability: e.isRegistrationOpen ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `https://temple-ai.os/temple/${slug}/book?eventId=${e.id}`
    }
  }))

  // ─── 1. HIGH-TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-20 font-mono text-slate-300 relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvents) }}
        />
        
        {/* HUD Header Banner */}
        <div className="relative border border-cyan-850 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
          {/* Corner Decors */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="absolute -right-8 -top-8 text-[12rem] opacity-5 select-none pointer-events-none rotate-12">🪔</div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 mr-2 animate-pulse" />
              CHRONOLOGICAL EVENT STREAM // SCHEDULE_CALENDAR
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              System Calendar Events
            </h1>
            <p className="text-sm text-slate-400 border-l-2 border-cyan-500 pl-3 leading-relaxed">
              Temporal logs of festivals, discourse relays, and ritual streams hosted at the sanctuary coordinates.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-20 px-4 border border-dashed border-slate-800 rounded-3xl bg-slate-950/40">
            <Calendar className="mx-auto h-12 w-12 text-slate-700 mb-4" />
            <h3 className="text-base font-bold text-white mb-2">No Upcoming Event Streams</h3>
            <p className="text-xs text-slate-500">No scheduled festivals found in the database. Stream logs are currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const title = getEnglish(event.title, 'Untitled Event')
              const description = getEnglish(event.description, '')
              const config = EVENT_TYPE_CONFIG[event.eventType] || EVENT_TYPE_CONFIG.OTHER
              const isOngoing = event.status === 'ONGOING'

              return (
                <div key={event.id} className="group flex flex-col bg-slate-950 border border-slate-850 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 relative h-full">
                  
                  {/* Status Bar */}
                  <div className="h-1.5 w-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors" />

                  {/* Header Image / Poster */}
                  <div className="h-44 bg-slate-900 relative overflow-hidden shrink-0 border-b border-slate-900">
                    {event.posterUrl ? (
                      <img 
                        src={event.posterUrl} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                        <span className="text-5xl opacity-10 group-hover:scale-110 transition-transform">
                          {config.icon}
                        </span>
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-bold ${(config as any).bgDark || 'bg-slate-900 text-slate-400'}`}>
                        <span>{config.icon}</span> {config.label}
                      </span>
                    </div>
                    {isOngoing && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold bg-red-950 border border-red-800 text-red-400 animate-pulse">
                          STREAMING LIVE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors uppercase truncate">
                      {title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed flex-1 font-mono">
                      {description || 'No event description logs.'}
                    </p>

                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 text-[10px] space-y-2.5 leading-relaxed font-mono">
                      <div className="flex items-center gap-2.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {event.isFree ? 'Free Entry' : `₹${event.ticketPrice}`}
                        </span>
                      </div>
                      <Link 
                        href={event.isRegistrationOpen ? `/temple/${slug}/book?eventId=${event.id}` : '#'}
                        className={`inline-flex items-center justify-center h-8 px-4 rounded-xl text-[9px] font-bold uppercase transition-all ${
                          event.isRegistrationOpen 
                            ? 'bg-cyan-950 border border-cyan-800 hover:border-cyan-500 text-cyan-400' 
                            : 'bg-slate-900 border border-slate-850 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Register
                        <ArrowRight className="w-3 h-3 ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* High-Tech Section 1: Types of Gatherings */}
        <div className="pt-16 border-t border-slate-900">
          <div className="mb-10 text-center space-y-2">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">// SYSTEM NODES INDEX</span>
            <h2 className="text-3xl font-black text-white">Event Classification Ledger</h2>
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">Categorized stream endpoints operating periodically within the temple cluster.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Major Festivals', icon: '🎆', count: '12/Year' },
              { label: 'Weekly Satsang', icon: '🎵', count: 'Every Sunday' },
              { label: 'Vedic Workshops', icon: '📜', count: 'Monthly' },
              { label: 'Youth Retreats', icon: '🧘', count: 'Quarterly' }
            ].map((cat, i) => (
              <Card key={i} className="border border-slate-805 bg-slate-950 group overflow-hidden text-center cursor-pointer hover:border-cyan-500/20 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <h4 className="font-bold text-white text-xs uppercase mb-1">{cat.label}</h4>
                  <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">{cat.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    )
  }

  // ─── ORIGINAL CLASSIC / OTHER THEMES ───
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvents) }}
      />
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/60 to-transparent blur-3xl rounded-full -z-10 opacity-60" />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-white p-8 sm:p-12 shadow-sm border border-amber-100/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-multiply" />
        <div className="absolute -right-8 -top-8 text-[12rem] opacity-5 select-none pointer-events-none rotate-12">🪔</div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/50 backdrop-blur-md">
            <span className="text-xs font-bold text-amber-700 tracking-widest uppercase flex items-center gap-2">
              <Star className="w-3 h-3" />
              Sacred Calendar
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Upcoming Festivals & Events
          </h1>
          <p className="text-xl text-stone-600 font-medium">
            Join the community at <span className="text-amber-700">{temple.name}</span> to celebrate traditions, spirituality, and culture.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-20 px-4 border border-dashed border-stone-200 rounded-3xl bg-white/50">
          <Calendar className="mx-auto h-12 w-12 text-stone-300 mb-4" />
          <h3 className="text-lg font-heading font-bold text-stone-900 mb-2">No Upcoming Events</h3>
          <p className="text-stone-500">There are no festivals or events scheduled at the moment. Please check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const title = getEnglish(event.title, 'Untitled Event')
            const description = getEnglish(event.description, '')
            const config = EVENT_TYPE_CONFIG[event.eventType] || EVENT_TYPE_CONFIG.OTHER
            const isOngoing = event.status === 'ONGOING'

            return (
              <div key={event.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl ring-1 ring-stone-200 hover:ring-amber-300 transition-all duration-500 relative">
                
                {/* Poster Image */}
                <div className="h-48 bg-stone-100 relative overflow-hidden shrink-0">
                  {event.posterUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={event.posterUrl} 
                      alt={title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center">
                      <span className="text-6xl opacity-20 filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">
                        {config.icon}
                      </span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${config.bg} ${config.text}`}>
                      <span>{config.icon}</span> {config.label}
                    </span>
                  </div>
                  {isOngoing && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm bg-red-500 text-white animate-pulse">
                        LIVE NOW
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-stone-500 text-sm line-clamp-2 mb-6 flex-1">
                    {description || 'No description provided.'}
                  </p>

                  <div className="space-y-3 mb-6 bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <div className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <Calendar className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex flex-col">
                        <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                        <span className="text-xs text-stone-500">{formatTime(event.startDate)} onwards</span>
                      </div>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-3 text-sm font-medium text-stone-700">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                          <MapPin className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-stone-400" />
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                        {event.isFree ? 'Free Entry' : `₹${event.ticketPrice}`}
                      </span>
                    </div>
                    <Link 
                      href={event.isRegistrationOpen ? `/temple/${slug}/book?eventId=${event.id}` : '#'}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        event.isRegistrationOpen 
                          ? 'bg-stone-900 text-white hover:bg-amber-600 group-hover:w-full group-hover:justify-between group-hover:px-4' 
                          : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <span className="hidden group-hover:inline-block font-bold text-sm whitespace-nowrap overflow-hidden">
                        {event.isRegistrationOpen ? 'Register Now' : 'Closed'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Extreme Section 1: Event Categories */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Types of Gatherings</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">Explore the diverse spiritual and cultural events hosted at the sanctuary.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Major Festivals', icon: '🎆', count: '12/Year' },
            { label: 'Weekly Satsang', icon: '🎵', count: 'Every Sunday' },
            { label: 'Vedic Workshops', icon: '📜', count: 'Monthly' },
            { label: 'Youth Retreats', icon: '🧘', count: 'Quarterly' }
          ].map((cat, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white group rounded-2xl overflow-hidden text-center cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto bg-stone-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-amber-50 transition-all">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-stone-900 mb-1">{cat.label}</h4>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{cat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Extreme Section 2: Annual Calendar Overview */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Annual Brahmotsavam</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">The grand 9-day annual festival that attracts millions of devotees.</p>
        </div>
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold tracking-widest uppercase">
                Mega Event
              </div>
              <h3 className="font-heading text-4xl font-bold">Chaitra Navaratri & Brahmotsavam</h3>
              <p className="text-stone-400 leading-relaxed text-lg">
                Experience nine days of divine grace with daily chariot processions (Vahanas), continuous Veda Parayana, and grand cultural performances by acclaimed artists from across the country.
              </p>
              <ul className="space-y-3">
                {['Daily Vahana Seva', 'Maha Rathotsavam', 'Pushpa Yagam'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-300">
                    <span className="text-amber-500">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-stone-800 rounded-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-stone-700 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-30">🎊</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Section 3: Past Highlights (Gallery) */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Glimpses of Devotion</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">Moments captured during our recent grand celebrations.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className={`bg-stone-200 rounded-2xl relative overflow-hidden group ${i === 1 || i === 4 ? 'col-span-2 row-span-2 h-64' : 'h-32'}`}>
              <div className="absolute inset-0 bg-stone-800 opacity-20 group-hover:opacity-0 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 group-hover:scale-125 transition-transform duration-500">📸</div>
            </div>
          ))}
        </div>
      </div>

      {/* Extreme Section 4: Sponsorship Opportunities */}
      <div className="pt-16 pb-12">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Event Sponsorship</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">Support the temple by sponsoring specific activities during major festivals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Annadanam Sponsor', amount: '₹50,000', items: 'Feeds 1000 devotees' },
            { title: 'Pushpa Alankaram', amount: '₹25,000', items: 'Floral decoration for main deity' },
            { title: 'Cultural Program', amount: '₹1,00,000', items: 'Sponsor traditional music/dance' }
          ].map((sponsor, i) => (
            <Card key={i} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-350 bg-white group rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50" />
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💎
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-stone-900 mb-1">{sponsor.title}</h3>
                  <p className="text-amber-600 font-black text-2xl mb-3">{sponsor.amount}</p>
                  <p className="text-stone-500 text-sm">{sponsor.items}</p>
                </div>
                <button className="w-full py-2.5 rounded-xl border-2 border-stone-900 text-stone-900 font-bold text-sm hover:bg-stone-900 hover:text-white transition-colors">
                  Sponsor Now
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}
