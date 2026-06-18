import * as React from 'react'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import AIBuilderClient from './ai-builder-client'

export default async function AIBuilderPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) {
    redirect('/onboarding')
  }

  // Fetch temple info
  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
  })

  if (!temple || !temple.onboardingCompleted) {
    redirect('/onboarding')
  }

  return (
    <AIBuilderClient 
      templeSlug={temple.slug} 
      templeName={temple.name} 
    />
  )
}
