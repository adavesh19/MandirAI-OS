import * as React from 'react'
import prisma from '@/lib/prisma'
import SuperAdminClient from '@/components/dashboard/super-admin-client'
import { requireRole } from '@/lib/dal'

export default async function SuperAdminOverviewPage() {
  // Broad server check
  await requireRole(['super_admin'])

  // Fetch all temples with counts
  const temples = await prisma.temple.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      primaryDeity: true,
      templeType: true,
      isActive: true,
      subscriptionPlan: true,
      createdAt: true,
      _count: {
        select: {
          devotees: true,
          donations: true,
        },
      },
    },
  })

  // Calculate aggregates
  const totalTemples = temples.length
  const activeTemples = temples.filter((t) => t.isActive).length

  const totalDevotees = await prisma.devotee.count()

  const donationsSum = await prisma.donation.aggregate({
    where: { paymentStatus: 'COMPLETED' },
    _sum: { amount: true },
  })

  const stats = {
    totalTemples,
    activeTemples,
    totalDevotees,
    totalDonations: Number(donationsSum._sum.amount || 0),
  }

  // Cast temples type mapping properly for client rendering
  const mappedTemples = temples.map((t) => ({
    ...t,
    templeType: t.templeType ? String(t.templeType) : null,
  }))

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-bold text-stone-900 dark:text-white">Platform System Administration</h1>
        <p className="text-sm text-stone-500">Overview dashboard for platform metrics, plan subscriptions, and global workspace status.</p>
      </div>

      <SuperAdminClient temples={mappedTemples} stats={stats} />
    </div>
  )
}
