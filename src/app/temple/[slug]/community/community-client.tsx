'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ThumbsUp, 
  MessageSquarePlus, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Network, 
  Activity, 
  User, 
  MessageCircle,
  TrendingUp,
  FileCode2,
  Hash
} from 'lucide-react'

interface CommunityClientProps {
  temple: any
  initialSuggestions: any[]
  templateId?: string
}

export default function CommunityClient({ temple, initialSuggestions, templateId = 'classic' }: CommunityClientProps) {
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])

  useEffect(() => {
    if (templateId === 'tech-sanctuary') {
      setConsoleLogs([
        `SYSTEM: Connected to decentralised community node: ${temple.slug.toUpperCase()}_THREAD_INDEX`,
        `STATUS: Monitoring ${initialSuggestions.length} active threads. Ready for new proposals...`
      ])
    }
  }, [templateId, temple.slug, initialSuggestions.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    setSubmitting(true)
    
    const timestamp = new Date().toLocaleTimeString()
    if (templateId === 'tech-sanctuary') {
      setConsoleLogs(prev => [
        ...prev,
        `[${timestamp}] INGEST: Parsing payload for new idea...`,
        `[${timestamp}] CRYPTO: Generating block address hash...`
      ])
    }

    try {
      const res = await fetch('/api/v1/community-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templeId: temple.id, title, description: desc })
      })
      if (res.ok) {
        const newSugg = await res.json()
        setSuggestions(prev => [newSugg.suggestion, ...prev])
        setTitle('')
        setDesc('')
        
        if (templateId === 'tech-sanctuary') {
          setConsoleLogs(prev => [
            ...prev,
            `[${timestamp}] SUCCESS: Proposal committed. Thread ID allocated: NODE_0x${newSugg.suggestion.id.substring(0, 6).toUpperCase()}`
          ])
        }
      } else {
        if (templateId === 'tech-sanctuary') {
          setConsoleLogs(prev => [...prev, `[${timestamp}] ERROR: Write transaction rejected by ledger.`])
        }
      }
    } catch (err) {
      console.error(err)
      if (templateId === 'tech-sanctuary') {
        setConsoleLogs(prev => [...prev, `[${timestamp}] ERROR: Network timeout.`])
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpvote = async (id: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s))
    
    if (templateId === 'tech-sanctuary') {
      const timestamp = new Date().toLocaleTimeString()
      setConsoleLogs(prev => [
        ...prev.slice(-5),
        `[${timestamp}] NODE_UPVOTE: Elevated threshold for node_0x${id.substring(0,6).toUpperCase()}`
      ])
    }

    try {
      await fetch('/api/v1/community-suggestions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'upvote' })
      })
    } catch (err) {
      console.error(err)
    }
  }

  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  return (
    <div className={`max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 ${
      templateId === 'tech-sanctuary' 
        ? 'font-mono text-slate-300' 
        : templateId === 'ai-omniscient'
        ? 'text-white font-sans'
        : 'text-stone-900 font-sans'
    }`}>
      
      {/* ── Page Header ── */}
      <div className="text-center space-y-3">
        {templateId === 'tech-sanctuary' ? (
          <div className="space-y-2">
            <span className="text-cyan-400 text-xs tracking-widest uppercase font-bold">// DECENTRALIZED FORUM PROTOCOL</span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              COMMUNITY NODE INDEX
            </h1>
            <p className="text-xs text-slate-500 uppercase max-w-xl mx-auto">
              Sync spiritual initiatives, propose seva optimizations, and verify community consensus metrics.
            </p>
          </div>
        ) : templateId === 'ai-omniscient' ? (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-950/40 to-cyan-950/40 border border-fuchsia-800/30 px-3 py-1 rounded-full text-xs text-fuchsia-400 mb-2">
              <Network className="h-3.5 w-3.5 animate-pulse" />
              AI Consensus Engine: Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent tracking-tight">
              Devotee Suggestion Core
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Contribute suggestions for {temple.name} and let the community elevate the most impactful initiatives.
            </p>
          </div>
        ) : templateId === 'divine-glow' ? (
          <div className="space-y-2">
            <span className="text-amber-600 text-2xl">👥</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-amber-950">
              Community Board
            </h1>
            <p className="text-sm sm:text-base text-stone-700 max-w-xl mx-auto">
              Collaborate on new initiatives, temple renovations, and special projects.
            </p>
          </div>
        ) : templateId === 'heritage' ? (
          <div className="space-y-2 border-b-2 border-double border-red-800/20 pb-4">
            <p className="text-xs uppercase tracking-widest text-red-800 font-bold">Sangha Charchaphal</p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-red-950">
              Devotee Assembly Board
            </h1>
            <p className="text-stone-850 max-w-xl mx-auto text-sm italic">
              Share recommendations for improving services and organizing religious festivals at {temple.name}.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
              Community Board
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mt-2">
              Help shape the future of {temple.name}. Suggest new initiatives, sevas, or improvements.
            </p>
          </div>
        )}
      </div>

      {/* ── Console Logging for Tech Sanctuary ── */}
      {templateId === 'tech-sanctuary' && consoleLogs.length > 0 && (
        <div className="bg-black/90 border border-slate-900 p-4 rounded-lg text-[10px] text-cyan-400 space-y-1">
          <div className="flex justify-between text-slate-500 border-b border-slate-900 pb-1 mb-2 font-bold">
            <span>THREAD MONITOR LOG</span>
            <span>STATUS: READY</span>
          </div>
          {consoleLogs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-slate-600">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Form: Propose an Idea ── */}
      <Card className={`overflow-hidden shadow-xl border ${
        templateId === 'tech-sanctuary'
          ? 'bg-slate-950 border-cyan-900/60 shadow-[0_0_20px_rgba(6,182,212,0.05)]'
          : templateId === 'ai-omniscient'
          ? 'bg-white/5 border-white/10 shadow-[0_0_25px_rgba(192,38,211,0.05)]'
          : templateId === 'divine-glow'
          ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border-amber-500/20'
          : templateId === 'heritage'
          ? 'bg-stone-50 border-stone-300'
          : 'bg-gradient-to-br from-white to-orange-50 border-saffron-100'
      }`}>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${
              templateId === 'tech-sanctuary'
                ? 'text-white'
                : templateId === 'ai-omniscient'
                ? 'text-white'
                : templateId === 'divine-glow'
                ? 'text-amber-950'
                : templateId === 'heritage'
                ? 'text-red-950 font-serif'
                : 'text-stone-900'
            }`}>
              {templateId === 'tech-sanctuary' ? (
                <Terminal className="text-cyan-400 h-5 w-5 animate-pulse" />
              ) : templateId === 'ai-omniscient' ? (
                <Cpu className="text-fuchsia-400 h-5 w-5" />
              ) : (
                <MessageSquarePlus className="text-amber-500 h-5 w-5" />
              )}
              {templateId === 'tech-sanctuary' ? 'INITIALIZE NEW PROPOSAL THREAD' : 'Propose an Idea'}
            </h3>
            
            <Input 
              placeholder={templateId === 'tech-sanctuary' ? "PROPOSAL_TITLE: E.g., Install 50kW solar array..." : "E.g., Start a free Sunday medical clinic..."} 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className={`text-sm ${
                templateId === 'tech-sanctuary'
                  ? 'bg-black border-slate-800 text-cyan-400 focus:border-cyan-500'
                  : templateId === 'ai-omniscient'
                  ? 'bg-white/5 border-white/10 text-white focus:border-fuchsia-500'
                  : 'bg-white border-stone-200'
              }`}
              required
            />
            <Input 
              placeholder={templateId === 'tech-sanctuary' ? "PROPOSAL_DESCRIPTION: Add technical context..." : "Add more details (optional)..."} 
              value={desc} 
              onChange={e => setDesc(e.target.value)}
              className={`text-sm ${
                templateId === 'tech-sanctuary'
                  ? 'bg-black border-slate-800 text-cyan-400 focus:border-cyan-500'
                  : templateId === 'ai-omniscient'
                  ? 'bg-white/5 border-white/10 text-white focus:border-fuchsia-500'
                  : 'bg-white border-stone-200'
              }`}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={submitting} 
                className={`text-xs font-bold uppercase tracking-wider ${
                  templateId === 'tech-sanctuary'
                    ? 'bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/50'
                    : templateId === 'ai-omniscient'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white'
                    : templateId === 'divine-glow'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : templateId === 'heritage'
                    ? 'bg-red-850 hover:bg-red-900 text-white'
                    : 'bg-saffron-500 hover:bg-saffron-600 text-white'
                }`}
              >
                {submitting 
                  ? (templateId === 'tech-sanctuary' ? 'TRANSMITTING...' : 'Submitting...') 
                  : (templateId === 'tech-sanctuary' ? 'SUBMIT_TRANSACTION' : 'Submit Suggestion')}
              </Button>
            </div>
          </form>
          {!isHighTech && (
            <Sparkles className="absolute top-4 right-4 h-32 w-32 text-amber-500 opacity-5 pointer-events-none" />
          )}
        </CardContent>
      </Card>

      {/* ── Suggestions Queue ── */}
      <div className="space-y-4">
        {suggestions.map((s) => {
          const hashVal = s.id.substring(0, 6).toUpperCase()
          
          return (
            <div 
              key={s.id} 
              className={`flex items-start gap-4 p-5 border transition-all ${
                templateId === 'tech-sanctuary'
                  ? 'bg-slate-950 border-slate-800 rounded-lg hover:border-cyan-600/70 hover:bg-slate-900/10'
                  : templateId === 'ai-omniscient'
                  ? 'bg-white/5 border-white/10 rounded-2xl hover:border-fuchsia-500/60'
                  : templateId === 'divine-glow'
                  ? 'bg-white border-2 border-amber-100 hover:border-amber-400 rounded-2xl hover:shadow-md'
                  : templateId === 'heritage'
                  ? 'bg-stone-50 border-stone-300 rounded hover:border-red-850 font-serif'
                  : 'bg-white border border-stone-200 rounded-2xl hover:border-saffron-300 hover:shadow-md'
              }`}
            >
              {/* Upvote Box */}
              <button 
                onClick={() => handleUpvote(s.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors shrink-0 min-w-[64px] border ${
                  templateId === 'tech-sanctuary'
                    ? 'bg-slate-900 border-slate-800 text-cyan-400 hover:border-cyan-400'
                    : templateId === 'ai-omniscient'
                    ? 'bg-white/5 border-white/10 text-white hover:border-fuchsia-500'
                    : templateId === 'divine-glow'
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-250 text-amber-950'
                    : templateId === 'heritage'
                    ? 'bg-stone-100 hover:bg-red-50 border-stone-300 text-red-950'
                    : 'bg-stone-50 border-stone-200 hover:bg-saffron-50 hover:border-saffron-200 hover:text-saffron-600'
                }`}
              >
                <ThumbsUp className="h-4 w-4 mb-1" />
                <span className="font-bold text-sm">{s.upvotes}</span>
              </button>
              
              <div className="space-y-1 flex-1">
                {/* Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className={`text-lg font-bold ${
                    isHighTech ? 'text-white' : 'text-stone-900'
                  }`}>{s.title}</h4>
                  
                  {templateId === 'tech-sanctuary' ? (
                    <span className="text-[9px] text-slate-500 font-mono">
                      ADDR: 0x{hashVal}
                    </span>
                  ) : templateId === 'ai-omniscient' ? (
                    <span className="text-[10px] text-fuchsia-400 font-mono flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Impact: Highly Positive
                    </span>
                  ) : null}
                </div>
                
                {/* Description */}
                {s.description && (
                  <p className={`text-sm mt-1 leading-relaxed ${
                    isHighTech ? 'text-slate-450' : 'text-stone-650'
                  }`}>
                    {s.description}
                  </p>
                )}
                
                {/* Author Info */}
                <div className="flex items-center gap-2 pt-2">
                  {isHighTech ? (
                    <span className="text-[9px] text-slate-650 font-mono flex items-center gap-1 uppercase">
                      <User className="h-2.5 w-2.5" /> Devotee Signature verified
                    </span>
                  ) : (
                    <p className={`text-xs mt-2 font-medium uppercase tracking-wider ${
                      templateId === 'heritage' ? 'text-red-900/60 font-serif' : 'text-stone-400'
                    }`}>
                      Suggested by {s.devotee?.fullName || 'A Devotee'}
                    </p>
                  )}
                </div>

                {/* Simulated AI impact forecast for AI Omniscient */}
                {templateId === 'ai-omniscient' && (
                  <div className="mt-3 bg-fuchsia-950/20 border border-fuchsia-800/10 p-2.5 rounded-xl text-[10px] text-slate-400 flex items-start gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">AI Impact Analysis:</strong> Expected gotra resonance increase by +14.6%. 
                      Community wellness coefficients scale positive under Rohini transit. Recommended timeline: Q3 2026.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {suggestions.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border border-dashed ${
            templateId === 'tech-sanctuary'
              ? 'border-cyan-900 bg-slate-950 text-slate-500 font-mono'
              : templateId === 'ai-omniscient'
              ? 'border-white/10 bg-white/5 text-slate-400'
              : 'border-stone-200 bg-stone-50 text-stone-500'
          }`}>
            <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold">No active proposals in queue</h3>
            <p className="text-xs mt-1 max-w-xs mx-auto">Be the first node to broadcast an idea to {temple.name} Devotee Assembly.</p>
          </div>
        )}
      </div>

    </div>
  )
}
