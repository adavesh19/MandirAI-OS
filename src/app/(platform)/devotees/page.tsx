import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import DevoteesClient from '@/components/dashboard/devotees-client'

export default async function DevoteesPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) {
    return null
  }

  // Fetch all devotee records with their linked donations
  const devotees = await prisma.devotee.findMany({
    where: { templeId: tenantId },
    include: {
      donations: {
        select: {
          id: true,
          amount: true,
          createdAt: true,
          category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { fullName: 'asc' },
  })

  // Format Prisma structures to clean serializable objects
  const serializedDevotees = devotees.map((dev) => ({
    id: dev.id,
    fullName: dev.fullName,
    phone: dev.phone,
    email: dev.email,
    dateOfBirth: dev.dateOfBirth ? dev.dateOfBirth.toISOString().split('T')[0] : null,
    anniversary: dev.anniversary ? dev.anniversary.toISOString().split('T')[0] : null,
    gotra: dev.gotra,
    nakshatra: dev.nakshatra,
    notes: dev.notes,
    totalDonated: Number(dev.totalDonated),
    visitCount: dev.visitCount,
    lastVisitAt: dev.lastVisitAt ? dev.lastVisitAt.toISOString() : null,
    createdAt: dev.createdAt.toISOString(),
    donations: dev.donations.map((don) => ({
      id: don.id,
      amount: Number(don.amount),
      createdAt: don.createdAt.toISOString(),
      categoryName: don.category.name,
    })),
  }))

  return <DevoteesClient devotees={serializedDevotees} />
}
