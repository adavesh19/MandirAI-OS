'use client'

import * as React from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

import { useLanguage } from '@/components/shared/language-context'
import { Sparkles as SparklesIcon } from 'lucide-react'

// A stunning abstract 3D component that looks like a glowing golden lotus/mandala
function GoldenLotus() {
  const groupRef = React.useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          emissive="#d97706" 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </mesh>
      
      {/* Orbiting rings / petals */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (Math.PI / 3) * i]}>
          <torusGeometry args={[1.8, 0.05, 16, 100]} />
          <meshPhysicalMaterial 
            color="#fbbf24" 
            metalness={1} 
            roughness={0.1}
            clearcoat={1}
            emissive="#ea580c"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Floating Sparkles around the lotus */}
      <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#fcd34d" />
    </group>
  )
}

export default function HeroSection() {
  const { t, isKannada } = useLanguage()

  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center min-h-[92vh]">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-saffron-500/20 rounded-full blur-[100px] -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] -z-10 animate-glow-pulse" />

      {/* Background 3D Canvas */}
      <div className="absolute inset-0 -z-0 opacity-40 dark:opacity-60 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <GoldenLotus />
          </Float>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">

            {/* Launch Deal Floating Pill */}
            <Link href="/onboarding?plan=launch-299" className="inline-block mb-6 group">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-saffron-500/15 to-amber-500/10 border border-saffron-500/30 text-saffron-800 dark:text-saffron-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md group-hover:scale-105 group-hover:border-saffron-500 transition-all">
                <span className="flex h-2 w-2 rounded-full bg-saffron-500 animate-ping" />
                <SparklesIcon className="h-3.5 w-3.5 text-saffron-600 dark:text-saffron-400" />
                <span>{t('hero.badge')}</span>
                <span className="text-stone-400 dark:text-stone-500">→</span>
              </div>
            </Link>

            {/* Heading — targets "temple website builder" keyword */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
              {t('hero.title1')}{' '}
              <span className="bg-gradient-to-r from-saffron-500 via-amber-500 to-maroon-600 bg-clip-text text-transparent dark:to-saffron-400 relative">
                {t('hero.titleHighlight')}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 to-transparent opacity-30 blur-sm"></div>
              </span>
              {' '}{t('hero.title2')}
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-700 dark:text-stone-300 mb-10 leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
              {/* Primary Free Temple Website CTA */}
              <Link href="/onboarding?plan=free" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto font-black px-8 h-14 text-base bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 gap-2 border border-emerald-400/40">
                  <SparklesIcon className="h-5 w-5 text-emerald-200 animate-pulse" />
                  <span>{t('hero.ctaFree')}</span>
                </Button>
              </Link>

              {/* Special ₹299 Launch Offer CTA */}
              <Link href="/onboarding?plan=launch-299" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto font-bold px-7 h-14 text-base bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white shadow-xl shadow-saffron-500/20 hover:scale-105 transition-all duration-300 gap-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-200" />
                  <span>{t('hero.ctaPrimary')}</span>
                </Button>
              </Link>

              {/* Demo CTA */}
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 h-14 gap-2 text-base font-semibold bg-white/60 backdrop-blur-md dark:bg-stone-900/60 hover:scale-105 transition-all duration-300">
                  <Play className="h-4 w-4 text-saffron-500 fill-saffron-500" />
                  {t('hero.ctaSecondary')}
                </Button>
              </Link>
            </div>

            {/* Zero Cost Assurance */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-stone-500 dark:text-stone-400 mb-14">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                {isKannada ? '100% ಸಂಪೂರ್ಣ ಉಚಿತ' : '100% Fully Free'}
              </span>
              <span>•</span>
              <span>{isKannada ? 'ಯಾವುದೇ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಬೇಡ' : 'No Credit Card Required'}</span>
              <span>•</span>
              <span>{isKannada ? '3 ನಿಮಿಷಗಳಲ್ಲಿ ಲೈವ್' : 'Live in 3 Minutes'}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="border-t border-stone-200/60 dark:border-stone-800/40 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto bg-white/40 dark:bg-stone-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">1,000+</p>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">{t('hero.statTemples')}</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">₹10Cr+</p>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">{t('hero.statDonations')}</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">50K+</p>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">{t('hero.statDevotees')}</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">99.9%</p>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">{t('hero.statUptime')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
