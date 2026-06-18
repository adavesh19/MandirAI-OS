import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { getFestivalsForYear, festivalToEventData } from '@/lib/hindu-calendar'

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const year = body.year || new Date().getFullYear()
    const selectedFestivals = body.festivals as string[] | undefined

    const festivals = getFestivalsForYear(year)
    const toImport = selectedFestivals ? festivals.filter(f => selectedFestivals.includes(f.name)) : festivals

    let imported = 0
    let skipped = 0

    for (const festival of toImport) {
      const eventData = festivalToEventData(festival, year, tenantId)
      const existing = await prisma.event.findFirst({
        where: { templeId: tenantId, startDate: eventData.startDate },
      })
      if (existing) { skipped++; continue }
      await prisma.event.create({ data: eventData as any })
      imported++
    }

    return NextResponse.json({ success: true, imported, skipped, year })
  } catch (error: any) {
    console.error('[festivals/import]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  const festivals = getFestivalsForYear(new Date().getFullYear())
  return NextResponse.json({ festivals })
}
