"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Flame,
  Star,
  Sun,
  Moon,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Heart,
  Share2,
  Users,
  Video,
  PlayCircle,
  MessageCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  Activity,
  ArrowRight,
  Music,
  Lock,
  Sparkles,
  Zap,
  Globe,
  Bell,
  Camera,
  BookOpen
} from "lucide-react";
import BlockRenderer from "@/components/temple/blocks/block-renderer";
import { useLanguage } from "@/components/shared/language-context";

// ==========================================
// TYPES & PROPS
// ==========================================
export interface TemplateProps {
  temple: any;
  page: any;
  sevas: any[];
}

// ==========================================
// FALLBACK DATA
// ==========================================
const FALLBACK_DATA = {
  name: "Shri Cosmic Fire Temple",
  description: "Experience the eternal flame of devotion in the darkness.",
  stats: {
    liveViewers: 1405,
    nextAarti: "19:00",
    lampsLit: 10842,
    todayDevotees: 5430
  },
  schedule: [
    { time: "05:00 AM", event: "Mangala Aarti", icon: Sun, type: "morning" },
    { time: "07:30 AM", event: "Shringar Darshan", icon: Sparkles, type: "morning" },
    { time: "12:00 PM", event: "Rajbhog Aarti", icon: Flame, type: "noon" },
    { time: "04:00 PM", event: "Utthapan Darshan", icon: Sun, type: "evening" },
    { time: "07:00 PM", event: "Sandhya Aarti", icon: Moon, type: "evening" },
    { time: "09:00 PM", event: "Shayan Aarti", icon: Star, type: "night" }
  ],
  sevas: [
    { id: 1, title: "Deep Daan", price: "₹501", desc: "Light 108 lamps for ancestral peace.", flame: true },
    { id: 2, title: "Maha Havan", price: "₹5100", desc: "Participate in the grand cosmic fire ritual.", flame: true },
    { id: 3, title: "Akhand Jyot", price: "₹2100", desc: "Maintain the eternal flame for a month.", flame: true },
    { id: 4, title: "Aarti Seva", price: "₹1001", desc: "Special evening aarti on your behalf.", flame: true },
    { id: 5, title: "Bhasma Aarti", price: "₹3100", desc: "Sacred ash offering during morning rituals.", flame: true },
    { id: 6, title: "Purna Ahuti", price: "₹11000", desc: "Final offering in the grand yagna.", flame: true }
  ],
  panchang: {
    tithi: "Ekadashi",
    nakshatra: "Krittika (Fire Star)",
    yoga: "Ayushman",
    karana: "Bava",
    sunrise: "06:12 AM",
    sunset: "06:45 PM"
  },
  history: {
    title: "The Eternal Flame",
    content: "Legend has it that this temple was established where a meteor of cosmic fire once struck the earth, leaving behind an eternal flame that has never been extinguished. For centuries, seekers of truth have come to meditate upon this flame, finding clarity in the darkness."
  },
  events: [
    { id: 1, title: "Maha Shivratri Deepotsav", date: "March 8", desc: "100,000 lamps lit simultaneously." },
    { id: 2, title: "Kartik Purnima", date: "November 27", desc: "Cosmic river of fire ceremony." },
    { id: 3, title: "Navratri Havan", date: "October 15-24", desc: "Nine days of continuous fire rituals." }
  ],
  mantras: [
    { sanskrit: "ॐ भूर्भुवः स्वः", english: "Om Bhur Bhuva Svaha", meaning: "We meditate on the glory of the Creator..." },
    { sanskrit: "ॐ नमः शिवाय", english: "Om Namah Shivaya", meaning: "I bow to Shiva, the supreme reality." },
    { sanskrit: "असतो मा सद्गमय", english: "Asato Ma Sadgamaya", meaning: "Lead me from falsehood to truth." },
    { sanskrit: "तमसो मा ज्योतिर्गमय", english: "Tamaso Ma Jyotirgamaya", meaning: "Lead me from darkness to light." },
    { sanskrit: "मृत्योर्मा अमृतं गमय", english: "Mrityorma Amritam Gamaya", meaning: "Lead me from death to immortality." },
    { sanskrit: "ॐ शांति शांति शांति", english: "Om Shanti Shanti Shanti", meaning: "Om, Peace, Peace, Peace." },
    { sanskrit: "त्वमेव माता च पिता", english: "Tvameva Mata Cha Pita", meaning: "You are my mother and my father." },
    { sanskrit: "सर्वे भवन्तु सुखिनः", english: "Sarve Bhavantu Sukhinah", meaning: "May all beings be happy." }
  ],
  testimonials: [
    { text: "The meditation session here changed my life. The flame is truly mesmerizing.", author: "Raj K.", starPos: { top: "20%", left: "15%" } },
    { text: "I felt a cosmic connection during the Maha Havan. Unforgettable experience.", author: "Priya S.", starPos: { top: "60%", left: "80%" } },
    { text: "The midnight aarti is a spectacle of light and devotion.", author: "Amit P.", starPos: { top: "30%", left: "70%" } },
    { text: "Peaceful, divine, and incredibly powerful energy.", author: "Neha M.", starPos: { top: "75%", left: "25%" } },
    { text: "Lighting a diya here brings instant calm to my mind.", author: "Vikram R.", starPos: { top: "45%", left: "50%" } }
  ]
};

