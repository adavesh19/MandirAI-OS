'use server'

import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/dal'
import { revalidatePath } from 'next/cache'

export async function updateTempleSettings(formData: {
  id: string
  name: string
  slug: string
  primaryDeity: string
  contactPhone: string
  contactEmail: string
  websiteDomain: string
  upiId: string
  trustRegistrationNo: string
  isPublished: boolean
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
  }
  timings: {
    morning_open: string
    morning_close: string
    evening_open: string
    evening_close: string
  }
  bankDetails: {
    account_name: string
    account_number: string
    ifsc: string
    bank_name: string
    branch: string
  }
}) {
  const { tenantId } = await requireRole(['temple_admin'])
  if (!tenantId || tenantId !== formData.id) {
    return { success: false, error: 'Unauthorized workspace access.' }
  }

  try {
    await prisma.temple.update({
      where: { id: tenantId },
      data: {
        name: formData.name,
        primaryDeity: formData.primaryDeity,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        websiteDomain: formData.websiteDomain,
        upiId: formData.upiId,
        trustRegistrationNo: formData.trustRegistrationNo,
        isPublished: formData.isPublished,
        address: formData.address,
        timings: formData.timings,
        bankDetails: formData.bankDetails,
      },
    })

    revalidatePath(`/temple/${formData.slug}`)
    revalidatePath('/settings')
    return { success: true }
  } catch (error: any) {
    console.error('Failed to update temple settings:', error)
    return { success: false, error: error?.message || 'Failed to save settings.' }
  }
}
