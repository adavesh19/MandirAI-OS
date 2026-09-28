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
      <div className="min-h-screen w-full m-0 p-0 overflow-x-hidden">
        {children}
        {/* Global Floating AI Copilot for Devotees */}
        <DevoteeCopilot templeSlug={temple.slug} templateId={(temple.themeConfig as any)?.templateId} />
      </div>
    </LanguageProvider>
  )
}
