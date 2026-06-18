'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, Activity, AlertTriangle, Users, BrainCircuit } from 'lucide-react'
import { format, subDays, addDays } from 'date-fns'

interface PredictiveAnalyticsProps {
  donations: Array<{
    amount: number
    createdAt: string
    paymentMethod: string
    categoryName: string
  }>
  atRiskDevotees: Array<{
    id: string
    name: string
    lastVisit: string
    riskScore: number
  }>
}

export default function PredictiveAnalyticsClient({ donations, atRiskDevotees }: PredictiveAnalyticsProps) {
  // 1. Process donation data into daily totals for the last 30 days
  const dailyTotals = React.useMemo(() => {
    const totals: Record<string, number> = {}
    
    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const dateStr = format(subDays(new Date(), i), 'MMM dd')
      totals[dateStr] = 0
    }

    // Add actual data
    donations.forEach(d => {
      const dateStr = format(new Date(d.createdAt), 'MMM dd')
      if (totals[dateStr] !== undefined) {
        totals[dateStr] += d.amount
      }
    })

    // Calculate moving average and add 7 days of "predicted" future data
    const chartData = Object.entries(totals).map(([date, amount]) => ({
      date,
      actual: amount,
      predicted: null as number | null
    }))

    // Simple predictive simulation (average of last 7 days + 5% growth)
    let last7Sum = chartData.slice(-7).reduce((sum, day) => sum + day.actual, 0)
    let avg = last7Sum / 7

    // Connect the prediction line to the last actual point
    chartData[chartData.length - 1].predicted = chartData[chartData.length - 1].actual

    for (let i = 1; i <= 7; i++) {
      const futureDateStr = format(addDays(new Date(), i), 'MMM dd')
      const predictedAmount = Math.round(avg * 1.05) // 5% simulated growth
      chartData.push({
        date: futureDateStr,
        actual: 0, // No actual data for future
        predicted: predictedAmount
      })
      // slightly randomize next prediction
      avg = predictedAmount * (1 + (Math.random() * 0.1 - 0.05))
    }

    return chartData
  }, [donations])

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-stone-800 p-3 rounded-lg shadow-xl font-mono text-xs">
          <p className="text-stone-400 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            if (entry.value === 0 && entry.dataKey === 'actual') return null; // Don't show 0 actuals in the future
            if (entry.value === null) return null;
            
            return (
              <div key={index} className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-stone-300 capitalize">{entry.name}:</span>
                <span className="font-bold text-white">₹{entry.value.toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-cyan-500" />
            Predictive Intelligence
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            AI-driven forecasts and churn analysis based on historical telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest">
            Model Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart - 2/3 width */}
        <Card className="lg:col-span-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-5 dark:opacity-10">
            <TrendingUp className="w-24 h-24" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              Donation Velocity & Forecast (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTotals} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    minTickGap={30}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Actual Data Area */}
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual"
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorActual)" 
                  />
                  
                  {/* Predicted Data Area (Dashed) */}
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    name="Predicted"
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Devotee Churn Risk - 1/3 width */}
        <Card className="border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm flex flex-col">
          <CardHeader className="pb-4 border-b border-stone-100 dark:border-stone-900">
            <CardTitle className="text-sm font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Devotee Churn Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-y-auto max-h-[350px] scrollbar-thin">
            {atRiskDevotees.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-sm">
                No high-risk devotees detected.
              </div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-900">
                {atRiskDevotees.map((devotee) => (
                  <div key={devotee.id} className="p-4 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-200 text-sm">{devotee.name}</h4>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">
                        Last seen: {devotee.lastVisit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        devotee.riskScore > 80 
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' 
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400'
                      }`}>
                        {devotee.riskScore}% RISK
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <div className="p-3 border-t border-stone-100 dark:border-stone-900 bg-stone-50 dark:bg-stone-900/50 text-center">
            <button className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline uppercase tracking-widest">
              Run Re-engagement Campaign →
            </button>
          </div>
        </Card>

      </div>
    </div>
  )
}
