'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CheckCircle, Circle, Flame, Sparkles, BookOpen, Quote } from 'lucide-react'

interface Habit {
  id: string
  habitName: string
  streakCount: number
  lastCompletedAt: string | null
}

const GITA_QUOTES = [
  "You have the right to work, but never to the fruit of work.",
  "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
  "Change is the law of the universe.",
  "There is nothing lost or wasted in this life.",
  "Sever the ignorant doubt in your heart with the sword of self-knowledge."
]

export default function SadhanaTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [quote, setQuote] = useState(GITA_QUOTES[0])

  useEffect(() => {
    setQuote(GITA_QUOTES[Math.floor(Math.random() * GITA_QUOTES.length)])
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const res = await fetch(`/api/v1/devotees/habits`)
      const data = await res.json()
      if (data.habits) {
        setHabits(data.habits)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const toggleHabit = async (habitId: string, isCompletedToday: boolean) => {
    if (isCompletedToday) return // Prevent undo for now to keep it simple

    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        return { ...h, streakCount: h.streakCount + 1, lastCompletedAt: new Date().toISOString() }
      }
      return h
    }))

    try {
      await fetch('/api/v1/devotees/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId, action: 'complete' })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const isCompletedToday = (dateString: string | null) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear()
  }

  const totalStreak = habits.reduce((acc, h) => acc + h.streakCount, 0)

  return (
    <Card className="border border-stone-200 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-stone-50">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Flame className="w-32 h-32 text-orange-500" />
      </div>

      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Sadhana Tracker
          </CardTitle>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
            <Flame className="w-4 h-4" />
            {totalStreak} Day Streak
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-stone-100 rounded-lg"></div>
            <div className="h-10 bg-stone-100 rounded-lg"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {habits.length === 0 ? (
              <p className="text-sm text-stone-500 text-center py-4">No daily habits tracked yet. Start your spiritual journey!</p>
            ) : (
              habits.map((habit) => {
                const completed = isCompletedToday(habit.lastCompletedAt)
                return (
                  <div 
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id, completed)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                      completed 
                        ? 'bg-stone-50 border-stone-200' 
                        : 'bg-white border-stone-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300" />
                      )}
                      <span className={`font-medium ${completed ? 'text-stone-500 line-through' : 'text-stone-800'}`}>
                        {habit.habitName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-500">
                      <Flame className="w-3.5 h-3.5" />
                      {habit.streakCount}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {totalStreak > 3 && (
          <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-orange-400 shrink-0 rotate-180" />
              <p className="text-sm text-orange-800 font-medium italic">
                "{quote}"
              </p>
            </div>
            <p className="text-xs text-orange-600/70 mt-2 font-bold text-right uppercase tracking-wider">— Bhagavad Gita</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