// ==========================================
// CSS STYLES (Keyframes & Effects)
// ==========================================
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      --bg-dark: #050100;
      --primary-orange: #f97316;
      --secondary-red: #dc2626;
      --accent-gold: #fbbf24;
    }
    body {
      background-color: var(--bg-dark);
      color: #ffffff;
      overflow-x: hidden;
    }
    
    /* Animations */
    @keyframes flicker {
      0%, 100% { opacity: 1; transform: scale(1) translateY(0); }
      25% { opacity: 0.8; transform: scale(1.05) translateY(-2px); }
      50% { opacity: 0.9; transform: scale(0.95) translateY(1px); }
      75% { opacity: 0.85; transform: scale(1.02) translateY(-1px); }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 20px 5px rgba(249, 115, 22, 0.4); }
      50% { box-shadow: 0 0 40px 15px rgba(249, 115, 22, 0.7), 0 0 80px 30px rgba(220, 38, 38, 0.4); }
    }
    @keyframes floatEmber {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
    }
    @keyframes rotateWheel {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes breatheInOut {
      0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: 0 0 20px var(--primary-orange); }
      50% { transform: scale(2.5); opacity: 0.9; box-shadow: 0 0 60px var(--accent-gold); }
    }
    @keyframes starTwinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    @keyframes fireGlowBottom {
      0%, 100% { box-shadow: 0 -10px 20px -5px rgba(249,115,22,0.5) inset; }
      50% { box-shadow: 0 -20px 40px -10px rgba(220,38,38,0.8) inset; }
    }

    /* Embers */
    .ember {
      position: absolute;
      background: radial-gradient(circle, #fbbf24 0%, #f97316 50%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10;
    }

    /* CSS Diya */
    .diya-container {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .diya-base {
      width: 80px;
      height: 40px;
      background: linear-gradient(135deg, #b45309, #78350f);
      border-radius: 10px 10px 40px 40px;
      position: absolute;
      bottom: 10px;
      box-shadow: inset -5px -5px 15px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.8);
      z-index: 2;
    }
    .diya-flame {
      width: 30px;
      height: 50px;
      background: radial-gradient(ellipse at bottom, #ffffff 10%, #fbbf24 40%, #f97316 70%, transparent 100%);
      border-radius: 50% 50% 20% 20% / 60% 60% 40% 40%;
      position: absolute;
      bottom: 45px;
      animation: flicker 0.15s infinite alternate, glowPulse 2s infinite;
      z-index: 3;
      filter: blur(1px);
    }
    .diya-wick {
      width: 4px;
      height: 15px;
      background: #1a0b02;
      position: absolute;
      bottom: 40px;
      z-index: 4;
      border-radius: 2px;
    }

    /* Mantra Wheel */
    .mantra-wheel {
      position: relative;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 2px dashed rgba(249, 115, 22, 0.3);
      animation: rotateWheel 60s linear infinite;
    }
    .mantra-item {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .mantra-text {
      position: absolute;
      left: 50%;
      top: -20px;
      transform: translateX(-50%);
      transform-origin: center 270px;
      font-size: 1.5rem;
      color: #fbbf24;
      cursor: pointer;
      text-shadow: 0 0 10px rgba(249, 115, 22, 0.8);
      transition: all 0.3s ease;
    }
    .mantra-text:hover, .mantra-text.active {
      color: #ffffff;
      text-shadow: 0 0 20px #ffffff, 0 0 40px #f97316;
      transform: translateX(-50%) scale(1.2);
    }
    .wheel-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: radial-gradient(circle, #f97316, transparent);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4rem;
      color: #fff;
      text-shadow: 0 0 20px #fff;
      z-index: 10;
      pointer-events: none;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #050100;
    }
    ::-webkit-scrollbar-thumb {
      background: #f97316;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #dc2626;
    }

    .glass-dark {
      background: rgba(15, 5, 0, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(249, 115, 22, 0.2);
    }
  `}} />
);

// ==========================================
// HELPERS
// ==========================================
const handleAIAction = (temple: any) => {
  if (!temple?.plan || temple.plan === 'free') {
    alert('Upgrade to AI plan to use AI features ✨');
    return false;
  }
  return true;
};

// ==========================================
// SECTIONS
// ==========================================

// 1. HERO SECTION
const HeroSection = ({ temple }: { temple: any }) => {
  const [lamps, setLamps] = useState(FALLBACK_DATA.stats.lampsLit);
  const [embers, setEmbers] = useState<any[]>([]);

  useEffect(() => {
    const newEmbers = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`
    }));
    setEmbers(newEmbers);
  }, []);

  const handleLightDiya = () => {
    setLamps(prev => prev + 1);
    // Add temporary burst of embers
    const burst = Array.from({ length: 10 }).map((_, i) => ({
      id: `burst-\${Date.now()}-\${i}`,
      left: '50%',
      top: '60%',
      size: `${Math.random() * 6 + 3}px`,
      duration: `1.5s`,
      delay: '0s'
    }));
    setEmbers(prev => [...prev.slice(-30), ...burst]);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,rgba(5,1,0,1)_70%)]" />
      
      {/* Embers */}
      {embers.map(ember => (
        <div
          key={ember.id}
          className="ember"
          style={{
            left: ember.left,
            top: ember.top,
            width: ember.size,
            height: ember.size,
            animation: `floatEmber \${ember.duration} \${ember.delay} infinite ease-in`
          }}
        />
      ))}

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
        {/* CSS Diya */}
        <div className="diya-container mb-8" style={{ transform: 'translateZ(50px)' }}>
          <div className="diya-flame" />
          <div className="diya-wick" />
          <div className="diya-base" />
        </div>

        <h1 
          className="text-6xl md:text-8xl font-black mb-6 tracking-wider uppercase"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #f97316, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(249,115,22,0.3)',
            transform: 'translateZ(30px)'
          }}
        >
          {temple?.name || FALLBACK_DATA.name}
        </h1>
        
        <p className="text-xl md:text-2xl text-amber-100/80 mb-12 max-w-2xl mx-auto" style={{ transform: 'translateZ(20px)' }}>
          {temple?.description || FALLBACK_DATA.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ transform: 'translateZ(40px)' }}>
          <button 
            onClick={handleLightDiya}
            className="group relative px-8 py-4 bg-orange-600 hover:bg-orange-500 rounded-full text-white font-bold text-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Flame className="w-6 h-6 animate-pulse" />
              Light a Diya 🪔
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button 
            onClick={() => handleAIAction(temple)}
            className="px-8 py-4 glass-dark rounded-full text-amber-400 font-bold text-lg hover:bg-white/5 transition-all flex items-center gap-2 border border-amber-500/30"
          >
            {(!temple?.plan || temple.plan === 'free') && <Lock className="w-5 h-5" />}
            Ask AI Pandit ✨
          </button>
        </div>

        <div className="mt-12 text-sm text-orange-200/60 font-mono tracking-widest">
          {lamps.toLocaleString()} DIYAS LIT TODAY
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ChevronRight className="w-8 h-8 rotate-90 text-orange-500" />
      </div>
    </section>
  );
};

