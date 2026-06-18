import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Star } from 'lucide-react'
import VolunteersClient from '@/components/dashboard/volunteers-client'

export default async function VolunteersPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  // Parallel data fetches
  const [volunteers, assignments, activeCount, hoursAggregate, totalAssignments] = await Promise.all([
    prisma.volunteer.findMany({
      where: { templeId: tenantId! },
      orderBy: { createdAt: 'desc' },
      include: { devotee: { select: { fullName: true, phone: true, email: true } } },
    }),
    prisma.volunteerAssignment.findMany({
      where: { templeId: tenantId! },
      take: 100,
      include: {
        volunteer: { include: { devotee: { select: { fullName: true } } } },
      },
    }),
    prisma.volunteer.count({ where: { templeId: tenantId!, status: 'ACTIVE' } }),
    prisma.volunteer.aggregate({
      where: { templeId: tenantId! },
      _sum: { totalHours: true },
    }),
    prisma.volunteerAssignment.count({ where: { templeId: tenantId! } }),
  ])

  // Serialize for client
  const serializedVolunteers = volunteers.map((v) => ({
    id: v.id,
    fullName: v.devotee.fullName,
    phone: v.devotee.phone ?? '',
    email: v.devotee.email ?? undefined,
    status: v.status as 'ACTIVE' | 'INACTIVE' | 'PENDING',
    skills: (v.skills as string[]) ?? [],
    totalHours: Number(v.totalHours ?? 0),
    certificates: (v.certificates as Record<string, unknown>) ?? {},
    availability: (v.availability as Record<string, boolean>) ?? {},
    createdAt: v.createdAt.toISOString(),
  }))

  const serializedAssignments = assignments.map((a) => ({
    id: a.id,
    volunteerName: a.volunteer?.devotee?.fullName ?? 'Unknown',
    task: a.task ?? 'General Seva',
    eventName: (a as Record<string, unknown>).eventId ? 'Event' : undefined,
    hoursLogged: Number((a as Record<string, unknown>).hoursLogged ?? 0),
    status: (a.status as 'ASSIGNED' | 'COMPLETED' | 'NO_SHOW') ?? 'ASSIGNED',
    date: a.volunteer?.createdAt?.toISOString() ?? new Date().toISOString(),
  }))

  const stats = {
    totalVolunteers: volunteers.length,
    activeVolunteers: activeCount,
    totalHours: Number(hoursAggregate._sum.totalHours ?? 0),
    totalAssignments,
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="font-heading text-2xl font-bold text-stone-900">Volunteers Management</h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage seva volunteers, assign tasks, track hours, and grow your volunteer community.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-saffron-600 bg-saffron-50 px-4 py-2 rounded-lg border border-saffron-100">
          <Star className="h-4 w-4" />
          <span>Volunteer Module</span>
        </div>
      </div>

      {/* Client Component with full interactivity */}
      <VolunteersClient
        volunteers={serializedVolunteers}
        assignments={serializedAssignments}
        stats={stats}
      />
    </div>
  )
}
