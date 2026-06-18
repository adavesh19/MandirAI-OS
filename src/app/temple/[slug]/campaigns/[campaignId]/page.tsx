import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { ArrowLeft, Target, Users, TrendingUp, Calendar, Heart } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Campaign Details',
}

export default async function CampaignDetailsPage({
  params,
}: {
  params: Promise<{ slug: string; campaignId: string }>
}) {
  const resolvedParams = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug },
  })

  if (!temple) notFound()

  const campaign = await prisma.campaign.findUnique({
    where: { 
      id: resolvedParams.campaignId,
      templeId: temple.id
    },
    include: {
      donations: {
        where: { paymentStatus: 'COMPLETED' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { devotee: true }
      }
    }
  })

  if (!campaign) notFound()

  const target = Number(campaign.targetAmount)
  const current = Number(campaign.currentAmount)
  const percentage = Math.min(Math.round((current / target) * 100), 100)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/temple/${temple.slug}/campaigns`}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center space-x-2 mb-6">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  campaign.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {campaign.isActive ? 'Active Campaign' : 'Completed'}
                </span>
                {campaign.endDate && (
                  <span className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    Ends {format(new Date(campaign.endDate), 'MMM d, yyyy')}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                {campaign.title}
              </h1>

              <div className="prose prose-slate dark:prose-invert max-w-none mb-12 text-slate-600 dark:text-slate-300">
                <p className="whitespace-pre-wrap">{campaign.description}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 mb-8 border border-slate-100 dark:border-slate-800">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white">
                      ₹{current.toLocaleString('en-IN')}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 mt-1">
                      raised of ₹{target.toLocaleString('en-IN')} goal
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">
                      {percentage}%
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-8 overflow-hidden">
                  <div 
                    className="bg-saffron-500 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>

                {campaign.isActive && (
                  <Link
                    href={`/temple/${temple.slug}/donate?campaignId=${campaign.id}`}
                    className="w-full flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-saffron-600 hover:bg-saffron-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Contribute to this Campaign
                  </Link>
                )}
              </div>

              {campaign.donations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center mb-6">
                    <Users className="mr-2 h-5 w-5 text-slate-400" />
                    Recent Contributors
                  </h3>
                  <div className="space-y-4">
                    {campaign.donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center text-saffron-600 dark:text-saffron-400 font-bold">
                            {donation.isAnonymous ? 'A' : (donation.donorName?.[0] || donation.devotee?.fullName?.[0] || 'D')}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-slate-900 dark:text-white">
                              {donation.isAnonymous ? 'Anonymous Devotee' : (donation.donorName || donation.devotee?.fullName || 'Devotee')}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {format(new Date(donation.createdAt), 'MMM d, yyyy')}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          ₹{Number(donation.amount).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
