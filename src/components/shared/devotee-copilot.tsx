'use client'

import * as React from 'react'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'

export default function DevoteeCopilot({ templeSlug, templateId }: { templeSlug: string, templateId?: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<{role: 'user'|'assistant', content: string}[]>([
    { role: 'assistant', content: 'Namaskaram! I am the temple AI assistant. How can I help you today? You can ask me about timings, the panchang, or even book a seva.' }
  ])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user' as const, content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/ai/devotee-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, templeSlug })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Apologies, I am experiencing a temporal disruption. Please try again later.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        } ${isHighTech ? 'bg-cyan-950 border-2 border-cyan-500 text-cyan-400' : 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white'}`}
      >
        <MessageSquare className="w-6 h-6" />
        {isHighTech && (
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20"></span>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] flex flex-col transition-all duration-300 transform origin-bottom-right rounded-2xl overflow-hidden shadow-2xl ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
      } ${isHighTech ? 'bg-stone-950 border border-cyan-500/50' : 'bg-white border border-stone-200'}`}>
        
        {/* Header */}
        <div className={`p-4 flex items-center justify-between ${isHighTech ? 'bg-cyan-950/50 border-b border-cyan-900' : 'bg-gradient-to-r from-saffron-50 to-amber-50 border-b border-saffron-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isHighTech ? 'bg-cyan-900 text-cyan-400' : 'bg-white text-saffron-500 shadow-sm'}`}>
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-bold text-sm ${isHighTech ? 'text-white' : 'text-stone-900'}`}>Temple Copilot</h3>
              <p className={`text-[10px] uppercase tracking-wider flex items-center gap-1 ${isHighTech ? 'text-cyan-500' : 'text-saffron-600'}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighTech ? 'bg-cyan-400' : 'bg-saffron-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isHighTech ? 'bg-cyan-500' : 'bg-saffron-500'}`}></span>
                </span>
                Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className={`p-2 rounded-md transition-colors ${isHighTech ? 'text-cyan-500 hover:bg-cyan-900/50' : 'text-stone-500 hover:bg-white'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 p-4 overflow-y-auto flex flex-col gap-4 ${isHighTech ? 'bg-stone-950 font-mono' : 'bg-stone-50/50 font-sans'}`}>
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'assistant' 
                  ? isHighTech ? 'bg-cyan-900 text-cyan-400' : 'bg-white text-saffron-500 shadow-sm'
                  : isHighTech ? 'bg-stone-800 text-stone-400' : 'bg-stone-200 text-stone-600'
              }`}>
                {m.role === 'assistant' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                m.role === 'user'
                  ? isHighTech ? 'bg-cyan-950/50 text-cyan-100 border border-cyan-900/50 rounded-tr-sm' : 'bg-stone-900 text-white rounded-tr-sm'
                  : isHighTech ? 'bg-stone-900 text-stone-300 border border-stone-800 rounded-tl-sm' : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-tl-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="self-start flex gap-3 max-w-[85%]">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isHighTech ? 'bg-cyan-900 text-cyan-400' : 'bg-white text-saffron-500 shadow-sm'}`}>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className={`p-3 rounded-2xl text-sm flex items-center gap-2 ${isHighTech ? 'bg-stone-900 border border-stone-800 rounded-tl-sm' : 'bg-white shadow-sm border border-stone-100 rounded-tl-sm'}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isHighTech ? 'bg-cyan-500' : 'bg-saffron-500'}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isHighTech ? 'bg-cyan-500' : 'bg-saffron-500'}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isHighTech ? 'bg-cyan-500' : 'bg-saffron-500'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`p-3 border-t flex gap-2 ${isHighTech ? 'bg-stone-950 border-cyan-900/50' : 'bg-white border-stone-100'}`}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2 rounded-full outline-none text-sm transition-all ${
              isHighTech 
                ? 'bg-stone-900 border border-stone-800 text-cyan-100 focus:border-cyan-500/50 placeholder:text-stone-600 font-mono' 
                : 'bg-stone-100 border border-transparent focus:bg-white focus:border-saffron-300 text-stone-900'
            }`}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-all disabled:opacity-50 flex items-center justify-center shrink-0 ${
              isHighTech
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-900/50 hover:bg-cyan-900'
                : 'bg-saffron-500 text-white hover:bg-saffron-600'
            }`}
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </>
  )
}
