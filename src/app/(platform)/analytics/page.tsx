import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import PredictiveAnalyticsClient from '@/components/dashboard/predictive-analytics-client'
import { subMonths, differenceInDays } from 'date-fns'

export default async function AnalyticsPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) {
    return null
  }

  // Get data for the last 6 months
  const sixMonthsAgo = subMonths(new Date(), 6)
  
  // Fetch Donations
  const donations = await prisma.donation.findMany({
    where: {
      templeId: tenantId,
      paymentStatus: 'COMPLETED',
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
      paymentMethod: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  // Format donations
  const serializedDonations = donations.map((d) => ({
    amount: Number(d.amount),
    createdAt: d.createdAt.toISOString(),
    paymentMethod: d.paymentMethod,
    categoryName: d.category?.name || 'General',
  }))

  // Fetch Devotees to calculate churn risk
  // A devotee is considered "at risk" if their last visit was > 3 months ago
  const devotees = await prisma.devotee.findMany({
    where: { templeId: tenantId },
    select: { id: true, fullName: true, lastVisitAt: true },
    orderBy: { lastVisitAt: 'asc' },
    take: 10
  })

  const today = new Date()
  const atRiskDevotees = devotees
    .filter(d => d.lastVisitAt)
    .map(d => {
      const daysSinceVisit = differenceInDays(today, d.lastVisitAt!)
      // Risk score calculation based on days since visit
      const riskScore = Math.min(Math.max(Math.round((daysSinceVisit / 180) * 100), 10), 99)
      return {
        id: d.id,
        name: d.fullName,
        lastVisit: d.lastVisitAt!.toISOString().split('T')[0],
        riskScore
      }
    })
    .filter(d => d.riskScore > 60)
    .sort((a, b) => b.riskScore - a.riskScore)

  return <PredictiveAnalyticsClient donations={serializedDonations} atRiskDevotees={atRiskDevotees} />
}
