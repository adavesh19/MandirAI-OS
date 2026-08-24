import * as React from 'react'
import Link from 'next/link'
import { requireRole } from '@/lib/dal'
import { 
  Building2, Users, TrendingUp, 
  CreditCard, Settings, Activity, LogOut, 
  Crown, ShieldAlert, BarChart3, Bell, Database,
  Sparkles, Globe2, Layers, Cpu
} from 'lucide-react'

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export default async function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { user } = await requireRole(['super_admin'])

  const navItems = [
    { label: 'King Command Center', path: '/super-admin/overview', icon: Crown, section: 'CORE', badge: '3D GOD' },
    { label: 'All Sanctums & Temples', path: '/super-admin/overview#temples', icon: Building2, section: 'MANAGE', badge: null },
    { label: 'Devotees & Users', path: '/super-admin/overview#users', icon: Users, section: 'MANAGE', badge: null },
    { label: 'Omni Revenue & 80G', path: '/super-admin/overview#revenue', icon: TrendingUp, section: 'FINANCIAL', badge: null },
    { label: 'Global 3D Analytics', path: '/super-admin/overview#analytics', icon: BarChart3, section: 'FINANCIAL', badge: 'LIVE' },
    { label: 'Subscriptions & Tiers', path: '/super-admin/overview#plans', icon: CreditCard, section: 'FINANCIAL', badge: null },
    { label: 'Autonomous AI Logs', path: '/super-admin/overview#logs', icon: Activity, section: 'SYSTEM', badge: 'AUTO' },
    { label: 'God-Mode Settings', path: '/super-admin/overview#settings', icon: Settings, section: 'SYSTEM', badge: null },
  ]

  const sections = ['CORE', 'MANAGE', 'FINANCIAL', 'SYSTEM']

  return (
    <div className="min-h-screen bg-[#050505] text-stone-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-black">
      {/* ── KING SIDEBAR ── */}
      <aside className="w-full md:w-72 bg-[#09090b]/90 backdrop-blur-2xl border-r border-amber-500/10 flex flex-col shrink-0 sticky top-0 md:h-screen z-50">
        {/* Logo & Crown Header */}
        <div className="p-5 border-b border-amber-500/10 bg-gradient-to-b from-amber-950/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-300 shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              <Crown className="w-6 h-6 text-black" strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-white text-base tracking-wider">MandieAI OS</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent font-black tracking-widest uppercase">
                  KING OF KINGS MODE
                </span>
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">
          {sections.map((sec) => {
            const sectionItems = navItems.filter((n) => n.section === sec)
            return (
              <div key={sec} className="space-y-1">
                <div className="px-3 text-[10px] font-extrabold tracking-widest text-amber-500/50 uppercase">
                  {sec}
                </div>
                {sectionItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.path}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-amber-200 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </nav>

        {/* King User Profile & Logout */}
        <div className="p-4 border-t border-amber-500/10 bg-[#070709]">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center font-black text-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              AA
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                Adavesh Adavimath
              </div>
              <div className="text-[10px] text-amber-400/90 font-mono truncate">
                adavesh.adavimath2005@gmail.com
              </div>
            </div>
          </div>
          <form action="/api/v1/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-400 hover:text-red-400 hover:bg-red-500/10 border border-stone-800 hover:border-red-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Relinquish Crown (Sign Out)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ── MAIN VIEWPORT ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-radial-gradient from-amber-950/10 via-[#050505] to-[#020202]">
        {/* Top King Glass Bar */}
        <header className="h-16 border-b border-amber-500/10 bg-[#09090b]/70 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-300">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>OMNIPRESENT SUPER-ADMIN ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-stone-900/80 border border-stone-800 px-3 py-1.5 rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-stone-300 font-mono text-[11px]">DB Latency: 12ms</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Sovereign Rights</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
