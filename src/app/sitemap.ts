import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app'
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    // ── Priority 1.0: Homepage ───────────────────────────────────────────
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },

    // ── Priority 0.95: Core SEO landing pages ───────────────────────────
    { url: `${baseUrl}/temple-website-builder`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/temple-management-software`, lastModified: now, changeFrequency: 'weekly', priority: 0.93 },
    { url: `${baseUrl}/temple-donation-software`, lastModified: now, changeFrequency: 'weekly', priority: 0.92 },
    { url: `${baseUrl}/mandir-management-system`, lastModified: now, changeFrequency: 'weekly', priority: 0.90 },

    // ── Priority 0.88: Feature-specific landing pages ───────────────────
    { url: `${baseUrl}/features`, lastModified: now, changeFrequency: 'weekly', priority: 0.88 },
    { url: `${baseUrl}/seva-booking-system`, lastModified: now, changeFrequency: 'weekly', priority: 0.87 },
    { url: `${baseUrl}/80g-receipt-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.86 },
    { url: `${baseUrl}/devotee-crm`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/live-darshan-streaming`, lastModified: now, changeFrequency: 'monthly', priority: 0.84 },

    // ── Priority 0.80: Pricing + Auth ─────────────────────────────────
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.82 },
    { url: `${baseUrl}/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.40 },
  ]

  // ── Dynamic temple pages ─────────────────────────────────────────────
  try {
    const temples = await prisma.temple.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, id: true, name: true },
    })

    for (const temple of temples) {
      routes.push({
        url: `${baseUrl}/temple/${temple.slug}`,
        lastModified: temple.updatedAt,
        changeFrequency: 'daily',
        priority: 0.9,
      })

      const pages = await prisma.templePage.findMany({
        where: { templeId: temple.id, isPublished: true },
        select: { pageType: true, updatedAt: true },
      })

      for (const page of pages) {
        const path = page.pageType.toLowerCase()
        if (path !== 'home') {
          routes.push({
            url: `${baseUrl}/temple/${temple.slug}/${path}`,
            lastModified: page.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.75,
          })
        }
      }

      const standardSubRoutes = [
        'sevas', 'donate', 'events', 'gallery', 'live',
        'history', 'about', 'contact', 'community', 'book',
        'panchang', 'campaigns',
      ]
      for (const sub of standardSubRoutes) {
        routes.push({
          url: `${baseUrl}/temple/${temple.slug}/${sub}`,
          lastModified: now,
          changeFrequency: 'daily',
          priority: 0.70,
        })
      }
    }
  } catch (e) {
    console.error('[sitemap] DB error:', e)
  }

  return routes
}
