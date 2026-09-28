'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  MapPin, Clock, Calendar, Phone, Mail, ArrowRight, Video, 
  ChevronRight, Volume2, Flame, Music, Bell, Users, Heart, 
  Sparkles, CheckCircle2, Play, Share2, Info, Shield, Compass,
  BookOpen, Star
} from 'lucide-react'
import BlockRenderer from '@/components/temple/blocks/block-renderer'
import { useLanguage } from '@/components/shared/language-context'
import { SacredParticles } from '@/components/ui/sacred-particles'
import { VirtualRitualBar } from '@/components/temple/virtual-ritual-bar'
import { PanchangTicker } from '@/components/temple/panchang-ticker'

export interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function HeritageGrandTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [selectedSeva, setSelectedSeva] = useState<any>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number>(501)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [devoteeName, setDevoteeName] = useState('')
  const [devoteeGotra, setDevoteeGotra] = useState('')
  const [devoteePhone, setDevoteePhone] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tName = temple?.name || 'Sri Maha Kshetram Devasthanam'
  const tDeity = temple?.primaryDeity || 'Lord Sri Venkateswara Swamy'
  const tDesc = temple?.description || 'An ancient royal abode of eternal divinity, preserved across centuries of imperial heritage and sacred traditions.'
  
  const contactPhone = temple?.contactPhone || '+91 8000 108 108'
  const contactEmail = temple?.contactEmail || 'darshan@mahakshetram.org'
  const addressLine = temple?.address?.street || temple?.address?.city 
    ? `${temple?.address?.street || ''} ${temple?.address?.city || ''}, ${temple?.address?.state || ''} ${temple?.address?.zip || ''}`
    : 'Sacred Sanctum Way, Hilltop Temple Complex, Karnataka - 571111'

  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: '1', name: 'Suvarna Pushparchana', price: 501, amount: 501, description: 'Sacred archana performed with 108 fresh golden bilva & fragrant flowers.' },
    { id: '2', name: 'Kalyanotsavam Maha Seva', price: 2501, amount: 2501, description: 'Grand celestial wedding ceremony invoked for family harmony and longevity.' },
    { id: '3', name: 'Nitya Annadanam', price: 1001, amount: 1001, description: 'Blessed food distribution serving up to 50 pilgrims in the holy dining hall.' },
    { id: '4', name: 'Rudra Abhishekam', price: 751, amount: 751, description: 'Panchamrita abhishekam accompanied by sacred Namakam and Chamakam chants.' },
    { id: '5', name: 'Sahasra Deepalankara', price: 1501, amount: 1501, description: 'Illuminating 1000 sacred ghee lamps in the temple praakaram at dusk.' },
    { id: '6', name: 'Gau Samrakshana Seva', price: 1101, amount: 1101, description: 'Support for the ancient temple Goshala with sacred feed and medicinal care.' }
  ]

  const schedule = [
    { time: '04:30 AM', name: 'Suprabhatam & Viswaroopa', desc: 'Awakening the sanctum with sacred Vedic verses' },
    { time: '06:30 AM', name: 'Nitya Alankara & Tomala Seva', desc: 'Adorning the holy vigraha with fresh garlands' },
    { time: '08:00 AM - 12:30 PM', name: 'Sarva Darshanam', desc: 'Free public viewing of the Moolavar for all pilgrims' },
    { time: '12:30 PM', name: 'Maha Naivedyam & Rajbhog', desc: 'Sacred noon offering with 56 satvik delicacies' },
    { time: '04:00 PM - 08:30 PM', name: 'Sandhya Darshanam', desc: 'Dusk darshan accompanied by traditional nadaswaram' },
    { time: '09:00 PM', name: 'Ekantha Seva & Sayana', desc: 'Night repose ceremony and temple closure' }
  ]

  const handleBookSeva = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setSelectedSeva(null)
    }, 2800)
  }

  // If custom page blocks exist, render via BlockRenderer
  if (page?.blocks && Array.isArray(page.blocks) && page.blocks.length > 0) {
    return (
      <div className="min-h-screen bg-[#100603] text-stone-100">
        <PanchangTicker className="relative z-50" />
        <BlockRenderer blocks={page.blocks} theme="heritage" sevas={activeSevas} templeAddress={temple?.address} />
        <VirtualRitualBar templeName={tName} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#120603] text-[#fbf6ea] font-serif selection:bg-[#d4af37] selection:text-black overflow-x-hidden relative">
      {/* Background ambient royal glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#d4af37]/15 via-[#8a2b0e]/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#d4af37]/8 blur-3xl rounded-full" />
      </div>

      <PanchangTicker className="relative z-50 border-b border-[#d4af37]/20 bg-[#160804]/90 backdrop-blur-md" />
      <SacredParticles variant="marigold" quantity={25} className="fixed inset-0 z-10 pointer-events-none opacity-40" />

      {/* Floating Glass Navigation */}
      <header className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8`}>
        <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'bg-[#180905]/80 backdrop-blur-xl border border-[#d4af37]/30 shadow-2xl py-3 px-6' 
            : 'bg-[#180905]/40 backdrop-blur-md border border-[#d4af37]/15 py-4 px-6'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8a2b0e] flex items-center justify-center text-xl shadow-lg border border-[#f5d77f]/40">
              🕉
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#f5d77f] truncate max-w-[220px] sm:max-w-md">
                {tName}
              </div>
              <div className="text-[11px] font-sans tracking-widest text-[#d4af37]/80 uppercase">
                {tDeity}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium tracking-wider text-stone-200">
            <a href="#about" className="hover:text-[#f5d77f] transition-colors">Temple Heritage</a>
            <a href="#darshan" className="hover:text-[#f5d77f] transition-colors">Darshan Schedule</a>
            <a href="#sevas" className="hover:text-[#f5d77f] transition-colors">Sacred Sevas</a>
            <a href="#live" className="hover:text-[#f5d77f] transition-colors">Live Darshan</a>
            <a href="#donation" className="hover:text-[#f5d77f] transition-colors">E-Hundi</a>
            <a href="#visit" className="hover:text-[#f5d77f] transition-colors">Plan Visit</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sevas"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b38827] text-stone-950 font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all transform hover:scale-105"
            >
              Book Seva
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION: Full Bandwidth, Full Screen, Glassmorphic Grandeur */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl w-full mx-auto text-center flex flex-col items-center">
          {/* Sacred Crest Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#240e07]/80 backdrop-blur-xl border border-[#d4af37]/40 shadow-xl mb-8">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="font-sans text-xs uppercase tracking-widest text-[#f5d77f] font-semibold">
              Sacred Abode of {tDeity}
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            <span className="font-sans text-[11px] text-emerald-300">Darshan Open</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff6dd] via-[#f5d77f] to-[#d4af37] leading-[1.1] tracking-wide max-w-5xl mb-6 drop-shadow-2xl">
            {tName}
          </h1>

          <p className="text-base sm:text-xl text-stone-300/90 font-sans max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            {tDesc}
          </p>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#sevas"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b38827] text-stone-950 font-sans font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Flame className="w-4 h-4" /> Book Daily Seva
            </a>
            <a
              href="#live"
              className="px-8 py-4 rounded-2xl bg-[#240e07]/70 backdrop-blur-xl border border-[#d4af37]/40 text-[#f5d77f] font-sans font-semibold text-sm tracking-wider uppercase hover:bg-[#2e1209]/80 transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-rose-400" /> Watch Live Darshan
            </a>
            <a
              href="#donation"
              className="px-8 py-4 rounded-2xl bg-[#240e07]/50 backdrop-blur-xl border border-white/10 text-stone-200 font-sans font-semibold text-sm tracking-wider uppercase hover:border-[#d4af37]/40 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#d4af37]" /> E-Hundi Offering
            </a>
          </div>

          {/* Quick Glass Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            {[
              { label: 'Centuries of Heritage', value: '800+ Yrs', icon: HistoryIcon },
              { label: 'Daily Pilgrims Blessed', value: '25,000+', icon: Users },
              { label: 'Nitya Annadanam Meals', value: '10,000 / Day', icon: Sparkles },
              { label: 'Sanctum Timings', value: '4:30 AM - 9 PM', icon: Clock }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#240e07]/60 backdrop-blur-xl border border-[#d4af37]/20 shadow-xl text-center group hover:border-[#d4af37]/50 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#f5d77f] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-sans text-stone-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Sacred Darshan Schedule (Full-Width Glass Card) */}
      <section id="darshan" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-[#1a0904]/60 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Holy Sanctum Timings
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f5d77f] mt-2 mb-4">
              Nitya Darshan & Aarti Schedule
            </h2>
            <p className="font-sans text-stone-300 text-sm sm:text-base">
              Plan your divine pilgrimage. Devotees are requested to maintain traditional attire during darshan hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#220d06]/70 backdrop-blur-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/60 shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f5d77f] font-sans font-bold text-xs">
                    {item.time}
                  </span>
                  <Bell className="w-4 h-4 text-[#d4af37] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-[#f5d77f] transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Royal Sevas & Nitya Poojas (Glass Grid with Booking) */}
      <section id="sevas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Sacred Offerings
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f5d77f] mt-2">
                Nitya & Vishesha Sevas
              </h2>
              <p className="font-sans text-stone-300 text-sm mt-2 max-w-xl">
                Offer special prayers in your name and gotra. Blessed prasadam and sacred raksha will be consecrated.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-stone-400 bg-[#220d06]/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-[#d4af37]/20 self-start md:self-end">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Receipt & Sankalpa
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSevas.map((seva: any) => {
              const priceNum = seva.amount || seva.price || 501
              return (
                <div
                  key={seva.id}
                  className="rounded-3xl bg-[#240e07]/70 backdrop-blur-2xl border border-[#d4af37]/25 p-7 flex flex-col justify-between hover:border-[#d4af37]/70 hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)] transition-all duration-300 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-xl text-[#f5d77f]">
                        🌺
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-sans text-[#f5d77f]">
                          ₹{priceNum}
                        </div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400">Per Sankalpam</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-stone-100 group-hover:text-[#f5d77f] transition-colors mb-2">
                      {seva.name}
                    </h3>

                    <p className="font-sans text-xs text-stone-300 leading-relaxed line-clamp-3 mb-6">
                      {seva.description || 'Devotee sankalpam and archana performed before the sanctum sanctorum.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSeva(seva)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37]/20 to-[#8a2b0e]/30 border border-[#d4af37]/40 text-[#f5d77f] font-sans font-semibold text-xs uppercase tracking-wider hover:bg-[#d4af37] hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    Select & Book Seva <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Live Garbhagriha Darshan (Immersive Full Bandwidth Player) */}
      <section id="live" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-[#180905]/80 via-[#200b06]/80 to-[#120603]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-sans font-bold uppercase tracking-wider mb-4 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> 4K Live Broadcast
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f5d77f]">
              Direct Sanctum Darshan
            </h2>
            <p className="font-sans text-stone-300 text-sm mt-2">
              Experience the divine presence of {tDeity} from anywhere across the globe.
            </p>
          </div>

          <div className="rounded-3xl bg-[#160804]/90 backdrop-blur-2xl border border-[#d4af37]/30 p-4 sm:p-6 shadow-2xl overflow-hidden">
            <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Center Play Glass Pill */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-[#d4af37]/90 text-stone-950 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="font-sans text-xs uppercase tracking-widest text-[#f5d77f] font-bold">
                  Tap to Join Live Broadcast
                </span>
              </div>

              {/* Status Tags */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-rose-600/90 text-white font-sans text-xs font-bold tracking-wider">
                  LIVE NOW
                </span>
                <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-stone-200 font-sans text-xs border border-white/10">
                  Garbhagriha View 1
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-sans text-stone-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#d4af37]" />
                  <span>3,842 Devotees watching right now</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <button className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center gap-1.5">
                    🔔 Ring Temple Bell
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d77f] hover:bg-[#d4af37]/30 transition-all flex items-center gap-1.5">
                    🌺 Offer Flowers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: E-Hundi & Sacred Contribution (Pure Glassmorphic Donation Card) */}
      <section id="donation" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#240e07]/80 backdrop-blur-2xl border border-[#d4af37]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-sans text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Nitya Samarpanam
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5d77f] mt-1 mb-3">
                Sacred E-Hundi Offering
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-300">
                Support temple maintenance, veda pathashala, and daily annadanam. Contributions receive 80G tax exemption.
              </p>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
              {[101, 251, 501, 1001, 5001].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt)
                    setCustomAmount('')
                  }}
                  className={`py-3 rounded-xl font-sans font-bold text-sm transition-all border ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                      : 'bg-[#180905]/60 text-stone-200 border-[#d4af37]/20 hover:border-[#d4af37]/50'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <input
                type="number"
                placeholder="Or enter custom contribution amount (₹)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                className="w-full px-5 py-3.5 rounded-xl bg-[#180905]/70 border border-[#d4af37]/30 text-stone-100 placeholder-stone-400 font-sans text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              onClick={() => alert(`Proceeding to offer ₹${customAmount || selectedAmount} via Secure UPI / Net Banking`)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b38827] text-stone-950 font-sans font-bold text-sm uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" /> Proceed to Offer ₹{customAmount || selectedAmount}
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans text-stone-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" /> 100% Encrypted Payment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant 80G Tax Receipt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Plan Your Visit & Mandir Address */}
      <section id="visit" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-[#1a0904]/70 to-[#120603]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Devotee Pilgrimage Guide
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f5d77f] mt-2 mb-6">
                Plan Your Holy Visit
              </h2>
              <p className="font-sans text-stone-300 text-sm leading-relaxed mb-8">
                The temple welcomes devotees from all corners of the world. Free accommodation inquiry, wheelchair assistance, and special darshan passes for elders and toddlers are available at the trust office.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#240e07]/60 backdrop-blur-xl border border-[#d4af37]/20">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-stone-100 text-sm">Temple Kshetram Address</div>
                    <p className="font-sans text-xs text-stone-400 mt-1">{addressLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#240e07]/60 backdrop-blur-xl border border-[#d4af37]/20">
                  <Phone className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-stone-100 text-sm">Helpline & Seva Enquiries</div>
                    <p className="font-sans text-xs text-stone-400 mt-1">{contactPhone} / {contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#240e07]/60 backdrop-blur-xl border border-[#d4af37]/20">
                  <Compass className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-stone-100 text-sm">Sacred Attire & Guidelines</div>
                    <p className="font-sans text-xs text-stone-400 mt-1">Traditional Indian attire is requested (Dhoti / Kurta / Saree / Salwar). Mobile phones to be deposited at counter 2.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Map Card */}
            <div className="rounded-3xl bg-[#240e07]/70 backdrop-blur-2xl border border-[#d4af37]/30 p-8 text-center flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-3xl mb-4 text-[#f5d77f]">
                🏛️
              </div>
              <h3 className="text-xl font-serif font-bold text-[#f5d77f] mb-2">{tName}</h3>
              <p className="font-sans text-xs text-stone-300 max-w-md mb-6">{addressLine}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(tName + ' ' + addressLine)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#d4af37] text-stone-950 font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEVA BOOKING MODAL */}
      {selectedSeva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#1e0a05] border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#f5d77f] mb-2">
                  Seva Consecrated
                </h3>
                <p className="font-sans text-xs text-stone-300">
                  Sankalpam recorded for {devoteeName || 'Devotee'}. Blessed prasadam details sent via SMS/WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSeva}>
                <div className="text-center mb-6">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#d4af37]">
                    Sankalpa Registration
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#f5d77f] mt-1">
                    {selectedSeva.name}
                  </h3>
                  <div className="text-lg font-bold font-sans text-stone-200 mt-1">
                    ₹{selectedSeva.amount || selectedSeva.price || 501}
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#d4af37]/30 text-stone-100 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Gotra</label>
                      <input
                        type="text"
                        placeholder="e.g. Kaundinya"
                        value={devoteeGotra}
                        onChange={(e) => setDevoteeGotra(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#d4af37]/30 text-stone-100 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 font-semibold mb-1">Nakshatra</label>
                      <input
                        type="text"
                        placeholder="e.g. Rohini"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#d4af37]/30 text-stone-100 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#d4af37]/30 text-stone-100 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b38827] text-stone-950 font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all"
                >
                  Confirm & Pay ₹{selectedSeva.amount || selectedSeva.price || 501}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER: Royal Heritage Glass Footer */}
      <footer className="border-t border-[#d4af37]/20 bg-[#0d0402] py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-stone-400 font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🕉</span>
              <span className="font-serif text-lg font-bold text-[#f5d77f]">{tName}</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Dedicated to upholding centuries of timeless Sanatana Dharma, daily veda paaraayanam, and pilgrim service.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-200 text-sm mb-4">Sacred Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-[#f5d77f] transition-colors">Temple Kshetram History</a></li>
              <li><a href="#darshan" className="hover:text-[#f5d77f] transition-colors">Darshan & Aarti Schedule</a></li>
              <li><a href="#sevas" className="hover:text-[#f5d77f] transition-colors">Book Nitya Sevas</a></li>
              <li><a href="#live" className="hover:text-[#f5d77f] transition-colors">Direct Live Stream</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-200 text-sm mb-4">Devotee Services</h4>
            <ul className="space-y-2.5">
              <li><a href="#donation" className="hover:text-[#f5d77f] transition-colors">E-Hundi & 80G Receipts</a></li>
              <li><a href="#visit" className="hover:text-[#f5d77f] transition-colors">Dharmashala Accommodation</a></li>
              <li><a href="#visit" className="hover:text-[#f5d77f] transition-colors">Veda Pathashala Support</a></li>
              <li><a href="#visit" className="hover:text-[#f5d77f] transition-colors">Gau Shala Seva</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-200 text-sm mb-4">Administration</h4>
            <p className="text-stone-400 text-xs leading-relaxed mb-3">
              Office Hours: 09:00 AM - 06:00 PM<br />
              Email: {contactEmail}<br />
              Phone: {contactPhone}
            </p>
            <div className="text-[11px] text-[#d4af37]">
              Devasthanam Trust Board &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>&copy; {new Date().getFullYear()} {tName}. All sacred rights reserved.</div>
          <div className="flex items-center gap-1.5 text-stone-400">
            Powered by <Heart className="w-3.5 h-3.5 text-[#d4af37]" /> MandirAI OS
          </div>
        </div>
      </footer>

      <VirtualRitualBar templeName={tName} />
    </div>
  )
}

function HistoryIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
