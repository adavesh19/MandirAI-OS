'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, ArrowRight, User, CalendarDays, Star, MessageSquare } from 'lucide-react'
import { getAstrologicalRecommendation } from './actions'

export default function PurohitCopilotPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<any>(null)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    const res = await getAstrologicalRecommendation({
      name: formData.get('name') as string,
      gotra: formData.get('gotra') as string,
      nakshatra: formData.get('nakshatra') as string,
      intention: formData.get('intention') as string,
      templeName: 'Temple', // In a real app we'd fetch this SSR and pass it down
      primaryDeity: 'Divine'
    })
    
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 rounded-full mb-4">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-stone-900 dark:text-white">Purohit Copilot</h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
          Seek divine guidance. Enter your astrological details and intention, and our AI Purohit will recommend the most auspicious rituals for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-stone-700 dark:text-stone-300">Your Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <Input id="name" name="name" required className="pl-10" placeholder="e.g. Rahul Sharma" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gotra" className="text-stone-700 dark:text-stone-300">Gotra</Label>
                <Input id="gotra" name="gotra" placeholder="e.g. Kashyapa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nakshatra" className="text-stone-700 dark:text-stone-300">Nakshatra</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input id="nakshatra" name="nakshatra" className="pl-9" placeholder="e.g. Rohini" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intention" className="text-stone-700 dark:text-stone-300">Your Intention / Prayer</Label>
              <Textarea 
                id="intention" 
                name="intention" 
                required 
                rows={4}
                placeholder="What seek you? (e.g., Success in upcoming exams, health for family, business prosperity)"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-saffron-600 hover:bg-saffron-700 text-white h-12 text-lg rounded-xl"
            >
              {loading ? (
                <span className="flex items-center">Consulting Scriptures <span className="ml-2 animate-pulse">...</span></span>
              ) : (
                <span className="flex items-center">Seek Guidance <ArrowRight className="ml-2 h-5 w-5" /></span>
              )}
            </Button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 flex flex-col justify-center">
          {!result && !loading && (
            <div className="text-center text-stone-400">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Your personalized astrological guidance will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="text-center text-saffron-600 animate-pulse">
              <Sparkles className="h-16 w-16 mx-auto mb-4" />
              <p className="font-semibold">The Purohit is reading the stars...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {result.error ? (
                <div className="text-red-500 font-medium bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200">
                  {result.error}
                </div>
              ) : (
                <>
                  <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-sm border border-saffron-100 dark:border-stone-700 relative">
                    <div className="absolute -top-3 -left-3 text-4xl">🕉️</div>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed italic pt-2">
                      "{result.recommendation}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-4 flex items-center">
                      <Sparkles className="h-8 w-8 text-emerald-500 mr-4" />
                      <div>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Recommended Seva</p>
                        <p className="font-semibold text-stone-900 dark:text-white">{result.suggestedSeva}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4 flex items-center">
                      <CalendarDays className="h-8 w-8 text-blue-500 mr-4" />
                      <div>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Auspicious Timing</p>
                        <p className="font-semibold text-stone-900 dark:text-white">{result.auspiciousDate}</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 h-12 rounded-xl" onClick={() => window.location.href = `/temple/${slug}/sevas`}>
                    Browse Sevas Now
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
