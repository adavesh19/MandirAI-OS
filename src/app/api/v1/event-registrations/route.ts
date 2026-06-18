import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, templeId, name, phone, email } = body

    if (!eventId || !templeId || !name || !phone) {
      return NextResponse.json({ error: 'eventId, templeId, name, phone are required' }, { status: 400 })
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { maxRegistrations: true, registrationCount: true, isRegistrationOpen: true, title: true, startDate: true },
    })

    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    if (!event.isRegistrationOpen) return NextResponse.json({ error: 'Registrations are closed' }, { status: 400 })
    if (event.maxRegistrations && event.registrationCount >= event.maxRegistrations) {
      return NextResponse.json({ error: 'Event is fully booked' }, { status: 400 })
    }

    let devotee = await prisma.devotee.findFirst({ where: { templeId, phone } })
    if (!devotee) {
      devotee = await prisma.devotee.create({
        data: { templeId, fullName: name, phone, email: email || null },
      })
    }

    const registration = await prisma.eventRegistration.create({
      data: { eventId, devoteeId: devotee.id, templeId, status: 'REGISTERED', registrationDate: new Date() },
    })

    await prisma.event.update({ where: { id: eventId }, data: { registrationCount: { increment: 1 } } })

    const titleObj = typeof event.title === 'string' ? JSON.parse(event.title) : event.title
    const eventTitle = (titleObj as any)?.en || 'Event'

    return NextResponse.json({ success: true, registrationId: registration.id, eventTitle, eventDate: event.startDate.toISOString() })
  } catch (error: any) {
    console.error('[event-registrations POST]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const templeId = searchParams.get('templeId')
    const eventId = searchParams.get('eventId')
    if (!templeId) return NextResponse.json({ error: 'templeId required' }, { status: 400 })

    const registrations = await prisma.eventRegistration.findMany({
      where: { templeId, ...(eventId ? { eventId } : {}) },
      include: { devotee: { select: { fullName: true, phone: true } } },
      orderBy: { registrationDate: 'desc' },
      take: 100,
    })

    return NextResponse.json({
      registrations: registrations.map(r => ({
        id: r.id,
        devoteeName: r.devotee.fullName,
        phone: r.devotee.phone,
        status: r.status,
        registrationDate: r.registrationDate.toISOString(),
      })),
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
