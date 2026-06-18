import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import EventsClient from '@/components/dashboard/events-client'

export default async function EventsPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) {
    return null
  }

  // 1. Fetch events
  const events = await prisma.event.findMany({
    where: { templeId: tenantId },
    orderBy: { startDate: 'desc' },
  })

  // 2. Fetch sevas
  const sevas = await prisma.seva.findMany({
    where: { templeId: tenantId },
    orderBy: { createdAt: 'desc' },
  })

  // Format Prisma data into clean serializable objects
  const serializedEvents = events.map((e) => {
    // Safely extract title and description json strings
    const titleObj = typeof e.title === 'string' ? JSON.parse(e.title) : e.title
    const descObj = typeof e.description === 'string' ? JSON.parse(e.description) : e.description

    return {
      id: e.id,
      title: titleObj?.en || 'Festival / Pooja',
      description: descObj?.en || '',
      eventType: e.eventType,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate.toISOString(),
      location: e.location || 'Temple Grounds',
      maxRegistrations: e.maxRegistrations,
      registrationCount: e.registrationCount,
      isFree: e.isFree,
      ticketPrice: e.ticketPrice ? Number(e.ticketPrice) : null,
      status: e.status,
    }
  })

  const serializedSevas = sevas.map((s) => {
    const nameObj = typeof s.name === 'string' ? JSON.parse(s.name) : s.name
    const descObj = typeof s.description === 'string' ? JSON.parse(s.description) : s.description

    return {
      id: s.id,
      name: nameObj?.en || 'Seva / Pooja',
      description: descObj?.en || '',
      price: Number(s.price),
      durationMinutes: s.durationMinutes,
      isActive: s.isActive,
    }
  })

  return <EventsClient events={serializedEvents} sevas={serializedSevas} />
}
