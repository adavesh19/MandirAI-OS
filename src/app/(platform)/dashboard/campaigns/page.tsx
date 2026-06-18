import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Target, CheckCircle2, Circle, Eye, Edit } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Campaigns | MandirAI OS',
}

export default async function CampaignsDashboardPage() {
  const { tenantId } = await requireRole(['temple_admin'])
  if (!tenantId) throw new Error('Unauthorized')

  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
    select: { slug: true }
  })
  const templeSlug = temple?.slug || ''
  const campaigns = await prisma.campaign.findMany({
    where: { templeId: tenantId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { donations: { where: { paymentStatus: 'COMPLETED' } } }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Crowdfunding Campaigns</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">Manage fundraising goals for your temple's projects.</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button className="bg-saffron-600 hover:bg-saffron-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => {
          const target = Number(campaign.targetAmount)
          const current = Number(campaign.currentAmount)
          const percentage = Math.min(Math.round((current / target) * 100), 100)

          return (
            <div key={campaign.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  {campaign.isActive ? (
                    <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-medium text-stone-500 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-full">
                      <Circle className="h-3.5 w-3.5 mr-1" /> Ended
                    </span>
                  )}
                </div>
                <div className="text-stone-400">
                  <Target className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-bold text-stone-900 dark:text-white text-lg mb-2 line-clamp-1">
                {campaign.title}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 line-clamp-2 flex-grow">
                {campaign.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-stone-900 dark:text-white">₹{current.toLocaleString()}</span>
                  <span className="text-stone-500 dark:text-stone-400">of ₹{target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-saffron-500 h-2 rounded-full transition-all" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>{percentage}% funded</span>
                  <span>{campaign._count.donations} donations</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
                <div className="text-xs text-stone-500">
                  {campaign.endDate ? `Ends ${format(new Date(campaign.endDate), 'MMM d, yyyy')}` : 'No end date'}
                </div>
                <div className="flex space-x-2">
                  <Link href={`/temple/${templeSlug}/campaigns/${campaign.id}`} target="_blank">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-saffron-600">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-saffron-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        {campaigns.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 border-dashed">
            <Target className="h-12 w-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">No campaigns yet</h3>
            <p className="text-stone-500 mb-6 max-w-md mx-auto">
              Create a crowdfunding campaign to raise funds for temple construction, festivals, or social initiatives.
            </p>
            <Link href="/dashboard/campaigns/new">
              <Button className="bg-saffron-600 hover:bg-saffron-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create First Campaign
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
