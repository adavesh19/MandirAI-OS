'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { PageLoader } from '@/components/ui/loading'
import { ArrowLeft, ArrowRight, Check, Sparkles, Building, MapPin, Clock, Landmark } from 'lucide-react'
import { onboardTemple } from './actions'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [loadingText, setLoadingText] = React.useState('Preparing environment...')
  const [error, setError] = React.useState<string | null>(null)

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
      state: '',
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
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setError(null)
    setStep((prev) => prev - 1)
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

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    
    // Cycle through loading texts for visual appeal during AI generation
    const texts = [
      'Creating temple workspace...',
      'Assigning administrative security credentials...',
      'Initiating Gemini AI Content Generation...',
      'Translating website into 5 regional languages (EN, HI, KN, TA, TE)...',
      'Generating SEO tags and meta titles...',
      'Writing static pages to temple pages...',
      'Finalizing deployment configuration...',
    ]

    let textIdx = 0
    const interval = setInterval(() => {
      if (textIdx < texts.length - 1) {
        textIdx++
        setLoadingText(texts[textIdx])
      }
    }, 3000)

    try {
      const response = await onboardTemple(formData)
      clearInterval(interval)

      if (response.success) {
        setLoadingText('Workspace complete! Redirecting...')
        setTimeout(() => {
          router.push(`/dashboard`)
          router.refresh()
        }, 1500)
      } else {
        setLoading(false)
        setError(response.error || 'Failed to complete onboarding. Please check your inputs.')
      }
    } catch (err) {
      clearInterval(interval)
      setLoading(false)
      setError('An unexpected error occurred during onboarding.')
    }
  }

  if (loading) {
    return <PageLoader text={loadingText} />
  }

  const stepsList = [
    { number: 1, label: 'Profile', icon: <Building className="h-4 w-4" /> },
    { number: 2, label: 'Images', icon: <Sparkles className="h-4 w-4" /> },
    { number: 3, label: 'Location & Timings', icon: <MapPin className="h-4 w-4" /> },
    { number: 4, label: 'Trust & Bank', icon: <Landmark className="h-4 w-4" /> },
    { number: 5, label: 'Template', icon: <Check className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Step Indicator */}
      <div className="max-w-xl mx-auto w-full mb-8 px-4">
        <div className="flex items-center justify-between">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center border text-sm font-semibold transition-all duration-300 ${
                    step === s.number
                      ? 'border-saffron-500 bg-saffron-500 text-white shadow-lg shadow-saffron-500/20'
                      : step > s.number
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-stone-200 bg-white text-stone-500 dark:border-stone-800 dark:bg-stone-900'
                  }`}
                >
                  {step > s.number ? <Check className="h-4 w-4" /> : s.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mt-2">
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
        <Card className="border-stone-200 dark:border-stone-850 shadow-xl bg-white dark:bg-stone-900 overflow-hidden">
          {error && (
            <div className="bg-red-50 border-b border-red-200 p-4 text-sm font-semibold text-red-700 dark:bg-red-950/20 dark:border-red-900/30">
              {error}
            </div>
          )}

          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <span>🕉️</span> Create Temple Profile
                </CardTitle>
                <CardDescription>
                  Enter the core details of your temple. We will use this to configure the system and seed pages.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Temple Name"
                    placeholder="e.g. Shree Siddhivinayak Temple"
                    value={formData.name}
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Website URL Slug"
                    placeholder="e.g. siddhi-vinayak"
                    value={formData.slug}
                    onChange={(e) => handleTextChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    required
                    rightIcon={<span className="text-xs text-stone-400 font-semibold">.temple.org</span>}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Temple Tradition / Type</label>
                    <select
                      className="mt-1.5 flex h-10 w-full rounded-md border border-stone-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 dark:border-stone-800 text-foreground"
                      value={formData.templeType}
                      onChange={(e) => handleTextChange('templeType', e.target.value)}
                    >
                      <option value="SHIVA">Shiva Temple</option>
                      <option value="VISHNU">Vishnu / Krishna Temple</option>
                      <option value="SHAKTI">Devi / Shakti Temple</option>
                      <option value="GANESH">Ganesh Temple</option>
                      <option value="HANUMAN">Hanuman Temple</option>
                      <option value="MURUGAN">Murugan Temple</option>
                      <option value="AYYAPPA">Ayyappa Temple</option>
                      <option value="OTHER">Other Hindu Temple</option>
                    </select>
                  </div>
                  <Input
                    label="Primary Deity"
                    placeholder="e.g. Lord Ganesha"
                    value={formData.primaryDeity}
                    onChange={(e) => handleTextChange('primaryDeity', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    label="Contact Phone"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    label="Contact Email"
                    placeholder="e.g. info@siddhivinayak.org"
                    value={formData.email}
                    onChange={(e) => handleTextChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Brief History / Special Legend</label>
                  <textarea
                    rows={4}
                    className="flex w-full rounded-md border border-stone-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 dark:border-stone-800 placeholder:text-stone-400 text-foreground"
                    placeholder="Describe when the temple was founded, key legends, historical references, and any custom information to train the AI site builder."
                    value={formData.historyText}
                    onChange={(e) => handleTextChange('historyText', e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end bg-stone-50/50 dark:bg-stone-950/20 p-4">
                <Button
                  onClick={nextStep}
                  disabled={!formData.name || !formData.slug || !formData.primaryDeity}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Images
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 2: IMAGES */}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-saffron-500" /> Temple Media
                </CardTitle>
                <CardDescription>
                  Provide image URLs for the temple. These will be used to generate your dynamic pages. (Image URL strings only).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Temple Photo URL"
                  placeholder="https://example.com/temple.jpg"
                  value={formData.images.temple}
                  onChange={(e) => handleImageChange('temple', e.target.value)}
                  required
                />
                <Input
                  label="Main Deity Photo URL"
                  placeholder="https://example.com/deity.jpg"
                  value={formData.images.deity}
                  onChange={(e) => handleImageChange('deity', e.target.value)}
                  required
                />
                <Input
                  label="Peethadhipati / Swamiji Photo URL (Optional)"
                  placeholder="https://example.com/swamiji.jpg"
                  value={formData.images.swamiji}
                  onChange={(e) => handleImageChange('swamiji', e.target.value)}
                />
              </CardContent>
              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.images.temple || !formData.images.deity}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Location & Timings
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 3: LOCATION & TIMINGS */}
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-saffron-500" /> Location & Timings
                </CardTitle>
                <CardDescription>
                  Provide the physical location and daily darshan timings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location */}
                <div className="space-y-4">
                  <h4 className="font-heading text-sm font-semibold text-stone-700 dark:text-stone-300">Address Details</h4>
                  <Input
                    label="Address Line 1"
                    placeholder="e.g. Temple Road, Prabhadevi"
                    value={formData.address.line1}
                    onChange={(e) => handleAddressChange('line1', e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      placeholder="Mumbai"
                      value={formData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      required
                    />
                    <Input
                      label="State"
                      placeholder="Maharashtra"
                      value={formData.address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <Input
                    label="Pincode"
                    placeholder="400028"
                    value={formData.address.pincode}
                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                    required
                  />
                </div>

                {/* Timings */}
                <div className="space-y-4 border-t border-stone-200 dark:border-stone-800 pt-6">
                  <h4 className="font-heading text-sm font-semibold text-stone-700 dark:text-stone-300">Darshan Timings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label="Morning Open"
                      value={formData.timings.morning_open}
                      onChange={(e) => handleTimingChange('morning_open', e.target.value)}
                      required
                    />
                    <Input
                      type="time"
                      label="Morning Close"
                      value={formData.timings.morning_close}
                      onChange={(e) => handleTimingChange('morning_close', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label="Evening Open"
                      value={formData.timings.evening_open}
                      onChange={(e) => handleTimingChange('evening_open', e.target.value)}
                      required
                    />
                    <Input
                      type="time"
                      label="Evening Close"
                      value={formData.timings.evening_close}
                      onChange={(e) => handleTimingChange('evening_close', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!formData.address.line1 || !formData.address.city}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Trust & Bank Info
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 4: TRUST & BANKING */}
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-saffron-500" /> Trust Registration & Banking
                </CardTitle>
                <CardDescription>
                  Enter bank information and UPI IDs to enable online donations. You can skip these and add them later from Settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Optional banner */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <span className="text-amber-500 text-lg flex-shrink-0">💡</span>
                  <p className="text-xs text-amber-700 leading-relaxed font-medium">
                    All fields on this step are <strong>optional</strong>. You can fill them in later from your dashboard Settings page. Click <strong>&ldquo;Generate AI Website & Onboard&rdquo;</strong> to continue even if left blank.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Trust Registration Number (Optional)"
                    placeholder="e.g. E-12435/Mumbai"
                    value={formData.trustRegistrationNo}
                    onChange={(e) => handleTextChange('trustRegistrationNo', e.target.value)}
                  />
                  <Input
                    label="UPI ID for Direct Transfers (Optional)"
                    placeholder="e.g. siddhi-trust@okaxis"
                    value={formData.upiId}
                    onChange={(e) => handleTextChange('upiId', e.target.value)}
                  />
                </div>

                <div className="border-t border-stone-100 dark:border-stone-850 pt-4 space-y-4">
                  <h4 className="font-heading text-sm font-semibold text-stone-750 dark:text-stone-300">
                    Bank Account Details <span className="text-xs font-normal text-stone-400">(Optional — can be added later)</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Account Holder Name"
                      placeholder="e.g. Shree Siddhivinayak Mandir Trust"
                      value={formData.bankDetails.account_name}
                      onChange={(e) => handleBankChange('account_name', e.target.value)}
                    />
                    <Input
                      label="Bank Name"
                      placeholder="e.g. Axis Bank"
                      value={formData.bankDetails.bank_name}
                      onChange={(e) => handleBankChange('bank_name', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        label="Account Number"
                        placeholder="e.g. 921020012435678"
                        value={formData.bankDetails.account_number}
                        onChange={(e) => handleBankChange('account_number', e.target.value)}
                      />
                    </div>
                    <Input
                      label="IFSC Code"
                      placeholder="e.g. UTIB0000210"
                      value={formData.bankDetails.ifsc}
                      onChange={(e) => handleBankChange('ifsc', e.target.value.toUpperCase())}
                    />
                  </div>
                  
                  <Input
                    label="Branch Name"
                    placeholder="Prabhadevi Branch"
                    value={formData.bankDetails.branch}
                    onChange={(e) => handleBankChange('branch', e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  Back
                </Button>
                <Button onClick={nextStep} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Choose Template
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 5: TEMPLATE SELECTION */}
          {step === 5 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-saffron-500" /> Choose Website Design
                </CardTitle>
                <CardDescription>
                  Select a starting template for your public temple website. You can always change this later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'classic', name: 'Classic Serene', desc: 'White & Saffron, calm and minimal' },
                    { id: 'heritage', name: 'Heritage Grand', desc: 'Deep red & Gold, highly traditional' },
                    { id: 'modern', name: 'Modern Elegant', desc: 'Clean, spacious, contemporary' },
                  ].map(tmpl => (
                    <div 
                      key={tmpl.id}
                      onClick={() => handleTextChange('templateId', tmpl.id)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        formData.templateId === tmpl.id 
                          ? 'border-saffron-500 bg-saffron-50' 
                          : 'border-stone-200 hover:border-saffron-200'
                      }`}
                    >
                      <div className={`h-24 rounded-lg mb-3 flex items-center justify-center ${
                        tmpl.id === 'heritage' ? 'bg-[#7f1d1d]' :
                        tmpl.id === 'modern' ? 'bg-[#f8f9fa] border' :
                        'bg-white border'
                      }`}>
                        {formData.templateId === tmpl.id && <Check className={`h-6 w-6 ${tmpl.id === 'heritage' ? 'text-white' : 'text-saffron-500'}`} />}
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm">{tmpl.name}</h4>
                      <p className="text-xs text-stone-500 mt-1">{tmpl.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-between bg-stone-50/50 dark:bg-stone-950/20 p-4">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-saffron-600 hover:bg-saffron-700 text-white"
                  leftIcon={<Sparkles className="h-4 w-4 animate-pulse text-yellow-300" />}
                >
                  Create Temple Workspace
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
