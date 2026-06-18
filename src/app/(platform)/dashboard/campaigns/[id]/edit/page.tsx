import { requireRole } from '@/lib/dal'
import { updateCampaign } from '../../actions'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Campaign | MandirAI OS',
}

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { tenantId } = await requireRole(['temple_admin'])
  const resolvedParams = await params

  const campaign = await prisma.campaign.findUnique({
    where: { id: resolvedParams.id, templeId: tenantId }
  })

  if (!campaign) notFound()

  // Bind the campaign ID to the server action
  const updateCampaignWithId = updateCampaign.bind(null, campaign.id)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Edit Campaign</h1>
          <p className="text-sm text-stone-500">Update your crowdfunding initiative.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8">
        <form action={updateCampaignWithId} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input id="title" name="title" required defaultValue={campaign.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              required 
              rows={4} 
              defaultValue={campaign.description || ''}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (₹)</Label>
              <Input 
                id="targetAmount" 
                name="targetAmount" 
                type="number" 
                required 
                min="1" 
                defaultValue={Number(campaign.targetAmount)} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input 
                id="endDate" 
                name="endDate" 
                type="date" 
                defaultValue={campaign.endDate ? campaign.endDate.toISOString().split('T')[0] : ''} 
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="isActive" 
              name="isActive" 
              className="h-4 w-4 rounded border-stone-300 text-saffron-600 focus:ring-saffron-600" 
              defaultChecked={campaign.isActive}
            />
            <Label htmlFor="isActive" className="font-normal cursor-pointer">
              Active Campaign
            </Label>
          </div>

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex justify-end space-x-4">
            <Link href="/dashboard/campaigns">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-saffron-600 hover:bg-saffron-700 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
