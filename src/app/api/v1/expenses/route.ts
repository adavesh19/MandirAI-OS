import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireStaff } from '@/lib/dal'

export async function GET(req: NextRequest) {
  try {
    const { tenantId } = await requireStaff()
    if (!tenantId) return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })

    const expenses = await prisma.expense.findMany({
      where: { templeId: tenantId },
      orderBy: { date: 'desc' },
      include: {
        creator: { select: { fullName: true } }
      }
    })
    return NextResponse.json(expenses)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, tenantId } = await requireStaff()
    if (!tenantId) return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })

    const { amount, category, date, notes, receiptUrl } = await req.json()

    const expense = await prisma.expense.create({
      data: {
        templeId: tenantId,
        amount,
        category,
        date: new Date(date),
        notes,
        receiptUrl,
        createdBy: user.id
      }
    })
    return NextResponse.json(expense)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
