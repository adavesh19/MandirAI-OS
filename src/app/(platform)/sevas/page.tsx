import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import SevaForm from '@/components/sevas/seva-form'
import { formatCurrency } from '@/lib/utils'

export default async function SevasPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  if (!tenantId) return null

  const sevas = await prisma.seva.findMany({
    where: { templeId: tenantId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-stone-900 dark:text-white">Sevas & Offerings</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage the daily poojas, special rituals, and offerings devotees can book online.
        </p>
      </div>

      <SevaForm />

      <Card>
        <CardHeader>
          <CardTitle>Active Offerings</CardTitle>
          <CardDescription>These are displayed on your public website for booking.</CardDescription>
        </CardHeader>
        <CardContent>
          {sevas.length === 0 ? (
            <div className="text-center py-12 text-stone-500 border border-dashed rounded-lg">
              <span className="text-4xl mb-4 block">🙏</span>
              <p>No sevas configured yet.</p>
              <p className="text-sm mt-1">Add your first seva using the button above.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {sevas.map((seva) => (
                <div key={seva.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100">{seva.name as string}</h4>
                    <p className="text-sm text-stone-500 max-w-lg mt-1">{seva.description as string}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-semibold text-saffron-600 dark:text-saffron-500 text-lg">
                      {formatCurrency(Number(seva.price))}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${seva.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                      {seva.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
