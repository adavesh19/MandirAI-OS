'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Fingerprint, 
  ScanEye, 
  RadioTower, 
  Orbit, 
  Flame, 
  ShieldAlert, 
  Globe, 
  ChevronRight, 
  TrendingUp, 
  Utensils, 
  Gauge, 
  Terminal, 
  Compass, 
  Info, 
  CheckCircle2, 
  Cpu, 
  Database, 
  ShieldCheck 
} from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function AIOmniscientTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  
  // Custom terminal state for interactive grid widget
  const [terminalOutput, setTerminalOutput] = React.useState<string>('System initialized. Select a spiritual protocol below...')
  const [loadingProtocol, setLoadingProtocol] = React.useState<string | null>(null)
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `Connect directly with the temple's sentient AI core for personalized spiritual guidance, seva recommendations, and predictive astrology.`

  const runProtocol = (protocolName: string) => {
    setLoadingProtocol(protocolName)
    setTerminalOutput(`[nexus@omni-core ~]$ run-protocol --name=${protocolName}\nInitializing neural connection...\nQuerying planetary telemetry...`)
    
    setTimeout(() => {
      setLoadingProtocol(null)
      if (protocolName === 'astrology') {
        setTerminalOutput(
          `[nexus@omni-core ~]$ run-protocol --name=astrology\n` +
          `[STATUS: SUCCESS]\n` +
          `> Gotra Resonance Check: Active\n` +
          `> Current Transit: Moon entering Rohini Nakshatra (Vrishabha Rashi)\n` +
          `> Auspicious Timing: Brahma Muhurta in 14h 22m\n` +
          `> Daily Spiritual Coefficient: 98.4%\n` +
          `> Recommended Ritual: Abhishekam with saffron milk`
        )
      } else if (protocolName === 'mantra') {
        setTerminalOutput(
          `[nexus@omni-core ~]$ run-protocol --name=mantra\n` +
          `[STATUS: SUCCESS]\n` +
          `> Synthesizing spatial frequency: 432Hz\n` +
          `> Sanskrit Shloka: 🕉️ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं...\n` +
          `> Translation: Meditate on the spiritual effulgence of that adorable supreme divine reality...\n` +
          `> Auditory Waveform: Generated in real-time`
        )
      } else if (protocolName === 'gotra') {
        setTerminalOutput(
          `[nexus@omni-core ~]$ run-protocol --name=gotra\n` +
          `[STATUS: SUCCESS]\n` +
          `> Lineage Hash: SHA-256 (0x7e8a...9c4f)\n` +
          `> Gotra Origin: Sage Shandilya -> Kashyapa root lineage\n` +
          `> Spiritual Inheritance Score: +18.7%\n` +
          `> Karma Alignment Vector: Synced to morning archana`
        )
      }
    }, 1000)
  }

  return (
    <div className="bg-black min-h-screen font-sans text-white selection:bg-purple-900 selection:text-white overflow-hidden relative">
      
      {/* Background Neural Network Effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-full blur-[150px] animate-pulse mix-blend-screen opacity-30"></div>
      </div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 relative z-10">
          <BlockRenderer blocks={page.blocks} theme="modern" sevas={sevas} templeAddress={temple.address} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 min-h-[90vh] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              
              <div className="space-y-8 relative order-2 lg:order-1">
                
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md text-slate-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                    A.I. Guidance Active
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 tracking-tight leading-tight">
                  {titleText}
                </h1>
                
                <p className="text-xl text-white/60 font-light leading-relaxed max-w-lg">
                  {descText}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href={`/temple/${temple.slug}/donate`}
                    className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 overflow-hidden hover:shadow-[0_0_30px_rgba(192,38,211,0.3)]">
                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-fuchsia-600/50 to-violet-600/50 transition-all duration-300 group-hover:w-full"></div>
                    <span className="relative flex items-center gap-2 font-bold text-white">
                      <Sparkles className="h-5 w-5" /> Initiate Offering
                    </span>
                  </Link>
                  <a href="#sevas"
                    className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/10 rounded-2xl font-bold transition-all flex items-center gap-2 backdrop-blur-sm text-white/80 hover:text-white">
                    <Fingerprint className="h-5 w-5 text-fuchsia-400" /> Biometric Seva Login
                  </a>
                </div>
              </div>
              
              <div className="relative flex justify-center items-center order-1 lg:order-2 h-[400px] lg:h-auto">
                {/* The Omniscient Core Visualization */}
                <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px] flex items-center justify-center">
                  {/* Outer Rings */}
                  <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
                  <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-12 border border-dashed border-fuchsia-500/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  
                  {/* Glowing Core */}
                  <div className="absolute w-40 h-40 lg:w-64 lg:h-64 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse mix-blend-screen"></div>
                  
                  {/* Core Sphere */}
                  <div className="relative w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(192,38,211,0.5)] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    <ScanEye className="w-16 h-16 text-white/80" />
                  </div>

                  {/* Floating AI Chips */}
                  <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 animate-bounce" style={{ animationDelay: '0s' }}>
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 animate-bounce" style={{ animationDelay: '1s' }}>
                    <RadioTower className="w-6 h-6 text-fuchsia-400" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Capabilities Section */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10 bg-white/[0.02]">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black mb-4">Neural Architecture</h2>
              <p className="text-white/50 max-w-2xl mx-auto font-light">The temple operates on a decentralized AI grid, predicting needs and personalizing every devotee's journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Predictive Astrology', desc: 'Real-time planetary alignment analysis integrated with your birth chart.' },
                { title: 'Sentient Assistant', desc: '24/7 multilingual chatbot for instant queries and spiritual discourse.' },
                { title: 'Automated Rituals', desc: 'Smart scheduling and automated resource allocation for daily pujas.' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-[1px] mb-6">
                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 1. Astral Prediction Matrix (Astrology Grid) */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">// CELESTIAL METRIC MODULE</span>
                <h2 className="text-3xl lg:text-5xl font-black">Astral Prediction Matrix</h2>
              </div>
              <p className="text-white/50 max-w-md mt-4 md:mt-0">
                Planetary transits linked with decentralized astrological engines computation. Real-time celestial feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Planetary Alignment */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400">
                    <Orbit className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">ACCURATE</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Transit Tracking</h3>
                <div className="space-y-3 font-mono text-xs text-white/60">
                  <div className="flex justify-between">
                    <span>Jupiter:</span>
                    <span className="text-white">Rohini transit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sun:</span>
                    <span className="text-white">Mithuna Rashi</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moon Phase:</span>
                    <span className="text-white">Shukla Paksha</span>
                  </div>
                </div>
              </div>

              {/* Brahma Muhurta Countdown */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                    <Compass className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40">04:32 AM</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Muhurta Window</h3>
                <div className="space-y-3 font-mono text-xs text-white/60">
                  <div className="flex justify-between">
                    <span>Next Muhurta:</span>
                    <span className="text-white">Brahma Muhurta</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Countdown:</span>
                    <span className="text-cyan-400 animate-pulse">09h 14m 32s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rahu Kaal:</span>
                    <span className="text-red-400">15:00 - 16:30</span>
                  </div>
                </div>
              </div>

              {/* Gotra Resonance */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                    <Fingerprint className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/40">GENEALOGY</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Gotra Resonance</h3>
                <p className="text-xs text-white/60 mb-3 leading-relaxed">Lineage validation matching specific deity vibrations for optimized puja offerings.</p>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[88%] rounded-full"></div>
                </div>
              </div>

              {/* Astral Health Score */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">RESILIENT</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Spiritual Resonance</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">96.8</span>
                  <span className="text-xs text-emerald-400 font-mono">/100 (+1.2%)</span>
                </div>
                <p className="text-[10px] text-white/40 mt-3 font-mono">Dynamic index based on localized planetary resonance metrics.</p>
              </div>
            </div>
          </section>

          {/* 2. AI Pujari Console (Rituals Schedule) */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10 bg-white/[0.01]">
            <div className="text-center mb-16">
              <span className="text-fuchsia-400 font-mono text-xs uppercase tracking-widest block mb-2">// REALTIME SERVICE TELEMETRY</span>
              <h2 className="text-3xl lg:text-5xl font-black">AI Pujari Console</h2>
              <p className="text-white/50 max-w-2xl mx-auto mt-4">Telemetry of ongoing poojas and material optimizations synced directly with the sanctum sanctorum.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Active Ritual Stream */}
              <div className="lg:col-span-2 bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Active Sanctum Rituals
                  </h3>
                  <span className="text-xs font-mono text-white/40">5 Active Threads</span>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Maha Rudrabhishekam', devotee: 'Anirudh K.*', gotra: 'Vashistha', status: 'Pouring Panchamrit', progress: 85 },
                    { name: 'Shringar Alankara', devotee: 'Prasad family', gotra: 'Kashyapa', status: 'Deity Garland Decoration', progress: 40 },
                    { name: 'Sahasranama Archana', devotee: 'Meenakshi R.*', gotra: 'Bharadwaja', status: 'Mantra Chant Phase IV', progress: 95 }
                  ].map((ritual, idx) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/[0.04] transition-all">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">{ritual.name}</h4>
                        <div className="flex gap-4 text-xs font-mono text-white/50">
                          <span>Donor: {ritual.devotee}</span>
                          <span>Gotra: {ritual.gotra}</span>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
                        <span className="text-xs text-fuchsia-400 font-mono">{ritual.status}</span>
                        <div className="w-24 bg-zinc-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-full" style={{ width: `${ritual.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sacred Resource Telemetry */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                <h3 className="font-bold pb-4 border-b border-white/5 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-amber-500" />
                  Resource Telemetry
                </h3>
                
                <div className="space-y-6">
                  {/* Oil Meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-white/60">
                      <span>Sacred Ghee Reserve</span>
                      <span className="text-white">88% (440 Liters)</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[88%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Coconut Counter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-white/60">
                      <span>Coconuts Inventory</span>
                      <span className="text-white">1,240 Units</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full w-[65%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Flower Fresh-Meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-white/60">
                      <span>Tulsi & Flower Fresh-Meter</span>
                      <span className="text-emerald-400">OPTIMAL</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[94%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white/50 leading-relaxed flex gap-2">
                  <Info className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  Supply levels are monitored via real-time sensory grids to eliminate waste.
                </div>
              </div>
            </div>
          </section>

          {/* 3. Decentralized Devotion Ledger (Donation Stats) */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div>
                <span className="text-purple-400 font-mono text-xs uppercase tracking-widest block mb-2">// BLOCKCHAIN IMMUTABILITY</span>
                <h2 className="text-3xl lg:text-5xl font-black mb-6">Decentralized Devotion Ledger</h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  Every contribution is recorded with absolute security, generating cryptographic proof and transparent financial tracking hashes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Verified Hundi</p>
                    <p className="text-2xl font-black mt-1 text-white">100%</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Merit SV Points</p>
                    <p className="text-2xl font-black mt-1 text-purple-400">+1.4M</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl font-mono text-xs text-white/60 space-y-4">
                  <div className="flex justify-between items-center text-white pb-3 border-b border-white/5">
                    <span className="font-bold flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-purple-400" /> Devotional Ledger Log</span>
                    <span className="text-[10px] text-purple-400 bg-purple-950/40 px-2 py-0.5 border border-purple-900/40 rounded">BLOCK CHAIN LOCK</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { time: 'Just Now', user: 'Devotee #9928', amt: '₹1,001', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
                      { time: '2m ago', user: 'Devotee #1004', amt: '₹501', hash: '8f4a3d2e9c1b7f8e0a6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f' },
                      { time: '12m ago', user: 'Devotee #4821', amt: '₹11,000', hash: '3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4fe3b0c44298fc1c149afbf4c8' }
                    ].map((tx, idx) => (
                      <div key={idx} className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:border-white/10 transition-all">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400 font-bold">{tx.amt}</span>
                            <span className="text-[10px] text-white/30">{tx.user} ({tx.time})</span>
                          </div>
                          <p className="text-[10px] text-white/40 truncate max-w-sm sm:max-w-md font-mono">{tx.hash}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> RECORDED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Sentient Assistant Node (Terminal Sandbox) */}
          <section id="assistant" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10 bg-white/[0.01]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">// NEURAL SHELL</span>
                <h2 className="text-3xl lg:text-5xl font-black">Sentient Assistant Node</h2>
                <p className="text-white/60 leading-relaxed">
                  Interact with the temple's decentralized spiritual chatbot core. Select a query protocol below to trigger a live celestial synthesis.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => runProtocol('astrology')}
                    disabled={loadingProtocol !== null}
                    className="p-4 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 rounded-2xl font-mono text-xs text-left transition-all flex flex-col justify-between h-28 group cursor-pointer"
                  >
                    <Orbit className="h-5 w-5 text-cyan-400 group-hover:rotate-45 transition-transform" />
                    <span>Run Astrology Transit Query</span>
                  </button>
                  <button
                    onClick={() => runProtocol('mantra')}
                    disabled={loadingProtocol !== null}
                    className="p-4 bg-white/5 border border-white/10 hover:border-fuchsia-500/50 hover:bg-white/10 rounded-2xl font-mono text-xs text-left transition-all flex flex-col justify-between h-28 group cursor-pointer"
                  >
                    <Terminal className="h-5 w-5 text-fuchsia-400" />
                    <span>Generate Morning Mantra</span>
                  </button>
                  <button
                    onClick={() => runProtocol('gotra')}
                    disabled={loadingProtocol !== null}
                    className="p-4 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 rounded-2xl font-mono text-xs text-left transition-all flex flex-col justify-between h-28 group cursor-pointer"
                  >
                    <Fingerprint className="h-5 w-5 text-purple-400" />
                    <span>Validate Gotra Hash</span>
                  </button>
                </div>
              </div>

              {/* Terminal window */}
              <div className="bg-zinc-950 border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[320px]">
                <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Spiritual Core v1.4-beta</span>
                </div>
                <div className="flex-1 p-6 font-mono text-xs text-cyan-400 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                  {terminalOutput}
                  {loadingProtocol && (
                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Cyber Annadanam Kitchen (Kitchen Telemetry) */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-amber-500 font-mono text-xs uppercase tracking-widest block mb-2">// AUTOMATED CHARITY GRIDS</span>
                <h2 className="text-3xl lg:text-5xl font-black">Cyber Annadanam Tracker</h2>
              </div>
              <p className="text-white/50 max-w-md mt-4 md:mt-0">
                Tracking meals served, resource stock, and automated logistics supply grids for mass devotee distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Daily Meal Stats */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl hover:border-amber-500/50 transition-all flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-950/40 px-2 py-0.5 border border-amber-900/40 rounded">LIVE SUPPLY</span>
                </div>
                <div className="my-8">
                  <p className="text-stone-400 text-xs uppercase tracking-wider">Meals Served Today</p>
                  <p className="text-5xl font-black text-white mt-2">4,820</p>
                </div>
                <p className="text-xs text-white/50 leading-relaxed border-t border-white/5 pt-4">
                  Target threshold of 6,000 meals forecast dynamically by localized AI demand metrics.
                </p>
              </div>

              {/* Silo Capacity */}
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 border border-cyan-900/40 rounded">STOCKS</span>
                </div>
                
                <div className="my-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-white/50">
                      <span>Basmati Rice Silo:</span>
                      <span className="text-white">74%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[74%]"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-white/50">
                      <span>Flour & Grain Silo:</span>
                      <span className="text-white">92%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-fuchsia-400 h-full w-[92%]"></div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/50 leading-relaxed border-t border-white/5 pt-4">
                  Automated re-order triggers active. Zero-waste distribution optimization.
                </p>
              </div>

              {/* Sponsor A Meal */}
              <div className="bg-gradient-to-br from-amber-500/10 via-fuchsia-500/10 to-transparent border-2 border-fuchsia-500/30 rounded-3xl p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-fuchsia-400" />
                    Sponsor Annadanam
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Sponsor meals for 100 devotees. The AI logistics grid automatically routes your funds directly into raw materials purchasing ledger.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                    <span className="text-xs text-white/50">Sponsorship package:</span>
                    <span className="text-lg font-black text-white">₹5,100</span>
                  </div>
                  <Link href={`/temple/${temple.slug}/donate`}
                    className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-amber-600 hover:from-fuchsia-700 hover:to-amber-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
                    Sponsor Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
