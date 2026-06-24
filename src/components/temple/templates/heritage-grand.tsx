'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Moon, Sun, Globe, Zap, Play, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function HeritageGrandTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1001)
  const [hoverState, setHoverState] = React.useState<number|null>(null)
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Panchamrutha Abhishekam', amount:1001, description:'Sacred bathing of the deity with 5 nectars.', durationMinutes:60 },
    { id:'2', name:'Maha Shodashopacharapuja', amount:5001, description:'Grand worship offering 16 sacred upacharas.', durationMinutes:120 },
    { id:'3', name:'Sahasranama Archana', amount:251, description:'Recitation of 1000 divine names.', durationMinutes:45 },
    { id:'4', name:'Visesha Deepa Aradhana', amount:501, description:'Special lighting of lamps offering.', durationMinutes:30 },
    { id:'5', name:'Annadanam (50 persons)', amount:2501, description:'Sponsorship for feeding 50 devotees.', durationMinutes:0 },
    { id:'6', name:'Rajopachara Seva', amount:11001, description:'Royal treatment and elaborate worship.', durationMinutes:180 },
    { id:'7', name:'Kumkumarchana', amount:151, description:'Worship using sacred red vermilion.', durationMinutes:20 },
    { id:'8', name:'Nitya Pooja', amount:101, description:'Daily regular worship offering.', durationMinutes:15 },
    { id:'9', name:'Brahmotsavam Sponsor', amount:51000, description:'Grand sponsorship of the annual temple festival.', durationMinutes:0 },
  ]

  const events = [
    { id:'1', name:'Annual Brahmotsavam', date:'14 Days in Chaitra', type:'MAHA UTSAV', desc:'The grand annual festival featuring daily processions.', location:'Entire Temple' },
    { id:'2', name:'Sharad Navaratri', date:'02 Oct 2025', type:'FESTIVAL', desc:'Nine nights of Devi worship with alankarams.', location:'Devi Shrine' },
    { id:'3', name:'Maha Shivaratri', date:'26 Feb 2026', type:'POOJA', desc:'Night-long vigil and continuous abhishekam.', location:'Shiva Mandapam' },
    { id:'4', name:'Sri Rama Navami', date:'06 Apr 2026', type:'FESTIVAL', desc:'Sita Rama Kalyanam ceremony.', location:'Main Hall' },
    { id:'5', name:'Krishna Janmashtami', date:'16 Aug 2026', type:'FESTIVAL', desc:'Midnight celebrations and unjal seva.', location:'Krishna Temple' },
    { id:'6', name:'Deepavali', date:'20 Oct 2025', type:'FESTIVAL', desc:'Festival of lights with special deepotsavam.', location:'Temple Premises' },
  ]

  const stats = [
    { label:'Heritage & Legacy', value:'1000+ Yrs', icon:'🏛️' },
    { label:'Monthly Devotees', value:'50,000+', icon:'🙏' },
    { label:'Sacred Offerings', value:'108 Sevas', icon:'🪔' },
    { label:'Days of Worship', value:'365 Days', icon:'☀️' },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'His Holiness Swami', role:'Peethadhipati / Spiritual Head', bio:'Guiding the spiritual operations and upholding the ancient traditions.', avatar:'🙏' },
    { name:'Sri Executive President', role:'President', bio:'Managing the temple trust and its grand development projects.', avatar:'👤' },
    { name:'Sri Managing Trustee', role:'Managing Trustee', bio:'Overseeing day-to-day administration and devotee facilities.', avatar:'👤' },
  ]

  const schedule = [
    { time:'5:00 AM', event:'Suprabhatam & Mangala Aarti' },
    { time:'6:30 AM', event:'Pratahkal Pooja & Abhishekam' },
    { time:'8:30 AM', event:'Darshan Opens for Devotees' },
    { time:'12:30 PM', event:'Maha Naivedyam (Rajabhoga) & Aarti' },
    { time:'1:00 PM', event:'Temple Closes for Afternoon' },
    { time:'4:00 PM', event:'Temple Reopens' },
    { time:'6:30 PM', event:'Sandhya Aarti & Deeparadhana' },
    { time:'8:00 PM', event:'Ratri Pooja' },
    { time:'8:30 PM', event:'Ekanta Seva & Temple Closes' },
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-serif text-stone-900 selection:bg-red-900 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .spin-slow { animation: spin 40s linear infinite; }
        .spin-slow-reverse { animation: spin 30s linear infinite reverse; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 35s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .card-3d:hover { transform: rotateX(8deg) rotateY(-8deg) translateZ(15px); }
        .royal-pattern { background-image: repeating-linear-gradient(45deg, rgba(212,175,55,0.03) 0, rgba(212,175,55,0.03) 2px, transparent 2px, transparent 8px); }
        .gold-gradient-text { background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}} />

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-white"><BlockRenderer blocks={page.blocks} theme="heritage" sevas={sevas} templeAddress={temple.address} /></div>
      ) : (
        <>
          {/* SECTION 1 - ROYAL HERO */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-950 px-4 pt-20 pb-12 border-b-8 border-red-900">
            <div className="absolute inset-0 royal-pattern pointer-events-none" />
            
            {/* Ornamental corners */}
            <div className="absolute top-8 left-8 w-32 h-32 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none opacity-50" />
            <div className="absolute top-8 right-8 w-32 h-32 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none opacity-50" />
            <div className="absolute bottom-8 left-8 w-32 h-32 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none opacity-50" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none opacity-50" />

            {/* Glowing Mandala */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="absolute w-[700px] h-[700px] rounded-full border-4 border-double border-[#D4AF37] spin-slow" />
              <div className="absolute w-[750px] h-[750px] rounded-full border border-dashed border-[#D4AF37]/50 spin-slow-reverse" />
              <div className="absolute w-[400px] h-[400px] rounded-full bg-red-900/40 blur-[80px]" />
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-stone-950/80 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  <span className="text-5xl">🕉️</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-wide gold-gradient-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] leading-tight px-4">
                {titleText}
              </h1>
              
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <Star className="h-6 w-6 text-[#D4AF37] fill-[#D4AF37]" />
                <div className="h-px w-32 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
              </div>

              <p className="text-[#F5DEB3] text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed opacity-90 text-shadow-sm">
                {descText}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-gradient-to-b from-red-800 to-red-950 hover:from-red-700 hover:to-red-900 text-[#F5DEB3] border-2 border-[#D4AF37] px-12 py-5 font-bold tracking-widest uppercase text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1">
                  Make an Offering
                </Link>
                <a href="#sevas" className="bg-transparent border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] px-12 py-5 font-bold tracking-widest uppercase text-sm transition-all hover:bg-[#D4AF37]/10 hover:-translate-y-1">
                  View Sevas
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 2 - GOLDEN TICKER */}
          <section className="bg-red-950 text-[#D4AF37] py-4 border-b-2 border-[#D4AF37]/30 shadow-inner">
            <div className="marquee-container w-full">
              <div className="marquee-content font-bold text-sm tracking-widest uppercase">
                ✦ JAI SRI RAM ✦ DAILY DARSHAN: {temple.timings?.morning_open || '6:00 AM'} TO {temple.timings?.evening_close || '8:30 PM'} ✦ ONLINE SEVA BOOKING AVAILABLE ✦ ALL DONATIONS 80G EXEMPT ✦ UPCOMING FESTIVAL: BRAHMOTSAVAM ✦ 
              </div>
            </div>
          </section>

          {/* SECTION 3 - ROYAL INFO BAR */}
          <section className="bg-red-900 text-[#F5DEB3] py-8 border-b-4 border-[#D4AF37] shadow-xl relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-red-800/50">
                <div className="flex items-center gap-4 px-4">
                  <Clock className="h-8 w-8 text-[#D4AF37] shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 font-bold mb-1">Morning Darshan</p>
                    <p className="font-semibold text-lg">{temple.timings?.morning_open || '6:00 AM'} - {temple.timings?.morning_close || '12:00 PM'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 pt-6 md:pt-0">
                  <Moon className="h-8 w-8 text-[#D4AF37] shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 font-bold mb-1">Evening Darshan</p>
                    <p className="font-semibold text-lg">{temple.timings?.evening_open || '4:00 PM'} - {temple.timings?.evening_close || '8:30 PM'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 pt-6 md:pt-0">
                  <MapPin className="h-8 w-8 text-[#D4AF37] shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 font-bold mb-1">Location</p>
                    <p className="font-semibold text-lg">{temple.address?.city || 'Sacred Location'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 pt-6 md:pt-0">
                  <Phone className="h-8 w-8 text-[#D4AF37] shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37]/80 font-bold mb-1">Contact</p>
                    <p className="font-semibold text-lg">{temple.contactPhone || 'Contact Not Available'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 - HERITAGE STATS */}
          <section className="py-20 bg-stone-900 border-b border-[#D4AF37]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-red-950/80 border-2 border-[#D4AF37]/30 p-8 text-center transform-3d transition-all duration-500 card-3d rounded-lg shadow-xl hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <div className="text-4xl mb-6">{stat.icon}</div>
                    <div className="font-bold text-3xl md:text-4xl gold-gradient-text mb-3">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-[#F5DEB3]/80 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - ABOUT + DEITY */}
          <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-red-900/10 rounded-tl-full m-8 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-red-900/10 rounded-br-full m-8 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                
                <div className="lg:col-span-3 space-y-8">
                  <h2 className="text-5xl text-red-950 font-bold leading-tight">The Glorious Heritage of <br/><span className="text-[#D4AF37] italic">{temple.name}</span></h2>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-24 bg-red-900/20" />
                    <div className="w-3 h-3 rotate-45 bg-[#D4AF37]" />
                    <div className="h-px w-24 bg-red-900/20" />
                  </div>
                  <div className="prose prose-lg text-stone-700 leading-loose text-justify font-serif" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  <div className="pt-8">
                    <Link href={`/temple/${temple.slug}/history`} className="inline-flex items-center gap-2 text-red-950 font-bold uppercase tracking-widest text-sm hover:text-[#D4AF37] transition-colors border-b-2 border-red-950 hover:border-[#D4AF37] pb-1">
                      <BookOpen className="w-4 h-4" /> Explore Full History
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-red-950 border-4 border-[#D4AF37] p-10 text-center rounded-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
                    <div className="relative z-10">
                      <div className="w-24 h-24 mx-auto border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-4xl mb-6 bg-stone-900 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        🛕
                      </div>
                      <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Principal Deity</h4>
                      <h3 className="text-3xl font-bold text-[#F5DEB3] mb-6">{temple.primaryDeity || 'Supreme Lord'}</h3>
                      <div className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#F5DEB3] rounded-full text-xs uppercase tracking-widest">
                        {temple.templeType || 'Ancient Temple'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-stone-200 p-6 rounded-xl text-center shadow-sm">
                      <Shield className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
                      <h5 className="font-bold text-red-950 text-sm uppercase tracking-wider">80G Certified</h5>
                      <p className="text-xs text-stone-500 mt-1">Tax Exemptions</p>
                    </div>
                    <div className="bg-white border border-stone-200 p-6 rounded-xl text-center shadow-sm">
                      <Award className="w-8 h-8 mx-auto text-[#D4AF37] mb-3" />
                      <h5 className="font-bold text-red-950 text-sm uppercase tracking-wider">Registered</h5>
                      <p className="text-xs text-stone-500 mt-1">Temple Trust</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 6 - SEVAS 3-COL GRID */}
          <section id="sevas" className="py-24 bg-red-950 relative overflow-hidden">
            <div className="absolute inset-0 royal-pattern pointer-events-none opacity-20" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">Divine Worship</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#F5DEB3] gold-gradient-text">Sacred Sevas</h2>
                <div className="flex justify-center items-center gap-4">
                  <div className="h-px w-24 bg-[#D4AF37]/30" />
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <div className="h-px w-24 bg-[#D4AF37]/30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sevaData.map((seva, idx) => (
                  <div key={seva.id} 
                       className="bg-red-900/50 border-2 border-[#D4AF37]/30 p-8 rounded-lg shadow-lg hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1 group backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-[#F5DEB3] mb-3 group-hover:text-white transition-colors">{seva.name}</h3>
                    <p className="text-[#F5DEB3]/70 font-light text-sm mb-6 flex-grow leading-relaxed">{seva.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-[#D4AF37]/20 mt-auto">
                      <span className="text-2xl font-bold text-[#D4AF37]">₹{seva.amount}</span>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} 
                            className="px-5 py-2 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-red-950 uppercase tracking-widest text-xs font-bold transition-colors">
                        Book Seva
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7 - ROYAL EVENTS */}
          <section className="py-24 bg-[#FAF9F6] border-y border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-red-950">Grand Utsavams</h2>
                <p className="text-stone-600 font-light max-w-2xl mx-auto">Join us in celebrating the magnificent festivals throughout the year.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                    <div className="bg-red-950 p-4 border-b-4 border-[#D4AF37] flex justify-between items-center">
                      <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-wider">{evt.date}</span>
                      <span className="bg-[#D4AF37] text-red-950 text-[10px] font-black uppercase px-2 py-1 rounded">{evt.type}</span>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-red-950 mb-3 group-hover:text-[#D4AF37] transition-colors">{evt.name}</h3>
                      <p className="text-stone-600 text-sm mb-6 leading-relaxed">{evt.desc}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" /> {evt.location}
                        </div>
                        <button className="text-red-900 hover:text-[#D4AF37] font-bold uppercase text-sm tracking-widest transition-colors flex items-center gap-1">
                          Register <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 - GALLERY */}
          <section className="py-24 bg-stone-900 border-b border-[#D4AF37]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[#F5DEB3] mb-4">Temple Darshan</h2>
                <div className="h-px w-24 bg-[#D4AF37]/50 mx-auto" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="relative aspect-square md:aspect-video rounded-lg overflow-hidden group bg-stone-800 border border-stone-700 cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">
                      {['🛕', '🏛️', '🎉', '🔥', '🌸', '🐘'][idx]}
                    </div>
                    <div className="absolute inset-0 bg-red-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center border-4 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 p-4 text-center">
                      <span className="text-[#F5DEB3] font-bold text-lg tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Image
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9 - DONATION CTA */}
          <section className="py-24 bg-red-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-5xl font-bold gold-gradient-text mb-6 leading-tight">Your Gift, Our Sacred Duty</h2>
              <p className="text-[#F5DEB3]/80 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Contribute to the temple's daily poojas, development projects, and Annadanam. Every offering brings immense spiritual merit.
              </p>
              
              <div className="bg-stone-900/50 backdrop-blur border border-[#D4AF37]/30 p-10 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  {[101, 501, 1001, 2100, 5100, 11000].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-4 rounded-lg font-bold text-lg transition-all border-2 
                                ${selectedAmount === amt ? 'bg-[#D4AF37] border-[#D4AF37] text-red-950 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' : 'bg-transparent border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'}`}>
                      ₹{amt}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col items-center gap-6">
                  <Link href={`/temple/${temple.slug}/donate?amount=${selectedAmount}`}
                        className="bg-gradient-to-b from-[#D4AF37] to-[#AA771C] hover:from-[#FBF5B7] hover:to-[#D4AF37] text-red-950 px-16 py-5 rounded-full font-black uppercase tracking-widest text-lg transition-all shadow-lg hover:shadow-xl w-full md:w-auto">
                    Donate ₹{selectedAmount} Now
                  </Link>
                  <p className="text-[#F5DEB3]/60 text-xs font-bold uppercase tracking-widest">
                    All Donations are 80G Exempt • Secured Transaction
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10 - TRUST BOARD */}
          <section className="py-24 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-red-950 mb-4">Temple Trust</h2>
                <div className="h-1 w-20 bg-[#D4AF37] mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trustees.map((person, idx) => (
                  <div key={idx} className="bg-white p-8 border-2 border-stone-100 hover:border-[#D4AF37] rounded-xl text-center shadow-sm hover:shadow-xl transition-all group relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-24 h-24 mx-auto bg-red-950 rounded-full flex items-center justify-center text-4xl mb-6 border-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                      {person.avatar}
                    </div>
                    <h3 className="text-2xl font-bold text-red-950 mb-1">{person.name}</h3>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">{person.role}</p>
                    <p className="text-sm text-stone-600 leading-relaxed font-serif">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 11 - DAILY SCHEDULE */}
          <section className="py-24 bg-stone-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[#F5DEB3] mb-4">Nitya Niyam (Daily Schedule)</h2>
              </div>
              
              <div className="relative border-l-2 border-[#D4AF37]/30 ml-4 md:ml-12">
                {schedule.map((slot, idx) => (
                  <div key={idx} className="mb-10 ml-8 relative group">
                    <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-950 ring-4 ring-stone-900 group-hover:ring-[#D4AF37]/30 transition-all">
                      <span className="h-2 w-2 rounded-full bg-[#D4AF37]"></span>
                    </span>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 bg-stone-800/50 p-4 rounded-r-lg border border-stone-700 group-hover:border-[#D4AF37]/50 transition-colors">
                      <span className="font-bold text-[#D4AF37] w-24 shrink-0 text-lg">{slot.time}</span>
                      <span className="text-[#F5DEB3] font-serif text-lg">{slot.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12 - VOLUNTEER */}
          <section className="bg-red-900 border-y-4 border-[#D4AF37]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#F5DEB3] mb-6 leading-tight">Offer Your <br/>Dedicated Service</h2>
                <p className="text-[#F5DEB3]/80 text-lg mb-10 leading-relaxed">
                  Join the sacred volunteer force (Sayam Seva) of the temple. Help us maintain the purity and glory of this divine institution.
                </p>
                <button className="bg-[#D4AF37] hover:bg-[#B38728] text-red-950 px-10 py-4 font-black uppercase tracking-widest text-sm self-start transition-colors shadow-lg">
                  Join as Volunteer
                </button>
              </div>
              <div className="p-12 lg:p-24 bg-red-950 grid grid-cols-1 sm:grid-cols-2 gap-6 relative overflow-hidden">
                <div className="absolute inset-0 royal-pattern opacity-10 pointer-events-none" />
                {[
                  { title: 'Veda Parayana', icon: '📖' },
                  { title: 'Temple Upkeep', icon: '🧹' },
                  { title: 'Utsav Volunteer', icon: '🎉' },
                  { title: 'Prasadam Dist', icon: '🍛' }
                ].map((role, idx) => (
                  <div key={idx} className="bg-red-900/50 p-8 border border-[#D4AF37]/30 flex flex-col items-center justify-center text-center gap-4 hover:border-[#D4AF37] transition-colors relative z-10">
                    <span className="text-4xl">{role.icon}</span>
                    <h4 className="font-bold text-[#F5DEB3] uppercase tracking-wider text-sm">{role.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13 - CONTACT & SECTION 14 - GLORY BAR */}
          <section className="bg-[#FAF9F6] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-red-950 text-center mb-12">Reach the Sacred Abode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                <div className="space-y-4">
                  <h3 className="font-bold text-red-950 text-lg border-b-2 border-[#D4AF37] pb-2 inline-block">Temple Address</h3>
                  <div className="text-stone-600 font-serif space-y-1">
                    <p className="font-bold">{temple.name}</p>
                    <p>{temple.address?.line1}</p>
                    {temple.address?.line2 && <p>{temple.address.line2}</p>}
                    <p>{temple.address?.city}, {temple.address?.state}</p>
                    <p>{temple.address?.pincode}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-red-950 text-lg border-b-2 border-[#D4AF37] pb-2 inline-block">Contact Info</h3>
                  <div className="text-stone-600 font-serif space-y-2">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#D4AF37]" /> {temple.contactPhone}</p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#D4AF37]" /> {temple.contactEmail}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-red-950 text-lg border-b-2 border-[#D4AF37] pb-2 inline-block">Quick Links</h3>
                  <ul className="text-stone-600 font-serif space-y-2">
                    <li><Link href={`/temple/${temple.slug}/history`} className="hover:text-red-900 transition-colors">Temple History</Link></li>
                    <li><Link href={`/temple/${temple.slug}/events`} className="hover:text-red-900 transition-colors">Festivals</Link></li>
                    <li><Link href={`/temple/${temple.slug}/gallery`} className="hover:text-red-900 transition-colors">Photo Gallery</Link></li>
                    <li><Link href={`/temple/${temple.slug}/donate`} className="text-red-900 font-bold">Book a Seva</Link></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-red-950 text-lg border-b-2 border-[#D4AF37] pb-2 inline-block">Connect</h3>
                  <div className="flex gap-4">
                    {['FB', 'YT', 'IG'].map(social => (
                      <a key={social} href="#" className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-red-950 hover:bg-[#D4AF37] hover:text-white transition-colors text-xs font-bold">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            
            {/* GLORY BAR */}
            <div className="mt-12 bg-red-950 py-6 text-center border-t-4 border-[#D4AF37]">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
                <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">{temple.name}</p>
                <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
              </div>
              <p className="text-[#F5DEB3]/60 text-xs font-sans uppercase tracking-wider">
                {temple.trust_registration_no ? `Trust Reg. No: ${temple.trust_registration_no} • ` : ''}Powered by MandirAI OS
              </p>
            </div>
          </section>

        </>
      )}
    </div>
  )
}
