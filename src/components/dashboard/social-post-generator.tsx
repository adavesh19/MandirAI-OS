'use client'

import * as React from 'react'
import { Sparkles, Copy, Check, Camera, Globe, Hash, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SocialPostGenerator() {
  const [context, setContext] = React.useState('')
  const [platform, setPlatform] = React.useState('Instagram')
  const [language, setLanguage] = React.useState('English')
  const [loading, setLoading] = React.useState(false)
  const [post, setPost] = React.useState('')
  const [copied, setCopied] = React.useState(false)

  const platforms = [
    { name: 'Instagram', icon: Camera },
    { name: 'Facebook', icon: Globe },
    { name: 'Twitter / X', icon: Hash },
    { name: 'WhatsApp', icon: MessageCircle }
  ]

  const generate = async () => {
    if (!context) return
    setLoading(true); setPost('')
    try {
      const res = await fetch('/api/ai/social-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, platform, language })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setPost(data.post)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(post)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-stone-900">AI Post Generator</h2>
          <p className="text-xs text-stone-500">Draft perfect captions for your temple's social media</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 block">What's happening?</label>
          <textarea
            value={context}
            onChange={e => setContext(e.target.value)}
            placeholder="e.g. Mahashivratri celebrations starting at 6 PM tomorrow. Free prasadam for all."
            rows={3}
            className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 block">Platform</label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map(p => (
                <button
                  key={p.name}
                  onClick={() => setPlatform(p.name)}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold transition-colors ${platform === p.name ? 'bg-purple-50 border-purple-300 text-purple-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                >
                  <p.icon className="h-3.5 w-3.5" /> {p.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 block">Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full border border-stone-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option>English</option>
              <option>Hindi (हिंदी)</option>
              <option>Kannada (ಕನ್ನಡ)</option>
              <option>Tamil (தமிழ்)</option>
              <option>Telugu (తెలుగు)</option>
            </select>
          </div>
        </div>

        <Button onClick={generate} disabled={loading || !context.trim()} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-11 rounded-xl">
          {loading ? '✨ Generating...' : '✨ Generate Post'}
        </Button>

        {post && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Generated Caption</label>
              <button onClick={copyToClipboard} className="text-xs flex items-center gap-1.5 font-semibold text-purple-600 hover:text-purple-700">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 whitespace-pre-wrap text-sm text-stone-800">
              {post}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
