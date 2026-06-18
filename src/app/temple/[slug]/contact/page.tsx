import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import ContactClient from '@/components/temple/contact-client'

interface ContactPageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicTempleContact({ params }: ContactPageProps) {
  const { slug } = await params

  const temple = await prisma.temple.findUnique({
    where: { slug: slug.toLowerCase() },
  })

  if (!temple || !temple.isActive) {
    notFound()
  }

  const page = await prisma.templePage.findUnique({
    where: {
      templeId_pageType: {
        templeId: temple.id,
        pageType: 'CONTACT',
      },
    },
  })

  const address = (temple.address as any) || {
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
  }

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  const serializableTemple = {
    name: temple.name,
    contactPhone: temple.contactPhone,
    contactEmail: temple.contactEmail,
    address,
    slug: temple.slug,
  }

  const pageContent = page && typeof page.content === 'object' && page.content !== null
    ? (page.content as any)
    : null

  const serializablePage = pageContent
    ? {
        title: pageContent.title || {},
        description: pageContent.description || {},
        content: pageContent.html || '',
      }
    : null

  return <ContactClient temple={serializableTemple} page={serializablePage} templateId={templateId} />
}
