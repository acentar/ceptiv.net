'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from './supabase'

interface Client {
  id: string
  email: string
  company_name: string | null
  contact_name: string
  phone: string | null
  created_at: string
}

interface ClientAuthContextType {
  client: Client | null
  isLoading: boolean
  login: (email: string, pin: string) => Promise<{ success: boolean; error?: string }>
  loginDirect: (clientData: Client) => void
  logout: () => void
  isAuthenticated: boolean
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined)

// Generate a random 4-digit PIN
export function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// Simple hash function for PIN (in production, use proper hashing)
export function hashPin(pin: string): string {
  // Simple hash - in production use bcrypt or similar
  let hash = 0
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const storedClient = localStorage.getItem('ceptiv_client')
    if (storedClient) {
      try {
        setClient(JSON.parse(storedClient))
      } catch {
        localStorage.removeItem('ceptiv_client')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, pin: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const hashedPin = hashPin(pin)
      
      const { data, error } = await supabase
        .from('cap_clients')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('pin_code', hashedPin)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        return { success: false, error: 'Invalid email or PIN' }
      }

      // Update last login
      await supabase
        .from('cap_clients')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.id)

      const clientData: Client = {
        id: data.id,
        email: data.email,
        company_name: data.company_name,
        contact_name: data.contact_name,
        phone: data.phone,
        created_at: data.created_at
      }

      setClient(clientData)
      localStorage.setItem('ceptiv_client', JSON.stringify(clientData))
      
      return { success: true }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, error: 'An error occurred during login' }
    }
  }

  const loginDirect = (clientData: Client) => {
    setClient(clientData)
    localStorage.setItem('ceptiv_client', JSON.stringify(clientData))
  }

  const logout = () => {
    setClient(null)
    localStorage.removeItem('ceptiv_client')
  }

  return (
    <ClientAuthContext.Provider value={{
      client,
      isLoading,
      login,
      loginDirect,
      logout,
      isAuthenticated: !!client
    }}>
      {children}
    </ClientAuthContext.Provider>
  )
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext)
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider')
  }
  return context
}
