import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/dal'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Find the devotee profile. We might have multiple across temples, 
    // but let's just get all habits for this user.
    const devotee = await prisma.devotee.findFirst({
      where: { userId: user.id }
    })

    if (!devotee) {
      // Return default empty habits or mock ones
      return NextResponse.json({ habits: [] })
    }

    // Check if they have habits
    let habits = await prisma.spiritualHabit.findMany({
      where: { devoteeId: devotee.id }
    })

    // If none, create default habits
    if (habits.length === 0) {
      await prisma.spiritualHabit.createMany({
        data: [
          { templeId: devotee.templeId, devoteeId: devotee.id, habitName: 'Chant Gayatri Mantra (108 times)' },
          { templeId: devotee.templeId, devoteeId: devotee.id, habitName: '15 Mins Dhyana (Meditation)' }
        ]
      })
      habits = await prisma.spiritualHabit.findMany({
        where: { devoteeId: devotee.id }
      })
    }

    return NextResponse.json({ habits })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { habitId, action } = await (req as any).json()

    if (action === 'complete') {
      const habit = await prisma.spiritualHabit.findUnique({
        where: { id: habitId }
      })

      if (habit) {
        await prisma.spiritualHabit.update({
          where: { id: habitId },
          data: {
            streakCount: { increment: 1 },
            lastCompletedAt: new Date()
          }
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
