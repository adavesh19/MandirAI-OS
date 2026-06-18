'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/components/shared/language-context'
import { 
  Landmark, Users, HandHeart, Eye, Shield, Award,
  Terminal, Cpu, Zap, RadioTower, Database, Sparkles, BookOpen, Flame
} from 'lucide-react'

interface AboutClientProps {
  temple: {
    name: string
    trustRegistrationNo: string | null
    slug: string
  }
  page: {
    title: any
    description: any
    content: any
  } | null
  templateId?: string
}

export default function AboutClient({ temple, page, templateId = 'classic' }: AboutClientProps) {
  const { t } = useLanguage()

  // Devotee AI Oracle states
  const [oracleQuery, setOracleQuery] = React.useState('')
  const [oracleResponse, setOracleResponse] = React.useState('')
  const [loadingOracle, setLoadingOracle] = React.useState(false)

  const askOracle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!oracleQuery.trim()) return
    setLoadingOracle(true)
    setOracleResponse('>> INITIALIZING TRANS-COGNITIVE SYNC...\n>> QUERYING CELESTIAL INDEX...\n>> PARSING SANSKRIT CORPUS...')

    try {
      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: oracleQuery, history: [] })
      })
      const data = await res.json()
      setOracleResponse(data.response || '>> ERROR: AI Oracle core could not formulate a response.')
    } catch {
      setOracleResponse('>> ERROR: Telemetry timeout. Check connection stream.')
    } finally {
      setLoadingOracle(false)
    }
  }

  const defaultTitle = {
    en: `About the Trust — ${temple.name}`,
    hi: `ट्रस्ट के बारे में — ${temple.name}`,
    kn: `ಟ್ರಸ್ಟ್ ಮಾಹಿತಿ — ${temple.name}`,
    ta: `அறக்கட்டளை பற்றி — ${temple.name}`,
    te: `ట్రస్ట్ సమాచారం — ${temple.name}`,
  }

  const defaultDescription = {
    en: `Preserving traditions and serving the devotee community.`,
    hi: `परंपराओं का संरक्षण और भक्त समुदाय की सेवा।`,
    kn: `ಸಂಪ್ರದಾಯಗಳ ರಕ್ಷಣೆ ಮತ್ತು ಭಕ್ತರ ಸೇವೆ.`,
    ta: `பாரம்பரியங்களைப் பாதுகாத்தல் மற்றும் பக்தர்களுக்குச் சேவை செய்தல்.`,
    te: `సంప్రదాయాల రక్షణ మరియు భక్తుల సేవ.`,
  }

  const defaultHtml = `<p>Our temple is supported by a dedicated board of trustees and devotees. Our primary mission is to promote Sanatana Dharma, support social development, and conduct community activities such as free food distribution (Annadanam) and healthcare services.</p>`

  const titleText = page ? t(page.title) : t(defaultTitle)
  const descText = page ? t(page.description) : t(defaultDescription)
  const htmlContent = page ? t(page.content) : defaultHtml

  // ─── 1. HIGH TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-16 font-mono text-slate-300">
        
        {/* HUD Header */}
        <div className="relative border border-cyan-800/40 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
          {/* Corner Decors */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Cpu className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 px-4 py-1.5 rounded-lg text-xs tracking-wider uppercase font-bold">
              <Terminal className="h-4 w-4 animate-pulse" />
              SYSTEM MANIFEST // SECURE_INFO
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              {titleText}
            </h1>
            <p className="text-lg text-slate-400 border-l-4 border-cyan-500 pl-4 py-1 leading-relaxed">
              {descText}
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Block: Core Vision (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-2xl text-slate-300">
              <CardHeader className="border-b border-slate-800 pb-4">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-cyan-950 border border-cyan-800 rounded-lg text-cyan-400">
                    <Database className="w-5 h-5" />
                  </div>
                  System Objectives & Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div 
                  className="prose prose-invert max-w-none text-slate-400 leading-relaxed text-sm space-y-4 font-mono"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </CardContent>
            </Card>

            {/* Subsystems Core Load Bento Grid */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                ACTIVE CORES STATUS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Nitya Annadanam', cap: '1M+ Meals Served', load: 'Core Load: 87%', health: 'HEALTHY', desc: 'Continuous food distribution stream allocating resource packages to devotee networks.' },
                  { title: 'Vedic Gurukulam', cap: '512 Students Alloc', load: 'Core Load: 42%', health: 'SYNCED', desc: 'Lineage preservation thread compile cycles. Maintaining traditional chanting frequencies.' },
                  { title: 'Goshala Protection', cap: '1,024 Nodes Saved', load: 'Core Load: 65%', health: 'MONITOR', desc: 'Surveillance & telemetry sensors active on cow health profiles and nutrition vectors.' },
                  { title: 'Dharma Broadcast', cap: 'Online Streaming', load: 'Core Load: 15%', health: 'ACTIVE', desc: 'Transmitting spiritual lectures and live ritual audio streams across global grids.' }
                ].map((core, i) => (
                  <div key={i} className="border border-slate-800 bg-slate-950/50 p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                    <div className="absolute right-3 top-3 text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded">
                      {core.health}
                    </div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 opacity-80"></span>
                      {core.title}
                    </h4>
                    <p className="text-[10px] text-cyan-400 font-bold mb-3">{core.cap} // {core.load}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{core.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: AI Oracle Widget */}
          <div className="space-y-8">
            {/* AI Devotee Oracle Terminal */}
            <Card className="border border-fuchsia-800/50 bg-slate-950 shadow-[0_0_20px_rgba(240,70,250,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles className="w-32 h-32 text-fuchsia-400" />
              </div>
              <CardHeader className="border-b border-slate-800 pb-3 bg-slate-900/30">
                <CardTitle className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping"></span>
                  Omni-Agent Oracle v2.08
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5 space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Query the temple\'s cognitive core. Submit a question regarding gotra lineage, panchanga metrics, or holy scriptures.
                </p>

                {/* Simulated Output Terminal Screen */}
                <div className="bg-black border border-slate-800 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[11px] text-fuchsia-400 space-y-2 relative">
                  <div className="sticky top-0 right-0 text-[8px] text-slate-500 bg-black/80 px-1.5 py-0.5 rounded w-fit ml-auto border border-slate-900 uppercase">
                    Terminal Output
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed font-mono">
                    {oracleResponse || '>> Oracle Core Idle.\n>> Awaiting devotee input query...'}
                  </pre>
                </div>

                <form onSubmit={askOracle} className="flex gap-2">
                  <input
                    type="text"
                    value={oracleQuery}
                    onChange={(e) => setOracleQuery(e.target.value)}
                    disabled={loadingOracle}
                    placeholder="Enter query..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-fuchsia-500 placeholder-slate-600"
                  />
                  <button
                    type="submit"
                    disabled={loadingOracle || !oracleQuery.trim()}
                    className="bg-fuchsia-950 border border-fuchsia-800 hover:border-fuchsia-500 text-fuchsia-400 px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </CardContent>
            </Card>

            {/* System Encryption Nodes info */}
            {temple.trustRegistrationNo && (
              <Card className="border border-slate-800 bg-slate-950 text-slate-400">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">COMPLIANCE SIGNATURE</span>
                    <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl flex items-center justify-between">
                      <span className="font-mono text-cyan-400 text-xs font-bold select-all">{temple.trustRegistrationNo}</span>
                      <Shield className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Entity verified on local charity registries. All financial transactions are validated against this signature record.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

        </div>

      </div>
    )
  }

  // ─── 2. DIVINE GLOW THEME (Warm saffron gradient with gold glowing cards) ───
  if (templateId === 'divine-glow') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-16">
        
        {/* Banner with Saffron/Amber Gradient */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-600 via-orange-600 to-amber-900 p-8 sm:p-12 shadow-2xl border border-amber-500/20 text-white">
          <div className="absolute top-0 right-0 p-12 opacity-15 pointer-events-none select-none">
            <span className="text-[12rem] leading-none">🕉️</span>
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              <Flame className="h-4 w-4 text-amber-300 animate-pulse" />
              Devotion & Service
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              {titleText}
            </h1>
            <p className="text-lg text-amber-50 font-medium leading-relaxed">
              {descText}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Card (Spans 2 cols) */}
          <div className="lg:col-span-2 group">
            <Card className="h-full border border-amber-200/50 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-orange-500" />
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-2xl font-bold text-stone-900 flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-2xl text-amber-600">
                    <Eye className="w-6 h-6" />
                  </div>
                  Our Divine Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-stone max-w-none text-stone-600 leading-relaxed text-base space-y-4 font-serif"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {temple.trustRegistrationNo && (
              <Card className="border border-amber-100 shadow-lg bg-gradient-to-br from-amber-50 to-white rounded-3xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-base font-bold flex items-center gap-2 text-amber-900">
                    <Shield className="h-5 w-5 text-amber-500" />
                    <span>Registered Trust</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200/50">
                    <span className="block text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Registration No</span>
                    <span className="font-mono font-black text-amber-950 text-base">{temple.trustRegistrationNo}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Values */}
            <Card className="border border-amber-100 shadow-lg bg-white rounded-3xl">
              <CardContent className="p-6 space-y-6">
                {[
                  { title: 'Annadanam', sub: 'Daily free distribution of prasad', icon: '🍛', color: 'bg-amber-50 text-amber-600' },
                  { title: 'Vedic Studies', sub: 'Preserving ancient oral chanting tradition', icon: '📖', color: 'bg-orange-50 text-orange-600' },
                  { title: 'Goshala Care', sub: 'Nurturing cows with devotion', icon: '🐄', color: 'bg-yellow-50 text-yellow-600' }
                ].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${val.color} flex items-center justify-center text-xl shrink-0 border border-amber-100/50`}>
                      {val.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{val.title}</h4>
                      <p className="text-xs text-stone-500">{val.sub}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    )
  }

  // ─── 3. HERITAGE GRAND THEME (Ancient arches and scriptural design) ───
  if (templateId === 'heritage') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-16 font-serif">
        
        {/* Heritage Header Banner */}
        <div className="relative overflow-hidden rounded-t-[3rem] bg-stone-900 border-b-4 border-amber-500 p-8 sm:p-12 text-white shadow-2xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0,transparent_70%)]"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-4xl text-amber-500">⚜️</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-400 tracking-wide font-serif">
              {titleText}
            </h1>
            <div className="h-px w-24 bg-amber-500/50 mx-auto my-3" />
            <p className="text-stone-300 text-base italic">
              {descText}
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vision Statement */}
          <div className="lg:col-span-8">
            <Card className="border border-stone-250 bg-stone-50/50 rounded-[2rem] overflow-hidden shadow-xl">
              <CardContent className="p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-stone-900 mb-6 font-serif text-center flex items-center justify-center gap-2 text-amber-800">
                  <span>🏛️</span> Institutional Mandate <span>🏛️</span>
                </h3>
                <div 
                  className="prose prose-stone prose-lg max-w-none text-stone-700 leading-relaxed font-serif space-y-4"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-2 border-double border-amber-500/30 bg-stone-900 text-white rounded-[2rem] p-6 shadow-xl">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="font-bold text-lg text-amber-400">Trust Legitimacy</h4>
                <div className="h-px w-12 bg-white/20 mx-auto" />
                {temple.trustRegistrationNo && (
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-850 font-mono text-center text-xs tracking-wider">
                    {temple.trustRegistrationNo}
                  </div>
                )}
                <p className="text-xs text-stone-400 leading-relaxed">
                  Established under charity framework guidelines for authentic temple maintenance and devotee care.
                </p>
              </div>
            </Card>

            <Card className="border border-stone-200 bg-white rounded-[2rem] p-6">
              <h4 className="font-bold text-stone-900 mb-4 text-center">Spiritual Pillars</h4>
              <div className="space-y-4">
                {[
                  { t: 'Sanatana Dharma', d: 'Promoting authentic scriptures & rituals.' },
                  { t: 'Annaseva', d: 'Serving hot meals to visiting pilgrims daily.' },
                  { t: 'Social Upliftment', d: 'Supporting health camps & student books.' }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                    <h5 className="font-bold text-stone-800 text-sm">{item.t}</h5>
                    <p className="text-xs text-stone-500">{item.d}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

      </div>
    )
  }

  // ─── 4. MODERN ELEGANT THEME (Minimalist glassmorphism design) ───
  if (templateId === 'modern') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="h-1.5 w-16 bg-emerald-500 rounded-full" />
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-none">
            {titleText}
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed font-light">
            {descText}
          </p>
        </div>

        {/* Content & Stats Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-8 sm:p-10">
              <div 
                className="prose prose-stone max-w-none text-stone-600 leading-relaxed text-sm space-y-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-emerald-50/50 ring-1 ring-emerald-100 rounded-3xl p-6">
              <h4 className="font-heading font-bold text-emerald-950 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" /> Compliance Details
              </h4>
              {temple.trustRegistrationNo && (
                <div className="bg-white p-3.5 rounded-2xl border border-emerald-100/80 font-mono text-emerald-900 text-sm font-bold flex justify-between items-center">
                  <span>{temple.trustRegistrationNo}</span>
                </div>
              )}
              <p className="text-xs text-emerald-800/80 mt-3 font-medium">
                Our trust complies with statutory regulatory measures. All donations are accounted for transparently.
              </p>
            </Card>

            <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-6">
              <h4 className="font-heading font-bold text-stone-900 text-sm uppercase tracking-wider mb-4">Core Commitments</h4>
              <div className="space-y-4">
                {[
                  { n: 'Annadanam', val: 'Feeding 500+ daily' },
                  { n: 'Education', val: 'Vedic & modern library' },
                  { n: 'Gaushala', val: 'Indigenous breed welfare' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-stone-600 text-sm font-medium">{item.n}</span>
                    <span className="text-stone-900 text-sm font-bold">{item.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

      </div>
    )
  }

  // ─── 5. CLASSIC THEME (Fallback / Original layout) ───
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Landmark className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="text-xs font-bold text-white tracking-widest uppercase">Who We Are</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {titleText}
          </h1>
          <p className="text-xl text-stone-300 font-medium">
            {descText}
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Content (Spans 2 columns) */}
        <div className="md:col-span-2 group">
          <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-xl ring-1 ring-stone-200">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading text-2xl font-bold text-stone-900 flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600">
                  <Eye className="w-6 h-6" />
                </div>
                {t({ en: 'Our Vision & Mission', hi: 'हमारा दृष्टिकोण और लक्ष्य', kn: 'ನಮ್ಮ ಗುರಿ ಮತ್ತು ಉದ್ದೇಶ', ta: 'நோக்கமும் கொள்கையும்', te: 'మా ఆశయం మరియు కర్తవ్యం' })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-stone max-w-none text-stone-600 leading-relaxed text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info (1 column stack) */}
        <div className="space-y-6">
          
          {/* Trust Registration Card */}
          {temple.trustRegistrationNo && (
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white ring-1 ring-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-lg font-bold flex items-center gap-2 text-stone-900">
                  <Shield className="h-5 w-5 text-amber-500" />
                  <span>{t({ en: 'Official Trust', hi: 'आधिकारिक ट्रस्ट', kn: 'ಅಧಿಕೃತ ಟ್ರಸ್ಟ್', ta: 'அதிகாரப்பூர்வ அறக்கட்டளை', te: 'அதிகாரిక ట్రస్ట్' })}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/80 p-4 rounded-xl border border-amber-50">
                  <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Registration No</span>
                  <span className="font-mono font-black text-stone-950 text-base">{temple.trustRegistrationNo}</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Fully registered and compliant with local charity commissions, enabling transparent operations.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats / Values */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-stone-200">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                  <HandHeart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Community First</h4>
                  <p className="text-xs text-stone-500">Dedicated to Annadanam and charity</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Inclusive</h4>
                  <p className="text-xs text-stone-500">Welcoming devotees from all walks</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Heritage</h4>
                  <p className="text-xs text-stone-500">Preserving ancient traditions</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  )
}
