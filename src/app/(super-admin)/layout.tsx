import * as React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/dal'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, ShieldAlert, LogOut, FileText } from 'lucide-react'

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export default async function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  // Guard the route to only SUPER_ADMIN role
  const { user } = await requireRole(['super_admin'])

  const navItems = [
    { label: 'Overview Metrics', path: '/super-admin/overview', icon: <LayoutDashboard className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-200 flex flex-col border-r border-stone-850 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-stone-800 space-x-2">
          <ShieldAlert className="h-6 w-6 text-saffron-500" />
          <div className="flex flex-col truncate">
            <span className="font-heading font-bold text-white text-sm">MandirAI OS</span>
            <span className="text-[9px] text-saffron-400 font-semibold tracking-wider uppercase">Super Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-300 hover:bg-stone-800 hover:text-white transition-all"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-stone-200/50 bg-white/80 dark:border-stone-850 dark:bg-stone-950/80 backdrop-blur-sm flex items-center justify-between px-8">
          <h2 className="font-heading font-bold text-stone-900 dark:text-white text-lg">Platform Management Control Center</h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-saffron-600 text-white flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <span className="text-xs font-semibold text-stone-500">{user.email}</span>
          </div>
        </header>
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
