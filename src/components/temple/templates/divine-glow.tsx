'use client'

import * as React from 'react'
import Link from 'next/link'
import { Flame, Play, Volume2, Maximize2, X, Heart, Sparkles, Navigation, Calendar } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function DivineGlowTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const [diyasLit, setDiyasLit] = React.useState(0)
  const [focusMode, setFocusMode] = React.useState(false)

  // Cursor tracking for radial spotlight
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    containerRef.current.style.setProperty('--mouse-x', `${x}px`)
    containerRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const titleText = page?.title ? t(page.title) : `The Divine ${temple.name}`
  const descText = page?.description ? t(page.description) : `Ignite the flame of devotion. Enter the eternal darkness illuminated only by the grace of the Supreme.`

  const hexagons = [
    { label: 'Live Darshan', icon: <Play/>, href: `/temple/${temple.slug}/live` },
    { label: 'Book Sevas', icon: <Sparkles/>, href: `/temple/${temple.slug}/sevas` },
    { label: 'Offer Donation', icon: <Heart/>, href: `/temple/${temple.slug}/donate` },
    { label: 'Temple Map', icon: <Navigation/>, href: `/temple/${temple.slug}/about` },
    { label: 'Festivals', icon: <Calendar/>, href: `/temple/${temple.slug}/events` },
  ]

  const lightDiya = () => {
    if (diyasLit < 108) setDiyasLit(prev => prev + 1)
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`min-h-screen bg-black text-orange-50 font-serif overflow-x-hidden relative transition-all duration-1000 ${focusMode ? 'brightness-50' : 'brightness-100'}`}
    >
      <style dangerouslySetInnerHTML={{__html:`
        :root { --mouse-x: 50%; --mouse-y: 50%; }
        .spotlight {
          position: absolute; inset: 0; pointer-events: none; z-index: 10;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(251, 146, 60, 0.15), transparent 40%);
        }
        .hex-grid { display: flex; flex-wrap: wrap; justify-content: center; max-width: 800px; margin: 0 auto; }
        .hex { 
          width: 160px; height: 180px; background: rgba(20, 10, 0, 0.8); margin: 5px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: all 0.5s; cursor: pointer; border: 1px solid rgba(251, 146, 60, 0.2);
        }
        .hex:hover { background: rgba(251, 146, 60, 0.15); filter: drop-shadow(0 0 20px rgba(251,146,60,0.6)); transform: scale(1.05); z-index: 20; }
        .ember { animation: float-up linear infinite; position: absolute; border-radius: 50%; background: #fb923c; opacity: 0; }
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; box-shadow: 0 0 10px #f97316; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-500px) scale(0); opacity: 0; }
        }
        .glowing-text { text-shadow: 0 0 20px rgba(251, 146, 60, 0.8), 0 0 40px rgba(249, 115, 22, 0.4); }
        .focus-player { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 100; width: 90vw; max-width: 1200px; box-shadow: 0 0 100px rgba(251,146,60,0.2); }
      `}} />

      {/* Mouse Spotlight */}
      <div className="spotlight hidden md:block" />

      {/* Floating Embers */}
      {Array.from({length: 30}).map((_, i) => (
        <div key={i} className="ember" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          animationDuration: `${Math.random() * 5 + 3}s`,
          animationDelay: `${Math.random() * 5}s`
        }} />
      ))}

      {/* ══ HERO: Intense Darkness & Glow ════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <button onClick={lightDiya} className="mb-12 group relative">
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/40 transition-all duration-1000" />
          <Flame className={`w-20 h-20 relative z-10 transition-colors duration-1000 ${diyasLit > 0 ? 'text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,1)]' : 'text-slate-800'}`} />
        </button>
        
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-800 mb-6 glowing-text">
          {temple.name || titleText}
        </h1>
        
        <p className="text-xl text-orange-200/50 max-w-2xl font-light italic mb-16">
          {descText}
        </p>
        
        <p className="text-sm font-sans tracking-widest text-orange-500/60 uppercase">
          {diyasLit > 0 ? `${diyasLit} Flames of Devotion Lit Today` : 'Click the flame to offer your devotion'}
        </p>
      </section>

      {/* ══ HEXAGONAL NAVIGATION GRIDS ═══════════════════════════════════ */}
      <section className="py-24 relative z-20">
        <div className="hex-grid">
          {hexagons.map((hex, i) => (
            <Link href={hex.href} key={i} className="hex group">
              <div className="text-orange-500/50 group-hover:text-orange-400 group-hover:scale-125 transition-all mb-4">
                {hex.icon}
              </div>
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-orange-200 text-center px-4">
                {hex.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ AARTI FOCUS MODE (Live Stream) ═══════════════════════════════ */}
      <section className="py-32 px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-orange-200 mb-4">The Divine Vision</h2>
            <p className="text-orange-500/60">Experience the sanctum live. Enter Focus Mode to eliminate all distractions.</p>
          </div>

          <div className="relative aspect-video bg-[#0a0500] border border-orange-900/50 rounded-2xl overflow-hidden group">
            {temple.liveStreamUrl ? (
              <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-orange-500/30 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border border-orange-500/10 animate-ping" />
                  <Play className="w-8 h-8 text-orange-500/50" />
                </div>
                <p className="text-orange-200/50 font-sans tracking-widest uppercase text-sm">Transmission Standby</p>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-left">
                <span className="bg-red-900/80 text-red-400 text-xs font-bold uppercase px-3 py-1 rounded flex items-center gap-2 mb-2 w-max">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live
                </span>
                <p className="text-lg text-orange-100">Garbhagriha Feed</p>
              </div>
              
              <button 
                onClick={() => setFocusMode(true)}
                className="bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 p-3 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 text-sm uppercase tracking-widest font-sans font-bold border border-orange-500/30"
              >
                <Maximize2 className="w-4 h-4" /> Focus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Mode Overlay */}
      {focusMode && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button 
            onClick={() => setFocusMode(false)}
            className="absolute top-8 right-8 text-orange-500/50 hover:text-orange-400 p-4"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-[90vw] max-w-6xl aspect-video bg-[#0a0500] border border-orange-900/50 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(251,146,60,0.1)]">
             {temple.liveStreamUrl ? (
                <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Play className="w-16 h-16 text-orange-500/20 mb-6" />
                  <p className="text-orange-200/30 font-sans tracking-widest uppercase text-lg">Stream Offline</p>
                </div>
              )}
          </div>
          
          <div className="absolute bottom-12 text-center">
             <p className="text-orange-500/40 italic font-light">"Close your eyes to the world, open your eyes to the Divine."</p>
          </div>
        </div>
      )}

      {/* ══ SACRED MANTRAS (Audio Focus) ═════════════════════════════════ */}
      <section className="py-32 px-4 relative z-20 border-t border-orange-900/30 bg-[#050200]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-orange-200 mb-4">Vedic Resonance</h2>
            <p className="text-orange-500/60">Listen to the eternal vibrations.</p>
          </div>
          
          <div className="space-y-4">
            {['Om Namah Shivaya', 'Gayatri Mantra', 'Maha Mrityunjaya'].map((mantra, i) => (
              <div key={i} className="p-6 border border-orange-900/30 bg-black/50 hover:bg-orange-950/20 transition-colors flex items-center justify-between group cursor-pointer rounded-xl">
                <div>
                  <h3 className="text-xl text-orange-100 mb-1">{mantra}</h3>
                  <p className="text-sm text-orange-500/50 font-sans uppercase tracking-widest">108 Chants • 15 Mins</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all text-orange-700">
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12 relative z-20 bg-black"><BlockRenderer blocks={page.blocks} theme="divine" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="py-24 px-4 text-center relative z-20 border-t border-orange-900/30">
        <Flame className="w-8 h-8 text-orange-500/30 mx-auto mb-8" />
        <h3 className="text-2xl text-orange-200/50 uppercase tracking-widest font-sans font-bold mb-8">
          {temple.name}
        </h3>
        <div className="flex justify-center gap-8 text-xs font-sans uppercase tracking-widest text-orange-500/40 mb-16">
          <Link href={`/temple/${temple.slug}/sevas`} className="hover:text-orange-400">Offerings</Link>
          <Link href={`/temple/${temple.slug}/live`} className="hover:text-orange-400">Vision</Link>
          <Link href={`/temple/${temple.slug}/donate`} className="hover:text-orange-400">Devotion</Link>
        </div>
        <p className="text-orange-900/50 text-xs font-sans">Om Shanti Shanti Shanti</p>
      </footer>

    </div>
  )
}
