'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'

export default function ClientLoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading: authLoading } = useClientAuth()
  
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/client/dashboard')
    }
  }, [isAuthenticated, authLoading, router])

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }
    
    if (!/^\d*$/.test(value)) return
    
    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)
    
    // Auto-focus next input
    if (value && index < 3) {
      pinRefs[index + 1].current?.focus()
    }
  }

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const fullPin = pin.join('')
    if (fullPin.length !== 4) {
      setError('Please enter your 4-digit PIN')
      return
    }
    
    if (!email) {
      setError('Please enter your email')
      return
    }
    
    setIsLoading(true)
    
    const result = await login(email, fullPin)
    
    if (result.success) {
      router.push('/client/dashboard')
    } else {
      setError(result.error || 'Login failed')
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Link href="/">
          <Logo width={100} height={28} variant="light" textFallback="Ceptiv" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Welcome back
            </h1>
            <p className="text-neutral-400">
              Sign in to your client portal
            </p>
          </div>

          <Card className="bg-neutral-800 border-neutral-700">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-300">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-white"
                    />
                  </div>
                </div>

                {/* PIN */}
                <div className="space-y-2">
                  <Label className="text-neutral-300">
                    4-Digit PIN
                  </Label>
                  <div className="flex justify-center gap-3">
                    {pin.map((digit, index) => (
                      <div key={index} className="relative">
                        <Input
                          ref={pinRefs[index]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handlePinChange(index, e.target.value)}
                          onKeyDown={(e) => handlePinKeyDown(index, e)}
                          className="w-14 h-14 text-center text-2xl font-bold bg-neutral-700 border-neutral-600 text-white focus:border-white"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 text-center mt-2">
                    Your PIN was sent when you submitted your project
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-neutral-900 hover:bg-neutral-100 py-6 text-lg font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-neutral-900"></div>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/start" className="text-white hover:underline">
                Start a project
              </Link>
            </p>
            <p className="text-neutral-600 text-xs mt-4">
              Forgot your PIN? Contact us at{' '}
              <a href="mailto:dv@ceptiv.net" className="text-neutral-400 hover:text-white">
                dv@ceptiv.net
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
