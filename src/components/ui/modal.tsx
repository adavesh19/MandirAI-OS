'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
  footer?: React.ReactNode
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'default',
  footer,
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const modalContainer = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          'relative z-10 w-full overflow-hidden rounded-xl border border-stone-200 bg-background text-foreground shadow-2xl transition-all duration-300 dark:border-stone-850 bg-white dark:bg-stone-950 animate-scaleIn flex flex-col max-h-[90vh]',
          size === 'sm' && 'max-w-sm',
          size === 'default' && 'max-w-md',
          size === 'lg' && 'max-w-lg',
          size === 'xl' && 'max-w-2xl',
          size === 'full' && 'max-w-[95vw] h-[90vh]'
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 p-5 dark:border-stone-900">
          <div className="space-y-1">
            {title && (
              <h2 className="font-heading text-lg font-semibold tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-900 dark:hover:text-stone-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end space-x-2 border-t border-stone-100 bg-stone-50/50 p-4 dark:border-stone-900 dark:bg-stone-950/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(modalContainer, document.body)
}
