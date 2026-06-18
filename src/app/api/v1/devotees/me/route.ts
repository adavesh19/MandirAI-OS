import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Find all devotee records for this user across all temples
    const devotees = await prisma.devotee.findMany({
      where: { userId: user.id },
      select: {
        karmaPoints: true,
        badgeTier: true,
        temple: {
          select: { name: true, slug: true }
        }
      }
    })

    const totalKarma = devotees.reduce((sum, d) => sum + d.karmaPoints, 0)
    
    // Determine highest tier (SAFFRON > GOLD > SILVER > BRONZE)
    const tierMap: Record<string, number> = { BRONZE: 1, SILVER: 2, GOLD: 3, SAFFRON: 4 }
    let highestTier = 'BRONZE'
    let highestVal = 1
    
    devotees.forEach(d => {
      const val = tierMap[d.badgeTier] || 1
      if (val > highestVal) {
        highestVal = val
        highestTier = d.badgeTier
      }
    })

    return NextResponse.json({
      totalKarma,
      badgeTier: highestTier,
      memberships: devotees.length
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
