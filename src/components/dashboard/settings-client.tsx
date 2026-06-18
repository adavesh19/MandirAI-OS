'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Building, MapPin, Clock, Landmark, Save, ExternalLink } from 'lucide-react'
import { updateTempleSettings } from '@/app/(platform)/settings/actions'

interface SettingsClientProps {
  temple: {
    id: string
    name: string
    slug: string
    templeType: string
    primaryDeity: string
    contactPhone: string
    contactEmail: string
    websiteDomain: string
    upiId: string
    trustRegistrationNo: string
    isPublished: boolean
    address: {
      line1: string
      line2?: string
      city: string
      state: string
      pincode: string
    }
    timings: {
      morning_open: string
      morning_close: string
      evening_open: string
      evening_close: string
    }
    bankDetails: {
      account_name: string
      account_number: string
      ifsc: string
      bank_name: string
      branch: string
    }
  }
}

export default function SettingsClient({ temple }: SettingsClientProps) {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'location' | 'bank' | 'website'>('profile')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Local Form state
  const [formData, setFormData] = React.useState({ ...temple })

  const handleFieldChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
  }

  const handleNestedChange = (parent: 'address' | 'timings' | 'bankDetails', field: string, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: val },
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(null)

    try {
      const response = await updateTempleSettings(formData)
      if (response.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(response.error || 'Failed to save settings.')
      }
    } catch (err) {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const tabItems = [
    { id: 'profile', label: 'Temple Profile', icon: <Building className="h-4 w-4" /> },
    { id: 'location', label: 'Location & Timings', icon: <MapPin className="h-4 w-4" /> },
    { id: 'bank', label: 'Trust & Banking', icon: <Landmark className="h-4 w-4" /> },
    { id: 'website', label: 'Website Settings', icon: <ExternalLink className="h-4 w-4" /> },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header and status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-stone-900 dark:text-white">Workspace Settings</h1>
          <p className="text-sm text-stone-500">Configure your temple profiles, bank settings, and website domains.</p>
        </div>
        <div className="flex items-center space-x-2">
          {formData.isPublished ? (
            <Badge variant="success" showDot>Published & Live</Badge>
          ) : (
            <Badge variant="warning" showDot>Under Construction</Badge>
          )}
          <a
            href={`/temple/${temple.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-saffron-600 hover:underline"
          >
            <span>Visit Site</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Side Tab Navigation */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1.5 p-1 border-b md:border-b-0 border-stone-250 pb-2 md:pb-0">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-saffron-500 text-white shadow-md shadow-saffron-500/10'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-850 dark:text-stone-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side Form Panel */}
        <form onSubmit={handleSave} className="md:col-span-3 space-y-6">
          <Card className="border-stone-200 dark:border-stone-850 bg-white">
            
            {/* PROFILE DETAILS */}
            {activeTab === 'profile' && (
              <>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-bold">Temple Profile Info</CardTitle>
                  <CardDescription>Update name, tradition, and primary worship deity details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Temple Name"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      required
                    />
                    <Input
                      label="URL slug (Cannot edit)"
                      value={formData.slug}
                      disabled
                      rightIcon={<span className="text-xs text-stone-400">.temple.org</span>}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-stone-700">Temple Tradition</label>
                      <select
                        className="mt-1.5 flex h-10 w-full rounded-md border border-stone-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 dark:border-stone-800 text-foreground"
                        value={formData.templeType}
                        onChange={(e) => handleFieldChange('templeType', e.target.value)}
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
                      value={formData.primaryDeity}
                      onChange={(e) => handleFieldChange('primaryDeity', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="tel"
                      label="Contact Phone"
                      value={formData.contactPhone}
                      onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      label="Contact Email"
                      value={formData.contactEmail}
                      onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </>
            )}

            {/* LOCATION & TIMINGS */}
            {activeTab === 'location' && (
              <>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-bold flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-saffron-500" />
                    <span>Location & Operating Hours</span>
                  </CardTitle>
                  <CardDescription>Modify physical address parameters and darshan hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address Grid */}
                  <div className="space-y-4">
                    <h4 className="font-heading text-xs font-bold text-stone-400 uppercase tracking-widest">Physical Address</h4>
                    <Input
                      label="Address Line 1"
                      value={formData.address.line1}
                      onChange={(e) => handleNestedChange('address', 'line1', e.target.value)}
                      required
                    />
                    <Input
                      label="Address Line 2 (Optional)"
                      value={formData.address.line2 || ''}
                      onChange={(e) => handleNestedChange('address', 'line2', e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Input
                          label="City"
                          value={formData.address.city}
                          onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                          required
                        />
                      </div>
                      <Input
                        label="Pincode"
                        value={formData.address.pincode}
                        onChange={(e) => handleNestedChange('address', 'pincode', e.target.value)}
                        required
                      />
                    </div>
                    <Input
                      label="State"
                      value={formData.address.state}
                      onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
                      required
                    />
                  </div>

                  {/* Timings */}
                  <div className="border-t border-stone-100 pt-6 space-y-4">
                    <h4 className="font-heading text-xs font-bold text-stone-400 uppercase tracking-widest">Darshan Slots</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="time"
                        label="Morning Open"
                        value={formData.timings.morning_open}
                        onChange={(e) => handleNestedChange('timings', 'morning_open', e.target.value)}
                        required
                      />
                      <Input
                        type="time"
                        label="Morning Close"
                        value={formData.timings.morning_close}
                        onChange={(e) => handleNestedChange('timings', 'morning_close', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="time"
                        label="Evening Open"
                        value={formData.timings.evening_open}
                        onChange={(e) => handleNestedChange('timings', 'evening_open', e.target.value)}
                        required
                      />
                      <Input
                        type="time"
                        label="Evening Close"
                        value={formData.timings.evening_close}
                        onChange={(e) => handleNestedChange('timings', 'evening_close', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {/* TRUST & BANKING */}
            {activeTab === 'bank' && (
              <>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-bold flex items-center space-x-2">
                    <Landmark className="h-5 w-5 text-saffron-550" />
                    <span>Trust & Settlement Bank Accounts</span>
                  </CardTitle>
                  <CardDescription>Configure payment gateways and official charity registration credentials.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Trust Registration No"
                      value={formData.trustRegistrationNo}
                      onChange={(e) => handleFieldChange('trustRegistrationNo', e.target.value)}
                      required
                    />
                    <Input
                      label="UPI ID for Devotee Transfers"
                      value={formData.upiId}
                      onChange={(e) => handleFieldChange('upiId', e.target.value)}
                      required
                    />
                  </div>

                  <div className="border-t border-stone-100 pt-6 space-y-4">
                    <h4 className="font-heading text-xs font-bold text-stone-400 uppercase tracking-widest">Bank details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Account Holder Name"
                        value={formData.bankDetails.account_name}
                        onChange={(e) => handleNestedChange('bankDetails', 'account_name', e.target.value)}
                        required
                      />
                      <Input
                        label="Bank Name"
                        value={formData.bankDetails.bank_name}
                        onChange={(e) => handleNestedChange('bankDetails', 'bank_name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <Input
                          label="Account Number"
                          value={formData.bankDetails.account_number}
                          onChange={(e) => handleNestedChange('bankDetails', 'account_number', e.target.value)}
                          required
                        />
                      </div>
                      <Input
                        label="IFSC Code"
                        value={formData.bankDetails.ifsc}
                        onChange={(e) => handleNestedChange('bankDetails', 'ifsc', e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <Input
                      label="Branch Name"
                      value={formData.bankDetails.branch}
                      onChange={(e) => handleNestedChange('bankDetails', 'branch', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </>
            )}

            {/* WEBSITE CONFIG */}
            {activeTab === 'website' && (
              <>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-bold">Domain & Visibility Settings</CardTitle>
                  <CardDescription>Manage domain mapping and live status configurations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Publish toggle */}
                  <div className="flex items-center justify-between p-4 bg-stone-550/5 rounded-xl border border-stone-200/50">
                    <div className="space-y-0.5">
                      <label className="text-sm font-bold text-stone-900">Publish Website</label>
                      <p className="text-xs text-stone-500">Toggle whether the public `/temple/${temple.slug}` route is active.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => handleFieldChange('isPublished', e.target.checked)}
                      className="rounded border-stone-300 text-saffron-600 focus:ring-saffron-500 h-5 w-5 cursor-pointer"
                    />
                  </div>

                  <Input
                    label="Custom Domain Mapping (Optional)"
                    placeholder="e.g. www.mysiddhivinayak.org"
                    value={formData.websiteDomain}
                    onChange={(e) => handleFieldChange('websiteDomain', e.target.value)}
                  />
                </CardContent>
              </>
            )}

            <CardFooter className="justify-between border-t border-stone-100 p-4 bg-stone-50/50">
              <div className="text-sm text-stone-500">
                {success && (
                  <span className="text-emerald-600 font-semibold animate-fadeIn flex items-center space-x-1">
                    <Save className="h-4 w-4 shrink-0" />
                    <span>Settings saved successfully!</span>
                  </span>
                )}
                {error && <span className="text-red-500 font-semibold">{error}</span>}
              </div>
              <Button type="submit" loading={loading} leftIcon={<Save className="h-4 w-4" />}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
