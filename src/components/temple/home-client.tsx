'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Clock, Heart, Phone, Mail, MapPin, Star, ChevronRight,
  Camera, IndianRupee, Sparkles, BookOpen, CalendarDays,
  Music, Gift, Users, ArrowRight, Play, Bell, CheckCircle2
} from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

interface HomeClientProps {
  temple: {
    name: string
    primaryDeity: string | null
    slug: string
    contactPhone: string | null
    contactEmail: string | null
    templeType?: string
    address?: any
    timings: {
      morning_open: string
      morning_close: string
      evening_open: string
      evening_close: string
    }
  }
  page: { title: any; description: any; content: any } | null
  sevas?: Array<{ id: string; name: string; amount: number; description: string | null }>
}

const SEVAS_DEFAULT = [
  { id: '1', name: 'Deepa Seva', amount: 51, description: 'Light a sacred lamp for the deity' },
  { id: '2', name: 'Pushpa Seva', amount: 101, description: 'Offer flowers to the presiding deity' },
  { id: '3', name: 'Abhishek Seva', amount: 501, description: 'Sacred ritual bathing of the deity idol' },
  { id: '4', name: 'Annadanam', amount: 251, description: 'Food distribution to devotees and needy' },
  { id: '5', name: 'Sahasranama Archana', amount: 151, description: 'Recitation of 1000 names of the deity' },
  { id: '6', name: 'Maha Pooja', amount: 1001, description: 'Grand daily ritual with full vedic rites' },
]

const GALLERY_PLACEHOLDER = [
  { label: 'Temple Entrance', emoji: '🛕', color: 'from-amber-400 to-orange-500' },
  { label: 'Main Sanctum', emoji: '🪔', color: 'from-saffron-500 to-red-500' },
  { label: 'Festival Celebrations', emoji: '🎊', color: 'from-purple-500 to-pink-500' },
  { label: 'Sacred Rituals', emoji: '🙏', color: 'from-emerald-500 to-teal-500' },
  { label: 'Temple Gopuram', emoji: '⛩️', color: 'from-blue-500 to-indigo-500' },
  { label: 'Evening Aarti', emoji: '✨', color: 'from-yellow-500 to-amber-500' },
]

const UPCOMING_EVENTS = [
  { title: 'Maha Shivaratri', date: 'Feb 26, 2026', type: 'Festival' },
  { title: 'Ganesh Chaturthi', date: 'Aug 27, 2026', type: 'Festival' },
  { title: 'Temple Anniversary', date: 'Mar 15, 2026', type: 'Special' },
  { title: 'Navratri Celebrations', date: 'Oct 2, 2026', type: 'Festival' },
]

