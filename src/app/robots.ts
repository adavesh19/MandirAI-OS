import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // CRITICAL: Must match your actual deployed domain exactly
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/pricing',
          '/temple-website-builder',
          '/features',
          '/temple-management-software',
          '/temple-donation-software',
          '/sitemap.xml',
        ],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
