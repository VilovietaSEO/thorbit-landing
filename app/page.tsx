"use client";

import { useState, lazy, Suspense } from "react";
import { Menu, X } from "lucide-react";

const EICSGraphFull = lazy(() => import("@/components/EICSGraphFull"));

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Services", color: "var(--primary)" },
    { name: "Systems", color: "var(--secondary)" },
    { name: "Brands", color: "var(--accent)" },
    { name: "Tools", color: "var(--high)" },
    { name: "Symptoms", color: "var(--medium)" },
    { name: "Causes", color: "var(--low)" },
    { name: "Governance", color: "var(--imp-high)" },
  ];

  const phases = [
    {
      num: "01",
      title: "ICP & Business Intelligence",
      desc: "Analyze 50+ real customer conversations. Document pain points, objections, language patterns, and failed solutions.",
    },
    {
      num: "02",
      title: "Competitive Intelligence",
      desc: "Generate 100+ targeted search queries. Scrape and analyze all top-ranking content with specialized AI agents.",
    },
    {
      num: "03",
      title: "Knowledge Graph Generation",
      desc: "Map 490-630 entities across 7 categories. Each entity gets 10 search intents and relationship mapping.",
    },
    {
      num: "04",
      title: "Dual Embedding",
      desc: "Embed your entire website and the knowledge graph. Every page and entity becomes a semantic vector.",
    },
    {
      num: "05",
      title: "Coverage Scoring",
      desc: "Compare embeddings using cosine similarity. Get high/medium/low coverage scores per entity.",
    },
    {
      num: "06",
      title: "Importance Scoring",
      desc: "Score by ICP alignment and commercial value: Critical, High, Medium, Low. Prioritize what matters.",
    },
    {
      num: "07",
      title: "Page Architecture",
      desc: "Identify which entities should be service pages, blog articles, or primary navigation.",
    },
    {
      num: "08",
      title: "Entity Cards",
      desc: "Strategic briefs for every entity: definition, 10 intents, relationships, content suggestions. Export anywhere.",
    },
    {
      num: "09",
      title: "Internal Linking",
      desc: "Generate 3 linking strategies per entity: Conservative, Balanced, Aggressive. Semantic linking made systematic.",
    },
    {
      num: "10",
      title: "Interactive Visualization",
      desc: "Explore your topical landscape. Filter by category, importance, coverage. Compare against competitors.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
            Thorbit
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors font-light">
              How It Works
            </a>
            <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors font-light">
              Features
            </a>
            <a
              href="#demo"
              className="bg-primary hover:bg-primary-dark text-bg-primary px-5 py-2.5 rounded-lg font-medium transition-all hover:-translate-y-0.5"
            >
              Book a Demo
            </a>
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
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors font-light py-2"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors font-light py-2"
              >
                Features
              </a>
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary hover:bg-primary-dark text-bg-primary px-5 py-3 rounded-lg font-medium transition-all text-center"
              >
                Book a Demo
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">
              TOPICAL AUTHORITY MEASUREMENT
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.1] tracking-tight mb-8">
              See What Google Sees
            </h1>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-10">
              The first platform that visualizes your topical authority. Know exactly what you've covered, what's missing, and why competitors rank.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#demo"
                className="bg-primary hover:bg-primary-dark text-bg-primary px-8 py-4 rounded-xl font-medium text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Book a Demo
              </a>
              <a
                href="#how-it-works"
                className="text-text-primary hover:text-primary px-8 py-4 font-medium text-lg transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Interactive Graph with Sidebar */}
          <div className="max-w-6xl mx-auto">
            <div className="h-[600px] shadow-xl">
              <Suspense fallback={
                <div className="w-full h-full bg-bg-secondary border-2 border-dashed border-border rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary font-light">Loading interactive graph...</p>
                  </div>
                </div>
              }>
                <EICSGraphFull />
              </Suspense>
            </div>
            <p className="text-center mt-4 text-sm text-text-tertiary font-light">
              ↑ Zoom, pan, search, filter by category, click nodes for full details
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-8">
            Why do they rank with fewer backlinks?
          </h2>
          <p className="text-xl font-light text-text-secondary leading-relaxed mb-12">
            You've built more content, more links, better technical SEO. And they still outrank you.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-bg-primary p-6 rounded-xl border border-border-light">
              <span className="text-2xl text-low font-bold">01</span>
              <p className="mt-3 font-light text-text-primary">
                Keyword tools show data, not strategy. You export 500 keywords sorted by volume.
              </p>
            </div>
            <div className="bg-bg-primary p-6 rounded-xl border border-border-light">
              <span className="text-2xl text-low font-bold">02</span>
              <p className="mt-3 font-light text-text-primary">
                You guess which topics to prioritize based on difficulty scores that don't reflect reality.
              </p>
            </div>
            <div className="bg-bg-primary p-6 rounded-xl border border-border-light">
              <span className="text-2xl text-low font-bold">03</span>
              <p className="mt-3 font-light text-text-primary">
                You can't measure what's missing. Traditional tools show what you rank for, not the gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ICP/EOS Foundation Section - NEW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium mb-4 tracking-wide">FOUNDATION FIRST</p>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-tight mb-6">
                Everything starts with your Ideal Customer Profile
              </h2>
              <p className="text-lg font-light text-text-secondary leading-relaxed mb-6">
                Before we map a single entity, we build a 24-section customer profile from real data. Not personas - actual customer language.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">EOS Framework Analysis</p>
                    <p className="text-sm text-text-secondary font-light">Core values, three uniques, proven process, guarantee - your strategic foundation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">50+ Real Conversations Analyzed</p>
                    <p className="text-sm text-text-secondary font-light">Reddit posts, reviews, forums - actual customer pain points, objections, and language patterns.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Failed Solutions Documented</p>
                    <p className="text-sm text-text-secondary font-light">What they tried, why it didn't work, and why your approach is different.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Decision Triggers Mapped</p>
                    <p className="text-sm text-text-secondary font-light">The exact moments that make customers reach for their phone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-light">
              <p className="text-sm text-text-tertiary mb-4 font-medium">24-SECTION ICP FRAMEWORK</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {["Avatar", "Before/After State", "Decision Triggers", "Primary Goals", "Secondary Goals", "Dreams", "Promises", "Primary Complaint", "Secondary Complaint", "Negative Statistics", "Objections", "Bad Habits", "Consequences", "Enemy", "Ultimate Fear", "False Solution Lie", "False Solution Truth", "False Solution Tip", "Mistaken Belief Truth", "Mistaken Belief Name", "Success Myth Lie", "Success Myth Truth", "What They Tried", "Why It Failed"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded bg-bg-tertiary/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-high"></div>
                    <span className="text-text-secondary font-light text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-medium mb-4 tracking-wide">THE PARADIGM SHIFT</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-8">
            Google doesn't rank keywords anymore. It ranks understanding.
          </h2>
          <p className="text-xl font-light text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Topical authority is how completely and coherently you cover a subject area. Not keyword density. Not backlink counts. Complete coverage of the semantic territory.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-tertiary to-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              This is why they rank
            </h2>
            <p className="text-xl font-light text-text-secondary">
              Load both sites. See the difference instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Your Site */}
            <div className="bg-bg-primary rounded-2xl border border-border-light overflow-hidden">
              <div className="p-6 border-b border-border-light">
                <h3 className="text-xl font-black text-text-primary">Your Site</h3>
                <p className="text-text-secondary font-light">Scattered coverage</p>
              </div>
              <div className="aspect-square p-8 relative">
                {/* Sparse dots */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-low opacity-60"></div>
                <div className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full bg-medium opacity-60"></div>
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-low opacity-60"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-none opacity-60"></div>
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-high opacity-60"></div>
                <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-text-tertiary font-light">
                  [Screenshot: Sparse graph - 45 entities covered]
                </p>
              </div>
            </div>

            {/* Competitor */}
            <div className="bg-bg-primary rounded-2xl border border-border-light overflow-hidden">
              <div className="p-6 border-b border-border-light">
                <h3 className="text-xl font-black text-text-primary">Top Competitor</h3>
                <p className="text-text-secondary font-light">Comprehensive authority</p>
              </div>
              <div className="aspect-square p-8 relative">
                {/* Dense dots */}
                <div className="absolute top-[15%] left-[20%] w-4 h-4 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[20%] left-[35%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[25%] left-[50%] w-5 h-5 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[18%] right-[25%] w-4 h-4 rounded-full bg-medium opacity-70"></div>
                <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[35%] left-[40%] w-4 h-4 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[32%] right-[30%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[40%] left-[30%] w-4 h-4 rounded-full bg-medium opacity-70"></div>
                <div className="absolute top-[45%] left-[45%] w-5 h-5 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[42%] right-[25%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[50%] left-[22%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[55%] left-[38%] w-4 h-4 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[52%] right-[35%] w-4 h-4 rounded-full bg-medium opacity-70"></div>
                <div className="absolute top-[60%] left-[28%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[58%] left-[52%] w-4 h-4 rounded-full bg-high opacity-70"></div>
                <div className="absolute top-[65%] right-[28%] w-3 h-3 rounded-full bg-high opacity-70"></div>
                <div className="absolute bottom-[25%] left-[32%] w-4 h-4 rounded-full bg-high opacity-70"></div>
                <div className="absolute bottom-[22%] left-[48%] w-3 h-3 rounded-full bg-medium opacity-70"></div>
                <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-text-tertiary font-light">
                  [Screenshot: Dense graph - 180 entities covered]
                </p>
              </div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl font-black text-text-primary text-center">
            That's topical authority. That's why they rank.
          </p>
        </div>
      </section>

      {/* 7 Categories Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">COMPREHENSIVE MAPPING</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              7 Entity Categories. 490-630 Entities.
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-2xl mx-auto">
              We map your complete topical landscape across every dimension Google evaluates.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                className="px-6 py-3 rounded-full font-medium transition-all"
                style={{
                  backgroundColor: activeCategory === cat.name ? cat.color : "var(--bg-secondary)",
                  color: activeCategory === cat.name ? "white" : "var(--text-primary)",
                  border: `2px solid ${activeCategory === cat.name ? cat.color : "var(--border)"}`,
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="bg-bg-secondary rounded-2xl p-8 border border-border-light">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-black text-text-primary mb-4">Each Entity Includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-high/20 text-high flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <span className="font-light text-text-primary">10 search intents (5 generic SEO + 5 ICP-specific)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-high/20 text-high flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <span className="font-light text-text-primary">Related entity relationships mapped</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-high/20 text-high flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <span className="font-light text-text-primary">Coverage score (High / Medium / Low)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-high/20 text-high flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <span className="font-light text-text-primary">Importance score (Critical / High / Medium / Low)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-bg-primary rounded-xl border border-border-light p-6">
                <p className="text-sm text-text-tertiary mb-2">Example: Services Category</p>
                <div className="space-y-2">
                  {["Water Heater Repair", "Drain Cleaning", "Pipe Installation", "Emergency Plumbing", "Sewer Line Repair"].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                      <span className="font-light text-text-primary">{item}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${i < 2 ? "bg-high/20 text-high" : i < 4 ? "bg-medium/20 text-medium" : "bg-low/20 text-low"}`}>
                        {i < 2 ? "High" : i < 4 ? "Medium" : "Low"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Scoring Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">STRATEGIC PRIORITIZATION</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Dual Scoring: Coverage + Importance
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-2xl mx-auto">
              Know what you've covered AND what matters most. Critical + Low Coverage = Your urgent gaps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coverage Score */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <h3 className="text-xl font-black text-text-primary mb-6">Coverage Score</h3>
              <p className="font-light text-text-secondary mb-6">How well have you covered this entity?</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-high"></div>
                  <span className="font-medium text-high">High</span>
                  <span className="font-light text-text-tertiary text-sm">Comprehensive coverage</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-medium"></div>
                  <span className="font-medium text-medium">Medium</span>
                  <span className="font-light text-text-tertiary text-sm">Partial coverage</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-low"></div>
                  <span className="font-medium text-low">Low</span>
                  <span className="font-light text-text-tertiary text-sm">Minimal/no coverage</span>
                </div>
              </div>
            </div>

            {/* Importance Score */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <h3 className="text-xl font-black text-text-primary mb-6">Importance Score</h3>
              <p className="font-light text-text-secondary mb-6">How much does this entity matter?</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-critical"></div>
                  <span className="font-medium text-critical">Critical</span>
                  <span className="font-light text-text-tertiary text-sm">Must-have for authority</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-imp-high"></div>
                  <span className="font-medium text-imp-high">High</span>
                  <span className="font-light text-text-tertiary text-sm">Should-have</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-imp-medium"></div>
                  <span className="font-medium text-imp-medium">Medium</span>
                  <span className="font-light text-text-tertiary text-sm">Nice-to-have</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-3 rounded-full bg-imp-low"></div>
                  <span className="font-medium text-imp-low">Low</span>
                  <span className="font-light text-text-tertiary text-sm">Optional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Matrix */}
          <div className="mt-12 bg-bg-primary rounded-2xl p-8 border border-border-light">
            <h3 className="text-xl font-black text-text-primary mb-6 text-center">Priority Matrix</h3>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-critical/10 border border-critical/30">
                <span className="font-medium text-critical">Critical</span>
                <span className="text-text-tertiary">+</span>
                <span className="font-medium text-low">Low Coverage</span>
                <span className="text-text-tertiary">=</span>
                <span className="font-black text-critical">URGENT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Phase System */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">THE SYSTEM</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              10-Phase Topical Authority Engine
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-2xl mx-auto">
              From customer research to content roadmap. Systematic, measurable, repeatable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="bg-bg-secondary rounded-xl p-6 border border-border-light hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-black text-primary">{phase.num}</span>
                  <div>
                    <h3 className="text-lg font-black text-text-primary mb-2">{phase.title}</h3>
                    <p className="font-light text-text-secondary text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Everything You Need
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Strategic Content Briefs */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">Strategic Content Briefs</h3>
              <p className="font-light text-text-secondary leading-relaxed mb-4">
                Not templates - strategic documents that tell writers exactly WHAT to write, WHY it matters, and HOW to position it.
              </p>
              <ul className="text-sm text-text-tertiary font-light space-y-1">
                <li>ICP pain points woven into every section</li>
                <li>Question-based H2 structure from real searches</li>
                <li>Word count derived from urgency + complexity</li>
                <li>Internal links pre-planned with anchor text</li>
              </ul>
            </div>

            {/* AI Internal Linking */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">AI Internal Linking</h3>
              <p className="font-light text-text-secondary leading-relaxed mb-4">
                Semantic linking based on entity relationships - not keyword matching. Three strategies per recommendation.
              </p>
              <ul className="text-sm text-text-tertiary font-light space-y-1">
                <li>Conservative / Balanced / Aggressive options</li>
                <li>AI-generated anchor text suggestions</li>
                <li>Source page prioritization by coverage</li>
                <li>Filter by coverage band and entity type</li>
              </ul>
            </div>

            {/* Searcher Journey */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-high/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-high" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">Searcher Journey</h3>
              <p className="font-light text-text-secondary leading-relaxed">
                Map content to user needs: Awareness, Consideration, Decision stages. Not keyword volume guesses.
              </p>
            </div>

            {/* ICP Research */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">ICP Research</h3>
              <p className="font-light text-text-secondary leading-relaxed">
                Analyze 50+ real customer conversations. Document pain points, objections, language patterns. Root everything in real customer needs.
              </p>
            </div>

            {/* Competitive Intel */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-imp-high/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-imp-high" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">Competitive Intel</h3>
              <p className="font-light text-text-secondary leading-relaxed">
                100+ targeted search queries. Scrape and analyze top-ranking content. Know exactly what's working in your niche.
              </p>
            </div>

            {/* Visualization */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-low/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-low" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">Interactive Graph</h3>
              <p className="font-light text-text-secondary leading-relaxed">
                D3.js visualization. Filter by category, importance, coverage. Compare against competitors. The "holy shit" moment in sales calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Planning - NEW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium mb-4 tracking-wide">CAMPAIGN PLANNING</p>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-tight mb-6">
                From coverage gaps to client proposals in minutes
              </h2>
              <p className="text-lg font-light text-text-secondary leading-relaxed mb-6">
                Set coverage targets. Calculate content needed. Generate project scope with exact pricing. Close deals with data.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="font-medium text-text-primary">Coverage Target Setting</p>
                    <p className="text-sm text-text-secondary font-light">Critical: 10 articles, High: 8, Medium: 5, Low: 3 - adjust per client needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                  <div>
                    <p className="font-medium text-text-primary">Automatic Scope Calculation</p>
                    <p className="text-sm text-text-secondary font-light">Exactly how many entities need content, how many articles total, predicted score improvement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-high mt-2"></div>
                  <div>
                    <p className="font-medium text-text-primary">Flexible Pricing Models</p>
                    <p className="text-sm text-text-secondary font-light">Per-article, topic gap percentage, or flat retainer - project value calculated automatically</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-imp-high mt-2"></div>
                  <div>
                    <p className="font-medium text-text-primary">Timeline-Based Phases</p>
                    <p className="text-sm text-text-secondary font-light">3, 6, 9, or 12 month campaigns with phased content delivery</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-light">
              <p className="text-sm text-text-tertiary mb-4 font-medium">CAMPAIGN SCOPE PREVIEW</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary font-light">Entities needing content</span>
                  <span className="text-2xl font-black text-text-primary">127</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary font-light">Total articles required</span>
                  <span className="text-2xl font-black text-text-primary">342</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary font-light">Current score</span>
                  <span className="text-2xl font-black text-low">35%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-text-secondary font-light">Target score</span>
                  <span className="text-2xl font-black text-high">78%</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-bg-tertiary rounded-lg px-4">
                  <span className="text-text-primary font-medium">Project Value</span>
                  <span className="text-2xl font-black text-primary">$48,600</span>
                </div>
              </div>
              <p className="text-xs text-text-tertiary mt-4 font-light text-center">
                At $50/brief + $100/article over 6 months
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Workflow Automation */}
      <section className="py-24 px-6 bg-gradient-to-br from-high/5 to-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">END-TO-END AUTOMATION</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              12 Automated Workflows. One Platform.
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-2xl mx-auto">
              From ICP research to published content. Every step automated, every output connected.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "ICP Generation", desc: "24-section customer profile from real data" },
              { name: "Website Scraping", desc: "Crawl and index your entire site" },
              { name: "Embedding Generation", desc: "Convert pages to semantic vectors" },
              { name: "EICS Generation", desc: "490-630 entities with relationships" },
              { name: "Entity Embedding", desc: "Make knowledge graph searchable" },
              { name: "Topical Authority", desc: "Score coverage across all entities" },
              { name: "Brief Generation", desc: "Strategic briefs per intent" },
              { name: "Article Generation", desc: "ICP-aligned content from briefs" },
              { name: "Internal Linking", desc: "AI-powered link suggestions" },
              { name: "Competitor Scraping", desc: "Index competitor content" },
              { name: "Competitor Embedding", desc: "Enable side-by-side comparison" },
              { name: "Visualization", desc: "Interactive knowledge graph" },
            ].map((workflow, i) => (
              <div key={i} className="bg-bg-secondary rounded-xl p-4 border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-high/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-high">{i + 1}</span>
                  </div>
                  <p className="font-medium text-text-primary text-sm">{workflow.name}</p>
                </div>
                <p className="text-xs text-text-tertiary font-light">{workflow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale & Automation - Impressive Numbers */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">THE SCALE</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Enterprise-grade automation. One-click deployment.
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-2xl mx-auto">
              What would take a team weeks happens in hours. Here's what's working behind the scenes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-bg-secondary rounded-2xl p-8 border border-border-light text-center">
              <p className="text-6xl font-black text-primary mb-2">70+</p>
              <p className="text-xl font-medium text-text-primary mb-2">Specialized AI Agents</p>
              <p className="text-sm text-text-secondary font-light">
                Each agent has a single job. Research agents, writing agents, scoring agents, validation agents - coordinated automatically.
              </p>
            </div>
            <div className="bg-bg-secondary rounded-2xl p-8 border border-border-light text-center">
              <p className="text-6xl font-black text-accent mb-2">1,000</p>
              <p className="text-xl font-medium text-text-primary mb-2">Pages Scraped Per Site</p>
              <p className="text-sm text-text-secondary font-light">
                Every page indexed, embedded, and compared against your knowledge graph. Nothing is missed.
              </p>
            </div>
            <div className="bg-bg-secondary rounded-2xl p-8 border border-border-light text-center">
              <p className="text-6xl font-black text-high mb-2">630</p>
              <p className="text-xl font-medium text-text-primary mb-2">Entities Mapped</p>
              <p className="text-sm text-text-secondary font-light">
                Each with 10 search intents, relationship mapping, and dual scoring. That's 6,300+ intent queries per project.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-bg-secondary rounded-xl p-6 border border-border-light">
              <p className="text-3xl font-black text-text-primary mb-1">27</p>
              <p className="text-sm font-medium text-text-secondary">Reusable Skills</p>
              <p className="text-xs text-text-tertiary font-light mt-1">Embedding, scraping, scoring, visualization</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-6 border border-border-light">
              <p className="text-3xl font-black text-text-primary mb-1">50+</p>
              <p className="text-sm font-medium text-text-secondary">Real Conversations</p>
              <p className="text-xs text-text-tertiary font-light mt-1">Reddit, reviews, forums analyzed for ICP</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-6 border border-border-light">
              <p className="text-3xl font-black text-text-primary mb-1">100+</p>
              <p className="text-sm font-medium text-text-secondary">Search Queries</p>
              <p className="text-xs text-text-tertiary font-light mt-1">Generated per competitive analysis</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-6 border border-border-light">
              <p className="text-3xl font-black text-text-primary mb-1">24</p>
              <p className="text-sm font-medium text-text-secondary">ICP Sections</p>
              <p className="text-xs text-text-tertiary font-light mt-1">Complete customer profile framework</p>
            </div>
          </div>

          <div className="mt-12 bg-bg-secondary rounded-2xl p-8 border border-border-light">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-2xl font-black text-text-primary mb-2">The Labor Saved</p>
                <p className="text-text-secondary font-light">
                  An SEO strategist doing this manually: 3-4 weeks.<br/>
                  Thorbit automation: 4-6 hours.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center px-6 py-4 bg-bg-tertiary rounded-xl">
                  <p className="text-sm text-text-tertiary font-light">Manual</p>
                  <p className="text-2xl font-black text-low">160+ hrs</p>
                </div>
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="text-center px-6 py-4 bg-primary/10 rounded-xl border border-primary/30">
                  <p className="text-sm text-primary font-light">Thorbit</p>
                  <p className="text-2xl font-black text-high">6 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Quality Flow */}
      <section className="py-24 px-6 bg-gradient-to-br from-accent/5 to-high/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">CONTENT THAT CONVERTS</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Every word rooted in customer reality
            </h2>
            <p className="text-xl font-light text-text-secondary max-w-2xl mx-auto">
              Content briefs don't just tell writers what to cover - they tell them exactly how your customer talks, thinks, and decides.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg-primary rounded-2xl p-6 border border-border-light">
              <div className="text-xs font-medium text-primary mb-4">FROM ICP</div>
              <h3 className="text-lg font-black text-text-primary mb-3">Pain Point Integration</h3>
              <p className="text-sm text-text-secondary font-light mb-4">
                "I don't feel like me anymore" - actual customer language woven into every section heading and opening hook.
              </p>
              <div className="bg-bg-tertiary rounded-lg p-3 text-xs text-text-tertiary font-light">
                <span className="text-primary font-medium">addresses_icp_language:</span><br/>
                - "scared of looking fake"<br/>
                - "don't want to be a cautionary tale"
              </div>
            </div>

            <div className="bg-bg-primary rounded-2xl p-6 border border-border-light">
              <div className="text-xs font-medium text-accent mb-4">INTO BRIEFS</div>
              <h3 className="text-lg font-black text-text-primary mb-3">Strategic Structure</h3>
              <p className="text-sm text-text-secondary font-light mb-4">
                Question-based H2s from real searches. Word counts derived from urgency + complexity, not arbitrary templates.
              </p>
              <div className="bg-bg-tertiary rounded-lg p-3 text-xs text-text-tertiary font-light">
                <span className="text-accent font-medium">content_characteristics:</span><br/>
                urgency: "medium"<br/>
                scope: "comprehensive"<br/>
                target_length: "2200-2600"
              </div>
            </div>

            <div className="bg-bg-primary rounded-2xl p-6 border border-border-light">
              <div className="text-xs font-medium text-high mb-4">TO CONTENT</div>
              <h3 className="text-lg font-black text-text-primary mb-3">Differentiated Copy</h3>
              <p className="text-sm text-text-secondary font-light mb-4">
                Your three uniques woven naturally. Proof points placed strategically. Failed solutions addressed with empathy.
              </p>
              <div className="bg-bg-tertiary rounded-lg p-3 text-xs text-text-tertiary font-light">
                <span className="text-high font-medium">differentiator_placement:</span><br/>
                "We provide 3 options at different price points - you choose"<br/>
                <span className="text-text-quaternary">→ Section: Why Quotes Vary</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-medium mb-4 tracking-wide">MEASURABLE PROGRESS</p>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-8">
            Track Authority Over Time
          </h2>

          <div className="bg-bg-secondary rounded-2xl p-8 border border-border-light">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-center">
                <p className="text-sm text-text-tertiary font-light mb-2">Month 0</p>
                <p className="text-3xl font-black text-low">35%</p>
                <p className="text-xs text-text-tertiary font-light">Baseline</p>
              </div>
              <div className="hidden md:block flex-1 h-2 bg-bg-tertiary rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[35%] bg-low rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-tertiary font-light mb-2">Month 3</p>
                <p className="text-3xl font-black text-medium">55%</p>
                <p className="text-xs text-text-tertiary font-light">+20%</p>
              </div>
              <div className="hidden md:block flex-1 h-2 bg-bg-tertiary rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[55%] bg-medium rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-tertiary font-light mb-2">Month 6</p>
                <p className="text-3xl font-black text-high">75%</p>
                <p className="text-xs text-text-tertiary font-light">+40%</p>
              </div>
              <div className="hidden md:block flex-1 h-2 bg-bg-tertiary rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[75%] bg-high rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-tertiary font-light mb-2">Month 12</p>
                <p className="text-3xl font-black text-high">90%</p>
                <p className="text-xs text-text-tertiary font-light">Authority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-tertiary to-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-4 tracking-wide">WHO IT'S FOR</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Built for SEO Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Agencies */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">SEO Agencies</h3>
              <p className="font-light text-text-secondary leading-relaxed mb-6">
                Win deals with visual proof. Load a prospect's site, show sparse coverage, load their competitor's dense graph. "This is why you're not ranking."
              </p>
              <p className="text-sm text-primary font-medium">Close deals with evidence, not promises.</p>
            </div>

            {/* In-House */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">In-House Teams</h3>
              <p className="font-light text-text-secondary leading-relaxed mb-6">
                End the "what should we write" debates. Dual scoring tells you what matters. Track measurable progress quarter over quarter.
              </p>
              <p className="text-sm text-accent font-medium">Data-driven decisions, justified budgets.</p>
            </div>

            {/* Strategists */}
            <div className="bg-bg-primary rounded-2xl p-8 border border-border-light">
              <div className="w-12 h-12 rounded-xl bg-high flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">Content Strategists</h3>
              <p className="font-light text-text-secondary leading-relaxed mb-6">
                Map 490-630 entities before writing anything. Entity cards give writers complete context. Know when you've achieved authority.
              </p>
              <p className="text-sm text-high font-medium">Systematic roadmaps, not random topics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-12">
            The Promise
          </h2>
          <div className="space-y-6 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-high flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-light text-text-primary">
                Never ask <span className="font-medium">"What should we write next?"</span> without a data-backed answer.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-high flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-light text-text-primary">
                Never wonder <span className="font-medium">"Why are they ranking?"</span> without visual proof.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-high flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-light text-text-primary">
                Never pitch <span className="font-medium">"We'll help your SEO"</span> without a strategic roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-24 px-6 bg-gradient-to-br from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Stop guessing. Start measuring.
          </h2>
          <p className="text-xl font-light text-white/90 mb-10">
            See your topical landscape. Understand your gaps. Build authority systematically.
          </p>
          <a
            href="mailto:demo@thorbit.com"
            className="inline-block bg-white hover:bg-bg-secondary text-text-primary px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Book a Demo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gradient-to-r from-primary to-accent border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black text-white">Thorbit</span>
          <p className="text-sm font-light text-white/80">
            Topical Authority Measurement Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
