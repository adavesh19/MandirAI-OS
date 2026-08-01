import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import type { Metadata, Viewport } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app'),

  title: {
    default: 'MandirAI OS | #1 Temple Website Builder & Temple Management Software India',
    template: '%s | MandirAI OS',
  },

  description:
    "MandirAI OS is India's #1 AI-powered temple website builder and management platform. Create your Hindu temple website in 3 minutes. Manage online donations with UPI, seva bookings, 80G receipts, devotee CRM, live darshan streaming, and WhatsApp notifications — all in one platform. Free to start.",

  keywords: [
    // Core product
    'temple website builder',
    'temple website builder india',
    'best temple website builder india',
    'free temple website builder',
    'hindu temple website maker',
    'create temple website online',
    'ai temple website builder',
    // Management
    'temple management software',
    'hindu temple management system',
    'mandir management software',
    'mandir management system',
    'temple ERP india',
    'religious trust software india',
    // Donations
    'temple donation software',
    'online donation for temple india',
    'digital hundi online',
    'temple donation website india',
    // Features
    'seva booking system',
    'pooja booking system online',
    'online archana booking',
    'devotee crm software',
    '80g receipt generator',
    'temple 80g receipt',
    'live darshan streaming',
    'temple live stream',
    // Long-tail geo
    'temple website builder bangalore',
    'mandir software hyderabad',
    'temple management chennai',
    'mandir website builder mumbai',
    'temple website builder delhi',
    // Brand
    'mandir ai os',
    'mandir ai',
    'mandirAI',
  ],

  authors: [{ name: 'MandirAI Team', url: 'https://mandir-ai-os.vercel.app' }],
  creator: 'MandirAI OS',
  publisher: 'MandirAI OS',

  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
    languages: {
      'en-IN': process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
      'hi-IN': process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph (Facebook, WhatsApp, LinkedIn previews)
  openGraph: {
    title: 'MandirAI OS | #1 Temple Website Builder & Management Software in India',
    description:
      "Create your temple website in 3 minutes using AI. Manage donations, seva bookings, 80G receipts, and 50,000+ devotees — all in one platform. Free forever plan available.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
    siteName: 'MandirAI OS',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MandirAI OS — Temple Website Builder & Management Software',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'MandirAI OS | #1 Temple Website Builder in India',
    description:
      'Create your temple website in 3 minutes. Free plan available. Online donations, seva bookings, 80G receipts & more.',
    creator: '@mandirai_os',
    images: ['/og-image.png'],
  },

  // Google indexing directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Google Search Console verification
  verification: {
    google: 'vQz0nX8cEd2O0SX4szjRDVrjjQPvLv-w0ziWGZwrSbw',
  },

  // App manifest
  manifest: '/manifest.json',

  // Category for app stores / directories
  category: 'technology',
  classification: 'Business Software',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // ── Organization ─────────────────────────────────────────────────
      {
        '@type': 'Organization',
        '@id': 'https://mandir-ai-os.vercel.app/#organization',
        name: 'MandirAI OS',
        url: 'https://mandir-ai-os.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mandir-ai-os.vercel.app/logo.png',
          width: 512,
          height: 512,
        },
        description: "India's #1 AI-powered temple website builder and management software.",
        foundingDate: '2024',
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        knowsLanguage: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Marathi', 'Bengali'],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        sameAs: [
          'https://twitter.com/mandirai_os',
        ],
      },
      // ── WebSite (enables Sitelinks Searchbox) ───────────────────────
      {
        '@type': 'WebSite',
        '@id': 'https://mandir-ai-os.vercel.app/#website',
        url: 'https://mandir-ai-os.vercel.app',
        name: 'MandirAI OS',
        description: "India's #1 Temple Website Builder & Management Platform",
        publisher: { '@id': 'https://mandir-ai-os.vercel.app/#organization' },
        inLanguage: ['en-IN', 'hi-IN'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://mandir-ai-os.vercel.app/?s={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      // ── SoftwareApplication ──────────────────────────────────────────
      {
        '@type': 'SoftwareApplication',
        name: 'MandirAI OS — Temple Website Builder & Management Software',
        applicationCategory: 'WebApplication',
        applicationSubCategory: 'Temple Management Software',
        operatingSystem: 'Any (Web-based)',
        browserRequirements: 'Requires JavaScript',
        description:
          "India's #1 AI-powered temple website builder. Create a full Hindu temple website in 3 minutes. Manage online donations (UPI + Razorpay), seva bookings, 80G receipts, devotee CRM, and multilingual pages — all in one platform.",
        url: 'https://mandir-ai-os.vercel.app',
        screenshot: 'https://mandir-ai-os.vercel.app/og-image.png',
        featureList: [
          'AI temple website builder with 6 sacred design themes',
          'Online donation with UPI, cards & Razorpay',
          'Automatic 80G tax receipt generator',
          'Online seva & pooja booking system',
          'Devotee CRM with Gotra, Nakshatra & birthday tracking',
          'WhatsApp & email bulk notifications',
          'Multilingual support (Hindi, Tamil, Telugu, Kannada, Marathi)',
          'Custom domain hosting',
          'Live darshan YouTube streaming integration',
          'Hindu festival auto-calendar',
          'Volunteer management',
          'QR-code event check-in',
          'Income & expense financial reports',
          'AI copilot for temple announcements',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          description: 'Free forever plan — no credit card required',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1200',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  }

  return (
    <html lang="en-IN" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        {/* Global JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MandirAI OS" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Geo-targeting meta tags (boost local/regional search) */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        <meta name="DC.title" content="MandirAI OS — Temple Website Builder & Management Software India" />

        {/* Language targeting */}
        <meta httpEquiv="content-language" content="en-IN" />

        {/* Feed & discovery signals */}
        <link rel="alternate" type="application/rss+xml" title="MandirAI OS Blog" href="/feed.xml" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground bg-stone-50 dark:bg-stone-950 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
