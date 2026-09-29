'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Flame, Star, Sun, Moon, MapPin, Phone, Mail, Calendar, 
  Clock, Heart, Share2, Users, Video, MessageCircle, Info, 
  ChevronRight, Sparkles, CheckCircle2, Shield, ArrowRight, 
  Bell, Play
} from 'lucide-react'
import BlockRenderer from '@/components/temple/blocks/block-renderer'
import { useLanguage } from '@/components/shared/language-context'
import { SacredParticles } from '@/components/ui/sacred-particles'
import { VirtualRitualBar } from '@/components/temple/virtual-ritual-bar'
import { PanchangTicker } from '@/components/temple/panchang-ticker'
import TempleUpiModal from '@/components/temple/temple-upi-modal'
import TempleLivePlayer from '@/components/temple/temple-live-player'

export interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function DivineGlowTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [diyaCount, setDiyaCount] = useState(10842)
  const [hasLitDiya, setHasLitDiya] = useState(false)
  const [selectedSeva, setSelectedSeva] = useState<any>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number>(501)
  const [customDonation, setCustomDonation] = useState<string>('')
  const [devoteeName, setDevoteeName] = useState('')
  const [devoteePhone, setDevoteePhone] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tName = temple?.name || 'Shri Akhand Jyoti Devasthanam'
  const tDeity = temple?.primaryDeity || 'Lord Shiva & Devi Tripura Sundari'
  const tDesc = temple?.description || 'Home to the eternal sacred flame of Sanatana Dharma. Experience the radiant aura of perpetual devotion, inner peace, and divine enlightenment.'

  const contactPhone = temple?.contactPhone || '+91 8000 444 555'
  const contactEmail = temple?.contactEmail || 'darshan@divineglow.org'
  const addressLine = temple?.address?.street || temple?.address?.city 
    ? `${temple?.address?.street || ''} ${temple?.address?.city || ''}, ${temple?.address?.state || ''} ${temple?.address?.zip || ''}`
    : '77 Divine Ray Road, Hill of Eternal Light, Karnataka - 570001'

  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: '1', name: 'Nitya Deepa Daan', price: 251, amount: 251, description: 'Light 108 pure cow-ghee lamps inside the sanctum praakaram for peace and prosperity.' },
    { id: '2', name: 'Akhand Jyot Monthly Patron', price: 2101, amount: 2101, description: 'Sponsor the uninterrupted sacred flame in the Garbhagriha for an entire month.' },
    { id: '3', name: 'Maha Rudra Deeparadhana', price: 1001, amount: 1001, description: 'Grand camphor and ghee flame aarti offered with traditional Rudra stotras.' },
    { id: '4', name: 'Sahasra Deepotsava Seva', price: 5001, amount: 5001, description: 'Magnificent 1,000 deepam illumination ceremony during special pradosham evenings.' },
    { id: '5', name: 'Annadanam Deepa Seva', price: 1501, amount: 1501, description: 'Feeding visiting pilgrims followed by evening temple lamp illumination.' },
    { id: '6', name: 'Purna Ahuti & Maha Havan', price: 11001, amount: 11001, description: 'Comprehensive Vedic fire sacrifice for global peace and family welfare.' }
  ]

  const schedule = [
    { time: '05:00 AM', name: 'Mangala Aarti & Deepa Darshan', icon: Sun, desc: 'Awakening the sanctum with sacred ghee flame offerings' },
    { time: '07:30 AM', name: 'Shringar & Suprabhata Darshanam', icon: Sparkles, desc: 'Adorning with flowers and fragrant sandalwood paste' },
    { time: '12:00 PM', name: 'Maha Rajbhog Aarti', icon: Flame, desc: 'Midday holy food offering accompanied by temple conch resonance' },
    { time: '04:30 PM', name: 'Utthapana Deepa Darshan', icon: Sun, desc: 'Afternoon sanctum re-opening and holy water distribution' },
    { time: '07:00 PM', name: 'Sandhya Maha Deeparadhana', icon: Moon, desc: 'The most auspicious dusk ceremony of 108 synchronized oil lamps' },
    { time: '09:00 PM', name: 'Shayan Aarti & Jyoti Shanti', icon: Star, desc: 'Night repose chants and closing blessings' }
  ]

  const lightDiya = () => {
    if (!hasLitDiya) {
      setDiyaCount(prev => prev + 1)
      setHasLitDiya(true)
    }
  }

  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false)
  const [upiModalConfig, setUpiModalConfig] = useState<{
    amount: number
    title?: string
    description?: string
    sevaName?: string
    devoteeName?: string
  }>({
    amount: 501,
    title: 'Sacred E-Hundi Offering',
    description: 'Direct offering to temple sanctum and annadanam trust'
  })

  const handleDonationSubmit = () => {
    const amt = Number(customDonation) || donationAmount || 501
    setUpiModalConfig({
      amount: amt,
      title: 'Radiant E-Hundi Samarpanam',
      description: `Direct sacred offering to ${tName} eternal sanctum flame`,
      sevaName: '',
      devoteeName: devoteeName || ''
    })
    setIsUpiModalOpen(true)
  }

  const handleBookSeva = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = selectedSeva?.amount || selectedSeva?.price || 251
    setUpiModalConfig({
      amount: amt,
      title: `Book Seva: ${selectedSeva?.name}`,
      description: `Consecrated Sankalpam for ${devoteeName || 'Devotee'}`,
      sevaName: selectedSeva?.name,
      devoteeName: devoteeName
    })
    setIsUpiModalOpen(true)
  }

  // Render template directly

  return (
    <div className="min-h-screen bg-[#120702] text-[#fff7ed] font-serif selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      {/* Background ambient radiant flame glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-amber-500/20 via-orange-600/10 to-transparent blur-[130px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full" />
      </div>

      <PanchangTicker className="relative z-50 border-b border-amber-500/20 bg-[#1a0b03]/85 backdrop-blur-md" />
      <SacredParticles variant="diya-ember" quantity={22} className="fixed inset-0 z-10 pointer-events-none opacity-45" />

      {/* Floating Glass Navigation */}
      <header className="fixed top-10 left-0 right-0 z-40 px-4 sm:px-8">
        <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${
          scrolled 
            ? 'bg-[#1e0d04]/85 backdrop-blur-2xl border border-amber-500/30 shadow-[0_8px_32px_rgba(245,158,11,0.15)] py-3 px-6' 
            : 'bg-[#1e0d04]/40 backdrop-blur-md border border-amber-500/15 py-4 px-6'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {temple?.logoUrl ? (
              <img
                src={temple.logoUrl}
                alt={tName}
                className="w-10 h-10 rounded-2xl object-cover border border-amber-500/40 shadow-lg shadow-amber-500/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 border border-amber-200/40">
                🪔
              </div>
            )}
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide text-amber-200 truncate max-w-[200px] sm:max-w-md">
                {tName}
              </div>
              <div className="text-[10px] font-sans tracking-widest text-amber-400 font-semibold uppercase">
                {tDeity}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium tracking-wide text-stone-300">
            <a href="#about" className="hover:text-amber-300 transition-colors">Sanctum</a>
            <a href="#schedule" className="hover:text-amber-300 transition-colors">Aarti Timings</a>
            <a href="#sevas" className="hover:text-amber-300 transition-colors">Deepa Sevas</a>
            <a href="#live" className="hover:text-amber-300 transition-colors">Live Darshan</a>
            <a href="#donation" className="hover:text-amber-300 transition-colors">E-Hundi</a>
            <a href="#contact" className="hover:text-amber-300 transition-colors">Visit</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sevas"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105"
            >
              Light a Diya
            </a>
          </div>
        </div>
      </header>

      {/* HERO: Full Bandwidth Radiant Glass Sanctum with Uploaded Cover Image */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
        {/* Uploaded Temple Cover Photo Backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="w-full h-full bg-cover bg-center filter blur-[3px] scale-105 opacity-20 transition-all duration-700"
            style={{
              backgroundImage: `url('${temple?.coverImageUrl || temple?.themeConfig?.heroImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80'}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#180903]/75 via-[#180903]/90 to-[#180903]" />
        </div>
        <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Sacred Vedic Chants Tag */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#271206]/80 backdrop-blur-xl border border-amber-400/40 shadow-xl shadow-amber-500/10 mb-8">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="font-sans text-xs uppercase tracking-widest text-amber-200 font-semibold">
              तमसो मा ज्योतिर्गमय • Lead Me From Darkness To Light
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fffaf0] via-[#fed7aa] to-[#f59e0b] leading-[1.1] tracking-wide mb-6 drop-shadow-2xl">
            {tName}
          </h1>

          <p className="text-base sm:text-xl text-stone-300 font-sans max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            {tDesc}
          </p>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={lightDiya}
              className={`px-8 py-4 rounded-2xl font-sans font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 shadow-xl ${
                hasLitDiya
                  ? 'bg-amber-400 text-stone-950 shadow-amber-400/40'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 shadow-amber-500/30 hover:shadow-amber-500/50'
              }`}
            >
              <Flame className="w-5 h-5 fill-current" />
              {hasLitDiya ? '✓ Diya Consecrated' : 'Light a Virtual Diya'}
            </button>
            <a
              href="#sevas"
              className="px-8 py-4 rounded-2xl bg-[#281307]/70 backdrop-blur-xl border border-amber-500/40 text-amber-200 font-sans font-semibold text-sm uppercase tracking-wider hover:bg-[#341a0a]/90 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Book Deepa Seva
            </a>
            <a
              href="#live"
              className="px-8 py-4 rounded-2xl bg-[#281307]/50 backdrop-blur-xl border border-white/10 text-stone-200 font-sans font-semibold text-sm tracking-wider uppercase hover:border-amber-400/50 transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-rose-400" /> Watch Live Aarti
            </a>
          </div>

          {/* Interactive Diya Counter Glass Capsule */}
          <div className="p-6 rounded-3xl bg-[#241106]/70 backdrop-blur-2xl border border-amber-500/30 shadow-2xl max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl">
                🪔
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold font-serif text-amber-200">
                  {diyaCount.toLocaleString()}
                </div>
                <div className="text-xs font-sans text-stone-400 uppercase tracking-wider">
                  Consecrated Lamps Burning Worldwide
                </div>
              </div>
            </div>
            <div className="text-xs font-sans text-amber-300/80 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 text-center sm:text-right">
              Next Sandhya Aarti at <span className="font-bold text-amber-200">7:00 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Sacred Aarti & Timings (Luminous Glass Cards) */}
      <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-[#1c0c04]/80 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Sacred Flame Hours
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-200 mt-2 mb-4">
              Daily Aarti & Darshan Timings
            </h2>
            <p className="font-sans text-stone-300 text-sm">
              Attend the divine illumination ceremonies. Witnessing the sacred camphor aarti is believed to dispel all darkness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#261206]/70 backdrop-blur-2xl border border-amber-500/20 hover:border-amber-400/60 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-sans font-bold text-xs">
                    {item.time}
                  </span>
                  <item.icon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors mb-2">
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

      {/* SECTION 3: Sacred Sevas & Deepa Offerings */}
      <section id="sevas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Illumination Sevas
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-200 mt-2">
                Nitya Deepa Sevas
              </h2>
              <p className="font-sans text-stone-300 text-sm mt-2 max-w-xl">
                Sponsor sacred ghee lamps and havan offerings in your family name. Consecrated holy ash (bhasma) and kumkum will be sent.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-stone-400 bg-[#261206]/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-amber-500/20 self-start md:self-end">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Digital Sankalpam Consecrated
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSevas.map((seva: any) => {
              const priceVal = seva.amount || seva.price || 251
              return (
                <div
                  key={seva.id}
                  className="rounded-3xl bg-[#281307]/70 backdrop-blur-2xl border border-amber-500/25 p-7 flex flex-col justify-between hover:border-amber-400/70 hover:shadow-[0_12px_40px_rgba(245,158,11,0.18)] transition-all duration-300 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl text-amber-300">
                        🪔
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-sans text-amber-200">
                          ₹{priceVal}
                        </div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400">Holy Offering</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors mb-2">
                      {seva.name}
                    </h3>

                    <p className="font-sans text-xs text-stone-300 leading-relaxed line-clamp-3 mb-6">
                      {seva.description || 'Devotee sankalpam and lighting of holy lamps in the sanctum sanctorum.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSeva(seva)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-600/30 border border-amber-500/40 text-amber-200 font-sans font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 hover:text-stone-950 transition-all flex items-center justify-center gap-2"
                  >
                    Select & Consecrate <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Live 4K Aarti Broadcast (Full-Width Immersive Container) */}
      <section id="live" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-[#180903]/80 via-[#230d05]/90 to-[#120702]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-sans font-bold uppercase tracking-wider mb-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Live Sanctum Aarti
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-200">
              Direct Garbhagriha Broadcast
            </h2>
            <p className="font-sans text-stone-300 text-sm mt-2">
              Witness the eternal flame illuminating the deity vigraha in ultra-high definition.
            </p>
          </div>

          <TempleLivePlayer
            liveStreamUrl={temple?.liveStreamUrl}
            coverImageUrl={temple?.coverImageUrl}
            templeName={tName}
            accentColor="#f59e0b"
          />
        </div>
      </section>

      {/* SECTION 5: E-Hundi Deepam Offering (Luminous Glass Card) */}
      <section id="donation" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#271206]/85 backdrop-blur-2xl border border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-sans text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Nitya Deepa Seva
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200 mt-1 mb-3">
                Sacred E-Hundi Offering
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-300">
                Your contributions keep the sacred eternal flame burning day and night, supporting temple cows and daily free feeding. 80G tax benefit applicable.
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
                  className={`py-3 rounded-xl font-sans font-bold text-sm transition-all border ${
                    donationAmount === amt && !customDonation
                      ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-lg shadow-amber-400/20'
                      : 'bg-[#1b0b03]/70 text-stone-200 border-amber-500/20 hover:border-amber-400/50'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="mb-8">
              <input
                type="number"
                placeholder="Or enter custom sacred amount (₹)"
                value={customDonation}
                onChange={(e) => {
                  setCustomDonation(e.target.value)
                  setDonationAmount(0)
                }}
                className="w-full px-5 py-3.5 rounded-xl bg-[#1b0b03]/80 border border-amber-500/30 text-stone-100 placeholder-stone-400 font-sans text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              onClick={handleDonationSubmit}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 font-sans font-bold text-sm uppercase tracking-widest hover:brightness-110 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" /> Offer ₹{customDonation || donationAmount} via UPI / Net Banking
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans text-stone-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Bank-Grade 256-bit Security
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant 80G Tax Exemption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Plan Your Visit */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-[#1a0b03]/70 to-[#120702]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Pilgrimage Information
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-200 mt-2 mb-6">
                Visit The Holy Sanctum
              </h2>
              <p className="font-sans text-stone-300 text-sm leading-relaxed mb-8">
                The divine hill abode of {tName} is accessible by road with step-free paths for elderly pilgrims. Special wheel-chairs and priority darshan for seniors are available at Gate 1.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#261206]/60 backdrop-blur-xl border border-amber-500/20">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-stone-100 text-sm">Sanctum Location</div>
                    <p className="font-sans text-xs text-stone-400 mt-1">{addressLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#261206]/60 backdrop-blur-xl border border-amber-500/20">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-stone-100 text-sm">Temple Trust Helpline</div>
                    <p className="font-sans text-xs text-stone-400 mt-1">{contactPhone} • {contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Map Card */}
            <div className="rounded-3xl bg-[#261206]/70 backdrop-blur-2xl border border-amber-500/30 p-8 text-center flex flex-col items-center justify-center min-h-[340px]">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl mb-4 text-amber-300">
                🛕
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-200 mb-2">{tName}</h3>
              <p className="font-sans text-xs text-stone-300 max-w-md mb-6">{addressLine}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(tName + ' ' + addressLine)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-amber-400 text-stone-950 font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-400/25 transition-all flex items-center gap-2"
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
          <div className="w-full max-w-lg rounded-3xl bg-[#220e05] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative">
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
                <h3 className="text-2xl font-serif font-bold text-amber-200 mb-2">
                  Deepam Consecrated
                </h3>
                <p className="font-sans text-xs text-stone-300">
                  Sacred flame will be lit in the name of {devoteeName || 'Devotee'}. Details sent to your WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSeva}>
                <div className="text-center mb-6">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-amber-400">
                    Sankalpa Registration
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-amber-200 mt-1">
                    {selectedSeva.name}
                  </h3>
                  <div className="text-lg font-bold font-sans text-stone-200 mt-1">
                    ₹{selectedSeva.amount || selectedSeva.price || 251}
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-500/30 text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">WhatsApp / Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-500/30 text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all"
                >
                  Pay ₹{selectedSeva.amount || selectedSeva.price || 251} & Light Flame
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-amber-500/20 bg-[#0d0401] py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-stone-400 font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🪔</span>
              <span className="font-serif text-lg font-bold text-amber-200">{tName}</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Preserving the eternal sacred flame, veda paaraayanam, and pilgrim service across generations.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-200 text-sm mb-4">Sacred Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#schedule" className="hover:text-amber-300 transition-colors">Aarti Timings</a></li>
              <li><a href="#sevas" className="hover:text-amber-300 transition-colors">Book Deepa Sevas</a></li>
              <li><a href="#live" className="hover:text-amber-300 transition-colors">Live Aarti Stream</a></li>
              <li><a href="#donation" className="hover:text-amber-300 transition-colors">E-Hundi Offering</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-200 text-sm mb-4">Trust Contact</h4>
            <p className="leading-relaxed">
              {addressLine}<br />
              {contactPhone}<br />
              {contactEmail}
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-200 text-sm mb-4">Legal</h4>
            <p className="leading-relaxed">
              Registered Public Charitable Religious Trust.<br />
              All contributions eligible for 80G tax benefits.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>&copy; {new Date().getFullYear()} {tName}. All sacred rights reserved.</div>
          <div className="flex items-center gap-1.5 text-stone-400">
            Consecrated with <Heart className="w-3.5 h-3.5 text-amber-400" /> on MandirAI OS
          </div>
        </div>
      </footer>

      <TempleUpiModal
        isOpen={isUpiModalOpen}
        onClose={() => {
          setIsUpiModalOpen(false)
          setSelectedSeva(null)
        }}
        templeName={tName}
        contactPhone={contactPhone}
        upiId={temple?.upiId}
        amount={upiModalConfig.amount}
        title={upiModalConfig.title}
        description={upiModalConfig.description}
        sevaName={upiModalConfig.sevaName}
        devoteeName={upiModalConfig.devoteeName || devoteeName}
        onDevoteeNameChange={(name) => setDevoteeName(name)}
      />

      <VirtualRitualBar templeName={tName} />
    </div>
  )
}
