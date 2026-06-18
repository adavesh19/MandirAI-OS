import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Target, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Campaigns & Crowdfunding',
}

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      campaigns: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!temple) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Support Our Missions
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
              Join us in our ongoing projects and help us preserve our heritage and serve the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temple.campaigns.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <Target className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">No active campaigns</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  There are no active fundraising campaigns at the moment.
                </p>
              </div>
            ) : (
              temple.campaigns.map((campaign) => {
                const target = Number(campaign.targetAmount)
                const current = Number(campaign.currentAmount)
                const percentage = Math.min(Math.round((current / target) * 100), 100)

                return (
                  <Link 
                    key={campaign.id} 
                    href={`/temple/${temple.slug}/campaigns/${campaign.id}`}
                    className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center rounded-full bg-saffron-50 dark:bg-saffron-900/30 px-2.5 py-0.5 text-xs font-semibold text-saffron-600 dark:text-saffron-400">
                          Active Campaign
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-6">
                        {campaign.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex justify-between text-sm font-medium mb-2">
                          <span className="text-slate-900 dark:text-white">₹{current.toLocaleString('en-IN')}</span>
                          <span className="text-slate-500 dark:text-slate-400">of ₹{target.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mb-2 overflow-hidden">
                          <div 
                            className="bg-saffron-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right text-slate-500 dark:text-slate-400 font-medium">
                          {percentage}% Funded
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center text-saffron-600 dark:text-saffron-400 font-medium text-sm">
                        Contribute Now
                        <TrendingUp className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
