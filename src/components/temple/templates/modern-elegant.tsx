'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Activity, Bell, Home, Play, Navigation } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function ModernElegantTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [activeFaq, setActiveFaq] = React.useState(0)

  const titleText = page?.title ? t(page.title) : temple.name
  const descText = page?.description ? t(page.description) : `A complete digital sanctuary. Real-time updates, instant booking, and HD live darshan from anywhere in the world.`

  const dashboardMetrics = [
    { label:'Live Viewers', value:'1,204', trend:'+14% vs yesterday' },
    { label:'Sevas Booked Today', value:'86', trend:'2 slots remaining' },
    { label:'Next Aarti', value:'06:00 PM', trend:'In 2h 45m' },
    { label:'Temple Status', value:'OPEN', trend:'Closes at 8:30 PM' },
  ]

  const liveFeed = [
    { time:'10 mins ago', msg:'Priya donated ₹1,001 for Annadanam.' },
    { time:'25 mins ago', msg:'Morning Abhishekam successfully completed.' },
    { time:'1 hr ago', msg:'New gallery images uploaded: Brahmotsavam.' },
    { time:'2 hrs ago', msg:'Rahul booked Sahasranama Archana.' },
  ]

  const faqs = [
    { q:'How quickly do I get my receipt?', a:'Instantly. As soon as your payment succeeds, a PDF receipt is sent directly to your WhatsApp and Email.' },
    { q:'Is the Live Darshan available 24/7?', a:'The stream is active during temple opening hours (6 AM to 12 PM, and 4 PM to 8:30 PM). It pauses when the sanctum is closed.' },
    { q:'Are my donations 80G tax exempt?', a:'Yes, all online donations are automatically processed under Section 80G and the exemption details are printed on your receipt.' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-32">
      <style dangerouslySetInnerHTML={{__html:`
        .glass-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 8px 32px rgba(0,0,0,0.05); }
        .glass-card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .dock { background: rgba(255,255,255,0.8); backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .gradient-text { background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .blob { position: absolute; filter: blur(80px); z-index: 0; opacity: 0.5; animation: float 10s infinite ease-in-out alternate; }
        @keyframes float { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(30px, 50px) scale(1.1); } }
      `}} />

      {/* Decorative Blobs */}
      <div className="blob bg-blue-400/30 w-96 h-96 rounded-full top-0 left-0" />
      <div className="blob bg-purple-400/30 w-96 h-96 rounded-full bottom-0 right-0" style={{animationDelay:'-5s'}} />
      <div className="blob bg-orange-300/30 w-80 h-80 rounded-full top-1/2 left-1/2" style={{animationDelay:'-2s'}} />

      {/* ══ SPLIT HERO / DASHBOARD ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-12 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        
        {/* Left Side: Sticky Content */}
        <div className="w-full lg:w-1/2 lg:sticky top-12 pt-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xs font-bold text-slate-500 shadow-sm border border-slate-200 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SYSTEM ONLINE
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-6">
            Welcome to <br />
            <span className="gradient-text">{temple.name || titleText}</span>
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg mb-12">
            {descText}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={`/temple/${temple.slug}/sevas`} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
              Book a Seva
            </Link>
            <Link href={`/temple/${temple.slug}/donate`} className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
              Donate (80G)
            </Link>
          </div>
        </div>

        {/* Right Side: Dashboard Widgets */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 pt-8 pb-32">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {dashboardMetrics.map((m, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 glass-card-hover transition-all">
                <p className="text-slate-500 text-sm font-semibold mb-2">{m.label}</p>
                <p className="text-3xl font-black text-slate-900 mb-1">{m.value}</p>
                <p className="text-xs text-blue-500 font-semibold">{m.trend}</p>
              </div>
            ))}
          </div>

          {/* Live Darshan Widget */}
          <div className="glass-card rounded-3xl overflow-hidden glass-card-hover transition-all p-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
              {temple.liveStreamUrl ? (
                <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen title="Live Darshan" />
              ) : (
                <div className="text-center">
                  <Play className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-bold">Stream Standby</p>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> Live
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Sanctum Sanctorum</p>
                <p className="text-sm text-slate-500">Main Camera Feed</p>
              </div>
              <Link href={`/temple/${temple.slug}/live`} className="bg-slate-100 p-3 rounded-xl hover:bg-slate-200 transition-colors">
                <ArrowRight className="w-5 h-5 text-slate-600" />
              </Link>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="glass-card rounded-3xl p-6 glass-card-hover transition-all">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Live Updates
            </h3>
            <div className="space-y-4">
              {liveFeed.map((feed, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700">{feed.msg}</p>
                    <p className="text-xs text-slate-400 mt-1">{feed.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive FAQ Widget */}
          <div className="glass-card rounded-3xl p-6 glass-card-hover transition-all">
            <h3 className="font-bold text-slate-900 mb-4">Quick Answers</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white/50">
                  <button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} className="w-full flex justify-between items-center p-4 text-left">
                    <span className="font-semibold text-sm text-slate-800">{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-90' : ''}`} />
                  </button>
                  {activeFaq === i && (
                    <div className="p-4 pt-0 text-sm text-slate-600 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC BLOCKS INJECTED HERE */}
          {page?.blocks && page.blocks.length > 0 && (
            <div className="glass-card rounded-3xl p-6 mt-8">
               <BlockRenderer blocks={page.blocks} theme="modern" sevas={sevas} templeAddress={temple.address} />
            </div>
          )}

        </div>
      </section>

      {/* ══ MAC-STYLE FLOATING DOCK ══════════════════════════════════════ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 dock rounded-3xl px-4 py-3 flex items-center gap-2 md:gap-4">
        {[
          {l:'Home', i:<Home className="w-6 h-6"/>, h:`/temple/${temple.slug}`},
          {l:'Sevas', i:<BookOpen className="w-6 h-6"/>, h:`/temple/${temple.slug}/sevas`},
          {l:'Live', i:<Play className="w-6 h-6"/>, h:`/temple/${temple.slug}/live`},
          {l:'Gallery', i:<Camera className="w-6 h-6"/>, h:`/temple/${temple.slug}/gallery`},
          {l:'Donate', i:<Heart className="w-6 h-6"/>, h:`/temple/${temple.slug}/donate`},
        ].map(item => (
          <Link key={item.l} href={item.h} className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl hover:bg-slate-100 transition-all hover:-translate-y-2">
            <span className="text-slate-600 group-hover:text-blue-500 transition-colors">{item.i}</span>
            <span className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.l}
            </span>
          </Link>
        ))}
      </div>

    </div>
  )
}
