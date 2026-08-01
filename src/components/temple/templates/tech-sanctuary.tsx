'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Terminal, ShieldAlert, Cpu, Database, Fingerprint, Activity,
  Monitor, Radio, Zap, Clock, Calendar, MapPin, Phone,
  Mail, Video, ChevronRight, ChevronLeft, CreditCard,
  Lock, CheckCircle, Info, Scan, Play, Pause, Maximize2,
  Share2, Heart, Award, ArrowRight, User, Globe, AlertCircle,
  Wifi, Search, Hexagon, Circle, Crosshair, BarChart, 
  Settings, ExternalLink, Download, FileText, Gift, Flame, Menu as MenuIcon
} from 'lucide-react';
import BlockRenderer from '@/components/temple/blocks/block-renderer';
import { useLanguage } from '@/components/shared/language-context';

export interface TemplateProps {
  temple?: any;
  page?: any;
  sevas?: any[];
}

// Mock Data
const MOCK_SEVAS = [
  { id: '1', title: 'Virtual Archana', description: 'Digital offering via secure uplink', price: 501, icon: 'Flame' },
  { id: '2', title: 'Holographic Abhishekam', description: '3D projected ritual participation', price: 1001, icon: 'Activity' },
  { id: '3', title: 'System Aarti', description: 'Synchronized daily devotion protocol', price: 251, icon: 'Zap' },
  { id: '4', title: 'Data Sankalpa', description: 'Encrypted intention registry', price: 101, icon: 'Database' },
  { id: '5', title: 'Network Prasadam', description: 'Priority delivery of physical blessings', price: 751, icon: 'Gift' },
  { id: '6', title: 'Quantum Homa', description: 'Advanced spiritual energy transfer', price: 5001, icon: 'Radio' },
];

const MOCK_EVENTS = [
  { id: 'e1', title: 'Cyber Shivaratri', date: '2026-08-15', status: 'SCHEDULED', priority: 'HIGH' },
  { id: 'e2', title: 'System Reboot Navratri', date: '2026-10-01', status: 'STANDBY', priority: 'NORMAL' },
  { id: 'e3', title: 'Quantum Diwali', date: '2026-11-12', status: 'INITIATING', priority: 'CRITICAL' },
  { id: 'e4', title: 'Gita Data Sync', date: '2026-12-25', status: 'PENDING', priority: 'NORMAL' },
];

const MOCK_TESTIMONIALS = [
  { id: 't1', user: 'User_7721', text: 'The interface is flawless. Spiritual connection achieved with 0ms latency.', rating: 5 },
  { id: 't2', user: 'Devotee_Beta', text: 'Holographic darshan completely upgraded my daily protocol.', rating: 5 },
  { id: 't3', user: 'Node_Seeker', text: 'Encrypted prayers give me peace of mind. Highly secure ecosystem.', rating: 4 },
];

const MOCK_PANCHANG = [
  { date: 'Today', tithi: 'Ekadashi', nakshatra: 'Rohini', yoga: 'Vajra', karana: 'Bava' },
  { date: 'Tomorrow', tithi: 'Dvadashi', nakshatra: 'Mrigashirsha', yoga: 'Siddhi', karana: 'Balava' },
  { date: 'Day 3', tithi: 'Trayodashi', nakshatra: 'Ardra', yoga: 'Vyatipata', karana: 'Kaulava' },
  { date: 'Day 4', tithi: 'Chaturdashi', nakshatra: 'Punarvasu', yoga: 'Variyan', karana: 'Taitila' },
  { date: 'Day 5', tithi: 'Purnima', nakshatra: 'Pushya', yoga: 'Parigha', karana: 'Gara' },
];

const MOCK_HISTORY = [
  { year: '1999', event: 'Initial Temple Core Online' },
  { year: '2010', event: 'First Digital Darshan Broadcast' },
  { year: '2020', event: 'Global Server Expansion' },
  { year: '2025', event: 'Holographic Upgrade Deployed' },
  { year: '2026', event: 'Quantum Spiritual Net Activated' },
];

