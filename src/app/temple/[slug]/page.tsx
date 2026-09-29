import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import ClassicCalmTemplate from '@/components/temple/templates/classic-calm'
import HeritageGrandTemplate from '@/components/temple/templates/heritage-grand'
import ModernElegantTemplate from '@/components/temple/templates/modern-elegant'
import DivineGlowTemplate from '@/components/temple/templates/divine-glow'
import TechSanctuaryTemplate from '@/components/temple/templates/tech-sanctuary'
import AIOmniscientTemplate from '@/components/temple/templates/ai-omniscient'
import VisualWebsiteEditor from '@/components/temple/visual-website-editor'

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

  const pageContent = page && typeof page.content === 'object' && page.content !== null
    ? (page.content as any)
    : null

  const serializableTemple = {
    id: temple.id,
    name: temple.name,
    primaryDeity: temple.primaryDeity,
    description: (themeConfig as any).description || (pageContent as any)?.description || '',
    history: (temple.history as any)?.text || (themeConfig as any)?.history || (pageContent as any)?.html || '',
    coverImageUrl: (themeConfig as any)?.templeImageUrl || temple.coverImageUrl || (themeConfig as any)?.heroImageUrl || (themeConfig as any)?.coverImageUrl || null,
    templeImageUrl: (themeConfig as any)?.templeImageUrl || temple.coverImageUrl || (themeConfig as any)?.heroImageUrl || (themeConfig as any)?.coverImageUrl || null,
    logoUrl: (themeConfig as any)?.deityImageUrl || (themeConfig as any)?.godImageUrl || temple.logoUrl || (themeConfig as any)?.logoUrl || null,
    deityImageUrl: (themeConfig as any)?.deityImageUrl || (themeConfig as any)?.godImageUrl || temple.logoUrl || (themeConfig as any)?.logoUrl || null,
    liveStreamUrl: temple.liveStreamUrl || (themeConfig as any)?.liveStreamUrl || null,
    contactPhone: temple.contactPhone,
    contactEmail: temple.contactEmail,
    templeType: temple.templeType,
    address,
    timings,
    slug: temple.slug,
    upiId: temple.upiId,
    themeConfig,
  }

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
    price: Number(s.price),
    description: s.description as string | null,
  }))

  const props = {
    temple: serializableTemple,
    page: serializablePage,
    sevas: serializableSevas,
  }

  let templateElement = <ClassicCalmTemplate {...props} />

  // Dynamic Template Router
  if (templateId === 'heritage') {
    templateElement = <HeritageGrandTemplate {...props} />
  } else if (templateId === 'modern') {
    templateElement = <ModernElegantTemplate {...props} />
  } else if (templateId === 'divine-glow') {
    templateElement = <DivineGlowTemplate {...props} />
  } else if (templateId === 'tech-sanctuary') {
    templateElement = <TechSanctuaryTemplate {...props} />
  } else if (templateId === 'ai-omniscient') {
    templateElement = <AIOmniscientTemplate {...props} />
  }

  return (
    <>
      {templateElement}
      <VisualWebsiteEditor
        initialTemple={serializableTemple}
        initialSevas={serializableSevas}
        slug={temple.slug}
      />
    </>
  )
}
