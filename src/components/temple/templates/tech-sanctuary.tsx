'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Video, Clock, Calendar, MapPin, Phone, Mail, ChevronRight, 
  CreditCard, Shield, CheckCircle2, Play, Users, Sparkles, 
  ArrowRight, Heart, Bell, Eye, Compass, Smartphone, 
  QrCode, ExternalLink, Activity
} from 'lucide-react'
import BlockRenderer from '@/components/temple/blocks/block-renderer'
import { useLanguage } from '@/components/shared/language-context'
import { SacredParticles } from '@/components/ui/sacred-particles'
import { VirtualRitualBar } from '@/components/temple/virtual-ritual-bar'
import { PanchangTicker } from '@/components/temple/panchang-ticker'

export interface TemplateProps {
  temple?: any
  page?: any
  sevas?: any[]
}

export default function TechSanctuaryTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [activeCam, setActiveCam] = useState<'main' | 'praakaram' | 'homa'>('main')
  const [selectedSeva, setSelectedSeva] = useState<any>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number>(501)
  const [customDonation, setCustomDonation] = useState<string>('')
  const [devoteeName, setDevoteeName] = useState('')
  const [devoteePhone, setDevoteePhone] = useState('')
  const [devoteeGotra, setDevoteeGotra] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tName = temple?.name || 'Sri Shankara Digital Kshetram'
  const tDeity = temple?.primaryDeity || 'Lord Shiva & Sri Maha Ganapati'
  const tDesc = temple?.description || 'A state-of-the-art digital sanctuary offering high-definition live darshan, seamless online seva consecration, and instant E-Pass booking for global devotees.'

  const contactPhone = temple?.contactPhone || '+91 8000 666 777'
  const contactEmail = temple?.contactEmail || 'darshan@digitalkshetram.org'
  const addressLine = temple?.address?.street || temple?.address?.city 
    ? `${temple?.address?.street || ''} ${temple?.address?.city || ''}, ${temple?.address?.state || ''} ${temple?.address?.zip || ''}`
    : 'Plot 108, Cyber Temple Corridor, Bengaluru, Karnataka - 560100'

  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: '1', name: 'Digital Nitya Archana', price: 251, amount: 251, description: 'Direct sanctum archana with digital sankalpam and SMS live confirmation.' },
    { id: '2', name: 'Maha Rudrabhisheka Seva', price: 1001, amount: 1001, description: 'Live-streamed panchamrita abhishekam dedicated to Lord Shiva with veda chanting.' },
    { id: '3', name: 'Nitya Annadanam Sponsorship', price: 1501, amount: 1501, description: 'Provide hot satvik meals for 50 visiting pilgrims with impact dashboard tracking.' },
    { id: '4', name: 'Ganapati Modaka Homam', price: 751, amount: 751, description: 'Auspicious sacred fire ritual invoking obstacles removal and family success.' },
    { id: '5', name: 'Akhanda Ghee Deepam', price: 1101, amount: 1101, description: 'Sponsor the sanctum perpetual flame with pure desi ghee for 7 consecutive days.' },
    { id: '6', name: 'Navagraha Shanti Pooja', price: 3001, amount: 3001, description: 'Complete 9-planetary alignment ritual performed by senior Vedic priests.' }
  ]

  const timings = [
    { time: '05:30 AM - 06:15 AM', name: 'Mangala Aarti & Awakening', live: false },
    { time: '06:30 AM - 12:30 PM', name: 'Sarva Darshanam & Abhishekam', live: true },
    { time: '12:30 PM - 01:15 PM', name: 'Maha Naivedyam & Noon Aarti', live: false },
    { time: '04:30 PM - 08:30 PM', name: 'Evening Sandhya Darshanam', live: true },
    { time: '07:00 PM - 07:45 PM', name: 'Maha Deeparadhana Aarti', live: false },
    { time: '08:45 PM - 09:15 PM', name: 'Ekantha Seva & Closing', live: false }
  ]

  const handleBookSeva = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setSelectedSeva(null)
    }, 2800)
  }

  // Render template directly

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      {/* Subtle obsidian & emerald background highlights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/3 w-[700px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-10 w-[600px] h-[600px] bg-indigo-500/5 blur-[160px] rounded-full" />
      </div>

      <PanchangTicker className="relative z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md" />
      <SacredParticles variant="marigold" quantity={16} className="fixed inset-0 z-10 pointer-events-none opacity-25" />

      {/* Floating Obsidian Glass Navigation */}
      <header className="fixed top-10 left-0 right-0 z-40 px-4 sm:px-8">
        <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${
          scrolled 
            ? 'bg-zinc-950/85 backdrop-blur-2xl border border-zinc-800 shadow-2xl py-3 px-6' 
            : 'bg-zinc-950/50 backdrop-blur-md border border-zinc-800/60 py-4 px-6'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-zinc-950 shadow-lg shadow-emerald-500/20 font-bold text-lg">
              🕉
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white truncate max-w-[200px] sm:max-w-md">
                {tName}
              </div>
              <div className="text-[10px] tracking-widest text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {tDeity}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-emerald-400 transition-colors">Sanctum</a>
            <a href="#schedule" className="hover:text-emerald-400 transition-colors">Timings</a>
            <a href="#sevas" className="hover:text-emerald-400 transition-colors">Digital Sevas</a>
            <a href="#live" className="hover:text-emerald-400 transition-colors">4K Darshan</a>
            <a href="#token" className="hover:text-emerald-400 transition-colors">E-Pass Queue</a>
            <a href="#donation" className="hover:text-emerald-400 transition-colors">E-Hundi</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Visit</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sevas"
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
            >
              Book Seva
            </a>
          </div>
        </div>
      </header>

      {/* HERO: Full Bandwidth Obsidian Glass Hero */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-300">
              4K Live Darshan Active • Sanctum Waiting Time: ~15 Mins
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6">
            {tName}
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            {tDesc}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#sevas"
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Book Online Seva
            </a>
            <a
              href="#live"
              className="px-8 py-4 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 text-white font-semibold text-sm uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-emerald-400" /> Watch Live 4K
            </a>
            <a
              href="#token"
              className="px-8 py-4 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 text-zinc-300 font-semibold text-sm uppercase tracking-wider hover:border-emerald-500/40 transition-all flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-amber-400" /> Darshan E-Pass
            </a>
          </div>

          {/* Quick Real-Time Metrics Ribbon */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Global Devotees', sub: '98,000+ Connected', icon: Users },
              { title: 'Live Stream', sub: 'Ultra Low-Latency 4K', icon: Video },
              { title: 'Digital Queue', sub: 'Scan & Enter In 15m', icon: Smartphone },
              { title: 'Direct Prasadam', sub: 'Doorstep Courier Available', icon: Shield }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 shadow-md text-left group hover:border-emerald-500/40 transition-all"
              >
                <item.icon className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="font-bold text-white text-sm">
                  {item.title}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Daily Schedule (Clean Obsidian Glass) */}
      <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Sanctum Routine
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1 mb-3">
              Daily Aarti & Darshan Schedule
            </h2>
            <p className="text-zinc-400 text-sm">
              Temple doors open daily at 05:30 AM. Devotees with Digital E-Pass enjoy direct entry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timings.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
                  t.live
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
                    : 'bg-zinc-900/60 border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {t.time}
                  </span>
                  {t.live && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live Stream Active
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-1">
                  {t.name}
                </h3>
                <p className="text-xs text-zinc-400">
                  Open for in-person devotees & online live viewing worldwide.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Online Sevas & Poojas */}
      <section id="sevas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Pooja Offerings
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                Book Consecrated Sevas
              </h2>
              <p className="text-zinc-400 text-sm mt-1 max-w-xl">
                Offer archana and abhishekam with digital sankalpam. Sacred prasadam dispatched directly to your address.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Digital Sankalpa Acknowledgement
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSevas.map((seva: any) => {
              const priceVal = seva.amount || seva.price || 251
              return (
                <div
                  key={seva.id}
                  className="rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800 p-7 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl font-serif">
                        🕉
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ₹{priceVal}
                        </div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">One-time Seva</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-emerald-400 transition-colors mb-2">
                      {seva.name}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {seva.description || 'Special sankalpam performed in the sanctum sanctorum with Vedic chants.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSeva(seva)}
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/15"
                  >
                    Select & Book Seva <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Live 4K Darshan Player with Multi-Angle Cam Switcher */}
      <section id="live" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> 4K Ultra-HD Darshan
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Garbhagriha Live Stream
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Select your preferred camera angle for direct sanctum viewing.
            </p>
          </div>

          {/* Camera Switcher Tabs */}
          <div className="flex justify-center gap-3 mb-6">
            {[
              { id: 'main', label: 'Moolavar Sanctum (Main)' },
              { id: 'praakaram', label: 'Deepa Praakaram' },
              { id: 'homa', label: 'Yagashala & Havan' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCam(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCam === tab.id
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-md'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800 p-4 sm:p-6 shadow-2xl">
            <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
                  Tap to Join Live Sanctum Audio & Video
                </span>
              </div>

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold tracking-wider">
                  LIVE
                </span>
                <span className="px-3 py-1 rounded-lg bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-xs border border-white/10 uppercase">
                  {activeCam} Camera
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>3,418 Devotees currently connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                    🔔 Ring Temple Bell
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all">
                    🌺 Offer Sacred Flowers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Darshan E-Pass & Token Queue */}
      <section id="token" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-zinc-900/70 backdrop-blur-2xl border border-zinc-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Fast-Track Entry
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 mb-3">
                  Digital Darshan E-Pass
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Skip general pilgrimage queues. Generate your free digital darshan token with slot confirmation directly on your smartphone.
                </p>

                <div className="space-y-3 text-xs text-zinc-300 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant QR code verification at Temple Gate 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free shoe rack & locker token included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated queue for senior citizens & children</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Generating your free Darshan E-Pass...')}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Smartphone className="w-4 h-4" /> Book Free E-Pass Token
                </button>
              </div>

              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 text-center flex flex-col items-center">
                <QrCode className="w-28 h-28 text-emerald-400 mb-3" />
                <div className="font-bold text-white text-sm">Scan for Instant Darshan Status</div>
                <div className="text-[11px] text-zinc-400 mt-1">Next available slot: Today at 04:30 PM</div>
                <div className="mt-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  Queue Flow: Fast (12 min wait)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: E-Hundi Donation Card */}
      <section id="donation" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-zinc-950/60">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 p-8 sm:p-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Devasthanam Trust
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1 mb-2">
                Online E-Hundi Offering
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Support temple infrastructure, daily free annadanam, and Vedic heritage education. All online donations qualify for instant 80G tax benefit.
              </p>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
              {[101, 251, 501, 1001, 5001].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setDonationAmount(amt)
                    setCustomDonation('')
                  }}
                  className={`py-3.5 rounded-2xl font-bold text-sm transition-all border ${
                    donationAmount === amt && !customDonation
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="mb-6">
              <input
                type="number"
                placeholder="Or enter custom contribution amount (₹)"
                value={customDonation}
                onChange={(e) => {
                  setCustomDonation(e.target.value)
                  setDonationAmount(0)
                }}
                className="w-full px-5 py-3.5 rounded-2xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => alert(`Redirecting to secure payment for ₹${customDonation || donationAmount}`)}
              className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate ₹{customDonation || donationAmount} via UPI / Net Banking
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-400" /> Bank-Grade 256-bit Security
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant 80G Certificate PDF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Location & Visit Information */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Plan Pilgrimage
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1 mb-6">
                Sanctum Location & Contact
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                The temple complex provides automated parking guidance, cloakroom facilities, drinking water, and prasad distribution points.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Temple Complex Address</div>
                    <p className="text-xs text-zinc-400 mt-1">{addressLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Devotee Helpline</div>
                    <p className="text-xs text-zinc-400 mt-1">{contactPhone} • {contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Map Card */}
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 text-center flex flex-col items-center justify-center min-h-[340px]">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-3xl mb-4">
                🛕
              </div>
              <h3 className="font-serif font-bold text-xl text-white mb-1">{tName}</h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-6">{addressLine}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(tName + ' ' + addressLine)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
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
          <div className="w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white font-bold"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-2xl text-white mb-2">
                  Seva Registered
                </h3>
                <p className="text-xs text-zinc-400">
                  Digital sankalpam recorded for {devoteeName || 'Devotee'}. Confirmation sent to your WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSeva}>
                <div className="text-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Sankalpa Registration
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    {selectedSeva.name}
                  </h3>
                  <div className="text-xl font-bold text-white mt-1">
                    ₹{selectedSeva.amount || selectedSeva.price || 251}
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srikant Iyer"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Gotra / Family Lineage</label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyapa"
                      value={devoteeGotra}
                      onChange={(e) => setDevoteeGotra(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Pay ₹{selectedSeva.amount || selectedSeva.price || 251} & Consecrate
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🕉</span>
              <span className="font-serif font-bold text-base text-white">{tName}</span>
            </div>
            <p className="leading-relaxed">
              Empowering global devotees to connect with sacred Sanatana Dharma with seamless digital access and purity.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#schedule" className="hover:text-emerald-400 transition-colors">Aarti Timings</a></li>
              <li><a href="#sevas" className="hover:text-emerald-400 transition-colors">Online Pooja Sevas</a></li>
              <li><a href="#live" className="hover:text-emerald-400 transition-colors">4K Live Darshan</a></li>
              <li><a href="#donation" className="hover:text-emerald-400 transition-colors">E-Hundi Donation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Administration</h4>
            <p className="leading-relaxed">
              {addressLine}<br />
              {contactPhone}<br />
              {contactEmail}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Legal & Trust</h4>
            <p className="leading-relaxed">
              Registered Public Charitable Religious Trust.<br />
              All online contributions eligible for 80G tax exemptions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} {tName}. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-emerald-400" /> on MandirAI OS
          </div>
        </div>
      </footer>

      <VirtualRitualBar templeName={tName} />
    </div>
  )
}
