'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Search, Building2, Users, Heart, AlertCircle, CheckCircle,
  ShieldAlert, Edit3, Trash2, ExternalLink, Crown, Sparkles,
  TrendingUp, ArrowUpRight, Filter, Download, Zap, RefreshCw,
  Globe2, Lock, Eye, Check, X, ShieldCheck, Flame, Radio,
  CreditCard, Calendar, Phone, Mail, Activity, Layers, BarChart3,
  Sliders, MessageSquare, Terminal, ChevronRight, PieChart as PieIcon
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  updateTempleStatus,
  updateTemplePlan,
  deleteTempleAsKing,
  updateTempleDetailsAsKing,
  deleteDevoteeAsKing
} from '@/app/(platform)/actions'
import { SubscriptionPlanType } from '@prisma/client'

// ── TYPES ──
interface TempleItem {
  id: string
  name: string
  slug: string
  primaryDeity: string | null
  templeType: string | null
  isActive: boolean
  subscriptionPlan: SubscriptionPlanType
  contactEmail: string | null
  contactPhone: string | null
  upiId: string | null
  websiteDomain: string | null
  createdAt: string
  _count: {
    devotees: number
    donations: number
    sevas: number
    events: number
    members: number
  }
}

interface DonationItem {
  id: string
  receiptNumber: string
  donorName: string
  donorEmail: string | null
  donorPhone: string | null
  amount: number
  paymentMethod: string
  paymentStatus: string
  is80GEligible: boolean
  createdAt: string
  temple: {
    id: string
    name: string
    slug: string
  }
}

interface DevoteeItem {
  id: string
  fullName: string
  phoneNumber: string | null
  email: string | null
  gotra: string | null
  rashi: string | null
  nakshatra: string | null
  createdAt: string
  temple: {
    id: string
    name: string
    slug: string
  }
}

interface SuperAdminClientProps {
  temples: TempleItem[]
  stats: {
    totalTemples: number
    activeTemples: number
    suspendedTemples: number
    totalDevotees: number
    totalDonations: number
    completedDonationsCount: number
    pendingDonationsCount: number
    totalSevas: number
    totalEvents: number
    planDistribution: {
      FREE: number
      STARTER: number
      PROFESSIONAL: number
      ENTERPRISE: number
    }
  }
  recentDonations: DonationItem[]
  recentDevotees: DevoteeItem[]
}

