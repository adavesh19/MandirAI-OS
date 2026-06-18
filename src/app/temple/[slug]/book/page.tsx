import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import BookingClient from '@/components/temple/booking-client'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ seva?: string }>
}

export default async function BookSevaPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { seva: sevaId } = await searchParams

  const temple = await prisma.temple.findUnique({
    where: { slug, isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      upiId: true,
      contactPhone: true,
      bankDetails: true,
      logoUrl: true,
      themeConfig: true,
    },
  })
  if (!temple) notFound()

  const sevas = await prisma.seva.findMany({
    where: { templeId: temple.id, isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  const serializedTemple = {
    id: temple.id,
    name: temple.name,
    slug: temple.slug,
    upiId: temple.upiId || null,
    contactPhone: temple.contactPhone || null,
    bankDetails: temple.bankDetails as Record<string, string> | null,
    logoUrl: temple.logoUrl || null,
  }

  const serializedSevas = sevas.map(s => ({
    id: s.id,
    name: (s.name as any)?.en || 'Seva',
    description: (s.description as any)?.en || '',
    price: Number(s.price),
    durationMinutes: s.durationMinutes,
    isActive: s.isActive,
  }))

  const selectedSevaId = sevaId || (serializedSevas[0]?.id ?? null)

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  return (
    <BookingClient
      temple={serializedTemple}
      sevas={serializedSevas}
      preselectedSevaId={selectedSevaId}
      templateId={templateId}
    />
  )
}
