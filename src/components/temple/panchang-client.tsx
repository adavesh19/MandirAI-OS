'use client'

import * as React from 'react'
import { Sun, Moon, Compass, Star, Crosshair, Cpu, ShieldAlert } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface PanchangClientProps {
  templeName: string
  templateId: string
  panchangData: {
    date: string
    tithi: string
    nakshatra: string
    sunrise: string
    sunset: string
    rahuKalam: string
    yamaGandam: string
    auspiciousTime: string
    moonSign: string
    sunSign: string
  }
}

export default function PanchangClient({ templeName, templateId, panchangData }: PanchangClientProps) {
  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  if (isHighTech) {
    return (
      <div className="space-y-10 animate-in fade-in duration-700 font-mono text-slate-300 relative pb-20">
        
        {/* HUD Header */}
        <div className="relative border border-cyan-850 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="absolute -right-8 -top-8 text-[12rem] opacity-5 select-none pointer-events-none rotate-12">⏳</div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 mr-2 animate-pulse" />
              TEMPORAL COORDINATES // PLANETARY_SYNC
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              System Panchang
            </h1>
            <p className="text-sm text-slate-400 border-l-2 border-cyan-500 pl-3 leading-relaxed">
              Real-time planetary telemetry and auspicious synchronization windows for {templeName}.
            </p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Tithi & Nakshatra */}
          <Card className="border border-slate-800 bg-slate-950/50 rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-cyan-400 transition-all">
              <Star className="w-12 h-12" />
            </div>
            <CardContent className="p-8 relative z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Lunar Phase [Tithi]</span>
              <h3 className="text-2xl font-black text-white mb-6 group-hover:text-cyan-400 transition-colors">{panchangData.tithi}</h3>
              
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Constellation [Nakshatra]</span>
              <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">{panchangData.nakshatra}</h3>
            </CardContent>
          </Card>

          {/* Solar/Lunar Timing */}
          <Card className="border border-slate-800 bg-slate-950/50 rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-amber-400 transition-all">
              <Sun className="w-12 h-12" />
            </div>
            <CardContent className="p-8 relative z-10 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Sun className="w-3 h-3 text-amber-500" />
                  Solar Ignition [Sunrise]
                </span>
                <p className="font-mono text-xl text-white">{panchangData.sunrise}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Moon className="w-3 h-3 text-blue-500" />
                  Solar Shutdown [Sunset]
                </span>
                <p className="font-mono text-xl text-white">{panchangData.sunset}</p>
              </div>
            </CardContent>
          </Card>

          {/* Alert Windows */}
          <Card className="border border-red-900/30 bg-red-950/10 rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-50 group-hover:text-red-500 transition-all">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <CardContent className="p-8 relative z-10 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1 block">Caution Zone [Rahu Kalam]</span>
                <p className="font-mono text-xl text-red-100">{panchangData.rahuKalam}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1 block">Warning Zone [Yama Gandam]</span>
                <p className="font-mono text-xl text-orange-100">{panchangData.yamaGandam}</p>
              </div>
            </CardContent>
          </Card>
          
        </div>

        {/* Optimal Window */}
        <div className="relative border border-emerald-900/50 bg-emerald-950/20 p-8 rounded-3xl flex items-center justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center shrink-0">
              <Crosshair className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest block mb-1">Optimal Execution Window [Auspicious Time]</span>
              <p className="text-3xl font-black text-emerald-50">{panchangData.auspiciousTime}</p>
            </div>
            <div className="ml-auto bg-emerald-900/50 px-4 py-2 rounded-xl border border-emerald-800/50 hidden md:block">
              <span className="text-emerald-400 text-xs font-bold tracking-widest">STATUS: GREEN</span>
            </div>
          </div>
        </div>

      </div>
    )
  }

  // Classic Theme
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/60 to-transparent blur-3xl rounded-full -z-10 opacity-60" />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-white p-8 sm:p-12 shadow-sm border border-amber-100/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-multiply" />
        <div className="absolute -right-8 -top-8 text-[12rem] opacity-5 select-none pointer-events-none rotate-12">☀️</div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/50 backdrop-blur-md">
            <span className="text-xs font-bold text-amber-700 tracking-widest uppercase flex items-center gap-2">
              <Compass className="w-3 h-3" />
              Divine Calendar
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Today's Panchang
          </h1>
          <p className="text-xl text-stone-600 font-medium">
            Daily astrological timings and planetary positions for {templeName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tithi */}
        <Card className="border border-amber-200/50 shadow-md bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group relative">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🌙
            </div>
            <h4 className="font-bold text-stone-500 uppercase tracking-widest text-xs mb-2">Tithi</h4>
            <h3 className="text-2xl font-heading font-bold text-stone-900">{panchangData.tithi}</h3>
          </CardContent>
        </Card>

        {/* Nakshatra */}
        <Card className="border border-amber-200/50 shadow-md bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group relative">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              ✨
            </div>
            <h4 className="font-bold text-stone-500 uppercase tracking-widest text-xs mb-2">Nakshatra</h4>
            <h3 className="text-2xl font-heading font-bold text-stone-900">{panchangData.nakshatra}</h3>
          </CardContent>
        </Card>

        {/* Sunrise/Sunset */}
        <Card className="border border-amber-200/50 shadow-md bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow relative">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="text-amber-500 w-6 h-6" />
                <span className="font-bold text-stone-500 uppercase tracking-widest text-xs">Sunrise</span>
              </div>
              <span className="font-bold text-stone-900">{panchangData.sunrise}</span>
            </div>
            <div className="w-full h-px bg-stone-100" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="text-indigo-400 w-6 h-6" />
                <span className="font-bold text-stone-500 uppercase tracking-widest text-xs">Sunset</span>
              </div>
              <span className="font-bold text-stone-900">{panchangData.sunset}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timings */}
        <Card className="border border-amber-200/50 shadow-md bg-white rounded-3xl overflow-hidden lg:col-span-3">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
              <div className="p-8 text-center bg-emerald-50/50">
                <h4 className="font-bold text-emerald-600 uppercase tracking-widest text-xs mb-2">Auspicious Time</h4>
                <h3 className="text-2xl font-bold text-emerald-900">{panchangData.auspiciousTime}</h3>
              </div>
              <div className="p-8 text-center bg-red-50/50">
                <h4 className="font-bold text-red-600 uppercase tracking-widest text-xs mb-2">Rahu Kalam</h4>
                <h3 className="text-2xl font-bold text-red-900">{panchangData.rahuKalam}</h3>
              </div>
              <div className="p-8 text-center bg-orange-50/50">
                <h4 className="font-bold text-orange-600 uppercase tracking-widest text-xs mb-2">Yama Gandam</h4>
                <h3 className="text-2xl font-bold text-orange-900">{panchangData.yamaGandam}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
