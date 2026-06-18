import * as React from 'react'
import { requireRole } from '@/lib/dal'
import QrScannerClient from '@/components/dashboard/qr-scanner-client'

export const metadata = {
  title: 'Fast-Track Scanner | MandirAI OS',
}

export default async function QrScannerPage() {
  await requireRole(['temple_admin', 'staff'])

  return (
    <div className="py-6 h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="w-full">
        <QrScannerClient />
      </div>
    </div>
  )
}
