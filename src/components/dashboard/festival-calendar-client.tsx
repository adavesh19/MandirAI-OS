'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays, Sparkles, RefreshCw, Clock, Users, Bell, CheckCircle2, Star, Flame, Gift } from 'lucide-react'

const FESTIVALS = [
  {
    id: 1,
    name: 'Guru Purnima',
    date: 'July 10, 2026',
    daysLeft: 23,
    crowd: 'High (Est. 2,400)',
    status: 'scheduled',
    aiSuggestions: [
      'Schedule Maha Abhishek at 5:30 AM — peak auspicious window',
      'Open 6 volunteer shifts: 2 entry, 2 prasad, 2 cleanup',
      'Send WhatsApp reminder to 1,847 devotees 3 days before',
      'Order 80 kg of flowers from Sri Venkateshwara Florists by July 6'
    ],
    color: 'orange'
  },
  {
    id: 2,
    name: 'Naga Panchami',
    date: 'July 27, 2026',
    daysLeft: 40,
    crowd: 'Medium (Est. 950)',
    status: 'planning',
    aiSuggestions: [
      'Prepare Nagaraja special pooja at 6:00 AM',
      'Dedicate 3 seva slots exclusively for milk abhishek',
      'Alert milk vendor for 50L advance booking',
      'Create event registration form by July 20'
    ],
    color: 'blue'
  },
  {
    id: 3,
    name: 'Varalakshmi Vratam',
    date: 'August 8, 2026',
    daysLeft: 52,
    crowd: 'Very High (Est. 3,800)',
    status: 'planning',
    aiSuggestions: [
      'PRIORITY: This is your highest attendance festival. Open registration immediately.',
      'Hire 4 additional staff for the day',
      'Coordinate with parking authority for overflow management',
      'Broadcast fundraising campaign: "Sponsor Mahalakshmi Alankara — ₹5,001"'
    ],
    color: 'yellow'
  },
  {
    id: 4,
    name: 'Ganesh Chaturthi',
    date: 'August 27, 2026',
    daysLeft: 71,
    crowd: 'Massive (Est. 8,500)',
    status: 'early-planning',
    aiSuggestions: [
      'Begin logistics planning NOW — 71 days is barely enough.',
      'Secure venue permission from municipal authority',
      'Set up online donation target: ₹10 Lakh for new idol',
      'Engage 25 volunteers across 5 shifts for 3 days'
    ],
    color: 'red'
  }
]

const colorMap: Record<string, { bg: string, text: string, badge: string, dot: string }> = {
  orange:  { bg: 'bg-orange-50',  text: 'text-orange-700',  badge: 'bg-orange-100 text-orange-700',  dot: 'bg-orange-400' },
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    badge: 'bg-blue-100 text-blue-700',      dot: 'bg-blue-400'   },
  yellow:  { bg: 'bg-yellow-50',  text: 'text-yellow-700',  badge: 'bg-yellow-100 text-yellow-700',  dot: 'bg-yellow-400' },
  red:     { bg: 'bg-red-50',     text: 'text-red-700',     badge: 'bg-red-100 text-red-700',        dot: 'bg-red-500'    },
}

export default function FestivalCalendarClient() {
  const [executing, setExecuting] = useState<Record<number, boolean>>({})
  const [executed, setExecuted] = useState<Record<number, boolean>>({})

  const handleAutoSchedule = (id: number) => {
    setExecuting(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setExecuting(prev => ({ ...prev, [id]: false }))
      setExecuted(prev => ({ ...prev, [id]: true }))
    }, 2500)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-saffron-500" />
            Festival Intelligence
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            AI-powered festival calendar. Auto-schedules sevas, volunteers, vendors, and devotee outreach.
          </p>
        </div>
        <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold h-11 px-6">
          <Sparkles className="h-4 w-4 mr-2" />
          Import Full Year Calendar
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Festivals', value: '4', icon: <Star className="h-5 w-5 text-yellow-500" /> },
          { label: 'AI Actions Queued', value: '16', icon: <Sparkles className="h-5 w-5 text-purple-500" /> },
          { label: 'Devotees to Notify', value: '4,102', icon: <Bell className="h-5 w-5 text-blue-500" /> },
          { label: 'Volunteer Slots Needed', value: '36', icon: <Users className="h-5 w-5 text-green-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="border-stone-200 dark:border-stone-800 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-xl">{stat.icon}</div>
              <div>
                <p className="text-2xl font-black text-stone-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-stone-500 font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Festival Cards */}
      <div className="space-y-4">
        {FESTIVALS.map(festival => {
          const c = colorMap[festival.color]
          return (
            <Card key={festival.id} className="border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left Info */}
                  <div className={`${c.bg} dark:bg-stone-900 p-6 lg:w-72 shrink-0 flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`relative flex h-2.5 w-2.5`}>
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${c.dot}`}></span>
                        </span>
                        <span className={`text-xs font-black uppercase tracking-widest ${c.text}`}>
                          {festival.status.replace('-', ' ')}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-stone-900 dark:text-white">{festival.name}</h2>
                      <div className="flex items-center gap-2 mt-2 text-stone-600 dark:text-stone-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-semibold">{festival.date}</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">{festival.crowd}</span>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black ${c.badge}`}>
                          <Flame className="h-3.5 w-3.5" />
                          {festival.daysLeft} days away
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      {executed[festival.id] ? (
                        <Button disabled className="w-full bg-green-500 text-white font-bold opacity-100">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          All Tasks Scheduled
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAutoSchedule(festival.id)}
                          disabled={executing[festival.id]}
                          className={`w-full font-bold text-white ${executing[festival.id] ? 'bg-stone-400' : 'bg-stone-900 hover:bg-stone-800'}`}
                        >
                          {executing[festival.id] ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Sparkles className="h-4 w-4 mr-2" />
                          )}
                          {executing[festival.id] ? 'Scheduling...' : 'Auto-Execute All'}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Right AI Suggestions */}
                  <div className="p-6 flex-1">
                    <h3 className="text-sm font-black uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      AI Action Plan
                    </h3>
                    <div className="space-y-3">
                      {festival.aiSuggestions.map((suggestion, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${executed[festival.id] ? 'bg-green-50 dark:bg-green-950/20' : 'bg-stone-50 dark:bg-stone-900/50'}`}>
                          <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black ${executed[festival.id] ? 'bg-green-500 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'}`}>
                            {executed[festival.id] ? '✓' : i + 1}
                          </div>
                          <p className={`text-sm font-medium ${executed[festival.id] ? 'text-green-800 dark:text-green-400' : 'text-stone-700 dark:text-stone-300'}`}>
                            {suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
