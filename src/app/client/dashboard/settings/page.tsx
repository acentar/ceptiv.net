'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  User,
  Mail,
  Phone,
  Building2,
  Key,
  Shield
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'

export default function ClientSettingsPage() {
  const { client } = useClientAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!client) return null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your account settings</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Account</h2>
          <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Full name</p>
                  <p className="font-medium text-neutral-900">{client.contact_name}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>

            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Email</p>
                  <p className="font-medium text-neutral-900">{client.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>

            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Company</p>
                  <p className="font-medium text-neutral-900">{client.company_name || 'Not set'}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>

            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Phone</p>
                  <p className="font-medium text-neutral-900">{client.phone || 'Not set'}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Security</h2>
          <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">PIN</p>
                  <p className="font-medium text-neutral-900">••••</p>
                  <p className="text-xs text-neutral-500">Used to sign in to your account</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Reset PIN</Button>
            </div>

            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">Sessions</p>
                  <p className="font-medium text-neutral-900">Manage active sessions</p>
                  <p className="text-xs text-neutral-500">See where you&apos;re signed in</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </motion.div>

        {/* Account Created */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
            <p className="text-sm text-neutral-500">
              Account created on {new Date(client.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
