import * as React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { LanguageProvider } from '@/components/shared/language-context'
import TempleNavigation from '@/components/temple/temple-navigation'
import DevoteeCopilot from '@/components/shared/devotee-copilot'

// ── SEO & GOOGLE RANKING: Dynamic Metadata Generation ─────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple) return {}

  const seoConfig = temple.seoConfig as any || {}
  const defaultTitle = `${temple.name} — Official Temple Portal`
  const defaultDesc = `Welcome to the official website of ${temple.name}. Find daily timings, book pooja slots, read history, and donate online.`
  const keywords = seoConfig.keywords || [temple.name, temple.primaryDeity, 'temple', 'hindu temple', 'pooja', 'darshan timings', 'online donation']

  return {
    title: seoConfig.title || defaultTitle,
    description: seoConfig.description || defaultDesc,
    keywords: keywords.join(', '),
    openGraph: {
      title: seoConfig.title || defaultTitle,
      description: seoConfig.description || defaultDesc,
      url: `https://temple-ai.os/temple/${slug}`,
      siteName: temple.name,
      images: [
        {
          url: temple.coverImageUrl || '/placeholder-temple.jpg',
          width: 1200,
          height: 630,
          alt: temple.name,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoConfig.title || defaultTitle,
      description: seoConfig.description || defaultDesc,
      images: [temple.coverImageUrl || '/placeholder-temple.jpg'],
    },
    alternates: {
      canonical: `https://temple-ai.os/temple/${slug}`,
    },
  }
}

// ── Mobile Auto-Optimization: Viewport Export ─────────────
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}


interface TempleLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function TempleLayout({ children, params }: TempleLayoutProps) {
  const { slug } = await params

  // Fetch temple details
  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  // 404 if not found or suspended
  if (!temple || !temple.isActive) {
    notFound()
  }

  // Fetch all published pages for this temple website
  const pages = await prisma.templePage.findMany({
    where: {
      templeId: temple.id,
      isPublished: true,
    },
    orderBy: { sortOrder: 'asc' },
  })

  // Format the temple data for context transmission
  const serializableTemple = {
    id: temple.id,
    name: temple.name,
    slug: temple.slug,
    templeType: temple.templeType,
    primaryDeity: temple.primaryDeity,
    timings: temple.timings as any,
    address: temple.address as any,
    contactPhone: temple.contactPhone,
    contactEmail: temple.contactEmail,
    websiteDomain: temple.websiteDomain,
    upiId: temple.upiId,
    themeConfig: temple.themeConfig as any,
  }

  const serializablePages = pages.map((p) => {
    const pageContent = p.content && typeof p.content === 'object' ? (p.content as any) : {}
    return {
      id: p.id,
      pageType: p.pageType,
      title: pageContent.title || {},
      content: pageContent.html || '',
    }
  })

  // ── GOOGLE AI & RICH SNIPPETS: Structured JSON-LD Data ─────────────
  const addressObj = temple.address as any || {}
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    name: temple.name,
    description: (temple.seoConfig as any)?.description || `Official website of ${temple.name}`,
    url: `https://temple-ai.os/temple/${slug}`,
    telephone: temple.contactPhone || '',
    email: temple.contactEmail || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressObj.line1 || '',
      addressLocality: addressObj.city || '',
      addressRegion: addressObj.state || '',
      postalCode: addressObj.pincode || '',
      addressCountry: addressObj.country || 'IN',
    },
    openingHours: [
      `Mo-Su ${(temple.timings as any)?.morning_open}-${(temple.timings as any)?.morning_close}`,
      `Mo-Su ${(temple.timings as any)?.evening_open}-${(temple.timings as any)?.evening_close}`,
    ],
  }

  const themeConfigObj = temple.themeConfig as any || {}
  const primaryColor = themeConfigObj.primaryColor
  const accentColor = themeConfigObj.accentColor
  const fontFamily = themeConfigObj.fontFamily

  const customStyleRules = `
    ${primaryColor ? `:root { --primary: ${primaryColor} !important; --ring: ${primaryColor} !important; }` : ''}
    ${accentColor ? `:root { --accent: ${accentColor} !important; }` : ''}
    ${fontFamily ? `* { font-family: ${fontFamily}, ui-sans-serif, system-ui, sans-serif !important; }` : ''}
  `

  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {customStyleRules.trim() && (
        <style dangerouslySetInnerHTML={{ __html: customStyleRules }} />
      )}
      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950">
        {/* Multilingual Client Header Navbar Navigation */}
        <TempleNavigation temple={serializableTemple} pages={serializablePages} />

        {/* Content body */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* Simple spiritual footer */}
        <footer className="bg-stone-900 border-t border-stone-850 text-stone-400 py-16 text-sm shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Trust Info */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-white text-base flex items-center gap-2">
                <span>🕉️</span> {temple.name}
              </h4>
              <p className="text-xs text-stone-450 leading-relaxed font-light">
                Dedicated to Lord {temple.primaryDeity || 'the Divine'}. A sacred space for prayer, meditation, and devotional activities.
              </p>
              <div className="pt-2 text-xs text-stone-500">
                {temple.contactEmail && <p>Email: {temple.contactEmail}</p>}
                {temple.contactPhone && <p>Phone: {temple.contactPhone}</p>}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`/temple/${temple.slug}`} className="hover:text-saffron-400 transition-colors">Home</a>
                </li>
                <li>
                  <a href={`/temple/${temple.slug}/about`} className="hover:text-saffron-400 transition-colors">About Us</a>
                </li>
                <li>
                  <a href={`/temple/${temple.slug}/history`} className="hover:text-saffron-400 transition-colors">History & Legend</a>
                </li>
                <li>
                  <a href={`/temple/${temple.slug}/contact`} className="hover:text-saffron-400 transition-colors">Contact Details</a>
                </li>
                <li>
                  <a href={`/temple/${temple.slug}/donate`} className="hover:text-saffron-400 transition-colors text-saffron-400 font-semibold">Online Donation</a>
                </li>
              </ul>
            </div>

            {/* Col 3: Timings & Address */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Darshan Timings</h4>
              <div className="text-xs space-y-1">
                <p className="font-semibold text-stone-300">Morning Darshan:</p>
                <p className="text-stone-400">{(temple.timings as any)?.morning_open || '06:00 AM'} - {(temple.timings as any)?.morning_close || '12:00 PM'}</p>
                <p className="font-semibold text-stone-300 mt-2">Evening Darshan:</p>
                <p className="text-stone-400">{(temple.timings as any)?.evening_open || '04:00 PM'} - {(temple.timings as any)?.evening_close || '09:00 PM'}</p>
              </div>
            </div>

            {/* Col 4: Trust Inquiries & Tax Benefits */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Trust Info</h4>
              <div className="text-xs space-y-1.5 text-stone-400 font-light">
                <p>Tax benefits are applicable on donations under Section 80G of Income Tax Act.</p>
                {temple.upiId && (
                  <div className="mt-3 bg-stone-950 p-3 rounded-xl border border-stone-850 flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Direct UPI Donation</span>
                    <span className="font-mono text-saffron-400 text-xs truncate select-all">{temple.upiId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} {temple.name}. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Managed via</span>
              <span className="font-semibold text-stone-400">MandirAI OS Control Center</span>
            </p>
          </div>
        </footer>

        {/* Global Floating AI Copilot for Devotees */}
        <DevoteeCopilot templeSlug={temple.slug} templateId={(temple.themeConfig as any)?.templateId} />

      </div>
    </LanguageProvider>
  )
}
