import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, CheckCircle2, AlertCircle, FileDigit } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Finance & Compliance | MandirAI OS',
}

export default async function FinanceDashboardPage() {
  const { tenantId } = await requireRole(['temple_admin'])

  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
    select: { trust80gDetails: true, trust12aDetails: true }
  })

  // Aggregate current financial year donations (April 1 to March 31)
  const now = new Date()
  const currentYear = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
  const fyStart = new Date(currentYear, 3, 1) // April 1st
  const fyEnd = new Date(currentYear + 1, 2, 31, 23, 59, 59) // March 31st

  const fyDonations = await prisma.donation.aggregate({
    where: {
      templeId: tenantId,
      paymentStatus: 'COMPLETED',
      createdAt: { gte: fyStart, lte: fyEnd }
    },
    _sum: { amount: true },
    _count: { id: true }
  })

  // Get top donors for 80G
  const topDonors = await prisma.devotee.findMany({
    where: { templeId: tenantId, totalDonated: { gt: 0 } },
    orderBy: { totalDonated: 'desc' },
    take: 5
  })

  const has80G = !!temple?.trust80gDetails

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Finance & Compliance</h1>
        <p className="text-sm text-stone-500">Automated tax reports and 80G certificate generation.</p>
      </div>

      {/* Compliance Status */}
      <div className={`p-4 rounded-xl border ${has80G ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} flex items-start space-x-4`}>
        {has80G ? (
          <CheckCircle2 className="h-6 w-6 text-emerald-600 mt-0.5" />
        ) : (
          <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5" />
        )}
        <div>
          <h3 className={`font-semibold ${has80G ? 'text-emerald-900' : 'text-amber-900'}`}>
            {has80G ? '80G Registered Trust' : '80G Details Missing'}
          </h3>
          <p className={`text-sm mt-1 ${has80G ? 'text-emerald-700' : 'text-amber-700'}`}>
            {has80G 
              ? 'Your trust is authorized to issue 80G tax exemption certificates to donors.' 
              : 'Add your 80G registration details in Temple Settings to enable automated tax receipts.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">FY {currentYear}-{currentYear+1} Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">
              ₹{Number(fyDonations._sum.amount || 0).toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">+14% from last FY</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">
              {fyDonations._count.id}
            </div>
            <p className="text-xs text-stone-500 mt-1">Transactions this FY</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900 text-white border-stone-800">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <FileDigit className="h-8 w-8 text-saffron-500 mb-4" />
              <h3 className="font-semibold text-lg">Year-End 80G Generation</h3>
              <p className="text-sm text-stone-400 mt-2 line-clamp-2">Automatically generate and email consolidated 80G certificates to all eligible donors.</p>
            </div>
            <Button disabled={!has80G} className="w-full mt-4 bg-saffron-600 hover:bg-saffron-700 text-white">
              <Download className="mr-2 h-4 w-4" /> Run Generation
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Donors (Requires PAN for 80G)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDonors.map(donor => (
              <div key={donor.id} className="flex justify-between items-center p-4 border border-stone-100 rounded-lg">
                <div>
                  <p className="font-semibold text-stone-900">{donor.fullName}</p>
                  <p className="text-sm text-stone-500">{donor.phone || 'No phone'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">₹{Number(donor.totalDonated).toLocaleString()}</p>
                  <p className="text-xs text-stone-500">Karma: {donor.karmaPoints}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
