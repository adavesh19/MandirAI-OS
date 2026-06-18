import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/dal'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
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
    const fileName = `onboarding/${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
    const bucket = 'temple-media'

    // Auto-create bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucket)
    if (bucketError && bucketError.message.includes('not found')) {
      console.log('[onboarding-upload] Bucket not found, creating it...')
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
      console.error('[onboarding-upload] Supabase error:', uploadError)
      return NextResponse.json(
        { error: 'Storage upload failed: ' + uploadError.message },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      url: publicUrl,
    })
  } catch (error: any) {
    console.error('[onboarding-upload]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
