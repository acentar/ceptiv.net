'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/ui/logo'
import { ArrowRight, AlertCircle } from 'lucide-react'
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-neutral-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-50 border-r border-neutral-200 items-center justify-center p-12">
        <div className="max-w-md">
          <Logo width={140} height={40} variant="dark" />
          <h1 className="text-4xl font-bold text-neutral-900 mt-12 mb-4 tracking-tight">
            Welcome back.
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed">
            Sign in to manage your projects, request features, and track your subscription.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12">
            <Link href="/">
              <Logo width={120} height={34} variant="dark" />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Sign in
          </h2>
          <p className="text-neutral-500 mb-8">
            Enter your email and 4-digit PIN
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900"
              />
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-700">
                PIN
              </Label>
              <div className="flex gap-3">
                {pin.map((digit, index) => (
                  <Input
                    key={index}
                    ref={pinRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(index, e)}
                    className="w-14 h-14 text-center text-xl font-semibold bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900"
                  />
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm">
            <p className="text-neutral-500">
              Don&apos;t have an account?{' '}
              <Link href="/start" className="text-neutral-900 font-medium hover:underline">
                Start a project
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-neutral-400 text-xs">
              Forgot your PIN?{' '}
              <a href="mailto:dv@ceptiv.net" className="hover:text-neutral-600">
                Contact us
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
