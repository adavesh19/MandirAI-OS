'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrintClient() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button onClick={handlePrint} size="lg" className="w-full">
      <Printer className="mr-2 h-5 w-5" /> Print Receipt Now
    </Button>
  )
}
