'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MapPin, Clock, Calendar, Phone, Mail, ArrowRight, Video, Download, ChevronRight, Lock, Map as MapIcon,
  BookOpen, Star, Info, Volume2, Globe, Flame, Music, Bell, Search, Menu, X, Users, Heart, Camera, History
} from 'lucide-react'
import BlockRenderer from '@/components/temple/blocks/block-renderer'
import { useLanguage } from '@/components/shared/language-context'

export interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

const FALLBACK_DATA = {
  name: "Sri Vaikuntha Ranganatha Swamy Devasthanam",
  subtitle: "Est. 1250 CE",
  about: "Step into the celestial durbar of the Divine. Built over eight centuries ago by the mighty emperors of the South, this architectural marvel stands as a testament to eternal devotion and unparalleled stone craftsmanship. The massive gopurams touch the sky, while the intricate carvings whisper tales of ancient glory.",
  location: "Kaveri Delta Region, South India",
  timings: "5:00 AM to 12:30 PM & 4:00 PM to 9:00 PM",
  contact: { phone: "+91 8000 000 000", email: "info@heritagegrand.org" },
  stats: [
    { label: "Pilgrims / Year", value: 4500000, suffix: "+" },
    { label: "Years of History", value: 775, suffix: "+" },
    { label: "Daily Sevas", value: 120, suffix: "" },
    { label: "Acres Complex", value: 156, suffix: "" }
  ],
  schedule: [
    { time: "05:00 AM", event: "Suprabhatam & Viswaroopa Darshanam", description: "Waking the deity with sacred chants" },
    { time: "06:30 AM", event: "Tomala Seva", description: "Adorning with fresh flower garlands" },
    { time: "08:00 AM", event: "Sahasranama Archana", description: "Chanting of 1000 holy names" },
    { time: "11:30 AM", event: "Maha Naivedyam", description: "Offering of 56 royal delicacies" },
    { time: "04:30 PM", event: "Sarva Darshanam", description: "Free viewing for all devotees" },
    { time: "08:30 PM", event: "Ekantha Seva", description: "Putting the deity to rest" }
  ],
  events: [
    { title: "Vaikuntha Ekadashi", date: "Jan 12, 2027", desc: "The grand opening of the Northern Gate." },
    { title: "Brahmotsavam", date: "Mar 15-24, 2027", desc: "10-day mega festival with chariot processions." },
    { title: "Pavitrotsavam", date: "Aug 08, 2027", desc: "Annual purification ceremonies." }
  ],
  history: [
    { year: "1250 CE", title: "Foundation Laid", desc: "Emperor Kulothunga III begins construction of the Garbhagriha.", icon: <Globe className="w-6 h-6 text-amber-500" /> },
    { year: "1387 CE", title: "Rajagopuram Addition", desc: "The magnificent 11-tier eastern tower is completed.", icon: <Star className="w-6 h-6 text-amber-500" /> },
    { thousand: true, year: "1603 CE", title: "Kalyana Mandapam", desc: "The 1000-pillar hall with musical columns is built.", icon: <Music className="w-6 h-6 text-amber-500" /> },
    { year: "1879 CE", title: "Golden Vimanam", desc: "The roof of the sanctum is covered in pure gold.", icon: <Flame className="w-6 h-6 text-amber-500" /> },
    { year: "2024 CE", title: "Digital Era", desc: "Temple goes global with live VR darshan and AI.", icon: <Video className="w-6 h-6 text-amber-500" /> }
  ],
  testimonials: [
    { name: "Raja Shekhar", location: "Chennai", text: "The architectural beauty is unmatched. I felt like I was transported back in time." },
    { name: "Anita Desai", location: "London", text: "The vibration in the 1000-pillar hall is profound. Truly a spiritual awakening." },
    { name: "Suresh Babu", location: "Bangalore", text: "The golden hour at the temple tank is a sight to behold. Excellent facilities for pilgrims." }
  ]
}

