'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfServicePage() {
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
            Terms of Service
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
                  <strong>Important:</strong> These Terms govern your engagement with Ceptiv ApS for custom software development services.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">About Ceptiv ApS</h2>
            <p className="text-neutral-700 mb-4">
              These Terms of Service govern your engagement with Ceptiv ApS, part of Acenta Group ApS, with CVR number 37576476 and located at Maglebjergvej 6, 2800 Kongens Lyngby, Denmark. The services include custom software development such as backend applications, websites, mobile apps, AI integrations, third-party connections, ongoing maintenance, and access to the Client panel.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="font-medium text-neutral-900 mb-2">Agreement Acceptance:</p>
              <p className="text-neutral-700 text-sm">
                By requesting a quote, starting the project initiation process, or proceeding with any services, you agree to these Terms. If you are acting on behalf of a company or other entity, you confirm that you have the authority to bind that entity to these Terms. The agreement is governed exclusively by Danish law.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Services</h2>
            <p className="text-neutral-700 mb-6">
              Ceptiv ApS delivers fully custom digital solutions built from scratch, without relying on templates or pre-existing platforms. We provide predefined starter packages and custom solutions tailored to your specific needs.
            </p>

            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Starter Packages</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h4 className="text-lg font-bold text-neutral-900 mb-3">Small Package</h4>
                <div className="space-y-2 text-sm text-neutral-700">
                  <p><strong>One-time fee:</strong> 18,000 DKK</p>
                  <p><strong>Monthly fee:</strong> 600 DKK</p>
                  <p><strong>Features:</strong> Up to 12</p>
                  <p><strong>Integrations:</strong> 1</p>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h4 className="text-lg font-bold text-neutral-900 mb-3">Medium Package</h4>
                <div className="space-y-2 text-sm text-neutral-700">
                  <p><strong>One-time fee:</strong> 36,000 DKK</p>
                  <p><strong>Monthly fee:</strong> 900 DKK</p>
                  <p><strong>Features:</strong> Up to 24</p>
                  <p><strong>Integrations:</strong> 2</p>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h4 className="text-lg font-bold text-neutral-900 mb-3">Large Package</h4>
                <div className="space-y-2 text-sm text-neutral-700">
                  <p><strong>One-time fee:</strong> 54,000 DKK</p>
                  <p><strong>Monthly fee:</strong> 1,200 DKK</p>
                  <p><strong>Features:</strong> Up to 36</p>
                  <p><strong>Integrations:</strong> 3</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <h4 className="font-semibold text-green-900 mb-2">Additional Features</h4>
              <p className="text-green-800 text-sm">
                Additional features beyond package allowances cost 2,500 DKK each. Unused features roll over for future use at no extra cost.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-neutral-900 mb-4 mt-8">Custom Solutions</h3>
            <p className="text-neutral-700">
              For projects exceeding starter package scopes, requiring more features, complex integrations, or multiple systems, we offer fully custom quotes and packages tailored to your specific needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Project Process</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Project Submission</h3>
                  <p className="text-neutral-700">You submit your project details through our website.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Review & Quote</h3>
                  <p className="text-neutral-700">We review your requirements and provide a detailed quote or proposal within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Collaborative Review</h3>
                  <p className="text-neutral-700">Both parties engage in a review and approval stage where scope, features, timeline, and pricing are discussed, refined, and mutually agreed upon.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Project Execution</h3>
                  <p className="text-neutral-700">Only after mutual agreement is reached does the project proceed, with payments becoming due as specified.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your Responsibilities</h2>
            <ul className="space-y-3 text-neutral-700">
              <li><strong>Accurate Information:</strong> Provide accurate and complete information about your requirements</li>
              <li><strong>Timely Feedback:</strong> Offer timely feedback and approvals during the project</li>
              <li><strong>Legal Compliance:</strong> Comply with all applicable laws and regulations</li>
              <li><strong>Payment Terms:</strong> Make payments on time according to the agreed schedule</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Payment Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Invoicing & Payment</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Invoices are issued in Danish Kroner (DKK)</li>
                  <li>Payment is due within 14 days unless otherwise agreed</li>
                  <li>VAT and other applicable taxes are your responsibility</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Late Payment</h3>
                <p className="text-neutral-700">In case of late payment, interest accrues at 1.5 percent per month in accordance with the Danish Interest Act.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cancellation & Termination</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Early Cancellation</h3>
                <p className="text-neutral-700 mb-2">Early cancellation within the first 24 months incurs a one-time fee:</p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li><strong>Small package:</strong> 9,000 DKK</li>
                  <li><strong>Medium package:</strong> 12,000 DKK</li>
                  <li><strong>Large package:</strong> 15,000 DKK</li>
                </ul>
                <p className="text-neutral-700 text-sm mt-2">30 days' notice is required for cancellation.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">After 24 Months</h3>
                <p className="text-neutral-700">After the initial 24-month commitment period, cancellation is free of penalty with 30 days' notice.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Termination Rights</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>You may terminate with 30 days' notice after the initial commitment period</li>
                  <li>We may terminate for material breach after providing 14 days to remedy the issue</li>
                  <li>Upon termination, you must settle all outstanding amounts</li>
                  <li>We will deliver code and data to facilitate smooth transition</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Your Rights</h3>
                <p className="text-neutral-700">Upon full payment, you own the custom deliverables we create specifically for your project.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Our Rights</h3>
                <p className="text-neutral-700">We retain rights to pre-existing tools, code frameworks, and methodologies used in development.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">License Grant</h3>
                <p className="text-neutral-700">We grant you a perpetual license to use the delivered solutions for your ongoing business needs.</p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <p className="text-amber-800">
                  <strong>Third-Party Licenses:</strong> You remain responsible for obtaining any necessary third-party licenses for integrations.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Confidentiality</h2>
            <p className="text-neutral-700">
              Both parties agree to maintain confidentiality of shared information for five years after termination, except where disclosure is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Protection</h2>
            <p className="text-neutral-700 mb-4">
              Data processing occurs in accordance with our separate Privacy Policy, which forms an integral part of these Terms. Ceptiv ApS complies fully with GDPR and Danish data protection law.
            </p>
            <p className="text-neutral-700">
              You warrant that any data you provide complies with relevant regulations and that you have obtained all necessary consents for data processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Warranties & Liability</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Service Warranty</h3>
                <p className="text-neutral-700">We warrant that services will be delivered in accordance with the agreed specifications and applicable Danish standards.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Disclaimer</h3>
                <p className="text-neutral-700">Beyond the service warranty, no other warranties are provided. Implied warranties are disclaimed to the fullest extent permitted by law.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Liability Limitations</h3>
                <ul className="list-disc pl-6 text-neutral-700 space-y-1">
                  <li>Liability is limited to the total fees paid in the preceding 12 months</li>
                  <li>Indirect or consequential damages such as lost profits are excluded</li>
                  <li>Exceptions apply only for gross negligence</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Force Majeure</h3>
                <p className="text-neutral-700">Force majeure events excuse performance delays and may include circumstances beyond reasonable control.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Dispute Resolution</h2>
            <p className="text-neutral-700 mb-4">
              Any disputes are governed by Danish law, excluding conflict of laws principles, and will be resolved in the first instance by the Copenhagen City Court or the Maritime and Commercial Court if applicable.
            </p>
            <p className="text-neutral-700">
              The parties agree to attempt mediation before litigation whenever possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">General Provisions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Entire Agreement</h3>
                <p className="text-neutral-700">These Terms constitute the entire agreement between the parties and can only be modified in writing.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Severability</h3>
                <p className="text-neutral-700">If any provision is found invalid, the remaining provisions remain in effect.</p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Assignment</h3>
                <p className="text-neutral-700">Assignment requires mutual consent except in the case of affiliates.</p>
              </div>
            </div>
          </section>

          <div className="bg-neutral-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contact Information</h3>
            <p className="text-neutral-700 mb-4">
              For any questions about these Terms of Service, please contact us:
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
            <p className="text-neutral-600 text-sm mt-4">
              These Terms are fully aligned with Danish contract law and standard practices in the IT services sector.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}