'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Calendar, Clock, MapPin, Heart, Share2, Phone, Mail, 
  ChevronRight, Play, Users, Activity, Video, CheckCircle2, 
  Globe, Bell, Star, Shield, Zap, Sparkles, ArrowRight, 
  Compass, Flame
} from 'lucide-react'
import BlockRenderer from '@/components/temple/blocks/block-renderer'
import { useLanguage } from '@/components/shared/language-context'
import { SacredParticles } from '@/components/ui/sacred-particles'
import { VirtualRitualBar } from '@/components/temple/virtual-ritual-bar'
import { PanchangTicker } from '@/components/temple/panchang-ticker'
import TempleUpiModal from '@/components/temple/temple-upi-modal'
import TempleLivePlayer from '@/components/temple/temple-live-player'
import TempleSanctumShowcase from '@/components/temple/temple-sanctum-showcase'

export interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function ModernElegantTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
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

  const tName = temple?.name || 'Sri Ananda Nilayam Modern Temple'
  const tDeity = temple?.primaryDeity || 'Sri Radha Krishna & Lord Shiva'
  const tDesc = temple?.description || 'A serene contemporary sanctuary uniting timeless Vedic devotion with seamless digital accessibility for global devotees.'
  
  const contactPhone = temple?.contactPhone || '+91 8000 222 333'
  const contactEmail = temple?.contactEmail || 'seva@anandanilayam.org'
  const addressLine = temple?.address?.street || temple?.address?.city 
    ? `${temple?.address?.street || ''} ${temple?.address?.city || ''}, ${temple?.address?.state || ''} ${temple?.address?.zip || ''}`
    : '42 Lotus Promenade, Divine Valley, Bangalore, Karnataka - 560001'

  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: '1', name: 'Nitya Archana & Sankalpa', price: 251, amount: 251, description: 'Personalized holy archana performed during daily morning alankaram.' },
    { id: '2', name: 'Maha Rudrabhishekam', price: 1001, amount: 1001, description: 'Sacred panchamrita bath with bilva patra offerings and Vedic chanting.' },
    { id: '3', name: 'Annadanam Seva (100 Meals)', price: 2001, amount: 2001, description: 'Sponsor freshly prepared satvik bhojan for visiting devotees and sadhus.' },
    { id: '4', name: 'Radha Krishna Tulsi Mala Seva', price: 501, amount: 501, description: 'Offering consecrated Tulsi garlands for the celestial lotus feet.' },
    { id: '5', name: 'Akhanda Deepam Sponsor', price: 1501, amount: 1501, description: 'Ensure the eternal brass sanctum lamp stays lit through the night.' },
    { id: '6', name: 'Shri Lakshmi Kubera Havan', price: 5001, amount: 5001, description: 'Auspicious fire ritual invoking prosperity, wisdom, and auspiciousness.' }
  ]

  const timings = [
    { label: 'Morning Awakening (Mangala)', time: '05:30 AM - 06:15 AM', active: false },
    { label: 'Morning Sarva Darshan', time: '06:30 AM - 12:30 PM', active: true },
    { label: 'Madhyahna Aarti & Bhog', time: '12:30 PM - 01:00 PM', active: false },
    { label: 'Evening Sarva Darshan', time: '04:30 PM - 08:30 PM', active: true },
    { label: 'Sandhya Maha Aarti', time: '07:00 PM - 07:45 PM', active: false },
    { label: 'Shayan Aarti (Temple Closes)', time: '09:00 PM', active: false }
  ]

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
      title: 'Sacred E-Hundi Offering',
      description: `Direct offering to ${tName} sanctum and annadanam trust`,
      sevaName: '',
      devoteeName: devoteeName || ''
    })
    setIsUpiModalOpen(true)
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = selectedSeva?.amount || selectedSeva?.price || 251
    setUpiModalConfig({
      amount: amt,
      title: `Book Seva: ${selectedSeva?.name}`,
      description: `Sankalpam for ${devoteeName || 'Devotee'}`,
      sevaName: selectedSeva?.name,
      devoteeName: devoteeName
    })
    setIsUpiModalOpen(true)
  }

  // Render template directly

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0c0d10] text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden">
      {/* Subtle modern saffron ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[500px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-rose-500/5 dark:bg-rose-500/5 blur-[140px] rounded-full" />
      </div>

      <PanchangTicker className="relative z-50 border-b border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-950/70 backdrop-blur-md" />
      <SacredParticles variant="marigold" quantity={18} className="fixed inset-0 z-10 pointer-events-none opacity-30" />

      {/* Floating Modern Glass Navigation */}
      <header className="fixed top-10 left-0 right-0 z-40 px-4 sm:px-8">
        <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${
          scrolled 
            ? 'bg-white/85 dark:bg-stone-900/85 backdrop-blur-2xl border border-stone-200/80 dark:border-stone-800 shadow-xl py-3 px-6' 
            : 'bg-white/50 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200/50 dark:border-stone-800/50 py-4 px-6'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {temple?.logoUrl ? (
              <img
                src={temple.logoUrl}
                alt={tName}
                className="w-10 h-10 rounded-2xl object-cover border border-amber-500/40 shadow-md"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md font-serif text-lg font-bold">
                ॐ
              </div>
            )}
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                {tName}
              </div>
              <div className="text-[10px] tracking-widest text-amber-600 dark:text-amber-400 font-semibold uppercase">
                {tDeity}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-300">
            <a href="#about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">About</a>
            <a href="#schedule" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Timings</a>
            <a href="#sevas" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Pooja Sevas</a>
            <a href="#live" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Live Darshan</a>
            <a href="#donation" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">E-Hundi</a>
            <a href="#contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Visit</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sevas"
              className="px-5 py-2.5 rounded-2xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              Book Seva
            </a>
          </div>
        </div>
      </header>

      {/* HERO: Full Bandwidth, Clean Minimalist Glass Hero with Uploaded Cover Image */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
        {/* Uploaded Temple Cover Photo Backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="w-full h-full bg-cover bg-center filter blur-[3px] scale-105 opacity-20 dark:opacity-25 transition-all duration-700"
            style={{
              backgroundImage: `url('${temple?.coverImageUrl || temple?.themeConfig?.heroImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80'}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/70 via-stone-50/90 to-stone-50 dark:from-stone-950/70 dark:via-stone-950/90 dark:to-stone-950" />
        </div>
        <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Sacred Deity Darshan Medallion (God Image) */}
          <div className="relative mb-6 group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl p-1 bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 ring-8 ring-amber-500/20">
              <img
                src={temple?.deityImageUrl || temple?.logoUrl || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&w=600&q=80'}
                alt={tDeity}
                className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-white dark:bg-stone-900 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider shadow-md">
              🙏 {tDeity}
            </div>
          </div>

          {/* Status Capsule */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200 dark:border-stone-800 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Sanctum Open for Sarva Darshan
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-950 dark:text-white tracking-tight leading-[1.15] mb-6">
            {tName}
          </h1>

          <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            {tDesc}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#sevas"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Book Daily Pooja
            </a>
            <a
              href="#live"
              className="px-8 py-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-semibold text-sm uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <Video className="w-4 h-4 text-amber-500" /> Watch Live 4K
            </a>
            <a
              href="#donation"
              className="px-8 py-4 rounded-2xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-sm uppercase tracking-wider hover:border-amber-500/50 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-500" /> E-Hundi Donation
            </a>
          </div>

          {/* Modern Highlights Glass Ribbon */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Global Devotees', sub: 'Over 120,000+ Blessed', icon: Globe },
              { title: 'Nitya Annadanam', sub: 'Fresh Satvik Meals Daily', icon: Heart },
              { title: 'Sanctum Timings', sub: '5:30 AM to 9:00 PM', icon: Clock },
              { title: 'Trust Transparency', sub: '100% 80G Certified', icon: Shield }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-left group hover:border-amber-500/40 transition-all"
              >
                <item.icon className="w-5 h-5 text-amber-500 mb-2" />
                <div className="font-bold text-stone-900 dark:text-white text-sm">
                  {item.title}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.5: Holy Sanctum & Abode of Divinity (God Image & Math Image) */}
      <TempleSanctumShowcase
        deityImageUrl={temple?.deityImageUrl || temple?.logoUrl}
        templeImageUrl={temple?.templeImageUrl || temple?.coverImageUrl}
        templeName={tName}
        primaryDeity={tDeity}
        historyText={temple?.history?.text || temple?.history || temple?.themeConfig?.history}
        description={tDesc}
        themeVariant="modern"
      />

      {/* SECTION 2: Daily Aarti & Sanctum Timings (Clean Modern Glass Grid) */}
      <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-stone-100/50 dark:bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Divine Chronology
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white mt-1 mb-3">
              Daily Aarti & Darshan Schedule
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Devotees are invited to attend morning and evening aartis. Prasadam is distributed after each major ritual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timings.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
                  t.active
                    ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/50 shadow-md'
                    : 'bg-white/80 dark:bg-stone-900/80 border-stone-200/80 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {t.time}
                  </span>
                  {t.active && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Open Now
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white mb-1">
                  {t.label}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Open to all devotees. Chanting of Sri Vishnu Sahasranama and sacred mantras.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Sacred Sevas (Clean Modern Glass Cards) */}
      <section id="sevas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Pooja Offerings
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white mt-1">
                Participate in Sacred Sevas
              </h2>
              <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
                Choose a seva to be performed on your chosen date. Receive consecrated prasadam at your doorstep.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-stone-200 dark:border-stone-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Digital Confirmation & Sankalpa
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSevas.map((seva: any) => {
              const priceVal = seva.amount || seva.price || 251
              return (
                <div
                  key={seva.id}
                  className="rounded-3xl bg-white/70 dark:bg-stone-900/70 backdrop-blur-2xl border border-stone-200/80 dark:border-stone-800 p-7 flex flex-col justify-between hover:border-amber-400/60 dark:hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-serif">
                        🌸
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-stone-900 dark:text-white">
                          ₹{priceVal}
                        </div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">One-time Seva</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                      {seva.name}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                      {seva.description || 'Special sankalpa ritual performed with traditional mantras for peace and auspiciousness.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSeva(seva)}
                    className="w-full py-3.5 rounded-2xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Select Seva <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Live 4K Darshan (Full Bandwidth Immersive Glass Container) */}
      <section id="live" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> 24/7 Live Stream
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Garbhagriha Live Stream
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Feel the presence of the divine in high definition from wherever you are.
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

      {/* SECTION 5: E-Hundi Donation (Minimalist Frosted Glass Card) */}
      <section id="donation" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-2xl border border-stone-200 dark:border-stone-800 p-8 sm:p-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Support The Temple
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white mt-1 mb-2">
                Online E-Hundi Offering
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Support temple preservation, daily free community meals, and educational initiatives. All contributions qualify for 80G tax benefits.
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
                      ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 border-transparent shadow-md'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-transparent hover:bg-stone-200 dark:hover:bg-stone-700'
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
                placeholder="Or enter custom amount (₹)"
                value={customDonation}
                onChange={(e) => {
                  setCustomDonation(e.target.value)
                  setDonationAmount(0)
                }}
                className="w-full px-5 py-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleDonationSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate ₹{customDonation || donationAmount} via UPI / Card
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-amber-500" /> 256-bit Secure
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant 80G Certificate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Location & Visit Information */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-stone-100/50 dark:bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Visit Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white mt-1 mb-6">
                Temple Location & Contact
              </h2>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-8">
                The temple complex is easily accessible by road and metro. Ample parking, cloakroom facilities, and clean drinking water are available on campus.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900 dark:text-white text-sm">Temple Address</div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{addressLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900 dark:text-white text-sm">Contact Number & Email</div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{contactPhone} • {contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Map Card */}
            <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 text-center flex flex-col items-center justify-center min-h-[340px] shadow-sm">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mb-4">
                🛕
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white mb-1">{tName}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-6">{addressLine}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(tName + ' ' + addressLine)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEVA BOOKING MODAL */}
      {selectedSeva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 dark:hover:text-white font-bold"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-white mb-2">
                  Seva Confirmed
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Sankalpam registered for {devoteeName || 'Devotee'}. Details sent to your WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook}>
                <div className="text-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Sankalpa Registration
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mt-1">
                    {selectedSeva.name}
                  </h3>
                  <div className="text-xl font-bold text-stone-900 dark:text-white mt-1">
                    ₹{selectedSeva.amount || selectedSeva.price || 251}
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Devotee name"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-lg shadow-amber-500/20 transition-all"
                >
                  Pay ₹{selectedSeva.amount || selectedSeva.price || 251} & Consecrate
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🕉</span>
              <span className="font-serif font-bold text-base text-stone-900 dark:text-white">{tName}</span>
            </div>
            <p className="leading-relaxed">
              Empowering global devotees to connect with sacred Sanatana Dharma with elegance and purity.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#schedule" className="hover:text-amber-500 transition-colors">Aarti Timings</a></li>
              <li><a href="#sevas" className="hover:text-amber-500 transition-colors">Daily Pooja Sevas</a></li>
              <li><a href="#live" className="hover:text-amber-500 transition-colors">Direct Live Stream</a></li>
              <li><a href="#donation" className="hover:text-amber-500 transition-colors">E-Hundi Donation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-3">Contact</h4>
            <p className="leading-relaxed">
              {addressLine}<br />
              {contactPhone}<br />
              {contactEmail}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-3">Legal & Trust</h4>
            <p className="leading-relaxed">
              Registered Public Charitable Religious Trust.<br />
              All online contributions eligible for 80G tax exemptions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} {tName}. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500" /> on MandirAI OS
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
