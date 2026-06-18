'use client'

import React, { useState, useEffect } from 'react'
import { 
  CheckCircle2, 
  Clock, 
  Map, 
  Target, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Activity, 
  FileCode2, 
  Layers, 
  Flame
} from 'lucide-react'

interface RoadmapItem {
  id: string
  title: string
  description: string | null
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
  targetDate: string | Date | null
}

interface RoadmapClientProps {
  temple: any
  items: RoadmapItem[]
  templateId?: string
}

export default function RoadmapClient({ temple, items, templateId = 'classic' }: RoadmapClientProps) {
  const completed = items.filter(i => i.status === 'COMPLETED')
  const inProgress = items.filter(i => i.status === 'IN_PROGRESS')
  const planned = items.filter(i => i.status === 'PLANNED')
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([])

  useEffect(() => {
    if (templateId === 'tech-sanctuary') {
      setTelemetryLogs([
        `ROADMAP: Initializing project execution ledger...`,
        `CHECKSUM: Validating ${items.length} registered milestones...`,
        `STATUS: Completed (${completed.length}), In-Progress (${inProgress.length}), Planned (${planned.length})`,
        `SYS_LOG: Schedule tracking node fully synchronized.`
      ])
    }
  }, [templateId, items.length, completed.length, inProgress.length, planned.length])

  // Custom Progress Bar Generator for Tech Sanctuary
  const renderTechProgressBar = (status: string) => {
    if (status === 'COMPLETED') {
      return (
        <div className="font-mono text-[10px] text-emerald-400 mt-3">
          <span>PROGRESS: [████████████████] 100% // COMPILED</span>
        </div>
      )
    } else if (status === 'IN_PROGRESS') {
      return (
        <div className="font-mono text-[10px] text-blue-400 mt-3">
          <span className="animate-pulse">PROGRESS: [████████░░░░░░░░] 50% // EXECUTING</span>
        </div>
      )
    } else {
      return (
        <div className="font-mono text-[10px] text-cyan-500 mt-3">
          <span>PROGRESS: [░░░░░░░░░░░░░░░░] 0% // QUEUED</span>
        </div>
      )
    }
  }

  // Custom Progress Bar for AI Omniscient
  const renderAiProgressBar = (status: string) => {
    if (status === 'COMPLETED') {
      return (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '100%' }}></div>
        </div>
      )
    } else if (status === 'IN_PROGRESS') {
      return (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 rounded-full animate-[pulse_1.5s_infinite]" style={{ width: '60%' }}></div>
        </div>
      )
    } else {
      return (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-slate-800 rounded-full" style={{ width: '10%' }}></div>
        </div>
      )
    }
  }

  const renderSection = (title: string, list: any[], icon: any, colorClass: string, bgClass: string, statusKey: string) => (
    <div className="space-y-4">
      <h3 className={`font-heading text-xl font-bold flex items-center gap-2 ${colorClass}`}>
        {icon}
        {title}
        <span className="text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 font-normal">
          {list.length}
        </span>
      </h3>
      <div className="space-y-4">
        {list.length === 0 ? (
          <p className="text-stone-400 italic text-sm">No items in this stage.</p>
        ) : (
          list.map((item, idx) => {
            const hashVal = item.id.substring(0, 6).toUpperCase()
            const versionStr = statusKey === 'COMPLETED' ? `1.${idx+1}.0` : statusKey === 'IN_PROGRESS' ? `2.0.1` : `3.0.0`
            
            return (
              <div 
                key={item.id} 
                className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
                  templateId === 'tech-sanctuary'
                    ? 'bg-slate-950 border-slate-800 hover:border-cyan-500 text-slate-300 font-mono shadow-[0_0_15px_rgba(6,182,212,0.03)]'
                    : templateId === 'ai-omniscient'
                    ? 'bg-white/5 border-white/10 hover:border-fuchsia-500 text-white backdrop-blur-md'
                    : templateId === 'divine-glow'
                    ? 'bg-white border-2 border-amber-100 hover:border-amber-400 hover:shadow-md'
                    : templateId === 'heritage'
                    ? 'bg-stone-50 border-stone-300 rounded hover:border-red-850 font-serif'
                    : 'bg-white border border-stone-200 hover:shadow-md hover:border-saffron-300'
                }`}
              >
                {/* Tech ID Tag */}
                {templateId === 'tech-sanctuary' && (
                  <div className="absolute right-0 top-0 bg-slate-900 text-slate-500 text-[8px] px-2 py-0.5 font-bold border-l border-b border-slate-800 uppercase">
                    SYS_V.{versionStr} // 0x{hashVal}
                  </div>
                )}

                <h4 className={`font-bold text-lg leading-snug pr-16 ${
                  templateId === 'heritage' ? 'text-red-950 font-serif' : 'text-stone-900 dark:text-white'
                }`}>{item.title}</h4>
                
                <p className={`mt-2 text-sm leading-relaxed ${
                  templateId === 'tech-sanctuary' ? 'text-slate-400' : 'text-stone-600 dark:text-slate-305'
                }`}>{item.description}</p>
                
                {/* Progress Visual */}
                {templateId === 'tech-sanctuary' && renderTechProgressBar(item.status)}
                {templateId === 'ai-omniscient' && renderAiProgressBar(item.status)}

                {/* Target Date stamp */}
                {item.targetDate && (
                  <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 font-semibold text-[10px] rounded-full uppercase tracking-wider ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-900/40'
                      : templateId === 'ai-omniscient'
                      ? 'bg-white/10 text-fuchsia-400'
                      : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Target className="h-3 w-3" />
                    Target: {new Date(item.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                )}

                {/* AI Predictive telemetry */}
                {templateId === 'ai-omniscient' && (
                  <div className="mt-3 bg-fuchsia-950/20 border border-fuchsia-800/10 p-2 rounded-xl text-[9px] text-slate-400 flex items-start gap-1.5">
                    <Sparkles className="h-3 w-3 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span>Planetary synchronization probability: 98.2%. Celestial nodes aligned.</span>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )

  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  return (
    <div className={`max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 ${
      templateId === 'tech-sanctuary'
        ? 'bg-slate-950 text-slate-300 font-mono p-4 sm:p-6 rounded-2xl border border-cyan-900/50 shadow-2xl relative'
        : templateId === 'ai-omniscient'
        ? 'bg-black text-white font-sans p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl relative'
        : 'text-stone-900'
    }`}>
      
      {/* ── Page Header ── */}
      <div className="text-center space-y-3">
        {templateId === 'tech-sanctuary' ? (
          <div className="space-y-2">
            <span className="text-cyan-400 text-xs tracking-widest uppercase font-bold">// SYSTEM UPGRADE LEDGER</span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              PROTOCOL ROADMAP INDEX
            </h1>
            <p className="text-xs text-slate-500 uppercase max-w-xl mx-auto">
              Real-time schedule logs tracing computational and logistical infrastructure development coordinates.
            </p>
          </div>
        ) : templateId === 'ai-omniscient' ? (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-950/40 to-cyan-950/40 border border-fuchsia-800/30 px-3 py-1 rounded-full text-xs text-fuchsia-400 mb-2">
              <Cpu className="h-3.5 w-3.5 animate-spin" />
              Automated Development Pipeline Synced
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent tracking-tight">
              Spiritual System Roadmap
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Track the ongoing and future projects at {temple.name} validated by our predictive AI core.
            </p>
          </div>
        ) : templateId === 'divine-glow' ? (
          <div className="space-y-2">
            <span className="text-amber-600 text-3xl">🛕</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-amber-950">
              Temple Development Roadmap
            </h1>
            <p className="text-sm sm:text-base text-stone-750 max-w-xl mx-auto">
              Follow along with our daily progress as we grow and expand our sacred offerings.
            </p>
          </div>
        ) : templateId === 'heritage' ? (
          <div className="space-y-2 border-b-2 border-double border-red-800/20 pb-4">
            <p className="text-xs uppercase tracking-widest text-red-800 font-bold">Punaruddhana Margasuchi</p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-red-950">
              Renovation & Progress Chart
            </h1>
            <p className="text-stone-850 max-w-xl mx-auto text-sm italic">
              Verifiable chronicle of construction, restoration and development works under execution at {temple.name}.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight flex justify-center items-center gap-3">
              <Map className="h-10 w-10 text-saffron-500" />
              Development Roadmap
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Transparency is our priority. Track the ongoing and future projects at {temple.name}.
            </p>
          </div>
        )}
      </div>

      {/* Console details for high tech */}
      {templateId === 'tech-sanctuary' && telemetryLogs.length > 0 && (
        <div className="bg-black border border-slate-900 p-4 rounded-lg text-[10px] text-cyan-400 space-y-1">
          <div className="flex justify-between text-slate-500 border-b border-slate-900 pb-1 mb-2 font-bold">
            <span>UPGRADE PIPELINE STREAM</span>
            <span>DIAGNOSTIC: SUCCESS</span>
          </div>
          {telemetryLogs.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-slate-650">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Status Columns ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {renderSection(
          'Completed', 
          completed, 
          <CheckCircle2 className="h-6 w-6" />, 
          templateId === 'tech-sanctuary' ? 'text-emerald-400' : 'text-emerald-600', 
          'border-emerald-100 hover:border-emerald-300',
          'COMPLETED'
        )}
        {renderSection(
          'In Progress', 
          inProgress, 
          <Clock className="h-6 w-6" />, 
          templateId === 'tech-sanctuary' ? 'text-blue-400' : 'text-blue-600', 
          'border-blue-100 hover:border-blue-300',
          'IN_PROGRESS'
        )}
        {renderSection(
          'Planned', 
          planned, 
          <Target className="h-6 w-6" />, 
          templateId === 'tech-sanctuary' ? 'text-cyan-400' : 'text-purple-600', 
          'border-purple-100 hover:border-purple-300',
          'PLANNED'
        )}
      </div>

    </div>
  )
}
