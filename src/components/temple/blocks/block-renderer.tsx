'use client'

import * as React from 'react'
import HeroBlock from './hero-block'
import TimingsBlock from './timings-block'
import GalleryBlock from './gallery-block'
import TextBlock from './text-block'
import SevasBlock from './sevas-block'
import FeaturesBlock from './features-block'
import QuoteBlock from './quote-block'
import MapBlock from './map-block'
import FormBlock from './form-block'
import NoticeBoardBlock from './notice-board-block'
import DonationCtaBlock from './donation-cta-block'
import { 
  HeroBlock as NewHeroBlock, 
  TextBlock as NewTextBlock, 
  DonationBlock as NewDonationBlock, 
  EventsBlock as NewEventsBlock,
  StoreBlock as NewStoreBlock,
  Gallery3DBlock as NewGallery3DBlock,
  CarouselBlock as NewCarouselBlock,
  BentoGridBlock as NewBentoGridBlock,
  Hero3DBlock as NewHero3DBlock
} from '@/components/builder/BlockRenderer'

interface Block {
  id: string
  type: string
  data?: any
  settings?: any
  props?: any
}

interface BlockRendererProps {
  blocks?: Block[] | any
  theme?: 'classic' | 'heritage' | 'modern' | 'divine-glow'
  sevas?: any[]
  templeAddress?: any
}

export default function BlockRenderer({ blocks, theme = 'classic', sevas = [], templeAddress = {} }: BlockRendererProps) {
  const [currentBlocks, setCurrentBlocks] = React.useState<any[]>(blocks || [])
  const [isPreview, setIsPreview] = React.useState(false)

  React.useEffect(() => {
    setCurrentBlocks(blocks || [])
  }, [blocks])

  React.useEffect(() => {
    // Detect preview environment parameters
    const isFrame = typeof window !== 'undefined' && window.self !== window.top
    const hasPreviewParam = typeof window !== 'undefined' && window.location.search.includes('preview=true')
    setIsPreview(isFrame || hasPreviewParam)

    // Listen to parent frame's live updates
    const handleMessage = (e: MessageEvent) => {
      if (!e.data) return
      
      if (e.data.type === 'UPDATE_PREVIEW_BLOCKS') {
        setCurrentBlocks(e.data.blocks)
      } else if (e.data.type === 'UPDATE_PREVIEW_THEME') {
        const { themeConfig } = e.data
        if (!themeConfig) return
        
        let styleTag = document.getElementById('preview-theme-overrides')
        if (!styleTag) {
          styleTag = document.createElement('style')
          styleTag.id = 'preview-theme-overrides'
          document.head.appendChild(styleTag)
        }
        
        let cssRules = ''
        if (themeConfig.primaryColor) {
          cssRules += `:root { --primary: ${themeConfig.primaryColor} !important; --ring: ${themeConfig.primaryColor} !important; }\n`
        }
        if (themeConfig.accentColor) {
          cssRules += `:root { --accent: ${themeConfig.accentColor} !important; }\n`
        }
        if (themeConfig.fontFamily) {
          cssRules += `* { font-family: ${themeConfig.fontFamily}, ui-sans-serif, system-ui, sans-serif !important; }\n`
        }
        
        styleTag.innerHTML = cssRules
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!currentBlocks || !Array.isArray(currentBlocks) || currentBlocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {currentBlocks.map((block) => {
        let blockNode: React.ReactNode = null

        switch (block.type) {
          case 'hero':
            blockNode = (
              <HeroBlock 
                data={block.data || {}} 
                settings={block.settings || {}} 
                theme={theme}
              />
            )
            break
          case 'timings':
            blockNode = (
              <TimingsBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'gallery':
            blockNode = (
              <GalleryBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'text':
            blockNode = (
              <TextBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'sevas':
            blockNode = (
              <SevasBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
                sevas={sevas}
              />
            )
            break
          case 'features':
            blockNode = (
              <FeaturesBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'quote':
            blockNode = (
              <QuoteBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'map':
            blockNode = (
              <MapBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
                templeAddress={templeAddress}
              />
            )
            break
          case 'form':
            blockNode = (
              <FormBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'notice-board':
            blockNode = (
              <NoticeBoardBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          case 'donation-cta':
            blockNode = (
              <DonationCtaBlock 
                data={block.data || {}} 
                settings={block.settings || {}}
                theme={theme}
              />
            )
            break
          // Website Builder 2.0 Plugins
          case 'Hero':
            blockNode = <NewHeroBlock props={block.props || {}} />
            break
          case 'Text':
            blockNode = <NewTextBlock props={block.props || {}} />
            break
          case 'Donation':
            blockNode = <NewDonationBlock props={block.props || {}} />
            break
          case 'Events':
            blockNode = <NewEventsBlock props={block.props || {}} />
            break
          case 'Store':
            blockNode = <NewStoreBlock props={block.props || {}} />
            break
          case 'Gallery3D':
            blockNode = <NewGallery3DBlock props={block.props || {}} />
            break
          case 'Carousel':
            blockNode = <NewCarouselBlock props={block.props || {}} />
            break
          case 'BentoGrid':
            blockNode = <NewBentoGridBlock props={block.props || {}} />
            break
          case 'Hero3D':
            blockNode = <NewHero3DBlock props={block.props || {}} />
            break
          default:
            console.warn(`[BlockRenderer] Unknown block type: ${block.type}`)
            blockNode = null
        }

        if (!blockNode) return null

        if (isPreview) {
          return (
            <div
              key={block.id}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.parent.postMessage({
                  type: 'SELECT_BLOCK',
                  blockId: block.id,
                  blockType: block.type
                }, '*')
              }}
              className="relative group cursor-pointer border border-dashed border-transparent hover:border-amber-500/60 hover:bg-amber-500/[0.02] transition-all duration-200 rounded-2xl p-2"
            >
              <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-sans text-[9px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-40 select-none shadow-md">
                Edit {block.type.toUpperCase()} with AI Co-Pilot 🎯
              </div>
              {blockNode}
            </div>
          )
        }

        return <div key={block.id}>{blockNode}</div>
      })}
    </div>
  )
}
