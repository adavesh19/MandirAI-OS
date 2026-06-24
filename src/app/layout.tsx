import { Inter, Outfit } from 'next/font/google'
import './globals.css'

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

import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#f97316',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app'),
  title: {
    default: 'MandirAI OS | #1 Temple Website Builder & Hindu Temple Management Software',
    template: '%s | MandirAI OS',
  },
  description: 'MandirAI OS is India\'s #1 AI-powered temple website builder and management platform. Create your temple website in 3 minutes. Automate donations, seva bookings, 80G receipts, devotee CRM, and multilingual pages.',
  keywords: [
    'temple website builder',
    'best temple website builder india',
    'free temple website builder',
    'hindu temple website maker',
    'create temple website online',
    'temple management software',
    'hindu temple management system',
    'mandir management software',
    'temple donation software',
    'online donation for temple india',
    'digital hundi online',
    'temple CRM software',
    'seva booking software',
    'pooja booking system',
    'ai website creator for temples',
    'mandir management app',
    'trust management software india',
    '80g receipt generator',
    'temple website design india',
    'mandir ai os',
    'hindu temple management software',
    'temple website generator',
  ],
  authors: [{ name: 'MandirAI Team' }],
  creator: 'MandirAI OS',
  publisher: 'MandirAI OS',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'MandirAI OS | #1 Temple Website Builder & Temple Management Software',
    description: 'Create your temple website in 3 minutes using AI. Manage donations, seva bookings, 80G receipts, and devotee CRM — all in one platform.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://mandir-ai-os.vercel.app',
    siteName: 'MandirAI OS',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MandirAI OS | #1 Temple Website Builder in India',
    description: 'Create your temple website in 3 minutes using AI. Free plan available.',
    creator: '@mandirai_os',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'vQz0nX8cEd2O0SX4szjRDVrjjQPvLv-w0ziWGZwrSbw',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MandirAI OS" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground bg-stone-50 dark:bg-stone-950 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
