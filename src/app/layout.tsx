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
  metadataBase: new URL('https://mandirai.vercel.app'),
  title: {
    default: 'MandirAI OS | The Ultimate Hindu Temple Management Software & AI Website Builder',
    template: '%s | MandirAI OS',
  },
  description: 'The premium operating system for Hindu temples globally. Automate stunning 3D website creation in seconds using AI, manage massive donation drives, generate 80G tax receipts, track devotee CRM, and handle live seva bookings seamlessly.',
  keywords: [
    'best temple management software',
    'hindu temple management system',
    'temple website builder',
    'temple donation software',
    'temple CRM',
    'seva booking software',
    'digital hundi online',
    'ai website creator for temples',
    'mandir management software',
    'mandir donation app',
    'trust management software',
    '80g receipt generator',
    'mandir ai os',
    'hindu trust software'
  ],
  authors: [{ name: 'MandirAI Team' }],
  creator: 'MandirAI OS',
  publisher: 'MandirAI OS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'MandirAI OS | The Ultimate Hindu Temple Management Software',
    description: 'The premium operating system for Hindu temples globally. Automate stunning 3D website creation in seconds using AI, manage donations, and handle seva bookings.',
    url: 'https://mandirai.vercel.app',
    siteName: 'MandirAI OS',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MandirAI OS | The Ultimate Hindu Temple Management Software',
    description: 'The premium operating system for Hindu temples globally. Automate stunning 3D website creation in seconds using AI.',
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
