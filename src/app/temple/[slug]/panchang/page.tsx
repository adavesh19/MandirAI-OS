import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import PanchangClient from '@/components/temple/panchang-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PanchangPage({ params }: PageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  // Mock Panchang Data for demonstration
  const today = new Date()
  const panchangData = {
    date: today.toISOString(),
    tithi: 'Shukla Paksha Ekadashi',
    nakshatra: 'Rohini',
    sunrise: '06:12 AM',
    sunset: '06:45 PM',
    rahuKalam: '10:30 AM - 12:00 PM',
    yamaGandam: '03:00 PM - 04:30 PM',
    auspiciousTime: '07:30 AM - 09:00 AM',
    moonSign: 'Vrishabha (Taurus)',
    sunSign: 'Mithuna (Gemini)',
  }

  return (
    <PanchangClient 
      templeName={temple.name} 
      templateId={templateId} 
      panchangData={panchangData} 
    />
  )
}
