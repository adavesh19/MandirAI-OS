'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  sizeVariant?: 'sm' | 'default' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, leftIcon, rightIcon, sizeVariant = 'default', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-stone-400 dark:text-stone-500">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex w-full rounded-md border border-stone-200 bg-background text-foreground transition-all duration-300 placeholder:text-stone-400/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:placeholder:text-stone-600',
              leftIcon ? 'pl-10' : 'pl-3',
              rightIcon ? 'pr-10' : 'pr-3',
              sizeVariant === 'sm' && 'h-9 text-xs',
              sizeVariant === 'default' && 'h-10 text-sm',
              sizeVariant === 'lg' && 'h-12 text-base',
              error && 'border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center text-stone-400 dark:text-stone-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-500 font-medium animate-fadeIn">
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
