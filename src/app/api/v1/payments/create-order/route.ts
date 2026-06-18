import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { PaymentMethod, PaymentStatus } from '@prisma/client'
import { isRazorpayConfigured, getRazorpayInstance } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      templeId,
      amount,
      categoryId,
      donationCategoryId,
      sevaId,
      donorName,
      donorPhone,
      donorPan,
      isAnonymous,
      email,
      campaignId,
    } = body

    // Support both categoryId and donationCategoryId param names
    const resolvedCategoryId = categoryId || donationCategoryId

    if (!templeId || !amount) {
      return NextResponse.json({ error: 'Missing required fields: templeId and amount' }, { status: 400 })
    }

    // Fetch temple
    const temple = await prisma.temple.findUnique({
      where: { id: templeId },
      select: { id: true, name: true, upiId: true, contactPhone: true },
    })
    if (!temple) {
      return NextResponse.json({ error: 'Temple not found' }, { status: 404 })
    }

    // Resolve category (required for donation record creation at verify step)
    let category = null
    if (resolvedCategoryId) {
      category = await prisma.donationCategory.findUnique({ where: { id: resolvedCategoryId } })
      if (!category) {
        return NextResponse.json({ error: 'Donation category not found' }, { status: 404 })
      }
    }

    // ── Razorpay path ─────────────────────────────────────────────────────────
    if (isRazorpayConfigured()) {
      const razorpay = getRazorpayInstance()
      const order = await razorpay.orders.create({
        amount: Math.round(parseFloat(String(amount)) * 100), // paise
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          templeId,
          donorName: donorName || '',
          sevaId: sevaId || '',
          donationCategoryId: resolvedCategoryId || '',
          campaignId: campaignId || '',
        },
      })

      return NextResponse.json({
        method: 'razorpay',
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        templeName: temple.name,
      })
    }

    // ── UPI Direct / Manual path ───────────────────────────────────────────────
    // Find the temple admin to assign as the creator of this donation record
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

    // Resolve category for the donation record
    if (!resolvedCategoryId) {
      const defaultCategory = await prisma.donationCategory.findFirst({
        where: { templeId, isActive: true },
        orderBy: { sortOrder: 'asc' },
      })
      if (!defaultCategory) {
        return NextResponse.json({ error: 'No donation category found for temple' }, { status: 400 })
      }
      category = defaultCategory
    }

    // Create a pending donation record
    const donation = await prisma.donation.create({
      data: {
        templeId,
        categoryId: (category?.id || resolvedCategoryId)!,
        campaignId: campaignId || null,
        amount: parseFloat(String(amount)),
        currency: 'INR',
        paymentMethod: PaymentMethod.UPI,
        paymentStatus: PaymentStatus.PENDING,
        isAnonymous: !!isAnonymous,
        donorName: isAnonymous ? 'Anonymous' : (donorName || 'Devotee'),
        donorPhone: isAnonymous ? null : donorPhone,
        donorPan: isAnonymous ? null : donorPan,
        createdBy,
        notes: email ? `Email: ${email}` : undefined,
      },
    })

    const upiOrderId = `upi_order_${Math.random().toString(36).substring(2, 15)}`
    await prisma.donation.update({
      where: { id: donation.id },
      data: { razorpayOrderId: upiOrderId },
    })

    return NextResponse.json({
      method: 'upi_direct',
      id: upiOrderId,
      amount: Math.round(parseFloat(String(amount)) * 100),
      currency: 'INR',
      upiId: temple.upiId || 'temple@upi',
      templePhone: temple.contactPhone,
      templeName: temple.name,
      donationId: donation.id,
      isMock: true, // triggers UPI reference collection flow on client
    })
  } catch (error: any) {
    console.error('[create-order]', error)
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 })
  }
}
