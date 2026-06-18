'use client'

import * as React from 'react'
import { QrCode, Coins, TrendingUp, Sparkles, Heart } from 'lucide-react'

interface DigitalHundiClientProps {
  temple: any
  recentDonations: Array<{ id: string; amount: number; donorName: string | null; timeAgo: string }>
}

export default function DigitalHundiClient({ temple, recentDonations }: DigitalHundiClientProps) {
  const isHighTech = temple.themeConfig?.templateId === 'tech-sanctuary' || temple.themeConfig?.templateId === 'ai-omniscient'
  
  // Simulated progress towards daily goal (e.g., 50,000 INR)
  const dailyGoal = 50000
  const currentTotal = recentDonations.reduce((sum, d) => sum + d.amount, 0)
  const progressPercent = Math.min((currentTotal / dailyGoal) * 100, 100)

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between overflow-hidden ${
      isHighTech 
        ? 'bg-stone-950 text-white font-mono selection:bg-cyan-500/30' 
        : 'bg-gradient-to-br from-amber-50 to-saffron-100 text-stone-900 font-sans'
    }`}>
      {/* Background Decor */}
      {isHighTech && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        </div>
      )}

      {/* Header */}
      <header className={`relative z-10 p-8 flex items-center justify-between border-b ${
        isHighTech ? 'border-stone-800 bg-stone-950/80 backdrop-blur-md' : 'border-saffron-200/50 bg-white/50 backdrop-blur-md'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            isHighTech ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-400' : 'bg-saffron-500 text-white shadow-lg'
          }`}>
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">{temple.name}</h1>
            <p className={`text-xl mt-1 tracking-widest uppercase ${isHighTech ? 'text-cyan-500' : 'text-saffron-600'}`}>
              Digital Hundi
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighTech ? 'bg-green-400' : 'bg-saffron-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isHighTech ? 'bg-green-500' : 'bg-saffron-500'}`}></span>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-stone-500">Live Network</span>
          </div>
          <p className="text-2xl font-bold mt-2 font-mono">
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex p-8 gap-8">
        
        {/* Left Side: QR Code & Goal */}
        <div className="w-1/2 flex flex-col justify-center gap-8 pr-8 border-r border-stone-800/20 dark:border-stone-800">
          
          <div className="text-center space-y-4">
            <h2 className={`text-5xl font-black ${isHighTech ? 'text-white' : 'text-stone-900'}`}>
              Offer Your Seva
            </h2>
            <p className={`text-2xl ${isHighTech ? 'text-stone-400' : 'text-stone-600'}`}>
              Scan the QR code below using any UPI app to donate instantly.
            </p>
          </div>

          <div className="flex justify-center">
            <div className={`p-8 rounded-3xl flex flex-col items-center gap-6 ${
              isHighTech 
                ? 'bg-stone-900 border-2 border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]' 
                : 'bg-white shadow-2xl border-2 border-saffron-100'
            }`}>
              {/* Fake QR Code visual for demonstration */}
              <div className={`w-80 h-80 rounded-2xl flex items-center justify-center ${isHighTech ? 'bg-stone-800' : 'bg-stone-50 border border-stone-200'}`}>
                <QrCode className={`w-64 h-64 ${isHighTech ? 'text-cyan-400' : 'text-stone-900'}`} />
              </div>
              <div className={`px-6 py-3 rounded-full text-xl font-bold tracking-widest ${
                isHighTech ? 'bg-cyan-950 text-cyan-400 border border-cyan-900' : 'bg-saffron-100 text-saffron-700'
              }`}>
                {temple.upiId || 'temple@upi'}
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Live Ticker */}
        <div className="w-1/2 flex flex-col pl-4">
          <div className="flex items-center gap-3 mb-8">
            <Heart className={`w-8 h-8 ${isHighTech ? 'text-purple-500' : 'text-red-500'}`} />
            <h3 className="text-3xl font-bold tracking-tight">Recent Offerings</h3>
          </div>

          <div className="flex-1 overflow-hidden relative">
            {/* Fading edges for the scrolling list */}
            <div className={`absolute top-0 inset-x-0 h-12 z-10 bg-gradient-to-b ${
              isHighTech ? 'from-stone-950 to-transparent' : 'from-amber-50 to-transparent'
            }`} />
            <div className={`absolute bottom-0 inset-x-0 h-12 z-10 bg-gradient-to-t ${
              isHighTech ? 'from-stone-950 to-transparent' : 'from-amber-50 to-transparent'
            }`} />
            
            <div className="flex flex-col gap-4 animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused]">
              {recentDonations.map((d, i) => (
                <div key={i} className={`p-6 rounded-2xl flex items-center justify-between ${
                  isHighTech 
                    ? 'bg-stone-900 border border-stone-800' 
                    : 'bg-white shadow-md border border-stone-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isHighTech ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500'
                    }`}>
                      <Coins className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{d.donorName || 'Anonymous Devotee'}</h4>
                      <p className={`text-lg mt-1 ${isHighTech ? 'text-stone-500' : 'text-stone-500'}`}>
                        {d.timeAgo}
                      </p>
                    </div>
                  </div>
                  <div className={`text-3xl font-black ${isHighTech ? 'text-green-400' : 'text-green-600'}`}>
                    ₹{d.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {/* Duplicate array for seamless infinite scroll effect */}
              {recentDonations.map((d, i) => (
                <div key={`dup-${i}`} className={`p-6 rounded-2xl flex items-center justify-between ${
                  isHighTech 
                    ? 'bg-stone-900 border border-stone-800' 
                    : 'bg-white shadow-md border border-stone-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isHighTech ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500'
                    }`}>
                      <Coins className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{d.donorName || 'Anonymous Devotee'}</h4>
                      <p className={`text-lg mt-1 ${isHighTech ? 'text-stone-500' : 'text-stone-500'}`}>
                        {d.timeAgo}
                      </p>
                    </div>
                  </div>
                  <div className={`text-3xl font-black ${isHighTech ? 'text-green-400' : 'text-green-600'}`}>
                    ₹{d.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-50% - 1rem)); }
        }
      `}} />
    </div>
  )
}
