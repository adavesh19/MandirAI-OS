import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import ClassicCalmTemplate from '@/components/shared/../temple/templates/classic-calm'
import HeritageGrandTemplate from '@/components/temple/templates/heritage-grand'
import ModernElegantTemplate from '@/components/temple/templates/modern-elegant'
import DivineGlowTemplate from '@/components/temple/templates/divine-glow'
import TechSanctuaryTemplate from '@/components/temple/templates/tech-sanctuary'
import AIOmniscientTemplate from '@/components/temple/templates/ai-omniscient'

interface TemplePageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicTempleHome({ params }: TemplePageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
    include: {
      sevas: {
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
        take: 12,
        select: { id: true, name: true, price: true, description: true },
      },
    },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const page = await prisma.templePage.findUnique({
    where: { templeId_pageType: { templeId: temple.id, pageType: 'HOME' } },
  })

  // Format timings safely
  const timings = (temple.timings as any) || {
    morning_open: '06:00',
    morning_close: '12:00',
    evening_open: '16:00',
    evening_close: '21:00',
  }

  const address = (temple.address as any) || {}
  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  const serializableTemple = {
    name: temple.name,
    primaryDeity: temple.primaryDeity,
    contactPhone: temple.contactPhone,
    contactEmail: temple.contactEmail,
    templeType: temple.templeType,
    address,
    timings,
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
        blocks: pageContent.blocks || null,
      }
    : null

  const serializableSevas = temple.sevas.map((s) => ({
    id: s.id,
    name: s.name,
    amount: Number(s.price),
    description: s.description as string | null,
  }))

  const props = {
    temple: serializableTemple,
    page: serializablePage,
    sevas: serializableSevas,
  }

  // Dynamic Template Router
  if (templateId === 'heritage') {
    return <HeritageGrandTemplate {...props} />
  }
  
  if (templateId === 'modern') {
    return <ModernElegantTemplate {...props} />
  }

  if (templateId === 'divine-glow') {
    return <DivineGlowTemplate {...props} />
  }

  if (templateId === 'tech-sanctuary') {
    return <TechSanctuaryTemplate {...props} />
  }

  if (templateId === 'ai-omniscient') {
    return <AIOmniscientTemplate {...props} />
  }

  // Default to Classic Calm
  return <ClassicCalmTemplate {...props} />
}
