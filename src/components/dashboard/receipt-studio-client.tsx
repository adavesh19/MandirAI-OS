'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Paintbrush, LayoutTemplate, Type, Image as ImageIcon, QrCode, Building, PenTool, CheckCircle2, Save, Printer } from 'lucide-react'

type LayoutConfig = {
  showLogo: boolean
  showQR: boolean
  showSignature: boolean
  showTaxId: boolean
  accentColor: string
}

export default function ReceiptStudioClient() {
  const [config, setConfig] = useState<LayoutConfig>({
    showLogo: true,
    showQR: true,
    showSignature: true,
    showTaxId: true,
    accentColor: '#f97316' // Saffron-500
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const toggleConfig = (key: keyof LayoutConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <Paintbrush className="h-8 w-8 text-saffron-500" />
            Receipt Studio
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Visually design the layout of the PDF receipts sent to your devotees.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className={`h-12 px-6 font-bold text-white transition-all ${isSaved ? 'bg-green-500 hover:bg-green-600' : 'bg-stone-900 hover:bg-stone-800'}`}
          >
            {isSaving ? (
              'Deploying Template...'
            ) : isSaved ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Deployed to Production</>
            ) : (
              <><Save className="w-5 h-5 mr-2 text-saffron-400" /> Save & Deploy Layout</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tools & Blocks */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
            <div className="bg-stone-50 dark:bg-stone-900 p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-stone-500" />
              <h3 className="font-bold">Receipt Blocks</h3>
            </div>
            <div className="p-4 space-y-3">
              
              <button 
                onClick={() => toggleConfig('showLogo')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${config.showLogo ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20' : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 opacity-60'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.showLogo ? 'bg-saffron-100 text-saffron-600' : 'bg-stone-100 text-stone-500'}`}>
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-stone-700 dark:text-stone-300">Temple Logo Header</span>
                </div>
                {config.showLogo && <CheckCircle2 className="w-5 h-5 text-saffron-500" />}
              </button>

              <button 
                onClick={() => toggleConfig('showTaxId')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${config.showTaxId ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20' : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 opacity-60'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.showTaxId ? 'bg-saffron-100 text-saffron-600' : 'bg-stone-100 text-stone-500'}`}>
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-stone-700 dark:text-stone-300">80G / Trust Details</span>
                </div>
                {config.showTaxId && <CheckCircle2 className="w-5 h-5 text-saffron-500" />}
              </button>

              <button 
                onClick={() => toggleConfig('showSignature')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${config.showSignature ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20' : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 opacity-60'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.showSignature ? 'bg-saffron-100 text-saffron-600' : 'bg-stone-100 text-stone-500'}`}>
                    <PenTool className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-stone-700 dark:text-stone-300">Authorized Signature</span>
                </div>
                {config.showSignature && <CheckCircle2 className="w-5 h-5 text-saffron-500" />}
              </button>

              <button 
                onClick={() => toggleConfig('showQR')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${config.showQR ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20' : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 opacity-60'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.showQR ? 'bg-saffron-100 text-saffron-600' : 'bg-stone-100 text-stone-500'}`}>
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-stone-700 dark:text-stone-300">UPI Digital Payment QR</span>
                </div>
                {config.showQR && <CheckCircle2 className="w-5 h-5 text-saffron-500" />}
              </button>

            </div>
          </Card>
          
          <div className="bg-stone-100 dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 text-sm text-stone-500 flex items-start gap-3">
            <Printer className="w-5 h-5 shrink-0" />
            <p>
              This is a live representation of the A4 PDF that gets generated via <code>react-to-pdf</code> and emailed to devotees immediately upon successful donation.
            </p>
          </div>
        </div>

        {/* Right Column: Live A4 Canvas Preview */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="bg-white rounded shadow-2xl overflow-hidden ring-1 ring-stone-900/5 relative transition-all"
               style={{ 
                 width: '210mm', 
                 minHeight: '297mm', 
                 transform: 'scale(0.85)', 
                 transformOrigin: 'top center' 
               }}>
            
            {/* A4 Content Area */}
            <div className="p-16 flex flex-col h-full">
              
              {/* Header */}
              <div className={`flex ${config.showLogo ? 'justify-between' : 'justify-center'} items-center border-b pb-8`} style={{ borderColor: config.accentColor }}>
                {config.showLogo && (
                  <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center bg-stone-50" style={{ borderColor: config.accentColor }}>
                    <span className="text-4xl">🕉️</span>
                  </div>
                )}
                <div className={`text-${config.showLogo ? 'right' : 'center'} space-y-1`}>
                  <h1 className="text-3xl font-black text-stone-900" style={{ color: config.accentColor }}>SRI RAMA TEMPLE</h1>
                  <p className="text-stone-500 text-sm font-medium">Bhakti Marg, Spiritual District, 500001</p>
                  {config.showTaxId && (
                    <p className="text-stone-400 text-xs font-mono mt-2 bg-stone-50 inline-block px-2 py-1 rounded">
                      Trust Reg: 12A/80G/2026/01
                    </p>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="py-12 text-center">
                <h2 className="text-4xl font-black tracking-widest text-stone-200 uppercase">Donation Receipt</h2>
                <div className="w-16 h-1 mx-auto mt-4" style={{ backgroundColor: config.accentColor }}></div>
              </div>

              {/* Core Details (Static for preview) */}
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-8 text-lg">
                  <div>
                    <span className="text-stone-400 text-sm uppercase tracking-wider font-bold">Receipt No.</span>
                    <p className="font-mono font-bold text-stone-900 mt-1">REC-2026-8891</p>
                  </div>
                  <div>
                    <span className="text-stone-400 text-sm uppercase tracking-wider font-bold">Date</span>
                    <p className="font-medium text-stone-900 mt-1">16 Jun 2026</p>
                  </div>
                  <div>
                    <span className="text-stone-400 text-sm uppercase tracking-wider font-bold">Received With Thanks From</span>
                    <p className="font-bold text-stone-900 text-xl mt-1">Ramesh Sharma</p>
                  </div>
                  <div>
                    <span className="text-stone-400 text-sm uppercase tracking-wider font-bold">Donation Purpose</span>
                    <p className="font-medium text-stone-900 mt-1">Annadanam (Food Distribution)</p>
                  </div>
                </div>

                <div className="mt-12 bg-stone-50 p-6 rounded-2xl border border-stone-100 flex justify-between items-center">
                  <span className="text-xl font-bold text-stone-600">Total Amount</span>
                  <span className="text-4xl font-black" style={{ color: config.accentColor }}>₹ 5,001</span>
                </div>
                
                <p className="text-stone-400 italic text-sm text-center mt-4">
                  * Amount received via Unified Payments Interface (UPI)
                </p>
              </div>

              {/* Footer Elements */}
              <div className="pt-16 mt-auto flex justify-between items-end border-t border-stone-100">
                {config.showQR ? (
                  <div className="text-center">
                    <div className="w-28 h-28 bg-white border border-stone-200 rounded-xl p-2 shadow-sm flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-stone-800" />
                    </div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-3 block">Digital Verifier</span>
                  </div>
                ) : (
                  <div></div>
                )}

                {config.showSignature ? (
                  <div className="text-center">
                    <div className="w-48 h-16 border-b border-stone-300 relative flex items-center justify-center">
                      <span className="font-signature text-3xl text-stone-800 opacity-80" style={{ fontFamily: 'cursive' }}>A. Sharma</span>
                    </div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-3 block">Authorized Signatory</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
