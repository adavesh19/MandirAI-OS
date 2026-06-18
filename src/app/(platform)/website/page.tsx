import * as React from 'react'
import Link from 'next/link'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, FileText, Image, LayoutTemplate, ExternalLink, CheckCircle2, Clock, AlertCircle, Sparkles, Palette } from 'lucide-react'

export default async function WebsitePage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  const temple = await prisma.temple.findUnique({
    where: { id: tenantId! },
    include: { pages: { orderBy: { sortOrder: 'asc' } } },
  })

  if (!temple) return null

  const pageTypeLabels: Record<string, string> = {
    HOME: 'Home Page',
    ABOUT: 'About the Temple',
    HISTORY: 'Temple History',
    CONTACT: 'Contact & Location',
    GALLERY: 'Photo Gallery',
    EVENTS: 'Events Calendar',
    DONATIONS: 'Online Donations',
    SEVAS: 'Seva Booking',
  }

  const modules = [
    {
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      title: 'AI Website Builder',
      desc: 'Use Gemini AI to instantly rewrite your website content, change themes, or add announcements via prompt.',
      status: 'live',
      link: '/website/ai-builder'
    },
    {
      icon: <LayoutTemplate className="h-5 w-5 text-saffron-500" />,
      title: 'Page Builder',
      desc: 'Edit and manage all public-facing temple pages including Home, About, History, and Contact.',
      status: 'live',
      link: '/website/editor'
    },
    {
      icon: <Palette className="h-5 w-5 text-blue-500" />,
      title: 'Theme & Templates',
      desc: 'Change your public website design. Switch between Classic, Heritage, or Modern templates instantly.',
      status: 'live',
      link: '/website/templates'
    },
    {
      icon: <Image className="h-5 w-5 text-purple-500" />,
      title: 'Media Gallery',
      desc: 'Upload and manage photos, videos, and promotional banners for your temple website.',
      status: 'live',
      link: '/website/media'
    },
    {
      icon: <FileText className="h-5 w-5 text-emerald-500" />,
      title: 'Announcements',
      desc: 'Post festival alerts, darshan schedule changes, and special event notifications.',
      status: 'coming_soon',
    },
    {
      icon: <Globe className="h-5 w-5 text-purple-500" />,
      title: 'SEO & Domain',
      desc: 'Configure meta tags, custom domain, and social sharing settings for maximum reach.',
      status: 'coming_soon',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="font-heading text-2xl font-bold text-stone-900">Website Manager</h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage your public temple website — pages, media, announcements and SEO.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/website/ai-builder`}>
            <Button className="bg-stone-900 text-white hover:bg-stone-800" leftIcon={<Sparkles className="h-4 w-4 text-amber-400" />}>
              AI Builder
            </Button>
          </Link>
          <Link href={`/temple/${temple.slug}`} target="_blank">
            <Button className="gradient-primary text-white" leftIcon={<ExternalLink className="h-4 w-4" />}>
              View Live Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Site Info */}
      <Card className="border-stone-200 bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-base font-bold text-stone-900">Website Status</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-green-600">Live & Published</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">URL</p>
            <Link href={`/temple/${temple.slug}`} target="_blank" className="text-sm text-saffron-600 hover:underline font-semibold">
              /temple/{temple.slug}
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Pages Generated</p>
            <span className="text-sm font-bold text-stone-800">{temple.pages.length} pages</span>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card className="border-stone-200 bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-bold text-stone-900">AI Generated Pages</CardTitle>
          <CardDescription>These pages were auto-generated by Gemini AI during onboarding in 5 languages.</CardDescription>
        </CardHeader>
        <CardContent>
          {temple.pages.length === 0 ? (
            <div className="text-center py-10 text-stone-400">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">No pages found. Onboarding may not have completed successfully.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {temple.pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-800">
                        {pageTypeLabels[page.pageType] || page.pageType}
                      </p>
                      <p className="text-xs text-stone-400">AI-generated · Published · Multilingual</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                    Live
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div>
        <h2 className="font-heading text-lg font-bold text-stone-900 mb-4">Website Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((mod, i) => (
            mod.link && mod.status === 'live' ? (
              <Link href={mod.link} key={i}>
                <Card className={`border-stone-200 bg-white hover:border-saffron-300 hover:shadow-md transition-all cursor-pointer h-full`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center">
                          {mod.icon}
                        </div>
                        <CardTitle className="text-base font-bold text-stone-800">{mod.title}</CardTitle>
                      </div>
                      <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-1 rounded-full border border-emerald-100">Active</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-stone-500">{mod.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card key={i} className={`border-stone-200 bg-white ${mod.status === 'coming_soon' ? 'opacity-75' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center">
                        {mod.icon}
                      </div>
                      <CardTitle className="text-base font-bold text-stone-800">{mod.title}</CardTitle>
                    </div>
                    {mod.status === 'live' ? (
                      <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-1 rounded-full border border-emerald-100">Active</span>
                    ) : (
                      <span className="text-xs bg-stone-100 text-stone-400 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Soon
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-500">{mod.desc}</p>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
