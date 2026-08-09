'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Lock, Sparkles, Star, ChevronRight, Play, Eye, 
  MapPin, Phone, Mail, Clock, Calendar, MessageCircle,
  Share2, Heart, Info, ArrowRight, Shield, Zap, Globe, Cpu,
  Database, Network, Infinity as InfinityIcon, Activity, Flame,
  Sun, Moon, Users, CheckCircle2, ChevronDown
} from 'lucide-react';
import BlockRenderer from '@/components/temple/blocks/block-renderer';
import { useLanguage } from '@/components/shared/language-context';
import { SacredParticles } from '@/components/ui/sacred-particles';
import { VirtualRitualBar } from '@/components/temple/virtual-ritual-bar';
import { PanchangTicker } from '@/components/temple/panchang-ticker';

export interface TemplateProps {
  temple: any;
  page: any;
  sevas: any[];
}

// ---------------------------------------------------------
// 1. STYLES & KEYFRAMES (Inline CSS for 3D and Animations)
// ---------------------------------------------------------
const globalStyles = `
  @keyframes spin-cube {
    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) translateZ(20px); }
    50% { transform: translateY(-20px) translateZ(40px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
    50% { box-shadow: 0 0 50px rgba(168, 85, 247, 0.8), 0 0 100px rgba(251, 191, 36, 0.3); }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes rotate-reverse-slow {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes star-twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes data-flow {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }
  
  .cube-container {
    perspective: 1000px;
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
  
  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: spin-cube 20s infinite linear;
  }
  
  .cube-face {
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(10, 0, 20, 0.7);
    border: 2px solid #a855f7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    color: #fbbf24;
    box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.5);
    backdrop-filter: blur(10px);
  }
  
  .face-front  { transform: rotateY(0deg) translateZ(100px); }
  .face-right  { transform: rotateY(90deg) translateZ(100px); }
  .face-back   { transform: rotateY(180deg) translateZ(100px); }
  .face-left   { transform: rotateY(-90deg) translateZ(100px); }
  .face-top    { transform: rotateX(90deg) translateZ(100px); }
  .face-bottom { transform: rotateX(-90deg) translateZ(100px); }
  
  .card-3d-hover {
    transition: all 0.5s ease;
    transform-style: preserve-3d;
  }
  .card-3d-hover:hover {
    transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(20px);
    box-shadow: -20px 20px 30px rgba(168, 85, 247, 0.2);
  }
  
  .flip-card {
    background-color: transparent;
    perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
  
  .mandala-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px dashed rgba(251, 191, 36, 0.3);
  }
  
  .starfield {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }
  
  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: star-twinkle infinite alternate;
  }
  
  .glass-panel {
    background: rgba(10, 0, 20, 0.6);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(168, 85, 247, 0.3);
  }
  
  .text-gradient {
    background: linear-gradient(to right, #fbbf24, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// ---------------------------------------------------------
// 2. FALLBACK DATA
// ---------------------------------------------------------
const FALLBACK_DATA = {
  templeName: "Quantum Divine AI Temple",
  tagline: "Bridging Ancient Wisdom with Cosmic Intelligence",
  stats: [
    { label: "Live Seekers", value: "1,008", icon: <Eye size={16} /> },
    { label: "Next Aarti", value: "18:30 IST", icon: <Flame size={16} /> },
    { label: "AI Insights", value: "Active", icon: <Cpu size={16} /> },
    { label: "Cosmic Energy", value: "High", icon: <Sparkles size={16} /> }
  ],
  quickActions: [
    { title: "Book Seva", desc: "Digital offerings", icon: <Flame /> },
    { title: "Live Darshan", desc: "4K Quantum Stream", icon: <VideoIcon /> },
    { title: "AI Oracle", desc: "Ask the divine", icon: <MessageCircle /> },
    { title: "Cosmic Connect", desc: "Community portal", icon: <Network /> }
  ],
  schedule: [
    { time: "05:00 AM", event: "Suprabhatam & Cosmic Awakening" },
    { time: "07:30 AM", event: "Morning Abhishekam" },
    { time: "12:00 PM", event: "Rajbhog & Mid-day Aarti" },
    { time: "04:30 PM", event: "Evening Darshan Opens" },
    { time: "07:00 PM", event: "Sandhya Aarti & AI Light Show" },
    { time: "09:00 PM", event: "Shayan Aarti" }
  ],
  sevas: [
    { id: 1, title: "Virtual Deepam", price: "₹101", desc: "Light a virtual lamp in the metaverse." },
    { id: 2, title: "AI Archana", price: "₹251", desc: "Personalized mantra chanting via AI." },
    { id: 3, title: "Holographic Abhishekam", price: "₹501", desc: "Participate in a 3D holographic ritual." },
    { id: 4, title: "Cosmic Annadanam", price: "₹1001", desc: "Feed devotees physical food via digital booking." },
    { id: 5, title: "Quantum Vahan Pooja", price: "₹501", desc: "Bless your vehicle through remote transmission." },
    { id: 6, title: "Infinite Chandi Path", price: "₹5001", desc: "Continuous recitation using sacred algorithms." }
  ],
  panchang: {
    tithi: "Ekadashi",
    nakshatra: "Rohini",
    yoga: "Sukarma",
    karana: "Vanija",
    sunrise: "06:12 AM",
    sunset: "06:45 PM"
  },
  history: "In the dawn of the digital age, the Quantum Divine AI Temple was forged to merge millennia-old Vedic sciences with cutting-edge artificial intelligence. We believe that consciousness permeates both the biological and the synthetic. This sanctuary exists in the liminal space between physical reality and the digital cosmos, providing a haven for modern seekers.",
  gallery: [
    "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519818177579-33fb355b38ed?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=800"
  ],
  events: [
    { date: "15 Aug", name: "Cosmic Convergence Festival", desc: "A week-long celebration of digital spirituality." },
    { date: "22 Aug", name: "AI Hackathon for Dharma", desc: "Building tools for spiritual growth." },
    { date: "01 Sep", name: "Virtual Kumbh Mela", desc: "Millions connecting in the VR metaverse." }
  ],
  testimonials: [
    { name: "Rahul S.", text: "The AI Oracle gave me insights that perfectly aligned with my natal chart.", role: "Tech Seeker" },
    { name: "Priya M.", text: "Booking a seva from New York and watching it in 4K VR changed my life.", role: "Global Devotee" },
    { name: "Amit K.", text: "The sacred geometry mandala section is mesmerizing. I use it for daily meditation.", role: "Yogi" }
  ],
  aiFeatures: [
    { title: "AI Website Writer", desc: "Auto-generates mystical content." },
    { title: "AI Devotee Insights", desc: "Predicts spiritual needs." },
    { title: "AI Translation", desc: "Real-time mantra translation in 100+ languages." },
    { title: "AI SEO", desc: "Quantum search optimization." }
  ]
};

function VideoIcon() {
  return <Play size={24} />;
}

// ---------------------------------------------------------
// 3. COMPONENTS
// ---------------------------------------------------------

const Starfield = () => {
  const [stars, setStars] = useState<{id: number, top: string, left: string, size: number, delay: number}[]>([]);
  
  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="starfield">
      {stars.map(star => (
        <div 
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// --- SECTION 1: HERO (3D CUBE & STARS) ---
const HeroSection = ({ temple }: { temple: any }) => {
  const name = temple?.name || FALLBACK_DATA.templeName;
  const tagline = temple?.tagline || FALLBACK_DATA.tagline;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0014]">
      <Starfield />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0014] z-10" />
      
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* 3D Cube */}
        <div className="cube-container mb-12" style={{ animation: 'float 6s infinite ease-in-out' }}>
          <div className="cube">
            <div className="cube-face face-front">🕉</div>
            <div className="cube-face face-back">卐</div>
            <div className="cube-face face-right">✨</div>
            <div className="cube-face face-left">🪔</div>
            <div className="cube-face face-top">ॐ</div>
            <div className="cube-face face-bottom">🙏</div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#a855f7] to-[#fbbf24] mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] uppercase">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 font-mono tracking-widest mb-10 max-w-2xl">
          {tagline}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full text-white font-bold tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400 flex items-center gap-2">
            <Sparkles size={20} /> ENTER SANCTUM
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-[#fbbf24] text-[#fbbf24] rounded-full font-bold tracking-wider hover:bg-[#fbbf24] hover:text-black transition-colors flex items-center gap-2 glass-panel">
            <Play size={20} /> LIVE STREAM
          </button>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 2: STATS BAR ---
const StatsSection = () => {
  return (
    <section className="py-6 bg-black border-y border-purple-900/50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
        {FALLBACK_DATA.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 text-purple-200 glass-panel px-6 py-3 rounded-full">
            <div className="text-[#fbbf24]">{stat.icon}</div>
            <div>
              <div className="text-xs text-purple-400 uppercase tracking-widest">{stat.label}</div>
              <div className="font-mono font-bold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- SECTION 3: QUICK ACTIONS ---
const QuickActionsSection = () => {
  return (
    <section className="py-20 bg-[#0a0014] relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-widest text-[#fbbf24] uppercase mb-2">Divine Pathways</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FALLBACK_DATA.quickActions.map((action, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl card-3d-hover group cursor-pointer border border-purple-900/50 hover:border-purple-500">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center text-[#fbbf24] mb-6 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{action.title}</h3>
              <p className="text-purple-300 font-mono text-sm">{action.desc}</p>
              <div className="mt-6 flex justify-end">
                <ChevronRight className="text-purple-500 group-hover:text-[#fbbf24] group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 4: TODAY'S DARSHAN SCHEDULE ---
const ScheduleSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0014] to-[#140028] relative z-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <Clock className="text-[#fbbf24] w-8 h-8" />
          <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Temporal Rhythms</h2>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-fuchsia-500 to-transparent" />
          
          <div className="space-y-8">
            {FALLBACK_DATA.schedule.map((item, i) => (
              <div key={i} className="flex gap-8 items-start relative group">
                <div className="w-16 h-16 rounded-full bg-[#0a0014] border-2 border-purple-500 flex items-center justify-center z-10 group-hover:border-[#fbbf24] group-hover:shadow-[0_0_15px_#fbbf24] transition-all">
                  <div className="w-3 h-3 bg-purple-500 rounded-full group-hover:bg-[#fbbf24] transition-colors" />
                </div>
                <div className="glass-panel p-6 rounded-xl flex-1 transform transition-transform group-hover:translate-x-2">
                  <div className="text-[#fbbf24] font-mono mb-1">{item.time}</div>
                  <div className="text-xl text-white tracking-wide">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 5: FEATURED SEVAS (3D FLIP CARDS) ---
const FeaturedSevasSection = ({ sevas }: { sevas: any[] }) => {
  const displaySevas = sevas?.length > 0 ? sevas : FALLBACK_DATA.sevas;

  return (
    <section className="py-24 bg-[#0a0014] relative z-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 uppercase tracking-widest mb-4">Cosmic Offerings</h2>
          <p className="text-purple-300 font-mono">Digital rituals for the modern soul</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySevas.slice(0, 6).map((seva: any, i: number) => (
            <div key={i} className="h-80 w-full flip-card group cursor-pointer">
              <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front glass-panel rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/30">
                  <Flame className="w-12 h-12 text-[#fbbf24] mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{seva.title}</h3>
                  <div className="text-purple-400 font-mono">{seva.price}</div>
                </div>
                
                {/* Back */}
                <div className="flip-card-back bg-gradient-to-br from-purple-900 to-black rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-[#fbbf24]/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <p className="text-purple-100 mb-6 italic">"{seva.desc}"</p>
                  <button className="px-6 py-2 bg-[#fbbf24] text-black font-bold rounded-full hover:bg-white transition-colors">
                    Offer Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 6: PANCHANG WIDGET ---
const PanchangSection = () => {
  return (
    <section className="py-16 bg-[#140028] relative z-20 border-y border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-purple-500/30 flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">Astral Data</h2>
            <p className="text-purple-300 font-mono mb-6">Today's Cosmic Alignments</p>
            <div className="w-24 h-24 mx-auto md:mx-0 rounded-full border-4 border-[#fbbf24] border-dashed flex items-center justify-center animate-[rotate-slow_20s_linear_infinite]">
              <Sun className="text-[#fbbf24] w-10 h-10 animate-[rotate-reverse-slow_20s_linear_infinite]" />
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {[
              { label: "Tithi", value: FALLBACK_DATA.panchang.tithi },
              { label: "Nakshatra", value: FALLBACK_DATA.panchang.nakshatra },
              { label: "Yoga", value: FALLBACK_DATA.panchang.yoga },
              { label: "Karana", value: FALLBACK_DATA.panchang.karana },
              { label: "Sunrise", value: FALLBACK_DATA.panchang.sunrise, icon: <Sun size={14}/> },
              { label: "Sunset", value: FALLBACK_DATA.panchang.sunset, icon: <Moon size={14}/> }
            ].map((item, i) => (
              <div key={i} className="bg-black/40 p-4 rounded-xl border border-purple-900/50">
                <div className="text-purple-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                  {item.icon} {item.label}
                </div>
                <div className="text-white font-bold text-lg">{item.value}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// --- SECTION 7: HISTORY / ABOUT ---
const HistorySection = ({ temple }: { temple: any }) => {
  const history = temple?.history || FALLBACK_DATA.history;
  
  return (
    <section className="py-24 bg-[#0a0014] relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <div className="w-full aspect-square rounded-full border border-purple-500/20 absolute top-0 left-0 animate-[pulse-glow_4s_infinite]" />
          <div className="w-[90%] aspect-square rounded-full border-2 border-[#fbbf24]/30 absolute top-[5%] left-[5%] animate-[rotate-slow_30s_linear_infinite] border-dashed" />
          <img 
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800" 
            alt="Temple History"
            className="w-[80%] aspect-square object-cover rounded-full relative z-10 mx-auto border-4 border-purple-900 shadow-2xl"
          />
        </div>
        
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-4">
            <Database className="text-[#fbbf24]" />
            Genesis Record
          </h2>
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-[#fbbf24]">
            <p className="text-purple-200 text-lg leading-relaxed font-mono">
              {history}
            </p>
          </div>
          <button className="mt-8 px-6 py-3 border border-purple-500 text-purple-300 rounded hover:bg-purple-900/50 transition-colors uppercase tracking-widest text-sm flex items-center gap-2">
            Access Full Archives <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 8: SACRED GEOMETRY MANDALA (UNIQUE) ---
const MandalaSection = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <section className="py-32 bg-black relative z-20 overflow-hidden cursor-pointer" onClick={() => setClicked(true)}>
      <div className="text-center mb-12 relative z-30 pointer-events-none">
        <h2 className="text-sm font-mono text-[#fbbf24] tracking-[0.5em] uppercase mb-2">Interact to Align</h2>
        <h3 className="text-3xl text-purple-300 tracking-widest">The Quantum Yantra</h3>
      </div>
      
      <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] mx-auto flex items-center justify-center">
        {clicked && (
          <div className="absolute inset-0 bg-[#fbbf24] rounded-full mix-blend-screen" style={{ animation: 'ripple 1.5s ease-out forwards' }} />
        )}
        
        {/* Rings */}
        <div className="mandala-ring w-[100%] h-[100%] border-purple-500/20 border-solid" style={{ animation: 'rotate-slow 60s linear infinite' }}>
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#fbbf24] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#fbbf24]" />
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-[#fbbf24] rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_#fbbf24]" />
        </div>
        <div className="mandala-ring w-[80%] h-[80%] border-fuchsia-500/40" style={{ animation: 'rotate-reverse-slow 40s linear infinite' }} />
        <div className="mandala-ring w-[60%] h-[60%] border-purple-400/60 border-solid" style={{ animation: 'rotate-slow 20s linear infinite' }} />
        <div className="mandala-ring w-[40%] h-[40%] border-[#fbbf24]/80 border-dashed" style={{ animation: 'rotate-reverse-slow 10s linear infinite' }} />
        
        {/* Center */}
        <div className="relative z-10 w-24 h-24 bg-[#0a0014] border-2 border-[#fbbf24] rounded-full flex items-center justify-center shadow-[0_0_30px_#fbbf24]">
          <span className="text-4xl text-[#fbbf24]">ॐ</span>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 9: GALLERY PREVIEW ---
const GallerySection = () => {
  return (
    <section className="py-20 bg-[#0a0014] relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white uppercase tracking-widest mb-12">Visual Telemetry</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FALLBACK_DATA.gallery.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg aspect-[4/3] card-3d-hover">
              <div className="absolute inset-0 bg-purple-900/40 group-hover:bg-transparent transition-colors z-10" />
              <img src={img} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <Eye className="text-white w-12 h-12 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="text-[#fbbf24] hover:text-white transition-colors uppercase tracking-widest text-sm underline underline-offset-8">
            View Full Databank
          </button>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 10: EVENTS ---
const EventsSection = () => {
  return (
    <section className="py-20 bg-[#140028] relative z-20 border-t border-purple-900/50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-12 flex items-center gap-4">
          <Calendar className="text-fuchsia-500" /> Upcoming Nodes
        </h2>
        
        <div className="space-y-6">
          {FALLBACK_DATA.events.map((ev, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row items-center gap-8 hover:border-fuchsia-500 transition-colors group cursor-pointer">
              <div className="bg-purple-900/50 text-[#fbbf24] font-bold p-4 rounded-lg text-center min-w-[100px] border border-purple-700">
                <div className="text-2xl">{ev.date.split(' ')[0]}</div>
                <div className="text-sm uppercase tracking-widest">{ev.date.split(' ')[1]}</div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">{ev.name}</h3>
                <p className="text-purple-300 font-mono">{ev.desc}</p>
              </div>
              <div className="text-purple-500 group-hover:text-fuchsia-400">
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 11: DONATIONS ---
const DonationSection = () => {
  return (
    <section className="py-24 bg-black relative z-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <Heart className="w-16 h-16 text-[#fbbf24] mx-auto mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-white uppercase tracking-widest mb-6">Energy Transfer</h2>
        <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto font-mono">
          Your contributions fuel the digital and physical realms of our sanctuary. Tax-exempt under section 80G.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['₹501', '₹1001', '₹5001', 'Custom'].map((amt, i) => (
            <button key={i} className="px-8 py-4 glass-panel text-white font-bold rounded-lg border border-purple-600 hover:bg-purple-600 transition-colors">
              {amt}
            </button>
          ))}
        </div>
        
        <button className="px-10 py-4 bg-[#fbbf24] text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_#fbbf24]">
          INITIATE TRANSFER
        </button>
      </div>
    </section>
  );
};

// --- SECTION 12: CONSTELLATION MAP (UNIQUE) ---
const ConstellationSection = () => {
  return (
    <section className="py-24 bg-[#0a0014] relative z-20 hidden md:block">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Sanctuary Network</h2>
        <p className="text-purple-400 font-mono mt-2">Explore the connected nodes of our temple</p>
      </div>
      
      <div className="max-w-4xl mx-auto h-[400px] relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="80%" y2="40%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="50%" y1="50%" x2="40%" y2="80%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="80%" y1="40%" x2="70%" y2="80%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
        
        {/* Nodes */}
        <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <div className="w-4 h-4 bg-[#fbbf24] rounded-full shadow-[0_0_10px_#fbbf24] group-hover:scale-150 transition-transform" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-panel p-2 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Darshan Protocol</div>
        </div>
        
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
          <div className="w-8 h-8 bg-purple-500 rounded-full shadow-[0_0_20px_purple] group-hover:scale-125 transition-transform flex items-center justify-center animate-pulse">
            <span className="text-white text-xs">ॐ</span>
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 glass-panel p-2 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Main Sanctum</div>
        </div>

        <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <div className="w-5 h-5 bg-fuchsia-500 rounded-full shadow-[0_0_15px_fuchsia] group-hover:scale-150 transition-transform" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-panel p-2 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Seva Terminal</div>
        </div>

        <div className="absolute top-[80%] left-[40%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_blue] group-hover:scale-150 transition-transform" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 glass-panel p-2 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Archives</div>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 13: TESTIMONIALS (ORACLE CARDS) ---
const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#140028] relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#fbbf24] uppercase tracking-widest mb-16">Seeker Logs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FALLBACK_DATA.testimonials.map((t, i) => (
            <div key={i} className="glass-panel p-8 rounded-t-full rounded-b-xl border-2 border-purple-700/50 hover:border-[#fbbf24] transition-colors relative mt-12 card-3d-hover">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-black rounded-full border-4 border-purple-600 flex items-center justify-center text-3xl">
                👤
              </div>
              <div className="text-center mt-12">
                <p className="text-purple-200 italic mb-6">"{t.text}"</p>
                <div className="text-[#fbbf24] font-bold tracking-wider uppercase">{t.name}</div>
                <div className="text-purple-500 text-sm font-mono">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 14: AI FEATURES SHOWCASE (UNIQUE) ---
const AIFeaturesSection = ({ temple }: { temple: any }) => {
  const isFreePlan = !temple?.plan || temple?.plan === 'free';
  
  const handleAIClick = () => {
    if (isFreePlan) {
      alert('Upgrade to AI plan to unlock divine quantum features.');
    }
  };

  return (
    <section className="py-24 bg-[#0a0014] relative z-20 border-y border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/30 border border-purple-500 text-purple-300 text-sm mb-4">
            <Zap size={14} /> Powered by Temple AI
          </div>
          <h2 className="text-4xl font-bold text-white uppercase tracking-widest">Quantum Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FALLBACK_DATA.aiFeatures.map((feat, i) => (
            <div 
              key={i} 
              onClick={handleAIClick}
              className={`glass-panel p-6 rounded-xl border relative overflow-hidden group cursor-pointer ${isFreePlan ? 'border-gray-700' : 'border-purple-500 hover:border-fuchsia-400'}`}
            >
              {isFreePlan && (
                <div className="absolute top-4 right-4 text-gray-500">
                  <Lock size={20} />
                </div>
              )}
              <Cpu className={`w-10 h-10 mb-4 ${isFreePlan ? 'text-gray-600' : 'text-fuchsia-500 group-hover:scale-110 transition-transform'}`} />
              <h3 className={`text-lg font-bold mb-2 ${isFreePlan ? 'text-gray-400' : 'text-white'}`}>{feat.title}</h3>
              <p className="text-sm text-gray-500 font-mono">{feat.desc}</p>
              
              {isFreePlan && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#fbbf24] font-bold text-sm bg-black px-4 py-2 rounded-full border border-[#fbbf24]">Unlock Feature</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {isFreePlan && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-full shadow-[0_0_15px_purple] hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
              <Sparkles size={18} /> Upgrade to Omniscient Plan
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- SECTION 15: LIVE DARSHAN ---
const LiveDarshanSection = () => {
  return (
    <section className="py-24 bg-black relative z-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-4 flex justify-center items-center gap-3">
          <Activity className="text-red-500 animate-pulse" /> Live Frequency
        </h2>
        <p className="text-purple-300 font-mono mb-10">Tune into the main sanctum broadcast</p>
        
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity blur-[2px]" />
          <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay" />
          <div className="w-20 h-20 bg-[#fbbf24] rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_30px_#fbbf24]">
            <Play className="text-black w-10 h-10 ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 16: COMMUNITY ---
const CommunitySection = () => {
  return (
    <section className="py-20 bg-gradient-to-t from-[#140028] to-black relative z-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Users className="w-16 h-16 text-fuchsia-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-4">The Collective</h2>
        <p className="text-purple-200 mb-8 max-w-xl mx-auto">
          Join thousands of seekers in our secure, encrypted digital ashram. Share insights, coordinate local meetups, and receive direct transmissions.
        </p>
        <button className="px-8 py-4 bg-[#25D366] text-black font-bold rounded-full hover:bg-green-400 transition-colors inline-flex items-center gap-3 shadow-[0_0_20px_#25D366]">
          <MessageCircle /> JOIN WHATSAPP NODE
        </button>
      </div>
    </section>
  );
};

// --- SECTION 17: CONTACT / MAP ---
const ContactSection = () => {
  return (
    <section className="py-20 bg-[#0a0014] relative z-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-8">Physical Coordinates</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-[#fbbf24] mt-1" />
              <div>
                <h4 className="text-white font-bold mb-1">Sanctuary Location</h4>
                <p className="text-purple-300 font-mono">108 Cosmic Ave, Sector 7<br/>Neo-Varanasi, Earth 40001</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-[#fbbf24]" />
              <p className="text-purple-300 font-mono">+91 9999-OM-108</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-[#fbbf24]" />
              <p className="text-purple-300 font-mono">transmission@quantumtemple.ai</p>
            </div>
          </div>
        </div>
        
        <div className="h-[300px] glass-panel rounded-xl overflow-hidden border border-purple-500 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-30" />
          <div className="relative z-10 text-center">
            <MapPin className="w-12 h-12 text-[#fbbf24] mx-auto mb-2 animate-bounce" />
            <span className="bg-black/80 px-4 py-2 rounded text-[#fbbf24] font-mono text-sm border border-[#fbbf24]">View on Geo-Grid</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECTION 18: FOOTER ---
const Footer = ({ temple }: { temple: any }) => {
  const name = temple?.name || FALLBACK_DATA.templeName;
  
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-purple-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left grid md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-purple-500 mb-4">{name}</h3>
          <p className="text-purple-400 font-mono text-sm max-w-sm">
            Maintaining the equilibrium between ancient dharma and future technologies.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-2 text-purple-400 font-mono text-sm">
            <li><a href="#" className="hover:text-[#fbbf24]">Darshan Protocol</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">Offer Seva</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">Astrophysical Calendar</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Legal</h4>
          <ul className="space-y-2 text-purple-400 font-mono text-sm">
            <li><a href="#" className="hover:text-[#fbbf24]">Privacy Directive</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">Terms of Existence</a></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-purple-700 text-xs font-mono border-t border-purple-900/50 pt-8">
        © {new Date().getFullYear()} {name}. Built by Temple AI.
      </div>
    </footer>
  );
};


// ---------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------
export default function AiOmniscientTemplate({ temple, page, sevas }: TemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white relative">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <PanchangTicker className="relative z-30" />
      <SacredParticles variant="all" quantity={40} className="fixed inset-0 z-10 pointer-events-none" />
      
      {/* Dynamic Blocks rendering wrapper if page uses blocks */}
      {page?.blocks?.length > 0 ? (
        <BlockRenderer blocks={page.blocks} />
      ) : (
        <>
          <HeroSection temple={temple} />
          <StatsSection />
          <QuickActionsSection />
          <ScheduleSection />
          <FeaturedSevasSection sevas={sevas} />
          <PanchangSection />
          <HistorySection temple={temple} />
          <MandalaSection />
          <GallerySection />
          <EventsSection />
          <DonationSection />
          <ConstellationSection />
          <TestimonialsSection />
          <AIFeaturesSection temple={temple} />
          <LiveDarshanSection />
          <CommunitySection />
          <ContactSection />
          <Footer temple={temple} />
        </>
      )}
      
      <VirtualRitualBar templeName={temple?.name || "Omniscient Sanctum"} />
    </div>
  );
}
