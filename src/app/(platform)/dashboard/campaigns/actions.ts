'use server'

import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCampaign(formData: FormData) {
  const { tenantId } = await requireRole(['temple_admin'])
  if (!tenantId) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const targetAmount = parseFloat(formData.get('targetAmount') as string)
  const endDateStr = formData.get('endDate') as string
  const isActive = formData.get('isActive') === 'on'

  const endDate = endDateStr ? new Date(endDateStr) : null

  await prisma.campaign.create({
    data: {
      templeId: tenantId,
      title,
      description,
      targetAmount,
      currentAmount: 0,
      endDate,
      isActive,
    }
  })

  revalidatePath('/dashboard/campaigns')
  redirect('/dashboard/campaigns')
}

export async function updateCampaign(campaignId: string, formData: FormData) {
  const { tenantId } = await requireRole(['temple_admin'])
  if (!tenantId) throw new Error('Unauthorized')

  // Verify ownership
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId, templeId: tenantId }
  })

  if (!campaign) throw new Error('Campaign not found')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const targetAmount = parseFloat(formData.get('targetAmount') as string)
  const endDateStr = formData.get('endDate') as string
  const isActive = formData.get('isActive') === 'on'

  const endDate = endDateStr ? new Date(endDateStr) : null

  await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      title,
      description,
      targetAmount,
      endDate,
      isActive,
    }
  })

  revalidatePath('/dashboard/campaigns')
  redirect('/dashboard/campaigns')
}
