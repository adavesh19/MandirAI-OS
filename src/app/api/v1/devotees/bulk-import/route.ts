import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { devotees } = body

    if (!Array.isArray(devotees) || devotees.length === 0) {
      return NextResponse.json({ error: 'No devotees provided' }, { status: 400 })
    }

    let imported = 0
    let skipped = 0
    const errors: string[] = []

    for (const d of devotees.slice(0, 500)) {
      try {
        if (!d.fullName || !d.phone) { skipped++; continue }
        const existing = await prisma.devotee.findFirst({ where: { templeId: tenantId, phone: String(d.phone).trim() } })
        if (existing) { skipped++; continue }
        await prisma.devotee.create({
          data: {
            templeId: tenantId,
            fullName: String(d.fullName).trim(),
            phone: String(d.phone).trim(),
            email: d.email ? String(d.email).trim() : null,
            gotra: d.gotra ? String(d.gotra).trim() : null,
            address: d.address ? { line1: String(d.address) } : undefined,
            tags: d.tags ? String(d.tags).split(',').map((t: string) => t.trim()).filter(Boolean) : [],
          },
        })
        imported++
      } catch (err: any) {
        errors.push(`Row error: ${err.message}`)
        skipped++
      }
    }

    return NextResponse.json({ success: true, imported, skipped, errors: errors.slice(0, 10) })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
