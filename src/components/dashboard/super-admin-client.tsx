'use client'

import * as React from 'react'
import { Search, Building2, Users, Heart, AlertCircle, CheckCircle, ShieldAlert, Edit2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateTempleStatus, updateTemplePlan } from '@/app/(platform)/actions'
import { SubscriptionPlanType } from '@prisma/client'

interface TempleItem {
  id: string
  name: string
  slug: string
  primaryDeity: string | null
  templeType: string | null
  isActive: boolean
  subscriptionPlan: SubscriptionPlanType
  createdAt: Date
  _count: {
    devotees: number
    donations: number
  }
}

interface SuperAdminClientProps {
  temples: TempleItem[]
  stats: {
    totalTemples: number
    activeTemples: number
    totalDevotees: number
    totalDonations: number
  }
}

export default function SuperAdminClient({ temples: initialTemples, stats }: SuperAdminClientProps) {
  const [temples, setTemples] = React.useState<TempleItem[]>(initialTemples)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'suspended'>('all')
  const [planFilter, setPlanFilter] = React.useState<'all' | 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'>('all')
  const [updatingId, setUpdatingId] = React.useState<string | null>(null)
  
  // Search and filter logic
  const filteredTemples = temples.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.primaryDeity && t.primaryDeity.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && t.isActive) || 
                          (statusFilter === 'suspended' && !t.isActive)
                          
    const matchesPlan = planFilter === 'all' || t.subscriptionPlan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleToggleStatus = async (templeId: string, currentStatus: boolean) => {
    if (confirm(`Are you sure you want to ${currentStatus ? 'suspend' : 'activate'} this temple?`)) {
      setUpdatingId(templeId)
      try {
        const result = await updateTempleStatus(templeId, !currentStatus)
        if (result.success) {
          setTemples((prev) =>
            prev.map((t) => (t.id === templeId ? { ...t, isActive: !currentStatus } : t))
          )
        } else {
          alert(result.error || 'Failed to update status.')
        }
      } catch (err) {
        console.error(err)
        alert('An error occurred.')
      } finally {
        setUpdatingId(null)
      }
    }
  }

  const handleChangePlan = async (templeId: string, newPlan: SubscriptionPlanType) => {
    setUpdatingId(templeId)
    try {
      const result = await updateTemplePlan(templeId, newPlan)
      if (result.success) {
        setTemples((prev) =>
          prev.map((t) => (t.id === templeId ? { ...t, subscriptionPlan: newPlan } : t))
        )
        alert('Subscription plan updated successfully.')
      } else {
        alert(result.error || 'Failed to update plan.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred.')
    } finally {
      setUpdatingId(null)
    }
  }

  const metricCards = [
    {
      title: 'Total Temples Onboarded',
      value: stats.totalTemples.toLocaleString('en-IN'),
      desc: 'Registered tenants on platform',
      icon: <Building2 className="h-5 w-5 text-saffron-550" />,
    },
    {
      title: 'Active Workspaces',
      value: stats.activeTemples.toLocaleString('en-IN'),
      desc: 'Active running temples',
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    },
    {
      title: 'Devotees Directory',
      value: stats.totalDevotees.toLocaleString('en-IN'),
      desc: 'Registered devotees total',
      icon: <Users className="h-5 w-5 text-indigo-500" />,
    },
    {
      title: 'Aggregate Donations Volume',
      value: `₹${stats.totalDonations.toLocaleString('en-IN')}`,
      desc: 'Total payment volume processed',
      icon: <Heart className="h-5 w-5 text-rose-500" />,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Platform statistics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, idx) => (
          <Card key={idx} className="border-stone-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{card.title}</span>
              <div className="h-9 w-9 rounded-lg bg-stone-50 border border-stone-200/60 flex items-center justify-center">
                {card.icon}
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="font-heading text-2xl font-black text-stone-900">{card.value}</p>
              <p className="text-xs text-stone-500">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Directory Section */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-bold text-stone-900">Temple Workspaces Directory</CardTitle>
          <CardDescription>Search, review, suspend, or update subscription tiers for all temple tenants.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-80">
              <Input
                placeholder="Search by name or deity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-stone-400" />}
                className="h-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 h-10 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-saffron-550"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>

              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value as any)}
                className="px-3 h-10 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-saffron-550"
              >
                <option value="all">All Plans</option>
                <option value="FREE">Free Tier</option>
                <option value="STARTER">Starter</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-stone-100 rounded-xl">
            <table className="min-w-full divide-y divide-stone-100 text-left text-sm">
              <thead className="bg-stone-50 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Temple Name</th>
                  <th className="px-6 py-4">Primary Deity</th>
                  <th className="px-6 py-4">Stats</th>
                  <th className="px-6 py-4">Subscription Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                {filteredTemples.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-stone-400 italic">
                      No temples match the search filters.
                    </td>
                  </tr>
                ) : (
                  filteredTemples.map((temple) => (
                    <tr key={temple.id} className="hover:bg-stone-50/55 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-900">{temple.name}</span>
                          <span className="text-xs text-stone-500">Slug: /temple/{temple.slug}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-stone-700 font-medium">{temple.primaryDeity || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4 text-xs space-y-1 text-stone-500">
                        <div>Devotees: <span className="font-bold text-stone-800">{temple._count.devotees}</span></div>
                        <div>Donations: <span className="font-bold text-stone-800">{temple._count.donations}</span></div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={temple.subscriptionPlan}
                          disabled={updatingId === temple.id}
                          onChange={(e) => handleChangePlan(temple.id, e.target.value as SubscriptionPlanType)}
                          className="px-2.5 py-1 border border-stone-200 rounded-md text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-saffron-550"
                        >
                          <option value="FREE">FREE</option>
                          <option value="STARTER">STARTER</option>
                          <option value="PROFESSIONAL">PROFESSIONAL</option>
                          <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold leading-5 ${
                            temple.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {temple.isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant={temple.isActive ? 'destructive' : 'outline'}
                          disabled={updatingId === temple.id}
                          className="h-8 text-xs font-bold"
                          onClick={() => handleToggleStatus(temple.id, temple.isActive)}
                        >
                          {temple.isActive ? 'Suspend' : 'Activate'}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
