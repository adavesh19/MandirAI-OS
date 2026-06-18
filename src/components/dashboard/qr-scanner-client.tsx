'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScanLine, CheckCircle, XCircle, Loader2 } from 'lucide-react'

// Note: In a real production app, we would use a library like 'html5-qrcode' or 'react-qr-reader'
// to actually access the device camera. For the OS Copilot simulation, we will simulate the scanning state.

export default function QrScannerClient() {
  const [scanning, setScanning] = React.useState(true)
  const [result, setResult] = React.useState<'success' | 'error' | null>(null)

  // Simulate a scan after 3 seconds for demonstration
  React.useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false)
        setResult('success')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [scanning])

  const resetScanner = () => {
    setResult(null)
    setScanning(true)
  }

  return (
    <div className="max-w-md mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white">
          Fast-Track Scanner
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Scan devotee QR codes to instantly verify Seva bookings.
        </p>
      </div>

      <Card className="border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 overflow-hidden shadow-2xl">
        <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden">
          {/* Simulated Camera Feed */}
          {scanning ? (
            <>
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
              
              {/* Scanner Reticle */}
              <div className="relative z-10 w-64 h-64 border-2 border-cyan-500 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-3xl"></div>
                
                {/* Laser Line */}
                <div className="w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)] animate-[scan_2s_ease-in-out_infinite] absolute top-1/2 -translate-y-1/2"></div>
              </div>
              
              <div className="absolute bottom-6 flex items-center gap-2 text-cyan-400 font-mono text-sm bg-stone-950/80 px-4 py-2 rounded-full border border-cyan-900/50 backdrop-blur-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning for valid Seva QR...
              </div>
            </>
          ) : result === 'success' ? (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-green-950 w-full h-full">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] animate-in zoom-in duration-500">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Verified!</h3>
                <p className="text-green-200 mt-1">Suresh Kumar - Rudrabhishekam</p>
                <p className="text-green-400 font-mono text-xs mt-2">Booking ID: #SEVA-8924</p>
              </div>
              <button 
                onClick={resetScanner}
                className="mt-6 px-6 py-2 bg-white text-green-900 font-bold rounded-full hover:bg-green-50 transition-colors"
              >
                Scan Next Devotee
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-red-950 w-full h-full">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-in zoom-in duration-500">
                <XCircle className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Invalid QR Code</h3>
                <p className="text-red-200 mt-1">This booking is expired or invalid.</p>
              </div>
              <button 
                onClick={resetScanner}
                className="mt-6 px-6 py-2 bg-white text-red-900 font-bold rounded-full hover:bg-red-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan {
          0%, 100% { transform: translateY(-100px); }
          50% { transform: translateY(100px); }
        }
      `}} />
    </div>
  )
}
