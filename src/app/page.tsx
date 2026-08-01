import * as React from 'react'
import Navbar from '@/components/landing/navbar'
import HeroSection from '@/components/landing/hero-section'
import FeaturesSection from '@/components/landing/features-section'
import HowItWorks from '@/components/landing/how-it-works'
import PricingSection from '@/components/landing/pricing-section'
import CTASection from '@/components/landing/cta-section'
import Footer from '@/components/landing/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MandirAI OS | #1 Temple Website Builder & Temple Management Software India',
  description:
    "India's #1 AI-powered temple website builder. Create your Hindu temple website in 3 minutes. Manage online donations (UPI), seva bookings, 80G receipts, devotee CRM, live darshan — free to start.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
  },
}

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── BreadcrumbList (for rich SERP) ───────────────────────────────
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mandir-ai-os.vercel.app' },
      ],
    },
    // ── FAQPage — This powers "People Also Ask" in Google SERP ───────
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the best temple website builder in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MandirAI OS is India\'s #1 AI-powered temple website builder. It lets you create a complete Hindu temple website in under 3 minutes, with features for online donations, seva bookings, 80G receipts, and a devotee CRM — all for free.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I create a free temple website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sign up for free at MandirAI OS, enter your temple name and deity, and our AI will generate a complete website in minutes. No coding or design experience needed. Choose from 6 beautiful themes and publish instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I accept online donations for my temple?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. MandirAI OS includes a built-in online donation system supporting UPI, credit/debit cards, and net banking via Razorpay. All donors automatically receive a Section 80G tax exemption receipt on their WhatsApp and email.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an 80G receipt and how do I generate one for temple donations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An 80G receipt (Section 80G of the Income Tax Act) allows donors to claim tax deductions on their charitable donations to a registered religious trust. MandirAI OS auto-generates and sends 80G receipts as PDFs for every online donation — instantly, with zero manual work.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can devotees book sevas and poojas online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With MandirAI OS\'s seva booking system, devotees can browse available services (Archana, Abhishekam, etc.), select a date and time slot, pay online, and receive an instant WhatsApp confirmation — 24/7, from any device.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does MandirAI OS support Hindi and other Indian languages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. MandirAI OS fully supports Hindi, Tamil, Telugu, Kannada, Marathi, and Bengali. Temple websites can be set to any of these languages, and WhatsApp and email messages are also sent in the devotee\'s preferred language.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a free plan for temple management software?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. MandirAI OS offers a generous free plan that includes a temple website, online donations, seva booking, devotee management, and 80G receipts — with no credit card required. Paid plans unlock advanced features like custom domains, WhatsApp broadcasting, and advanced analytics.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I connect my own custom domain to my temple website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. On the paid plan, you can connect your own domain (e.g., shriramtemple.in) to your MandirAI OS temple website with a single click. DNS configuration guides are provided.',
          },
        },
      ],
    },
    // ── HowTo (How to create a temple website) ───────────────────────
    {
      '@type': 'HowTo',
      name: 'How to Create a Temple Website in 3 Minutes with MandirAI OS',
      description: 'Step-by-step guide to creating a professional Hindu temple website using AI.',
      totalTime: 'PT3M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Sign Up for Free',
          text: 'Create a free account at mandir-ai-os.vercel.app — no credit card required.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Temple Details',
          text: 'Enter your temple name, primary deity, city, and a brief description. The AI handles the rest.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Choose a Theme',
          text: 'Select from 6 stunning temple themes: Classic Calm, Heritage Grand, Modern Elegant, Divine Glow, Tech Sanctuary, or AI Omniscient.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Publish Your Website',
          text: 'Click Publish. Your temple website is live instantly with all pages — Home, Sevas, Donations, Events, Gallery, and Contact.',
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
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
