import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import RoadmapClient from './roadmap-client'

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug }
  })
  
  if (!temple) notFound()

  const items = await prisma.roadmapItem.findMany({
    where: { templeId: temple.id },
    orderBy: { targetDate: 'asc' }
  })

  // Seed default items if empty
  if (items.length === 0) {
    await prisma.roadmapItem.createMany({
      data: [
        { templeId: temple.id, title: 'New Annadanam Hall', description: 'Expanding our capacity to serve 500 devotees daily.', status: 'IN_PROGRESS', targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        { templeId: temple.id, title: 'Solar Panel Installation', description: 'Moving to 100% renewable energy.', status: 'PLANNED', targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) },
        { templeId: temple.id, title: 'Goshala Renovation', description: 'Upgraded facilities for our sacred cows.', status: 'COMPLETED', targetDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      ]
    })
    
    const newItems = await prisma.roadmapItem.findMany({
      where: { templeId: temple.id },
      orderBy: { targetDate: 'asc' }
    })
    const themeConfig = (temple.themeConfig as any) || {}
    const templateId = themeConfig.templateId || 'classic'
    return <RoadmapClient temple={temple} items={newItems} templateId={templateId} />
  }

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'
  return <RoadmapClient temple={temple} items={items} templateId={templateId} />
}
