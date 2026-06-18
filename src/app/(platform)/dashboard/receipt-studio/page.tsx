import * as React from 'react'
import { requireRole } from '@/lib/dal'
import ReceiptStudioClient from '@/components/dashboard/receipt-studio-client'

export const metadata = {
  title: 'Receipt Studio | MandirAI OS',
}

export default async function ReceiptStudioPage() {
  await requireRole(['temple_admin', 'staff'])

  return <ReceiptStudioClient />
}
