'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Building2, Award, Sun, Moon, Globe, Shield, Zap, ChevronRight, Play, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function ClassicCalmTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(501)
  const [hoveredSeva, setHoveredSeva] = React.useState<string|null>(null)
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Nitya Archana', amount:51, description:'Daily name-recitation offered to the deity with flowers.', durationMinutes:15 },
    { id:'2', name:'Abhishekam', amount:501, description:'Sacred bath of deity with milk, honey, and flowers.', durationMinutes:45 },
    { id:'3', name:'Kumkumarchana', amount:151, description:'Kumkum offering with chanting of ashtottaram.', durationMinutes:20 },
    { id:'4', name:'Sahasranama Archana', amount:251, description:'108/1000 name recitation with bilva/tulsi.', durationMinutes:60 },
    { id:'5', name:'Annadanam Seva', amount:1001, description:'Sponsor free meals for pilgrims visiting the temple.', durationMinutes:0 },
    { id:'6', name:'Maha Pooja', amount:5001, description:'Grand ritual with 16-step upacharas and full orchestration.', durationMinutes:90 },
    { id:'7', name:'Ekadasa Abhishekam', amount:11001, description:'Elaborate 11-vessel abhishekam with vedic chanting.', durationMinutes:120 },
    { id:'8', name:'Dolotsavam', amount:1501, description:'Deity adorned and placed on decorated swing.', durationMinutes:30 },
    { id:'9', name:'Brahmotsavam Sponsor', amount:51000, description:'Sponsor the annual grand festival celebrated over 9 days.', durationMinutes:0 },
  ]

  const events = [
    { id:'1', name:'Ganesh Chaturthi', date:'26 Aug 2025', type:'FESTIVAL', desc:'Grand 10-day festival with processions and cultural programs.', location:'Main Mandapam' },
    { id:'2', name:'Navaratri Celebration', date:'02 Oct 2025', type:'FESTIVAL', desc:'Nine nights of Devi worship with classical dance and music.', location:'Natya Mandapam' },
    { id:'3', name:'Diwali Maha Pooja', date:'20 Oct 2025', type:'POOJA', desc:'Special midnight pooja with 1000 lamps lit simultaneously.', location:'Sanctum' },
    { id:'4', name:'Shivaratri Abhishekam', date:'26 Feb 2026', type:'POOJA', desc:'All-night Shiva worship with rudrabhishekam every 3 hours.', location:'Shiva Shrine' },
    { id:'5', name:'Rama Navami', date:'06 Apr 2026', type:'FESTIVAL', desc:'Rama Kalyanam and cultural programs for devotees.', location:'Main Hall' },
    { id:'6', name:'Janmashtami', date:'16 Aug 2026', type:'FESTIVAL', desc:'Krishna Jayanti with midnight abhishekam and bhajans.', location:'Krishna Mandir' },
  ]

  const stats = [
    { label:'Years of Heritage', value:'500+', icon:'🏛️' },
    { label:'Monthly Devotees', value:'25,000+', icon:'🙏' },
    { label:'Daily Sevas', value:'50+', icon:'🪔' },
    { label:'Annual Festivals', value:'12', icon:'🎉' },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'Sri Swami Krishnananda', role:'Peethadhipati / Head Priest', bio:'Leading the temple for over 25 years with deep spiritual knowledge and dedication.', avatar:'🙏' },
    { name:'Sri Ramachandra Reddy', role:'Executive President', bio:'Overseeing all administrative and charitable activities of the temple trust.', avatar:'👤' },
    { name:'Sri Venkateshwara Rao', role:'Managing Secretary', bio:'Coordinating between departments and ensuring smooth temple operations.', avatar:'👤' },
  ]

  const schedule = [
    { time:'5:00 AM', event:'Temple Opens — Suprabhatam & Mangala Aarti' },
    { time:'6:00 AM', event:'Thiruvanandal — Deity Adorned for Morning' },
    { time:'7:00 AM', event:'Nitya Abhishekam & Morning Archana' },
    { time:'9:00 AM', event:'Kalasha Pooja & Sahasranama Archana' },
    { time:'12:00 PM', event:'Noon Aarti (Rajabhoga) — Temple Closes' },
    { time:'4:00 PM', event:'Temple Reopens — Afternoon Archana' },
    { time:'6:00 PM', event:'Dolotsavam & Evening Aarti' },
    { time:'7:30 PM', event:'Ekanta Seva (Deity Rests)' },
    { time:'8:30 PM', event:'Sheja Aarti — Temple Closes' },
  ]

  const galleryItems = [
    { label:'Sanctum Sanctorum', color:'bg-amber-100', emoji:'🛕' },
    { label:'Maha Mandapam', color:'bg-stone-200', emoji:'🏛️' },
    { label:'Festival Celebrations', color:'bg-orange-100', emoji:'🎉' },
    { label:'Annadanam Hall', color:'bg-yellow-50', emoji:'🍲' },
    { label:'Rajagopuram', color:'bg-amber-50', emoji:'🗼' },
    { label:'Temple Pond (Pushkarini)', color:'bg-blue-50', emoji:'💧' },
  ]

  const features = [
    { icon: <Zap className="h-6 w-6" />, title:'Online Seva Booking', desc:'Book any seva from home with instant confirmation.' },
    { icon: <Shield className="h-6 w-6" />, title:'80G Tax Exemption', desc:'All donations are 80G certified. Auto-receipts generated.' },
    { icon: <Globe className="h-6 w-6" />, title:'Multi-Language', desc:'Temple info available in English, Hindi, Telugu, Tamil.' },
    { icon: <Play className="h-6 w-6" />, title:'Live Darshan', desc:'Watch live aarti and puja from anywhere in the world.' },
    { icon: <Gift className="h-6 w-6" />, title:'Prasadam Delivery', desc:'Receive sacred prasadam delivered to your doorstep.' },
    { icon: <Users className="h-6 w-6" />, title:'Devotee Community', desc:'Connect with 25,000+ devotees in our online community.' },
  ]

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        .spin-slow { animation: spin 30s linear infinite; }
        .spin-slow-reverse { animation: spin 20s linear infinite reverse; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .card-3d:hover { transform: rotateX(5deg) rotateY(-5deg) translateZ(10px); }
      `}} />

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-white"><BlockRenderer blocks={page.blocks} theme="classic" sevas={sevas} templeAddress={temple.address} /></div>
      ) : (
        <>
          {/* SECTION 1 - CINEMATIC HERO */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-4 pt-20 pb-12">
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
              <div className="absolute w-[600px] h-[600px] rounded-full border border-amber-200/50 spin-slow" />
              <div className="absolute w-[800px] h-[800px] rounded-full border border-amber-300/30 spin-slow-reverse" />
              <div className="absolute w-[1000px] h-[1000px] rounded-full border-dashed border-2 border-amber-100/40 spin-slow" />
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-amber-200/40 animate-bounce" 
                     style={{ 
                       width: Math.random() * 20 + 10 + 'px', 
                       height: Math.random() * 20 + 10 + 'px',
                       left: Math.random() * 100 + '%',
                       top: Math.random() * 100 + '%',
                       animationDelay: Math.random() * 5 + 's',
                       animationDuration: Math.random() * 3 + 2 + 's'
                     }} 
                />
              ))}
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 flex flex-col items-center">
              <div className="inline-flex items-center gap-3">
                <div className="h-[1px] w-12 bg-amber-300" />
                <span className="text-amber-600 font-semibold tracking-[0.2em] uppercase text-xs">
                  {temple.templeType ? `${temple.templeType} Temple` : 'Sacred Space'}
                </span>
                <div className="h-[1px] w-12 bg-amber-300" />
              </div>

              <h1 className="font-serif text-6xl md:text-8xl text-stone-900 font-normal leading-tight drop-shadow-sm">
                {titleText}
              </h1>
              
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                <Sparkles className="h-5 w-5 text-amber-500" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent via-amber-300 to-transparent" />
              </div>

              <p className="text-stone-500 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                {descText}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-none tracking-widest text-sm uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                  Make an Offering
                </Link>
                <a href="#explore" className="text-stone-500 hover:text-stone-900 uppercase tracking-widest text-sm font-medium transition-colors border-b border-stone-300 hover:border-stone-900 pb-1 flex items-center gap-2">
                  Explore Temple <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur border-t border-stone-100 py-4">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
                <div className="px-4">
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Today's Timings</p>
                  <p className="text-stone-800 font-serif">{temple.timings?.morning_open || '6:00 AM'} - {temple.timings?.evening_close || '8:30 PM'}</p>
                </div>
                <div className="px-4">
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Upcoming Event</p>
                  <p className="text-stone-800 font-serif">{events[0].name}</p>
                </div>
                <div className="px-4">
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">Quick Donate</p>
                  <Link href={`/temple/${temple.slug}/donate?amount=501`} className="text-amber-600 font-serif hover:underline">Donate ₹501</Link>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 - MARQUEE ANNOUNCEMENT BAR */}
          <section className="bg-amber-600 text-white py-3 border-y border-amber-700">
            <div className="marquee-container w-full">
              <div className="marquee-content font-serif text-lg tracking-wide">
                🕉️ Jai Sri Ram • 🪔 Today: Mangala Aarti 5:00 AM • 🎉 Upcoming: Ganesh Chaturthi Aug 26 • 🙏 Donate Online — 80G Exemption Available • ✨ Online Seva Booking Now Open • 🕉️ Om Namah Shivaya • 🪔 Join us for daily darshan • 
              </div>
            </div>
          </section>

          {/* SECTION 3 - BENTO GRID INFO */}
          <section id="explore" className="py-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 bg-gradient-to-br from-stone-100 to-white p-10 rounded-3xl shadow-sm border border-stone-200 flex flex-col justify-center">
                  <span className="text-sm uppercase tracking-widest text-amber-600 font-semibold mb-4">Temple at a Glance</span>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-24 w-24 bg-amber-100 rounded-full flex items-center justify-center text-4xl shadow-inner border border-amber-200">
                      🛕
                    </div>
                    <div>
                      <h2 className="font-serif text-4xl text-stone-900 mb-2">{temple.name}</h2>
                      <p className="text-stone-500 font-light text-lg">Primary Deity: <strong className="font-medium">{temple.primaryDeity || 'The Divine'}</strong></p>
                    </div>
                  </div>
                  <p className="text-stone-600 leading-relaxed font-light">
                    A spiritual sanctuary welcoming devotees from all over the world. Experience peace, divinity, and heritage in every corner.
                  </p>
                </div>

                <div className="bg-amber-50 p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-amber-100 opacity-50 group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900 mb-4">Darshan Timings</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs uppercase text-amber-600 font-semibold">Morning</p>
                        <p className="font-medium text-stone-700">{temple.timings?.morning_open || '6:00 AM'} - {temple.timings?.morning_close || '12:00 PM'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-amber-600 font-semibold">Evening</p>
                        <p className="font-medium text-stone-700">{temple.timings?.evening_open || '4:00 PM'} - {temple.timings?.evening_close || '8:30 PM'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
                  <div className="bg-stone-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="h-6 w-6 text-stone-600" />
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mb-2">Location</h3>
                  <p className="text-stone-500 font-light mb-4">{temple.address?.city || 'Our sacred location'}, {temple.address?.state}</p>
                  <Link href={`/temple/${temple.slug}/contact`} className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                    Get Directions <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
                  <div className="bg-stone-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Phone className="h-6 w-6 text-stone-600" />
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mb-2">Contact</h3>
                  <p className="text-stone-500 font-light mb-2">{temple.contactPhone || 'Phone unavailable'}</p>
                  <p className="text-stone-500 font-light text-sm">{temple.contactEmail}</p>
                </div>

                <div className="md:col-span-2 bg-stone-900 text-white p-10 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-600/20 to-transparent pointer-events-none" />
                  <div className="relative z-10 space-y-4 max-w-md">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      <Star className="w-3 h-3" /> Featured Seva
                    </div>
                    <h3 className="font-serif text-3xl">Maha Abhishekam</h3>
                    <p className="text-stone-400 font-light">Experience the divine grace through our most sacred bathing ritual. Participate online or in-person.</p>
                  </div>
                  <div className="relative z-10 shrink-0 text-center md:text-right">
                    <p className="text-3xl font-serif text-amber-400 mb-4">₹501</p>
                    <Link href={`/temple/${temple.slug}/donate?seva=2`} className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block">
                      Book Now
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4 - 3D STATS CARDS */}
          <section className="py-16 bg-white border-y border-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white border border-amber-100 shadow-sm p-8 text-center transform-3d transition-transform duration-300 card-3d rounded-xl">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className="font-serif text-4xl text-stone-900 mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-widest text-stone-500 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - ABOUT SECTION */}
          <section className="py-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight">Heritage & Divinity <br/><span className="text-amber-600 italic">Intertwined</span></h2>
                  <div className="h-1 w-20 bg-amber-400" />
                  <div className="prose prose-lg text-stone-600 font-light leading-loose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  <div className="pt-4">
                    <Link href={`/temple/${temple.slug}/history`} className="inline-flex items-center gap-2 text-stone-900 font-semibold uppercase tracking-widest text-sm hover:text-amber-600 transition-colors border-b-2 border-transparent hover:border-amber-600 pb-1">
                      Read Full History <BookOpen className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 aspect-square flex flex-col items-center justify-center text-center gap-3">
                    <Building2 className="w-8 h-8 text-amber-500" />
                    <h4 className="font-serif text-xl text-stone-900">Founded</h4>
                    <p className="text-stone-500 font-light">Ancient Era</p>
                  </div>
                  <div className="bg-stone-900 p-6 rounded-2xl shadow-sm aspect-square flex flex-col items-center justify-center text-center gap-3">
                    <span className="text-4xl">🕉️</span>
                    <h4 className="font-serif text-xl text-white">Deity</h4>
                    <p className="text-stone-400 font-light">{temple.primaryDeity || 'Supreme Divine'}</p>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-2xl shadow-sm border border-amber-100 aspect-square flex flex-col items-center justify-center text-center gap-3">
                    <Users className="w-8 h-8 text-amber-600" />
                    <h4 className="font-serif text-xl text-stone-900">Community</h4>
                    <p className="text-amber-700 font-light">Open to All</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 aspect-square flex flex-col items-center justify-center text-center gap-3">
                    <Award className="w-8 h-8 text-amber-500" />
                    <h4 className="font-serif text-xl text-stone-900">Registered</h4>
                    <p className="text-stone-500 font-light text-sm">{temple.trust_registration_no ? 'Verified Trust' : 'Sacred Trust'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 - SEVAS 3-COL GRID */}
          <section className="py-24 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-stone-50 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Divine Offerings</span>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Sacred Sevas</h2>
                <div className="h-px w-24 bg-amber-300 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sevaData.map((seva) => (
                  <div key={seva.id} 
                       className={`bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col h-full
                                   ${hoveredSeva === seva.id ? 'border-amber-500 shadow-[0_8px_30px_rgba(217,119,6,0.15)] -translate-y-1' : 'border-amber-100 shadow-sm'}`}
                       onMouseEnter={() => setHoveredSeva(seva.id)}
                       onMouseLeave={() => setHoveredSeva(null)}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-xl border border-amber-100">
                        🪔
                      </div>
                      {seva.durationMinutes > 0 && (
                        <span className="bg-stone-100 text-stone-500 text-xs px-2 py-1 rounded font-medium">
                          {seva.durationMinutes} mins
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900 mb-3">{seva.name}</h3>
                    <p className="text-stone-500 font-light flex-grow mb-6 leading-relaxed text-sm">{seva.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-100">
                      <span className="font-serif text-2xl text-amber-700">₹{seva.amount}</span>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} 
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors
                                      ${hoveredSeva === seva.id ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href={`/temple/${temple.slug}/donate`} className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 uppercase tracking-widest text-sm font-semibold transition-colors">
                  View All Sevas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 7 - EVENTS 3-COL GRID */}
          <section className="py-24 bg-stone-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-amber-500" />
                    <span className="text-amber-500 font-semibold tracking-widest uppercase text-sm">Temple Calendar</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl">Upcoming Events</h2>
                </div>
                <Link href={`/temple/${temple.slug}/events`} className="text-stone-400 hover:text-white uppercase tracking-widest text-sm font-semibold transition-colors border-b border-stone-700 hover:border-white pb-1">
                  View Full Calendar
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-stone-800 rounded-2xl overflow-hidden border border-stone-700 hover:border-amber-500/50 transition-colors group">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-stone-950 px-4 py-2 rounded-lg border border-stone-700">
                          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Date</p>
                          <p className="font-serif text-amber-400">{evt.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider
                          ${evt.type === 'FESTIVAL' ? 'bg-amber-500/20 text-amber-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {evt.type}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl mb-3 group-hover:text-amber-400 transition-colors">{evt.name}</h3>
                      <p className="text-stone-400 text-sm font-light mb-6 line-clamp-2">{evt.desc}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-stone-700">
                        <div className="flex items-center gap-2 text-stone-500 text-sm">
                          <MapPin className="w-4 h-4" /> {evt.location}
                        </div>
                        <button className="text-white bg-stone-700 hover:bg-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 - GALLERY 3-COL GRID */}
          <section className="py-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 space-y-4">
                <Camera className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h2 className="font-serif text-4xl text-stone-900">Temple Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {galleryItems.map((item, idx) => (
                  <div key={idx} className={`relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer ${item.color}`}>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl transform group-hover:scale-110 transition-transform duration-500">
                      {item.emoji}
                    </div>
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                      <span className="text-white font-serif text-xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href={`/temple/${temple.slug}/gallery`} className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-700 px-8 py-3 rounded-full uppercase tracking-widest text-sm font-semibold hover:border-amber-400 hover:text-amber-600 transition-colors shadow-sm">
                  View Full Gallery
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 9 - FEATURES 3-COL GRID */}
          <section className="py-24 bg-white border-t border-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">The Modern Way to Connect with the Divine</h2>
                <p className="text-stone-500 font-light">Experience our sacred traditions supported by seamless digital convenience.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feat, idx) => (
                  <div key={idx} className={`p-8 rounded-3xl border ${idx % 2 === 0 ? 'bg-stone-50 border-stone-200' : 'bg-white border-stone-100 shadow-sm'}`}>
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-6 border border-amber-200">
                      {feat.icon}
                    </div>
                    <h3 className="font-serif text-xl text-stone-900 mb-3">{feat.title}</h3>
                    <p className="text-stone-500 font-light text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 10 - DONATION CTA */}
          <section className="py-24 bg-gradient-to-br from-amber-600 to-orange-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-center lg:text-left">
                  <Heart className="w-12 h-12 text-amber-200 mx-auto lg:mx-0 animate-pulse" />
                  <h2 className="font-serif text-4xl md:text-5xl leading-tight">Support Our Temple</h2>
                  <p className="text-amber-100 text-lg font-light max-w-lg mx-auto lg:mx-0">
                    Your generous contributions help us maintain the temple premises, conduct daily rituals, and serve the community through Annadanam and charitable activities.
                  </p>
                  <div className="inline-flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                    <span className="bg-black/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4" /> 80G Tax Exemption
                    </span>
                    {temple.trust_registration_no && (
                      <span className="bg-black/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Award className="w-4 h-4" /> Registered Trust
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl text-stone-900">
                  <h3 className="font-serif text-2xl text-center mb-8">Select Amount</h3>
                  <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                    {[108, 251, 501, 1001, 2100, 5100].map(amt => (
                      <button 
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-3 rounded-xl font-bold transition-all border-2 
                                  ${selectedAmount === amt ? 'bg-amber-600 border-amber-600 text-white shadow-md scale-105' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-600'}`}>
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <Link href={`/temple/${temple.slug}/donate?amount=${selectedAmount}`}
                        className="w-full block text-center bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors">
                    Donate ₹{selectedAmount} Now →
                  </Link>
                  {temple.upiId && (
                    <p className="text-center text-sm text-stone-400 mt-6 font-medium">
                      Or pay directly via UPI: <span className="text-stone-700">{temple.upiId}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 11 - DAILY SCHEDULE */}
          <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl text-stone-900 mb-4">Daily Schedule</h2>
                <p className="text-stone-500 font-light">Join us in our daily spiritual routine</p>
              </div>
              
              <div className="relative border-l-2 border-amber-200 ml-4 md:ml-auto">
                {schedule.map((slot, idx) => (
                  <div key={idx} className="mb-10 ml-8 relative">
                    <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 ring-4 ring-white">
                      <span className="h-2 w-2 rounded-full bg-amber-600"></span>
                    </span>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <span className="font-bold text-amber-600 w-24 shrink-0">{slot.time}</span>
                      <span className="text-stone-700 font-serif text-lg">{slot.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12 - TRUSTEES 3-COL */}
          <section className="py-24 bg-stone-50 border-y border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl text-stone-900 mb-4">Temple Administration</h2>
                <div className="h-px w-24 bg-amber-300 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trustees.map((person, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:border-amber-400 transition-colors group">
                    <div className="w-24 h-24 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-4xl mb-6 ring-4 ring-amber-50 group-hover:ring-amber-100 transition-all">
                      {person.avatar}
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900 mb-2">{person.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-4">{person.role}</p>
                    <p className="text-sm text-stone-500 font-light leading-relaxed">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13 - VOLUNTEER STRIP */}
          <section className="bg-stone-900 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-24 flex flex-col justify-center bg-stone-950">
                <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Join Our Temple <span className="text-amber-500 italic">Seva Community</span></h2>
                <p className="text-stone-400 font-light text-lg mb-10 leading-relaxed max-w-lg">
                  Volunteering at the temple is a sacred opportunity to serve the divine by serving others. Become a part of our dedicated volunteer network.
                </p>
                <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm self-start transition-colors shadow-lg">
                  Apply to Volunteer
                </button>
              </div>
              <div className="p-12 lg:p-24 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-900">
                {[
                  { title: 'Pooja Assistance', icon: '🌺' },
                  { title: 'Event Management', icon: '📋' },
                  { title: 'Annadanam Service', icon: '🍲' },
                  { title: 'Digital Media', icon: '💻' }
                ].map((role, idx) => (
                  <div key={idx} className="bg-stone-800 p-8 rounded-2xl border border-stone-700 flex flex-col items-start gap-4 hover:border-amber-500/50 transition-colors">
                    <span className="text-3xl">{role.icon}</span>
                    <h4 className="font-serif text-xl">{role.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14 - CONTACT FOOTER STRIP */}
          <section className="bg-white pt-24 pb-12 border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-stone-900">Visit Us</h3>
                  </div>
                  <div className="text-stone-500 font-light text-sm space-y-2 pl-13">
                    <p>{temple.name}</p>
                    <p>{temple.address?.line1}</p>
                    {temple.address?.line2 && <p>{temple.address.line2}</p>}
                    <p>{temple.address?.city}, {temple.address?.state}</p>
                    <p>{temple.address?.pincode}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-stone-900">Contact</h3>
                  </div>
                  <div className="text-stone-500 font-light text-sm space-y-3 pl-13">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-stone-400" /> {temple.contactPhone}</p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-stone-400" /> {temple.contactEmail}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-serif text-xl text-stone-900 pl-2 border-l-2 border-amber-400">Quick Links</h3>
                  <ul className="text-stone-500 font-light text-sm space-y-3">
                    <li><Link href={`/temple/${temple.slug}/history`} className="hover:text-amber-600 flex items-center gap-2"><ChevronRight className="w-3 h-3" /> About & History</Link></li>
                    <li><Link href={`/temple/${temple.slug}/events`} className="hover:text-amber-600 flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Upcoming Events</Link></li>
                    <li><Link href={`/temple/${temple.slug}/gallery`} className="hover:text-amber-600 flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Photo Gallery</Link></li>
                    <li><Link href={`/temple/${temple.slug}/donate`} className="hover:text-amber-600 flex items-center gap-2 text-amber-600 font-medium"><ChevronRight className="w-3 h-3" /> Book Seva / Donate</Link></li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="font-serif text-xl text-stone-900 pl-2 border-l-2 border-amber-400">Connect</h3>
                  <p className="text-stone-500 font-light text-sm mb-4">Follow us on social media for daily darshan and updates.</p>
                  <div className="flex gap-4">
                    {['FB', 'YT', 'IG', 'X'].map(social => (
                      <a key={social} href="#" className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-amber-600 hover:text-white transition-colors text-xs font-bold">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              <div className="pt-8 border-t border-stone-200 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-stone-400 text-sm">© {new Date().getFullYear()} {temple.name}. All rights reserved.</p>
                <p className="text-stone-300 text-xs flex items-center gap-1">Powered by <span className="text-stone-400 font-semibold">MandirAI OS</span></p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
