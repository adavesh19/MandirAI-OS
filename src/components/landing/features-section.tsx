'use client'

import * as React from 'react'
import { Globe, HeartHandshake, Users, Calendar, BarChart3, Bot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="h-6 w-6 text-saffron-550" />,
      title: '🌐 AI Website Generator',
      description: 'Automatically create a beautiful, SEO-optimized, and multilingual public website showing temple timings, history, deity profiles, and gallery.',
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-saffron-550" />,
      title: '💰 Smart Donations',
      description: 'Secure payment gateway supporting UPI, QR codes, cards, and net banking. Generate automated 80G tax benefit receipts instantly.',
    },
    {
      icon: <Users className="h-6 w-6 text-saffron-550" />,
      title: '👥 Devotee CRM',
      description: 'Maintain detailed records of devotees, gotra, nakshatra, and family milestones. Automatically trigger birthday greetings and festival reminders.',
    },
    {
      icon: <Calendar className="h-6 w-6 text-saffron-550" />,
      title: '🎪 Event & Seva Booking',
      description: 'Enable online pooja bookings, seva timings, and volunteer registrations for major festivals. Keep staff updated with schedules.',
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-saffron-550" />,
      title: '📊 Analytics Dashboard',
      description: 'Get deep insights on donation trends, peak hours, festival revenue, and visitor counts with charts for trustees.',
    },
    {
      icon: <Bot className="h-6 w-6 text-saffron-550" />,
      title: '🤖 AI Assistant',
      description: 'Devotee-facing chatbot trained on temple history, Hindu scriptures, and FAQs. Admin tools for drafting temple announcements.',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mb-4">
            Everything Your Temple Needs to Thrive
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-300">
            A comprehensive, all-in-one operating system engineered specifically for temple trusts, priests, and devotee engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-stone-200/60 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 transition-all duration-300 hover:shadow-xl hover:shadow-saffron-500/5 hover:border-saffron-500/30"
              hover={true}
            >
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-saffron-500/10 dark:bg-saffron-500/5 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-heading text-xl font-bold text-stone-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
