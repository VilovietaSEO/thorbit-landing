"use client";

import { useState, lazy, Suspense } from "react";
import { Menu, X } from "lucide-react";
import ICPModal from "@/components/ICPModal";
import BriefModal from "@/components/BriefModal";
import ContentModal from "@/components/ContentModal";

const EICSGraphFull = lazy(() => import("@/components/EICSGraphFull"));
const CampaignArchitectFlow = lazy(() => import("@/components/CampaignArchitectFlow"));
const InternalLinkingFlow = lazy(() => import("@/components/InternalLinkingFlow"));

// Animated Dashboard Component
function InteractiveCardStack() {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const entities = [
    { name: "Water Heater Repair", category: "services", importance: "high", score: 0.87, high: 12, medium: 8, low: 3, relationships: 15 },
    { name: "ADHD Assessment", category: "services", importance: "high", score: 0.72, high: 0, medium: 14, low: 35, relationships: 15 },
    { name: "Access Barriers", category: "systems", importance: "high", score: 0.48, high: 6, medium: 557, low: 55, relationships: 10 },
    { name: "Emergency Plumbing", category: "services", importance: "medium", score: 0.64, high: 5, medium: 12, low: 8, relationships: 12 },
    { name: "Pipe Installation", category: "services", importance: "medium", score: 0.41, high: 2, medium: 218, low: 370, relationships: 8 },
    { name: "Insurance Coverage", category: "systems", importance: "critical", score: 0.23, high: 0, medium: 17, low: 20, relationships: 19 },
    { name: "Medication Management", category: "services", importance: "high", score: 0.55, high: 8, medium: 124, low: 42, relationships: 22 },
    { name: "Drain Cleaning", category: "services", importance: "high", score: 0.79, high: 15, medium: 6, low: 2, relationships: 9 }
  ];

  useState(() => {
    // Auto-scroll animation
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % entities.length);
    }, 2000);

    // Sequential fade-in
    entities.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRows((prev) => [...prev, index]);
      }, index * 150);
    });

    return () => clearInterval(interval);
  });

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'critical': return 'text-low bg-low/10';
      case 'high': return 'text-medium bg-medium/10';
      case 'medium': return 'text-medium bg-medium/10';
      default: return 'text-high bg-high/10';
    }
  };

  return (
    <div className="w-full bg-bg-primary rounded-2xl border-2 border-border-light shadow-2xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-teal/10 to-sage/10 px-4 md:px-6 py-4 border-b-2 border-border-light">
        <h3 className="text-lg md:text-xl font-black text-text-primary">Entity Dashboard</h3>
        <p className="text-xs md:text-sm text-text-tertiary">Real-time entity coverage analysis</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden" style={{ maxHeight: '500px' }}>
        {/* Table Header */}
        <div className="grid grid-cols-[2fr,1fr,0.8fr,0.6fr,0.6fr,0.6fr,0.8fr] gap-4 px-6 py-3 bg-bg-secondary border-b border-border-light sticky top-0 z-10">
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Entity</div>
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Importance</div>
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider text-center">Score</div>
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider text-center">High</div>
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider text-center">Med</div>
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider text-center">Low</div>
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider text-center">Links</div>
        </div>

        {/* Table Rows */}
        <div className="relative">
          {entities.map((entity, index) => {
            const isVisible = visibleRows.includes(index);
            const isInSpotlight = index === scrollPosition;

            return (
              <div
                key={index}
                className={`grid grid-cols-[2fr,1fr,0.8fr,0.6fr,0.6fr,0.6fr,0.8fr] gap-4 px-6 py-4 border-b border-border-light transition-all duration-700 ${
                  isInSpotlight ? 'bg-teal/5 shadow-inner' : 'hover:bg-bg-secondary/50'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div>
                  <div className="font-bold text-text-primary">{entity.name}</div>
                  <div className="text-xs text-text-tertiary">{entity.category}</div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getImportanceColor(entity.importance)}`}>
                    {entity.importance}
                  </span>
                </div>
                <div className="flex items-center justify-center font-black text-text-primary text-lg">
                  {isVisible ? entity.score.toFixed(2) : '0.00'}
                </div>
                <div className="flex items-center justify-center">
                  <span className="px-2 py-1 rounded-lg bg-emerald/20 text-emerald font-bold text-sm min-w-[2.5rem] text-center">
                    {isVisible ? entity.high : 0}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="px-2 py-1 rounded-lg bg-medium/20 text-medium font-bold text-sm min-w-[2.5rem] text-center">
                    {isVisible ? entity.medium : 0}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="px-2 py-1 rounded-lg bg-low/20 text-low font-bold text-sm min-w-[2.5rem] text-center">
                    {isVisible ? entity.low : 0}
                  </span>
                </div>
                <div className="flex items-center justify-center font-bold text-text-primary">
                  {isVisible ? entity.relationships : 0}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden overflow-hidden" style={{ maxHeight: '500px' }}>
        <div className="p-4 space-y-3">
          {entities.map((entity, index) => {
            const isVisible = visibleRows.includes(index);
            const isInSpotlight = index === scrollPosition;

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border border-border-light transition-all duration-700 ${
                  isInSpotlight ? 'bg-teal/5 border-teal/30' : 'bg-bg-secondary/30'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Entity Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-text-primary text-sm">{entity.name}</div>
                    <div className="text-xs text-text-tertiary">{entity.category}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getImportanceColor(entity.importance)}`}>
                    {entity.importance}
                  </span>
                </div>

                {/* Score */}
                <div className="flex items-center justify-center mb-3">
                  <div className="text-center">
                    <div className="text-3xl font-black text-text-primary">{isVisible ? entity.score.toFixed(2) : '0.00'}</div>
                    <div className="text-xs text-text-tertiary uppercase">Score</div>
                  </div>
                </div>

                {/* Coverage Stats */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="block px-2 py-1 rounded-lg bg-emerald/20 text-emerald font-bold text-sm">
                      {isVisible ? entity.high : 0}
                    </span>
                    <span className="text-xs text-text-tertiary mt-1 block">High</span>
                  </div>
                  <div>
                    <span className="block px-2 py-1 rounded-lg bg-medium/20 text-medium font-bold text-sm">
                      {isVisible ? entity.medium : 0}
                    </span>
                    <span className="text-xs text-text-tertiary mt-1 block">Med</span>
                  </div>
                  <div>
                    <span className="block px-2 py-1 rounded-lg bg-low/20 text-low font-bold text-sm">
                      {isVisible ? entity.low : 0}
                    </span>
                    <span className="text-xs text-text-tertiary mt-1 block">Low</span>
                  </div>
                  <div>
                    <span className="block px-2 py-1 rounded-lg bg-bg-secondary text-text-primary font-bold text-sm">
                      {isVisible ? entity.relationships : 0}
                    </span>
                    <span className="text-xs text-text-tertiary mt-1 block">Links</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-bg-secondary px-4 md:px-6 py-4 border-t-2 border-border-light">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-text-tertiary">Showing <span className="font-bold text-text-primary">{entities.length}</span> of <span className="font-bold text-text-primary">604</span> entities</p>
          <div className="flex gap-4 md:gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald"></div>
              <span className="text-text-tertiary">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-medium"></div>
              <span className="text-text-tertiary">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-low"></div>
              <span className="text-text-tertiary">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [icpModalOpen, setIcpModalOpen] = useState(false);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);

  const icpSections = [
    "Avatar", "Before/After State", "Decision Triggers", "Primary Goals",
    "Secondary Goals", "Dreams", "Promises", "Primary Complaint",
    "Secondary Complaint", "Negative Statistics", "Objections", "Bad Habits",
    "Consequences", "Enemy", "Ultimate Fear", "False Solution Lie",
    "False Solution Truth", "False Solution Tip", "Mistaken Belief Truth",
    "Mistaken Belief Name", "Success Myth Lie", "Success Myth Truth",
    "What They Tried", "Why It Failed"
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
            <a href="#how-it-works" className="text-text-secondary hover:text-teal transition-colors font-light">
              How It Works
            </a>
            <a href="#features" className="text-text-secondary hover:text-teal transition-colors font-light">
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
                className="text-text-secondary hover:text-teal transition-colors font-light py-2"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-teal transition-colors font-light py-2"
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
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.15] tracking-tight mb-8 text-center">
              Specialized AI Agent Swarms That Automate Research, Analysis, and SEO Execution
            </h1>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-10">
              Enter a URL, get a $5,000 buyer persona report in 20 minutes. Prove your topic coverage across the buyer journey, close more deals—without hiring anyone. Deep Research, Python Scripts, NLP tools, and hand-crafted marketing experts that think, iterate, and execute.
            </p>
            <div className="flex justify-center">
              <a
                href="#demo"
                className="bg-primary hover:bg-primary-dark text-bg-primary px-8 py-4 rounded-xl font-medium text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Interactive Graph */}
          <div className="max-w-6xl mx-auto">
            <div className="h-[600px] shadow-xl rounded-2xl overflow-hidden border-2 border-teal/20">
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

          {/* Entity Coverage */}
          <div className="max-w-6xl mx-auto mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
                Understand how well your website covers each topic.
              </h2>
              <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
                <span className="font-bold text-text-primary">The knowledge graph is the answer.</span> It's a complete map of your domain—every topic, every relationship, every search intent—built in under 2 hours instead of 6 months of manual research. When you can see the entire topical territory at once, you stop guessing what to write and start filling documented gaps systematically.
              </p>
            </div>

            {/* Dashboard Visual */}
            <InteractiveCardStack />
          </div>
        </div>
      </section>

      {/* ICP Foundation Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">FOUNDATION FIRST</p>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-tight mb-6">
              Start With <span className="bg-teal text-white px-1 rounded">People</span>, Not Keywords
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              Most tools give you keywords. We give you the exact words your customers use—extracted from thousands of real conversations. Pain points, objections, desires, and statistics that transform how you write everything. All it takes is a single click and 50 AI agents read thousands of comments, comb the internet for stats, and synthesize 70+ customer conversations.
            </p>
          </div>

          {/* ICP Framework Grid - 6 columns x 4 rows */}
          <div className="card-v2 bg-bg-primary rounded-2xl p-8 border-2 border-teal/20 mb-8 transition-all duration-300 hover:border-teal/40 hover:shadow-xl hover:-translate-y-1">
            <p className="text-sm text-primary mb-6 font-medium uppercase tracking-wide text-center">24-SECTION ICP FRAMEWORK</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm mb-8">
              {icpSections.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-3 px-4 rounded-lg bg-white/70 border border-sage/30 hover:border-teal hover:bg-teal/5 transition-all hover:scale-105"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: '#C4704F',
                      boxShadow: '0 0 0 0 rgba(196, 112, 79, 0.7)',
                      animation: `pulse-ring-orange 2s ease-out infinite`,
                      animationDelay: `${i * 0.08}s`
                    }}
                  ></div>
                  <span className="text-text-secondary font-light text-xs leading-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setIcpModalOpen(true)}
                className="btn-secondary-v2 px-12 py-4 text-center hover:scale-105 transition-all"
              >
                View Full ICP Example
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Lab Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">CONTENT THAT CONVERTS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-6">
              Stop Writing for Keywords.<br />
              Start Writing for Humans.
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-12">
              Most AI tools use 1-3 agents. Thorbit orchestrates 50+ specialized agents—research, strategy, writing, quality loops—built on a decade of marketing expertise and 3,000 hours of AI engineering. Click below and see what that actually produces. You might find that the brief is more detailed than anything a human has ever been able to produce for you, and the content is perfectly adjusted and optimized for your audience.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => setBriefModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-6 font-bold text-lg transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Strategic Brief</span>
              </div>
            </button>

            <button
              onClick={() => setContentModalOpen(true)}
              className="bg-accent hover:bg-accent-hover text-white rounded-xl px-8 py-6 font-bold text-lg transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>View Published Content</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Architect Flow */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">CAMPAIGN PLANNING</p>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
              From Gaps to <span className="bg-teal text-white px-2 rounded">Roadmap</span>. We Automatically Convert Data into Strategy Based on Your Priorities.
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              Custom campaigns automatically built out so you can prioritize the strategy based on a few simple choices. Customize how many articles you want to create per entity of every importance level. Choose a pricing model based on topic gap percentage or brief and article à la carte cost. Or maybe you just want to flat rate. Or you're a business owner and you'll just skip that part and go straight into the Campaign Duration.
            </p>
          </div>

          <Suspense fallback={
            <div className="h-[500px] bg-bg-secondary rounded-2xl flex items-center justify-center border-2 border-border-light">
              <div className="text-center p-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-secondary font-light">Loading interactive flow...</p>
              </div>
            </div>
          }>
            <CampaignArchitectFlow />
          </Suspense>

          <p className="text-center mt-6 text-sm text-text-tertiary font-light">
            Click steps or press play to see the transformation
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-8">
            Stop Guessing. Start <span className="bg-teal text-white px-1 rounded">Proving</span>.
          </h2>
          <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-12">
            See how Google sees your site—content clusters, topical density, coverage gaps. Prove to prospects why they need you. Defend your budget with data. Predict exactly how many articles it takes to compete. What once took 40 hours of manual analysis is now automatic.
          </p>

          {/* Coverage Comparison Visualization */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Your Site - Sparse */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-text-primary mb-2">Your Site</h3>
                <p className="text-text-secondary font-light">Scattered coverage</p>
              </div>

              <div className="relative w-full h-96 bg-gradient-to-br from-bg-tertiary to-bg-secondary rounded-xl border border-border-light">
                {/* Sparse dots - random placement */}
                <div className="absolute top-[15%] left-[20%] w-4 h-4 rounded-full bg-low opacity-60"></div>
                <div className="absolute top-[45%] right-[25%] w-3.5 h-3.5 rounded-full bg-medium opacity-60"></div>
                <div className="absolute bottom-[30%] left-[15%] w-3 h-3 rounded-full bg-text-tertiary opacity-40"></div>
                <div className="absolute top-[70%] right-[35%] w-3.5 h-3.5 rounded-full bg-low opacity-60"></div>
                <div className="absolute bottom-[15%] left-[55%] w-4 h-4 rounded-full bg-high opacity-50"></div>
                <div className="absolute top-[30%] left-[70%] w-3 h-3 rounded-full bg-medium opacity-60"></div>
              </div>
            </div>

            {/* Top Competitor - Dense */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-text-primary mb-2">Top Competitor</h3>
                <p className="text-text-secondary font-light">Comprehensive authority</p>
              </div>

              <div className="relative w-full h-96 bg-gradient-to-br from-bg-tertiary to-bg-secondary rounded-xl border border-border-light">
                {/* Dense dots - clustered placement */}
                <div className="absolute top-[12%] left-[45%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute top-[18%] right-[15%] w-3 h-3 rounded-full bg-medium"></div>
                <div className="absolute top-[25%] left-[35%] w-4 h-4 rounded-full bg-high"></div>
                <div className="absolute top-[32%] right-[25%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute top-[38%] left-[50%] w-3 h-3 rounded-full bg-high"></div>
                <div className="absolute top-[42%] right-[35%] w-3.5 h-3.5 rounded-full bg-medium"></div>
                <div className="absolute top-[48%] left-[25%] w-4 h-4 rounded-full bg-high"></div>
                <div className="absolute top-[52%] right-[45%] w-3 h-3 rounded-full bg-high"></div>
                <div className="absolute top-[58%] left-[60%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute top-[62%] right-[20%] w-3 h-3 rounded-full bg-medium"></div>
                <div className="absolute top-[68%] left-[40%] w-4 h-4 rounded-full bg-high"></div>
                <div className="absolute top-[72%] right-[30%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute top-[78%] left-[55%] w-3 h-3 rounded-full bg-high"></div>
                <div className="absolute bottom-[12%] right-[40%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute bottom-[8%] left-[30%] w-4 h-4 rounded-full bg-medium"></div>
                <div className="absolute top-[35%] left-[15%] w-3 h-3 rounded-full bg-high"></div>
                <div className="absolute top-[55%] right-[55%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute top-[22%] left-[65%] w-3 h-3 rounded-full bg-medium"></div>
                <div className="absolute bottom-[25%] left-[45%] w-3.5 h-3.5 rounded-full bg-high"></div>
                <div className="absolute bottom-[18%] right-[15%] w-3 h-3 rounded-full bg-high"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topical Authority Score Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">TOPICAL AUTHORITY SCORE</p>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
              One Score. <span className="bg-teal text-white px-2 rounded">Complete Clarity.</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              Get a definitive score on your domain. Break it out by category and by importance. Prioritize filling the gaps in the areas that matter most to you.
            </p>
          </div>

          {/* Topical Authority Dashboard */}
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Main Score Card */}
            <div className="bg-bg-primary rounded-2xl border-2 border-border-light p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-black text-text-primary mb-1">Topical Authority Score</h3>
                  <p className="text-text-tertiary font-light mb-6">genesight.com</p>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <p className="text-sm text-text-tertiary">Points Earned</p>
                      <p className="text-2xl font-black text-text-primary">724.0 / 1071.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary">Entities</p>
                      <p className="text-2xl font-black text-text-primary">586</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary">At 100%</p>
                      <p className="text-2xl font-black text-high">239</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary">Content Gap</p>
                      <p className="text-2xl font-black text-low">1027 URLs</p>
                    </div>
                  </div>
                </div>

                {/* Score Circle */}
                <div className="flex-shrink-0">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-tertiary)" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--accent)" strokeWidth="10" strokeDasharray="314" strokeDashoffset="102" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-accent">67.6</span>
                      <span className="text-sm text-text-tertiary">out of 100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* By Importance Level */}
              <div className="bg-bg-primary rounded-2xl border-2 border-border-light p-6">
                <h4 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  <span className="text-primary">◉</span> By Importance Level
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-text-primary">Critical <span className="text-text-tertiary font-light">(50 entities)</span></span>
                      <span className="font-bold text-low">52.1%</span>
                    </div>
                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-low rounded-full" style={{ width: '52.1%' }}></div>
                    </div>
                    <p className="text-xs text-text-tertiary mt-1">104.2 / 200.0 pts &nbsp;•&nbsp; Target: 10 URLs | Weight: 4x</p>
                    <p className="text-xs text-low mt-1">Gap: 262 quality URLs needed</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-text-primary">High <span className="text-text-tertiary font-light">(124 entities)</span></span>
                      <span className="font-bold text-medium">68.4%</span>
                    </div>
                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-medium rounded-full" style={{ width: '68.4%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-text-primary">Medium <span className="text-text-tertiary font-light">(198 entities)</span></span>
                      <span className="font-bold text-high">74.2%</span>
                    </div>
                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-high rounded-full" style={{ width: '74.2%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-text-primary">Low <span className="text-text-tertiary font-light">(214 entities)</span></span>
                      <span className="font-bold text-high">89.1%</span>
                    </div>
                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-high rounded-full" style={{ width: '89.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* By Category */}
              <div className="bg-bg-primary rounded-2xl border-2 border-border-light p-6">
                <h4 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  <span className="text-accent">▊</span> By Category
                </h4>

                <div className="space-y-3">
                  {[
                    { name: 'symptoms conditions', entities: 101, pct: 47.8, gap: 233, color: 'bg-low' },
                    { name: 'causes triggers', entities: 74, pct: 63.5, gap: 140, color: 'bg-medium' },
                    { name: 'services', entities: 89, pct: 78.2, gap: 87, color: 'bg-high' },
                    { name: 'brands products', entities: 67, pct: 71.4, gap: 112, color: 'bg-medium' },
                    { name: 'systems processes', entities: 82, pct: 69.8, gap: 156, color: 'bg-medium' },
                  ].map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-text-primary">{cat.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-text-tertiary">{cat.entities} entities</span>
                          <span className={`font-bold ${cat.pct >= 70 ? 'text-high' : cat.pct >= 55 ? 'text-medium' : 'text-low'}`}>{cat.pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }}></div>
                      </div>
                      <p className="text-xs text-text-tertiary mt-1">Gap: {cat.gap} URLs</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category × Importance Matrix */}
            <div className="bg-bg-primary rounded-2xl border-2 border-border-light p-6 overflow-x-auto">
              <h4 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                <span className="text-secondary">↗</span> Category × Importance Matrix
              </h4>

              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="text-sm text-text-tertiary">
                    <th className="text-left font-medium pb-3">Category</th>
                    <th className="text-center font-medium pb-3">Critical</th>
                    <th className="text-center font-medium pb-3">High</th>
                    <th className="text-center font-medium pb-3">Medium</th>
                    <th className="text-center font-medium pb-3">Low</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { cat: 'brands products', critical: 74, high: 61, medium: 73, low: 82 },
                    { cat: 'causes triggers', critical: 28, high: 58, medium: 80, low: 98 },
                    { cat: 'governance compliance', critical: 36, high: 71, medium: 74, low: 83 },
                    { cat: 'services', critical: 70, high: 79, medium: 91, low: 96 },
                    { cat: 'symptoms conditions', critical: 37, high: 45, medium: 57, low: 38 },
                    { cat: 'systems processes', critical: 61, high: 75, medium: 75, low: 91 },
                    { cat: 'tools materials', critical: 63, high: 50, medium: 74, low: 113 },
                  ].map((row) => (
                    <tr key={row.cat} className="border-t border-border-light">
                      <td className="py-3 font-medium text-text-primary">{row.cat}</td>
                      <td className="py-3 text-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${row.critical >= 70 ? 'bg-high/20 text-high' : row.critical >= 50 ? 'bg-medium/20 text-medium' : 'bg-low/20 text-low'}`}>{row.critical}%</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${row.high >= 70 ? 'bg-high/20 text-high' : row.high >= 50 ? 'bg-medium/20 text-medium' : 'bg-low/20 text-low'}`}>{row.high}%</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${row.medium >= 70 ? 'bg-high/20 text-high' : row.medium >= 50 ? 'bg-medium/20 text-medium' : 'bg-low/20 text-low'}`}>{row.medium}%</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${row.low >= 70 ? 'bg-high/20 text-high' : row.low >= 50 ? 'bg-medium/20 text-medium' : 'bg-low/20 text-low'}`}>{row.low}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">INTERNAL LINKING</p>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
              AI-Powered Link <span className="bg-teal text-white px-2 rounded">Suggestions</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-6">
              Your knowledge graph already maps how entities relate to each other. We use those relationships to discover linking opportunities: if Entity A relates to Entity B, and both have page coverage, we find the exact paragraph where that connection makes semantic sense. Then AI generates anchor text that fits naturally into the surrounding content.
            </p>
            <p className="text-lg md:text-xl font-light text-text-tertiary leading-relaxed max-w-3xl mx-auto">
              Not "these pages share keywords." Not even "these pages are relevant." But "this specific paragraph is the right place to connect these two concepts, and here's copy that reads like it belongs there."
            </p>
          </div>

          <Suspense fallback={
            <div className="h-[500px] bg-bg-primary rounded-2xl flex items-center justify-center border-2 border-border-light">
              <div className="text-center p-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-secondary font-light">Loading interactive demo...</p>
              </div>
            </div>
          }>
            <InternalLinkingFlow />
          </Suspense>

          <p className="text-center mt-6 text-sm text-text-tertiary font-light">
            Click Play to see the internal linking workflow in action
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Start With People. Build What Google Rewards.
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-10">
            See what your customers need. Measure topical authority the way Google does. Build strategic content that ranks and converts.
          </p>
          <a
            href="mailto:demo@thorbit.com"
            className="inline-block bg-white hover:bg-bg-secondary text-text-primary px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Book a Demo
          </a>
          <p className="text-sm text-white/80 mt-6">3-minute demo. No sales pitch. Just proof.</p>
        </div>
      </section>


      {/* Modals */}
      <ICPModal isOpen={icpModalOpen} onClose={() => setIcpModalOpen(false)} />
      <BriefModal isOpen={briefModalOpen} onClose={() => setBriefModalOpen(false)} />
      <ContentModal isOpen={contentModalOpen} onClose={() => setContentModalOpen(false)} />
    </div>
  );
}
