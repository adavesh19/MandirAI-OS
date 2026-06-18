import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import GalleryClient from '@/components/temple/gallery-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const mediaItems = await prisma.media.findMany({
    where: {
      templeId: temple.id,
      type: 'IMAGE',
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  const serializableTemple = {
    name: temple.name,
    slug: temple.slug,
  }

  const serializableMediaItems = mediaItems.map(item => ({
    id: item.id,
    url: item.url,
    thumbnailUrl: item.thumbnailUrl || null,
    title: item.title || null,
    category: item.category || null,
    createdAt: item.createdAt.toISOString()
  }))

  return (
    <GalleryClient 
      temple={serializableTemple} 
      mediaItems={serializableMediaItems} 
      templateId={templateId} 
    />
  )
}
