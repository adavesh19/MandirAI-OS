'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import BlockRenderer from '@/components/temple/blocks/block-renderer';
import { useLanguage } from '@/components/shared/language-context';
import { 
  Lock, ArrowDown, Users, Clock, Calendar, 
  MapPin, Phone, Mail, ChevronRight, Play, 
  Heart, Share2, Info, Star, MessageCircle, 
  BookOpen, Video, ArrowRight, CheckCircle2, 
  Sparkles, ExternalLink, Activity
} from 'lucide-react';

export interface TemplateProps {
  temple: any;
  page: any;
  sevas: any[];
}

export default function ClassicCalmTemplate({ temple, page, sevas }: TemplateProps) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tName = temple?.name || "Sri Venkateswara Swamy Temple";
  const tDescription = temple?.description || "An ancient abode of peace, spirituality, and divine grace. Experience the sacred scroll of timeless devotion.";

  const fallbackSevas = sevas && sevas.length > 0 ? sevas : [
    { id: 1, name: 'Archana', price: '₹51', description: 'Daily archana to the main deity.', icon: '🌺' },
    { id: 2, name: 'Abhishekam', price: '₹501', description: 'Sacred bath offering.', icon: '🥛' },
    { id: 3, name: 'Sahasranama', price: '₹251', description: 'Chanting of 1000 names.', icon: '📖' },
    { id: 4, name: 'Annadanam', price: '₹1001', description: 'Food donation for devotees.', icon: '🍚' },
    { id: 5, name: 'Vahana Seva', price: '₹5001', description: 'Deity procession on vahana.', icon: '🐘' },
    { id: 6, name: 'Kalasha Pooja', price: '₹151', description: 'Special pot ritual.', icon: '🏺' }
  ];

  const handleAiAction = (actionName: string) => {
    if (!temple?.plan || temple.plan === 'free') {
      alert(`Upgrade to AI plan to use AI features (${actionName})`);
      return;
    }
    alert(`Processing AI request: ${actionName}`);
  };

  const Divider = () => (
    <div className="flex items-center justify-center py-12">
      <div className="h-px bg-[#c8923f]/30 w-32"></div>
      <div className="w-2 h-2 rounded-full bg-[#c8923f] mx-4"></div>
      <div className="h-px bg-[#c8923f]/30 w-32"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c1810] font-sans selection:bg-[#c8923f] selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf8f5]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-wider text-[#c8923f] flex items-center gap-2">
            <span className="text-3xl">🕉</span> {tName}
          </div>
          <div className="hidden md:flex gap-8 font-medium tracking-wide">
            <a href="#about" className="hover:text-[#c8923f] transition-colors">About</a>
            <a href="#sevas" className="hover:text-[#c8923f] transition-colors">Sevas</a>
            <a href="#schedule" className="hover:text-[#c8923f] transition-colors">Darshan</a>
            <a href="#contact" className="hover:text-[#c8923f] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fff_0%,#faf8f5_100%)]"></div>
          {/* Petals */}
          {mounted && Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-xl opacity-20 pointer-events-none animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              🌸
            </div>
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-8xl mb-8 text-[#c8923f] perspective-1000">
            <div className="animate-slow-spin-3d">🕉</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight tracking-widest text-[#2c1810]">
            {tName}
          </h1>
          <p className="text-lg md:text-xl text-[#2c1810]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {tDescription}
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-[#c8923f] text-white rounded hover:bg-[#a6752d] transition-all transform hover:scale-105 shadow-lg tracking-wider font-medium">
              BOOK SEVA
            </button>
            <button className="px-8 py-4 border border-[#c8923f] text-[#c8923f] rounded hover:bg-[#c8923f]/10 transition-all tracking-wider font-medium">
              LIVE DARSHAN
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#c8923f]">
          <ArrowDown size={32} />
        </div>
        
        <style jsx>{`
          .perspective-1000 { perspective: 1000px; }
          .animate-slow-spin-3d {
            animation: spin3d 10s linear infinite;
            transform-style: preserve-3d;
          }
          @keyframes spin3d {
            0% { transform: rotateY(0deg) rotateX(5deg); }
            100% { transform: rotateY(360deg) rotateX(5deg); }
          }
          .animate-float {
            animation: floatDown linear infinite;
          }
          @keyframes floatDown {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </section>

      {/* Section 2: Stats Bar */}
      <section className="bg-[#f0eadd] py-8 border-y border-[#c8923f]/20 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="text-[#c8923f] mb-2" size={28} />
              <div className="text-2xl font-serif font-bold">1.2K+</div>
              <div className="text-sm tracking-widest uppercase opacity-70">Live Viewers</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="text-[#c8923f] mb-2" size={28} />
              <div className="text-2xl font-serif font-bold">18:30</div>
              <div className="text-sm tracking-widest uppercase opacity-70">Next Aarti</div>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="text-[#c8923f] mb-2" size={28} />
              <div className="text-2xl font-serif font-bold">50+</div>
              <div className="text-sm tracking-widest uppercase opacity-70">Daily Sevas</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="text-[#c8923f] mb-2" size={28} />
              <div className="text-2xl font-serif font-bold">4.9/5</div>
              <div className="text-sm tracking-widest uppercase opacity-70">Devotee Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Quick Actions */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'E-Hundi', icon: Heart, desc: 'Digital donation' },
              { title: 'Book Seva', icon: BookOpen, desc: 'Online pooja booking' },
              { title: 'Live Darshan', icon: Video, desc: 'Watch from home' },
              { title: 'Accommodation', icon: MapPin, desc: 'Stay near temple' }
            ].map((action, i) => (
              <div key={i} className="group p-8 border border-[#c8923f]/20 rounded bg-white hover:border-[#c8923f] transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1">
                <action.icon className="text-[#c8923f] mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-serif text-xl mb-2">{action.title}</h3>
                <p className="opacity-70 text-sm">{action.desc}</p>
                <div className="mt-4 flex items-center text-[#c8923f] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Proceed <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 4: Today's Darshan Schedule */}
      <section id="schedule" className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Today's Schedule</h2>
            <p className="opacity-70 max-w-xl mx-auto">Sacred timings for darshan and aarti</p>
          </div>
          
          <div className="bg-white rounded border border-[#c8923f]/20 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c8923f] to-transparent opacity-50"></div>
            <div className="space-y-6">
              {[
                { time: '04:30 AM', event: 'Suprabhata Seva', type: 'Darshan' },
                { time: '06:00 AM', event: 'Morning Aarti', type: 'Ritual' },
                { time: '08:00 AM - 12:00 PM', event: 'Sarva Darshan', type: 'Darshan' },
                { time: '12:30 PM', event: 'Rajbhog Aarti', type: 'Ritual' },
                { time: '04:00 PM - 08:00 PM', event: 'Evening Darshan', type: 'Darshan' },
                { time: '08:30 PM', event: 'Shayan Aarti', type: 'Ritual' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-[#c8923f]/10 last:border-0 hover:bg-[#faf8f5] transition-colors -mx-8 px-8">
                  <div className="flex items-center gap-4">
                    <div className="text-[#c8923f] font-medium w-32">{item.time}</div>
                    <div className="font-serif text-lg">{item.event}</div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs border border-[#c8923f]/30 text-[#c8923f]">
                    {item.type}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center pt-6 border-t border-[#c8923f]/20">
              <button 
                onClick={() => handleAiAction('AI Schedule Translation')}
                className="flex items-center gap-2 text-sm text-[#c8923f] hover:underline"
              >
                {!temple?.plan || temple.plan === 'free' ? <Lock size={14} /> : <Sparkles size={14} />}
                Translate Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Featured Sevas (Bento Grid 3D) */}
      <section id="sevas" className="py-24 bg-[#2c1810] text-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-[#c8923f]">Sacred Sevas</h2>
            <p className="opacity-70 max-w-xl mx-auto">Offer your devotion through our digital seva portal</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fallbackSevas.map((seva, i) => (
              <div key={i} className="group perspective-1000 h-[250px]">
                <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                  
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-[#faf8f5] text-[#2c1810] rounded border border-[#c8923f] p-8 flex flex-col justify-center items-center text-center">
                    <div className="text-4xl mb-4">{seva.icon}</div>
                    <h3 className="font-serif text-2xl mb-2">{seva.name}</h3>
                    <div className="text-[#c8923f] font-bold text-xl">{seva.price}</div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#c8923f] text-[#2c1810] rounded p-8 flex flex-col justify-center items-center text-center">
                    <p className="mb-6 font-medium">{seva.description}</p>
                    <button className="px-6 py-2 bg-[#2c1810] text-[#faf8f5] rounded hover:bg-black transition-colors w-full">
                      Book Now
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => handleAiAction('AI Seva Recommendation')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#c8923f] text-[#c8923f] rounded hover:bg-[#c8923f]/10 transition-colors"
            >
              {!temple?.plan || temple.plan === 'free' ? <Lock size={16} /> : <Sparkles size={16} />}
              AI Seva Recommendation
            </button>
          </div>
        </div>
        
        <style jsx>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
        `}</style>
      </section>

      <Divider />

      {/* Section 6: Panchang / Hindu Calendar */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif mb-4">Daily Panchang</h2>
              <p className="opacity-70">Auspicious timings and lunar phases</p>
            </div>
            <div className="mt-4 md:mt-0 font-serif text-[#c8923f] text-xl">
              Shukla Paksha
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { day: 'Today', tithi: 'Ekadashi', nakshatra: 'Rohini', auspicious: 'Yes' },
              { day: 'Tomorrow', tithi: 'Dwadashi', nakshatra: 'Mrigashirsha', auspicious: 'Yes' },
              { day: 'Day 3', tithi: 'Trayodashi', nakshatra: 'Ardra', auspicious: 'Neutral' },
              { day: 'Day 4', tithi: 'Chaturdashi', nakshatra: 'Punarvasu', auspicious: 'No' },
              { day: 'Day 5', tithi: 'Purnima', nakshatra: 'Pushya', auspicious: 'Highly' }
            ].map((p, i) => (
              <div key={i} className={`p-6 border ${i === 0 ? 'border-[#c8923f] bg-[#c8923f]/5 shadow-md' : 'border-[#c8923f]/20 bg-white'} rounded text-center relative overflow-hidden group`}>
                <div className="font-medium mb-4 text-[#c8923f]">{p.day}</div>
                <div className="font-serif text-lg mb-2">{p.tithi}</div>
                <div className="text-xs opacity-70 mb-4">{p.nakshatra}</div>
                <div className={`text-xs px-2 py-1 rounded-full inline-block ${i === 0 || i === 1 ? 'bg-green-100 text-green-800' : i === 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {p.auspicious} Auspicious
                </div>
                
                {i === 0 && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#c8923f] transform rotate-45 translate-x-4 -translate-y-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Temple History/About */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="aspect-[3/4] bg-[#f0eadd] rounded border border-[#c8923f]/30 overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center text-[#c8923f] opacity-20">
                    <span className="text-9xl">🕉</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/50 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#c8923f]/10 rounded border border-[#c8923f] -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#c8923f]/10 rounded border border-[#c8923f] -z-10"></div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-serif mb-6">The Sacred History</h2>
              <div className="w-16 h-1 bg-[#c8923f] mb-8"></div>
              <p className="text-lg leading-relaxed mb-6 opacity-80">
                Founded centuries ago, our temple stands as a testament to timeless devotion and architectural brilliance. Legend says that the main deity self-manifested here, drawing sages and devotees from across the realms.
              </p>
              <p className="text-lg leading-relaxed mb-8 opacity-80">
                The intricate carvings on the walls speak volumes of the artistic grandeur of the bygone era, while the sacred vibrations continue to heal and inspire millions who visit.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#c8923f] shrink-0 mt-1" />
                  <div>
                    <div className="font-serif font-medium">12th Century</div>
                    <div className="text-sm opacity-70">Established</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#c8923f] shrink-0 mt-1" />
                  <div>
                    <div className="font-serif font-medium">Self-manifested</div>
                    <div className="text-sm opacity-70">Deity origin</div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleAiAction('AI Generate Detailed History')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0eadd] text-[#c8923f] rounded hover:bg-[#e6ddca] transition-colors font-medium border border-[#c8923f]/30"
              >
                {!temple?.plan || temple.plan === 'free' ? <Lock size={16} /> : <Sparkles size={16} />}
                Generate Detailed History
              </button>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 8: Gallery Preview */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Sacred Glimpses</h2>
            <p className="opacity-70">Moments of divine grace</p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {[
              { h: 'h-64' }, { h: 'h-80' }, { h: 'h-48' }, { h: 'h-72' },
              { h: 'h-72' }, { h: 'h-56' }, { h: 'h-80' }, { h: 'h-64' }
            ].map((img, i) => (
              <div 
                key={i} 
                className={`w-full ${img.h} bg-gradient-to-br from-[#f0eadd] to-[#e6ddca] rounded border border-[#c8923f]/20 overflow-hidden relative group cursor-pointer break-inside-avoid`}
              >
                <div className="absolute inset-0 bg-[#c8923f]/0 group-hover:bg-[#c8923f]/20 transition-all duration-300 z-10 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 text-white font-serif tracking-widest transform scale-90 group-hover:scale-100 transition-all duration-300">
                    VIEW
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-[#c8923f]/30">
                  <span className="text-4xl font-serif">✨</span>
                </div>
                {/* 3D tilt effect on hover via tailwind classes */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-[#c8923f] text-[#c8923f] rounded hover:bg-[#c8923f] hover:text-white transition-colors tracking-widest font-medium">
              VIEW FULL GALLERY
            </button>
          </div>
        </div>
      </section>

      {/* Section 9: Upcoming Events */}
      <section className="py-24 bg-[#2c1810] text-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif mb-4 text-[#c8923f]">Upcoming Utsavams</h2>
              <p className="opacity-70">Join us in celebrating divine festivals</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#c8923f] hover:underline">
              View All Events <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="space-y-6">
            {[
              { date: '15 Aug', title: 'Brahmotsavam', desc: 'Annual grand festival featuring daily vahana sevas.' },
              { date: '28 Aug', title: 'Krishna Janmashtami', desc: 'Special midnight pooja and abhishekam.' },
              { date: '12 Sep', title: 'Ganesh Chaturthi', desc: '10-day celebration with special modak offerings.' },
              { date: '24 Oct', title: 'Vijayadashami', desc: 'Culmination of Navaratri with Vidyarambham.' }
            ].map((event, i) => (
              <div key={i} className="flex flex-col md:flex-row bg-white/5 border border-[#c8923f]/20 rounded hover:bg-white/10 transition-colors p-6 group">
                <div className="md:w-32 flex-shrink-0 mb-4 md:mb-0">
                  <div className="text-[#c8923f] font-serif text-xl font-bold">{event.date.split(' ')[0]}</div>
                  <div className="text-sm tracking-widest uppercase opacity-70">{event.date.split(' ')[1]}</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif mb-2 group-hover:text-[#c8923f] transition-colors">{event.title}</h3>
                  <p className="opacity-70">{event.desc}</p>
                </div>
                <div className="md:w-48 flex-shrink-0 mt-4 md:mt-0 flex items-center justify-start md:justify-end">
                  <button className="px-6 py-2 border border-[#c8923f] text-[#c8923f] rounded hover:bg-[#c8923f] hover:text-[#2c1810] transition-colors text-sm">
                    Participate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Donations & 80G */}
      <section className="py-24 bg-[#faf8f5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8923f]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c8923f]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded border border-[#c8923f]/30 p-12 text-center shadow-xl">
            <Heart className="text-[#c8923f] mx-auto mb-6" size={48} />
            <h2 className="text-4xl font-serif mb-4">Support the Divine Cause</h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Your contributions help maintain the temple premises, conduct daily rituals, and support our Annadanam program serving thousands of devotees.
            </p>
            
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200 mb-8">
              <CheckCircle2 size={16} /> All donations are 80G Tax Exempted
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {['₹1,001', '₹5,001', '₹10,001'].map((amt, i) => (
                <button key={i} className="py-3 border border-[#c8923f]/30 rounded hover:border-[#c8923f] hover:bg-[#f0eadd] transition-colors font-medium">
                  {amt}
                </button>
              ))}
            </div>
            
            <button className="w-full sm:w-auto px-12 py-4 bg-[#c8923f] text-white rounded hover:bg-[#a6752d] transition-all font-medium tracking-wider">
              DONATE CUSTOM AMOUNT
            </button>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 11: Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Devotee Experiences</h2>
            <p className="opacity-70">Words of faith and gratitude</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ramesh K.', text: 'The peace I feel here is unmatched. The online seva booking was seamless.' },
              { name: 'Priya S.', text: 'Attending the morning suprabhatam online gives my day a perfect start.' },
              { name: 'Venkat M.', text: 'The annadanam program is truly inspiring. Glad to contribute.' }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded border border-[#c8923f]/20 shadow-sm relative">
                <div className="absolute top-4 right-4 text-[#c8923f]/20">
                  <MessageCircle size={32} />
                </div>
                <div className="flex text-[#c8923f] mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="italic opacity-80 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="font-serif font-bold text-[#c8923f]">- {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Live Darshan */}
      <section className="py-24 bg-[#1a0f0a] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif mb-4 text-[#c8923f]">Live Darshan</h2>
          <p className="opacity-70 mb-12 max-w-xl mx-auto">Experience the divine presence from anywhere in the world.</p>
          
          <div className="max-w-4xl mx-auto aspect-video bg-black rounded border border-[#c8923f]/30 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl shadow-[#c8923f]/10">
            <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/1a0f0a/2c1810')] opacity-50 bg-cover bg-center"></div>
            <div className="w-20 h-20 bg-[#c8923f]/80 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Play fill="currentColor" size={32} className="ml-2" />
            </div>
            
            <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-xs font-bold flex items-center gap-2 z-10 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
            </div>
            <div className="absolute bottom-4 left-4 text-sm font-medium z-10 text-white/80">
              Garbhagriha View
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Community / Newsletter */}
      <section className="py-20 bg-[#f0eadd]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-3xl font-serif mb-4">Join Our WhatsApp Community</h2>
          <p className="opacity-70 mb-8">Get daily updates on panchang, temple timings, and live events directly on your phone.</p>
          
          <button className="px-8 py-4 bg-[#25D366] text-white rounded font-bold hover:bg-[#128C7E] transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto">
            Join Now
          </button>
        </div>
      </section>

      {/* Section 14: Contact & Map */}
      <section id="contact" className="py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif mb-8 text-[#c8923f]">Plan Your Visit</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#c8923f] shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Temple Address</div>
                    <p className="opacity-70">123 Sacred Hill Road,<br />Temple Town, State - 500001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-[#c8923f] shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Darshan Timings</div>
                    <p className="opacity-70">Morning: 04:30 AM to 12:30 PM<br />Evening: 04:00 PM to 08:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-[#c8923f] shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Contact Support</div>
                    <p className="opacity-70">+91 1800-123-4567<br />info@sacredtemple.org</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f0eadd] rounded border border-[#c8923f]/30 h-80 flex items-center justify-center flex-col text-[#c8923f]">
              <MapPin size={48} className="mb-4 opacity-50" />
              <div className="font-serif">Interactive Map Placeholder</div>
              <div className="text-sm opacity-70 mt-2">Map integration goes here</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15: Footer */}
      <footer className="bg-[#1a0f0a] text-white/60 py-16 border-t border-[#c8923f]/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="font-serif text-2xl tracking-wider text-[#c8923f] mb-6">
                <span className="text-2xl">🕉</span> {tName}
              </div>
              <p className="text-sm leading-relaxed mb-6">Preserving ancient traditions and bringing divine grace to devotees worldwide through technology.</p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#c8923f] hover:text-white transition-colors cursor-pointer">f</div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#c8923f] hover:text-white transition-colors cursor-pointer">t</div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#c8923f] hover:text-white transition-colors cursor-pointer">in</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-serif mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#c8923f] transition-colors">About Temple</a></li>
                <li><a href="#sevas" className="hover:text-[#c8923f] transition-colors">Book Sevas</a></li>
                <li><a href="#schedule" className="hover:text-[#c8923f] transition-colors">Timings</a></li>
                <li><a href="#contact" className="hover:text-[#c8923f] transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-serif mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Live Darshan</a></li>
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">E-Hundi Donation</a></li>
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Accommodation</a></li>
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Volunteering</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-serif mb-6 text-lg">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-[#c8923f] transition-colors">Admin Login</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left gap-4">
            <div>&copy; {new Date().getFullYear()} {tName}. All rights reserved.</div>
            <div className="flex items-center gap-2">
              Built with <Heart size={14} className="text-[#c8923f]" /> by TempleAI
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
