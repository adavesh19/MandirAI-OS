import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const volunteers = await prisma.volunteer.findMany({
      where: { templeId: tenantId },
      include: { devotee: { select: { fullName: true, phone: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      volunteers: volunteers.map((v) => ({
        id: v.id,
        fullName: v.devotee.fullName,
        phone: v.devotee.phone,
        email: v.devotee.email ?? undefined,
        status: v.status,
        skills: v.skills as string[],
        totalHours: Number(v.totalHours),
        certificates: v.certificates,
        availability: v.availability as Record<string, boolean> | undefined,
        createdAt: v.createdAt.toISOString(),
      })),
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { fullName, phone, email, skills, availability } = body

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'fullName and phone are required' }, { status: 400 })
    }

    // Find or create devotee
    let devotee = await prisma.devotee.findFirst({ where: { templeId: tenantId, phone } })
    if (!devotee) {
      devotee = await prisma.devotee.create({
        data: {
          templeId: tenantId,
          fullName,
          phone,
          email: email || null,
        },
      })
    }

    // Check if already a volunteer
    const existing = await prisma.volunteer.findFirst({
      where: { templeId: tenantId, devoteeId: devotee.id },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'This person is already registered as a volunteer' },
        { status: 400 }
      )
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        templeId: tenantId,
        devoteeId: devotee.id,
        status: 'ACTIVE',
        skills: skills || [],
        availability: availability || {},
        totalHours: 0,
        certificates: {},
      },
    })

    return NextResponse.json({ success: true, volunteerId: volunteer.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
