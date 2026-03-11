import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Thorbit",
  description: "Terms of Service for Thorbit AI - Read our terms and conditions for using our services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
            Thorbit
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="prose prose-invert prose-orange max-w-none">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-400 mb-1"><strong>Thorbit AI LLC</strong></p>
          <p className="text-gray-400 mb-1"><strong>Effective Date:</strong> January 23, 2026</p>
          <p className="text-gray-400 mb-8"><strong>Last Updated:</strong> January 23, 2026</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing or using Thorbit (&quot;Service,&quot; &quot;Platform,&quot; or &quot;we/us/our&quot;), you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;). If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
          </p>
          <p className="text-gray-300 leading-relaxed font-semibold">
            If you do not agree to these Terms, do not use the Service.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p className="text-gray-300 leading-relaxed">Thorbit is a software-as-a-service (SaaS) platform that provides:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>AI-powered SEO and content analysis tools</li>
            <li>Topical authority mapping and visualization</li>
            <li>Content strategy and brief generation</li>
            <li>Deep research capabilities</li>
            <li>On-page content optimization</li>
            <li>Additional tools and features as we develop and release them</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            We may add, modify, or discontinue features at any time in accordance with Section 9.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration and Security</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account Creation</h3>
          <p className="text-gray-300 leading-relaxed">To use certain features of the Service, you must create an account. You agree to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your information as needed</li>
            <li>Keep your login credentials secure and confidential</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Responsibility</h3>
          <p className="text-gray-300 leading-relaxed">
            You are responsible for all activities that occur under your account. We are not liable for any loss or damage arising from unauthorized use of your account.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Age Requirement</h3>
          <p className="text-gray-300 leading-relaxed">
            You must be at least 18 years old to use this Service. By using the Service, you represent that you meet this requirement.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Collection and Privacy</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Information We Collect</h3>
          <p className="text-gray-300 leading-relaxed"><strong className="text-white">Account Information:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (for demo requests and support)</li>
            <li>Business/Company name</li>
            <li>Billing address (for subscription management)</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4"><strong className="text-white">Usage Data:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>All content, analyses, and outputs you generate using the Service</li>
            <li>Feature usage patterns and preferences</li>
            <li>Session information and activity logs</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.2 What We Do NOT Collect or Store</h3>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Credit card numbers, CVV codes, or full payment credentials.</strong> All payment processing is handled by our third-party payment processor (Stripe). We only receive confirmation of payment status and a tokenized reference.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.3 How We Use Your Information</h3>
          <p className="text-gray-300 leading-relaxed"><strong className="text-white">We WILL use your information to:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process transactions and send related information</li>
            <li>Send marketing communications about Thorbit products and features (you may opt out at any time)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Monitor and analyze usage patterns to improve user experience</li>
            <li>Enforce these Terms and protect the security of our Service</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4"><strong className="text-white">We will NOT:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Sell, rent, or trade your personal information to third parties for their own marketing purposes</li>
            <li>Use your phone number for any purpose other than responding to your expressed communication requests (demo requests, support inquiries, etc.)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.4 Marketing Communications</h3>
          <p className="text-gray-300 leading-relaxed">
            By providing your email address, you consent to receive marketing communications from Thorbit. These communications will be:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Relevant to Thorbit products, features, and services</li>
            <li>Compliant with applicable anti-spam laws (CAN-SPAM, GDPR, etc.)</li>
            <li>Easy to unsubscribe from via a link in every email</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.5 Data Retention</h3>
          <p className="text-gray-300 leading-relaxed">
            We retain your account data and generated content for as long as necessary to fulfill the purposes described in our Privacy Policy, maintain our business operations, comply with legal obligations, resolve disputes, and enforce our agreements. Retention periods vary based on the type of data and our business needs. We may retain certain data indefinitely for legitimate business purposes.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Upon account deletion request, your personal information will be deleted or anonymized in accordance with our data retention practices and applicable law. Generated content may be retained in anonymized form for service improvement. Backup copies may persist for a reasonable period before complete deletion.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            For full details on data retention, please see our Privacy Policy.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Content and Data</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Ownership</h3>
          <p className="text-gray-300 leading-relaxed">
            You retain full ownership of all content you input into the Service and all outputs generated from your inputs (&quot;Your Content&quot;). Thorbit claims no ownership rights over Your Content.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.2 License to Provide Service</h3>
          <p className="text-gray-300 leading-relaxed">
            By using the Service, you grant Thorbit a limited, non-exclusive license to process, store, and display Your Content solely for the purpose of providing the Service to you.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.3 AI Training and Model Development</h3>
          <p className="text-gray-300 leading-relaxed font-semibold">
            We do NOT use Your Content to train AI models without your explicit consent.
          </p>
          <p className="text-gray-300 leading-relaxed">Specifically:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Your research queries, generated content, and analysis data are NOT used to train or fine-tune any AI models</li>
            <li>Your proprietary business information remains confidential</li>
            <li>We may use anonymized, aggregated usage statistics to improve our Service, but this does not include your specific content</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">If we ever wish to use Your Content for AI training purposes, we will:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Obtain your explicit, written consent</li>
            <li>Allow you to opt out at any time</li>
            <li>Provide clear information about how your data would be used</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Data Security</h3>
          <p className="text-gray-300 leading-relaxed">We implement industry-standard security measures to protect Your Content, including:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Encryption in transit (TLS/SSL) and at rest</li>
            <li>Access controls and authentication</li>
            <li>Regular security assessments and monitoring</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            We continually evaluate and may implement additional security measures as appropriate.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Acceptable Use Policy</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Permitted Use</h3>
          <p className="text-gray-300 leading-relaxed">
            You may use the Service only for lawful purposes and in accordance with these Terms. You agree to use the Service for its intended purpose: SEO analysis, content strategy, and related business functions.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Prohibited Conduct</h3>
          <p className="text-gray-300 leading-relaxed">You agree NOT to:</p>

          <p className="text-gray-300 leading-relaxed mt-4"><strong className="text-white">Security Violations:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Attempt to access, probe, or test the vulnerability of our systems or networks</li>
            <li>Attempt to access source code, algorithms, or proprietary technical information</li>
            <li>Use prompt injection, jailbreaking, or similar techniques to bypass security controls or manipulate AI systems</li>
            <li>Attempt to reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Circumvent any security measures or access controls</li>
            <li>Attempt to extract information about our technical infrastructure, databases, or architecture</li>
          </ul>

          <p className="text-gray-300 leading-relaxed mt-4"><strong className="text-white">Harmful Activities:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Transmit malware, viruses, or other malicious code</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorized access to other users&apos; accounts or data</li>
            <li>Use the Service to infringe on intellectual property rights of others</li>
            <li>Generate content that is defamatory, obscene, or promotes illegal activities</li>
          </ul>

          <p className="text-gray-300 leading-relaxed mt-4"><strong className="text-white">Abuse:</strong></p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Exceed rate limits or use automated systems to overload the Service</li>
            <li>Resell, sublicense, or redistribute the Service without authorization</li>
            <li>Use the Service in a manner that could damage our reputation or goodwill</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Consequences of Violations</h3>
          <p className="text-gray-300 leading-relaxed">Violations of this Acceptable Use Policy may result in:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Immediate suspension or termination of your account</li>
            <li>Temporary or permanent lockout from the Service</li>
            <li>Forfeiture of any prepaid fees</li>
            <li>Civil liability for damages, including attorneys&apos; fees</li>
            <li>Referral to law enforcement authorities where appropriate</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">For security violations specifically:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Your account may be immediately locked for a minimum of 24 hours</li>
            <li>You will receive notice of the violation and the specific prohibited conduct detected</li>
            <li>Repeated violations will result in permanent account termination</li>
            <li>We reserve the right to pursue all available legal remedies</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">6.4 Material Breach</h3>
          <p className="text-gray-300 leading-relaxed">
            Any violation of Section 6.2 (Prohibited Conduct), including any attempted or successful circumvention of security, access controls, technical safeguards, or usage limitations, constitutes a material breach of this Agreement. Such breach entitles Thorbit to immediately exercise all remedies available under this Agreement and applicable law.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Our Intellectual Property</h3>
          <p className="text-gray-300 leading-relaxed">
            The Service, including all software, algorithms, designs, text, graphics, logos, and other content provided by Thorbit (&quot;Thorbit IP&quot;), is owned by Thorbit and protected by copyright, trademark, trade secret, and other intellectual property laws.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            You are granted a limited, non-exclusive, non-transferable license to access and use the Service for your internal business purposes, subject to these Terms.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Trade Secrets</h3>
          <p className="text-gray-300 leading-relaxed">
            Our algorithms, technical architecture, code, and business methods constitute trade secrets. Any unauthorized attempt to access, reverse engineer, or disclose these trade secrets may result in civil and criminal liability under the Defend Trade Secrets Act (18 U.S.C. § 1836), state trade secret laws, and the Computer Fraud and Abuse Act (18 U.S.C. § 1030).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Feedback</h3>
          <p className="text-gray-300 leading-relaxed">
            If you provide suggestions, feedback, or ideas about the Service (&quot;Feedback&quot;), you grant us a royalty-free, worldwide, perpetual license to use, modify, and incorporate such Feedback into the Service without obligation to you.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Payment and Subscription</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Subscription Plans</h3>
          <p className="text-gray-300 leading-relaxed">
            Access to certain features requires a paid subscription. Details of available plans and pricing are provided during the registration process and within your account dashboard.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Billing and Auto-Renewal</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Subscriptions are billed monthly or annually in advance depending on the plan selected</li>
            <li>All fees are non-refundable except as expressly stated in these Terms or as required by applicable law</li>
            <li>We may change pricing with 30 days&apos; notice; changes apply at your next billing cycle</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4 uppercase font-semibold">
            AUTOMATIC RENEWAL: YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW AT THE END OF EACH BILLING PERIOD (MONTHLY OR ANNUALLY, AS APPLICABLE) AT THE THEN-CURRENT RATE UNLESS YOU CANCEL BEFORE THE RENEWAL DATE. YOU AUTHORIZE US TO CHARGE YOUR PAYMENT METHOD ON FILE FOR EACH RENEWAL PERIOD UNTIL YOU CANCEL.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            <strong className="text-white">How to Cancel:</strong> You may cancel your subscription at any time through your account settings or by contacting support@thorbit.ai. To avoid being charged for the next billing period, you must cancel at least 24 hours before your renewal date. Cancellation will take effect at the end of your current billing period, and you will retain access to paid features until that date.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Payment Processing</h3>
          <p className="text-gray-300 leading-relaxed">
            Payment processing is handled by Stripe, Inc. By providing payment information, you agree to Stripe&apos;s terms of service. We do not store your full credit card number or CVV.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">8.4 Cancellation and Refunds</h3>
          <p className="text-gray-300 leading-relaxed">You may cancel your subscription at any time through your account settings. Upon cancellation:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>You retain access until the end of your current billing period</li>
            <li>No refunds are provided for partial periods, except as required by applicable law or as expressly provided in this Agreement</li>
            <li>Your data remains accessible for 30 days after cancellation, after which it may be deleted in accordance with our data retention practices</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            If you believe you are entitled to a refund under applicable law, please contact support@thorbit.ai with details of your request.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Service Availability and Modifications</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">9.1 Availability</h3>
          <p className="text-gray-300 leading-relaxed">
            We strive to maintain high availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Scheduled maintenance (we will provide reasonable notice when possible)</li>
            <li>Unscheduled maintenance for critical updates or security patches</li>
            <li>Circumstances beyond our reasonable control</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">9.2 Modifications to Service</h3>
          <p className="text-gray-300 leading-relaxed">We reserve the right to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Modify, update, or discontinue features of the Service at any time</li>
            <li>Change pricing, plans, or feature availability with reasonable notice</li>
            <li>Discontinue the Service entirely with 30 days&apos; notice to active subscribers</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">9.3 Discontinuation</h3>
          <p className="text-gray-300 leading-relaxed">If we discontinue the Service:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>We will provide at least 30 days&apos; notice to active subscribers</li>
            <li>Pro-rated refunds will be provided for unused prepaid subscription periods</li>
            <li>You will have the opportunity to export Your Content before discontinuation</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Third-Party Services and AI Providers</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">10.1 Third-Party Integrations</h3>
          <p className="text-gray-300 leading-relaxed">
            The Service may integrate with third-party services (e.g., Google Search Console, CMS platforms). Your use of these integrations is subject to the respective third-party terms.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">10.2 AI Service Providers</h3>
          <p className="text-gray-300 leading-relaxed">We use third-party AI providers (such as Anthropic, OpenAI, and others) to power certain features. By using the Service, you acknowledge that:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Your queries may be processed by these providers</li>
            <li>We have agreements in place prohibiting these providers from using your data for training their models</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Disclaimer of Warranties</h2>
          <p className="text-gray-300 leading-relaxed uppercase">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4 uppercase">
            <li>MERCHANTABILITY</li>
            <li>FITNESS FOR A PARTICULAR PURPOSE</li>
            <li>NON-INFRINGEMENT</li>
            <li>ACCURACY OR RELIABILITY OF RESULTS</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">We do not warrant that:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>The Service will meet your specific requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>Results obtained from the Service will be accurate or reliable</li>
            <li>Any errors will be corrected</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">11.1 AI-Generated Content Disclaimer</h3>
          <p className="text-gray-300 leading-relaxed uppercase font-semibold">
            IMPORTANT:
          </p>
          <p className="text-gray-300 leading-relaxed">
            The Service uses artificial intelligence and machine learning technologies to generate content, recommendations, analysis, and other outputs. AI-generated outputs may contain errors, inaccuracies, biases, or outdated information. You acknowledge and agree that:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>AI-generated content is provided for informational purposes only and does not constitute professional advice (including but not limited to legal, financial, medical, or business advice)</li>
            <li>You are solely responsible for reviewing, verifying, and validating any AI-generated output before relying on it or publishing it</li>
            <li>AI outputs may not be suitable for your specific circumstances or use case</li>
            <li>We do not guarantee that AI-generated SEO recommendations will result in improved search rankings, traffic, or business outcomes</li>
            <li>AI technology is evolving and outputs may vary over time even for similar inputs</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            You should consult with qualified professionals before making important business decisions based on AI-generated outputs.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">11.2 Third-Party Service Disclaimer</h3>
          <p className="text-gray-300 leading-relaxed">
            The Service relies on third-party services including, but not limited to, AI providers (such as Anthropic and OpenAI), cloud infrastructure providers, payment processors, and analytics services. We are not responsible for the availability, accuracy, or performance of these third-party services. Outages, errors, or changes in third-party services may affect the Service, and we shall not be liable for any damages resulting from third-party service failures or changes.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">11.3 Beta Features</h3>
          <p className="text-gray-300 leading-relaxed">
            From time to time, we may offer beta, preview, or experimental features (&quot;Beta Features&quot;). Beta Features are provided &quot;as is&quot; without any warranties whatsoever. We may modify or discontinue Beta Features at any time without notice. Your use of Beta Features is at your sole risk, and the limitations of liability in this Agreement apply with full force to Beta Features.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            SEO recommendations and content suggestions are provided as guidance only. Results may vary based on factors outside our control, including search engine algorithm changes, competitor activity, and market conditions.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Limitation of Liability</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">12.1 Cap on Liability</h3>
          <p className="text-gray-300 leading-relaxed uppercase">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THORBIT&apos;S TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4 uppercase">
            <li>THE AMOUNTS YOU PAID TO THORBIT IN THE 12 MONTHS PRECEDING THE CLAIM, OR</li>
            <li>ONE HUNDRED DOLLARS ($100)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">12.2 Exclusion of Damages</h3>
          <p className="text-gray-300 leading-relaxed uppercase">
            IN NO EVENT SHALL THORBIT BE LIABLE FOR:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4 uppercase">
            <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
            <li>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</li>
            <li>COST OF SUBSTITUTE SERVICES</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4 uppercase">
            THESE LIMITATIONS APPLY REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF THORBIT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">12.3 Exceptions</h3>
          <p className="text-gray-300 leading-relaxed">The limitations in this section do not apply to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Your breach of the Acceptable Use Policy (Section 6)</li>
            <li>Your infringement of our intellectual property rights</li>
            <li>Your obligation to pay fees owed</li>
            <li>Claims arising from a party&apos;s gross negligence, willful misconduct, or fraud</li>
            <li>Death or personal injury caused by negligence</li>
            <li>Liability that cannot be limited by applicable law</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Indemnification and Enforcement</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">13.1 General Indemnification</h3>
          <p className="text-gray-300 leading-relaxed">
            You agree to indemnify, defend, and hold harmless Thorbit, its officers, directors, employees, contractors, and affiliates from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising from:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Your Content</li>
            <li>Your violation of any applicable laws</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">13.2 Indemnification for Security Violations</h3>
          <p className="text-gray-300 leading-relaxed">
            You agree to defend, indemnify, and hold harmless Thorbit and its officers, directors, employees, contractors, and affiliates from and against any and all claims, losses, liabilities, damages, costs, and expenses, including reasonable attorneys&apos; fees, expert fees, forensic costs, internal investigation time, security monitoring, and remediation efforts, arising out of or relating to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Any breach of this Agreement by you</li>
            <li>Any attempted or actual violation of Section 6.2 (Prohibited Conduct)</li>
            <li>Any unauthorized access, attempted access, or interference with the Service, whether or not such attempt results in actual system compromise or data loss</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            This obligation applies regardless of whether actual damages are ultimately incurred.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">13.3 Reimbursement of Enforcement and Investigation Costs</h3>
          <p className="text-gray-300 leading-relaxed">
            Without limiting its other remedies, Thorbit may recover from you all reasonable costs incurred in investigating, responding to, mitigating, documenting, or enforcing this Agreement in connection with any suspected or actual security violation, including internal labor costs and third-party services.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">13.4 Injunctive and Equitable Relief</h3>
          <p className="text-gray-300 leading-relaxed">
            You acknowledge and agree that any breach or threatened breach of Sections 6.2 (Prohibited Conduct) or 7 (Intellectual Property) may cause irreparable harm for which monetary damages would be an inadequate remedy.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Accordingly, Thorbit shall be entitled to seek immediate injunctive, equitable, or declaratory relief, without the requirement to post bond or other security, in addition to any other remedies available at law or in equity.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">13.5 Attorneys&apos; Fees and Costs</h3>
          <p className="text-gray-300 leading-relaxed">
            In any action or proceeding arising out of or relating to this Agreement or its enforcement, the prevailing party shall be entitled to recover its reasonable attorneys&apos; fees, costs, and expenses from the non-prevailing party.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">13.6 Preservation of Statutory Rights</h3>
          <p className="text-gray-300 leading-relaxed">
            Nothing in this Agreement limits Thorbit&apos;s right to pursue remedies under applicable law, including but not limited to the Computer Fraud and Abuse Act (18 U.S.C. § 1030), the Defend Trade Secrets Act (18 U.S.C. § 1836), or applicable state computer crime statutes.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.1 Governing Law</h3>
          <p className="text-gray-300 leading-relaxed">
            This Agreement shall be governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict-of-laws principles.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.2 Mandatory Arbitration</h3>
          <p className="text-gray-300 leading-relaxed uppercase font-semibold">
            PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            You and Thorbit agree that any dispute, claim, or controversy arising out of or relating to this Agreement or the Service (collectively, &quot;Disputes&quot;) will be resolved exclusively through final and binding arbitration, rather than in court, except that either party may bring a lawsuit in court to enjoin infringement or other misuse of intellectual property rights. This agreement to arbitrate is intended to be broadly interpreted.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Arbitration will be conducted by JAMS under its Comprehensive Arbitration Rules and Procedures, or if JAMS is unavailable, by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration will be conducted in English, and judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction. The arbitrator shall have the authority to award any remedy or relief that would otherwise be available in court.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            The arbitration will take place in Sheridan, Wyoming, or at another mutually agreed location. For claims of $10,000 or less, you may choose whether the arbitration proceeds in person, by telephone, or based solely on written submissions.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Each party shall bear its own costs and fees in arbitration, except that Thorbit will pay arbitration filing fees and arbitrator fees for claims under $75,000 if the arbitrator finds that you cannot afford them and you have made a good faith effort to resolve the dispute informally first.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.3 Class Action and Jury Trial Waiver</h3>
          <p className="text-gray-300 leading-relaxed uppercase">
            YOU AND THORBIT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION. YOU AGREE TO WAIVE ANY RIGHT TO A JURY TRIAL.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Unless both you and Thorbit agree otherwise, the arbitrator may not consolidate more than one person&apos;s claims and may not otherwise preside over any form of a representative, class, or collective proceeding. The arbitrator may award relief only in favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by that party&apos;s individual claim.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.4 Informal Resolution First</h3>
          <p className="text-gray-300 leading-relaxed">
            Before initiating any arbitration or court proceeding, you agree to contact us at support@thorbit.ai and attempt to resolve the dispute informally for at least 30 days. If we are unable to resolve the dispute informally, either party may then proceed with arbitration or court proceedings as applicable.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.5 Exceptions to Arbitration</h3>
          <p className="text-gray-300 leading-relaxed">
            Notwithstanding the above, either party may: (a) bring an individual action in small claims court if the claim qualifies; (b) seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights, trade secrets, or the Acceptable Use Policy, without being required to post bond or other security; or (c) bring claims that cannot be arbitrated as a matter of law.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.6 Opt-Out Right</h3>
          <p className="text-gray-300 leading-relaxed">
            You may opt out of the arbitration and class action waiver provisions by sending written notice to support@thorbit.ai within 30 days of first accepting these Terms. Your notice must include your name, mailing address, email address, and a statement that you wish to opt out of arbitration. If you opt out, the Exclusive Venue and Jurisdiction provision below will apply.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">14.7 Exclusive Venue and Jurisdiction</h3>
          <p className="text-gray-300 leading-relaxed">
            If for any reason arbitration does not apply to a Dispute, or if you have opted out, any legal action or proceeding arising out of or relating to this Agreement shall be brought exclusively in the state or federal courts located within the State of Wyoming, and the parties hereby irrevocably consent to the personal jurisdiction and venue of such courts and waive any objection based on forum non conveniens or improper venue.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Termination</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">15.1 Termination by You</h3>
          <p className="text-gray-300 leading-relaxed">
            You may terminate your account at any time by contacting us or using the account deletion feature in settings.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">15.2 Termination by Us</h3>
          <p className="text-gray-300 leading-relaxed">We may suspend or terminate your account immediately if:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>You violate these Terms, including the Acceptable Use Policy</li>
            <li>We are required to do so by law</li>
            <li>We discontinue the Service</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            We may also terminate your account for any reason with 30 days&apos; notice.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">15.3 Data Export</h3>
          <p className="text-gray-300 leading-relaxed">
            Upon termination or cancellation of your account for any reason, you have the right to export Your Content for a period of 30 days following termination. You may request an export of Your Content by contacting support@thorbit.ai. After the 30-day period, we may delete Your Content in accordance with our data retention practices, and we shall have no obligation to maintain or provide any of Your Content.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">15.4 Effect of Termination</h3>
          <p className="text-gray-300 leading-relaxed">Upon termination:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Your right to use the Service immediately ceases</li>
            <li>You remain liable for any fees owed</li>
            <li>Sections that by their nature should survive will survive (including Sections 5, 6, 7, 11, 12, 13, 14, 15.3, 15.4, 16, and 17)</li>
            <li>Your indemnification obligations under Section 13 survive termination</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">16. Copyright and DMCA</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">16.1 Respect for Intellectual Property</h3>
          <p className="text-gray-300 leading-relaxed">
            Thorbit respects the intellectual property rights of others and expects users to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are properly provided to us.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">16.2 DMCA Notice</h3>
          <p className="text-gray-300 leading-relaxed">
            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible through the Service, please notify our copyright agent with the following information:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>A physical or electronic signature of the copyright owner or authorized agent</li>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the material that is claimed to be infringing, with enough detail so that we may locate it</li>
            <li>Your contact information (address, telephone number, and email address)</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law</li>
            <li>A statement, made under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorized to act on behalf of the owner</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            <strong className="text-white">DMCA Agent:</strong> Copyright Agent, Thorbit AI LLC, 30 N Gould St Ste R, Sheridan, WY 82801. Email: support@thorbit.ai
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">16.3 Counter-Notice</h3>
          <p className="text-gray-300 leading-relaxed">
            If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notice containing: (a) your physical or electronic signature; (b) identification of the content removed and its former location; (c) a statement under penalty of perjury that you have a good faith belief the content was removed by mistake or misidentification; and (d) your name, address, telephone number, and a statement that you consent to the jurisdiction of the federal court in Wyoming and will accept service of process from the person who provided the original notice.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">16.4 Repeat Infringers</h3>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to terminate the accounts of users who are determined to be repeat infringers.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">17. General Provisions</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.1 Entire Agreement</h3>
          <p className="text-gray-300 leading-relaxed">
            These Terms, together with our Privacy Policy and any additional terms for specific features, constitute the entire agreement between you and Thorbit.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.2 Severability</h3>
          <p className="text-gray-300 leading-relaxed">
            If any provision of these Terms is found unenforceable, the remaining provisions will continue in effect.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.3 Waiver</h3>
          <p className="text-gray-300 leading-relaxed">
            Our failure to enforce any right or provision does not constitute a waiver of that right or provision.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.4 Assignment</h3>
          <p className="text-gray-300 leading-relaxed">
            You may not assign these Terms without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.5 Notices</h3>
          <p className="text-gray-300 leading-relaxed">
            We may provide notices to you via email to the address associated with your account or through the Service. Notices are effective upon sending.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.6 Force Majeure</h3>
          <p className="text-gray-300 leading-relaxed">
            We are not liable for delays or failures resulting from circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of government, pandemics, epidemics, public health emergencies, labor disputes, power outages, telecommunications failures, cyber attacks, failures or outages of third-party AI providers or other service providers, internet disruptions, or any other event beyond our reasonable control.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">17.7 Electronic Communications and Acceptance</h3>
          <p className="text-gray-300 leading-relaxed">
            By using the Service, you consent to receive communications from us electronically. You agree that all agreements, notices, disclosures, and other communications that we provide electronically satisfy any legal requirement that such communications be in writing. Your electronic acceptance of this Agreement (such as clicking &quot;I agree,&quot; &quot;Sign up,&quot; or similar) constitutes a legally binding acceptance of these Terms, equivalent to a handwritten signature.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">18. Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">We may modify these Terms at any time. If we make material changes:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>We will notify you via email or through the Service at least 30 days before changes take effect</li>
            <li>Your continued use after changes take effect constitutes acceptance</li>
            <li>If you do not agree to the changes, you must stop using the Service</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">19. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">For questions about these Terms, please contact us:</p>
          <p className="text-gray-300 leading-relaxed mt-4">
            <strong className="text-white">Thorbit AI LLC</strong><br />
            30 N Gould St Ste R<br />
            Sheridan, WY 82801<br /><br />
            Email: support@thorbit.ai<br />
            Website: https://thorbit.ai
          </p>

          <hr className="border-white/10 my-8" />

          <p className="text-gray-500 text-sm">Last updated: January 23, 2026</p>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Thorbit AI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
