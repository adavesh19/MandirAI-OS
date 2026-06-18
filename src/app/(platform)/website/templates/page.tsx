'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, LayoutTemplate, MonitorSmartphone, Palette } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Serene',
    description: 'Clean, minimalist, and very calm. Focuses on typography and breathing room with saffron accents. Best for most temples.',
    colors: ['#FFFFFF', '#f5f5f4', '#ea580c'],
    badge: 'Most Popular',
  },
  {
    id: 'heritage',
    name: 'Heritage Grand',
    description: 'Rich, traditional, and elegant. Deep red backgrounds with gold borders and subtle mandala patterns. Best for ancient temples.',
    colors: ['#7f1d1d', '#FAF9F6', '#D4AF37'],
  },
  {
    id: 'modern',
    name: 'Modern Elegant',
    description: 'Highly polished, contemporary design. Soft shadows, rounded corners, and a beautiful layout that highlights your photography.',
    colors: ['#f8f9fa', '#FFFFFF', '#ea580c'],
  },
  {
    id: 'divine-glow',
    name: 'Divine Glow',
    description: 'Luxury premium look. Rich dark amber and saffron glowing ambient backgrounds with golden mandalas and exquisite cards. Best for royal or large temples.',
    colors: ['#170a01', '#FAF9F6', '#F4C430'],
    badge: 'Premium Luxury',
  },
  {
    id: 'tech-sanctuary',
    name: 'Tech Sanctuary',
    description: 'Experience spirituality integrated with cutting-edge artificial intelligence and high-tech infrastructure. Deep cyber aesthetics with glowing cyan accents.',
    colors: ['#020617', '#06b6d4', '#1e293b'],
    badge: 'Next-Gen UI',
  },
  {
    id: 'ai-omniscient',
    name: 'A.I. Omniscient',
    description: 'Connect directly with the temple\'s sentient AI core. Futuristic glassmorphism, floating elements, and deep neural network visuals in fuchsia and cyan.',
    colors: ['#000000', '#d946ef', '#06b6d4'],
    badge: 'A.I. Agent Focus',
  }
]

export default function TemplatesPage() {
  const router = useRouter()
  const [activeTemplate, setActiveTemplate] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    // Fetch current template on load
    fetch('/api/settings/template')
      .then(res => res.json())
      .then(data => {
        if (data.templateId) setActiveTemplate(data.templateId)
        else setActiveTemplate('classic')
      })
  }, [])

  const handleApplyTemplate = async (templateId: string) => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId }),
      })
      if (res.ok) {
        setActiveTemplate(templateId)
        router.refresh()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/website">
            <Button variant="outline" size="icon" className="rounded-xl h-10 w-10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-stone-900">Theme & Templates</h1>
            <p className="text-sm text-stone-500 mt-1">
              Choose a beautiful, world-class design for your public website.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => {
          const isActive = activeTemplate === template.id
          return (
            <Card key={template.id} className={`overflow-hidden transition-all ${isActive ? 'ring-2 ring-saffron-500 shadow-md' : 'border-stone-200 hover:border-stone-300'}`}>
              <div className="h-48 bg-stone-100 relative border-b border-stone-200 p-4 flex items-center justify-center overflow-hidden">
                {/* Abstract Preview blocks to represent the template */}
                <div className={`w-full h-full rounded-lg shadow-sm border p-3 flex flex-col gap-2 ${
                  template.id === 'classic' ? 'bg-white border-stone-200' :
                  template.id === 'heritage' ? 'bg-[#7f1d1d] border-[#D4AF37]/30' :
                  template.id === 'divine-glow' ? 'bg-gradient-to-b from-[#170a01] to-[#0d0500] border-amber-500/20' :
                  template.id === 'tech-sanctuary' ? 'bg-[#020617] border-cyan-500/30' :
                  template.id === 'ai-omniscient' ? 'bg-black border-fuchsia-500/30' :
                  'bg-[#f8f9fa] border-stone-200'
                }`}>
                  {/* Fake header */}
                  <div className="flex justify-between items-center">
                    <div className={`h-2 w-12 rounded-full ${
                      template.id === 'heritage' ? 'bg-[#D4AF37]' : 
                      template.id === 'divine-glow' ? 'bg-[#F4C430]' : 
                      template.id === 'tech-sanctuary' ? 'bg-cyan-500' :
                      template.id === 'ai-omniscient' ? 'bg-fuchsia-500' :
                      'bg-saffron-500'}`} />
                    <div className="flex gap-1">
                      <div className={`h-1 w-6 rounded-full ${
                        template.id === 'heritage' ? 'bg-white/20' : 
                        template.id === 'divine-glow' ? 'bg-amber-400/20' : 
                        template.id === 'tech-sanctuary' ? 'bg-cyan-500/20' :
                        template.id === 'ai-omniscient' ? 'bg-fuchsia-500/20' :
                        'bg-stone-200'}`} />
                      <div className={`h-1 w-6 rounded-full ${
                        template.id === 'heritage' ? 'bg-white/20' : 
                        template.id === 'divine-glow' ? 'bg-amber-400/20' : 
                        template.id === 'tech-sanctuary' ? 'bg-cyan-500/20' :
                        template.id === 'ai-omniscient' ? 'bg-fuchsia-500/20' :
                        'bg-stone-200'}`} />
                    </div>
                  </div>
                  {/* Fake Hero */}
                  <div className={`flex-1 rounded flex items-center justify-center ${
                    template.id === 'heritage' ? 'bg-black/20' : 
                    template.id === 'divine-glow' ? 'bg-amber-950/40 border border-amber-500/10' :
                    template.id === 'tech-sanctuary' ? 'bg-slate-900 border border-cyan-500/20' :
                    template.id === 'ai-omniscient' ? 'bg-fuchsia-900/10 border border-fuchsia-500/10' :
                    'bg-stone-100'
                  } mt-2`}>
                    <div className={`h-4 w-24 rounded-full ${
                      template.id === 'heritage' ? 'bg-[#F5DEB3]' : 
                      template.id === 'divine-glow' ? 'bg-[#F4C430]' :
                      template.id === 'tech-sanctuary' ? 'bg-cyan-400' :
                      template.id === 'ai-omniscient' ? 'bg-fuchsia-400' :
                      'bg-stone-300'
                    }`} />
                  </div>
                </div>

                {template.badge && (
                  <div className="absolute top-2 right-2 bg-saffron-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shadow-sm">
                    {template.badge}
                  </div>
                )}
                {isActive && (
                  <div className="absolute top-2 left-2 bg-white text-emerald-600 text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow-sm flex items-center gap-1 border border-emerald-100">
                    <CheckCircle2 className="h-3 w-3" /> Live
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-stone-900 mb-1">{template.name}</h3>
                <p className="text-sm text-stone-500 mb-4 h-16">{template.description}</p>
                
                <div className="flex items-center gap-2 mb-6">
                  {template.colors.map((color, i) => (
                    <div key={i} className="h-4 w-4 rounded-full border border-stone-200 shadow-sm" style={{ backgroundColor: color }} />
                  ))}
                </div>

                <Button 
                  onClick={() => handleApplyTemplate(template.id)}
                  disabled={isActive || saving}
                  className={`w-full ${isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                >
                  {isActive ? 'Current Active Theme' : saving ? 'Applying...' : 'Apply Template'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
