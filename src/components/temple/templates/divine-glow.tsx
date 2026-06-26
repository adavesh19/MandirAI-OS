'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Moon, Sun, Zap, Play, Globe, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps { temple: any; page: any; sevas: any[] }

export default function DivinGlowTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(501)
  const [activeDay, setActiveDay] = React.useState(0)

  const titleText = page?.title ? t(page.title) : `Divine Light of ${temple.name}`
  const descText = page?.description ? t(page.description) : `Experience the divine glow of Lord ${temple.primaryDeity || 'the Almighty'}. Where sacred fire meets eternal devotion.`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Nitya Archana', amount:51, desc:'108-name floral offering at dawn.', emoji:'🌸' },
    { id:'2', name:'Agni Abhishekam', amount:1001, desc:'Sacred fire-bath ritual with panchagavya.', emoji:'🔥' },
    { id:'3', name:'Kumkumarchana', amount:151, desc:'Kumkum offering to Devi with ashtottaram.', emoji:'🔴' },
    { id:'4', name:'Sahasranama Archana', amount:501, desc:'Thousand holy names with bilva/tulsi.', emoji:'📿' },
    { id:'5', name:'Annadanam', amount:2001, desc:'Sponsor meals for 200 pilgrims.', emoji:'🍛' },
    { id:'6', name:'Deepotsavam', amount:5001, desc:'1008 sacred lamps lit simultaneously.', emoji:'🪔' },
    { id:'7', name:'Devi Alankara', amount:3001, desc:'Special jewel adornment for the Goddess.', emoji:'💎' },
    { id:'8', name:'Maha Homam', amount:11001, desc:'Grand fire ritual with vedic mantra.', emoji:'🏺' },
    { id:'9', name:'Brahmotsavam Seva', amount:51000, desc:'Sponsor the annual 9-day grand utsavam.', emoji:'👑' },
  ]

  const weeklyPooja = [
    { day:'Mon', pooja:'Shiva Mahabhishekam', emoji:'🔱', glow:'rgba(99,102,241,0.3)' },
    { day:'Tue', pooja:'Anjaneya Tava Seva', emoji:'🔥', glow:'rgba(239,68,68,0.3)' },
    { day:'Wed', pooja:'Ganapathi Homam', emoji:'🐘', glow:'rgba(234,179,8,0.3)' },
    { day:'Thu', pooja:'Guru Archana', emoji:'🪔', glow:'rgba(245,158,11,0.3)' },
    { day:'Fri', pooja:'Devi Sringara', emoji:'💫', glow:'rgba(236,72,153,0.3)' },
    { day:'Sat', pooja:'Venkateswara Seva', emoji:'👑', glow:'rgba(139,92,246,0.3)' },
    { day:'Sun', pooja:'Sahasranama Pooja', emoji:'☀️', glow:'rgba(245,158,11,0.5)' },
  ]

  const notices = [
    { date:'24 Jun', title:'Deepotsavam — 1008 Lamps', desc:'All 1008 lamps lit simultaneously at 6 PM. Open to all.', tag:'Special' },
    { date:'26 Jun', title:'Agni Abhishekam Slots', desc:'Book slots for July. Limited per session.', tag:'Booking' },
    { date:'28 Jun', title:'Night Meditation Camp', desc:'Silent meditation at the temple from 9 PM to midnight.', tag:'Wellness' },
    { date:'01 Jul', title:'Brahmotsavam Registration', desc:'Sponsor individual vahana seva for the 9-day festival.', tag:'Festival' },
    { date:'05 Jul', title:'Jyotirlinga Abhishekam', desc:'Rare 12-vessel abhishekam performed once a year.', tag:'Rare' },
  ]

  const slokas = [
    { text:'ॐ नमः शिवाय', meaning:'I bow to Lord Shiva — the auspicious one.', deity:'Shiva' },
    { text:'ॐ श्री महागणपतये नमः', meaning:'I salute Lord Ganesha, the remover of obstacles.', deity:'Ganesha' },
    { text:'सर्वे भवन्तु सुखिनः', meaning:'May all beings be happy, may all be free from suffering.', deity:'Universal' },
  ]

  const aartis = [
    { time:'5:00 AM', name:'Mangala Aarti', icon:'🌄', energy:'Opening of divine gates' },
    { time:'7:00 AM', name:'Abhishekam Aarti', icon:'🏺', energy:'Water offering purification' },
    { time:'12:00 PM', name:'Rajabhoga Aarti', icon:'☀️', energy:'Peak solar energy blessing' },
    { time:'6:00 PM', name:'Sandhya Aarti', icon:'🌅', energy:'Twilight divine communion' },
    { time:'8:00 PM', name:'Shodashopachar Aarti', icon:'🌙', energy:'16-step evening worship' },
    { time:'9:00 PM', name:'Sheja Aarti', icon:'🌌', energy:'Night rest of the deity' },
  ]

  const milestones = [
    { year:'1523', event:'Divine Manifestation', desc:'Svayambhu deity discovered by a shepherd having divine vision.' },
    { year:'1789', event:'Deepotsavam Tradition', desc:'The annual 1000-lamp festival tradition started by the king.' },
    { year:'1924', event:'Trust Established', desc:'Public charitable trust registered with full transparency.' },
    { year:'2025', event:'AI Era Begins', desc:'Full digital platform with live darshan and online booking.' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="min-h-screen font-sans" style={{background:'#000000', color:'#fef3c7'}}>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes fire-flicker { 0%,100%{transform:scaleY(1) scaleX(1);opacity:1;} 30%{transform:scaleY(1.08) scaleX(0.96);opacity:0.95;} 70%{transform:scaleY(0.96) scaleX(1.04);opacity:1;} }
        @keyframes amber-glow { 0%,100%{box-shadow:0 0 20px rgba(245,158,11,0.4),0 0 60px rgba(245,158,11,0.1);} 50%{box-shadow:0 0 40px rgba(245,158,11,0.7),0 0 100px rgba(245,158,11,0.2);} }
        @keyframes float-ember { 0%{transform:translateY(0) rotate(0deg);opacity:1;} 100%{transform:translateY(-80px) rotate(20deg);opacity:0;} }
        @keyframes gold-spin { 100%{transform:rotate(360deg);} }
        @keyframes marquee { 0%{transform:translateX(100vw);} 100%{transform:translateX(-100%);} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.5;} 100%{transform:scale(1.5);opacity:0;} }
        @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
        .fire { animation: fire-flicker 0.6s ease-in-out infinite alternate; }
        .amber-glow { animation: amber-glow 2.5s ease-in-out infinite; }
        .gold-text { background:linear-gradient(90deg,#92400e,#fbbf24,#f59e0b,#fcd34d,#f59e0b,#fbbf24,#92400e); background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 5s linear infinite; }
        .ticker-anim { animation:marquee 35s linear infinite; white-space:nowrap; display:inline-block; }
        .card-glow { transition:all 0.35s ease; border:1px solid rgba(245,158,11,0.15); }
        .card-glow:hover { border-color:rgba(245,158,11,0.5); box-shadow:0 0 30px rgba(245,158,11,0.2), 0 20px 60px rgba(0,0,0,0.5); transform:translateY(-6px); }
        .seva-glow:hover { border-color:rgba(245,158,11,0.6); box-shadow:0 0 20px rgba(245,158,11,0.25); transform:translateY(-4px) scale(1.01); }
        .seva-glow { transition:all 0.3s ease; border:1px solid rgba(245,158,11,0.1); }
        .spin-slow { animation:gold-spin 60s linear infinite; }
        .btn-fire { background:linear-gradient(135deg,#b45309,#f59e0b,#d97706); transition:all 0.3s ease; }
        .btn-fire:hover { transform:scale(1.05); box-shadow:0 8px 32px rgba(245,158,11,0.5); }
        .pulse-ring { animation:pulse-ring 2s ease-out infinite; }
      `}} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background:'radial-gradient(ellipse at 50% 40%, rgba(120,50,0,0.6) 0%, rgba(60,20,0,0.4) 40%, #000 80%)'}}>
        {/* Animated fire particles */}
        {[0,1,2,3,4].map(i => (
          <div key={i} className="absolute bottom-0 text-2xl fire opacity-60 select-none" style={{left:`${15+i*18}%`, animationDelay:`${i*0.15}s`}}>🔥</div>
        ))}
        {/* Spinning mandala */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
          <div className="spin-slow w-[700px] h-[700px] rounded-full" style={{border:'1px solid #f59e0b'}} />
          <div className="absolute w-[500px] h-[500px] rounded-full" style={{border:'1px solid rgba(245,158,11,0.6)', animation:'gold-spin 40s linear infinite reverse'}} />
        </div>
        {/* Floating diyas */}
        <div className="absolute top-28 left-16 text-4xl fire select-none">🪔</div>
        <div className="absolute top-36 right-20 text-4xl fire select-none" style={{animationDelay:'0.3s'}}>🪔</div>
        <div className="absolute bottom-32 left-20 text-3xl fire select-none" style={{animationDelay:'0.6s'}}>🪔</div>
        <div className="absolute bottom-28 right-16 text-3xl fire select-none" style={{animationDelay:'0.9s'}}>🪔</div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full flex items-center justify-center text-6xl amber-glow" style={{background:'radial-gradient(circle,#7c2d12,#450a00)'}}>🕉️</div>
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest" style={{background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)', color:'#fcd34d'}}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />🔥 Sacred Fire Temple · Divine Glow
          </div>
          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-8xl leading-tight mb-6 tracking-tight">
            <span className="gold-text">{temple.name || titleText}</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed" style={{color:'rgba(254,243,199,0.7)'}}>{descText}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/temple/${temple.slug}/sevas`} className="btn-fire text-stone-900 font-black px-10 py-4 rounded-2xl flex items-center gap-2 shadow-2xl">
              🔥 Book Sacred Seva <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/temple/${temple.slug}/donate`} className="font-black px-10 py-4 rounded-2xl hover:scale-105 transition-all" style={{border:'2px solid rgba(245,158,11,0.5)', color:'#fcd34d'}}>
              💛 Offer Dana
            </Link>
            <Link href={`/temple/${temple.slug}/live`} className="font-black px-10 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2" style={{background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)', color:'#fcd34d'}}>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping inline-block" />🔴 Live Darshan
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════════════════ */}
      <div className="py-3 overflow-hidden" style={{background:'linear-gradient(90deg,#78350f,#b45309,#78350f)'}}>
        <div className="ticker-anim text-xs font-black tracking-widest text-amber-100">
          🔥 JAI MAHA KALI · JAI DURGA MATA 🪔 Deepotsavam: 1008 Lamps Tonight 6 PM ✨ Agni Abhishekam Every Morning 6 AM 🌙 Night Meditation Camp 9 PM 💛 Brahmotsavam Oct 12-21 — Register Now 🕉️
        </div>
      </div>

      {/* ══ AARTI TIMINGS ════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0a0500'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Sacred Timings</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Aarti & Pooja Timings</span></h2>
            <p className="max-w-xl mx-auto" style={{color:'rgba(254,243,199,0.5)'}}>Six sacred aarti sessions daily — each carrying its own unique spiritual energy and significance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aartis.map((a,i) => (
              <div key={i} className="card-glow rounded-2xl p-7 text-center" style={{background:'rgba(245,158,11,0.04)'}}>
                <div className="text-4xl mb-4 fire">{a.icon}</div>
                <p className="text-2xl font-black mb-1" style={{color:'#fbbf24'}}>{a.time}</p>
                <p className="font-bold text-amber-200 text-lg mb-2">{a.name}</p>
                <p className="text-xs" style={{color:'rgba(254,243,199,0.5)'}}>{a.energy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIVE DARSHAN ════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#050200'}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-black uppercase" style={{background:'rgba(239,68,68,0.2)', border:'1px solid rgba(239,68,68,0.4)', color:'#fca5a5'}}>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping inline-block" /> LIVE · Sandhya Aarti
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Watch the Sacred Flame</span></h2>
          <p className="mb-12 text-lg" style={{color:'rgba(254,243,199,0.6)'}}>The divine fire of aarti reaches every corner of the universe. Watch it live from wherever you are.</p>
          <div className="aspect-video rounded-3xl overflow-hidden border flex items-center justify-center" style={{background:'rgba(120,53,15,0.15)', borderColor:'rgba(245,158,11,0.2)'}}>
            {temple.liveStreamUrl ? (
              <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen title="Live Darshan" />
            ) : (
              <div className="text-center p-8">
                <div className="text-8xl mb-4 fire">🔥</div>
                <p className="font-bold text-xl mb-2" style={{color:'#fbbf24'}}>Sacred Fire is Burning</p>
                <p className="text-sm" style={{color:'rgba(254,243,199,0.5)'}}>Next Aarti: This Evening 6:00 PM</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ WEEKLY POOJA CALENDAR ════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0a0500'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Vara Pooja</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Weekly Ritual Calendar</span></h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeklyPooja.map((w,i) => (
              <button key={i} onClick={()=>setActiveDay(i)} className="rounded-2xl p-4 text-center transition-all" style={{background: activeDay===i ? `rgba(245,158,11,0.2)` : 'rgba(245,158,11,0.04)', border: `1px solid ${activeDay===i ? 'rgba(245,158,11,0.6)' : 'rgba(245,158,11,0.1)'}`, boxShadow: activeDay===i ? w.glow : 'none'}}>
                <div className="text-2xl mb-2">{w.emoji}</div>
                <p className="font-black text-xs uppercase" style={{color:'#fcd34d'}}>{w.day}</p>
                <p className="text-[9px] mt-1 leading-tight" style={{color:'rgba(254,243,199,0.5)'}}>{w.pooja}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEVAS GRID ══════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#050200'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Agni Seva</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="gold-text">Sacred Fire Rituals</span></h2>
            <p className="max-w-xl mx-auto" style={{color:'rgba(254,243,199,0.5)'}}>Each seva performed with sacred fire, flowers, and Vedic mantras by our most experienced priests.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sevaData.map((seva: any, i: number) => (
              <div key={seva.id} className={`seva-glow rounded-2xl p-7 cursor-pointer relative ${i===1?'lg:col-span-2':''}`} style={{background:'rgba(245,158,11,0.03)'}}>
                {i===1 && <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-1 rounded-full text-stone-900" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)'}}>🔥 Popular</div>}
                <div className="flex justify-between items-start mb-5">
                  <div className="text-4xl">{seva.emoji}</div>
                  <p className="text-2xl font-black" style={{color:'#fbbf24'}}>₹{seva.amount.toLocaleString('en-IN')}</p>
                </div>
                <h3 className="font-bold text-amber-200 text-lg mb-2">{seva.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{color:'rgba(254,243,199,0.55)'}}>{seva.desc}</p>
                <Link href={`/temple/${temple.slug}/sevas`} className="btn-fire text-stone-900 font-bold text-sm px-5 py-2.5 rounded-xl inline-flex items-center gap-1 hover:scale-105">
                  Book Seva <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SACRED SLOKAS ════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#0a0500'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Mantras</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Sacred Chants of Power</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {slokas.map((s,i) => (
              <div key={i} className="card-glow rounded-2xl p-8 text-center" style={{background:'rgba(245,158,11,0.04)'}}>
                <div className="text-5xl mb-6 fire">🕉️</div>
                <p className="text-2xl font-bold mb-4 leading-relaxed" style={{color:'#fcd34d', fontFamily:'serif'}}>{s.text}</p>
                <p className="text-sm mb-6 leading-relaxed" style={{color:'rgba(254,243,199,0.6)'}}>{s.meaning}</p>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{background:'rgba(245,158,11,0.15)', color:'#fbbf24', border:'1px solid rgba(245,158,11,0.3)'}}>{s.deity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DONATION ════════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#050200'}}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-7xl mb-6 fire">🔥</div>
          <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-4">Dana — Sacred Offering</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6"><span className="gold-text">Ignite Divine Grace</span></h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{color:'rgba(254,243,199,0.6)'}}>Every offering made with pure devotion burns away karma and attracts divine blessings. All donations 80G exempt.</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
            {[51,101,501,1001,5001,11001].map(amt => (
              <button key={amt} onClick={()=>setSelectedAmount(amt)} className={`py-4 rounded-2xl font-black text-sm transition-all ${selectedAmount===amt?'text-stone-900 scale-105':'text-amber-300'}`}
                style={selectedAmount===amt?{background:'linear-gradient(135deg,#b45309,#fbbf24)',boxShadow:'0 8px 32px rgba(245,158,11,0.4)'}:{background:'rgba(245,158,11,0.05)', border:'1px solid rgba(245,158,11,0.15)'}}>
                ₹{amt >= 1000 ? (amt/1000)+'K' : amt}
              </button>
            ))}
          </div>
          <Link href={`/temple/${temple.slug}/donate`} className="btn-fire text-stone-900 font-black text-xl px-12 py-5 rounded-2xl inline-flex items-center gap-3 shadow-2xl">
            <Heart className="h-6 w-6" /> Offer ₹{selectedAmount.toLocaleString('en-IN')} to the Sacred Fire
          </Link>
          <p className="text-xs mt-4" style={{color:'rgba(254,243,199,0.35)'}}>🔒 Razorpay Secured · 80G Receipt on WhatsApp</p>
        </div>
      </section>

      {/* ══ NOTICES ═════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{background:'#0a0500'}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Announcements</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Sacred News & Events</span></h2>
          </div>
          <div className="space-y-4">
            {notices.map((n,i) => (
              <div key={i} className="card-glow rounded-2xl p-5 flex items-start gap-4" style={{background:'rgba(245,158,11,0.03)'}}>
                <div className="shrink-0 text-center w-12">
                  <p className="text-[10px] font-bold" style={{color:'#f59e0b'}}>{n.date.split(' ')[1]}</p>
                  <p className="text-2xl font-black text-amber-200">{n.date.split(' ')[0]}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-amber-200">{n.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(245,158,11,0.15)',color:'#fbbf24'}}>{n.tag}</span>
                  </div>
                  <p className="text-sm" style={{color:'rgba(254,243,199,0.55)'}}>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HISTORY ═════════════════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{background:'#050200'}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Sacred Legacy</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">500 Years of Divine Fire</span></h2>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{background:'linear-gradient(180deg,#b45309,#fbbf24,#b45309)'}} />
            {milestones.map((m,i) => (
              <div key={i} className="relative mb-8">
                <div className="absolute -left-8 top-2 w-4 h-4 rounded-full fire" style={{background:'linear-gradient(135deg,#b45309,#fbbf24)'}} />
                <div className="card-glow rounded-2xl p-6" style={{background:'rgba(245,158,11,0.04)'}}>
                  <p className="font-black text-xl mb-1" style={{color:'#fbbf24'}}>{m.year}</p>
                  <h3 className="font-bold text-amber-200 mb-2">{m.event}</h3>
                  <p className="text-sm" style={{color:'rgba(254,243,199,0.55)'}}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{background:'#0a0500'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Gallery</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Sacred Glimpses in the Glow</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[140px]">
            {[
              {label:'Sanctum Sanctorum',emoji:'🛕',span:'md:col-span-2 md:row-span-2'},
              {label:'Deepotsavam',emoji:'🪔',span:''},
              {label:'Maha Homam',emoji:'🔥',span:''},
              {label:'Festival Night',emoji:'🎭',span:''},
              {label:'Sacred Pond',emoji:'💧',span:''},
              {label:'Deity Alankara',emoji:'💎',span:''},
              {label:'View Gallery →',emoji:'📸',span:''},
            ].map((g,i) => (
              <div key={i} className={`card-glow rounded-2xl flex flex-col items-center justify-center ${g.span}`} style={{background:'rgba(245,158,11,0.04)'}}>
                <div className={`${i===0?'text-6xl mb-3':'text-4xl mb-2'} fire`}>{g.emoji}</div>
                <p className={`font-bold text-center px-2 ${i===0?'text-sm':'text-xs'}`} style={{color: i===0?'#fcd34d':'rgba(254,243,199,0.6)'}}>{g.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISIT INFO ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{background:'#050200'}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black mb-3">Reach Us</p>
            <h2 className="text-4xl font-extrabold mb-4"><span className="gold-text">Come, Feel the Divine Glow</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{m:'🚌',t:'Bus',d:'Stop 200m away'},{m:'🚂',t:'Train',d:'3km, autos available'},{m:'✈️',t:'Flight',d:'25km, cabs available'},{m:'🚗',t:'Drive',d:'500-car free parking'}].map((t,i)=>(
              <div key={i} className="card-glow rounded-2xl p-5 text-center" style={{background:'rgba(245,158,11,0.04)'}}>
                <div className="text-3xl mb-2">{t.m}</div>
                <p className="font-bold text-amber-300 text-sm mb-1">{t.t}</p>
                <p className="text-xs" style={{color:'rgba(254,243,199,0.5)'}}>{t.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 card-glow rounded-2xl p-6 text-center" style={{background:'rgba(245,158,11,0.04)'}}>
            <MapPin className="h-8 w-8 mx-auto mb-3" style={{color:'#f59e0b'}} />
            <p className="font-bold text-amber-200">{address.line1||'Temple Road'}, {address.city||'City'}, {address.state||'State'}</p>
            <Link href={`/temple/${temple.slug}/contact`} className="btn-fire text-stone-900 font-bold text-sm px-5 py-2 rounded-xl mt-3 inline-block">Open in Maps →</Link>
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12" style={{background:'#0a0500'}}><BlockRenderer blocks={page.blocks} theme="glow" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="py-16 px-4" style={{background:'#030100'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="font-black text-xl mb-3 gold-text">🔥 {temple.name}</h3>
              <p className="text-sm leading-relaxed" style={{color:'rgba(254,243,199,0.4)'}}>Where sacred fire meets eternal devotion. Serving divine seekers for 500+ years.</p>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:'#f59e0b'}}>Quick Links</h4>
              <ul className="space-y-2 text-sm" style={{color:'rgba(254,243,199,0.5)'}}>
                {[['Sevas',`/temple/${temple.slug}/sevas`],['Donate',`/temple/${temple.slug}/donate`],['Events',`/temple/${temple.slug}/events`],['Gallery',`/temple/${temple.slug}/gallery`],['Live',`/temple/${temple.slug}/live`]].map(([l,h])=>(
                  <li key={l}><Link href={h} className="hover:text-amber-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:'#f59e0b'}}>Contact</h4>
              <ul className="space-y-2 text-sm" style={{color:'rgba(254,243,199,0.5)'}}>
                <li className="flex gap-2"><Phone className="h-4 w-4" style={{color:'#f59e0b'}} />{temple.contactPhone||'+91 98765 43210'}</li>
                <li className="flex gap-2"><Mail className="h-4 w-4" style={{color:'#f59e0b'}} />{temple.contactEmail||'info@temple.org'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:'#f59e0b'}}>Timings</h4>
              <p className="text-sm" style={{color:'rgba(254,243,199,0.5)'}}>5:00 AM – 12:00 PM<br/>4:00 PM – 9:00 PM<br/>Open all 365 days</p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-xs" style={{borderColor:'rgba(245,158,11,0.1)', color:'rgba(254,243,199,0.25)'}}>
            © 2025 {temple.name}. All rights reserved. Powered by MandirAI OS 🕉️
          </div>
        </div>
      </footer>
    </div>
  )
}
