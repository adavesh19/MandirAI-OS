import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * API Route: /api/domain-lookup
 * 
 * Resolves a custom domain → temple slug from the database.
 * Used by the proxy middleware when a request comes from a non-platform hostname.
 *
 * Query Params:
 *   - domain: The custom domain hostname (e.g., "shreeankalagimath.com")
 *   - path: The original path the visitor was trying to access (e.g., "/about")
 *
 * How it works:
 * 1. Middleware detects a custom domain request
 * 2. Middleware rewrites to /api/domain-lookup?domain=X&path=Y
 * 3. This route looks up the domain in the `temples` table
 * 4. If found, redirects internally to /temple/[slug]/[path]
 * 5. If not found, returns a 404 page
 */
export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get('domain')
  const originalPath = request.nextUrl.searchParams.get('path') || '/'

  if (!domain) {
    return NextResponse.json(
      { error: 'Missing domain parameter' },
      { status: 400 }
    )
  }

  try {
    // Look up the temple by its custom domain
    // The `websiteDomain` field in the temples table stores the custom domain
    const temple = await prisma.temple.findFirst({
      where: {
        websiteDomain: {
          equals: domain.toLowerCase().replace(/^www\./, ''),
          mode: 'insensitive',
        },
        isActive: true,
      },
      select: {
        slug: true,
        name: true,
      },
    })

    if (!temple) {
      // No temple found for this domain
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Domain Not Configured</title>
          <style>
            body { font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #FAFAF9; color: #1C1917; }
            .container { text-align: center; max-width: 480px; padding: 40px; }
            h1 { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
            p { color: #78716C; font-size: 14px; line-height: 1.6; }
            .badge { display: inline-block; background: #FFF7ED; border: 1px solid #FED7AA; color: #C2410C; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 999px; margin-top: 16px; }
            a { color: #EA580C; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div style="font-size: 48px; margin-bottom: 16px;">🛕</div>
            <h1>Domain Not Configured</h1>
            <p>
              The domain <strong>${domain}</strong> has not been linked to any temple on our platform yet.
            </p>
            <p>
              If you are the temple administrator, please go to your 
              <strong>Admin Dashboard → Settings → Custom Domain</strong> 
              and enter this domain name.
            </p>
            <div class="badge">Powered by MandirAI OS</div>
          </div>
        </body>
        </html>`,
        {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      )
    }

    // Found! Rewrite the request to the temple's page
    const templePath = originalPath === '/'
      ? `/temple/${temple.slug}`
      : `/temple/${temple.slug}${originalPath}`

    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = templePath
    rewriteUrl.searchParams.delete('domain')
    rewriteUrl.searchParams.delete('path')

    return NextResponse.rewrite(rewriteUrl)

  } catch (error) {
    console.error('[domain-lookup] Error resolving domain:', domain, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
