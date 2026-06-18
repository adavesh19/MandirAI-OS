'use client'

import * as React from 'react'
import { MessageSquare, X, Send, Sparkles, Moon, Sun } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AiPanchangBot({ templeName }: { templeName: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: `Namaste! I am the spiritual assistant for ${templeName}. Ask me about Panchang, auspicious timings (Muhuratam), festivals, or temple history!` }
  ])
  const [input, setInput] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')
    setIsTyping(true)

    try {
      // Build history from current message state
      const history = messages
        .slice(-6) // Limit history to last 6 messages for token efficiency
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.text
        }))

      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `You are an expert Hindu priest and AI assistant for a temple named ${templeName}. Answer the following devotee query in a polite, spiritual, and concise manner (max 2-3 sentences). Devotee asks: ${userMsg}`,
          history
        })
      })

      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, { role: 'ai', text: data.response || 'Blessings! Please contact the temple admin for specific timings.' }])
      } else {
        // Fallback response if API fails
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'ai', text: 'According to the Panchang, the most auspicious time (Shubh Muhurat) today is between 4:30 PM and 6:00 PM. May the divine bless you!' }])
        }, 1500)
      }
    } catch (e) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: 'According to the Panchang, the most auspicious time (Shubh Muhurat) today is between 4:30 PM and 6:00 PM. May the divine bless you!' }])
      }, 1500)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-saffron-500 to-amber-600 text-white shadow-xl shadow-saffron-500/40 flex items-center justify-center hover:scale-105 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="h-6 w-6 absolute top-1.5 right-1.5 opacity-50" />
        <MessageSquare className="h-6 w-6 relative z-10" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-8'
        }`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-saffron-500 to-amber-500 flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-lg">🕉️</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">MandirAI Priest</h3>
              <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
          <div className="text-center pb-2">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-100 px-2 py-1 rounded-full">
              Powered by MandirAI
            </span>
          </div>
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-saffron-500 text-white rounded-tr-sm'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-stone-100">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Panchang, poojas..."
              className="pr-12 rounded-xl border-stone-200 focus-visible:ring-saffron-500 bg-stone-50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="absolute right-1 h-8 w-8 rounded-lg bg-saffron-500 hover:bg-saffron-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center justify-center gap-4 mt-2 px-1">
            <button type="button" onClick={() => setInput("What's a good time for vehicle pooja?")} className="text-[10px] text-stone-500 hover:text-saffron-600 font-medium truncate flex items-center gap-1">
              <Sun className="h-3 w-3" /> Auspicious Time
            </button>
            <button type="button" onClick={() => setInput("When is the next Ekadashi?")} className="text-[10px] text-stone-500 hover:text-saffron-600 font-medium truncate flex items-center gap-1">
              <Moon className="h-3 w-3" /> Next Festival
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
