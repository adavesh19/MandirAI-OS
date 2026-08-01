'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Sun, Moon, Info, Wind } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function ClassicCalmTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [activeDate, setActiveDate] = React.useState(0)

  const titleText = page?.title ? t(page.title) : `Sri ${temple.primaryDeity || 'Deva'} Mandir`
  const descText = page?.description ? t(page.description) : `A serene sanctuary of peace, devotion, and timeless tradition.`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Archana', amount:51, time:'Daily 6am-12pm', desc:'Floral offering with 108 names.' },
    { id:'2', name:'Abhishekam', amount:501, time:'Mornings', desc:'Sacred bath with panchamrit.' },
    { id:'3', name:'Sahasranama', amount:251, time:'Evenings', desc:'1000 names recited with tulsi.' },
    { id:'4', name:'Annadanam', amount:1001, time:'Afternoons', desc:'Sponsor meals for devotees.' },
    { id:'5', name:'Vahana Seva', amount:5001, time:'Festivals', desc:'Deity procession on vahana.' },
  ]

  const panchang = [
    { date:'Today', tithi:'Ekadasi', nakshatra:'Rohini', sunrise:'06:12 AM', special:'Fasting Day' },
    { date:'Tomorrow', tithi:'Dvadasi', nakshatra:'Mrigashira', sunrise:'06:13 AM', special:'Parana 06:15-10:00' },
    { date:'Day 3', tithi:'Trayodashi', nakshatra:'Ardra', sunrise:'06:14 AM', special:'Pradosham' },
    { date:'Day 4', tithi:'Chaturdashi', nakshatra:'Punarvasu', sunrise:'06:14 AM', special:'Masa Shivaratri' },
    { date:'Day 5', tithi:'Amavasya', nakshatra:'Pushya', sunrise:'06:15 AM', special:'Tarpanam' },
  ]

  const journeySteps = [
    { title:'Arrival & Cleansing', desc:'Wash your feet at the temple pond, leaving the material world behind.' },
    { title:'The Dwajasthambham', desc:'Prostrate before the flagstaff, surrendering your ego to the Divine.' },
    { title:'Pradakshina', desc:'Circumambulate the main shrine clockwise, centering your mind.' },
    { title:'Darshana', desc:'Stand before the sanctum. Receive the divine light into your heart.' },
    { title:'Prasadam', desc:'Accept the sacred food, blessed by the Lord, nourishing body and soul.' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c241b] font-serif selection:bg-[#d4a373] selection:text-white">
      <style dangerouslySetInnerHTML={{__html:`
        .calm-hero { background: radial-gradient(circle at center, #ffffff 0%, #f3efe6 100%); }
        .soft-shadow { box-shadow: 0 10px 40px -10px rgba(139, 115, 85, 0.1); }
        .soft-shadow-hover:hover { box-shadow: 0 20px 50px -10px rgba(139, 115, 85, 0.15); transform: translateY(-2px); transition: all 0.4s ease; }
        .border-calm { border: 1px solid rgba(212, 163, 115, 0.2); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float-gentle { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .animate-float { animation: float-gentle 6s ease-in-out infinite; }
      `}} />

      {/* ══ HERO: Centered & Minimal ═════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 calm-hero overflow-hidden">
        {/* Soft decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full border-[1px] border-[#d4a373]/20 animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full border-[1px] border-[#d4a373]/10 animate-[spin_90s_linear_infinite_reverse]" />
        
        <div className="z-10 animate-float mb-8">
          <div className="w-16 h-16 rounded-full bg-white soft-shadow flex items-center justify-center text-2xl text-[#d4a373]">🕉️</div>
        </div>
        
        <p className="tracking-[0.3em] uppercase text-xs text-[#a08b74] font-sans mb-6 font-semibold">
          {temple.templeType || 'Ancient Heritage'}
        </p>
        
        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-light leading-[1.1] text-[#2c241b] max-w-4xl mb-8">
          {temple.name || titleText}
        </h1>
        
        <p className="text-lg md:text-xl text-[#6b5b4a] max-w-2xl font-light italic mb-12">
          "{descText}"
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link href={`/temple/${temple.slug}/sevas`} className="px-10 py-4 bg-[#2c241b] text-[#f3efe6] rounded-full hover:bg-[#4a3f32] transition-colors font-sans text-sm tracking-widest uppercase">
            Book Seva
          </Link>
          <Link href={`/temple/${temple.slug}/live`} className="px-10 py-4 bg-white border border-[#d4a373]/30 text-[#2c241b] rounded-full hover:bg-[#fdfbf7] transition-colors font-sans text-sm tracking-widest uppercase flex items-center gap-2 soft-shadow">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span> Live Darshan
          </Link>
        </div>
      </section>

      {/* ══ QUOTE & HIGHLIGHTS ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white border-y border-calm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <p className="text-2xl md:text-3xl text-[#4a3f32] font-light leading-relaxed mb-6">
              "The mind is restless and difficult to restrain, but it is subdued by practice and detachment."
            </p>
            <p className="text-sm font-sans tracking-widest text-[#a08b74] uppercase">— Bhagavad Gita</p>
          </div>
          <div className="w-px h-32 bg-[#d4a373]/20 hidden md:block"></div>
          <div className="flex-1 grid grid-cols-2 gap-8 w-full">
            {[{v:'1500+', l:'Years Old'},{v:'6 AM', l:'First Aarti'},{v:'10k+', l:'Daily Visitors'},{v:'108', l:'Sacred Pillars'}].map(s => (
              <div key={s.l} className="text-center md:text-left">
                <p className="text-4xl text-[#d4a373] mb-2">{s.v}</p>
                <p className="text-xs font-sans tracking-wider text-[#6b5b4a] uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC PANCHANG (CIRCULAR UI) ═══════════════════════════════ */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <p className="tracking-[0.2em] uppercase text-xs text-[#d4a373] font-sans mb-4">Divine Alignment</p>
            <h2 className="text-4xl md:text-5xl text-[#2c241b] font-light mb-8">Sacred Panchang</h2>
            <p className="text-[#6b5b4a] mb-10 text-lg leading-relaxed font-light">
              Align your prayers and spiritual activities with the cosmic rhythms. The traditional Hindu calendar guides all rituals at the temple.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#4a3f32]">
                <Sun className="w-5 h-5 text-[#d4a373]" /> <span>Sunrise: {panchang[activeDate].sunrise}</span>
              </div>
              <div className="flex items-center gap-4 text-[#4a3f32]">
                <Moon className="w-5 h-5 text-[#d4a373]" /> <span>Tithi: {panchang[activeDate].tithi}</span>
              </div>
              <div className="flex items-center gap-4 text-[#4a3f32]">
                <Star className="w-5 h-5 text-[#d4a373]" /> <span>Nakshatra: {panchang[activeDate].nakshatra}</span>
              </div>
            </div>
            {panchang[activeDate].special && (
              <div className="mt-8 p-4 bg-white soft-shadow rounded-xl border-l-4 border-[#d4a373] inline-block">
                <p className="text-sm font-sans text-[#a08b74] uppercase tracking-wider mb-1">Auspicious Significance</p>
                <p className="text-[#2c241b]">{panchang[activeDate].special}</p>
              </div>
            )}
          </div>

          <div className="flex-1 relative w-full aspect-square max-w-[500px]">
            {/* The Wheel */}
            <div className="absolute inset-0 rounded-full border-[2px] border-[#d4a373]/20 border-dashed animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border-[1px] border-[#d4a373]/10" />
            
            {panchang.map((p, i) => {
              const angle = (i * (360 / panchang.length)) - 90;
              const rad = angle * (Math.PI / 180);
              const x = 50 + 40 * Math.cos(rad);
              const y = 50 + 40 * Math.sin(rad);
              return (
                <button key={i} onClick={() => setActiveDate(i)}
                  className={`absolute w-20 h-20 -ml-10 -mt-10 rounded-full bg-white soft-shadow flex flex-col items-center justify-center transition-all duration-500 z-10 ${activeDate === i ? 'scale-125 border-2 border-[#d4a373]' : 'hover:scale-110 opacity-70'}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <p className="text-[10px] font-sans uppercase tracking-widest text-[#a08b74]">{p.date}</p>
                  <p className="text-xs font-bold text-[#2c241b] mt-1">{p.tithi.substring(0,3)}</p>
                </button>
              )
            })}
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full soft-shadow flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#f3efe6] flex flex-col items-center justify-center text-center">
                <p className="text-xs font-sans text-[#a08b74] uppercase tracking-widest">Select</p>
                <p className="text-[#2c241b] italic">Date</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE SPIRITUAL JOURNEY (VERTICAL TIMELINE) ════════════════════ */}
      <section className="py-32 px-4 bg-white border-y border-calm">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-[#2c241b] font-light mb-6">The Pilgrim's Path</h2>
            <p className="text-[#6b5b4a] text-lg font-light">Follow the traditional sequence of worship upon entering the temple grounds.</p>
          </div>
          
          <div className="relative border-l border-[#d4a373]/30 ml-4 md:ml-1/2 space-y-16 py-8">
            {journeySteps.map((step, i) => (
              <div key={i} className="relative pl-12 md:pl-16">
                <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#d4a373]" />
                <div className="absolute left-0 top-1 -translate-x-1/2 w-12 h-12 rounded-full bg-[#d4a373]/10 animate-ping opacity-50" />
                
                <h3 className="text-2xl text-[#2c241b] mb-3">{step.title}</h3>
                <p className="text-[#6b5b4a] leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HORIZONTAL SEVAS SCROLL (MASONRY-ISH) ════════════════════════ */}
      <section className="py-32 px-4 bg-[#faf8f5] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
            <div>
              <p className="tracking-[0.2em] uppercase text-xs text-[#d4a373] font-sans mb-4">Devotion</p>
              <h2 className="text-4xl md:text-5xl text-[#2c241b] font-light">Offerings & Sevas</h2>
            </div>
            <Link href={`/temple/${temple.slug}/sevas`} className="text-sm font-sans tracking-widest uppercase text-[#a08b74] hover:text-[#d4a373] transition-colors mt-6 md:mt-0">
              View All Schedule →
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 pb-12 pt-4">
            {sevaData.map((seva: any, i: number) => (
              <div key={i} className={`snap-center shrink-0 w-[85vw] sm:w-[350px] bg-white p-8 rounded-2xl soft-shadow-hover border-calm ${i%2===0 ? 'mt-0' : 'mt-12'}`}>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-3xl">{'🌸🪔📿🍛🐘'[i] || '🙏'}</span>
                  <span className="text-xl text-[#d4a373]">₹{seva.amount}</span>
                </div>
                <h3 className="text-2xl text-[#2c241b] mb-2">{seva.name}</h3>
                <p className="text-xs font-sans text-[#a08b74] uppercase tracking-wider mb-6">{seva.time}</p>
                <p className="text-[#6b5b4a] mb-8 font-light line-clamp-3">{seva.desc}</p>
                <Link href={`/temple/${temple.slug}/sevas`} className="w-full block text-center py-3 border border-[#d4a373] text-[#d4a373] rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[#d4a373] hover:text-white transition-colors">
                  Book Slot
                </Link>
              </div>
            ))}
            {/* Spacer for horizontal scroll */}
            <div className="shrink-0 w-4"></div>
          </div>
        </div>
      </section>

      {/* ══ ARCHITECTURE / GALLERY BENTO ═════════════════════════════════ */}
      <section className="py-32 px-4 bg-white border-y border-calm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#2c241b] font-light mb-6">Temple Architecture</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[250px_250px] gap-4">
            <div className="md:col-span-2 md:row-span-2 bg-[#f3efe6] rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 transition-transform duration-700 group-hover:scale-105" style={{backgroundImage:`radial-gradient(#d4a373 2px, transparent 2px)`, backgroundSize:'20px 20px'}} />
              <div className="relative z-10">
                <h3 className="text-3xl text-[#2c241b] mb-2">The Rajagopuram</h3>
                <p className="text-[#6b5b4a] font-light">The monumental 7-tiered entrance tower, adorned with hundreds of intricate stucco figures depicting Puranic legends.</p>
              </div>
            </div>
            <div className="bg-[#faf8f5] border border-calm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Wind className="w-8 h-8 text-[#d4a373] mb-4" />
              <p className="text-lg text-[#2c241b]">1000 Pillar Hall</p>
            </div>
            <div className="bg-[#faf8f5] border border-calm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-4">💧</span>
              <p className="text-lg text-[#2c241b]">Sacred Pushkarini</p>
            </div>
            <div className="md:col-span-2 bg-[#f3efe6] rounded-2xl p-8 flex items-center justify-between">
              <div>
                <h3 className="text-2xl text-[#2c241b] mb-2">Inner Sanctum</h3>
                <p className="text-[#6b5b4a] font-light text-sm">Garbhagriha - The womb chamber.</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white soft-shadow flex items-center justify-center text-2xl">🛕</div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href={`/temple/${temple.slug}/gallery`} className="inline-flex text-[#2c241b] border-b border-[#2c241b] pb-1 hover:text-[#d4a373] hover:border-[#d4a373] transition-colors font-sans text-sm tracking-widest uppercase">
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SIMPLE ELEGANT DONATION ══════════════════════════════════════ */}
      <section className="py-32 px-4 bg-[#faf8f5]">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto bg-white rounded-full soft-shadow flex items-center justify-center mb-8">
            <Heart className="w-8 h-8 text-[#d4a373]" />
          </div>
          <h2 className="text-4xl text-[#2c241b] font-light mb-6">Support the Temple</h2>
          <p className="text-[#6b5b4a] font-light mb-12">
            Your generous contributions sustain the daily rituals, annadanam, and maintenance of this ancient sanctuary. All donations are 80G tax exempt.
          </p>
          <Link href={`/temple/${temple.slug}/donate`} className="px-12 py-5 bg-[#d4a373] text-white rounded-full hover:bg-[#b5885c] transition-colors font-sans text-sm tracking-widest uppercase inline-block shadow-lg shadow-[#d4a373]/20">
            Make a Donation
          </Link>
        </div>
      </section>

      {/* ══ VISIT / CONTACT SPLIT ════════════════════════════════════════ */}
      <section className="py-0 border-y border-calm flex flex-col md:flex-row min-h-[50vh]">
        <div className="flex-1 bg-white p-12 lg:p-24 flex flex-col justify-center">
          <p className="tracking-[0.2em] uppercase text-xs text-[#d4a373] font-sans mb-4">Location</p>
          <h2 className="text-4xl text-[#2c241b] font-light mb-8">Visit Us</h2>
          <div className="space-y-6 text-[#6b5b4a] font-light">
            <p className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#d4a373] shrink-0 mt-1" />
              <span>{address.line1 || 'Temple Street'}<br/>{address.city || 'City'}, {address.state || 'State'} {address.pincode}</span>
            </p>
            <p className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-[#d4a373] shrink-0" /> {temple.contactPhone || '+91 98765 43210'}
            </p>
            <p className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-[#d4a373] shrink-0" /> {temple.contactEmail || 'info@temple.org'}
            </p>
          </div>
        </div>
        <div className="flex-1 bg-[#f3efe6] p-12 lg:p-24 flex flex-col justify-center">
          <p className="tracking-[0.2em] uppercase text-xs text-[#d4a373] font-sans mb-4">Schedule</p>
          <h2 className="text-4xl text-[#2c241b] font-light mb-8">Timings</h2>
          <div className="space-y-8">
            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-[#a08b74] mb-2">Morning Darshan</p>
              <p className="text-2xl text-[#4a3f32]">06:00 AM — 12:30 PM</p>
            </div>
            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-[#a08b74] mb-2">Evening Darshan</p>
              <p className="text-2xl text-[#4a3f32]">04:00 PM — 08:30 PM</p>
            </div>
            <div className="pt-4 border-t border-[#d4a373]/20">
              <p className="text-sm text-[#6b5b4a] italic">Open all days of the year, including public holidays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12 bg-[#faf8f5]"><BlockRenderer blocks={page.blocks} theme="classic" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="bg-[#2c241b] text-[#f3efe6] py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl mb-2">🕉️ {temple.name}</h3>
            <p className="text-[#a08b74] font-light text-sm max-w-sm">A serene sanctuary of peace, devotion, and timeless tradition.</p>
          </div>
          <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-[#a08b74]">
            <Link href={`/temple/${temple.slug}/sevas`} className="hover:text-white transition-colors">Sevas</Link>
            <Link href={`/temple/${temple.slug}/donate`} className="hover:text-white transition-colors">Donate</Link>
            <Link href={`/temple/${temple.slug}/live`} className="hover:text-white transition-colors">Live</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#4a3f32] text-center text-xs text-[#6b5b4a] font-sans">
          © {new Date().getFullYear()} {temple.name}. All rights reserved. Powered by MandirAI OS.
        </div>
      </footer>
    </div>
  )
}