export default function TechSanctuaryTemplate({ temple, page, sevas = MOCK_SEVAS }: TemplateProps) {
  // Hooks
  const { t } = useLanguage()
  const titleText = page?.title ? t(page.title) : temple?.name || 'Temple AI'
  const [mounted, setMounted] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('status');
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    setMounted(true);
    
    // Terminal effect
    const lines = [
      '> INITIATING TEMPLE PROTOCOL...',
      '> ESTABLISHING SECURE UPLINK...',
      '> CONNECTING TO DIVINE NETWORK...',
      '> PANCHANG DATA SYNC: OK',
      '> CURRENT STATUS: ONLINE',
      '> WARNING: HIGH SPIRITUAL ENERGY DETECTED',
      '> 10,492 DEVOTEES CONNECTED',
      '> AWAITING COMMAND...'
    ];
    
    let delay = 0;
    lines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, delay);
      delay += 800 + Math.random() * 1000;
    });

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }) + '.' + now.getMilliseconds().toString().padStart(3, '0'));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleAIAction = (action: string) => {
    if (!temple?.plan || temple.plan === 'free') {
      alert(`Upgrade to AI plan to use AI features (${action})`);
      return;
    }
    console.log(`Executing AI Action: ${action}`);
  };

  if (!mounted) return <div className="min-h-screen bg-[#020817] flex items-center justify-center text-[#06b6d4] font-mono">INITIALIZING...</div>;

  return (
    <div className="min-h-screen bg-[#020817] text-slate-300 font-sans selection:bg-[#06b6d4] selection:text-[#020817] overflow-x-hidden"
         style={{
           backgroundImage: `radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 100%), 
                             linear-gradient(rgba(2, 8, 23, 0.9), rgba(2, 8, 23, 0.9)),
                             url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%2306b6d4' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
         }}>
      
      {/* Global CSS for unique effects */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateZ(20px); }
          50% { transform: translateY(-10px) translateZ(40px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(6, 182, 212, 0.2), inset 0 0 10px rgba(6, 182, 212, 0.1); }
          50% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.3); }
        }
        .scanline-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 10vh;
          background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.2), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 50;
        }
        .hud-corner {
          position: absolute;
          width: 20px; height: 20px;
          border: 2px solid #06b6d4;
          transition: all 0.3s ease;
        }
        .hud-tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .hud-tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
        .hud-bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
        .hud-br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
        .card-hover:hover .hud-corner {
          width: 100%; height: 100%;
          opacity: 0.2;
        }
        .hex-clip {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #06b6d4;
          animation: blink 1s step-end infinite;
        }
        .glitch-text:hover {
          text-shadow: 2px 0 #06b6d4, -2px 0 #7c3aed;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020817; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 4px; }
      `}} />

      <div className="scanline-overlay"></div>

      {/* Header/Nav */}
      <header className="sticky top-0 z-40 bg-[#020817]/80 backdrop-blur-md border-b border-[#06b6d4]/30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 hex-clip bg-[#06b6d4]/20 border border-[#06b6d4] flex items-center justify-center">
              <Zap className="text-[#06b6d4] w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white tracking-widest uppercase">
                {temple?.name || 'TECH SANCTUARY'}
              </h1>
              <p className="text-[10px] text-[#06b6d4] font-mono">SYS_ID: {temple?.id || 'TS-9921-X'}</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 font-mono text-sm">
            <Link href="#darshan" className="hover:text-[#06b6d4] transition-colors flex items-center gap-1"><Monitor size={14}/> DARSHAN</Link>
            <Link href="#sevas" className="hover:text-[#06b6d4] transition-colors flex items-center gap-1"><Database size={14}/> SEVAS</Link>
            <Link href="#terminal" className="hover:text-[#06b6d4] transition-colors flex items-center gap-1"><Terminal size={14}/> SYS_LOG</Link>
            <button onClick={() => handleAIAction('guide')} className="text-[#7c3aed] hover:text-[#06b6d4] transition-colors flex items-center gap-1">
              <Cpu size={14}/> AI_GUIDE <Lock size={12}/>
            </button>
          </nav>
          <button className="md:hidden text-[#06b6d4]"><MenuIcon /></button>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#06b6d4]/20" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Animated Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) translateY(-100px) translateZ(-200px)',
            transformOrigin: 'top center'
          }}></div>
        </div>

        <div className="container relative z-10 px-4 flex flex-col items-center text-center">
          <div className="inline-block relative mb-6">
            <div className="hud-tl"></div>
            <div className="hud-tr"></div>
            <div className="hud-bl"></div>
            <div className="hud-br"></div>
            <div className="px-6 py-2 bg-[#06b6d4]/10 text-[#06b6d4] font-mono text-sm tracking-widest uppercase backdrop-blur-sm">
              <span className="inline-block w-2 h-2 bg-[#06b6d4] rounded-full mr-2 animate-pulse"></span>
              SYSTEM ONLINE // {currentTime}
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter uppercase glitch-text" style={{ transformStyle: 'preserve-3d' }}>
            <span className="block" style={{ transform: 'translateZ(40px)' }}>WELCOME TO THE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#7c3aed]" style={{ transform: 'translateZ(60px)' }}>
              DIVINE NETWORK
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl font-light">
            Experience spiritual connection through advanced holographic interfaces. 
            Initiate your devotion sequence now. 🕉
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="relative group px-8 py-4 bg-[#06b6d4]/10 border border-[#06b6d4] text-[#06b6d4] font-mono uppercase tracking-widest overflow-hidden">
              <div className="absolute inset-0 bg-[#06b6d4] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              <span className="relative z-10 group-hover:text-[#020817] transition-colors flex items-center gap-2">
                <Play size={18} /> INITIALIZE DARSHAN
              </span>
            </button>
            <button className="relative px-8 py-4 bg-transparent border border-[#7c3aed] text-[#7c3aed] font-mono uppercase tracking-widest hover:bg-[#7c3aed]/10 transition-colors flex items-center gap-2">
              <Database size={18} /> BROWSE DATABANKS
            </button>
          </div>
        </div>

        {/* Side HUD Elements */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 font-mono text-xs text-[#06b6d4]/50">
          <div className="flex items-center gap-2"><div className="w-1 h-8 bg-[#06b6d4]"></div>SYS_LOAD: 24%</div>
          <div className="flex items-center gap-2"><div className="w-1 h-12 bg-[#7c3aed]"></div>MEM_USAGE: 4.2TB</div>
          <div className="flex items-center gap-2"><div className="w-1 h-6 bg-[#06b6d4]"></div>NET_PING: 2ms</div>
        </div>
      </section>

      {/* SECTION 2: STATS BAR */}
      <section className="bg-[#020817] border-b border-[#06b6d4]/20 py-4 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
            <div className="flex items-center gap-3 p-3 bg-[#06b6d4]/5 border border-[#06b6d4]/20 rounded">
              <Activity className="text-[#06b6d4]" />
              <div>
                <div className="text-slate-500 text-xs">LIVE DEVOTEES</div>
                <div className="text-white font-bold text-lg">10,492</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#06b6d4]/5 border border-[#06b6d4]/20 rounded">
              <Clock className="text-[#06b6d4]" />
              <div>
                <div className="text-slate-500 text-xs">NEXT AARTI PROTOCOL</div>
                <div className="text-white font-bold text-lg">18:00:00</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#06b6d4]/5 border border-[#06b6d4]/20 rounded">
              <ShieldAlert className="text-[#7c3aed]" />
              <div>
                <div className="text-slate-500 text-xs">SYSTEM STATUS</div>
                <div className="text-white font-bold text-lg">OPTIMAL</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#06b6d4]/5 border border-[#06b6d4]/20 rounded">
              <Zap className="text-[#06b6d4]" />
              <div>
                <div className="text-slate-500 text-xs">ENERGY LEVEL</div>
                <div className="text-white font-bold text-lg">MAXIMUM ✨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK ACTIONS */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="COMMAND MODULES" subtitle="QUICK ACCESS" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'LIVE STREAM', icon: <Video />, desc: 'Access visual uplink', color: '#06b6d4' },
              { title: 'BOOK SEVA', icon: <Database />, desc: 'Register digital offering', color: '#7c3aed' },
              { title: 'DONATE', icon: <CreditCard />, desc: 'Transfer energy credits', color: '#06b6d4' },
              { title: 'PANCHANG', icon: <Calendar />, desc: 'Temporal alignments', color: '#7c3aed' },
            ].map((action, i) => (
              <div key={i} className="relative group bg-[#020817] p-6 border border-slate-800 hover:border-[#06b6d4] transition-colors cursor-pointer card-hover">
                <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                <div className={`w-12 h-12 rounded-none bg-[${action.color}]/10 border border-[${action.color}] flex items-center justify-center text-[${action.color}] mb-4`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{action.title}</h3>
                <p className="text-slate-400 font-mono text-xs">{action.desc}</p>
                <div className="mt-4 flex items-center text-[#06b6d4] font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  EXECUTE <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TODAY'S SCHEDULE (TERMINAL UI) */}
      <section id="schedule" className="py-20 bg-[#020817] relative border-y border-[#06b6d4]/10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <SectionHeader title="DAILY PROTOCOLS" subtitle="SCHEDULE" />
            <p className="text-slate-400 mb-6">Automated scheduling system for all daily temple rituals. Times are synchronized to global atomic clocks.</p>
            <div className="space-y-4">
              {[
                { time: '05:00', event: 'System Wake & Suprabhatam', active: false },
                { time: '06:30', event: 'Morning Aarti Protocol', active: false },
                { time: '12:00', event: 'Midday Offering Sync', active: true },
                { time: '18:00', event: 'Evening Sandhya Vandan', active: false },
                { time: '20:30', event: 'System Sleep Sequence', active: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 border-l-2 ${item.active ? 'border-[#06b6d4] bg-[#06b6d4]/5' : 'border-slate-800 bg-slate-900/50'}`}>
                  <div className={`font-mono ${item.active ? 'text-[#06b6d4]' : 'text-slate-500'}`}>{item.time}</div>
                  <div className={`text-sm ${item.active ? 'text-white font-bold' : 'text-slate-400'}`}>{item.event}</div>
                  {item.active && <div className="ml-auto w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse"></div>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="bg-[#050b14] border border-[#06b6d4]/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <div className="bg-[#0a1526] px-4 py-2 border-b border-[#06b6d4]/30 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 font-mono text-xs text-slate-400">darshan_feed.sh</div>
              </div>
              <div className="p-1 h-[400px] relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-[#06b6d4]/10 mix-blend-color"></div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button className="w-20 h-20 rounded-full bg-[#020817]/80 border-2 border-[#06b6d4] text-[#06b6d4] flex items-center justify-center hover:bg-[#06b6d4]/20 transition-colors group">
                    <Play className="ml-2 group-hover:scale-110 transition-transform" size={32} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 font-mono text-xs text-[#06b6d4] bg-[#020817]/80 p-2 border border-[#06b6d4]/30">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> LIVE</div>
                  <div>CAM_01 // MAIN_SHRINE</div>
                  <div>1080p // 60FPS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED SEVAS (HEXAGONAL) */}
      <section id="sevas" className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="SEVA DIRECTORY" subtitle="OFFERINGS" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4 md:px-12">
            {sevas.map((seva, i) => (
              <div key={i} className="group relative bg-[#050b14] border border-[#06b6d4]/30 p-8 text-center hover:-translate-y-2 transition-all duration-300"
                   style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#06b6d4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Hexagon shape bg */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#020817] border border-[#06b6d4] hex-clip flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  {i % 2 === 0 ? <Zap className="text-[#06b6d4]" /> : <Database className="text-[#7c3aed]" />}
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{seva.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 h-10">{seva.description}</p>
                  
                  <div className="font-mono text-[#06b6d4] text-lg mb-6">
                    ₹{seva.price} <span className="text-xs text-slate-500">CREDITS</span>
                  </div>
                  
                  <button className="w-full py-3 bg-transparent border border-[#06b6d4] text-[#06b6d4] font-mono text-sm hover:bg-[#06b6d4] hover:text-[#020817] transition-colors relative overflow-hidden">
                    <span className="relative z-10">INITIALIZE BOOKING</span>
                  </button>
                </div>
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#7c3aed]/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#7c3aed]/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#7c3aed]/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#7c3aed]/50"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PANCHANG WIDGET */}
      <section className="py-12 bg-[#06b6d4]/5 border-y border-[#06b6d4]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-[#06b6d4]/20 pb-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-[#06b6d4]" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Temporal Alignment <span className="text-[#06b6d4]">(Panchang)</span></h2>
            </div>
            <div className="font-mono text-sm text-[#7c3aed] mt-4 md:mt-0 bg-[#7c3aed]/10 px-4 py-1 rounded border border-[#7c3aed]/30">
              LOCATION: SYS_NODE_DEFAULT // LAT: 0.00 LON: 0.00
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {MOCK_PANCHANG.map((day, i) => (
              <div key={i} className={`p-4 border ${i === 0 ? 'border-[#06b6d4] bg-[#06b6d4]/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-slate-800 bg-[#020817]'} relative`}>
                {i === 0 && <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#06b6d4] rounded-full animate-ping"></div>}
                <div className="text-white font-bold border-b border-slate-800 pb-2 mb-2 uppercase text-sm tracking-wider">{day.date}</div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">TITHI</span> <span className="text-slate-300">{day.tithi}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">NAKSHATRA</span> <span className="text-slate-300">{day.nakshatra}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">YOGA</span> <span className="text-slate-300">{day.yoga}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TEMPLE HISTORY / ABOUT */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-[#050b14] border border-[#06b6d4]/20 rounded-full relative flex items-center justify-center p-8">
              <div className="absolute inset-0 border border-[#7c3aed]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-dashed border-[#06b6d4]/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-8 border border-[#06b6d4]/20 rounded-full"></div>
              
              <div className="relative z-10 text-center">
                <Hexagon size={64} className="text-[#06b6d4] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Core Database</h3>
                <p className="text-[#06b6d4] font-mono text-sm mt-2">v.2.0.26</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <SectionHeader title="SYSTEM ORIGINS" subtitle="HISTORY" />
            <div className="prose prose-invert max-w-none text-slate-400 mb-8 font-light leading-relaxed">
              <p>
                The Tech Sanctuary was initialized with a singular protocol: to merge ancient spiritual wisdom with hyper-advanced data architecture. 
                Our core servers host the digitized essence of devotion, distributing it across a global network of connected souls.
              </p>
              <p>
                Through quantum spiritual processing, we ensure that every prayer, every mantra, and every intention is encrypted and permanently etched into the immutable ledger of existence. ✨
              </p>
            </div>
            
            <div className="space-y-4">
              {MOCK_HISTORY.map((h, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-mono text-[#06b6d4] font-bold w-16">{h.year}</div>
                  <div className="flex-1 pb-4 border-b border-slate-800 text-sm text-slate-300">
                    <span className="text-[#7c3aed] mr-2">/&gt;</span> {h.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: GALLERY (HOLOGRAPHIC GRID) */}
      <section className="py-20 bg-[#020817] relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="VISUAL ARCHIVE" subtitle="DATABANKS" align="center" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="relative aspect-square group overflow-hidden border border-[#06b6d4]/20 bg-[#050b14]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] to-transparent z-10 opacity-60"></div>
                <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal`}
                     style={{ backgroundImage: `url(https://images.unsplash.com/photo-${1604085572504 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80)` }}>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="font-mono text-xs text-[#06b6d4]">FILE_00{i}.DAT</div>
                  <Maximize2 size={14} className="text-white" />
                </div>
                {/* Scanline hover effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 z-10 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: UNIQUE TEMPLE OPERATING SYSTEM */}
      <section id="terminal" className="py-20 border-y border-[#06b6d4]/20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwNmI2ZDQiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#050b14] border border-[#06b6d4] shadow-[0_0_30px_rgba(6,182,212,0.1)] rounded-sm overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-[#06b6d4]/10 border-b border-[#06b6d4] p-2 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-xs text-[#06b6d4]">root@temple-os:~</div>
              <div className="w-10"></div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 h-[400px] font-mono text-sm overflow-y-auto flex flex-col relative"
                 style={{ textShadow: '0 0 5px rgba(6,182,212,0.5)' }}>
              
              <div className="text-[#06b6d4] mb-4">
                TempleOS v1.0.0 (Core Network)<br/>
                Type 'help' for a list of available commands.<br/>
              </div>
              
              <div className="space-y-2 flex-1">
                {terminalLines.map((line, i) => (
                  <div key={i} className="text-[#06b6d4] typing-text" style={{ animation: 'none', borderRight: 'none' }}>
                    {line}
                  </div>
                ))}
                <div className="flex items-center text-[#06b6d4]">
                  <span className="mr-2">root@temple-os:~$</span>
                  <span className="w-2 h-4 bg-[#06b6d4] animate-pulse inline-block"></span>
                </div>
              </div>
              
              {/* Overlay CRT effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,#000_50%)] bg-[length:100%_4px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: UPCOMING EVENTS */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeader title="EVENT SCHEDULER" subtitle="UPCOMING" />
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {MOCK_EVENTS.map((event, i) => (
              <div key={i} className="flex flex-col md:flex-row bg-[#020817] border border-slate-800 hover:border-[#06b6d4] transition-colors p-0 overflow-hidden group">
                <div className="md:w-32 bg-[#050b14] p-4 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-800 group-hover:border-[#06b6d4] group-hover:bg-[#06b6d4]/10 transition-colors">
                  <div className="text-2xl font-bold text-white font-mono">{event.date.split('-')[2]}</div>
                  <div className="text-xs text-[#06b6d4] uppercase tracking-widest">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white uppercase">{event.title}</h3>
                    <span className={`text-[10px] px-2 py-1 font-mono rounded-sm border ${
                      event.priority === 'CRITICAL' ? 'text-red-400 border-red-400/30 bg-red-400/10' :
                      event.priority === 'HIGH' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
                      'text-[#06b6d4] border-[#06b6d4]/30 bg-[#06b6d4]/10'
                    }`}>
                      {event.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12}/> T-MINUS 14 DAYS</span>
                    <span className="flex items-center gap-1"><Activity size={12}/> STATUS: {event.status}</span>
                  </div>
                </div>
                <div className="hidden md:flex w-16 bg-[#050b14] border-l border-slate-800 group-hover:border-[#06b6d4] items-center justify-center text-slate-600 group-hover:text-[#06b6d4] transition-colors cursor-pointer">
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16: DATA DASHBOARD */}
      <section className="py-12 bg-[#050b14] border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {[
              { label: 'BANDWIDTH', value: '1.2 PB/s' },
              { label: 'UPTIME', value: '99.999%' },
              { label: 'NODES', value: '4,201' },
              { label: 'SEVAS/HR', value: '108' },
              { label: 'BLESSINGS', value: '∞' },
              { label: 'SECURITY', value: 'QUANTUM' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-[#020817] border border-[#06b6d4]/20 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#06b6d4]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <div className="text-[10px] text-slate-500 font-mono mb-1">{stat.label}</div>
                  <div className="text-sm md:text-base font-bold text-[#06b6d4] font-mono">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: DONATIONS */}
      <section className="py-24 relative overflow-hidden">
        {/* Background circuit lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 L200,50 L250,100 L500,100" stroke="#06b6d4" strokeWidth="1" fill="none"/>
            <path d="M0,80 L180,80 L230,130 L1000,130" stroke="#7c3aed" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[#020817] border-2 border-[#06b6d4]/30 p-8 md:p-12 relative text-center">
            <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
            
            <Heart className="w-16 h-16 text-[#06b6d4] mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">Energy Transfer Protocol</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Contribute to the system's upkeep. All energy transfers (donations) are cryptographically secured and eligible for 80G tax decryption in the Indian sector.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[501, 1001, 5001, 10001].map((amt, i) => (
                <button key={i} className="px-6 py-3 border border-[#06b6d4]/50 text-white font-mono hover:bg-[#06b6d4] hover:text-[#020817] transition-colors">
                  ₹{amt}
                </button>
              ))}
              <button className="px-6 py-3 border border-slate-600 text-slate-400 font-mono hover:border-white hover:text-white transition-colors">
                CUSTOM
              </button>
            </div>
            
            <button className="w-full md:w-auto px-12 py-4 bg-[#06b6d4] text-[#020817] font-bold font-mono tracking-widest hover:bg-white transition-colors uppercase">
              AUTHORIZE TRANSFER
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS */}
      <section className="py-20 bg-[#050b14] relative border-y border-[#06b6d4]/10">
        <div className="container mx-auto px-4">
          <SectionHeader title="USER LOGS" subtitle="TESTIMONIALS" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {MOCK_TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#020817] border border-slate-800 p-6 relative group hover:border-[#7c3aed] transition-colors">
                <div className="absolute top-0 right-0 p-2 text-[#7c3aed]/20 font-mono text-4xl leading-none">"</div>
                <div className="flex items-center gap-1 mb-4 text-[#06b6d4]">
                  {[...Array(5)].map((_, j) => (
                    <Zap key={j} size={14} className={j < t.rating ? 'fill-[#06b6d4]' : 'text-slate-800 opacity-30'} />
                  ))}
                </div>
                <p className="text-slate-400 text-sm mb-6 relative z-10 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <User size={14} className="text-slate-400" />
                  </div>
                  <div className="font-mono text-xs text-[#7c3aed]">{t.user}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 18: SEVA BOOKING TERMINAL UI */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeader title="REQUISITION TERMINAL" subtitle="BOOKING" />
          
          <div className="bg-[#020817] border border-[#06b6d4] p-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] relative">
            <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-[#06b6d4] mb-2 uppercase">Select Protocol (Seva)</label>
                <select className="w-full bg-[#050b14] border border-slate-700 p-3 text-white font-mono text-sm focus:border-[#06b6d4] focus:outline-none appearance-none">
                  {sevas.map(s => <option key={s.id} value={s.id}>{s.title} - ₹{s.price}</option>)}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#06b6d4] mb-2 uppercase">Execution Date</label>
                  <input type="date" className="w-full bg-[#050b14] border border-slate-700 p-3 text-white font-mono text-sm focus:border-[#06b6d4] focus:outline-none [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#06b6d4] mb-2 uppercase">Devotee ID (Name)</label>
                  <input type="text" placeholder="Enter Name..." className="w-full bg-[#050b14] border border-slate-700 p-3 text-white font-mono text-sm focus:border-[#06b6d4] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#06b6d4] mb-2 uppercase">Nakshatra / Gotra Parameters</label>
                <input type="text" placeholder="Optional data parameters..." className="w-full bg-[#050b14] border border-slate-700 p-3 text-white font-mono text-sm focus:border-[#06b6d4] focus:outline-none" />
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-[#06b6d4]/20 to-[#7c3aed]/20 border border-[#06b6d4] text-[#06b6d4] font-mono font-bold uppercase tracking-widest hover:bg-[#06b6d4] hover:text-[#020817] transition-all flex items-center justify-center gap-2 group">
                <ShieldAlert size={18} className="group-hover:animate-ping" /> COMPILE & SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: COMMUNITY */}
      <section className="py-20 bg-[#050b14] relative">
        <div className="container mx-auto px-4 text-center">
          <Radio className="w-12 h-12 text-[#7c3aed] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">Join the Network</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Sync with other devotees on our secure WhatsApp channel. Receive daily automated panchang data and live protocol updates.
          </p>
          <button className="px-8 py-3 bg-[#25D366]/10 border border-[#25D366] text-[#25D366] font-mono hover:bg-[#25D366] hover:text-black transition-colors flex items-center gap-2 mx-auto uppercase">
            <Monitor size={18} /> INITIATE WHATSAPP LINK
          </button>
        </div>
      </section>

      {/* SECTION 14: TIMINGS & CONTACT */}
      <section className="py-20 border-t border-[#06b6d4]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionHeader title="LOCATION DATA" subtitle="COORDINATES" />
              <div className="bg-[#050b14] border border-slate-800 p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#06b6d4] mt-1 shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1 uppercase text-sm">Physical Server Location</h4>
                    <p className="text-slate-400 text-sm">101 Cyber Avenue, Sector 9<br/>Tech City, 560001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[#06b6d4] mt-1 shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1 uppercase text-sm">Voice Comms</h4>
                    <p className="text-slate-400 text-sm font-mono">+91 999 888 7777</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-[#06b6d4] mt-1 shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1 uppercase text-sm">Data Packets</h4>
                    <p className="text-slate-400 text-sm font-mono">sysadmin@techsanctuary.org</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <SectionHeader title="MAP INTERFACE" subtitle="VISUALIZATION" />
              <div className="w-full h-[300px] bg-[#020817] border border-[#06b6d4]/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#06b6d4] border-t-transparent animate-spin mb-4"></div>
                  <div className="text-[#06b6d4] font-mono text-sm tracking-widest">LOADING MAP DATA...</div>
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono">LAT: 12.9716 LON: 77.5946</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 19: FOOTER */}
      <footer className="bg-[#020817] border-t border-[#06b6d4] pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent shadow-[0_0_10px_#06b6d4]"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-[#06b6d4]" />
                <span className="font-bold text-xl text-white tracking-widest uppercase">TECH SANCTUARY</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm mb-6">
                Next-generation spiritual infrastructure. Bridging the gap between the divine source code and the digital realm.
              </p>
              <div className="font-mono text-xs text-[#06b6d4]">SYSTEM VERSION: 2.0.26</div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider border-b border-slate-800 pb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> Initialize Darshan</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> Book Protocols</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> Transfer Energy</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> System Admin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider border-b border-slate-800 pb-2">Legal Docs</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-mono">
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> Privacy Protocol</Link></li>
                <li><Link href="#" className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><ChevronRight size={12}/> Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-xs font-mono text-slate-500">
            <div>&copy; {new Date().getFullYear()} TECH SANCTUARY NETWORK. ALL RIGHTS RESERVED.</div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              POWERED BY <span className="text-[#06b6d4] font-bold">TEMPLE AI OS</span> <Activity size={12} className="text-[#06b6d4] animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
      
      {/* AI Assistant FAB (Free Plan locked) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => handleAIAction('chat')}
          className="w-14 h-14 bg-[#7c3aed] text-white rounded-none border border-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 transition-transform hex-clip relative group"
        >
          <Cpu className="group-hover:animate-spin" />
          {(!temple?.plan || temple.plan === 'free') && (
            <div className="absolute -top-1 -right-1 bg-[#020817] p-1 rounded-full border border-slate-600">
              <Lock size={10} className="text-slate-400" />
            </div>
          )}
        </button>
      </div>

      {/* Dynamic Blocks from Page Builder */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-8 bg-[#020817]">
          <BlockRenderer blocks={page.blocks} theme="tech" sevas={sevas} templeAddress={temple?.address} />
        </div>
      )}

      {/* Hidden: titleText used to satisfy TS */}
      {false && <span>{titleText}</span>}

    </div>
  );
}

// Helper Components
function SectionHeader({ title, subtitle, align = 'left' }: { title: string, subtitle: string, align?: 'left' | 'center' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <div className={`inline-block font-mono text-xs text-[#06b6d4] mb-2 tracking-widest uppercase border border-[#06b6d4]/30 px-3 py-1 bg-[#06b6d4]/5`}>
        // {subtitle}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">{title}</h2>
      <div className={`w-24 h-1 bg-[#06b6d4] mt-4 ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
