'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/shared/language-context'

export default function CTASection() {
  const { t, isKannada } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden bg-stone-900 text-white flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.15),transparent_40%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-500/20 border border-saffron-500/40 text-saffron-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
          <span>{isKannada ? '⚡ ಸೀಮಿತ ಅವಧಿಯ ಬಿಡುಗಡೆ ಕೊಡುಗೆ — ಕೇವಲ ₹299' : '⚡ Limited Time Launch Offer — Just ₹299'}</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          {isKannada 
            ? 'ನಿಮ್ಮ ದೇವಾಲಯದ ಆನ್‌ಲೈನ್ ಉಪಸ್ಥಿತಿಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?'
            : 'Ready to Transform Your Temple Online?'}
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 mb-10 leading-relaxed font-medium">
          {isKannada
            ? 'ಭಾರತದ ಸಾವಿರಾರು ದೇವಾಲಯ ಟ್ರಸ್ಟ್‌ಗಳು, ಆಡಳಿತಾಧಿಕಾರಿಗಳು ಮತ್ತು ಅರ್ಚಕರೊಂದಿಗೆ ಸೇರಿ. ಕೇವಲ ₹299 ಕ್ಕೆ ನಿಮ್ಮ ದೇವಾಲಯದ ವೆಬ್‌ಸೈಟ್, ಇ-ಹುಂಡಿ, ಸೇವಾ ಬುಕಿಂಗ್ ಮತ್ತು ಭಕ್ತರ ಸಂಪರ್ಕವನ್ನು ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ.'
            : 'Join thousands of temple trusts and priests across India. For just ₹299 launch price, get a complete AI website, online seva booking, UPI digital hundi, and devotee CRM.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/onboarding?plan=free" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto font-black px-8 h-14 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all text-base gap-2 border border-emerald-400/30">
              <Sparkles className="h-4 w-4 text-emerald-200 animate-pulse" />
              <span>{isKannada ? 'ಉಚಿತ ದೇವಾಲಯ ವೆಬ್‌ಸೈಟ್ ರಚಿಸಿ (ಸಂಪೂರ್ಣ ಉಚಿತ)' : 'Create Free Temple Website (Fully Free)'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/onboarding?plan=launch-299" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto font-bold px-8 h-14 bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 hover:from-saffron-500 hover:to-amber-500 text-white shadow-xl shadow-saffron-500/20 hover:scale-105 active:scale-95 transition-all text-base gap-2">
              <Sparkles className="h-4 w-4 text-yellow-200" />
              <span>{isKannada ? '₹299 ಕ್ಕೆ ವೆಬ್‌ಸೈಟ್ ರಚಿಸಿ' : 'Create Temple Website @ ₹299'}</span>
            </Button>
          </Link>
          <Link href="#pricing" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-stone-700 hover:bg-stone-800 hover:text-white px-8 h-14 text-stone-300 text-base font-semibold">
              {isKannada ? 'ಬೆಲೆ ವಿವರ ವೀಕ್ಷಿಸಿ' : 'View Pricing Plans'}
            </Button>
          </Link>
        </div>
        <p className="text-xs text-stone-400 mt-6 font-medium">
          {isKannada 
            ? 'ಯಾವುದೇ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ • 3 ನಿಮಿಷಗಳಲ್ಲಿ ವೆಬ್‌ಸೈಟ್ ಲೈವ್ ಆಗುತ್ತದೆ'
            : 'Instant AI setup in 3 minutes • 100% money-back guarantee • 0% donation fee'}
        </p>
      </div>
    </section>
  )
}

