import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app'

  return {
    rules: [
      {
        // Allow all major search engine bots fully
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'facebot', 'Twitterbot', 'LinkedInBot'],
        allow: [
          '/',
          '/temple-website-builder',
          '/temple-management-software',
          '/temple-donation-software',
          '/mandir-management-system',
          '/features',
          '/seva-booking-system',
          '/80g-receipt-generator',
          '/devotee-crm',
          '/live-darshan-streaming',
          '/pricing',
          '/register',
          '/login',
          '/sitemap.xml',
          '/temple/',
        ],
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/super-admin',
          '/super-admin/',
          '/my-dashboard',
          '/my-dashboard/',
          '/settings',
          '/settings/',
          '/api/',
          '/onboarding',
          '/kiosk/',
        ],
      },
      {
        // General: allow all public pages, block private ones
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/super-admin',
          '/super-admin/',
          '/my-dashboard',
          '/settings',
          '/api/',
          '/onboarding',
          '/kiosk/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
