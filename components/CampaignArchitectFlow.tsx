"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  RotateCcw,
  MousePointer2,
} from "lucide-react";

// Types
type WizardStep = 1 | 2 | 3 | 4;
type PricingModel = "per_article" | "topic_gap_percentage" | "flat_rate" | "diy" | "";

interface CoverageTargets {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface FormData {
  pricingModelType: PricingModel;
  briefPrice: string;
  articlePrice: string;
  timeline: 1 | 3 | 6 | 9 | 12;
  coverageTargets: CoverageTargets;
  name: string;
}

interface CursorPosition {
  x: number;
  y: number;
}

// Simulated scope calculation
function calculateScope(formData: FormData) {
  const { coverageTargets, pricingModelType, briefPrice, articlePrice, timeline } = formData;
  const bp = parseFloat(briefPrice) || 0;
  const ap = parseFloat(articlePrice) || 0;

  const entityCounts = { critical: 12, high: 18, medium: 24, low: 31 };
  const entitiesNeeding = {
    critical: Math.ceil(entityCounts.critical * (coverageTargets.critical / 10)),
    high: Math.ceil(entityCounts.high * (coverageTargets.high / 10)),
    medium: Math.ceil(entityCounts.medium * (coverageTargets.medium / 10)),
    low: Math.ceil(entityCounts.low * (coverageTargets.low / 10)),
  };

  const totalEntities = entitiesNeeding.critical + entitiesNeeding.high + entitiesNeeding.medium + entitiesNeeding.low;
  const articlesPerEntity = { critical: 5, high: 4, medium: 3, low: 2 };
  const totalArticles =
    entitiesNeeding.critical * articlesPerEntity.critical +
    entitiesNeeding.high * articlesPerEntity.high +
    entitiesNeeding.medium * articlesPerEntity.medium +
    entitiesNeeding.low * articlesPerEntity.low;

  let totalValue = 0;
  if (pricingModelType === "per_article") {
    totalValue = (totalEntities * bp) + (totalArticles * ap);
  }

  const currentScore = 42.3;
  const maxImprovement = 45;
  const coverageWeight = (coverageTargets.critical * 0.4 + coverageTargets.high * 0.3 + coverageTargets.medium * 0.2 + coverageTargets.low * 0.1) / 10;
  const scoreImprovement = maxImprovement * coverageWeight * (timeline / 12);
  const targetScore = Math.min(100, currentScore + scoreImprovement);

  return { totalEntities, totalArticles, totalValue, scoreImprovement, currentScore, targetScore };
}

export default function CampaignArchitectFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<WizardStep>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 50, y: 50 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    pricingModelType: "",
    briefPrice: "",
    articlePrice: "",
    timeline: 6,
    coverageTargets: { critical: 10, high: 8, medium: 5, low: 3 },
    name: "",
  });

  const scope = calculateScope(formData);

  // Refs for targeting elements
  const perArticleRef = useRef<HTMLButtonElement>(null);
  const briefPriceRef = useRef<HTMLInputElement>(null);
  const articlePriceRef = useRef<HTMLInputElement>(null);
  const timeline6Ref = useRef<HTMLButtonElement>(null);
  const campaignNameRef = useRef<HTMLInputElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const criticalSliderRef = useRef<HTMLInputElement>(null);

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

  // Type text character by character
  const typeText = useCallback((
    setter: (val: string) => void,
    text: string,
    delay: number = 80
  ): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setter(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  }, []);

  // Sleep helper
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Main demo sequence
  const runDemo = useCallback(async () => {
    if (!containerRef.current) return;

    // Reset state
    setStep(1);
    setFormData({
      pricingModelType: "",
      briefPrice: "",
      articlePrice: "",
      timeline: 6,
      coverageTargets: { critical: 10, high: 8, medium: 5, low: 3 },
      name: "",
    });

    await sleep(300);
    setCursorVisible(true);

    // Start cursor in center
    moveCursor({ x: containerRef.current.offsetWidth / 2, y: 200 });
    await sleep(500);

    // === STEP 1: Select Pricing Model ===
    // Move to "Per Article" option
    await sleep(400);
    const perArticlePos = getElementCenter(perArticleRef.current);
    moveCursor(perArticlePos);
    await sleep(600);
    simulateClick();
    await sleep(150);
    setFormData(prev => ({ ...prev, pricingModelType: "per_article" }));
    await sleep(800);

    // Click Next
    const nextPos = getElementCenter(nextBtnRef.current);
    moveCursor(nextPos);
    await sleep(500);
    simulateClick();
    await sleep(150);
    setStep(2);
    await sleep(600);

    // === STEP 2: Configure Pricing ===
    // Move to Brief Price input and type
    const briefPos = getElementCenter(briefPriceRef.current);
    moveCursor(briefPos);
    await sleep(500);
    simulateClick();
    await sleep(200);
    await typeText((val) => setFormData(prev => ({ ...prev, briefPrice: val })), "150", 120);
    await sleep(400);

    // Move to Article Price input and type
    const articlePos = getElementCenter(articlePriceRef.current);
    moveCursor(articlePos);
    await sleep(400);
    simulateClick();
    await sleep(200);
    await typeText((val) => setFormData(prev => ({ ...prev, articlePrice: val })), "450", 120);
    await sleep(600);

    // Click Next
    moveCursor(getElementCenter(nextBtnRef.current));
    await sleep(500);
    simulateClick();
    await sleep(150);
    setStep(3);
    await sleep(600);

    // === STEP 3: Select Timeline ===
    // Move to 6 months option (already selected, but show cursor going there)
    const timelinePos = getElementCenter(timeline6Ref.current);
    moveCursor(timelinePos);
    await sleep(500);
    simulateClick();
    await sleep(150);
    setFormData(prev => ({ ...prev, timeline: 6 }));
    await sleep(600);

    // Click Next
    moveCursor(getElementCenter(nextBtnRef.current));
    await sleep(500);
    simulateClick();
    await sleep(150);
    setStep(4);
    await sleep(600);

    // === STEP 4: Coverage Targets ===
    // Move to Campaign Name and type
    const namePos = getElementCenter(campaignNameRef.current);
    moveCursor(namePos);
    await sleep(500);
    simulateClick();
    await sleep(200);
    await typeText((val) => setFormData(prev => ({ ...prev, name: val })), "Q1 2025 Content Campaign", 50);
    await sleep(800);

    // Adjust Critical slider
    const sliderPos = getElementCenter(criticalSliderRef.current);
    moveCursor({ x: sliderPos.x + 40, y: sliderPos.y }); // Move right on slider
    await sleep(400);
    simulateClick();
    setFormData(prev => ({
      ...prev,
      coverageTargets: { ...prev.coverageTargets, critical: 12 }
    }));
    await sleep(300);
    moveCursor({ x: sliderPos.x + 60, y: sliderPos.y });
    await sleep(200);
    setFormData(prev => ({
      ...prev,
      coverageTargets: { ...prev.coverageTargets, critical: 14 }
    }));
    await sleep(1000);

    // Move to Create Campaign button
    const createPos = getElementCenter(createBtnRef.current);
    moveCursor(createPos);
    await sleep(600);
    simulateClick();
    await sleep(200);

    // Final pause showing results
    await sleep(3000);

    // Hide cursor and stop
    setCursorVisible(false);
    setIsPlaying(false);
  }, [getElementCenter, moveCursor, simulateClick, typeText]);

  // Start demo
  const handlePlay = () => {
    setIsPlaying(true);
    runDemo();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCursorVisible(false);
    setStep(1);
    setFormData({
      pricingModelType: "",
      briefPrice: "",
      articlePrice: "",
      timeline: 6,
      coverageTargets: { critical: 10, high: 8, medium: 5, low: 3 },
      name: "",
    });
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Pricing Model";
      case 2: return "Pricing Configuration";
      case 3: return "Timeline";
      case 4: return "Coverage Targets";
    }
  };

  // Importance level colors matching the design system
  const importanceColors = {
    critical: "#B85A4A",
    high: "#C97A52",
    medium: "#D4A55A",
    low: "#7A8B7A",
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
        <div className="px-6 py-4 border-b border-border-light bg-gradient-to-r from-bg-secondary to-bg-primary">
          <h3 className="text-xl font-black text-text-primary">Configure Content Campaign</h3>
          <p className="text-sm text-text-secondary mt-1">
            Step {step} of 4: {getStepTitle()}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-500 ${
                    stepNum < step
                      ? "bg-primary text-white"
                      : stepNum === step
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-bg-secondary text-text-secondary"
                  }`}
                >
                  {stepNum < step ? <Check className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 rounded transition-all duration-500 ${stepNum < step ? "bg-primary" : "bg-bg-secondary"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Pricing Model Selection */}
          <div className={`transition-all duration-500 ${step === 1 ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}>
            {step === 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-text-primary mb-4">
                  Select Pricing Model <span className="text-low">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "per_article", label: "Per Article", description: "Pay per brief and article created" },
                    { value: "topic_gap_percentage", label: "Topic Gap %", description: "Pay based on percentage of topic gap closed" },
                    { value: "flat_rate", label: "Flat Rate", description: "Monthly or quarterly retainer" },
                    { value: "diy", label: "DIY", description: "No cost - you create the content yourself" },
                  ].map((model) => (
                    <button
                      key={model.value}
                      ref={model.value === "per_article" ? perArticleRef : undefined}
                      onClick={() => setFormData(prev => ({ ...prev, pricingModelType: model.value as PricingModel }))}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.pricingModelType === model.value
                          ? "border-primary bg-primary/5 scale-[1.02]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium text-text-primary mb-1">{model.label}</div>
                      <div className="text-sm text-text-secondary">{model.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Pricing Configuration */}
          <div className={`transition-all duration-500 ${step === 2 ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}>
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Brief Price ($) <span className="text-low">*</span>
                  </label>
                  <input
                    ref={briefPriceRef}
                    type="text"
                    value={formData.briefPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, briefPrice: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-bg-primary text-text-primary focus:border-primary focus:outline-none transition-colors"
                    placeholder="0"
                  />
                  <p className="text-xs text-text-tertiary mt-1">Price per strategic content brief</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Article Price ($) <span className="text-low">*</span>
                  </label>
                  <input
                    ref={articlePriceRef}
                    type="text"
                    value={formData.articlePrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, articlePrice: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-bg-primary text-text-primary focus:border-primary focus:outline-none transition-colors"
                    placeholder="0"
                  />
                  <p className="text-xs text-text-tertiary mt-1">Price per article created</p>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Timeline Selection */}
          <div className={`transition-all duration-500 ${step === 3 ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}>
            {step === 3 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-text-primary mb-4">
                  Campaign Duration <span className="text-low">*</span>
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {([1, 3, 6, 9, 12] as const).map((months) => (
                    <button
                      key={months}
                      ref={months === 6 ? timeline6Ref : undefined}
                      onClick={() => setFormData(prev => ({ ...prev, timeline: months }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.timeline === months
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-2xl font-black text-text-primary mb-1">{months}</div>
                      <div className="text-xs text-text-secondary">{months === 1 ? "month" : "months"}</div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-text-secondary mt-4">
                  Campaign will be divided into{" "}
                  {formData.timeline === 1 || formData.timeline === 3
                    ? "1 phase"
                    : formData.timeline === 6
                      ? "2 phases (3 months each)"
                      : formData.timeline === 9
                        ? "3 phases (3 months each)"
                        : "4 phases (3 months each)"}
                </p>
              </div>
            )}
          </div>

          {/* Step 4: Coverage Targets */}
          <div className={`transition-all duration-500 ${step === 4 ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}>
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Campaign Name</label>
                  <input
                    ref={campaignNameRef}
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-bg-primary text-text-primary focus:border-primary focus:outline-none transition-colors"
                    placeholder="Q1 2025 Content Campaign"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Coverage Targets per Importance Level</label>
                    <p className="text-xs text-text-secondary mb-4">Set minimum high-coverage URLs needed for each importance level</p>
                  </div>

                  {[
                    { key: "critical" as const, label: "Critical", min: 3, max: 15 },
                    { key: "high" as const, label: "High", min: 2, max: 12 },
                    { key: "medium" as const, label: "Medium", min: 2, max: 8 },
                    { key: "low" as const, label: "Low", min: 1, max: 5 },
                  ].map((target) => (
                    <div key={target.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-primary flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: importanceColors[target.key] }}
                          />
                          {target.label}
                        </label>
                        <span className="text-sm font-bold text-primary">
                          {formData.coverageTargets[target.key]} URLs
                        </span>
                      </div>
                      <input
                        ref={target.key === "critical" ? criticalSliderRef : undefined}
                        type="range"
                        min={target.min}
                        max={target.max}
                        value={formData.coverageTargets[target.key]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          coverageTargets: { ...prev.coverageTargets, [target.key]: parseInt(e.target.value) }
                        }))}
                        className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-text-tertiary">
                        <span>{target.min}</span>
                        <span>{target.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Campaign Scope Preview */}
                <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-5 border border-border-light">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-text-primary">Campaign Scope</h4>
                    <span className="text-xs text-high font-medium px-2 py-1 bg-high/10 rounded-full">Live Preview</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-bg-primary rounded-lg p-3 text-center">
                      <dt className="text-xs text-text-secondary mb-1">Total Entities</dt>
                      <dd className="text-2xl font-black text-text-primary">{scope.totalEntities}</dd>
                    </div>
                    <div className="bg-bg-primary rounded-lg p-3 text-center">
                      <dt className="text-xs text-text-secondary mb-1">Total Articles</dt>
                      <dd className="text-2xl font-black text-text-primary">{scope.totalArticles}</dd>
                    </div>
                    <div className="bg-bg-primary rounded-lg p-3 text-center">
                      <dt className="text-xs text-text-secondary mb-1">Total Value</dt>
                      <dd className="text-2xl font-black text-primary">${scope.totalValue.toLocaleString()}</dd>
                    </div>
                    <div className="bg-bg-primary rounded-lg p-3 text-center">
                      <dt className="text-xs text-text-secondary mb-1">Score Improvement</dt>
                      <dd className="text-2xl font-black text-high">+{scope.scoreImprovement.toFixed(1)}</dd>
                    </div>
                    <div className="bg-bg-primary rounded-lg p-3 text-center col-span-2 md:col-span-2">
                      <dt className="text-xs text-text-secondary mb-1">Expected Thorbit Score</dt>
                      <dd className="text-2xl font-black text-text-primary">
                        <span className="text-text-tertiary">{scope.currentScore}</span>
                        <span className="text-text-tertiary mx-2">→</span>
                        <span className="text-high">{scope.targetScore.toFixed(1)}</span>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Demo controls hidden, just show navigation state */}
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

          {/* Navigation buttons - visual only, not interactive */}
          <div className="flex items-center gap-2 pointer-events-none">
            {step > 1 && (
              <div className="flex items-center gap-1 px-4 py-2 border-2 border-border rounded-lg font-medium text-text-tertiary text-sm">
                <ChevronLeft className="w-4 h-4" />
                Back
              </div>
            )}
            {step < 4 ? (
              <div
                ref={nextBtnRef}
                className="flex items-center gap-1 px-4 py-2 bg-primary/80 text-white rounded-lg font-medium text-sm"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </div>
            ) : (
              <div
                ref={createBtnRef}
                className="flex items-center gap-1 px-4 py-2 bg-high/80 text-white rounded-lg font-medium text-sm"
              >
                <Check className="w-4 h-4" />
                Create Campaign
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
