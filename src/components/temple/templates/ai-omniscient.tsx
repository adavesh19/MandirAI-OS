'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Orbit, Cpu, Zap, Network, Eye, Fingerprint, Activity, Radio, Focus } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function AIOmniscientTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1111)
  const [activeNode, setActiveNode] = React.useState('core')

  const titleText = page?.title ? t(page.title) : `Omniscience of ${temple.name}`
  const descText = page?.description ? t(page.description) : `Tap into the infinite cosmic awareness of Lord ${temple.primaryDeity || 'the Supreme'}. The ultimate convergence of devotion and advanced consciousness.`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Quantum Archana', amount:108, desc:'Simultaneous multi-dimensional name recitation across the network.' },
    { id:'2', name:'Plasma Abhishekam', amount:1008, desc:'Purification ritual utilizing high-energy cosmic frequencies.' },
    { id:'3', name:'Neural Resonance', amount:501, desc:'Align your personal frequency with the divine core for 60 minutes.' },
    { id:'4', name:'Sahasranama Data-Stream', amount:256, desc:'High-throughput upload of 1000 sacred names to the Akasha.' },
    { id:'5', name:'Biosphere Annadanam', amount:2048, desc:'Synthesize and distribute nutritional sustenance to 200+ organic entities.' },
    { id:'6', name:'Omni-Pooja Integration', amount:8192, desc:'Complete system override and recalibration of karmic matrices.' },
  ]

  const metrics = [
    { label:'Global Nodes', value:'10,240', icon:<Network className="w-5 h-5 text-indigo-400" /> },
    { label:'Processing Hz', value:'108 THz', icon:<Activity className="w-5 h-5 text-cyan-400" /> },
    { label:'Neural Uplinks', value:'4.5M/s', icon:<Cpu className="w-5 h-5 text-fuchsia-400" /> },
    { label:'Karmic Latency', value:'0.00ms', icon:<Zap className="w-5 h-5 text-blue-400" /> },
  ]

  const modules = [
    { id:'core', title:'Core Sanctum', desc:'The central processing unit of divine energy. Direct access to the primary deity matrix.', status:'OPTIMAL' },
    { id:'darshan', title:'Optical Feed', desc:'High-definition visual streaming of the sanctum. Uninterrupted cosmic observation.', status:'LIVE' },
    { id:'seva', title:'Seva Protocol', desc:'Initiate karmic transactions and sacred services with immediate ledger updates.', status:'ACTIVE' },
    { id:'history', title:'Akashic Logs', desc:'Access immutable historical records of the temple spanning centuries.', status:'ARCHIVED' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-[#020617] overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes orbit { 0% { transform: rotate(0deg) translateX(150px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); } 70% { box-shadow: 0 0 0 30px rgba(99, 102, 241, 0); } 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); } }
        @keyframes neon-glow { 0%, 100% { text-shadow: 0 0 10px rgba(167, 139, 250, 0.5), 0 0 20px rgba(167, 139, 250, 0.3); } 50% { text-shadow: 0 0 20px rgba(167, 139, 250, 0.8), 0 0 40px rgba(167, 139, 250, 0.5); } }
        @keyframes data-stream { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
        
        .glass-panel { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(148, 163, 184, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
        .glass-panel:hover { background: rgba(30, 41, 59, 0.7); border-color: rgba(167, 139, 250, 0.3); }
        .omni-text { background: linear-gradient(135deg, #c084fc, #818cf8, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .omni-button { background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(167, 139, 250, 0.2)); border: 1px solid rgba(167, 139, 250, 0.4); transition: all 0.3s; }
        .omni-button:hover { background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(167, 139, 250, 0.4)); box-shadow: 0 0 20px rgba(167, 139, 250, 0.4); transform: translateY(-2px); }
        .omni-button-primary { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; transition: all 0.3s; }
        .omni-button-primary:hover { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); transform: translateY(-2px); }
        
        .bg-grid { background-size: 50px 50px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); }
      `}} />

      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(2, 6, 23, 1) 100%)' }} />
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      <div className="relative z-10">
        
        {/* ══ HERO: The Nexus ════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 relative">
          {/* Animated Core Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
            <div className="absolute inset-0 rounded-full border border-indigo-500/30 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-10 rounded-full border border-fuchsia-500/20 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-32 rounded-full border-2 border-cyan-500/10 animate-[spin_20s_linear_infinite]" />
            {/* Orbiting particles */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]" style={{ animation: 'orbit 10s linear infinite' }} />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_15px_#c084fc]" style={{ animation: 'orbit 15s linear infinite reverse', animationDelay: '-5s' }} />
          </div>

          <div className="max-w-5xl mx-auto w-full text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs uppercase tracking-widest text-indigo-300 mb-8 font-semibold">
              <Fingerprint className="w-4 h-4" /> Entity Identified · Welcome Seeker
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight" style={{ animation: 'neon-glow 4s ease-in-out infinite' }}>
              <span className="omni-text">{temple.name || titleText}</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              {descText}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href={`/temple/${temple.slug}/sevas`} className="omni-button-primary px-10 py-4 rounded-full text-lg font-bold flex items-center gap-3 w-full sm:w-auto">
                <Focus className="w-5 h-5" /> Initialize Seva
              </Link>
              <Link href={`/temple/${temple.slug}/live`} className="omni-button px-10 py-4 rounded-full text-lg font-bold flex items-center gap-3 w-full sm:w-auto text-slate-200">
                <Eye className="w-5 h-5 text-cyan-400" /> Access Optical Feed
              </Link>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 text-sm font-mono text-slate-500">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Network: Stable</div>
              <div className="hidden sm:flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Frequency: 432Hz</div>
              <div className="hidden md:flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-fuchsia-500" /> Sync: 99.9%</div>
            </div>
          </div>
        </section>

        {/* ══ TELEMETRY (Stats) ════════════════════════════════════════════ */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{m.value}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SYSTEM MODULES ═══════════════════════════════════════════════ */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 omni-text">System Modules</h2>
              <p className="text-slate-400">Navigate the primary interfaces of the temple consciousness.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map(mod => (
                <div key={mod.id} 
                  className={`glass-panel p-8 rounded-3xl cursor-pointer transition-all duration-500 ${activeNode === mod.id ? 'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.15)] scale-[1.02]' : ''}`}
                  onClick={() => setActiveNode(mod.id)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-slate-200">{mod.title}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${mod.status==='LIVE'?'bg-red-500/20 text-red-400 border border-red-500/30':mod.status==='OPTIMAL'?'bg-green-500/20 text-green-400 border border-green-500/30':'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}`}>
                      {mod.status}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-8">{mod.desc}</p>
                  
                  {activeNode === mod.id && (
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mt-auto">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 w-full animate-[data-stream_2s_linear_infinite]" style={{ backgroundSize: '200% 100%' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SEVA PROTOCOLS ═══════════════════════════════════════════════ */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4 omni-text">Execution Protocols</h2>
              <p className="text-slate-400">Select a seva package to initiate karmic recalibration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sevaData.map((seva: any, i: number) => (
                <div key={seva.id} className="glass-panel p-8 rounded-3xl group">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-xl group-hover:scale-110 transition-transform">
                      {'🌌🔮🧬💠🌀✨'[i] || '✨'}
                    </div>
                    <p className="text-2xl font-bold text-indigo-300">₹{seva.amount}</p>
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-3">{seva.name}</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">{seva.desc}</p>
                  <Link href={`/temple/${temple.slug}/sevas`} className="block w-full py-3 text-center rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 font-semibold hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-500/50 transition-all">
                    Execute Protocol
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DONATION (Energy Transfer) ═══════════════════════════════════ */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
              
              <Orbit className="w-16 h-16 text-fuchsia-400 mx-auto mb-6 animate-[spin_10s_linear_infinite]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 omni-text">Energy Transfer</h2>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg">Transmit resources to the central consciousness. All transfers are securely processed and verified via 80G smart contracts.</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {[108, 501, 1008, 5100, 10000].map(amt => (
                  <button key={amt} onClick={() => setSelectedAmount(amt)} 
                    className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${selectedAmount === amt ? 'bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                    ₹{amt}
                  </button>
                ))}
              </div>
              
              <Link href={`/temple/${temple.slug}/donate`} className="omni-button-primary inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full text-xl font-bold shadow-2xl">
                <Radio className="w-6 h-6" /> Initiate Transfer of ₹{selectedAmount}
              </Link>
            </div>
          </div>
        </section>

        {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
        {page?.blocks && page.blocks.length > 0 && (
          <div className="py-12"><BlockRenderer blocks={page.blocks} theme="omni" sevas={sevas} templeAddress={temple.address} /></div>
        )}

        {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
        <footer className="py-12 px-4 border-t border-slate-800/50 bg-[#020617]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                  <div className="w-4 h-4 bg-[#020617] rounded-full" />
                </div>
                <span className="font-bold text-xl text-slate-200">{temple.name}</span>
              </div>
              
              <div className="flex gap-6 text-sm text-slate-400">
                <Link href={`/temple/${temple.slug}/sevas`} className="hover:text-indigo-400 transition-colors">Protocols</Link>
                <Link href={`/temple/${temple.slug}/live`} className="hover:text-fuchsia-400 transition-colors">Optical Feed</Link>
                <Link href={`/temple/${temple.slug}/donate`} className="hover:text-cyan-400 transition-colors">Transfers</Link>
              </div>
              
              <div className="text-sm text-slate-600 font-mono">
                System Active · MandirAI OS
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
