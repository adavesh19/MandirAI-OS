import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import CommunityClient from './community-client'

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug }
  })
  
  if (!temple) notFound()

  const suggestions = await prisma.communitySuggestion.findMany({
    where: { templeId: temple.id },
    orderBy: { upvotes: 'desc' },
    include: {
      devotee: {
        select: { fullName: true }
      }
    }
  })

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  return <CommunityClient temple={temple} initialSuggestions={suggestions} templateId={templateId} />
}
