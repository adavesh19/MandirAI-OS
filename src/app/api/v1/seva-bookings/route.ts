import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { templeId, sevaId, devoteeId, bookingDate, bookingTime, donorName, donorPhone, paymentMethod, paymentRef } = body

    if (!templeId || !sevaId || !bookingDate) {
      return NextResponse.json({ error: 'templeId, sevaId, bookingDate are required' }, { status: 400 })
    }

    const booking = await prisma.sevaBooking.create({
      data: {
        templeId,
        sevaId,
        devoteeId: devoteeId || null,
        bookingDate: new Date(bookingDate),
        bookingTime: bookingTime || '06:00',
        status: 'CONFIRMED',
        paymentStatus: paymentMethod === 'UPI' || paymentMethod === 'RAZORPAY' ? 'COMPLETED' : 'PENDING',
        razorpayPaymentId: paymentRef || null,
      },
    })

    return NextResponse.json({ success: true, bookingId: booking.id })
  } catch (error: any) {
    console.error('[seva-bookings POST]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const templeId = searchParams.get('templeId')
    if (!templeId) return NextResponse.json({ error: 'templeId required' }, { status: 400 })

    const bookings = await prisma.sevaBooking.findMany({
      where: { templeId },
      include: { seva: { select: { name: true, price: true } } },
      orderBy: { bookingDate: 'desc' },
      take: 50,
    })

    const serialized = bookings.map(b => ({
      id: b.id,
      sevaName: (b.seva.name as any)?.en || 'Seva',
      price: Number(b.seva.price),
      bookingDate: b.bookingDate.toISOString(),
      bookingTime: b.bookingTime,
      status: b.status,
      paymentStatus: b.paymentStatus,
    }))

    return NextResponse.json({ bookings: serialized })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
