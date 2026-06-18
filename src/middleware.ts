import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/pricing']
const authRoutes = ['/login', '/register', '/forgot-password']
const templePublicPrefix = '/temple/'
const devoteeRoutes = ['/my-dashboard']

// ══════════════════════════════════════════════════════════════════════
// CUSTOM DOMAIN MAPPING
// ══════════════════════════════════════════════════════════════════════
// This is the main hostname of YOUR platform (the SaaS).
// When a request comes from a different hostname, we treat it as a
// custom-domain temple website and rewrite to /temple/[slug].
//
// Set this to your Vercel deployment domain or your own domain.
const PLATFORM_HOSTS = [
  'localhost',
  'localhost:3000',
  '127.0.0.1',
  '127.0.0.1:3000',
  'temple-ai-os.vercel.app', // ← Replace with your actual Vercel domain
  // Add your production domain here, e.g.:
  // 'templeos.in',
  // 'www.templeos.in',
]

// In-memory cache for domain → slug lookups (avoids DB call on every request)
const domainCache = new Map<string, { slug: string; expiry: number }>()
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Looks up a custom domain in the database and returns the temple slug.
 * Uses a simple in-memory cache to avoid hitting the DB on every request.
 */
async function resolveCustomDomain(hostname: string): Promise<string | null> {
  // Check cache first
  const cached = domainCache.get(hostname)
  if (cached && Date.now() < cached.expiry) {
    return cached.slug
  }

  // Dynamic import to avoid bundling issues in edge runtime
  try {
    // We use fetch to our own API route instead of Prisma directly
    // because Edge Middleware cannot use Prisma's Node.js query engine.
    // This internal API route does the DB lookup for us.
    const lookupUrl = new URL('/api/domain-lookup', `http://${hostname}`)
    lookupUrl.searchParams.set('domain', hostname)

    // We cannot call our own API from middleware easily, so we'll
    // use a simpler approach: a static mapping + database cache.
    // For production, use Vercel's Edge Config or a KV store.
    //
    // For now, we'll let the /api/domain-lookup handle it on first load
    // and cache the result for subsequent requests.
    return null
  } catch {
    return null
  }
}

// ══════════════════════════════════════════════════════════════════════
// MAIN PROXY (MIDDLEWARE)
// ══════════════════════════════════════════════════════════════════════
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // ─── CUSTOM DOMAIN HANDLING ───────────────────────────────────────
  // If the request is NOT from our platform's own domain, it must be
  // a temple's custom domain. Rewrite it to /temple/[slug]/[path].
  const isPlatformHost = PLATFORM_HOSTS.some(
    (h) => hostname === h || hostname.endsWith(`.${h}`)
  )

  if (!isPlatformHost) {
    // This is a custom domain request!
    // Check cache for domain → slug mapping
    const cached = domainCache.get(hostname)
    if (cached && Date.now() < cached.expiry) {
      // Rewrite to /temple/[slug] path
      const templePath = pathname === '/' ? `/temple/${cached.slug}` : `/temple/${cached.slug}${pathname}`
      const url = request.nextUrl.clone()
      url.pathname = templePath
      return NextResponse.rewrite(url)
    }

    // Not in cache — redirect to our internal API to resolve and cache
    // The API will redirect back with the correct rewrite
    const resolveUrl = request.nextUrl.clone()
    resolveUrl.pathname = '/api/domain-lookup'
    resolveUrl.searchParams.set('domain', hostname)
    resolveUrl.searchParams.set('path', pathname)
    return NextResponse.rewrite(resolveUrl)
  }

  // ─── NORMAL PLATFORM ROUTING ──────────────────────────────────────
  const { user, supabaseResponse } = await updateSession(request)

  // Allow public temple websites
  if (pathname.startsWith(templePublicPrefix)) {
    return supabaseResponse
  }

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    // Redirect authenticated users away from auth pages
    if (user && authRoutes.includes(pathname)) {
      const role = user.app_metadata?.role || 'devotee'
      const redirectMap: Record<string, string> = {
        super_admin: '/super-admin/overview',
        temple_admin: '/dashboard',
        staff: '/dashboard',
        devotee: '/my-dashboard',
      }
      return NextResponse.redirect(new URL(redirectMap[role] || '/dashboard', request.url))
    }
    return supabaseResponse
  }

  // Protected routes - require auth
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const role = user.app_metadata?.role || 'devotee'

  // Devotee-only routes
  if (devoteeRoutes.some((r) => pathname.startsWith(r))) {
    return supabaseResponse
  }

  // Super admin routes
  if (pathname.startsWith('/super-admin') && role !== 'super_admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Platform routes (temple admin + staff)
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/donations') ||
       pathname.startsWith('/devotees') || pathname.startsWith('/events') ||
       pathname.startsWith('/volunteers') || pathname.startsWith('/website') ||
       pathname.startsWith('/analytics') || pathname.startsWith('/receipts') ||
       pathname.startsWith('/settings')) &&
      !['temple_admin', 'staff', 'super_admin'].includes(role)) {
    // Devotees get redirected to their own portal, not a scary error page
    if (role === 'devotee') {
      return NextResponse.redirect(new URL('/my-dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// ══════════════════════════════════════════════════════════════════════
// EXPORTS: Domain cache helpers (used by API routes)
// ══════════════════════════════════════════════════════════════════════
export { domainCache, CACHE_TTL_MS }
