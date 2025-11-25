"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  RotateCcw,
  MousePointer2,
  Target,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

// Demo data matching the real internal linking UI
const demoData = {
  stats: {
    totalTargets: 24,
    totalLinks: 156,
    avgPerTarget: "6.5",
    generated: "2 hours ago",
  },
  target: {
    url: "genesight.com/mental-health/adhd-treatment",
    entity: { name: "ADHD Treatment", importance: "critical" },
    linkCount: 2,
  },
  sourceLink: {
    sourceUrl: "genesight.com/blog/understanding-adhd-medications",
    sourceEntity: "ADHD Medications",
    relationshipType: "solves",
  },
  placement: {
    anchorText: "ADHD treatment options",
    snippet: "For patients struggling with focus and attention, exploring different ADHD treatment options can help identify the most effective approach.",
    score: 0.92,
  },
  aiSuggestions: [
    { label: "Contextual Integration", text: "For patients struggling with focus and attention, exploring different <u>ADHD treatment options</u> can help identify the most effective approach based on your unique genetic profile." },
    { label: "Benefit-Focused", text: "Understanding your genetic markers opens up more effective <u>ADHD treatment options</u>, reducing the trial-and-error often associated with finding the right medication." },
    { label: "Call-to-Action", text: "Ready to find what works for you? Learn about science-backed <u>ADHD treatment options</u> that consider your individual response to medications." },
  ],
};

interface CursorPosition {
  x: number;
  y: number;
}

