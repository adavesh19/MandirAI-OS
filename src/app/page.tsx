import * as React from 'react'
import Navbar from '@/components/landing/navbar'
import HeroSection from '@/components/landing/hero-section'
import FeaturesSection from '@/components/landing/features-section'
import HowItWorks from '@/components/landing/how-it-works'
import PricingSection from '@/components/landing/pricing-section'
import CTASection from '@/components/landing/cta-section'
import Footer from '@/components/landing/footer'

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://mandir-ai-os.vercel.app/#organization',
        name: 'MandirAI OS',
        url: 'https://mandir-ai-os.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mandir-ai-os.vercel.app/logo.png',
        },
        description: "India's #1 AI-powered temple website builder and temple management software.",
        foundingDate: '2024',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mandir-ai-os.vercel.app/#website',
        url: 'https://mandir-ai-os.vercel.app',
        name: 'MandirAI OS',
        description: "India's #1 Temple Website Builder & Management Platform",
        publisher: { '@id': 'https://mandir-ai-os.vercel.app/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://mandir-ai-os.vercel.app/?s={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'MandirAI OS — Temple Website Builder & Management Software',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Any',
        description:
          "India's #1 AI-powered temple website builder. Create a full Hindu temple website in 3 minutes. Manage donations, seva bookings, devotee CRM, and 80G receipts.",
        url: 'https://mandir-ai-os.vercel.app',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          description: 'Free plan available — no credit card required',
        },
        featureList: [
          'AI temple website builder',
          'Online donation with UPI & Razorpay',
          '80G tax receipt generator',
          'Seva & pooja booking system',
          'Devotee CRM with Gotra & Nakshatra',
          'Multilingual support (Hindi, Tamil, Telugu, Kannada)',
          'Custom domain hosting',
          'Festival event management',
          'Live darshan streaming integration',
          'WhatsApp & email notifications',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1200',
          bestRating: '5',
        },
      },
    ],
  }

  return (
    <>
      {/* Organization + WebSite + SoftwareApp schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
