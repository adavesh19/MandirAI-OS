import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'
import { Award, Star, History, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'My Spiritual Profile | MandirAI OS',
}

export default async function DevoteeProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  
  // Verify auth and find devotee record
  const user = await getAuthUser()
  if (!user || !user.phone) {
    // Basic redirect for unauthenticated users (in real app, use middleware)
    return <div className="p-8 text-center text-stone-500">Please log in with your phone number to view your profile.</div>
  }

  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug },
  })

  if (!temple) notFound()

  let devotee = await prisma.devotee.findFirst({
    where: { templeId: temple.id, phone: user.phone },
    include: {
      donations: {
        where: { paymentStatus: 'COMPLETED' },
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  })

  if (!devotee) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-4">My Profile</h1>
        <p className="text-stone-500">You haven't interacted with {temple.name} yet. Make an offering or book a Seva to start earning Karma Points!</p>
      </div>
    )
  }

  const badges = [
    { name: 'Maha-Daanavira', threshold: 5000, current: devotee.karmaPoints },
    { name: 'Nitya Sevak', threshold: 1000, current: devotee.karmaPoints },
    { name: 'Punya Atma', threshold: 100, current: devotee.karmaPoints },
    { name: 'Aarambh', threshold: 1, current: devotee.karmaPoints },
  ]

  const highestBadge = badges.find(b => b.current >= b.threshold)?.name || 'Beginner'
  const nextBadge = [...badges].reverse().find(b => b.threshold > b.current)
  const progressToNext = nextBadge 
    ? Math.min(Math.round((devotee.karmaPoints / nextBadge.threshold) * 100), 100)
    : 100

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Spiritual Profile</h1>
        <p className="text-stone-500">Track your journey with {temple.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Karma Points Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Star className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h2 className="text-saffron-100 font-semibold uppercase tracking-wider mb-2">Total Karma Points</h2>
            <div className="text-6xl font-bold mb-6">{devotee.karmaPoints.toLocaleString()}</div>
            
            {nextBadge ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-saffron-100">
                  <span>Current Tier: {highestBadge}</span>
                  <span>{nextBadge.threshold - devotee.karmaPoints} to {nextBadge.name}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progressToNext}%` }} />
                </div>
              </div>
            ) : (
              <div className="text-saffron-100 font-medium">You have reached the highest tier! 🙏</div>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Total Offered</p>
              <p className="text-2xl font-bold text-stone-900">₹{Number(devotee.totalDonated).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Current Badge</p>
              <p className="text-xl font-bold text-stone-900">{highestBadge}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center mb-6">
          <History className="w-6 h-6 text-stone-400 mr-2" />
          <h2 className="text-xl font-bold text-stone-900">Recent Contributions</h2>
        </div>
        
        {devotee.donations.length > 0 ? (
          <div className="space-y-4">
            {devotee.donations.map(donation => (
              <div key={donation.id} className="flex justify-between items-center py-4 border-b border-stone-100 last:border-0">
                <div>
                  <p className="font-semibold text-stone-900">
                    {donation.campaignId ? 'Campaign Contribution' : 'Temple Offering'}
                  </p>
                  <p className="text-sm text-stone-500">{format(new Date(donation.createdAt), 'MMMM d, yyyy')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">₹{Number(donation.amount).toLocaleString()}</p>
                  <p className="text-xs text-emerald-600 font-semibold">+{Math.floor(Number(donation.amount)/100)} points</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-stone-500 text-center py-8">No recent contributions found.</p>
        )}
      </div>
    </div>
  )
}
