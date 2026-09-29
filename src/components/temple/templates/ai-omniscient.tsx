'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sparkles, Star, ChevronRight, Play, Eye, MapPin, Phone, 
  Mail, Clock, Calendar, Heart, Shield, ArrowRight, Sun, 
  Moon, CheckCircle2, Video, Volume2, BookOpen, MessageCircle,
  Users
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

export default function AIOmniscientTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [selectedSeva, setSelectedSeva] = useState<any>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number>(501)
  const [customDonation, setCustomDonation] = useState<string>('')
  const [devoteeName, setDevoteeName] = useState('')
  const [devoteePhone, setDevoteePhone] = useState('')
  const [devoteeGotra, setDevoteeGotra] = useState('')
  const [activeTab, setActiveTab] = useState<'shloka' | 'mantra'>('shloka')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tName = temple?.name || 'Sri Brahmanda Mahadeva Kshetram'
  const tDeity = temple?.primaryDeity || 'Lord Shiva & Sri Maha Vishnu'
  const tDesc = temple?.description || 'A celestial sanctuary dedicated to cosmic harmony, ancient Vedic knowledge, and universal peace. Experience divine transcendence from anywhere in the world.'

  const contactPhone = temple?.contactPhone || '+91 8000 777 888'
  const contactEmail = temple?.contactEmail || 'darshan@brahmanda.org'
  const addressLine = temple?.address?.street || temple?.address?.city 
    ? `${temple?.address?.street || ''} ${temple?.address?.city || ''}, ${temple?.address?.state || ''} ${temple?.address?.zip || ''}`
    : '108 Celestial Starlight Hill, Sacred Valley, Karnataka - 571201'

  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: '1', name: 'Maha Mrityunjaya Homam', price: 1501, amount: 1501, description: 'Vedic fire ritual invoking longevity, divine health, and liberation from fear.' },
    { id: '2', name: 'Brahmanda Rudrabhishekam', price: 1001, amount: 1001, description: 'Eleven sacred Vedic recitations accompanied by continuous panchamrita offering.' },
    { id: '3', name: 'Nitya Annadanam & Prasad Seva', price: 2001, amount: 2001, description: 'Sponsoring satvik feast for 75 holy seekers, saints, and visiting pilgrims.' },
    { id: '4', name: 'Navagraha Shanti Archana', price: 501, amount: 501, description: 'Balancing the 9 celestial planetary energies for family tranquility.' },
    { id: '5', name: 'Akhanda Sandhya Deepotsava', price: 1101, amount: 1101, description: 'Lighting 108 fragrant sesame & ghee lamps across the temple courtyard.' },
    { id: '6', name: 'Sri Sukta & Purusha Sukta Pooja', price: 2501, amount: 2501, description: 'Ancient Vedic hymns chanted for spiritual wisdom, wealth, and inner bliss.' }
  ]

  const schedule = [
    { time: '04:30 AM', name: 'Brahma Muhurtha Suprabhatam', desc: 'Awakening the sanctum during the sacred cosmic hour' },
    { time: '06:00 AM - 12:00 PM', name: 'Sarva Darshanam & Archana', desc: 'Public darshan and chanting of holy stotras' },
    { time: '12:00 PM', name: 'Maha Naivedyam & Bhog Aarti', desc: 'Noon sacred food offering accompanied by bell resonance' },
    { time: '04:00 PM - 08:30 PM', name: 'Sandhya Cosmic Darshanam', desc: 'Evening contemplation and sacred lamp lighting' },
    { time: '07:00 PM', name: 'Maha Deeparadhana', desc: 'Grand twilight camphor aarti invoking universal peace' },
    { time: '09:00 PM', name: 'Sayana Seva & Shanti Patha', desc: 'Vedic peace mantras and closing repose' }
  ]

  const dailyWisdom = {
    shloka: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||",
    meaning: "Whenever there is a decline in righteousness, O descendant of Bharata, and an increase in unrighteousness, at that time I manifest Myself on Earth.",
    source: "Bhagavad Gita 4.7"
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
    title: 'Cosmic E-Hundi Offering',
    description: 'Direct celestial offering to temple sanctum'
  })

  const handleDonationSubmit = () => {
    const amt = Number(customDonation) || donationAmount || 501
    setUpiModalConfig({
      amount: amt,
      title: 'Cosmic E-Hundi Samarpanam',
      description: `Direct sacred offering to ${tName} sanctum and global dharma propagation`,
      sevaName: '',
      devoteeName: devoteeName || ''
    })
    setIsUpiModalOpen(true)
  }

  const handleBookSeva = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = selectedSeva?.amount || selectedSeva?.price || 501
    setUpiModalConfig({
      amount: amt,
      title: `Book Seva: ${selectedSeva?.name}`,
      description: `Celestial Sankalpam for ${devoteeName || 'Devotee'} ${devoteeGotra ? `(Gotra: ${devoteeGotra})` : ''}`,
      sevaName: selectedSeva?.name,
      devoteeName: devoteeName
    })
    setIsUpiModalOpen(true)
  }

  // Render template directly

  return (
    <div className="min-h-screen bg-[#060814] text-[#f1f5f9] font-serif selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background ambient celestial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <PanchangTicker className="relative z-50 border-b border-indigo-500/20 bg-[#090d1f]/85 backdrop-blur-md" />
      <SacredParticles variant="diya-ember" quantity={20} className="fixed inset-0 z-10 pointer-events-none opacity-30" />

      {/* Floating Celestial Glass Navigation */}
      <header className="fixed top-10 left-0 right-0 z-40 px-4 sm:px-8">
        <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0d122b]/85 backdrop-blur-2xl border border-indigo-500/30 shadow-[0_8px_32px_rgba(79,70,229,0.15)] py-3 px-6' 
            : 'bg-[#0d122b]/40 backdrop-blur-md border border-indigo-500/15 py-4 px-6'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {temple?.logoUrl ? (
              <img
                src={temple.logoUrl}
                alt={tName}
                className="w-10 h-10 rounded-2xl object-cover border border-indigo-500/40 shadow-lg shadow-indigo-500/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 font-bold text-lg">
                🕉
              </div>
            )}
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide text-indigo-100 truncate max-w-[200px] sm:max-w-md">
                {tName}
              </div>
              <div className="text-[10px] font-sans tracking-widest text-indigo-300 font-semibold uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {tDeity}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium tracking-wide text-indigo-200">
            <a href="#about" className="hover:text-white transition-colors">Sanctum</a>
            <a href="#schedule" className="hover:text-white transition-colors">Timings</a>
            <a href="#wisdom" className="hover:text-white transition-colors">Vedic Wisdom</a>
            <a href="#sevas" className="hover:text-white transition-colors">Sevas</a>
            <a href="#live" className="hover:text-white transition-colors">Live Darshan</a>
            <a href="#donation" className="hover:text-white transition-colors">E-Hundi</a>
            <a href="#contact" className="hover:text-white transition-colors">Visit</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sevas"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105"
            >
              Book Seva
            </a>
          </div>
        </div>
      </header>

      {/* HERO: Full Bandwidth Celestial Glass Sanctum with Uploaded Cover Image */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
        {/* Uploaded Temple Cover Photo Backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="w-full h-full bg-cover bg-center filter blur-[3px] scale-105 opacity-20 transition-all duration-700"
            style={{
              backgroundImage: `url('${temple?.coverImageUrl || temple?.themeConfig?.heroImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80'}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080b1b]/75 via-[#080b1b]/90 to-[#080b1b]" />
        </div>
        <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Sacred Invocation Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#121736]/80 backdrop-blur-xl border border-indigo-500/40 shadow-xl mb-8">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="font-sans text-xs uppercase tracking-widest text-indigo-200 font-semibold">
              ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः • Universal Peace
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e0e7ff] to-[#a5b4fc] leading-[1.1] tracking-wide mb-6 drop-shadow-2xl">
            {tName}
          </h1>

          <p className="text-base sm:text-xl text-indigo-200/90 font-sans max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            {tDesc}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#sevas"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-sans font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Book Vedic Seva
            </a>
            <a
              href="#live"
              className="px-8 py-4 rounded-2xl bg-[#121738]/70 backdrop-blur-xl border border-indigo-500/40 text-indigo-200 font-sans font-semibold text-sm tracking-wider uppercase hover:bg-[#1a214d]/80 transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-sky-400" /> Watch Live 4K Darshan
            </a>
            <a
              href="#donation"
              className="px-8 py-4 rounded-2xl bg-[#121738]/50 backdrop-blur-xl border border-white/10 text-indigo-200 font-sans font-semibold text-sm tracking-wider uppercase hover:border-indigo-400/50 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-400" /> E-Hundi Offering
            </a>
          </div>

          {/* Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            {[
              { label: 'Global Devotees Blessed', value: '140,000+', icon: Users },
              { label: 'Sanctum Live Stream', value: '24/7 4K HD', icon: Video },
              { label: 'Daily Veda Paaraayanam', value: '3 Sessions', icon: BookOpen },
              { label: 'Darshan Hours', value: '4:30 AM - 9 PM', icon: Clock }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#121736]/60 backdrop-blur-xl border border-indigo-500/20 shadow-xl text-center group hover:border-indigo-500/50 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold font-serif text-indigo-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-sans text-indigo-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Daily Vedic Wisdom Card */}
      <section id="wisdom" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#101533]/80 backdrop-blur-2xl border border-indigo-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-sans font-bold uppercase tracking-wider mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Daily Sacred Shloka • {dailyWisdom.source}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 mb-4 leading-relaxed">
              {dailyWisdom.shloka}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-indigo-300 italic mb-6">
              &quot;{dailyWisdom.transliteration}&quot;
            </p>

            <div className="p-5 rounded-2xl bg-[#090d24]/70 border border-indigo-500/20 text-indigo-100 font-sans text-sm leading-relaxed max-w-2xl mx-auto">
              {dailyWisdom.meaning}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Sanctum Aarti & Darshan Schedule */}
      <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-[#0c102a]/70 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-indigo-400 font-semibold">
              Sacred Hours
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2 mb-4">
              Nitya Aarti & Darshan Schedule
            </h2>
            <p className="font-sans text-indigo-200 text-sm">
              Experience the celestial rhythms of morning awakenings, noon bhog, and dusk deeparadhana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#101533]/70 backdrop-blur-2xl border border-indigo-500/20 hover:border-indigo-400/60 shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-sans font-bold text-xs">
                    {item.time}
                  </span>
                  <Sun className="w-5 h-5 text-indigo-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-indigo-200 transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-indigo-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Sacred Vedic Sevas */}
      <section id="sevas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                Divine Offerings
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2">
                Nitya Vedic Sevas & Homams
              </h2>
              <p className="font-sans text-indigo-200 text-sm mt-2 max-w-xl">
                Consecrate poojas in your family name and gotra. Receive sanctified prasadam and sacred vibhuti directly.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-indigo-300 bg-[#101533]/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-indigo-500/20 self-start md:self-end">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Digital Sankalpam Consecrated
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSevas.map((seva: any) => {
              const priceVal = seva.amount || seva.price || 501
              return (
                <div
                  key={seva.id}
                  className="rounded-3xl bg-[#101533]/70 backdrop-blur-2xl border border-indigo-500/25 p-7 flex flex-col justify-between hover:border-indigo-400/70 hover:shadow-[0_12px_40px_rgba(99,102,241,0.18)] transition-all duration-300 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-xl text-indigo-300">
                        🌺
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-sans text-indigo-100">
                          ₹{priceVal}
                        </div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-indigo-300">Holy Offering</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-indigo-200 transition-colors mb-2">
                      {seva.name}
                    </h3>

                    <p className="font-sans text-xs text-indigo-200 leading-relaxed line-clamp-3 mb-6">
                      {seva.description || 'Special Vedic sankalpam performed by priests with sacred stotras.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSeva(seva)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-sky-500/20 border border-indigo-500/40 text-indigo-200 font-sans font-semibold text-xs uppercase tracking-wider hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Select & Consecrate <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Live 4K Darshan (Full-Width Immersive Container) */}
      <section id="live" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-[#080b1b]/80 via-[#0e1333]/90 to-[#060814]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-sans font-bold uppercase tracking-wider mb-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Direct Sanctum Broadcast
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Garbhagriha Live Darshan
            </h2>
            <p className="font-sans text-indigo-200 text-sm mt-2">
              Connect with the celestial sanctum in ultra-high definition from any corner of the earth.
            </p>
          </div>

          <TempleLivePlayer
            liveStreamUrl={temple?.liveStreamUrl}
            coverImageUrl={temple?.coverImageUrl}
            templeName={tName}
            accentColor="#6366f1"
          />
        </div>
      </section>

      {/* SECTION 6: E-Hundi Donation (Celestial Frosted Glass Card) */}
      <section id="donation" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#101533]/85 backdrop-blur-2xl border border-indigo-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-sans text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                Nitya Samarpanam
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1 mb-3">
                Online E-Hundi Offering
              </h2>
              <p className="font-sans text-xs sm:text-sm text-indigo-200">
                Support temple maintenance, veda pathashala, and daily free annadanam. Contributions qualify for 80G income tax benefits.
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
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20'
                      : 'bg-[#080b1d]/70 text-indigo-200 border-indigo-500/20 hover:border-indigo-400/50'
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
                className="w-full px-5 py-3.5 rounded-xl bg-[#080b1d]/80 border border-indigo-500/30 text-white placeholder-indigo-400 font-sans text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              onClick={handleDonationSubmit}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-sans font-bold text-sm uppercase tracking-widest hover:brightness-110 shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate ₹{customDonation || donationAmount} via UPI / Net Banking
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans text-indigo-300">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> Bank-Grade 256-bit Security
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant 80G Tax Exemption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Visit & Contact */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-[#0b0f26]/70 to-[#060814]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                Pilgrimage Information
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2 mb-6">
                Visit The Celestial Sanctum
              </h2>
              <p className="font-sans text-indigo-200 text-sm leading-relaxed mb-8">
                The temple grounds welcome pilgrims seeking spiritual refuge, meditation halls, and divine blessings. Guided tours for families and senior citizen assistance are available daily.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#101533]/60 backdrop-blur-xl border border-indigo-500/20">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-white text-sm">Sanctum Kshetram Location</div>
                    <p className="font-sans text-xs text-indigo-300 mt-1">{addressLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#101533]/60 backdrop-blur-xl border border-indigo-500/20">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif font-bold text-white text-sm">Temple Trust Helpline</div>
                    <p className="font-sans text-xs text-indigo-300 mt-1">{contactPhone} • {contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Map Card */}
            <div className="rounded-3xl bg-[#101533]/70 backdrop-blur-2xl border border-indigo-500/30 p-8 text-center flex flex-col items-center justify-center min-h-[340px]">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-3xl mb-4 text-indigo-300">
                🛕
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">{tName}</h3>
              <p className="font-sans text-xs text-indigo-200 max-w-md mb-6">{addressLine}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(tName + ' ' + addressLine)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
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
          <div className="w-full max-w-lg rounded-3xl bg-[#0f1430] border border-indigo-500/40 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-5 right-5 text-indigo-300 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  Seva Consecrated
                </h3>
                <p className="font-sans text-xs text-indigo-200">
                  Sankalpam recorded for {devoteeName || 'Devotee'}. Details sent to your WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSeva}>
                <div className="text-center mb-6">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-indigo-400">
                    Sankalpa Registration
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    {selectedSeva.name}
                  </h3>
                  <div className="text-lg font-bold font-sans text-indigo-200 mt-1">
                    ₹{selectedSeva.amount || selectedSeva.price || 501}
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-indigo-200 font-semibold mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Varun Kulkarni"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-indigo-200 font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Pay ₹{selectedSeva.amount || selectedSeva.price || 501} & Consecrate
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-indigo-500/20 bg-[#050710] py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-indigo-300 font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🕉</span>
              <span className="font-serif text-lg font-bold text-white">{tName}</span>
            </div>
            <p className="text-indigo-300 text-xs leading-relaxed">
              Fostering cosmic harmony, timeless Vedic chanting, and universal pilgrim service.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4">Sacred Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#schedule" className="hover:text-white transition-colors">Aarti Timings</a></li>
              <li><a href="#wisdom" className="hover:text-white transition-colors">Vedic Wisdom</a></li>
              <li><a href="#sevas" className="hover:text-white transition-colors">Book Vedic Sevas</a></li>
              <li><a href="#live" className="hover:text-white transition-colors">Live Darshan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4">Trust Contact</h4>
            <p className="leading-relaxed">
              {addressLine}<br />
              {contactPhone}<br />
              {contactEmail}
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4">Legal</h4>
            <p className="leading-relaxed">
              Registered Public Charitable Religious Trust.<br />
              All contributions eligible for 80G tax benefits.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>&copy; {new Date().getFullYear()} {tName}. All sacred rights reserved.</div>
          <div className="flex items-center gap-1.5 text-indigo-300">
            Consecrated with <Heart className="w-3.5 h-3.5 text-indigo-400" /> on MandirAI OS
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
