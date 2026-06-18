'use client'

import * as React from 'react'
import { Sparkles, MessageSquare, X, Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/** Render markdown-lite: **bold** → <strong>, newlines → <br> */
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return (
      <React.Fragment key={i}>
        {part.split('\n').map((line, j, arr) => (
          <React.Fragment key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  })
}

const QUICK_SUGGESTIONS = [
  'Show donation summary',
  'Draft festival WhatsApp',
  'How to generate 80G receipt?',
  'Suggest seva prices',
  'Write event announcement',
  'What is my devotee count?',
]

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaste! I am your MandirAI Assistant. Ask me anything about your temple operations, seva configurations, donation stats, or devotee directories. 🙏',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      // Build history from last 10 messages (excluding the new one)
      const history = updatedMessages
        .slice(-11, -1) // last 10 before current
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))

      // Get templeId from localStorage
      const templeId =
        typeof window !== 'undefined' ? localStorage.getItem('templeId') ?? undefined : undefined

      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          templeId,
          history,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success && data.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            role: 'assistant',
            content: data.response,
            timestamp: new Date(),
          },
        ])
      } else {
        throw new Error(data.error || 'Failed to get AI response.')
      }
    } catch (error: any) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          role: 'assistant',
          content: 'Apologies, I encountered an issue processing your query. Please try again. 🙏',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[400px] h-[520px] bg-white dark:bg-stone-900 border border-saffron-200 dark:border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 gradient-primary text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-saffron-200 fill-saffron-200 animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm leading-tight">MandirAI Assistant</h3>
                <p className="text-[10px] text-saffron-100 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-1.5 animate-ping" />
                  Ready to serve
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50 dark:bg-stone-950/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-saffron-100 dark:bg-saffron-950/20 text-saffron-700'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-600'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-saffron-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-750 text-stone-800 dark:text-stone-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{renderMarkdown(msg.content)}</p>
                  <span
                    className={`text-[9px] block mt-1.5 text-right ${
                      msg.role === 'user' ? 'text-saffron-200' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start space-x-2.5 max-w-[85%]">
                <div className="p-2 rounded-lg shrink-0 bg-stone-200 dark:bg-stone-800 text-stone-600">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-4 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-750 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-saffron-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-saffron-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-saffron-500 rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs text-stone-450 italic">AI is meditating...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestion chips */}
          <div className="px-3 py-2 bg-stone-100/50 dark:bg-stone-900/50 border-t border-stone-100 dark:border-stone-850 flex flex-wrap gap-1.5">
            {QUICK_SUGGESTIONS.map((suggest) => (
              <button
                key={suggest}
                disabled={loading}
                onClick={() => {
                  setInput(suggest)
                }}
                className="text-[10px] font-semibold bg-white dark:bg-stone-800 hover:bg-saffron-50 dark:hover:bg-stone-750 text-stone-600 dark:text-stone-300 hover:text-saffron-700 px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700 transition-all cursor-pointer disabled:opacity-40"
              >
                {suggest}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 h-10 border-stone-200 dark:border-stone-750 focus:ring-saffron-500 rounded-xl text-sm"
            />
            <Button
              type="submit"
              disabled={!input.trim() || loading}
              className="gradient-primary text-white rounded-xl h-10 w-10 p-0 shadow-md flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full gradient-primary text-white shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center relative group focus:outline-none"
        title="Open MandirAI"
      >
        <div className="absolute inset-0 rounded-full bg-saffron-500/20 blur group-hover:blur-md transition-all duration-300" />
        {isOpen ? (
          <X className="h-6 w-6 relative z-10 animate-spin-once" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
            <Sparkles className="h-3.5 w-3.5 absolute -top-1.5 -right-1 text-saffron-200 fill-saffron-200 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  )
}
