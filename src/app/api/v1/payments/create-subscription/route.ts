import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import prisma from '@/lib/prisma'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, templeId, devoteeId, categoryId, notes, donorName, donorPhone, donorPan } = await request.json()

    // 1. Create a Razorpay Plan dynamically for the requested amount
    const plan = await razorpay.plans.create({
      period: 'monthly',
      interval: 1,
      item: {
        name: `Monthly Seva/Donation - ${donorName || 'Devotee'}`,
        amount: Math.round(Number(amount) * 100),
        currency: currency || 'INR',
        description: 'Monthly recurring temple donation'
      }
    })

    // 2. Create the Subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: plan.id,
      customer_notify: 1,
      total_count: 12, // Default to 12 months (1 year)
      notes: { templeId, devoteeId: devoteeId || '', categoryId: categoryId || '' }
    })

    // Find an admin to associate as the creator
    const adminMember = await prisma.templeMember.findFirst({
      where: { templeId, role: 'TEMPLE_ADMIN' },
    })
    let createdBy = adminMember?.userId
    if (!createdBy) {
      const anyUser = await prisma.user.findFirst()
      createdBy = anyUser?.id || '' // Fallback (should exist in real DB)
    }

    // 3. Log initial pending record
    const donation = await prisma.donation.create({
      data: {
        templeId,
        devoteeId,
        categoryId,
        amount,
        currency: currency || 'INR',
        paymentMethod: 'RAZORPAY',
        paymentStatus: 'PENDING',
        razorpayOrderId: subscription.id, // Storing subscription ID here
        isRecurring: true,
        recurrenceInterval: 'MONTHLY',
        donorName,
        donorPhone,
        donorPan,
        createdBy,
        notes,
      }
    })

    return NextResponse.json({ 
      id: subscription.id, 
      planId: plan.id, 
      donationId: donation.id 
    })
  } catch (error: any) {
    console.error('[create-subscription]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
