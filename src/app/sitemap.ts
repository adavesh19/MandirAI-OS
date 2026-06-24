import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app'
  const now = new Date()

  // ── Core marketing pages ───────────────────────────────────────────────
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // ── SEO-targeted feature landing pages ────────────────────────────────
    {
      url: `${baseUrl}/temple-website-builder`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/temple-management-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/temple-donation-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mandir-management-system`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/80g-receipt-generator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seva-booking-system`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/devotee-crm`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/live-darshan-streaming`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    // ── Auth pages ─────────────────────────────────────────────────────────
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // ── Dynamic temple pages ───────────────────────────────────────────────
  try {
    const temples = await prisma.temple.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, id: true, name: true },
    })

    for (const temple of temples) {
      // Main temple home page
      routes.push({
        url: `${baseUrl}/temple/${temple.slug}`,
        lastModified: temple.updatedAt,
        changeFrequency: 'daily',
        priority: 0.9,
      })

      // Published pages from DB
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
            priority: 0.7,
          })
        }
      }

      // Standard sub-routes for all temples
      const standardSubRoutes = [
        'events', 'sevas', 'gallery', 'donate', 
        'live', 'community', 'roadmap', 'book',
        'history', 'about', 'contact'
      ]
      for (const subRoute of standardSubRoutes) {
        routes.push({
          url: `${baseUrl}/temple/${temple.slug}/${subRoute}`,
          lastModified: now,
          changeFrequency: 'daily',
          priority: 0.7,
        })
      }
    }
  } catch (error) {
    console.error('[sitemap] Error fetching temple data:', error)
  }

  return routes
}
