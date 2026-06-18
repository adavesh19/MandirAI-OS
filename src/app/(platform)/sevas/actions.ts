'use server'

import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/dal'
import { revalidatePath } from 'next/cache'

export async function createSeva(formData: {
  name: string
  description: string
  price: number
  durationMinutes: number
}) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])

    if (!tenantId) {
      throw new Error('Tenant ID missing')
    }

    const seva = await prisma.seva.create({
      data: {
        templeId: tenantId,
        name: formData.name as any,
        description: formData.description as any,
        price: formData.price,
        durationMinutes: formData.durationMinutes,
        isActive: true,
      },
    })

    revalidatePath('/sevas')
    revalidatePath(`/temple/[slug]`, 'page')
    
    return { success: true, sevaId: seva.id }
  } catch (error: any) {
    console.error('Error creating seva:', error)
    return { success: false, error: error.message || 'Failed to create seva' }
  }
}

export async function toggleSevaStatus(sevaId: string, isActive: boolean) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])

    if (!tenantId) {
      throw new Error('Tenant ID missing')
    }

    await prisma.seva.update({
      where: {
        id: sevaId,
        templeId: tenantId, // Ensure they own this seva
      },
      data: {
        isActive,
      },
    })

    revalidatePath('/sevas')
    revalidatePath(`/temple/[slug]`, 'page')

    return { success: true }
  } catch (error: any) {
    console.error('Error toggling seva:', error)
    return { success: false, error: error.message || 'Failed to update seva' }
  }
}

export async function deleteSeva(sevaId: string) {
  try {
    const { tenantId } = await requireRole(['temple_admin'])

    if (!tenantId) {
      throw new Error('Tenant ID missing')
    }

    await prisma.seva.delete({
      where: {
        id: sevaId,
        templeId: tenantId, // Ensure they own this seva
      },
    })

    revalidatePath('/sevas')
    revalidatePath(`/temple/[slug]`, 'page')

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting seva:', error)
    return { success: false, error: error.message || 'Failed to delete seva' }
  }
}
