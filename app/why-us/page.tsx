"use client";

import Link from "next/link";
import { Menu, X, Check, X as XIcon, ArrowRight, Clock, DollarSign, Target, Users, Zap, Shield } from "lucide-react";
import { useState } from "react";

export default function WhyUsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
            Thorbit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/why-us" className="text-teal font-medium">
              Why Us
            </Link>
            <Link
              href="/#demo"
              className="bg-primary hover:bg-primary-dark text-bg-primary px-5 py-2.5 rounded-lg font-medium transition-all hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-light bg-bg-primary">
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link
                href="/why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="text-teal font-medium py-2"
              >
                Why Us
              </Link>
              <Link
                href="/#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary hover:bg-primary-dark text-bg-primary px-5 py-3 rounded-lg font-medium transition-all text-center"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">WHY THORBIT</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-6">
            You're Creating Content Without a Map
          </h1>
          <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed">
            Keyword tools give you lists. Agencies give you generic articles. Neither gives you a strategic framework for what comprehensive topical authority actually looks like in your industry.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              This Is For You If...
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-3xl mx-auto">
              Whether you're an in-house team, an agency managing multiple clients, or a solo marketer—the same bottlenecks apply.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "You've Published 50+ Articles",
                description: "But you can't explain why those topics were chosen. No strategic framework ties them together. Every month is another round of 'what should we write next?'"
              },
              {
                icon: DollarSign,
                title: "The Economics Don't Scale",
                description: "Whether you're paying $500/article or charging $500/article, the manual work is the same. Research, outlining, writing, revisions—the hours add up. Margins shrink."
              },
              {
                icon: Target,
                title: "Your Tools Show Data, Not Direction",
                description: "Ahrefs and Semrush give you thousands of keywords with no prioritization. Great for competitive intelligence. Not a strategy for what to create next."
              },
              {
                icon: Clock,
                title: "Manual Topic Clustering Takes Months",
                description: "Building one complete topic cluster takes 4-6 months. Content gap analysis is 20+ hours/month. Multiply that across clients or business units—it doesn't scale."
              }
            ].map((item, i) => (
              <div key={i} className="bg-bg-secondary rounded-2xl p-6 border border-border-light">
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Old Way vs Our Way */}
      <section className="py-16 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              What Changes When You Have Infrastructure
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-3xl mx-auto">
              The difference isn't better content. It's having strategic research BEFORE creating content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-text-primary">Before</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Content based on keyword volume (not customer research)",
                  "\"What should we write next?\" is a monthly brainstorm",
                  "50 articles published with no visibility into what's missing",
                  "Hours spent on manual research per article",
                  "Months waiting to see if strategy is working",
                  "Can't prove which content drives business results"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary flex-shrink-0 mt-2" />
                    <span className="text-text-secondary font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-white rounded-2xl p-8 border-2 border-primary/30 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-text-primary">After</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "50+ real customer conversations analyzed—documented pain points",
                  "Complete industry map shows what comprehensive coverage looks like",
                  "Strategic roadmap for 12-24 months of priority content",
                  "Research, briefs, and content generated in hours",
                  "Track topical coverage: 40% → 60% → 80% milestones",
                  "Connect content to business metrics, not just rankings"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-text-secondary font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Actually Get */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              What You Actually Get
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-3xl mx-auto">
              Not tools. Not dashboards. Strategic infrastructure that informs everything.
            </p>
          </div>

          <div className="space-y-8">
            {/* ICP */}
            <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Customer Research Foundation
                  </h3>
                  <p className="text-text-secondary font-light mb-4">
                    AI analyzes 50+ real customer conversations—Reddit posts, reviews, forum threads. You get documented pain points, objections, language patterns, failed solutions. Every piece of content ties back to what customers actually said, not what you assume they care about.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Pain points with verbatim quotes</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Objections documented</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Exact customer language</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EICS */}
            <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Complete Industry Map
                  </h3>
                  <p className="text-text-secondary font-light mb-4">
                    490-630 entities. 5,000-6,000 search intents. Every topic in your industry mapped with relationships showing how they connect. This is what manual topic cluster building takes 4-6 months to create—delivered in days. You see the full topical landscape, not just random keywords.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">7 categories mapped</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">Relationship connections</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">Interactive visualization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Briefs */}
            <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Strategic Briefs That Make Writing Easy
                  </h3>
                  <p className="text-text-secondary font-light mb-4">
                    Each brief includes: the customer pain point it addresses, the business positioning to use, internal linking strategy, and research queries. Writers know exactly what to create and why. No more "here's a keyword, write something."
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">ICP pain point tied</span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">Business positioning</span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">Internal linking strategy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-8 w-8 text-teal" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Multi-Platform Content at Scale
                  </h3>
                  <p className="text-text-secondary font-light mb-4">
                    One workflow produces 8 assets: SEO blog article, Medium rewrite, 2 video scripts (45-second and 2-minute), 3 social posts (Facebook, Instagram, LinkedIn), and images. Research-backed, evaluated through quality loops, ready to publish across all channels.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-sm font-medium">$10-15 per article</span>
                    <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-sm font-medium">8 assets per topic</span>
                    <span className="px-3 py-1 rounded-full bg-teal/10 text-teal text-sm font-medium">Quality evaluation loops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              What This Work Actually Costs
            </h2>
            <p className="text-xl font-light text-text-secondary">
              The strategic foundation—customer research, industry mapping, gap analysis, content briefs, internal linking—adds up. Here's what manual execution looks like vs. automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Manual breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-border-light shadow-sm">
              <h3 className="text-lg font-bold text-text-primary mb-2">Manual Execution</h3>
              <p className="text-sm text-text-tertiary mb-4">At $50-75/hour, here's what the work costs</p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Customer research & ICP", cost: "$2,000-4,000", time: "40-80 hrs" },
                  { label: "Topic cluster mapping", cost: "$1,500-3,000", time: "30-60 hrs" },
                  { label: "Content gap analysis", cost: "$1,000-2,000", time: "20-40 hrs" },
                  { label: "Strategic brief creation (50)", cost: "$2,500-5,000", time: "50-100 hrs" },
                  { label: "Internal link optimization", cost: "$1,000-2,000", time: "20-40 hrs" },
                  { label: "Topical authority scoring", cost: "$500-1,000", time: "10-20 hrs" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-text-secondary">{item.label}</span>
                    <div className="text-right">
                      <span className="text-text-primary font-medium">{item.cost}</span>
                      <span className="text-text-tertiary text-xs ml-2">({item.time})</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-border-light pt-3 flex justify-between font-bold">
                  <span className="text-text-primary">Foundation total</span>
                  <span className="text-low">$8,500-17,000</span>
                </div>
                <p className="text-xs text-text-tertiary mt-2">Plus $500-800 per article for content creation</p>
              </div>
            </div>

            {/* Thorbit breakdown */}
            <div className="bg-white rounded-2xl p-6 border-2 border-primary/30 shadow-sm">
              <h3 className="text-lg font-bold text-text-primary mb-2">With Thorbit</h3>
              <p className="text-sm text-text-tertiary mb-4">Same outputs, automated execution</p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Customer research & ICP", cost: "$500-750", time: "~1 hr" },
                  { label: "Industry mapping (EICS)", cost: "$1,000-1,500", time: "~2 hrs" },
                  { label: "Content gap analysis", cost: "Included", time: "automatic" },
                  { label: "Strategic brief generation", cost: "Included", time: "automatic" },
                  { label: "Internal link optimization", cost: "Included", time: "automatic" },
                  { label: "Topical authority scoring", cost: "Included", time: "automatic" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-text-secondary">{item.label}</span>
                    <div className="text-right">
                      <span className={item.cost === "Included" ? "text-primary font-medium" : "text-text-primary font-medium"}>{item.cost}</span>
                      <span className="text-text-tertiary text-xs ml-2">({item.time})</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-border-light pt-3 flex justify-between font-bold">
                  <span className="text-text-primary">Foundation total</span>
                  <span className="text-primary">$1,500-2,250</span>
                </div>
                <p className="text-xs text-text-tertiary mt-2">Content creation priced separately based on volume</p>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-text-secondary font-light">
            The infrastructure is the hard part. Once you have it, content execution is straightforward.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Hours, Not Months
            </h2>
            <p className="text-xl font-light text-text-secondary">
              The strategic foundation that takes months to build manually? We generate it in hours.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                time: "~1 hour",
                title: "Customer Research (ICP)",
                items: ["50+ customer conversations analyzed", "Documented pain points, objections, language patterns", "Failed solutions identified"],
                status: "More customer insight than most businesses gather in years."
              },
              {
                time: "~2 hours",
                title: "Industry Mapping (EICS)",
                items: ["490-630 entities generated across 7 categories", "5,000-6,000 search intents mapped", "Relationship connections established"],
                status: "Complete topical landscape—what comprehensive coverage looks like."
              },
              {
                time: "~30 min",
                title: "Gap Analysis & Briefs",
                items: ["Current content scored against entity map", "Priority briefs generated for gaps", "12-24 month roadmap created"],
                status: "Clear answer to 'what should we create next and why.'"
              },
              {
                time: "~45 min",
                title: "Content Generation",
                items: ["Research-backed article created", "Multi-platform variants (Medium, video scripts, social)", "Images and metadata generated"],
                status: "Per topic. Run as many as you need."
              }
            ].map((phase, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-primary font-bold">{phase.time}</span>
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 border border-border-light shadow-sm">
                  <h3 className="text-lg font-bold text-text-primary mb-2">{phase.title}</h3>
                  <ul className="space-y-1 mb-3">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-text-secondary font-light text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-text-tertiary italic">{phase.status}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-text-secondary font-light">
            SEO results still take 3-6 months to compound. But the strategic foundation? That's ready in a day.
          </p>
        </div>
      </section>

      {/* Objections */}
      <section className="py-16 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Common Concerns (Answered Honestly)
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Will Google penalize AI-generated content?",
                a: "Google doesn't penalize AI content—they penalize low-quality content. Google's official stance (March 2023): They care if content is helpful, accurate, and created for people. Thorbit content is research-backed (50+ sources), addresses documented customer pain points, and goes through quality evaluation loops. That's higher quality than most human-written content farms."
              },
              {
                q: "Why would I pay for this when I have Ahrefs/Semrush?",
                a: "Ahrefs shows keywords. Thorbit shows strategy. Keyword tools give you search volume and competition—data. They don't give you: strategic relationships (how topics connect), ICP alignment (which topics address customer pain points), or topical completeness (what comprehensive coverage looks like). Ahrefs is intelligence. Thorbit is infrastructure."
              },
              {
                q: "Can't I just use ChatGPT for this?",
                a: "You can—but it takes 2-4 hours per article (manual prompting for research, outlining, writing, images, multi-platform variants). At $50/hour, that's $100-200 in your time. Thorbit automates the workflow: 45-90 minutes of AI processing, 5-10 minutes of your review time. Same quality, systematic research foundation, and you keep the strategic infrastructure (ICP + EICS) forever."
              },
              {
                q: "My industry is too technical/niche for AI.",
                a: "AI doesn't need to BE an expert—it needs to ANALYZE expert sources. The ICP research extracts pain points from real conversations in your industry (forums, LinkedIn, reviews). The EICS generates entities based on YOUR customer language, not generic templates. For highly regulated industries (healthcare, finance), use Thorbit for research + drafting, then add expert review before publishing."
              },
              {
                q: "This seems too cheap. What's the catch?",
                a: "No account manager. No status calls. No revision rounds. You give up white-glove service. You gain 90% cost savings and faster turnaround. This works for teams who know what they need (strategic direction internally) and want execution efficiency. It doesn't work for businesses needing full-service consulting and hand-holding."
              }
            ].map((item, i) => (
              <div key={i} className="bg-bg-primary rounded-xl p-6 border border-border-light">
                <h3 className="text-lg font-bold text-text-primary mb-3">"{item.q}"</h3>
                <p className="text-text-secondary font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to Stop Guessing?
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-10">
            In 30-60 minutes, you'll have more documented customer insight than most businesses gather in years. The rest builds from there.
          </p>
          <Link
            href="/#demo"
            className="inline-flex items-center gap-2 bg-white hover:bg-bg-secondary text-text-primary px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Book a Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-sm text-white/80 mt-6">3-minute demo. No sales pitch. Just proof.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border-light">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-black text-text-primary">
            Thorbit
          </Link>
          <p className="text-text-tertiary text-sm">
            © {new Date().getFullYear()} Thorbit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
