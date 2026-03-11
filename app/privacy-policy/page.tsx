import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Thorbit",
  description: "Privacy Policy for Thorbit AI - Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-400 mb-2"><strong>Thorbit AI LLC</strong></p>
          <p className="text-gray-400 mb-8"><strong>Effective: January 23, 2026</strong></p>

          <p className="text-gray-300 leading-relaxed">
            Thorbit AI is a content intelligence and SEO platform that helps businesses build topical authority through AI-powered content analysis, entity mapping, and strategic content planning.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and process your personal data when you use our website at thorbit.ai and our content intelligence platform (&quot;Services&quot;).
          </p>
          <p className="text-gray-300 leading-relaxed">
            This Privacy Policy does not apply where Thorbit AI acts as a data processor and processes personal data on behalf of commercial customers—for example, when analyzing your website content or competitor data on your behalf. In those cases, you as the customer are the controller of that data.
          </p>
          <p className="text-gray-300 leading-relaxed mb-8">
            This Privacy Policy also describes your privacy rights. More information about your rights, and how to exercise them, is set out in Section 4 (&quot;Rights and Choices&quot;).
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Collection of Personal Data</h2>
          <p className="text-gray-300 leading-relaxed">We collect the following categories of personal data:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Personal data you provide to us directly</h3>

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Identity and Contact Data:</strong> We collect identifiers, including your name, email address, and phone number when you sign up for a Thorbit AI account or subscribe to our Services. We may also collect or generate indirect identifiers (e.g., user IDs).
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Payment Information:</strong> We collect your payment information if you choose to purchase access to Thorbit AI&apos;s products and services. Payment processing is handled by our third-party payment processor, Stripe.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Project and Content Data:</strong> You may provide us with website URLs, content, and other materials for analysis through our Services. This includes:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Website URLs and content you submit for analysis</li>
            <li>Competitor domains you wish to analyze</li>
            <li>Content briefs, articles, and strategic documents generated through our platform</li>
            <li>Entity and keyword data related to your projects</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Feedback:</strong> We appreciate feedback, including ideas and suggestions for improvement. If you provide feedback about our Services, we will store this information to improve our platform.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Communication Information:</strong> If you communicate with us, we collect your name, contact information, and the contents of any messages you send.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Personal data we receive automatically from your use of the Services</h3>
          <p className="text-gray-300 leading-relaxed">When you use the Services, we receive certain technical data automatically:</p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Device and Connection Information:</strong> Your device or browser automatically sends us information including device type, operating system, browser information, IP address, time zone, and device identifiers.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Usage Information:</strong> We collect information about your use of the Services, such as dates and times of access, features used, pages viewed, and other information about how you interact with our platform.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Log and Troubleshooting Information:</strong> We collect log files and error information to maintain and improve our Services.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Cookies and Similar Technologies:</strong> We use cookies and similar technologies to manage the Services and collect information about you and your use of the Services. For more details, please see the &quot;Cookies and Tracking Technologies&quot; section of this Privacy Policy.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Identity Resolution Data:</strong> We may use third-party services to identify visitors to our website and associate browsing activity with business contact information, including name, email address, company name, and job title.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cookies and Tracking Technologies</h2>
          <p className="text-gray-300 leading-relaxed">
            We use cookies, pixels, and similar tracking technologies to operate and improve our Services, analyze usage, and support our marketing efforts.
          </p>
          <p className="text-gray-300 leading-relaxed">Types of technologies we use:</p>

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Essential cookies:</strong> Required for basic site functionality, security, and authentication. These cannot be disabled.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Analytics and performance:</strong> We use tools such as Google Analytics, Microsoft Clarity, Hotjar, and similar services to understand how visitors interact with our Services. These tools may collect information including pages visited, time on site, click patterns, scroll depth, and session recordings.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Marketing and advertising:</strong> We use advertising pixels, conversion tracking, and remarketing technologies from platforms including Google, Meta, LinkedIn, and other advertising networks. These technologies help us measure ad effectiveness and deliver relevant advertising.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Identity resolution:</strong> We use identity resolution and visitor identification technologies that may associate your browsing activity with business contact information obtained from third-party data providers. This allows us to identify potential business prospects who visit our site, even if they have not submitted a form or created an account. Information collected may include your name, email address, company, job title, and browsing behavior on our site.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Geographic Scope of Identity Resolution:</strong> Our identity resolution technologies are designed to identify business visitors located in the United States only. For visitors located in the European Economic Area (EEA), United Kingdom, Switzerland, or other jurisdictions where such technologies require prior consent, these identification technologies are either not deployed or are only activated after obtaining appropriate consent through our cookie consent mechanism.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Third-party tracking:</strong> Our Services may include tracking technologies operated by third parties. These third parties may collect information about your online activities over time and across different websites. We do not control these third parties&apos; tracking technologies or how they use the information collected.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Consent for EEA/UK Visitors:</strong> If you are located in the EEA, UK, or Switzerland, we will only place non-essential cookies and tracking technologies on your device after obtaining your consent through our cookie consent mechanism, except where another legal basis applies under applicable law. You may withdraw your consent at any time through our cookie settings.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Cookie Consent Mechanism:</strong> Where required by applicable law, we obtain your consent before placing non-essential cookies on your device. You can manage your cookie preferences at any time through our cookie settings, accessible via the cookie banner on our website or by contacting us at support@thorbit.ai.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Your choices:</strong> Most web browsers allow you to control cookies through settings. You can set your browser to refuse cookies or alert you when cookies are being sent. Note that disabling cookies may affect the functionality of our Services. For targeted advertising opt-outs, you may visit the Network Advertising Initiative (optout.networkadvertising.org) or Digital Advertising Alliance (optout.aboutads.info).
          </p>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to add, modify, or replace any tracking or analytics technologies at any time without prior notice, provided such use is disclosed in this Privacy Policy.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Uses of Personal Data</h2>
          <p className="text-gray-300 leading-relaxed">We use your personal data for the following purposes:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>To provide, maintain, and facilitate any products and services offered through your Thorbit AI account</li>
            <li>To perform content analysis, topical authority scoring, and other analytical services you request</li>
            <li>To communicate with you, including sending you information about our Services, updates, and support</li>
            <li>To create and administer your Thorbit AI account</li>
            <li>To facilitate payments for products and services</li>
            <li>To prevent and investigate fraud, abuse, and violations of our Terms of Service</li>
            <li>To investigate and resolve disputes and security issues</li>
            <li>To debug and identify and repair errors</li>
            <li>To improve the Services and conduct research</li>
            <li>To enforce our Terms of Service, including our Acceptable Use Policy</li>
            <li>To send you marketing communications, including information about our products, services, and promotional offers</li>
            <li>To serve targeted advertising and measure the effectiveness of our marketing campaigns</li>
            <li>To identify and contact prospective customers through identity resolution technologies</li>
            <li>To make automated decisions regarding your account, access to features, pricing, or eligibility for services, which may be based in whole or in part on automated processing of your personal data</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Communications</h3>
          <p className="text-gray-300 leading-relaxed">
            We may send you marketing communications about our products, services, features, and promotional offers. You can opt out of marketing communications at any time by clicking the &quot;unsubscribe&quot; link in any marketing email, or by contacting us at support@thorbit.ai. Please note that even if you opt out of marketing communications, we may still send you transactional messages related to your account, purchases, or use of our Services.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Disclose Personal Data</h2>
          <p className="text-gray-300 leading-relaxed">Thorbit AI will disclose personal data to the following categories of third parties:</p>

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Service Providers and Business Partners:</strong> We may disclose personal data to service providers and business partners who assist us in operating our Services and conducting our business. These include:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Infrastructure and hosting: MongoDB Atlas (database hosting)</li>
            <li>Authentication: Clerk</li>
            <li>Payment processing: Stripe</li>
            <li>AI processing: OpenRouter, Anthropic, and other AI service providers</li>
            <li>Data collection: Firecrawl (web scraping)</li>
            <li>Analytics and performance: Google Analytics, Google Search Console, Microsoft Clarity, Hotjar, and other analytics providers</li>
            <li>Marketing and advertising: Advertising platforms, identity resolution providers, email marketing services, and customer relationship management systems</li>
            <li>Email and communications: Email service providers for transactional and marketing communications</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            We may engage additional service providers and business partners from time to time. This list is not exhaustive, and we reserve the right to use additional providers without updating this list, provided such use is consistent with this Privacy Policy.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">As Required by Law:</strong> We may disclose personal data to governmental authorities as required by law, in response to legal requests, or to protect our rights and the rights of others.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Corporate Transactions:</strong> If Thorbit AI is involved in a merger, acquisition, or sale of assets, your personal data may be transferred as part of that transaction.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">With Your Consent:</strong> We will disclose personal data when you give us permission or direct us to do so.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Rights and Choices</h2>
          <p className="text-gray-300 leading-relaxed">Depending on where you live and the laws that apply, you may have certain rights regarding your personal data:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li><strong className="text-white">Right to Know:</strong> The right to know what personal data we process about you.</li>
            <li><strong className="text-white">Access and Data Portability:</strong> The right to request a copy of the personal data we process about you.</li>
            <li><strong className="text-white">Deletion:</strong> The right to request that we delete personal data collected from you. You can also delete individual projects and analyses from your account.</li>
            <li><strong className="text-white">Correction:</strong> The right to request that we correct inaccurate personal data.</li>
            <li><strong className="text-white">Objection:</strong> The right to object to processing of your personal data in certain circumstances.</li>
            <li><strong className="text-white">Withdrawal of Consent:</strong> Where processing is based on consent, you have the right to withdraw your consent at any time.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">To exercise your rights, please contact us at support@thorbit.ai. We will respond to your request in accordance with applicable law.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Transfers</h2>
          <p className="text-gray-300 leading-relaxed">
            When you access our Services, your personal data may be transferred to servers in the United States or other countries. We ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses where required.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention and Security</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">Data Retention</h3>
          <p className="text-gray-300 leading-relaxed">
            Thorbit AI retains your personal data for as long as necessary to fulfill the purposes described in this Privacy Policy, maintain our business operations, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Retention periods vary based on the type of data and our business needs. We may retain certain data indefinitely for legitimate business purposes, including maintaining business records, improving our Services, and complying with legal requirements. Account data is retained while your account is active and for a period thereafter as necessary for the purposes stated above. Payment records are retained as required for tax, accounting, and legal compliance. Technical logs and usage data may be retained for security, analytics, and service improvement purposes.
          </p>
          <p className="text-gray-300 leading-relaxed">
            When personal data is no longer needed, we will delete it or anonymize it in accordance with our data retention practices.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Security Controls</h3>
          <p className="text-gray-300 leading-relaxed">
            We implement appropriate technical and organizational security measures designed to protect personal data from loss, misuse, and unauthorized access, disclosure, alteration, or destruction.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Encryption in transit (HTTPS/TLS)</li>
            <li>Encryption at rest for stored data</li>
            <li>Access controls and authentication via Clerk</li>
            <li>Regular security assessments</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Data Breach Notification</h3>
          <p className="text-gray-300 leading-relaxed">
            In the event of a data breach affecting your personal data, we will notify you and relevant regulatory authorities as required by applicable law. We will provide information about the nature of the breach, the types of data affected, and steps you can take to protect yourself. Nothing in this Privacy Policy limits any rights or remedies available to you under applicable law, nor does it create any liability for Thorbit AI beyond what is required by applicable law.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children</h2>
          <p className="text-gray-300 leading-relaxed">
            Our Services are not directed towards, and we do not knowingly collect information from, children under the age of 18. If you become aware that a child has provided personal data to us, please contact us at support@thorbit.ai.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Third-Party Websites and Services</h2>
          <p className="text-gray-300 leading-relaxed">
            Our Services may contain links to third-party websites, applications, or services that are not operated by us. This Privacy Policy does not apply to those third-party sites. We are not responsible for the privacy practices of any third-party websites or services. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Our Privacy Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            Thorbit AI may update this Privacy Policy from time to time. We will notify you of any material changes and update the Effective Date at the top of this page.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, or have any questions, complaints, or requests regarding your personal data, you can contact us:
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            <strong className="text-white">Thorbit AI LLC</strong><br />
            30 N Gould St Ste R<br />
            Sheridan, WY 82801<br /><br />
            Phone: +1 (478) 309-6262<br />
            Email: support@thorbit.ai
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Legal Bases for Processing (EEA/UK Users)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-300 text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white">Purpose</th>
                  <th className="text-left py-3 pr-4 text-white">Type of Data</th>
                  <th className="text-left py-3 text-white">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To provide and maintain our Services</td>
                  <td className="py-3 pr-4">Identity, Contact, Project Data</td>
                  <td className="py-3">Performance of contract</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To communicate with you</td>
                  <td className="py-3 pr-4">Identity, Contact, Communication</td>
                  <td className="py-3">Performance of contract, Legitimate interests</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To create and administer your account</td>
                  <td className="py-3 pr-4">Identity, Contact, Payment</td>
                  <td className="py-3">Performance of contract</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To facilitate payments</td>
                  <td className="py-3 pr-4">Identity, Payment</td>
                  <td className="py-3">Performance of contract</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To send marketing communications</td>
                  <td className="py-3 pr-4">Identity, Contact</td>
                  <td className="py-3">Consent (required for EEA/UK/Switzerland users); Legitimate interests (other jurisdictions where permitted)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To prevent fraud and enforce policies</td>
                  <td className="py-3 pr-4">All categories</td>
                  <td className="py-3">Legitimate interests, Legal obligation</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To investigate and resolve disputes</td>
                  <td className="py-3 pr-4">Identity, Project Data</td>
                  <td className="py-3">Legitimate interests</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To improve Services and conduct research</td>
                  <td className="py-3 pr-4">Usage, Technical Information</td>
                  <td className="py-3">Legitimate interests</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To debug and repair errors</td>
                  <td className="py-3 pr-4">Technical Information</td>
                  <td className="py-3">Legitimate interests</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To serve advertising and conduct marketing</td>
                  <td className="py-3 pr-4">Identity, Contact, Usage, Technical Information</td>
                  <td className="py-3">Consent (required for EEA/UK/Switzerland users); Legitimate interests (other jurisdictions where permitted)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">To make automated decisions</td>
                  <td className="py-3 pr-4">All categories as relevant</td>
                  <td className="py-3">Consent, Legitimate interests, Performance of contract</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Supplemental Disclosures for Residents of California</h2>
          <p className="text-gray-300 leading-relaxed">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li><strong className="text-white">Right to Know:</strong> You can request information about the categories and specific pieces of personal data we have collected about you.</li>
            <li><strong className="text-white">Right to Delete:</strong> You can request deletion of your personal data, subject to certain exceptions.</li>
            <li><strong className="text-white">Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal data. Thorbit AI does not sell personal data.</li>
            <li><strong className="text-white">Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">To exercise these rights, please contact us at support@thorbit.ai.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Do Not Track Disclosure</h3>
          <p className="text-gray-300 leading-relaxed">
            Our Services do not currently respond to &quot;Do Not Track&quot; browser signals or similar mechanisms. We may continue to collect information about your browsing activity as described in this Privacy Policy regardless of any Do Not Track settings in your browser.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">California Shine the Light (Civil Code Section 1798.83)</h3>
          <p className="text-gray-300 leading-relaxed">
            California residents may request information about our disclosure of personal information to third parties for their direct marketing purposes. We do not share personal information with third parties for their own direct marketing purposes. If you have questions, contact us at support@thorbit.ai.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Supplemental Disclosures for Residents of the European Economic Area (EEA) and UK</h2>
          <p className="text-gray-300 leading-relaxed">If you are located in the EEA or UK, you have additional rights under the General Data Protection Regulation (GDPR):</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>The right to lodge a complaint with a supervisory authority</li>
            <li>The right to data portability</li>
            <li>The right to restrict processing</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">For EEA/UK users, the data controller is Thorbit AI LLC. For questions about data protection, contact us at support@thorbit.ai.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">EU/UK Representative</h3>
          <p className="text-gray-300 leading-relaxed">
            If you are located in the EEA or UK and wish to contact a representative within your jurisdiction regarding data protection matters, please contact us at support@thorbit.ai and we will provide you with the details of our appointed representative or make arrangements to appoint one upon request.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Data Processing Agreement</h3>
          <p className="text-gray-300 leading-relaxed">
            For enterprise customers who require a Data Processing Agreement (DPA) to comply with GDPR or other data protection laws, a DPA is available upon request. Please contact support@thorbit.ai to request a DPA.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Sub-Processors</h3>
          <p className="text-gray-300 leading-relaxed">
            We use sub-processors to help provide our Services. A list of our current sub-processors is available in Section 4 of this Privacy Policy. We will update this list when we engage new sub-processors or replace existing ones. For enterprise customers with a DPA, we will provide notice of sub-processor changes in accordance with the terms of that agreement.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">International Data Transfers</h3>
          <p className="text-gray-300 leading-relaxed">
            When we transfer personal data from the EEA, UK, or Switzerland to countries that have not been deemed to provide an adequate level of data protection, we rely on appropriate safeguards, including the European Commission&apos;s Standard Contractual Clauses (SCCs) and the UK International Data Transfer Agreement or Addendum, as applicable.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Data Subject Access Requests</h3>
          <p className="text-gray-300 leading-relaxed">
            We will respond to data subject access requests within 30 days of receipt. If we require additional time due to the complexity or number of requests, we will notify you within the initial 30-day period and may extend the response period by up to an additional 60 days.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Automated Decision-Making</h3>
          <p className="text-gray-300 leading-relaxed">
            We may use automated processing, including profiling, to make decisions that affect your access to features, pricing, account status, or eligibility for services. These automated decisions may be based on information we collect about you, including usage patterns, account history, and other factors. Where required by applicable law, you have the right to request human review of automated decisions that significantly affect you. To exercise this right, contact us at support@thorbit.ai.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Right to Object to Direct Marketing</h3>
          <p className="text-gray-300 leading-relaxed">
            You have an absolute right to object to the processing of your personal data for direct marketing purposes, including profiling related to direct marketing. If you object, we will stop processing your personal data for these purposes. To exercise this right, contact us at support@thorbit.ai or use the unsubscribe link in any marketing email. We will process your request without undue delay and at the latest within one month.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Legal Basis Clarification for EU/UK Users</h3>
          <p className="text-gray-300 leading-relaxed">
            For direct marketing to users in the EEA, UK, and Switzerland, our primary legal basis is your consent. You may withdraw your consent at any time, and we will cease marketing communications to you. For other processing activities, we rely on the legal bases set forth in Section 12 of this Privacy Policy.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Other U.S. State Privacy Laws</h2>
          <p className="text-gray-300 leading-relaxed">
            In addition to California, residents of certain other U.S. states have specific privacy rights under state law.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Virginia, Colorado, and Connecticut Residents</h3>
          <p className="text-gray-300 leading-relaxed">
            If you are a resident of Virginia (VCDPA), Colorado (CPA), or Connecticut (CTDPA), you may have the following rights:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Right to access your personal data</li>
            <li>Right to correct inaccuracies in your personal data</li>
            <li>Right to delete your personal data</li>
            <li>Right to obtain a copy of your personal data in a portable format</li>
            <li>Right to opt out of targeted advertising, the sale of personal data, and profiling in furtherance of decisions that produce legal or similarly significant effects</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            We do not sell personal data as defined under these state laws. To exercise your rights, contact us at support@thorbit.ai. You may appeal a decision regarding your request by contacting us at the same address.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Nevada Residents</h3>
          <p className="text-gray-300 leading-relaxed">
            Nevada residents have the right to opt out of the sale of certain &quot;covered information&quot; as defined under Nevada Revised Statutes Chapter 603A. We do not sell your covered information as defined under Nevada law. If you wish to submit an opt-out request, please contact us at support@thorbit.ai.
          </p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-2xl font-semibold mt-8 mb-4">16. Sensitive Personal Data</h2>
          <p className="text-gray-300 leading-relaxed">
            We do not intentionally collect sensitive personal data (also known as &quot;special category data&quot; under GDPR), such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data for identification purposes, health data, or data concerning sex life or sexual orientation. If we become aware that we have inadvertently collected such data, we will take steps to delete it unless we have a legal basis to retain it.
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
