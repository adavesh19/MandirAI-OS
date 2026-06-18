'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, FileText, Sparkles, Download, CheckCircle2, RefreshCw, IndianRupee, ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react'

const MONTHLY_DATA = [
  { month: 'Jan', income: 182000, expense: 45000 },
  { month: 'Feb', income: 210000, expense: 52000 },
  { month: 'Mar', income: 340000, expense: 88000 },
  { month: 'Apr', income: 195000, expense: 41000 },
  { month: 'May', income: 267000, expense: 61000 },
  { month: 'Jun', income: 312000, expense: 74000 },
]

const DONORS_80G = [
  { name: 'Ramesh Sharma', pan: 'ABCDE1234F', amount: 25000, email: 'ramesh@gmail.com' },
  { name: 'Priya Patel', pan: 'FGHIJ5678K', amount: 15000, email: 'priya@example.com' },
  { name: 'Srinivas Rao', pan: 'KLMNO9012P', amount: 50000, email: 'sri@company.in' },
]

export default function FinanceClient() {
  const [generatingPL, setGeneratingPL] = useState(false)
  const [plGenerated, setPlGenerated] = useState(false)
  const [generating80G, setGenerating80G] = useState<Record<string, boolean>>({})
  const [generated80G, setGenerated80G] = useState<Record<string, boolean>>({})

  const handleGeneratePL = () => {
    setGeneratingPL(true)
    setTimeout(() => { setGeneratingPL(false); setPlGenerated(true) }, 2000)
  }

  const handle80G = (pan: string) => {
    setGenerating80G(prev => ({ ...prev, [pan]: true }))
    setTimeout(() => {
      setGenerating80G(prev => ({ ...prev, [pan]: false }))
      setGenerated80G(prev => ({ ...prev, [pan]: true }))
    }, 1800)
  }

  const totalIncome = MONTHLY_DATA.reduce((s, d) => s + d.income, 0)
  const totalExpense = MONTHLY_DATA.reduce((s, d) => s + d.expense, 0)
  const maxBar = Math.max(...MONTHLY_DATA.map(d => d.income))

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-500" />
            Financial Intelligence
          </h1>
          <p className="text-stone-500 text-sm mt-1">AI-powered accounting, 80G certificate generator, and trust audit trail.</p>
        </div>
        <Button onClick={handleGeneratePL} disabled={generatingPL} className={`h-11 px-6 font-bold text-white ${plGenerated ? 'bg-green-500 hover:bg-green-600' : 'bg-stone-900 hover:bg-stone-800'}`}>
          {generatingPL ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : plGenerated ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Sparkles className="h-4 w-4 mr-2 text-green-400" />}
          {plGenerated ? 'P&L Report Ready' : 'Generate AI P&L Report'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-stone-200 dark:border-stone-800 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Total Income (6M)</p>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-black text-green-600 mt-2">₹{(totalIncome / 100000).toFixed(1)}L</p>
            <p className="text-xs text-stone-400 mt-1">+18% vs last year</p>
          </CardContent>
        </Card>
        <Card className="border-stone-200 dark:border-stone-800 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Total Expenses (6M)</p>
              <ArrowDownRight className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-black text-red-500 mt-2">₹{(totalExpense / 100000).toFixed(1)}L</p>
            <p className="text-xs text-stone-400 mt-1">Within approved budget</p>
          </CardContent>
        </Card>
        <Card className="border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-950/10 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-green-700 uppercase tracking-wider">Net Surplus (6M)</p>
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-black text-green-700 mt-2">₹{((totalIncome - totalExpense) / 100000).toFixed(1)}L</p>
            <p className="text-xs text-green-600 mt-1 font-semibold">Available for capital works</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="border-stone-200 dark:border-stone-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-end gap-4 h-40">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-1 h-32">
                  <div
                    className="flex-1 bg-green-400 dark:bg-green-600 rounded-t-md transition-all duration-700"
                    style={{ height: `${(d.income / maxBar) * 100}%` }}
                  />
                  <div
                    className="flex-1 bg-red-300 dark:bg-red-700 rounded-t-md transition-all duration-700"
                    style={{ height: `${(d.expense / maxBar) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-500">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-sm bg-green-400" /><span className="text-stone-600 font-medium">Income</span></div>
            <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-sm bg-red-300" /><span className="text-stone-600 font-medium">Expenses</span></div>
          </div>
        </CardContent>
      </Card>

      {/* 80G Certificate Generator */}
      <Card className="border-stone-200 dark:border-stone-800 shadow-sm">
        <CardHeader className="border-b border-stone-100 dark:border-stone-800">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-saffron-500" />
            80G Tax Exemption Certificate Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {DONORS_80G.map((donor) => (
              <div key={donor.pan} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{donor.name}</p>
                  <p className="text-xs font-mono text-stone-500 mt-0.5">PAN: {donor.pan} · {donor.email}</p>
                  <p className="text-sm font-bold text-green-600 mt-1">₹{donor.amount.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex gap-3">
                  {generated80G[donor.pan] ? (
                    <Button disabled className="bg-green-500 text-white font-bold opacity-100">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Certificate Sent
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handle80G(donor.pan)}
                      disabled={generating80G[donor.pan]}
                      className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold"
                    >
                      {generating80G[donor.pan] ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                      {generating80G[donor.pan] ? 'Generating...' : 'Generate & Email 80G'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
