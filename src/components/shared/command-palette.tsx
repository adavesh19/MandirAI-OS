'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search, Terminal, ArrowRight, Heart, Users, Calendar, LayoutDashboard, Settings } from 'lucide-react'

// Simple custom hook to listen for Cmd+K / Ctrl+K
export function useCommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return { isOpen, setIsOpen }
}

const actionGroups = [
  {
    title: 'Navigation',
    items: [
      { id: 'nav-dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { id: 'nav-donations', label: 'Go to Donations', icon: Heart, href: '/donations' },
      { id: 'nav-devotees', label: 'Go to Devotees', icon: Users, href: '/devotees' },
      { id: 'nav-events', label: 'Go to Events', icon: Calendar, href: '/events' },
      { id: 'nav-settings', label: 'Go to Settings', icon: Settings, href: '/settings' },
    ]
  },
  {
    title: 'Quick Actions',
    items: [
      { id: 'action-devotee', label: 'Create new Devotee', icon: Users, href: '/devotees' },
      { id: 'action-event', label: 'Schedule an Event', icon: Calendar, href: '/events' },
      { id: 'action-donate', label: 'Record a Donation', icon: Heart, href: '/donations' },
    ]
  },
  {
    title: 'System Commands',
    items: [
      { id: 'sys-terminal', label: 'Open Terminal Shell', icon: Terminal, href: '/dashboard/terminal' },
    ]
  }
]

export default function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette()
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Flatten items for keyboard navigation based on search query
  const filteredItems = React.useMemo(() => {
    const q = query.toLowerCase()
    return actionGroups.flatMap(group => 
      group.items.filter(item => item.label.toLowerCase().includes(q))
    )
  }, [query])

  React.useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Handle keyboard nav
  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % Math.max(filteredItems.length, 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filteredItems.length) % Math.max(filteredItems.length, 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selected = filteredItems[selectedIndex]
        if (selected) {
          setIsOpen(false)
          router.push(selected.href)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, router, setIsOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div 
        className="relative w-full max-w-2xl bg-stone-950 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 font-mono text-stone-300"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-stone-800 bg-stone-950">
          <Terminal className="w-5 h-5 text-cyan-400 mr-3 animate-pulse" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-stone-600 text-lg"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900 border border-stone-800 text-stone-500 uppercase">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-stone-800">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-stone-500 text-sm">
              No matching commands found for "{query}"
            </div>
          ) : (
            actionGroups.map(group => {
              const groupItems = group.items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
              if (groupItems.length === 0) return null

              return (
                <div key={group.title} className="mb-4 last:mb-0">
                  <div className="px-3 py-1.5 text-xs font-bold text-stone-600 uppercase tracking-widest">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {groupItems.map(item => {
                      const isSelected = filteredItems[selectedIndex]?.id === item.id
                      const Icon = item.icon
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setIsOpen(false)
                            router.push(item.href)
                          }}
                          onMouseEnter={() => {
                            const index = filteredItems.findIndex(i => i.id === item.id)
                            if (index !== -1) setSelectedIndex(index)
                          }}
                          className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-900/50' 
                              : 'text-stone-400 hover:bg-stone-900 border border-transparent'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mr-3 ${isSelected ? 'text-cyan-400' : 'text-stone-500'}`} />
                          <span className="flex-1 text-sm">{item.label}</span>
                          {isSelected && <ArrowRight className="w-4 h-4 text-cyan-500 animate-in slide-in-from-left-2" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-stone-800 bg-stone-950/50 text-[10px] text-stone-500 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800">↵</kbd>
              Execute
            </span>
          </div>
          <div className="uppercase tracking-widest font-bold text-cyan-900">
            MandirAI OS Core
          </div>
        </div>
      </div>
    </div>
  )
}
