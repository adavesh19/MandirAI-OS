import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Script from 'next/script'
import Link from 'next/link'
import { ArrowLeft, View } from 'lucide-react'

export const metadata = {
  title: 'Virtual Darshan (VR) | MandirAI OS',
}

export default async function VRDarshanPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug, isPublished: true },
    select: { id: true, name: true, slug: true }
  })

  if (!temple) notFound()

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Load A-Frame via CDN for WebXR capabilities */}
      <Script src="https://aframe.io/releases/1.4.0/aframe.min.js" strategy="beforeInteractive" />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
        <Link href={`/temple/${temple.slug}`} className="pointer-events-auto">
          <button className="bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-bold font-heading drop-shadow-lg">{temple.name}</h1>
          <p className="text-saffron-400 font-semibold uppercase tracking-widest text-sm flex items-center justify-end drop-shadow-md">
            <View className="w-4 h-4 mr-2" /> Live VR Darshan
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <Link href={`/temple/${temple.slug}/donate`} className="pointer-events-auto">
          <button className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_40px_rgba(234,88,12,0.6)] animate-pulse transition-all">
            Make Virtual Offering (₹101)
          </button>
        </Link>
      </div>

      {/* A-Frame Scene */}
      {/* Note: In a real production app, the src would be a live 360 video stream or a high-res equirectangular photo of the specific temple. */}
      <div dangerouslySetInnerHTML={{ __html: `
        <a-scene embedded loading-screen="dotsColor: #ea580c; backgroundColor: #000000">
          <a-assets>
            <img id="temple-interior" src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=3000&q=80" crossorigin="anonymous">
          </a-assets>

          <!-- 360-degree sky sphere -->
          <a-sky src="#temple-interior" rotation="0 -90 0"></a-sky>

          <!-- Ambient chanting audio (simulated) -->
          <a-sound src="url(https://assets.mixkit.co/sfx/preview/mixkit-tibetan-monks-chanting-1011.mp3)" autoplay="true" loop="true" volume="0.5"></a-sound>

          <!-- Camera and cursor -->
          <a-entity position="0 1.6 0">
            <a-camera look-controls="pointerLockEnabled: false"></a-camera>
          </a-entity>
        </a-scene>
      `}} className="w-full h-full" />
      
      {/* Global styles to ensure a-scene fits perfectly */}
      <style dangerouslySetInnerHTML={{ __html: `
        a-scene {
          height: 100vh !important;
          width: 100vw !important;
        }
      `}} />
    </div>
  )
}
