'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-saffron-500',
        className
      )}
      role="status"
      {...props}
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded bg-stone-200 dark:bg-stone-800', className)}
      {...props}
    />
  )
}

export function PageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground bg-stone-50 dark:bg-stone-950">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Spiritual Om Icon or Elegant Ring */}
        <div className="relative flex items-center justify-center h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-saffron-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-saffron-500 animate-spin" />
          <span className="text-3xl font-bold text-saffron-500 select-none animate-pulse">🕉️</span>
        </div>
        <p className="font-heading text-sm font-medium tracking-widest text-saffron-700 dark:text-saffron-400 uppercase animate-pulse">
          {text}
        </p>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-stone-250 p-6 space-y-4 bg-card dark:border-stone-800">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full border border-stone-200 rounded-lg overflow-hidden dark:border-stone-800">
      <div className="h-12 border-b border-stone-200 bg-stone-50 flex items-center px-6 dark:border-stone-800 dark:bg-stone-900">
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="divide-y divide-stone-200 dark:divide-stone-850">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-16 flex items-center px-6 space-x-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