export default function InternalLinkingFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 50, y: 50 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // UI State
  const [showStats, setShowStats] = useState(false);
  const [showTargetCard, setShowTargetCard] = useState(false);
  const [targetHighlighted, setTargetHighlighted] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(false);
  const [showPlacements, setShowPlacements] = useState(false);
  const [aiButtonHighlighted, setAiButtonHighlighted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false);

  // Refs for targeting elements
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const targetCardRef = useRef<HTMLDivElement>(null);
  const expandBtnRef = useRef<HTMLButtonElement>(null);
  const aiSuggestionsBtnRef = useRef<HTMLButtonElement>(null);
  const copyBtn1Ref = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Get element center position relative to container
  const getElementCenter = useCallback((element: HTMLElement | null): CursorPosition => {
    if (!element || !containerRef.current) return { x: 50, y: 50 };
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    };
  }, []);

  // Move cursor to position
  const moveCursor = useCallback((pos: CursorPosition) => {
    setCursorPos(pos);
  }, []);

  // Simulate click
  const simulateClick = useCallback(() => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
  }, []);

  // Sleep helper
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Main demo sequence
  const runDemo = useCallback(async () => {
    if (!containerRef.current) return;

    // Reset state
    setShowStats(false);
    setShowTargetCard(false);
    setTargetHighlighted(false);
    setCardExpanded(false);
    setShowPlacements(false);
    setAiButtonHighlighted(false);
    setShowModal(false);
    setSuggestionsLoading(false);
    setSuggestionsLoaded(false);
    setCopiedIndex(null);

    await sleep(300);
    setCursorVisible(true);

    // Start cursor in center
    moveCursor({ x: containerRef.current.offsetWidth / 2, y: 150 });
    await sleep(500);

    // === Step 1: Click Generate button ===
    const generatePos = getElementCenter(generateBtnRef.current);
    moveCursor(generatePos);
    await sleep(600);
    simulateClick();
    await sleep(200);

    // Show loading briefly, then stats and target list
    await sleep(800);
    setShowStats(true);
    await sleep(400);
    setShowTargetCard(true);
    await sleep(800);

    // === Step 2: Click on target card to highlight ===
    const targetPos = getElementCenter(targetCardRef.current);
    moveCursor(targetPos);
    await sleep(600);
    simulateClick();
    await sleep(150);
    setTargetHighlighted(true);
    await sleep(600);

    // === Step 3: Click expand button ===
    const expandPos = getElementCenter(expandBtnRef.current);
    moveCursor(expandPos);
    await sleep(500);
    simulateClick();
    await sleep(150);
    setCardExpanded(true);
    await sleep(600);
    setShowPlacements(true);
    await sleep(800);

    // === Step 4: Click AI Suggestions button ===
    const aiPos = getElementCenter(aiSuggestionsBtnRef.current);
    moveCursor(aiPos);
    await sleep(500);
    setAiButtonHighlighted(true);
    await sleep(300);
    simulateClick();
    await sleep(200);
    setShowModal(true);
    setSuggestionsLoading(true);
    await sleep(1200);
    setSuggestionsLoading(false);
    setSuggestionsLoaded(true);
    await sleep(800);

    // === Step 5: Click copy on first suggestion ===
    const copyPos = getElementCenter(copyBtn1Ref.current);
    moveCursor(copyPos);
    await sleep(500);
    simulateClick();
    await sleep(150);
    setCopiedIndex(0);
    await sleep(2000);

    // === Step 6: Close modal ===
    const closePos = getElementCenter(closeBtnRef.current);
    moveCursor(closePos);
    await sleep(400);
    simulateClick();
    await sleep(150);
    setShowModal(false);
    setSuggestionsLoaded(false);
    await sleep(1000);

    // Hide cursor and stop
    setCursorVisible(false);
    setIsPlaying(false);
  }, [getElementCenter, moveCursor, simulateClick]);

  // Start demo
  const handlePlay = () => {
    setIsPlaying(true);
    runDemo();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCursorVisible(false);
    setShowStats(false);
    setShowTargetCard(false);
    setTargetHighlighted(false);
    setCardExpanded(false);
    setShowPlacements(false);
    setAiButtonHighlighted(false);
    setShowModal(false);
    setSuggestionsLoading(false);
    setSuggestionsLoaded(false);
    setCopiedIndex(null);
  };

  const getImportanceStyle = (importance: string) => {
    switch (importance) {
      case "critical": return "bg-low/20 text-low border-low/30";
      case "high": return "bg-medium/20 text-medium border-medium/30";
      default: return "bg-text-tertiary/20 text-text-tertiary border-text-tertiary/30";
    }
  };

  const getRelationshipStyle = (type: string) => {
    switch (type) {
      case "solves": return "bg-high/20 text-high border-high/30";
      case "requires": return "bg-secondary/20 text-secondary border-secondary/30";
      default: return "bg-text-tertiary/20 text-text-tertiary border-text-tertiary/30";
    }
  };

  const renderTextWithLinks = (text: string) => {
    const parts = text.split(/(<\/?u>)/);
    let isLink = false;

    return parts.map((part, i) => {
      if (part === "<u>") { isLink = true; return null; }
      if (part === "</u>") { isLink = false; return null; }
      if (!part) return null;

      return isLink ? (
        <span key={i} className="text-secondary font-semibold underline decoration-2 decoration-secondary/50">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        ref={containerRef}
        className="bg-bg-primary rounded-2xl border-2 border-border-light shadow-lg overflow-hidden relative"
      >
        {/* Play Overlay - Click anywhere to start */}
        {!isPlaying && !cursorVisible && (
          <div
            onClick={handlePlay}
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group transition-all hover:bg-black/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-primary ml-1" />
              </div>
              <span className="text-white font-medium text-lg">Click to watch demo</span>
            </div>
          </div>
        )}

        {/* Animated Cursor */}
        {cursorVisible && (
          <div
            className="absolute z-50 pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-2px, -2px)',
            }}
          >
            <MousePointer2
              className={`w-6 h-6 text-text-primary drop-shadow-lg transition-transform duration-100 ${
                isClicking ? 'scale-90' : 'scale-100'
              }`}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            />
            {isClicking && (
              <div className="absolute top-0 left-0 w-8 h-8 -ml-1 -mt-1 rounded-full bg-primary/30 animate-ping" />
            )}
          </div>
        )}

        {/* Header */}
        <div className="px-6 py-4 border-b border-border-light bg-gradient-to-r from-secondary/10 to-accent/10">
          <p className="text-xs font-bold uppercase tracking-wide text-text-tertiary">Internal Linking</p>
          <h3 className="text-xl font-black text-text-primary">Link Opportunities</h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 min-h-[450px]">
          {/* Generate Button */}
          <div className="flex justify-end">
            <button
              ref={generateBtnRef}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              <Play className="h-4 w-4" />
              Generate Opportunities
            </button>
          </div>

          {/* Stats */}
          <div className={`bg-bg-secondary rounded-xl p-4 transition-all duration-500 ${showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-text-primary">{demoData.stats.totalTargets}</div>
                <div className="text-xs text-text-tertiary">Target Pages</div>
              </div>
              <div>
                <div className="text-2xl font-black text-text-primary">{demoData.stats.totalLinks}</div>
                <div className="text-xs text-text-tertiary">Link Opportunities</div>
              </div>
              <div>
                <div className="text-2xl font-black text-text-primary">{demoData.stats.avgPerTarget}</div>
                <div className="text-xs text-text-tertiary">Avg Per Target</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary mb-1">Generated</div>
                <div className="text-sm font-bold text-text-primary">{demoData.stats.generated}</div>
              </div>
            </div>
          </div>

          {/* Target Card */}
          <div className={`transition-all duration-500 ${showTargetCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div
              ref={targetCardRef}
              className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                targetHighlighted ? "border-primary/50 shadow-lg" : "border-border-light"
              }`}
            >
              {/* Target Header */}
              <div className={`p-4 border-b border-border-light transition-colors ${targetHighlighted ? "bg-primary/5" : "bg-bg-secondary/50"}`}>
                <div className="flex items-start gap-3">
                  <Target className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-colors ${targetHighlighted ? "text-primary" : "text-secondary"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs uppercase font-bold tracking-wide text-text-tertiary">Target Page</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${getImportanceStyle(demoData.target.entity.importance)}`}>
                        {demoData.target.entity.importance} importance
                      </span>
                    </div>
                    <div className="text-base font-bold text-primary flex items-center gap-2">
                      {demoData.target.url}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-text-tertiary">
                      <span>Entity: <span className="font-medium text-text-primary">{demoData.target.entity.name}</span></span>
                      <span className="text-secondary font-medium">{demoData.target.linkCount} sources can link here</span>
                    </div>
                  </div>
                  <button ref={expandBtnRef} className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors">
                    {cardExpanded ? <ChevronUp className="h-5 w-5 text-text-secondary" /> : <ChevronDown className="h-5 w-5 text-text-secondary" />}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              <div className={`transition-all duration-500 overflow-hidden ${cardExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-4 space-y-4">
                  {/* Source Link */}
                  <div className="flex items-start gap-3">
                    <ArrowUpRight className="h-4 w-4 text-text-tertiary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs uppercase font-bold tracking-wide text-text-tertiary">Link from</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${getRelationshipStyle(demoData.sourceLink.relationshipType)}`}>
                          {demoData.sourceLink.relationshipType}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-text-primary flex items-center gap-2">
                        {demoData.sourceLink.sourceUrl}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </div>
                      <div className="text-xs text-text-tertiary mt-1">
                        via entity: <span className="font-medium">{demoData.sourceLink.sourceEntity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Placements */}
                  <div className={`ml-7 space-y-3 transition-all duration-500 ${showPlacements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <div className="text-xs uppercase font-bold tracking-wide text-text-tertiary">
                      Placement options (2)
                    </div>

                    <div className={`bg-bg-secondary rounded-lg p-4 border transition-all ${aiButtonHighlighted ? "border-primary/50 ring-2 ring-primary/20" : "border-border-light"}`}>
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">"{demoData.placement.anchorText}"</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border bg-high/20 text-high border-high/30">
                            Strong match
                          </span>
                        </div>
                        <button
                          ref={aiSuggestionsBtnRef}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                            aiButtonHighlighted ? "bg-accent text-white" : "border border-border text-text-secondary hover:bg-bg-tertiary"
                          }`}
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>AI Suggestions</span>
                        </button>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">"{demoData.placement.snippet}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Modal */}
        {showModal && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 z-30">
            <div className={`bg-bg-primary rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transition-all duration-300 ${suggestionsLoaded ? "opacity-100 scale-100" : "opacity-90 scale-95"}`}>
              {/* Modal Header */}
              <div className="p-4 border-b border-border-light">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h4 className="text-lg font-black text-text-primary">AI Link Insertion Suggestions</h4>
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  Anchor text: <span className="font-bold text-secondary">"{demoData.placement.anchorText}"</span>
                  <span className="text-text-tertiary"> → </span>
                  <span className="font-medium text-secondary">{demoData.target.entity.name}</span>
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {suggestionsLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    <p className="text-text-secondary text-sm">Generating natural insertion options...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-text-secondary">
                      Here are 3 different ways to naturally insert this link.
                      The <span className="text-secondary font-medium">highlighted text</span> is the link.
                    </p>

                    {demoData.aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="border border-border rounded-xl p-3 hover:border-primary/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-xs font-bold text-text-primary">{suggestion.label}</span>
                          </div>
                          <button
                            ref={index === 0 ? copyBtn1Ref : undefined}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border transition-all ${
                              copiedIndex === index
                                ? "bg-high text-white border-high"
                                : "border-high text-high hover:bg-high hover:text-white"
                            }`}
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="h-3 w-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-bg-secondary rounded-lg p-3 text-sm leading-relaxed text-text-primary border border-border-light">
                          {renderTextWithLinks(suggestion.text)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border-light flex justify-end">
                <button
                  ref={closeBtnRef}
                  className="px-4 py-2 rounded-lg bg-bg-secondary text-text-secondary font-medium text-sm hover:bg-bg-tertiary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-light bg-bg-secondary flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPlaying && (
              <span className="flex items-center gap-2 px-3 py-1.5 text-secondary text-sm font-medium bg-secondary/10 rounded-full">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Demo playing...
              </span>
            )}
            {!isPlaying && cursorVisible && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1.5 text-text-secondary hover:text-text-primary text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </button>
            )}
          </div>
          <p className="text-xs text-text-tertiary">
            {!isPlaying && !cursorVisible && "Click anywhere to start the demo"}
            {isPlaying && "Watch how internal linking suggestions work"}
            {!isPlaying && cursorVisible && "Demo complete - click Restart to replay"}
          </p>
        </div>
      </div>
    </div>
  );
}
