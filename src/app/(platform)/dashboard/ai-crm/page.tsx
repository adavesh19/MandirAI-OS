import * as React from 'react'
import { requireRole } from '@/lib/dal'
import AiCrmClient from '@/components/dashboard/ai-crm-client'

export const metadata = {
  title: 'Autonomous AI CRM | MandirAI OS',
}

export default async function AiCrmPage() {
  await requireRole(['temple_admin', 'staff'])

  return <AiCrmClient />
}
