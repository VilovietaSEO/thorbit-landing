"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import { Menu, X, Calendar, AlertTriangle, FileText, Sparkles, DollarSign, Edit, BarChart, TrendingUp, Zap, CheckCircle, Check } from "lucide-react";
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
    <div className="w-full bg-white rounded-2xl border-2 border-border-light shadow-2xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-teal/10 to-sage/10 px-4 md:px-6 py-4 border-b-2 border-border-light">
        <h3 className="text-lg md:text-xl font-black text-text-primary">Entity Dashboard</h3>
        <p className="text-xs md:text-sm text-text-tertiary">Real-time entity coverage analysis</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
        {/* Table Header */}
        <div className="grid grid-cols-[2fr,1fr,0.8fr,0.6fr,0.6fr,0.6fr,0.8fr] gap-4 px-6 py-3 bg-bg-secondary border-b border-border-light sticky top-0 z-10 min-w-[800px]">
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
                className={`grid grid-cols-[2fr,1fr,0.8fr,0.6fr,0.6fr,0.6fr,0.8fr] gap-4 px-6 py-4 border-b border-border-light transition-all duration-700 min-w-[800px] ${
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
      <div className="md:hidden overflow-y-auto" style={{ maxHeight: '500px' }}>
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

// Feature Modal Component
function FeatureModal({ isOpen, onClose, title, children }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black/70" aria-hidden="true"></div>

        <div
          className="relative inline-block w-full max-w-6xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-bg-primary shadow-2xl rounded-2xl border-2 border-border-light"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-8 pr-12">
            {title}
          </h2>

          {/* Content */}
          <div className="overflow-y-auto max-h-[70vh]">
            {children}
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
  const [cannibalizationModalOpen, setCannibalizationModalOpen] = useState(false);
  const [opportunityModalOpen, setOpportunityModalOpen] = useState(false);
  const [onPageModalOpen, setOnPageModalOpen] = useState(false);
  const [wordPressModalOpen, setWordPressModalOpen] = useState(false);
  const [aiAssistantModalOpen, setAiAssistantModalOpen] = useState(false);

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
      <section className="pt-32 pb-24 px-6 bg-white">
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

      {/* NEW SECTION: The Intelligence Gap in Current Tools */}
      <section className="py-24 px-6" style={{ backgroundColor: '#B87A63' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              The Intelligence Gap in Current Tools
            </h2>
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed max-w-4xl mx-auto">
              Every tool shows you keyword lists. None show you what actually matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* What's Missing */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-6">What's Missing:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1" style={{ color: 'var(--low)' }}>✕</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Categorical Coverage</p>
                    <p className="text-base text-text-secondary">Which topic categories do competitors actually own? Services? Problems? Solutions? You can't see it.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1" style={{ color: 'var(--low)' }}>✕</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Publishing Frequency</p>
                    <p className="text-base text-text-secondary">How fast are competitors building authority? Current tools don't track content velocity.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1" style={{ color: 'var(--low)' }}>✕</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Important Topics vs. Noise</p>
                    <p className="text-base text-text-secondary">All keywords treated equal. No filtering for commercial and transactional intent—the topics that drive revenue.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1" style={{ color: 'var(--low)' }}>✕</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Standard for Coverage</p>
                    <p className="text-base text-text-secondary">No one else has a standard for understanding what you actually need to cover. You're guessing.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* What Thorbit Does */}
            <div className="bg-white rounded-2xl p-8 border-2 border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-6">What Thorbit Does:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1 font-bold" style={{ color: 'var(--high)' }}>✓</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Shows Categorical Coverage</p>
                    <p className="text-base text-text-secondary">See exactly which topic categories you're missing. Services: 45%. Problems: 62%. Solutions: 28%. Systems: 38%.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1 font-bold" style={{ color: 'var(--high)' }}>✓</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Tracks Competitor Velocity</p>
                    <p className="text-base text-text-secondary">See publishing frequency and patterns. Know how fast they're building authority in each category.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1 font-bold" style={{ color: 'var(--high)' }}>✓</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Filters for Revenue Topics</p>
                    <p className="text-base text-text-secondary">Prioritizes commercial and transactional keywords. Informational content is mapped, but business-critical topics come first.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-1 font-bold" style={{ color: 'var(--high)' }}>✓</span>
                  <div>
                    <p className="font-bold text-text-primary text-lg mb-1">Validates with Data</p>
                    <p className="text-base text-text-secondary">Every recommendation backed by intelligence. Prove what needs to be done with data, not opinions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* The Impact */}
          <div className="bg-white rounded-2xl p-10 border-l-4 border-white">
            <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-6 text-center">
              Why This Changes Everything
            </h3>
            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                <span className="font-bold text-text-primary">When you're trying to sell somebody,</span> trust is everything. And if they don't know you, you don't have it.
              </p>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                That's where intelligence changes the game. <span className="font-bold text-white">Show them their categorical coverage gaps—data they can't get anywhere else.</span> Show them competitor publishing patterns. Show them validated customer language from real conversations.
              </p>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                You're not asking them to trust your opinion. You're showing them data.
              </p>
              <p className="text-lg md:text-xl font-bold text-text-primary leading-relaxed text-center mt-8">
                This is how you differentiate yourself. This is how you win premium accounts.
              </p>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed text-center">
                Enter a URL. Get the intelligence. Prove you understand their business before they sign.
              </p>
            </div>
          </div>

          {/* Does vs. Helps */}
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              And this doesn't just <span className="font-bold text-text-primary">help you</span> do research. It <span className="font-bold text-white">does the research.</span>
            </p>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mt-4">
              It doesn't just <span className="font-bold text-text-primary">help you</span> create briefs and content. It <span className="font-bold text-white">does the briefs and content.</span>
            </p>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mt-6">
              You get tools that differentiate you in the marketplace. You prove with data what needs to be done, rather than rely on your word.
            </p>
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

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {/* Research Column */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-6 h-[180px] flex flex-col justify-start">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto" style={{ backgroundColor: 'rgba(107, 155, 90, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--high)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-3">Research</h3>
                <p className="font-medium text-base" style={{ color: 'var(--high)' }}>Deep Intelligence Across 4 Domains</p>
              </div>

              <div className="flex-1 bg-white rounded-xl p-6 flex flex-col">
                <div>
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
                </div>
                <div className="mt-auto pt-6 border-t border-border-light">
                  <p className="text-base"><span className="font-medium" style={{ color: 'var(--high)' }}>Result:</span> <span className="text-text-secondary">Proprietary intelligence that doesn't exist in any other tool.</span></p>
                </div>
              </div>
            </div>

            {/* Strategize Column */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-6 h-[180px] flex flex-col justify-start">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto" style={{ backgroundColor: 'rgba(196, 112, 79, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--primary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-3">Strategize</h3>
                <p className="font-medium text-base" style={{ color: 'var(--primary)' }}>Multi-Agent Synthesis</p>
              </div>

              <div className="flex-1 bg-white rounded-xl p-6 flex flex-col">
                <div>
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
                </div>
                <div className="mt-auto pt-6 border-t border-border-light">
                  <p className="text-base"><span className="font-medium" style={{ color: 'var(--primary)' }}>Result:</span> <span className="text-text-secondary">Strategy backed by intelligence, not assumptions.</span></p>
                </div>
              </div>
            </div>

            {/* Execute Column */}
            <div className="flex flex-col h-full">
              <div className="text-center mb-6 h-[180px] flex flex-col justify-start">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto" style={{ backgroundColor: 'rgba(217, 168, 84, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-3">Execute</h3>
                <p className="font-medium text-base" style={{ color: 'var(--accent)' }}>Complete Deliverables Ready to Use</p>
              </div>

              <div className="flex-1 bg-white rounded-xl p-6 flex flex-col">
                <div>
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
                </div>
                <div className="mt-auto pt-6 border-t border-border-light">
                  <p className="text-base"><span className="font-medium" style={{ color: 'var(--accent)' }}>Result:</span> <span className="text-text-secondary">Outputs no human team can manually create at this speed and quality.</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl p-8 border-l-4" style={{ borderColor: 'var(--teal)' }}>
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
          <div className="max-w-6xl mx-auto mb-12 overflow-x-auto md:overflow-visible">
            <div className="min-w-[640px] md:min-w-0">
              {/* Header Row */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
                <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light text-center">
                  <h3 className="text-base md:text-xl font-black text-text-primary">Capability</h3>
                </div>
                <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light text-center">
                  <h3 className="text-base md:text-xl font-medium text-text-secondary">Typical AI Tools</h3>
                </div>
                <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light text-center">
                  <h3 className="text-base md:text-xl font-black text-primary">Thorbit</h3>
                </div>
              </div>

              {/* Competitor Website Scraping */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
                <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                  <p className="text-sm md:text-lg font-bold text-text-primary text-center">Competitor Scraping</p>
                </div>
                <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                    <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-high/10 flex items-center justify-center">
                    <span className="text-2xl leading-none font-bold" style={{ color: 'var(--high)' }}>✓</span>
                  </div>
                </div>
              </div>

            {/* Customer Research */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Customer Research</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-base font-medium text-text-primary text-center">Thousands of comments across dozens of URLs</p>
              </div>
            </div>

            {/* Knowledge Graph */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Knowledge Graph</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-high/10 flex items-center justify-center">
                  <span className="text-2xl leading-none font-bold" style={{ color: 'var(--high)' }}>✓</span>
                </div>
              </div>
            </div>

            {/* Topical Authority */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Topical Authority</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
                <p className="text-xs md:text-sm text-text-tertiary text-center">Only backlink authority</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-base font-medium text-text-primary text-center">By category and importance across your site</p>
              </div>
            </div>

            {/* Content Strategy */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Content Strategy</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
                <p className="text-xs md:text-sm text-text-tertiary text-center">Keywords unrelated to buyer persona</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-base font-medium text-text-primary text-center">Full knowledge of niche, competitors, customers, and entities</p>
              </div>
            </div>

            {/* Content Briefs */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Content Briefs</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-sm text-text-tertiary text-center">Keyword counting and word count</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-base font-medium text-text-primary text-center">Tone, persona, CTAs, and reader psychology</p>
              </div>
            </div>

            {/* Content Writing */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Content Writing</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-sm text-text-tertiary text-center">Sequential prompts (outline → write → edit)</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-base font-medium text-text-primary text-center">50 agents with refinement loops and deep research</p>
              </div>
            </div>

            {/* Internal Linking */}
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-sm md:text-lg font-bold text-text-primary text-center">Internal Linking</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-low/10 flex items-center justify-center">
                  <span className="text-2xl leading-none" style={{ color: 'var(--low)' }}>✕</span>
                </div>
                <p className="text-xs md:text-sm text-text-tertiary text-center">Keyword-based only</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-6 border border-border-light flex items-center justify-center">
                <p className="text-xs md:text-base font-medium text-text-primary text-center">Topical opportunities with 3 integration methods</p>
              </div>
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
              <div className="bg-white rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Research agents</span> analyze competitors, conversations, and markets—building intelligence foundations.
                </p>
              </div>

              {/* Synthesis Agents */}
              <div className="bg-white rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Synthesis agents</span> connect insights across data sources—finding patterns humans can't manually identify.
                </p>
              </div>

              {/* Execution Agents */}
              <div className="bg-white rounded-xl p-8 border-2 border-border-light shadow-md">
                <p className="text-lg text-text-secondary leading-relaxed">
                  <span className="font-bold text-primary">Execution agents</span> generate deliverables informed by intelligence layers—producing outputs that reflect deep research.
                </p>
              </div>

              {/* Orchestrators */}
              <div className="bg-white rounded-xl p-8 border-2 border-border-light shadow-md">
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
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">ICP Research Documents</h3>
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
              <div className="card-v2 bg-white rounded-2xl p-8 border-2 border-teal/20 mb-8 transition-all duration-300 hover:border-teal/40 hover:shadow-xl hover:-translate-y-1">
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
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">Knowledge Graph</h3>
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
                <Suspense fallback={<div className="bg-white rounded-xl p-12 text-center text-text-tertiary h-full flex items-center justify-center">Loading interactive graph...</div>}>
                  <EICSGraphFull />
                </Suspense>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">3 hours vs. 4-6 months of market research</p>
            </div>

            {/* Entity Coverage Dashboard */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">Entity Coverage Dashboard</h3>
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
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">Strategic Content Briefs + Published Content</h3>
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
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">Campaign Builder</h3>
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
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">Topical Authority Score</h3>
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
                    <h4 className="text-2xl font-bold text-text-primary mb-4">Your Site</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Services</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-low to-medium h-full rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Problems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-medium to-high h-full rounded-full" style={{ width: '62%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">62%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Solutions</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-low h-full rounded-full" style={{ width: '28%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-low">28%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Systems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
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
                    <h4 className="text-2xl font-bold text-text-primary mb-4">Top Competitor</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Services</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-high h-full rounded-full" style={{ width: '89%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">89%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Problems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-high h-full rounded-full" style={{ width: '76%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">76%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Solutions</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-medium to-high h-full rounded-full" style={{ width: '71%' }}></div>
                          </div>
                          <span className="text-sm font-bold text-high">71%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Systems</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white rounded-full h-3 overflow-hidden">
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

                <div className="bg-white rounded-xl p-6">
                  <p className="text-sm font-bold text-text-primary mb-2">Gap Analysis:</p>
                  <p className="text-base text-text-secondary">
                    Competitor leads by <span className="font-bold text-low">36.3 points</span>. Biggest gaps: Services (-44%), Solutions (-43%), Systems (-44%). Priority: Build coverage in Solutions category for fastest score improvement.
                  </p>
                </div>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">5-10 minutes vs. 20+ hours of manual analysis</p>
            </div>

            {/* AI-Powered Internal Linking */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">AI-Powered Internal Linking</h3>
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

            {/* Search Console Integration */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">Search Console Integration</h3>
              <p className="text-xl font-bold text-primary mb-6">Unified performance dashboard across all sites</p>

              <p className="text-base text-text-secondary leading-relaxed mb-6">
                Connect multiple Search Console properties and view <span className="font-bold text-primary">unified KPIs</span> across your entire portfolio. Track clicks, impressions, CTR, and rankings with <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>position distribution analysis</span> and performance trends.
              </p>

              <div className="bg-bg-secondary rounded-xl p-6 mb-6">
                <p className="text-sm font-bold text-text-primary mb-2">Example: Agency managing 5 client sites</p>
                <p className="text-base text-text-secondary italic">
                  "See aggregate performance: 6,404 clicks, 2.0M impressions across 5 properties. Track performance trends and ranking distribution for each site."
                </p>
              </div>

              {/* Search Console Dashboard - Matching Production Design */}
              <div className="bg-[#F5F1E8] rounded-2xl p-6 md:p-8 mb-6">
                {/* Top Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-2xl p-4 border border-[#E8E1D3] shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <ellipse cx="12" cy="12" rx="5" ry="10" strokeWidth="2"/>
                          <path d="M2 12h20" strokeWidth="2"/>
                          <path d="M12 2c2.5 2.5 3 7.5 3 10s-0.5 7.5-3 10" strokeWidth="2"/>
                          <path d="M12 2c-2.5 2.5-3 7.5-3 10s0.5 7.5 3 10" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600">Total Sites</p>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-black text-black text-center">5</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E8E1D3] shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600">Total Clicks</p>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-black text-black text-center">6,404</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E8E1D3] shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600">Total Impressions</p>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-black text-black text-center">2,002,215</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E8E1D3] shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600">Date Range</p>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-black text-black text-center">28 Days</p>
                  </div>
                </div>

                {/* Site Cards Row */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {/* Example 3 */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#E8E1D3] shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-full bg-[#F5F1E8] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <ellipse cx="12" cy="12" rx="5" ry="10" strokeWidth="2"/>
                          <path d="M2 12h20" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h5 className="text-base md:text-lg font-bold text-black">example3.com</h5>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-5">
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          Clicks
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">3,022</p>
                        <p className="text-xs text-red-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                          </svg>
                          -23.2%
                        </p>
                      </div>
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          Impressions
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">49.9K</p>
                        <p className="text-xs text-red-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                          </svg>
                          -19.4%
                        </p>
                      </div>
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                          CTR
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">6.1%</p>
                        <p className="text-xs text-red-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                          </svg>
                          -0.3%
                        </p>
                      </div>
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          </svg>
                          Avg Position
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">43.9</p>
                        <p className="text-xs text-green-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                          </svg>
                          +4.9% better
                        </p>
                      </div>
                    </div>

                    {/* Query Count by Ranking */}
                    <div className="mb-5">
                      <p className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        Query Count by Ranking
                      </p>
                      <div className="grid grid-cols-4 gap-1.5">
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#6B9B5A' }}>
                            1-3
                          </div>
                          <div className="text-sm font-bold text-black">81</div>
                          <div className="text-[10px] font-medium text-red-600">-11</div>
                        </div>
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#7FA9B3' }}>
                            4-10
                          </div>
                          <div className="text-sm font-bold text-black">98</div>
                          <div className="text-[10px] font-medium text-red-600">-9</div>
                        </div>
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#D9A854' }}>
                            11-20
                          </div>
                          <div className="text-sm font-bold text-black">187</div>
                          <div className="text-[10px] font-medium text-red-600">-104</div>
                        </div>
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#A89B8F' }}>
                            21+
                          </div>
                          <div className="text-sm font-bold text-black">4,634</div>
                          <div className="text-[10px] font-medium text-green-600">+124</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="bg-[#F5F1E8] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                          Performance
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C4704F' }}></div>
                            <span className="text-gray-600">Clicks</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#7FA9B3' }}></div>
                            <span className="text-gray-600">Impr</span>
                          </div>
                        </div>
                      </div>
                      <svg viewBox="0 0 300 80" className="w-full h-24">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="#E0D8CC" strokeWidth="0.5"/>
                        <line x1="0" y1="40" x2="300" y2="40" stroke="#E0D8CC" strokeWidth="0.5"/>
                        <line x1="0" y1="60" x2="300" y2="60" stroke="#E0D8CC" strokeWidth="0.5"/>
                        {/* Impressions line (Serene Blue-Green) */}
                        <polyline points="0,50 30,45 60,42 90,44 120,40 150,35 180,37 210,32 240,28 270,25 300,22" fill="none" stroke="#7FA9B3" strokeWidth="1.5" opacity="0.8"/>
                        {/* Clicks line (Mocha Mousse) */}
                        <polyline points="0,58 30,55 60,52 90,54 120,50 150,48 180,45 210,42 240,38 270,33 300,28" fill="none" stroke="#C4704F" strokeWidth="2"/>
                      </svg>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Nov 22</span>
                        <span>Dec 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Example 4 */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#E8E1D3] shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-full bg-[#F5F1E8] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <ellipse cx="12" cy="12" rx="5" ry="10" strokeWidth="2"/>
                          <path d="M2 12h20" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h5 className="text-base md:text-lg font-bold text-black">example4.com</h5>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-5">
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          Clicks
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">1,245</p>
                        <p className="text-xs text-green-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                          </svg>
                          +6.0%
                        </p>
                      </div>
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          Impressions
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">864.4K</p>
                        <p className="text-xs text-green-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                          </svg>
                          +41.5%
                        </p>
                      </div>
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                          CTR
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">0.1%</p>
                        <p className="text-xs text-red-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                          </svg>
                          -0.1%
                        </p>
                      </div>
                      <div className="bg-[#F5F1E8] rounded-xl p-3 md:p-4">
                        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          </svg>
                          Avg Position
                        </p>
                        <p className="text-xl md:text-2xl font-black text-black mb-1">27.8</p>
                        <p className="text-xs text-green-600 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                          </svg>
                          +8.1% better
                        </p>
                      </div>
                    </div>

                    {/* Query Count by Ranking */}
                    <div className="mb-5">
                      <p className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        Query Count by Ranking
                      </p>
                      <div className="grid grid-cols-4 gap-1.5">
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#6B9B5A' }}>
                            1-3
                          </div>
                          <div className="text-sm font-bold text-black">1,501</div>
                          <div className="text-[10px] font-medium text-red-600">-64</div>
                        </div>
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#7FA9B3' }}>
                            4-10
                          </div>
                          <div className="text-sm font-bold text-black">751</div>
                          <div className="text-[10px] font-medium text-red-600">-114</div>
                        </div>
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#D9A854' }}>
                            11-20
                          </div>
                          <div className="text-sm font-bold text-black">340</div>
                          <div className="text-[10px] font-medium text-red-600">-43</div>
                        </div>
                        <div className="bg-[#F5F1E8] rounded-lg p-2 text-center">
                          <div className="text-[10px] font-medium text-white rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: '#A89B8F' }}>
                            21+
                          </div>
                          <div className="text-sm font-bold text-black">2,408</div>
                          <div className="text-[10px] font-medium text-green-600">+221</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="bg-[#F5F1E8] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                          Performance
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C4704F' }}></div>
                            <span className="text-gray-600">Clicks</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#7FA9B3' }}></div>
                            <span className="text-gray-600">Impr</span>
                          </div>
                        </div>
                      </div>
                      <svg viewBox="0 0 300 80" className="w-full h-24">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="#E0D8CC" strokeWidth="0.5"/>
                        <line x1="0" y1="40" x2="300" y2="40" stroke="#E0D8CC" strokeWidth="0.5"/>
                        <line x1="0" y1="60" x2="300" y2="60" stroke="#E0D8CC" strokeWidth="0.5"/>
                        {/* Impressions line (Serene Blue-Green) */}
                        <polyline points="0,55 30,53 60,48 90,50 120,45 150,42 180,40 210,38 240,35 270,32 300,28" fill="none" stroke="#7FA9B3" strokeWidth="1.5" opacity="0.8"/>
                        {/* Clicks line (Mocha Mousse) */}
                        <polyline points="0,60 30,58 60,52 90,55 120,48 150,52 180,47 210,50 240,45 270,48 300,42" fill="none" stroke="#C4704F" strokeWidth="2"/>
                      </svg>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Nov 22</span>
                        <span>Dec 5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm font-medium text-text-tertiary text-right">Real-time sync vs. manual GSC exports and spreadsheet tracking</p>
            </div>

            {/* Additional Platform Features Tiles */}
            <div className="mt-16">
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-8 text-center">Additional Platform Features</h3>

              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {/* Website & Competitor Scraping */}
                <div className="bg-white rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-2xl font-black text-text-primary mb-3 text-center">Website & Competitor Scraping</h4>
                  <p className="text-sm text-text-secondary leading-relaxed text-center">
                    Complete content analysis of your site and competitors. <span className="font-bold text-primary">Sitemap scraping</span>, publishing frequency tracking, full-site content capture.
                  </p>
                </div>

                {/* Duplicate Content Audit */}
                <div className="bg-white rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col">
                  <h4 className="text-2xl font-black text-text-primary mb-3 text-center">Duplicate Content Audit</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 text-center">
                    Identify pages competing against each other for the same rankings. Visual detection with specific recommendations on which pages to consolidate, redirect, or differentiate.
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => setCannibalizationModalOpen(true)}
                      className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-2 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* Content Opportunity Analysis */}
                <div className="bg-white rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col">
                  <h4 className="text-2xl font-black text-text-primary mb-3 text-center">Content Opportunity Analysis</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 text-center">
                    Automated identification of gaps where you have no content addressing valuable topics. <span className="font-bold text-primary">Close-to-ranking opportunities</span> for existing pages.
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => setOpportunityModalOpen(true)}
                      className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-2 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* On-Page Analysis */}
                <div className="bg-white rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col">
                  <h4 className="text-2xl font-black text-text-primary mb-3 text-center">On-Page Analysis</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 text-center">
                    Entity-focused optimization identifying unique topics covered in search results. <span className="font-bold text-primary">Topical flow scoring</span>, audience language analysis from forums and reviews.
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => setOnPageModalOpen(true)}
                      className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-2 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* WordPress Integration */}
                <div className="bg-white rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col">
                  <h4 className="text-2xl font-black text-text-primary mb-3 text-center">WordPress Integration</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 text-center">
                    Edit content, pages, posts, and schema directly in platform. Manage internal links and <span className="font-bold text-primary">bulk operations</span> without switching tools.
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => setWordPressModalOpen(true)}
                      className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-2 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* AI Strategy Assistant */}
                <div className="bg-white rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col">
                  <h4 className="text-2xl font-black text-text-primary mb-3 text-center">AI Strategy Assistant</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 text-center">
                    Context-aware chat with access to all your intelligence: ICP, knowledge graph, briefs, competitive analysis, on-page recommendations, Search Console data.
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => setAiAssistantModalOpen(true)}
                      className="bg-primary hover:bg-primary-dark text-bg-primary px-6 py-2 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
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
                <Calendar className="w-5 h-5" />
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
                    <span className="text-high text-xl">✓</span>
                    Win premium accounts
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Walk into sales calls with complete competitor breakdowns, topical authority scores, and gap analyses. Show prospects exactly why they're losing—and what it'll cost to win.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-high text-xl">✓</span>
                    Justify your retainer
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Deliver intelligence clients can't get anywhere else. Knowledge graphs, campaign roadmaps, strategic briefs—deliverables that prove value month after month.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-high text-xl">✓</span>
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
                    <span className="text-high text-xl">✓</span>
                    Own your intelligence
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    Stop depending on agencies to tell you what to do. Build your own knowledge graphs, run your own analyses, make your own strategic decisions.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-high text-xl">✓</span>
                    Move faster than competitors
                  </h4>
                  <p className="text-text-secondary font-light text-sm pl-7">
                    3 hours instead of 3 months. Launch campaigns while competitors are still in discovery. Respond to market shifts before they become obvious.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-high text-xl">✓</span>
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

      {/* Final CTA */}
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

      {/* Feature Modals */}
      <FeatureModal isOpen={cannibalizationModalOpen} onClose={() => setCannibalizationModalOpen(false)} title="Duplicate Content Audit">
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">
            Identify pages competing against each other for the same rankings with <span className="font-bold text-primary">visual detection</span> and specific recommendations on which pages to consolidate, redirect, or differentiate.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Cannibalized Queries - Golden Honey */}
            <div className="bg-white rounded-xl p-4 border border-border-light">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(217, 168, 84, 0.15)' }}>
                  <AlertTriangle className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-text-tertiary">Cannibalized Queries</span>
              </div>
              <p className="text-2xl font-black text-text-primary">214</p>
            </div>

            {/* Affected Pages - Serene Blue-Green */}
            <div className="bg-white rounded-xl p-4 border border-border-light">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(127, 169, 179, 0.15)' }}>
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm text-text-tertiary">Affected Pages</span>
              </div>
              <p className="text-2xl font-black text-text-primary">53</p>
            </div>

            {/* Diluted Clicks - Burnt Orange/Mocha */}
            <div className="bg-white rounded-xl p-4 border border-border-light">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(196, 112, 79, 0.15)' }}>
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-text-tertiary">Diluted Clicks</span>
              </div>
              <p className="text-2xl font-black text-text-primary">30</p>
            </div>

            {/* Recovery Potential - Olive Sage */}
            <div className="bg-white rounded-xl p-4 border border-border-light">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(107, 155, 90, 0.15)' }}>
                  <DollarSign className="w-5 h-5 text-high" />
                </div>
                <span className="text-sm text-text-tertiary">Recovery Potential</span>
              </div>
              <p className="text-2xl font-black text-text-primary">$1.2K/mo</p>
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(107, 155, 90, 0.08)' }}>
            <h4 className="text-base font-black text-text-primary mb-3">Quick Actions</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(107, 155, 90, 0.05)', borderColor: 'rgba(107, 155, 90, 0.2)' }}>
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <p className="text-text-primary"><span className="font-bold">Keep 15 pages</span> as primary for their cannibalized queries</p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(196, 112, 79, 0.05)', borderColor: 'rgba(196, 112, 79, 0.2)' }}>
                <span className="text-xl">→</span>
                <p className="text-text-primary"><span className="font-bold">Consolidate 38 pages</span> into stronger pages (301 redirects recommended)</p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(217, 168, 84, 0.05)', borderColor: 'rgba(217, 168, 84, 0.2)' }}>
                <Edit className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-text-primary"><span className="font-bold">Differentiate 12 pages</span> by targeting distinct long-tail variations</p>
              </div>
            </div>
          </div>
        </div>
      </FeatureModal>

      <FeatureModal isOpen={opportunityModalOpen} onClose={() => setOpportunityModalOpen(false)} title="Content Opportunity Analysis">
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">
            Page-level opportunity scoring showing <span className="font-bold text-primary">quick-win ranking improvements</span> plus keyword gap analysis identifying topics where you have impressions but zero clicks.
          </p>

          {/* URL Analysis Table */}
          <div className="bg-white rounded-xl border border-border-light overflow-hidden">
            <div className="bg-bg-secondary px-6 py-3 border-b border-border-light">
              <h4 className="text-sm font-black text-text-primary">Page Opportunities</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-tertiary border-b border-border-light">
                    <th className="text-left px-6 py-3 font-bold text-text-tertiary text-xs uppercase">URL</th>
                    <th className="text-right px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Clicks</th>
                    <th className="text-right px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Impressions</th>
                    <th className="text-right px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Position</th>
                    <th className="text-right px-6 py-3 font-bold text-text-tertiary text-xs uppercase">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-medium">/</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">74</td>
                    <td className="px-4 py-4 text-right text-text-secondary">38,375</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">20.7</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(107, 155, 90, 0.15)', color: '#6B9B5A' }}>
                        LOW (13)
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-medium">/blog/is-super-lawyers-worth-it/</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">10</td>
                    <td className="px-4 py-4 text-right text-text-secondary">3,097</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">7.1</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(107, 155, 90, 0.15)', color: '#6B9B5A' }}>
                        LOW (5)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Missing Topic Opportunities */}
          <div className="bg-white rounded-xl border border-border-light overflow-hidden">
            <div className="bg-bg-secondary px-6 py-3 border-b border-border-light flex items-center justify-between">
              <h4 className="text-sm font-black text-text-primary">Missing Topic Opportunities</h4>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(196, 112, 79, 0.15)', color: '#C4704F' }}>6 missing</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-tertiary border-b border-border-light">
                    <th className="text-left px-6 py-3 font-bold text-text-tertiary text-xs uppercase">Unique Word</th>
                    <th className="text-left px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Primary Keyword</th>
                    <th className="text-right px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Clicks</th>
                    <th className="text-right px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Impressions</th>
                    <th className="text-right px-4 py-3 font-bold text-text-tertiary text-xs uppercase">CTR</th>
                    <th className="text-right px-6 py-3 font-bold text-text-tertiary text-xs uppercase">Avg Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-bold">pay</td>
                    <td className="px-4 py-4 text-text-secondary">is super lawyers pay to play</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">0</td>
                    <td className="px-4 py-4 text-right text-text-secondary">17</td>
                    <td className="px-4 py-4 text-right text-text-secondary">0.00%</td>
                    <td className="px-6 py-4 text-right text-high font-bold">7.1</td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-bold">meaning</td>
                    <td className="px-4 py-4 text-text-secondary">super lawyer meaning</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">0</td>
                    <td className="px-4 py-4 text-right text-text-secondary">16</td>
                    <td className="px-4 py-4 text-right text-text-secondary">0.00%</td>
                    <td className="px-6 py-4 text-right text-high font-bold">9.9</td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-bold">whats</td>
                    <td className="px-4 py-4 text-text-secondary">whats a super lawyer</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">0</td>
                    <td className="px-4 py-4 text-right text-text-secondary">12</td>
                    <td className="px-4 py-4 text-right text-text-secondary">0.00%</td>
                    <td className="px-6 py-4 text-right text-high font-bold">7.8</td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-bold">"super</td>
                    <td className="px-4 py-4 text-text-secondary">"super lawyer"</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">0</td>
                    <td className="px-4 py-4 text-right text-text-secondary">10</td>
                    <td className="px-4 py-4 text-right text-text-secondary">0.00%</td>
                    <td className="px-6 py-4 text-right text-high font-bold">6.1</td>
                  </tr>
                  <tr className="hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4 text-primary font-bold">become</td>
                    <td className="px-4 py-4 text-text-secondary">how to become a super lawyer</td>
                    <td className="px-4 py-4 text-right text-text-primary font-bold">0</td>
                    <td className="px-4 py-4 text-right text-text-secondary">10</td>
                    <td className="px-4 py-4 text-right text-text-secondary">0.00%</td>
                    <td className="px-6 py-4 text-right text-high font-bold">6.4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(107, 155, 90, 0.08)' }}>
            <h4 className="text-base font-black text-text-primary mb-3">What This Tells You</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(107, 155, 90, 0.05)', borderColor: 'rgba(107, 155, 90, 0.2)' }}>
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <p className="text-text-primary">You're ranking well (positions 6-10) for keywords people are searching</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(217, 168, 84, 0.05)', borderColor: 'rgba(217, 168, 84, 0.2)' }}>
                <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-text-primary">But you're getting <span className="font-bold">zero clicks</span> because you haven't directly answered the query</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(127, 169, 179, 0.05)', borderColor: 'rgba(127, 169, 179, 0.2)' }}>
                <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-text-primary"><span className="font-bold">Quick fix:</span> Add targeted sections addressing "pay to play", "meaning", "how to become" to capture these 65 monthly impressions</p>
              </div>
            </div>
          </div>
        </div>
      </FeatureModal>

      <FeatureModal isOpen={onPageModalOpen} onClose={() => setOnPageModalOpen(false)} title="On-Page Analysis">
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">
            Entity-focused optimization identifying unique topics covered in search results with <span className="font-bold text-primary">topical flow scoring</span>, audience language analysis from forums and reviews.
          </p>

          <div className="bg-bg-secondary rounded-xl p-6">
            <h4 className="text-2xl font-bold text-text-primary mb-4">Analysis Components</h4>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>Entity extraction from top 10 search results</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>Topical flow analysis and coverage scoring</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>Audience language patterns from forums and reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>Content recommendations based on gaps</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-6 border border-border-light">
            <p className="text-sm font-bold text-text-primary mb-2">Example: E-commerce product page</p>
            <p className="text-base text-text-secondary italic">
              "Top 10 results cover 47 entities. Your page covers 23. Missing: pricing comparison, warranty details, customer support info."
            </p>
          </div>
        </div>
      </FeatureModal>

      <FeatureModal isOpen={wordPressModalOpen} onClose={() => setWordPressModalOpen(false)} title="WordPress Integration">
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">
            Manage all your WordPress content, pages, posts, and schema directly within Thorbit. <span className="font-bold text-primary">Edit, optimize, and publish</span> without switching between tools.
          </p>

          {/* Pages Table */}
          <div className="bg-white rounded-xl border border-border-light overflow-hidden">
            <div className="bg-bg-secondary px-6 py-3 border-b border-border-light">
              <h4 className="text-sm font-black text-text-primary">WordPress Pages Management</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-tertiary border-b border-border-light">
                    <th className="text-left px-6 py-3 font-bold text-text-tertiary text-xs uppercase">Title</th>
                    <th className="text-center px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Type</th>
                    <th className="text-center px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Words</th>
                    <th className="text-center px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Coverage</th>
                    <th className="text-center px-4 py-3 font-bold text-text-tertiary text-xs uppercase">Schema</th>
                    <th className="text-center px-6 py-3 font-bold text-text-tertiary text-xs uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">Home</div>
                      <div className="text-xs text-text-tertiary">example.com/</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(217, 168, 84, 0.15)', color: '#D9A854' }}>Page</span>
                    </td>
                    <td className="px-4 py-4 text-center text-text-primary font-bold">2,847</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(107, 155, 90, 0.1)', color: '#6B9B5A' }}>High</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(153, 102, 204, 0.15)', color: '#9966CC' }}>WebSite</span>
                        <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(153, 102, 204, 0.15)', color: '#9966CC' }}>Organization</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>Analyzed</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">Services Overview</div>
                      <div className="text-xs text-text-tertiary">/services/</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(217, 168, 84, 0.15)', color: '#D9A854' }}>Page</span>
                    </td>
                    <td className="px-4 py-4 text-center text-text-primary font-bold">1,234</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(196, 112, 79, 0.1)', color: '#C4704F' }}>Medium</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(153, 102, 204, 0.15)', color: '#9966CC' }}>Service</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>In Progress</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">About Us</div>
                      <div className="text-xs text-text-tertiary">/about/</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(217, 168, 84, 0.15)', color: '#D9A854' }}>Page</span>
                    </td>
                    <td className="px-4 py-4 text-center text-text-primary font-bold">687</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(196, 105, 90, 0.1)', color: '#C4695A' }}>Low</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(153, 102, 204, 0.15)', color: '#9966CC' }}>AboutPage</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>Analyzed</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border-light hover:bg-bg-tertiary/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">How to Choose the Right Service Provider</div>
                      <div className="text-xs text-text-tertiary">/blog/choosing-service-provider/</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(196, 112, 79, 0.15)', color: '#C4704F' }}>Post</span>
                    </td>
                    <td className="px-4 py-4 text-center text-text-primary font-bold">1,892</td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-text-tertiary">None</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(153, 102, 204, 0.15)', color: '#9966CC' }}>BlogPosting</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-text-tertiary">Not Analyzed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What You Can Do */}
          <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(107, 155, 90, 0.08)' }}>
            <h4 className="text-base font-black text-text-primary mb-3">What You Can Do</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(107, 155, 90, 0.05)', borderColor: 'rgba(107, 155, 90, 0.2)' }}>
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <p className="text-text-primary">Edit page content, titles, and meta descriptions directly in Thorbit</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(107, 155, 90, 0.05)', borderColor: 'rgba(107, 155, 90, 0.2)' }}>
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <p className="text-text-primary">Add, update, or remove schema markup across multiple pages at once</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(107, 155, 90, 0.05)', borderColor: 'rgba(107, 155, 90, 0.2)' }}>
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <p className="text-text-primary">Bulk insert internal links with entity-matched anchor text recommendations</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(107, 155, 90, 0.05)', borderColor: 'rgba(107, 155, 90, 0.2)' }}>
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <p className="text-text-primary">Publish changes directly to WordPress without logging in separately</p>
              </div>
            </div>
          </div>
        </div>
      </FeatureModal>

      <FeatureModal isOpen={aiAssistantModalOpen} onClose={() => setAiAssistantModalOpen(false)} title="AI Strategy Assistant">
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">
            Context-aware chat with access to all your intelligence: <span className="font-bold text-primary">ICP, knowledge graph, briefs</span>, competitive analysis, on-page recommendations, and Search Console data.
          </p>

          <div className="bg-bg-secondary rounded-xl p-6">
            <h4 className="text-2xl font-bold text-text-primary mb-4">What You Can Ask</h4>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>"Which entities should I prioritize based on my ICP?"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>"What content gaps exist for my top-performing pages?"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>"How does my coverage compare to competitors in the Services category?"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-high text-xl flex-shrink-0">✓</span>
                <span>"What's the ROI potential of addressing these entity gaps?"</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-6 border border-border-light">
            <p className="text-sm font-bold text-text-primary mb-2">Example: Strategic planning</p>
            <p className="text-base text-text-secondary italic">
              "Asked: 'What's our biggest opportunity?' Got: 'Build content for 12 Solutions entities—competitor has 85% coverage, you have 22%. Estimated 2,400 monthly clicks available.'"
            </p>
          </div>
        </div>
      </FeatureModal>
    </div>
  );
}
