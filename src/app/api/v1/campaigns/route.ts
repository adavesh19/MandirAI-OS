import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireTempleAdmin } from '@/lib/dal'

export async function POST(request: Request) {
  try {
    const { tenantId } = await requireTempleAdmin()
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await request.json()
    const { title, description, targetAmount, endDate } = data

    if (!title || !targetAmount) {
      return NextResponse.json({ error: 'Title and targetAmount are required' }, { status: 400 })
    }

    const campaign = await prisma.campaign.create({
      data: {
        templeId: tenantId,
        title,
        description,
        targetAmount,
        endDate: endDate ? new Date(endDate) : null,
      },
    })

    return NextResponse.json(campaign)
  } catch (error: any) {
    console.error('Campaign Create Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { tenantId } = await requireTempleAdmin()
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const campaigns = await prisma.campaign.findMany({
      where: { templeId: tenantId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(campaigns)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
