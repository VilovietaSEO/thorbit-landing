"use client";

import { useState } from "react";

interface FeatureTab {
  id: string;
  label: string;
  headline: string;
  description: string;
  bullets: string[];
  whyItMatters: string;
  difference: {
    traditional: string;
    thorbit: string;
  };
  ctaLearnMore: string;
  ctaExample?: string;
}

const FEATURES: FeatureTab[] = [
  {
    id: "icp",
    label: "Customer Psychology",
    headline: "This is Where Everyone Else Starts With Keywords. You Start With People.",
    description: "Keywords are approximations—guesses at what people want. Branding agencies charge $10k for real consumer intelligence. We automate it. Before mapping a single topic, we analyze 50+ actual customer conversations from Reddit, reviews, and forums. We document their exact pain points, language patterns, objections, and decision triggers—the intelligence that makes content convert, not just rank.",
    bullets: [
      "24-section customer profile with frequency validation (not made-up personas)",
      "Exact phrases customers use when desperate or researching (not keyword proxies)",
      "Failed solutions documented (\"what they tried and why it didn't work\")",
      "Decision triggers mapped (the moments that make them act)",
      "Your EOS framework (core values, differentiators, guarantee)"
    ],
    whyItMatters: "Every platform starts with keywords and creates generic content that sounds like competitors. You'll start with actual people and create content that converts because it serves real needs. Every piece of content downstream—briefs, articles, campaigns—is rooted in documented consumer psychology, not search volume guesses.",
    difference: {
      traditional: "Keywords → Competitor averages → Generic content",
      thorbit: "Real people → Consumer psychology → Content that converts"
    },
    ctaLearnMore: "Learn More",
    ctaExample: "See Example ICP"
  },
  {
    id: "graph",
    label: "Knowledge Graph",
    headline: "The Complete Topical Map—Built on Real Consumer Needs",
    description: "Traditional keyword research gives you search volume. We give you complete topical territory rooted in consumer psychology. Every entity in the graph represents something your ICP actually needs—not just what has search volume. The graph maps 500-600 interconnected topics, 5,860 ICP-specific search queries, and 3,000+ relationships showing how topics naturally connect. Generated in under 2 hours instead of 6 months of manual research.",
    bullets: [
      "500-600 interconnected entities across your domain (not keyword lists)",
      "5,860 search queries (10 per entity: generic + ICP-specific language)",
      "Search intent classification (definition, comparison, cost, process, eligibility)",
      "3,000+ relationship edges showing which topics naturally connect",
      "Strategic relationship mapping (enables, addresses, requires, alternative-to)",
      "Content scaffolds for every entity (writers know the structure)"
    ],
    whyItMatters: "Competitors with 50 articles outrank you with 100 because they systematically covered 200 entities with dense interconnection. You covered 80 entities randomly based on keyword volume. The graph shows you the 120 critical gaps preventing authority—rooted in what people actually need, not search volume approximations. This is your 12-18 month roadmap.",
    difference: {
      traditional: "500 keywords from Ahrefs → Random articles → Hope for rankings",
      thorbit: "500+ entities rooted in ICP needs → Strategic coverage → Systematic authority"
    },
    ctaLearnMore: "Learn More",
    ctaExample: "Explore Interactive Graph"
  },
  {
    id: "visualizer",
    label: "Authority Visualizer",
    headline: "See What You Can't Fix",
    description: "You publish 200 articles but still don't rank well. Competitors with fewer articles dominate your niche. You can't explain why. The visualizer makes invisible gaps visible—transforming your knowledge graph and website into a color-coded map showing exactly where you dominate, where you're weak, and which critical topics you're not covering at all.",
    bullets: [
      "Color-coded coverage map (green = covered, yellow = weak, red = missing)",
      "Coverage bands with scores (HIGH ≥0.55, MEDIUM 0.35-0.55, LOW 0.20-0.35, NONE <0.20)",
      "Page-level detail (which specific pages cover each entity, similarity scores)",
      "Strategic filtering (show me Critical entities with LOW coverage)",
      "Competitor comparison (load two sites side-by-side, see exactly why they dominate)",
      "Semantic understanding (detects \"medication side effects\" matches \"adverse reaction monitoring\")"
    ],
    whyItMatters: "In sales calls, share your screen. Load prospect's site—sparse coverage and orphan topics. Load their top competitor—dense coverage. Filter to Critical gaps. \"These 30 entities are why you're not ranking. Here's your roadmap.\" Visual proof closes deals. No debate, just documented gaps.",
    difference: {
      traditional: "Spreadsheet gap analysis → Manual guessing → 20+ hours per month",
      thorbit: "Visual proof → Competitor comparison → 3 minutes to understand"
    },
    ctaLearnMore: "Learn More",
    ctaExample: "See Competitor Comparison"
  },
  {
    id: "linking",
    label: "AI Link Architect",
    headline: "Turn Random Links Into Strategic Architecture",
    description: "Internal linking is where most sites fail at topical authority. You link based on keyword matches—random connections that don't signal expertise to Google. The AI Link Architect analyzes your complete knowledge graph and existing content coverage to generate strategic linking recommendations. Three options per entity (Conservative, Balanced, Aggressive), with exact source pages, target pages, semantic anchor text, and section-level placement. Cluster density becomes measurable and systematic.",
    bullets: [
      "3 strategic linking options per entity (Conservative: proven pages, Balanced: expand reach, Aggressive: strengthen weak spots)",
      "Suggested anchor text with semantic variations (not repetitive keywords that signal manipulation)",
      "Source page identification (which pages should link out based on authority)",
      "Target page identification (which pages need strengthening)",
      "Exact section placement (not just \"link these pages\"—specific recommendations based on content context)",
      "Relationship-based logic (links follow entity relationships: symptom → cause, problem → solution, service → tool)",
      "Coverage-aware recommendations (strengthen weak clusters vs. reinforce strong ones)",
      "Orphan page detection (too few links = lost authority, too many = dilution)"
    ],
    whyItMatters: "Google measures cluster density—are related topics tightly connected through strategic internal linking, or scattered randomly? Manual linking takes weeks and creates random patterns based on keyword matching. The AI Link Architect generates 500+ entity linking recommendations in minutes. \"Link from Page A, Section 3, to Page B using 'emergency water heater repair' because this strengthens your Service cluster by creating a documented Symptom→Solution relationship.\" That's what Google measures for topical authority.",
    difference: {
      traditional: "Manual hunting → Keyword matching → Random patterns",
      thorbit: "Automated analysis → Semantic relationships → Strategic cluster density"
    },
    ctaLearnMore: "Learn More",
    ctaExample: "See Linking Strategy"
  },
  {
    id: "content",
    label: "Content Lab",
    headline: "Content That Converts Because It Serves Real People",
    description: "Every platform optimizes for keywords and competitor averages. Result? Generic content that ranks but doesn't convert. The Content Lab starts with your ICP—who's searching, why right now, what emotional state, what they specifically need. Then generates 2,000-2,500 word strategic briefs telling writers exactly how to serve that specific human need. Content that converts isn't guesswork—it's strategic architecture rooted in consumer psychology.",
    bullets: [
      "2,000-2,500 word strategic briefs (not 200-word keyword templates)",
      "Psychological state analysis (who's searching, why now, what they need)",
      "Content type determination (cost guide vs. service page vs. troubleshooting—format matches psychological need)",
      "Target length with reasoning (\"2,200-2,400 words because critical urgency + comprehensive scope\")",
      "Exact opening line in customer language (\"If you're staring at a $1,500 quote wondering 'how much should this actually cost?'\")",
      "Section-by-section instructions (what to cover, why it matters, how to position)",
      "Research queries mapped to sections (writers know which stats support which points)",
      "Strategic positioning (where to mention differentiators, which failed solutions to reference with empathy)"
    ],
    whyItMatters: "Competitor content says \"$200-$3,000\" and lists leak types. Your content opens with \"If you're staring at a $1,500 quote wondering 'how much should this actually cost?'\"—validating their exact emotional state—then explains pricing using their confusion language, addresses their past failure hiring cheap contractors, answers unspoken questions about hidden costs. That's what converts. That's what LLMs recommend. That's what people want.",
    difference: {
      traditional: "Copy competitor structure → Optimize for keywords → Generic content",
      thorbit: "Understand person's psychology → Write for their specific need → Content that converts"
    },
    ctaLearnMore: "Learn More",
    ctaExample: "See Example Brief"
  },
  {
    id: "campaign",
    label: "Campaign Architect",
    headline: "Turn \"Maybe 50 Articles?\" Into \"Exactly 156 Articles, Here's Why\"",
    description: "Client asks \"How much will content cost?\" You think \"Maybe... 50 articles? So $25,000? Over 6 months?\" You can't justify which topics matter most. Your content team stares at 500+ possible topics and freezes. The Campaign Architect transforms your knowledge graph into a phase-based execution plan with mathematical prioritization, real-time budget calculations, and duplicate detection—in minutes, not days of spreadsheet guessing.",
    bullets: [
      "Real-time scope calculator (adjust sliders, instantly see impact: \"44 entities need content, 156 articles required, $91,200 value, score 42.3 → 78.6\")",
      "Mathematical prioritization (opportunity score = importance weight × coverage gap × tier multiplier)",
      "Automatic phase distribution (entities sorted by score, distributed into phases: \"Phase 1: 22 highest-priority entities, 78 articles, $45,600, +18.2 score improvement, 3 months\")",
      "Manual phase adjustment (drag entities between phases, everything recalculates instantly)",
      "Already-covered detection (checks existing URLs against entity topics, prevents duplicate spending)",
      "Per-entity progress tracking (published ✅, already covered 🚫, pending ⚪)",
      "Multiple pricing models (per-article, topic gap %, flat rate, or DIY with no pricing)"
    ],
    whyItMatters: "Before: \"How much will this cost?\" → \"Maybe 50 articles over 6 months... $25,000?\" → based on nothing, client pushes back, you have no data. After: \"How much will this cost?\" → \"44 entities need content (documented gaps), 156 articles required (calculated from coverage targets), $91,200 total (transparent pricing), score improvement 42.3 → 78.6 (+36.3 points)—here's the phased breakdown and business case\" → justified with data, client says yes.",
    difference: {
      traditional: "Pricing guesswork → Random prioritization → Overwhelming scope",
      thorbit: "Mathematical certainty → Opportunity scoring → Phased execution"
    },
    ctaLearnMore: "Learn More",
    ctaExample: "See Scope Calculator"
  }
];

