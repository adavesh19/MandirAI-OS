'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, MonitorSmartphone, HeartHandshake, Zap, ShieldCheck } from 'lucide-react'

export default function HowItWorks() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scale the background decorative line
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"])

  const steps = [
    {
      number: '01',
      title: 'Digital Onboarding & Setup',
      description: 'Simply enter your temple\'s basic details, deity information, and timings. Our onboarding flow is built specifically for Indian religious trusts, making it effortless to transition online.',
      icon: <MonitorSmartphone className="w-6 h-6 text-saffron-600" />,
      features: ['No coding required', '5-minute setup', 'Secure cloud storage']
    },
    {
      number: '02',
      title: 'Automatic Website Generation',
      description: 'Instantly, MandirAI OS generates a stunning, fully-functional website. Need customization? Higher tiers unlock our visual Drag & Drop AI Copilot to redesign your site using voice prompts.',
      icon: <Sparkles className="w-6 h-6 text-saffron-600" />,
      features: ['Multilingual translation', 'Pre-built 3D plugins', 'Mobile responsive']
    },
    {
      number: '03',
      title: 'Donations & CRM Launch',
      description: 'Your Digital Hundi goes live immediately. Accept UPI and Card payments, automatically send 80G tax receipts via email, and seamlessly manage thousands of devotee profiles in your CRM.',
      icon: <HeartHandshake className="w-6 h-6 text-saffron-600" />,
      features: ['0% platform fees', 'Instant UPI QR codes', 'Automated Receipts']
    },
    {
      number: '04',
      title: 'Seva & Event Management',
      description: 'Devotees can book Sevas online and receive instant WhatsApp confirmations. Effortlessly organize large festivals with our Event Manager and volunteer coordination tools.',
      icon: <Zap className="w-6 h-6 text-saffron-600" />,
      features: ['Online Seva booking', 'WhatsApp integration', 'Festival Intelligence']
    },
    {
      number: '05',
      title: 'Immutable Transparency',
      description: 'For absolute trust, publish your charity and donation utilization logs to an immutable Web3 blockchain ledger, proving to your devotees that their contributions are strictly utilized for Dharma.',
      icon: <ShieldCheck className="w-6 h-6 text-saffron-600" />,
      features: ['Web3 Blockchain Ledger', 'Financial Dashboards', 'Audit Trails']
    }
  ]

  return (
    <section id="how-it-works" className="py-32 bg-stone-50 dark:bg-stone-950 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white mb-6"
          >
            How <span className="text-saffron-600 dark:text-saffron-500">MandirAI OS</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-600 dark:text-stone-300 font-medium"
          >
            A complete operating system to digitize your temple from end to end, automatically.
          </motion.p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-stone-200 dark:bg-stone-800 rounded-full -translate-x-1/2" />
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-saffron-500 via-amber-500 to-maroon-600 rounded-full -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Central Node */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-stone-900 border-4 border-stone-100 dark:border-stone-800 flex items-center justify-center shadow-xl relative z-20 group hover:border-saffron-500 transition-colors duration-300">
                      <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-saffron-500 to-amber-600">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-800 hover:shadow-2xl hover:border-saffron-500/50 transition-all duration-300 group">
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {isEven ? (
                          <>
                            <h3 className="font-heading text-2xl font-bold text-stone-900 dark:text-white">{step.title}</h3>
                            <div className="p-2 bg-saffron-50 dark:bg-saffron-900/20 rounded-xl">{step.icon}</div>
                          </>
                        ) : (
                          <>
                            <div className="p-2 bg-saffron-50 dark:bg-saffron-900/20 rounded-xl">{step.icon}</div>
                            <h3 className="font-heading text-2xl font-bold text-stone-900 dark:text-white">{step.title}</h3>
                          </>
                        )}
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6 font-medium">
                        {step.description}
                      </p>
                      <ul className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {step.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-[11px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-3 py-1.5 rounded-full">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Empty space for the other half */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
