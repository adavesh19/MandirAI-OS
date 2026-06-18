'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Cpu, 
  Network, 
  Zap, 
  Heart, 
  Database, 
  ArrowRight, 
  Activity, 
  Terminal, 
  Server, 
  Code, 
  Compass, 
  Flame, 
  Volume2, 
  Wind, 
  Sun, 
  Users, 
  CheckCircle2, 
  Layers 
} from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function TechSanctuaryTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  
  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `Experience spirituality integrated with cutting-edge artificial intelligence and high-tech infrastructure.`

  return (
    <div className="bg-slate-950 min-h-screen font-mono text-slate-300 selection:bg-cyan-900 selection:text-cyan-50 overflow-hidden relative">
      
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Glowing Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 relative z-10">
          <BlockRenderer blocks={page.blocks} theme="modern" sevas={sevas} templeAddress={temple.address} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 min-h-[90vh] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-8 relative">
                {/* HUD Elements */}
                <div className="absolute -left-12 -top-12 w-24 h-24 border-l-2 border-t-2 border-cyan-500/50 opacity-50 hidden lg:block rounded-tl-3xl"></div>
                
                <div className="inline-flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 px-4 py-2 rounded-lg text-xs tracking-widest uppercase font-bold backdrop-blur-sm">
                  <Activity className="h-4 w-4 animate-pulse" />
                  System Online
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  {titleText}
                </h1>
                
                <p className="text-xl text-slate-400 leading-relaxed max-w-lg border-l-4 border-cyan-500 pl-4 bg-gradient-to-r from-cyan-950/20 to-transparent py-2">
                  {descText}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href={`/temple/${temple.slug}/donate`}
                    className="group relative px-8 py-4 bg-transparent border border-cyan-500 text-cyan-400 font-bold tracking-widest uppercase text-sm overflow-hidden rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:bg-cyan-950/50">
                    <div className="absolute inset-0 w-0 bg-cyan-500/20 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative flex items-center gap-2">
                      <Zap className="h-4 w-4" /> Initialize Donation
                    </span>
                  </Link>
                  <a href="#sevas"
                    className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-lg font-bold tracking-widest uppercase text-sm transition-all flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-cyan-400" /> Execute Seva
                  </a>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-square bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
                  
                  {/* Mock UI Header */}
                  <div className="h-12 border-b border-slate-800 bg-slate-950/50 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-4 text-xs text-slate-500">nexus_core_monitor.exe</span>
                  </div>
                  
                  {/* Mock AI Interface */}
                  <div className="flex-1 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_50%)] animate-pulse"></div>
                    <div className="w-32 h-32 border-4 border-cyan-500/30 rounded-full flex items-center justify-center relative mb-8 group-hover:border-cyan-400 transition-colors">
                      <div className="absolute inset-0 border-4 border-t-cyan-400 rounded-full animate-spin"></div>
                      <Cpu className="w-12 h-12 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Omni-Agent Node Active</h3>
                    <p className="text-slate-500 max-w-xs text-sm">Processing real-time spiritual data streams and predictive calendar events.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Streams Section */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Neural Darshan', desc: 'AI-optimized crowd flow analysis', icon: <Network className="h-6 w-6" />, value: '99.9% Uptime' },
                { title: 'Quantum Sevas', desc: 'Automated booking ledgers', icon: <Database className="h-6 w-6" />, value: 'Encrypted' },
                { title: 'Cyber Prasad', desc: 'Logistics tracking module', icon: <Zap className="h-6 w-6" />, value: 'Active' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl backdrop-blur-md hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-950 p-3 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-900/50">
                      {item.value}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 1. Core Processing Units (System Architecture) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800">
        <div className="text-center mb-16 space-y-4">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">// SYSTEM ARCHITECTURE</span>
          <h2 className="text-3xl lg:text-5xl font-black text-white">Core Processing Units</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">
            Modular subsystems operating in high-performance computing clusters, automating daily temple administrative functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Darshan Telemetry', code: 'NEX-DRS-01', desc: 'Processes real-time crowd dynamics, heat mapping, and waiting estimation indices.', latency: '12ms' },
            { title: 'Pooja Execution', code: 'NEX-PJA-02', desc: 'Syncs mantra recitation cycles, digital display panels, and ghee lamp safety telemetry.', latency: '8ms' },
            { title: 'Prasad Logistics', code: 'NEX-PSD-03', desc: 'Schedules ingredient supply ordering, tracking laddu cooking metrics, and inventory.', latency: '24ms' },
            { title: 'Devotee CRM Node', code: 'NEX-CRM-04', desc: 'Profiles gotra, nakshatra history, recurring donation ledgers, and automated anniversary alerts.', latency: '15ms' },
            { title: 'Volunteer Thread Pool', code: 'NEX-VOL-05', desc: 'Allocates active threads to field agents for crowd control and sanitation tasks.', latency: '40ms' },
            { title: 'Razorpay Payment Gateway', code: 'NEX-PAY-06', desc: 'Validates immutable UPI signatures and coordinates instant receipt print commands.', latency: '180ms' }
          ].map((cpu, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl relative hover:border-cyan-500/50 transition-all group overflow-hidden">
              <div className="absolute right-0 top-0 bg-cyan-950 text-cyan-400 text-[10px] px-3 py-1 font-bold rounded-bl border-l border-b border-slate-800">
                {cpu.code}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 pt-2 group-hover:text-cyan-400 transition-colors">{cpu.title}</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">{cpu.desc}</p>
              <div className="flex justify-between items-center text-[10px] font-mono border-t border-slate-800/60 pt-4 text-slate-500">
                <span>Core Latency: <strong className="text-cyan-400">{cpu.latency}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. System Log Terminal */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800 bg-slate-950/40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">// SHELL LOGGING</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">System Log Terminal</h2>
            <p className="text-slate-400 leading-relaxed text-sm mb-8">
              Live scrolling outputs detailing automated server callbacks, ritual triggers, and administrative tasks executing in the backend cluster.
            </p>
            <div className="flex items-center gap-3">
              <Server className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="text-xs text-slate-500 font-mono">Cluster: node-01.asia-south.templeai</span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-6 h-72 overflow-hidden shadow-2xl font-mono text-xs text-cyan-400 flex flex-col justify-end space-y-2 relative">
            <div className="absolute top-3 left-4 text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Console Stream
            </div>
            
            <div className="space-y-1.5 select-all">
              <p className="text-slate-600">[2026-06-16T14:22:04] SYS_INIT // Loading multi-tenant config...</p>
              <p className="text-slate-600">[2026-06-16T14:22:05] DB_CONN  // Postgres pool connected. 18 connections active.</p>
              <p className="text-slate-500">[2026-06-16T14:22:10] CRON_TRG // Syncing gotra validation engine with planetary state...</p>
              <p className="text-slate-400">[2026-06-16T14:22:12] TELEM_IN // Sensor 08 (Sanctum Ghee Lamp) status check: 88% capacity.</p>
              <p className="text-slate-300">[2026-06-16T14:22:15] LOG_SYNC // Prasadam kitchen report: 4,820 meals routed.</p>
              <p className="text-cyan-400">[2026-06-16T14:22:20] EXEC_SUC // Seva booking compiled for Devotee #9928. SHA-256 verified.</p>
              <p className="text-cyan-300 animate-pulse">[2026-06-16T14:22:22] SHELL    // Listening for incoming payment hook sockets...</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quantum Seva Console */}
      <section id="sevas" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800">
        <div className="text-center mb-16 space-y-4">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">// OFFERINGS COMPILER</span>
          <h2 className="text-3xl lg:text-5xl font-black text-white">Quantum Seva Console</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">
            Launch sacred offerings directly into the sanctum ledger. Select a script below to configure and execute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(sevas && sevas.length > 0 ? sevas : [
            { id: '1', name: 'Archana', amount: 51, description: 'Daily basic offering' },
            { id: '2', name: 'Abhishekam', amount: 501, description: 'Sacred bath for the deity' },
            { id: '3', name: 'Annadanam', amount: 1001, description: 'Food donation for devotees' },
          ]).map((seva) => (
            <div key={seva.id} className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500 transition-all group relative overflow-hidden">
              <div className="absolute right-0 bottom-0 text-[60px] text-slate-800/10 font-bold pointer-events-none select-none select-all font-mono">
                .{seva.name.substring(0, 3).toLowerCase()}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                    <Code className="h-3.5 w-3.5" /> {seva.name.replace(/\s+/g, '_').toLowerCase()}.sh
                  </span>
                  <span className="text-sm font-bold text-white">₹{seva.amount}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{seva.name}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{seva.description || 'Spiritual execution parameters optimized.'}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-mono">RAM allocation: 64MB</span>
                <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`}
                  className="px-4 py-2 bg-cyan-950 text-cyan-400 border border-cyan-800/50 hover:bg-cyan-500 hover:text-white rounded text-xs font-bold font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer">
                  Execute Script <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Devotee Health & Biometrics Hub (Environmental telemetry) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800 bg-slate-950/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">// ENVIRONMENTAL METRICS</span>
            <h2 className="text-3xl lg:text-5xl font-black text-white">Devotee Telemetry Hub</h2>
          </div>
          <p className="text-slate-500 max-w-md mt-4 md:mt-0 text-sm">
            Localized biometrics and atmosphere sensory nodes monitoring temple comfort levels continuously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Ambient Crowd Density', val: '12%', status: 'OPTIMAL', desc: 'No queue bottlenecks active.', color: 'text-emerald-400', icon: <Users className="h-5 w-5" /> },
            { label: 'Ambient Noise Level', val: '48 dB', status: 'SERENE', desc: 'Chanting acoustics resonant.', color: 'text-cyan-400', icon: <Volume2 className="h-5 w-5" /> },
            { label: 'Air Quality (AQI)', val: '22', status: 'PURIFIED', desc: 'Incense particulate filtered.', color: 'text-emerald-400', icon: <Wind className="h-5 w-5" /> },
            { label: 'Solar Index', val: 'UV 3', status: 'MODERATE', desc: 'Sanctum shade index stable.', color: 'text-amber-400', icon: <Sun className="h-5 w-5" /> }
          ].map((metric, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 bg-slate-950 rounded-lg text-slate-400">
                  {metric.icon}
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 ${metric.color}`}>
                  {metric.status}
                </span>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-mono mb-1">{metric.label}</p>
                <p className="text-3xl font-black text-white">{metric.val}</p>
                <p className="text-[10px] text-slate-500 mt-2">{metric.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Charitable Infrastructure Ledger */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">// AUTOMATED SOCIAL SERVICES</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">Charitable Infrastructure Ledger</h2>
            <p className="text-slate-400 leading-relaxed text-sm mb-8">
              Devotee contributions are automatically processed and routed to support free education, animal shelters, and healthcare services.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-500 font-mono">Tax Exemption:</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">Section 80G ACTIVE</span>
              </div>
              <Link href={`/temple/${temple.slug}/donate`}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs font-bold tracking-widest uppercase transition-colors">
                Support Social Infrastructure &rarr;
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Free School Node', value: '480 Students', desc: 'Digital class infrastructure and nutritional meal supply pipelines.', stat: '98% Pass Rate' },
              { title: 'Gaushala Sanctuary', value: '120 Cows', desc: 'Real-time veterinary updates and automated organic diet trackers.', stat: '100% Organic' },
              { title: 'Charitable Clinic', value: '12,000+ Treated', desc: 'Decentralized healthcare files and basic medicine dispensing queues.', stat: 'Zero Devotee Cost' }
            ].map((node, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-cyan-500/30 transition-all">
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{node.title}</h3>
                  <span className="text-xs font-mono text-cyan-400">{node.value}</span>
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">{node.desc}</p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span>Audit Code: OK</span>
                  <span className="text-emerald-400 font-bold">{node.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
