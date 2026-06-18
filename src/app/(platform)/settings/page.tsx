'use client'

import * as React from 'react'
import {
  Globe, Copy, CheckCircle2, ExternalLink, Shield, Zap,
  ArrowRight, Server, RefreshCcw, AlertTriangle, ChevronDown
} from 'lucide-react'

export default function SettingsPage() {
  const [customDomain, setCustomDomain] = React.useState('')
  const [savedDomain, setSavedDomain] = React.useState('')
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)
  const [dnsExpanded, setDnsExpanded] = React.useState(false)

  const templeSlug = 'asfjavsdf' // This would come from the session/context in production
  const platformDomain = 'temple-ai-os.vercel.app' // Your Vercel deployment domain
  const defaultUrl = `https://${platformDomain}/temple/${templeSlug}`
  const vercelIp = '76.76.21.21'
  const vercelCname = 'cname.vercel-dns.com'

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings/domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: customDomain.toLowerCase().replace(/^www\./, '') }),
      })
      if (res.ok) {
        setSavedDomain(customDomain.toLowerCase().replace(/^www\./, ''))
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error('Failed to save domain:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-black text-stone-900">Workspace Settings</h1>
        <p className="text-sm text-stone-500 mt-1">Configure your temple's website, domain, and platform preferences</p>
      </div>

      {/* ── CURRENT LIVE URL ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-sm font-bold text-emerald-800">Your Temple Website is Live!</h3>
            <p className="text-xs text-emerald-600 mt-0.5">Automatically deployed and accessible at:</p>
            <div className="mt-2 flex items-center gap-2 bg-white border border-emerald-200 rounded-xl px-3 py-2">
              <code className="text-sm font-mono text-emerald-700 truncate flex-1">{defaultUrl}</code>
              <button
                onClick={() => copyToClipboard(defaultUrl, 'url')}
                className="text-emerald-500 hover:text-emerald-700 transition-colors flex-shrink-0"
              >
                {copied === 'url' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              <a href={defaultUrl} target="_blank" rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-700 transition-colors flex-shrink-0">
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── CUSTOM DOMAIN ─────────────────────────────────────────────── */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-saffron-500 to-amber-600 flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-stone-900">Custom Domain</h2>
              <p className="text-xs text-stone-500">Use your own domain like <strong>shreeankalagimath.com</strong></p>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-700 space-y-1">
                <p className="font-bold">How Custom Domains Work:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Buy a domain from any registrar (GoDaddy, Namecheap, Google Domains, etc.) — costs ₹500–900/year</li>
                  <li>Add the DNS records shown below to point the domain to our servers</li>
                  <li>Enter the domain name below and click Save</li>
                  <li>Within 5 minutes, your temple website will be live on your own domain! 🎉</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Domain Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 uppercase tracking-wider">Your Domain Name</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">https://</span>
                <input
                  type="text"
                  placeholder="mytemple.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value.toLowerCase().replace(/\s/g, ''))}
                  className="w-full pl-[72px] pr-3 py-3 border border-stone-200 rounded-xl text-sm font-mono focus:outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-100"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!customDomain || saving}
                className="px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-saffron-500 to-amber-600 text-white hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-md shadow-saffron-500/20"
              >
                {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : null}
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Domain'}
              </button>
            </div>
            {savedDomain && (
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Domain <strong>{savedDomain}</strong> is configured. Add the DNS records below.
              </p>
            )}
          </div>

          {/* DNS Records */}
          <div>
            <button
              onClick={() => setDnsExpanded(!dnsExpanded)}
              className="w-full flex items-center justify-between text-sm font-bold text-stone-700 hover:text-stone-900 transition-colors py-2"
            >
              <span className="flex items-center gap-2">
                <Server className="h-4 w-4 text-saffron-500" />
                DNS Records (Required)
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${dnsExpanded ? 'rotate-180' : ''}`} />
            </button>

            {dnsExpanded && (
              <div className="mt-3 space-y-3">
                <p className="text-xs text-stone-500">Add these DNS records in your domain registrar's DNS settings:</p>

                {/* A Record */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">A Record (for root domain)</span>
                    <button onClick={() => copyToClipboard(vercelIp, 'a')}
                      className="text-xs text-saffron-600 font-semibold flex items-center gap-1 hover:underline">
                      {copied === 'a' ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />} Copy
                    </button>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-1 font-semibold text-stone-500">Type</th>
                        <th className="text-left py-1 font-semibold text-stone-500">Name</th>
                        <th className="text-left py-1 font-semibold text-stone-500">Value</th>
                        <th className="text-left py-1 font-semibold text-stone-500">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1 font-mono font-bold text-stone-800">A</td>
                        <td className="py-1 font-mono text-stone-600">@</td>
                        <td className="py-1 font-mono text-stone-800 font-bold">{vercelIp}</td>
                        <td className="py-1 font-mono text-stone-600">Auto</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* CNAME Record */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">CNAME Record (for www subdomain)</span>
                    <button onClick={() => copyToClipboard(vercelCname, 'cname')}
                      className="text-xs text-saffron-600 font-semibold flex items-center gap-1 hover:underline">
                      {copied === 'cname' ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />} Copy
                    </button>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-1 font-semibold text-stone-500">Type</th>
                        <th className="text-left py-1 font-semibold text-stone-500">Name</th>
                        <th className="text-left py-1 font-semibold text-stone-500">Value</th>
                        <th className="text-left py-1 font-semibold text-stone-500">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1 font-mono font-bold text-stone-800">CNAME</td>
                        <td className="py-1 font-mono text-stone-600">www</td>
                        <td className="py-1 font-mono text-stone-800 font-bold">{vercelCname}</td>
                        <td className="py-1 font-mono text-stone-600">Auto</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <Shield className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    <strong>Free SSL:</strong> After DNS propagation (5–30 minutes), Vercel will automatically provision a free SSL certificate (HTTPS) for your domain.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Free vs Premium */}
        <div className="border-t border-stone-100 bg-stone-50/50 p-6">
          <h3 className="font-heading text-sm font-bold text-stone-700 mb-4">Hosting Options for Your Temple Website</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 relative">
              <span className="absolute -top-2.5 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">FREE</span>
              <h4 className="font-heading font-bold text-stone-900 mt-1">Platform Subdomain</h4>
              <p className="text-xs text-stone-500 mt-1 mb-3">Your temple website is hosted for free on our platform URL</p>
              <ul className="space-y-1.5">
                {['Instant deployment', 'Auto-generated SEO', 'Mobile optimized', '5 languages', 'Unlimited pageviews'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-heading text-lg font-black text-emerald-600">₹0/month</p>
            </div>

            <div className="bg-white border-2 border-saffron-200 rounded-2xl p-5 relative">
              <span className="absolute -top-2.5 left-4 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">PREMIUM</span>
              <h4 className="font-heading font-bold text-stone-900 mt-1">Custom Domain</h4>
              <p className="text-xs text-stone-500 mt-1 mb-3">Use your own domain for a branded professional presence</p>
              <ul className="space-y-1.5">
                {['Everything in Free', 'Your own domain name', 'Free SSL (HTTPS)', 'Google Indexing priority', 'WhatsApp/Email receipts'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                    <CheckCircle2 className="h-3 w-3 text-saffron-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-heading text-lg font-black text-saffron-600">₹499/month <span className="text-xs font-normal text-stone-400">+ domain cost</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
