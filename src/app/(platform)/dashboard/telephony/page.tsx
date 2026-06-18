import * as React from 'react'
import { requireRole } from '@/lib/dal'
import TelephonyClient from '@/components/dashboard/telephony-client'

export const metadata = {
  title: 'Telephony Command Center | MandirAI OS',
}

export default async function TelephonyPage() {
  await requireRole(['temple_admin', 'staff'])

  return <TelephonyClient />
}
