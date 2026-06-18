import * as React from 'react'

export const metadata = {
  title: 'Digital Hundi | Temple Kiosk',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Digital Hundi'
  }
}

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black text-white selection:bg-saffron-500/30 touch-none">
      {/* 
        The kiosk layout is locked down. 
        It uses fixed inset-0 to prevent bounce/scroll on iPads.
        touch-none prevents swipe-to-go-back gestures.
      */}
      {children}
    </div>
  )
}
