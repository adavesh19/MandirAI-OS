'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  PlayCircle,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Video,
  CreditCard,
  CheckCircle,
  Globe,
  Bell,
  Star,
  Shield,
  Zap,
  Lock,
  Camera,
  BookOpen,
  Info,
  Gift,
  Sun,
  Moon,
  Wind,
  Droplets,
  Flower2,
  Flame,
  Music,
  ArrowRight
} from 'lucide-react';
import BlockRenderer from '@/components/temple/blocks/block-renderer';
import { useLanguage } from '@/components/shared/language-context';

export interface TemplateProps {
  temple: any;
  page: any;
  sevas: any[];
}

const FALLBACK_DATA = {
  name: "Sri Vidyadhiraja Modern Sanctum",
  tagline: "Bridging Devotion & Digital Innovation",
  description: "Experience the divine grace through our state-of-the-art digital sanctum. Connect with the eternal from anywhere in the world.",
  about: "Founded on the principles of ancient wisdom and modern accessibility, our temple leverages cutting-edge technology to bring darshan, sevas, and spiritual community directly to devotees worldwide. We believe that physical distance should never be a barrier to divine connection.",
  deity: "Sri Vidyadhiraja",
  location: "Silicon Valley, CA / Global Cloud Sanctum",
  timings: "Open 24/7 Digitally | Physical: 6:00 AM - 9:00 PM",
  contact: {
    phone: "+1 (555) 108-1008",
    email: "sanctum@digitaltemple.app",
    whatsapp: "+1 (555) 108-1008"
  },
  metrics: [
    { label: "Active Viewers", value: "2,451", icon: Users, trend: "up", change: "+12%" },
    { label: "Sevas Today", value: "847", icon: Activity, trend: "up", change: "+5%" },
    { label: "Global Devotees", value: "125K+", icon: Globe, trend: "up", change: "+8%" },
    { label: "Donations (Weekly)", value: "₹4.2L", icon: TrendingUp, trend: "up", change: "+15%" },
    { label: "App Downloads", value: "50K+", icon: Zap, trend: "up", change: "+2%" },
    { label: "Wait Time", value: "0 mins", icon: Clock, trend: "down", change: "-100%" }
  ],
  feed: [
    { id: 1, user: "Rajesh K.", action: "booked Abhishekam", time: "2 mins ago" },
    { id: 2, user: "Priya M.", action: "made a donation", time: "5 mins ago" },
    { id: 3, user: "Anonymous", action: "joined Live Darshan", time: "12 mins ago" },
    { id: 4, user: "Suresh V.", action: "sponsored Annadanam", time: "18 mins ago" },
    { id: 5, user: "Anita D.", action: "booked Archana", time: "25 mins ago" }
  ],
  sevas: [
    { id: "s1", name: "Virtual Abhishekam", description: "Participate in the sacred bathing of the deity via high-res stream.", price: 501, image: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=800&q=80" },
    { id: "s2", name: "Digital Archana", description: "Your name and gotra chanted during the evening aarti.", price: 251, image: "https://images.unsplash.com/photo-1596700732388-3ef711b71609?w=800&q=80" },
    { id: "s3", name: "Annadanam Fund", description: "Contribute to feeding the needy. Track impact in real-time.", price: 1001, image: "https://images.unsplash.com/photo-1542382103-678c1875fa6a?w=800&q=80" },
    { id: "s4", name: "Akhanda Deepam", description: "Sponsor the eternal flame in the sanctum for 24 hours.", price: 2001, image: "https://images.unsplash.com/photo-1517414963507-160db8db6522?w=800&q=80" },
    { id: "s5", name: "Vastra Samarpana", description: "Offer sacred garments for the deity's daily alankaram.", price: 5001, image: "https://images.unsplash.com/photo-1590089855577-497d519b5d27?w=800&q=80" },
    { id: "s6", name: "Special Puja", description: "Personalized puja for birthdays and anniversaries.", price: 1501, image: "https://images.unsplash.com/photo-1582697805213-913e617d5982?w=800&q=80" }
  ],
  features: [
    { id: "f1", title: "Instant Online Donations", desc: "Secure, transparent, and instant 80G receipts for all your contributions.", icon: CreditCard, image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=800&q=80" },
    { id: "f2", title: "Smart Seva Booking", desc: "AI-assisted scheduling ensures you never miss auspicious timings for your sevas.", icon: Calendar, image: "https://images.unsplash.com/photo-1516222338250-863216ce01ea?w=800&q=80" },
    { id: "f3", title: "4K Live Darshan", desc: "Experience the divine presence in ultra-high definition from anywhere.", icon: Video, image: "https://images.unsplash.com/photo-1608677732296-6e42c5ff2373?w=800&q=80" }
  ],
  faqs: [
    { q: "How do I get my 80G receipt?", a: "Your 80G receipt is automatically generated and emailed to you instantly after a successful donation. You can also download it anytime from your dashboard." },
    { q: "Is the live stream available 24/7?", a: "The live stream operates during temple opening hours (6 AM to 9 PM). Replays of major aartis are available 24/7." },
    { q: "Can I book a seva for a future date?", a: "Yes, you can book sevas up to 6 months in advance using our smart calendar feature." },
    { q: "Are international payments accepted?", a: "We accept all major international credit cards, PayPal, and Apple/Google Pay." },
    { q: "How does the AI scheduling work?", a: "Our system analyzes panchang timings and your preferences to suggest the most auspicious time slots for your chosen sevas." },
    { q: "Is my personal data secure?", a: "We use bank-level encryption (AES-256) to secure all your personal and payment information." },
    { q: "Can I view the website in my language?", a: "Yes, use the language selector in the navigation bar to choose from 10+ available languages." },
    { q: "How do I join the WhatsApp community?", a: "Click the 'Join WhatsApp' button in the community section to receive daily updates and panchang alerts." }
  ],
  schedule: [
    { time: "06:00 AM", event: "Suprabhatam & Mangala Aarti", icon: Sun },
    { time: "08:30 AM", event: "Morning Abhishekam", icon: Droplets },
    { time: "12:00 PM", event: "Rajbhog Aarti", icon: Flame },
    { time: "04:00 PM", event: "Veda Parayanam", icon: BookOpen },
    { time: "07:00 PM", event: "Sandhya Aarti", icon: Music },
    { time: "09:00 PM", event: "Ekantha Seva", icon: Moon }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?w=800&q=80",
    "https://images.unsplash.com/photo-1596700732388-3ef711b71609?w=800&q=80",
    "https://images.unsplash.com/photo-1542382103-678c1875fa6a?w=800&q=80",
    "https://images.unsplash.com/photo-1517414963507-160db8db6522?w=800&q=80",
    "https://images.unsplash.com/photo-1590089855577-497d519b5d27?w=800&q=80",
    "https://images.unsplash.com/photo-1582697805213-913e617d5982?w=800&q=80"
  ],
  events: [
    { id: 1, name: "Maha Shivaratri Celebrations", date: "Mar 8, 2024", desc: "Join the all-night vigil and special pujas.", type: "Festival" },
    { id: 2, name: "Annual Brahmotsavam", date: "Apr 15-24, 2024", desc: "10 days of grand processions and divine festivities.", type: "Major Event" },
    { id: 3, name: "Pradosham Puja", date: "Every Fortnight", desc: "Special evening abhishekam for Lord Shiva.", type: "Regular" }
  ],
  testimonials: [
    { name: "Rahul S.", location: "New York", text: "The digital sanctum is incredibly immersive. I feel connected to the temple despite being thousands of miles away." },
    { name: "Meera P.", location: "London", text: "Booking sevas is so seamless, and the instant 80G receipt feature for donations is a game-changer." },
    { name: "Karthik N.", location: "Bengaluru", text: "The live darshan quality is amazing. I start my day watching the morning aarti every single day." }
  ]
};

// Internal Components

const GlassCard = ({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: any }) => (
  <div 
    className={`bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] ${className}`}
    style={style}
  >
    {children}
  </div>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Button = ({ children, variant = 'primary', className = "", onClick }: { children: React.ReactNode, variant?: 'primary'|'secondary'|'outline', className?: string, onClick?: () => void }) => {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30",
    secondary: "bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-violet-500/30",
    outline: "bg-white/50 hover:bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-300 backdrop-blur-sm"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default function ModernElegantTemplate({ temple, page, sevas }: TemplateProps) {
  const { t } = useLanguage();
  const data = { ...FALLBACK_DATA, ...temple, name: temple?.name || FALLBACK_DATA.name };
  const activeSevas = sevas && sevas.length > 0 ? sevas : FALLBACK_DATA.sevas;

  const handleAIFeature = () => {
    if (!temple?.plan || temple.plan === 'free') {
      alert('Upgrade to AI plan to use AI features');
      return;
    }
    alert('AI feature activated!');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f0f4ff,#faf0ff)] font-sans text-slate-800 overflow-x-hidden selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* Decorative Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-300/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-[40%] left-[30%] w-[20%] h-[20%] bg-orange-300/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <GlassCard className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {data.name.charAt(0)}
            </div>
            <span className="font-bold text-xl hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-violet-900">
              {data.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
            <Link href="#darshan" className="hover:text-indigo-600 transition-colors">Darshan</Link>
            <Link href="#sevas" className="hover:text-indigo-600 transition-colors">Sevas</Link>
            <Link href="#about" className="hover:text-indigo-600 transition-colors">About</Link>
            <Link href="#contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
          <Button onClick={handleAIFeature} variant="primary" className="!py-2 !px-4 text-sm gap-2">
            <Lock className="w-4 h-4" /> Sign In
          </Button>
        </GlassCard>
      </nav>

      {/* Section 1: Hero (Split Screen) */}
      <section className="relative pt-32 pb-20 lg:min-h-screen flex items-center z-10 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Info */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
              <SparkleIcon /> Welcome to the Future of Devotion
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              <span className="block">{data.name}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Digital Sanctum
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              {data.tagline}. {data.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2">
                <PlayCircle className="w-5 h-5" /> Live Darshan
              </Button>
              <Button variant="outline" className="gap-2">
                Book a Seva <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Dashboard Panel */}
          <div className="relative group perspective-1000">
            <GlassCard className="p-6 relative transform transition-transform duration-500 preserve-3d group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg]">
              {/* Live Indicator */}
              <div className="absolute -top-3 -right-3 bg-white p-2 rounded-xl shadow-xl flex items-center gap-2 border border-slate-100">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Now</span>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                  <h3 className="font-bold text-lg text-slate-800">Sanctum Status</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-medium">All Systems Operational</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Live Viewers</p>
                    <p className="text-2xl font-bold text-slate-900">{FALLBACK_DATA.metrics[0].value}</p>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Next Aarti In</p>
                    <p className="text-2xl font-bold text-indigo-600">45:20</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Live Activity Feed
                  </h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {FALLBACK_DATA.feed.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-slate-50/80 transition-colors">
                        <span className="font-medium text-slate-700">{item.user} <span className="text-slate-500 font-normal">{item.action}</span></span>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="pt-4 border-t border-slate-200/50">
                  <h4 className="text-xs text-slate-500 mb-2">Weekly Donations (Live)</h4>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 70, 45, 90, 60, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm relative group/bar">
                        <div 
                          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-500 group-hover/bar:bg-indigo-400"
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
            {/* 3D shadow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-2xl -z-10 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

        </div>
      </section>

      {/* Section 2: Metrics Dashboard */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {FALLBACK_DATA.metrics.map((metric, i) => (
              <GlassCard key={i} className="p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${metric.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metric.change}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-slate-500 font-medium">{metric.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Quick Actions */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Book Seva", icon: BookOpen, color: "bg-blue-500", href: "#sevas" },
              { title: "Donate Now", icon: Heart, color: "bg-rose-500", href: "#donate" },
              { title: "Live Darshan", icon: Video, color: "bg-violet-500", href: "#darshan" },
              { title: "Panchang", icon: Calendar, color: "bg-amber-500", href: "#panchang" }
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
                  <div className={`absolute inset-0 ${action.color} opacity-90 transition-opacity group-hover:opacity-100 z-0`}></div>
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>
                  <div className="relative z-10 p-6 flex flex-col items-center justify-center text-white h-32 text-center">
                    <action.icon className="w-8 h-8 mb-3 transition-transform group-hover:scale-110" />
                    <span className="font-bold text-lg">{action.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Today's Schedule */}
      <section className="py-20 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Today's Darshan Schedule" subtitle="Join us at the sanctum for these auspicious moments." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FALLBACK_DATA.schedule.map((item, i) => (
              <GlassCard key={i} className="p-6 flex items-center gap-4 hover:border-indigo-200 transition-colors">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full text-indigo-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-600 mb-1">{item.time}</p>
                  <p className="font-semibold text-slate-800">{item.event}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Featured Sevas (Bento Grid 3D) */}
      <section id="sevas" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading title="Featured Sevas" subtitle="Offer your devotion digitally with smart booking." />
            <Button variant="outline" className="hidden md:flex gap-2">View All <ArrowRight className="w-4 h-4"/></Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {activeSevas.map((seva: any, i: number) => (
              <div key={i} className="group relative h-[400px] rounded-3xl preserve-3d cursor-pointer">
                {/* Front */}
                <GlassCard className="absolute inset-0 p-0 overflow-hidden backface-hidden transition-all duration-700 group-hover:rotate-y-180 flex flex-col">
                  <div className="h-48 bg-slate-200 relative">
                    <img src={seva.image} alt={seva.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-indigo-900 shadow-sm">
                      ₹{seva.price}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{seva.name}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{seva.description}</p>
                    <div className="mt-auto flex justify-between items-center text-indigo-600 text-sm font-medium">
                      <span>Hover for details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </GlassCard>
                
                {/* Back */}
                <GlassCard className="absolute inset-0 p-6 backface-hidden rotate-y-180 transition-all duration-700 group-hover:rotate-y-0 bg-gradient-to-br from-indigo-900 to-violet-900 text-white flex flex-col border-none">
                  <h3 className="text-2xl font-bold mb-4">{seva.name}</h3>
                  <p className="text-indigo-100 mb-6 flex-1">{seva.description}</p>
                  <ul className="space-y-2 mb-6 text-sm text-indigo-200">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400"/> Instant Digital Receipt</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400"/> Pradasam Home Delivery</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400"/> Sankalpam Video Link</li>
                  </ul>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" onClick={handleAIFeature}>
                    <Lock className="w-4 h-4 mr-2" /> Book with AI Assistant
                  </Button>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Panchang / Calendar Widget */}
      <section id="panchang" className="py-16 relative z-10 bg-white/30">
        <div className="max-w-5xl mx-auto px-4">
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-indigo-600" /> Digital Panchang
                </h2>
                <p className="text-slate-600">Plan your spiritual activities with our real-time astrological calculations tailored to your timezone.</p>
                
                <div className="bg-indigo-50 p-4 rounded-xl space-y-3 mt-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Tithi</span>
                    <span className="font-bold text-slate-900">Shukla Paksha Ekadashi</span>
                  </div>
                  <div className="flex justify-between border-t border-indigo-100 pt-3">
                    <span className="text-slate-600 font-medium">Nakshatra</span>
                    <span className="font-bold text-slate-900">Rohini</span>
                  </div>
                  <div className="flex justify-between border-t border-indigo-100 pt-3">
                    <span className="text-slate-600 font-medium">Rahu Kalam</span>
                    <span className="font-bold text-red-600">10:30 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
                  {['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                    <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                      {day}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Sun className="w-8 h-8 text-amber-400" />
                    <div>
                      <p className="text-sm text-slate-400">Sunrise / Sunset</p>
                      <p className="font-bold">06:12 AM / 06:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Moon className="w-8 h-8 text-slate-300" />
                    <div>
                      <p className="text-sm text-slate-400">Moonrise / Moonset</p>
                      <p className="font-bold">04:30 PM / 03:15 AM</p>
                    </div>
                  </div>
                  <button onClick={handleAIFeature} className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4"/> Get Personalized Muhurat
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Section 7: History / About (Split) */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl transform -rotate-3 scale-105 opacity-20 blur-lg"></div>
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80" alt="Temple" className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
              
              <GlassCard className="absolute -bottom-6 -right-6 p-6 max-w-xs animate-float">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Est. 1950</h4>
                    <p className="text-xs text-slate-500">Digitized in 2024</p>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">Preserving Heritage in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Digital Age</span></h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {data.about}
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Authentic Vedic rituals performed by certified priests.",
                  "High-definition multi-cam live streaming of the sanctum.",
                  "Transparent donation tracking and instant 80G receipts.",
                  "Global community of devotees connected through technology."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button variant="secondary">Read Full History</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Feature Showcase (Alternating) */}
      <section className="py-24 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Platform Features" subtitle="Designed for a seamless spiritual journey." />
          
          <div className="space-y-24 mt-16">
            {FALLBACK_DATA.features.map((feature, i) => (
              <div key={feature.id} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-lg text-slate-600">{feature.desc}</p>
                  <Button variant="outline" className="mt-4" onClick={handleAIFeature}>
                    <Lock className="w-4 h-4 mr-2" /> Explore Feature
                  </Button>
                </div>
                <div className="flex-1 relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-3xl blur-xl opacity-30 transform scale-95"></div>
                  <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden aspect-video">
                    {/* Mockup UI */}
                    <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <div className="ml-4 bg-white px-3 py-1 rounded-md text-xs text-slate-500 w-1/2 flex items-center gap-2">
                        <Lock className="w-3 h-3"/> sanctum.app/{feature.title.toLowerCase().replace(/\s+/g, '-')}
                      </div>
                    </div>
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Upcoming Events */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Upcoming Events" subtitle="Mark your calendar for these grand celebrations." />
          
          <div className="grid md:grid-cols-3 gap-8">
            {FALLBACK_DATA.events.map((event) => (
              <GlassCard key={event.id} className="p-8 group hover:border-indigo-300 transition-colors">
                <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
                  {event.type}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.name}</h3>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-4">
                  <Calendar className="w-4 h-4" /> {event.date}
                </div>
                <p className="text-slate-600 mb-6">{event.desc}</p>
                <button className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  RSVP Now <ArrowRight className="w-4 h-4" />
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Donations & 80G */}
      <section id="donate" className="py-24 relative z-10 bg-gradient-to-br from-indigo-900 to-violet-900 text-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                <Shield className="w-4 h-4 text-emerald-400" /> 80G Tax Exemption Available
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Support the Sanctum, Empower the Community.</h2>
              <p className="text-indigo-200 text-lg">
                Your contributions directly fund temple maintenance, daily rituals, and our Annadanam (free meals) program. All donations are 100% transparent.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">10K+</h4>
                  <p className="text-indigo-200 text-sm">Meals Served Monthly</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                  <p className="text-indigo-200 text-sm">Funds Utilized Properly</p>
                </div>
              </div>
            </div>

            <GlassCard className="!bg-white/10 !border-white/20 p-8">
              <h3 className="text-2xl font-bold mb-6">Make a Contribution</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1001, 2001, 5001].map(amount => (
                  <button key={amount} className="py-3 border border-white/30 rounded-xl hover:bg-white/20 transition-colors font-semibold">
                    ₹{amount}
                  </button>
                ))}
              </div>
              
              <div className="mb-6">
                <label className="text-sm text-indigo-200 mb-2 block">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input type="number" placeholder="Enter amount" className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-8 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8 text-sm text-indigo-200">
                <input type="checkbox" id="80g" className="w-4 h-4 rounded border-white/30 bg-transparent" />
                <label htmlFor="80g">I need an 80G Tax Exemption Certificate</label>
              </div>

              <Button className="w-full justify-center !bg-white !text-indigo-900 hover:!bg-indigo-50 text-lg">
                Proceed to Donate
              </Button>
              <p className="text-center text-xs text-indigo-300 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure Payment via Razorpay
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Section 11: Gallery Preview (Masonry) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Visual Journey" subtitle="Glimpses of divinity and devotion." />
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {FALLBACK_DATA.gallery.map((img, i) => (
              <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-pointer shadow-lg">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold flex items-center gap-2"><Camera className="w-4 h-4"/> View Full Image</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline">View Full Gallery</Button>
          </div>
        </div>
      </section>

      {/* Section 12: Testimonials */}
      <section className="py-24 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Devotee Experiences" subtitle="Hear from our global community." />
          
          <div className="grid md:grid-cols-3 gap-8">
            {FALLBACK_DATA.testimonials.map((t, i) => (
              <GlassCard key={i} className="p-8 relative">
                <div className="text-indigo-200 mb-6">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <p className="text-slate-700 text-lg mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.location}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 13: Live Darshan Banner */}
      <section id="darshan" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Streaming Now
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Experience the Divine Live.</h2>
              <p className="text-slate-300 text-lg">Join thousands of devotees worldwide in our high-definition virtual sanctum.</p>
              <div className="flex items-center gap-6">
                <Button className="!bg-white !text-slate-900 hover:!bg-slate-100 gap-2">
                  <Play className="w-5 h-5" /> Join Stream
                </Button>
                <p className="text-slate-400 text-sm font-medium"><Users className="w-4 h-4 inline mr-1"/> 2,451 watching</p>
              </div>
            </div>
            
            <div className="relative z-10 md:w-1/2 w-full aspect-video bg-black rounded-2xl border border-slate-700 overflow-hidden group cursor-pointer shadow-2xl">
              <img src="https://images.unsplash.com/photo-1608677732296-6e42c5ff2373?w=800&q=80" alt="Live Stream" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 14: Integration Badges (Marquee) */}
      <section className="py-12 border-y border-slate-200/50 bg-white/20 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest">Powered by Modern Technology</p>
        </div>
        <div className="flex space-x-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity items-center">
          {[...Array(2)].fill(0).map((_, idx) => (
            <React.Fragment key={idx}>
              <span className="text-xl font-bold text-slate-700 flex items-center gap-2"><CreditCard className="w-6 h-6"/> Razorpay</span>
              <span className="text-xl font-bold text-slate-700 flex items-center gap-2"><MessageCircle className="w-6 h-6"/> WhatsApp</span>
              <span className="text-xl font-bold text-slate-700 flex items-center gap-2"><Video className="w-6 h-6"/> YouTube Live</span>
              <span className="text-xl font-bold text-slate-700 flex items-center gap-2"><MapPin className="w-6 h-6"/> Google Maps</span>
              <span className="text-xl font-bold text-slate-700 flex items-center gap-2"><Zap className="w-6 h-6"/> Cloudflare</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Section 15: FAQ Accordion */}
      <section className="py-24 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Frequently Asked Questions" />
          
          <div className="space-y-4">
            {FALLBACK_DATA.faqs.map((faq, i) => (
              <details key={i} className="group bg-white/60 backdrop-blur-md rounded-2xl border border-white open:bg-white transition-all shadow-sm">
                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none p-6 text-slate-800">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-indigo-500" />
                  </span>
                </summary>
                <div className="text-slate-600 pb-6 px-6 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 16: Community & WhatsApp */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <GlassCard className="p-12 border-2 border-emerald-100 bg-gradient-to-b from-white/80 to-emerald-50/80">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <MessageCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Join our Digital Community</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Get daily panchang updates, aarti reminders, and connect with fellow devotees on our official WhatsApp community.
            </p>
            <Button className="!bg-emerald-500 hover:!bg-emerald-600 shadow-emerald-500/30 gap-2 text-lg px-8">
              <MessageCircle className="w-5 h-5" /> Join WhatsApp Group
            </Button>
          </GlassCard>
        </div>
      </section>

      {/* Section 17: Timings & Contact */}
      <section id="contact" className="py-24 relative z-10 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2"><Clock className="text-indigo-400"/> Timings</h3>
              <p>{data.timings}</p>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Digital Sanctum</p>
                <p className="font-bold text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Open 24/7 Online
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2"><Phone className="text-indigo-400"/> Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg"><Phone className="w-4 h-4 text-indigo-400"/></div>
                  {data.contact.phone}
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg"><Mail className="w-4 h-4 text-indigo-400"/></div>
                  {data.contact.email}
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg"><MessageCircle className="w-4 h-4 text-indigo-400"/></div>
                  {data.contact.whatsapp}
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2"><MapPin className="text-indigo-400"/> Location</h3>
              <p>{data.location}</p>
              <div className="w-full h-48 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors"></div>
                <MapPin className="w-8 h-8 text-indigo-400 relative z-10 animate-bounce" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-indigo-300 z-10">View on Map &rarr;</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 18: Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 relative z-10 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold">
              {data.name.charAt(0)}
            </div>
            <span className="font-bold text-white">{data.name}</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>

          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
