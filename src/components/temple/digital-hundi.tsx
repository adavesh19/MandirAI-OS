'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Sparkles, Trophy, Target, TrendingUp } from 'lucide-react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

interface Campaign {
  id: string
  title: string
  description: string | null
  targetAmount: number
  currentAmount: number
  endDate: string | null
  isActive: boolean
}

interface DigitalHundiProps {
  campaign: Campaign
  currency?: string
}

export default function DigitalHundi({ campaign, currency = '₹' }: DigitalHundiProps) {
  const [showConfetti, setShowConfetti] = React.useState(false)
  const { width, height } = useWindowSize()
  const [animatedAmount, setAnimatedAmount] = React.useState(0)

  const target = Number(campaign.targetAmount) || 1
  const current = Number(campaign.currentAmount) || 0
  
  // Calculate percentage (capped at 100)
  const progressPercent = Math.min(100, Math.max(0, (current / target) * 100))

  React.useEffect(() => {
    // Animate the number counting up
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepValue = current / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setAnimatedAmount((prev) => Math.min(current, prev + stepValue))
      if (currentStep >= steps) clearInterval(timer)
    }, duration / steps)

    // Trigger confetti if goal is reached (or very close)
    if (progressPercent >= 100) {
      setTimeout(() => setShowConfetti(true), 1000)
      setTimeout(() => setShowConfetti(false), 8000) // Stop after 8 seconds
    }

    return () => clearInterval(timer)
  }, [current, progressPercent])

  const formattedTarget = new Intl.NumberFormat('en-IN').format(target)
  const formattedCurrent = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(animatedAmount)

  return (
    <div className="relative w-full max-w-md mx-auto">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-center">
          <Confetti width={width} height={height} numberOfPieces={300} gravity={0.15} />
        </div>
      )}

      {/* Glassmorphic Container */}
      <div className="relative bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 overflow-hidden group hover:shadow-saffron-500/20 transition-all duration-500">
        
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-saffron-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              Live Campaign
            </div>
            <h3 className="font-heading text-2xl font-extrabold text-stone-900 leading-tight">
              {campaign.title}
            </h3>
            {campaign.description && (
              <p className="text-sm text-stone-500 font-medium">{campaign.description}</p>
            )}
          </div>

          {/* The Digital Hundi (Progress Bar) */}
          <div className="space-y-3">
            <div className="flex justify-between items-end mb-1">
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Raised</span>
                <span className="text-3xl font-extrabold text-saffron-600 drop-shadow-sm">
                  {currency}{formattedCurrent}
                </span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block flex items-center justify-end gap-1">
                  <Target className="w-3 h-3" /> Goal
                </span>
                <span className="text-lg font-bold text-stone-700">
                  {currency}{formattedTarget}
                </span>
              </div>
            </div>

            {/* Premium Glass Track */}
            <div className="relative h-6 w-full bg-stone-100/80 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-stone-200/50">
              {/* Animated Fill */}
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 via-saffron-500 to-orange-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)] relative overflow-hidden"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Shine effect inside the bar */}
                <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-white/30 to-transparent" />
                
                {/* Moving stripes for active effect */}
                <div className="absolute inset-0 bg-[length:20px_20px] opacity-20" 
                     style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)' }} />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-stone-500 bg-white/80 px-2 py-0.5 rounded shadow-sm border border-stone-100">
                {progressPercent.toFixed(1)}% Funded
              </span>
              {progressPercent >= 100 && (
                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded shadow-sm border border-emerald-100 animate-pulse">
                  <Trophy className="w-3.5 h-3.5" /> Goal Reached!
                </span>
              )}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white/50 backdrop-blur border border-stone-200/50 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase">Status</p>
                <p className="text-xs font-bold text-stone-800">
                  {campaign.isActive ? 'Active Now' : 'Closed'}
                </p>
              </div>
            </div>
            
            {campaign.endDate && (
              <div className="bg-white/50 backdrop-blur border border-stone-200/50 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">⏳</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase">Ends</p>
                  <p className="text-xs font-bold text-stone-800">
                    {new Date(campaign.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
