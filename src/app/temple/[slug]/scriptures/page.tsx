import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import ScripturesClient from '@/components/temple/scriptures-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ScripturesPage({ params }: PageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  // Mock scriptures library data
  const scripturesData = [
    { id: 1, title: 'Bhagavad Gita', category: 'Epic', author: 'Vyasa', preview: 'The song of the Lord...' },
    { id: 2, title: 'Rig Veda', category: 'Veda', author: 'Ancient Seers', preview: 'Hymns to the deities...' },
    { id: 3, title: 'Shiva Purana', category: 'Purana', author: 'Vyasa', preview: 'Glory of Lord Shiva...' },
    { id: 4, title: 'Upanishads', category: 'Philosophy', author: 'Various', preview: 'Philosophical concepts of Hinduism...' },
    { id: 5, title: 'Ramayana', category: 'Epic', author: 'Valmiki', preview: 'The journey of Rama...' },
    { id: 6, title: 'Patanjali Yoga Sutras', category: 'Yoga', author: 'Patanjali', preview: 'Aphorisms on Yoga...' },
  ]

  return (
    <ScripturesClient 
      templeName={temple.name} 
      templateId={templateId} 
      scripturesData={scripturesData} 
    />
  )
}
