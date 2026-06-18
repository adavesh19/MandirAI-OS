import * as React from 'react'
import Link from 'next/link'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Users, Calendar, Globe, ArrowRight, Settings } from 'lucide-react'

export default async function DashboardPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  // Fetch temple info
  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
  })

  if (!temple) {
    return null
  }

  // Calculate the start of today
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  // Fetch live stats from the database
  const todayDonations = await prisma.donation.aggregate({
    where: {
      templeId: tenantId,
      paymentStatus: 'COMPLETED',
      createdAt: {
        gte: startOfToday,
      },
    },
    _sum: {
      amount: true,
    },
  })

  const totalDevotees = await prisma.devotee.count({
    where: {
      templeId: tenantId,
    },
  })

  const activeSevas = await prisma.seva.count({
    where: {
      templeId: tenantId,
      isActive: true,
    },
  })

  const todaySum = Number(todayDonations._sum.amount || 0)

  const stats = [
    {
      label: 'Today Donations',
      val: `₹${todaySum.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      desc: todaySum > 0 ? 'Received online today' : 'No transaction history today',
      icon: <Heart className="h-5 w-5 text-saffron-550" />,
    },
    {
      label: 'Total Devotees CRM',
      val: totalDevotees.toLocaleString('en-IN'),
      desc: 'Devotee accounts managed',
      icon: <Users className="h-5 w-5 text-saffron-550" />,
    },
    {
      label: 'Active Sevas & Poojas',
      val: activeSevas.toString(),
      desc: 'Offerings listed online',
      icon: <Calendar className="h-5 w-5 text-saffron-550" />,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-stone-200/50 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-stone-900">
            Welcome, Admin of {temple.name}
          </h1>
          <p className="text-sm text-stone-500">Your multi-tenant AI operating workspace is fully initialized.</p>
        </div>
        <Link href={`/temple/${temple.slug}`} target="_blank" rel="noopener noreferrer">
          <Button className="gradient-primary text-white" leftIcon={<Globe className="h-4 w-4" />}>
            View Public Site
          </Button>
        </Link>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, idx) => (
          <Card key={idx} className="border-stone-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{s.label}</span>
              <div className="h-9 w-9 rounded-lg bg-saffron-550/10 flex items-center justify-center">
                {s.icon}
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-heading text-2xl font-black text-stone-900">{s.val}</p>
              <p className="text-xs text-stone-500">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Workspace Card */}
        <Card className="border-stone-200 bg-white">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-bold text-stone-900">Quick Configuration Actions</CardTitle>
            <CardDescription>Customize pages, edit darshan timings, or enter banking coordinates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/settings" className="block">
              <Button variant="outline" className="w-full justify-between" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <div className="flex items-center space-x-2 text-stone-750">
                  <Settings className="h-4 w-4 text-saffron-550" />
                  <span>Modify Website Timings & Settings</span>
                </div>
              </Button>
            </Link>
            <Link href={`/temple/${temple.slug}/about`} className="block">
              <Button variant="outline" className="w-full justify-between" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <div className="flex items-center space-x-2 text-stone-750">
                  <Globe className="h-4 w-4 text-saffron-550" />
                  <span>Verify AI Generated About Page</span>
                </div>
              </Button>
            </Link>
            <Link href={`/temple/${temple.slug}/history`} className="block">
              <Button variant="outline" className="w-full justify-between" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <div className="flex items-center space-x-2 text-stone-750">
                  <Globe className="h-4 w-4 text-saffron-550" />
                  <span>Verify AI Generated History Page</span>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>

      {/* Phase Summary */}
      <Card className="border-stone-200 bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-bold text-stone-900">Current Sprint Milestone</CardTitle>
          <CardDescription>Onboarding & Multilingual Website Engine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-stone-600">
          <p>
            Congratulations! Your temple website has been generated automatically in <strong>5 languages</strong> (English, Hindi, Kannada, Tamil, and Telugu) using <strong>Google Gemini AI</strong>.
          </p>
          <p>
            In the upcoming sprints, we will activate the <strong>Razorpay payment integration</strong> to accept donations and sevas, and configure the <strong>Devotee CRM</strong> to support SMS and WhatsApp broadcasts.
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
