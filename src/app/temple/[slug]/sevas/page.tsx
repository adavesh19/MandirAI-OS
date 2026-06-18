import * as React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Sparkles, Clock, HandHeart, ArrowRight, Database, Terminal, Cpu, Zap, Layers, Activity } from 'lucide-react'
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
  return obj.en || obj.english || obj.English || Object.values(obj)[0] || fallback
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h} hr`
}

function getSevaIcon(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('abhishek') || lower.includes('abhisheka')) return '🪄'
  if (lower.includes('archana')) return '🌸'
  if (lower.includes('homam') || lower.includes('havan')) return '🔥'
  if (lower.includes('alankara') || lower.includes('decoration')) return '💐'
  if (lower.includes('anna') || lower.includes('prasad')) return '🍛'
  if (lower.includes('vahana')) return '🪐'
  if (lower.includes('sahasra') || lower.includes('nama')) return '📿'
  if (lower.includes('kalyana') || lower.includes('marriage')) return '💍'
  if (lower.includes('suprabhatam')) return '🌅'
  if (lower.includes('dolotsavam') || lower.includes('utsavam')) return '🎊'
  return '🙏'
}

export default async function SevasPage({ params }: PageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const sevas = await prisma.seva.findMany({
    where: {
      templeId: temple.id,
      isActive: true,
    },
    orderBy: { createdAt: 'asc' },
  })

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  // ── SEO: Seva JSON-LD ──
  const jsonLdSevas = sevas.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: getEnglish(s.name, 'Unnamed Seva'),
    description: getEnglish(s.description, ''),
    provider: {
      '@type': 'HinduTemple',
      name: temple.name
    },
    offers: {
      '@type': 'Offer',
      price: Number(s.price).toString(),
      priceCurrency: 'INR',
      url: `https://temple-ai.os/temple/${slug}/book?seva=${s.id}`
    }
  }))

  // ─── 1. HIGH-TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-20 font-mono text-slate-300 relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSevas) }}
        />
        
        {/* HUD Header Banner */}
        <div className="relative border border-cyan-850 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
          {/* Corner Decors */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="absolute -right-12 -bottom-12 text-[15rem] opacity-5 select-none pointer-events-none rotate-12">🎛️</div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 mr-2 animate-pulse" />
              RITUAL SCHEDULER INDEX // SYSTEM_OFFERINGS
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Sevas & Sacred Relays
            </h1>
            <p className="text-sm text-slate-400 border-l-2 border-cyan-500 pl-3 leading-relaxed">
              Available ritual configurations active in the temple scheduling node. Select a protocol to initiate booking streams.
            </p>
          </div>
        </div>

        {/* Sevas Grid */}
        {sevas.length === 0 ? (
          <div className="text-center py-20 px-4 border border-dashed border-slate-800 rounded-3xl bg-slate-950/40">
            <HandHeart className="mx-auto h-12 w-12 text-slate-700 mb-4" />
            <h3 className="text-base font-bold text-white mb-2">No Seva Protocols Loaded</h3>
            <p className="text-xs text-slate-500">No active seva rows exist in the node database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sevas.map((seva) => {
              const title = getEnglish(seva.name, 'Unnamed Seva')
              const description = getEnglish(seva.description, '')
              const icon = getSevaIcon(title)
              
              return (
                <div key={seva.id} className="group flex flex-col bg-slate-950 border border-slate-850 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 relative h-full">
                  
                  {/* Status Line */}
                  <div className="h-1.5 w-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors" />
                  
                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase truncate">
                        {title}
                      </h3>
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-xl group-hover:scale-105 transition-transform">
                        {icon}
                      </div>
                    </div>

                    {/* Desc */}
                    <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed flex-1 font-mono">
                      {description || 'System descriptions currently offline.'}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 text-[9px] font-bold">
                      {seva.durationMinutes && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-850">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {formatDuration(seva.durationMinutes)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-850">
                        <Activity className="w-3 h-3 text-emerald-400" />
                        FREQ: DAILY
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-auto text-xs">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Ritual Load</span>
                        <span className="font-bold text-white">
                          ₹{Number(seva.price).toLocaleString('en-IN')}.00
                        </span>
                      </div>
                      
                      <Link 
                        href={`/temple/${slug}/book?seva=${seva.id}`}
                        className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-cyan-950 border border-cyan-800 hover:border-cyan-500 text-cyan-400 font-bold text-[10px] uppercase transition-all group/btn"
                      >
                        Book Seva
                        <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* High-Tech Section 1: Spiritual Significance */}
        <div className="pt-16 border-t border-slate-900">
          <div className="mb-10 text-center space-y-2">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">// METRIC VALUE ANALYSIS</span>
            <h2 className="text-3xl font-black text-white">Spiritual Subsystems Alignment</h2>
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">Understanding the deep systemic calibration of Vedic ritual protocols.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Karmic Frequency Cleansing', desc: 'Executing dedicated ritual waves removes background interference, resetting systemic karma registers.', icon: '🌊' },
              { title: 'Planetary Stream Sync', desc: 'Vedic timing and mantras coordinate localized devotee frequencies with planetary orbital variables.', icon: '✨' },
              { title: 'Trust Resource Allocation', desc: 'Direct transaction proceeds are routed to resource modules supporting food hubs and campus maintenance.', icon: '🤝' }
            ].map((item, i) => (
              <Card key={i} className="border border-slate-800 bg-slate-900/40 rounded-3xl overflow-hidden text-center group text-slate-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-mono">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* High-Tech Section 2: Materials Consumables */}
        <div className="pt-16 border-t border-slate-900">
          <div className="mb-10 text-center space-y-2">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">// RAW INVENTORY STATUS</span>
            <h2 className="text-3xl font-black text-white">Consumable Ingredients Telemetry</h2>
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">Pure materials loaded into daily ritual combustion matrices.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Cow Ghee (Purified)', icon: '🧈', level: 'Level: 94%' },
              { name: 'Fresh Jasmine Nodes', icon: '🌸', level: 'Daily Fresh' },
              { name: 'Sandalwood Blocks', icon: '🪵', level: 'Level: 88%' },
              { name: 'Kashmiri Saffron Hash', icon: '🌺', level: 'Level: 98%' }
            ].map((mat, i) => (
              <Card key={i} className="border border-slate-805 bg-slate-950 group overflow-hidden text-slate-400">
                <div className="h-20 bg-slate-900/50 flex items-center justify-center text-4xl group-hover:bg-slate-900 transition-colors">
                  <span className="group-hover:scale-110 transition-transform duration-500">{mat.icon}</span>
                </div>
                <CardContent className="p-4 text-center space-y-1">
                  <h4 className="font-bold text-white text-xs uppercase">{mat.name}</h4>
                  <p className="text-[9px] text-cyan-400 font-bold">{mat.level}</p>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSevas) }}
      />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/50 to-transparent blur-3xl rounded-full -z-10 opacity-60" />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-8 sm:p-12 shadow-xl border border-orange-400/50 text-white">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="absolute -right-12 -bottom-12 text-[15rem] opacity-10 select-none pointer-events-none rotate-12">🙏</div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
            <span className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Divine Services
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            Sevas & Offerings
          </h1>
          <p className="text-lg text-orange-50 font-medium drop-shadow-sm max-w-2xl">
            Participate in sacred rituals at <span className="font-bold text-white">{temple.name}</span>. Each seva is performed by experienced priests following authentic Vedic traditions.
          </p>
        </div>
      </div>

      {/* Sevas Grid */}
      {sevas.length === 0 ? (
        <div className="text-center py-20 px-4 border border-dashed border-stone-200 rounded-3xl bg-white/50">
          <HandHeart className="mx-auto h-12 w-12 text-stone-300 mb-4" />
          <h3 className="text-lg font-heading font-bold text-stone-900 mb-2">No Sevas Available</h3>
          <p className="text-stone-500">The temple administration has not listed any sevas currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sevas.map((seva) => {
            const title = getEnglish(seva.name, 'Unnamed Seva')
            const description = getEnglish(seva.description, '')
            const icon = getSevaIcon(title)
            
            return (
              <div key={seva.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl ring-1 ring-stone-200 hover:ring-orange-300 transition-all duration-500 relative h-full">
                
                {/* Colored Top Border / Header */}
                <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-amber-400" />
                
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Title & Icon */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-orange-700 transition-colors">
                      {title}
                    </h3>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-inner text-2xl group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-500 text-sm line-clamp-3 mb-6 flex-1">
                    {description || 'No description provided.'}
                  </p>

                  {/* Meta Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {seva.durationMinutes && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-100 text-stone-600">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDuration(seva.durationMinutes)}
                      </span>
                    )}
                  </div>

                  {/* Footer / Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Offering</span>
                      <span className="text-xl font-black text-stone-900">
                        ₹{Number(seva.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/temple/${slug}/book?seva=${seva.id}`}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-stone-900 text-white hover:bg-orange-600 font-bold text-sm transition-colors group/btn"
                    >
                      Book Seva
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Extreme Section 1: Why Perform Sevas */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">The Spiritual Significance</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">Understanding the deep meaning behind offering sevas to the divine.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Karmic Cleansing', desc: 'Performing selfless service and offerings helps in reducing negative karmic imprints.', icon: '🌊' },
            { title: 'Divine Connection', desc: 'Rituals act as a bridge, aligning our consciousness with the supreme energy.', icon: '✨' },
            { title: 'Community Welfare', desc: 'The funds from your sevas directly support Annadanam and temple maintenance.', icon: '🤝' }
          ].map((item, i) => (
            <Card key={i} className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:-translate-y-2 transition-transform duration-300 rounded-3xl overflow-hidden text-center group">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-4xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Extreme Section 2: Pooja Materials */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Sacred Offerings</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">The purest materials used by our priests during your sevas.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Pure Cow Ghee', icon: '🧈' },
            { name: 'Fresh Jasmine', icon: '🌸' },
            { name: 'Sandalwood Paste', icon: '🪵' },
            { name: 'Kashmiri Saffron', icon: '🌺' }
          ].map((mat, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white group overflow-hidden">
              <div className="h-24 bg-stone-100 flex items-center justify-center text-5xl group-hover:bg-amber-100 transition-colors duration-500">
                <span className="group-hover:scale-125 transition-transform duration-500">{mat.icon}</span>
              </div>
              <CardContent className="p-4 text-center">
                <h4 className="font-bold text-stone-800 text-sm">{mat.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Extreme Section 3: Spiritual Benefits */}
      <div className="pt-16">
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500/30 blur-[100px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl font-black mb-6">Benefits of Specific Sevas</h2>
              <div className="space-y-6">
                {[
                  { seva: 'Sahasranama Archana', benefit: 'For peace of mind and overall prosperity.' },
                  { seva: 'Rudra Abhishekam', benefit: 'For health, longevity, and removal of obstacles.' },
                  { seva: 'Kalyanotsavam', benefit: 'For marital harmony and finding suitable alliances.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-amber-400">🕉️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-50 text-lg">{item.seva}</h4>
                      <p className="text-stone-400 text-sm mt-1">{item.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 border-[16px] border-amber-500/20 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] border-t-4 border-amber-400 rounded-full" />
                <span className="text-8xl">🪔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Section 4: Testimonials */}
      <div className="pt-16 pb-12">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-black text-stone-900">Devotee Experiences</h2>
          <p className="text-lg text-stone-500 mt-3 max-w-2xl mx-auto">Hear from those who have experienced the divine grace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-lg bg-white relative pt-8 px-6 pb-6 rounded-3xl mt-8">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-stone-200 border-4 border-white shadow-md flex items-center justify-center text-2xl overflow-hidden">
                <span className="opacity-50">👤</span>
              </div>
              <CardContent className="p-0 text-center space-y-4 mt-2">
                <div className="flex justify-center gap-1 text-amber-400 text-sm">
                  {'★★★★★'}
                </div>
                <p className="text-stone-600 text-sm italic leading-relaxed">
                  "Performing the Abhishekam here brought immense peace to our family. The priests chanted the mantras with perfect pronunciation and deep devotion."
                </p>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Devotee Family {i}</h4>
                  <p className="text-xs text-stone-400">Regular Visitor</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}
