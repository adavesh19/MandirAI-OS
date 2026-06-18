import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { HeartHandshake } from 'lucide-react'

export default async function KioskStandbyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug },
    select: { id: true, name: true, logoUrl: true }
  })

  if (!temple) notFound()

  return (
    <Link href={`/kiosk/${resolvedParams.slug}/donate`} className="block w-full h-full relative cursor-pointer">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black z-0" />
      
      {/* Subtle animated particles/glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-saffron-900/40 via-black/0 to-black/0 z-0 animate-pulse duration-[5000ms]" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
        {temple.logoUrl ? (
          <img 
            src={temple.logoUrl} 
            alt={temple.name} 
            className="w-48 h-48 object-contain rounded-full border-4 border-stone-800 shadow-2xl mb-12"
          />
        ) : (
          <div className="w-48 h-48 rounded-full border-4 border-stone-800 bg-stone-900 flex items-center justify-center text-7xl mb-12 shadow-2xl">
            🕉️
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-bold font-heading text-white text-center tracking-tight mb-6">
          {temple.name}
        </h1>

        <p className="text-2xl md:text-3xl text-stone-400 mb-20 text-center max-w-2xl">
          Digital Hundi & Offerings
        </p>

        {/* Call to action */}
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-saffron-600 text-white rounded-full p-8 shadow-[0_0_60px_rgba(234,88,12,0.4)] animate-bounce">
            <HeartHandshake className="w-16 h-16" />
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white tracking-widest uppercase">
            Tap Anywhere To Start
          </div>
        </div>
      </div>
      
      {/* Footer / Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-stone-600 text-sm font-mono tracking-widest uppercase z-10">
        MandirAI OS • Secured Kiosk Terminal
      </div>
    </Link>
  )
}
