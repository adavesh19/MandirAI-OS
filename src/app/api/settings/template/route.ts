import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const role = user.app_metadata?.role
  const tenantId = user.app_metadata?.tenant_id

  if (!['temple_admin', 'super_admin'].includes(role) || !tenantId) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  try {
    const { templateId, primaryColor, accentColor, fontFamily } = await request.json()
    
    if (templateId && !['classic', 'heritage', 'modern', 'divine-glow'].includes(templateId)) {
      return NextResponse.json({ error: 'Invalid template ID' }, { status: 400 })
    }

    // Fetch current themeConfig to preserve other settings if any exist
    const temple = await prisma.temple.findUnique({
      where: { id: tenantId },
      select: { themeConfig: true }
    })

    const currentTheme = (temple?.themeConfig as any) || {}
    
    const updatedTheme = {
      ...currentTheme,
    }
    
    if (templateId) updatedTheme.templateId = templateId
    if (primaryColor !== undefined) updatedTheme.primaryColor = primaryColor
    if (accentColor !== undefined) updatedTheme.accentColor = accentColor
    if (fontFamily !== undefined) updatedTheme.fontFamily = fontFamily
    
    await prisma.temple.update({
      where: { id: tenantId },
      data: {
        themeConfig: updatedTheme
      }
    })

    return NextResponse.json({ success: true, themeConfig: updatedTheme })

  } catch (error: any) {
    console.error('[API/Template]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const tenantId = user.app_metadata?.tenant_id
  if (!tenantId) {
    return NextResponse.json({ themeConfig: { templateId: 'classic' } })
  }

  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
    select: { themeConfig: true }
  })

  const themeConfig = (temple?.themeConfig as any) || { templateId: 'classic' }
  
  return NextResponse.json({ themeConfig })
}

