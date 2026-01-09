'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-600 mb-2">
            Ceptiv ApS - Part of Acenta Group ApS
          </p>
          <p className="text-sm text-neutral-500">
            Effective Date: January 09, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Important:</strong> Ceptiv ApS is fully committed to protecting your personal data in accordance with GDPR and Danish data protection law.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">About Ceptiv ApS</h2>
            <p className="text-neutral-700 mb-4">
              Ceptiv ApS operates as part of Acenta Group ApS with CVR number 37576476 and is located at Maglebjergvej 6, 2800 Kongens Lyngby, Denmark. The company processes personal data in strict accordance with the EU General Data Protection Regulation (GDPR), the Danish Data Protection Act, and the ePrivacy Directive as implemented in Denmark. Ceptiv ApS serves as the data controller for all personal data collected and processed.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="font-medium text-neutral-900 mb-2">Contact Information:</p>
              <ul className="text-neutral-700 space-y-1">
                <li><strong>Email:</strong> dv@ceptiv.net</li>
                <li><strong>Phone:</strong> +45 81 98 32 71</li>
                <li><strong>Address:</strong> Maglebjergvej 6, 2800 Kongens Lyngby, Denmark</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your Rights</h2>
            <p className="text-neutral-700 mb-4">
              If you wish, you have the right to file a complaint directly with the Danish Data Protection Agency (Datatilsynet) at dt@datatilsynet.dk or through their website at www.datatilsynet.dk.
            </p>
            <p className="text-neutral-700 mb-4">
              You have extensive rights under the GDPR and Danish law, including the right to access your data, request rectification of inaccuracies, demand erasure when data is no longer needed, restrict processing in specific circumstances, object to processing based on legitimate interests or for marketing purposes, and receive your data in a portable format. You can withdraw consent at any time without affecting the lawfulness of prior processing. All requests are handled free of charge unless they are manifestly excessive, and the company responds within one month.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">What Personal Data We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Data You Provide Directly</h3>
                <p className="text-neutral-700 mb-2">When you request a quote, initiate a project, or communicate with our team, we collect:</p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Name, email address, phone number</li>
                  <li>Company name and job title</li>
                  <li>Billing address</li>
                  <li>Business and project-related data (descriptions of needs, required integrations)</li>
                  <li>Payment details for invoicing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Automatically Collected Data</h3>
                <p className="text-neutral-700 mb-2">Through tools like Google Analytics, we gather usage data including:</p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Anonymized IP address</li>
                  <li>Browser type and device information</li>
                  <li>Visited pages and interaction patterns</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Client Panel Data</h3>
                <p className="text-neutral-700">When you access the Client panel, we process login credentials and project status updates.</p>
              </div>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
              <p className="text-amber-800">
                <strong>Note:</strong> We do not collect sensitive personal data unless it is strictly necessary for a specific project and you provide explicit consent.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Collect Your Data</h2>
            <ul className="space-y-3 text-neutral-700">
              <li><strong>Direct Collection:</strong> Through website forms, emails, phone calls, or project consultations</li>
              <li><strong>Automatic Collection:</strong> Via cookies and analytics tools on our website</li>
              <li><strong>Third-Party Sources:</strong> From payment processors when you authorize such sharing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Use Your Data</h2>
            <p className="text-neutral-700 mb-4">We process your personal data for several clearly defined purposes with appropriate legal bases under the GDPR:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-2">Service Delivery</h3>
                <p className="text-sm text-neutral-700">Providing and managing services, delivering custom software solutions, handling integrations, maintenance, and project/subscription management through the Client panel.</p>
                <p className="text-xs text-neutral-500 mt-2"><strong>Legal Basis:</strong> Performance of contract or legitimate interests</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-2">Quotes & Proposals</h3>
                <p className="text-sm text-neutral-700">Processing offers and quotes within 24 hours of your request.</p>
                <p className="text-xs text-neutral-500 mt-2"><strong>Legal Basis:</strong> Legitimate interests</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-2">Analytics & Improvements</h3>
                <p className="text-sm text-neutral-700">Website analytics and service improvements using Google Analytics with IP anonymization and Consent Mode.</p>
                <p className="text-xs text-neutral-500 mt-2"><strong>Legal Basis:</strong> Consent or legitimate interests</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-semibold text-neutral-900 mb-2">Legal Compliance</h3>
                <p className="text-sm text-neutral-700">Meeting legal obligations such as five-year bookkeeping requirements and implementing security measures.</p>
                <p className="text-xs text-neutral-500 mt-2"><strong>Legal Basis:</strong> Legal obligations or legitimate interests</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
              <p className="text-green-800">
                <strong>Marketing:</strong> Marketing communications occur only with your explicit consent.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Sharing & International Transfers</h2>
            <p className="text-neutral-700 mb-4">We share personal data only when necessary and with appropriate safeguards:</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Trusted Processors</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li><strong>Vercel:</strong> For website hosting</li>
                  <li><strong>Stripe:</strong> For payment processing</li>
                  <li><strong>Google:</strong> For analytics services</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Legal Requirements</h3>
                <p className="text-neutral-700">Data may be shared within the Acenta Group ApS for internal operations or with authorities if required by Danish or EU law.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">International Data Transfers</h3>
                <p className="text-neutral-700 mb-2">For Google Analytics, transfers to the United States are protected by:</p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Google's certification under the EU-US Data Privacy Framework</li>
                  <li>Standard Contractual Clauses</li>
                  <li>IP anonymization and limited data retention (up to 14 months)</li>
                  <li>Additional pseudonymization measures</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <p className="text-red-800">
                <strong>Important:</strong> We never sell personal data to third parties.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cookies & Tracking</h2>
            <p className="text-neutral-700 mb-4">Our website uses cookies for essential functionality and non-essential analytics through Google Analytics.</p>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">Cookie Compliance</h3>
              <p className="text-neutral-700 text-sm">
                Non-essential cookies are placed only after you provide prior, granular, informed, and active consent via a clear cookie banner that allows easy rejection or withdrawal at any time. This is in full compliance with Danish guidelines from Datatilsynet and Digitaliseringsstyrelsen.
              </p>
              <p className="text-neutral-700 text-sm mt-2">
                Essential cookies for session management do not require consent.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Retention</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                <span className="font-medium text-neutral-900">Project & Contract Data</span>
                <span className="text-neutral-700">Up to 5 years after termination</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                <span className="font-medium text-neutral-900">Analytics Data</span>
                <span className="text-neutral-700">Up to 14 months</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                <span className="font-medium text-neutral-900">Marketing Data</span>
                <span className="text-neutral-700">Until consent withdrawal</span>
              </div>
            </div>
            <p className="text-neutral-700 mt-4">
              All data is securely deleted or anonymized once the retention period ends.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Security</h2>
            <p className="text-neutral-700 mb-4">We implement robust technical and organizational security measures in accordance with GDPR Article 32, including:</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Strict access controls and authentication</li>
              <li>Regular security backups</li>
              <li>Pseudonymization where appropriate</li>
            </ul>
            <p className="text-neutral-700 mt-4">
              In the event of a personal data breach, we notify Datatilsynet within 72 hours if the breach poses a high risk and inform affected individuals when required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Policy Updates</h2>
            <p className="text-neutral-700">
              This Privacy Policy may be updated from time to time. Changes will be posted on the website along with the new effective date. Significant updates will be communicated via email or prominent notice on the site.
            </p>
          </section>

          <div className="bg-neutral-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contact Us About Your Data</h3>
            <p className="text-neutral-700 mb-4">
              For any questions about this Privacy Policy or to exercise your data protection rights, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-neutral-900">Ceptiv ApS</p>
                <p className="text-neutral-700">Maglebjergvej 6</p>
                <p className="text-neutral-700">2800 Kongens Lyngby, Denmark</p>
              </div>
              <div>
                <p className="text-neutral-700"><strong>Email:</strong> dv@ceptiv.net</p>
                <p className="text-neutral-700"><strong>Phone:</strong> +45 81 98 32 71</p>
                <p className="text-neutral-700"><strong>CVR:</strong> 37576476</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}