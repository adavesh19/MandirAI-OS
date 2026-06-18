import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import TerminalClient from '@/components/dashboard/terminal-client'

export default async function TerminalPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  // Fetch temple info to display in terminal greeting
  const temple = await prisma.temple.findUnique({
    where: { id: tenantId! },
    select: { name: true, slug: true }
  })

  if (!temple) return null

  return (
    <TerminalClient 
      templeName={temple.name} 
      templeSlug={temple.slug} 
      templeId={tenantId!}
    />
  )
}
