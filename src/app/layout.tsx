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
  manifest: '/manifest.json',
  title: 'MandirAI OS — Complete Temple Management Platform',
  description: 'AI-powered SaaS platform for Hindu temple management. Auto-generate temple websites, manage donations, devotees CRM, events, receipts, and analytics.',
  keywords: [
    'temple management system',
    'hindu temple software',
    'donation portal',
    'devotee CRM',
    'online seva booking',
    'temple website builder',
    '80g tax receipt generator',
  ],
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
