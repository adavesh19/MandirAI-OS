import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

/**
 * API Route: /api/settings/domain
 * 
 * Saves a custom domain for the current temple admin's temple.
 * The domain is stored in the `websiteDomain` field of the temples table.
 */
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
    const body = await request.json()
    const domain = body.domain?.toString().toLowerCase().trim().replace(/^www\./, '').replace(/\/$/, '')

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
    }

    // Validate domain format
    const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/
    if (!domainRegex.test(domain)) {
      return NextResponse.json({ error: 'Invalid domain format' }, { status: 400 })
    }

    // Check if another temple is already using this domain
    const existing = await prisma.temple.findFirst({
      where: {
        websiteDomain: domain,
        id: { not: tenantId },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'This domain is already in use by another temple' },
        { status: 409 }
      )
    }

    // Save the domain to the temple record
    await prisma.temple.update({
      where: { id: tenantId },
      data: { websiteDomain: domain },
    })

    return NextResponse.json({
      success: true,
      domain,
      message: `Domain ${domain} has been configured. Please add the DNS records to your domain registrar.`,
    })
  } catch (error) {
    console.error('[settings/domain] Error:', error)
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
    return NextResponse.json({ domain: null })
  }

  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
    select: { websiteDomain: true, slug: true },
  })

  return NextResponse.json({
    domain: temple?.websiteDomain || null,
    slug: temple?.slug || null,
  })
}
