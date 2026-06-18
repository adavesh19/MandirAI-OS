import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import { createAdminClient } from '@/lib/supabase/admin'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const title = formData.get('title') as string || ''
    const category = formData.get('category') as string || 'general'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, GIF, MP4 allowed.' },
        { status: 400 }
      )
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum 10MB allowed.' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `${tenantId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
    const bucket = 'temple-media'

    // Auto-create bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucket)
    if (bucketError && bucketError.message.includes('not found')) {
      console.log('[media-upload] Bucket not found, creating it...')
      await supabase.storage.createBucket(bucket, { public: true })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('[media-upload] Supabase error:', uploadError)
      return NextResponse.json(
        { error: 'Storage upload failed: ' + uploadError.message },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    // Save to media table
    const mediaType = file.type.startsWith('video') ? 'VIDEO' : 'IMAGE'
    const mediaRecord = await prisma.media.create({
      data: {
        templeId: tenantId,
        type: mediaType as any,
        url: publicUrl,
        thumbnailUrl: mediaType === 'IMAGE' ? publicUrl : null,
        title: title || file.name.replace(/\.[^/.]+$/, ''),
        category,
        sortOrder: 0,
      },
    })

    return NextResponse.json({
      success: true,
      media: {
        id: mediaRecord.id,
        url: publicUrl,
        title: mediaRecord.title,
        type: mediaRecord.type,
        category: mediaRecord.category,
        createdAt: mediaRecord.createdAt,
      },
    })
  } catch (error: any) {
    console.error('[media-upload]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