interface FeatureTabsProps {
  onExampleClick?: (featureId: string) => void;
}

export default function FeatureTabs({ onExampleClick }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState("icp");
  const activeFeature = FEATURES.find(f => f.id === activeTab) || FEATURES[0];

  const handleExampleClick = () => {
    if (onExampleClick && activeFeature.id) {
      onExampleClick(activeFeature.id);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Badge */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary font-medium border border-secondary/30 text-sm">
            Platform Features
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`
                px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${activeTab === feature.id
                  ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg scale-105 border-2 border-primary'
                  : 'bg-gradient-to-br from-bg-secondary to-bg-tertiary text-text-secondary hover:from-secondary/10 hover:to-secondary/5 hover:text-text-primary hover:border-secondary/30 hover:scale-102 border-2 border-transparent'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeTab === feature.id ? 'bg-white' : 'bg-accent/40'}`}></span>
                {feature.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="card-v2 p-12 min-h-[600px] border-2 hover:border-secondary/20 transition-all">
          {/* Headline */}
          <h3 className="text-3xl font-black text-text-primary mb-6 leading-tight">
            <span className="relative inline-block">
              {activeFeature.headline}
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"></span>
            </span>
          </h3>

          {/* Description */}
          <p className="text-lg text-text-primary font-light leading-relaxed mb-8">
            {activeFeature.description}
          </p>

          {/* What You Get */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full"></span>
              <span className="text-primary">What You Get:</span>
            </h4>
            <ul className="space-y-3">
              {activeFeature.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 text-text-primary font-light leading-relaxed group">
                  <span className="text-secondary mt-1.5 flex-shrink-0 transition-transform group-hover:scale-125">▸</span>
                  <span className="group-hover:text-text-primary transition-colors">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why This Matters */}
          <div className="mb-8 p-6 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border-2 border-secondary/20 hover:border-secondary/40 transition-all">
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-secondary">💡</span>
              <span className="text-text-primary">Why This Matters:</span>
            </h4>
            <p className="text-text-primary font-light leading-relaxed">
              {activeFeature.whyItMatters}
            </p>
          </div>

          {/* The Difference */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-text-primary mb-4">The Difference:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-low/5 to-low/10 rounded-xl border-2 border-low/20 hover:border-low/40 transition-all">
                <div className="text-low font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  <span>Traditional</span>
                </div>
                <div className="text-sm text-text-secondary font-light leading-relaxed">{activeFeature.difference.traditional}</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-high/10 to-secondary/10 rounded-xl border-2 border-high/30 hover:border-high/60 hover:shadow-lg transition-all">
                <div className="text-high font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <span>Thorbit</span>
                </div>
                <div className="text-sm text-text-primary font-light leading-relaxed">{activeFeature.difference.thorbit}</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary-v2 hover:scale-105 active:scale-100 transition-transform">
              {activeFeature.ctaLearnMore}
            </button>
            {activeFeature.ctaExample && (
              <button
                onClick={handleExampleClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 text-text-primary font-medium transition-all border border-secondary/30 hover:border-secondary hover:shadow-md hover:scale-105 active:scale-100"
              >
                <span className="flex items-center gap-2">
                  {activeFeature.ctaExample}
                  <span className="text-secondary">→</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
