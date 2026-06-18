'use client'

import * as React from 'react'
import { BookOpen, Library, Database, Terminal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ScripturesClientProps {
  templeName: string
  templateId: string
  scripturesData: Array<{
    id: number
    title: string
    category: string
    author: string
    preview: string
  }>
}

export default function ScripturesClient({ templeName, templateId, scripturesData }: ScripturesClientProps) {
  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  if (isHighTech) {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 font-mono text-slate-300 relative pb-20">
        
        {/* HUD Header */}
        <div className="relative border border-cyan-850 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="absolute -right-8 -top-8 text-[12rem] opacity-5 select-none pointer-events-none rotate-12">📚</div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 mr-2 animate-pulse" />
              DECRYPTED DATABANKS // ARCHIVAL_NODES
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              System Archives
            </h1>
            <p className="text-sm text-slate-400 border-l-2 border-cyan-500 pl-3 leading-relaxed">
              Access the decoded wisdom and historical logs of the sanctuary.
            </p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripturesData.map((item) => (
            <Card key={item.id} className="border border-slate-800 bg-slate-950/50 rounded-3xl overflow-hidden relative group hover:border-cyan-500/50 transition-all cursor-pointer">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors"></div>
              <CardContent className="p-8 space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <Terminal className="w-6 h-6 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase mb-1">{item.title}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Source: {item.author}</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl">
                  <p className="text-xs text-slate-400 leading-relaxed truncate">{item.preview}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    )
  }

  // Classic Theme
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/60 to-transparent blur-3xl rounded-full -z-10 opacity-60" />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-white p-8 sm:p-12 shadow-sm border border-amber-100/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-multiply" />
        <div className="absolute -right-8 -top-8 text-[12rem] opacity-5 select-none pointer-events-none rotate-12">📜</div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/50 backdrop-blur-md">
            <span className="text-xs font-bold text-amber-700 tracking-widest uppercase flex items-center gap-2">
              <Library className="w-3 h-3" />
              Digital Library
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Sacred Scriptures
          </h1>
          <p className="text-xl text-stone-600 font-medium">
            Explore the ancient wisdom and texts preserved by {templeName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scripturesData.map((item) => (
          <Card key={item.id} className="border border-amber-100 shadow-md bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group relative cursor-pointer">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform shadow-inner">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1 block">{item.category}</span>
                <h3 className="text-2xl font-heading font-bold text-stone-900 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                <p className="text-sm text-stone-500 italic mt-1">by {item.author}</p>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">{item.preview}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}
