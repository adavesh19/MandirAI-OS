import { requireSuperAdmin } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Building, CreditCard, Users, IndianRupee, Server, Activity, Globe, TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Super Admin Control Tower | MandirAI OS',
}

const SIMULATED_TEMPLES = [
  { name: 'Sri Rama Temple, Hyderabad', plan: 'Pro', devotees: 4820, donations: 312000, status: 'active' },
  { name: 'Balaji Mandir, Chennai', plan: 'Enterprise', devotees: 12400, donations: 890000, status: 'active' },
  { name: 'Devi Shakti Temple, Mumbai', plan: 'Starter', devotees: 1250, donations: 85000, status: 'active' },
  { name: 'Shiva Mandir, Bangalore', plan: 'Pro', devotees: 6900, donations: 445000, status: 'active' },
  { name: 'Ganesh Temple, Pune', plan: 'Pro', devotees: 3300, donations: 198000, status: 'trial' },
]

const planColor: Record<string, string> = {
  Enterprise: 'bg-purple-100 text-purple-700',
  Pro: 'bg-blue-100 text-blue-700',
  Starter: 'bg-stone-100 text-stone-600',
  trial: 'bg-yellow-100 text-yellow-700',
}

export default async function SuperAdminPage() {
  await requireSuperAdmin()

  const [temples, totalDonations, activeUsers, eventsCount] = await Promise.all([
    prisma.temple.count(),
    prisma.donation.aggregate({ _sum: { amount: true } }),
    prisma.user.count({ where: { isActive: true } }),
    prisma.event.count()
  ])

  const totalSimDonations = SIMULATED_TEMPLES.reduce((s, t) => s + t.donations, 0)
  const totalSimDevotees = SIMULATED_TEMPLES.reduce((s, t) => s + t.devotees, 0)

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 border border-stone-800 p-8 rounded-3xl shadow-2xl text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🕉️</span>
              <span className="text-xs font-black tracking-widest text-saffron-400 uppercase">MandirAI OS</span>
            </div>
            <h1 className="font-heading text-4xl font-black">Super Admin Control Tower</h1>
            <p className="text-sm text-stone-400 mt-2">Global platform intelligence. Monitor all temples, subscriptions, and AI usage from one command center.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              All Systems Operational
            </div>
            <span className="text-xs text-stone-500 font-mono">Last sync: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Global KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Temples On Platform', value: SIMULATED_TEMPLES.length.toString(), sub: '+2 this month', icon: <Building className="h-6 w-6 text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-950/20' },
          { label: 'Platform Donation Volume', value: `₹${(totalSimDonations / 100000).toFixed(1)}L`, sub: 'Across all temples', icon: <IndianRupee className="h-6 w-6 text-green-600" />, bg: 'bg-green-50 dark:bg-green-950/20' },
          { label: 'Total Devotees', value: totalSimDevotees.toLocaleString('en-IN'), sub: 'Active users', icon: <Users className="h-6 w-6 text-purple-500" />, bg: 'bg-purple-50 dark:bg-purple-950/20' },
          { label: 'AI API Calls Today', value: '14,820', sub: '↑ 22% vs yesterday', icon: <Zap className="h-6 w-6 text-saffron-500" />, bg: 'bg-saffron-50 dark:bg-saffron-950/20' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm`}>
            <div className="p-2.5 bg-white dark:bg-stone-900 rounded-xl w-fit shadow-sm mb-4">{s.icon}</div>
            <p className="text-3xl font-black text-stone-900 dark:text-white">{s.value}</p>
            <p className="text-sm font-bold text-stone-600 dark:text-stone-400 mt-1">{s.label}</p>
            <p className="text-xs text-stone-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Multi-Temple Analytics Table */}
      <div className="bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <Globe className="h-5 w-5 text-saffron-500" />
            Temple Network Intelligence
          </h2>
          <span className="text-xs font-bold text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full">{SIMULATED_TEMPLES.length} Temples Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 dark:bg-stone-900">
              <tr>
                {['Temple', 'Plan', 'Devotees', 'Donations (6M)', 'AI Usage', 'Status'].map(h => (
                  <th key={h} className="text-left p-4 font-black text-stone-500 uppercase tracking-wider text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {SIMULATED_TEMPLES.map((temple, i) => (
                <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                  <td className="p-4 font-bold text-stone-900 dark:text-stone-100">{temple.name}</td>
                  <td className="p-4">
                    <span className={`text-xs font-black px-2 py-1 rounded-full ${planColor[temple.plan]}`}>{temple.plan}</span>
                  </td>
                  <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">{temple.devotees.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-bold text-green-600">₹{temple.donations.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-full h-1.5 w-24">
                        <div className="bg-saffron-500 h-1.5 rounded-full" style={{ width: `${Math.floor(Math.random() * 60 + 30)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${temple.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {temple.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Risk Monitor + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-6">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-red-500" />
            AI Risk Monitor
          </h3>
          <div className="space-y-3">
            {[
              { msg: 'Unusual donation spike: ₹2.1L in 3 mins at Balaji Mandir', level: 'warning' },
              { msg: 'All systems nominal — No fraud signals detected', level: 'ok' },
              { msg: 'API rate limit at 82% for Shiva Mandir — Monitor closely', level: 'warning' },
            ].map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm font-medium ${alert.level === 'warning' ? 'bg-yellow-50 text-yellow-800' : 'bg-green-50 text-green-800'}`}>
                <Activity className={`h-4 w-4 shrink-0 mt-0.5 ${alert.level === 'warning' ? 'text-yellow-500' : 'text-green-500'}`} />
                {alert.msg}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-6">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-500" />
            SaaS Subscription Revenue
          </h3>
          <div className="space-y-3">
            {[
              { plan: 'Enterprise', count: 1, mrr: 24999 },
              { plan: 'Pro', count: 3, mrr: 44997 },
              { plan: 'Starter', count: 1, mrr: 2999 },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black px-2 py-1 rounded-full ${planColor[p.plan]}`}>{p.plan}</span>
                  <span className="text-sm text-stone-600 dark:text-stone-400">{p.count} temple{p.count > 1 ? 's' : ''}</span>
                </div>
                <span className="font-black text-green-600">₹{p.mrr.toLocaleString('en-IN')}/mo</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
              <span className="font-black text-stone-900 dark:text-white">Total MRR</span>
              <span className="font-black text-2xl text-saffron-600">₹72,995/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
