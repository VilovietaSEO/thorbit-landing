"use client";

import { X, List } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TOCItem {
  id: string;
  title: string;
}

export default function BriefModal({ isOpen, onClose }: BriefModalProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate TOC from H2 headings
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const h2Elements = contentRef.current.querySelectorAll("h2");
    const items: TOCItem[] = Array.from(h2Elements).map((h2, index) => {
      const id = `section-${index}`;
      h2.id = id;
      return {
        id,
        title: h2.textContent || "",
      };
    });

    setTocItems(items);
  }, [isOpen]);

  // Handle scroll to highlight active section
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (tocItems.length === 0) return;

      let current = "";
      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = item.id;
          }
        }
      }

      setActiveSection(current);
    };

    const modal = document.querySelector('.brief-modal-content');
    if (modal) {
      modal.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => modal.removeEventListener("scroll", handleScroll);
    }
  }, [tocItems, isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex overflow-hidden border-2 border-secondary/30"
          style={{ boxShadow: 'var(--shadow-lg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOC Sidebar */}
          <aside className="w-72 flex-shrink-0 border-r border-border-light bg-[var(--bg-secondary)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-light">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-secondary/10">
                  <List className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="font-medium text-text-primary">Contents</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-bg-hover transition-all"
                style={{ color: 'var(--secondary)' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-secondary/10 text-secondary font-medium border-l-2 border-secondary"
                        : "text-text-secondary font-light hover:bg-bg-hover hover:text-text-primary hover:translate-x-1"
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto brief-modal-content bg-[var(--bg-primary)]" ref={contentRef}>
            <div className="p-12">
              <MarkdownContentV2 content={EXAMPLE_BRIEF_MARKDOWN} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// V2 Markdown renderer matching ICP modal
function MarkdownContentV2({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentListType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (currentList.length > 0 && currentListType) {
      const ListTag = currentListType;
      const listClass = currentListType === "ul"
        ? "icp-list space-y-2 my-5"
        : "space-y-2 my-5 ml-6 list-decimal";

      elements.push(
        <ListTag key={elements.length} className={listClass}>
          {currentList.map((item, i) => (
            <li
              key={i}
              className="text-text-primary font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdownV2(item) }}
            />
          ))}
        </ListTag>
      );
      currentList = [];
      currentListType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) {
      if (currentList.length > 0) flushList();
      continue;
    }

    // H1 (Page title)
    if (line.startsWith("# ")) {
      flushList();
      const text = line.substring(2);
      elements.push(
        <h1 key={elements.length} className="heading-display text-4xl text-secondary mb-6 pb-4 border-b-2 border-secondary">
          {text}
        </h1>
      );
      continue;
    }

    // H2 (Main sections) - sage blue-green bar
    if (line.startsWith("## ")) {
      flushList();
      const text = line.substring(3);
      elements.push(
        <h2 key={elements.length} className="icp-h2 text-2xl font-bold text-text-primary mb-5 mt-10 scroll-mt-6">
          {text}
        </h2>
      );
      continue;
    }

    // H3 (Subsections) - secondary color
    if (line.startsWith("### ")) {
      flushList();
      const text = line.substring(4);
      elements.push(
        <h3 key={elements.length} className="text-xl font-medium text-secondary mb-4 mt-8">
          {text}
        </h3>
      );
      continue;
    }

    // H4
    if (line.startsWith("#### ")) {
      flushList();
      const text = line.substring(5);
      elements.push(
        <h4 key={elements.length} className="text-lg font-medium text-text-primary mb-3 mt-6">
          {text}
        </h4>
      );
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      flushList();
      elements.push(
        <div key={elements.length} className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      );
      continue;
    }

    // Unordered list item
    if (line.match(/^[-*•]\s+/)) {
      if (currentListType !== "ul") {
        flushList();
        currentListType = "ul";
      }
      currentList.push(line.replace(/^[-*•]\s+/, ""));
      continue;
    }

    // Ordered list item
    if (line.match(/^\d+\.\s+/)) {
      if (currentListType !== "ol") {
        flushList();
        currentListType = "ol";
      }
      currentList.push(line.replace(/^\d+\.\s+/, ""));
      continue;
    }

    // Regular paragraph
    flushList();
    if (line.trim()) {
      elements.push(
        <p
          key={elements.length}
          className="text-text-primary font-light leading-relaxed my-4 text-base"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdownV2(line) }}
        />
      );
    }
  }

  flushList();

  return <div className="prose-v2 max-w-none">{elements}</div>;
}

// V2 Format inline markdown
function formatInlineMarkdownV2(text: string): string {
  // Inline code
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="bg-bg-tertiary px-2 py-1 rounded-lg text-sm text-secondary border border-border-light">$1</code>'
  );

  // Bold
  text = text.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-medium text-text-primary">$1</strong>'
  );

  // Italic
  text = text.replace(
    /\*([^*]+)\*/g,
    '<em class="italic font-light text-text-secondary">$1</em>'
  );

  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-secondary hover:text-secondary-dark underline decoration-secondary/30 hover:decoration-secondary transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return text;
}

const EXAMPLE_BRIEF_MARKDOWN = `# Strategic Content Brief: How GeneSight Testing Works

## Article Overview

**Primary Query Intent:** "how does genesight testing work"

**Intent Type:** Informational

**Target Audience:** Adults with depression/anxiety who have failed 2-3+ medication trials and are researching pharmacogenomic testing as an alternative to continued trial-and-error

**Article Purpose:** Explain the GeneSight testing process in clear, accessible language while addressing patient anxiety about cost, accuracy, and what to expect

**Target Length:** 2,000-2,500 words

**Tone:** Professional yet empathetic, avoiding medical jargon while maintaining clinical credibility

---

## Customer Context (From ICP)

### Current Situation
Patients have endured 2-3+ failed medication trials (typical trigger point for considering genetic testing). They've spent 6-8 weeks on each medication, often experiencing severe side effects—weight gain, emotional blunting, sexual dysfunction—while their core symptoms persist. They're exhausted by the medication carousel and desperate for answers.

### Primary Pain Points
- Endless trial-and-error cycles wasting months/years of their life
- Severe side effects from medications that don't even work
- Doctors who dismiss concerns or provide rushed 10-minute appointments
- Fear they're "uniquely broken" because nothing helps
- Financial anxiety about surprise medical bills

### Decision Triggers
- After 2-3 failed medication trials (sweet spot for intervention)
- Traumatic side effect experience (30+ pound weight gain, permanent sexual dysfunction)
- Years lost to ineffective treatment—can't afford another decade
- Hearing success stories from others who used GeneSight

### Must Achieve
- Understand the testing process step-by-step (reduces anxiety about the unknown)
- Learn what the results actually tell them (and what they don't)
- Know the cost upfront and insurance coverage options
- Assess if this is worth trying after so many disappointments

---

## Article Structure & Research Requirements

### Section 1: What GeneSight Testing Actually Is

**Purpose:** Establish credibility and set realistic expectations

**Key Points to Cover:**
- Definition: Pharmacogenomic test analyzing how genes affect medication metabolism
- What it tests: CYP450 enzymes (CYP2D6, CYP2C19, etc.) and gene-drug interactions
- What results show: Green/yellow/red categorization of 60+ psychiatric medications
- What it does NOT guarantee: Therapeutic response (address the "only shows metabolism" objection head-on)

**Research Queries:**
- "CYP450 enzymes psychiatric medications"
- "pharmacogenomic testing accuracy limitations"
- "genesight test FDA approval status"

**Proof Points Needed:**
- How many genes are tested
- How many medications are analyzed
- Clinical validation studies (GUIDED study: 1,100+ participants)

**ICP Connection:** Patients crave biological validation. Frame this as answering "Why don't medications work for me?" with genetic data—transforming treatment failures from personal inadequacy to biological reality.

---

### Section 2: The Testing Process (Step-by-Step)

**Purpose:** Remove anxiety about what to expect

**Key Points to Cover:**

1. **Doctor Orders Test**
   - Psychiatrist or primary care provider
   - Often covered after 2+ failed medication trials
   - No fasting or special preparation required

2. **Sample Collection**
   - Simple cheek swab (in-office or at-home kit)
   - Takes 30 seconds
   - Non-invasive (emphasize this for patients traumatized by medical procedures)

3. **Lab Analysis**
   - 2-day turnaround (vs. 6-8 weeks per traditional medication trial)
   - DNA sequencing for specific gene variants
   - Compared against database of gene-drug interactions

4. **Results Delivery**
   - Report sent to doctor
   - Traffic-light system (green = genetically compatible, yellow = moderate interaction, red = significant interaction)
   - Includes current medications patient is taking
   - Personalized based on factors like smoking status

**Research Queries:**
- "genesight test procedure patient experience"
- "how long genesight test results"
- "genesight at-home test kit process"

**ICP Connection:** Patients need simplicity. Emphasize the 2-day results (massive time savings) and non-invasive nature (no needles, no blood draws).

---

### Section 3: Understanding Your Results

**Purpose:** Demystify the report and manage expectations

**Key Points to Cover:**

**Green Category:**
- Medications with low risk of gene-drug interactions
- Standard dosing expected to work
- Does NOT guarantee medication will be effective (set realistic expectations)

**Yellow Category:**
- Moderate gene-drug interactions possible
- May require dosage adjustments or monitoring
- Not necessarily "bad"—many patients find success with yellow medications at adjusted doses

**Red Category:**
- Significant gene-drug interactions likely
- High risk of side effects or poor metabolism
- Often correlates with patient's past traumatic medication experiences
- Validation: "See, you weren't crazy—your genetics explain why these failed"

**Metabolism Categories:**
- Ultra-rapid metabolizer (medication clears system too fast)
- Extensive metabolizer (normal)
- Intermediate metabolizer (slower than normal)
- Poor metabolizer (medication accumulates, causing side effects)

**Research Queries:**
- "genesight report interpretation patient guide"
- "CYP2D6 poor metabolizer psychiatric drugs"
- "ultra-rapid metabolizer antidepressants"

**Proof Points Needed:**
- Example of how metabolism affects medication effectiveness
- Statistics on prevalence of different metabolizer types
- Case study showing red category matching patient's past failures

**ICP Connection:** This section provides the biological validation patients desperately need. Frame red-category results as proof: "You weren't weak or resistant—your body metabolizes these medications differently."

---

### Section 4: What Happens After You Get Results

**Purpose:** Show the path forward

**Key Points to Cover:**

**Doctor Consultation:**
- Review results with psychiatrist
- Discuss green-category options first
- Consider yellow-category medications with dose adjustments
- Document red-category medications to avoid

**Medication Changes:**
- May switch to genetically compatible medication
- May adjust dosage of current medication
- May add complementary medication
- Timeline: Can start new medication immediately after consultation

**Monitoring Progress:**
- Standard 6-8 week trial on new medication
- BUT now with higher confidence it's genetically compatible
- Reduced risk of severe side effects
- Doctor has data to make informed adjustments

**Research Queries:**
- "genesight test results next steps"
- "how doctors use pharmacogenomic testing"
- "medication changes after genesight test"

**ICP Connection:** Patients want to know "What does this actually get me?" Answer: Skipping 3-5 failed trials, avoiding traumatic side effects, faster path to effective treatment.

---

### Section 5: Cost, Insurance, and Financial Assistance

**Purpose:** Address the #1 objection head-on with transparency

**Key Points to Cover:**

**Typical Costs:**
- Test cost: $330 (with insurance) to $3,000+ (without)
- Most patients pay $330 or less
- Financial assistance programs available
- Upfront insurance verification (no surprise bills)

**Insurance Coverage:**
- Most major insurers cover after 2+ failed medication trials
- Medicare covers in specific circumstances
- Coverage varies by state and plan
- GeneSight offers verification before testing

**Long-Term ROI:**
- $3,962 net annual savings per patient (after test cost)
- Savings from avoiding failed trials, hospitalizations, disability
- 3:1 ROI within 6 months, 5:1 by end of first year
- Cost of continued trial-and-error: 6-8 weeks × $X per failed medication

**Financial Assistance:**
- Programs for uninsured/underinsured patients
- Payment plans available
- No one turned away due to inability to pay

**Research Queries:**
- "genesight test cost 2024 with insurance"
- "genesight financial assistance program"
- "pharmacogenomic testing insurance coverage requirements"

**Proof Points Needed:**
- Exact current pricing
- Insurance coverage statistics
- ROI calculations from clinical studies

**ICP Connection:** Cost anxiety is pervasive. Patients have been burned by surprise medical bills before. Transparent pricing and financial assistance programs are ESSENTIAL to conversion.

---

### Section 6: Effectiveness and Limitations

**Purpose:** Set realistic expectations while emphasizing clinical evidence

**Key Points to Cover:**

**What Research Shows:**
- 1.71x greater likelihood of remission with pharmacogenomic-guided treatment
- 50%+ relative improvement in remission rates vs standard care
- 21% fewer adverse drug reactions
- 80% symptom improvement when medications adjusted post-testing (Mayo Clinic)

**Limitations (Address Objections):**
- Test shows metabolism and gene-drug interactions, NOT guaranteed effectiveness
- Cannot predict therapeutic response for certain
- Some patients still don't find effective medication even with genetic guidance
- Best viewed as "eliminating bad options" rather than "guaranteeing perfect medication"

**Who Benefits Most:**
- Patients with 2+ failed medication trials
- Those with severe side effect history
- Complex cases with multiple conditions
- Patients who want data-driven decision making

**Research Queries:**
- "GUIDED study genesight effectiveness results"
- "pharmacogenomic testing limitations psychiatric medications"
- "genesight test accuracy peer-reviewed studies"

**Proof Points Needed:**
- 7 peer-reviewed studies supporting effectiveness
- 1,100+ participants in GUIDED study (largest in field)
- 3,000,000+ patients tested
- $18 million NIMH grant for treatment-resistant depression research

**ICP Connection:** Patients are scientifically informed and skeptical after repeated disappointments. Acknowledge limitations honestly while emphasizing significant improvement in outcomes.

---

### Section 7: Is GeneSight Testing Right for You?

**Purpose:** Help reader make informed decision

**Ideal Candidates:**
- 2-3+ failed medication trials (primary trigger)
- Severe side effect history
- Complex medication regimens
- Treatment-resistant depression/anxiety
- Family history of medication non-response

**When to Wait:**
- First medication trial (too early)
- Actively suicidal (immediate treatment takes priority)
- Doctor hasn't tried standard first-line medications yet

**Next Steps:**
- Talk to psychiatrist or primary care provider
- Request insurance verification upfront
- Ask about financial assistance if needed
- Set realistic expectations: This improves your odds, doesn't guarantee success

**Research Queries:**
- "who should get pharmacogenomic testing"
- "genesight test requirements prerequisites"
- "when to consider genetic testing psychiatric medications"

**ICP Connection:** The sweet spot is patients who realize standard care isn't working but haven't completely lost hope. Frame this as taking control of their healthcare after years of passivity.

---

## Messaging Themes to Weave Throughout

### "You're Not Broken—Your Medications Are"
Reframe treatment failures as biological mismatch, not personal inadequacy. Genetics explain why medications failed—it's not willpower, mindset, or effort.

**Patient Quote to Include:** "I'll never forget my psychiatrist saying 'see, you're not crazy!' to me when she showed me my results."

### "Stop the Medication Roulette"
Position GeneSight as ending the guessing game. Years of trial-and-error compressed into a 2-day genetic analysis.

**Patient Quote:** "wish i did the test sooner. went through so many medicines trying to find one that worked, finally did the test and results back all of the meds i had already previously tried were ones that my body wouldnt have metabolized well anyways"

### "Know Before You Try"
Emphasize prevention of traumatic side effects. Identify medications that will cause weight gain, sexual dysfunction, or emotional blunting BEFORE putting them in your body.

### "Science, Not Guesswork"
Leverage clinical evidence. 7 peer-reviewed studies, 3 million tests, 1.71x greater remission likelihood.

---

## SEO Optimization

**Primary Keyword:** "how does genesight testing work"

**Secondary Keywords:**
- genesight test procedure
- genesight testing process
- what is genesight test
- genesight genetic testing explained
- how to get genesight test
- genesight test cost
- genesight results meaning

**Internal Linking Opportunities:**
- Link to "What is Pharmacogenomic Testing" (pillar content)
- Link to "GeneSight vs. GeneCept Comparison"
- Link to "Insurance Coverage for Genetic Testing"
- Link to "Treatment-Resistant Depression Solutions"

**Meta Description:** "Learn how GeneSight testing works: simple cheek swab, 2-day results, and genetic insights that help find psychiatric medications that work WITH your biology, not against it."

---

## Call-to-Action

**Primary CTA:** "Talk to Your Doctor About GeneSight Testing"

**Secondary CTA:** "Verify Insurance Coverage (No Surprise Bills)"

**Supporting CTA:** "Read Patient Success Stories"

---

*This strategic brief represents Thorbit's ICP-aware content planning process, where customer research directly informs every content decision.*`;
