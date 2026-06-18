'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Users, Sparkles, Send, Plus, Search, Smartphone, Phone, CheckCircle2, Loader2, Bot } from 'lucide-react'

interface AudienceMember {
  id: string
  name: string
  phone: string
  type: 'database' | 'instant'
  status: 'pending' | 'sent'
}

export default function AiCrmClient() {
  const [prompt, setPrompt] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [audience, setAudience] = useState<AudienceMember[]>([])
  const [instantNumber, setInstantNumber] = useState('')
  const [instantName, setInstantName] = useState('')
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [campaignSent, setCampaignSent] = useState(false)

  const handleAiSegment = () => {
    if (!prompt) return
    setIsAnalyzing(true)
    
    // Simulate AI querying database to build audience
    setTimeout(() => {
      setAudience([
        { id: '1', name: 'Ramesh Sharma', phone: '+91 98765 43210', type: 'database', status: 'pending' },
        { id: '2', name: 'Priya Patel', phone: '+91 87654 32109', type: 'database', status: 'pending' },
        { id: '3', name: 'Srinivas Rao', phone: '+91 76543 21098', type: 'database', status: 'pending' },
      ])
      
      // AI automatically drafts the highly personalized message
      setGeneratedMessage(
        "Namaskaram {{name}} 🙏,\n\nWe noticed you generously supported Annadanam last year. As Maha Shivaratri approaches, we invite you to renew your blessings and sponsor a meal for the devotees.\n\nClick here to donate securely: https://temple.ai/donate/annadanam\n\nMay Lord Shiva bless you and your family."
      )
      
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleAddInstantNumber = () => {
    if (!instantNumber) return
    setAudience(prev => [
      ...prev, 
      { 
        id: `inst-${Date.now()}`,
        name: instantName || 'Devotee', 
        phone: instantNumber, 
        type: 'instant',
        status: 'pending'
      }
    ])
    setInstantNumber('')
    setInstantName('')
  }

  const handleLaunchCampaign = () => {
    setIsSending(true)
    
    // Simulate API calls to WhatsApp/Twilio
    setTimeout(() => {
      setAudience(prev => prev.map(a => ({ ...a, status: 'sent' })))
      setIsSending(false)
      setCampaignSent(true)
    }, 3000)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <Bot className="h-8 w-8 text-purple-500" />
            Autonomous AI CRM
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Build dynamic audience segments via AI and execute automated WhatsApp/SMS campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Audience Builder & Execution */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-6 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                1. AI Audience Segmenter
              </h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input 
                    placeholder="E.g. 'Find devotees who donated to Annadanam last year but haven't donated this year...'"
                    className="pl-10 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 h-12"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAiSegment()}
                  />
                </div>
                <Button 
                  onClick={handleAiSegment} 
                  disabled={isAnalyzing || !prompt}
                  className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6"
                >
                  {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Users className="h-4 w-4 mr-2" />}
                  Analyze Database
                </Button>
              </div>
            </div>

            {audience.length > 0 && (
              <div className="p-6">
                <h3 className="font-bold mb-4 flex items-center justify-between text-sm uppercase tracking-wider text-stone-500">
                  <span>Selected Audience ({audience.length})</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Ready</span>
                </h3>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {audience.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${member.type === 'instant' ? 'bg-orange-100 text-orange-600' : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'}`}>
                          {member.type === 'instant' ? <Phone className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-stone-900 dark:text-stone-200">{member.name}</p>
                          <p className="text-xs text-stone-500 font-mono">{member.phone}</p>
                        </div>
                      </div>
                      <div>
                        {member.status === 'sent' ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                            <CheckCircle2 className="h-4 w-4" /> Sent
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instant Number Override */}
                <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800">
                  <h4 className="text-sm font-bold text-stone-600 dark:text-stone-400 mb-3 flex items-center gap-2">
                    <Plus className="h-4 w-4 text-orange-500" /> Add Instant Number
                  </h4>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Name (Optional)" 
                      value={instantName}
                      onChange={(e) => setInstantName(e.target.value)}
                      className="w-1/3"
                    />
                    <Input 
                      placeholder="+91 Phone Number" 
                      value={instantNumber}
                      onChange={(e) => setInstantNumber(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleAddInstantNumber} disabled={!instantNumber}>Add</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Message Preview & Dispatch */}
        <div className="space-y-6">
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm sticky top-6">
            <CardHeader className="bg-stone-50 dark:bg-stone-900/50 border-b border-stone-100 dark:border-stone-800">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                2. Campaign Execution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {generatedMessage ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">AI Generated Message</label>
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 rounded-xl p-4 text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed relative">
                      {generatedMessage}
                      <div className="absolute top-2 right-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-[10px] font-bold px-2 py-0.5 rounded">WhatsApp</div>
                    </div>
                  </div>
                  
                  {campaignSent ? (
                    <Button disabled className="w-full h-12 bg-green-500 text-white font-bold opacity-100">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Campaign Delivered Successfully
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleLaunchCampaign}
                      disabled={isSending || audience.length === 0}
                      className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-white font-bold shadow-xl shadow-stone-200 dark:shadow-none"
                    >
                      {isSending ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      ) : (
                        <Send className="h-5 w-5 mr-2 text-green-400" />
                      )}
                      {isSending ? 'Dispatching via Meta API...' : `Launch to ${audience.length} Devotees`}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                  <Smartphone className="h-8 w-8 opacity-20" />
                  <p className="text-sm">Run an AI Audience Analysis to generate the personalized message.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
