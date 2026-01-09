'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200">
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
        <div className="max-w-none">

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">About Ceptiv ApS</h2>
            <p className="text-neutral-700 mb-4">
              Ceptiv ApS operates as part of Acenta Group ApS with CVR number 37576476 and is located at Maglebjergvej 6, 2800 Kongens Lyngby, Denmark. The company processes personal data in strict accordance with the EU General Data Protection Regulation (GDPR), the Danish Data Protection Act, and the ePrivacy Directive as implemented in Denmark. Ceptiv ApS serves as the data controller for all personal data collected and processed.
            </p>
            <p className="text-neutral-700 mb-4">
              Contact Information: Email: dv@ceptiv.net, Phone: +45 81 98 32 71, Address: Maglebjergvej 6, 2800 Kongens Lyngby, Denmark.
            </p>
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
            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Data You Provide Directly</h3>
            <p className="text-neutral-700 mb-4">
              When you request a quote, initiate a project, or communicate with our team, we collect your name, email address, phone number, company name, job title, billing address, business and project-related data such as descriptions of your needs and required integrations, and payment details for invoicing.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Automatically Collected Data</h3>
            <p className="text-neutral-700 mb-4">
              Through tools like Google Analytics, we gather usage data including your anonymized IP address, browser type, device information, visited pages, and interaction patterns on the website.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Client Panel Data</h3>
            <p className="text-neutral-700 mb-4">
              When you access the Client panel, we process login credentials and project status updates.
            </p>

            <p className="text-neutral-700">
              We do not collect sensitive personal data unless it is strictly necessary for a specific project and you provide explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Collect Your Data</h2>
            <p className="text-neutral-700 mb-3">
              Personal data is collected directly from you through website forms, emails, phone calls, or project consultations.
            </p>
            <p className="text-neutral-700 mb-3">
              It is also gathered automatically via cookies and analytics tools on the website.
            </p>
            <p className="text-neutral-700">
              In some cases, data comes from third parties such as payment processors when you authorize such sharing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">How We Use Your Data</h2>
            <p className="text-neutral-700 mb-4">
              We process your personal data for several clearly defined purposes with appropriate legal bases under the GDPR.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Service Delivery</h3>
            <p className="text-neutral-700 mb-4">
              The primary purpose is to provide and manage the services, including delivering custom software solutions, handling integrations, performing maintenance, and overseeing projects and subscriptions through the Client panel. This is based on the performance of a contract or legitimate interests.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Quotes and Proposals</h3>
            <p className="text-neutral-700 mb-4">
              Processing offers and quotes within 24 hours is based on legitimate interests.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Analytics and Improvements</h3>
            <p className="text-neutral-700 mb-4">
              Website analytics and service improvements, including the use of Google Analytics with IP anonymization and Consent Mode, are based on your consent or legitimate interests.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Legal Compliance</h3>
            <p className="text-neutral-700 mb-4">
              Compliance with legal obligations such as five-year bookkeeping requirements and security measures are based on legal obligations or legitimate interests.
            </p>

            <p className="text-neutral-700">
              Marketing communications occur only with your consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Sharing & International Transfers</h2>
            <p className="text-neutral-700 mb-4">
              We share personal data only when necessary and with appropriate safeguards.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Trusted Processors</h3>
            <p className="text-neutral-700 mb-4">
              Data is shared with trusted processors such as Vercel for hosting, Stripe for payments, and Google for analytics.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Legal Requirements</h3>
            <p className="text-neutral-700 mb-4">
              It may also be shared within the Acenta Group ApS for internal operations or with authorities if required by Danish or EU law.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">International Data Transfers</h3>
            <p className="text-neutral-700 mb-4">
              For Google Analytics, transfers to the United States are protected by Google's certification under the EU-US Data Privacy Framework, supplemented by Standard Contractual Clauses, IP anonymization, limited data retention of up to 14 months, and additional pseudonymization measures.
            </p>

            <p className="text-neutral-700">
              We never sell personal data to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cookies & Tracking</h2>
            <p className="text-neutral-700 mb-4">
              Our website uses cookies for essential functionality and non-essential analytics through Google Analytics.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Cookie Compliance</h3>
            <p className="text-neutral-700 mb-3">
              Non-essential cookies are placed only after you provide prior, granular, informed, and active consent via a clear cookie banner that allows easy rejection or withdrawal at any time. This is in full compliance with Danish guidelines from Datatilsynet and Digitaliseringsstyrelsen.
            </p>
            <p className="text-neutral-700">
              Essential cookies for session management do not require consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Retention</h2>
            <p className="text-neutral-700 mb-3">
              Personal data is retained only as long as necessary.
            </p>
            <p className="text-neutral-700 mb-3">
              Project and contract-related data is kept for up to five years after termination to meet Danish bookkeeping obligations.
            </p>
            <p className="text-neutral-700 mb-3">
              Analytics data is retained for up to 14 months in line with Google settings.
            </p>
            <p className="text-neutral-700 mb-3">
              Marketing data is kept until you withdraw consent.
            </p>
            <p className="text-neutral-700">
              All data is securely deleted or anonymized once the retention period ends.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data Security</h2>
            <p className="text-neutral-700 mb-4">
              We implement robust technical and organizational security measures in accordance with GDPR Article 32, including encryption of data in transit and at rest, strict access controls and authentication, regular security backups, and pseudonymization where appropriate.
            </p>
            <p className="text-neutral-700">
              In the event of a personal data breach, we notify Datatilsynet within 72 hours if the breach poses a high risk and inform affected individuals when required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Policy Updates</h2>
            <p className="text-neutral-700">
              This Privacy Policy may be updated from time to time. Changes will be posted on the website along with the new effective date. Significant updates will be communicated via email or prominent notice on the site.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us About Your Data</h2>
            <p className="text-neutral-700 mb-4">
              For any questions about this Privacy Policy or to exercise your data protection rights, please contact us at Ceptiv ApS, Maglebjergvej 6, 2800 Kongens Lyngby, Denmark. Email: dv@ceptiv.net, Phone: +45 81 98 32 71, CVR: 37576476.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}