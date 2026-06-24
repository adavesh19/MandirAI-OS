'use client'

import * as React from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

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
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center min-h-[90vh]">
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
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md dark:bg-stone-900/80 border border-saffron-500/30 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron-500"></span>
            </span>
            <span className="text-saffron-700 dark:text-saffron-400">MandirAI OS — The Future of Temples</span>
          </div>

          {/* Heading — targets "temple website builder" keyword */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
            India&apos;s #1{' '}
            <span className="bg-gradient-to-r from-saffron-500 via-amber-500 to-maroon-600 bg-clip-text text-transparent dark:to-saffron-400 relative">
              Temple Website Builder
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 to-transparent opacity-30 blur-sm"></div>
            </span>
            {' '}&amp; Management Platform
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 dark:text-stone-300 mb-10 leading-relaxed font-medium">
            Build your complete temple website in 3 minutes using AI — then manage donations, seva bookings, devotee CRM, 80G receipts, multilingual pages, and more from one dashboard.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto font-bold px-8 h-14 text-base shadow-xl shadow-saffron-500/20 hover:scale-105 transition-transform duration-300">
                Get Started Free
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-14 gap-2 text-base font-semibold bg-white/50 backdrop-blur-sm dark:bg-stone-950/50 hover:scale-105 transition-transform duration-300">
                <Play className="h-4 w-4 text-saffron-500 fill-saffron-500" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="border-t border-stone-200/60 dark:border-stone-800/40 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto bg-white/30 dark:bg-stone-900/30 backdrop-blur-md rounded-3xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">1,000+</p>
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">Temples</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">₹10Cr+</p>
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">Donations</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">50K+</p>
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">Devotees</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-4xl font-black text-saffron-600 dark:text-saffron-400">99.9%</p>
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mt-1 uppercase tracking-wider">Uptime</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
