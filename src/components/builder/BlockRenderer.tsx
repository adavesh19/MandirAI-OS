"use client"

import React, { useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei'
import { BuilderBlock } from './plugins/types'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const HeroBlock = ({ props }: { props: any }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-xl bg-stone-900 min-h-[400px] flex flex-col justify-center items-center text-center p-8 group"
    >
      {props.backgroundImageUrl && (
        <motion.div 
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
      
      <motion.div variants={staggerContainer} className="relative z-10 space-y-6">
        <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-white">{props.title || 'Hero Title'}</motion.h2>
        {props.subtitle && (
          <motion.p variants={fadeInUp} className="text-xl text-stone-200 font-light max-w-2xl mx-auto tracking-wide">
            {props.subtitle}
          </motion.p>
        )}
        {props.buttonText && (
          <motion.div variants={fadeInUp}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-gradient-to-r from-saffron-600 to-orange-500 text-white px-8 py-4 rounded-full font-semibold tracking-wide shadow-lg shadow-orange-500/20"
            >
              {props.buttonText}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export const TextBlock = ({ props }: { props: any }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className={`prose dark:prose-invert w-full mx-auto text-${props.alignment || 'left'} font-light leading-relaxed`}
    >
      <div dangerouslySetInnerHTML={{ __html: props.content || 'Start typing...' }} />
    </motion.div>
  )
}

export const DonationBlock = ({ props }: { props: any }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-10 text-center shadow-xl shadow-stone-200/50 dark:shadow-none w-full max-w-7xl mx-auto"
    >
      <motion.h3 variants={fadeInUp} className="text-3xl font-serif text-stone-900 dark:text-white mb-3">{props.title || 'Make a Donation'}</motion.h3>
      <motion.p variants={fadeInUp} className="text-stone-500 dark:text-stone-400 mb-8 font-light">{props.description || 'Support our temple initiatives.'}</motion.p>
      
      <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-4 mb-8">
        {[501, 1001, 5001].map(amount => (
          <motion.button 
            key={amount}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="border border-stone-200 dark:border-stone-700 rounded-2xl py-4 hover:border-saffron-500 hover:text-saffron-600 transition-colors font-medium shadow-sm"
          >
            ₹{amount}
          </motion.button>
        ))}
      </motion.div>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-stone-900 dark:bg-white dark:text-stone-900 text-white py-4 rounded-2xl font-bold tracking-wider hover:bg-stone-800 transition-colors shadow-lg"
      >
        Donate Now
      </motion.button>
    </motion.div>
  )
}

export const EventsBlock = ({ props }: { props: any }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl p-8 shadow-sm w-full max-w-7xl mx-auto"
    >
      <motion.h3 variants={fadeInUp} className="text-2xl font-serif text-stone-900 dark:text-white mb-8 text-center">{props.title || 'Upcoming Events'}</motion.h3>
      <div className="space-y-4">
        {[1, 2].map(i => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            whileHover={{ x: 5 }}
            className="flex items-center space-x-6 p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors border border-transparent hover:border-stone-100 dark:hover:border-stone-800 cursor-pointer"
          >
            <div className="bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 dark:text-saffron-400 rounded-2xl p-4 text-center min-w-[80px]">
              <div className="text-xs font-bold uppercase tracking-widest">AUG</div>
              <div className="text-2xl font-serif">1{i}</div>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 dark:text-white text-lg">Sample Temple Festival</h4>
              <p className="text-sm text-stone-500 font-light mt-1">Main Temple Courtyard</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export const StoreBlock = ({ props }: { props: any }) => {
  const products = props.products || [
    { id: '1', name: 'Premium Rudraksha Mala', price: 1500, image: 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', description: 'Authentic 108 beads mala.' },
    { id: '2', name: 'Special Festival Prasad', price: 501, image: 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', description: 'Shipped globally via speed post.' },
    { id: '3', name: 'Temple Silk Shawl', price: 2100, image: 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80', description: 'Blessed by the head priest.' }
  ]

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="w-full max-w-[1400px] mx-auto py-12 px-4"
    >
      <div className="text-center mb-12">
        <motion.h3 variants={fadeInUp} className="text-3xl font-serif text-stone-900 dark:text-white mb-3">{props.title || 'Temple Store & Prasad'}</motion.h3>
        <motion.p variants={fadeInUp} className="text-stone-500 dark:text-stone-400 font-light">{props.description || 'Bring the divine blessings home.'}</motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <motion.div 
            key={product.id}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl hover:shadow-saffron-500/20 transition-all duration-300"
          >
            <div className="h-64 bg-stone-100 dark:bg-stone-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-stone-900 dark:text-white mb-2">{product.name}</h4>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 min-h-[40px]">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif text-saffron-600">₹{product.price}</span>
                <button className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-2 rounded-xl font-bold text-sm tracking-wide hover:bg-stone-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export const Gallery3DBlock = ({ props }: { props: any }) => {
  const images = props.images || [
    { url: 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', caption: 'Deepotsav' },
    { url: 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', caption: 'Morning Aarti' },
    { url: 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80', caption: 'Temple Architecture' }
  ]

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="w-full max-w-[1400px] mx-auto py-12 px-4 overflow-hidden"
    >
      <motion.h3 variants={fadeInUp} className="text-3xl font-serif text-stone-900 dark:text-white mb-12 text-center">{props.title || 'Sacred Moments'}</motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1000px]">
        {images.map((img: any, idx: number) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.05, 
              rotateY: idx % 2 === 0 ? 5 : -5,
              rotateX: 5,
              zIndex: 10
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] group bg-stone-900"
          >
            <img src={img.url} alt={img.caption} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-serif text-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {img.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export const CarouselBlock = ({ props }: { props: any }) => {
  const items = props.items || [
    { id: '1', title: 'Daily Darshan', description: 'Experience the divine presence every morning.', image: 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80' },
    { id: '2', title: 'Festivals', description: 'Join us in grand celebrations throughout the year.', image: 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80' },
    { id: '3', title: 'Community Kitchen', description: 'Feeding thousands of devotees daily.', image: 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80' },
    { id: '4', title: 'Vedic School', description: 'Preserving ancient wisdom for the next generation.', image: 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80' }
  ]

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="w-full py-16 overflow-hidden bg-stone-50 dark:bg-stone-900/50"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 mb-10">
        <motion.h3 variants={fadeInUp} className="text-4xl font-serif text-stone-900 dark:text-white">{props.title || 'Discover Our Temple'}</motion.h3>
        {props.subtitle && <motion.p variants={fadeInUp} className="text-stone-500 mt-2 text-lg">{props.subtitle}</motion.p>}
      </div>

      {/* Cinematic Horizontal Scroll Container */}
      <div className="flex overflow-x-auto pb-10 pt-4 px-6 gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {items.map((item: any, idx: number) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            className="snap-center shrink-0 w-[85vw] md:w-[600px] h-[400px] rounded-3xl overflow-hidden relative group shadow-lg"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute bottom-8 left-8 right-8">
              <h4 className="text-3xl font-serif text-white mb-2">{item.title}</h4>
              <p className="text-stone-300 font-light text-lg">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export const BentoGridBlock = ({ props }: { props: any }) => {
  const items = props.items || [
    { id: '1', title: 'Live Darshan', description: '24/7 Spiritual Connection', image: 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 2 },
    { id: '2', title: 'Donations', description: 'Support the Temple', colSpan: 1, rowSpan: 1 },
    { id: '3', title: 'Upcoming Events', description: 'Join our Festivals', colSpan: 1, rowSpan: 1 },
    { id: '4', title: 'Book a Seva', description: 'Schedule your personalized rituals', colSpan: 2, rowSpan: 1 },
  ]

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="w-full max-w-[1400px] mx-auto py-16 px-4"
    >
      <div className="text-center mb-12">
        <motion.h3 variants={fadeInUp} className="text-4xl font-serif text-stone-900 dark:text-white mb-4">{props.title || 'Quick Access'}</motion.h3>
        {props.description && <motion.p variants={fadeInUp} className="text-stone-500 font-light text-lg max-w-2xl mx-auto">{props.description}</motion.p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
        {items.map((item: any) => {
          const colClass = item.colSpan === 2 ? 'md:col-span-2' : item.colSpan === 3 ? 'md:col-span-3' : 'md:col-span-1'
          const rowClass = item.rowSpan === 2 ? 'row-span-2' : 'row-span-1'
          
          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              whileHover={{ scale: 0.98 }}
              className={`relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 ${colClass} ${rowClass} ${item.image ? 'bg-stone-900' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              {item.image && (
                <>
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </>
              )}
              <div className={`absolute inset-0 p-8 flex flex-col ${item.image ? 'justify-end text-white' : 'justify-between text-stone-900 dark:text-white'}`}>
                <div>
                  <h4 className={`text-2xl font-bold mb-2 ${item.image ? 'font-serif' : ''}`}>{item.title}</h4>
                  <p className={item.image ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400'}>{item.description}</p>
                </div>
                {!item.image && (
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-saffron-100 dark:bg-saffron-900/30 flex items-center justify-center text-saffron-600 dark:text-saffron-400 group-hover:bg-saffron-500 group-hover:text-white transition-colors">
                      →
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export const Hero3DBlock = ({ props }: { props: any }) => {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Environment preset="city" />
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Float rotationIntensity={2} floatIntensity={3} speed={2}>
              <mesh>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial 
                  color={props.modelType === 'diya' ? '#f97316' : '#fbbf24'} 
                  roughness={0.1} 
                  metalness={0.8}
                  wireframe={props.modelType === 'tech'}
                />
              </mesh>
            </Float>
          </PresentationControls>
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center p-8 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-serif text-white tracking-tight drop-shadow-lg">
            {props.title || 'Divine Presence'}
          </motion.h2>
          {props.subtitle && (
            <motion.p variants={fadeInUp} className="mt-6 text-xl text-stone-300 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
              {props.subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function BlockRenderer({ block }: { block: BuilderBlock }) {
  switch (block.type) {
    case 'Hero':
      return <HeroBlock props={block.props} />
    case 'Text':
      return <TextBlock props={block.props} />
    case 'Donation':
      return <DonationBlock props={block.props} />
    case 'Events':
      return <EventsBlock props={block.props} />
    case 'Store':
      return <StoreBlock props={block.props} />
    case 'Gallery3D':
      return <Gallery3DBlock props={block.props} />
    case 'Hero3D':
      return <Hero3DBlock props={block.props} />
    case 'Carousel':
      return <CarouselBlock props={block.props} />
    case 'BentoGrid':
      return <BentoGridBlock props={block.props} />
    default:
      return <div className="p-4 border border-dashed border-red-300 text-red-500 bg-red-50 rounded-lg">Unknown Block Type: {block.type}</div>
  }
}
