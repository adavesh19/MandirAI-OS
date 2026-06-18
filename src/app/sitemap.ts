import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://temple-ai.os'
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  try {
    const temples = await prisma.temple.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, id: true },
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
            priority: 0.7,
          })
        }
      }
      
      const standardSubRoutes = ['events', 'sevas', 'gallery', 'donate', 'live', 'community', 'roadmap', 'book']
      for (const subRoute of standardSubRoutes) {
        routes.push({
          url: `${baseUrl}/temple/${temple.slug}/${subRoute}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        })
      }
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return routes
}
