'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | null
  bordered?: boolean
}

export function Avatar({
  className,
  src,
  alt = 'avatar',
  fallback,
  size = 'md',
  status = null,
  bordered = false,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(!src)

  const sizeClasses = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  const statusSizeClasses = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  }

  // Get initials from fallback string (e.g., "Aadesh Sharma" -> "AS")
  const getInitials = (name: string) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full overflow-hidden bg-stone-100 text-stone-600 font-semibold select-none dark:bg-stone-800 dark:text-stone-300',
          sizeClasses[size],
          bordered && 'ring-2 ring-saffron-500/80 ring-offset-2 ring-offset-background',
          className
        )}
        {...props}
      >
        {!imageError && src ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover animate-fadeIn"
          />
        ) : (
          <span className="font-heading tracking-wider">{getInitials(fallback)}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-background',
            statusSizeClasses[size],
            status === 'online' ? 'bg-emerald-500' : 'bg-stone-400'
          )}
        />
      )}
    </div>
  )
}
