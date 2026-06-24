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

export default function ModernElegantTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1001)
  
  const titleText = page?.title ? t(page.title) : `${temple.name}`
  const descText = page?.description ? t(page.description) : `A modern spiritual sanctuary dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. Experience divinity with modern convenience.</p>`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Instant Archana', amount:51, description:'Quick daily offering with digital receipt.', durationMinutes:10 },
    { id:'2', name:'Virtual Abhishekam', amount:501, description:'Sacred bath performed on your behalf with live link.', durationMinutes:45 },
    { id:'3', name:'Online Kumkumarchana', amount:151, description:'Offering with name chanting broadcast live.', durationMinutes:20 },
    { id:'4', name:'E-Sahasranama', amount:251, description:'1000 names recited on your behalf.', durationMinutes:60 },
    { id:'5', name:'Digital Annadanam', amount:1001, description:'Feed devotees and get a digital certificate.', durationMinutes:0 },
    { id:'6', name:'Smart Maha Pooja', amount:5001, description:'Full ritual with WhatsApp updates.', durationMinutes:90 },
    { id:'7', name:'Premium Abhishekam', amount:11001, description:'Elaborate abhishekam with video recording.', durationMinutes:120 },
    { id:'8', name:'App Dolotsavam', amount:1501, description:'Special swing seva bookable via app.', durationMinutes:30 },
    { id:'9', name:'Utsav Sponsorship', amount:51000, description:'Primary sponsor for major festivals.', durationMinutes:0 },
  ]

  const events = [
    { id:'1', name:'Ganesh Chaturthi Live', date:'26 Aug 2025', type:'FESTIVAL', desc:'Live streaming of the 10-day festival.', location:'Online & Offline' },
    { id:'2', name:'Navaratri Darshan', date:'02 Oct 2025', type:'FESTIVAL', desc:'Nine nights of Devi worship.', location:'Main Campus' },
    { id:'3', name:'Global Shivaratri', date:'26 Feb 2026', type:'POOJA', desc:'All-night Shiva worship with virtual participation.', location:'Shiva Mandir' },
    { id:'4', name:'Rama Navami Utsav', date:'06 Apr 2026', type:'FESTIVAL', desc:'Kalyanam ceremony.', location:'Main Hall' },
    { id:'5', name:'Janmashtami Midnight', date:'16 Aug 2026', type:'FESTIVAL', desc:'Krishna Jayanti celebrations.', location:'Krishna Temple' },
  ]

  const stats = [
    { label:'Digital Devotees', value:'25K+', icon:<Globe className="w-8 h-8"/> },
    { label:'Sevas Booked', value:'100K+', icon:<Zap className="w-8 h-8"/> },
    { label:'Live Streams', value:'500+', icon:<Play className="w-8 h-8"/> },
    { label:'Daily Visitors', value:'5,000+', icon:<Users className="w-8 h-8"/> },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'Dr. Spiritual Head', role:'Chief Visionary', bio:'Leading the digital transformation of ancient traditions.', avatar:'👨‍💼' },
    { name:'Jane Doe', role:'Tech Director', bio:'Ensuring seamless online experiences for devotees worldwide.', avatar:'👩‍💻' },
    { name:'John Smith', role:'Operations Head', bio:'Managing physical and digital temple infrastructure.', avatar:'👨‍💼' },
  ]

  const schedule = [
    { time:'05:00', event:'Morning Awakening & Aarti' },
    { time:'07:00', event:'Morning Darshan Opens' },
    { time:'12:00', event:'Midday Pooja & Rest' },
    { time:'16:00', event:'Evening Darshan Opens' },
    { time:'19:00', event:'Evening Aarti (Live Streamed)' },
    { time:'20:30', event:'Temple Closes' },
  ]

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-orange-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .card-3d:hover { transform: rotateX(5deg) rotateY(-5deg) translateZ(10px); }
        .blob-bg { background: radial-gradient(circle at 50% 50%, rgba(234,88,12,0.1) 0%, transparent 60%); }
        .stack-card { position: absolute; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
      `}} />

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-white"><BlockRenderer blocks={page.blocks} theme="modern" sevas={sevas} templeAddress={temple.address} /></div>
      ) : (
        <>
          {/* SECTION 1 - SPLIT 3D HERO */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 pt-20 pb-12">
            <div className="absolute inset-0 blob-bg pointer-events-none" />
            
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  Digital Darshan Available
                </div>
                
                <h1 className="text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Divinity</span><br />
                  in the Modern Age
                </h1>
                
                <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                  {descText} Seamlessly book sevas, make donations, and connect with {temple.name} from anywhere.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href={`/temple/${temple.slug}/donate`}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.2)] hover:-translate-y-1 text-center flex items-center justify-center gap-2">
                    Book a Seva <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a href="#explore" className="bg-white border-2 border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 px-8 py-4 rounded-2xl font-bold transition-all text-center">
                    Explore Temple
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-8 text-sm font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" /> 100% Secure
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-500" /> 80G Certified
                  </div>
                </div>
              </div>

              <div className="relative h-[600px] hidden lg:block perspective-1000">
                {/* 3D Stacked Cards */}
                <div className="stack-card bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 w-[400px] right-0 top-20 transform rotate-[6deg] z-10 hover:rotate-[8deg] hover:-translate-y-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🛕</div>
                  <h3 className="text-2xl font-black mb-2">{temple.name}</h3>
                  <p className="text-slate-500 font-medium">Sacred Abode of {temple.primaryDeity || 'The Divine'}</p>
                </div>
                
                <div className="stack-card bg-orange-600 p-8 rounded-3xl shadow-2xl w-[380px] right-20 top-40 transform -rotate-[4deg] z-20 text-white hover:-rotate-[6deg] hover:-translate-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold tracking-wider uppercase text-sm text-orange-200">Live Status</span>
                    <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-black">OPEN</span>
                  </div>
                  <h3 className="text-3xl font-black mb-1">Darshan is Active</h3>
                  <p className="text-orange-200 font-medium">Closes at {temple.timings?.evening_close || '20:30'}</p>
                </div>

                <div className="stack-card bg-slate-900 p-6 rounded-3xl shadow-2xl w-[340px] right-40 top-10 transform -rotate-[10deg] z-0 text-white">
                  <h4 className="font-bold text-slate-400 mb-4 text-sm">TODAY'S SEVAS</h4>
                  <div className="space-y-3">
                    <div className="bg-slate-800 p-3 rounded-xl flex justify-between items-center">
                      <span className="font-bold">Maha Abhishekam</span>
                      <span className="text-orange-400 font-bold">₹501</span>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-xl flex justify-between items-center">
                      <span className="font-bold">Annadanam</span>
                      <span className="text-orange-400 font-bold">₹1001</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 - LIVE ANNOUNCEMENT TICKER */}
          <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3">
            <div className="marquee-container w-full">
              <div className="marquee-content font-bold tracking-wide">
                ⚡ LIVE UPDATE: Evening Darshan is currently active • ONLINE SEVAS: Instant digital receipts available • DONATE: 80G Tax Exemption applied automatically • SUPPORT: Chat with us on WhatsApp • ⚡
              </div>
            </div>
          </section>

          {/* SECTION 3 - BENTO GRID */}
          <section id="explore" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block">Visit Us Today</span>
                      <h2 className="text-4xl font-black text-slate-900 mb-8">Plan Your Darshan</h2>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Sun className="text-orange-500 w-6 h-6" />
                            <h3 className="font-bold text-slate-900">Morning</h3>
                          </div>
                          <p className="text-slate-600 font-medium text-lg">{temple.timings?.morning_open || '06:00'} - {temple.timings?.morning_close || '12:00'}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Moon className="text-indigo-500 w-6 h-6" />
                            <h3 className="font-bold text-slate-900">Evening</h3>
                          </div>
                          <p className="text-slate-600 font-medium text-lg">{temple.timings?.evening_open || '16:00'} - {temple.timings?.evening_close || '20:30'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                      <p className="text-slate-500 font-medium"><MapPin className="inline w-5 h-5 mr-2"/>{temple.address?.city || 'Sacred City'}, {temple.address?.state}</p>
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors">Get Directions</button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-10 rounded-[2rem] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-slate-400 font-bold tracking-wider uppercase text-sm mb-4 block">Need Help?</span>
                    <h3 className="text-3xl font-black mb-6">Contact Us</h3>
                    <p className="flex items-center gap-3 text-lg font-medium mb-4"><Phone className="text-orange-500" /> {temple.contactPhone}</p>
                    <p className="flex items-center gap-3 text-lg font-medium"><Mail className="text-orange-500" /> {temple.contactEmail}</p>
                  </div>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-xl font-black mt-8 hover:bg-orange-500 hover:text-white transition-colors">
                    Chat on WhatsApp
                  </button>
                </div>

                <div className="bg-orange-100 p-8 rounded-[2rem] border border-orange-200">
                  <h3 className="font-black text-xl text-orange-900 mb-4">Quick Donate</h3>
                  <p className="text-orange-700 font-medium mb-6">Support the temple instantly.</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button className="bg-white py-2 rounded-lg font-bold text-orange-600 hover:bg-orange-500 hover:text-white transition-colors">₹101</button>
                    <button className="bg-white py-2 rounded-lg font-bold text-orange-600 hover:bg-orange-500 hover:text-white transition-colors">₹501</button>
                  </div>
                  {temple.upiId && <p className="text-xs font-bold text-orange-800 text-center uppercase">UPI: {temple.upiId}</p>}
                </div>

                <div className="md:col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-[2rem] text-white flex items-center justify-between">
                  <div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Upcoming Event</span>
                    <h3 className="text-3xl font-black mb-2">{events[0].name}</h3>
                    <p className="text-indigo-100 font-medium">{events[0].date} • {events[0].location}</p>
                  </div>
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform shadow-lg">
                    Register Now
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4 - 3D STATS */}
          <section className="py-16 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] text-center transform-3d transition-transform duration-300 card-3d hover:border-orange-500 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] group">
                    <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="font-black text-4xl text-slate-900 mb-2">{stat.value}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - ABOUT */}
          <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <span className="text-orange-500 font-bold tracking-wider uppercase">Our Heritage</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Ancient Wisdom,<br/>Modern Experience</h2>
                  <div className="prose prose-lg text-slate-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  <Link href={`/temple/${temple.slug}/history`} className="inline-block bg-slate-200 hover:bg-slate-300 text-slate-900 px-8 py-3 rounded-xl font-bold transition-colors">
                    Read Full History
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6"/></div>
                    <h4 className="font-black text-xl mb-2">Secure Platform</h4>
                    <p className="text-slate-500 font-medium text-sm">Safe & encrypted online transactions.</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm mt-8">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6"/></div>
                    <h4 className="font-black text-xl mb-2">Instant Receipts</h4>
                    <p className="text-slate-500 font-medium text-sm">80G certificates generated automatically.</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm -mt-8">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Play className="w-6 h-6"/></div>
                    <h4 className="font-black text-xl mb-2">Live Darshan</h4>
                    <p className="text-slate-500 font-medium text-sm">Watch rituals from anywhere in the world.</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4"><Phone className="w-6 h-6"/></div>
                    <h4 className="font-black text-xl mb-2">WhatsApp Alerts</h4>
                    <p className="text-slate-500 font-medium text-sm">Real-time updates on your bookings.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 - SEVAS MEGA GRID */}
          <section className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 space-y-4">
                <span className="text-orange-500 font-bold tracking-wider uppercase">Online Offerings</span>
                <h2 className="text-4xl md:text-5xl font-black">Book Sacred Sevas</h2>
                <p className="text-slate-400 font-medium max-w-2xl mx-auto">Select a seva and complete your booking online. Receive instant digital confirmation and tax exemption receipts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sevaData.map((seva) => (
                  <div key={seva.id} className="bg-slate-800 rounded-[2rem] p-8 border border-slate-700 hover:border-orange-500 hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col h-full hover:-translate-y-2 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-orange-500/20 transition-colors">
                        🪔
                      </div>
                      {seva.durationMinutes > 0 && (
                        <span className="bg-slate-900 text-orange-400 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide border border-slate-700">
                          {seva.durationMinutes} min
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black mb-3">{seva.name}</h3>
                    <p className="text-slate-400 font-medium text-sm mb-8 flex-grow">{seva.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                      <span className="text-3xl font-black text-orange-400">₹{seva.amount}</span>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} 
                            className="bg-white text-slate-900 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7 - EVENTS */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-2">
                  <span className="text-orange-500 font-bold tracking-wider uppercase">Calendar</span>
                  <h2 className="text-4xl font-black text-slate-900">Upcoming Events</h2>
                </div>
                <Link href={`/temple/${temple.slug}/events`} className="text-orange-600 font-bold hover:underline">
                  View Full Calendar →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Featured Event */}
                <div className="md:col-span-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                  <div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-white/30">Featured Festival</span>
                    <h3 className="text-4xl font-black mb-2">{events[0].name}</h3>
                    <p className="text-orange-100 font-medium text-lg mb-2">{events[0].date} • {events[0].location}</p>
                    <p className="text-white/80 max-w-xl">{events[0].desc}</p>
                  </div>
                  <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform shrink-0 w-full md:w-auto shadow-lg">
                    Register to Participate
                  </button>
                </div>

                {/* Other Events */}
                {events.slice(1).map((evt) => (
                  <div key={evt.id} className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 hover:border-orange-500 transition-colors">
                    <span className="text-sm font-black text-orange-600 block mb-2">{evt.date}</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{evt.name}</h3>
                    <p className="text-slate-500 font-medium text-sm mb-6 line-clamp-2">{evt.desc}</p>
                    <button className="text-slate-900 font-bold bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors w-full">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 - GALLERY */}
          <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Temple Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
                <div className="md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group bg-orange-100 cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">🛕</div>
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-black text-2xl tracking-wide">Main Sanctum</span>
                  </div>
                </div>
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="relative rounded-[2rem] overflow-hidden group bg-slate-200 cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                      {['🌸', '🪔', '🐘', '🎉'][idx]}
                    </div>
                    <div className="absolute inset-0 bg-orange-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-lg tracking-wide">View Image</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9 - FEATURES SHOWCASE */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-orange-500 font-bold tracking-wider uppercase">Platform Capabilities</span>
                <h2 className="text-4xl font-black text-slate-900 mt-2">Digital Temple Experience</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Online Sevas', icon: <Zap/> },
                  { title: 'Instant Receipts', icon: <Award/> },
                  { title: 'Live Darshan', icon: <Play/> },
                  { title: 'WhatsApp Integration', icon: <Phone/> },
                  { title: 'Secure Payments', icon: <Shield/> },
                  { title: 'Multilingual', icon: <Globe/> }
                ].map((feat, idx) => (
                  <div key={idx} className={`p-8 rounded-[2rem] flex items-center gap-6 ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white border border-slate-100 shadow-sm'}`}>
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                      {feat.icon}
                    </div>
                    <h3 className="font-black text-xl text-slate-900">{feat.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 10 - DONATION CALCULATOR */}
          <section className="py-24 bg-gradient-to-br from-orange-500 to-orange-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 blob-bg opacity-30 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <span className="bg-white/20 px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm">80G Tax Exemption Valid</span>
                  <h2 className="text-5xl font-black leading-tight">Support the <br/>Divine Mission</h2>
                  <p className="text-orange-100 text-xl font-medium max-w-md">
                    Your contribution ensures the continuation of daily rituals, annadanam, and temple maintenance.
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-8 brightness-0 invert opacity-80" />
                    <span className="font-bold text-orange-200">Secure Payments via Razorpay</span>
                  </div>
                </div>
                
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-slate-900">
                  <h3 className="text-2xl font-black text-center mb-2">Make a Donation</h3>
                  <p className="text-center text-slate-500 font-medium mb-8">Select or enter an amount</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[101, 501, 1001, 2100, 5100, 11000].map(amt => (
                      <button 
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-4 rounded-2xl font-black text-xl transition-all border-2 
                                  ${selectedAmount === amt ? 'bg-orange-500 border-orange-500 text-white shadow-lg scale-105' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500'}`}>
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-2xl mb-8 text-center border border-orange-100">
                    <span className="text-orange-600 font-bold block mb-1">You are donating</span>
                    <span className="text-5xl font-black text-orange-600">₹{selectedAmount}</span>
                  </div>

                  <Link href={`/temple/${temple.slug}/donate?amount=${selectedAmount}`}
                        className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-lg transition-colors shadow-xl">
                    Proceed to Donate →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 11 - SCHEDULE TIMELINE */}
          <section className="py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Daily Schedule</h2>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200 relative">
                <div className="absolute left-10 md:left-1/2 top-10 bottom-10 w-1 bg-slate-100 rounded-full" />
                <div className="space-y-12 relative z-10">
                  {schedule.map((slot, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="md:w-[45%] text-left md:text-right font-black text-2xl text-orange-500 order-2 md:order-1">{slot.time}</div>
                      <div className="w-12 h-12 bg-white border-4 border-orange-100 rounded-full flex items-center justify-center text-orange-500 shrink-0 shadow-sm z-10 order-1 md:order-2">
                        {parseInt(slot.time) < 16 ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                      </div>
                      <div className="md:w-[45%] text-left font-bold text-xl text-slate-800 order-3">{slot.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 12 - TRUST BOARD */}
          <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Temple Administration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trustees.map((person, idx) => (
                  <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 text-center hover:border-orange-500 hover:shadow-lg transition-all group">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner text-white group-hover:scale-105 transition-transform">
                      {person.avatar}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{person.name}</h3>
                    <p className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">{person.role}</p>
                    <p className="text-slate-500 font-medium">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13 - VOLUNTEER */}
          <section className="bg-slate-900">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <span className="text-orange-500 font-bold tracking-wider uppercase mb-4 block">Get Involved</span>
                <h2 className="text-5xl font-black text-white mb-6 leading-tight">Join the Network of Volunteers</h2>
                <p className="text-slate-400 text-lg mb-10 font-medium">Contribute your time and skills to the temple's operations, events, and digital initiatives.</p>
                <button className="bg-white text-slate-900 hover:bg-orange-500 hover:text-white px-10 py-4 rounded-xl font-black transition-colors self-start">
                  Apply Now
                </button>
              </div>
              <div className="p-12 lg:p-24 bg-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Digital Team', icon: '💻' },
                  { title: 'Event Staff', icon: '🎫' },
                  { title: 'Crowd Control', icon: '🚶' },
                  { title: 'Prasadam', icon: '🍱' }
                ].map((role, idx) => (
                  <div key={idx} className="bg-slate-700/50 p-8 rounded-[2rem] border border-slate-600 flex flex-col gap-4">
                    <span className="text-4xl bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-600">{role.icon}</span>
                    <h4 className="font-black text-white text-xl">{role.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14 - CONTACT */}
          <section className="bg-slate-100 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                <div className="space-y-6">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-200">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-slate-900">Address</h3>
                  <div className="text-slate-500 font-medium space-y-1">
                    <p className="font-bold text-slate-700">{temple.name}</p>
                    <p>{temple.address?.line1}</p>
                    {temple.address?.line2 && <p>{temple.address.line2}</p>}
                    <p>{temple.address?.city}, {temple.address?.state}</p>
                    <p>{temple.address?.pincode}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-200">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-slate-900">Contact</h3>
                  <div className="text-slate-500 font-medium space-y-3">
                    <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-slate-400" /> {temple.contactPhone}</p>
                    <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-slate-400" /> {temple.contactEmail}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-black text-xl text-slate-900">Links</h3>
                  <ul className="text-slate-500 font-medium space-y-3">
                    <li><Link href={`/temple/${temple.slug}/history`} className="hover:text-orange-600 transition-colors">About Us</Link></li>
                    <li><Link href={`/temple/${temple.slug}/events`} className="hover:text-orange-600 transition-colors">Events</Link></li>
                    <li><Link href={`/temple/${temple.slug}/gallery`} className="hover:text-orange-600 transition-colors">Gallery</Link></li>
                    <li><Link href={`/temple/${temple.slug}/donate`} className="hover:text-orange-600 transition-colors font-bold text-slate-900">Donate Now</Link></li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="font-black text-xl text-slate-900">Social</h3>
                  <p className="text-slate-500 font-medium mb-4">Follow us for updates</p>
                  <div className="flex gap-4">
                    {['FB', 'TW', 'IN'].map(social => (
                      <a key={social} href="#" className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors font-black text-sm">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 font-medium text-sm">© {new Date().getFullYear()} {temple.name}. All rights reserved.</p>
                <div className="bg-slate-200 text-slate-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                  Powered by MandirAI OS
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
