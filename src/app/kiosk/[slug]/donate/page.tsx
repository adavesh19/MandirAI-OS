import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import KioskDonateClient from '@/components/temple/kiosk-donate-client'

export default async function KioskDonatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug, isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      upiId: true,
      logoUrl: true,
    },
  })

  if (!temple) notFound()

  const categories = await prisma.donationCategory.findMany({
    where: { templeId: temple.id, isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, description: true, suggestedAmounts: true },
  })

  return <KioskDonateClient temple={temple} categories={categories} />
}
