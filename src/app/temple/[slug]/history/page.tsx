import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import HistoryClient from '@/components/temple/history-client'

interface HistoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicTempleHistory({ params }: HistoryPageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const page = await prisma.templePage.findUnique({
    where: {
      templeId_pageType: {
        templeId: temple.id,
        pageType: 'HISTORY',
      },
    },
  })

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  const serializableTemple = {
    name: temple.name,
    slug: temple.slug,
  }

  const pageContent = page && typeof page.content === 'object' && page.content !== null
    ? (page.content as any)
    : null

  const serializablePage = pageContent
    ? {
        title: pageContent.title || {},
        description: pageContent.description || {},
        content: pageContent.html || '',
      }
    : null

  return <HistoryClient temple={serializableTemple} page={serializablePage} templateId={templateId} />
}
