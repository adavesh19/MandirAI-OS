import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const [dailyDonations, categoryBreakdown, methodBreakdown, topDevotees, sevaBookings] = await Promise.all([
      // Daily donations for last 30 days
      prisma.donation.findMany({
        where: { templeId: tenantId, paymentStatus: 'COMPLETED', createdAt: { gte: thirtyDaysAgo } },
        select: { amount: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
      // Category breakdown
      prisma.donation.groupBy({
        by: ['categoryId'],
        where: { templeId: tenantId, paymentStatus: 'COMPLETED' },
        _sum: { amount: true },
        _count: true,
      }),
      // Payment method breakdown
      prisma.donation.groupBy({
        by: ['paymentMethod'],
        where: { templeId: tenantId, paymentStatus: 'COMPLETED' },
        _sum: { amount: true },
        _count: true,
      }),
      // Top devotees by donation
      prisma.devotee.findMany({
        where: { templeId: tenantId },
        orderBy: { totalDonated: 'desc' },
        take: 10,
        select: { fullName: true, totalDonated: true, visitCount: true },
      }),
      // Seva booking count by type
      prisma.sevaBooking.groupBy({
        by: ['sevaId'],
        where: { templeId: tenantId },
        _count: true,
      }),
    ])

    // Build daily chart data
    const dailyMap = new Map<string, number>()
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      dailyMap.set(d.toISOString().split('T')[0], 0)
    }
    dailyDonations.forEach(d => {
      const key = d.createdAt.toISOString().split('T')[0]
      if (dailyMap.has(key)) {
        dailyMap.set(key, (dailyMap.get(key) || 0) + Number(d.amount))
      }
    })
    const dailyChartData = Array.from(dailyMap.entries()).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      amount,
    }))

    // Fetch category names
    const categories = await prisma.donationCategory.findMany({
      where: { templeId: tenantId },
      select: { id: true, name: true },
    })
    const catMap = new Map(categories.map(c => [c.id, c.name]))

    const categoryChartData = categoryBreakdown.map(c => ({
      name: catMap.get(c.categoryId) || 'Unknown',
      value: Number(c._sum.amount || 0),
      count: c._count,
    }))

    const methodChartData = methodBreakdown.map(m => ({
      name: m.paymentMethod || 'Unknown',
      amount: Number(m._sum.amount || 0),
      count: m._count,
    }))

    const topDevoteesData = topDevotees.map(d => ({
      name: d.fullName,
      donated: Number(d.totalDonated || 0),
      visits: d.visitCount,
    }))

    return NextResponse.json({
      dailyChartData,
      categoryChartData,
      methodChartData,
      topDevoteesData,
    })
  } catch (error: any) {
    console.error('[analytics GET]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