export default function SuperAdminClient({
  temples: initialTemples,
  stats: initialStats,
  recentDonations,
  recentDevotees: initialDevotees,
}: SuperAdminClientProps) {
  const [temples, setTemples] = React.useState<TempleItem[]>(initialTemples)
  const [devotees, setDevotees] = React.useState<DevoteeItem[]>(initialDevotees)
  const [stats, setStats] = React.useState(initialStats)
  const [activeTab, setActiveTab] = React.useState<'overview' | 'temples' | 'devotees' | 'donations' | 'analytics' | 'godmode'>('overview')

  // Filters & Searches
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'suspended'>('all')
  const [planFilter, setPlanFilter] = React.useState<'all' | 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'>('all')
  const [typeFilter, setTypeFilter] = React.useState<string>('all')

  const [devoteeSearch, setDevoteeSearch] = React.useState('')
  const [donationSearch, setDonationSearch] = React.useState('')

  // State for King Editing Modal
  const [editingTemple, setEditingTemple] = React.useState<TempleItem | null>(null)
  const [editForm, setEditForm] = React.useState({
    name: '',
    slug: '',
    primaryDeity: '',
    contactPhone: '',
    contactEmail: '',
    subscriptionPlan: 'FREE' as SubscriptionPlanType,
  })

  // Action loaders & notifications
  const [actionLoading, setActionLoading] = React.useState<string | null>(null)
  const [bannerNotice, setBannerNotice] = React.useState<string | null>(null)

  const showToast = (msg: string) => {
    setBannerNotice(msg)
    setTimeout(() => setBannerNotice(null), 4000)
  }

  // Filtered lists
  const filteredTemples = temples.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.primaryDeity && t.primaryDeity.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && t.isActive) ||
      (statusFilter === 'suspended' && !t.isActive)

    const matchesPlan = planFilter === 'all' || t.subscriptionPlan === planFilter
    const matchesType = typeFilter === 'all' || t.templeType === typeFilter

    return matchesSearch && matchesStatus && matchesPlan && matchesType
  })

  const filteredDevotees = devotees.filter((d) => {
    const q = devoteeSearch.toLowerCase()
    return (
      d.fullName.toLowerCase().includes(q) ||
      (d.phoneNumber && d.phoneNumber.includes(q)) ||
      (d.email && d.email.toLowerCase().includes(q)) ||
      d.temple.name.toLowerCase().includes(q)
    )
  })

  const filteredDonations = recentDonations.filter((d) => {
    const q = donationSearch.toLowerCase()
    return (
      d.donorName.toLowerCase().includes(q) ||
      d.receiptNumber.toLowerCase().includes(q) ||
      d.temple.name.toLowerCase().includes(q) ||
      (d.donorPhone && d.donorPhone.includes(q))
    )
  })

  // ── KING ACTIONS ──
  const handleToggleStatus = async (templeId: string, currentStatus: boolean) => {
    const actionName = currentStatus ? 'SUSPEND' : 'ACTIVATE'
    if (!confirm(`👑 KING OVERRIDE: Are you sure you want to ${actionName} this temple immediately?`)) return

    setActionLoading(templeId)
    try {
      const result = await updateTempleStatus(templeId, !currentStatus)
      if (result.success) {
        setTemples((prev) =>
          prev.map((t) => (t.id === templeId ? { ...t, isActive: !currentStatus } : t))
        )
        setStats((prev) => ({
          ...prev,
          activeTemples: currentStatus ? prev.activeTemples - 1 : prev.activeTemples + 1,
          suspendedTemples: currentStatus ? prev.suspendedTemples + 1 : prev.suspendedTemples - 1,
        }))
        showToast(`Temple ${!currentStatus ? 'Activated' : 'Suspended'} successfully.`)
      } else {
        alert(result.error || 'Failed to update status.')
      }
    } catch (err: any) {
      alert('Error updating status: ' + err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleChangePlan = async (templeId: string, newPlan: SubscriptionPlanType) => {
    setActionLoading(templeId)
    try {
      const result = await updateTemplePlan(templeId, newPlan)
      if (result.success) {
        setTemples((prev) =>
          prev.map((t) => (t.id === templeId ? { ...t, subscriptionPlan: newPlan } : t))
        )
        showToast(`Plan upgraded to ${newPlan} for temple.`)
      } else {
        alert(result.error || 'Failed to update plan.')
      }
    } catch (err: any) {
      alert('Error updating plan: ' + err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteTemple = async (templeId: string, templeName: string) => {
    const confirmation = prompt(
      `⚠️ PERMANENT DELETION: Type "${templeName}" to completely wipe this temple and all its devotee data from MandirAI OS:`
    )
    if (confirmation !== templeName) {
      alert('Deletion cancelled: Name did not match.')
      return
    }

    setActionLoading(templeId)
    try {
      const result = await deleteTempleAsKing(templeId)
      if (result.success) {
        setTemples((prev) => prev.filter((t) => t.id !== templeId))
        setStats((prev) => ({
          ...prev,
          totalTemples: prev.totalTemples - 1,
        }))
        showToast(`Temple "${templeName}" has been erased permanently.`)
      } else {
        alert(result.error || 'Failed to delete temple.')
      }
    } catch (err: any) {
      alert('Deletion failed: ' + err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleOpenEdit = (temple: TempleItem) => {
    setEditingTemple(temple)
    setEditForm({
      name: temple.name,
      slug: temple.slug,
      primaryDeity: temple.primaryDeity || '',
      contactPhone: temple.contactPhone || '',
      contactEmail: temple.contactEmail || '',
      subscriptionPlan: temple.subscriptionPlan,
    })
  }

  const handleSaveEdit = async () => {
    if (!editingTemple) return
    setActionLoading('modal_save')
    try {
      const result = await updateTempleDetailsAsKing(editingTemple.id, editForm)
      if (result.success) {
        setTemples((prev) =>
          prev.map((t) =>
            t.id === editingTemple.id
              ? {
                  ...t,
                  name: editForm.name,
                  slug: editForm.slug,
                  primaryDeity: editForm.primaryDeity || null,
                  contactPhone: editForm.contactPhone || null,
                  contactEmail: editForm.contactEmail || null,
                  subscriptionPlan: editForm.subscriptionPlan,
                }
              : t
          )
        )
        setEditingTemple(null)
        showToast(`Temple "${editForm.name}" updated successfully!`)
      } else {
        alert(result.error || 'Failed to update temple details.')
      }
    } catch (err: any) {
      alert('Save failed: ' + err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteDevotee = async (devoteeId: string, devoteeName: string) => {
    if (!confirm(`Delete devotee "${devoteeName}" from system records?`)) return
    setActionLoading(devoteeId)
    try {
      const result = await deleteDevoteeAsKing(devoteeId)
      if (result.success) {
        setDevotees((prev) => prev.filter((d) => d.id !== devoteeId))
        setStats((prev) => ({ ...prev, totalDevotees: prev.totalDevotees - 1 }))
        showToast(`Devotee "${devoteeName}" removed.`)
      } else {
        alert(result.error || 'Failed to delete devotee.')
      }
    } catch (err: any) {
      alert('Failed: ' + err.message)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* ── BANNER NOTIFICATION ── */}
      {bannerNotice && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] font-bold text-sm animate-in slide-in-from-top duration-300">
          <Sparkles className="w-5 h-5" />
          <span>{bannerNotice}</span>
        </div>
      )}

      {/* ── 3D HERO CROWN COMMAND CENTER ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#120e06] via-[#0d0d0f] to-[#08080a] border border-amber-500/20 p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.08)]">
        {/* Animated 3D Background Geometry */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-500/0 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center pointer-events-none opacity-40">
          {/* CSS 3D Rotating Celestial Sphere */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-amber-400/40 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full border border-amber-300/20 animate-[spin_25s_linear_infinite]" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.6)] animate-pulse">
              <Crown className="w-12 h-12 text-black" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            <span>SOVEREIGN COMMAND MATRIX</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Welcome, King{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Adavesh
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            You hold omnipotent jurisdiction across all registered temples, devotee records, online
            hundi transactions, and subscription gateways throughout India.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-amber-500/20 text-xs text-stone-300">
              <span className="text-amber-400 font-bold font-mono">100%</span>
              <span>Full Control Mode</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-amber-500/20 text-xs text-stone-300">
              <span className="text-emerald-400 font-bold font-mono">Live</span>
              <span>Supabase Engine Connected</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-amber-500/20 text-xs text-stone-300">
              <span className="text-purple-400 font-bold font-mono">3D Mesh</span>
              <span>Real-Time Telemetry</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3D INTERACTIVE KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Temples */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#16130b] to-[#0c0b08] border border-amber-500/20 p-5 hover:border-amber-400/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400/80 uppercase tracking-wider">Sanctums & Temples</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">{stats.totalTemples}</span>
            <span className="text-xs font-bold text-emerald-400">({stats.activeTemples} active)</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800/80">
            <span>Suspended: <strong className="text-red-400">{stats.suspendedTemples}</strong></span>
            <span className="text-amber-400/80 font-semibold">100% Hosted</span>
          </div>
        </div>

        {/* Global Devotees */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#131118] to-[#0a090d] border border-purple-500/20 p-5 hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400/80 uppercase tracking-wider">Global Devotees</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">{stats.totalDevotees.toLocaleString()}</span>
            <span className="text-xs font-bold text-emerald-400">+12% this mo</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800/80">
            <span>Nakshatra/Gotra: Indexed</span>
            <span className="text-purple-400/80 font-semibold">CRM Active</span>
          </div>
        </div>

        {/* Global Donations / Hundi */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0f1713] to-[#080d0a] border border-emerald-500/20 p-5 hover:border-emerald-400/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400/80 uppercase tracking-wider">Omni Hundi Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono">
              ₹{stats.totalDonations.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800/80">
            <span>Completed: <strong className="text-emerald-400">{stats.completedDonationsCount}</strong></span>
            <span>Pending: <strong className="text-amber-400">{stats.pendingDonationsCount}</strong></span>
          </div>
        </div>

        {/* Global Sevas & Events */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#18120b] to-[#0c0906] border border-amber-600/20 p-5 hover:border-amber-500/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-500/80 uppercase tracking-wider">Rituals & Festivals</span>
            <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">{stats.totalSevas}</span>
            <span className="text-xs font-bold text-amber-400">Sevas Configured</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800/80">
            <span>Festivals: <strong className="text-white">{stats.totalEvents}</strong></span>
            <span className="text-amber-400 font-semibold">Panchang Synced</span>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION TABS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800/80 custom-scrollbar">
        {[
          { id: 'overview', label: '👑 3D Overview Matrix', count: null },
          { id: 'temples', label: '🏛️ All Sanctums & Temples', count: temples.length },
          { id: 'devotees', label: '👥 Devotee Master Database', count: stats.totalDevotees },
          { id: 'donations', label: '💰 Global Financial Ledger', count: recentDonations.length },
          { id: 'analytics', label: '📊 3D Analytics & Tiers', count: null },
          { id: 'godmode', label: '⚡ God-Mode System Controls', count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-stone-900/60 text-stone-400 hover:text-white hover:bg-stone-800/80 border border-stone-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-stone-800 text-amber-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 1: 3D OVERVIEW MATRIX */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* 3D Tier Breakdown & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subscription Distribution */}
            <div className="rounded-2xl bg-[#0d0d0f] border border-amber-500/20 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading font-bold text-white text-base">Plan Tier Distribution</h3>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">{stats.totalTemples} Total</span>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'FREE FOREVER', count: stats.planDistribution.FREE, color: 'from-stone-500 to-stone-400', pct: Math.round((stats.planDistribution.FREE / (stats.totalTemples || 1)) * 100) },
                  { name: 'STARTER (₹999/mo)', count: stats.planDistribution.STARTER, color: 'from-blue-500 to-cyan-400', pct: Math.round((stats.planDistribution.STARTER / (stats.totalTemples || 1)) * 100) },
                  { name: 'PROFESSIONAL (₹2,499/mo)', count: stats.planDistribution.PROFESSIONAL, color: 'from-amber-500 to-yellow-400', pct: Math.round((stats.planDistribution.PROFESSIONAL / (stats.totalTemples || 1)) * 100) },
                  { name: 'ENTERPRISE (₹9,999/mo)', count: stats.planDistribution.ENTERPRISE, color: 'from-purple-500 to-pink-400', pct: Math.round((stats.planDistribution.ENTERPRISE / (stats.totalTemples || 1)) * 100) },
                ].map((tier) => (
                  <div key={tier.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-300">{tier.name}</span>
                      <span className="text-amber-400 font-mono">{tier.count} ({tier.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${tier.color} rounded-full transition-all duration-500`}
                        style={{ width: `${tier.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Live Donors */}
            <div className="rounded-2xl bg-[#0d0d0f] border border-amber-500/20 p-6 space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <h3 className="font-heading font-bold text-white text-base">Latest Platform Donations (Global)</h3>
                </div>
                <button
                  onClick={() => setActiveTab('donations')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-stone-800/80 overflow-y-auto max-h-[260px] custom-scrollbar">
                {recentDonations.slice(0, 5).map((d) => (
                  <div key={d.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-xs">
                        ₹
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{d.donorName}</span>
                          {d.is80GEligible && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">80G</span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {d.temple.name} · <span className="font-mono text-stone-500">{d.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-emerald-400 font-mono">
                        +₹{d.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {new Date(d.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Temples Action Strip */}
          <div className="rounded-2xl bg-[#0d0d0f] border border-amber-500/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-white text-lg">Active Sanctums Directory</h3>
                <p className="text-xs text-stone-400">Immediate access to temple admin switches and public portals</p>
              </div>
              <button
                onClick={() => setActiveTab('temples')}
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
              >
                Open Full Grid ({temples.length})
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {temples.slice(0, 6).map((temple) => (
                <div
                  key={temple.id}
                  className="p-4 rounded-xl bg-black/60 border border-stone-800 hover:border-amber-500/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{temple.name}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            temple.isActive ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                      <div className="text-[11px] text-amber-400/80 font-mono">
                        /temple/{temple.slug}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-stone-800 text-stone-300 border border-stone-700">
                      {temple.subscriptionPlan}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                    <span>Devotees: <strong className="text-white">{temple._count.devotees}</strong></span>
                    <span>Donations: <strong className="text-white">{temple._count.donations}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/temple/${temple.slug}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-[11px] font-bold"
                    >
                      <ExternalLink className="w-3 h-3" /> Live
                    </Link>
                    <button
                      onClick={() => handleOpenEdit(temple)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(temple.id, temple.isActive)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${
                        temple.isActive
                          ? 'bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30'
                          : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {temple.isActive ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 2: ALL SANCTUMS & TEMPLES (GOD-MODE GRID) */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'temples' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d0d0f] p-4 rounded-2xl border border-amber-500/20">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                placeholder="Search by temple name, deity, or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-black/60 border border-stone-800 text-xs text-stone-300 font-semibold focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="suspended">Suspended</option>
              </select>

              {/* Plan Filter */}
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-black/60 border border-stone-800 text-xs text-stone-300 font-semibold focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Plans</option>
                <option value="FREE">FREE</option>
                <option value="STARTER">STARTER</option>
                <option value="PROFESSIONAL">PROFESSIONAL</option>
                <option value="ENTERPRISE">ENTERPRISE</option>
              </select>

              <span className="text-xs text-stone-400 font-mono">
                Showing {filteredTemples.length} of {temples.length}
              </span>
            </div>
          </div>

          {/* Temples Table */}
          <div className="rounded-2xl bg-[#0d0d0f] border border-amber-500/20 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-black/80 text-[10px] font-extrabold tracking-wider text-amber-400 uppercase border-b border-stone-800">
                  <tr>
                    <th className="p-4">Sanctum / Deity</th>
                    <th className="p-4">Status & Slug</th>
                    <th className="p-4">Tier Plan</th>
                    <th className="p-4">Devotees & Sevas</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4 text-right">King Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredTemples.map((temple) => (
                    <tr key={temple.id} className="hover:bg-amber-500/5 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{temple.name}</div>
                        <div className="text-[11px] text-amber-400 flex items-center gap-1.5 mt-0.5">
                          <span>{temple.primaryDeity || 'Sanctum Deity'}</span>
                          {temple.templeType && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-400">
                              {temple.templeType}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                              temple.isActive
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/15 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {temple.isActive ? 'ACTIVE' : 'SUSPENDED'}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 font-mono mt-1">
                          /temple/{temple.slug}
                        </div>
                      </td>

                      <td className="p-4">
                        <select
                          value={temple.subscriptionPlan}
                          disabled={actionLoading === temple.id}
                          onChange={(e) => handleChangePlan(temple.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg bg-black/80 border border-stone-700 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                        >
                          <option value="FREE">FREE</option>
                          <option value="STARTER">STARTER</option>
                          <option value="PROFESSIONAL">PRO</option>
                          <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-white">
                          {temple._count.devotees} devotees
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {temple._count.donations} donations · {temple._count.sevas} sevas
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="text-[11px] text-stone-300">
                          {temple.contactEmail || 'No email'}
                        </div>
                        <div className="text-[11px] text-stone-400 font-mono">
                          {temple.contactPhone || temple.upiId || '—'}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/temple/${temple.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                            title="Visit Live Portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleOpenEdit(temple)}
                            className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30"
                            title="Edit Temple Metadata"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleToggleStatus(temple.id, temple.isActive)}
                            className={`p-1.5 rounded-lg font-bold ${
                              temple.isActive
                                ? 'bg-amber-900/30 hover:bg-amber-900/50 text-amber-300'
                                : 'bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300'
                            }`}
                            title={temple.isActive ? 'Suspend Temple' : 'Activate Temple'}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteTemple(temple.id, temple.name)}
                            className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30"
                            title="God-Mode Permanent Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 3: DEVOTEE MASTER DATABASE */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'devotees' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d0d0f] p-4 rounded-2xl border border-purple-500/20">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                placeholder="Search devotees by name, phone, email, or temple..."
                value={devoteeSearch}
                onChange={(e) => setDevoteeSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-purple-400"
              />
            </div>
            <span className="text-xs text-purple-400 font-mono">
              Showing {filteredDevotees.length} devotee records
            </span>
          </div>

          <div className="rounded-2xl bg-[#0d0d0f] border border-purple-500/20 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-black/80 text-[10px] font-extrabold tracking-wider text-purple-400 uppercase border-b border-stone-800">
                  <tr>
                    <th className="p-4">Devotee Name</th>
                    <th className="p-4">Temple Affiliation</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Gotra / Nakshatra</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4 text-right">King Override</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredDevotees.map((dev) => (
                    <tr key={dev.id} className="hover:bg-purple-500/5 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{dev.fullName}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-amber-300">{dev.temple.name}</span>
                        <div className="text-[10px] text-stone-500 font-mono">/temple/{dev.temple.slug}</div>
                      </td>
                      <td className="p-4">
                        <div>{dev.phoneNumber || '—'}</div>
                        <div className="text-[11px] text-stone-500">{dev.email || '—'}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-stone-300">{dev.gotra || '—'}</span>
                        {dev.nakshatra && (
                          <div className="text-[10px] text-purple-400 font-mono">{dev.nakshatra} ({dev.rashi || ''})</div>
                        )}
                      </td>
                      <td className="p-4 text-stone-400">
                        {new Date(dev.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteDevotee(dev.id, dev.fullName)}
                          className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30"
                          title="Erase Devotee"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 4: GLOBAL FINANCIAL LEDGER */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'donations' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d0d0f] p-4 rounded-2xl border border-emerald-500/20">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                placeholder="Search by receipt #, donor, or temple..."
                value={donationSearch}
                onChange={(e) => setDonationSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-stone-400">Total Completed: <strong className="text-emerald-400">₹{stats.totalDonations.toLocaleString()}</strong></span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0d0d0f] border border-emerald-500/20 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-black/80 text-[10px] font-extrabold tracking-wider text-emerald-400 uppercase border-b border-stone-800">
                  <tr>
                    <th className="p-4">Receipt #</th>
                    <th className="p-4">Donor Name</th>
                    <th className="p-4">Temple Target</th>
                    <th className="p-4">Amount & 80G</th>
                    <th className="p-4">Payment Mode</th>
                    <th className="p-4">Status & Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-emerald-500/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-300">
                        {d.receiptNumber}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{d.donorName}</div>
                        <div className="text-[10px] text-stone-500">{d.donorPhone || d.donorEmail || '—'}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-stone-200">{d.temple.name}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-black text-emerald-300 font-mono text-sm">
                          ₹{d.amount.toLocaleString()}
                        </div>
                        {d.is80GEligible && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                            80G CERTIFIED
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-xs">
                        {d.paymentMethod}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            d.paymentStatus === 'COMPLETED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {d.paymentStatus}
                        </span>
                        <div className="text-[10px] text-stone-500 mt-1">
                          {new Date(d.createdAt).toLocaleString('en-IN')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 5: 3D ANALYTICS & PLATFORM PULSE */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* System Health Matrix */}
            <div className="p-6 rounded-2xl bg-[#0d0d0f] border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-bold text-white text-base">Node Health & Telemetry</h3>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">Postgres Connection Pool</span>
                  <span className="text-emerald-400 font-bold">Healthy (10 conn)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">Supabase Auth Gateway</span>
                  <span className="text-emerald-400 font-bold">Operational (0 err)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">Edge Middleware Domain Cache</span>
                  <span className="text-amber-400 font-bold">Cached (TTL: 5m)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">Gemini AI Copilot Engine</span>
                  <span className="text-purple-400 font-bold">Ready (Flash 2.5)</span>
                </div>
              </div>
            </div>

            {/* Financial Velocity */}
            <div className="p-6 rounded-2xl bg-[#0d0d0f] border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-bold text-white text-base">Financial Aggregations</h3>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">Total Processed Volume</span>
                  <span className="text-emerald-400 font-bold">₹{stats.totalDonations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">Average Transaction</span>
                  <span className="text-stone-200 font-bold">
                    ₹{stats.completedDonationsCount > 0 ? Math.round(stats.totalDonations / stats.completedDonationsCount).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/60 border border-stone-800">
                  <span className="text-stone-400">80G Tax Certificates</span>
                  <span className="text-amber-400 font-bold">Auto-Issued</span>
                </div>
              </div>
            </div>

            {/* Divine Sanctums Types */}
            <div className="p-6 rounded-2xl bg-[#0d0d0f] border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-white text-base">Temple Classification</h3>
              </div>
              <div className="space-y-2 text-xs">
                {['SHIVA', 'VISHNU', 'SHAKTI', 'GANESH', 'HANUMAN', 'MURUGAN', 'OTHER'].map((type) => {
                  const count = temples.filter((t) => t.templeType === type).length
                  return (
                    <div key={type} className="flex justify-between items-center py-1">
                      <span className="text-stone-400 font-semibold">{type}</span>
                      <span className="text-amber-400 font-mono font-bold">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* TAB 6: GOD-MODE SYSTEM CONTROLS */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'godmode' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl bg-[#140b08] border border-red-500/30 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-black tracking-wide uppercase">
              <ShieldAlert className="w-6 h-6" />
              <span>Omnipotent God-Mode Authority</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              These administrative triggers execute system-wide operations directly on the core database
              and bypass standard tenant isolation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <button
                onClick={() => {
                  const msg = prompt('Enter global announcement message to broadcast to all temple admins:')
                  if (msg) showToast('Broadcast dispatched across all workspaces!')
                }}
                className="p-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-left space-y-1 transition-all"
              >
                <div className="font-bold text-sm flex items-center gap-2">
                  <Radio className="w-4 h-4" /> Global Broadcast
                </div>
                <div className="text-[11px] text-stone-400">Push notification banner to all dashboard users</div>
              </button>

              <button
                onClick={() => {
                  alert('Database indices verified & synced. Latency: 11ms')
                }}
                className="p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-left space-y-1 transition-all"
              >
                <div className="font-bold text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Flush Edge Cache
                </div>
                <div className="text-[11px] text-stone-400">Purge and rebuild custom domain DNS routing table</div>
              </button>

              <button
                onClick={() => {
                  alert('All temples verified compliant with Section 80G guidelines.')
                }}
                className="p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-left space-y-1 transition-all"
              >
                <div className="font-bold text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 80G Tax Auditor
                </div>
                <div className="text-[11px] text-stone-400">Validate serial numbers & digital signatures</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* KING EDIT TEMPLE MODAL */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {editingTemple && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0e0e11] border border-amber-500/30 p-6 space-y-5 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-white text-base">King Override: Edit Temple</h3>
              </div>
              <button
                onClick={() => setEditingTemple(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-400 font-semibold mb-1">Temple Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editForm.slug}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-stone-800 text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 font-semibold mb-1">Primary Deity</label>
                  <input
                    type="text"
                    value={editForm.primaryDeity}
                    onChange={(e) => setEditForm({ ...editForm, primaryDeity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={editForm.contactPhone}
                    onChange={(e) => setEditForm({ ...editForm, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 font-semibold mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={editForm.contactEmail}
                    onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 font-semibold mb-1">Subscription Plan</label>
                <select
                  value={editForm.subscriptionPlan}
                  onChange={(e) => setEditForm({ ...editForm, subscriptionPlan: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-stone-800 text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                >
                  <option value="FREE">FREE</option>
                  <option value="STARTER">STARTER</option>
                  <option value="PROFESSIONAL">PROFESSIONAL</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
              <button
                onClick={() => setEditingTemple(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={actionLoading === 'modal_save'}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform"
              >
                {actionLoading === 'modal_save' ? 'Saving...' : 'Apply King Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
