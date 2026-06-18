import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import DonationsClient from '@/components/dashboard/donations-client'

export default async function DonationsPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) {
    return null
  }

  // 1. Fetch donations with related category, devotee, and receipts
  const donations = await prisma.donation.findMany({
    where: { templeId: tenantId },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      devotee: {
        select: {
          fullName: true,
          phone: true,
        },
      },
      receipts: {
        select: {
          id: true,
          receiptNumber: true,
          pdfUrl: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // 2. Fetch active donation categories
  const categories = await prisma.donationCategory.findMany({
    where: { templeId: tenantId, isActive: true },
    orderBy: { sortOrder: 'asc' },
  })

  // 3. Fetch registered devotees for dropdown selection
  const devotees = await prisma.devotee.findMany({
    where: { templeId: tenantId },
    select: {
      id: true,
      fullName: true,
      phone: true,
    },
    orderBy: { fullName: 'asc' },
  })

  // Format Prisma data into serializable objects
  const serializedDonations = donations.map((d) => ({
    id: d.id,
    amount: Number(d.amount),
    currency: d.currency,
    paymentMethod: d.paymentMethod,
    paymentStatus: d.paymentStatus,
    donorName: d.donorName,
    donorPhone: d.donorPhone,
    donorPan: d.donorPan,
    notes: d.notes,
    createdAt: d.createdAt.toISOString(),
    categoryName: d.category.name,
    devoteeName: d.devotee?.fullName || null,
    receiptId: d.receipts[0]?.id || null,
    receiptNumber: d.receipts[0]?.receiptNumber || null,
    pdfUrl: d.receipts[0]?.pdfUrl || null,
  }))

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
  }))

  const serializedDevotees = devotees.map((dev) => ({
    id: dev.id,
    fullName: dev.fullName,
    phone: dev.phone,
  }))

  return (
    <DonationsClient
      donations={serializedDonations}
      categories={serializedCategories}
      devotees={serializedDevotees}
    />
  )
}
