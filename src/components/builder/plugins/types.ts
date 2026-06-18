export type PluginType = 'Hero' | 'Text' | 'Donation' | 'Events' | 'Image' | 'Spacer' | 'Store' | 'Gallery3D' | 'Carousel' | 'BentoGrid' | 'Hero3D'

export interface BuilderBlock {
  id: string
  type: PluginType
  props: Record<string, any>
}

// Specific Plugin Prop Types
export interface HeroProps {
  title: string
  subtitle?: string
  backgroundImageUrl?: string
  buttonText?: string
  buttonLink?: string
}

export interface TextProps {
  content: string // Can be HTML or markdown
  alignment?: 'left' | 'center' | 'right'
}

export interface DonationProps {
  campaignId?: string // If null, shows general donation form
  title?: string
  description?: string
}

export interface EventsProps {
  title?: string
  maxEvents?: number
}

export interface StoreProps {
  title?: string
  description?: string
  products: {
    id: string
    name: string
    price: number
    image: string
    description?: string
  }[]
}

export interface Gallery3DProps {
  title?: string
  images: {
    url: string
    caption?: string
  }[]
}

export interface CarouselProps {
  title?: string
  subtitle?: string
  items: {
    id: string
    title: string
    description?: string
    image: string
  }[]
}

export interface BentoGridProps {
  title?: string
  description?: string
  items: {
    id: string
    title: string
    description?: string
    image?: string
    icon?: string
    colSpan?: 1 | 2 | 3
    rowSpan?: 1 | 2
  }[]
}

export interface Hero3DProps {
  title: string
  subtitle?: string
  modelType?: 'diya' | 'om' | 'temple'
}
