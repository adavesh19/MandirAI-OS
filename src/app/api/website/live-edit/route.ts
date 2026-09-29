import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

// GET: fetch the temple's complete editable website data
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    const { searchParams } = new URL(request.url)
    const slugParam = searchParams.get('slug')

    let templeId = user?.app_metadata?.tenant_id

    // If super admin or specific slug requested
    if (!templeId && slugParam) {
      const found = await prisma.temple.findUnique({
        where: { slug: slugParam.toLowerCase() },
        select: { id: true }
      })
      templeId = found?.id
    }

    if (!templeId) {
      return NextResponse.json({ error: 'Temple not found or unauthorized' }, { status: 401 })
    }

    const temple = await prisma.temple.findUnique({
      where: { id: templeId },
      include: {
        sevas: {
          orderBy: { createdAt: 'asc' },
          select: { id: true, name: true, price: true, description: true, isActive: true }
        },
        pages: {
          where: { pageType: 'HOME' },
          take: 1
        }
      }
    })

    if (!temple) {
      return NextResponse.json({ error: 'Temple not found' }, { status: 404 })
    }

    const homePage = temple.pages[0]
    const pageContent = (homePage?.content as any) || {}
    const themeConfig = (temple.themeConfig as any) || {}
    const historyData = (temple.history as any) || {}

    return NextResponse.json({
      success: true,
      data: {
        id: temple.id,
        slug: temple.slug,
        name: temple.name,
        primaryDeity: temple.primaryDeity || '',
        description: themeConfig.description || pageContent.description || '',
        historyText: historyData.text || themeConfig.history || pageContent.html || '',
        coverImageUrl: temple.coverImageUrl || themeConfig.templeImageUrl || themeConfig.heroImageUrl || '',
        logoUrl: temple.logoUrl || themeConfig.deityImageUrl || themeConfig.godImageUrl || themeConfig.logoUrl || '',
        templeImageUrl: temple.coverImageUrl || themeConfig.templeImageUrl || themeConfig.heroImageUrl || '',
        deityImageUrl: temple.logoUrl || themeConfig.deityImageUrl || themeConfig.godImageUrl || themeConfig.logoUrl || '',
        liveStreamUrl: temple.liveStreamUrl || themeConfig.liveStreamUrl || '',
        timings: temple.timings || {
          morning_open: '06:00',
          morning_close: '12:00',
          evening_open: '16:00',
          evening_close: '21:00',
        },
        contactPhone: temple.contactPhone || '',
        contactEmail: temple.contactEmail || '',
        address: temple.address || {},
        upiId: temple.upiId || '',
        templateId: themeConfig.templateId || 'classic',
        themeConfig,
        sevas: temple.sevas.map(s => ({
          id: s.id,
          name: s.name,
          price: Number(s.price),
          description: s.description || '',
          isActive: s.isActive
        }))
      }
    })
  } catch (error: any) {
    console.error('[live-edit GET] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST: update all website elements and save directly
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    const body = await request.json()
    const { slug, templeId: inputTempleId } = body

    let targetTempleId = user?.app_metadata?.tenant_id || inputTempleId

    // If tenantId not in session token, locate by slug
    if (!targetTempleId && slug) {
      const found = await prisma.temple.findUnique({
        where: { slug: slug.toLowerCase() },
        select: { id: true }
      })
      targetTempleId = found?.id
    }

    if (!targetTempleId) {
      return NextResponse.json({ error: 'Unauthorized or missing temple reference' }, { status: 401 })
    }

    const currentTemple = await prisma.temple.findUnique({
      where: { id: targetTempleId }
    })

    if (!currentTemple) {
      return NextResponse.json({ error: 'Temple not found' }, { status: 404 })
    }

    const currentTheme = (currentTemple.themeConfig as any) || {}
    const updatedTheme = {
      ...currentTheme,
      ...(body.themeConfig || {}),
      ...(body.templateId ? { templateId: body.templateId } : {}),
      ...(body.description !== undefined ? { description: body.description } : {}),
      ...(body.historyText !== undefined ? { history: body.historyText } : {}),
      ...(body.coverImageUrl !== undefined ? { 
        heroImageUrl: body.coverImageUrl,
        coverImageUrl: body.coverImageUrl,
        templeImageUrl: body.coverImageUrl 
      } : {}),
      ...(body.logoUrl !== undefined ? { 
        logoUrl: body.logoUrl,
        deityImageUrl: body.logoUrl,
        godImageUrl: body.logoUrl 
      } : {}),
      ...(body.liveStreamUrl !== undefined ? { liveStreamUrl: body.liveStreamUrl } : {}),
    }

    // 1. Update Temple record
    const updatedTemple = await prisma.temple.update({
      where: { id: targetTempleId },
      data: {
        name: body.name ?? undefined,
        primaryDeity: body.primaryDeity ?? undefined,
        coverImageUrl: body.coverImageUrl ?? undefined,
        logoUrl: body.logoUrl ?? undefined,
        liveStreamUrl: body.liveStreamUrl ?? undefined,
        contactPhone: body.contactPhone ?? undefined,
        contactEmail: body.contactEmail ?? undefined,
        address: body.address ?? undefined,
        timings: body.timings ?? undefined,
        upiId: body.upiId ?? undefined,
        history: body.historyText !== undefined ? { text: body.historyText } : undefined,
        themeConfig: updatedTheme,
      }
    })

    // 2. Sync Sevas if provided
    if (Array.isArray(body.sevas)) {
      for (const sevaItem of body.sevas) {
        if (!sevaItem.name) continue
        const priceNum = Number(sevaItem.price) || 0

        if (sevaItem.id && !sevaItem.id.startsWith('temp-')) {
          // Update existing seva
          await prisma.seva.update({
            where: { id: sevaItem.id },
            data: {
              name: typeof sevaItem.name === 'string' ? { en: sevaItem.name } : sevaItem.name,
              price: priceNum,
              description: sevaItem.description ? { en: sevaItem.description } : undefined,
              isActive: sevaItem.isActive !== false
            }
          }).catch(err => console.warn('Could not update seva', err))
        } else {
          // Create new seva
          await prisma.seva.create({
            data: {
              templeId: targetTempleId,
              name: typeof sevaItem.name === 'string' ? { en: sevaItem.name } : sevaItem.name,
              price: priceNum,
              durationMinutes: Number(sevaItem.durationMinutes) || 30,
              description: sevaItem.description ? { en: sevaItem.description } : undefined,
              isActive: true
            }
          }).catch(err => console.warn('Could not create seva', err))
        }
      }
    }

    // 3. Update Home Page content if exists
    const homePage = await prisma.templePage.findFirst({
      where: { templeId: targetTempleId, pageType: 'HOME' }
    })

    if (homePage) {
      const prevContent = (homePage.content as any) || {}
      await prisma.templePage.update({
        where: { id: homePage.id },
        data: {
          content: {
            ...prevContent,
            description: body.description ?? prevContent.description,
            html: body.historyText ?? prevContent.html,
          }
        }
      }).catch(err => console.warn('Could not update home page record', err))
    }

    // 4. Invalidate Next.js cache so the live website updates immediately
    revalidatePath('/', 'layout')
    revalidatePath(`/temple/${updatedTemple.slug}`, 'page')
    revalidatePath(`/temple/${updatedTemple.slug}/live`, 'page')
    revalidatePath('/website/editor', 'page')

    return NextResponse.json({
      success: true,
      message: 'Website updated and published successfully!',
      temple: {
        id: updatedTemple.id,
        slug: updatedTemple.slug,
        name: updatedTemple.name,
        coverImageUrl: updatedTemple.coverImageUrl,
        logoUrl: updatedTemple.logoUrl,
        liveStreamUrl: updatedTemple.liveStreamUrl,
        templateId: updatedTheme.templateId,
      }
    })
  } catch (error: any) {
    console.error('[live-edit POST] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
