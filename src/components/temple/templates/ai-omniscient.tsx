'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Phone, Mail, MapPin, CalendarDays, Heart, ArrowRight, Users, Star, Sparkles, BookOpen, Camera, Shield, Award, ChevronRight, Activity, Zap, Eye, BrainCircuit } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

import BlockRenderer from '@/components/temple/blocks/block-renderer'

interface TemplateProps {
  temple: any
  page: any
  sevas: any[]
}

export default function AiOmniscientTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage()
  const [selectedAmount, setSelectedAmount] = React.useState(1001)
  
  const titleText = page?.title ? t(page.title) : `${temple.name}`
  const descText = page?.description ? t(page.description) : `Experience the Divine Intelligence of ${temple.primaryDeity || 'the Supreme'}.`
  const htmlContent = page?.content ? t(page.content) : `<p>Welcome to our sacred temple. Powered by divine and artificial intelligence.</p>`

  const sevaData = sevas && sevas.length > 0 ? sevas : [
    { id:'1', name:'Smart Archana', amount:51, description:'AI-scheduled name recitation for optimal spiritual timing.', durationMinutes:15 },
    { id:'2', name:'Virtual Abhishekam', amount:501, description:'Immersive bathing ritual with real-time video link.', durationMinutes:45 },
    { id:'3', name:'Automated Kumkumarchana', amount:151, description:'Continuous offering with AI chanting synchronization.', durationMinutes:20 },
    { id:'4', name:'Digital Sahasranama', amount:251, description:'1000 names recited and verified by audio-AI.', durationMinutes:60 },
    { id:'5', name:'Global Annadanam', amount:1001, description:'Crowd-sourced food distribution network.', durationMinutes:0 },
    { id:'6', name:'Omni Maha Pooja', amount:5001, description:'Grand ritual broadcast across all platforms.', durationMinutes:90 },
    { id:'7', name:'Quantum Ekadasa', amount:11001, description:'Multi-location simultaneous abhishekam.', durationMinutes:120 },
    { id:'8', name:'Interactive Dolotsavam', amount:1501, description:'Deity swing seva with app-controlled participation.', durationMinutes:30 },
    { id:'9', name:'AI Brahmotsavam', amount:51000, description:'Sponsorship of our grandest AI-managed festival.', durationMinutes:0 },
  ]

  const events = [
    { id:'1', name:'Ganesh Chaturthi', date:'26 Aug 2025', type:'FESTIVAL', desc:'AI crowd management & smart darshan routing active.', location:'Main Campus' },
    { id:'2', name:'Navaratri Celebrations', date:'02 Oct 2025', type:'FESTIVAL', desc:'Nine nights of Devi worship with predictive seating.', location:'Devi Matrix' },
    { id:'3', name:'Maha Shivaratri', date:'26 Feb 2026', type:'POOJA', desc:'All-night global stream with multi-cam AI switching.', location:'Shiva Node' },
    { id:'4', name:'Rama Navami', date:'06 Apr 2026', type:'FESTIVAL', desc:'Kalyanam ceremony with instant multi-language translation.', location:'Main Hall' },
  ]

  const stats = [
    { label:'Data Points', value:'1M+', icon:<Activity className="w-6 h-6"/> },
    { label:'Global Devotees', value:'250K', icon:<Users className="w-6 h-6"/> },
    { label:'Smart Sevas', value:'108', icon:<BrainCircuit className="w-6 h-6"/> },
    { label:'Uptime', value:'99.9%', icon:<Sparkles className="w-6 h-6"/> },
  ]

  const trustees = [
    { name: temple.peethadhipati?.name || 'Chief AI Officer', role:'Visionary', bio:'Merging ancient spirituality with modern neural networks.', avatar:'🧠' },
    { name:'Neural Architect', role:'System Design', bio:'Designing the spiritual-tech interface.', avatar:'🤖' },
    { name:'Data Priest', role:'Data Ethics', bio:'Ensuring sacred traditions are maintained in the digital realm.', avatar:'👁️' },
  ]

  const schedule = [
    { time:'05:00', event:'System Wake & Suprabhatam' },
    { time:'06:30', event:'Automated Abhishekam' },
    { time:'08:30', event:'Smart Darshan Queues Open' },
    { time:'12:30', event:'Naivedyam & Analytics Update' },
    { time:'16:00', event:'Darshan Resumes' },
    { time:'18:30', event:'Interactive Aarti' },
    { time:'20:30', event:'System Sleep & Ekanta' },
  ]

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-100 selection:bg-purple-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .neural-bg {
          background: radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, rgba(15, 23, 42, 1) 100%);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .gradient-text {
          background: linear-gradient(to right, #c084fc, #60a5fa, #2dd4bf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-border {
          position: relative;
          background: clip-padding-box border-box;
          border: 1px solid transparent;
        }
        .gradient-border::before {
          content: "";
          position: absolute;
          top: -1px; right: -1px; bottom: -1px; left: -1px;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(to right, #c084fc, #60a5fa);
        }
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .twinkle { animation: twinkle 3s ease-in-out infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}} />

      {page?.blocks && page.blocks.length > 0 ? (
        <div className="py-12 bg-slate-950"><BlockRenderer blocks={page.blocks} theme="ai" sevas={sevas} templeAddress={temple.address} /></div>
      ) : (
        <>
          {/* SECTION 1 - NEURAL HERO */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4 pt-20 pb-12 neural-bg">
            
            {/* Neural Network Dots */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full twinkle shadow-[0_0_10px_rgba(192,132,252,0.8)]" 
                     style={{ 
                       left: Math.random() * 100 + '%',
                       top: Math.random() * 100 + '%',
                       animationDelay: Math.random() * 3 + 's',
                     }} 
                />
              ))}
            </div>

            {/* Gradient Blobs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
              
              <div className="glass-card px-4 py-2 rounded-full mb-8 inline-flex items-center gap-2 text-sm text-purple-300">
                <Sparkles className="w-4 h-4" /> Powered by MandirAI Intelligence
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-center mb-6 tracking-tight gradient-text leading-tight drop-shadow-lg px-4">
                {titleText}
              </h1>
              
              <p className="text-slate-300/80 text-xl max-w-2xl mx-auto text-center mb-10 leading-relaxed font-light">
                {descText} Seamlessly blending ancient spirituality with artificial intelligence for a truly transcendent experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white px-10 py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] hover:-translate-y-1 text-sm">
                  Connect & Donate
                </Link>
                <a href="#explore" className="glass-card text-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold tracking-widest uppercase transition-all text-sm">
                  Explore Network
                </a>
              </div>

              {/* Floating Cards */}
              <div className="w-full flex justify-between gap-4 mt-8 px-4 hidden md:flex">
                <div className="glass-card p-4 rounded-xl w-64 text-left">
                  <div className="flex items-center gap-2 mb-2 text-purple-400">
                    <BrainCircuit className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">AI Insights</span>
                  </div>
                  <div className="text-white font-bold text-lg">2,450</div>
                  <div className="text-slate-400 text-xs">Active Devotees Online</div>
                </div>
                <div className="glass-card p-4 rounded-xl w-64 text-right">
                  <div className="flex items-center justify-end gap-2 mb-2 text-cyan-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Live Status</span> <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-white font-bold text-lg">Systems Optimal</div>
                  <div className="text-slate-400 text-xs">All services operational</div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2 - AI STATUS TICKER */}
          <section className="bg-purple-950/50 border-y border-purple-500/20 py-3 backdrop-blur-sm">
            <div className="marquee-container w-full">
              <div className="marquee-content font-bold text-sm tracking-widest uppercase gradient-text">
                [AI_SYS_MSG] DARSHAN WAIT TIME: 14 MINS • NEXT AARTI IN: 45 MINS • 80G RECEIPTS AUTO-GENERATED • WHATSAPP BOT ONLINE • 
              </div>
            </div>
          </section>

          {/* SECTION 3 - GLASS BENTO GRID */}
          <section id="explore" className="py-24 relative overflow-hidden bg-slate-950">
            <div className="absolute top-1/4 left-0 w-full h-[500px] bg-purple-900/10 -skew-y-12 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cell 1: Identity */}
                <div className="md:col-span-2 glass-card rounded-3xl p-10 hover:bg-white/5 transition-colors">
                  <span className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-4 block">Temple Neural Identity</span>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">🛕</div>
                    <div>
                      <h2 className="text-4xl font-bold gradient-text mb-2">{temple.name}</h2>
                      <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                        <Shield className="w-3 h-3" /> AI-VERIFIED & 80G COMPLIANT
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cell 2: Timings */}
                <div className="glass-card rounded-3xl p-8 flex flex-col justify-center text-center group hover:bg-purple-900/20 transition-colors">
                  <Clock className="w-10 h-10 mx-auto text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">Darshan Hours</h3>
                  <p className="text-slate-300">{temple.timings?.morning_open || '06:00'} - {temple.timings?.evening_close || '20:30'}</p>
                </div>

                {/* Cell 3: Prediction */}
                <div className="glass-card rounded-3xl p-8 flex flex-col justify-center text-center group hover:bg-blue-900/20 transition-colors">
                  <Eye className="w-10 h-10 mx-auto text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">AI Prediction</h3>
                  <p className="text-slate-300">Best Time to Visit: <span className="text-blue-400 font-bold">07:00 AM</span></p>
                </div>

                {/* Cell 4: Featured */}
                <div className="md:col-span-2 gradient-border rounded-3xl p-1 shadow-[0_0_20px_rgba(147,51,234,0.15)] bg-slate-950">
                  <div className="glass-card rounded-[1.4rem] w-full h-full p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-900/80">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">Featured Seva</span>
                      <h3 className="text-3xl font-bold text-white mb-2">Maha Abhishekam</h3>
                      <p className="text-slate-400 max-w-sm">Secure your slot via our smart booking engine. Real-time updates delivered to WhatsApp.</p>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="text-3xl font-black gradient-text mb-4">₹501</div>
                      <Link href={`/temple/${temple.slug}/donate?seva=2`} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors block text-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4 - AI-POWERED STATS */}
          <section className="py-16 bg-slate-950 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl text-center relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="font-black text-3xl gradient-text mb-2">{stat.value}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - AI FEATURE SHOWCASE */}
          <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-4 block">Platform Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-black text-white">Smart Temple Experience</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'AI Booking Engine', desc: 'Frictionless seva reservations.' },
                  { title: 'Smart CRM', desc: 'Personalized devotee communication.' },
                  { title: 'Auto Receipts', desc: 'Instant 80G tax certificates.' },
                  { title: 'Live Tracking', desc: 'Real-time queue and event updates.' },
                  { title: 'WhatsApp AI', desc: 'Automated conversational assistance.' },
                  { title: 'Multilingual', desc: 'Auto-translated content for global reach.' }
                ].map((feat, idx) => (
                  <div key={idx} className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-colors group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2">{feat.title}</h3>
                    <p className="text-slate-400 text-sm">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6 - ABOUT */}
          <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <h2 className="text-5xl font-black leading-tight gradient-text">Ancient Traditions,<br/>Neural Precision</h2>
                  <div className="prose prose-invert text-slate-300 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  <Link href={`/temple/${temple.slug}/history`} className="inline-block mt-4 glass-card px-8 py-3 rounded-xl font-bold text-sm text-white hover:bg-white/10 transition-colors uppercase tracking-widest">
                    Read Data Logs
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {['Verified History', 'Secure Data', 'Smart Architecture', 'Global Reach'].map((lbl, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white text-sm">{lbl}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7 - SEVAS GRID */}
          <section className="py-24 bg-slate-900/50 backdrop-blur-xl border-y border-white/5 relative">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none translate-y-[-50%]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16 space-y-2">
                <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs">Digital Offerings</span>
                <h2 className="text-4xl font-black text-white">Book Smart Sevas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sevaData.map((seva) => (
                  <div key={seva.id} className="glass-card rounded-3xl p-8 hover:border-purple-500/50 transition-colors flex flex-col h-full group">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{seva.name}</h3>
                    <p className="text-slate-400 text-sm mb-8 flex-grow">{seva.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <span className="text-2xl font-black gradient-text">₹{seva.amount}</span>
                      <Link href={`/temple/${temple.slug}/donate?seva=${seva.id}`} 
                            className="bg-white/10 hover:bg-purple-600 px-6 py-2 rounded-xl text-white text-sm font-bold transition-colors">
                        Process
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8 - EVENTS */}
          <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">Event Matrix</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{evt.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{evt.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{evt.desc}</p>
                    <p className="text-purple-400 text-xs font-bold uppercase tracking-widest"><MapPin className="inline w-3 h-3 mr-1"/> {evt.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9 - GALLERY */}
          <section className="py-24 bg-slate-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-white">Visual Logs</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="relative aspect-video glass-card rounded-2xl overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-slate-700 group-hover:scale-125 transition-transform duration-500">
                      {['🛕', '🔥', '🌸', '🪔', '🐘', '✨'][idx]}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-bold text-sm tracking-widest uppercase">Inspect</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 10 - DONATION */}
          <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 neural-bg opacity-50" />
            <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
              <h2 className="text-5xl font-black gradient-text mb-6">Empower the Divine Mission</h2>
              <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto">Support our technological and spiritual endeavors securely online.</p>
              
              <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl max-w-2xl mx-auto">
                <div className="flex justify-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-green-400">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> Secured by AI</span>
                  <span className="flex items-center gap-1"><Award className="w-3 h-3"/> 80G Auto-Generated</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[101, 501, 1001, 2100, 5100, 11000].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-4 rounded-2xl font-bold text-lg transition-all 
                                ${selectedAmount === amt ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                      ₹{amt}
                    </button>
                  ))}
                </div>
                
                <Link href={`/temple/${temple.slug}/donate?amount=${selectedAmount}`}
                      className="w-full block bg-white text-slate-900 hover:bg-slate-200 py-5 rounded-2xl font-black uppercase tracking-widest text-lg transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Donate ₹{selectedAmount}
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 11 - TRUST BOARD */}
          <section className="py-24 bg-slate-900/50 backdrop-blur border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white">System Administrators</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trustees.map((person, idx) => (
                  <div key={idx} className="glass-card p-8 rounded-3xl text-center hover:bg-white/5 transition-colors">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                      {person.avatar}
                    </div>
                    <h3 className="text-2xl font-bold gradient-text mb-2">{person.name}</h3>
                    <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">{person.role}</p>
                    <p className="text-slate-400 font-light text-sm">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12 - SCHEDULE */}
          <section className="py-24 bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">Cron Schedule</h2>
              </div>
              
              <div className="space-y-6">
                {schedule.map((slot, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/5 transition-colors">
                    <div className="bg-white/10 px-4 py-2 rounded-xl text-cyan-400 font-bold shrink-0">{slot.time}</div>
                    <div className="text-white font-bold text-lg">{slot.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13 - VOLUNTEER */}
          <section className="py-24 bg-slate-950 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-black text-white mb-6">Join the Neural Network</h2>
                <p className="text-slate-400 text-lg mb-8">Contribute your skills to our growing digital and physical ecosystem.</p>
                <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold self-start hover:bg-white/20 transition-colors">Apply to Volunteer</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Data Entry', 'Crowd Mgmt', 'Social Media', 'Content Creation'].map((role, i) => (
                  <div key={i} className="glass-card p-6 rounded-2xl text-center">
                    <h4 className="font-bold text-white text-sm">{role}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14 - CONTACT */}
          <section className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                <div className="space-y-4">
                  <h3 className="font-bold text-purple-400 uppercase tracking-widest text-sm mb-6">Coordinates</h3>
                  <div className="text-slate-400 text-sm space-y-1">
                    <p className="text-white font-bold">{temple.name}</p>
                    <p>{temple.address?.line1}</p>
                    <p>{temple.address?.city}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-purple-400 uppercase tracking-widest text-sm mb-6">Comms</h3>
                  <div className="text-slate-400 text-sm space-y-2">
                    <p>{temple.contactPhone}</p>
                    <p>{temple.contactEmail}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-purple-400 uppercase tracking-widest text-sm mb-6">Nodes</h3>
                  <ul className="text-slate-400 text-sm space-y-2">
                    <li><Link href={`/temple/${temple.slug}/history`} className="hover:text-white transition-colors">About</Link></li>
                    <li><Link href={`/temple/${temple.slug}/donate`} className="hover:text-white transition-colors">Donate</Link></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-purple-400 uppercase tracking-widest text-sm mb-6">Network</h3>
                  <div className="flex gap-4">
                    {['X', 'IN', 'YT'].map(social => (
                      <a key={social} href="#" className="glass-card w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-xs font-bold">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="pt-8 border-t border-white/10 text-center flex justify-between items-center text-slate-500 text-xs">
                <p>© {new Date().getFullYear()} {temple.name}</p>
                <p className="glass-card px-3 py-1 rounded-full text-slate-300">Powered by MandirAI OS</p>
              </div>
            </div>
          </section>

        </>
      )}
    </div>
  )
}
