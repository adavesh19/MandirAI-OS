'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, children, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className={cn(
            'absolute mt-2 w-56 rounded-md border border-stone-200 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-stone-850 dark:bg-stone-900 z-50 animate-scaleIn origin-top-right transition-all duration-200',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export function DropdownItem({ children, icon, disabled = false, className, ...props }: DropdownItemProps) {
  return (
    <div
      className={cn(
        'flex items-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 cursor-pointer dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      role="menuitem"
      {...props}
    >
      {icon && <span className="mr-3 text-stone-400 dark:text-stone-500">{icon}</span>}
      <span className="flex-1">{children}</span>
    </div>
  )
}

export function DropdownDivider() {
  return <div className="border-t border-stone-100 dark:border-stone-800 my-1" />
}
