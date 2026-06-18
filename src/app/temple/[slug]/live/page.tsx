import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import LiveClient from '@/components/temple/live-client'

// Remove caching for live page so it's always up to date
export const dynamic = 'force-dynamic'

type PageParams = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: PageParams }) {
  const resolvedParams = await params
  const temple = await prisma.temple.findUnique({ where: { slug: resolvedParams.slug } })
  return {
    title: `Live Darshan | ${temple?.name || 'Temple'}`,
    description: `Watch live darshan, aartis, and special events from ${temple?.name || 'our temple'}.`,
  }
}

export default async function LiveDarshanPage({ params }: { params: PageParams }) {
  const resolvedParams = await params
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug },
    select: { name: true, liveStreamUrl: true, slug: true, themeConfig: true }
  })

  if (!temple) notFound()

  // Extract YouTube Video ID from standard formats or shortened formats
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const videoId = temple.liveStreamUrl ? extractYoutubeId(temple.liveStreamUrl) : null
  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  const serializedTemple = {
    name: temple.name,
    slug: temple.slug,
    liveStreamUrl: temple.liveStreamUrl || null,
  }

  return (
    <LiveClient 
      temple={serializedTemple} 
      templateId={templateId} 
      videoId={videoId} 
    />
  )
}
