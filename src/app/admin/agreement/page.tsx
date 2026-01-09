'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Save, FileText, Eye, Download, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Rich text editor component - simplified version
function RichTextEditor({ value, onChange, placeholder }: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200">
        <div className="flex items-center space-x-2 text-sm text-neutral-600">
          <span>Rich Text Editor</span>
          <Badge variant="outline" className="text-xs">Use variables below</Badge>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-96 p-4 text-sm font-mono resize-none focus:outline-none"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}

export default function AdminAgreementPage() {
  const [template, setTemplate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const { data, error } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'agreement_template')
          .single()

        if (data?.value) {
          setTemplate(data.value)
        } else {
          // Set default template
          setTemplate(getDefaultTemplate())
        }
      } catch (error) {
        console.error('Error fetching template:', error)
        setTemplate(getDefaultTemplate())
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [])

  const getDefaultTemplate = () => {
    return `# AGREEMENT FOR SOFTWARE DEVELOPMENT SERVICES

**Date:** {{current_date}}

**Between:**

**Ceptiv ApS**  
CVR: 37576476  
Maglebjergvej 6  
2800 Kongens Lyngby  
Denmark  
Email: dv@ceptiv.net  
Phone: +45 81 98 32 71  

**And:**

**{{client_company}}**  
{{client_name}}  
{{client_email}}  
{{client_phone}}  

## 1. PROJECT OVERVIEW

### Project Description
{{project_description}}

### Project Type
{{project_types}}

### Selected Package
{{package_name}} ({{package_features}} features, {{package_integrations}} integrations)

### Timeline
{{timeline}}

### Technologies & Integrations
{{selected_integrations}}

## 2. SERVICES AND DELIVERABLES

Ceptiv ApS agrees to provide the following services:

### Development Services
- Custom software development
- Backend application development
- Frontend web development
- Mobile application development (if applicable)
- Third-party integrations
- AI/ML integrations (if applicable)

### Hosting & Maintenance
- Cloud hosting setup
- Security monitoring
- Regular backups
- Bug fixes and updates
- Performance optimization
- Priority support

### Deliverables
- Fully functional software application
- Source code delivery
- Documentation
- Training materials
- Ongoing support and maintenance

## 3. PRICING AND PAYMENT TERMS

### Package Pricing
- **One-time Development Fee:** {{package_onetime}} DKK
- **Monthly Subscription:** {{package_monthly}} DKK/month

### Additional Features
{{additional_features}}

### Payment Terms
- Invoices are issued in Danish Kroner (DKK)
- Payment is due within 14 days of invoice date
- Late payment interest: 1.5% per month (Danish Interest Act)
- All taxes and fees are the responsibility of {{client_company}}

### Billing Cycle
- Monthly subscription begins upon project completion
- Annual billing available with 10% discount

## 4. PROJECT TIMELINE AND MILESTONES

### Development Timeline
{{timeline_description}}

### Key Milestones
1. Project kickoff and requirements finalization
2. Design and architecture planning
3. Development phase
4. Testing and quality assurance
5. Deployment and launch
6. Training and handover
7. Go-live support

### Timeline Dependencies
- Client feedback and approvals
- Third-party API availability
- Integration requirements
- Testing and validation

## 5. INTELLECTUAL PROPERTY

### Ownership Rights
- Upon full payment, {{client_company}} owns the custom deliverables
- Ceptiv ApS retains rights to pre-existing tools and frameworks
- {{client_company}} receives perpetual license to use the delivered solution

### Third-Party Components
- {{client_company}} is responsible for obtaining licenses for third-party integrations
- Ceptiv ApS will notify of any third-party requirements

## 6. CONFIDENTIALITY

Both parties agree to maintain confidentiality of shared information for five years after project completion, except where disclosure is required by law.

## 7. DATA PROTECTION AND GDPR

### Data Processing
- All personal data processing complies with GDPR
- Ceptiv ApS acts as data processor for client data
- Client data is processed securely and only for project purposes

### Data Security
- Encryption in transit and at rest
- Access controls and authentication
- Regular security audits
- Incident response procedures

## 8. WARRANTIES AND LIMITATIONS

### Service Warranty
Ceptiv ApS warrants that services will be delivered in accordance with agreed specifications and applicable Danish standards.

### Limitation of Liability
- Total liability limited to fees paid in preceding 12 months
- No liability for indirect or consequential damages
- Exclusions for gross negligence or willful misconduct

### Force Majeure
Performance delays due to circumstances beyond reasonable control.

## 9. TERMINATION AND CANCELLATION

### Termination Rights
- Either party may terminate with 30 days written notice
- Immediate termination for material breach
- Termination does not relieve payment obligations

### Early Cancellation Fees
- Within first 24 months: {{early_cancellation_fee}} DKK
- After 24 months: No penalty

### Post-Termination
- Outstanding payments remain due
- Source code and data will be delivered
- Support continues for 30 days

## 10. SUPPORT AND MAINTENANCE

### Included Support
- Bug fixes and security updates
- Performance monitoring
- Priority email support
- Monthly maintenance hours: {{monthly_support_hours}}

### Additional Support
- Premium support packages available
- Emergency support: +45 81 98 32 71
- Response time: Within 24 hours

## 11. DISPUTE RESOLUTION

### Governing Law
This agreement is governed by Danish law.

### Dispute Resolution
- First instance: Copenhagen City Court
- Mediation encouraged before litigation
- Arbitration available upon mutual agreement

## 12. GENERAL PROVISIONS

### Entire Agreement
This agreement constitutes the entire understanding between parties.

### Amendments
Changes must be made in writing and signed by both parties.

### Severability
Invalid provisions do not affect agreement validity.

### Assignment
Neither party may assign rights without written consent.

## 13. ACCEPTANCE AND SIGNATURE

This agreement is effective upon signature by both parties.

**Ceptiv ApS**  
_______________________________  
Daniel Vestergaard  
CEO  
Date: {{current_date}}

**{{client_company}}**  
_______________________________  
{{client_name}}  
{{client_title}}  
Date: __________________

---

*This agreement template is generated by Ceptiv ApS and reflects the agreed terms between the parties.*`
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await supabase
        .from('cap_settings')
        .upsert({ key: 'agreement_template', value: template }, { onConflict: 'key' })

      alert('Agreement template saved successfully!')
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Failed to save template.')
    } finally {
      setIsSaving(false)
    }
  }

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset to the default template? This will overwrite your current template.')) {
      setTemplate(getDefaultTemplate())
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading agreement template...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Agreement Templates</h1>
        <p className="text-neutral-600 mt-2">
          Create and manage agreement templates for project proposals. Use the variables below to personalize each agreement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Agreement Template</span>
              </CardTitle>
              <CardDescription>
                Edit the agreement template using the variables listed below. The template will be used when generating project agreements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={template}
                onChange={setTemplate}
                placeholder="Enter your agreement template here..."
              />

              <div className="flex items-center space-x-3 mt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Template
                    </>
                  )}
                </Button>

                <Button variant="outline" onClick={resetToDefault}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Variables Reference */}
        <div className="space-y-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Template Formatting Guide</CardTitle>
              <CardDescription>
                Use Markdown formatting to create professional-looking agreements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Headlines & Structure</h4>
                  <div className="space-y-1 text-xs bg-neutral-50 p-3 rounded">
                    <div><code className="bg-white px-1 py-0.5 rounded"># Title</code> → Main title (large, bold)</div>
                    <div><code className="bg-white px-1 py-0.5 rounded">## Title</code> → Section header (large, bold)</div>
                    <div><code className="bg-white px-1 py-0.5 rounded">### Title</code> → Subsection header (medium, bold)</div>
                    <div><code className="bg-white px-1 py-0.5 rounded">#### Title</code> → Sub-subsection header (smaller, bold)</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Text Formatting</h4>
                  <div className="space-y-1 text-xs bg-neutral-50 p-3 rounded">
                    <div><code className="bg-white px-1 py-0.5 rounded">**bold text**</code> → <strong>bold text</strong></div>
                    <div><code className="bg-white px-1 py-0.5 rounded">*italic text*</code> → <em>italic text</em></div>
                    <div><code className="bg-white px-1 py-0.5 rounded">{'{variable}'}</code> → replaced with actual values</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Lists & Structure</h4>
                  <div className="space-y-1 text-xs bg-neutral-50 p-3 rounded">
                    <div><code className="bg-white px-1 py-0.5 rounded">1. Item</code> → Numbered list</div>
                    <div><code className="bg-white px-1 py-0.5 rounded">- Item</code> → Bullet list</div>
                    <div><code className="bg-white px-1 py-0.5 rounded">---</code> → Horizontal line separator</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Best Practices</h4>
                  <ul className="text-xs space-y-1 text-neutral-700">
                    <li>• Use # only once for the main agreement title</li>
                    <li>• Use ## for main sections (1. PROJECT OVERVIEW, 2. SERVICES, etc.)</li>
                    <li>• Use ### for subsections within each main section</li>
                    <li>• Add empty lines between sections for readability</li>
                    <li>• Use **bold** for important terms, company names, dates</li>
                    <li>• Always use variables like {'{client_name}'} for dynamic content</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Variables</CardTitle>
              <CardDescription>
                Use these variables in your template. They will be automatically replaced with actual values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-2">Client Information</h4>
                  <div className="space-y-1 text-xs">
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{client_name}'}</code> - Client full name</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{client_email}'}</code> - Client email</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{client_company}'}</code> - Company name</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{client_phone}'}</code> - Phone number</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{client_title}'}</code> - Job title</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-2">Project Details</h4>
                  <div className="space-y-1 text-xs">
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{project_description}'}</code> - Project description</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{project_types}'}</code> - Selected project types</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{selected_integrations}'}</code> - Required integrations</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{ai_capabilities}'}</code> - AI requirements</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{team_size}'}</code> - Team size estimate</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-2">Package & Pricing</h4>
                  <div className="space-y-1 text-xs">
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{package_name}'}</code> - Package name (Small/Medium/Large)</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{package_features}'}</code> - Number of features</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{package_integrations}'}</code> - Number of integrations</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{package_onetime}'}</code> - One-time fee (DKK)</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{package_monthly}'}</code> - Monthly fee (DKK)</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-2">Timeline & Dates</h4>
                  <div className="space-y-1 text-xs">
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{timeline}'}</code> - Selected timeline</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{timeline_description}'}</code> - Timeline details</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{current_date}'}</code> - Today's date</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{project_start_date}'}</code> - Estimated start date</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-2">Additional Features</h4>
                  <div className="space-y-1 text-xs">
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{additional_features}'}</code> - Extra features list</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{additional_features_cost}'}</code> - Extra features cost</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{early_cancellation_fee}'}</code> - Cancellation fee</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{monthly_support_hours}'}</code> - Support hours included</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 mb-2">Company Information</h4>
                  <div className="space-y-1 text-xs">
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{company_name}'}</code> - Ceptiv ApS</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{company_cvr}'}</code> - CVR number</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{company_address}'}</code> - Company address</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{company_email}'}</code> - Company email</div>
                    <div><code className="bg-neutral-100 px-1 py-0.5 rounded">{'{company_phone}'}</code> - Company phone</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview & Export</CardTitle>
              <CardDescription>
                Test your template with sample data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Template
                </Button>

                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}