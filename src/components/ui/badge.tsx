'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-saffron-500 text-white shadow hover:bg-saffron-600',
        secondary: 'border-transparent bg-stone-100 text-stone-900 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700',
        destructive: 'border-transparent bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400',
        outline: 'border-stone-200 text-foreground dark:border-stone-800',
        success: 'border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
        warning: 'border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
      },
      size: {
        default: 'text-xs px-2.5 py-0.5',
        sm: 'text-[10px] px-2 py-0.5',
        lg: 'text-sm px-3.5 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean
}

function Badge({ className, variant, size, showDot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {showDot && (
        <span
          className={cn(
            'mr-1.5 h-1.5 w-1.5 rounded-full bg-current',
            variant === 'default' && 'bg-white',
            variant === 'secondary' && 'bg-stone-500',
            variant === 'destructive' && 'bg-red-500',
            variant === 'success' && 'bg-emerald-500',
            variant === 'warning' && 'bg-amber-500'
          )}
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
