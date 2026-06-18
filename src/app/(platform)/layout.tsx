import * as React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthUser, requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Settings,
  Heart,
  Users,
  Calendar,
  Globe,
  LogOut,
  BarChart3,
  UserCheck,
  FileText,
  MonitorSmartphone,
  Terminal,
  ScanLine,
  Phone,
  MessageSquare,
  Bot,
  Paintbrush,
  TrendingUp,
  Tv2,
  CalendarDays,
  Target,
} from 'lucide-react'
import AiChatWidget from '@/components/dashboard/ai-chat-widget'
import MobileNav, { NavItem } from '@/components/dashboard/mobile-nav'
import CommandPalette from '@/components/shared/command-palette'

interface PlatformLayoutProps {
  children: React.ReactNode
}

export default async function PlatformLayout({ children }: PlatformLayoutProps) {
  const { user, role, tenantId } = await requireRole(['temple_admin', 'staff'])

  // Redirect to onboarding if they don't have a temple workspace yet
  if (!tenantId) {
    redirect('/onboarding')
  }

  // Fetch temple info
  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
  })

  if (!temple || !temple.onboardingCompleted) {
    redirect('/onboarding')
  }

  // Serialisable nav items (iconName string instead of JSX)
  const navItems: NavItem[] = [
    { label: 'Dashboard Overview',  path: '/dashboard',  iconName: 'dashboard'  },
    { label: 'Donations & Receipts',path: '/donations',  iconName: 'donations'  },
    { label: 'Crowdfunding',        path: '/dashboard/campaigns', iconName: 'campaigns' },
    { label: 'Receipts',            path: '/receipts',   iconName: 'receipts'   },
    { label: 'Receipt Studio',      path: '/dashboard/receipt-studio', iconName: 'receiptStudio' },
    { label: 'AI Predictive Analytics', path: '/analytics',  iconName: 'analytics'  },
    { label: 'Devotees CRM',        path: '/devotees',   iconName: 'devotees'   },
    { label: 'Sevas & Offerings',   path: '/sevas',      iconName: 'sevas'      },
    { label: 'Events & Programs',   path: '/events',     iconName: 'events'     },
    { label: 'Volunteers',          path: '/volunteers', iconName: 'volunteers' },
    { label: 'Website Manager',     path: '/website',    iconName: 'website'    },
    { label: 'Inventory',           path: '/dashboard/inventory', iconName: 'inventory' },
    { label: 'Fast-Track Scanner',  path: '/dashboard/scanner', iconName: 'scanner'   },
    { label: 'Telephony AI',        path: '/dashboard/telephony', iconName: 'telephony' },
    { label: 'Autonomous AI CRM',   path: '/dashboard/ai-crm',       iconName: 'aicrm'       },
    { label: 'Festival Intelligence',path: '/dashboard/festivals',     iconName: 'festivals'   },
    { label: 'Financial Intelligence',path: '/dashboard/finance',      iconName: 'finance'     },
    { label: 'Live Darshan Studio',  path: '/dashboard/live-studio',  iconName: 'livestudio'  },
    { label: 'Workspace Settings',  path: '/settings',   iconName: 'settings'   },
    { label: 'AI Command Shell',    path: '/dashboard/terminal', iconName: 'terminal' },
  ]

  // Derive user initials for avatar
  const userInitials = (user?.email ?? 'AD')
    .split('@')[0]
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col md:flex-row">

      {/* ───────────────────────────────────────────────────────────
          DESKTOP SIDEBAR  (hidden on mobile, shown md+)
      ─────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex w-64 bg-stone-900 text-stone-200 flex-col border-r border-stone-850 shrink-0">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-stone-800 space-x-2">
          <span className="text-xl">🕉️</span>
          <div className="flex flex-col truncate">
            <span className="font-heading font-bold text-white text-sm truncate">{temple.name}</span>
            <span className="text-[10px] text-saffron-400 font-semibold tracking-wider uppercase">Admin Portal</span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-300 hover:bg-stone-800 hover:text-white transition-all"
            >
              {/* Render icon from iconName for desktop sidebar */}
              <DesktopNavIcon name={item.iconName} />
              <span>{item.label}</span>
            </Link>
          ))}
          <a
            href={`/temple/${temple.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-saffron-400 hover:bg-stone-800 hover:text-saffron-300 transition-all border border-dashed border-saffron-500/20 mt-4"
          >
            <Globe className="h-5 w-5" />
            <span>Visit Live Website</span>
          </a>
        </nav>

        {/* Logout Action */}
        <div className="p-4 border-t border-stone-850">
          <form action="/api/v1/auth/logout" method="POST">
            <Button
              type="submit"
              variant="ghost"
              className="w-full text-stone-400 hover:bg-stone-800 hover:text-white justify-start"
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Log Out
            </Button>
          </form>
        </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────
          MAIN CONTENT AREA
      ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop top bar (hidden on mobile – mobile has its own sticky header via MobileNav) */}
        <header className="hidden md:flex h-16 border-b border-stone-200/50 bg-white/80 dark:border-stone-850 dark:bg-stone-950/80 backdrop-blur-sm items-center justify-between px-8">
          <h2 className="font-heading font-bold text-stone-900 dark:text-white text-lg">
            MandirAI OS Control Center
          </h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-saffron-500/10 flex items-center justify-center font-bold text-saffron-600 text-xs">
              {userInitials}
            </div>
          </div>
        </header>

        {/*
          pt-14 → clear the mobile sticky header (h-14)
          pb-20 → clear the mobile bottom nav (h-16 + a little breathing room)
          md:pt-0 / md:pb-0 → reset on desktop
        */}
        <main className="p-6 md:p-8 flex-1 pt-[calc(3.5rem+1.5rem)] md:pt-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* ───────────────────────────────────────────────────────────
          MOBILE NAV (client component – bottom bar + drawer + top header)
      ─────────────────────────────────────────────────────────── */}
      <MobileNav
        navItems={navItems}
        templeName={temple.name}
        templeSlug={temple.slug}
        userInitials={userInitials}
      />

      {/* Floating AI Chat Assistant Widget */}
      <AiChatWidget />

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tiny helper: renders the correct Lucide icon for the desktop sidebar
// (keeps the layout a server component – no 'use client' needed here)
// ---------------------------------------------------------------------------
function DesktopNavIcon({ name }: { name: string }) {
  const props = { className: 'h-5 w-5' }
  switch (name) {
    case 'dashboard':  return <LayoutDashboard      {...props} />
    case 'donations':  return <Heart                {...props} />
    case 'campaigns':  return <Target               {...props} />
    case 'receipts':   return <FileText             {...props} />
    case 'receiptStudio': return <Paintbrush        {...props} />
    case 'analytics':  return <BarChart3            {...props} />
    case 'devotees':   return <Users                {...props} />
    case 'sevas':      return <Calendar             {...props} />
    case 'events':     return <Calendar             {...props} />
    case 'volunteers': return <UserCheck            {...props} />
    case 'website':    return <MonitorSmartphone    {...props} />
    case 'inventory':  return <LayoutDashboard      {...props} />
    case 'scanner':    return <ScanLine             {...props} />
    case 'telephony':  return <Phone                {...props} />
    case 'aicrm':      return <Bot                  {...props} />
    case 'festivals':  return <CalendarDays          {...props} />
    case 'finance':    return <TrendingUp            {...props} />
    case 'livestudio': return <Tv2                   {...props} />
    case 'settings':   return <Settings             {...props} />
    case 'terminal':   return <Terminal             {...props} />
    default:           return <LayoutDashboard      {...props} />
  }
}
