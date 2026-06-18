'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Video, 
  Heart, 
  CalendarClock, 
  Share2, 
  Bell, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Activity, 
  Tv, 
  Flame, 
  Users, 
  Clock,
  Compass
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LiveClientProps {
  temple: {
    name: string
    slug: string
    liveStreamUrl: string | null
  }
  templateId: string
  videoId: string | null
}

interface DevoteeActionLog {
  id: string
  timestamp: string
  message: string
  type: 'system' | 'prayer' | 'offering' | 'astronomy'
}

export default function LiveClient({ temple, templateId, videoId }: LiveClientProps) {
  const [bellRings, setBellRings] = useState(0)
  const [flowerOfferings, setFlowerOfferings] = useState(0)
  const [activeTab, setActiveTab] = useState<'chat' | 'schedule'>('chat')
  const [devoteeLogs, setDevoteeLogs] = useState<DevoteeActionLog[]>([])
  const [inputText, setInputText] = useState('')
  const logEndRef = useRef<HTMLDivElement>(null)

  // Seed initial activities
  useEffect(() => {
    const initialLogs: DevoteeActionLog[] = [
      { id: '1', timestamp: '15:10:02', message: 'Connection established to temple live node.', type: 'system' },
      { id: '2', timestamp: '15:10:45', message: 'Devotee Ramesh from Mumbai offered virtual pushpam.', type: 'offering' },
      { id: '3', timestamp: '15:11:20', message: 'Devotee Sunita requested family wellness prayers (Gotra: Kashyapa).', type: 'prayer' },
      { id: '4', timestamp: '15:12:05', message: 'Celestial Transit: Jupiter enters auspicious quadrant.', type: 'astronomy' },
      { id: '5', timestamp: '15:13:00', message: 'Virtual Darshan queue synchronized. Ping latency: 18ms.', type: 'system' }
    ]
    setDevoteeLogs(initialLogs)
  }, [])

  // Auto scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [devoteeLogs])

  // Periodic simulated events for high tech
  useEffect(() => {
    if (templateId !== 'tech-sanctuary' && templateId !== 'ai-omniscient') return

    const interval = setInterval(() => {
      const cities = ['Delhi', 'Bangalore', 'London', 'San Francisco', 'Chennai', 'Pune']
      const gotras = ['Kashyapa', 'Vasishta', 'Bharadwaja', 'Shandilya', 'Gautama']
      const city = cities[Math.floor(Math.random() * cities.length)]
      const gotra = gotras[Math.floor(Math.random() * gotras.length)]
      
      const newLogs: DevoteeActionLog[] = [
        {
          id: String(Date.now()),
          timestamp: new Date().toLocaleTimeString(),
          message: Math.random() > 0.5 
            ? `Devotee from ${city} initialized Gotra Resonance (Gotra: ${gotra}).`
            : `Aarti flame sensor calibrated. Carbon emission offset protocol: Active.`,
          type: Math.random() > 0.5 ? 'prayer' : 'system'
        }
      ]

      setDevoteeLogs(prev => [...prev.slice(-15), ...newLogs])
    }, 12000)

    return () => clearInterval(interval)
  }, [templateId])

  // Handle virtual bells
  const handleRingBell = () => {
    setBellRings(prev => prev + 1)
    
    // Play a gentle bell note if supported (using Web Audio API for a futuristic/rich feel)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, audioCtx.currentTime) // High clear tone
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5) // Decay
      
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2)
      
      osc.start(audioCtx.currentTime)
      osc.stop(audioCtx.currentTime + 1.2)
    } catch (e) {
      console.log('Audio context not allowed or supported yet')
    }

    const timestamp = new Date().toLocaleTimeString()
    const logMsg: DevoteeActionLog = {
      id: String(Date.now()),
      timestamp,
      message: `You triggered virtual bell echo node #${bellRings + 1}.`,
      type: 'offering'
    }
    setDevoteeLogs(prev => [...prev.slice(-15), logMsg])
  }

  // Handle virtual flowers
  const handleOfferFlowers = () => {
    setFlowerOfferings(prev => prev + 1)
    const timestamp = new Date().toLocaleTimeString()
    const logMsg: DevoteeActionLog = {
      id: String(Date.now()),
      timestamp,
      message: `You offered a virtual flower packet [Resonance Vector: dev_pushpa_${flowerOfferings + 1}].`,
      type: 'offering'
    }
    setDevoteeLogs(prev => [...prev.slice(-15), logMsg])
  }

  // Handle custom prayers
  const handleSendPrayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const timestamp = new Date().toLocaleTimeString()
    const logMsg: DevoteeActionLog = {
      id: String(Date.now()),
      timestamp,
      message: `Devotee Broadcast: "${inputText.trim()}"`,
      type: 'prayer'
    }
    setDevoteeLogs(prev => [...prev.slice(-15), logMsg])
    setInputText('')
  }

  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  return (
    <div className={`min-h-screen ${
      templateId === 'tech-sanctuary'
        ? 'bg-slate-950 text-slate-300 font-mono -mx-4 px-4 sm:-mx-8 sm:px-8 -mt-8 pt-8 pb-20 relative overflow-hidden'
        : templateId === 'ai-omniscient'
        ? 'bg-black text-white font-sans -mx-4 px-4 sm:-mx-8 sm:px-8 -mt-8 pt-8 pb-20 relative overflow-hidden'
        : templateId === 'divine-glow'
        ? 'bg-gradient-to-b from-amber-50/50 via-orange-50/20 to-amber-50/50 text-stone-900 font-sans pb-20'
        : templateId === 'heritage'
        ? 'bg-stone-100 text-stone-900 font-serif pb-20'
        : 'bg-stone-50 text-stone-900 font-sans pb-20'
    }`}>
      
      {/* HUD background layout for cyber pages */}
      {templateId === 'tech-sanctuary' && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
      )}
      {templateId === 'ai-omniscient' && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/10 via-fuchsia-600/10 to-cyan-600/10 rounded-full blur-[130px] animate-pulse"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* ── Page Header ── */}
        <div className={`py-6 mb-8 border-b ${
          templateId === 'tech-sanctuary'
            ? 'border-cyan-950'
            : templateId === 'ai-omniscient'
            ? 'border-white/10'
            : 'border-stone-200'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-5 w-5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighTech ? 'bg-cyan-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-5 w-5 ${isHighTech ? 'bg-cyan-500' : 'bg-red-500'}`}></span>
              </div>
              <div>
                {templateId === 'tech-sanctuary' ? (
                  <>
                    <h1 className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] flex items-center gap-2">
                      <Tv className="h-6 w-6 text-cyan-400" /> STREAMING DARSHAN NODE
                    </h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                      NEXUS ID: {temple.slug.toUpperCase()}_LIVE_PORT_01 // SIGNAL: SECURE
                    </p>
                  </>
                ) : templateId === 'ai-omniscient' ? (
                  <>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent tracking-tight flex items-center gap-2">
                      <Cpu className="h-6 w-6 text-fuchsia-400 animate-spin" /> Virtual Sanctuary Matrix
                    </h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                      Broadcasting Devotional Coordinates Globally
                    </p>
                  </>
                ) : templateId === 'divine-glow' ? (
                  <>
                    <h1 className="font-heading text-3xl font-extrabold text-amber-950 flex items-center gap-2">
                      🪔 Live Divine Darshan
                    </h1>
                    <p className="text-sm text-amber-805 mt-0.5">{temple.name} — Streaming Blessings</p>
                  </>
                ) : templateId === 'heritage' ? (
                  <>
                    <h1 className="font-heading text-3xl font-bold text-red-950 flex items-center gap-2">
                      🏛️ Pratyaksha Darshanam
                    </h1>
                    <p className="text-xs text-stone-600 font-bold uppercase tracking-widest mt-1">
                      Sanctum Live Telecast • {temple.name}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="font-heading text-3xl font-bold text-stone-900 flex items-center gap-2">
                      Live Darshan
                    </h1>
                    <p className="text-stone-500 text-sm mt-1">{temple.name} • Live Broadcast</p>
                  </>
                )}
              </div>
            </div>
            
            {/* Share and Donate buttons */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Button 
                variant="outline" 
                className={`rounded-xl h-10 text-xs font-bold ${
                  templateId === 'tech-sanctuary'
                    ? 'bg-slate-900 border-slate-800 text-cyan-400 hover:border-cyan-400 hover:bg-slate-800'
                    : templateId === 'ai-omniscient'
                    ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Share2 className="w-4 h-4 mr-2" /> Share Node
              </Button>
              <Link href={`/temple/${temple.slug}/donate`} className="grow md:grow-0">
                <Button 
                  className={`w-full rounded-xl h-10 text-xs font-bold uppercase tracking-wider ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : templateId === 'ai-omniscient'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90'
                      : templateId === 'divine-glow'
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-900/40'
                      : templateId === 'heritage'
                      ? 'bg-red-850 hover:bg-red-900 text-white shadow-lg'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2" /> Digital Hundi Offering
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Cinematic Player Layout & Live Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Stream Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Player Container */}
            <div className={`relative aspect-video w-full overflow-hidden shadow-2xl ${
              templateId === 'tech-sanctuary'
                ? 'rounded-lg border-2 border-cyan-800/80 bg-black shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                : templateId === 'ai-omniscient'
                ? 'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md'
                : templateId === 'divine-glow'
                ? 'rounded-2xl border-4 border-amber-500/20 bg-stone-900'
                : templateId === 'heritage'
                ? 'rounded-md border-8 border-stone-800 bg-stone-950 p-1'
                : 'rounded-2xl border border-stone-200 bg-stone-950'
            }`}>
              {videoId ? (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                    title={`${temple.name} Live Stream`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0 z-10"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />
                  
                  {/* Neon HUD markers for tech sanctuary */}
                  {templateId === 'tech-sanctuary' && (
                    <div className="absolute inset-0 pointer-events-none z-30 border border-cyan-500/30 m-2 flex flex-col justify-between p-2 font-mono text-[9px] text-cyan-400/80">
                      <div className="flex justify-between">
                        <span>[REC_STREAMING_ON]</span>
                        <span>FREQ: 10.4Hz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LUMINANCE: AUTO</span>
                        <span>FPS: 60_OK</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/50">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                    isHighTech ? 'bg-cyan-950 border border-cyan-900' : 'bg-stone-850'
                  }`}>
                    <Video className={`w-8 h-8 ${isHighTech ? 'text-cyan-400' : 'text-stone-500'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Darshan offline</h3>
                  <p className="text-slate-400 text-xs max-w-sm">
                    {temple.name} live node is currently standby. Next broadcast will resume during scheduled Aarti sessions or holy festivals.
                  </p>
                </div>
              )}
            </div>

            {/* Devotee Interactive Actions Widget */}
            <div className={`p-6 rounded-2xl border ${
              templateId === 'tech-sanctuary'
                ? 'bg-slate-900/80 border-slate-800 text-cyan-400 font-mono'
                : templateId === 'ai-omniscient'
                ? 'bg-white/5 border-white/10 text-white backdrop-blur-md'
                : templateId === 'divine-glow'
                ? 'bg-amber-500/10 border-amber-500/20 text-stone-900'
                : templateId === 'heritage'
                ? 'bg-[#fcf8f2] border-red-800/10 text-stone-900'
                : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                {isHighTech ? <Terminal className="h-4 w-4" /> : '🪔'} Interactive Devotion Modules
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Connect your intent with the temple sanctum. Ring the virtual temple bell or offer sacred flowers to trigger a broadcast pulse.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleRingBell}
                  className={`h-11 px-5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-2 ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/40'
                      : templateId === 'ai-omniscient'
                      ? 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow'
                  }`}
                >
                  <Bell className="h-4 w-4 animate-bounce" />
                  <span>Ring Virtual Bell ({bellRings})</span>
                </Button>

                <Button 
                  onClick={handleOfferFlowers}
                  className={`h-11 px-5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-2 ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-transparent border border-emerald-500 text-emerald-400 hover:bg-emerald-950/40'
                      : templateId === 'ai-omniscient'
                      ? 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Offer Flowers ({flowerOfferings})</span>
                </Button>
              </div>
            </div>

          </div>

          {/* Sidebar: Chat Stream or Telemetry Logs */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Log / Chat Console */}
            <div className={`h-[480px] flex flex-col border overflow-hidden ${
              templateId === 'tech-sanctuary'
                ? 'bg-black border-cyan-950 rounded-lg font-mono text-[11px]'
                : templateId === 'ai-omniscient'
                ? 'bg-white/5 border-white/10 rounded-3xl backdrop-blur-md font-sans text-xs'
                : templateId === 'divine-glow'
                ? 'bg-amber-500/5 border-amber-500/20 rounded-2xl'
                : templateId === 'heritage'
                ? 'bg-stone-50 border-stone-300 rounded-md font-serif'
                : 'bg-white border-stone-200 rounded-2xl'
            }`}>
              
              {/* Console Header */}
              <div className={`p-4 border-b flex justify-between items-center ${
                templateId === 'tech-sanctuary'
                  ? 'border-cyan-950 bg-slate-900/60 text-cyan-400 font-bold'
                  : templateId === 'ai-omniscient'
                  ? 'border-white/10 bg-white/5 text-white font-bold'
                  : 'border-stone-150 bg-stone-100/50 text-stone-850 font-bold'
              }`}>
                <div className="flex items-center gap-2">
                  {isHighTech ? <Activity className="h-4 w-4 animate-pulse text-cyan-400" /> : '👥'}
                  <span>{isHighTech ? 'DARSHAN_DATA_LOG' : 'Virtual Prayer Log'}</span>
                </div>
                {isHighTech && (
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded text-[8px]">
                    NODE_ACTIVE
                  </span>
                )}
              </div>

              {/* Logs area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
                {devoteeLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-2.5 rounded transition-colors ${
                      templateId === 'tech-sanctuary'
                        ? 'bg-slate-950 hover:bg-slate-900/40 border border-slate-900 text-slate-300'
                        : templateId === 'ai-omniscient'
                        ? 'bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200'
                        : 'bg-stone-100/40 border border-stone-200/50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mb-1">
                      <span>[{log.timestamp}]</span>
                      <span className={`uppercase font-bold ${
                        log.type === 'system' 
                          ? 'text-cyan-500' 
                          : log.type === 'prayer' 
                          ? 'text-fuchsia-400' 
                          : log.type === 'offering'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}>{log.type}</span>
                    </div>
                    <p className="leading-relaxed">{log.message}</p>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* Console Input Send Broadcast */}
              <form onSubmit={handleSendPrayer} className={`p-3 border-t flex gap-2 ${
                templateId === 'tech-sanctuary'
                  ? 'border-cyan-950 bg-slate-950'
                  : templateId === 'ai-omniscient'
                  ? 'border-white/10 bg-white/5'
                  : 'border-stone-150 bg-stone-50/50'
              }`}>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isHighTech ? "type message to broadcast..." : "Write a prayer request..."}
                  className={`flex-1 px-3 py-2 text-xs rounded outline-none focus:ring-1 ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-black border border-cyan-950 text-cyan-400 focus:ring-cyan-500'
                      : templateId === 'ai-omniscient'
                      ? 'bg-white/5 border border-white/10 text-white focus:ring-fuchsia-500'
                      : 'bg-white border border-stone-200 text-stone-800 focus:ring-amber-500'
                  }`}
                />
                <Button 
                  type="submit"
                  className={`text-[10px] font-bold uppercase rounded h-8 px-4 shrink-0 ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : templateId === 'ai-omniscient'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  Send
                </Button>
              </form>

            </div>

          </div>

        </div>

        {/* ── Daily Schedule Table ── */}
        <div className={`mt-12 p-6 sm:p-8 rounded-2xl border ${
          templateId === 'tech-sanctuary'
            ? 'bg-slate-900/80 border-slate-800 text-cyan-400 font-mono'
            : templateId === 'ai-omniscient'
            ? 'bg-white/5 border border-white/10 text-white backdrop-blur-md'
            : templateId === 'divine-glow'
            ? 'bg-amber-500/5 border-amber-500/20 text-stone-900'
            : templateId === 'heritage'
            ? 'bg-[#fcf8f2] border-red-800/10 text-stone-900 font-serif'
            : 'bg-white border-stone-200 text-stone-900'
        }`}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CalendarClock className={`w-5 h-5 ${isHighTech ? 'text-cyan-400 animate-pulse' : 'text-amber-600'}`} />
            Daily Darshan & Aarti Timings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-5 rounded-xl border ${
              templateId === 'tech-sanctuary'
                ? 'bg-black/60 border-cyan-950/60'
                : templateId === 'ai-omniscient'
                ? 'bg-white/5 border-white/5'
                : 'bg-stone-50 border-stone-150'
            }`}>
              <div className="flex items-center justify-between border-b pb-2 mb-3 border-stone-200/20">
                <span className="text-xs uppercase tracking-widest font-bold">Morning Protocols</span>
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Mangala Aarti</span>
                  <strong className="text-white">05:30 AM</strong>
                </li>
                <li className="flex justify-between">
                  <span>Sringara Darshan</span>
                  <strong className="text-white">07:30 AM</strong>
                </li>
                <li className="flex justify-between">
                  <span>Bhog Aarti</span>
                  <strong className="text-white">11:30 AM</strong>
                </li>
              </ul>
            </div>

            <div className={`p-5 rounded-xl border ${
              templateId === 'tech-sanctuary'
                ? 'bg-black/60 border-cyan-950/60'
                : templateId === 'ai-omniscient'
                ? 'bg-white/5 border-white/5'
                : 'bg-stone-50 border-stone-150'
            }`}>
              <div className="flex items-center justify-between border-b pb-2 mb-3 border-stone-200/20">
                <span className="text-xs uppercase tracking-widest font-bold">Evening Protocols</span>
                <Clock className="h-4 w-4 text-slate-400" />
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Sandhya Aarti</span>
                  <strong className="text-white">07:00 PM</strong>
                </li>
                <li className="flex justify-between">
                  <span>Sayana Aarti</span>
                  <strong className="text-white">08:45 PM</strong>
                </li>
                <li className="flex justify-between">
                  <span>Darshan Close</span>
                  <strong className="text-white">09:00 PM</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
