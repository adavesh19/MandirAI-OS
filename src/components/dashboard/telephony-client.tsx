'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mic, Volume2, Settings, AudioLines, PhoneIncoming, Globe2, Loader2, CheckCircle2 } from 'lucide-react'

export default function TelephonyClient() {
  const [activeCall, setActiveCall] = React.useState<boolean>(false)
  const [callDuration, setCallDuration] = React.useState(0)
  const [transcript, setTranscript] = React.useState<{speaker: 'ai' | 'caller', text: string}[]>([])

  // Simulated AI Call sequence
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    let seqTimeout: NodeJS.Timeout

    if (activeCall) {
      interval = setInterval(() => setCallDuration(p => p + 1), 1000)
      
      const sequence = [
        { time: 1000, speaker: 'ai' as const, text: "Namaskaram! This is the MandirAI. How can I help you today?" },
        { time: 4000, speaker: 'caller' as const, text: "Yes, I would like to book an Archana for tomorrow morning." },
        { time: 7000, speaker: 'ai' as const, text: "Certainly. I have checked the availability. We have slots at 7:00 AM and 8:30 AM. Which would you prefer?" },
        { time: 11000, speaker: 'caller' as const, text: "8:30 AM please, for my son Rahul. Gotra is Bharadwaja." },
        { time: 15000, speaker: 'ai' as const, text: "Booking confirmed for Rahul, Bharadwaja Gotra at 8:30 AM tomorrow. I have sent the payment link to this mobile number via SMS. May the divine bless you." }
      ]

      sequence.forEach(({ time, speaker, text }) => {
        seqTimeout = setTimeout(() => {
          setTranscript(prev => [...prev, { speaker, text }])
        }, time)
      })

      // End call
      setTimeout(() => {
        setActiveCall(false)
      }, 20000)
    } else {
      setCallDuration(0)
      setTranscript([])
    }

    return () => {
      clearInterval(interval)
      clearTimeout(seqTimeout)
    }
  }, [activeCall])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <Mic className="w-8 h-8 text-cyan-500" />
            Telephony Command Center
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            Monitor and configure the autonomous AI Voice Agent handling inbound calls.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-lg border border-green-200 dark:border-green-900/50">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">
              Lines Open (Twilio)
            </span>
          </div>
          <button 
            onClick={() => !activeCall && setActiveCall(true)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              activeCall 
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed dark:bg-stone-900 dark:text-stone-600' 
                : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
            }`}
          >
            Simulate Inbound Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Call Monitor */}
        <Card className="lg:col-span-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 overflow-hidden relative">
          <CardHeader className="border-b border-stone-100 dark:border-stone-900/50 bg-stone-50/50 dark:bg-stone-900/20 pb-4">
            <CardTitle className="text-sm font-bold text-stone-500 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AudioLines className="w-4 h-4 text-cyan-500" />
                Live Call Telemetry
              </span>
              {activeCall && (
                <span className="text-red-500 font-mono flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  {formatTime(callDuration)}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {!activeCall && transcript.length === 0 ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-stone-400 space-y-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-stone-300 dark:border-stone-800 flex items-center justify-center">
                  <Phone className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-sm">Awaiting inbound calls on +91 800-TEMPLE-AI...</p>
              </div>
            ) : (
              <div className="h-[400px] flex flex-col">
                {/* Audio Visualizer Simulation */}
                <div className="h-32 bg-stone-900 dark:bg-black relative overflow-hidden flex items-center justify-center gap-1">
                  {[...Array(40)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 bg-cyan-500 rounded-full transition-all duration-150"
                      style={{ 
                        height: activeCall ? `${Math.random() * 80 + 10}%` : '4px',
                        opacity: activeCall ? 1 : 0.2
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-transparent to-stone-900 dark:from-black dark:to-black"></div>
                </div>

                {/* Live Transcript */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-50 dark:bg-stone-950 font-mono text-sm">
                  {transcript.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.speaker === 'caller' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 fade-in`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.speaker === 'ai' ? 'bg-cyan-900 text-cyan-400 border border-cyan-500/30' : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                      }`}>
                        {msg.speaker === 'ai' ? <Mic className="w-4 h-4" /> : <PhoneIncoming className="w-4 h-4" />}
                      </div>
                      <div className={`p-3 rounded-lg max-w-[80%] ${
                        msg.speaker === 'ai' 
                          ? 'bg-stone-900 text-cyan-100 border border-stone-800' 
                          : 'bg-white border border-stone-200 text-stone-700 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {activeCall && (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-5 h-5 text-cyan-500 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card className="border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-500" />
                Agent Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">Primary Voice Model</label>
                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="font-mono text-sm text-stone-900 dark:text-stone-300 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-cyan-500" />
                    Onyx (Calm & Devotional)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">Supported Languages</label>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Hindi', 'Tamil', 'Telugu'].map(lang => (
                    <span key={lang} className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 border border-stone-200 dark:border-stone-700 flex items-center gap-1">
                      <Globe2 className="w-3 h-3" /> {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Today's Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800">
                  <div className="text-2xl font-black text-stone-900 dark:text-white">142</div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Calls Handled</div>
                </div>
                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800">
                  <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">89%</div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Resolution Rate</div>
                </div>
                <div className="col-span-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/50">
                  <div className="text-2xl font-black text-green-700 dark:text-green-400">₹42,500</div>
                  <div className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest mt-1">Seva Revenue via Phone</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
