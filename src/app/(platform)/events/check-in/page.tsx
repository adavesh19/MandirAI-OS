import { requireRole } from '@/lib/dal'
import QRScannerClient from '@/components/dashboard/qr-scanner-client'

export default async function CheckInPage() {
  await requireRole(['temple_admin', 'staff'])

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm text-center">
        <h1 className="font-heading text-2xl font-bold text-stone-900">QR Code Check-in</h1>
        <p className="text-sm text-stone-500 mt-1">Manage fast-track entries for devotees</p>
      </div>
      
      <div className="mt-8">
        <QRScannerClient />
      </div>
    </div>
  )
}
