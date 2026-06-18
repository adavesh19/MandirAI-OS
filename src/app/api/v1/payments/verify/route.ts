import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { PaymentStatus } from '@prisma/client'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationId,
      // Fields used when verifying a Razorpay order that has no pre-created donation record
      templeId,
      amount,
      donorName,
      donorPhone,
      donorPan,
      donationCategoryId,
      sevaId,
      notes,
    } = body

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({ error: 'Missing required validation parameters' }, { status: 400 })
    }

    const isMock =
      razorpay_order_id.startsWith('order_mock_') || razorpay_order_id.startsWith('upi_order_')

    // ── Signature verification ─────────────────────────────────────────────────
    if (!isMock) {
      if (!process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: 'Razorpay secret key not configured' }, { status: 500 })
      }
      if (!razorpay_signature) {
        return NextResponse.json({ error: 'Missing payment signature' }, { status: 400 })
      }

      const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
      if (!isValid) {
        // If we have an existing donation record, mark it failed
        if (donationId) {
          await prisma.donation.update({
            where: { id: donationId },
            data: { paymentStatus: PaymentStatus.FAILED },
          })
        }
        return NextResponse.json({ error: 'Invalid payment signature verification failed' }, { status: 400 })
      }
    }

    // ── Resolve or create donation record ─────────────────────────────────────
    let donation
    if (donationId) {
      donation = await prisma.donation.findUnique({
        where: { id: donationId },
        include: { category: true },
      })
      if (!donation) {
        return NextResponse.json({ error: 'Donation record not found' }, { status: 404 })
      }
    } else {
      // Razorpay path: donation record wasn't pre-created — create it now
      if (!templeId || !amount) {
        return NextResponse.json(
          { error: 'templeId and amount are required when donationId is not provided' },
          { status: 400 }
        )
      }

      let categoryId = donationCategoryId
      if (!categoryId && !sevaId) {
        const defaultCategory = await prisma.donationCategory.findFirst({
          where: { templeId, isActive: true },
          orderBy: { sortOrder: 'asc' },
        })
        categoryId = defaultCategory?.id
      }
      if (!categoryId) {
        return NextResponse.json({ error: 'No donation category found for temple' }, { status: 400 })
      }

      // Resolve createdBy
      const adminMember = await prisma.templeMember.findFirst({
        where: { templeId, role: 'TEMPLE_ADMIN' },
      })
      let createdBy = adminMember?.userId
      if (!createdBy) {
        const anyUser = await prisma.user.findFirst()
        if (!anyUser) {
          return NextResponse.json({ error: 'No users found in database' }, { status: 500 })
        }
        createdBy = anyUser.id
      }

      donation = await prisma.donation.create({
        data: {
          templeId,
          categoryId,
          amount: parseFloat(String(amount)),
          currency: 'INR',
          paymentMethod: 'UPI',
          paymentStatus: PaymentStatus.COMPLETED,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          donorName: donorName || 'Anonymous',
          donorPhone: donorPhone || null,
          donorPan: donorPan || null,
          notes: notes || null,
          createdBy,
        },
        include: { category: true },
      })
    }

    // ── Update existing donation to COMPLETED ─────────────────────────────────
    const updatedDonation = await prisma.donation.update({
      where: { id: donation.id },
      data: {
        paymentStatus: PaymentStatus.COMPLETED,
        razorpayPaymentId: razorpay_payment_id,
        transactionRef: razorpay_payment_id,
      },
    })

    // ── Devotee upsert ─────────────────────────────────────────────────────────
    let devoteeId: string | null = null
    if (!donation.isAnonymous && donation.donorPhone) {
      const existingDevotee = await prisma.devotee.findFirst({
        where: { templeId: donation.templeId, phone: donation.donorPhone },
      })

      if (existingDevotee) {
        devoteeId = existingDevotee.id
        const newTotal = Number(existingDevotee.totalDonated) + Number(donation.amount)
        await prisma.devotee.update({
          where: { id: existingDevotee.id },
          data: {
            totalDonated: newTotal,
            visitCount: existingDevotee.visitCount + 1,
            lastVisitAt: new Date(),
          },
        })
      } else {
        const newDevotee = await prisma.devotee.create({
          data: {
            templeId: donation.templeId,
            fullName: donation.donorName || 'Devotee',
            phone: donation.donorPhone,
            totalDonated: donation.amount,
            visitCount: 1,
            lastVisitAt: new Date(),
          },
        })
        devoteeId = newDevotee.id
      }

      await prisma.donation.update({
        where: { id: donation.id },
        data: { devoteeId },
      })
    }

    // ── Receipt generation ─────────────────────────────────────────────────────
    const year = new Date().getFullYear()
    const count = await prisma.receipt.count({
      where: {
        templeId: donation.templeId,
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00Z`),
        },
      },
    })

    const seqNumber = String(count + 1).padStart(5, '0')
    const receiptNumber = `REC-${year}-${seqNumber}`

    const receipt = await prisma.receipt.create({
      data: {
        templeId: donation.templeId,
        donationId: donation.id,
        receiptNumber,
      },
    })

    const pdfUrl = `/api/v1/receipts/${receipt.id}/pdf`
    await prisma.receipt.update({
      where: { id: receipt.id },
      data: { pdfUrl },
    })

    return NextResponse.json({
      success: true,
      donation: updatedDonation,
      donationId: donation.id,
      receiptNumber,
      pdfUrl,
      receiptId: receipt.id,
    })
  } catch (error: any) {
    console.error('[verify-payment]', error)
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 })
  }
}
