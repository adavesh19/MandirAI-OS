import * as React from 'react'
import prisma from '@/lib/prisma'
import SuperAdminClient from '@/components/dashboard/super-admin-client'
import { requireRole } from '@/lib/dal'

export const dynamic = 'force-dynamic'

export default async function SuperAdminOverviewPage() {
  // Guard route for King Super Admin
  await requireRole(['super_admin'])

  // 1. Fetch all temples with comprehensive metrics
  const temples = await prisma.temple.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      slug: true,
      primaryDeity: true,
      templeType: true,
      isActive: true,
      subscriptionPlan: true,
      contactEmail: true,
      contactPhone: true,
      upiId: true,
      websiteDomain: true,
      createdAt: true,
      _count: {
        select: {
          devotees: true,
          donations: true,
          sevas: true,
          events: true,
          members: true,
        },
      },
    },
  })

  // 2. Fetch global donations aggregation & recent transactions
  const [
    donationsSum,
    completedDonationsCount,
    pendingDonationsCount,
    recentDonations,
    devoteesCount,
    sevasCount,
    eventsCount,
    recentDevotees,
  ] = await Promise.all([
    prisma.donation.aggregate({
      where: { paymentStatus: 'COMPLETED' },
      _sum: { amount: true },
    }),
    prisma.donation.count({
      where: { paymentStatus: 'COMPLETED' },
    }),
    prisma.donation.count({
      where: { paymentStatus: 'PENDING' },
    }),
    prisma.donation.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        donorName: true,
        donorPhone: true,
        donorPan: true,
        amount: true,
        paymentMethod: true,
        paymentStatus: true,
        transactionRef: true,
        createdAt: true,
        receipts: {
          take: 1,
          select: {
            receiptNumber: true,
          },
        },
        temple: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    }),
    prisma.devotee.count(),
    prisma.seva.count(),
    prisma.event.count(),
    prisma.devotee.findMany({
      take: 25,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        gotra: true,
        nakshatra: true,
        badgeTier: true,
        createdAt: true,
        temple: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    }),
  ])

  // 3. Plan Distribution
  const planDistribution = {
    FREE: temples.filter((t) => t.subscriptionPlan === 'FREE').length,
    STARTER: temples.filter((t) => t.subscriptionPlan === 'STARTER').length,
    PROFESSIONAL: temples.filter((t) => t.subscriptionPlan === 'PROFESSIONAL').length,
    ENTERPRISE: temples.filter((t) => t.subscriptionPlan === 'ENTERPRISE').length,
  }

  // 4. Calculate aggregates
  const totalTemples = temples.length
  const activeTemples = temples.filter((t) => t.isActive).length
  const totalRevenue = Number(donationsSum._sum.amount || 0)

  const stats = {
    totalTemples,
    activeTemples,
    suspendedTemples: totalTemples - activeTemples,
    totalDevotees: devoteesCount,
    totalDonations: totalRevenue,
    completedDonationsCount,
    pendingDonationsCount,
    totalSevas: sevasCount,
    totalEvents: eventsCount,
    planDistribution,
  }

  // Cast temples type mapping properly for client rendering
  const mappedTemples = temples.map((t) => ({
    ...t,
    templeType: t.templeType ? String(t.templeType) : null,
    createdAt: t.createdAt.toISOString(),
  }))

  const mappedDonations = recentDonations.map((d) => ({
    id: d.id,
    receiptNumber: d.receipts?.[0]?.receiptNumber || d.transactionRef || d.id.slice(0, 8).toUpperCase(),
    donorName: d.donorName || 'Devotee',
    donorPhone: d.donorPhone || null,
    donorEmail: null,
    donorPan: d.donorPan || null,
    amount: Number(d.amount),
    paymentMethod: String(d.paymentMethod),
    paymentStatus: String(d.paymentStatus),
    is80GEligible: Boolean(d.donorPan),
    createdAt: d.createdAt.toISOString(),
    temple: d.temple,
  }))

  const mappedDevotees = recentDevotees.map((dev) => ({
    id: dev.id,
    fullName: dev.fullName,
    phoneNumber: dev.phone || null,
    email: dev.email || null,
    gotra: dev.gotra || null,
    rashi: null,
    nakshatra: dev.nakshatra || null,
    badgeTier: dev.badgeTier || 'BRONZE',
    createdAt: dev.createdAt.toISOString(),
    temple: dev.temple,
  }))

  return (
    <SuperAdminClient
      temples={mappedTemples}
      stats={stats}
      recentDonations={mappedDonations}
      recentDevotees={mappedDevotees}
    />
  )
}
