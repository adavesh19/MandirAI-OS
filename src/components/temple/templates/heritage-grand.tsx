'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Search, Map, Crown } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function HeritageGrandTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [activeEra, setActiveEra] = React.useState(0)
  const [activeMandapam, setActiveMandapam] = React.useState('Garbhagriha')

  const titleText = page?.title ? t(page.title) : `The Grand ${temple.name}`
  const descText = page?.description ? t(page.description) : `A majestic testament to devotion and architectural brilliance. Step into the royal legacy of Lord ${temple.primaryDeity || 'the Divine'}.`

  const sthalaHistory = [
    { year:'1250 CE', title:'The Divine Manifestation', desc:'Discovered by a humble devotee, the svayambhu (self-manifested) murti emerged from an anthill, radiating immense divine energy.', icon:'✨' },
    { year:'1387 CE', title:'Royal Patronage', desc:'The Chola kings constructed the first grand stone mandapam and instituted the daily 16-step shodashopachara pooja.', icon:'👑' },
    { year:'1603 CE', title:'The Thousand Pillared Hall', desc:'Master artisans spent 40 years carving the magnificent Maha Mandapam from solid granite.', icon:'🏛️' },
    { year:'1879 CE', title:'The Great Rajagopuram', desc:'The towering 9-tiered entrance gateway was completed, becoming the tallest structure in the region.', icon:'🗼' },
  ]

  const architectureMap = [
    { id:'Garbhagriha', title:'Sanctum Sanctorum', desc:'The innermost womb chamber housing the main deity. Only head priests may enter.', img:'🛕', x:'50%', y:'20%' },
    { id:'Antarala', title:'The Vestibule', desc:'The intermediate space where special archana and aarti are performed for VIP devotees.', img:'✨', x:'50%', y:'35%' },
    { id:'Maha Mandapam', title:'Grand Assembly Hall', desc:'A vast pillared hall where the daily utsava murti ceremonies and weddings take place.', img:'🏛️', x:'50%', y:'55%' },
    { id:'Pushkarini', title:'Sacred Temple Tank', desc:'The holy water body where the float festival (Teppotsavam) is celebrated annually.', img:'💧', x:'20%', y:'60%' },
    { id:'Kalyana Mandapam', title:'Wedding Pavilion', desc:'An ornate structure specifically designed for the celestial wedding of the deities.', img:'🌸', x:'80%', y:'60%' },
    { id:'Rajagopuram', title:'Main Entrance Tower', desc:'The massive 9-tiered tower covered in thousands of colorful stucco figures.', img:'🗼', x:'50%', y:'90%' },
  ]

  const royalSevas = sevas && sevas.length > 0 ? sevas.slice(0,3) : [
    { id:'1', name:'Raja Abhishekam', amount:5001, desc:'The royal sacred bath with panchamrit, performed with full temple honors.', emoji:'👑' },
    { id:'2', name:'Brahmotsavam Vahana', amount:11001, desc:'Sponsor the deity\'s procession on a silver vahanam during the grand festival.', emoji:'🐘' },
    { id:'3', name:'Nitya Annadanam', amount:21001, desc:'Sponsor sumptuous meals for 500 pilgrims for one entire day.', emoji:'🍛' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen font-serif" style={{background:'#1a0a05', color:'#fef3c7'}}>
      <style dangerouslySetInnerHTML={{__html:`
        .royal-border { border: 2px solid #b45309; border-image: linear-gradient(to bottom, #fbbf24, #b45309) 1; }
        .royal-gradient-text { background: linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #b45309 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .royal-bg { background: linear-gradient(135deg, #3d1a00 0%, #1a0800 100%); }
        .royal-card { background: #2a1105; border: 1px solid #78350f; position: relative; }
        .royal-card::before { content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; background: linear-gradient(135deg, #fbbf24, transparent); z-index: -1; opacity: 0; transition: opacity 0.3s ease; }
        .royal-card:hover::before { opacity: 0.5; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .architect-map { background: repeating-linear-gradient(45deg, rgba(251,191,36,0.05) 0px, rgba(251,191,36,0.05) 2px, transparent 2px, transparent 10px); }
        @keyframes sway { 0%,100%{transform:rotate(-2deg);} 50%{transform:rotate(2deg);} }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
      `}} />

      {/* ══ HERO: Parallax Monumental ════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0400]">
        {/* Massive background patterns */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <div className="w-[120vw] h-[120vw] max-w-[1500px] max-h-[1500px] border-[40px] border-[#fbbf24] rotate-45 rounded-[30%]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#b45309]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#1a0a05] to-transparent z-10" />

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          <div className="mb-8 w-24 h-32 border-2 border-[#fbbf24] rounded-t-full flex items-end justify-center pb-4 animate-sway" style={{background:'rgba(180,83,9,0.3)'}}>
            <Crown className="w-12 h-12 text-[#fbbf24]" />
          </div>
          
          <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-bold uppercase tracking-widest leading-none mb-6">
            <span className="royal-gradient-text">{temple.name || titleText}</span>
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-24 bg-[#fbbf24]/50" />
            <p className="text-xl md:text-3xl text-[#fbbf24] font-light italic">Est. 1250 CE</p>
            <div className="h-px w-24 bg-[#fbbf24]/50" />
          </div>
          
          <p className="text-lg md:text-2xl text-[#fde68a]/70 max-w-4xl font-light mb-16 leading-relaxed">
            {descText}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              {l:'Sevas', h:`/temple/${temple.slug}/sevas`, i:<Crown className="w-5 h-5"/>},
              {l:'Darshan', h:`/temple/${temple.slug}/live`, i:<Sparkles className="w-5 h-5"/>},
              {l:'Donate', h:`/temple/${temple.slug}/donate`, i:<Heart className="w-5 h-5"/>}
            ].map(b => (
              <Link key={b.l} href={b.h} className="group flex flex-col items-center justify-center py-6 border border-[#b45309] bg-[#2a1105]/50 hover:bg-[#b45309]/20 transition-all backdrop-blur-sm">
                <div className="text-[#fbbf24] mb-3 group-hover:scale-125 transition-transform">{b.i}</div>
                <span className="uppercase tracking-widest text-sm font-bold text-[#fde68a]">{b.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STHALA PURANA: Interactive History Book ══════════════════════ */}
      <section className="py-32 px-4 relative z-20 bg-[#1a0a05]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold uppercase tracking-widest mb-4 royal-gradient-text">Sthala Purana</h2>
            <p className="text-[#fde68a]/60 text-xl font-light">The Epic History of the Sacred Site</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 bg-[#2a1105] border border-[#78350f] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ornate corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#fbbf24]" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#fbbf24]" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#fbbf24]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#fbbf24]" />

            {/* Years Menu */}
            <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#78350f] pr-0 lg:pr-8 flex flex-row lg:flex-col overflow-x-auto hide-scroll gap-4 pb-6 lg:pb-0">
              {sthalaHistory.map((h, i) => (
                <button key={i} onClick={() => setActiveEra(i)} className={`text-left p-6 flex-shrink-0 lg:flex-shrink w-64 lg:w-full border transition-all ${activeEra === i ? 'bg-[#3d1a00] border-[#fbbf24]' : 'bg-[#1a0a05] border-[#78350f] hover:border-[#b45309]'}`}>
                  <p className="text-3xl font-bold royal-gradient-text mb-2">{h.year}</p>
                  <p className="text-[#fde68a] font-sans text-xs uppercase tracking-widest">{h.title}</p>
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="w-full lg:w-2/3 flex flex-col justify-center min-h-[300px]">
              <div className="text-6xl mb-8 opacity-50">{sthalaHistory[activeEra].icon}</div>
              <h3 className="text-4xl font-bold text-[#fbbf24] mb-6">{sthalaHistory[activeEra].title}</h3>
              <p className="text-2xl text-[#fde68a]/80 leading-relaxed font-light italic">"{sthalaHistory[activeEra].desc}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEMPLE ARCHITECTURE: Interactive Map ═════════════════════════ */}
      <section className="py-32 px-4 bg-[#2a1105]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold uppercase tracking-widest mb-4 royal-gradient-text">Sacred Architecture</h2>
            <p className="text-[#fde68a]/60 text-xl font-light">Explore the intricate layout of the temple complex</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 h-auto lg:h-[700px]">
            {/* Map Area */}
            <div className="w-full lg:w-2/3 architect-map border-2 border-[#b45309] relative min-h-[500px]">
              {/* Decorative center line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#b45309]/50 -translate-x-1/2" />
              
              {architectureMap.map((loc, i) => (
                <button key={loc.id} onClick={() => setActiveMandapam(loc.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all ${activeMandapam === loc.id ? 'scale-125 z-20' : 'hover:scale-110 opacity-70 z-10'}`}
                  style={{ left: loc.x, top: loc.y }}
                >
                  <div className={`w-12 h-12 flex items-center justify-center text-xl bg-[#1a0a05] border-2 rounded ${activeMandapam === loc.id ? 'border-[#fbbf24] shadow-[0_0_20px_#b45309]' : 'border-[#78350f]'}`}>
                    {loc.img}
                  </div>
                  <span className="bg-[#1a0a05] px-2 py-1 text-[10px] uppercase tracking-widest text-[#fbbf24] border border-[#78350f] whitespace-nowrap">
                    {loc.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Detail Area */}
            <div className="w-full lg:w-1/3 bg-[#1a0a05] border border-[#78350f] p-10 flex flex-col justify-center text-center">
              {architectureMap.filter(m => m.id === activeMandapam).map(loc => (
                <div key={loc.id} className="animate-pulse-slow">
                  <div className="text-6xl mb-8">{loc.img}</div>
                  <h3 className="text-3xl font-bold text-[#fbbf24] mb-4 uppercase tracking-widest">{loc.id}</h3>
                  <p className="text-[#fde68a] text-sm uppercase tracking-widest mb-8 border-b border-[#78350f] pb-4">{loc.title}</p>
                  <p className="text-xl text-[#fde68a]/70 leading-relaxed font-light">{loc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ROYAL SEVAS VIP CAROUSEL ═════════════════════════════════════ */}
      <section className="py-32 px-4 bg-[#1a0a05] overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4 md:px-12">
            <div>
              <h2 className="text-5xl font-bold uppercase tracking-widest mb-4 royal-gradient-text">Royal Offerings</h2>
              <p className="text-[#fde68a]/60 text-xl font-light">Sponsor the most magnificent sevas of the temple</p>
            </div>
            <Link href={`/temple/${temple.slug}/sevas`} className="text-[#fbbf24] uppercase tracking-widest text-sm hover:text-white transition-colors border-b border-[#fbbf24] pb-1">
              View All Sevas
            </Link>
          </div>

          <div className="flex gap-8 overflow-x-auto hide-scroll snap-x px-4 md:px-12 pb-12">
            {royalSevas.map((seva: any, i: number) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[500px] bg-[#2a1105] border border-[#b45309] p-10 relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl group-hover:opacity-20 transition-opacity">{seva.emoji}</div>
                <div className="relative z-10">
                  <div className="text-[#fbbf24] mb-8">
                    <span className="text-sm uppercase tracking-widest block mb-2">Donation</span>
                    <span className="text-5xl font-bold">₹{seva.amount.toLocaleString()}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-[#fde68a] mb-6">{seva.name}</h3>
                  <p className="text-[#fde68a]/70 text-lg leading-relaxed font-light mb-10 h-24">{seva.desc}</p>
                  <Link href={`/temple/${temple.slug}/sevas`} className="block w-full py-4 text-center border-2 border-[#fbbf24] text-[#fbbf24] uppercase tracking-widest font-bold hover:bg-[#fbbf24] hover:text-[#1a0a05] transition-all">
                    Sponsor This Seva
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE GREAT PILLARS (STATS) ════════════════════════════════════ */}
      <section className="py-0 border-y-2 border-[#b45309] flex flex-wrap">
        {[
          { v:'750+', l:'Years of Continuous Worship' },
          { v:'5', l:'Times Daily Aarti' },
          { v:'2.5M', l:'Annual Devotees' },
          { v:'9', l:'Tiers in the Rajagopuram' }
        ].map((s, i) => (
          <div key={i} className="w-full sm:w-1/2 lg:w-1/4 bg-[#2a1105] p-16 text-center border-[0.5px] border-[#78350f]">
            <p className="text-6xl font-bold royal-gradient-text mb-4">{s.v}</p>
            <p className="text-[#fde68a] uppercase tracking-widest text-xs font-bold">{s.l}</p>
          </div>
        ))}
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12 bg-[#1a0a05]"><BlockRenderer blocks={page.blocks} theme="heritage" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="bg-[#0d0400] text-[#fde68a] py-24 px-4 border-t-8 border-[#b45309]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <h3 className="text-4xl font-bold uppercase tracking-widest mb-6 royal-gradient-text">{temple.name}</h3>
            <p className="text-[#fde68a]/50 leading-relaxed font-light italic">
              A monumental legacy standing tall for centuries. We welcome all seekers of the divine.
            </p>
          </div>
          <div className="flex gap-16 font-sans text-sm uppercase tracking-widest">
            <div className="flex flex-col gap-4">
              <Link href={`/temple/${temple.slug}/sevas`} className="hover:text-white transition-colors">Royal Sevas</Link>
              <Link href={`/temple/${temple.slug}/donate`} className="hover:text-white transition-colors">Make Offering</Link>
              <Link href={`/temple/${temple.slug}/live`} className="hover:text-white transition-colors">Live Darshan</Link>
            </div>
            <div className="flex flex-col gap-4 text-[#fde68a]/50">
              <p>{temple.contactPhone || 'Contact Us'}</p>
              <p>{temple.contactEmail || 'Email Us'}</p>
              <p>Open 365 Days</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
