import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import DigitalHundiClient from '@/components/temple/digital-hundi-client'
import { formatDistanceToNow } from 'date-fns'

export default async function DigitalHundiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  // Fetch recent 10 donations
  const donations = await prisma.donation.findMany({
    where: { templeId: temple.id, paymentStatus: 'COMPLETED' },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, amount: true, donorName: true, isAnonymous: true, createdAt: true }
  })

  const formattedDonations = donations.map(d => ({
    id: d.id,
    amount: Number(d.amount),
    donorName: d.isAnonymous ? 'Anonymous Devotee' : (d.donorName || 'Anonymous Devotee'),
    timeAgo: formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })
  }))

  return <DigitalHundiClient temple={temple} recentDonations={formattedDonations} />
}
