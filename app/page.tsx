"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
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

  useEffect(() => {
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
  }, []);

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
            <Link href="/why-us" className="text-text-secondary hover:text-teal transition-colors font-light">
              Why Us
            </Link>
            <Link
              href="/book-demo"
              target="_blank"
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
                className="text-text-secondary hover:text-teal transition-colors font-light py-2"
              >
                Why Us
              </Link>
              <Link
                href="/book-demo"
                target="_blank"
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
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.15] tracking-tight mb-8 text-center">
              The First Platform Where 100+ AI Agents Research, Strategize, AND Execute
            </h1>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-6">
              Not just keyword rankings. Not just content generation. Complete marketing intelligence—competitor research, customer psychology, strategic planning, and execution deliverables—in 3 hours instead of months.
            </p>
            <p className="text-lg md:text-xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-10">
              <strong className="font-bold text-text-primary">For agencies serving $1M+ clients.</strong> Win and retain premium accounts with intelligence that justifies your value. <strong className="font-bold text-text-primary">For $1M+ businesses.</strong> Build marketing capability in-house with intelligence infrastructure you couldn't access before.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/book-demo"
                target="_blank"
                className="bg-primary hover:bg-primary-dark text-bg-primary px-8 py-4 rounded-xl font-medium text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Book a Demo
              </Link>
              <a
                href="#platform"
                className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-medium text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                See Example Outputs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Research → Strategize → Execute */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-tight mb-6">
              Research → Strategize → Execute
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto mb-4">
              Agentic intelligence that autonomously interprets your data, builds strategy from research, and executes deliverables—without you having to bridge the gap between measurement and action.
            </p>
            <p className="text-lg md:text-xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              That's what 100+ agents working together actually means. Not just more AI. Autonomous interpretation and execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Research Column */}
            <div className="flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: 'rgba(107, 155, 90, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--high)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-3">Research</h3>
                <p className="font-medium text-base" style={{ color: 'var(--high)' }}>Deep Intelligence Across 4 Domains</p>
              </div>

              <div className="flex-1 bg-bg-primary rounded-xl p-6">
                <p className="text-lg text-text-secondary mb-4">100+ AI agents execute research that would take teams weeks:</p>
                <ul className="space-y-3 text-base text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Competitor Analysis</span> – Strategic gap identification at entity level.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Customer Psychology</span> – Real conversation analysis from 50-75 sources. Validated patterns, exact language.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Market Understanding</span> – Complete entity mapping with relationship intelligence across 500-600 topics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Business Context</span> – Your positioning, voice, and constraints extracted automatically from your site.</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border-light">
                  <p className="text-base"><span className="font-medium" style={{ color: 'var(--high)' }}>Result:</span> <span className="text-text-secondary">Proprietary intelligence that doesn't exist in any other tool.</span></p>
                </div>
              </div>
            </div>

            {/* Strategize Column */}
            <div className="flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: 'rgba(212, 165, 90, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--medium)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-3">Strategize</h3>
                <p className="font-medium text-base" style={{ color: 'var(--medium)' }}>Multi-Agent Synthesis</p>
              </div>

              <div className="flex-1 bg-bg-primary rounded-xl p-6">
                <p className="text-lg text-text-secondary mb-4">Agents synthesize across intelligence sources to generate:</p>
                <ul className="space-y-3 text-base text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Mathematical opportunity scoring</span> (not gut feeling prioritization)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Strategic roadmaps with phased execution</span> (what to do first and why)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Multi-channel recommendations</span> (search, LLM citations, conversion optimization)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Performance-driven adjustments</span> (signals trigger strategic responses)</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border-light">
                  <p className="text-base"><span className="font-medium" style={{ color: 'var(--medium)' }}>Result:</span> <span className="text-text-secondary">Strategy backed by intelligence, not assumptions.</span></p>
                </div>
              </div>
            </div>

            {/* Execute Column */}
            <div className="flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: 'rgba(217, 168, 84, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-3">Execute</h3>
                <p className="font-medium text-base" style={{ color: 'var(--accent)' }}>Complete Deliverables Ready to Use</p>
              </div>

              <div className="flex-1 bg-bg-primary rounded-xl p-6">
                <p className="text-lg text-text-secondary mb-4">Agents generate execution artifacts:</p>
                <ul className="space-y-3 text-base text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Strategic briefs</span> (2,500 words synthesizing 5 intelligence layers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Campaign roadmaps</span> (phased plans with ROI projections)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Content assets</span> (articles, landing pages informed by intelligence)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-text-tertiary mt-0.5">•</span>
                    <span><span className="font-bold text-text-primary">Optimization recommendations</span> (performance signals → strategic response)</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border-light">
                  <p className="text-base"><span className="font-medium" style={{ color: 'var(--accent)' }}>Result:</span> <span className="text-text-secondary">Outputs no human team can manually create at this speed and quality.</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-5xl mx-auto bg-bg-primary rounded-2xl p-8 border-l-4" style={{ borderColor: 'var(--teal)' }}>
            <p className="text-xl text-text-secondary text-center leading-relaxed mb-4">
              Every output is informed by research. Every strategy is backed by intelligence. Every execution artifact is powered by 100+ agents working together.
            </p>
            <p className="text-lg text-text-secondary text-center leading-relaxed">
              <span className="font-bold text-text-primary">And you don't need to configure anything.</span> Enter your URL. Agents figure out the rest—analyzing your site for positioning and voice, researching competitors, scanning forums for customer language, mapping your complete domain. No questionnaires. No uploads. <span className="font-bold" style={{ color: 'var(--teal)' }}>1-3 hours to complete intelligence.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Why 100+ Agents Beat 1-3 Prompts */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-6">
              Why 100+ Agents Beat 1-3 Prompts
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              It's not about quantity. It's about <span className="font-bold text-text-primary">intelligent orchestration.</span>
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-6xl mx-auto mb-12">
            {/* Header Row */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light text-center">
                <h3 className="text-xl font-black text-text-primary">Capability</h3>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light text-center">
                <h3 className="text-xl font-medium text-text-secondary">Typical AI Tools</h3>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light text-center">
                <h3 className="text-xl font-black text-primary">Thorbit</h3>
              </div>
            </div>

            {/* Competitor Website Scraping */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Competitor Scraping</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-high/10 flex items-center justify-center">
                  <span className="text-2xl leading-none font-bold" style={{ color: 'var(--high)' }}>✓</span>
                </div>
              </div>
            </div>

            {/* Customer Research */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Customer Research</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-base font-medium text-text-primary text-center">Thousands of comments across dozens of URLs</p>
              </div>
            </div>

            {/* Knowledge Graph */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Knowledge Graph</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-high/10 flex items-center justify-center">
                  <span className="text-2xl leading-none font-bold" style={{ color: 'var(--high)' }}>✓</span>
                </div>
              </div>
            </div>

            {/* Topical Authority */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Topical Authority</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
                <p className="text-sm text-text-tertiary text-center">Only backlink authority</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-base font-medium text-text-primary text-center">By category and importance across your site</p>
              </div>
            </div>

            {/* Content Strategy */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Content Strategy</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
                <p className="text-sm text-text-tertiary text-center">Keywords unrelated to buyer persona</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-base font-medium text-text-primary text-center">Full knowledge of niche, competitors, customers, and entities</p>
              </div>
            </div>

            {/* Content Briefs */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Content Briefs</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm text-text-tertiary text-center">Keyword counting and word count</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-base font-medium text-text-primary text-center">Tone, persona, CTAs, and reader psychology</p>
              </div>
            </div>

            {/* Content Writing */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Content Writing</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm text-text-tertiary text-center">Sequential prompts (outline → write → edit)</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-base font-medium text-text-primary text-center">50 agents with refinement loops and deep research</p>
              </div>
            </div>

            {/* Internal Linking */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-lg font-bold text-text-primary text-center">Internal Linking</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
                <p className="text-sm text-text-tertiary text-center">Keyword-based only</p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 border border-border-light flex items-center justify-center">
                <p className="text-base font-medium text-text-primary text-center">Topical opportunities with 3 integration methods</p>
              </div>
            </div>
          </div>

          {/* Intelligent Orchestration Section */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-10 text-center">
              Here's what intelligent orchestration means:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Research Agents */}
              <div className="bg-bg-primary rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Research agents</span> analyze competitors, conversations, and markets—building intelligence foundations.
                </p>
              </div>

              {/* Synthesis Agents */}
              <div className="bg-bg-primary rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Synthesis agents</span> connect insights across data sources—finding patterns humans can't manually identify.
                </p>
              </div>

              {/* Execution Agents */}
              <div className="bg-bg-primary rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Execution agents</span> generate deliverables informed by intelligence layers—producing outputs that reflect deep research.
                </p>
              </div>

              {/* Orchestrators */}
              <div className="bg-bg-primary rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Orchestrators</span> coordinate everything—ensuring consistency, triggering refinement, validating quality.
                </p>
              </div>
            </div>

            {/* The Result */}
            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-8 border border-border-light">
              <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4">
                <span className="font-bold text-text-primary">The result:</span> Strategic briefs that read like consultants spent weeks researching—because agents actually did. Content reflecting real customer language—because agents analyzed actual conversations. Campaign roadmaps with mathematical justification—because agents synthesized across intelligence to calculate priorities.
              </p>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                This is infrastructure, not a feature. Years of AI engineering, not ChatGPT with better prompts.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Section 4: Complete Platform Capabilities */}
      <section id="platform" className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-6">
              Intelligence Outputs + Complete Platform Features
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* ICP Research Documents */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">ICP Research Documents</h3>
              <p className="text-xl font-bold text-primary mb-6">Customer psychology with statistical validation</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                24-section framework extracted from <span className="font-bold text-primary">50-75 real conversations</span>. Pain points, language patterns, objections, decision triggers—validated with <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>frequency counts</span>.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: Men's mental health clinic</p>
                <p className="text-base text-text-secondary italic">
                  "73% of conversations mentioned 'feeling stuck in career'—validated across 68 Reddit threads"
                </p>
              </div>

              {/* ICP Framework Grid */}
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
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIcpModalOpen(true)}
                  className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                >
                  View Full ICP Example →
                </button>
                <p className="text-sm font-medium text-text-tertiary">1 hour vs. 2-4 weeks of customer interviews</p>
              </div>
            </div>

            {/* Knowledge Graph */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">Knowledge Graph</h3>
              <p className="text-xl font-bold text-primary mb-6">Complete topical territory mapped systematically</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                <span className="font-bold text-primary">500-600 entities</span> with <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>relationship intelligence</span> built from your ICP and market research. The measuring stick for coverage analysis, content strategy, and strategic prioritization.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: Plumbing services company</p>
                <p className="text-base text-text-secondary italic">
                  "Identified 47 strategic entity gaps. Competitor covers 180 entities, you cover 80—that's why they rank."
                </p>
              </div>

              <div className="mb-6" style={{ height: '750px' }}>
                <Suspense fallback={<div className="bg-bg-primary rounded-xl p-12 text-center text-text-tertiary h-full flex items-center justify-center">Loading interactive graph...</div>}>
                  <EICSGraphFull />
                </Suspense>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">3 hours vs. 4-6 months of market research</p>
            </div>

            {/* Entity Coverage Dashboard */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">Entity Coverage Dashboard</h3>
              <p className="text-xl font-bold text-primary mb-6">Real-time competitive tracking</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                Live dashboard showing <span className="font-bold text-primary">coverage scores</span> for every entity, <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>importance rankings</span>, and relationship connections. Filter by category, sort by opportunity, track progress over time.
              </p>

              <div className="mb-6">
                <Suspense fallback={<div className="bg-bg-secondary rounded-xl p-12 text-center text-text-tertiary">Loading dashboard...</div>}>
                  <InteractiveCardStack />
                </Suspense>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">Instant competitive intelligence vs. weeks of manual analysis</p>
            </div>

            {/* Strategic Content Briefs */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">Strategic Content Briefs + Published Content</h3>
              <p className="text-xl font-bold text-primary mb-6">5-layer intelligence synthesis → execution-ready articles</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                <span className="font-bold text-primary">2,500-word briefs</span> synthesizing customer psychology, market intelligence, competitive positioning, performance signals, and business context with <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>section-by-section strategic instructions</span>. Then 50+ writing agents collaborate to produce publication-ready content.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: "Emergency water heater repair" brief</p>
                <p className="text-base text-text-secondary italic">
                  "Opening line uses exact ICP language: 'If you're panicking at 2am with water flooding your basement…'"
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setBriefModalOpen(true)}
                    className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Read Full Brief →
                  </button>
                  <button
                    onClick={() => setContentModalOpen(true)}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    See Published Article →
                  </button>
                </div>
                <p className="text-sm font-medium text-text-tertiary text-center">Minutes per brief vs. 4-8 hours with multiple revisions</p>
              </div>
            </div>

            {/* Campaign Builder */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">Campaign Builder</h3>
              <p className="text-xl font-bold text-primary mb-6">Mathematical prioritization and ROI modeling</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                Phased execution plans with <span className="font-bold text-primary">opportunity scoring</span>, budget calculations, timeline distribution, and <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>performance projections</span>. Transforms all intelligence into executable strategy.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: ADHD telehealth 12-month campaign</p>
                <p className="text-base text-text-secondary italic">
                  "156 articles prioritized by opportunity score. Phase 1: 22 entities, $45,600 value, +18.2 score improvement."
                </p>
              </div>

              <div className="mb-6">
                <Suspense fallback={<div className="bg-bg-secondary rounded-xl p-12 text-center text-text-tertiary">Loading campaign builder...</div>}>
                  <CampaignArchitectFlow />
                </Suspense>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">15 minutes vs. days of spreadsheet planning</p>
            </div>

            {/* Topical Authority Score Visualization */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">Topical Authority Score</h3>
              <p className="text-xl font-bold text-primary mb-6">Visual competitive intelligence</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                Coverage map showing your site vs. competitors <span className="font-bold text-primary">side-by-side</span>. Detailed topical score breakdown with exact URL count per topic for you and each competitor, individual topic scores, and <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>aggregate score</span> across your entire site.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: See why competitors rank</p>
                <p className="text-base text-text-secondary italic">
                  "Competitor has 180 URLs across 200 entities with 78% coverage. You have 45 URLs across 80 entities with 34% coverage. Color-coded gaps show exactly what's missing."
                </p>
              </div>

              {/* Topical Authority Visualization */}
              <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-8 border border-border-light mb-6">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Your Site */}
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-4">Your Site</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Services</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-low to-medium h-full rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Problems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-medium to-high h-full rounded-full" style={{ width: '62%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">62%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Solutions</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-low h-full rounded-full" style={{ width: '28%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-low">28%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Systems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-low to-medium h-full rounded-full" style={{ width: '38%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-medium">38%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border-light">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-text-primary">Overall Score</span>
                        <span className="text-3xl font-black text-medium">43.2</span>
                      </div>
                    </div>
                  </div>

                  {/* Competitor */}
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-4">Top Competitor</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Services</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-high h-full rounded-full" style={{ width: '89%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">89%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Problems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-high h-full rounded-full" style={{ width: '76%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">76%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Solutions</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-medium to-high h-full rounded-full" style={{ width: '71%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">71%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Systems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-bg-primary rounded-full h-3 overflow-hidden">
                            <div className="bg-high h-full rounded-full" style={{ width: '82%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">82%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border-light">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-text-primary">Overall Score</span>
                        <span className="text-3xl font-black text-high">79.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-primary rounded-xl p-6">
                  <p className="text-sm font-bold text-text-primary mb-2">Gap Analysis:</p>
                  <p className="text-base text-text-secondary">
                    Competitor leads by <span className="font-bold text-low">36.3 points</span>. Biggest gaps: Services (-44%), Solutions (-43%), Systems (-44%). Priority: Build coverage in Solutions category for fastest score improvement.
                  </p>
                </div>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">5-10 minutes vs. 20+ hours of manual analysis</p>
            </div>

            {/* AI-Powered Internal Linking */}
            <div className="bg-bg-primary rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-3">AI-Powered Internal Linking</h3>
              <p className="text-xl font-bold text-primary mb-6">Relationship-based strategic linking</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                Strategic linking recommendations based on <span className="font-bold text-primary">entity relationships</span>. <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>Three options per opportunity</span> (Conservative/Balanced/Aggressive) with exact pages, anchor text, and placement guidance.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: Plumbing services</p>
                <p className="text-base text-text-secondary italic">
                  "Link 'Water Heater Repair' to 'Emergency Plumbing' (Strong relationship). Suggested anchor: 'emergency water heater services'. Placement: Second H2 section."
                </p>
              </div>

              <div className="mb-6">
                <Suspense fallback={<div className="bg-bg-secondary rounded-xl p-12 text-center text-text-tertiary">Loading internal linking demo...</div>}>
                  <InternalLinkingFlow />
                </Suspense>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">Automated recommendations vs. hours of manual link analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Lets You Actually Do */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-12 md:p-16 border-2 border-border-light shadow-lg">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-12 text-center">
              What This Lets You Actually Do
            </h2>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">See exactly how much content you need to publish</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Find close-to-ranking opportunities</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Spot content gaps with ROI potential</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Track aggregate performance across clients</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Implement strategic internal linking</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Get strategic answers instantly</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Identify keyword cannibalization before it hurts rankings</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Compare coverage at entity level</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Prioritize with mathematical certainty</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Detect topical drift</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Edit everything in one place</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-high text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg text-text-primary font-light">Prove competitive gaps visually</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3 mx-auto">
                <span>📅</span>
                Want This for Your Business? Book Your Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Dual Use Case - Agencies vs Businesses */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-6">
              Who This Is For
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              Whether you're an agency managing premium accounts or a $1M+ business building capability in-house, Thorbit solves the same fundamental problem: incomplete marketing intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Agencies Card */}
            <div className="bg-gradient-to-br from-teal/5 to-bg-secondary rounded-2xl p-10 border-2 border-teal/30">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-4">For Agencies</h3>
                <p className="text-lg font-light text-text-secondary">Serving $1M+ clients who demand proof, not promises</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-teal text-xl">✓</span>
                    Win premium accounts
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Walk into sales calls with complete competitor breakdowns, topical authority scores, and gap analyses. Show prospects exactly why they're losing—and what it'll cost to win.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-teal text-xl">✓</span>
                    Justify your retainer
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Deliver intelligence clients can't get anywhere else. Knowledge graphs, campaign roadmaps, strategic briefs—deliverables that prove value month after month.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-teal text-xl">✓</span>
                    Scale without hiring
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    100+ AI agents replace months of analyst work. Take on more clients without expanding your team. Deliver faster, charge more, keep margins high.
                  </p>
                </div>
              </div>
            </div>

            {/* Businesses Card */}
            <div className="bg-gradient-to-br from-accent/5 to-bg-secondary rounded-2xl p-10 border-2 border-accent/30">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-4">For $1M+ Businesses</h3>
                <p className="text-lg font-light text-text-secondary">Building marketing capability you control</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-accent text-xl">✓</span>
                    Own your intelligence
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Stop depending on agencies to tell you what to do. Build your own knowledge graphs, run your own analyses, make your own strategic decisions.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-accent text-xl">✓</span>
                    Move faster than competitors
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    3 hours instead of 3 months. Launch campaigns while competitors are still in discovery. Respond to market shifts before they become obvious.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-accent text-xl">✓</span>
                    Build institutional knowledge
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Every project creates assets you own forever. Knowledge graphs, customer profiles, content frameworks—intelligence that compounds over time, not resets with every agency change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: How It Works */}
      <section className="py-24 px-6 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-6">
              How It Works
            </h2>
            <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed max-w-4xl mx-auto">
              Three hours from project kickoff to complete marketing intelligence. Here's the system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-teal to-teal/70 text-white shadow-lg mb-6">
                  <span className="text-4xl font-black">1</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-4">Input</h3>
                <p className="text-lg font-light text-text-secondary mb-6">
                  Website URL + target audience. That's it.
                </p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 text-left">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  We scrape your site and 10,000+ competitor pages. Mine Reddit for customer language. Build knowledge graphs with 600+ entities. Generate 24-section ICP frameworks. All automatic.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/70 text-white shadow-lg mb-6">
                  <span className="text-4xl font-black">2</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-4">Intelligence</h3>
                <p className="text-lg font-light text-text-secondary mb-6">
                  100+ agents analyze, strategize, prioritize.
                </p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 text-left">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  Calculate topical authority scores. Identify 1000+ content gaps. Prioritize by importance × coverage. Generate campaign roadmaps. Build pricing scenarios. Create strategic briefs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white shadow-lg mb-6">
                  <span className="text-4xl font-black">3</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-4">Execution</h3>
                <p className="text-lg font-light text-text-secondary mb-6">
                  Strategy becomes content, content becomes authority.
                </p>
              </div>
              <div className="bg-bg-primary rounded-xl p-6 text-left">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  50+ writing agents collaborate on publication-ready articles. AI suggests internal links. Generate social assets. Track authority over time. The intelligence engine that never stops working.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-xl md:text-2xl font-bold text-text-primary max-w-3xl mx-auto mb-8">
              Total time: 3 hours. Total cost: A fraction of one analyst. Total output: What used to take teams months.
            </p>
            <Link
              href="/book-demo"
              target="_blank"
              className="inline-block bg-primary hover:bg-primary-dark text-bg-primary px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              See It In Action
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section id="demo" className="py-24 px-6 bg-primary">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
            The Decision Framework
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
            {/* Left Column - If This, Then Not For You */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-black text-white mb-6">If this sounds like you...</h3>
              <ul className="space-y-4 text-white/90 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-white/50 mt-1">•</span>
                  <span>You're managing clients under $50K/year</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/50 mt-1">•</span>
                  <span>You just need blog posts, not strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/50 mt-1">•</span>
                  <span>You're looking for cheap content at scale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/50 mt-1">•</span>
                  <span>You prefer simple keyword tools</span>
                </li>
              </ul>
              <p className="text-white mt-6 font-bold">...Thorbit probably isn't for you.</p>
            </div>

            {/* Right Column - If This, Then Let's Talk */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
              <h3 className="text-2xl font-black text-white mb-6">But if this is you...</h3>
              <ul className="space-y-4 text-white font-light">
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">✓</span>
                  <span>You serve premium accounts that demand proof</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">✓</span>
                  <span>You need intelligence to justify high retainers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">✓</span>
                  <span>You're a $1M+ business building in-house capability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">✓</span>
                  <span>You want to own your marketing intelligence</span>
                </li>
              </ul>
              <p className="text-white mt-6 font-bold">...Let's talk.</p>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto">
              This is marketing intelligence for people who understand that strategy comes before tactics. Research before writing. Understanding before optimization.
            </p>
          </div>

          <Link
            href="/book-demo"
            target="_blank"
            className="inline-block bg-white hover:bg-bg-secondary text-text-primary px-12 py-5 rounded-xl font-bold text-xl transition-all hover:-translate-y-1 hover:shadow-2xl mb-4"
          >
            Book a Demo
          </Link>
          <p className="text-base text-white/80">3-minute walkthrough. No sales pitch. Just proof.</p>
        </div>
      </section>


      {/* Modals */}
      <ICPModal isOpen={icpModalOpen} onClose={() => setIcpModalOpen(false)} />
      <BriefModal isOpen={briefModalOpen} onClose={() => setBriefModalOpen(false)} />
      <ContentModal isOpen={contentModalOpen} onClose={() => setContentModalOpen(false)} />
    </div>
  );
}
