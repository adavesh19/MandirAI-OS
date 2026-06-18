import * as React from 'react'
import { requireRole } from '@/lib/dal'
import LiveStudioClient from '@/components/dashboard/live-studio-client'

export const metadata = {
  title: 'Live Darshan Studio | MandirAI OS',
}

export default async function LiveStudioPage() {
  await requireRole(['temple_admin', 'staff'])
  return <LiveStudioClient />
}
