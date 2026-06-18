'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Heart, Calendar, Star, Bell, User, LogOut, Home, ArrowRight,
  Sparkles, MapPin, Clock, Phone, ChevronRight, Gift, BookOpen,
  Mic2, Building2, Music, Info
} from 'lucide-react'
import SadhanaTracker from '@/components/dashboard/sadhana-tracker'

const TEMPLES = [
  { name: 'Shree Siddhivinayak', location: 'Mumbai, Maharashtra', deity: 'Lord Ganesha', slug: 'siddhivinayak', timing: '6am – 9pm', color: 'from-orange-500 to-amber-500' },
  { name: 'Tirupati Balaji', location: 'Tirumala, Andhra Pradesh', deity: 'Lord Venkateswara', slug: 'tirupati', timing: '7am – 8pm', color: 'from-amber-500 to-yellow-500' },
  { name: 'Mahakaleshwar', location: 'Ujjain, Madhya Pradesh', deity: 'Lord Shiva', slug: 'mahakaleshwar', timing: '4am – 11pm', color: 'from-purple-500 to-indigo-500' },
]

const TODAY_EVENTS = [
  { title: 'Ganesh Chaturthi Puja', time: '08:00 AM', type: 'Festival', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { title: 'Abhishek Seva', time: '11:00 AM', type: 'Seva', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { title: 'Evening Aarti', time: '07:30 PM', type: 'Aarti', color: 'bg-amber-100 text-amber-700 border-amber-200' },
]

const QUICK_SEVAS = [
  { icon: '🪔', name: 'Deepa Seva', price: '₹51', desc: 'Light a lamp for the deity' },
  { icon: '🌸', name: 'Pushpa Seva', price: '₹101', desc: 'Floral offering seva' },
  { icon: '🍚', name: 'Annadanam', price: '₹251', desc: 'Food distribution seva' },
  { icon: '📿', name: 'Abhishek', price: '₹501', desc: 'Sacred bathing ritual' },
]

const DAILY_SHLOKA = {
  sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
  meaning: 'O Lord Ganesha, with a curved trunk and massive body, brilliant as a million suns — please remove all obstacles from my endeavors, always.',
  deity: 'Ganesh Vandana',
}

export default function MyDashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<'home' | 'sevas' | 'donate' | 'profile'>('home')
  const [devoteeStats, setDevoteeStats] = React.useState<{ totalKarma: number; badgeTier: string; memberships: number } | null>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      
      try {
        const res = await fetch('/api/v1/devotees/me')
        if (res.ok) {
          const stats = await res.json()
          setDevoteeStats(stats)
        }
      } catch (e) {
        console.error('Could not fetch devotee stats', e)
      }
      
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl animate-bounce">🕉️</span>
          <p className="text-stone-500 text-sm font-medium">Loading your sacred space...</p>
        </div>
      </div>
    )
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Devotee'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? '🌅 Subha Prabhat' : hour < 17 ? '☀️ Namaste' : '🌙 Shubh Sandhya'

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center shadow-md">
            <span className="text-white text-lg">🕉️</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading font-bold text-stone-900 text-sm leading-tight">MandirAI OS</h1>
            <p className="text-[10px] text-saffron-600 font-semibold uppercase tracking-wider">Devotee Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors">
            <Bell className="h-4 w-4 text-stone-500" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <span className="text-sm font-semibold text-stone-700 hidden sm:block max-w-[120px] truncate">{displayName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="ml-1 h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-stone-400 transition-colors"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-24">

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-5 py-5">
            {/* Greeting Banner */}
            <div className="relative bg-gradient-to-r from-saffron-500 via-amber-500 to-orange-500 rounded-2xl p-5 text-white overflow-hidden shadow-lg shadow-saffron-500/20">
              <div className="absolute top-0 right-0 text-8xl opacity-10 leading-none select-none">🕉️</div>
              <p className="text-orange-100 text-sm font-medium mb-0.5">{greeting}</p>
              <h2 className="font-heading text-2xl font-bold">{displayName}</h2>
              <p className="text-orange-100 text-xs mt-1.5">May today be filled with divine blessings ✨</p>
              
              {/* Gamification / Punya Points */}
              {devoteeStats && (
                <div className="mt-4 flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-inner">
                  <div className="h-10 w-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-xl shadow-md border-2 border-white/50">
                    {devoteeStats.badgeTier === 'SAFFRON' ? '🏵️' : 
                     devoteeStats.badgeTier === 'GOLD' ? '🏆' : 
                     devoteeStats.badgeTier === 'SILVER' ? '🥈' : '🏵️'}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest">{devoteeStats.badgeTier} Devotee</p>
                    <p className="text-lg font-bold text-white drop-shadow-sm flex items-center gap-1">
                      {devoteeStats.totalKarma.toLocaleString('en-IN')} <span className="text-xs font-medium text-orange-100">Punya Points</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Daily Shloka */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-600" />
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Daily Shloka · {DAILY_SHLOKA.deity}</p>
              </div>
              <p className="text-stone-800 font-medium text-sm leading-relaxed italic">&ldquo;{DAILY_SHLOKA.sanskrit}&rdquo;</p>
              <p className="text-stone-500 text-xs leading-relaxed">{DAILY_SHLOKA.meaning}</p>
            </div>

            {/* Spiritual Habit Tracker */}
            <SadhanaTracker />

            {/* Today's Events */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-base font-bold text-stone-900">Today&apos;s Events</h3>
                <button className="text-xs text-saffron-600 font-semibold hover:underline flex items-center gap-1">
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-2">
                {TODAY_EVENTS.map((event, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-stone-100 rounded-xl px-4 py-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`text-xs font-bold px-2 py-1 rounded-lg border ${event.color}`}>{event.type}</div>
                      <div>
                        <p className="text-sm font-semibold text-stone-800">{event.title}</p>
                        <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" /> {event.time}
                        </p>
                      </div>
                    </div>
                    <button className="text-xs bg-saffron-50 text-saffron-600 font-semibold px-3 py-1.5 rounded-lg border border-saffron-100 hover:bg-saffron-100 transition-colors">
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Temples */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-base font-bold text-stone-900">Temples Near You</h3>
              </div>
              <div className="space-y-3">
                {TEMPLES.map((temple, i) => (
                  <Link key={i} href={`/temple/${temple.slug}`}
                    className="flex items-center gap-4 bg-white border border-stone-100 rounded-2xl p-4 hover:shadow-md transition-all group"
                  >
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${temple.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-md`}>
                      🛕
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 text-sm truncate group-hover:text-saffron-600 transition-colors">{temple.name}</p>
                      <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 flex-shrink-0" /> {temple.location}
                      </p>
                      <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3 flex-shrink-0" /> {temple.timing}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-saffron-500 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Temple Admin CTA */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-5 text-white">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-saffron-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 className="h-5 w-5 text-saffron-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-base">Are you a Temple Admin?</h4>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                    Digitize your temple operations — donations, sevas, devotee CRM, and AI-powered multilingual website.
                  </p>
                  <Link href="/register">
                    <button className="mt-3 inline-flex items-center gap-2 text-xs font-bold bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2.5 rounded-xl transition-colors">
                      <Sparkles className="h-3.5 w-3.5" /> Register My Temple Free
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sevas Tab */}
        {activeTab === 'sevas' && (
          <div className="py-5 space-y-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-stone-900">Book a Seva</h2>
              <p className="text-sm text-stone-500 mt-1">Choose from available sevas at your preferred temple</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_SEVAS.map((seva, i) => (
                <div key={i} className="bg-white border border-stone-100 rounded-2xl p-4 space-y-2 hover:shadow-md transition-all cursor-pointer group">
                  <div className="text-3xl">{seva.icon}</div>
                  <p className="font-heading font-bold text-stone-900 text-sm">{seva.name}</p>
                  <p className="text-xs text-stone-500 leading-snug">{seva.desc}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-saffron-600 font-bold text-sm">{seva.price}</span>
                    <button className="text-xs bg-saffron-50 text-saffron-600 font-semibold px-3 py-1 rounded-lg border border-saffron-100 group-hover:bg-saffron-500 group-hover:text-white transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
              <Music className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">More sevas coming soon!</p>
              <p className="text-xs text-stone-400 mt-1">Connect with a temple admin to discover all available offerings</p>
            </div>
          </div>
        )}

        {/* Donate Tab */}
        {activeTab === 'donate' && (
          <div className="py-5 space-y-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-stone-900">Make a Donation</h2>
              <p className="text-sm text-stone-500 mt-1">Support temples and contribute to divine causes</p>
            </div>
            <div className="space-y-3">
              {TEMPLES.map((temple, i) => (
                <div key={i} className="bg-white border border-stone-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${temple.color} flex items-center justify-center text-xl flex-shrink-0`}>🛕</div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{temple.name}</p>
                      <p className="text-xs text-stone-400">{temple.deity}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {['₹51', '₹101', '₹501'].map((amt) => (
                      <button key={amt} className="text-xs font-bold border border-stone-200 rounded-lg py-2 hover:border-saffron-400 hover:bg-saffron-50 hover:text-saffron-600 transition-colors">
                        {amt}
                      </button>
                    ))}
                  </div>
                  <Link href={`/temple/${temple.slug}/donate`}>
                    <button className="w-full text-sm font-bold bg-gradient-to-r from-saffron-500 to-amber-500 text-white py-2.5 rounded-xl hover:brightness-105 transition-all flex items-center justify-center gap-2">
                      <Heart className="h-4 w-4" /> Donate Now
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="py-5 space-y-4">
            {/* Profile Card */}
            <div className="bg-gradient-to-r from-saffron-500 to-amber-500 rounded-2xl p-6 text-white text-center shadow-lg">
              <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border-2 border-white/30">
                <span className="text-white text-2xl font-bold">{initials}</span>
              </div>
              <h3 className="font-heading text-xl font-bold">{displayName}</h3>
              <p className="text-orange-100 text-sm mt-0.5">{user?.email}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full text-xs font-semibold">
                <Star className="h-3 w-3" /> {devoteeStats?.badgeTier || 'BRONZE'} Member
              </div>
            </div>

            {/* Profile Menu */}
            <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden divide-y divide-stone-50">
              {[
                { icon: <User className="h-4 w-4 text-saffron-500" />, label: 'Edit Profile', sub: 'Update your name and contact info' },
                { icon: <Heart className="h-4 w-4 text-rose-500" />, label: 'Donation History', sub: 'View all your past donations' },
                { icon: <Calendar className="h-4 w-4 text-blue-500" />, label: 'My Bookings', sub: 'Seva and event registrations' },
                { icon: <Bell className="h-4 w-4 text-amber-500" />, label: 'Notifications', sub: 'Festival and temple alerts' },
                { icon: <Gift className="h-4 w-4 text-purple-500" />, label: 'My Prasad Orders', sub: 'Track prasad deliveries' },
                { icon: <Info className="h-4 w-4 text-stone-400" />, label: 'Help & Support', sub: 'FAQs and contact support' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-4 hover:bg-stone-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{item.label}</p>
                      <p className="text-xs text-stone-400">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-stone-300" />
                </div>
              ))}
            </div>

            {/* Temple Admin Upgrade */}
            <div className="bg-stone-900 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-saffron-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Upgrade to Temple Admin</p>
                  <p className="text-xs text-stone-400 mt-0.5">Manage your own temple with AI tools</p>
                </div>
              </div>
              <Link href="/register">
                <button className="mt-3 w-full text-sm font-bold bg-saffron-500 text-white py-2.5 rounded-xl hover:bg-saffron-600 transition-colors">
                  Get Started Free →
                </button>
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-red-500 bg-red-50 border border-red-100 py-3 rounded-2xl hover:bg-red-100 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-40 shadow-lg shadow-stone-900/10">
        <div className="max-w-2xl mx-auto flex items-center justify-around px-2 py-1">
          {[
            { key: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
            { key: 'sevas', label: 'Sevas', icon: <Mic2 className="h-5 w-5" /> },
            { key: 'donate', label: 'Donate', icon: <Heart className="h-5 w-5" /> },
            { key: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'text-saffron-600 bg-saffron-50'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {tab.icon}
              <span className={`text-[10px] font-semibold ${activeTab === tab.key ? 'text-saffron-600' : ''}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
