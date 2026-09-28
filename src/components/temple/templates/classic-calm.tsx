'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Clock, Calendar, MapPin, Phone, Mail, ChevronRight, Play, 
  Heart, Share2, Info, Star, MessageCircle, BookOpen, Video, 
  ArrowRight, CheckCircle2, Sparkles, Shield, Compass, Bell,
  Users, Flame
} from 'lucide-react'
import BlockRenderer from '@/components/temple/blocks/block-renderer'
import { useLanguage } from '@/components/shared/language-context'
import { SacredParticles } from '@/components/ui/sacred-particles'
import { VirtualRitualBar } from '@/components/temple/virtual-ritual-bar'
import { PanchangTicker } from '@/components/temple/panchang-ticker'
import TempleUpiModal from '@/components/temple/temple-upi-modal'

export interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function ClassicCalmTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
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

  const tName = temple?.name || 'Sri Shanti Dham Devasthanam'
  const tDeity = temple?.primaryDeity || 'Lord Sri Venkateswara Swamy & Maha Lakshmi'
  const tDescription = temple?.description || 'An ancient abode of tranquility, Vedic wisdom, and divine grace. Step into the timeless sanctity of devotion and spiritual serenity.'

  const contactPhone = temple?.contactPhone || '+91 8000 123 456'
  const contactEmail = temple?.contactEmail || 'darshan@shantidham.org'
  const addressLine = temple?.address?.street || temple?.address?.city 
    ? `${temple?.address?.street || ''} ${temple?.address?.city || ''}, ${temple?.address?.state || ''} ${temple?.address?.zip || ''}`
    : '108 Sacred Hill Road, Shanti Valley, Karnataka - 570001'

  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: '1', name: 'Nitya Archana & Sankalpam', price: 101, amount: 101, description: 'Personalized holy archana performed before the sanctum sanctorum with sacred flowers.' },
    { id: '2', name: 'Maha Panchamrita Abhishekam', price: 501, amount: 501, description: 'Traditional milk, curd, honey, ghee, and fruit bathing ceremony with Vedic chants.' },
    { id: '3', name: 'Sri Vishnu Sahasranama Pooja', price: 251, amount: 251, description: 'Chanting the thousand sacred names of the Supreme Divine for family harmony.' },
    { id: '4', name: 'Nitya Annadanam (50 Meals)', price: 1001, amount: 1001, description: 'Provide freshly cooked satvik prasadam to pilgrims and devotees in the dining hall.' },
    { id: '5', name: 'Vahana Seva & Procession', price: 2501, amount: 2501, description: 'Grand utsava moorthy procession through the sacred temple praakaram.' },
    { id: '6', name: 'Maha Kalasha Sthapana Pooja', price: 1501, amount: 1501, description: 'Consecration of sacred holy water pots invoking auspicious planetary energies.' }
  ]

  const schedule = [
    { time: '04:30 AM', name: 'Suprabhatam & Viswaroopa', desc: 'Awakening the sanctum with sacred Vedic shlokas' },
    { time: '06:30 AM - 12:30 PM', name: 'Nitya Sarva Darshanam', desc: 'Open sanctum viewing for all pilgrims and families' },
    { time: '12:30 PM', name: 'Maha Naivedyam & Madhyahna Aarti', desc: 'Noon sacred food offering and temple conch blowing' },
    { time: '04:30 PM - 08:30 PM', name: 'Evening Sandhya Darshan', desc: 'Twilight viewing accompanied by traditional nadaswaram' },
    { time: '07:30 PM', name: 'Maha Deeparadhana', desc: 'The most sacred dusk camphor aarti of 108 oil lamps' },
    { time: '09:00 PM', name: 'Sayana Seva & Ekantha Repose', desc: 'Night lullaby chants and sanctum closure' }
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
    const amt = selectedSeva?.amount || selectedSeva?.price || 101
    setUpiModalConfig({
      amount: amt,
      title: `Book Seva: ${selectedSeva?.name}`,
      description: `Sankalpam in the name of ${devoteeName || 'Devotee'} ${devoteeGotra ? `(Gotra: ${devoteeGotra})` : ''}`,
      sevaName: selectedSeva?.name,
      devoteeName: devoteeName
    })
    setIsUpiModalOpen(true)
  }

  // Render template directly

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#2c1810] font-sans selection:bg-[#c8923f] selection:text-white relative overflow-x-hidden">
      {/* Serene Sandalwood Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#c8923f]/15 via-[#f2e6cf]/40 to-transparent blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#c8923f]/8 blur-[140px] rounded-full" />
      </div>

      <PanchangTicker className="relative z-50 border-b border-[#c8923f]/20 bg-[#faf8f4]/85 backdrop-blur-md" />
      <SacredParticles variant="marigold" quantity={25} className="fixed inset-0 z-10 pointer-events-none opacity-35" />

      {/* Floating Sandalwood Glass Navigation */}
      <header className="fixed top-10 left-0 right-0 z-40 px-4 sm:px-8">
        <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${
          scrolled 
            ? 'bg-white/85 backdrop-blur-2xl border border-[#c8923f]/30 shadow-[0_8px_30px_rgba(200,146,63,0.12)] py-3 px-6' 
            : 'bg-white/50 backdrop-blur-md border border-[#c8923f]/15 py-4 px-6'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#c8923f] via-[#deb165] to-[#a6752d] flex items-center justify-center text-white shadow-md text-xl border border-white/40">
              🕉
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#2c1810] truncate max-w-[200px] sm:max-w-md">
                {tName}
              </div>
              <div className="text-[10px] tracking-widest text-[#a6752d] font-semibold uppercase">
                {tDeity}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-[#2c1810]/80">
            <a href="#about" className="hover:text-[#c8923f] transition-colors">Sanctum</a>
            <a href="#schedule" className="hover:text-[#c8923f] transition-colors">Darshan Timings</a>
            <a href="#sevas" className="hover:text-[#c8923f] transition-colors">Sacred Sevas</a>
            <a href="#live" className="hover:text-[#c8923f] transition-colors">Live Darshan</a>
            <a href="#donation" className="hover:text-[#c8923f] transition-colors">E-Hundi</a>
            <a href="#contact" className="hover:text-[#c8923f] transition-colors">Plan Visit</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sevas"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#c8923f] via-[#d6a24e] to-[#a6752d] text-white font-bold text-xs uppercase tracking-widest hover:brightness-105 shadow-md shadow-[#c8923f]/25 transition-all transform hover:scale-105"
            >
              Book Seva
            </a>
          </div>
        </div>
      </header>

      {/* HERO: Full Bandwidth Serene Glass Hero */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Shanti Invocation Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[#c8923f]/30 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#c8923f]" />
            <span className="text-xs uppercase tracking-widest text-[#a6752d] font-semibold">
              ॐ शान्तिः शान्तिः शान्तिः • Abode of Divine Peace
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
            <span className="text-[11px] text-emerald-700 font-medium">Open For Darshan</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#2c1810] leading-[1.1] tracking-wide mb-6">
            {tName}
          </h1>

          <p className="text-base sm:text-xl text-[#2c1810]/75 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            {tDescription}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#sevas"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c8923f] via-[#d6a24e] to-[#a6752d] text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#c8923f]/25 hover:shadow-[#c8923f]/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Book Daily Pooja
            </a>
            <a
              href="#live"
              className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#c8923f]/30 text-[#2c1810] font-semibold text-sm tracking-wider uppercase hover:bg-white transition-all flex items-center gap-2 shadow-sm"
            >
              <Video className="w-4 h-4 text-[#c8923f]" /> Watch Live Darshan
            </a>
            <a
              href="#donation"
              className="px-8 py-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-stone-200 text-[#2c1810]/80 font-semibold text-sm tracking-wider uppercase hover:border-[#c8923f]/40 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-500" /> E-Hundi Offering
            </a>
          </div>

          {/* Calm Highlights Ribbon */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            {[
              { title: 'Vedic Heritage', sub: 'Centuries of Sanctity', icon: BookOpen },
              { title: 'Nitya Annadanam', sub: 'Satvik Prasad Daily', icon: Heart },
              { title: 'Darshan Hours', sub: '4:30 AM to 9:00 PM', icon: Clock },
              { title: 'Verified Trust', sub: '100% 80G Tax Exemption', icon: Shield }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-[#c8923f]/20 shadow-sm text-left group hover:border-[#c8923f]/50 transition-all"
              >
                <stat.icon className="w-5 h-5 text-[#c8923f] mb-2" />
                <div className="font-bold text-[#2c1810] text-sm">
                  {stat.title}
                </div>
                <div className="text-xs text-[#2c1810]/60 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Daily Darshan & Aarti Schedule (Frosted Glass Cards) */}
      <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#f4eee1]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a6752d]">
              Sanctum Hours
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c1810] mt-1 mb-3">
              Daily Aarti & Darshan Schedule
            </h2>
            <p className="text-[#2c1810]/70 text-sm">
              Devotees are welcome to participate in morning and evening prayers. Holy theertha and prasadam are distributed following each aarti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#c8923f]/20 hover:border-[#c8923f]/60 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-[#f4eee1] text-[#a6752d]">
                    {item.time}
                  </span>
                  <Bell className="w-4 h-4 text-[#c8923f] opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2c1810] mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#2c1810]/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Sacred Sevas & Poojas (Clean Glass Grid with Instant Booking Modal) */}
      <section id="sevas" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a6752d]">
                Sacred Offerings
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c1810] mt-1">
                Nitya & Vishesha Pooja Sevas
              </h2>
              <p className="text-[#2c1810]/70 text-sm mt-1 max-w-xl">
                Offer special prayers in your family name and gotra. Consecrated holy prasadam will be dispatched to your doorstep.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2c1810]/70 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-[#c8923f]/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Digital Sankalpa
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSevas.map((seva: any) => {
              const priceVal = seva.amount || seva.price || 101
              return (
                <div
                  key={seva.id}
                  className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-[#c8923f]/25 p-7 flex flex-col justify-between hover:border-[#c8923f]/60 hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#c8923f]/15 text-[#a6752d] flex items-center justify-center text-xl font-serif">
                        🌺
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-sans text-[#2c1810]">
                          ₹{priceVal}
                        </div>
                        <span className="text-[10px] text-[#2c1810]/50 uppercase tracking-wider font-semibold">Per Sankalpam</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#2c1810] group-hover:text-[#a6752d] transition-colors mb-2">
                      {seva.name}
                    </h3>

                    <p className="text-xs text-[#2c1810]/70 leading-relaxed mb-6">
                      {seva.description || 'Special sankalpam performed before the sanctum sanctorum with Vedic chants.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSeva(seva)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#c8923f] to-[#a6752d] text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Select & Book Seva <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Live 4K Garbhagriha Darshan (Immersive Full Bandwidth Player) */}
      <section id="live" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#1a0f0a] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Live Sanctum Broadcast
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Garbhagriha Live Darshan
            </h2>
            <p className="text-stone-300 text-sm mt-2">
              Connect with the peaceful divine sanctum from wherever you are in the world.
            </p>
          </div>

          <div className="rounded-3xl bg-stone-900/90 backdrop-blur-2xl border border-stone-800 p-4 sm:p-6 shadow-2xl">
            <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-65 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-[#c8923f] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-xs uppercase tracking-widest text-amber-200 font-bold">
                  Tap to Join Live Broadcast
                </span>
              </div>

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold tracking-wider">
                  LIVE
                </span>
                <span className="px-3 py-1 rounded-lg bg-stone-900/80 backdrop-blur-md text-stone-200 text-xs border border-white/10">
                  Main Moolavar Sanctum
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#c8923f]" />
                  <span>2,830 Devotees currently connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                    🔔 Ring Temple Bell
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-[#c8923f]/20 text-amber-200 border border-[#c8923f]/40 hover:bg-[#c8923f]/30 transition-all">
                    🌺 Offer Flowers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: E-Hundi Donation (Sandalwood Frosted Glass Card) */}
      <section id="donation" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-[#c8923f]/30 p-8 sm:p-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#a6752d]">
                Sacred Samarpanam
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c1810] mt-1 mb-2">
                Online E-Hundi Offering
              </h2>
              <p className="text-xs sm:text-sm text-[#2c1810]/70">
                Support temple maintenance, veda pathashala, and daily free pilgrim meals. All contributions qualify for 80G income tax exemption.
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
                      ? 'bg-[#c8923f] text-white border-transparent shadow-md'
                      : 'bg-[#faf8f4] text-[#2c1810] border-stone-200 hover:border-[#c8923f]/40'
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
                placeholder="Or enter custom sacred amount (₹)"
                value={customDonation}
                onChange={(e) => {
                  setCustomDonation(e.target.value)
                  setDonationAmount(0)
                }}
                className="w-full px-5 py-3.5 rounded-2xl bg-[#faf8f4] border border-stone-200 text-[#2c1810] text-sm focus:outline-none focus:border-[#c8923f]"
              />
            </div>

            <button
              onClick={handleDonationSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#c8923f] via-[#d6a24e] to-[#a6752d] text-white font-bold text-sm uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#c8923f]/25 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" /> Offer ₹{customDonation || donationAmount} via UPI / Net Banking
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#2c1810]/60">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-[#c8923f]" /> 256-bit Bank Grade Security
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant 80G Tax Exemption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Plan Your Visit & Location */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#f4eee1]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a6752d]">
                Pilgrim Guide
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c1810] mt-1 mb-6">
                Temple Location & Contact
              </h2>
              <p className="text-[#2c1810]/75 text-sm leading-relaxed mb-8">
                The sacred temple complex features shaded praakaram corridors, free drinking water stations, shoe storage counters, and elder-friendly access ramps.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#c8923f]/20 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#c8923f] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2c1810] text-sm">Temple Complex Address</div>
                    <p className="text-xs text-[#2c1810]/65 mt-1">{addressLine}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#c8923f]/20 shadow-sm">
                  <Phone className="w-5 h-5 text-[#c8923f] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#2c1810] text-sm">Trust Helpline & Inquiries</div>
                    <p className="text-xs text-[#2c1810]/65 mt-1">{contactPhone} • {contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Map Card */}
            <div className="rounded-3xl bg-white border border-[#c8923f]/20 p-8 text-center flex flex-col items-center justify-center min-h-[340px] shadow-sm">
              <div className="w-16 h-16 rounded-3xl bg-[#c8923f]/15 text-[#a6752d] flex items-center justify-center text-3xl mb-4">
                🛕
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2c1810] mb-1">{tName}</h3>
              <p className="text-xs text-[#2c1810]/65 max-w-sm mb-6">{addressLine}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(tName + ' ' + addressLine)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-[#c8923f] text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all flex items-center gap-2 shadow-md shadow-[#c8923f]/20"
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
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#c8923f]/30 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-[#2c1810] font-bold"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#2c1810] mb-2">
                  Seva Confirmed
                </h3>
                <p className="text-xs text-[#2c1810]/70">
                  Sankalpam registered for {devoteeName || 'Devotee'}. Details sent to your WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook}>
                <div className="text-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#a6752d]">
                    Sankalpa Registration
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#2c1810] mt-1">
                    {selectedSeva.name}
                  </h3>
                  <div className="text-xl font-bold text-[#2c1810] mt-1">
                    ₹{selectedSeva.amount || selectedSeva.price || 101}
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#2c1810] font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Devotee name"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-stone-300 text-[#2c1810] focus:outline-none focus:border-[#c8923f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2c1810] font-semibold mb-1">Gotra</label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyapa"
                      value={devoteeGotra}
                      onChange={(e) => setDevoteeGotra(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-stone-300 text-[#2c1810] focus:outline-none focus:border-[#c8923f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2c1810] font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#faf8f4] border border-stone-300 text-[#2c1810] focus:outline-none focus:border-[#c8923f]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c8923f] to-[#a6752d] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-[#c8923f]/25 transition-all"
                >
                  Pay ₹{selectedSeva.amount || selectedSeva.price || 101} & Consecrate
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#c8923f]/20 bg-[#1a0f0a] py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-xs text-white/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🕉</span>
              <span className="font-serif font-bold text-base text-white">{tName}</span>
            </div>
            <p className="leading-relaxed">
              Preserving ancient traditions, sacred veda pathashala, and pilgrim service across generations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#schedule" className="hover:text-[#c8923f] transition-colors">Darshan Timings</a></li>
              <li><a href="#sevas" className="hover:text-[#c8923f] transition-colors">Daily Pooja Sevas</a></li>
              <li><a href="#live" className="hover:text-[#c8923f] transition-colors">Direct Live Stream</a></li>
              <li><a href="#donation" className="hover:text-[#c8923f] transition-colors">E-Hundi Offering</a></li>
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

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} {tName}. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#c8923f]" /> on MandirAI OS
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
