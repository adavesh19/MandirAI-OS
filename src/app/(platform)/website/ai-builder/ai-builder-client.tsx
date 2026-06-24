'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, ArrowLeft, Send, CheckCircle2, Loader2, Monitor, Smartphone, 
  RefreshCw, Cpu, Check, Key, ImageIcon, UploadCloud, Copy,
  Trash2, MoveUp, MoveDown, Volume2, VolumeX, AlertTriangle, 
  HelpCircle, Settings, LayoutGrid, Flame
} from 'lucide-react'
import Link from 'next/link'

interface AIBuilderClientProps {
  templeSlug: string
  templeName: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  status?: 'sending' | 'success' | 'error'
  changes?: string[]
}

interface MediaFile {
  id: string
  url: string
  title: string
}

// Spinning Golden Holographic AI Avatar with Canvas Orbiting rings
const HologramAvatar = ({ loading }: { loading: boolean }) => {
  return (
    <div className="relative flex flex-col items-center justify-center my-4 select-none animate-in fade-in duration-500">
      <div className="relative h-20 w-20 flex items-center justify-center">
        {/* Outer spinning aura */}
        <div className={`absolute inset-0 border border-amber-500/20 rounded-full ${loading ? 'animate-spin border-dashed border-amber-500' : 'animate-pulse'}`} />
        
        {/* Middle rotating ring */}
        <div className={`absolute inset-2 border border-dashed border-orange-500/30 rounded-full ${loading ? 'animate-spin-slow' : 'animate-pulse'}`} />
        
        {/* Pulsating center */}
        <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)]">
          <span className="text-2xl animate-pulse">🕉️</span>
        </div>
        
        {/* Ambient shadow glow */}
        <div className="absolute inset-2 bg-amber-500/10 rounded-full filter blur-md animate-pulse" />
      </div>
      <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
        </span>
        {loading ? 'AI Core: Generating...' : 'AI Core: Active'}
      </p>
    </div>
  )
}

export default function AIBuilderClient({ templeSlug, templeName }: AIBuilderClientProps) {
  const [prompt, setPrompt] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop')
  const [iframeKey, setIframeKey] = React.useState(0)
  const [selectedProvider, setSelectedProvider] = React.useState<'gemini' | 'groq'>('gemini')
  const [showConfig, setShowConfig] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'chat' | 'layout' | 'editor' | 'customizer' | 'gallery'>('chat')
  
  // Custom Co-Pilot Upgrades
  const [targetedBlockId, setTargetedBlockId] = React.useState<string | null>(null)
  const [targetedBlockType, setTargetedBlockType] = React.useState<string | null>(null)
  const [initialBlocks, setInitialBlocks] = React.useState<any[]>([])
  const [draftBlocks, setDraftBlocks] = React.useState<any[] | null>(null)
  const [draftTitle, setDraftTitle] = React.useState<any | null>(null)
  const [draftDescription, setDraftDescription] = React.useState<any | null>(null)
  const [isRecording, setIsRecording] = React.useState(false)
  const [approving, setApproving] = React.useState(false)

  // Futuristic Sound Feedback
  const [soundEnabled, setSoundEnabled] = React.useState(false)
  
  // Customizer styling states
  const [themeId, setThemeId] = React.useState('classic')
  const [primaryColor, setPrimaryColor] = React.useState('#ea580c')
  const [accentColor, setAccentColor] = React.useState('#ea580c')
  const [fontFamily, setFontFamily] = React.useState('Inter')

  // Real-time AI console rolling log feed
  const [terminalLogs, setTerminalLogs] = React.useState<string[]>([])

  // Heuristic Auditor states
  const [auditScore, setAuditScore] = React.useState<number | null>(null)
  const [auditsList, setAuditsList] = React.useState<any[]>([])
  const [auditing, setAuditing] = React.useState(false)

  // Active block editor and translation assistant states
  const [selectedLanguage, setSelectedLanguage] = React.useState<'en' | 'hi' | 'kn' | 'ta' | 'te'>('en')
  const [translatingField, setTranslatingField] = React.useState<string | null>(null)
  const [translatingBlockId, setTranslatingBlockId] = React.useState<string | null>(null)
  const [translatingAll, setTranslatingAll] = React.useState(false)
  const [hudSteps, setHudSteps] = React.useState<Array<{ label: string, status: 'pending' | 'active' | 'done' | 'error' }>>([])

  // Media states
  const [mediaList, setMediaList] = React.useState<MediaFile[]>([])
  const [uploadingMedia, setUploadingMedia] = React.useState(false)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleMediaUpload = async (file: File, callback: (url: string) => void) => {
    setUploadingMedia(true)
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await fetch('/api/media/onboarding-upload', {
        method: 'POST',
        body: data,
      })
      const result = await res.json()
      if (res.ok && result.success) {
        callback(result.url)
      } else {
        alert(result.error || 'Upload failed')
      }
    } catch (err) {
      alert('Upload error')
    } finally {
      setUploadingMedia(false)
    }
  }

  // Active blocks computed
  const activeBlocks = draftBlocks || initialBlocks

  const playAudioBeep = (type: 'click' | 'success' | 'error') => {
    if (!soundEnabled || typeof window === 'undefined') return
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      if (type === 'click') {
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.08)
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(600, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.06, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.2)
      } else if (type === 'error') {
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.25)
      }
    } catch (e) {
      console.warn('AudioContext failed:', e)
    }
  }

  // Fetch current layout blocks from DB
  const fetchBlocks = async () => {
    try {
      const res = await fetch('/api/website/blocks')
      const data = await res.json()
      if (res.ok) {
        setInitialBlocks(data.blocks || [])
      }
    } catch (err) {
      console.error('Failed to fetch blocks:', err)
    }
  }

  // Fetch theme configuration
  const fetchThemeConfig = async () => {
    try {
      const res = await fetch('/api/settings/template')
      const data = await res.json()
      if (res.ok && data.themeConfig) {
        setThemeId(data.themeConfig.templateId || 'classic')
        setPrimaryColor(data.themeConfig.primaryColor || '#ea580c')
        setAccentColor(data.themeConfig.accentColor || '#ea580c')
        setFontFamily(data.themeConfig.fontFamily || 'Inter')
      }
    } catch (err) {
      console.error('Failed to fetch themeConfig:', err)
    }
  }

  // Fetch media files
  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (res.ok) {
        setMediaList(data.mediaList || [])
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Active Block visual property editors state managers
  const updateBlockData = (blockId: string, field: string, lang: string, value: string) => {
    const updatedBlocks = activeBlocks.map(block => {
      if (block.id === blockId) {
        const currentData = block.data || {}
        const currentFieldVal = currentData[field] || {}
        
        let newFieldVal
        if (typeof currentFieldVal === 'object' && currentFieldVal !== null) {
          newFieldVal = {
            ...currentFieldVal,
            [lang]: value
          }
        } else {
          newFieldVal = value
        }

        return {
          ...block,
          data: {
            ...currentData,
            [field]: newFieldVal
          }
        }
      }
      return block
    })
    setDraftBlocks(updatedBlocks)
  }

  const updateBlockSetting = (blockId: string, settingKey: string, value: any) => {
    const updatedBlocks = activeBlocks.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          settings: {
            ...(block.settings || {}),
            [settingKey]: value
          }
        }
      }
      return block
    })
    setDraftBlocks(updatedBlocks)
  }

  const updateBlockDataDirect = (blockId: string, field: string, value: any) => {
    const updatedBlocks = activeBlocks.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          data: {
            ...(block.data || {}),
            [field]: value
          }
        }
      }
      return block
    })
    setDraftBlocks(updatedBlocks)
  }

  const handleFieldTranslate = async (blockId: string, field: string, englishValue: string) => {
    if (!englishValue.trim()) return
    setTranslatingField(`${blockId}-${field}-translate`)
    playAudioBeep('click')
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: englishValue, type: 'translate' })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        const translations = data.result
        const updatedBlocks = activeBlocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              data: {
                ...(block.data || {}),
                [field]: {
                  en: englishValue,
                  hi: translations.hi || '',
                  kn: translations.kn || '',
                  ta: translations.ta || '',
                  te: translations.te || ''
                }
              }
            }
          }
          return block
        })
        setDraftBlocks(updatedBlocks)
        playAudioBeep('success')
      } else {
        playAudioBeep('error')
      }
    } catch (err) {
      console.error(err)
      playAudioBeep('error')
    } finally {
      setTranslatingField(null)
    }
  }

  const handleFieldEnhance = async (blockId: string, field: string, englishValue: string) => {
    if (!englishValue.trim()) return
    setTranslatingField(`${blockId}-${field}-enhance`)
    playAudioBeep('click')
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: englishValue, type: 'enhance' })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        const translations = data.result
        const updatedBlocks = activeBlocks.map(block => {
          if (block.id === blockId) {
            return {
              ...block,
              data: {
                ...(block.data || {}),
                [field]: {
                  en: translations.en || englishValue,
                  hi: translations.hi || '',
                  kn: translations.kn || '',
                  ta: translations.ta || '',
                  te: translations.te || ''
                }
              }
            }
          }
          return block
        })
        setDraftBlocks(updatedBlocks)
        playAudioBeep('success')
      } else {
        playAudioBeep('error')
      }
    } catch (err) {
      console.error(err)
      playAudioBeep('error')
    } finally {
      setTranslatingField(null)
    }
  }

  const handleBlockTranslate = async (blockId: string) => {
    const blockToTranslate = activeBlocks.find(b => b.id === blockId)
    if (!blockToTranslate) return
    setTranslatingBlockId(blockId)
    playAudioBeep('click')
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ block: blockToTranslate, type: 'translate_block' })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        const translatedBlock = data.result
        const updatedBlocks = activeBlocks.map(block => {
          if (block.id === blockId) {
            return translatedBlock
          }
          return block
        })
        setDraftBlocks(updatedBlocks)
        playAudioBeep('success')
      } else {
        playAudioBeep('error')
      }
    } catch (err) {
      console.error(err)
      playAudioBeep('error')
    } finally {
      setTranslatingBlockId(null)
    }
  }

  const handleTranslateAllBlocks = async () => {
    setTranslatingAll(true)
    playAudioBeep('click')
    try {
      const updated = []
      for (const block of activeBlocks) {
        const res = await fetch('/api/ai/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ block: block, type: 'translate_block' })
        })
        const data = await res.json()
        if (res.ok && data.success) {
          updated.push(data.result)
        } else {
          updated.push(block)
        }
      }
      setDraftBlocks(updated)
      playAudioBeep('success')
    } catch (err) {
      console.error(err)
      playAudioBeep('error')
    } finally {
      setTranslatingAll(false)
    }
  }

  React.useEffect(() => {
    fetchMedia()
    fetchBlocks()
    fetchThemeConfig()
  }, [])

  // Push theme configuration variables to iframe
  const pushThemeToIframe = () => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'UPDATE_PREVIEW_THEME',
        themeConfig: {
          templateId: themeId,
          primaryColor,
          accentColor,
          fontFamily
        }
      }, '*')
    }
  }

  // Push theme updates when states change
  React.useEffect(() => {
    pushThemeToIframe()
  }, [themeId, primaryColor, accentColor, fontFamily, iframeKey])

  // iframe click targeted block listener
  React.useEffect(() => {
    const handleFrameMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'SELECT_BLOCK') {
        playAudioBeep('click')
        setTargetedBlockId(e.data.blockId)
        setTargetedBlockType(e.data.blockType)
        setActiveTab('editor')
      }
    }
    window.addEventListener('message', handleFrameMessage)
    return () => window.removeEventListener('message', handleFrameMessage)
  }, [soundEnabled])

  // Sync draft blocks to iframe on changes
  React.useEffect(() => {
    if (draftBlocks) {
      const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'UPDATE_PREVIEW_BLOCKS',
          blocks: draftBlocks
        }, '*')
      }
    }
  }, [draftBlocks, iframeKey])

  const handleUploadClick = () => {
    playAudioBeep('click')
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingMedia(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        playAudioBeep('success')
        fetchMedia()
      } else {
        playAudioBeep('error')
      }
    } catch (err) {
      console.error(err)
      playAudioBeep('error')
    } finally {
      setUploadingMedia(false)
    }
  }

  const handleCopyLink = (id: string, url: string) => {
    const absoluteUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(absoluteUrl)
    setCopiedId(id)
    playAudioBeep('click')
    setTimeout(() => setCopiedId(null), 2000)
    
    // Switch back to chat automatically and paste prompt help
    setActiveTab('chat')
    setPrompt(prev => `${prev} Use this image: ${url} to `)
  }
  
  // Welcome message from MandirAI Co-Pilot
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Namaste! I am your MandirAI Assistant. I can help you design, write, and refine the home page of **${templeName}** in 5 languages (English, Hindi, Kannada, Tamil, and Telugu).

