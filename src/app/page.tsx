import * as React from 'react'
import Navbar from '@/components/landing/navbar'
import HeroSection from '@/components/landing/hero-section'
import FeaturesSection from '@/components/landing/features-section'
import HowItWorks from '@/components/landing/how-it-works'
import PricingSection from '@/components/landing/pricing-section'
import CTASection from '@/components/landing/cta-section'
import Footer from '@/components/landing/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
