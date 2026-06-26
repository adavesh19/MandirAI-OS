'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Moon, Sun, Globe, Zap, Play, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function HeritageGrandTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1001)
  const [activeTab, setActiveTab] = React.useState('morning')

  const titleText = page?.title ? t(page.title) : `Jai ${temple.primaryDeity || 'Sri Deva'} — ${temple.name}`
  const descText = page?.description ? t(page.description) : `The grand ancient shrine of Lord ${temple.primaryDeity || 'the Divine'} — a beacon of devotion and heritage.`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Nitya Archana', amount:51, description:'Daily flower offering with 108 names of the deity.', durationMinutes:15, emoji:'🌸' },
    { id:'2', name:'Raja Abhishekam', amount:1001, description:'Royal sacred bath with panchamrit, flowers, and divine alankara.', durationMinutes:60, emoji:'👑' },
    { id:'3', name:'Kumkumarchana', amount:151, description:'Kumkum offering with full ashtottara shatanamam.', durationMinutes:20, emoji:'🔴' },
    { id:'4', name:'Sahasranama Archana', amount:501, description:'Thousand holy names recited with tulsi and bilva.', durationMinutes:60, emoji:'📿' },
    { id:'5', name:'Annadanam Seva', amount:2001, description:'Sponsor sumptuous free meals for 200 pilgrims.', durationMinutes:0, emoji:'🍛' },
    { id:'6', name:'Brahmotsavam Seva', amount:11001, description:'Sponsor specific vahan seva in the 9-day grand festival.', durationMinutes:0, emoji:'🏆' },
    { id:'7', name:'Vahana Seva', amount:5001, description:'Deity taken in procession on a decorated vehicle (vahan).', durationMinutes:90, emoji:'🐘' },
    { id:'8', name:'Dolotsavam', amount:2501, description:'The deity swings on a beautifully decorated swing (oonjal).', durationMinutes:45, emoji:'🎠' },
    { id:'9', name:'Sapt-Sati Homam', amount:21001, description:'Grand fire ritual with 700 verses of Devi Mahatmyam.', durationMinutes:180, emoji:'🔥' },
  ]

  const events = [
    { id:'1', name:'Brahmotsavam', date:'12–21 Oct', type:'UTSAVAM', desc:'The grand 9-day annual festival with daily vahana sevas, cultural programs, and rajabhoga.', location:'Temple Complex', emoji:'🏆' },
    { id:'2', name:'Navaratri Mahotsavam', date:'02–10 Oct', type:'FESTIVAL', desc:'Nine nights of Sri Devi worship — each night a different alankara and special pooja.', location:'Maha Mandapam', emoji:'🌺' },
    { id:'3', name:'Karthika Deepotsavam', date:'15 Nov', type:'SPECIAL', desc:'Thousands of lamps light up the entire temple in the holy month of Karthika.', location:'Full Temple', emoji:'🪔' },
    { id:'4', name:'Shivaratri Mahaabhishekam', date:'26 Feb', type:'SPECIAL', desc:'All-night worship with 12 abhishekam cycles. Rudrabhishekam at midnight.', location:'Shiva Shrine', emoji:'🔱' },
    { id:'5', name:'Sri Rama Navami', date:'06 Apr', type:'FESTIVAL', desc:'Celestial wedding (Kalyanotsavam) of Sri Rama and Sita with devotee participation.', location:'Main Hall', emoji:'🏹' },
    { id:'6', name:'Janmashtami Utsav', date:'16 Aug', type:'SPECIAL', desc:'Midnight celebration of Lord Krishna — abhishekam, bhajans, and grand alankara.', location:'Krishna Shrine', emoji:'🪈' },
  ]

  const alankaraCalendar = [
    { day:'Monday', alankara:'Shiva — Rudrabhishekam Alankara', color:'bg-blue-900/40 border-blue-500/30', emoji:'🔱' },
    { day:'Tuesday', alankara:'Anjaneya — Vira Alankara', color:'bg-orange-900/40 border-orange-500/30', emoji:'🐒' },
    { day:'Wednesday', alankara:'Ganapathi — Modaka Alankara', color:'bg-red-900/40 border-red-500/30', emoji:'🐘' },
    { day:'Thursday', alankara:'Sri Venkateswara — Thiruvabharana', color:'bg-yellow-900/40 border-yellow-500/30', emoji:'👑' },
    { day:'Friday', alankara:'Sri Devi — Sringara Alankara', color:'bg-pink-900/40 border-pink-500/30', emoji:'🌺' },
    { day:'Saturday', alankara:'Subrahmanya — Vel Alankara', color:'bg-purple-900/40 border-purple-500/30', emoji:'⚡' },
    { day:'Sunday', alankara:'Surya — Sahasrakirana Alankara', color:'bg-amber-900/40 border-amber-500/30', emoji:'☀️' },
  ]

  const morningSchedule = [
    { time:'4:30 AM', event:'Thiruvanandal — Suprabhatam', icon:'🌄' },
    { time:'5:00 AM', event:'Niranjanopachara Pooja', icon:'🪔' },
    { time:'6:00 AM', event:'Thiruvanandal — Pratah Kalabhoga', icon:'🌸' },
    { time:'7:00 AM', event:'Nitya Kalyana Mahotsavam', icon:'💫' },
    { time:'8:00 AM', event:'Abhishekam & Archana', icon:'🏺' },
    { time:'9:00 AM', event:'Sahasranama Archana', icon:'📿' },
    { time:'12:00 PM', event:'Rajabhoga — Temple Closes', icon:'☀️' },
  ]

  const eveningSchedule = [
    { time:'4:00 PM', event:'Temple Opens — Afternoon Archana', icon:'🌤️' },
    { time:'5:00 PM', event:'Dolotsavam / Vahana Seva', icon:'🎠' },
    { time:'6:00 PM', event:'Sandhyopasana & Aarti', icon:'🌆' },
    { time:'7:00 PM', event:'Ekanta Seva — Deity Adorned for Night', icon:'🌙' },
    { time:'8:00 PM', event:'Astottara Shatanamavali Pooja', icon:'📿' },
    { time:'8:30 PM', event:'Pavitra Thiruvaradhanam', icon:'⭐' },
    { time:'9:00 PM', event:'Sheja Aarti — Temple Closes', icon:'🌌' },
  ]

  const sthalaHistory = [
    { year:'1250 CE', event:'Divine Vision', desc:'The original self-manifested (svayambhu) deity was discovered by a shepherd boy who had a divine vision.' },
    { year:'1387 CE', event:'Royal Patronage', desc:'The ruling king built the first stone temple with a 5-tiered gopuram after receiving blessings.' },
    { year:'1603 CE', event:'Maha Mandapam Built', desc:'The magnificent thousand-pillared hall (Maha Mandapam) was constructed with 96 stone sculptors.' },
    { year:'1879 CE', event:'Rajagopuram', desc:'The iconic 9-tiered Rajagopuram was completed — still the tallest structure in the region.' },
    { year:'1952 CE', event:'HR&CE Takeover', desc:'Management transferred to the Hindu Religious and Charitable Endowments Department for public welfare.' },
    { year:'2025 CE', event:'Digital Transformation', desc:'Full AI-powered platform launched — online booking, live darshan, and instant 80G receipts.' },
  ]

  const mahatmya = [
    { title:'Svayambhu Kshetra', desc:'The deity here is self-manifested (svayambhu), not consecrated — making it one of the rarest tirtha kshethras in all of India.', icon:'✨' },
    { title:'Sthala Vriksham', desc:'The sacred Bilva tree (for Shiva kshetras) or the Vanni tree here is thousands of years old and holds immense spiritual power.', icon:'🌳' },
    { title:'Pushkarini (Sacred Tank)', desc:'A dip in the temple tank on auspicious days is believed to wash away all sins and grant the blessings of a thousand pilgrimages.', icon:'💧' },
    { title:'108 Divya Desam', desc:'This temple is one of the 108 Divya Desams sung by the 12 Alwars, making it a premier pilgrimage destination.', icon:'🏛️' },
    { title:'Miracle Accounts', desc:'Hundreds of documented miracle accounts across 7 centuries — healings, divine visions, and wishes fulfilled.', icon:'🌟' },
    { title:'Vedic Agama Tradition', desc:'All rituals are performed strictly as per the Pancharatra/Shaiva Agama scriptures without deviation.', icon:'📜' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen font-sans" style={{background:'#0d0400', color:'#fef3c7'}}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gold-shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
        @keyframes royal-glow { 0%,100%{box-shadow:0 0 15px rgba(251,191,36,0.3);} 50%{box-shadow:0 0 40px rgba(251,191,36,0.7);} }
        @keyframes float-up { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        @keyframes marquee { 0%{transform:translateX(100vw);} 100%{transform:translateX(-100%);} }
        @keyframes spin-slow { 100%{transform:rotate(360deg);} }
        @keyframes fire-flicker { 0%,100%{transform:scaleY(1) scaleX(1);} 25%{transform:scaleY(1.1) scaleX(0.95);} 75%{transform:scaleY(0.95) scaleX(1.05);} }
        .gold-text { background:linear-gradient(90deg,#b45309,#fbbf24,#f59e0b,#fbbf24,#b45309); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:gold-shimmer 4s linear infinite; }
        .royal-glow { animation: royal-glow 2.5s ease-in-out infinite; }
        .float-anim { animation: float-up 4s ease-in-out infinite; }
        .ticker-anim { animation: marquee 30s linear infinite; white-space:nowrap; display:inline-block; }
        .spin-slow { animation: spin-slow 60s linear infinite; }
        .card-royal { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-royal:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 60px rgba(251,191,36,0.2); }
        .gold-border { border: 1px solid rgba(251,191,36,0.3); }
        .gold-border:hover { border-color: rgba(251,191,36,0.7); }
        .seva-royal:hover { background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.5); }
        .seva-royal { transition: all 0.3s ease; }
        .gopuram { clip-path: polygon(50% 0%, 85% 20%, 95% 60%, 85% 80%, 50% 100%, 15% 80%, 5% 60%, 15% 20%); }
        .fire { animation: fire-flicker 0.5s ease-in-out infinite alternate; }
      `}} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background:'radial-gradient(ellipse at center, #3d1a00 0%, #1a0800 50%, #0d0400 100%)'}}>
        {/* Rotating mandala rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="spin-slow w-[800px] h-[800px] rounded-full opacity-10" style={{border:'1px solid #fbbf24'}} />
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-10" style={{border:'1px solid #f59e0b', animation:'spin-slow 40s linear infinite reverse'}} />
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-15" style={{border:'2px solid rgba(251,191,36,0.4)'}} />
        </div>

        {/* Floating flames */}
        <div className="absolute left-10 top-1/3 text-3xl fire opacity-70 select-none">🔥</div>
        <div className="absolute right-10 top-1/3 text-3xl fire opacity-70 select-none" style={{animationDelay:'0.25s'}}>🔥</div>
        <div className="absolute left-1/4 bottom-1/4 text-2xl float-anim select-none">🪔</div>
        <div className="absolute right-1/4 bottom-1/4 text-2xl float-anim select-none" style={{animationDelay:'0.5s'}}>🪔</div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Royal seal */}
          <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl royal-glow" style={{background:'linear-gradient(135deg,#b45309,#fbbf24,#b45309)', boxShadow:'0 0 40px rgba(251,191,36,0.4)'}}>🕉️</div>

          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest" style={{background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.3)', color:'#fbbf24'}}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            Ancient Heritage Temple · {temple.templeType || 'Divya Desam'}
          </div>

          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-8xl leading-tight mb-6 tracking-tight">
            <span className="gold-text">{temple.name || titleText}</span>
          </h1>
          <div className="text-amber-300/80 text-2xl mb-4" style={{fontFamily:'serif'}}>
            ॐ नमः शिवाय · जय श्री राम · जय माँ दुर्गे
          </div>
          <p className="text-amber-200/70 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">{descText}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/temple/${temple.slug}/sevas`} className="group px-10 py-4 rounded-xl font-black text-stone-900 flex items-center gap-2 hover:scale-105 transition-all" style={{background:'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow:'0 8px 32px rgba(251,191,36,0.4)'}}>
              👑 Book Royal Seva <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={`/temple/${temple.slug}/donate`} className="px-10 py-4 rounded-xl font-black hover:scale-105 transition-all" style={{border:'2px solid rgba(251,191,36,0.5)', color:'#fbbf24'}}>
              🙏 Make an Offering
            </Link>
            <Link href={`/temple/${temple.slug}/live`} className="px-10 py-4 rounded-xl font-black hover:scale-105 transition-all" style={{background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.3)', color:'#fcd34d'}}>
              🔴 Live Darshan
            </Link>
          </div>
        </div>
      </section>

      {/* ══ GOLD TICKER ══════════════════════════════════════════════════ */}
      <div className="py-3 overflow-hidden" style={{background:'linear-gradient(90deg,#b45309,#d97706,#b45309)', color:'#0d0400'}}>
        <div className="ticker-anim text-sm font-black tracking-widest">
          🕉️ &nbsp; JAI SRI VENKATESHWARA &nbsp; 🪔 &nbsp; Abhishekam Daily 6 AM &nbsp; 👑 &nbsp; Brahmotsavam: Oct 12–21 — Register Now &nbsp; 🌺 &nbsp; Navaratri Mahotsavam Begins Oct 2 &nbsp; 🔱 &nbsp; Shivaratri Mahaabhishekam Feb 26 — All Night &nbsp; ✨ &nbsp; 1000 Lamp Deepotsavam Nov 15 &nbsp; 🕉️
        </div>
      </div>

      {/* ══ STATS ════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{background:'#1a0800'}}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4"><span className="gold-text">A Shrine of Eternal Greatness</span></h2>
          <p className="text-center text-amber-300/60 max-w-xl mx-auto mb-14">These numbers reflect not just statistics — but centuries of unwavering devotion and divine grace.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label:'Years of Worship', value:'750+', icon:'⏳' },
              { label:'Daily Pilgrims', value:'10,000+', icon:'🙏' },
              { label:'Sevas Per Day', value:'108', icon:'🪔' },
              { label:'Festivals Yearly', value:'24', icon:'🎭' },
              { label:'Priests & Staff', value:'150+', icon:'👳' },
              { label:'Nations of Devotees', value:'45+', icon:'🌍' },
            ].map((s, i) => (
              <div key={i} className="card-royal text-center rounded-2xl p-6 gold-border" style={{background:'rgba(251,191,36,0.05)'}}>
                <div className="text-4xl mb-3">{s.icon}</div>
                <p className="text-3xl font-black gold-text mb-1">{s.value}</p>
                <p className="text-amber-300/70 text-xs uppercase tracking-wider font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STHALA MAHATMYA ══════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0d0400'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Kshetra Mahatmya</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Why This Temple is Sacred</span></h2>
            <p className="text-amber-300/60 max-w-xl mx-auto">Six sacred truths that make this kshetra one of the most powerful spiritual centers in the land.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mahatmya.map((m, i) => (
              <div key={i} className="card-royal rounded-2xl p-7 gold-border" style={{background:'rgba(251,191,36,0.04)'}}>
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 className="font-bold text-amber-300 text-lg mb-3">{m.title}</h3>
                <p className="text-amber-200/60 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIVE DARSHAN ════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#120600'}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-900/50 border border-red-500/50 text-red-300 text-xs font-black uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-ping inline-block" /> LIVE DARSHAN ACTIVE
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Watch the Sacred Rituals Live</span></h2>
          <p className="text-amber-300/60 mb-12 text-lg">Witness the divine from anywhere. Let the aarti blessings reach you wherever you are.</p>
          <div className="aspect-video rounded-3xl overflow-hidden flex items-center justify-center mb-10" style={{background:'rgba(251,191,36,0.05)', border:'1px solid rgba(251,191,36,0.2)'}}>
            {temple.liveStreamUrl ? (
              <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen title="Live Darshan" />
            ) : (
              <div className="text-center p-8">
                <div className="text-8xl mb-6 float-anim">🛕</div>
                <p className="text-amber-400 font-bold text-2xl mb-2">Live Stream</p>
                <p className="text-amber-300/50 text-sm">Next Aarti: This Evening 6:00 PM</p>
                <div className="mt-8 flex gap-4 justify-center flex-wrap">
                  {['Morning • 5 AM','Noon • 12 PM','Evening • 6 PM','Night • 9 PM'].map(a => (
                    <div key={a} className="px-4 py-2 rounded-xl text-xs font-bold gold-border" style={{background:'rgba(251,191,36,0.08)', color:'#fcd34d'}}>{a}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ ALANKARA CALENDAR ════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#1a0800'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Weekly Alankara</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Deity Decoration Calendar</span></h2>
            <p className="text-amber-300/60 max-w-xl mx-auto">Each day of the week, the deity wears a unique sacred alankara (decoration) as prescribed by the Agama Shastra.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {alankaraCalendar.map((a, i) => (
              <div key={i} className={`card-royal rounded-2xl p-5 border ${a.color}`}>
                <div className="text-3xl mb-3">{a.emoji}</div>
                <p className="font-black text-amber-300 text-sm mb-2 uppercase">{a.day}</p>
                <p className="text-amber-200/70 text-xs leading-relaxed">{a.alankara}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ROYAL SEVAS GRID ════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0d0400'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Sacred Seva</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Choose Your Royal Seva</span></h2>
            <p className="text-amber-300/60 max-w-xl mx-auto">Participate in the divine service of the Lord. Each seva is performed as per strict Agama Shastra by experienced priests.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sevaData.slice(0,9).map((seva: any, i: number) => (
              <div key={seva.id} className={`seva-royal rounded-2xl p-7 cursor-pointer relative gold-border ${i===1?'lg:row-span-2':''}`} style={{background:'rgba(251,191,36,0.03)'}}>
                {i===1 && <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-1 rounded-full" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)', color:'#0d0400'}}>👑 Premium</div>}
                <div className="flex justify-between items-start mb-5">
                  <div className="text-4xl">{seva.emoji || '🪔'}</div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{color:'#fbbf24'}}>₹{seva.amount.toLocaleString('en-IN')}</p>
                    {seva.durationMinutes > 0 && <p className="text-amber-300/50 text-xs">{seva.durationMinutes} min</p>}
                  </div>
                </div>
                <h3 className="font-bold text-amber-200 text-lg mb-2">{seva.name}</h3>
                <p className="text-amber-300/60 text-sm leading-relaxed mb-6">{seva.description}</p>
                <Link href={`/temple/${temple.slug}/sevas`} className="inline-flex items-center gap-2 font-black text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105" style={{background:'linear-gradient(135deg,#b45309,#d97706)', color:'#fff'}}>
                  Book Now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DAILY SCHEDULE TABS ══════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#1a0800'}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Darshan Timings</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Daily Puja Schedule</span></h2>
          </div>
          <div className="flex justify-center gap-4 mb-10">
            {['morning','evening'].map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${activeTab===tab ? 'text-stone-900' : 'text-amber-400 gold-border'}`} style={activeTab===tab?{background:'linear-gradient(135deg,#fbbf24,#f59e0b)'}:{background:'rgba(251,191,36,0.05)'}}>
                {tab === 'morning' ? '🌅 Morning' : '🌙 Evening'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(activeTab==='morning' ? morningSchedule : eveningSchedule).map((s, i) => (
              <div key={i} className="card-royal flex items-center gap-4 rounded-2xl p-5 gold-border" style={{background:'rgba(251,191,36,0.04)'}}>
                <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-black text-xs text-stone-900" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)'}}>{s.time.replace(' ','\n')}</div>
                <div>
                  <span className="text-xl mr-2">{s.icon}</span>
                  <span className="font-semibold text-amber-200">{s.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FESTIVAL EVENTS ══════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0d0400'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Utsavams & Festivals</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Grand Celebrations Ahead</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map(e => (
              <div key={e.id} className="card-royal rounded-2xl p-7 gold-border" style={{background:'rgba(251,191,36,0.04)'}}>
                <div className="text-4xl mb-4">{e.emoji}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full text-stone-900" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)'}}>{e.type}</span>
                  <span className="text-amber-400/70 text-xs font-bold">{e.date}</span>
                </div>
                <h3 className="font-bold text-amber-200 text-lg mb-2">{e.name}</h3>
                <p className="text-amber-300/60 text-sm mb-4 leading-relaxed">{e.desc}</p>
                <div className="flex items-center gap-1 text-amber-400/50 text-xs"><MapPin className="h-3 w-3" />{e.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HISTORY TIMELINE ════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#1a0800'}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Sthala Purana</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">750 Years of Sacred History</span></h2>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{background:'linear-gradient(180deg,#b45309,#fbbf24,#b45309)'}} />
            <div className="space-y-10">
              {sthalaHistory.map((m, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)'}} />
                  <div className="card-royal rounded-2xl p-6 gold-border" style={{background:'rgba(251,191,36,0.04)'}}>
                    <span className="text-amber-400 font-black text-xl">{m.year}</span>
                    <h3 className="font-bold text-amber-200 text-lg mt-1 mb-2">{m.event}</h3>
                    <p className="text-amber-300/60 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DONATION ════════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0d0400'}}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6 float-anim">💛</div>
          <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Make an Offering</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6"><span className="gold-text">Dana Mahima — The Power of Giving</span></h2>
          <p className="text-amber-300/60 text-lg mb-12 max-w-2xl mx-auto">Every offering made with pure devotion to the Lord multiplies manifold and returns as divine grace. All donations are 80G exempt.</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
            {[51,101,251,501,1001,5001,11001,21001,51001,101001].slice(0,6).map(amt => (
              <button key={amt} onClick={()=>setSelectedAmount(amt)}
                className={`py-4 rounded-2xl font-black text-sm transition-all ${selectedAmount===amt?'text-stone-900 scale-105':'gold-border text-amber-300'}`}
                style={selectedAmount===amt?{background:'linear-gradient(135deg,#b45309,#fbbf24)',boxShadow:'0 8px 24px rgba(251,191,36,0.3)'}:{background:'rgba(251,191,36,0.05)'}}>
                ₹{amt >= 1000 ? (amt/1000)+'K' : amt}
              </button>
            ))}
          </div>
          <Link href={`/temple/${temple.slug}/donate`} className="inline-flex items-center gap-3 font-black text-xl px-12 py-5 rounded-2xl transition-all hover:scale-105" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)',color:'#0d0400',boxShadow:'0 12px 40px rgba(251,191,36,0.4)'}}>
            <Heart className="h-6 w-6" /> Offer ₹{selectedAmount.toLocaleString('en-IN')} to the Lord
          </Link>
          <p className="text-amber-300/40 text-xs mt-4">🔒 Secured by Razorpay · Instant 80G Receipt via WhatsApp</p>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#1a0800'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Devotee Voices</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Divine Experiences Shared</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name:'Sri Krishnamurthy', city:'Hyderabad', text:'The Brahmotsavam here is unlike any other. The energy, the alankara, the chanting — it takes you to another realm entirely. I attend every year without fail.', rating:5 },
              { name:'Smt. Padmavathi', city:'Singapore', text:'I watch the live darshan every morning at 5 AM Singapore time. The priests, the rituals, everything is exactly as prescribed in the Agamas. Truly blessed!', rating:5 },
              { name:'Sri Venkataramaiah', city:'Chennai', text:'Donated for Annadanam last month. The 80G receipt came on WhatsApp in 2 minutes. The entire process is so smooth. This is a truly modern temple.', rating:5 },
            ].map((t, i) => (
              <div key={i} className="card-royal rounded-2xl p-8 gold-border" style={{background:'rgba(251,191,36,0.04)'}}>
                <div className="flex gap-1 mb-4">{Array.from({length:t.rating}).map((_,j) => <Star key={j} className="h-4 w-4" style={{color:'#fbbf24', fill:'#fbbf24'}} />)}</div>
                <p className="text-amber-200/70 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)'}}>🙏</div>
                  <div>
                    <p className="font-bold text-amber-300 text-sm">{t.name}</p>
                    <p className="text-amber-300/40 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═════════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0d0400'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Darshana</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Sacred Glimpses</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[140px]">
            {[
              {label:'Rajagopuram',emoji:'🗼',span:'md:col-span-2 md:row-span-2'},
              {label:'Sanctum',emoji:'🛕',span:''},
              {label:'Maha Mandapam',emoji:'🏛️',span:''},
              {label:'Brahmotsavam',emoji:'🎭',span:''},
              {label:'Pushkarini',emoji:'💧',span:''},
              {label:'Alankara',emoji:'👑',span:''},
              {label:'Vahana Seva',emoji:'🐘',span:''},
            ].map((g, i) => (
              <div key={i} className={`card-royal rounded-2xl flex flex-col items-center justify-center gold-border ${g.span}`} style={{background:'rgba(251,191,36,0.05)'}}>
                <div className={`${i===0?'text-6xl mb-3':'text-4xl mb-2'}`}>{g.emoji}</div>
                <p className={`font-bold text-center px-2 ${i===0?'text-sm text-amber-200':'text-xs text-amber-300/70'}`}>{g.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/temple/${temple.slug}/gallery`} className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-2xl transition-all gold-border hover:scale-105" style={{color:'#fbbf24', background:'rgba(251,191,36,0.08)'}}>
              <Camera className="h-4 w-4" /> View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ══ VISIT INFO ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{background:'#1a0800'}}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Plan Your Pilgrimage</p>
          <h2 className="text-4xl font-extrabold mb-12"><span className="gold-text">How to Reach Us</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{m:'🚌 Bus',d:'KSRTC stops 200m away'},{m:'🚂 Train',d:'Station 3km, autos available'},{m:'✈️ Flight',d:'Airport 25km, cabs available'},{m:'🚗 Drive',d:'500-vehicle free parking'}].map((t,i) => (
              <div key={i} className="card-royal rounded-2xl p-5 gold-border text-center" style={{background:'rgba(251,191,36,0.04)'}}>
                <p className="text-2xl mb-2">{t.m.split(' ')[0]}</p>
                <p className="font-bold text-amber-300 text-xs mb-1">{t.m.split(' ').slice(1).join(' ')}</p>
                <p className="text-amber-300/50 text-xs">{t.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl gold-border text-center" style={{background:'rgba(251,191,36,0.04)'}}>
            <MapPin className="h-8 w-8 mx-auto mb-3" style={{color:'#fbbf24'}} />
            <p className="text-amber-200 font-bold">{address.line1 || 'Temple Street'}, {address.city || 'City'}, {address.state || 'State'}</p>
            <Link href={`/temple/${temple.slug}/contact`} className="mt-3 inline-block font-bold text-sm px-5 py-2 rounded-xl" style={{background:'linear-gradient(135deg,#b45309,#d97706)', color:'#fff'}}>Open in Maps →</Link>
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12" style={{background:'#0d0400'}}><BlockRenderer blocks={page.blocks} theme="heritage" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="py-16 px-4" style={{background:'#080200'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-black mb-3 gold-text">🕉️ {temple.name}</h3>
              <p className="text-amber-300/50 text-sm leading-relaxed">A grand ancient shrine dedicated to Lord {temple.primaryDeity || 'the Divine'} — serving pilgrims for over 750 years.</p>
            </div>
            <div>
              <h4 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-2 text-sm text-amber-300/60">
                {[['Sevas',`/temple/${temple.slug}/sevas`],['Donate',`/temple/${temple.slug}/donate`],['Events',`/temple/${temple.slug}/events`],['Gallery',`/temple/${temple.slug}/gallery`],['Live',`/temple/${temple.slug}/live`]].map(([l,h])=>(
                  <li key={l}><Link href={h} className="hover:text-amber-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest">Contact</h4>
              <ul className="space-y-2 text-sm text-amber-300/60">
                <li className="flex gap-2"><Phone className="h-4 w-4 text-amber-500" />{temple.contactPhone||'+91 98765 43210'}</li>
                <li className="flex gap-2"><Mail className="h-4 w-4 text-amber-500" />{temple.contactEmail||'info@temple.org'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest">Timings</h4>
              <p className="text-amber-300/60 text-xs">Morning: 4:30 AM – 12:00 PM<br/>Evening: 4:00 PM – 9:00 PM<br/>Daily, including holidays</p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-amber-300/30 text-xs" style={{borderColor:'rgba(251,191,36,0.1)'}}>
            © 2025 {temple.name}. All rights reserved. Powered by MandirAI OS 🕉️
          </div>
        </div>
      </footer>
    </div>
  )
}
