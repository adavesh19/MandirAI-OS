'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-stone-900 text-white flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.1),transparent_30%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Ready to Transform Your Temple Operations?
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 mb-10 leading-relaxed">
          Join thousands of temple trusts, administrators, and priests across India who are leveraging AI to automate websites, accept donations, and build lasting devotee connections.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto font-semibold px-8 h-12 bg-white text-stone-900 hover:bg-stone-100 shadow-xl shadow-white/10 hover:shadow-white/20 active:scale-95 transition-all">
              Create Temple Account
            </Button>
          </Link>
          <Link href="/pricing" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-stone-700 hover:bg-stone-850 hover:text-white px-8 h-12 text-stone-250">
              View Detailed Pricing
            </Button>
          </Link>
        </div>
        <p className="text-xs text-stone-500 mt-6">
          No credit card required. Cancel or upgrade at any time.
        </p>
      </div>
    </section>
  )
}
