'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Terminal, Cpu, Database, Activity } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function TechSanctuaryTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1024)
  const [activeEndpoint, setActiveEndpoint] = React.useState('GET /sevas')

  const titleText = page?.title ? t(page.title) : `system.load("${temple.name}")`
  const descText = page?.description ? t(page.description) : `Initialize spiritual connection. A high-bandwidth conduit to the divine.`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Nitya_Archana', amount:64, desc:'Daily init function. Low latency blessing.', endpoint:'/api/v1/archana' },
    { id:'2', name:'Root_Abhishekam', amount:512, desc:'Sudo level access to divine grace. Full cleanse.', endpoint:'/api/v1/abhishekam' },
    { id:'3', name:'Kumkum_Patch', amount:128, desc:'Hotfix your karma with this powerful patch.', endpoint:'/api/v1/kumkum' },
    { id:'4', name:'Sahasranama_Loop', amount:256, desc:'1000 iterations of holy names. High throughput.', endpoint:'/api/v1/sahasranama' },
    { id:'5', name:'Annadanam_Cluster', amount:1024, desc:'Provision resources for 100+ concurrent pilgrims.', endpoint:'/api/v1/annadanam' },
    { id:'6', name:'Maha_Deployment', amount:4096, desc:'Major version upgrade of your spiritual state.', endpoint:'/api/v1/maha-pooja' },
  ]

  const events = [
    { id:'1', name:'v2.0_Brahmotsavam', date:'12 Oct', type:'MAJOR_RELEASE', desc:'The grand annual deployment. 9 days of continuous uptime.', location:'main-cluster' },
    { id:'2', name:'Navaratri_Patch', date:'02 Oct', type:'FEATURE_FLAG', desc:'Nine nights of Devi worship. Nightly feature toggles.', location:'devi-node' },
    { id:'3', name:'Deepotsavam_Sync', date:'15 Nov', type:'SYNC_EVENT', desc:'Massive parallel processing of 1000 lamps.', location:'global' },
    { id:'4', name:'Shivaratri_Cron', date:'26 Feb', type:'CRON_JOB', desc:'All-night background job with rudrabhishekam every 3 hours.', location:'shiva-node' },
  ]

  const endpoints = [
    { method:'GET', path:'/api/darshan/live', status:200, latency:'12ms', desc:'Stream high-res divine presence' },
    { method:'POST', path:'/api/sevas/book', status:201, latency:'45ms', desc:'Commit a new seva transaction' },
    { method:'PUT', path:'/api/karma/update', status:202, latency:'8ms', desc:'Async karma processing' },
    { method:'GET', path:'/api/prasad/status', status:200, latency:'22ms', desc:'Track your divine delivery' },
    { method:'DELETE', path:'/api/sins/flush', status:204, latency:'150ms', desc:'Clear your negative cache' },
  ]

  const systemStatus = [
    { label:'Uptime', value:'99.99%', sub:'Since 1523 CE' },
    { label:'Active Connections', value:'10,240', sub:'Current Devotees' },
    { label:'Throughput', value:'108 req/s', sub:'Chants Per Second' },
    { label:'Database', value:'Synced', sub:'Akashic Records' },
  ]

  const commitHistory = [
    { hash:'a1b2c3d', msg:'Initial commit: Temple foundation laid', date:'1523-04-12' },
    { hash:'f4e5d6c', msg:'Merge branch "gopuram" into main', date:'1789-08-22' },
    { hash:'b7a8901', msg:'Refactor: Establish formal Trust board', date:'1924-01-15' },
    { hash:'d2e3f4a', msg:'feat(digital): Implement MandirAI OS', date:'2025-06-24' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen font-mono text-slate-300 bg-slate-950 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes matrix-rain { 0% { background-position: 0% 0%; } 100% { background-position: 0% 1000%; } }
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.3); } 50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); border-color: rgba(34, 197, 94, 0.8); } }
        @keyframes text-glitch { 0% { text-shadow: 2px 0 0 red, -2px 0 0 blue; } 20% { text-shadow: -2px 0 0 red, 2px 0 0 blue; } 40% { text-shadow: 2px 0 0 red, -2px 0 0 blue; } 60% { text-shadow: -2px 0 0 red, 2px 0 0 blue; } 80% { text-shadow: 2px 0 0 red, -2px 0 0 blue; } 100% { text-shadow: -2px 0 0 red, 2px 0 0 blue; } }
        
        .matrix-bg {
          background-image: linear-gradient(rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.9)), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.05) 2px, rgba(34, 197, 94, 0.05) 4px);
          background-size: 100% 4px;
        }
        .cursor-blink { animation: cursor-blink 1s step-end infinite; }
        .scanline-anim { animation: scanline 8s linear infinite; }
        .cyber-card { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(34, 197, 94, 0.2); transition: all 0.2s; backdrop-filter: blur(4px); }
        .cyber-card:hover { animation: glow-pulse 1.5s infinite; border-color: rgba(34, 197, 94, 0.6); }
        .cyber-button { background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; color: #4ade80; transition: all 0.2s; }
        .cyber-button:hover { background: rgba(34, 197, 94, 0.2); box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); text-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
        .cyber-button-primary { background: rgba(34, 197, 94, 0.8); color: #020617; font-weight: bold; border: 1px solid #4ade80; transition: all 0.2s; }
        .cyber-button-primary:hover { background: #4ade80; box-shadow: 0 0 20px rgba(74, 222, 128, 0.6); }
        .cyber-text { color: #22c55e; text-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
        .cyber-glitch:hover { animation: text-glitch 0.2s linear infinite; }
        
        /* Scrollbar customization */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #020617; border-left: 1px solid #0f172a; }
        ::-webkit-scrollbar-thumb { background: #22c55e; }
        ::-webkit-scrollbar-thumb:hover { background: #4ade80; }
      `}} />

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 matrix-bg" />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMyMmM1NWUiLz48L3N2Zz4=')] bg-repeat" />
      <div className="fixed w-full h-8 bg-green-500/10 pointer-events-none z-50 scanline-anim" />

      <div className="relative z-10">
        
        {/* ══ HERO: Terminal Boot Sequence ════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center px-4 sm:px-8 py-20">
          <div className="max-w-5xl mx-auto w-full">
            <div className="cyber-card p-6 rounded border-t-4 border-t-green-500 mb-8 font-mono text-sm sm:text-base">
              <div className="flex justify-between items-center border-b border-green-500/30 pb-2 mb-4">
                <span className="text-green-500 font-bold">root@temple_os: ~</span>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                </div>
              </div>
              <p className="text-slate-400 mb-2">INIT_SEQUENCE_START...</p>
              <p className="text-slate-400 mb-2">Loading divine_modules.................. [OK]</p>
              <p className="text-slate-400 mb-2">Establishing direct neural link......... [OK]</p>
              <p className="text-slate-400 mb-6">Synchronizing karmic ledger............. [OK]</p>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 cyber-text cyber-glitch">
                {titleText}
              </h1>
              <p className="text-xl sm:text-2xl text-green-400/80 mb-8 max-w-2xl border-l-2 border-green-500/50 pl-4">
                {descText}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/temple/${temple.slug}/sevas`} className="cyber-button-primary px-8 py-3 rounded text-center uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" /> Execute Seva
                </Link>
                <Link href={`/temple/${temple.slug}/live`} className="cyber-button px-8 py-3 rounded text-center uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4" /> Stream_Darshan
                </Link>
              </div>
              <p className="mt-8 text-green-500/50 text-xs">
                root@temple_os:~# <span className="cursor-blink">_</span>
              </p>
            </div>
          </div>
        </section>

        {/* ══ SYSTEM METRICS ══════════════════════════════════════════════ */}
        <section className="py-12 px-4 border-y border-green-500/20 bg-slate-900/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {systemStatus.map((s, i) => (
                <div key={i} className="border-l border-green-500/30 pl-4 py-2">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-2xl font-bold cyber-text">{s.value}</p>
                  <p className="text-[10px] text-green-500/60 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ API ENDPOINTS (Features) ════════════════════════════════════ */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 border-b border-green-500/20 pb-4">
              <h2 className="text-3xl font-bold cyber-text flex items-center gap-3">
                <Database className="w-8 h-8" /> /system/endpoints
              </h2>
              <p className="text-slate-400 mt-2">Available divine interfaces for devotee interaction.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                {endpoints.map((ep, i) => (
                  <div key={i} 
                    className={`cyber-card p-4 flex items-center gap-4 cursor-pointer ${activeEndpoint === `${ep.method} ${ep.path}` ? 'border-green-400 bg-green-900/20' : ''}`}
                    onClick={() => setActiveEndpoint(`${ep.method} ${ep.path}`)}
                  >
                    <div className={`w-16 text-center text-xs font-bold py-1 rounded bg-slate-800 ${ep.method==='GET'?'text-blue-400':ep.method==='POST'?'text-green-400':ep.method==='PUT'?'text-yellow-400':'text-red-400'}`}>
                      {ep.method}
                    </div>
                    <div className="flex-1 font-mono text-sm">
                      <p className="text-slate-200">{ep.path}</p>
                      <p className="text-xs text-slate-500">{ep.desc}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-green-500">{ep.status}</p>
                      <p className="text-slate-500">{ep.latency}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cyber-card p-6 h-full flex flex-col">
                <div className="border-b border-green-500/20 pb-2 mb-4 flex justify-between text-xs">
                  <span className="text-slate-400">Response Viewer</span>
                  <span className="text-green-500">200 OK</span>
                </div>
                <pre className="text-xs text-green-400/80 overflow-x-auto p-4 bg-slate-950 rounded border border-slate-800 flex-1">
{`{
  "request": "${activeEndpoint}",
  "timestamp": "${new Date().toISOString()}",
  "payload": {
    "status": "success",
    "message": "Connection established with divine source.",
    "karma_balance": "Fetching...",
    "blessings_received": true
  },
  "meta": {
    "processed_by": "TempleAI Core",
    "version": "2.0.4"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ══ LIVE STREAM (Terminal Darshan) ══════════════════════════════ */}
        <section className="py-24 px-4 bg-slate-900/30 border-y border-green-500/10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold cyber-text">./stream_darshan.sh</h2>
                <p className="text-slate-400 mt-2">Connecting to optical sensors...</p>
              </div>
              <div className="text-xs bg-red-900/40 text-red-400 border border-red-500/50 px-3 py-1 flex items-center gap-2 rounded">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> REC
              </div>
            </div>

            <div className="cyber-card p-2 aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute top-4 left-4 z-20 text-xs font-mono text-white/50 space-y-1">
                <p>REC_TIME: 00:00:00</p>
                <p>FPS: 60</p>
                <p>RES: 4K_UHD</p>
                <p>UPLINK: STABLE</p>
              </div>
              {temple.liveStreamUrl ? (
                <iframe src={temple.liveStreamUrl} className="w-full h-full z-10" allowFullScreen title="Live Darshan" />
              ) : (
                <div className="text-center z-10">
                  <Cpu className="w-16 h-16 text-green-500/50 mx-auto mb-4 animate-pulse" />
                  <p className="text-xl text-green-500 font-bold mb-2">STREAM_OFFLINE</p>
                  <p className="text-slate-500 text-sm mb-4">Awaiting signal from main sanctum.</p>
                  <div className="w-48 h-1 bg-slate-800 mx-auto rounded overflow-hidden">
                    <div className="w-1/3 h-full bg-green-500/50 animate-[scanline_2s_ease-in-out_infinite_alternate]" style={{ animationDirection: 'alternate-reverse', animationName: 'marquee' }}></div>
                  </div>
                </div>
              )}
              {/* Overlay scanlines */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
            </div>
          </div>
        </section>

        {/* ══ SEVAS (Transactions) ════════════════════════════════════════ */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold cyber-text">Execute_Transactions</h2>
              <p className="text-slate-400 mt-2">Select a seva package to initiate transfer protocol.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sevaData.map((seva: any) => (
                <div key={seva.id} className="cyber-card p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4 border-b border-green-500/20 pb-4">
                    <div>
                      <p className="text-green-400 font-bold text-lg mb-1">{seva.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{seva.endpoint}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-200">₹{seva.amount}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 flex-1">{seva.desc}</p>
                  <Link href={`/temple/${temple.slug}/sevas`} className="cyber-button w-full py-2 text-center text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                    <Terminal className="w-4 h-4" /> Run Request
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GIT COMMIT HISTORY (Temple Timeline) ════════════════════════ */}
        <section className="py-24 px-4 bg-slate-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 border-b border-green-500/20 pb-4">
              <h2 className="text-3xl font-bold cyber-text">git log --oneline</h2>
              <p className="text-slate-400 mt-2">Temple chronicles stored in immutable ledger.</p>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              {commitHistory.map((commit, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="text-yellow-500 w-16 pt-1">{commit.hash}</div>
                  <div className="flex-1 border-l-2 border-slate-700 pl-4 pb-6 group-last:border-transparent group-last:pb-0 relative">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-green-500 transition-colors"></div>
                    <p className="text-slate-200">{commit.msg}</p>
                    <p className="text-slate-500 text-xs mt-1">{commit.date} · admin@temple</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DONATION (Resource Allocation) ══════════════════════════════ */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="cyber-card p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Database className="w-32 h-32 text-green-500" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold cyber-text mb-2">Allocate_Resources</h2>
                <p className="text-slate-400 text-sm mb-8">Transfer funds to temple treasury. Auto-generate 80G certified block receipt.</p>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
                  {[256, 512, 1024, 2048, 4096, 8192].map(amt => (
                    <button key={amt} onClick={() => setSelectedAmount(amt)} className={`py-2 text-sm font-mono border ${selectedAmount === amt ? 'bg-green-500/20 border-green-400 text-green-400' : 'border-slate-700 text-slate-500 hover:border-green-500/50 hover:text-green-500/80'}`}>
                      {amt}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-slate-500 text-xl">₹</span>
                  <input type="number" value={selectedAmount} readOnly className="bg-slate-900 border-b-2 border-green-500/50 text-2xl font-bold text-slate-200 px-2 py-1 w-full max-w-[200px] outline-none" />
                </div>
                
                <Link href={`/temple/${temple.slug}/donate`} className="cyber-button-primary w-full py-4 text-center text-lg uppercase tracking-widest flex items-center justify-center gap-2">
                  <Activity className="w-5 h-5" /> Initiate Transfer
                </Link>
                <p className="text-xs text-slate-500 text-center mt-4">Transaction secured via 256-bit encryption. Payment gateway online.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
        {page?.blocks && page.blocks.length > 0 && (
          <div className="py-12 border-y border-green-500/10 bg-slate-900/20"><BlockRenderer blocks={page.blocks} theme="tech-sanctuary" sevas={sevas} templeAddress={temple.address} /></div>
        )}

        {/* ══ FOOTER (System Info) ═════════════════════════════════════════ */}
        <footer className="py-12 px-4 border-t border-green-500/30 bg-slate-950">
          <div className="max-w-7xl mx-auto font-mono text-xs text-slate-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-green-500 font-bold mb-4 text-sm">temple_os v2.0</p>
                <p className="mb-2">ID: {temple.id}</p>
                <p className="mb-2">LOC: {address.city || 'Unknown'}, {address.state || 'Unknown'}</p>
                <p>STATUS: <span className="text-green-500">ONLINE</span></p>
              </div>
              <div>
                <p className="text-green-500 font-bold mb-4 text-sm">dependencies</p>
                <ul className="space-y-2">
                  <li><Link href={`/temple/${temple.slug}/sevas`} className="hover:text-green-400">./sevas.sh</Link></li>
                  <li><Link href={`/temple/${temple.slug}/donate`} className="hover:text-green-400">./donate.sh</Link></li>
                  <li><Link href={`/temple/${temple.slug}/live`} className="hover:text-green-400">./darshan_stream.sh</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-green-500 font-bold mb-4 text-sm">contact_nodes</p>
                <p className="mb-2">TEL: {temple.contactPhone || 'N/A'}</p>
                <p className="mb-2">MAIL: {temple.contactEmail || 'N/A'}</p>
                <p>NET: TCP/IP Enabled</p>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
              <p>System halted. End of file.</p>
              <p className="text-green-500/50">MandirAI OS</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
