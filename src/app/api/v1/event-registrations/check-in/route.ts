import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/dal'

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      
    const { registrationId } = await request.json()
    if (!registrationId) return NextResponse.json({ error: 'registrationId required' }, { status: 400 })

    const searchId = registrationId.startsWith('REG-') ? registrationId.replace('REG-', '') : registrationId

    const recentRegistrations = await prisma.eventRegistration.findMany({
      where: { templeId: tenantId },
      orderBy: { registrationDate: 'desc' },
      take: 1000,
      include: { devotee: true, event: true }
    })

    const registration = recentRegistrations.find(r => 
      r.id.toLowerCase().startsWith(searchId.toLowerCase())
    )

    if (!registration) return NextResponse.json({ error: 'Invalid QR Code or Registration not found' }, { status: 404 })
    if (registration.status === 'ATTENDED') return NextResponse.json({ error: 'Already checked in' }, { status: 400 })

    await prisma.eventRegistration.update({
      where: { id: registration.id },
      data: { status: 'ATTENDED', attendedAt: new Date() }
    })

    const titleObj = typeof registration.event.title === 'string' ? JSON.parse(registration.event.title) : registration.event.title
    const eventName = (titleObj as any)?.en || 'Event'

    return NextResponse.json({ 
      success: true, 
      devoteeName: registration.devotee.fullName,
      eventName,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
