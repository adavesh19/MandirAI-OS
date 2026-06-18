'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, AlertTriangle, Sparkles, Plus, RefreshCw, BarChart, Send, CheckCircle2, Factory, Mail, ArrowRight } from 'lucide-react'

interface DraftPO {
  itemId: string
  vendorName: string
  vendorEmail: string
  requestedQty: number
  unit: string
  urgency: string
  reason: string
  status: 'draft' | 'sending' | 'sent'
}

export default function InventoryClient({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems)
  const [loadingForecast, setLoadingForecast] = useState(false)
  const [forecasts, setForecasts] = useState<any>({})
  const [draftPOs, setDraftPOs] = useState<Record<string, DraftPO>>({})
  const [agentModeEnabled, setAgentModeEnabled] = useState(false)

  const handleForecast = async () => {
    setLoadingForecast(true)
    
    // Simulate an AI Agent analyzing the predictive crowd engine and drafting POs
    setTimeout(() => {
      const newForecasts = {} as any
      const newPOs = {} as Record<string, DraftPO>

      items.forEach(item => {
        if (item.itemName.includes('Ghee')) {
          newForecasts[item.id] = 'WARNING: Maha Shivaratri model predicts 120% crowd surge. Expected burn: 45 kg. Current deficit: 30 kg.'
          newPOs[item.id] = {
            itemId: item.id,
            vendorName: 'Nandini Dairy Wholesale',
            vendorEmail: 'orders@nandinidairy.com',
            requestedQty: 30,
            unit: 'kg',
            urgency: 'HIGH - Deliver by Friday',
            reason: 'Maha Shivaratri Buffer',
            status: 'draft'
          }
        } else if (item.itemName.includes('Rose')) {
          newForecasts[item.id] = 'CRITICAL: Vendor delay detected in global supply. Securing local stock is required. Spiking 300% demand next week.'
          newPOs[item.id] = {
            itemId: item.id,
            vendorName: 'Sri Venkateshwara Florists',
            vendorEmail: 'supply@svflorists.in',
            requestedQty: 15,
            unit: 'kg',
            urgency: 'CRITICAL - Deliver by Tomorrow',
            reason: 'Festival Decoration Spike',
            status: 'draft'
          }
        } else {
          newForecasts[item.id] = 'Stock levels optimal based on historical 30-day average. No action required.'
        }
      })
      
      setForecasts(newForecasts)
      setDraftPOs(newPOs)
      setAgentModeEnabled(true)
      setLoadingForecast(false)
    }, 2500)
  }

  const handleExecutePO = (itemId: string) => {
    setDraftPOs(prev => ({ ...prev, [itemId]: { ...prev[itemId], status: 'sending' } }))
    
    // Simulate API call to send Email/SMS to vendor
    setTimeout(() => {
      setDraftPOs(prev => ({ ...prev, [itemId]: { ...prev[itemId], status: 'sent' } }))
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <Factory className="h-8 w-8 text-saffron-500" />
            Supply Chain Agent
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Autonomous procurement. The AI will forecast demand and automatically draft purchase orders for vendors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleForecast}
            disabled={loadingForecast}
            className="border-saffron-200 text-saffron-700 bg-saffron-50 hover:bg-saffron-100 font-bold shadow-sm"
          >
            {loadingForecast ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2 text-saffron-500" />}
            {agentModeEnabled ? 'Refresh AI Analysis' : 'Run Agentic Analysis'}
          </Button>
          <Button className="bg-stone-900 hover:bg-stone-800 text-white font-bold">
            <Plus className="h-4 w-4 mr-2" /> Manual Entry
          </Button>
        </div>
      </div>

      {agentModeEnabled && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-sm font-bold text-green-800 dark:text-green-400">
            Agentic Procurement Mode Active. 2 Draft POs awaiting execution.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => {
          const isLowStock = Number(item.currentStock) <= Number(item.reorderLevel)
          const po = draftPOs[item.id]
          
          return (
            <Card key={item.id} className={`border ${isLowStock ? 'border-red-200 shadow-red-100' : 'border-stone-200'} shadow-sm overflow-hidden flex flex-col`}>
              <CardContent className="p-6 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${isLowStock ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-stone-100 text-stone-500'}`}>
                      <Package className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900">{item.itemName}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-md bg-stone-100 text-stone-600 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-stone-600 bg-stone-50 px-2 py-1 rounded border border-stone-100">
                          Stock: <span className={isLowStock ? 'text-red-600 font-black' : 'text-stone-900'}>{Number(item.currentStock)} {item.unit}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {forecasts[item.id] && (
                  <div className={`mt-6 p-4 rounded-xl text-sm font-medium leading-relaxed border ${
                    forecasts[item.id].includes('WARNING') || forecasts[item.id].includes('CRITICAL') 
                      ? 'bg-red-50 border-red-100 text-red-800' 
                      : 'bg-stone-50 border-stone-100 text-stone-600'
                  }`}>
                    <div className="flex items-start gap-2">
                      <Sparkles className={`h-5 w-5 shrink-0 mt-0.5 ${
                        forecasts[item.id].includes('WARNING') ? 'text-red-500' : 'text-stone-400'
                      }`} />
                      <p>{forecasts[item.id]}</p>
                    </div>
                  </div>
                )}

                {/* Agent-Drafted Purchase Order UI */}
                {po && (
                  <div className="mt-4 p-5 rounded-xl border-2 border-saffron-100 bg-white relative animate-in fade-in zoom-in-95">
                    <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2 text-xs font-black uppercase tracking-widest text-saffron-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      AI Drafted Purchase Order
                    </div>
                    
                    <div className="space-y-3 mt-1">
                      <div className="flex justify-between items-center text-sm border-b border-stone-100 pb-2">
                        <span className="text-stone-500 font-medium">To Vendor:</span>
                        <span className="font-bold text-stone-900">{po.vendorName}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-stone-100 pb-2">
                        <span className="text-stone-500 font-medium">Requested Qty:</span>
                        <span className="font-black text-stone-900">{po.requestedQty} {po.unit}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-stone-100 pb-2">
                        <span className="text-stone-500 font-medium">Urgency:</span>
                        <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{po.urgency}</span>
                      </div>
                    </div>

                    <div className="mt-5">
                      {po.status === 'draft' ? (
                        <Button 
                          onClick={() => handleExecutePO(item.id)}
                          className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-bold"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Approve & Send PO via Email
                        </Button>
                      ) : po.status === 'sending' ? (
                        <Button disabled className="w-full bg-saffron-200 text-saffron-700 font-bold">
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Dispatching Order...
                        </Button>
                      ) : (
                        <Button disabled className="w-full bg-green-500 text-white font-bold opacity-100">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Order Dispatched Successfully
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
