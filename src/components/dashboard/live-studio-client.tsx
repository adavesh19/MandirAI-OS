'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tv2, Radio, Captions, Sparkles, PlayCircle, Users, Eye, RefreshCw, CheckCircle2, Video } from 'lucide-react'

export default function LiveStudioClient() {
  const [isLive, setIsLive] = useState(false)
  const [generatingClip, setGeneratingClip] = useState(false)
  const [clipReady, setClipReady] = useState(false)

  const handleGoLive = () => setIsLive(true)

  const handleGenerateClip = () => {
    setGeneratingClip(true)
    setTimeout(() => { setGeneratingClip(false); setClipReady(true) }, 2500)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <Tv2 className="h-8 w-8 text-red-500" />
            Live Darshan Studio
          </h1>
          <p className="text-stone-500 text-sm mt-1">Stream live aarti, auto-generate multilingual captions, and clip highlights for social media.</p>
        </div>
        {!isLive ? (
          <Button onClick={handleGoLive} className="h-11 px-6 font-bold bg-red-500 hover:bg-red-600 text-white">
            <Radio className="h-4 w-4 mr-2 animate-pulse" /> Go Live Now
          </Button>
        ) : (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-black text-red-600">LIVE — 1,204 Viewers</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stream View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
            <div className="relative bg-stone-900 aspect-video flex items-center justify-center">
              {isLive ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-7xl">🕉️</div>
                      <p className="text-white font-bold text-xl">Sri Rama Navami Aarti</p>
                      <p className="text-stone-400 text-sm">Simulated Live Feed — 04:32:18</p>
                    </div>
                  </div>
                  {/* Live Captions Overlay */}
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <div className="inline-block bg-black/70 text-white px-6 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                      🙏 मंगलम् भगवान विष्णुर्मंगलम् गरुडध्वजः... <span className="text-yellow-400 font-bold">[AI Auto-Caption: Hindi]</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <PlayCircle className="h-16 w-16 text-stone-600 mx-auto" />
                  <p className="text-stone-400 font-medium">Click "Go Live" to begin streaming</p>
                </div>
              )}
            </div>
            {isLive && (
              <div className="p-4 bg-stone-900 border-t border-stone-800 flex gap-3">
                <div className="flex-1 bg-stone-800 rounded px-3 py-2 text-stone-400 text-sm font-mono">
                  rtmp://a.rtmp.youtube.com/live2/temple-stream-key-xxxx
                </div>
                <Button size="sm" variant="outline" className="border-stone-700 text-stone-300 hover:bg-stone-800">
                    <Video className="h-4 w-4 mr-1 text-red-500" /> YouTube Live
                  </Button>
              </div>
            )}
          </Card>

          {/* AI Caption Control */}
          {isLive && (
            <Card className="border-purple-100 dark:border-purple-900/30 bg-purple-50 dark:bg-purple-950/10 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Captions className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-bold text-purple-900 dark:text-purple-300">AI Live Captions Active</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">Generating captions in: Hindi · Tamil · Telugu · English</p>
                    </div>
                  </div>
                  <span className="bg-purple-500 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">LIVE AI</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Stats */}
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm">
            <CardContent className="p-5 space-y-4">
              {[
                { label: 'Peak Viewers', value: isLive ? '1,204' : '—', icon: <Eye className="h-4 w-4 text-blue-500" /> },
                { label: 'YouTube Subscribers', value: '8,412', icon: <Video className="h-4 w-4 text-red-500" /> },
                { label: 'Avg Watch Time', value: isLive ? '14m 32s' : '—', icon: <Users className="h-4 w-4 text-green-500" /> },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="text-sm font-medium text-stone-600 dark:text-stone-400">{s.label}</span>
                  </div>
                  <span className="font-black text-stone-900 dark:text-white">{s.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Clip Generator */}
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm">
            <CardHeader className="pb-2 border-b border-stone-100 dark:border-stone-800">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                AI Clip Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <p className="text-sm text-stone-500">Automatically extract the best 60-second highlight for Instagram Reels & YouTube Shorts.</p>
              {clipReady ? (
                <Button disabled className="w-full bg-green-500 text-white font-bold opacity-100">
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Reel Ready to Post
                </Button>
              ) : (
                <Button
                  onClick={handleGenerateClip}
                  disabled={generatingClip || !isLive}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-bold"
                >
                  {generatingClip ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  {generatingClip ? 'Generating Clip...' : 'Generate Highlight Clip'}
                </Button>
              )}
              {!isLive && <p className="text-xs text-stone-400 text-center">Go Live first to enable clip generation.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
