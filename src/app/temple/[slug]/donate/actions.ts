'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function submitDonation(formData: {
  templeId: string
  sevaId?: string | null
  campaignId?: string | null
  amount: number
  donorName: string
  donorPhone: string
  donorPan?: string
}) {
  try {
    const { templeId, sevaId, campaignId, amount, donorName, donorPhone, donorPan } = formData

    // Find a general donation category, or default fallback
    let category = await prisma.donationCategory.findFirst({
      where: { templeId, isActive: true }
    })

    if (!category) {
      category = await prisma.donationCategory.create({
        data: {
          templeId,
          name: 'General Offering',
          suggestedAmounts: [101, 501, 1001],
          isActive: true
        }
      })
    }

    // 1. Create Donation Record inside a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find a system user or leave created_by null (but schema requires createdBy. We need to fetch the temple admin)
      const templeMember = await tx.templeMember.findFirst({
        where: { templeId, role: 'TEMPLE_ADMIN' }
      })

      if (!templeMember) throw new Error('System error: Temple has no admin to assign donation to')

      // Find or create Devotee record for all donations to track Karma Points
      let devotee = null
      if (donorPhone) {
        devotee = await tx.devotee.findFirst({
          where: { templeId, phone: donorPhone }
        })

        if (!devotee) {
          devotee = await tx.devotee.create({
            data: {
              templeId,
              fullName: donorName,
              phone: donorPhone
            }
          })
        }
      }

      const donation = await tx.donation.create({
        data: {
          templeId,
          categoryId: category!.id,
          campaignId: campaignId || null,
          amount,
          paymentMethod: 'ONLINE' as any, // Mapped to OTHER or RAZORPAY
          paymentStatus: 'PENDING',
          donorName,
          donorPhone,
          donorPan: donorPan || null,
          createdBy: templeMember.userId,
          devoteeId: devotee?.id || null
        }
      })

      // 2. If it's a Seva Booking, create the SevaBooking record
      if (sevaId && devotee) {

        await tx.sevaBooking.create({
          data: {
            templeId,
            sevaId,
            devoteeId: devotee.id,
            bookingDate: new Date(),
            bookingTime: '00:00', // To be expanded later
            status: 'PENDING',
            paymentStatus: 'PENDING'
          }
        })
      }

      return donation
    })

    // In a real app, we would redirect to Razorpay checkout here.
    // For now, we return success and redirect to a success page.
    return { success: true, donationId: result.id }
  } catch (error: any) {
    console.error('Donation submission error:', error)
    return { success: false, error: error.message || 'Failed to process donation' }
  }
}

export async function markDonationAsPaid(donationId: string) {
  try {
    // Generate a mock blockchain transaction hash (SHA-256)
    const crypto = require('crypto')
    const hash = crypto.createHash('sha256').update(donationId + Date.now().toString()).digest('hex')
    const blockchainHash = `0x${hash}`

    const donation = await prisma.donation.update({
      where: { id: donationId },
      data: { 
        paymentStatus: 'COMPLETED',
        blockchainHash 
      }
    })

    if (donation.campaignId) {
      await prisma.campaign.update({
        where: { id: donation.campaignId },
        data: {
          currentAmount: { increment: donation.amount }
        }
      })
    }

    // Award Karma Points to the Devotee (1 point per ₹100)
    if (donation.devoteeId) {
      const pointsToAward = Math.floor(Number(donation.amount) / 100)
      if (pointsToAward > 0) {
        await prisma.devotee.update({
          where: { id: donation.devoteeId },
          data: {
            karmaPoints: { increment: pointsToAward },
            totalDonated: { increment: donation.amount }
          }
        })
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Mark as paid error:', error)
    return { success: false, error: 'Failed to update payment status' }
  }
}
