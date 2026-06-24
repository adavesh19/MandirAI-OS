'use client'

import * as React from 'react'
import { useLanguage } from '@/components/shared/language-context'
import { Bell, AlertCircle, Calendar } from 'lucide-react'

interface Notice {
  id: string
  title: Record<string, string>
  content: Record<string, string>
  date?: string
}

interface NoticeBoardBlockProps {
  data: {
    title?: Record<string, string>
    notices?: Notice[]
  }
  settings?: {
    layout?: 'grid' | 'ticker' | 'list'
    importance?: 'normal' | 'urgent'
  }
  theme?: string
}

export default function NoticeBoardBlock({ data, settings, theme = 'classic' }: NoticeBoardBlockProps) {
  const { t } = useLanguage()
  const layout = settings?.layout || 'grid'
  const importance = settings?.importance || 'normal'

  // Style customization based on theme
  let containerClasses = "relative p-8 rounded-3xl transition-all duration-300 "
  let titleClasses = "font-serif text-2xl font-bold mb-6 flex items-center gap-2 "
  let cardClasses = "p-5 rounded-2xl border transition-all duration-200 "
  let headerIconColor = "text-saffron-600 dark:text-saffron-400"

  if (theme === 'heritage') {
    containerClasses += "border-4 border-[#D4AF37] bg-red-950 text-[#F5DEB3] shadow-lg "
    titleClasses += "font-serif text-[#D4AF37] border-b border-[#D4AF37]/25 pb-3 "
    cardClasses += "bg-red-900/40 border-[#D4AF37]/35 text-[#F5DEB3] hover:border-[#D4AF37] "
    headerIconColor = "text-[#D4AF37]"
  } else if (theme === 'modern') {
    containerClasses += "border border-stone-200/50 bg-[#F8FAFC] dark:bg-stone-900 shadow-md "
    titleClasses += "font-sans font-extrabold text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-850 pb-3 "
    cardClasses += "bg-white dark:bg-stone-800 border-stone-250/60 dark:border-stone-750 text-stone-800 dark:text-stone-200 hover:shadow-md "
    headerIconColor = "text-orange-600 dark:text-orange-400"
  } else if (theme === 'divine-glow') {
    containerClasses += "border border-amber-500/20 bg-gradient-to-b from-[#1c0d02] to-[#0d0500] text-amber-100 shadow-lg "
    titleClasses += "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDD0] to-[#E5A93B] border-b border-amber-500/20 pb-3 "
    cardClasses += "bg-[#170a01] border-amber-500/15 text-amber-100 hover:border-amber-500/40 "
    headerIconColor = "text-amber-400"
  } else {
    // Classic
    containerClasses += "border border-stone-200/40 bg-white dark:bg-stone-950 shadow-sm "
    titleClasses += "font-serif text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-850 pb-3 "
    cardClasses += "bg-stone-50/50 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-saffron-300 "
  }

  const defaultNotices: Notice[] = [
    {
      id: 'n-1',
      title: { en: 'Special Abhishek Pooja', hi: 'विशेष अभिषेक पूजा' },
      content: { en: 'Join us for Shiva Abhishek this Monday morning starting 6:00 AM.', hi: 'इस सोमवार सुबह 6:00 बजे से शिव अभिषेक में शामिल हों।' },
      date: '2026-06-22'
    },
    {
      id: 'n-2',
      title: { en: 'Annadanam Seva Sponsorship', hi: 'अन्नदानम सेवा प्रायोजन' },
      content: { en: 'Devotees can now sponsor daily free meals online for special family events.', hi: 'भक्त अब विशेष पारिवारिक आयोजनों के लिए ऑनलाइन दैनिक मुफ्त भोजन प्रायोजित कर सकते हैं।' },
      date: '2026-06-25'
    }
  ]

  const noticesList = data.notices && data.notices.length > 0 ? data.notices : defaultNotices

  return (
    <div className={containerClasses}>
      {/* Urgent Warning Ribbon */}
      {importance === 'urgent' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10 animate-bounce">
          <AlertCircle className="h-3 w-3" />
          Urgent Notice
        </div>
      )}

      <h2 className={titleClasses}>
        <Bell className={`h-5 w-5 ${headerIconColor}`} />
        {data.title ? t(data.title) : t({ en: 'Temple Notice Board', hi: 'मंदिर सूचना पट्ट' })}
      </h2>

      {layout === 'ticker' ? (
        <div className="bg-stone-900 text-amber-400 dark:bg-stone-950 p-4 rounded-2xl overflow-hidden relative border border-stone-800">
          <div className="flex items-center gap-3 absolute left-4 z-10 bg-stone-900 pr-2 border-r border-stone-800 font-bold text-xs uppercase tracking-wider">
            📢 Latest:
          </div>
          <div className="w-full pl-24 overflow-hidden relative whitespace-nowrap">
            <div className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] space-x-16 pl-[100%]">
              {noticesList.map((notice) => (
                <span key={notice.id} className="text-xs font-bold font-sans">
                  • <span className="underline">{t(notice.title)}</span>: {t(notice.content)}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : layout === 'list' ? (
        <div className="space-y-3">
          {noticesList.map((notice) => (
            <div key={notice.id} className={cardClasses}>
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-sm font-bold">{t(notice.title)}</h3>
                {notice.date && (
                  <span className="text-[10px] opacity-60 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {notice.date}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-95 leading-relaxed">{t(notice.content)}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Grid layout */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {noticesList.map((notice) => (
            <div key={notice.id} className={cardClasses}>
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-sm font-bold">{t(notice.title)}</h3>
                {notice.date && (
                  <span className="text-[10px] opacity-60 flex items-center gap-1 font-mono">
                    <Calendar className="h-3 w-3" />
                    {notice.date}
                  </span>
                )}
              </div>
              <p className="text-xs opacity-90 leading-relaxed">{t(notice.content)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