// 2. STATS BAR
const StatsBar = () => (
  <section className="border-y border-orange-900/50 glass-dark py-4 relative z-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-orange-900/50">
        <div className="px-4">
          <div className="flex items-center justify-center gap-2 text-red-500 mb-1">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">Live Devotees</span>
          </div>
          <div className="text-2xl font-mono text-white">{FALLBACK_DATA.stats.liveViewers}</div>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Next Aarti</span>
          </div>
          <div className="text-2xl font-mono text-white">{FALLBACK_DATA.stats.nextAarti}</div>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Today's Visits</span>
          </div>
          <div className="text-2xl font-mono text-white">{FALLBACK_DATA.stats.todayDevotees}</div>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Cosmic Energy</span>
          </div>
          <div className="text-2xl font-mono text-white">Very High 🕉</div>
        </div>
      </div>
    </div>
  </section>
);

// 3. QUICK ACTIONS
const QuickActions = ({ temple }: { temple: any }) => {
  const actions = [
    { icon: Video, label: "Live Darshan", desc: "Watch now", color: "from-red-600 to-orange-600" },
    { icon: Heart, label: "Donate", desc: "80G Tax Benefit", color: "from-orange-600 to-amber-600" },
    { icon: BookOpen, label: "Book Seva", desc: "Offer prayers", color: "from-amber-600 to-yellow-600" },
    { icon: MessageCircle, label: "AI Guide", desc: "Ask anything", color: "from-purple-600 to-red-600", ai: true }
  ];

  return (
    <section className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => action.ai && handleAIAction(temple)}
              className="group relative h-40 rounded-2xl overflow-hidden glass-dark hover:scale-105 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br \${action.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ transform: 'translateZ(20px)' }}>
                <action.icon className="w-10 h-10 text-white mb-3 group-hover:animate-bounce" />
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {action.label}
                  {action.ai && (!temple?.plan || temple.plan === 'free') && <Lock className="w-4 h-4 text-amber-400" />}
                </h3>
                <p className="text-sm text-gray-300">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. DARSHAN SCHEDULE
const ScheduleSection = () => (
  <section className="py-20 bg-black/50 relative z-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-widest">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            Divine Timeline
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FALLBACK_DATA.schedule.map((item, idx) => (
          <div 
            key={idx}
            className="glass-dark p-6 rounded-xl border border-orange-900/30 flex items-center gap-6 hover:bg-orange-900/20 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-orange-950/50 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <item.icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-amber-400 mb-1">{item.time}</div>
              <div className="text-lg text-white font-medium">{item.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 5. FEATURED SEVAS (FIRE GRID)
const SevaGrid = ({ sevas = FALLBACK_DATA.sevas }) => (
  <section className="py-24 relative z-20 overflow-hidden">
    {/* Decorative background flames */}
    <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-4 relative">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-2">Sacred Offerings</h2>
          <p className="text-orange-200/60">Participate in the cosmic rituals</p>
        </div>
        <button className="text-orange-500 hover:text-orange-400 font-bold flex items-center gap-2">
          View All <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
        {sevas.slice(0, 6).map((seva: any) => (
          <div 
            key={seva.id}
            className="group relative glass-dark rounded-2xl p-8 border border-orange-900/50 transition-all duration-500 hover:-translate-y-2"
            style={{ 
              transformStyle: 'preserve-3d',
              animation: 'fireGlowBottom 3s infinite alternate' 
            }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Flame className="w-16 h-16 text-orange-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2" style={{ transform: 'translateZ(30px)' }}>
              {seva.title}
            </h3>
            <p className="text-gray-400 mb-6 min-h-[48px]" style={{ transform: 'translateZ(20px)' }}>
              {seva.desc || "A divine offering to the cosmic fire."}
            </p>
            
            <div className="flex items-center justify-between mt-auto" style={{ transform: 'translateZ(40px)' }}>
              <span className="text-xl font-mono text-amber-400 font-bold">
                {seva.price || "₹501"}
              </span>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all">
                Offer Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 6. PANCHANG
const PanchangSection = () => (
  <section className="py-20 border-y border-orange-900/30 bg-[#0a0200] relative z-20">
    <div className="max-w-5xl mx-auto px-4">
      <div className="glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Calendar className="text-orange-500" /> Today's Panchang
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-orange-500/60 text-sm uppercase mb-1">Tithi</p>
                <p className="text-xl font-bold text-white">{FALLBACK_DATA.panchang.tithi}</p>
              </div>
              <div>
                <p className="text-orange-500/60 text-sm uppercase mb-1">Nakshatra</p>
                <p className="text-xl font-bold text-amber-400">{FALLBACK_DATA.panchang.nakshatra}</p>
              </div>
              <div>
                <p className="text-orange-500/60 text-sm uppercase mb-1">Yoga</p>
                <p className="text-xl font-bold text-white">{FALLBACK_DATA.panchang.yoga}</p>
              </div>
              <div>
                <p className="text-orange-500/60 text-sm uppercase mb-1">Karana</p>
                <p className="text-xl font-bold text-white">{FALLBACK_DATA.panchang.karana}</p>
              </div>
            </div>
          </div>
          
          <div className="w-px h-32 bg-orange-900/50 hidden md:block" />
          
          <div className="flex gap-8">
            <div className="text-center">
              <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-1">Sunrise</p>
              <p className="font-mono text-white font-bold">{FALLBACK_DATA.panchang.sunrise}</p>
            </div>
            <div className="text-center">
              <Moon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-1">Sunset</p>
              <p className="font-mono text-white font-bold">{FALLBACK_DATA.panchang.sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 7. MANTRA WHEEL (UNIQUE)
const MantraWheelSection = () => {
  const [activeMantra, setActiveMantra] = useState(0);
  const mantras = FALLBACK_DATA.mantras;

  return (
    <section className="py-32 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-4">
            Cosmic Resonance
          </h2>
          <p className="text-orange-200/60 max-w-2xl mx-auto">
            Click on a mantra in the rotating wheel to channel its energy.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* The Wheel */}
          <div className="relative w-[500px] h-[500px] flex-shrink-0">
            <div className="wheel-center">
              ॐ
            </div>
            <div className="mantra-wheel">
              {mantras.map((mantra, idx) => {
                const angle = (360 / mantras.length) * idx;
                return (
                  <div 
                    key={idx}
                    className="mantra-item"
                    style={{ transform: `rotate(\${angle}deg)` }}
                  >
                    <div 
                      className={`mantra-text \${activeMantra === idx ? 'active' : ''}`}
                      onClick={() => setActiveMantra(idx)}
                      style={{ 
                        // Counter-rotate the text so it stays upright relative to its position, 
                        // but since the wheel rotates, it's a complex effect. We'll just let it spin for cosmic effect.
                      }}
                    >
                      {mantra.sanskrit.split(' ')[0]} {/* Just show first word on wheel for space */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Mantra Details */}
          <div className="glass-dark p-8 rounded-2xl max-w-md w-full border-l-4 border-orange-500">
            <div className="text-orange-500 mb-4">
              <Music className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-amber-400 mb-2">
              {mantras[activeMantra].sanskrit}
            </h3>
            <p className="text-xl font-mono text-white mb-6">
              "{mantras[activeMantra].english}"
            </p>
            <div className="h-px w-full bg-gradient-to-r from-orange-500 to-transparent mb-6" />
            <p className="text-gray-300 italic leading-relaxed">
              Meaning: {mantras[activeMantra].meaning}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 8. ABOUT / HISTORY
const HistorySection = () => (
  <section className="py-24 relative z-20 bg-black/80">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative h-[500px] rounded-3xl overflow-hidden glass-dark group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542841791-dd2d08a0ebc9?q=80&w=1000')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050100] via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8">
          <Flame className="w-12 h-12 text-orange-500 mb-4" />
          <h3 className="text-2xl font-bold text-white">The Origin</h3>
        </div>
      </div>
      
      <div>
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 uppercase tracking-widest mb-6">
          {FALLBACK_DATA.history.title}
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {FALLBACK_DATA.history.content}
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          The architecture is designed to capture and amplify this cosmic energy. The dark stone walls provide the perfect canvas for the mesmerizing play of light and shadow, reminding us that light is only appreciated in the presence of darkness.
        </p>
        <button className="px-8 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors rounded-full font-bold uppercase tracking-wider">
          Read Full History
        </button>
      </div>
    </div>
  </section>
);

// 9. GALLERY (MASONRY)
const GallerySection = () => {
  // Placeholder images tinted orange/red
  const images = [
    { h: 'h-64', bg: 'bg-orange-950' },
    { h: 'h-96', bg: 'bg-red-950' },
    { h: 'h-80', bg: 'bg-amber-950' },
    { h: 'h-72', bg: 'bg-orange-900' },
    { h: 'h-64', bg: 'bg-red-900' },
    { h: 'h-80', bg: 'bg-amber-900' },
  ];

  return (
    <section className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-white uppercase tracking-widest">Glimpses of the Divine</h2>
          <Camera className="w-8 h-8 text-orange-500" />
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative \${img.h} \${img.bg} rounded-xl overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-100">
                <Sparkles className="w-12 h-12 text-white/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 10. UPCOMING EVENTS
const EventsSection = () => (
  <section className="py-24 bg-[#0a0200] border-y border-orange-900/30 relative z-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-black text-center text-white uppercase tracking-widest mb-16">
        Upcoming Cosmic Events
      </h2>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {FALLBACK_DATA.events.map((event) => (
          <div key={event.id} className="glass-dark p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 group hover:border-orange-500 transition-colors">
            <div className="text-center md:text-left min-w-[150px]">
              <div className="text-orange-500 font-mono font-bold uppercase tracking-wider">{event.date}</div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{event.title}</h3>
              <p className="text-gray-400">{event.desc}</p>
            </div>
            
            <div>
              <button className="px-6 py-2 rounded-full border border-gray-600 text-gray-300 hover:text-white hover:border-white transition-all whitespace-nowrap">
                Remind Me <Bell className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 11. DONATIONS
const DonationSection = () => (
  <section className="py-32 relative z-20 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(220,38,38,0.15)_0%,transparent_50%)]" />
    <div className="max-w-4xl mx-auto px-4 text-center relative">
      <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
      <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-6">Support the Eternal Flame</h2>
      <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        Your contributions help us keep the cosmic fire burning and support our community outreach programs.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[501, 1001, 5100, 11000].map((amount) => (
          <button key={amount} className="glass-dark py-4 text-xl font-mono text-amber-400 hover:bg-orange-600 hover:text-white transition-all rounded-xl border border-orange-900/50">
            ₹{amount}
          </button>
        ))}
      </div>
      
      <button className="px-12 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 transition-transform">
        Custom Amount
      </button>
      
      <p className="mt-6 text-sm text-gray-500 uppercase tracking-widest">
        All donations are 80G tax exempted
      </p>
    </div>
  </section>
);

// 12. NIGHT SKY TESTIMONIALS (UNIQUE)
const NightSkyTestimonials = () => (
  <section className="py-32 relative z-20 overflow-hidden min-h-[600px] bg-black">
    {/* CSS Stars */}
    {Array.from({ length: 100 }).map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: Math.random() * 3 + 'px',
          height: Math.random() * 3 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          opacity: Math.random() * 0.7 + 0.1,
          animation: `starTwinkle \${Math.random() * 5 + 3}s infinite alternate`
        }}
      />
    ))}

    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
      <h2 className="text-5xl font-black text-white/20 uppercase tracking-widest text-center">
        Divine Constellation
      </h2>
    </div>

    {/* Testimonial Nodes */}
    {FALLBACK_DATA.testimonials.map((test, idx) => (
      <div 
        key={idx}
        className="absolute group cursor-pointer"
        style={{ top: test.starPos.top, left: test.starPos.left }}
      >
        {/* Star node */}
        <div className="w-4 h-4 bg-amber-200 rounded-full shadow-[0_0_15px_#fbbf24] animate-pulse relative z-10" />
        
        {/* Hover card */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 glass-dark p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-y-4 group-hover:translate-y-0 duration-300">
          <p className="text-sm text-white italic mb-2">"{test.text}"</p>
          <p className="text-xs text-orange-400 font-bold text-right">- {test.author}</p>
          
          {/* Triangle pointer */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-900/50" />
        </div>
      </div>
    ))}
  </section>
);

// 13. LIVE DARSHAN
const LiveDarshanSection = () => (
  <section className="py-24 relative z-20">
    <div className="max-w-5xl mx-auto px-4">
      <div className="glass-dark rounded-3xl p-2 md:p-4 relative group">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full" /> LIVE
        </div>
        
        <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center">
          {/* Fake stream background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(249,115,22,0.2)_0%,rgba(0,0,0,1)_100%)]" />
          <Flame className="w-32 h-32 text-orange-500/20 absolute" />
          
          <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors z-20 group">
            <PlayCircle className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Garbhagriha Live Stream</h3>
          <p className="text-gray-400">Experience the eternal flame from anywhere in the cosmos.</p>
        </div>
      </div>
    </div>
  </section>
);

// 14. MEDITATION (UNIQUE)
const MeditationSection = () => (
  <section className="py-32 bg-black relative z-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
    <div className="text-center mb-20 relative z-20">
      <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Focus & Breathe</h2>
      <p className="text-orange-500 font-mono">4-7-8 Breathing with the Divine</p>
    </div>

    {/* Breathing Circle */}
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div 
        className="absolute inset-0 rounded-full border-2 border-orange-500/50"
        style={{ animation: 'breatheInOut 11s infinite ease-in-out' }}
      />
      <div 
        className="absolute inset-4 rounded-full border border-amber-500/30"
        style={{ animation: 'breatheInOut 11s infinite ease-in-out', animationDelay: '0.5s' }}
      />
      <div 
        className="absolute inset-8 rounded-full bg-gradient-to-tr from-orange-900 to-black"
        style={{ animation: 'breatheInOut 11s infinite ease-in-out', animationDelay: '1s' }}
      />
      
      <div className="relative z-10 text-center">
        <Flame className="w-12 h-12 text-orange-500 mx-auto mb-2" />
        <span className="text-white font-mono text-xl tracking-widest">ॐ</span>
      </div>
    </div>

    <div className="mt-20 text-gray-500 max-w-md text-center italic">
      "Watch the circle. Inhale as it expands, hold, exhale as it contracts. Let the cosmic fire purify your thoughts."
    </div>
  </section>
);

// 15. COMMUNITY / WHATSAPP
const CommunitySection = () => (
  <section className="py-24 relative z-20 border-t border-orange-900/30 bg-[#050100]">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <Globe className="w-16 h-16 text-blue-500 mx-auto mb-6" />
      <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-widest">Join the Cosmic Circle</h2>
      <p className="text-lg text-gray-400 mb-10">
        Connect with thousands of seekers worldwide. Get daily darshan, panchang updates, and spiritual wisdom directly on WhatsApp.
      </p>
      <button className="px-10 py-4 bg-[#25D366] text-black font-black text-lg rounded-full hover:bg-white transition-colors flex items-center gap-3 mx-auto">
        <MessageCircle className="w-6 h-6" />
        Join WhatsApp Group
      </button>
    </div>
  </section>
);

// 16. TIMINGS + MAP + CONTACT
const InfoSection = () => (
  <section className="py-24 relative z-20 glass-dark">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="text-xl font-bold text-orange-500 mb-6 flex items-center gap-2 uppercase tracking-wider">
          <Clock className="w-5 h-5" /> Timings
        </h3>
        <ul className="space-y-4 text-gray-300">
          <li className="flex justify-between border-b border-gray-800 pb-2">
            <span>Morning Darshan</span> <span>05:00 AM - 12:00 PM</span>
          </li>
          <li className="flex justify-between border-b border-gray-800 pb-2">
            <span>Evening Darshan</span> <span>04:00 PM - 09:00 PM</span>
          </li>
          <li className="flex justify-between pb-2 text-amber-500 font-bold">
            <span>Maha Aarti</span> <span>07:00 PM Daily</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold text-orange-500 mb-6 flex items-center gap-2 uppercase tracking-wider">
          <Phone className="w-5 h-5" /> Contact
        </h3>
        <ul className="space-y-4 text-gray-300">
          <li className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" /> cosmic@temple.com
          </li>
          <li className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" /> +91 98765 43210
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-1" />
            <span>108 Cosmic Way, Spiritual District,<br/>Himalayas, India 249201</span>
          </li>
        </ul>
      </div>

      <div className="h-64 bg-gray-900 rounded-xl flex items-center justify-center border border-orange-900/30">
        {/* Placeholder for map */}
        <div className="text-center text-gray-500">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Interactive Map</p>
        </div>
      </div>
    </div>
  </section>
);

// 17. FOOTER
const Footer = () => (
  <footer className="py-8 bg-black text-center text-gray-600 border-t border-gray-900 relative z-20">
    <p>© {new Date().getFullYear()} Shri Cosmic Fire Temple. All rights reserved.</p>
    <p className="text-sm mt-2 flex items-center justify-center gap-1">
      Powered by <Flame className="w-3 h-3 text-orange-600" /> Temple AI
    </p>
  </footer>
);

// ==========================================
// MAIN EXPORT
// ==========================================
export default function DivineGlowTemplate(props: TemplateProps) {
  const { temple, sevas } = props;

  return (
    <div className="min-h-screen bg-[#050100] text-white selection:bg-orange-500 selection:text-white font-sans">
      <GlobalStyles />
      
      <main>
        <HeroSection temple={temple} />
        <StatsBar />
        <QuickActions temple={temple} />
        <ScheduleSection />
        <SevaGrid sevas={sevas && sevas.length > 0 ? sevas : FALLBACK_DATA.sevas} />
        <PanchangSection />
        <MantraWheelSection />
        <HistorySection />
        <GallerySection />
        <EventsSection />
        <DonationSection />
        <NightSkyTestimonials />
        <LiveDarshanSection />
        <MeditationSection />
        <CommunitySection />
        <InfoSection />
      </main>

      <Footer />
    </div>
  );
}
