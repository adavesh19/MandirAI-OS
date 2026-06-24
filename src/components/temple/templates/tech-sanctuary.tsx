'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Terminal, Cpu, Database, Activity } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function TechSanctuaryTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1001)
  
  const titleText = page?.title ? t(page.title) : `${temple.name}`
  const descText = page?.description ? t(page.description) : `Spiritual Interface Online. Connected to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. Initializing divine connection.</p>`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'ARCHANA.EXE', amount:51, description:'Initialize daily name recitation process.', durationMinutes:15 },
    { id:'2', name:'ABHISHEKAM.SVC', amount:501, description:'Execute sacred bathing protocol.', durationMinutes:45 },
    { id:'3', name:'KUMKUM.SYS', amount:151, description:'Run kumkum offering with parallel chanting.', durationMinutes:20 },
    { id:'4', name:'SAHASRANAMA.BAT', amount:251, description:'Batch process 1000 divine names.', durationMinutes:60 },
    { id:'5', name:'ANNADANAM.NET', amount:1001, description:'Networked food distribution sponsorship.', durationMinutes:0 },
    { id:'6', name:'MAHA_POOJA.BIN', amount:5001, description:'Compiled grand ritual execution.', durationMinutes:90 },
    { id:'7', name:'EKADASA.SH', amount:11001, description:'Shell script for 11-vessel abhishekam.', durationMinutes:120 },
    { id:'8', name:'DOLOTSAVAM.APP', amount:1501, description:'Application for deity swing seva.', durationMinutes:30 },
    { id:'9', name:'BRAHMOTSAVAM.ISO', amount:51000, description:'Full image backup sponsorship of annual festival.', durationMinutes:0 },
  ]

  const events = [
    { id:'1', name:'GANESH_CHATURTHI', date:'2025-08-26', type:'FESTIVAL', desc:'System wide festival initialization.', location:'MAIN_NODE' },
    { id:'2', name:'NAVARATRI_RUNTIME', date:'2025-10-02', type:'FESTIVAL', desc:'9-day continuous worship loop.', location:'DEVI_CLUSTER' },
    { id:'3', name:'SHIVARATRI_PING', date:'2026-02-26', type:'POOJA', desc:'All-night server uptime vigil.', location:'SHIVA_CORE' },
    { id:'4', name:'RAMA_NAVAMI_BOOT', date:'2026-04-06', type:'FESTIVAL', desc:'Kalyanam ceremony execution.', location:'MAIN_HALL' },
  ]

  const stats = [
    { label:'UPTIME', value:'500+ YRS', icon:<Activity className="w-6 h-6"/> },
    { label:'ACTIVE_USERS', value:'25K/MO', icon:<Users className="w-6 h-6"/> },
    { label:'PROCESSES', value:'108', icon:<Cpu className="w-6 h-6"/> },
    { label:'LATENCY', value:'0ms', icon:<Sparkles className="w-6 h-6"/> },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'ROOT_ADMIN', role:'SYSTEM_HEAD', bio:'Managing core spiritual infrastructure.', avatar:'[A]' },
    { name:'SYS_OP_1', role:'OPERATIONS', bio:'Ensuring 99.9% darshan uptime.', avatar:'[O]' },
    { name:'NET_ADMIN', role:'NETWORK', bio:'Routing devotee requests to the Divine.', avatar:'[N]' },
  ]

  const schedule = [
    { time:'05:00', event:'INIT_SYSTEM & Mangala Aarti' },
    { time:'06:30', event:'RUN_ABHISHEKAM' },
    { time:'08:30', event:'OPEN_PORT: DARSHAN' },
    { time:'12:30', event:'EXEC_NAIVEDYAM' },
    { time:'16:00', event:'RESTART_DARSHAN' },
    { time:'18:30', event:'RUN_AARTI.SH' },
    { time:'20:30', event:'SHUTDOWN_SYSTEM (Ekanta)' },
  ]

  return (
    <div className="bg-slate-950 min-h-screen font-mono text-cyan-50 selection:bg-cyan-500 selection:text-slate-950">
      <style dangerouslySetInnerHTML={{__html: `
        .cyber-grid {
          background-image: linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .scan-line {
          width: 100%;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.1), transparent);
          position: absolute;
          top: -100px;
          animation: scan 8s linear infinite;
        }
        @keyframes scan {
          0% { top: -100px; }
          100% { top: 100%; }
        }
        .blink { animation: blinker 1s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .card-3d:hover { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(10px); }
        .neon-shadow { box-shadow: 0 0 10px rgba(34,211,238,0.3), inset 0 0 10px rgba(34,211,238,0.1); }
        .neon-text { text-shadow: 0 0 5px rgba(34,211,238,0.5), 0 0 10px rgba(34,211,238,0.3); }
      `}} />

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-slate-950"><BlockRenderer blocks={page.blocks} theme="tech" sevas={sevas} templeAddress={temple.address} /></div>
      ) : (
        <>
          {/* SECTION 1 - HOLOGRAPHIC HERO */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4 pt-24 pb-12 cyber-grid">
            
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="scan-line pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex justify-between text-xs text-cyan-500 font-bold tracking-widest uppercase">
              <div className="flex gap-4">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> SYSTEM:ONLINE</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> DARSHAN:OPEN</span>
              </div>
              <div>IP: 192.168.OM.108</div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
              
              <div className="bg-cyan-950/50 border border-cyan-500/50 text-cyan-400 px-4 py-1 mb-8 inline-flex items-center gap-2 text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <Terminal className="w-4 h-4" /> [TEMPLE.OS v2.0] LOADED
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white text-center mb-6 tracking-tight neon-text uppercase">
                {titleText} <span className="blink text-cyan-500">_</span>
              </h1>
              
              <p className="text-cyan-100/70 text-lg md:text-xl max-w-2xl mx-auto text-center mb-10 leading-relaxed border-l-4 border-cyan-500 pl-4 bg-cyan-950/20 py-2">
                {descText}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2">
                  <Activity className="w-5 h-5" /> INITIATE_SEVA()
                </Link>
                <a href="#explore" className="bg-slate-900 border border-cyan-500 text-cyan-500 hover:bg-cyan-950 px-8 py-4 font-bold tracking-widest transition-all flex items-center justify-center gap-2">
                  <Database className="w-5 h-5" /> EXPLORE_DATA
                </a>
              </div>

              {/* Data Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-sm">
                <div className="bg-slate-900 border border-slate-800 p-4 neon-shadow">
                  <div className="text-cyan-600 mb-2 font-bold">&gt; GET /timings</div>
                  <div className="text-cyan-300">UP: {temple.timings?.morning_open || '06:00'}</div>
                  <div className="text-cyan-300">DOWN: {temple.timings?.evening_close || '20:30'}</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 neon-shadow">
                  <div className="text-cyan-600 mb-2 font-bold">&gt; GET /location</div>
                  <div className="text-cyan-300">{temple.address?.city || 'NODE_1'}</div>
                  <div className="text-cyan-300">LAT/LONG OK</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 neon-shadow">
                  <div className="text-cyan-600 mb-2 font-bold">&gt; GET /contact</div>
                  <div className="text-cyan-300">TEL: {temple.contactPhone || 'NULL'}</div>
                  <div className="text-cyan-300">PING SUCCESS</div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2 - SYSTEM LOG TICKER */}
          <section className="bg-slate-900 border-y border-cyan-500/30 py-2">
            <div className="marquee-container w-full">
              <div className="marquee-content text-cyan-500 text-xs tracking-widest">
                [SYS] MANGALA_AARTI: COMPLETED ✓ | [INFO] NEXT_EVENT: ABHISHEKAM 06:00 | [ALERT] GANESH_CHATURTHI: 2025-08-26 | [SYS] ONLINE_BOOKING: ACTIVE | [SEC] 80G_CERTIFICATES: GENERATING | 
              </div>
            </div>
          </section>

          {/* SECTION 3 - DASHBOARD BENTO GRID */}
          <section id="explore" className="py-24 bg-slate-950 cyber-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-cyan-500 mb-8 font-bold text-xl">&gt; ./display_dashboard.sh</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cell 1: Temple Identity Terminal */}
                <div className="md:col-span-2 bg-slate-900 border border-cyan-500/30 rounded-lg p-6 neon-shadow">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-cyan-300 space-y-2">
                    <p><span className="text-cyan-600">user@mandir:~$</span> cat identity.json</p>
                    <p>&#123;</p>
                    <p className="pl-4">"NAME": "<span className="text-white font-bold">{temple.name}</span>",</p>
                    <p className="pl-4">"DEITY": "<span className="text-yellow-400">{temple.primaryDeity || 'SUPREME_BEING'}</span>",</p>
                    <p className="pl-4">"TYPE": "<span className="text-green-400">{temple.templeType || 'ANCIENT_SHRINE'}</span>",</p>
                    <p className="pl-4">"STATUS": "<span className="text-cyan-400">ONLINE</span>"</p>
                    <p>&#125;</p>
                  </div>
                </div>

                {/* Cell 2 & 3: Hours */}
                <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 flex flex-col justify-between neon-shadow group hover:border-cyan-400 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cyan-600 font-bold">CRON_AM</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  <div className="text-3xl font-black text-white">{temple.timings?.morning_open || '06:00'}</div>
                  <div className="text-cyan-500">→ {temple.timings?.morning_close || '12:00'}</div>
                </div>

                <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 flex flex-col justify-between neon-shadow group hover:border-cyan-400 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cyan-600 font-bold">CRON_PM</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  <div className="text-3xl font-black text-white">{temple.timings?.evening_open || '16:00'}</div>
                  <div className="text-cyan-500">→ {temple.timings?.evening_close || '20:30'}</div>
                </div>

                {/* Cell 4: Featured */}
                <div className="md:col-span-2 bg-slate-800 border-2 border-cyan-500 p-6 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="bg-cyan-500 text-slate-900 px-2 py-1 text-xs font-bold inline-block mb-3">RECOMMENDED_PROCESS</div>
                    <h3 className="text-2xl font-black text-white mb-2">ABHISHEKAM.SVC</h3>
                    <p className="text-cyan-200/60 text-sm">Execute the highest priority ritual offering. Automatic receipt generation included.</p>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="text-3xl font-black text-green-400 mb-3">₹501</div>
                    <Link href={`/temple/${temple.slug}/donate?seva=2`} className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-6 py-2 font-bold uppercase transition-colors">
                      EXECUTE
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4 - HOLOGRAPHIC STATS */}
          <section className="py-16 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-950 border border-cyan-500/20 p-6 rounded text-center card-3d transition-transform duration-300 hover:border-cyan-400 neon-shadow">
                    <div className="text-cyan-500 mb-4 flex justify-center">{stat.icon}</div>
                    <div className="font-black text-3xl text-white mb-2 neon-text">{stat.value}</div>
                    <div className="text-xs font-bold text-cyan-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - ABOUT */}
          <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-6">
                  <div className="text-cyan-500 mb-4 font-bold text-xl">&gt; ./history.sh --verbose</div>
                  <h2 className="text-4xl font-black text-white mb-6">SYSTEM_ORIGIN</h2>
                  <div className="text-cyan-100/70 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  <Link href={`/temple/${temple.slug}/history`} className="inline-block mt-6 text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/50">
                    [READ_FULL_LOGS]
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['SECURE_PAYMENTS', '80G_CERTIFICATES', 'LIVE_STREAMING', 'DB_VERIFIED'].map((lbl, i) => (
                    <div key={i} className="bg-slate-900 border border-cyan-500/20 p-6 rounded neon-shadow">
                      <div className="text-green-400 font-bold mb-2">[OK]</div>
                      <div className="text-white text-sm font-bold">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 - SERVICES GRID */}
          <section className="py-24 bg-slate-900 cyber-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 space-y-2">
                <div className="text-cyan-500 font-bold text-xl">&gt; ls -la /sevas/available/</div>
                <p className="text-cyan-100/50">Select a process to execute.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sevaData.map((seva) => (
                  <div key={seva.id} className="bg-slate-950 border border-slate-700 p-6 rounded-lg hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <Cpu className="w-8 h-8 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      {seva.durationMinutes > 0 && (
                        <span className="border border-cyan-500 text-cyan-400 text-xs px-2 py-1 rounded bg-cyan-950/30">
                          T_EXEC: {seva.durationMinutes}m
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyan-300">{seva.name}</h3>
                    <p className="text-slate-400 text-sm mb-8 flex-grow">{seva.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-xl font-bold text-green-400">₹{seva.amount}</span>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} 
                            className="text-slate-900 bg-cyan-500 hover:bg-cyan-400 px-4 py-2 font-bold text-sm transition-colors rounded-sm">
                        EXECUTE
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7 - EVENTS */}
          <section className="py-24 bg-slate-950 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-cyan-500 mb-8 font-bold text-xl">&gt; tail -f /var/log/events</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-slate-900 border-l-4 border-cyan-500 p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-cyan-400 font-bold text-sm">{evt.date}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1">STATUS: SCHED</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{evt.name}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{evt.desc}</p>
                    <div className="text-xs text-slate-500">LOC: {evt.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 - DATA VISUALIZATION GALLERY */}
          <section className="py-24 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-cyan-500 mb-8 font-bold text-xl">&gt; view_images --format grid</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="relative aspect-video bg-slate-950 border border-slate-700 overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 cyber-grid opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform duration-500">🛕</div>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]" />
                    <div className="absolute bottom-2 left-2 text-cyan-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">IMG_00{idx+1}.PNG</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9 - PAYMENT TERMINAL */}
          <section className="py-24 bg-slate-950 relative overflow-hidden border-y border-cyan-500/20">
            <div className="scan-line pointer-events-none opacity-30" />
            <div className="max-w-4xl mx-auto px-4 relative z-10">
              <div className="bg-slate-900 border border-cyan-500/50 p-8 shadow-[0_0_30px_rgba(34,211,238,0.1)] rounded-sm">
                <div className="flex gap-2 mb-6 border-b border-slate-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="text-cyan-500 font-bold mb-6">&gt; $ mandir-os donate --init</div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[101, 501, 1001, 2100, 5100, 11000].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-3 font-bold border transition-all rounded-sm
                                ${selectedAmount === amt ? 'bg-cyan-500 text-slate-900 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-950 text-cyan-500 border-slate-700 hover:border-cyan-500'}`}>
                      ₹{amt}
                    </button>
                  ))}
                </div>
                
                <div className="text-green-400 mb-6">
                  &gt; Initiating secure donation of ₹{selectedAmount}<br/>
                  &gt; 80G_COMPLIANCE: [██████████] 100% OK
                </div>

                <Link href={`/temple/${temple.slug}/donate?amount=${selectedAmount}`}
                      className="w-full block text-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-4 font-black uppercase transition-colors rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  EXECUTE_DONATION
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 10 - ADMIN PROFILES */}
          <section className="py-24 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-cyan-500 mb-8 font-bold text-xl">&gt; cat /etc/passwd | grep admin</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trustees.map((person, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-sm hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-slate-800 border border-cyan-500 text-cyan-500 flex items-center justify-center font-bold">
                        {person.avatar}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{person.name}</h3>
                        <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">SUCCESS: OK</span>
                      </div>
                    </div>
                    <p className="text-cyan-600 text-xs font-bold mb-2">ROLE: {person.role}</p>
                    <p className="text-slate-400 text-sm">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 11 - SYSTEM LOG SCHEDULE */}
          <section className="py-24 bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-cyan-500 mb-8 font-bold text-xl">&gt; cat /etc/crontab</div>
              <div className="bg-slate-900 border border-slate-800 p-8 font-mono text-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                {schedule.map((slot, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-4 mb-4 pb-4 border-b border-slate-800 last:border-0 last:mb-0 last:pb-0">
                    <span className="text-cyan-500 w-16 shrink-0">[{slot.time}]</span>
                    <span className="text-slate-300">{slot.event}</span>
                    <span className="text-green-500 md:ml-auto hidden md:block">[OK]</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12 & 13 - FEATURES & NETWORK */}
          <section className="py-24 bg-slate-900 border-t border-slate-800 cyber-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-cyan-500 mb-8 font-bold text-xl">&gt; systemctl status mandir-services</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'ONLINE_BOOKING', desc: 'Active' },
                  { title: 'SMART_RECEIPTS', desc: 'Generating' },
                  { title: 'LIVE_STREAM', desc: 'Broadcasting' },
                  { title: 'WHATSAPP_BOT', desc: 'Listening' },
                  { title: 'PAYMENT_GW', desc: 'Secure' },
                  { title: 'MULTI_LANG', desc: 'Enabled' }
                ].map((feat, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-6 flex items-center gap-4 hover:border-cyan-500/50 transition-colors">
                    <div className="w-10 h-10 rounded border border-cyan-500 flex items-center justify-center text-cyan-500">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{feat.title}</h3>
                      <p className="text-green-400 text-xs">● {feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14 - CONTACT TERMINAL */}
          <section className="bg-slate-950 pt-24 pb-12 border-t border-cyan-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 font-mono text-sm">
                
                <div className="space-y-4">
                  <h3 className="text-cyan-500 font-bold">&gt; LOC_DATA</h3>
                  <div className="text-slate-400 space-y-1">
                    <p className="text-white font-bold">{temple.name}</p>
                    <p>{temple.address?.line1}</p>
                    {temple.address?.line2 && <p>{temple.address.line2}</p>}
                    <p>{temple.address?.city}, {temple.address?.state}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-cyan-500 font-bold">&gt; COMM_LINKS</h3>
                  <div className="text-slate-400 space-y-2">
                    <p>TEL: {temple.contactPhone}</p>
                    <p>MAIL: {temple.contactEmail}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-cyan-500 font-bold">&gt; NAV_TREE</h3>
                  <ul className="text-slate-400 space-y-2">
                    <li><Link href={`/temple/${temple.slug}/history`} className="hover:text-cyan-400">./history</Link></li>
                    <li><Link href={`/temple/${temple.slug}/events`} className="hover:text-cyan-400">./events</Link></li>
                    <li><Link href={`/temple/${temple.slug}/donate`} className="text-cyan-400 font-bold">./donate</Link></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-cyan-500 font-bold">&gt; NETWORK</h3>
                  <div className="flex gap-4">
                    {['FB', 'YT', 'X'].map(social => (
                      <a key={social} href="#" className="text-slate-500 hover:text-cyan-400 transition-colors font-bold">
                        [{social}]
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="pt-8 border-t border-slate-800 text-center text-slate-600 text-xs flex flex-col md:flex-row justify-between">
                <p>SYS_TIME: {new Date().getFullYear()} © {temple.name}</p>
                <p>KERNEL: MANDIR_AI_OS_V2.0</p>
              </div>
            </div>
          </section>

        </>
      )}
    </div>
  )
}
