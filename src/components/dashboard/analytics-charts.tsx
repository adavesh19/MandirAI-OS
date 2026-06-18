'use client'

import * as React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

interface ChartDataPoint {
  name: string
  amount: number
}

interface PieDataPoint {
  name: string
  value: number
  color: string
}

interface AnalyticsChartsProps {
  trendData: ChartDataPoint[]
  categoryData: PieDataPoint[]
  methodData: ChartDataPoint[]
}

export default function AnalyticsCharts({ trendData, categoryData, methodData }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 1. Monthly Donation Trend */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-stone-900">Donation Revenue Trends</h3>
          <p className="text-xs text-stone-500">Overview of completed donations collected over the last 6 months.</p>
        </div>
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  fontFamily: 'sans-serif',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Donations']}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#F97316"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Category Share */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-stone-900">Category Distributions</h3>
          <p className="text-xs text-stone-500">Breakdown of donations across different seva and temple activities.</p>
        </div>
        <div className="h-72 w-full flex items-center justify-center pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', marginTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Payment Methods */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-stone-900">Payment Channels</h3>
          <p className="text-xs text-stone-500">Popularity of payment options utilized by devotees.</p>
        </div>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={methodData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  fontSize: '12px',
                }}
                cursor={{ fill: '#F8FAF5', opacity: 0.5 }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Total']}
              />
              <Bar dataKey="amount" fill="#D97706" radius={[4, 4, 0, 0]} barSize={32}>
                {methodData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#F97316' : index === 1 ? '#D97706' : index === 2 ? '#7C2D12' : '#10B981'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
