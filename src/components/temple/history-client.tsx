'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/components/shared/language-context'
import { 
  BookOpen, Sparkles, ScrollText, History as HistoryIcon, Clock,
  Cpu, Database, ShieldAlert, Zap, Layers, Compass
} from 'lucide-react'

interface HistoryClientProps {
  temple: {
    name: string
    slug: string
  }
  page: {
    title: any
    description: any
    content: any
  } | null
  templateId?: string
}

export default function HistoryClient({ temple, page, templateId = 'classic' }: HistoryClientProps) {
  const { t } = useLanguage()

  const defaultTitle = {
    en: `History & Sacred Legend`,
    hi: `इतिहास और पौराणिक गाथा`,
    kn: `ಚಾರಿತ್ರಿಕ ಇತಿಹಾಸ ಮತ್ತು ಪುರಾಣ`,
    ta: `வரலாறு மற்றும் தலபுராணம்`,
    te: `చారిత్రక నేపథ్యం మరియు పురాణం`,
  }

  const defaultDescription = {
    en: `Explore the historical origins, legendary tales, and miracles of ${temple.name}.`,
    hi: `पवित्र स्थान की ऐतिहासिक उत्पत्ति, पौराणिक कहानियों और चमत्कारों का अन्वेषण करें।`,
    kn: `ಕ್ಷೇತ್ರದ ಮೂಲ ಹಿನ್ನೆಲೆ, ದೈವಿಕ ಪವಾಡಗಳು ಮತ್ತು ಐತಿಹಾಸिक ಘಟನೆಗಳು.`,
    ta: `புனித தலத்தின் வரலாற்று தோற்றம், ஆன்மீக கதைகள் மற்றும் அதிசயங்களை அறியுங்கள்.`,
    te: `పుణ్యక్షేత్ర ఆవిర్భావం, మహిమలు మరియు చారిత్రక ప్రాశస్త్యం.`,
  }

  const defaultHtml = `<p>The origins of this temple trace back several centuries. According to legend, the main deity manifested as a self-carved structure (Swayambhu), drawing kings and saints of old to establish a sanctuary of worship. Over subsequent centuries, various dynamic trusts expanded the structures while preserving traditional Indian architectural design principles.</p>`

  const titleText = page ? t(page.title) : t(defaultTitle)
  const descText = page ? t(page.description) : t(defaultDescription)
  const htmlContent = page ? t(page.content) : defaultHtml

  // ─── 1. HIGH-TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-20 font-mono text-slate-300">
        
        {/* HUD Banner */}
        <div className="relative border border-cyan-800/40 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md text-center max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>
          
          <div className="inline-flex items-center justify-center p-3 bg-cyan-950/40 border border-cyan-850 rounded-2xl text-cyan-400 mb-4 shadow-inner">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CHRONOLOGICAL LEDGER // INDEX_READ
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm mt-3 border-t border-slate-800 pt-4 leading-relaxed">
            {descText}
          </p>
        </div>

        {/* Timeline Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Timeline Column (Spans 8 cols) */}
          <div className="lg:col-span-8 relative pl-0 md:pl-8 space-y-12">
            {/* Glowing Dotted Timeline line */}
            <div className="absolute left-[39px] top-6 bottom-0 w-0 border-l-2 border-dashed border-cyan-500/30 hidden md:block" />

            {/* Ancient origins */}
            <div className="relative pl-0 md:pl-16 group">
              <div className="absolute left-3 top-2 w-8 h-8 bg-slate-900 border border-cyan-500/50 rounded-full hidden md:flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)] z-10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              </div>

              <div className="border border-slate-800 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-950 text-cyan-400 border-l border-b border-slate-800 text-[9px] font-bold">
                  EPOCH: ANCIENT // HASH_0x7A9
                </div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-4">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Swayambhu Manifestation Record
                </h3>
                <div 
                  className="prose prose-invert max-w-none text-slate-400 text-sm leading-relaxed font-mono"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </div>

            {/* Historical Epoch */}
            <div className="relative pl-0 md:pl-16 group">
              <div className="absolute left-3 top-2 w-8 h-8 bg-slate-900 border border-slate-800 rounded-full hidden md:flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-6 rounded-2xl">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> EPOCH: MID_AGE // HASH_0x4F2</span>
                  <span className="text-cyan-400">STATUS: COMMITTED</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Historical scriptures record royal donations during major dynastic rules. Inscriptions on stone slabs detail architectural projects, irrigation channels, and seva endowments, showing deep community connection.
                </p>
              </div>
            </div>

            {/* System Log Epoch */}
            <div className="relative pl-0 md:pl-16 group">
              <div className="absolute left-3 top-2 w-8 h-8 bg-slate-900 border border-slate-800 rounded-full hidden md:flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-6 rounded-2xl">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> EPOCH: MOD_ERA // HASH_0x82C</span>
                  <span className="text-cyan-400">STATUS: COMMITTED</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Establishment of the governing board and trust structure. Preservation protocols were established to protect temple antiques, Sanskrit archives, and religious ceremonies, while transitioning coordinates to digital AI frameworks.
                </p>
              </div>
            </div>

          </div>

          {/* Sidebar Quote Frame Column (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border border-fuchsia-800 bg-slate-950 p-6 rounded-3xl shadow-[0_0_20px_rgba(240,70,250,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative z-10 text-center py-4 space-y-6">
                <div className="w-12 h-12 mx-auto bg-fuchsia-950/50 rounded-full flex items-center justify-center border border-fuchsia-800/40 text-fuchsia-400">
                  <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
                </div>
                <p className="italic text-white font-medium text-lg leading-relaxed">
                  "धर्मो रक्षति रक्षितः"<br />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-2 block">Dharmo Rakshati Rakshitah</span>
                </p>
                <div className="h-px w-12 bg-slate-800 mx-auto" />
                <p className="text-xs text-slate-450 leading-relaxed">
                  "Dharma protects those who protect it." Safeguarding the temple's structural and spiritual heritage remains the core protocol of our node network.
                </p>
              </div>
            </Card>

            {/* Sacred Chronology Ledger list */}
            <Card className="border border-slate-800 bg-slate-950/50 p-6 rounded-3xl space-y-4 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">// TIMELINE_INDEX</h4>
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">1. Swayambhu Find</span>
                  <span className="text-cyan-400">3000 BC</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">2. First Stone Sanctum</span>
                  <span className="text-cyan-400">850 AD</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">3. Gopuram Erection</span>
                  <span className="text-cyan-400">1420 AD</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">4. Digital Shell Active</span>
                  <span className="text-fuchsia-400">2026 AD</span>
                </div>
              </div>
            </Card>
          </div>

        </div>

      </div>
    )
  }

  // ─── 2. DIVINE GLOW THEME (Warm saffron with diya ornaments) ───
  if (templateId === 'divine-glow') {
    return (
      <div className="space-y-16 animate-in fade-in duration-1000 pb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0,transparent_70%)] blur-3xl -z-10" />

        <div className="text-center space-y-4 max-w-3xl mx-auto pt-8">
          <div className="inline-flex items-center justify-center p-3 bg-amber-50 border border-amber-100 rounded-3xl text-amber-600 shadow-inner">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-stone-900 leading-tight">
            {titleText}
          </h1>
          <p className="text-lg text-stone-600 font-medium leading-relaxed">
            {descText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-12 relative">
            <div className="absolute left-[27px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-stone-250 to-transparent hidden md:block" />

            <div className="relative pl-0 md:pl-20 group">
              <div className="absolute left-0 top-1 w-14 h-14 bg-white border-4 border-amber-100 rounded-full hidden md:flex items-center justify-center shadow-md group-hover:border-amber-300 transition-all">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
              <Card className="border border-amber-100/50 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-orange-500" />
                <CardContent className="p-8 sm:p-10">
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                    <ScrollText className="w-6 h-6 text-amber-500" />
                    Sacred Beginnings
                  </h3>
                  <div 
                    className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed font-serif"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-4">
            <Card className="border border-amber-100 shadow-xl bg-gradient-to-br from-amber-600 to-amber-900 p-8 rounded-3xl text-white text-center relative overflow-hidden group">
              <span className="text-8xl text-white/5 absolute -top-4 -right-2 font-serif select-none pointer-events-none">🕉️</span>
              <div className="relative z-10 space-y-6 py-4">
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <BookOpen className="w-6 h-6 text-amber-300" />
                </div>
                <p className="italic text-white font-medium text-xl font-serif">
                  "धर्मो रक्षति रक्षितः"<br />
                  <span className="text-xs font-sans text-amber-200/60 font-semibold tracking-wider uppercase block mt-2">Dharmo Rakshati Rakshitah</span>
                </p>
                <p className="text-xs text-amber-50/80 leading-relaxed font-light">
                  "Dharma protects those who protect it." Safeguarding the temple's structural and spiritual heritage remains our sacred duty.
                </p>
              </div>
            </Card>
          </div>
        </div>

      </div>
    )
  }

  // ─── 3. HERITAGE GRAND THEME (Ancient scroll layout & traditional arches) ───
  if (templateId === 'heritage') {
    return (
      <div className="space-y-16 animate-in fade-in duration-700 pb-20 font-serif">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-t-[3.5rem] bg-stone-900 border-b-4 border-amber-500 p-8 sm:p-12 text-white shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-4xl text-amber-500">⚜️</span>
            <h1 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-wide font-serif">
              {titleText}
            </h1>
            <div className="h-px w-24 bg-amber-500/50 mx-auto my-3" />
            <p className="text-stone-300 text-lg italic leading-relaxed">
              {descText}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <Card className="border border-stone-250 bg-stone-50/60 rounded-[2.5rem] overflow-hidden shadow-xl">
              <CardContent className="p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center text-amber-800">
                  📜 Sthala Purana Legend
                </h3>
                <div 
                  className="prose prose-stone prose-lg max-w-none text-stone-750 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="border-2 border-double border-amber-500/30 bg-stone-900 text-white rounded-[2.5rem] p-8 shadow-xl text-center">
              <div className="space-y-6">
                <span className="text-6xl">🧘‍♂️</span>
                <p className="italic text-amber-400 text-lg leading-relaxed">
                  "धर्मो रक्षति रक्षितः"
                </p>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  "Dharma protects those who protect it." Serving the temple and preserving its heritage is our sacred duty.
                </p>
              </div>
            </Card>
          </div>
        </div>

      </div>
    )
  }

  // ─── 4. MODERN ELEGANT THEME (Minimalist clean timeline) ───
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-8 sm:p-10">
              <div 
                className="prose prose-stone max-w-none text-stone-600 leading-relaxed text-sm space-y-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="border-0 shadow-lg bg-emerald-50/50 ring-1 ring-emerald-100 rounded-3xl p-8 text-center">
              <div className="space-y-6 py-4">
                <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center border border-emerald-100">
                  <ScrollText className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="italic text-emerald-950 font-bold text-lg leading-relaxed">
                  "Dharmo Rakshati Rakshitah"
                </p>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  Preserving historical artifacts and ancient values is embedded in our administrative protocols.
                </p>
              </div>
            </Card>
          </div>
        </div>

      </div>
    )
  }

  // ─── 5. CLASSIC THEME (Fallback / Original Layout) ───
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-amber-100/50 to-transparent blur-3xl rounded-full -z-10 opacity-50" />

      {/* Header banner */}
      <div className="text-center space-y-6 max-w-3xl mx-auto pt-8">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-2xl text-amber-600 mb-2 shadow-inner border border-amber-200/50">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-4xl font-black tracking-tight text-stone-900 sm:text-5xl leading-tight">
          {titleText}
        </h1>
        <p className="text-xl text-stone-600 font-medium">
          {descText}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content - Timeline Layout */}
        <div className="lg:col-span-8 relative">
          
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-amber-300 via-stone-200 to-transparent hidden md:block" />

          <div className="space-y-12">
            {/* Prologue Section */}
            <div className="relative pl-0 md:pl-20 group">
              <div className="absolute left-0 top-1 w-14 h-14 bg-white border-4 border-amber-100 rounded-full hidden md:flex items-center justify-center shadow-sm group-hover:border-amber-300 transition-colors">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
              
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm ring-1 ring-stone-200/50 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400" />
                <CardContent className="p-8 sm:p-10">
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                    <ScrollText className="w-6 h-6 text-amber-500" />
                    The Ancient Origins
                  </h3>
                  <div 
                    className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed font-serif"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Example Timeline Event (Could be dynamic later) */}
            <div className="relative pl-0 md:pl-20 group">
              <div className="absolute left-3 top-2 w-8 h-8 bg-white border-4 border-stone-100 rounded-full hidden md:flex items-center justify-center shadow-sm group-hover:border-stone-300 transition-colors">
                <HistoryIcon className="w-3 h-3 text-stone-400" />
              </div>
              <div className="bg-stone-50 border border-stone-200/60 p-6 rounded-2xl hover:bg-stone-100/80 transition-colors">
                <div className="flex items-center gap-2 text-stone-500 font-bold text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Historical Epoch</span>
                </div>
                <p className="text-stone-600 text-base leading-relaxed">
                  As the legacy of the temple grew, several dynasties contributed to its architecture. The intricately carved pillars and the main Gopuram stand as a testament to the golden era of spiritual patronage.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Scriptural Quote */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <Card className="border-0 bg-gradient-to-br from-stone-900 to-stone-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -ml-10 -mb-10" />
              
              <span className="text-8xl text-white/5 absolute -top-4 -right-2 font-serif select-none pointer-events-none">🕉️</span>
              
              <div className="relative z-10 text-center py-6 space-y-6">
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                  <BookOpen className="w-6 h-6 text-amber-300" />
                </div>
                
                <p className="italic text-white font-medium text-xl font-serif leading-relaxed">
                  "धर्मो रक्षति रक्षितः"<br />
                  <span className="text-sm font-sans text-stone-400 font-normal tracking-widest uppercase mt-4 block">Dharmo Rakshati Rakshitah</span>
                </p>
                
                <div className="h-px w-12 bg-white/20 mx-auto" />
                
                <p className="text-sm text-stone-300 leading-relaxed font-light">
                  {t({
                    en: '"Dharma protects those who protect it." Serving the temple and preserving its heritage is our sacred duty.',
                    hi: '"जो धर्म की रक्षा करता है, धर्म उसकी रक्षा करता है।" मंदिर की सेवा और उसकी विरासत का संरक्षण हमारा पवित्र कर्तव्य है।',
                    kn: '"ಧರ್ಮವನ್ನು ರಕ್ಷಿಸುವವರನ್ನು ಧರ್ಮವು ರಕ್ಷಿಸುತ್ತದೆ." ದೇವಾಲಯದ ಸೇವೆ ಮತ್ತು ಇತಿಹಾಸದ ರಕ್ಷಣೆ ನಮ್ಮ ಪವಿತ್ರ ಕರ್ತವ್ಯ.',
                    ta: '"தர்மத்தைக் காப்பாரைத் தர்மம் காக்கும்." ஆலயத் தொண்டும் அதன் பாரம்பரியத்தைப் பாதுகாப்பதும் நமது கடமையாகும்.',
                    te: '"ధర్మాన్ని రక్షించేవారిని ధర్మం రక్షిస్తుంది." ఆలయ సేవ మరియు సంస్కృతి పరిరక్షణ మన పరమ కర్తవ్యం.',
                  })}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}
