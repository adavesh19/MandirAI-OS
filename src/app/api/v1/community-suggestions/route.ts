import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

export async function POST(req: Request) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { templeId, title, description } = await req.json()

    const devotee = await prisma.devotee.findFirst({
      where: { userId: user.id, templeId }
    })

    if (!devotee) {
      return NextResponse.json({ error: 'Devotee profile not found' }, { status: 404 })
    }

    const suggestion = await prisma.communitySuggestion.create({
      data: {
        templeId,
        devoteeId: devotee.id,
        title,
        description
      },
      include: {
        devotee: { select: { fullName: true } }
      }
    })

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, action } = await req.json()

    if (action === 'upvote') {
      const suggestion = await prisma.communitySuggestion.update({
        where: { id },
        data: {
          upvotes: { increment: 1 }
        }
      })
      return NextResponse.json({ suggestion })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