Tell me what you'd like to do. For example:
- *"Add a welcoming section about our temple's history and deity"*
- *"Write an announcement about changing darshan timings for the summer"*
- *"Make the welcome message sound more devotional and poetic"*

💡 **Futuristic Co-Pilot Features**:
1. Click elements in the Live Preview on the right to target them.
2. Drag and rearrange blocks visually in the **Visual Layout** tab.
3. Tweak colors and typography instantly in the **Customizer** tab.
4. Run a Heuristic Design Audit below the AI avatar!`,
      timestamp: new Date()
    }
  ])

  const [currentStep, setCurrentStep] = React.useState<string>('')

  const handleReloadPreview = () => {
    playAudioBeep('click')
    setIframeKey(prev => prev + 1)
  }

  const handleSuggestionClick = (suggestion: string) => {
    playAudioBeep('click')
    setPrompt(suggestion)
  }

  // Voice speech dictation input
  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice dictation is not supported in this browser. Please use Google Chrome or Edge.')
      return
    }

    playAudioBeep('click')

    if (isRecording) {
      setIsRecording(false)
      return
    }

    const rec = new SpeechRecognition()
    rec.lang = 'en-IN'
    rec.interimResults = false
    rec.maxAlternatives = 1

    rec.onstart = () => {
      setIsRecording(true)
    }

    rec.onend = () => {
      setIsRecording(false)
    }

    rec.onerror = () => {
      setIsRecording(false)
      playAudioBeep('error')
    }

    rec.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript
      setPrompt((prev) => (prev ? `${prev} ${speechToText}` : speechToText))
      playAudioBeep('success')
    }

    rec.start()
  }

  // Visual layout block ordering and reordering
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= activeBlocks.length) return
    
    playAudioBeep('click')
    const updated = [...activeBlocks]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp
    
    setDraftBlocks(updated)
  }

  const duplicateBlock = (index: number) => {
    playAudioBeep('success')
    const blockToDuplicate = activeBlocks[index]
    const duplicated = {
      ...blockToDuplicate,
      id: `${blockToDuplicate.type}-${Date.now().toString().slice(-4)}`
    }
    const updated = [...activeBlocks]
    updated.splice(index + 1, 0, duplicated)
    setDraftBlocks(updated)
  }

  const deleteBlock = (index: number) => {
    playAudioBeep('error')
    const updated = activeBlocks.filter((_, idx) => idx !== index)
    setDraftBlocks(updated)
  }

  // Block Library Append
  const addBlockFromLibrary = (type: string) => {
    playAudioBeep('success')
    const newBlockId = `${type}-${Date.now().toString().slice(-4)}`
    let newBlockData = {}
    let newBlockSettings = {}
    
    switch (type) {
      case 'hero':
        newBlockData = {
          title: { en: 'Welcome to Our Temple', hi: 'हमारे मंदिर में आपका स्वागत है' },
          subtitle: { en: 'A sacred spiritual home', hi: 'एक पवित्र आध्यात्मिक निवास' }
        }
        newBlockSettings = { alignment: 'center', symbol: 'om' }
        break
      case 'timings':
        newBlockData = {
          heading: { en: 'Daily Darshan Hours', hi: 'दैनिक दर्शन समय' },
          morning: { en: '06:00 AM - 12:00 PM', hi: 'प्रातः 06:00 - दोपहर 12:00' },
          evening: { en: '04:00 PM - 09:00 PM', hi: 'सायं 04:00 - रात्रि 09:00' }
        }
        break
      case 'sevas':
        newBlockData = {
          heading: { en: 'Book Sacred Sevas', hi: 'पवित्र सेवाएँ बुक करें' }
        }
        break
      case 'notice-board':
        newBlockData = {
          title: { en: 'Sacred Announcements', hi: 'पवित्र घोषणाएं', kn: 'ಪವಿತ್ರ ಘೋಷಣೆಗಳು' },
          notices: [
            {
              id: 'n-1',
              title: { en: 'Shravan Maas Mahotsav', hi: 'श्रावण मास महोत्सव', kn: 'ಶ್ರಾವಣ ಮಾಸ ಮಹೋತ್ಸವ' },
              content: { en: 'Daily special pujas and rudrabhishek throughout the holy month.', hi: 'पवित्र महीने भर दैनिक विशेष पूजा और रुद्राभिषेक।', kn: 'ಪವಿತ್ರ ತಿಂಗಳ ಪೂರ್ತಿ ಪ್ರತಿದಿನ ವಿಶೇಷ ಪೂಜೆಗಳು ಮತ್ತು ರುದ್ರಾಭಿಷೇಕ.' },
              date: new Date().toISOString().split('T')[0]
            }
          ]
        }
        newBlockSettings = { layout: 'grid', importance: 'normal' }
        break
      case 'donation-cta':
        newBlockData = {
          title: { en: 'Support the Temple Trust', hi: 'मंदिर ट्रस्ट का सहयोग करें', kn: 'ದೇವಾಲಯದ ಟ್ರಸ್ಟ್‌ಗೆ ಬೆಂಬಲಿಸಿ' },
          description: { en: 'Your contributions support daily rituals, free food services, and temple maintenance.', hi: 'आपका योगदान दैनिक अनुष्ठानों, मुफ्त भोजन सेवाओं और मंदिर के रखरखाव का समर्थन करता है।', kn: 'ನಿಮ್ಮ ಕೊಡುಗೆಗಳು ದೈನಂದಿನ ಧಾರ್ಮಿಕ ವಿಧಿಗಳು, ಉಚಿತ ಅನ್ನದಾಸೋಹ ಮತ್ತು ದೇವಾಲಯದ ನಿರ್ವಹಣೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತವೆ.' },
          upiId: 'templetrust@upi',
          accountName: 'Sri Temple Trust',
          bankName: 'State Bank of India',
          accountNumber: '12345678901',
          ifsc: 'SBIN0001234'
        }
        newBlockSettings = { layout: 'split', showQr: true }
        break
      case 'map':
        newBlockData = {
          addressQuery: { en: 'New Delhi, India', hi: 'नई दिल्ली, भारत' }
        }
        newBlockSettings = { zoom: '15', height: '400px' }
        break
      case 'quote':
        newBlockData = {
          shloka: { en: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत...', hi: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत...' },
          translation: { en: 'Whenever righteousness declines, O Bharata...', hi: 'जब-जब धर्म की हानि होती है, हे भारत...' }
        }
        newBlockSettings = { borderStyle: 'double-gold' }
        break
      default:
        newBlockData = {
          heading: { en: 'New Section', hi: 'नया अनुभाग' },
          html: { en: '<p>Placeholder content</p>', hi: '<p>स्थानधारक सामग्री</p>' }
        }
    }
    
    const newBlock = {
      id: newBlockId,
      type,
      data: newBlockData,
      settings: newBlockSettings
    }
    
    setDraftBlocks([...activeBlocks, newBlock])
  }

  // Heuristic Auditor
  const handleRunAudit = async () => {
    setAuditing(true)
    playAudioBeep('click')
    try {
      const res = await fetch('/api/ai/audit')
      const data = await res.json()
      if (res.ok) {
        setAuditScore(data.score)
        setAuditsList(data.audits || [])
        playAudioBeep('success')
      } else {
        alert('Failed to run layout audit.')
        playAudioBeep('error')
      }
    } catch (err) {
      console.error(err)
      playAudioBeep('error')
    } finally {
      setAuditing(false)
    }
  }

  // Unified AI draft approval flow
  const handleApprove = async () => {
    setApproving(true)
    playAudioBeep('click')
    try {
      // 1. Save Blocks if draftBlocks is not null
      if (draftBlocks) {
        const resBlocks = await fetch('/api/website/blocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blocks: draftBlocks })
        })
        if (!resBlocks.ok) throw new Error('Failed to save website blocks')
      }

      // 2. Save Customizer style configuration
      const resTheme = await fetch('/api/settings/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: themeId,
          primaryColor,
          accentColor,
          fontFamily
        })
      })
      if (!resTheme.ok) throw new Error('Failed to save style customizer settings')

      setDraftBlocks(null)
      setDraftTitle(null)
      setDraftDescription(null)
      setTargetedBlockId(null)
      setTargetedBlockType(null)

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '🕉️ The website layout and style adjustments have been approved and successfully published live!',
          timestamp: new Date(),
          status: 'success'
        }
      ])
      
      playAudioBeep('success')
      await fetchBlocks()
      await fetchThemeConfig()
      handleReloadPreview()
    } catch (err: any) {
      console.error(err)
      playAudioBeep('error')
      alert('Failed to publish changes: ' + err.message)
    } finally {
      setApproving(false)
    }
  }

  const handleDiscard = () => {
    playAudioBeep('click')
    if (confirm('Are you sure you want to discard all pending draft changes?')) {
      setDraftBlocks(null)
      setDraftTitle(null)
      setDraftDescription(null)
      setTargetedBlockId(null)
      setTargetedBlockType(null)
      fetchBlocks()
      fetchThemeConfig()
      handleReloadPreview()
      playAudioBeep('error')
    }
  }

  const handleIframeLoad = () => {
    if (draftBlocks) {
      const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'UPDATE_PREVIEW_BLOCKS',
          blocks: draftBlocks
        }, '*')
      }
    }
    pushThemeToIframe()
  }

  // Refactored helper to support Auto-Fix directly
  const submitPromptDirectly = async (promptText: string) => {
    if (!promptText.trim() || loading) return

    setLoading(true)
    setTerminalLogs([])
    setHudSteps([
      { label: 'Deconstructing layout instructions', status: 'active' },
      { label: 'Fetching context datasets & schema definitions', status: 'pending' },
      { label: 'Assembling modular block JSON trees', status: 'pending' },
      { label: 'Translating content inputs (En, Hi, Kn, Ta, Te)', status: 'pending' },
      { label: 'Refining design alignment & responsive preview', status: 'pending' }
    ])
    
    const addLog = (text: string) => {
      setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`])
    }

    // Add user message to history
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: promptText,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])

    // Rolling logs feed for futuristic terminal effect
    addLog('INITIALIZING TEMPLE AI CORE CO-PILOT...')
    
    setTimeout(() => addLog('ACQUIRING PRISMA DATA MODELS...'), 400)
    setTimeout(() => addLog('RESOLVING USER PROMPT INSTRUCTION LAYERS...'), 900)
    setTimeout(() => addLog(`TARGETED SECTOR: ${targetedBlockId ? targetedBlockId : 'GLOBAL HOMEPAGE LAYOUT'}`), 1400)

    const steps = [
      'Reading current website structure...',
      'Analyzing target block layout parameters...',
      'Asking AI to draft layout updates...',
      'Translating content into English, Hindi, Kannada, Tamil, and Telugu...',
      'Syncing visual sandbox with draft changes...'
    ]

    let stepIndex = 0
    setCurrentStep(steps[0])
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        stepIndex++
        setCurrentStep(steps[stepIndex])
        addLog(`PROCESSING: ${steps[stepIndex].toUpperCase()}`)
        
        setHudSteps(prev => {
          const next = [...prev]
          if (stepIndex > 0 && stepIndex - 1 < next.length) next[stepIndex - 1].status = 'done'
          if (stepIndex < next.length) next[stepIndex].status = 'active'
          return next
        })
      }
    }, 2500)

    try {
      const res = await fetch('/api/ai/website-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: promptText,
          provider: selectedProvider,
          targetedBlockId: targetedBlockId
        }),
      })

      const data = await res.json()
      clearInterval(interval)

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process AI request')
      }

      addLog('TRANSLATION DICTIONARY LOADED SUCCESSFULLY')
      addLog('EMITTING RECONSTRUCTED HOMEPAGE BLOCKS...')
      addLog('AI SYNCHRONIZATION WORKSPACE COMPLETED')

      setDraftBlocks(data.blocks)
      setDraftTitle(data.title)
      setDraftDescription(data.description)

      setHudSteps(prev => prev.map(s => ({ ...s, status: 'done' })))

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.message || 'I have successfully generated draft blocks! Review the changes in preview, then click "Approve & Publish" to save them.',
          timestamp: new Date(),
          status: 'success',
          changes: data.changes || []
        }
      ])
      playAudioBeep('success')
    } catch (err: any) {
      clearInterval(interval)
      playAudioBeep('error')
      addLog(`ERROR: COMPILATION ENCOUNTERED AN EXCEPTION: ${err.message}`)
      setHudSteps(prev => prev.map(s => s.status === 'active' || s.status === 'pending' ? { ...s, status: 'error' } : s))
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Apologies, I encountered an error while processing your request: ${err.message || 'Something went wrong'}. Please try again.`,
          timestamp: new Date(),
          status: 'error'
        }
      ])
    } finally {
      setLoading(false)
      setCurrentStep('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const p = prompt
    setPrompt('')
    await submitPromptDirectly(p)
  }

  // Scroll to bottom of chat history when messages change
  const chatEndRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, currentStep, activeTab])

  // Instant action shortcut presets
  const presets = [
    { label: '✍️ Poetics', prompt: 'Make the text in the hero and story sections sound more devotional and poetic.' },
    { label: '🌐 Translate', prompt: 'Translate all current blocks fully into Hindi, Kannada, Tamil, and Telugu.' },
    { label: '🪔 Add Rituals Grid', prompt: 'Add a Sevas Grid block and a Timings block to show daily darshan details.' },
    { label: '🗺️ Add Map', prompt: 'Add an interactive Map block showing the temple location at the bottom.' },
  ]


  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col -m-8 overflow-hidden bg-stone-50 dark:bg-stone-950">
      {/* Top action bar */}
      <div className="h-16 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Link href="/website">
            <Button variant="outline" size="sm" className="h-9 w-9 rounded-xl p-0 border-stone-200 dark:border-stone-700">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 font-heading">
                <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500/20 animate-pulse" />
                MandirAI Co-Pilot
              </h1>
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            </div>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold tracking-wide uppercase">Interactive Design Workspace</p>
          </div>
        </div>

        {/* View Mode controls, Provider selector, and Refresh */}
        <div className="flex items-center gap-3">
          {/* AI Settings Trigger */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowConfig(!showConfig)}
              className={`rounded-xl flex items-center gap-1.5 border-stone-200 dark:border-stone-700 text-xs font-semibold ${
                showConfig ? 'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100' : ''
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-amber-500" />
              Engine: {selectedProvider === 'gemini' ? 'Gemini (Free)' : 'Groq (Fast)'}
            </Button>

            {showConfig && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-4 z-50 space-y-3">
                <h3 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Select AI Engine</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedProvider('gemini')
                      setShowConfig(false)
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs border transition-all ${
                      selectedProvider === 'gemini' 
                        ? 'border-saffron-300 bg-saffron-50/20 text-saffron-900 dark:bg-saffron-950/20 dark:text-saffron-300' 
                        : 'border-stone-100 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div>
                      <p className="font-bold">Google Gemini</p>
                      <p className="text-[10px] text-stone-400">Standard, multilingual, free</p>
                    </div>
                    {selectedProvider === 'gemini' && <Check className="h-4 w-4 text-saffron-600" />}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedProvider('groq')
                      setShowConfig(false)
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs border transition-all ${
                      selectedProvider === 'groq' 
                        ? 'border-saffron-300 bg-saffron-50/20 text-saffron-900 dark:bg-saffron-950/20 dark:text-saffron-300' 
                        : 'border-stone-100 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div>
                      <p className="font-bold">Groq (Llama 3)</p>
                      <p className="text-[10px] text-stone-400">Blazing fast execution times</p>
                    </div>
                    {selectedProvider === 'groq' && <Check className="h-4 w-4 text-saffron-600" />}
                  </button>
                </div>
                <div className="text-[10px] text-stone-400 flex items-start gap-1 bg-stone-50 dark:bg-stone-950 p-2 rounded-lg">
                  <Key className="h-3.5 w-3.5 text-stone-500 shrink-0 mt-0.5" />
                  <span>To use Groq, add your <code>GROQ_API_KEY</code> to the server's <code>.env</code> file.</span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop/Mobile toggle */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'desktop' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm' : 'text-stone-500 hover:text-stone-850 dark:hover:text-stone-300'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'mobile' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm' : 'text-stone-500 hover:text-stone-850 dark:hover:text-stone-300'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Mobile
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleReloadPreview} className="rounded-xl flex items-center gap-1.5 border-stone-200 dark:border-stone-700">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Prominent Draft Action Bar */}
      {draftBlocks && (
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border-b border-amber-500/20 px-6 py-2.5 flex items-center justify-between shrink-0 animate-in fade-in slide-in-from-top duration-300 z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Unpublished Draft Layout. Review updates in the Live Preview frame.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleDiscard}
              variant="outline"
              size="sm"
              className="h-7 px-3 text-[10px] font-bold rounded-lg border-amber-500/20 bg-white dark:bg-stone-900 hover:bg-red-50 text-stone-600 dark:text-stone-300 hover:text-red-650 transition-colors"
              disabled={approving || loading}
            >
              Discard Draft
            </Button>
            <Button
              onClick={handleApprove}
              size="sm"
              className="h-7 px-4 text-[10px] font-bold rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-all shadow-md shadow-amber-500/10"
              disabled={approving || loading}
            >
              {approving ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  Publishing...
                </>
              ) : (
                'Approve & Publish 🚀'
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Split pane workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Conversational Chat & Control Panels */}
        <div className="w-full lg:w-[460px] border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col overflow-hidden shrink-0 shadow-md z-10">
          {/* Tab Navigation */}
          <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-1 shrink-0">
            <button
              onClick={() => { playAudioBeep('click'); setActiveTab('chat') }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 shadow-sm border border-stone-200/50 dark:border-stone-800'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <Sparkles className="h-3 w-3 text-amber-500" />
              AI Core
            </button>
            <button
              onClick={() => { playAudioBeep('click'); setActiveTab('layout') }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                activeTab === 'layout'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 shadow-sm border border-stone-200/50 dark:border-stone-800'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <LayoutGrid className="h-3 w-3 text-amber-500" />
              Layers
            </button>
            <button
              onClick={() => { playAudioBeep('click'); setActiveTab('editor') }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                activeTab === 'editor'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 shadow-sm border border-stone-200/50 dark:border-stone-800'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-350'
              }`}
            >
              <Settings className="h-3 w-3 text-amber-500" />
              Inspector
            </button>
            <button
              onClick={() => { playAudioBeep('click'); setActiveTab('customizer') }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                activeTab === 'customizer'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 shadow-sm border border-stone-200/50 dark:border-stone-800'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <Flame className="h-3 w-3 text-amber-500" />
              Styles
            </button>
            <button
              onClick={() => { playAudioBeep('click'); setActiveTab('gallery') }}
              className={`flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                activeTab === 'gallery'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 shadow-sm border border-stone-200/50 dark:border-stone-800'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <ImageIcon className="h-3 w-3 text-amber-500" />
              Media
            </button>
          </div>

          {activeTab === 'chat' && (
            <>
              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-stone-50/50 to-white dark:from-stone-950/20 dark:to-stone-900">
                {/* Holographic Avatar node */}
                <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-950/30 p-2 rounded-2xl border border-stone-200/50 dark:border-stone-850">
                  <HologramAvatar loading={loading} />
                  
                  {/* Sound FX indicator */}
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-colors ${
                      soundEnabled 
                        ? 'border-amber-500 bg-amber-50/10 text-amber-500' 
                        : 'border-stone-200 text-stone-400 dark:border-stone-800'
                    }`}
                    title={soundEnabled ? 'Disable UI Chimes' : 'Enable UI Chimes'}
                  >
                    {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Heuristic Design Audit Widget */}
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">Design & Content Audit</h3>
                      <p className="text-[9px] text-stone-400">Heuristic website completeness score</p>
                    </div>
                    {auditScore !== null ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold">Score:</span>
                        <span className={`text-sm font-extrabold px-2 py-0.5 rounded-lg border ${
                          auditScore >= 80 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900' 
                            : auditScore >= 50 
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900' 
                            : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-450 dark:border-red-900'
                        }`}>
                          {auditScore}/100
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleRunAudit}
                        disabled={auditing}
                        className="h-7 text-[10px] rounded-lg bg-stone-900 text-white hover:bg-stone-850 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                      >
                        {auditing ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Run Audit'}
                      </Button>
                    )}
                  </div>

                  {auditScore !== null && (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {auditsList.map((audit) => (
                        <div key={audit.id} className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850 rounded-xl flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2">
                            {audit.passed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="text-[10px] font-bold text-stone-800 dark:text-stone-200">{audit.title}</p>
                              <p className="text-[9px] text-stone-400 dark:text-stone-500 leading-tight mt-0.5">{audit.description}</p>
                            </div>
                          </div>
                          {!audit.passed && audit.autoFixPrompt && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                playAudioBeep('click')
                                setPrompt(audit.autoFixPrompt)
                                submitPromptDirectly(audit.autoFixPrompt)
                              }}
                              disabled={loading}
                              className="h-6 px-2 text-[8px] font-bold rounded-md shrink-0 border-amber-500/30 hover:bg-amber-50/50 dark:hover:bg-amber-950/10 text-amber-700 dark:text-amber-450"
                            >
                              Auto-Fix ✨
                            </Button>
                          )}
                        </div>
                      ))}
                      <div className="pt-1 text-center">
                        <Button variant="ghost" size="sm" onClick={handleRunAudit} disabled={auditing} className="h-5 text-[9px] text-stone-400 hover:text-stone-600">
                          Recalculate Audit Score
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-400 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-md border border-amber-400/25">
                        ✨
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm border ${
                        msg.role === 'user'
                          ? 'bg-stone-900 text-stone-50 border-stone-850 dark:bg-stone-100 dark:text-stone-950 dark:border-stone-200 rounded-tr-none'
                          : msg.status === 'error'
                          ? 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/50 rounded-tl-none'
                          : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200/60 dark:border-stone-750 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                      
                      {msg.changes && msg.changes.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700">
                          <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Applied Changes:</p>
                          <ul className="space-y-1.5">
                            {msg.changes.map((change, idx) => (
                              <li key={idx} className="text-xs text-stone-600 dark:text-stone-300 flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Scrolling Console log in black for developer/terminal feel */}
                {loading && terminalLogs.length > 0 && (
                  <div className="bg-stone-950 text-emerald-450 font-mono text-[9px] p-3 rounded-xl border border-stone-850 h-28 overflow-y-auto space-y-1.5 mt-2 shadow-inner select-none">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="truncate tracking-wide">{log}</div>
                    ))}
                  </div>
                )}

                {/* Holographic Step-by-Step AI Progress HUD */}
                {loading && hudSteps.length > 0 && (
                  <div className="flex gap-3 justify-start animate-in fade-in duration-350 w-full">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-400 text-white flex items-center justify-center shrink-0 animate-pulse font-bold text-sm shadow-md border border-amber-400/25">
                      ✨
                    </div>
                    <div className="bg-stone-900 border border-stone-800 rounded-2xl rounded-tl-none p-4 w-[85%] shadow-xl text-stone-300 font-sans">
                      <div className="flex justify-between items-center pb-1.5 border-b border-stone-800 mb-3 text-[9px] font-mono tracking-widest text-amber-500">
                        <span>CO-PILOT INTELLECT V3</span>
                        <span className="animate-pulse">● RUNNING</span>
                      </div>
                      
                      <div className="space-y-2">
                        {hudSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <div className="shrink-0">
                              {step.status === 'done' ? (
                                <span className="text-emerald-500 font-bold">✓</span>
                              ) : step.status === 'active' ? (
                                <Loader2 className="h-3 w-3 text-amber-500 animate-spin" />
                              ) : step.status === 'error' ? (
                                <span className="text-red-500 font-bold">✗</span>
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-stone-700 block ml-1" />
                              )}
                            </div>
                            <span className={`font-semibold ${
                              step.status === 'done' ? 'text-stone-500 line-through' :
                              step.status === 'active' ? 'text-amber-400 animate-pulse font-bold' :
                              step.status === 'error' ? 'text-red-400' : 'text-stone-600'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-800 flex justify-between items-center text-[9px] font-mono text-stone-500">
                        <span>TASK PROCESSOR</span>
                        <span className="text-amber-500/70">{currentStep}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Targeted Block Indicator */}
              {targetedBlockId && (
                <div className="mx-4 mt-2 px-3.5 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom duration-200 text-[10px] font-bold text-amber-800 dark:text-amber-300 shrink-0 select-none">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Targeting: {targetedBlockType?.toUpperCase()} block ({targetedBlockId.split('-')[0]})
                  </span>
                  <button 
                    onClick={() => {
                      setTargetedBlockId(null)
                      setTargetedBlockType(null)
                    }} 
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  >
                    Clear Target ✕
                  </button>
                </div>
              )}

              {/* Quick suggestions capsules */}
              {!loading && (
                <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 shrink-0">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 px-1">AI Shortcuts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestionClick(sug.prompt)}
                        className="text-[10px] font-bold text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-full hover:border-amber-300 hover:text-amber-650 dark:hover:border-amber-600 transition-colors shadow-sm"
                      >
                        {sug.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input form */}
              <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shrink-0">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={targetedBlockId ? `Refining selected ${targetedBlockType}...` : "Describe your design or content change..."}
                    className="w-full text-sm border border-stone-250 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-950/50 rounded-xl pl-4 pr-20 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 dark:focus:ring-amber-500/5 disabled:opacity-75"
                    disabled={loading}
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                        isRecording 
                          ? 'bg-red-500 border-red-600 text-white animate-pulse' 
                          : 'border-stone-200 hover:bg-stone-100 text-stone-500 dark:border-stone-800 dark:hover:bg-stone-850'
                      }`}
                      title={isRecording ? 'Listening... Click to stop' : 'Speech Input'}
                    >
                      🎙️
                    </button>
                    <Button
                      type="submit"
                      disabled={!prompt.trim() || loading}
                      size="icon"
                      className="bg-gradient-to-tr from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 h-8 w-8 rounded-lg shrink-0 shadow-md shadow-amber-500/5 border border-amber-500/20"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}

          {activeTab === 'layout' && (
            /* Visual Section Layers Manager (WordPress Gutenberg style) */
            <div className="flex-1 flex flex-col overflow-hidden bg-stone-50 dark:bg-stone-950 p-5 space-y-4">
              <div>
                <h2 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">Visual Sections Stack</h2>
                <p className="text-[10px] text-stone-400">Reorder, duplicate, or delete homepage layout blocks instantly.</p>
              </div>

              {/* Stack list */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2 min-h-0">
                {activeBlocks.length === 0 ? (
                  <div className="h-40 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl flex flex-col justify-center items-center p-4 bg-white dark:bg-stone-900">
                    <LayoutGrid className="h-8 w-8 text-stone-300 dark:text-stone-700 mb-2" />
                    <p className="text-xs font-semibold text-stone-500">No layout blocks present</p>
                    <p className="text-[10px] text-stone-400 text-center mt-1">Add sections from the library below.</p>
                  </div>
                ) : (
                  activeBlocks.map((block, index) => {
                    const blockTitle = block.data?.title?.en || block.data?.heading?.en || block.data?.shloka?.slice(0, 25) || 'Untitled Section'
                    return (
                      <div
                        key={block.id}
                        className={`bg-white dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 rounded-xl p-3.5 shadow-sm hover:border-amber-300 dark:hover:border-amber-800 transition-all flex items-center justify-between gap-3 ${
                          targetedBlockId === block.id ? 'ring-1 ring-amber-500 border-amber-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Indicator side color bar */}
                          <div className={`w-1 h-10 rounded ${
                            block.type === 'hero' ? 'bg-orange-500' :
                            block.type === 'timings' ? 'bg-amber-500' :
                            block.type === 'sevas' ? 'bg-yellow-500' :
                            block.type === 'map' ? 'bg-blue-500' :
                            block.type === 'quote' ? 'bg-red-500' : 'bg-stone-450'
                          }`} />
                          
                          <div className="min-w-0">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-500 block">
                              {block.type} section
                            </span>
                            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate block mt-0.5 pr-2">
                              {blockTitle}
                            </span>
                          </div>
                        </div>

                        {/* Block Control Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Targeted Select Button */}
                          <button
                            onClick={() => {
                              playAudioBeep('click')
                              setTargetedBlockId(block.id)
                              setTargetedBlockType(block.type)
                            }}
                            className={`p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-[10px] font-bold ${
                              targetedBlockId === block.id ? 'text-amber-500' : 'text-stone-400'
                            }`}
                            title="Target with AI prompting"
                          >
                            🎯
                          </button>
                          
                          {/* Reordering Up/Down */}
                          <button
                            disabled={index === 0}
                            onClick={() => moveBlock(index, 'up')}
                            className="p-1 text-stone-400 hover:text-stone-755 dark:hover:text-stone-250 disabled:opacity-25"
                            title="Move Up"
                          >
                            <MoveUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            disabled={index === activeBlocks.length - 1}
                            onClick={() => moveBlock(index, 'down')}
                            className="p-1 text-stone-400 hover:text-stone-755 dark:hover:text-stone-250 disabled:opacity-25"
                            title="Move Down"
                          >
                            <MoveDown className="h-3.5 w-3.5" />
                          </button>

                          {/* Clone */}
                          <button
                            onClick={() => duplicateBlock(index)}
                            className="p-1 text-stone-400 hover:text-stone-755 dark:hover:text-stone-250"
                            title="Clone Block"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteBlock(index)}
                            className="p-1 text-stone-400 hover:text-red-650"
                            title="Delete Block"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Block Library Drawer */}
              <div className="border-t border-stone-200 dark:border-stone-800 pt-4 shrink-0 bg-stone-50 dark:bg-stone-950">
                <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 px-1">Library: Add Section</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addBlockFromLibrary('hero')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    🚩 Hero Banner
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('timings')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    ⏰ Darshan Hours
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('sevas')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    🪔 Sevas Booking
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('notice-board')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    📢 Notice Board
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('donation-cta')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    💳 Donation QR
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('map')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    🗺️ Location Map
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('quote')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    📜 Sacred Shloka
                  </button>
                  <button
                    onClick={() => addBlockFromLibrary('text')}
                    className="p-2 border border-stone-200 hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:hover:border-amber-700 bg-white dark:bg-stone-900 rounded-xl text-left transition-all text-xs font-bold"
                  >
                    ✍️ Rich Content
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editor' && (() => {
            const activeBlock = activeBlocks.find(b => b.id === targetedBlockId)
            
            if (!activeBlock) {
              return (
                <div className="flex-1 flex flex-col justify-center items-center p-8 bg-stone-50 dark:bg-stone-950 text-center text-stone-500">
                  <Settings className="h-10 w-10 text-stone-300 dark:text-stone-750 mb-3" />
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-850 dark:text-stone-350">No Block Selected</p>
                  <p className="text-[10px] text-stone-400 mt-1 max-w-[280px]">
                    Click any section in the Live Preview frame on the right, or click the 🎯 icon next to a block in the Layers tab to begin editing its content visually.
                  </p>
                </div>
              )
            }

            const renderMultilingualInput = (label: string, field: string, isTextArea = false) => {
              const fieldVal = activeBlock.data?.[field] || {}
              const currentVal = typeof fieldVal === 'object' ? (fieldVal[selectedLanguage] || '') : (fieldVal || '')
              const englishVal = typeof fieldVal === 'object' ? (fieldVal['en'] || '') : ''

              const isTranslating = translatingField === `${activeBlock.id}-${field}-translate`
              const isEnhancing = translatingField === `${activeBlock.id}-${field}-enhance`

              return (
                <div className="space-y-1.5" key={field}>
                  <div className="flex justify-between items-center">
                    <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-350 uppercase tracking-wide">{label}</label>
                    <div className="flex items-center gap-2">
                      {selectedLanguage !== 'en' && englishVal.trim() && (
                        <button
                          type="button"
                          disabled={isTranslating}
                          onClick={() => handleFieldTranslate(activeBlock.id, field, englishVal)}
                          className="text-[9px] text-amber-600 hover:text-amber-700 dark:text-amber-500 font-extrabold flex items-center gap-0.5"
                        >
                          {isTranslating ? <Loader2 className="h-2 w-2 animate-spin" /> : '🌐 Auto-Translate'}
                        </button>
                      )}
                      {selectedLanguage === 'en' && currentVal.trim() && (
                        <button
                          type="button"
                          disabled={isEnhancing}
                          onClick={() => handleFieldEnhance(activeBlock.id, field, currentVal)}
                          className="text-[9px] text-amber-600 hover:text-amber-700 dark:text-amber-500 font-extrabold flex items-center gap-0.5"
                        >
                          {isEnhancing ? <Loader2 className="h-2 w-2 animate-spin" /> : '🪔 AI Enhance'}
                        </button>
                      )}
                    </div>
                  </div>
                  {isTextArea ? (
                    <textarea
                      value={currentVal}
                      onChange={(e) => updateBlockData(activeBlock.id, field, selectedLanguage, e.target.value)}
                      className="w-full text-xs font-sans border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 min-h-[90px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/10"
                      placeholder={`Enter ${label} in ${selectedLanguage.toUpperCase()}...`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => updateBlockData(activeBlock.id, field, selectedLanguage, e.target.value)}
                      className="w-full text-xs font-sans border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/10"
                      placeholder={`Enter ${label} in ${selectedLanguage.toUpperCase()}...`}
                    />
                  )}
                </div>
              )
            }

            const renderSelectSetting = (label: string, settingKey: string, options: Array<{ value: string, label: string }>) => {
              const currentVal = activeBlock.settings?.[settingKey] || options[0].value
              return (
                <div className="space-y-1.5" key={settingKey}>
                  <label className="text-[10.5px] font-bold text-stone-655 dark:text-stone-345 uppercase tracking-wide">{label}</label>
                  <select
                    value={currentVal}
                    onChange={(e) => updateBlockSetting(activeBlock.id, settingKey, e.target.value)}
                    className="w-full bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-750 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )
            }

            const renderNoticeEditor = () => {
              const notices = activeBlock.data?.notices || []
              return (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-850">Announcements List</h3>
                  {notices.map((notice: any, idx: number) => {
                    return (
                      <div key={notice.id || idx} className="p-3 bg-stone-50 dark:bg-stone-955 border border-stone-200 dark:border-stone-850 rounded-xl space-y-3 relative">
                        <button
                          type="button"
                          onClick={() => {
                            const updatedNotices = notices.filter((_: any, i: number) => i !== idx)
                            updateBlockDataDirect(activeBlock.id, 'notices', updatedNotices)
                          }}
                          className="absolute top-2 right-2 text-stone-400 hover:text-red-500 transition-colors"
                          title="Delete Notice"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-stone-500 uppercase">Notice Title</label>
                          <input
                            type="text"
                            value={notice.title?.[selectedLanguage] || ''}
                            onChange={(e) => {
                              const updatedNotices = [...notices]
                              updatedNotices[idx] = {
                                ...updatedNotices[idx],
                                title: {
                                  ...(updatedNotices[idx].title || {}),
                                  [selectedLanguage]: e.target.value
                                }
                              }
                              updateBlockDataDirect(activeBlock.id, 'notices', updatedNotices)
                            }}
                            className="w-full text-xs font-sans border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900 p-2 rounded-lg focus:outline-none focus:border-amber-500"
                            placeholder={`Title in ${selectedLanguage.toUpperCase()}...`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-stone-500 uppercase">Notice Content</label>
                          <textarea
                            value={notice.content?.[selectedLanguage] || ''}
                            onChange={(e) => {
                              const updatedNotices = [...notices]
                              updatedNotices[idx] = {
                                ...updatedNotices[idx],
                                content: {
                                  ...(updatedNotices[idx].content || {}),
                                  [selectedLanguage]: e.target.value
                                }
                              }
                              updateBlockDataDirect(activeBlock.id, 'notices', updatedNotices)
                            }}
                            className="w-full text-xs font-sans border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900 p-2 rounded-lg min-h-[50px] focus:outline-none focus:border-amber-500"
                            placeholder={`Content in ${selectedLanguage.toUpperCase()}...`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-stone-500 uppercase font-mono">Date</label>
                          <input
                            type="date"
                            value={notice.date || ''}
                            onChange={(e) => {
                              const updatedNotices = [...notices]
                              updatedNotices[idx] = {
                                ...updatedNotices[idx],
                                date: e.target.value
                              }
                              updateBlockDataDirect(activeBlock.id, 'notices', updatedNotices)
                            }}
                            className="w-full text-xs font-mono border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900 p-2 rounded-lg focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    )
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      const newNotice = {
                        id: `n-${Date.now()}`,
                        title: { en: 'New Notice', hi: 'नई सूचना' },
                        content: { en: 'Notice content description...', hi: 'सूचना सामग्री विवरण...' },
                        date: new Date().toISOString().split('T')[0]
                      }
                      updateBlockDataDirect(activeBlock.id, 'notices', [...notices, newNotice])
                    }}
                    className="w-full py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
                  >
                    + Add New Notice
                  </button>
                </div>
              )
            }

            const renderBlockForm = () => {
              switch (activeBlock.type) {
                case 'hero':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('headline title', 'title')}
                      {renderMultilingualInput('description subtitle', 'subtitle', true)}
                      {renderMultilingualInput('CTA button text', 'ctaText')}
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-350 uppercase">CTA Link destination</label>
                        <input
                          type="text"
                          value={activeBlock.data?.ctaLink || ''}
                          onChange={(e) => updateBlockDataDirect(activeBlock.id, 'ctaLink', e.target.value)}
                          className="w-full text-xs font-sans border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. /donate or /history"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-350 uppercase">Cover image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeBlock.settings?.backgroundImage || ''}
                            onChange={(e) => updateBlockSetting(activeBlock.id, 'backgroundImage', e.target.value)}
                            className="flex-1 w-full text-xs font-mono border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                            placeholder="e.g. /uploads/image.jpg"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            id={`upload-hero-${activeBlock.id}`}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleMediaUpload(file, (url) => updateBlockSetting(activeBlock.id, 'backgroundImage', url))
                            }}
                            disabled={uploadingMedia}
                          />
                          <label
                            htmlFor={`upload-hero-${activeBlock.id}`}
                            className={`cursor-pointer shrink-0 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center border border-stone-250 dark:border-stone-750 transition-colors ${uploadingMedia ? 'opacity-50 pointer-events-none' : ''}`}
                          >
                            {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4 text-amber-600" />}
                          </label>
                        </div>
                        <p className="text-[9px] text-stone-400">Tip: Upload directly or paste an existing URL.</p>
                      </div>
                      {renderSelectSetting('alignment', 'alignment', [
                        { value: 'center', label: 'Center Aligned' },
                        { value: 'left', label: 'Left Aligned' },
                        { value: 'right', label: 'Right Aligned' }
                      ])}
                      {renderSelectSetting('symbol', 'symbol', [
                        { value: 'om', label: '🕉️ Om Symbol' },
                        { value: 'flag', label: '🚩 Saffron Flag' },
                        { value: 'lamp', label: '🪔 Sacred Diya/Lamp' },
                        { value: 'none', label: 'No Symbol' }
                      ])}
                    </div>
                  )
                case 'timings':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('Section heading', 'heading')}
                      {renderMultilingualInput('Morning darshan hours', 'morning')}
                      {renderMultilingualInput('Evening darshan hours', 'evening')}
                      {renderMultilingualInput('location name', 'location')}
                      {renderMultilingualInput('contact phone', 'contact')}
                    </div>
                  )
                case 'sevas':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('Section heading', 'heading')}
                      {renderSelectSetting('columns layout', 'columns', [
                        { value: '3', label: '3 Columns' },
                        { value: '2', label: '2 Columns' },
                        { value: '4', label: '4 Columns' }
                      ])}
                      {renderSelectSetting('background style', 'backgroundStyle', [
                        { value: 'light', label: 'Light Theme Accents' },
                        { value: 'dark', label: 'Dark Contrasted Background' }
                      ])}
                    </div>
                  )
                case 'quote':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('Shloka text (Sanskrit)', 'shloka', true)}
                      {renderMultilingualInput('translation meaning', 'translation', true)}
                      {renderMultilingualInput('source scripture', 'source')}
                      {renderSelectSetting('border style', 'borderStyle', [
                        { value: 'double-gold', label: 'Double Gold Lining' },
                        { value: 'ornate', label: 'Ornate Traditional' },
                        { value: 'simple', label: 'Simple Minimal' },
                        { value: 'glass', label: 'Glassmorphism glow' }
                      ])}
                    </div>
                  )
                case 'text':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('section heading', 'heading')}
                      {renderMultilingualInput('rich html code', 'html', true)}
                    </div>
                  )
                case 'map':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('address map query', 'addressQuery')}
                      {renderSelectSetting('map zoom depth', 'zoom', [
                        { value: '15', label: '15 (Standard Local)' },
                        { value: '12', label: '12 (City Overview)' },
                        { value: '14', label: '14 (Subdivision view)' },
                        { value: '17', label: '17 (Street Level)' },
                        { value: '19', label: '19 (Close Up Building)' }
                      ])}
                      {renderSelectSetting('map widget height', 'height', [
                        { value: '400px', label: '400px (Medium)' },
                        { value: '300px', label: '300px (Short)' },
                        { value: '450px', label: '450px (Tall)' },
                        { value: '600px', label: '600px (Extra Tall)' }
                      ])}
                    </div>
                  )
                case 'form':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('form description', 'description', true)}
                      {renderMultilingualInput('success message', 'successMessage')}
                      {renderSelectSetting('Form Type', 'formType', [
                        { value: 'contact', label: 'General Contact' },
                        { value: 'prayer_request', label: 'Sacred Prayer Request' },
                        { value: 'feedback', label: 'Devotee Feedback' }
                      ])}
                    </div>
                  )
                case 'notice-board':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('notice board heading', 'title')}
                      {renderSelectSetting('Layout', 'layout', [
                        { value: 'grid', label: 'Grid Cards' },
                        { value: 'list', label: 'Single Column List' },
                        { value: 'ticker', label: 'Scrolling News Marquee' }
                      ])}
                      {renderSelectSetting('importance', 'importance', [
                        { value: 'normal', label: 'Normal Notification' },
                        { value: 'urgent', label: 'Urgent Red Alert Badge' }
                      ])}
                      {renderNoticeEditor()}
                    </div>
                  )
                case 'donation-cta':
                  return (
                    <div className="space-y-4">
                      {renderMultilingualInput('Donation heading', 'title')}
                      {renderMultilingualInput('donation request description', 'description', true)}
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-350 uppercase">Temple UPI ID</label>
                        <input
                          type="text"
                          value={activeBlock.data?.upiId || ''}
                          onChange={(e) => updateBlockDataDirect(activeBlock.id, 'upiId', e.target.value)}
                          className="w-full text-xs font-sans border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. templetrust@upi"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-350 uppercase">Account Holder Name</label>
                        <input
                          type="text"
                          value={activeBlock.data?.accountName || ''}
                          onChange={(e) => updateBlockDataDirect(activeBlock.id, 'accountName', e.target.value)}
                          className="w-full text-xs font-sans border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. Sri Krishna Temple Trust"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-350 uppercase">Bank Name</label>
                        <input
                          type="text"
                          value={activeBlock.data?.bankName || ''}
                          onChange={(e) => updateBlockDataDirect(activeBlock.id, 'bankName', e.target.value)}
                          className="w-full text-xs font-sans border border-stone-250 dark:border-stone-750 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. State Bank of India"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-650 dark:text-stone-355 uppercase">Account Number</label>
                        <input
                          type="text"
                          value={activeBlock.data?.accountNumber || ''}
                          onChange={(e) => updateBlockDataDirect(activeBlock.id, 'accountNumber', e.target.value)}
                          className="w-full text-xs font-mono border border-stone-250 dark:border-stone-755 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. 10002930293"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-stone-655 dark:text-stone-355 uppercase">IFSC Code</label>
                        <input
                          type="text"
                          value={activeBlock.data?.ifsc || ''}
                          onChange={(e) => updateBlockDataDirect(activeBlock.id, 'ifsc', e.target.value)}
                          className="w-full text-xs font-mono border border-stone-250 dark:border-stone-755 bg-white dark:bg-stone-900 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. SBIN0001234"
                        />
                      </div>
                      {renderSelectSetting('Card style layout', 'layout', [
                        { value: 'split', label: 'Split side-by-side card' },
                        { value: 'single-card', label: 'Centered single card' }
                      ])}
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <div>
                          <label className="text-xs text-stone-600 dark:text-stone-300 font-semibold block">Show UPI QR Box</label>
                          <p className="text-[9px] text-stone-400">Generate scan-to-pay QR automatically</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={activeBlock.settings?.showQr !== false}
                          onChange={(e) => updateBlockSetting(activeBlock.id, 'showQr', e.target.checked)}
                          className="h-4 w-4 rounded text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                      </div>
                    </div>
                  )
                default:
                  return (
                    <div className="text-stone-400 text-xs italic text-center p-4">
                      Form customization is not supported for this block type.
                    </div>
                  )
              }
            }

            const isBlockTranslating = translatingBlockId === activeBlock.id

            return (
              <div className="flex-1 flex flex-col overflow-hidden bg-stone-50 dark:bg-stone-950 p-5 space-y-4 min-h-0">
                <div className="flex items-center justify-between shrink-0">
                  <div>
                    <h2 className="text-xs font-bold text-stone-850 dark:text-stone-150 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded bg-amber-500 animate-pulse" />
                      Inspector: {activeBlock.type.toUpperCase()}
                    </h2>
                    <p className="text-[9px] font-mono text-stone-400 mt-0.5">ID: {activeBlock.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isBlockTranslating}
                      onClick={() => handleBlockTranslate(activeBlock.id)}
                      className="h-6 px-2 text-[9px] font-bold rounded-lg border-stone-250 dark:border-stone-800 text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-900"
                    >
                      {isBlockTranslating ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : '🌐 Auto-Translate'}
                    </Button>
                  </div>
                </div>

                {/* Multilingual editor language tabs */}
                <div className="flex bg-stone-200/50 dark:bg-stone-900 border border-stone-250/20 rounded-xl p-1 shrink-0">
                  {(['en', 'hi', 'kn', 'ta', 'te'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { playAudioBeep('click'); setSelectedLanguage(lang) }}
                      className={`flex-1 py-1.5 text-[10px] font-extrabold uppercase rounded-lg transition-all ${
                        selectedLanguage === lang
                          ? 'bg-white dark:bg-stone-850 text-amber-600 shadow-sm border border-stone-200/50 dark:border-stone-750'
                          : 'text-stone-500 hover:text-stone-850 dark:hover:text-stone-350'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Scrollable inputs form */}
                <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-4 shadow-sm space-y-4">
                    {renderBlockForm()}
                  </div>
                </div>
              </div>
            )
          })()}

          {activeTab === 'customizer' && (
            /* Style Customizer Panel */
            <div className="flex-1 flex flex-col overflow-hidden bg-stone-50 dark:bg-stone-950 p-5 space-y-6 overflow-y-auto">
              <div>
                <h2 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">Theme Customizer</h2>
                <p className="text-[10px] text-stone-400">Instantly modify templates, colors, and typography.</p>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label className="text-[10.5px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">Aesthetic Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'classic', label: 'Classic Serene', color: 'bg-white text-stone-850' },
                    { id: 'heritage', label: 'Heritage Grand', color: 'bg-red-900 text-[#F5DEB3]' },
                    { id: 'modern', label: 'Modern Clean', color: 'bg-slate-100 text-stone-900' },
                    { id: 'divine-glow', label: 'Divine Glow', color: 'bg-[#170a01] text-amber-250 border border-amber-500/20' }
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => { playAudioBeep('click'); setThemeId(theme.id); setDraftBlocks(activeBlocks) }}
                      className={`p-3 rounded-xl text-left transition-all text-[11px] font-bold ${theme.color} border-2 ${
                        themeId === theme.id ? 'border-amber-500 shadow-md ring-2 ring-amber-500/10' : 'border-stone-250 dark:border-stone-850'
                      }`}
                    >
                      {themeId === theme.id ? '✓ ' : ''}{theme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Customizers */}
              <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-stone-800">
                <h3 className="text-[10.5px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">Color Palette</h3>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-stone-600 dark:text-stone-300 font-semibold block">Primary Brand Color</label>
                    <p className="text-[9px] text-stone-400">Sets button background and accents</p>
                  </div>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => { setPrimaryColor(e.target.value); setDraftBlocks(activeBlocks) }}
                    className="h-8 w-12 rounded cursor-pointer border border-stone-300 dark:border-stone-700 bg-transparent shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-stone-600 dark:text-stone-300 font-semibold block">Accent Watermark Color</label>
                    <p className="text-[9px] text-stone-400">Sets watermarks, flags, and shloka frames</p>
                  </div>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => { setAccentColor(e.target.value); setDraftBlocks(activeBlocks) }}
                    className="h-8 w-12 rounded cursor-pointer border border-stone-300 dark:border-stone-700 bg-transparent shrink-0"
                  />
                </div>

                {/* Quick palettes presets */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Spiritual Preset Palettes</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '🪔 Saffron Gold', primary: '#ea580c', accent: '#d97706' },
                      { label: '🚩 Heritage Red', primary: '#b91c1c', accent: '#b45309' },
                      { label: '🌸 Pure Lotus', primary: '#ec4899', accent: '#d97706' },
                      { label: '🌿 Sacred Basil', primary: '#15803d', accent: '#ca8a04' }
                    ].map((pal, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playAudioBeep('click')
                          setPrimaryColor(pal.primary)
                          setAccentColor(pal.accent)
                          setDraftBlocks(activeBlocks)
                        }}
                        className="text-[9px] font-bold bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-850 px-2 py-1 rounded-lg hover:border-amber-400 transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <div className="flex gap-0.5">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pal.primary }} />
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pal.accent }} />
                        </div>
                        {pal.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography (Google Fonts) */}
              <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                <label className="text-[10.5px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">Typography Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => { playAudioBeep('click'); setFontFamily(e.target.value); setDraftBlocks(activeBlocks) }}
                  className="w-full bg-white dark:bg-stone-900 border border-stone-255 dark:border-stone-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="Inter">Inter (Sleek sans-serif)</option>
                  <option value="Outfit">Outfit (Contemporary crisp)</option>
                  <option value="Cinzel">Cinzel (Divine Roman Serif)</option>
                  <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                </select>
                <p className="text-[9.5px] text-stone-400 leading-normal">
                  The selected font family will load and apply globally across all layouts, titles, descriptions, and headings on your homepage.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            /* Media Manager Tab */
            <div className="flex-1 flex flex-col overflow-hidden bg-stone-50 dark:bg-stone-950 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">Image Library</h2>
                  <p className="text-[10px] text-stone-400">Upload & insert photos into your site</p>
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    onClick={handleUploadClick}
                    disabled={uploadingMedia}
                    size="sm"
                    className="bg-stone-900 text-white hover:bg-stone-850 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    {uploadingMedia ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <UploadCloud className="h-3.5 w-3.5" />
                    )}
                    Upload
                  </Button>
                </div>
              </div>

              {/* Photos List Grid */}
              <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                {mediaList.length === 0 ? (
                  <div className="h-40 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl flex flex-col justify-center items-center p-4 bg-white dark:bg-stone-900">
                    <ImageIcon className="h-8 w-8 text-stone-300 dark:text-stone-750 mb-2" />
                    <p className="text-xs font-semibold text-stone-500">No photos uploaded yet</p>
                    <p className="text-[10px] text-stone-400 text-center mt-1">Upload a photo to see it here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pb-4">
                    {mediaList.map((media) => (
                      <div
                        key={media.id}
                        className="group relative flex flex-col bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-850 rounded-xl overflow-hidden shadow-sm hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200"
                      >
                        <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-950 overflow-hidden relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={media.url}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 space-y-1.5">
                          <p className="text-[10px] font-bold text-stone-800 dark:text-stone-250 truncate">{media.title}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyLink(media.id, media.url)}
                            className={`w-full h-7 text-[10px] rounded-lg flex items-center justify-center gap-1 font-semibold ${
                              copiedId === media.id
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-250'
                                : 'border-stone-200 dark:border-stone-800'
                            }`}
                          >
                            {copiedId === media.id ? (
                              <>
                                <Check className="h-3 w-3" />
                                URL Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Insert Photo
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-250/20 rounded-xl p-3 text-[10.5px] text-amber-800 dark:text-amber-300 leading-relaxed shrink-0">
                💡 **WordPress Style Editing**: Click **"Insert Photo"** on any image. It will copy the URL and switch to the AI chat, so you can tell the AI: *"Use this image for the main hero banner"* or *"Insert this image at the end of the history section"*!
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive live preview frame */}
        <div className="flex-1 bg-stone-100 dark:bg-stone-950 p-6 flex items-center justify-center overflow-hidden relative">
          <div
            className={`h-full w-full max-h-full border border-stone-200/80 dark:border-stone-850 rounded-2xl bg-white dark:bg-stone-900 shadow-xl overflow-hidden transition-all duration-300 flex flex-col ${
              viewMode === 'mobile' ? 'max-w-[380px] aspect-[9/16]' : 'max-w-full'
            }`}
          >
            {/* Window bar */}
            <div className="h-10 bg-stone-50 dark:bg-stone-850 border-b border-stone-200 dark:border-stone-800 px-4 flex items-center justify-between text-[11px] font-semibold text-stone-400 select-none">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400 shrink-0" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shrink-0" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 shrink-0 mr-4" />
                <div className="bg-stone-200/50 dark:bg-stone-900/50 border border-stone-200/30 dark:border-stone-800 rounded px-4 py-0.5 max-w-[280px] truncate text-[10px] font-mono select-none">
                  localhost:3000/temple/{templeSlug}?preview=true
                </div>
              </div>
              <div />
            </div>

            {/* Frame Content Wrapper with Sci-Fi Scanline HUD overlay */}
            <div className="flex-1 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
              <iframe
                id="preview-iframe"
                key={iframeKey}
                src={`/temple/${templeSlug}?preview=true`}
                className="w-full h-full border-0 relative z-0"
                title="Live Temple Preview"
                onLoad={handleIframeLoad}
              />

              {/* Futuristic holographic loading overlays */}
              {loading && (
                <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-[1.5px] z-50 pointer-events-none flex flex-col justify-between p-8 border border-amber-500/35 rounded-b-2xl overflow-hidden animate-in fade-in duration-300">
                  {/* Cybernetic scanning glow bar */}
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_8px_#f59e0b] top-0 animate-[scanline_2.5s_ease-in-out_infinite]" />
                  
                  {/* Outer grid watermark */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/50" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/50" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/50" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/50" />

                  {/* Top metadata tags */}
                  <div className="flex justify-between items-start text-[9px] font-mono text-amber-500/70 tracking-widest uppercase">
                    <span>STATUS: PROCESSING LAYOUTS</span>
                    <span>CO-PILOT SYS V3.12</span>
                  </div>

                  {/* Center glowing compass spinner */}
                  <div className="flex-1 flex flex-col justify-center items-center gap-4">
                    <div className="relative h-16 w-16 border border-amber-500/30 rounded-full flex items-center justify-center animate-spin">
                      <div className="h-10 w-10 border border-dashed border-amber-500/60 rounded-full" />
                      <div className="absolute h-4 w-4 bg-amber-500 rounded-full blur-[2px]" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-heading font-extrabold text-amber-400 text-sm tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] uppercase">
                        Compiling Site layout
                      </h3>
                      <p className="text-[10px] text-amber-500/75 tracking-wider animate-pulse mt-0.5 font-mono">
                        {currentStep.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Bottom metadata tags */}
                  <div className="flex justify-between items-end text-[9px] font-mono text-amber-500/70 tracking-widest uppercase">
                    <span>SECTOR: HOME_PAGE</span>
                    <span>OVERRIDE: ACTIVE</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
