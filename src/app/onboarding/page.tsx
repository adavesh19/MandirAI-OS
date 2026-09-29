'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { PageLoader } from '@/components/ui/loading'
import { ArrowLeft, ArrowRight, Check, Sparkles, Building, MapPin, Clock, Landmark, UploadCloud, X, ShieldCheck, Palette, Zap } from 'lucide-react'
import { onboardTemple } from './actions'
import { useLanguage } from '@/components/shared/language-context'
import LanguageSwitcher from '@/components/shared/language-switcher'

export default function OnboardingPage() {
  const router = useRouter()
  const { t, isKannada } = useLanguage()

  const [step, setStep] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [loadingText, setLoadingText] = React.useState(
    isKannada ? 'ದೇವಾಲಯದ ವೆಬ್‌ಸೈಟ್ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...' : 'Preparing environment...'
  )
  const [error, setError] = React.useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = React.useState<string>('free')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const planParam = new URLSearchParams(window.location.search).get('plan')
      if (planParam) {
        setSelectedPlan(planParam)
      }
    }
  }, [])

  // Form State
  const [formData, setFormData] = React.useState({
    name: '',
    slug: '',
    templeType: 'SHIVA',
    primaryDeity: '',
    phone: '',
    email: '',
    historyText: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: 'Karnataka',
      country: 'India',
      pincode: '',
    },
    timings: {
      morning_open: '06:00',
      morning_close: '12:00',
      evening_open: '16:00',
      evening_close: '21:00',
    },
    upiId: '',
    bankDetails: {
      account_name: '',
      account_number: '',
      ifsc: '',
      bank_name: '',
      branch: '',
    },
    trustRegistrationNo: '',
    templateId: 'classic',
    images: {
      temple: '',
      deity: '',
      swamiji: '',
    },
  })

  // Auto-generate slug from name
  React.useEffect(() => {
    if (formData.name && step === 1) {
      const slugified = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
      setFormData((prev) => ({ ...prev, slug: slugified }))
    }
  }, [formData.name, step])

  const nextStep = () => {
    setError(null)
    setStep((prev) => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setError(null)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleTextChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
  }

  const handleTimingChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      timings: { ...prev.timings, [field]: value },
    }))
  }

  const handleBankChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }))
  }

  const handleImageChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      images: { ...prev.images, [field]: value },
    }))
  }

  // Pre-fill sacred library images if user wants to skip
  const handleUseCuratedImages = () => {
    setFormData((prev) => ({
      ...prev,
      images: {
        temple: 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80',
        deity: 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80',
        swamiji: 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80',
      },
    }))
  }

  const [uploading, setUploading] = React.useState({
    temple: false,
    deity: false,
    swamiji: false,
  })

  const handleFileUpload = async (field: 'temple' | 'deity' | 'swamiji', file: File) => {
    setUploading((prev) => ({ ...prev, [field]: true }))
    setError(null)
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await fetch('/api/media/onboarding-upload', {
        method: 'POST',
        body: data,
      })
      const result = await res.json()
      if (res.ok && result.success) {
        handleImageChange(field, result.url)
      } else {
        setError(result.error || `Failed to upload ${field} image.`)
      }
    } catch (err) {
      setError('An error occurred during file upload.')
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)

    // Cycle through loading texts for visual appeal during AI generation
    const textsEn = [
      'Creating temple workspace...',
      'Assigning administrative security credentials...',
      'Initiating Gemini AI Content Generation...',
      'Translating website into Kannada & English...',
      'Generating SEO tags and meta titles...',
      'Applying ₹299 Launch Discount...',
      'Finalizing deployment configuration...',
    ]

    const textsKn = [
      'ದೇವಾಲಯದ ಕಾರ್ಯಕ್ಷೇತ್ರವನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...',
      'ಸುರಕ್ಷಿತ ಆಡಳಿತ ಲಾಗಿನ್ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
      'AI ಮೂಲಕ ಸ್ಥಳ ಪುರಾಣ ಮತ್ತು ಸೇವೆಗಳನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...',
      'ವೆಬ್‌ಸೈಟ್‌ ಅನ್ನು ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಯಲ್ಲಿ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
      'SEO ಮತ್ತು ಗೂಗಲ್ ಶೋಧನಾ ಟ್ಯಾಗ್‌ಗಳನ್ನು ಜೋಡಿಸಲಾಗುತ್ತಿದೆ...',
      '₹299 ವಿಶೇಷ ಬಿಡುಗಡೆ ಕೊಡುಗೆ ಅನ್ವಯಿಸಲಾಗುತ್ತಿದೆ...',
      'ವೆಬ್‌ಸೈಟ್ ಲೈವ್ ಪ್ರಕಟಣೆಗೆ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...',
    ]

    const texts = isKannada ? textsKn : textsEn

    let textIdx = 0
    const interval = setInterval(() => {
      if (textIdx < texts.length - 1) {
        textIdx++
        setLoadingText(texts[textIdx])
      }
    }, 2800)

    try {
      const response = await onboardTemple(formData)
      clearInterval(interval)

      if (response.success) {
        setLoadingText(
          isKannada ? 'ವೆಬ್‌ಸೈಟ್ ಸಿದ್ಧವಾಗಿದೆ! ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ತೆರಳಲಾಗುತ್ತಿದೆ...' : 'Workspace complete! Redirecting...'
        )
        setTimeout(() => {
          router.push(`/dashboard`)
          router.refresh()
        }, 1500)
      } else {
        setLoading(false)
        setError(response.error || (isKannada ? 'ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.' : 'Failed to complete onboarding. Please check your inputs.'))
      }
    } catch (err) {
      clearInterval(interval)
      setLoading(false)
      setError(isKannada ? 'ಅನಿರೀಕ್ಷಿತ ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.' : 'An unexpected error occurred during onboarding.')
    }
  }

  if (loading) {
    return <PageLoader text={loadingText} />
  }

  const stepsList = [
    { number: 1, label: t('onboarding.step1Label'), icon: <Building className="h-4 w-4" /> },
    { number: 2, label: t('onboarding.step2Label'), icon: <Sparkles className="h-4 w-4" /> },
    { number: 3, label: t('onboarding.step3Label'), icon: <MapPin className="h-4 w-4" /> },
    { number: 4, label: t('onboarding.step4Label'), icon: <Landmark className="h-4 w-4" /> },
    { number: 5, label: t('onboarding.step5Label'), icon: <Palette className="h-4 w-4" /> },
  ]

  const quickDeities = [
    { label: isKannada ? 'ಶಿವ / ಈಶ್ವರ' : 'Lord Shiva', deity: 'Lord Shiva', type: 'SHIVA' },
    { label: isKannada ? 'ಗಣೇಶ / ವಿನಾಯಕ' : 'Lord Ganesha', deity: 'Lord Ganesha', type: 'SHIVA' },
    { label: isKannada ? 'ವಿಷ್ಣು / ಕೃಷ್ಣ / ರಾಮ' : 'Lord Vishnu', deity: 'Lord Vishnu', type: 'VISHNU' },
    { label: isKannada ? 'ವೆಂಕಟೇಶ್ವರ / ಬಾಲಾಜಿ' : 'Lord Venkateshwara', deity: 'Lord Venkateshwara', type: 'VISHNU' },
    { label: isKannada ? 'ದೇವಿ / ದುರ್ಗಾ / ಲಕ್ಷ್ಮೀ' : 'Goddess Devi', deity: 'Goddess Durga', type: 'SHIVA' },
    { label: isKannada ? 'ಆಂಜನೇಯ / ಹನುಮಂತ' : 'Lord Hanuman', deity: 'Lord Hanuman', type: 'SHIVA' },
  ]

  const templatesList = [
    {
      id: 'classic',
      name: isKannada ? 'ಕ್ಲಾಸಿಕ್ ಕಾಮ್ (ಶಾಂತ)' : 'Classic Calm',
      desc: isKannada ? 'ಶುಭ್ರ ಬಿಳಿ ಮತ್ತು ಕೇಸರಿ, ಶಾಂತ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಶೈಲಿ' : 'White & Saffron, serene and minimal design',
      color: 'bg-gradient-to-r from-amber-500 to-saffron-500',
    },
    {
      id: 'heritage',
      name: isKannada ? 'ಹೆರಿಟೇಜ್ ಗ್ರಾಂಡ್ (ಭವ್ಯ)' : 'Heritage Grand',
      desc: isKannada ? 'ಆಳವಾದ ಕೆಂಪು ಮತ್ತು ಬಂಗಾರದ ಬಣ್ಣ, ರಾಜ ವೈಭವದ ಶೈಲಿ' : 'Deep red & Gold, royal and deeply traditional',
      color: 'bg-gradient-to-r from-red-800 to-amber-600',
    },
    {
      id: 'modern',
      name: isKannada ? 'ಮಾಡರ್ನ್ ಎಲಿಗಂಟ್' : 'Modern Elegant',
      desc: isKannada ? 'ಗ್ಲಾಸ್‌ಮಾರ್ಫಿಸಂ, ಅತ್ಯಾಧುನಿಕ ಹಾಗೂ ಆಕರ್ಷಕ ನೋಟ' : 'Clean, spacious, contemporary glassmorphism',
      color: 'bg-gradient-to-r from-stone-800 to-saffron-600',
    },
    {
      id: 'divine',
      name: isKannada ? 'ಡಿವೈನ್ ಗ್ಲೋ (ಸುವರ್ಣ)' : 'Divine Glow',
      desc: isKannada ? 'ದೈವಿಕ ಸುವರ್ಣ ಕಾಂತಿ ಮತ್ತು ಪ್ರಕಾಶಮಾನ ನೋಟ' : 'Golden radiance, heavenly glowing aesthetic',
      color: 'bg-gradient-to-r from-amber-400 to-yellow-600',
    },
    {
      id: 'tech',
      name: isKannada ? 'ಟೆಕ್ ಸ್ಯಾಂಕ್ಚುರಿ' : 'Tech Sanctuary',
      desc: isKannada ? 'ಸಂವಾದಾತ್ಮಕ ಹಾಗೂ ಹೈಟೆಕ್ ಡಿಜಿಟಲ್ ದೇವಾಲಯ' : 'Cyber-spiritual, dark mode with neon accents',
      color: 'bg-gradient-to-r from-cyan-600 to-saffron-500',
    },
    {
      id: 'ai',
      name: isKannada ? 'AI ಓಮ್ನಿಸಿಯೆಂಟ್' : 'AI Omniscient',
      desc: isKannada ? 'ಕಾಸ್ಮಿಕ್ ಮಂಡಲ ಮತ್ತು ಭವಿಷ್ಯದ AI ತಂತ್ರಜ್ಞಾನ' : 'Futuristic cosmic mandala & AI assistant portal',
      color: 'bg-gradient-to-r from-purple-700 to-amber-500',
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-start py-8 sm:px-6 lg:px-8">
      {/* Top Header with Brand, Launch Promo & Language Selector */}
      <div className="max-w-4xl mx-auto w-full px-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="MandirAI OS" 
              className="h-10 w-10 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-black tracking-tight bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-700 bg-clip-text text-transparent leading-none">
                MandirAI OS
              </span>
              <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mt-0.5">
                Temple Onboarding
              </span>
            </div>
          </Link>

          {/* Launch Special Offer Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-saffron-500/20 to-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs font-bold shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>
              {isKannada ? '⚡ ವಿಶೇಷ ಬಿಡುಗಡೆ ಕೊಡುಗೆ: ಕೇವಲ ₹299' : '⚡ Launch Offer: Just ₹299 Setup'}
            </span>
          </div>

          {/* Language Selector: English & Kannada */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="toggle" />
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-xl mx-auto w-full mb-8 px-4">
        <div className="flex items-center justify-between">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => s.number < step && setStep(s.number)}
                  className={`h-9 w-9 rounded-full flex items-center justify-center border text-sm font-semibold transition-all duration-300 ${
                    step === s.number
                      ? 'border-saffron-500 bg-saffron-500 text-white shadow-lg shadow-saffron-500/20'
                      : step > s.number
                      ? 'border-emerald-500 bg-emerald-500 text-white cursor-pointer'
                      : 'border-stone-200 bg-white text-stone-500 dark:border-stone-800 dark:bg-stone-900'
                  }`}
                >
                  {step > s.number ? <Check className="h-4 w-4" /> : s.icon}
                </button>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mt-2 text-center">
                  {s.label}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                    step > s.number ? 'bg-emerald-500' : 'bg-stone-200 dark:bg-stone-800'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl px-4">
        <Card className="border-stone-200 dark:border-stone-850 shadow-2xl bg-white dark:bg-stone-900 overflow-hidden rounded-2xl">
          {error && (
            <div className="bg-red-50 border-b border-red-200 p-4 text-sm font-semibold text-red-700 dark:bg-red-950/20 dark:border-red-900/30 flex items-center justify-between">
              <span>{error}</span>
              <button type="button" onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <>
              <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/40">
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <span>🕉️</span> {t('onboarding.step1Title')}
                </CardTitle>
                <CardDescription>
                  {t('onboarding.step1Desc')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 pt-6">
                {/* Quick Deity presets */}
                <div>
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                    {isKannada ? 'ತ್ವರಿತ ದೇವತೆ ಆಯ್ಕೆ (ಕ್ಲಿಕ್ ಮಾಡಿ):' : 'Quick Deity Selection (One Click):'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickDeities.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            primaryDeity: item.deity,
                            templeType: item.type,
                          }))
                        }}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          formData.primaryDeity === item.deity
                            ? 'border-saffron-500 bg-saffron-50 text-saffron-800 font-bold dark:bg-saffron-950/50 dark:text-saffron-300'
                            : 'border-stone-200 hover:border-saffron-300 text-stone-600 dark:border-stone-800 dark:text-stone-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('onboarding.nameLabel')}
                    placeholder={isKannada ? 'ಉದಾ: ಶ್ರೀ ಸಿದ್ಧಿವಿನಾಯಕ ದೇವಸ್ಥಾನ' : 'e.g. Shree Siddhivinayak Temple'}
                    value={formData.name}
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label={t('onboarding.slugLabel')}
                    placeholder="e.g. siddhi-vinayak"
                    value={formData.slug}
                    onChange={(e) => handleTextChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    required
                    rightIcon={<span className="text-xs text-stone-400 font-semibold">.temple.org</span>}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      {t('onboarding.traditionLabel')}
                    </label>
                    <select
                      className="mt-1.5 flex h-10 w-full rounded-md border border-stone-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 dark:border-stone-800 text-foreground"
                      value={formData.templeType}
                      onChange={(e) => handleTextChange('templeType', e.target.value)}
                    >
                      <option value="SHIVA">{isKannada ? 'ಶಿವ / ಈಶ್ವರ ದೇವಾಲಯ' : 'Shiva Temple'}</option>
                      <option value="VISHNU">{isKannada ? 'ವಿಷ್ಣು / ಕೃಷ್ಣ / ರಾಮ ದೇವಾಲಯ' : 'Vishnu / Krishna Temple'}</option>
                      <option value="DEVI">{isKannada ? 'ದೇವಿ / ದುರ್ಗಾ / ಅಮ್ಮನವರ ದೇವಾಲಯ' : 'Devi / Shakti Temple'}</option>
                      <option value="GANESHA">{isKannada ? 'ಗಣೇಶ / ವಿನಾಯಕ ದೇವಾಲಯ' : 'Ganesha Temple'}</option>
                      <option value="HANUMAN">{isKannada ? 'ಆಂಜನೇಯ / ಹನುಮಂತ ದೇವಾಲಯ' : 'Hanuman Temple'}</option>
                      <option value="MURUGAN">{isKannada ? 'ಸುಬ್ರಹ್ಮಣ್ಯ / ಮುರುಗನ್ ದೇವಾಲಯ' : 'Subrahmanya / Murugan Temple'}</option>
                      <option value="OTHER">{isKannada ? 'ಇತರ ಸನಾತನ ಧರ್ಮ ದೇವಾಲಯ' : 'General Hindu Temple'}</option>
                    </select>
                  </div>

                  <Input
                    label={isKannada ? 'ಮುಖ್ಯ ದೇವತೆ / ದೇವರ ಹೆಸರು' : 'Primary Deity Name'}
                    placeholder={isKannada ? 'ಉದಾ: ಶಿವಲಿಂಗ, ಮಹಾವಿಷ್ಣು, ಗಣಪತಿ' : 'e.g. Lord Shiva, Ganesha'}
                    value={formData.primaryDeity}
                    onChange={(e) => handleTextChange('primaryDeity', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('onboarding.phoneLabel')}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                  />
                  <Input
                    type="email"
                    label={t('onboarding.emailLabel')}
                    placeholder="contact@temple.org"
                    value={formData.email}
                    onChange={(e) => handleTextChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    {t('onboarding.historyLabel')}
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1.5 flex w-full rounded-md border border-stone-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 dark:border-stone-800 text-foreground"
                    placeholder={
                      isKannada 
                        ? 'ದೇವಾಲಯದ ಸ್ಥಳ ಪುರಾಣ, ಮಹತ್ವ, ಸ್ಥಾಪನೆ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ (ಅಥವಾ ಖಾಲಿ ಬಿಡಿ, ನಮ್ಮ AI ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬರೆಯುತ್ತದೆ)...'
                        : 'Describe the temple history, significance, miracles (or leave blank for AI to auto-generate)...'
                    }
                    value={formData.historyText}
                    onChange={(e) => handleTextChange('historyText', e.target.value)}
                  />
                </div>
              </CardContent>

              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4 border-t border-stone-100 dark:border-stone-800">
                <div className="text-xs text-stone-500">
                  {isKannada ? 'ಹಂತ 1 / 5' : 'Step 1 of 5'}
                </div>
                <Button
                  onClick={nextStep}
                  disabled={!formData.name.trim() || !formData.slug.trim()}
                  className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {t('onboarding.btnNext')}
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 2: IMAGES (NOW WITH ONE-CLICK SKIP/CURATED LIBRARY) */}
          {step === 2 && (
            <>
              <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/40">
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-saffron-500" /> {t('onboarding.step2Title')}
                </CardTitle>
                <CardDescription>
                  {t('onboarding.step2Desc')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {/* One click skip / use sacred library button */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-amber-50/80 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 gap-3">
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                      {isKannada ? 'ಚಿತ್ರಗಳನ್ನು ನಂತರ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಬಯಸುವಿರಾ?' : 'Don\'t have temple photos right now?'}
                    </p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                      {isKannada 
                        ? 'ನಮ್ಮ ಸುಂದರ ಆಧ್ಯಾತ್ಮಿಕ ಲೈಬ್ರರಿ ಚಿತ್ರಗಳನ್ನು ಬಳಸಿ ನೇರವಾಗಿ ಮುಂದುವರಿಯಿರಿ.'
                        : 'Use our high-resolution sacred temple art gallery and customize anytime.'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleUseCuratedImages}
                    className="shrink-0 bg-white border-amber-300 text-amber-900 font-bold hover:bg-amber-100 dark:bg-stone-900 dark:border-amber-800 dark:text-amber-200 text-xs"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                    {isKannada ? 'ಆಧ್ಯಾತ್ಮಿಕ ಚಿತ್ರ ಬಳಸಿ' : 'Use Sacred Library Art'}
                  </Button>
                </div>

                {/* Temple Photo */}
                <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-4 bg-stone-50/30 dark:bg-stone-900/50">
                  <h4 className="font-heading text-sm font-bold text-stone-900 dark:text-white mb-2">
                    {t('onboarding.templePhoto')}
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {formData.images.temple ? (
                      <div className="relative h-24 w-32 rounded-lg overflow-hidden border border-stone-200 shadow-sm shrink-0">
                        <img src={formData.images.temple} alt="Temple" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleImageChange('temple', '')}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-24 w-32 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 flex items-center justify-center shrink-0">
                        <UploadCloud className="h-7 w-7 text-stone-400" />
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <input
                        type="file"
                        accept="image/*"
                        id="temple-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload('temple', file)
                        }}
                        disabled={uploading.temple}
                      />
                      <label
                        htmlFor="temple-upload"
                        className={`cursor-pointer inline-flex items-center justify-center rounded-xl text-xs font-bold border border-stone-200 bg-white hover:bg-stone-50 text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-white px-3.5 py-2 transition-all shadow-sm ${uploading.temple ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {uploading.temple ? (isKannada ? 'ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Uploading...') : (isKannada ? 'ದೇವಾಲಯ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ' : 'Upload Temple Photo')}
                      </label>
                      <p className="text-[11px] text-stone-400 mt-1">
                        {isKannada ? 'JPEG, PNG, WebP ಅಥವಾ GIF (ಐಚ್ಛಿಕ)' : 'JPEG, PNG, WebP or GIF (Optional)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deity Photo */}
                <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-4 bg-stone-50/30 dark:bg-stone-900/50">
                  <h4 className="font-heading text-sm font-bold text-stone-900 dark:text-white mb-2">
                    {t('onboarding.deityPhoto')}
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {formData.images.deity ? (
                      <div className="relative h-24 w-32 rounded-lg overflow-hidden border border-stone-200 shadow-sm shrink-0">
                        <img src={formData.images.deity} alt="Deity" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleImageChange('deity', '')}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-24 w-32 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 flex items-center justify-center shrink-0">
                        <UploadCloud className="h-7 w-7 text-stone-400" />
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <input
                        type="file"
                        accept="image/*"
                        id="deity-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload('deity', file)
                        }}
                        disabled={uploading.deity}
                      />
                      <label
                        htmlFor="deity-upload"
                        className={`cursor-pointer inline-flex items-center justify-center rounded-xl text-xs font-bold border border-stone-200 bg-white hover:bg-stone-50 text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-white px-3.5 py-2 transition-all shadow-sm ${uploading.deity ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {uploading.deity ? (isKannada ? 'ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Uploading...') : (isKannada ? 'ದೇವರ ವಿಗ್ರಹದ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ' : 'Upload Deity Photo')}
                      </label>
                      <p className="text-[11px] text-stone-400 mt-1">
                        {isKannada ? 'JPEG, PNG, WebP ಅಥವಾ GIF (ಐಚ್ಛಿಕ)' : 'JPEG, PNG, WebP or GIF (Optional)'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4 border-t border-stone-100 dark:border-stone-800">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  {t('onboarding.btnPrev')}
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={uploading.temple || uploading.deity || uploading.swamiji}
                  className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {t('onboarding.btnNext')}
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 3: LOCATION & TIMINGS */}
          {step === 3 && (
            <>
              <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/40">
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-saffron-500" /> {t('onboarding.step3Title')}
                </CardTitle>
                <CardDescription>
                  {t('onboarding.step3Desc')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {/* Location */}
                <div className="space-y-4">
                  <h4 className="font-heading text-sm font-bold text-stone-800 dark:text-stone-200">
                    {isKannada ? 'ವಿಳಾಸದ ವಿವರಗಳು' : 'Address Details'}
                  </h4>
                  <Input
                    label={t('onboarding.addressLine')}
                    placeholder={isKannada ? 'ಉದಾ: ದೇವಾಲಯ ರಸ್ತೆ, ಮುಖ್ಯ ಬಜಾರ್' : 'e.g. Temple Road, MG Road'}
                    value={formData.address.line1}
                    onChange={(e) => handleAddressChange('line1', e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={t('onboarding.city')}
                      placeholder={isKannada ? 'ಬೆಂಗಳೂರು / ಮೈಸೂರು / ಹುಬ್ಬಳ್ಳಿ' : 'Bangalore / Mumbai'}
                      value={formData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      required
                    />
                    <Input
                      label={t('onboarding.state')}
                      placeholder="Karnataka"
                      value={formData.address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <Input
                    label={t('onboarding.pincode')}
                    placeholder="560001"
                    value={formData.address.pincode}
                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                  />
                </div>

                {/* Timings */}
                <div className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading text-sm font-bold text-stone-800 dark:text-stone-200">
                      {isKannada ? 'ದರ್ಶನ ಮತ್ತು ಪೂಜಾ ಸಮಯಗಳು' : 'Darshan & Pooja Timings'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          timings: {
                            morning_open: '06:00',
                            morning_close: '12:30',
                            evening_open: '16:00',
                            evening_close: '20:30',
                          },
                        }))
                      }}
                      className="text-xs text-saffron-600 hover:text-saffron-700 font-semibold"
                    >
                      {isKannada ? 'ಸಾಮಾನ್ಯ ಸಮಯ ಅನ್ವಯಿಸಿ' : 'Use Default Hours'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label={t('onboarding.morningTimings')}
                      value={formData.timings.morning_open}
                      onChange={(e) => handleTimingChange('morning_open', e.target.value)}
                      required
                    />
                    <Input
                      type="time"
                      label={isKannada ? 'ಮಧ್ಯಾಹ್ನ ಮುಕ್ತಾಯ' : 'Morning Close'}
                      value={formData.timings.morning_close}
                      onChange={(e) => handleTimingChange('morning_close', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label={t('onboarding.eveningTimings')}
                      value={formData.timings.evening_open}
                      onChange={(e) => handleTimingChange('evening_open', e.target.value)}
                      required
                    />
                    <Input
                      type="time"
                      label={isKannada ? 'ರಾತ್ರಿ ಮುಕ್ತಾಯ' : 'Evening Close'}
                      value={formData.timings.evening_close}
                      onChange={(e) => handleTimingChange('evening_close', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4 border-t border-stone-100 dark:border-stone-800">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  {t('onboarding.btnPrev')}
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.address.line1 || !formData.address.city}
                  className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {t('onboarding.btnNext')}
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 4: TRUST & BANKING */}
          {step === 4 && (
            <>
              <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/40">
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-saffron-500" /> {t('onboarding.step4Title')}
                </CardTitle>
                <CardDescription>
                  {t('onboarding.step4Desc')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 rounded-xl p-3.5">
                  <span className="text-amber-600 text-lg flex-shrink-0">💡</span>
                  <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
                    {isKannada
                      ? 'ಈ ಹಂತದಲ್ಲಿರುವ ವಿವರಗಳು ಐಚ್ಛಿಕವಾಗಿವೆ. ನಂತರ ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಸೇರಿಸಬಹುದು.'
                      : 'These fields are optional. You can add or change them anytime later from your Dashboard.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('onboarding.upiId')}
                    placeholder={isKannada ? 'temple@upi ಅಥವಾ 9876543210@okaxis' : 'temple@upi or 9876543210@okaxis'}
                    value={formData.upiId}
                    onChange={(e) => handleTextChange('upiId', e.target.value)}
                  />
                  <Input
                    label={t('onboarding.trustReg')}
                    placeholder="e.g. TRUST-KA-2024-001"
                    value={formData.trustRegistrationNo}
                    onChange={(e) => handleTextChange('trustRegistrationNo', e.target.value)}
                  />
                </div>

                <div className="border-t border-stone-100 dark:border-stone-850 pt-4 space-y-4">
                  <h4 className="font-heading text-sm font-semibold text-stone-800 dark:text-stone-300">
                    {isKannada ? 'ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ (ಐಚ್ಛಿಕ)' : 'Bank Account Details (Optional)'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('onboarding.accountName')}
                      placeholder="e.g. Shree Siddhivinayak Mandir Trust"
                      value={formData.bankDetails.account_name}
                      onChange={(e) => handleBankChange('account_name', e.target.value)}
                    />
                    <Input
                      label={t('onboarding.bankName')}
                      placeholder="e.g. State Bank of India"
                      value={formData.bankDetails.bank_name}
                      onChange={(e) => handleBankChange('bank_name', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        label={t('onboarding.accountNo')}
                        placeholder="e.g. 621020012435678"
                        value={formData.bankDetails.account_number}
                        onChange={(e) => handleBankChange('account_number', e.target.value)}
                      />
                    </div>
                    <Input
                      label={t('onboarding.ifsc')}
                      placeholder="SBIN0001234"
                      value={formData.bankDetails.ifsc}
                      onChange={(e) => handleBankChange('ifsc', e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4 border-t border-stone-100 dark:border-stone-800">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  {t('onboarding.btnPrev')}
                </Button>
                <Button onClick={nextStep} className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {t('onboarding.btnNext')}
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 5: TEMPLATE SELECTION (ALL 6 TEMPLATES) */}
          {step === 5 && (
            <>
              <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/40">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                      <Palette className="h-6 w-6 text-saffron-500" /> {t('onboarding.step5Title')}
                    </CardTitle>
                    <CardDescription>
                      {t('onboarding.step5Desc')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Plan highlight banner inside step 5 */}
                {selectedPlan === 'free' ? (
                  <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded-full bg-emerald-500 text-white">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-stone-900 dark:text-white">
                          {isKannada ? '🎁 ಸಂಪೂರ್ಣ ಉಚಿತ ದೇವಾಲಯ ವೆಬ್‌ಸೈಟ್ ಯೋಜನೆ ಅನ್ವಯಿಸಲಾಗಿದೆ' : '🎁 100% Fully Free Temple Website Plan Applied'}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                          {isKannada ? 'ಉಚಿತ ವೆಬ್‌ಸೈಟ್ + ದರ್ಶನ ಸಮಯ + UPI ದೇಣಿಗೆ ಯಾವುದೇ ವೆಚ್ಚವಿಲ್ಲದೆ ಶಾಶ್ವತವಾಗಿ ಲಭ್ಯ' : 'Free AI Website + Darshan Timings + Direct UPI QR Donations forever with 0 payment'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {isKannada ? '₹0 ಉಚಿತ' : '₹0 / Free'}
                    </span>
                  </div>
                ) : (
                  <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-saffron-500/15 to-amber-500/10 border border-saffron-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded-full bg-saffron-500 text-white">
                        <Zap className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-stone-900 dark:text-white">
                          {isKannada ? '⚡ ₹299 ಬಿಡುಗಡೆ ಕೊಡುಗೆ ಅನ್ವಯಿಸಲಾಗಿದೆ' : '⚡ ₹299 Special Launch Offer Applied'}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                          {isKannada ? 'ಪೂರ್ಣ ವೆಬ್‌ಸೈಟ್ + ಸೇವಾ ಬುಕಿಂಗ್ + ಇ-ಹುಂಡಿ ಸಕ್ರಿಯಗೊಳ್ಳುತ್ತದೆ' : 'Full Website + Seva Booking + UPI Hundi included'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-saffron-600 dark:text-saffron-400">
                      ₹299/yr
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templatesList.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => handleTextChange('templateId', tmpl.id)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                        formData.templateId === tmpl.id
                          ? 'border-saffron-500 bg-saffron-50/50 shadow-md ring-2 ring-saffron-500/20 dark:bg-saffron-950/20'
                          : 'border-stone-200 hover:border-saffron-200 dark:border-stone-800'
                      }`}
                    >
                      <div>
                        <div className={`h-20 rounded-lg mb-3 flex items-center justify-center text-white shadow-sm ${tmpl.color}`}>
                          {formData.templateId === tmpl.id ? (
                            <div className="h-8 w-8 rounded-full bg-white text-saffron-600 flex items-center justify-center shadow-lg">
                              <Check className="h-5 w-5 stroke-[3]" />
                            </div>
                          ) : (
                            <span className="text-xs font-bold opacity-80 uppercase tracking-wider">{tmpl.id}</span>
                          )}
                        </div>
                        <h4 className="font-bold text-stone-900 dark:text-white text-sm">{tmpl.name}</h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">{tmpl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4 border-t border-stone-100 dark:border-stone-800">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  {t('onboarding.btnPrev')}
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 hover:from-saffron-500 hover:to-amber-500 text-white font-extrabold shadow-lg shadow-saffron-500/25 px-6 py-2.5 text-sm"
                  leftIcon={<Sparkles className="h-4 w-4 animate-pulse text-yellow-200" />}
                >
                  {t('onboarding.btnFinish')}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
