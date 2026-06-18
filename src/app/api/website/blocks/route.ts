import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenantId = user.app_metadata.tenant_id

  try {
    const page = await prisma.templePage.findFirst({
      where: { templeId: tenantId, pageType: 'HOME' }
    })

    if (!page) {
      return NextResponse.json({ blocks: [] })
    }

    const content = page.content as any
    const blocks = content?.blocks || []

    return NextResponse.json({ blocks })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenantId = user.app_metadata.tenant_id

  try {
    const { blocks } = await request.json()

    const page = await prisma.templePage.findFirst({
      where: { templeId: tenantId, pageType: 'HOME' }
    })

    if (!page) {
      return NextResponse.json({ error: 'Home page not found' }, { status: 404 })
    }

    const currentContent = page.content as any

    await prisma.templePage.update({
      where: { id: page.id },
      data: {
        content: {
          ...currentContent,
          blocks: blocks
        }
      }
    })

    // Clear Next.js cache so modifications show instantly
    revalidatePath('/', 'layout')

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
