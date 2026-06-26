'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Building2, Award, Sun, Moon, Globe, Shield, Zap, ChevronRight, Play, Gift } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function ClassicCalmTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(501)
  const [hoveredSeva, setHoveredSeva] = React.useState<string|null>(null)
  const [expandedFaq, setExpandedFaq] = React.useState<number|null>(null)

  const titleText = page?.title ? t(page.title) : `Welcome to ${temple.name}`
  const descText = page?.description ? t(page.description) : `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. May the divine blessings be with you always.</p>`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Nitya Archana', amount:51, description:'Daily name-recitation offered to the deity with flowers.', durationMinutes:15 },
    { id:'2', name:'Abhishekam', amount:501, description:'Sacred bath of deity with milk, honey, and flowers.', durationMinutes:45 },
    { id:'3', name:'Kumkumarchana', amount:151, description:'Kumkum offering with chanting of ashtottaram.', durationMinutes:20 },
    { id:'4', name:'Sahasranama Archana', amount:251, description:'108/1000 name recitation with bilva/tulsi.', durationMinutes:60 },
    { id:'5', name:'Annadanam Seva', amount:1001, description:'Sponsor free meals for pilgrims visiting the temple.', durationMinutes:0 },
    { id:'6', name:'Maha Pooja', amount:5001, description:'Grand ritual with 16-step upacharas and full orchestration.', durationMinutes:90 },
    { id:'7', name:'Ekadasa Abhishekam', amount:11001, description:'Elaborate 11-vessel abhishekam with vedic chanting.', durationMinutes:120 },
    { id:'8', name:'Dolotsavam', amount:1501, description:'Deity adorned and placed on decorated swing.', durationMinutes:30 },
    { id:'9', name:'Brahmotsavam Sponsor', amount:51000, description:'Sponsor the annual grand festival celebrated over 9 days.', durationMinutes:0 },
  ]

  const events = [
    { id:'1', name:'Ganesh Chaturthi', date:'26 Aug', type:'FESTIVAL', desc:'Grand 10-day festival with processions and cultural programs.', location:'Main Mandapam', color:'bg-orange-100 border-orange-300' },
    { id:'2', name:'Navaratri Celebration', date:'02 Oct', type:'FESTIVAL', desc:'Nine nights of Devi worship with classical dance and music.', location:'Natya Mandapam', color:'bg-red-50 border-red-200' },
    { id:'3', name:'Diwali Maha Pooja', date:'20 Oct', type:'POOJA', desc:'Special midnight pooja with 1000 lamps lit simultaneously.', location:'Sanctum', color:'bg-yellow-50 border-yellow-300' },
    { id:'4', name:'Shivaratri Abhishekam', date:'26 Feb', type:'POOJA', desc:'All-night Shiva worship with rudrabhishekam every 3 hours.', location:'Shiva Shrine', color:'bg-blue-50 border-blue-200' },
    { id:'5', name:'Rama Navami', date:'06 Apr', type:'FESTIVAL', desc:'Rama Kalyanam and cultural programs for devotees.', location:'Main Hall', color:'bg-green-50 border-green-200' },
    { id:'6', name:'Janmashtami', date:'16 Aug', type:'FESTIVAL', desc:'Krishna Jayanti with midnight abhishekam and bhajans.', location:'Krishna Mandir', color:'bg-purple-50 border-purple-200' },
  ]

  const stats = [
    { label:'Years of Heritage', value:'500+', icon:'🏛️', sub:'Established since ancient times' },
    { label:'Monthly Devotees', value:'25,000+', icon:'🙏', sub:'Souls blessed every month' },
    { label:'Daily Sevas', value:'50+', icon:'🪔', sub:'Rituals performed each day' },
    { label:'Annual Festivals', value:'12', icon:'🎉', sub:'Grand celebrations yearly' },
    { label:'Priests & Staff', value:'85+', icon:'👳', sub:'Dedicated seva team' },
    { label:'Countries Served', value:'32', icon:'🌏', sub:'Global devotee community' },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'Sri Swami Krishnananda', role:'Peethadhipati / Head Priest', bio:'Leading the temple for over 25 years with deep spiritual knowledge and dedication to dharmic service.', avatar:'🙏' },
    { name:'Sri Ramachandra Reddy', role:'Executive President', bio:'Overseeing all administrative and charitable activities of the temple trust with transparency.', avatar:'👤' },
    { name:'Sri Venkateshwara Rao', role:'Managing Secretary', bio:'Coordinating between departments and ensuring smooth temple operations for all devotees.', avatar:'👤' },
    { name:'Smt. Saraswathi Devi', role:'Trustee & Cultural Head', bio:'Organising all cultural programs, music festivals, and educational activities since 2005.', avatar:'🙏' },
  ]

  const schedule = [
    { time:'5:00 AM', event:'Suprabhatam & Mangala Aarti', icon:'🌄' },
    { time:'6:00 AM', event:'Deity Adorned — Morning Alankara', icon:'🌸' },
    { time:'7:00 AM', event:'Nitya Abhishekam & Morning Archana', icon:'🪔' },
    { time:'9:00 AM', event:'Kalasha Pooja & Sahasranama Archana', icon:'🏺' },
    { time:'12:00 PM', event:'Noon Aarti (Rajabhoga) — Temple Closes', icon:'☀️' },
    { time:'4:00 PM', event:'Temple Reopens — Afternoon Archana', icon:'🌤️' },
    { time:'6:00 PM', event:'Dolotsavam & Sandhya Aarti', icon:'🌆' },
    { time:'7:30 PM', event:'Ekanta Seva — Deity Rests', icon:'🌙' },
    { time:'8:30 PM', event:'Sheja Aarti — Temple Closes', icon:'⭐' },
  ]

  const galleryItems = [
    { label:'Sanctum Sanctorum', color:'bg-amber-100', emoji:'🛕', span:'col-span-2 row-span-2' },
    { label:'Maha Mandapam', color:'bg-stone-200', emoji:'🏛️', span:'col-span-1 row-span-1' },
    { label:'Festival Celebrations', color:'bg-orange-100', emoji:'🎉', span:'col-span-1 row-span-1' },
    { label:'Annadanam Hall', color:'bg-yellow-50', emoji:'🍲', span:'col-span-1 row-span-1' },
    { label:'Rajagopuram', color:'bg-amber-50', emoji:'🗼', span:'col-span-1 row-span-1' },
    { label:'Temple Pond', color:'bg-blue-50', emoji:'💧', span:'col-span-1 row-span-1' },
    { label:'Navagraha Shrine', color:'bg-purple-50', emoji:'⭐', span:'col-span-1 row-span-1' },
  ]

  const features = [
    { icon: <Zap className="h-6 w-6" />, title:'Online Seva Booking', desc:'Book any seva from home with instant confirmation and receipt.' },
    { icon: <Shield className="h-6 w-6" />, title:'80G Tax Exemption', desc:'All donations are 80G certified. Auto-receipts generated instantly.' },
    { icon: <Globe className="h-6 w-6" />, title:'Multi-Language', desc:'Temple info available in English, Hindi, Telugu, Tamil & Kannada.' },
    { icon: <Play className="h-6 w-6" />, title:'Live Darshan', desc:'Watch live aarti and puja from anywhere in the world, 24/7.' },
    { icon: <Gift className="h-6 w-6" />, title:'Prasadam Delivery', desc:'Receive sacred prasadam delivered to your doorstep across India.' },
    { icon: <Users className="h-6 w-6" />, title:'Devotee Community', desc:'Connect with 25,000+ devotees in our online spiritual community.' },
  ]

  const testimonials = [
    { name:'Priya Sharma', city:'Bengaluru', text:'The online seva booking is so convenient. I book Abhishekam every Monday from my office in minutes. The temple experience is truly divine!', rating:5, avatar:'🙏' },
    { name:'Rajan Nair', city:'Dubai', text:'Being overseas, I was worried I could not participate. Now I watch Live Darshan every morning and feel connected to the temple. Blessed!', rating:5, avatar:'😊' },
    { name:'Dr. Meena Krishnan', city:'Chennai', text:'The 80G receipts are generated automatically on WhatsApp. Zero paperwork, full tax benefit. This temple has embraced the digital age beautifully.', rating:5, avatar:'🙏' },
  ]

  const slokas = [
    { sanskrit:'त्वमेव माता च पिता त्वमेव, त्वमेव बन्धुश्च सखा त्वमेव।', transliteration:'Tvameva Mata cha Pita Tvameva', meaning:'You alone are my mother and my father, you alone are my friend and companion, O Lord.', deity:'Sarva Devata' },
    { sanskrit:'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्', transliteration:'Shantakaram Bhujagashayanam', meaning:'O Lord with serene form, resting on the serpent, with lotus on your navel, master of Gods.', deity:'Lord Vishnu' },
    { sanskrit:'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ', transliteration:'Vakratunda Mahakaya', meaning:'O Ganesha, with curved trunk and mighty body, with the radiance of a million suns.', deity:'Lord Ganesha' },
  ]

  const weeklyPooja = [
    { day:'Mon', pooja:'Shiva Abhishekam', color:'bg-blue-100 text-blue-800', emoji:'🔱' },
    { day:'Tue', pooja:'Hanuman Pooja', color:'bg-orange-100 text-orange-800', emoji:'🐒' },
    { day:'Wed', pooja:'Ganapathi Homam', color:'bg-red-100 text-red-800', emoji:'🐘' },
    { day:'Thu', pooja:'Guru Archana', color:'bg-yellow-100 text-yellow-800', emoji:'🪔' },
    { day:'Fri', pooja:'Devi Kumkumarchana', color:'bg-pink-100 text-pink-800', emoji:'🌸' },
    { day:'Sat', pooja:'Venkateswara Seva', color:'bg-purple-100 text-purple-800', emoji:'🏵️' },
    { day:'Sun', pooja:'Sahasranama Pooja', color:'bg-amber-100 text-amber-800', emoji:'☀️' },
  ]

  const notices = [
    { date:'24 Jun', title:'Special Annadanam on Ekadasi', desc:'Free meals for all devotees from 11 AM to 2 PM on the auspicious Ekadasi day.', badge:'Food', badgeColor:'bg-green-100 text-green-700' },
    { date:'26 Jun', title:'Abhishekam Slots Now Open', desc:'Book your preferred Abhishekam slot for July. Limited seats per session.', badge:'Booking', badgeColor:'bg-blue-100 text-blue-700' },
    { date:'28 Jun', title:'Bhagavad Gita Class Resumes', desc:'Weekly Gita discourse every Sunday at 9 AM in the Kalyana Mantapam.', badge:'Education', badgeColor:'bg-purple-100 text-purple-700' },
    { date:'01 Jul', title:'Annual Brahmotsavam Registration', desc:'Sponsor seva for Brahmotsavam 2025. Early registration discounts available.', badge:'Festival', badgeColor:'bg-orange-100 text-orange-700' },
    { date:'05 Jul', title:'Yoga & Meditation Camp', desc:'Free yoga sessions for devotees every morning at 6 AM on temple grounds.', badge:'Wellness', badgeColor:'bg-teal-100 text-teal-700' },
  ]

  const faqs = [
    { q:'What are the darshan timings?', a:'The temple is open from 5:00 AM to 12:00 PM and 4:00 PM to 8:30 PM daily. Special poojas may extend timings on festival days.' },
    { q:'How do I book a seva online?', a:'Click on the "Book Seva" button, select your preferred seva, choose a date and time slot, and complete the payment. You will receive instant confirmation on WhatsApp.' },
    { q:'Are donations 80G tax exempt?', a:'Yes! All donations to the temple trust are eligible for 80G tax deduction. You will receive an automated PDF receipt via email and WhatsApp immediately after payment.' },
    { q:'Is there parking available?', a:'Yes, free parking is available for up to 500 vehicles inside the temple complex. Separate parking for two-wheelers and four-wheelers.' },
    { q:'Can I watch the aarti online?', a:'Yes! We livestream all major aartis (5:00 AM, 12:00 PM, 6:00 PM) on YouTube. Visit the Live Darshan section for the link.' },
  ]

  const milestones = [
    { year:'1523', event:'Temple Founded', desc:'Original shrine established by royal patronage of the local kingdom.' },
    { year:'1789', event:'Gopuram Construction', desc:'The magnificent 7-tiered Rajagopuram built under the patronage of the Nizam.' },
    { year:'1924', event:'Temple Trust Formed', desc:'Registered charitable trust established for transparent administration.' },
    { year:'1987', event:'Major Renovation', desc:'Complete renovation of inner sanctum and Maha Mandapam completed.' },
    { year:'2015', event:'Digital Transformation', desc:'Online booking, livestreaming, and digital receipts launched.' },
    { year:'2025', event:'AI-Powered Platform', desc:'Full AI management platform launched for seamless devotee experience.' },
  ]

  const prasadItems = [
    { name:'Laddu', desc:'Signature sweet prasad made daily with pure ghee', emoji:'🟡', price:'Free' },
    { name:'Panchamrit', desc:'Sacred mixture of milk, honey, curd, ghee & sugar', emoji:'🏺', price:'₹25' },
    { name:'Sacred Flowers', desc:'Blessed flowers from the deity abhishekam', emoji:'🌸', price:'Free' },
    { name:'Vibhuti', desc:'Holy ash from the sacred fire ritual (homa)', emoji:'⚪', price:'Free' },
    { name:'Prasad Thali', desc:'Complete meal blessed by the deity', emoji:'🍛', price:'₹50' },
    { name:'Special Box', desc:'Festival prasad box with 5 different items', emoji:'🎁', price:'₹150' },
  ]

  const address = temple.address as any || {}

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-diya { 0%,100%{transform:translateY(0) rotate(-3deg);} 50%{transform:translateY(-12px) rotate(3deg);} }
        @keyframes spin-mandala { 100%{transform:rotate(360deg);} }
        @keyframes spin-reverse { 100%{transform:rotate(-360deg);} }
        @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
        @keyframes marquee { 0%{transform:translateX(100vw);} 100%{transform:translateX(-100%);} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 8px rgba(249,115,22,0.4);} 50%{box-shadow:0 0 24px rgba(249,115,22,0.8);} }
        @keyframes fade-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        .diya-float { animation: float-diya 3s ease-in-out infinite; }
        .diya-float-2 { animation: float-diya 3.5s ease-in-out infinite 0.5s; }
        .diya-float-3 { animation: float-diya 4s ease-in-out infinite 1s; }
        .mandala-spin { animation: spin-mandala 40s linear infinite; }
        .mandala-reverse { animation: spin-reverse 30s linear infinite; }
        .ticker-scroll { animation: marquee 30s linear infinite; white-space: nowrap; display: inline-block; }
        .glow-pulse { animation: pulse-glow 2s ease-in-out infinite; }
        .shimmer-text { background: linear-gradient(90deg, #92400e, #f59e0b, #f97316, #f59e0b, #92400e); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
        .card-3d { transition: transform 0.4s ease, box-shadow 0.4s ease; perspective: 1000px; }
        .card-3d:hover { transform: translateY(-8px) rotateX(4deg) rotateY(-4deg); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        .seva-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 16px 48px rgba(249,115,22,0.15); }
        .seva-card { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .gallery-item:hover { transform: scale(1.04) rotateZ(-1deg); z-index: 10; }
        .gallery-item { transition: transform 0.3s ease; cursor: pointer; }
        .stat-card:hover { transform: translateY(-4px) scale(1.03); }
        .stat-card { transition: all 0.3s ease; }
        .section-ornament { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 16px; }
        .section-ornament::before, .section-ornament::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #f59e0b, transparent); }
      `}} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
        {/* Mandala background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-8">
          <div className="mandala-spin w-[700px] h-[700px] border-[2px] border-amber-300/30 rounded-full flex items-center justify-center">
            <div className="mandala-reverse w-[550px] h-[550px] border-[2px] border-orange-300/25 rounded-full flex items-center justify-center">
              <div className="mandala-spin w-[400px] h-[400px] border-[2px] border-amber-400/20 rounded-full" />
            </div>
          </div>
        </div>
        {/* Floating diyas */}
        <div className="absolute top-24 left-16 text-5xl diya-float select-none">🪔</div>
        <div className="absolute top-40 right-20 text-4xl diya-float-2 select-none">🪔</div>
        <div className="absolute bottom-32 left-24 text-3xl diya-float-3 select-none">🪔</div>
        <div className="absolute bottom-24 right-16 text-5xl diya-float select-none">🕉️</div>
        <div className="absolute top-32 left-1/3 text-2xl diya-float-2 opacity-60 select-none">✨</div>
        <div className="absolute bottom-40 right-1/3 text-2xl diya-float-3 opacity-60 select-none">✨</div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Om symbol */}
          <div className="text-8xl md:text-9xl mb-6 select-none" style={{fontFamily:'serif', color:'#b45309', textShadow:'0 0 40px rgba(245,158,11,0.5)'}}>🕉️</div>

          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-300/60 text-amber-800 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
            {temple.templeType || 'Hindu'} Temple · Est. 1523
          </div>

          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl text-stone-900 leading-tight mb-4 tracking-tight">
            <span className="shimmer-text">{temple.name || titleText}</span>
          </h1>
          <p className="text-stone-600 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">{descText}</p>

          {/* Live Darshan badge */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black uppercase px-4 py-2 rounded-full mb-10 glow-pulse mr-4">
            <span className="w-2 h-2 bg-white rounded-full animate-ping inline-block" />🔴 Live Darshan Active
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <Link href={`/temple/${temple.slug}/sevas`} className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-105 hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2">
              <span>🪔</span> Book a Seva <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={`/temple/${temple.slug}/donate`} className="group bg-white border-2 border-amber-400 text-amber-800 font-bold px-8 py-4 rounded-2xl hover:bg-amber-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" /> Make a Donation
            </Link>
            <Link href={`/temple/${temple.slug}/live`} className="group bg-stone-900 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Play className="h-5 w-5 text-red-400" /> Live Darshan
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fafaf9"/>
          </svg>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════════════════ */}
      <div className="bg-amber-600 text-white py-3 overflow-hidden">
        <div className="ticker-scroll text-sm font-semibold tracking-wide">
          🕉️ &nbsp;&nbsp; Aaj ka Tithi: Ekadasi &nbsp;&nbsp; 🪔 &nbsp;&nbsp; Abhishekam at 7:00 AM &nbsp;&nbsp; 🌸 &nbsp;&nbsp; Navaratri starts Oct 2 — Book your seva slot now! &nbsp;&nbsp; 🙏 &nbsp;&nbsp; Annadanam daily at 12 PM — All are welcome &nbsp;&nbsp; 📢 &nbsp;&nbsp; Brahmotsavam Registration Open for 2025 &nbsp;&nbsp; ✨ &nbsp;&nbsp; Free Yoga Camp every Sunday 6 AM &nbsp;&nbsp; 🕉️ &nbsp;&nbsp;
        </div>
      </div>

      {/* ══ PANCHANGAM WIDGET ════════════════════════════════════════════ */}
      <section className="py-10 px-4 bg-gradient-to-r from-amber-800 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-200 text-xs uppercase tracking-widest text-center mb-6 font-bold">आज का पंचांग • Today&apos;s Panchang</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label:'Tithi', value:'Ekadasi', sub:'11th lunar day', emoji:'🌙' },
              { label:'Nakshatra', value:'Rohini', sub:'Star of the day', emoji:'⭐' },
              { label:'Vara', value:'Mangalavara', sub:'Tuesday', emoji:'🔴' },
              { label:'Yoga', value:'Siddha', sub:'Auspicious yoga', emoji:'✅' },
              { label:'Karana', value:'Bava', sub:'Half-day period', emoji:'🕐' },
              { label:'Sunrise', value:'5:52 AM', sub:'Suryodayam', emoji:'🌅' },
            ].map(p => (
              <div key={p.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                <div className="text-2xl mb-1">{p.emoji}</div>
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">{p.label}</p>
                <p className="font-black text-sm text-white">{p.value}</p>
                <p className="text-[9px] text-amber-300">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS BENTO ══════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Our Legacy</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">A Temple of Numbers That Matter</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Five centuries of unbroken tradition, now powered by modern technology for seamless devotee service.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="stat-card bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center cursor-default">
                <div className="text-4xl mb-3">{s.icon}</div>
                <p className="text-3xl font-black text-amber-700 mb-1">{s.value}</p>
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wide">{s.label}</p>
                <p className="text-[10px] text-stone-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIVE DARSHAN ════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-500 mandala-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-orange-500 mandala-reverse" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-ping inline-block" /> LIVE NOW
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-amber-400">Live Darshan & Aarti Stream</h2>
          <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">Watch the sacred rituals live from anywhere in the world. The divine blessings reach you wherever you are.</p>
          <div className="aspect-video bg-stone-800 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 flex items-center justify-center mb-8">
            {temple.liveStreamUrl ? (
              <iframe src={temple.liveStreamUrl} className="w-full h-full" allowFullScreen title="Live Darshan" />
            ) : (
              <div className="text-center">
                <div className="text-7xl mb-4">🛕</div>
                <p className="text-amber-400 font-bold text-xl">Live Stream</p>
                <p className="text-stone-400 text-sm mt-2">Next Aarti: 6:00 PM Today</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">● LIVE at 6:00 PM</div>
                  <div className="bg-stone-700 text-stone-300 text-xs px-3 py-1.5 rounded-full">📺 YouTube Stream</div>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {['Morning Aarti • 5 AM','Noon Aarti • 12 PM','Evening Aarti • 6 PM'].map(a => (
              <div key={a} className="bg-stone-800 border border-amber-500/20 rounded-xl p-3 text-center">
                <p className="text-amber-400 text-xs font-bold">{a.split('•')[0]}</p>
                <p className="text-stone-400 text-[10px]">{a.split('•')[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEVAS BENTO GRID ════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Sacred Rituals</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Book a Seva for the Divine</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Each seva is performed by our trained priests with the highest devotion and adherence to Vedic tradition.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sevaData.slice(0, 9).map((seva: any, i: number) => (
              <div
                key={seva.id}
                className={`seva-card bg-white rounded-2xl border-2 p-6 cursor-pointer relative overflow-hidden ${hoveredSeva === seva.id ? 'border-amber-500' : 'border-stone-100 hover:border-amber-300'} ${i === 0 ? 'lg:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredSeva(seva.id)}
                onMouseLeave={() => setHoveredSeva(null)}
              >
                {i === 0 && <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-full">⭐ Most Popular</div>}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{'🪔🏺🌸🔱🍚🙏🏛️⚡🎉'[i] || '🕉️'}</div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-amber-600">₹{seva.amount}</p>
                    {seva.durationMinutes > 0 && <p className="text-xs text-stone-400">{seva.durationMinutes} min</p>}
                  </div>
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{seva.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-5">{seva.description}</p>
                <Link href={`/temple/${temple.slug}/sevas`} className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors">
                  Book Now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/temple/${temple.slug}/sevas`} className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-700 font-bold px-8 py-3 rounded-2xl hover:bg-amber-50 transition-colors">
              View All {sevaData.length} Sevas <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WEEKLY POOJA CALENDAR ═══════════════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Weekly Calendar</span></div>
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-4">Daily Puja Schedule</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-12">Each day of the week is dedicated to a specific deity with a special pooja.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklyPooja.map((w, i) => (
              <div key={i} className={`card-3d rounded-2xl p-5 text-center border ${w.color.replace('text-','border-').replace('bg-','border-').split(' ')[0]} ${w.color}`}>
                <div className="text-3xl mb-3">{w.emoji}</div>
                <p className="font-black text-sm uppercase tracking-wider mb-1">{w.day}</p>
                <p className="text-xs font-semibold leading-tight">{w.pooja}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DAILY SCHEDULE TIMELINE ══════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Darshan Timings</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Daily Temple Schedule</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-16">From Suprabhatam at dawn to Sheja Aarti at night — a complete day of sacred service to the deity.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.map((s, i) => (
              <div key={i} className="card-3d flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 hover:border-amber-400">
                <div className="shrink-0 w-12 h-12 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center text-center leading-tight">{s.time.replace(' ','<br/>')}</div>
                <div>
                  <div className="text-lg mr-2 inline">{s.icon}</div>
                  <span className="font-semibold text-stone-800">{s.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FESTIVAL EVENTS ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Upcoming Events</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Festival & Pooja Calendar</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Join us for these sacred celebrations throughout the year.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((e) => (
              <div key={e.id} className={`card-3d border-2 ${e.color} rounded-2xl p-6 bg-white`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${e.type === 'FESTIVAL' ? 'bg-amber-500 text-white' : 'bg-orange-600 text-white'}`}>{e.type}</span>
                  <span className="text-sm font-bold text-stone-500">{e.date}</span>
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{e.name}</h3>
                <p className="text-stone-500 text-sm mb-3 leading-relaxed">{e.desc}</p>
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <MapPin className="h-3 w-3" /> {e.location}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/temple/${temple.slug}/events`} className="inline-flex items-center gap-2 bg-amber-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-amber-700 transition-colors">
              View Full Event Calendar <CalendarDays className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ GALLERY MOSAIC ═══════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Temple Gallery</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Sacred Spaces & Moments</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Glimpses of our temple, festivals, and the divine moments captured over the years.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px]">
            {galleryItems.map((g, i) => (
              <div key={i} className={`gallery-item rounded-2xl overflow-hidden ${g.color} border border-stone-200 flex flex-col items-center justify-center ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`text-center ${i === 0 ? 'text-7xl mb-4' : 'text-4xl mb-2'}`}>{g.emoji}</div>
                <p className={`font-bold text-stone-700 text-center px-2 ${i === 0 ? 'text-base' : 'text-xs'}`}>{g.label}</p>
              </div>
            ))}
            <div className="gallery-item rounded-2xl bg-amber-600 flex items-center justify-center cursor-pointer">
              <Link href={`/temple/${temple.slug}/gallery`} className="text-white font-black text-center text-sm px-4">
                <Camera className="h-6 w-6 mx-auto mb-2" />
                View All Photos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SACRED SLOKAS ════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament" style={{color:'#fbbf24'}}><span className="text-amber-300 font-bold text-sm uppercase tracking-widest">Daily Mantras</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-300 text-center mb-4">Sacred Slokas & Prayers</h2>
          <p className="text-amber-200/70 text-center max-w-xl mx-auto mb-14">Begin your day with these sacred verses. Let the divine vibrations fill your heart.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {slokas.map((s, i) => (
              <div key={i} className="card-3d bg-white/5 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/50">
                <div className="text-3xl mb-4">🕉️</div>
                <p className="text-amber-200 font-bold text-base mb-3 leading-relaxed" style={{fontFamily:'serif'}}>&ldquo;{s.sanskrit}&rdquo;</p>
                <p className="text-amber-400/80 text-xs italic mb-4">{s.transliteration}</p>
                <p className="text-stone-300 text-sm leading-relaxed border-t border-amber-500/20 pt-4">{s.meaning}</p>
                <div className="mt-4">
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full font-bold">{s.deity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DONATION SECTION ═════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Seva & Donations</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Offer Your Sacred Contribution</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Every donation, large or small, is a step towards moksha. All contributions are 80G tax exempt.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-bold text-stone-700 mb-4">Select Donation Amount</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[51, 101, 251, 501, 1001, 5001].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 rounded-xl font-black text-sm border-2 transition-all ${selectedAmount === amt ? 'bg-amber-500 text-white border-amber-500 scale-105 shadow-lg shadow-amber-500/30' : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400'}`}
                  >₹{amt.toLocaleString('en-IN')}</button>
                ))}
              </div>
              <div className="flex gap-3 mb-6">
                <input type="number" placeholder="Custom amount" className="flex-1 border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:outline-none" />
              </div>
              <Link href={`/temple/${temple.slug}/donate`} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-orange-500/30">
                <Heart className="h-5 w-5" /> Donate ₹{selectedAmount.toLocaleString('en-IN')} Now
              </Link>
              <p className="text-center text-xs text-stone-400 mt-3">🔒 Secured by Razorpay · 80G Receipt via WhatsApp</p>
            </div>
            <div className="space-y-3">
              {[
                { icon:'🏗️', title:'Temple Renovation Fund', desc:'Help restore ancient pillars and sanctum', progress:67 },
                { icon:'🍲', title:'Annadanam Sponsorship', desc:'Feed 500 pilgrims daily for a month', progress:45 },
                { icon:'📚', title:'Veda Pathashala', desc:'Fund education for 20 young priests', progress:82 },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{c.title}</p>
                      <p className="text-stone-400 text-xs">{c.desc}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all" style={{width:`${c.progress}%`}} />
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{c.progress}% funded</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRASAD MENU ══════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Prasadam</span></div>
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-4">Sacred Prasad Available</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-12">Receive the blessed prasad after your darshan or order it to your home.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {prasadItems.map((p, i) => (
              <div key={i} className="card-3d bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-3">{p.emoji}</div>
                <p className="font-bold text-stone-800 text-sm mb-1">{p.name}</p>
                <p className="text-stone-400 text-[10px] mb-3 leading-tight">{p.desc}</p>
                <span className={`text-xs font-black px-2 py-1 rounded-full ${p.price === 'Free' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NOTICES BOARD ════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Announcements</span></div>
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-4">Latest Temple Notices</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-12">Stay updated with upcoming events, special poojas, and temple news.</p>
          <div className="space-y-4">
            {notices.map((n, i) => (
              <div key={i} className="card-3d bg-white border border-stone-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md">
                <div className="shrink-0 text-center">
                  <p className="text-xs font-bold text-amber-600 uppercase">{n.date.split(' ')[1]}</p>
                  <p className="text-2xl font-black text-stone-900">{n.date.split(' ')[0]}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-900">{n.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${n.badgeColor}`}>{n.badge}</span>
                  </div>
                  <p className="text-stone-500 text-sm">{n.desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-stone-300 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES GRID ════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Digital Temple</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Modern Conveniences, Ancient Traditions</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">We have digitized every aspect of temple service to make your spiritual journey seamless.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-3d group bg-gradient-to-br from-stone-50 to-amber-50/50 border border-stone-100 rounded-2xl p-8 hover:border-amber-300">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-white transition-colors">{f.icon}</div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{f.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Devotee Stories</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Blessings From Our Devotees</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Real experiences from real devotees who found peace and blessings here.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-3d bg-white rounded-2xl p-8 shadow-sm border border-amber-100 hover:border-amber-300 hover:shadow-lg">
                <div className="flex gap-1 mb-4">{Array.from({length:t.rating}).map((_,j) => <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                    <p className="text-stone-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEADERSHIP BOARD ════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Leadership</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 text-center mb-4">Trust Board & Spiritual Leadership</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-14">Our temple is guided by experienced spiritual leaders and dedicated trustees committed to dharmic service.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustees.map((trustee, i) => (
              <div key={i} className="card-3d bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-200 flex items-center justify-center text-4xl mb-4">{trustee.avatar}</div>
                <h3 className="font-bold text-stone-900 mb-1">{trustee.name}</h3>
                <p className="text-amber-700 text-xs font-bold uppercase tracking-wide mb-3">{trustee.role}</p>
                <p className="text-stone-500 text-xs leading-relaxed">{trustee.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HISTORY TIMELINE ════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="section-ornament" style={{color:'#fbbf24'}}><span className="text-amber-300 font-bold text-sm uppercase tracking-widest">Our Heritage</span></div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-300 text-center mb-4">500 Years of Sacred History</h2>
          <p className="text-stone-400 text-center max-w-xl mx-auto mb-16">From a small forest shrine to a landmark of devotion — our journey through the centuries.</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-500/30" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-xs shrink-0 z-10">{i+1}</div>
                  <div className="flex-1 bg-white/5 border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-amber-400 font-black text-lg">{m.year}</span>
                      <h3 className="font-bold text-white">{m.event}</h3>
                    </div>
                    <p className="text-stone-400 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Help & Info</span></div>
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-stone-500 text-center max-w-xl mx-auto mb-12">Everything you need to know before your visit or booking.</p>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-50 transition-colors">
                  <span className="font-bold text-stone-900 pr-4">{f.q}</span>
                  <ChevronRight className={`h-5 w-5 text-amber-500 shrink-0 transition-transform ${expandedFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed bg-amber-50/50">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VOLUNTEER CTA ════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Seva Opportunities</span></div>
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-12">Serve the Divine — Volunteer With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji:'🍲', title:'Annadanam Volunteers', desc:'Help serve free meals to 500+ pilgrims every day. Shifts available morning and noon.', cta:'Join Kitchen Seva' },
              { emoji:'🧹', title:'Temple Cleaning Seva', desc:'Keep the temple premises spotless. Join our early morning cleaning brigade.', cta:'Join Cleaning Seva' },
              { emoji:'📚', title:'Veda Pathashala Teachers', desc:'Teach Sanskrit, music, or classical arts to young students at our temple school.', cta:'Become a Teacher' },
            ].map((v, i) => (
              <div key={i} className="card-3d bg-white border border-amber-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{v.emoji}</div>
                <h3 className="font-bold text-stone-900 text-xl mb-3">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{v.desc}</p>
                <Link href={`/temple/${temple.slug}/community`} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">{v.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISIT INFO ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-ornament"><span className="text-amber-600 font-bold text-sm uppercase tracking-widest">Plan Your Visit</span></div>
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-14">How to Reach the Temple</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-stone-100 rounded-3xl overflow-hidden h-72 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <p className="font-bold text-stone-700">{address.line1 || 'Temple Road'}, {address.city || 'City'}</p>
                <p className="text-stone-500 text-sm">{address.state || 'State'} — {address.pincode || ''}</p>
                <Link href={`/temple/${temple.slug}/contact`} className="mt-4 inline-block bg-amber-500 text-white font-bold px-5 py-2 rounded-xl text-sm">Open in Maps →</Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { mode:'🚌 By Bus', detail:'KSRTC buses stop at Temple Junction, 200m walk.' },
                { mode:'🚂 By Train', detail:'Nearest station 3km away. Auto-rickshaws available.' },
                { mode:'✈️ By Air', detail:'City airport 22km. Cabs and prepaid autos available.' },
                { mode:'🚗 By Car', detail:'Free parking for 500 vehicles inside the complex.' },
              ].map((t, i) => (
                <div key={i} className="bg-stone-50 border border-stone-100 rounded-xl p-4">
                  <p className="font-bold text-stone-900 mb-1">{t.mode}</p>
                  <p className="text-stone-500 text-sm">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DYNAMIC BLOCKS ═══════════════════════════════════════════════ */}
      {page?.blocks && page.blocks.length > 0 && (
        <div className="py-12 bg-white"><BlockRenderer blocks={page.blocks} theme="classic" sevas={sevas} templeAddress={temple.address} /></div>
      )}

      {/* ══ CONTACT & FOOTER ════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-black text-amber-400 mb-2">🕉️ {temple.name}</h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">A sacred spiritual center dedicated to Lord {temple.primaryDeity || 'the Divine'}, serving devotees for over 500 years.</p>
              <div className="flex gap-3">
                {['📘','📸','🐦','▶️'].map((s,i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-500/30 flex items-center justify-center cursor-pointer transition-colors text-sm">{s}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-amber-300 mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
              <ul className="space-y-2 text-sm text-stone-300">
                {[['Sevas & Booking',`/temple/${temple.slug}/sevas`],['Donations',`/temple/${temple.slug}/donate`],['Events',`/temple/${temple.slug}/events`],['Gallery',`/temple/${temple.slug}/gallery`],['Live Darshan',`/temple/${temple.slug}/live`]].map(([label, href]) => (
                  <li key={label}><Link href={href} className="hover:text-amber-400 transition-colors flex items-center gap-1"><ChevronRight className="h-3 w-3" />{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-300 mb-4 uppercase text-xs tracking-widest">Contact</h4>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-400" />{temple.contactPhone || '+91 98765 43210'}</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-400" />{temple.contactEmail || 'info@temple.org'}</li>
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-amber-400 mt-0.5" />{address.line1 || 'Temple Road'}, {address.city || 'City'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-300 mb-4 uppercase text-xs tracking-widest">Today&apos;s Timings</h4>
              <ul className="space-y-2 text-xs text-stone-300">
                {schedule.slice(0,5).map((s,i) => <li key={i} className="flex gap-2"><span className="text-amber-400 font-bold w-16 shrink-0">{s.time}</span><span>{s.event.split('—')[0]}</span></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-stone-500 text-xs">
            <p>© 2025 {temple.name}. All rights reserved. Powered by MandirAI OS 🕉️</p>
          </div>
        </div>
      </section>
    </div>
  )
}
