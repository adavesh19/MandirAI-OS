'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Heart, CreditCard, Activity, Landmark, AlertCircle } from 'lucide-react'

// Dynamically import charts with SSR disabled to bypass client-only API exceptions in Recharts
const AnalyticsCharts = dynamic(() => import('./analytics-charts'), { ssr: false })

interface DonationRecord {
  amount: number
  createdAt: string
  paymentMethod: string
  categoryName: string
}

interface AnalyticsClientProps {
  donations: DonationRecord[]
}

export default function AnalyticsClient({ donations }: AnalyticsClientProps) {
  const isDemoData = donations.length === 0

  // 1. Generate Mock Data if no records exist
  const getMockData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const trendData = months.map((m, idx) => {
      const baseValues = [45000, 52000, 48000, 65000, 78000, 92000]
      return { name: m, amount: baseValues[idx] }
    })

    const categoryData = [
      { name: 'Annadanam (Food)', value: 142000, color: '#F97316' },
      { name: 'General Pooja', value: 106000, color: '#D97706' },
      { name: 'Goshala Care', value: 53000, color: '#7C2D12' },
      { name: 'Renovation Fund', value: 35000, color: '#10B981' },
    ]

    const methodData = [
      { name: 'UPI', amount: 215000 },
      { name: 'CARD', amount: 68000 },
      { name: 'NETBANKING', amount: 35000 },
      { name: 'CASH', amount: 18000 },
    ]

    return { trendData, categoryData, methodData, totalCollected: 336000, txCount: 142, highest: 25000 }
  }

  // 2. Aggregate Real Data
  const getAggregatedData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const trendMap = new Map<string, number>()
    const last6MonthsList: string[] = []

    // Establish last 6 months in chronological order
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthName = months[date.getMonth()]
      last6MonthsList.push(monthName)
      trendMap.set(monthName, 0)
    }

    let totalCollected = 0
    let highest = 0
    const categoryMap = new Map<string, number>()
    const methodMap = new Map<string, number>()

    donations.forEach((d) => {
      totalCollected += d.amount
      if (d.amount > highest) highest = d.amount

      // Trend
      const dDate = new Date(d.createdAt)
      const monthName = months[dDate.getMonth()]
      if (trendMap.has(monthName)) {
        trendMap.set(monthName, trendMap.get(monthName)! + d.amount)
      }

      // Categories
      categoryMap.set(d.categoryName, (categoryMap.get(d.categoryName) || 0) + d.amount)

      // Methods
      const methodKey = d.paymentMethod.toUpperCase()
      methodMap.set(methodKey, (methodMap.get(methodKey) || 0) + d.amount)
    })

    const trendData = last6MonthsList.map((m) => ({
      name: m,
      amount: trendMap.get(m) || 0,
    }))

    const colors = ['#F97316', '#D97706', '#7C2D12', '#10B981', '#3B82F6', '#8B5CF6']
    const categoryData = Array.from(categoryMap.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }))

    const methodData = Array.from(methodMap.entries()).map(([name, value]) => ({
      name,
      amount: value,
    }))

    return {
      trendData,
      categoryData,
      methodData,
      totalCollected,
      txCount: donations.length,
      highest,
    }
  }

  const { trendData, categoryData, methodData, totalCollected, txCount, highest } = isDemoData
    ? getMockData()
    : getAggregatedData()

  const averageDonation = txCount > 0 ? totalCollected / txCount : 0

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-stone-900">Analytics & Financial Trends</h1>
          <p className="text-sm text-stone-500">Analyze devotee contributions, category metrics, and channel statistics.</p>
        </div>
      </div>

      {/* Demo Banner */}
      {isDemoData && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center space-x-3 shadow-sm animate-fadeIn">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="text-xs sm:text-sm font-semibold">
            No transaction history found yet. Displaying simulated analytics for demonstration purposes. Use the public checkout flow to record live payments.
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Revenue */}
        <Card className="border-stone-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Contributions</span>
            <div className="h-9 w-9 rounded-lg bg-saffron-550/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-saffron-550" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-heading text-2xl font-black text-stone-900">
              ₹{totalCollected.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-stone-500">Cumulative online donations</p>
          </CardContent>
        </Card>

        {/* Card 2: Transactions */}
        <Card className="border-stone-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Transaction Count</span>
            <div className="h-9 w-9 rounded-lg bg-saffron-550/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-saffron-550" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-heading text-2xl font-black text-stone-900">{txCount.toLocaleString('en-IN')}</p>
            <p className="text-xs text-stone-500">Payments confirmed</p>
          </CardContent>
        </Card>

        {/* Card 3: Average Donation */}
        <Card className="border-stone-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Average Contribution</span>
            <div className="h-9 w-9 rounded-lg bg-saffron-550/10 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-saffron-550" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-heading text-2xl font-black text-stone-900">
              ₹{averageDonation.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-stone-500">Per devotee average</p>
          </CardContent>
        </Card>

        {/* Card 4: Max Donation */}
        <Card className="border-stone-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Highest Single Donation</span>
            <div className="h-9 w-9 rounded-lg bg-saffron-550/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-saffron-550" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-heading text-2xl font-black text-stone-900">
              ₹{highest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-stone-500">Peak contribution recorded</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts Component */}
      <AnalyticsCharts trendData={trendData} categoryData={categoryData} methodData={methodData} />
    </div>
  )
}
