import * as React from 'react'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import InventoryClient from '@/components/dashboard/inventory-client'

export default async function InventoryPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) {
    redirect('/onboarding')
  }

  const items = await prisma.inventoryItem.findMany({
    where: { templeId: tenantId },
    orderBy: { createdAt: 'desc' }
  })

  // If empty, let's create some dummy inventory items for demonstration
  if (items.length === 0) {
    await prisma.inventoryItem.createMany({
      data: [
        { templeId: tenantId, itemName: 'Cow Ghee (A2)', category: 'PRASAD', currentStock: 15, unit: 'kg', reorderLevel: 20 },
        { templeId: tenantId, itemName: 'Rose Petals', category: 'EVENT', currentStock: 2, unit: 'kg', reorderLevel: 5 },
        { templeId: tenantId, itemName: 'Camphor', category: 'MAINTENANCE', currentStock: 10, unit: 'boxes', reorderLevel: 5 },
      ]
    })
    
    // Refresh items
    const newItems = await prisma.inventoryItem.findMany({
      where: { templeId: tenantId },
      orderBy: { createdAt: 'desc' }
    })
    return <InventoryClient initialItems={newItems} />
  }

  return <InventoryClient initialItems={items} />
}
