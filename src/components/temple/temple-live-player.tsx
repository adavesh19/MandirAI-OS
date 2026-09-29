'use client'

import React, { useState } from 'react'
import { Play, Users, Bell, Sparkles, Flame, Radio } from 'lucide-react'

export function extractYoutubeId(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null
  const cleaned = url.trim()
  if (!cleaned) return null

  // Raw 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleaned)) {
    return cleaned
  }

  // Regular expressions for various YouTube URL patterns
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/
  const match = cleaned.match(regExp)
  return match && match[1] ? match[1] : null
}

interface TempleLivePlayerProps {
  liveStreamUrl?: string | null
  coverImageUrl?: string | null
  templeName: string
  accentColor?: string
  onOpenEditor?: () => void
}

export default function TempleLivePlayer({
  liveStreamUrl,
  coverImageUrl,
  templeName,
  accentColor = '#c8923f',
  onOpenEditor,
}: TempleLivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [bellRung, setBellRung] = useState(false)
  const [flowerShower, setFlowerShower] = useState(false)
  const [diyaLit, setDiyaLit] = useState(false)

  const videoId = extractYoutubeId(liveStreamUrl)
  const fallbackBg = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80'
  const displayImage = coverImageUrl || fallbackBg

  const handleRingBell = () => {
    setBellRung(true)
    try {
      // Play temple bell chime synthesized sound
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, audioCtx.currentTime) // A5 note
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 1.2)
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start()
      osc.stop(audioCtx.currentTime + 1.5)
    } catch {
      // AudioContext fallback
    }
    setTimeout(() => setBellRung(false), 2000)
  }

  const handleFlowerShower = () => {
    setFlowerShower(true)
    setTimeout(() => setFlowerShower(false), 2500)
  }

  const handleLightDiya = () => {
    setDiyaLit(!diyaLit)
  }

  return (
    <div className="relative rounded-3xl bg-stone-950 border border-stone-800/80 p-3 sm:p-5 shadow-2xl overflow-hidden group">
      {/* Flower Shower Animation Overlay */}
      {flowerShower && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-fall"
              style={{
                left: `${(i * 6.5) % 100}%`,
                top: `-20px`,
                animation: `fall 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.1}s forwards`,
              }}
            >
              {['🌸', '🌺', '🌼', '🏵️', '✨'][i % 5]}
            </div>
          ))}
          <style jsx>{`
            @keyframes fall {
              0% { transform: translateY(0) rotate(0deg) scale(0.6); opacity: 1; }
              100% { transform: translateY(500px) rotate(360deg) scale(1.1); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Main Video Frame */}
      <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center shadow-inner">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
            title={`${templeName} Garbhagriha Live Darshan`}
            className="w-full h-full border-0 rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Standby Background Image with Temple Cover Photo */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${displayImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 max-w-lg">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-stone-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Radio className="w-8 h-8 animate-pulse text-stone-950" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                  Sanctum Live Streaming Ready
                </span>
                <h4 className="text-white font-serif text-lg sm:text-xl font-bold">
                  {templeName}
                </h4>
                <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                  Devotees can watch 4K live darshan from anywhere. Add your YouTube Live link anytime via the editor.
                </p>
              </div>

              {onOpenEditor && (
                <button
                  type="button"
                  onClick={onOpenEditor}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Connect YouTube Live Stream
                </button>
              )}
            </div>
          </div>
        )}

        {/* Live Status Header Overlay */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-lg bg-rose-600/95 text-white text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
          <span className="px-3 py-1 rounded-lg bg-stone-900/80 backdrop-blur-md text-stone-200 text-[11px] border border-white/10 font-medium">
            Moolavar Sanctum 4K
          </span>
        </div>
      </div>

      {/* Devotee Interactive Engagement Bar */}
      <div className="mt-3.5 px-1 sm:px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-stone-200">
            2,840+ Devotees currently connected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRingBell}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              bellRung
                ? 'bg-amber-500 text-stone-950 border-amber-400 scale-105 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-stone-200 border-white/10 hover:border-amber-400/40'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 ${bellRung ? 'animate-bounce' : 'text-amber-400'}`} />
            {bellRung ? 'Bell Rung! 🔔' : 'Ring Bell'}
          </button>

          <button
            type="button"
            onClick={handleFlowerShower}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              flowerShower
                ? 'bg-pink-500 text-white border-pink-400 scale-105 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-stone-200 border-white/10 hover:border-pink-400/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Offer Flowers 🌺
          </button>

          <button
            type="button"
            onClick={handleLightDiya}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              diyaLit
                ? 'bg-orange-500 text-stone-950 border-orange-400 scale-105 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-stone-200 border-white/10 hover:border-orange-400/40'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${diyaLit ? 'text-stone-950 animate-pulse' : 'text-orange-400'}`} />
            {diyaLit ? 'Diya Lit! 🪔' : 'Light Diya'}
          </button>
        </div>
      </div>
    </div>
  )
}
