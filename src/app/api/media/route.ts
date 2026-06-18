import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenantId = user.app_metadata.tenant_id

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure public/uploads exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const filePath = join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    const fileUrl = `/uploads/${fileName}`

    // Save to database
    const media = await prisma.media.create({
      data: {
        templeId: tenantId,
        type: 'IMAGE',
        url: fileUrl,
        title: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
      }
    })

    return NextResponse.json({ success: true, media })
  } catch (error: any) {
    console.error('[Upload Error]', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenantId = user.app_metadata.tenant_id

  try {
    const mediaList = await prisma.media.findMany({
      where: { templeId: tenantId, type: 'IMAGE' },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, mediaList })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenantId = user.app_metadata.tenant_id

  try {
    const { id } = await request.json()
    const media = await prisma.media.findFirst({
      where: { id, templeId: tenantId }
    })

    if (!media) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 })
    }

    // Delete database record
    await prisma.media.delete({
      where: { id }
    })

    // Delete local file
    const filePath = join(process.cwd(), 'public', media.url)
    if (existsSync(filePath)) {
      await unlink(filePath)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
