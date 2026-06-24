'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Moon, Sun, Zap, Play, Globe, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function DivineGlowTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1001)
  
  const titleText = page?.title ? t(page.title) : `${temple.name}`
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
  ]

  const stats = [
    { label:'Years of Heritage', value:'500+', icon:'🏛️' },
    { label:'Monthly Devotees', value:'25,000+', icon:'🙏' },
    { label:'Daily Sevas', value:'108', icon:'🪔' },
    { label:'Divine Presence', value:'24/7', icon:'✨' },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'Sri Swami', role:'Spiritual Head', bio:'Guiding the light of dharma and devotion.', avatar:'🙏' },
    { name:'Sri Chairman', role:'Chairman', bio:'Ensuring the temple traditions shine forever.', avatar:'👤' },
    { name:'Sri Secretary', role:'Secretary', bio:'Managing the temple administration smoothly.', avatar:'👤' },
  ]

  const schedule = [
    { time:'5:00 AM', event:'Suprabhatam & Mangala Aarti' },
    { time:'6:30 AM', event:'Pratahkal Pooja' },
    { time:'8:30 AM', event:'Darshan Opens' },
    { time:'12:30 PM', event:'Maha Naivedyam (Rajabhoga)' },
    { time:'4:00 PM', event:'Temple Reopens' },
    { time:'6:30 PM', event:'Sandhya Aarti & Deeparadhana' },
    { time:'8:30 PM', event:'Ekanta Seva & Temple Closes' },
  ]

  return (
    <div className="bg-[#0d0500] min-h-screen font-serif text-[#FFFDD0] selection:bg-amber-600 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .spin-slow { animation: spin 40s linear infinite; }
        .spin-slow-reverse { animation: spin 30s linear infinite reverse; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 30s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .card-tilt:hover { transform: rotateX(5deg) rotateY(-5deg) translateZ(10px); }
        .gold-glow-text { background: linear-gradient(to right, #F4C430, #FFFDD0, #F4C430); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.2); } 50% { box-shadow: 0 0 40px rgba(245,158,11,0.5); } }
        .animate-glow-pulse { animation: glow-pulse 3s infinite; }
      `}} />

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-black"><BlockRenderer blocks={page.blocks} theme="glow" sevas={sevas} templeAddress={temple.address} /></div>
      ) : (
        <>
          {/* SECTION 1 - IMMERSIVE GLOW HERO */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0500] px-4 pt-20 pb-12">
            
            {/* Ambient Lights */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F4C430]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Glowing Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="absolute w-[600px] h-[600px] rounded-full border border-[#F4C430]/30 spin-slow" />
              <div className="absolute w-[650px] h-[650px] rounded-full border border-dashed border-amber-500/30 spin-slow-reverse" />
            </div>

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-[#F4C430]/60 animate-pulse" 
                     style={{ 
                       width: Math.random() * 4 + 2 + 'px', 
                       height: Math.random() * 4 + 2 + 'px',
                       left: Math.random() * 100 + '%',
                       top: Math.random() * 100 + '%',
                       animationDelay: Math.random() * 5 + 's',
                       animationDuration: Math.random() * 3 + 2 + 's'
                     }} 
                />
              ))}
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 flex flex-col items-center">
              
              <div className="w-32 h-32 rounded-full bg-black/40 border border-[#F4C430]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(244,196,48,0.3)] animate-glow-pulse mb-4">
                <span className="text-6xl text-[#F4C430]">🕉️</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-wide gold-glow-text leading-tight px-4 drop-shadow-[0_0_15px_rgba(244,196,48,0.4)]">
                {titleText}
              </h1>
              
              <div className="flex items-center justify-center gap-6 py-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#F4C430] to-transparent" />
                <Sparkles className="h-6 w-6 text-[#F4C430]" />
                <div className="h-px w-32 bg-gradient-to-l from-transparent via-[#F4C430] to-transparent" />
              </div>

              <p className="text-[#FFFDD0]/90 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                {descText}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-12 py-5 font-bold tracking-widest uppercase text-sm rounded-lg transition-all animate-glow-pulse shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                  Offer Seva
                </Link>
                <a href="#explore" className="bg-transparent border border-[#F4C430]/50 text-[#F4C430] hover:bg-[#F4C430]/10 px-12 py-5 font-bold tracking-widest uppercase text-sm rounded-lg transition-all backdrop-blur-sm">
                  Enter Temple
                </a>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-8 px-4 z-10 flex-wrap">
              <div className="bg-black/40 backdrop-blur-md border border-amber-500/30 px-6 py-3 rounded-full flex items-center gap-3">
                <Clock className="text-[#F4C430] w-5 h-5" />
                <span className="text-[#FFFDD0] text-sm uppercase tracking-wider font-bold">Open: {temple.timings?.morning_open || '6:00 AM'}</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-amber-500/30 px-6 py-3 rounded-full flex items-center gap-3">
                <MapPin className="text-[#F4C430] w-5 h-5" />
                <span className="text-[#FFFDD0] text-sm uppercase tracking-wider font-bold">{temple.address?.city || 'Sacred Location'}</span>
              </div>
            </div>
          </section>

          {/* SECTION 2 - GLOWING TICKER */}
          <section className="bg-[#130700] border-y border-[#F4C430]/20 py-4 shadow-[0_0_20px_rgba(244,196,48,0.1)]">
            <div className="marquee-container w-full">
              <div className="marquee-content font-bold text-[#F4C430] tracking-widest uppercase text-sm">
                ✦ THE LIGHT OF DIVINITY SHINES HERE ✦ TODAY'S AARTI: 6:30 PM ✦ UPCOMING UTSAVAM: SHARAD NAVARATRI ✦ ALL SEVAS AVAILABLE ONLINE ✦ 
              </div>
            </div>
          </section>

          {/* SECTION 3 - GLASS BENTO GRID */}
          <section id="explore" className="py-24 bg-[#0d0500] relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-[#0d0500] to-[#0d0500] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cell 1: Temple Identity */}
                <div className="md:col-span-2 bg-[#130700]/80 backdrop-blur-md border border-[#F4C430]/20 p-10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <span className="text-[#F4C430] font-bold tracking-widest uppercase text-sm mb-4 block">Temple Identity</span>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-24 w-24 bg-black/50 border border-[#F4C430]/50 rounded-full flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(244,196,48,0.2)]">🛕</div>
                    <div>
                      <h2 className="text-4xl font-bold gold-glow-text mb-2">{temple.name}</h2>
                      <p className="text-[#FFFDD0]/70 text-lg">{temple.templeType || 'Ancient Shrine'} dedicated to {temple.primaryDeity || 'The Divine'}</p>
                    </div>
                  </div>
                </div>

                {/* Cell 2: Morning Hours */}
                <div className="bg-[#130700]/80 backdrop-blur-md border border-[#F4C430]/20 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden group hover:border-[#F4C430]/50 transition-colors">
                  <Sun className="absolute -right-4 -top-4 w-32 h-32 text-[#F4C430]/10 group-hover:text-[#F4C430]/20 transition-colors" />
                  <h3 className="text-xl font-bold text-[#F4C430] mb-2 relative z-10">Morning Darshan</h3>
                  <p className="text-2xl font-bold text-[#FFFDD0] relative z-10">{temple.timings?.morning_open || '6:00 AM'}</p>
                  <p className="text-[#FFFDD0]/60 text-sm relative z-10">to {temple.timings?.morning_close || '12:00 PM'}</p>
                </div>

                {/* Cell 3: Evening Hours */}
                <div className="bg-[#130700]/80 backdrop-blur-md border border-[#F4C430]/20 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden group hover:border-[#F4C430]/50 transition-colors">
                  <Moon className="absolute -right-4 -top-4 w-32 h-32 text-[#F4C430]/10 group-hover:text-[#F4C430]/20 transition-colors" />
                  <h3 className="text-xl font-bold text-[#F4C430] mb-2 relative z-10">Evening Darshan</h3>
                  <p className="text-2xl font-bold text-[#FFFDD0] relative z-10">{temple.timings?.evening_open || '4:00 PM'}</p>
                  <p className="text-[#FFFDD0]/60 text-sm relative z-10">to {temple.timings?.evening_close || '8:30 PM'}</p>
                </div>

                {/* Cell 4: Featured Seva */}
                <div className="md:col-span-2 bg-gradient-to-r from-[#1a0a00] to-[#2a1000] border border-[#F4C430]/40 p-8 rounded-2xl shadow-[0_0_30px_rgba(244,196,48,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="bg-[#F4C430]/20 text-[#F4C430] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Featured Seva</span>
                    <h3 className="text-3xl font-bold text-[#FFFDD0] mb-2">Maha Abhishekam</h3>
                    <p className="text-[#FFFDD0]/70 max-w-md">Offer the most sacred bath to the deity. Receive divine blessings and prasadam.</p>
                  </div>
                  <div className="text-center shrink-0">
                    <p className="text-4xl font-bold text-[#F4C430] mb-4">₹1001</p>
                    <button className="bg-[#F4C430] text-[#0d0500] px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">Book Now</button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4 - 3D GLOWING STATS */}
          <section className="py-16 bg-[#130700] border-y border-[#F4C430]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#0d0500] border border-[#F4C430]/20 p-8 rounded-xl text-center transform-3d transition-all duration-300 card-tilt hover:border-[#F4C430]/60 hover:shadow-[0_0_30px_rgba(244,196,48,0.2)] group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="font-bold text-3xl md:text-4xl gold-glow-text mb-2">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-[#FFFDD0]/60 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - ABOUT */}
          <section className="py-24 bg-[#0d0500] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-5xl font-bold leading-tight gold-glow-text">The Divine <br/>Presence</h2>
                  <div className="h-px w-24 bg-[#F4C430]/50" />
                  <div className="prose prose-lg prose-invert text-[#FFFDD0]/80 font-light leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  <button className="text-[#F4C430] border-b border-[#F4C430]/50 hover:border-[#F4C430] uppercase tracking-widest text-sm font-bold pb-1 transition-colors flex items-center gap-2">
                    Read History <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {['Ancient Heritage', 'Sacred Deity', 'Divine Atmosphere', 'Registered Trust'].map((lbl, i) => (
                    <div key={i} className="bg-[#130700]/80 backdrop-blur border border-[#F4C430]/20 p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-4 hover:bg-[#F4C430]/5 transition-colors">
                      <Shield className="w-8 h-8 text-[#F4C430]" />
                      <h4 className="font-bold text-[#FFFDD0] text-sm uppercase tracking-widest">{lbl}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 - SEVAS 3-COL GLOWING GRID */}
          <section className="py-24 bg-[#130700] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4C430]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <span className="text-[#F4C430] font-bold tracking-widest uppercase text-sm">Sacred Offerings</span>
                <h2 className="text-4xl md:text-5xl font-bold gold-glow-text">Book a Seva</h2>
                <p className="text-[#FFFDD0]/60 max-w-2xl mx-auto">Offer your prayers from anywhere. The temple priests will perform the rituals on your behalf.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sevaData.map((seva) => (
                  <div key={seva.id} className="bg-[#0d0500] border border-[#F4C430]/20 p-8 rounded-2xl transition-all duration-300 flex flex-col h-full hover:border-[#F4C430]/60 hover:shadow-[0_0_30px_rgba(244,196,48,0.2)] hover:-translate-y-2 group">
                    <h3 className="text-2xl font-bold text-[#FFFDD0] mb-3 group-hover:text-[#F4C430] transition-colors">{seva.name}</h3>
                    <p className="text-[#FFFDD0]/60 font-light text-sm mb-8 flex-grow">{seva.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-[#F4C430]/20">
                      <span className="text-2xl font-bold text-[#F4C430]">₹{seva.amount}</span>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} 
                            className="bg-transparent border border-[#F4C430] text-[#F4C430] hover:bg-[#F4C430] hover:text-[#0d0500] px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7 - EVENTS */}
          <section className="py-24 bg-[#0d0500]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold gold-glow-text mb-4">Upcoming Events</h2>
                <div className="h-px w-24 bg-[#F4C430]/50 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-[#130700] border border-[#F4C430]/20 rounded-xl p-6 hover:border-[#F4C430]/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-[#F4C430]/10 text-[#F4C430] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#F4C430]/30">{evt.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#FFFDD0] mb-2">{evt.name}</h3>
                    <p className="text-[#FFFDD0]/60 text-sm mb-4 line-clamp-2">{evt.desc}</p>
                    <p className="text-[#F4C430] text-xs font-bold uppercase tracking-widest"><MapPin className="inline w-3 h-3 mr-1"/> {evt.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 - GALLERY */}
          <section className="py-24 bg-[#130700] border-t border-[#F4C430]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-[#0d0500] border border-[#F4C430]/20 group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-[#F4C430]/30 group-hover:scale-110 group-hover:text-[#F4C430] transition-all duration-500">
                      {['🛕', '🔥', '🌸', '🪔', '🐘', '✨'][idx]}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="text-[#FFFDD0] font-bold tracking-widest uppercase border border-[#F4C430] px-4 py-2 rounded">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9 - DONATION CTA */}
          <section className="py-24 bg-[#0d0500] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0d0500] to-[#0d0500]" />
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-5xl font-bold gold-glow-text mb-6">Kindle the Sacred Flame</h2>
              <p className="text-[#FFFDD0]/80 text-lg mb-12">Support the temple's divine activities. Every contribution helps maintain the light of devotion.</p>
              
              <div className="bg-[#130700]/80 backdrop-blur-md border border-[#F4C430]/30 p-10 rounded-3xl shadow-[0_0_40px_rgba(244,196,48,0.1)]">
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[101, 501, 1001, 2100, 5100, 11000].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-4 rounded-xl font-bold text-lg transition-all border 
                                ${selectedAmount === amt ? 'bg-[#F4C430] border-[#F4C430] text-[#0d0500] shadow-[0_0_20px_rgba(244,196,48,0.4)]' : 'bg-black/50 border-[#F4C430]/30 text-[#F4C430] hover:border-[#F4C430]'}`}>
                      ₹{amt}
                    </button>
                  ))}
                </div>
                
                <Link href={`/temple/${temple.slug}/donate?amount=${selectedAmount}`}
                      className="inline-block bg-gradient-to-r from-amber-500 via-[#F4C430] to-amber-500 text-[#0d0500] px-16 py-5 rounded-xl font-black uppercase tracking-widest text-lg transition-all hover:shadow-[0_0_30px_rgba(244,196,48,0.5)] animate-glow-pulse w-full md:w-auto">
                  Donate ₹{selectedAmount}
                </Link>
                <p className="text-[#F4C430]/60 text-xs font-bold uppercase tracking-widest mt-6">Secure Online Payment • 80G Certified</p>
              </div>
            </div>
          </section>

          {/* SECTION 10 - TRUST BOARD */}
          <section className="py-24 bg-[#130700] border-y border-[#F4C430]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold gold-glow-text mb-4">Temple Trust</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trustees.map((person, idx) => (
                  <div key={idx} className="bg-[#0d0500] p-8 border border-[#F4C430]/20 rounded-2xl text-center hover:border-[#F4C430]/50 transition-colors">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-600 to-amber-900 rounded-full flex items-center justify-center text-4xl mb-6 border-2 border-[#F4C430] shadow-[0_0_15px_rgba(244,196,48,0.3)]">
                      {person.avatar}
                    </div>
                    <h3 className="text-2xl font-bold text-[#FFFDD0] mb-2">{person.name}</h3>
                    <p className="text-sm font-bold text-[#F4C430] uppercase tracking-widest mb-4">{person.role}</p>
                    <p className="text-[#FFFDD0]/60 font-light">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 11 - SCHEDULE */}
          <section className="py-24 bg-[#0d0500]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold gold-glow-text mb-4">Daily Schedule</h2>
              </div>
              
              <div className="relative border-l-2 border-[#F4C430] ml-4 md:ml-12 shadow-[0_0_15px_rgba(244,196,48,0.5)]">
                {schedule.map((slot, idx) => (
                  <div key={idx} className="mb-12 ml-8 relative group">
                    <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0d0500] border-2 border-[#F4C430] group-hover:bg-[#F4C430] transition-colors shadow-[0_0_10px_rgba(244,196,48,0.5)]"></span>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 bg-[#130700] border border-[#F4C430]/20 p-4 rounded-xl">
                      <span className="font-bold text-[#F4C430] w-24 shrink-0 text-lg">{slot.time}</span>
                      <span className="text-[#FFFDD0] font-bold text-lg">{slot.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12 - VOLUNTEER & SECTION 13 - FEATURES */}
          <section className="bg-[#130700] border-t border-[#F4C430]/20 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold gold-glow-text mb-12">Digital Temple Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Online Booking', icon: <Zap/> },
                  { title: 'Tax Exemption', icon: <Shield/> },
                  { title: 'Live Darshan', icon: <Play/> },
                  { title: 'Multilingual', icon: <Globe/> },
                  { title: 'Instant Receipts', icon: <Award/> },
                  { title: 'Prasadam', icon: <Gift/> }
                ].map((feat, idx) => (
                  <div key={idx} className="bg-[#0d0500] border border-[#F4C430]/20 p-8 rounded-xl flex flex-col items-center gap-4 hover:border-[#F4C430]/50 transition-colors">
                    <div className="w-16 h-16 rounded-full border border-[#F4C430] flex items-center justify-center text-[#F4C430] shadow-[0_0_15px_rgba(244,196,48,0.2)]">
                      {feat.icon}
                    </div>
                    <h3 className="font-bold text-[#FFFDD0]">{feat.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14 - CONTACT */}
          <section className="bg-[#0d0500] pt-24 pb-12 border-t border-[#F4C430]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                <div className="space-y-6">
                  <h3 className="font-bold text-[#F4C430] text-xl uppercase tracking-widest">Location</h3>
                  <div className="text-[#FFFDD0]/70 font-light space-y-1">
                    <p className="font-bold text-[#FFFDD0]">{temple.name}</p>
                    <p>{temple.address?.line1}</p>
                    {temple.address?.line2 && <p>{temple.address.line2}</p>}
                    <p>{temple.address?.city}, {temple.address?.state}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-[#F4C430] text-xl uppercase tracking-widest">Contact</h3>
                  <div className="text-[#FFFDD0]/70 font-light space-y-3">
                    <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#F4C430]" /> {temple.contactPhone}</p>
                    <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#F4C430]" /> {temple.contactEmail}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-[#F4C430] text-xl uppercase tracking-widest">Links</h3>
                  <ul className="text-[#FFFDD0]/70 font-light space-y-3">
                    <li><Link href={`/temple/${temple.slug}/history`} className="hover:text-[#F4C430] transition-colors">History</Link></li>
                    <li><Link href={`/temple/${temple.slug}/events`} className="hover:text-[#F4C430] transition-colors">Events</Link></li>
                    <li><Link href={`/temple/${temple.slug}/donate`} className="text-[#F4C430] font-bold hover:underline">Book Seva</Link></li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-[#F4C430] text-xl uppercase tracking-widest">Social</h3>
                  <div className="flex gap-4">
                    {['FB', 'YT', 'IG'].map(social => (
                      <a key={social} href="#" className="w-10 h-10 border border-[#F4C430]/50 rounded-full flex items-center justify-center text-[#F4C430] hover:bg-[#F4C430] hover:text-[#0d0500] transition-colors font-bold text-xs">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="pt-8 border-t border-[#F4C430]/20 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[#FFFDD0]/50 text-sm">
                <p>© {new Date().getFullYear()} {temple.name}. All rights reserved.</p>
                <p>Powered by <span className="text-[#F4C430] font-bold">MandirAI OS</span></p>
              </div>
            </div>
          </section>

        </>
      )}
    </div>
  )
}
