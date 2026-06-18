'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Heart,
  Users,
  Calendar,
  BarChart3,
  FileText,
  UserCheck,
  MonitorSmartphone,
  Settings,
  X,
  Globe,
  LogOut,
  ChevronUp,
  Target,
} from 'lucide-react'

// ---------------------------------------------------------
// Icon map – serialisable string names → Lucide components
// ---------------------------------------------------------
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard:   LayoutDashboard,
  donations:   Heart,
  devotees:    Users,
  sevas:       Calendar,
  events:      Calendar,
  analytics:   BarChart3,
  receipts:    FileText,
  volunteers:  UserCheck,
  website:     MonitorSmartphone,
  settings:    Settings,
  campaigns:   Target,
}

// Quick-access items shown directly in the bottom bar (first 4 + More)
const QUICK_ICONS = ['dashboard', 'donations', 'devotees', 'sevas']

export interface NavItem {
  label:    string
  path:     string
  iconName: string
}

interface MobileNavProps {
  navItems:     NavItem[]
  templeName:   string
  templeSlug:   string
  userInitials: string
}

export default function MobileNav({
  navItems,
  templeName,
  templeSlug,
  userInitials,
}: MobileNavProps) {
  const pathname        = usePathname()
  const [open, setOpen] = useState(false)

  // Close drawer when route changes
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const quickItems = navItems.filter(item => QUICK_ICONS.includes(item.iconName))

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/')

  return (
    <>
      {/* ─── Sticky top header (mobile only) ──────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-stone-900 flex items-center justify-between px-4 shadow-lg border-b border-stone-800">
        {/* Left – empty spacer */}
        <div className="w-10" />

        {/* Centre – Temple name */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-lg leading-none">🕉️</span>
          <span className="font-heading font-bold text-white text-sm truncate max-w-[160px]">
            {templeName}
          </span>
        </div>

        {/* Right – user avatar */}
        <div className="w-10 flex justify-end">
          <div className="h-8 w-8 rounded-full bg-saffron-500/20 flex items-center justify-center font-bold text-saffron-400 text-xs ring-2 ring-saffron-500/30">
            {userInitials}
          </div>
        </div>
      </header>

      {/* ─── Fixed bottom nav bar (mobile only) ──────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-stone-900 border-t border-stone-800 flex items-stretch shadow-[0_-4px_24px_rgba(0,0,0,0.35)]"
      >
        {quickItems.map(item => {
          const Icon   = iconMap[item.iconName] ?? LayoutDashboard
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-150 group
                ${active
                  ? 'text-saffron-400'
                  : 'text-stone-500 hover:text-stone-200 active:text-saffron-400'
                }`}
            >
              <span
                className={`relative flex items-center justify-center w-10 h-6 rounded-full transition-all duration-200
                  ${active ? 'bg-saffron-500/15' : 'group-hover:bg-stone-800'}`}
              >
                <Icon className="h-5 w-5" />
                {active && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-saffron-400" />
                )}
              </span>
              <span className={`text-[10px] font-semibold leading-none ${active ? 'text-saffron-400' : ''}`}>
                {item.label.split(' ')[0]}
              </span>
            </Link>
          )
        })}

        {/* More button */}
        <button
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open navigation drawer"
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-150
            ${open ? 'text-saffron-400' : 'text-stone-500 hover:text-stone-200'}`}
        >
          <span
            className={`flex items-center justify-center w-10 h-6 rounded-full transition-all
              ${open ? 'bg-saffron-500/15' : ''}`}
          >
            <ChevronUp className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </span>
          <span className="text-[10px] font-semibold leading-none">More</span>
        </button>
      </nav>

      {/* ─── Slide-up drawer overlay ──────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-900 rounded-t-2xl shadow-2xl border-t border-stone-800
          transition-transform duration-300 ease-out will-change-transform
          ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-700" />
        </div>

        {/* Sheet header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-base">🕉️</span>
            <div>
              <p className="font-heading font-bold text-white text-sm leading-tight">{templeName}</p>
              <p className="text-[10px] text-saffron-400 font-semibold uppercase tracking-wider">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="h-8 w-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* All nav items */}
        <nav className="px-4 py-3 space-y-1 max-h-[60vh] overflow-y-auto">
          {navItems.map(item => {
            const Icon   = iconMap[item.iconName] ?? LayoutDashboard
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150
                  ${active
                    ? 'bg-saffron-500/15 text-saffron-400 border border-saffron-500/20'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
              >
                <span
                  className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center
                    ${active ? 'bg-saffron-500/20' : 'bg-stone-800'}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1">{item.label}</span>
                {active && (
                  <span className="h-2 w-2 rounded-full bg-saffron-400 flex-shrink-0" />
                )}
              </Link>
            )
          })}

          {/* Visit live website */}
          <a
            href={`/temple/${templeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-saffron-400 hover:bg-stone-800 hover:text-saffron-300 border border-dashed border-saffron-500/25 transition-all duration-150 mt-2"
          >
            <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-saffron-500/10 flex items-center justify-center">
              <Globe className="h-4 w-4" />
            </span>
            <span className="flex-1">Visit Live Website</span>
          </a>
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 pt-2 border-t border-stone-800 mt-1">
          <form action="/api/v1/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-stone-400 hover:bg-stone-800 hover:text-white transition-all duration-150"
            >
              <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-stone-800 flex items-center justify-center">
                <LogOut className="h-4 w-4" />
              </span>
              Log Out
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
