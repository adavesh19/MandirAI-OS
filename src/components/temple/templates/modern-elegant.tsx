'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Building2, Award, Sun, Moon, Globe, Shield, Zap, ChevronRight, Play, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function ModernElegantTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(501)
  const [expandedFaq, setExpandedFaq] = React.useState<number|null>(null)
  const [activeWeekDay, setActiveWeekDay] = React.useState(0)

  const titleText = page?.title ? t(page.title) : temple.name
  const descText = page?.description ? t(page.description) : `A modern spiritual sanctuary dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Nitya Archana', amount:51, description:'Daily floral offering with sacred name recitation.', durationMinutes:15, tag:'Daily' },
    { id:'2', name:'Abhishekam', amount:501, description:'Sacred bath of the deity with milk, honey, rose water, and fresh flowers.', durationMinutes:45, tag:'Popular' },
    { id:'3', name:'Kumkumarchana', amount:151, description:'Kumkum offering to the deity with ashtottara recitation.', durationMinutes:20, tag:'Auspicious' },
    { id:'4', name:'Sahasranama Archana', amount:251, description:'One thousand sacred names recited with bilva or tulsi leaves.', durationMinutes:60, tag:'Powerful' },
    { id:'5', name:'Annadanam', amount:1001, description:'Sponsor a free meal for 100+ pilgrims visiting the temple.', durationMinutes:0, tag:'Seva' },
    { id:'6', name:'Maha Pooja', amount:5001, description:'Grand 16-step ritual with full orchestration and prasad distribution.', durationMinutes:90, tag:'Premium' },
  ]

  const events = [
    { id:'1', name:'Ganesh Chaturthi', date:'26 Aug', desc:'Grand 10-day celebration with processions.', tag:'Festival', color:'orange' },
    { id:'2', name:'Navaratri', date:'02 Oct', desc:'Nine nights of Devi worship and cultural programs.', tag:'Festival', color:'red' },
    { id:'3', name:'Diwali Pooja', date:'20 Oct', desc:'Midnight pooja with 1000 simultaneous lamps.', tag:'Special', color:'yellow' },
    { id:'4', name:'Shivaratri', date:'26 Feb', desc:'All-night Shiva abhishekam every 3 hours.', tag:'Pooja', color:'blue' },
    { id:'5', name:'Rama Navami', date:'06 Apr', desc:'Rama Kalyanam with devotee participation.', tag:'Festival', color:'green' },
    { id:'6', name:'Janmashtami', date:'16 Aug', desc:'Midnight Krishna celebration with bhajans.', tag:'Special', color:'purple' },
  ]

  const features = [
    { icon: <Zap className="h-5 w-5" />, title:'Instant Booking', desc:'Book any seva in under 60 seconds. Mobile-first experience.', color:'orange' },
    { icon: <Shield className="h-5 w-5" />, title:'80G Tax Benefits', desc:'Auto-generated legally compliant receipts on WhatsApp.', color:'green' },
    { icon: <Globe className="h-5 w-5" />, title:'5 Languages', desc:'Content available in English, Hindi, Tamil, Telugu, Kannada.', color:'blue' },
    { icon: <Play className="h-5 w-5" />, title:'4K Live Stream', desc:'High-quality live aarti stream from 5 AM every morning.', color:'red' },
    { icon: <Gift className="h-5 w-5" />, title:'Home Delivery', desc:'Receive sacred prasadam delivered anywhere in India.', color:'purple' },
    { icon: <Users className="h-5 w-5" />, title:'Devotee CRM', desc:'Your complete seva history, receipts, and devotee profile.', color:'teal' },
  ]

  const weeklyPooja = [
    { day:'Mon', pooja:'Shiva Abhishekam', emoji:'🔱' },
    { day:'Tue', pooja:'Anjaneya Pooja', emoji:'🐒' },
    { day:'Wed', pooja:'Ganapathi Homam', emoji:'🐘' },
    { day:'Thu', pooja:'Guru Archana', emoji:'🪔' },
    { day:'Fri', pooja:'Devi Archana', emoji:'🌸' },
    { day:'Sat', pooja:'Venkateswara Seva', emoji:'👑' },
    { day:'Sun', pooja:'Sahasranama', emoji:'☀️' },
  ]

  const stats = [
    { label:'Temples Served', value:'1,200+', delta:'+15% YoY' },
    { label:'Devotees This Month', value:'28,500', delta:'+8% MoM' },
    { label:'Sevas Booked Online', value:'45,000+', delta:'+22% YoY' },
    { label:'Donations Processed', value:'₹4.2 Cr', delta:'+18% YoY' },
  ]

  const faqs = [
    { q:'What are the darshan timings?', a:'Temple is open 5:00 AM – 12:00 PM and 4:00 PM – 8:30 PM daily. Festival days may have extended timings.' },
    { q:'How do I book a seva online?', a:'Click Book Seva, choose your seva, pick a slot, and pay. WhatsApp confirmation arrives in under 30 seconds.' },
    { q:'Are donations 80G tax exempt?', a:'Yes. All donations qualify for 80G deduction. PDF receipts are auto-generated and sent via WhatsApp and email.' },
    { q:'Can I watch aarti online?', a:'Yes! We livestream all major aartis on YouTube and on this page. Link available in the Live Darshan section.' },
    { q:'Is parking available?', a:'Yes — free parking for 500 vehicles inside the complex. EV charging stations available at the main lot.' },
  ]

  const notices = [
    { date:'24 Jun', title:'Ekadasi Annadanam', desc:'Free meals for all devotees — 11 AM to 2 PM.', tag:'Food' },
    { date:'26 Jun', title:'July Abhishekam Slots Open', desc:'Book preferred slots for July. Limited per session.', tag:'Booking' },
    { date:'28 Jun', title:'Gita Discourse Resumes', desc:'Sunday classes at 9 AM in Kalyana Mantapam.', tag:'Education' },
    { date:'01 Jul', title:'Brahmotsavam Registration', desc:'Sponsor seva for Brahmotsavam 2025.', tag:'Festival' },
  ]

  const milestones = [
    { year:'1523', title:'Founded', desc:'Temple established by royal patronage.' },
    { year:'1789', title:'Gopuram Built', desc:'7-tiered Rajagopuram completed.' },
    { year:'1924', title:'Trust Registered', desc:'Charitable trust established for transparency.' },
    { year:'2025', title:'Digital Era', desc:'Full AI platform with online booking & live darshan.' },
  ]

  const address = temple.address as any || {}
  const tagColors: Record<string, string> = { orange:'bg-orange-100 text-orange-700', red:'bg-red-100 text-red-700', yellow:'bg-yellow-100 text-yellow-700', blue:'bg-blue-100 text-blue-700', green:'bg-green-100 text-green-700', purple:'bg-purple-100 text-purple-700' }
  const featureColors: Record<string, string> = { orange:'bg-orange-50 text-orange-600 group-hover:bg-orange-600', green:'bg-green-50 text-green-600 group-hover:bg-green-600', blue:'bg-blue-50 text-blue-600 group-hover:bg-blue-600', red:'bg-red-50 text-red-600 group-hover:bg-red-600', purple:'bg-purple-50 text-purple-600 group-hover:bg-purple-600', teal:'bg-teal-50 text-teal-600 group-hover:bg-teal-600' }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes slide-up { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
        @keyframes marquee { 0%{transform:translateX(100vw);} 100%{transform:translateX(-100%);} }
        @keyframes ping-dot { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:0.5;} }
        .slide-up { animation: slide-up 0.7s ease both; }
        .card-hover { transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .card-hover:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,0.1); }
        .seva-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(249,115,22,0.12); }
        .seva-card { transition:all 0.3s ease; }
        .tag-orange { background:#fff7ed; color:#ea580c; border:1px solid #fed7aa; }
        .glass-card { background:rgba(255,255,255,0.8); backdrop-filter:blur(16px); border:1px solid rgba(226,232,240,0.8); }
        .orange-gradient { background:linear-gradient(135deg,#f97316,#ea580c); }
        .subtle-bg { background:radial-gradient(ellipse at top,#fff7ed 0%,#ffffff 60%); }
        .ticker-anim { animation:marquee 30s linear infinite; white-space:nowrap; display:inline-block; }
        .float-card { animation:float 5s ease-in-out infinite; }
        .bar-fill { animation: fill-bar 1.5s ease-out forwards; }
        @keyframes fill-bar { from{width:0;} }
      `}} />

      {/* ══ HERO — Split Layout ══════════════════════════════════════════ */}
      <section className="subtle-bg min-h-screen flex items-center pt-16 pb-0 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left */}
          <div className="slide-up">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8 border border-orange-200">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
              {temple.templeType || 'Hindu'} Temple · Digital Experience
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              {temple.name || titleText}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Reimagined</span>
            </h1>
            <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-lg">{descText}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href={`/temple/${temple.slug}/sevas`} className="orange-gradient text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-orange-500/30 flex items-center gap-2">
                Book a Seva <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/temple/${temple.slug}/live`} className="bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2">
                <Play className="h-4 w-4 text-red-400" /> Live Darshan
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{v:'500+', l:'Years'},{v:'25K+', l:'Devotees/mo'},{v:'50+', l:'Daily Sevas'}].map((s,i)=>(
                <div key={i} className="text-center">
                  <p className="text-3xl font-black text-orange-600">{s.v}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right — Floating cards */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="float-card absolute top-0 right-0 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl orange-gradient flex items-center justify-center text-white text-lg">🕉️</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Abhishekam</p>
                  <p className="text-slate-400 text-xs">Today, 7:00 AM · 45 min</p>
                </div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full mb-2"><div className="h-full bg-orange-500 rounded-full w-3/4 bar-fill" /></div>
              <p className="text-slate-400 text-xs">3 slots remaining</p>
            </div>
            <div className="absolute top-48 left-0 w-64 bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="text-3xl mb-3">💛</div>
              <p className="font-bold text-slate-900 mb-1">Donation Received</p>
              <p className="text-orange-600 font-black text-2xl">₹1,001</p>
              <p className="text-slate-400 text-xs mt-1">80G Receipt sent to WhatsApp ✓</p>
            </div>
            <div className="absolute bottom-10 right-10 w-56 bg-slate-900 text-white rounded-3xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-red-400">Live Now</span>
              </div>
              <p className="font-bold text-sm">Evening Aarti</p>
              <p className="text-slate-400 text-xs mt-1">1,240 watching</p>
            </div>
          </div>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="white"/></svg>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════════════════ */}
      <div className="bg-slate-900 text-slate-200 py-3 overflow-hidden">
        <div className="ticker-anim text-xs font-semibold tracking-wider">
          📢 Ekadasi Annadanam — 24 Jun &nbsp; · &nbsp; 🪔 July Abhishekam Slots Open &nbsp; · &nbsp; 🎉 Brahmotsavam 2025 — Register Now &nbsp; · &nbsp; 📖 Gita Class Every Sunday 9 AM &nbsp; · &nbsp; 🔴 Live Darshan: Morning, Noon & Evening &nbsp; ·
        </div>
      </div>

      {/* ══ STATS DASHBOARD ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s,i) => (
              <div key={i} className="card-hover bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <p className="text-3xl font-black text-slate-900 mb-1">{s.value}</p>
                <p className="text-slate-500 text-sm mb-2">{s.label}</p>
                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">{s.delta}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Digital Features</p>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Everything You Need,<br/>Right Here</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">A complete digital temple experience — from real-time booking to live darshan, devotee CRM, and instant 80G receipts.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f,i) => (
                  <div key={i} className="card-hover group bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-orange-200">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${featureColors[f.color] || 'bg-orange-50 text-orange-600'} group-hover:text-white`}>{f.icon}</div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Latest Notices</p>
              {notices.map((n,i) => (
                <div key={i} className="card-hover bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-center w-12">
                      <p className="text-xs text-orange-600 font-bold">{n.date.split(' ')[1]}</p>
                      <p className="text-2xl font-black text-slate-900">{n.date.split(' ')[0]}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-slate-900 text-sm">{n.title}</p>
                        <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{n.tag}</span>
                      </div>
                      <p className="text-slate-400 text-xs">{n.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIVE DARSHAN ════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-400 text-xs font-black uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping inline-block" /> LIVE · 1,240 watching
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">Watch the Divine from Anywhere</h2>
          <p className="text-slate-400 mb-12 text-lg">High-definition live stream of all major poojas and aartis throughout the day.</p>
          <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 flex items-center justify-center mb-8">
            {temple.liveStreamUrl ? (
              <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen title="Live Darshan" />
            ) : (
              <div className="text-center p-8">
                <div className="text-7xl mb-4">🛕</div>
                <p className="text-orange-400 font-bold text-xl mb-2">Live Stream Ready</p>
                <p className="text-slate-500">Configure your stream URL in the dashboard</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {['5:00 AM · Suprabhatam','12:00 PM · Noon Aarti','6:00 PM · Sandhya Aarti'].map(a=>(
              <div key={a} className="bg-slate-800 rounded-xl p-3 text-center">
                <p className="text-orange-400 text-xs font-bold">{a.split('·')[0]}</p>
                <p className="text-slate-400 text-[10px]">{a.split('·')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEVAS GRID ══════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Sacred Services</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">Book a Seva</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Choose from our complete range of poojas and sevas. Each performed by expert priests with full Vedic adherence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sevaData.map((seva: any, i: number) => (
              <div key={seva.id} className={`seva-card bg-white border-2 border-slate-100 rounded-2xl p-7 hover:border-orange-300 relative ${i===1?'lg:col-span-2':''}`}>
                {seva.tag && <span className="absolute top-4 right-4 tag-orange text-[10px] font-black px-2 py-0.5 rounded-full">{seva.tag}</span>}
                <div className="flex items-start justify-between mb-5">
                  <div className="text-3xl">{'🌸👑🔴📿🍛🏆'[i]||'🪔'}</div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-orange-600">₹{seva.amount.toLocaleString('en-IN')}</p>
                    {seva.durationMinutes > 0 && <p className="text-slate-400 text-xs">{seva.durationMinutes} min</p>}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{seva.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{seva.description}</p>
                <Link href={`/temple/${temple.slug}/sevas`} className="inline-flex items-center gap-1 orange-gradient text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-all">
                  Book Slot <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/temple/${temple.slug}/sevas`} className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-600 font-bold px-8 py-3 rounded-2xl hover:bg-orange-50 transition-colors">
              View All Sevas <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WEEKLY CALENDAR ══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">This Week</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Weekly Pooja Calendar</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeklyPooja.map((w, i) => (
              <button key={i} onClick={()=>setActiveWeekDay(i)} className={`rounded-2xl p-4 text-center transition-all ${activeWeekDay===i ? 'orange-gradient text-white scale-105 shadow-lg shadow-orange-500/30' : 'bg-white border border-slate-100 text-slate-700 hover:border-orange-200'}`}>
                <div className="text-2xl mb-2">{w.emoji}</div>
                <p className="font-black text-xs uppercase">{w.day}</p>
                <p className="text-[9px] mt-1 leading-tight">{w.pooja}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EVENTS GRID ═════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-2">Calendar</p>
              <h2 className="text-4xl font-extrabold text-slate-900">Upcoming Events</h2>
            </div>
            <Link href={`/temple/${temple.slug}/events`} className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map(e => (
              <div key={e.id} className="card-hover bg-white border border-slate-100 rounded-2xl p-6 hover:border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${tagColors[e.color]||'bg-orange-100 text-orange-700'}`}>{e.tag}</span>
                  <span className="text-slate-400 text-sm font-bold">{e.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{e.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{e.desc}</p>
                <Link href={`/temple/${temple.slug}/events`} className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">Register <ArrowRight className="h-3 w-3" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Gallery</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Sacred Spaces</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[150px]">
            {[
              {label:'Sanctum',emoji:'🛕',span:'md:col-span-2 md:row-span-2',bg:'bg-orange-50'},
              {label:'Mandapam',emoji:'🏛️',span:'',bg:'bg-slate-100'},
              {label:'Festivals',emoji:'🎉',span:'',bg:'bg-amber-50'},
              {label:'Annadanam',emoji:'🍲',span:'',bg:'bg-green-50'},
              {label:'Rajagopuram',emoji:'🗼',span:'',bg:'bg-stone-100'},
              {label:'Temple Pond',emoji:'💧',span:'',bg:'bg-blue-50'},
              {label:'View All →',emoji:'📸',span:'',bg:'bg-orange-500',isLink:true},
            ].map((g,i) => (
              <div key={i} className={`card-hover rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer ${g.span} ${g.bg}`}>
                <div className={`${i===0?'text-6xl mb-3':'text-4xl mb-2'}`}>{g.emoji}</div>
                <p className={`font-bold text-center px-2 ${i===0?'text-sm text-slate-700':'text-xs text-slate-500'} ${(g as any).isLink?'text-white font-black text-sm':''}`}>{g.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DONATION ════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-10">
            <div className="text-center mb-10">
              <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Dana Seva</p>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Make a Sacred Offering</h2>
              <p className="text-slate-500 max-w-xl mx-auto">All donations are 80G tax exempt. Receipts generated automatically and sent to your WhatsApp.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
              {[51,101,251,501,1001,5001].map(amt => (
                <button key={amt} onClick={()=>setSelectedAmount(amt)} className={`py-3 rounded-xl font-black text-sm border-2 transition-all ${selectedAmount===amt ? 'orange-gradient text-white border-orange-500 scale-105 shadow-lg shadow-orange-500/30' : 'border-slate-200 text-slate-700 hover:border-orange-300 bg-white'}`}>
                  ₹{amt >= 1000 ? (amt/1000)+'K' : amt}
                </button>
              ))}
            </div>
            <Link href={`/temple/${temple.slug}/donate`} className="w-full orange-gradient text-white font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-orange-500/20 block text-center">
              <Heart className="h-5 w-5 inline mr-2" />Donate ₹{selectedAmount.toLocaleString('en-IN')}
            </Link>
            <p className="text-center text-slate-400 text-xs mt-3">🔒 Razorpay Secured · 80G Receipt on WhatsApp · All major cards & UPI accepted</p>
          </div>
        </div>
      </section>

      {/* ══ HISTORY TIMELINE ════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Our Story</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">A Legacy Through Time</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m,i) => (
                <div key={i} className={`flex gap-8 items-center ${i%2===0?'md:flex-row':'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i%2===0?'md:text-right':''}`}>
                    <div className="card-hover bg-white border border-slate-100 rounded-2xl p-6 hover:border-orange-200">
                      <p className="text-orange-600 font-black text-xl mb-1">{m.year}</p>
                      <h3 className="font-bold text-slate-900 mb-2">{m.title}</h3>
                      <p className="text-slate-500 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-full orange-gradient flex items-center justify-center text-white font-black text-sm z-10 hidden md:flex">{i+1}</div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Help</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f,i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={()=>setExpandedFaq(expandedFaq===i?null:i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-slate-900">{f.q}</span>
                  <ChevronRight className={`h-5 w-5 text-orange-500 shrink-0 transition-transform ${expandedFaq===i?'rotate-90':''}`} />
                </button>
                {expandedFaq===i && <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed bg-slate-50/50">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISIT INFO ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs uppercase tracking-widest font-black mb-3">Visit</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Plan Your Visit</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-200 rounded-3xl h-72 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                <p className="font-bold text-slate-700">{address.line1||'Temple Road'}, {address.city||'City'}</p>
                <Link href={`/temple/${temple.slug}/contact`} className="mt-3 inline-block orange-gradient text-white font-bold px-5 py-2 rounded-xl text-sm">Open in Maps →</Link>
              </div>
            </div>
            <div className="space-y-3">
              {[{m:'🚌',t:'By Bus',d:'KSRTC stops 200m away. Auto-rickshaws at gate.'},{m:'🚂',t:'By Train',d:'Station 3km. Autos and cabs available 24/7.'},{m:'✈️',t:'By Flight',d:'Airport 22km. Prepaid cabs from terminal 1.'},{m:'🚗',t:'By Car',d:'Free parking for 500 cars. EV charging available.'}].map((t,i)=>(
                <div key={i} className="card-hover bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 hover:border-orange-200">
                  <span className="text-2xl">{t.m}</span>
                  <div><p className="font-bold text-slate-900 text-sm">{t.t}</p><p className="text-slate-400 text-xs">{t.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12 bg-white"><BlockRenderer blocks={page.blocks} theme="modern" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-white font-black text-xl mb-3">🕉️ {temple.name}</h3>
              <p className="text-sm leading-relaxed text-slate-500">A modern spiritual sanctuary for the digital age, serving devotees worldwide.</p>
            </div>
            <div>
              <h4 className="text-slate-200 font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[['Sevas',`/temple/${temple.slug}/sevas`],['Donate',`/temple/${temple.slug}/donate`],['Events',`/temple/${temple.slug}/events`],['Gallery',`/temple/${temple.slug}/gallery`],['Live',`/temple/${temple.slug}/live`]].map(([l,h])=>(
                  <li key={l}><Link href={h} className="hover:text-orange-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-slate-200 font-bold text-xs uppercase tracking-widest mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><Phone className="h-4 w-4 text-orange-500" />{temple.contactPhone||'+91 98765 43210'}</li>
                <li className="flex gap-2"><Mail className="h-4 w-4 text-orange-500" />{temple.contactEmail||'info@temple.org'}</li>
                <li className="flex gap-2 items-start"><MapPin className="h-4 w-4 text-orange-500 mt-0.5" />{address.city||'City'}, {address.state||'State'}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-200 font-bold text-xs uppercase tracking-widest mb-4">Timings</h4>
              <p className="text-sm text-slate-500">5:00 AM – 12:00 PM<br/>4:00 PM – 8:30 PM<br/>Open all days</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
            © 2025 {temple.name}. All rights reserved. Powered by MandirAI OS 🕉️
          </div>
        </div>
      </footer>
    </div>
  )
}
