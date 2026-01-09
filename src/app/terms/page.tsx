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

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">About Ceptiv ApS</h2>
            <p className="text-neutral-700 mb-4">
              These Terms of Service govern your engagement with Ceptiv ApS, part of Acenta Group ApS, with CVR number 37576476 and located at Maglebjergvej 6, 2800 Kongens Lyngby, Denmark. The services include custom software development such as backend applications, websites, mobile apps, AI integrations, third-party connections, ongoing maintenance, and access to the Client panel.
            </p>
            <p className="text-neutral-700 mb-4">
              By requesting a quote, starting the project initiation process, or proceeding with any services, you agree to these Terms. If you are acting on behalf of a company or other entity, you confirm that you have the authority to bind that entity to these Terms. The agreement is governed exclusively by Danish law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Services</h2>
            <p className="text-neutral-700 mb-4">
              Ceptiv ApS delivers fully custom digital solutions built from scratch, without relying on templates or pre-existing platforms. We provide predefined starter packages that include a one-time setup fee for development and a monthly subscription for hosting, maintenance, security updates, bug fixes, monitoring, backups, and priority support.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Starter Packages</h3>
            <p className="text-neutral-700 mb-3">
              These packages are Small at 18,000 DKK one-time plus 600 DKK per month for 12 features and 1 integration, Medium at 36,000 DKK one-time plus 900 DKK per month for 24 features and 2 integrations, and Large at 54,000 DKK one-time plus 1,200 DKK per month for 36 features and 3 integrations.
            </p>
            <p className="text-neutral-700 mb-4">
              Additional features beyond the package allowance cost 2,500 DKK each, with unused features rolling over for future use at no extra cost.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">Custom Solutions</h3>
            <p className="text-neutral-700">
              For projects exceeding these scopes, requiring more features, complex integrations, or multiple systems, we offer fully custom quotes and packages tailored to your needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Project Process</h2>
            <p className="text-neutral-700 mb-3">
              The process begins when you submit your project details through the website. We review your requirements and provide a detailed quote or proposal within 24 hours.
            </p>
            <p className="text-neutral-700 mb-3">
              Both parties then engage in a collaborative review and approval stage, during which the scope, features, timeline, and pricing are discussed, refined, and mutually agreed upon.
            </p>
            <p className="text-neutral-700">
              Only after this agreement is reached does the project proceed, with any payments becoming due as specified in the finalized agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your Responsibilities</h2>
            <p className="text-neutral-700 mb-3">
              You are responsible for providing accurate information, offering timely feedback during the project, complying with all applicable laws, and making payments on time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Payment Terms</h2>
            <p className="text-neutral-700 mb-3">
              Invoices are issued in Danish Kroner and are due within 14 days unless otherwise agreed. VAT and other applicable taxes are your responsibility.
            </p>
            <p className="text-neutral-700">
              In case of late payment, interest accrues at 1.5 percent per month in accordance with the Danish Interest Act.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cancellation & Termination</h2>
            <p className="text-neutral-700 mb-3">
              Early cancellation within the first 24 months incurs a one-time fee of 9,000 DKK for Small, 12,000 DKK for Medium, or 15,000 DKK for Large packages, with 30 days' notice required.
            </p>
            <p className="text-neutral-700 mb-3">
              After 24 months, cancellation is free of penalty with 30 days' notice.
            </p>
            <p className="text-neutral-700 mb-3">
              You may terminate with 30 days' notice after the initial commitment period. We may terminate for material breach after providing 14 days to remedy the issue.
            </p>
            <p className="text-neutral-700">
              Upon termination, you must settle all outstanding amounts, and we will deliver the code and data to facilitate transition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Intellectual Property</h2>
            <p className="text-neutral-700 mb-3">
              Upon full payment, you own the custom deliverables we create specifically for your project, while we retain rights to pre-existing tools, code frameworks, and methodologies.
            </p>
            <p className="text-neutral-700 mb-3">
              We grant you a perpetual license to use these solutions for your ongoing business needs.
            </p>
            <p className="text-neutral-700">
              You remain responsible for obtaining any necessary third-party licenses for integrations.
            </p>
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
            <p className="text-neutral-700 mb-3">
              We warrant that services will be delivered in accordance with the agreed specifications and applicable Danish standards.
            </p>
            <p className="text-neutral-700 mb-3">
              Beyond this, no other warranties are provided, and implied warranties are disclaimed to the fullest extent permitted by law.
            </p>
            <p className="text-neutral-700 mb-3">
              Liability is limited to the total fees paid in the preceding 12 months, and indirect or consequential damages such as lost profits are excluded unless arising from gross negligence.
            </p>
            <p className="text-neutral-700">
              Force majeure events excuse performance delays.
            </p>
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
            <p className="text-neutral-700 mb-3">
              These Terms constitute the entire agreement between the parties and can only be modified in writing.
            </p>
            <p className="text-neutral-700 mb-3">
              If any provision is found invalid, the remaining provisions remain in effect.
            </p>
            <p className="text-neutral-700">
              Assignment requires mutual consent except in the case of affiliates.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Information</h2>
            <p className="text-neutral-700 mb-4">
              For any questions about these Terms of Service, please contact Ceptiv ApS at Maglebjergvej 6, 2800 Kongens Lyngby, Denmark. Email: dv@ceptiv.net, Phone: +45 81 98 32 71, CVR: 37576476.
            </p>
            <p className="text-neutral-700">
              These Terms are fully aligned with Danish contract law and standard practices in the IT services sector.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}