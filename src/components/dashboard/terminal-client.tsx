'use client'

import * as React from 'react'
import { Terminal, Send, Activity, ShieldAlert, Cpu } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TerminalClientProps {
  templeName: string
  templeSlug: string
  templeId: string
}

interface LogLine {
  text: string
  type: 'system' | 'input' | 'output' | 'error'
}

export default function TerminalClient({ templeName, templeSlug, templeId }: TerminalClientProps) {
  const [logs, setLogs] = React.useState<LogLine[]>([])
  const [input, setInput] = React.useState('')
  const [commandHistory, setCommandHistory] = React.useState<string[]>([])
  const [historyIndex, setHistoryIndex] = React.useState(-1)
  const [loading, setLoading] = React.useState(false)
  const terminalEndRef = React.useRef<HTMLDivElement>(null)

  // 1. Simulated Boot Sequence on Mount
  React.useEffect(() => {
    const bootLogs: LogLine[] = [
      { text: `[SYSTEM] Booting MandirAI OS v1.4.2-daemon...`, type: 'system' },
      { text: `[SYSTEM] Initializing memory registers... OK`, type: 'system' },
      { text: `[SYSTEM] Syncing local schemas with PostgreSQL database... OK`, type: 'system' },
      { text: `[SYSTEM] Initializing Autonomous Agent Core daemon... ACTIVE`, type: 'system' },
      { text: `[SYSTEM] Secured proxy middleware routing: active`, type: 'system' },
      { text: `\nWelcome to the Command Console for ${templeName}.`, type: 'system' },
      { text: `Type 'help' to list available system operations.`, type: 'system' },
      { text: `───────────────────────────────────────────────────`, type: 'system' },
    ]

    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentIdx]])
        currentIdx++
      } else {
        clearInterval(interval)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [templeName])

  // Scroll to bottom on log updates
  React.useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // 2. Command Handler
  const handleExecute = async (cmdStr: string) => {
    if (!cmdStr.trim()) return

    const trimmed = cmdStr.trim()
    
    // Add to logs
    setLogs(prev => [...prev, { text: `nexus@temple-os:~$ ${trimmed}`, type: 'input' }])
    setInput('')

    // Update command history
    setCommandHistory(prev => {
      const filtered = prev.filter(c => c !== trimmed)
      return [...filtered, trimmed]
    })
    setHistoryIndex(-1)

    const lower = trimmed.toLowerCase()

    // Local commands
    if (lower === 'clear') {
      setLogs([])
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/ai/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: trimmed }),
      })

      const data = await res.json()

      if (res.ok && data.output) {
        setLogs(prev => [...prev, { text: data.output, type: 'output' }])
      } else {
        setLogs(prev => [...prev, { text: `[ERROR] ${data.error || 'Failed to execute command.'}`, type: 'error' }])
      }
    } catch (e: any) {
      setLogs(prev => [...prev, { text: `[ERROR] Connection failure: ${e.message}`, type: 'error' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleExecute(input)
  }

  // 3. Arrow Keys Navigation for Command History
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      
      const newIndex = historyIndex + 1
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    }
  }

  return (
    <div className="space-y-6 font-sans">
      {/* HUD Header banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-xl text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <h1 className="font-heading text-xl font-bold tracking-tight">AI Command Shell OS</h1>
          </div>
          <p className="text-xs text-zinc-400 font-mono">Autonomous DB mutations & Natural Language Operations</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-1.5 rounded-lg">
            <Activity className="h-3.5 w-3.5" />
            <span>Daemon: Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 bg-cyan-955/40 border border-cyan-900/40 px-3 py-1.5 rounded-lg">
            <Cpu className="h-3.5 w-3.5" />
            <span>Gotra DB: Synced</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Frame */}
      <Card className="bg-black border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[580px] relative">
        {/* CRT Scan lines & Flicker Overlay effect */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20" />

        {/* Terminal Header */}
        <div className="bg-zinc-900 px-5 py-3 border-b border-zinc-800 flex items-center justify-between z-10 shrink-0">
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500/80"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">system_control@omni_shell</span>
        </div>

        {/* Console logs area */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap select-all z-10 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {logs.map((log, idx) => {
            let color = 'text-emerald-400'
            if (log.type === 'system') color = 'text-zinc-500'
            else if (log.type === 'input') color = 'text-white font-bold'
            else if (log.type === 'error') color = 'text-red-400 font-bold'
            return (
              <div key={idx} className={`${color}`}>
                {log.text}
              </div>
            )
          })}
          {loading && (
            <div className="text-cyan-400 flex items-center gap-2 animate-pulse pt-2">
              <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse"></span>
              <span>AI Agent parsing gotra registers & compiling mutations...</span>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center gap-3 z-10 shrink-0"
        >
          <span className="font-mono text-emerald-400 text-sm font-bold pl-2 select-none">
            nexus@temple-os:~$
          </span>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="E.g., help, status, list-devotees, or run natural language prompts..."
            className="flex-1 bg-transparent border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-emerald-400 font-mono text-sm placeholder:text-zinc-700 h-10 p-0"
            autoFocus
          />
          <Button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 px-4 h-10 font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-inner"
          >
            <Send className="h-3.5 w-3.5" />
            EXECUTE
          </Button>
        </form>
      </Card>
      
      {/* Help Tip Banner */}
      <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-zinc-500 font-mono">
        <ShieldAlert className="h-5 w-5 text-amber-500 flex-shrink-0" />
        <div>
          <strong className="text-zinc-300">Security Guard Protocol:</strong> Writing operations in natural language are validated against active temple scope categories. Only database-safe mutations are executed. Use <code className="text-zinc-300">help</code> for command specs.
        </div>
      </div>
    </div>
  )
}