const DONATION_AMOUNTS = [51, 101, 251, 501, 1001, 2100]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function HomeClient({ temple, page, sevas }: HomeClientProps) {
  const { t } = useLanguage()
  const [activeSevaTab, setActiveSevaTab] = React.useState<'seva' | 'donate'>('seva')
  const [selectedDonation, setSelectedDonation] = React.useState<number | null>(null)
  const [customAmount, setCustomAmount] = React.useState('')
  const [donorName, setDonorName] = React.useState('')
  const [donorPhone, setDonorPhone] = React.useState('')
  const [donorPan, setDonorPan] = React.useState('')
  const [donorCity, setDonorCity] = React.useState('')
  const [selectedSeva, setSelectedSeva] = React.useState<string | null>(null)

  const sevaList = sevas && sevas.length > 0 ? sevas : SEVAS_DEFAULT

  const defaultTitle = { en: `Welcome to ${temple.name}`, hi: `${temple.name} में आपका स्वागत है`, kn: `${temple.name} ಗೆ ಸ್ವಾಗತ`, ta: `${temple.name} வரவேற்கிறது`, te: `${temple.name} కి స్వాగతం` }
  const defaultDescription = { en: `A sacred spiritual center dedicated to Lord ${temple.primaryDeity || 'the Divine'}. Come, seek blessings and find peace.`, hi: `भगवान ${temple.primaryDeity || 'दिव्य'} को समर्पित पवित्र स्थान।`, kn: `ಶ್ರೀ ${temple.primaryDeity || 'ದೈವ'} ಅನ್ನು ಸಮರ್ಪಿತ ಪವಿತ್ರ ಕ್ಷೇತ್ರ.`, ta: `திருமால் ${temple.primaryDeity || 'தெய்வம்'} அர்ப்பணிக்கப்பட்ட புனித தலம்.`, te: `శ్రీ ${temple.primaryDeity || 'దైవ'} కి అంకితమైన పవిత్ర క్షేత్రం.` }

  const titleText = page ? t(page.title) : t(defaultTitle)
  const descText = page ? t(page.description) : t(defaultDescription)
  const htmlContent = page ? t(page.content) : `<p>Welcome to ${temple.name}. We invite all devotees to seek blessings, participate in daily poojas, and engage with our sacred community.</p>`

  return (
    <div className="space-y-0">

      {/* ══════════════════════════════════════════
          HERO SECTION — Futuristic Cinematic Banner
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background gradient & animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-amber-950/90 to-orange-950/80" />
        
        {/* Futuristic glowing grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDIxMiwgMTc1LCA1NSwgMC4wNSkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIvPjwvZz48L3N2Zz4=')] opacity-30" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-orange-600/20 blur-[100px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Hero Text */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white space-y-6"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <span className="text-amber-400 text-sm animate-pulse">🕉️</span>
                <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">Sacred Devotional Center</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-tight drop-shadow-2xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200">
                  {titleText}
                </span>
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="h-1 w-24 bg-gradient-to-r from-amber-400 to-transparent rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              
              <motion.p variants={fadeInUp} className="text-stone-300 text-lg leading-relaxed max-w-lg font-light">
                {descText}
              </motion.p>
              
              {temple.primaryDeity && (
                <motion.div variants={fadeInUp} className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-amber-500/20 max-w-[60px]" />
                  <span className="text-amber-300 text-sm font-semibold px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
                    ✨ Presiding Deity: {temple.primaryDeity}
                  </span>
                </motion.div>
              )}

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Link href={`/temple/${temple.slug}/donate`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 font-bold text-white shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(245,158,11,0.6)]">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Heart className="h-5 w-5 fill-white relative z-10" />
                  <span className="relative z-10">Donate Now</span>
                </Link>
                <a href="#sevas"
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl backdrop-blur-md transition-all hover:scale-105">
                  <CalendarDays className="h-5 w-5" />
                  Book a Seva
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Glassmorphism Floating Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              {/* Main Futuristic Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] aspect-[3/4] bg-white/5 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <motion.div 
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="text-8xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  >
                    🙏
                  </motion.div>
                  <p className="text-amber-300 text-lg font-bold tracking-widest uppercase">Sacred View</p>
                  <p className="text-stone-400 text-sm">Upload temple photos via the AI Website Manager.</p>
                </div>
                {/* Cyberpunk/Futuristic Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400/50 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400/50 rounded-br-3xl" />
              </div>
              
              {/* Floating Glass Card 1 */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-12 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl w-56"
              >
                <div className="text-4xl text-center mb-3 drop-shadow-md">🛕</div>
                <p className="text-sm font-bold text-white text-center leading-tight">{temple.name}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />)}
                </div>
              </motion.div>

              {/* Floating Glass Card 2 (Timings) */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-8 bg-gradient-to-br from-amber-500/90 to-orange-600/90 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]" />
                  <p className="text-sm font-bold tracking-wider uppercase">Live Status</p>
                </div>
                <p className="text-xs font-medium opacity-90">Morning: {temple.timings.morning_open}</p>
                <p className="text-xs font-medium opacity-90">Evening: {temple.timings.evening_open}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Futuristic bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP — Dark Glass Theme
      ══════════════════════════════════════════ */}
      <section className="bg-stone-950 py-12 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛕', value: '100+', label: 'Years of Heritage' },
              { icon: '🙏', value: '5000+', label: 'Daily Devotees' },
              { icon: '🪔', value: '12', label: 'Daily Rituals' },
              { icon: '🎊', value: '24+', label: 'Annual Festivals' },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="text-4xl drop-shadow-lg">{s.icon}</span>
                <p className="font-heading text-3xl font-black text-white mt-3">{s.value}</p>
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT + DARSHAN TIMINGS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-stone-950 text-white relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-amber-900/20 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* About column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles className="h-3 w-3" /> About The Temple
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">{temple.name}</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              </div>
              <div className="prose prose-invert max-w-none text-stone-300 leading-relaxed text-sm space-y-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }} />
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`/temple/${temple.slug}/about`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl transition-all hover:scale-105">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={`/temple/${temple.slug}/history`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-stone-300 hover:text-white px-4 py-3 rounded-xl transition-all">
                  <BookOpen className="h-4 w-4" /> Temple History
                </Link>
              </div>
            </motion.div>

            {/* Timings + Quick Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Darshan Timings Glass Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">Darshan Timings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: '🌅 Morning Darshan', time: `${temple.timings.morning_open} – ${temple.timings.morning_close}` },
                      { label: '🌙 Evening Darshan', time: `${temple.timings.evening_open} – ${temple.timings.evening_close}` },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-black/40 rounded-2xl px-5 py-4 border border-white/5 hover:border-white/20 transition-colors">
                        <span className="text-sm font-medium text-stone-300">{item.label}</span>
                        <span className="text-sm font-bold text-white">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info Glass Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
                <h4 className="font-heading text-sm font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Reach Us
                </h4>
                <div className="space-y-3">
                  {temple.contactPhone && (
                    <a href={`tel:${temple.contactPhone}`} className="flex items-center gap-3 text-sm text-stone-300 hover:text-amber-400 transition-colors bg-black/20 p-3 rounded-xl border border-white/5">
                      <Phone className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      {temple.contactPhone}
                    </a>
                  )}
                  {temple.contactEmail && (
                    <a href={`mailto:${temple.contactEmail}`} className="flex items-center gap-3 text-sm text-stone-300 hover:text-amber-400 transition-colors bg-black/20 p-3 rounded-xl border border-white/5">
                      <Mail className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      {temple.contactEmail}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SEVAS & DONATIONS
      ══════════════════════════════════════════ */}
      <section id="sevas" className="py-20 bg-stone-900 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Gift className="h-3 w-3" /> Divine Service
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">Sevas & Offerings</h2>
            <p className="text-stone-400 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              Participate in sacred rituals or support the temple's daily operations. Your contributions help sustain our spiritual mission.
            </p>
          </motion.div>

          {/* Futuristic Tab Switch */}
          <div className="flex justify-center mb-10">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 flex gap-1">
              <button
                onClick={() => setActiveSevaTab('seva')}
                className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeSevaTab === 'seva' ? 'text-amber-400' : 'text-stone-400 hover:text-white'}`}
              >
                {activeSevaTab === 'seva' && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-amber-500/10 border border-amber-500/30 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
                )}
                <span className="relative z-10 flex items-center gap-2">🪔 Book Seva</span>
              </button>
              <button
                onClick={() => setActiveSevaTab('donate')}
                className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeSevaTab === 'donate' ? 'text-orange-400' : 'text-stone-400 hover:text-white'}`}
              >
                {activeSevaTab === 'donate' && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-orange-500/10 border border-orange-500/30 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.2)]" />
                )}
                <span className="relative z-10 flex items-center gap-2">❤️ Make Donation</span>
              </button>
            </div>
          </div>

          {/* SEVA TAB */}
          {activeSevaTab === 'seva' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {sevaList.map((seva, i) => {
                    const icons = ['🪔', '🌸', '🫧', '🍚', '📿', '🎊']
                    const isSelected = selectedSeva === seva.id
                    return (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={seva.id}
                        onClick={() => setSelectedSeva(isSelected ? null : seva.id)}
                        className={`cursor-pointer rounded-3xl border p-6 transition-all relative overflow-hidden ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent pointer-events-none" />}
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <span className="text-4xl drop-shadow-lg">{icons[i % icons.length]}</span>
                          {isSelected && <CheckCircle2 className="h-6 w-6 text-amber-500" />}
                        </div>
                        <h4 className="font-heading font-bold text-white text-lg relative z-10">{seva.name}</h4>
                        {seva.description && <p className="text-sm text-stone-400 mt-2 leading-relaxed relative z-10">{seva.description}</p>}
                        <div className="flex items-center justify-between mt-6 relative z-10">
                          <span className="font-heading text-2xl font-black text-amber-400">₹{seva.amount}</span>
                          <span className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors ${
                            isSelected ? 'bg-amber-500 text-black' : 'bg-white/10 text-stone-300'
                          }`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Seva Booking Form Glass Card */}
              <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl h-fit sticky top-24">
                <h3 className="font-heading text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" /> Booking Details
                </h3>
                <p className="text-sm text-stone-400 mb-6">
                  {selectedSeva ? <span className="text-amber-400 font-medium">Selected: {sevaList.find(s => s.id === selectedSeva)?.name}</span> : 'Select a seva to proceed'}
                </p>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name *" value={donorName} onChange={e => setDonorName(e.target.value)}
                    className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-colors" />
                  <input type="tel" placeholder="Mobile Number *" value={donorPhone} onChange={e => setDonorPhone(e.target.value)}
                    className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-colors" />
                  <input type="text" placeholder="PAN Card (for 80G receipt)" value={donorPan} onChange={e => setDonorPan(e.target.value.toUpperCase())}
                    className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-colors uppercase" />
                  
                  {selectedSeva && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-amber-500">Total Amount:</span>
                      <span className="font-black text-xl text-amber-400">₹{sevaList.find(s => s.id === selectedSeva)?.amount}</span>
                    </motion.div>
                  )}
                  
                  <Link href={`/temple/${temple.slug}/donate${selectedSeva ? `?seva=${selectedSeva}` : ''}`}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all mt-6 ${
                      selectedSeva && donorName && donorPhone
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                        : 'bg-white/5 text-stone-500 cursor-not-allowed border border-white/5'
                    }`}
                    onClick={e => { if (!selectedSeva || !donorName || !donorPhone) e.preventDefault() }}
                  >
                    Proceed to Payment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* DONATION TAB */}
          {activeSevaTab === 'donate' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-12"
            >
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-heading text-2xl font-bold text-white">Support Our Causes</h3>
                <div className="space-y-4">
                  {[
                    { icon: '🏛️', title: 'Temple Maintenance', desc: 'Fund daily operations and upkeep' },
                    { icon: '📚', title: 'Vedic Education', desc: 'Support our Sanskrit learning programs' },
                    { icon: '🍽️', title: 'Annadanam', desc: 'Contribute to daily free meals' },
                  ].map((cause, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <span className="text-3xl bg-black/40 p-3 rounded-xl border border-white/5">{cause.icon}</span>
                      <div className="pt-1">
                        <p className="font-bold text-white">{cause.title}</p>
                        <p className="text-sm text-stone-400 mt-1">{cause.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donation Form Glass Card */}
              <div className="lg:col-span-3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <Heart className="h-6 w-6 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">Make a Donation</h3>
                    <p className="text-sm text-stone-400">All donations are 80G tax exempt</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedDonation(amt); setCustomAmount('') }}
                      className={`py-3.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        selectedDonation === amt
                          ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                          : 'border-white/10 text-stone-300 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                
                <div className="relative mb-8">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setSelectedDonation(null) }}
                    className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <input type="text" placeholder="Full Name *" value={donorName} onChange={e => setDonorName(e.target.value)}
                    className="col-span-2 text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500" />
                  <input type="tel" placeholder="Mobile *" value={donorPhone} onChange={e => setDonorPhone(e.target.value)}
                    className="text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500" />
                  <input type="text" placeholder="PAN (Optional)" value={donorPan} onChange={e => setDonorPan(e.target.value.toUpperCase())}
                    className="text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500 uppercase" />
                </div>

                <Link href={`/temple/${temple.slug}/donate`}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-[1.02] shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all">
                  <Heart className="h-5 w-5 fill-white" /> Proceed to Secure Payment
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

    </div>
  )
}
