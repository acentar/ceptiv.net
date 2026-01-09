import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { GROK_SYSTEM_PROMPT } from '@/lib/grok-system-prompt'

// Create a Supabase client for server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ProjectContext {
  projectType: string[]
  description: string
  integrations: string[]
  aiCapabilities: string[]
  integrationTypes: string[]
  teamSize: string
  packageSize: string
  otherApiDetails?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, projectContext }: { messages: ChatMessage[], projectContext: ProjectContext } = body

    // Get Grok API key from settings
    const { data: grokSettings } = await supabase
      .from('cap_settings')
      .select('value')
      .eq('key', 'grok_api_key')
      .single()

    const { data: grokEnabled } = await supabase
      .from('cap_settings')
      .select('value')
      .eq('key', 'grok_enabled')
      .single()

    if (!grokEnabled?.value || grokEnabled.value !== 'true') {
      return NextResponse.json(
        { error: 'Grok AI is not enabled. Please configure it in Admin → Integrations → Grok' },
        { status: 400 }
      )
    }

    if (!grokSettings?.value) {
      return NextResponse.json(
        { error: 'Grok API key not configured. Please add your API key in Admin → Integrations → Grok' },
        { status: 400 }
      )
    }

    const apiKey = grokSettings.value

    // Build context message
    const contextMessage = buildContextMessage(projectContext)

    // Prepare messages for Grok API
    const apiMessages: ChatMessage[] = [
      { role: 'system', content: GROK_SYSTEM_PROMPT },
      { role: 'system', content: contextMessage },
      ...messages
    ]

    // Call x.ai Grok API
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { raw: errorText }
      }
      console.error('Grok API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })
      
      // Provide more specific error messages
      let errorMessage = 'Failed to get response from Grok AI'
      if (response.status === 401) {
        errorMessage = 'Invalid API key. Please check your Grok API key in Admin settings.'
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again in a moment.'
      } else if (response.status === 400) {
        errorMessage = `Bad request: ${errorData?.error?.message || 'Invalid request format'}`
      } else if (response.status >= 500) {
        errorMessage = 'Grok API is temporarily unavailable. Please try again later.'
      }
      
      return NextResponse.json(
        { error: errorMessage, details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response.'

    return NextResponse.json({
      message: assistantMessage,
      usage: data.usage
    })

  } catch (error) {
    console.error('Error in Grok chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function buildContextMessage(context: ProjectContext): string {
  const projectTypeLabels: Record<string, string> = {
    system: 'Backend Application',
    website: 'Website',
    mobile: 'Mobile App',
    ai: 'AI Integration',
    integration: 'Integration'
  }

  const packageLabels: Record<string, string> = {
    small: 'Small (12 features, 1 integration)',
    medium: 'Medium (24 features, 2 integrations)',
    large: 'Large (36 features, 3 integrations)',
    custom: 'Custom (needs quote)'
  }

  const parts: string[] = [
    '## Current Project Context',
    '',
    `**Project Types:** ${context.projectType.map(t => projectTypeLabels[t] || t).join(', ') || 'Not specified'}`,
    '',
    `**Project Description:**`,
    context.description || 'No description provided yet.',
    ''
  ]

  if (context.integrations.length > 0) {
    parts.push(`**Systems to Connect:** ${context.integrations.join(', ')}`)
    parts.push('')
  }

  if (context.aiCapabilities.length > 0) {
    parts.push(`**AI Capabilities Requested:** ${context.aiCapabilities.join(', ')}`)
    parts.push('')
  }

  if (context.integrationTypes.length > 0) {
    parts.push(`**Specific Integrations:** ${context.integrationTypes.join(', ')}`)
    parts.push('')
  }

  if (context.otherApiDetails) {
    parts.push(`**Custom API Details:** ${context.otherApiDetails}`)
    parts.push('')
  }

  if (context.teamSize) {
    parts.push(`**Expected Users:** ${context.teamSize}`)
    parts.push('')
  }

  if (context.packageSize) {
    parts.push(`**User's Package Preference:** ${packageLabels[context.packageSize] || context.packageSize}`)
    parts.push('')
  }

  parts.push('---')
  parts.push('')
  parts.push('Based on this context, help the user refine their project. Analyze what they need, suggest features, and provide a realistic estimate.')

  return parts.join('\n')
}
