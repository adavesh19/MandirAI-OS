import * as React from 'react'
import { requireRole } from '@/lib/dal'
import FestivalCalendarClient from '@/components/dashboard/festival-calendar-client'

export const metadata = {
  title: 'Festival Intelligence | MandirAI OS',
}

export default async function FestivalsPage() {
  await requireRole(['temple_admin', 'staff'])
  return <FestivalCalendarClient />
}