export default function HeritageGrandTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const data = { ...FALLBACK_DATA, ...temple, name: temple?.name || FALLBACK_DATA.name };
  const activeSevas = sevas && sevas.length > 0 ? sevas : [
    { id: 1, name: "Suvarna Pushparchana", description: "Archana performed with 108 golden lotuses.", price: 5001 },
    { id: 2, name: "Kalyanotsavam", description: "The grand celestial wedding ceremony.", price: 10001 },
    { id: 3, name: "Veda Ashirvadam", description: "Special blessings by Vedic scholars.", price: 2501 },
    { id: 4, name: "Annadanam Donation", description: "Feeding 100 pilgrims for one day.", price: 15001 },
    { id: 5, name: "Gau Samrakshana", description: "Maintenance of one temple cow for a month.", price: 3001 },
    { id: 6, name: "Sahasra Deepalankara", description: "Lighting of 1000 ghee lamps.", price: 7501 }
  ]

  const checkAI = (e: React.MouseEvent) => {
    if (!temple?.plan || temple?.plan === 'free') {
      e.preventDefault()
      alert('Upgrade to AI plan to use AI features')
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0400] text-amber-100 font-serif selection:bg-amber-900 selection:text-amber-100 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .bg-stone-pattern {
          background-color: #0d0400;
          background-image: radial-gradient(#2d1508 1px, transparent 1px), radial-gradient(#2d1508 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
        }
        .text-gold-gradient {
          background: linear-gradient(to right, #fef08a, #fbbf24, #d97706, #fbbf24);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
        .border-gold-ornate {
          border: 2px solid transparent;
          border-image: linear-gradient(to bottom right, #b45309, #fef08a, #b45309) 1;
        }
        .lamp-flicker {
          animation: flicker 2s infinite alternate;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .perspective-container {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-20 {
          transform: translateZ(20px);
        }
        .hover-3d-card:hover {
          transform: rotateX(5deg) rotateY(-5deg) translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(180, 83, 9, 0.25);
        }
      `}} />

      {/* SECTION 1: 3D HERO */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-stone-pattern border-b-[10px] border-double border-amber-800">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0400] via-transparent to-[#0d0400] z-10" />
        
        {/* Parallax Layers */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 transform scale-150">
          <div className="w-[800px] h-[800px] rounded-full border-[20px] border-amber-900 border-dashed animate-[spin_120s_linear_infinite]" />
        </div>

        <div className="relative z-20 text-center px-4 perspective-container w-full max-w-6xl mx-auto">
          <div className="preserve-3d space-y-8 p-12 border-gold-ornate bg-black/40 backdrop-blur-md relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl lamp-flicker">🪔</div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-gold-gradient translate-z-20 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              {data.name.split(' ')[0]}
            </h1>
            <h2 className="text-2xl md:text-4xl text-amber-500 font-light tracking-[0.5em] uppercase">
              {data.name.split(' ').slice(1).join(' ')}
            </h2>
            
            <div className="flex items-center justify-center gap-4 text-amber-700/80 my-8">
              <span className="w-24 h-px bg-amber-700/50"></span>
              <span className="text-xl tracking-widest">{data.subtitle}</span>
              <span className="w-24 h-px bg-amber-700/50"></span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 translate-z-20 pt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-900 text-amber-50 rounded-none border border-amber-500 hover:from-amber-600 hover:to-amber-800 transition-all font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(180,83,9,0.4)] flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Plan Darshan
              </button>
              <button onClick={checkAI} className="px-8 py-4 bg-black/60 text-amber-500 rounded-none border border-amber-700/50 hover:bg-black hover:border-amber-500 transition-all font-bold uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4" /> Ask AI Pandit ✨
              </button>
            </div>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-4xl lamp-flicker">🪔</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="py-12 bg-gradient-to-b from-[#0d0400] to-[#1a0800] border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center p-6 border-l border-amber-900/50 first:border-l-0">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 font-sans">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-amber-700/80 uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK ACTIONS */}
      <section className="py-16 bg-stone-pattern relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Clock className="w-8 h-8" />, title: "Timings", desc: "View today's darshan slots" },
            { icon: <BookOpen className="w-8 h-8" />, title: "Sevas", desc: "Book sacred offerings" },
            { icon: <MapIcon className="w-8 h-8" />, title: "Guide", desc: "Temple map & facilities" },
            { icon: <Video className="w-8 h-8" />, title: "Live", desc: "Watch ongoing rituals" }
          ].map((item, i) => (
            <div key={i} className="group p-8 bg-black/60 border border-amber-900/50 hover:border-amber-500 transition-all cursor-pointer hover:bg-amber-900/10 flex flex-col items-center text-center">
              <div className="text-amber-600 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl text-amber-400 mb-2 uppercase tracking-wider">{item.title}</h3>
              <p className="text-amber-800/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TODAY'S SCHEDULE */}
      <section className="py-24 bg-[#140600] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent" />
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4 font-serif">Daily Royal Schedule</h2>
            <div className="w-24 h-1 bg-amber-800 mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            {data.schedule.map((slot: any, i: number) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-black/40 border border-amber-900/30 hover:border-amber-700 transition-colors">
                <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                  <div className="text-2xl font-sans font-bold text-amber-600 w-32">{slot.time}</div>
                  <div>
                    <h4 className="text-xl text-amber-300">{slot.event}</h4>
                    <p className="text-amber-700/80">{slot.description}</p>
                  </div>
                </div>
                <button className="px-6 py-2 border border-amber-700 text-amber-600 hover:bg-amber-900/30 w-full md:w-auto uppercase text-sm tracking-wider">
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED SEVAS (Bento Grid) */}
      <section className="py-24 bg-stone-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4 font-serif">Sacred Offerings</h2>
              <p className="text-amber-700/80 max-w-2xl text-lg">Participate in the ancient rituals performed exactly as they were centuries ago.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-amber-500 hover:text-amber-400">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {activeSevas.map((seva: any) => (
              <div key={seva.id} className="hover-3d-card relative group bg-[#1a0800] border-gold-ornate p-8 transition-all duration-500 flex flex-col h-full">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Star className="w-16 h-16 text-amber-500" />
                </div>
                <div className="flex-grow preserve-3d">
                  <h3 className="text-2xl text-amber-400 mb-3 font-bold translate-z-20">{seva.name}</h3>
                  <p className="text-amber-700/80 mb-6 translate-z-20">{seva.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto border-t border-amber-900/50 pt-6">
                  <div className="text-2xl font-sans text-amber-500 font-bold">₹{seva.price}</div>
                  <button className="px-4 py-2 bg-amber-900/40 text-amber-400 border border-amber-800 hover:bg-amber-800 transition-colors uppercase text-xs tracking-widest">
                    Book Seva
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PANCHANG WIDGET */}
      <section className="py-16 bg-[#0a0300] border-y border-amber-900/50">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="w-12 h-12 text-amber-600" />
            <div>
              <h3 className="text-xl text-amber-500 font-bold uppercase tracking-wider">Today's Panchangam</h3>
              <p className="text-amber-700/80">Shukla Paksha Ekadashi • Pushya Nakshatra</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-sm text-amber-800 uppercase tracking-widest mb-1">Sunrise</div>
              <div className="text-xl text-amber-400 font-sans">06:14 AM</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-amber-800 uppercase tracking-widest mb-1">Sunset</div>
              <div className="text-xl text-amber-400 font-sans">06:22 PM</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-amber-800 uppercase tracking-widest mb-1">Rahu Kalam</div>
              <div className="text-xl text-red-900/80 font-sans">04:30 - 06:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: UNIQUE ARCHITECTURE MAP */}
      <section className="py-24 bg-stone-pattern overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4 font-serif">Temple Architecture Map</h2>
            <p className="text-amber-700/80">Explore the sacred geometry of the complex</p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[16/9] border-2 border-amber-900/50 bg-[#140600] p-4 flex items-center justify-center">
            {/* Very simple CSS floor plan representation */}
            <div className="relative w-[80%] h-[80%] border-4 border-double border-amber-800">
              
              {/* Outer Prakaram */}
              <div className="absolute inset-4 border border-amber-900/50"></div>
              
              {/* Rajagopuram (Entrance) */}
              <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-16 h-12 bg-amber-900/80 border-2 border-amber-500 flex flex-col justify-center items-center cursor-pointer group">
                <div className="text-[10px] text-amber-100 uppercase tracking-tighter">Gateway</div>
                {/* Tooltip */}
                <div className="absolute top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-amber-700 p-2 w-48 text-xs z-50 text-amber-400">
                  <strong>Rajagopuram:</strong> 165ft tall eastern entrance tower built in 1387 CE.
                </div>
              </div>

              {/* Kalyana Mandapam (Left) */}
              <div className="absolute top-1/4 left-8 w-24 h-32 border-2 border-amber-800/60 flex flex-col justify-center items-center cursor-pointer group hover:bg-amber-900/20">
                <div className="grid grid-cols-4 gap-1 opacity-50 p-1">
                  {Array.from({length:16}).map((_,i) => <div key={i} className="w-1 h-1 bg-amber-600 rounded-full" />)}
                </div>
                <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-amber-700 p-2 w-48 text-xs z-50 text-amber-400">
                  <strong>1000 Pillar Hall:</strong> Architectural marvel with musical pillars.
                </div>
              </div>

              {/* Pushkarini (Right) */}
              <div className="absolute top-1/4 right-8 w-32 h-24 border-2 border-blue-900/50 bg-blue-950/20 flex flex-col justify-center items-center cursor-pointer group">
                <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-amber-700 p-2 w-48 text-xs z-50 text-amber-400 right-0">
                  <strong>Sacred Tank:</strong> Over 5 acres wide, used for floating festivals.
                </div>
              </div>

              {/* Inner Prakaram & Garbhagriha */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 border-2 border-amber-700 bg-[#1a0800]">
                {/* Sanctum */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-amber-500 bg-amber-900/50 rounded-sm flex items-center justify-center group cursor-pointer animate-pulse">
                  <Flame className="w-6 h-6 text-amber-400" />
                  <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-amber-500 p-3 w-64 text-sm z-50 text-amber-300 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <strong>Garbhagriha:</strong> The most sacred innermost sanctum housing the main deity under a golden vimanam.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: HISTORY TIMELINE */}
      <section className="py-24 bg-[#0a0300] border-t border-amber-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4 font-serif">Chronicles of Stone</h2>
            <p className="text-amber-700/80 text-lg">A journey through 800 years of glorious history.</p>
          </div>

          <div className="relative border-l-2 border-amber-900/50 ml-4 md:ml-1/2 md:translate-x-1/2 space-y-16">
            {data.history.map((era: any, i: number) => (
              <div key={i} className="relative pl-8 md:pl-0">
                {/* Marker */}
                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 bg-amber-600 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.8)]" />
                
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:-ml-[50%]' : 'md:pl-12 md:ml-0'} bg-[#140600] p-6 border border-amber-900/30 hover:border-amber-600 transition-colors`}>
                  <div className="flex items-center gap-3 mb-2">
                    {era.icon}
                    <span className="text-xl font-bold text-amber-500 font-sans">{era.year}</span>
                  </div>
                  <h4 className="text-2xl text-amber-300 mb-2">{era.title}</h4>
                  <p className="text-amber-700/80 leading-relaxed">{era.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: UPCOMING EVENTS */}
      <section className="py-24 bg-stone-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <Bell className="w-8 h-8 text-amber-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 font-serif">Royal Utsavams</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.events.map((event: any, i: number) => (
              <div key={i} className="bg-black/60 border border-amber-900/40 p-8 hover:bg-[#1a0800] transition-colors group">
                <div className="text-amber-600 font-sans font-bold tracking-widest text-sm mb-4 border-b border-amber-900/50 pb-4">
                  {event.date}
                </div>
                <h3 className="text-2xl text-amber-400 mb-3 group-hover:text-amber-300">{event.title}</h3>
                <p className="text-amber-800/80">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: DONATIONS & 80G */}
      <section className="py-24 bg-gradient-to-r from-[#140600] to-[#2d1508] border-y border-amber-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Heart className="w-[500px] h-[500px] text-amber-500" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-6 font-serif">Support the Heritage</h2>
          <p className="text-xl text-amber-200/80 mb-10 leading-relaxed">
            Your generous contributions help us maintain these ancient structures, conduct daily nitya annadanam, and preserve Vedic knowledge for future generations.
          </p>
          <div className="bg-black/40 inline-block px-6 py-2 rounded border border-amber-900/50 text-amber-500 mb-10 text-sm tracking-widest uppercase">
            All donations are exempt under Section 80G of IT Act
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-5 bg-amber-600 text-[#0d0400] font-bold text-lg uppercase tracking-wider hover:bg-amber-500 transition-colors border-2 border-amber-400">
              Donate Now
            </button>
            <button className="px-10 py-5 bg-transparent text-amber-500 border-2 border-amber-700 font-bold text-lg uppercase tracking-wider hover:border-amber-400 transition-colors">
              Hundi E-Offering
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS */}
      <section className="py-24 bg-[#0a0300]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-amber-500 mb-16 font-serif text-center">Devotee Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.testimonials.map((test: any, i: number) => (
              <div key={i} className="p-8 border border-amber-900/30 bg-[#140600] relative">
                <div className="absolute -top-4 left-8 text-4xl text-amber-800">"</div>
                <p className="text-amber-200/70 italic mb-6 relative z-10 text-lg leading-relaxed">{test.text}</p>
                <div className="flex items-center gap-4 border-t border-amber-900/50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-amber-900/40 flex items-center justify-center text-amber-500 font-bold">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-amber-400 font-bold">{test.name}</div>
                    <div className="text-amber-700/80 text-sm">{test.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: LIVE DARSHAN & GALLERY PREVIEW */}
      <section className="py-24 bg-stone-pattern border-t border-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Live Darshan */}
          <div>
            <h2 className="text-3xl font-bold text-amber-500 mb-6 font-serif flex items-center gap-3">
              <Video className="w-8 h-8" /> Live Darshanam
            </h2>
            <div className="aspect-video bg-black border-4 border-amber-900/50 relative group cursor-pointer overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative z-10 w-20 h-20 bg-amber-600/80 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(217,119,6,0.5)]">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#0d0400] border-b-[12px] border-b-transparent ml-2"></div>
              </div>
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
              </div>
            </div>
            <p className="mt-4 text-amber-700/80">Experience the divine presence from anywhere in the world. Broadcasting live daily.</p>
          </div>

          {/* Gallery Preview */}
          <div>
            <h2 className="text-3xl font-bold text-amber-500 mb-6 font-serif flex items-center gap-3">
              <Camera className="w-8 h-8" /> Temple Vault
            </h2>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-4rem)] perspective-container">
              <div className="bg-amber-900/20 border border-amber-900/50 hover-3d-card p-4 flex items-center justify-center text-amber-700/50 h-40">
                Gopuram Image
              </div>
              <div className="bg-amber-900/20 border border-amber-900/50 hover-3d-card p-4 flex items-center justify-center text-amber-700/50 h-40">
                Deity Image
              </div>
              <div className="bg-amber-900/20 border border-amber-900/50 hover-3d-card p-4 flex items-center justify-center text-amber-700/50 h-40 col-span-2">
                Festival Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: COMMUNITY & WHATSAPP */}
      <section className="py-20 bg-[#1a0800] border-y border-amber-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Users className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6 font-serif">Join the Global Devotee Sangha</h2>
          <p className="text-amber-700/90 text-lg mb-8">Receive daily darshan images, panchangam updates, and festival notifications directly on your phone.</p>
          <button className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20bd5a] transition-colors shadow-lg flex items-center gap-3 mx-auto text-lg">
            Join WhatsApp Channel <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* SECTION 14: TIMINGS, CONTACT, MAP */}
      <section className="py-24 bg-[#0a0300]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="p-8 border border-amber-900/50 bg-[#140600]">
            <h3 className="text-2xl font-bold text-amber-500 mb-6 font-serif flex items-center gap-2">
              <Clock className="w-6 h-6" /> Darshan Timings
            </h3>
            <div className="space-y-4 text-amber-200/80">
              <div className="flex justify-between border-b border-amber-900/50 pb-2">
                <span>Morning Session</span>
                <span className="font-sans font-bold text-amber-600">05:00 AM - 12:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-amber-900/50 pb-2">
                <span>Evening Session</span>
                <span className="font-sans font-bold text-amber-600">04:00 PM - 09:00 PM</span>
              </div>
              <div className="pt-4 text-sm text-amber-700/80">
                * Timings may vary during eclipse (Grahana) and special festival days.
              </div>
            </div>
          </div>

          <div className="p-8 border border-amber-900/50 bg-[#140600]">
            <h3 className="text-2xl font-bold text-amber-500 mb-6 font-serif flex items-center gap-2">
              <MapPin className="w-6 h-6" /> Reach Us
            </h3>
            <div className="space-y-6 text-amber-200/80">
              <p>{data.location}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-amber-600">
                  <Phone className="w-5 h-5" />
                  <span className="text-amber-200/80">{data.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-amber-600">
                  <Mail className="w-5 h-5" />
                  <span className="text-amber-200/80">{data.contact.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full min-h-[300px] border border-amber-900/50 bg-amber-900/10 flex items-center justify-center p-8 text-center relative overflow-hidden group">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-overlay"></div>
             <div className="relative z-10">
               <MapIcon className="w-16 h-16 text-amber-700/50 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
               <h3 className="text-xl font-bold text-amber-600 mb-2 font-serif">View on Map</h3>
               <p className="text-amber-800/80 text-sm">Open in Google Maps for directions</p>
             </div>
          </div>

        </div>
      </section>

      {/* SECTION 15: FOOTER */}
      <footer className="bg-black pt-16 pb-8 border-t-[10px] border-double border-amber-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-black text-amber-600 tracking-widest uppercase mb-4">{data.name.split(' ')[0]}</h2>
              <p className="text-amber-800/60 leading-relaxed max-w-sm">
                Preserving the eternal dharma through ancient stone architecture, continuous prayers, and selfless service to humanity since {data.subtitle.replace('Est. ', '')}.
              </p>
            </div>
            <div>
              <h4 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-2 text-amber-800/80">
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Book Seva</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">E-Hundi</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Live Darshan</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Accommodation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-sm">Legal</h4>
              <ul className="space-y-2 text-amber-800/80">
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Refund Policy</Link></li>
                <li onClick={checkAI} className="cursor-pointer hover:text-amber-400 transition-colors flex items-center gap-1">
                  AI Terms <Lock className="w-3 h-3" />
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-900/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-amber-800/50 text-sm">
            <div>© {new Date().getFullYear()} {data.name}. All rights reserved.</div>
            <div className="flex items-center gap-2">
              Designed with <Heart className="w-4 h-4 text-amber-700" /> for Sanatana Dharma
            </div>
          </div>
        </div>
      </footer>

      {/* Dynamic Blocks */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12 bg-[#0a0400]">
          <BlockRenderer blocks={page.blocks} theme="heritage" sevas={sevas} templeAddress={temple?.address} />
        </div>
      )}

    </div>
  )
}
