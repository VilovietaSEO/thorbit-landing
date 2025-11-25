"use client";

import { X, List } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ICPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TOCItem {
  id: string;
  title: string;
}

export default function ICPModal({ isOpen, onClose }: ICPModalProps) {
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

    const modal = document.querySelector('.icp-modal-content');
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
          className="relative bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex overflow-hidden border-2 border-primary/30"
          style={{ boxShadow: 'var(--shadow-lg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOC Sidebar - Hidden on mobile */}
          <aside className="hidden md:block w-72 flex-shrink-0 border-r border-border-light bg-[var(--bg-secondary)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-light">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <List className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium text-text-primary">Contents</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-bg-hover transition-all"
                style={{ color: 'var(--primary)' }}
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
                        ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                        : "text-text-secondary font-light hover:bg-bg-hover hover:text-text-primary hover:translate-x-1"
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mobile close button - only visible on mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all z-10"
            style={{ color: 'var(--primary)' }}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto icp-modal-content bg-[var(--bg-primary)]" ref={contentRef}>
            <div className="p-12">
              <MarkdownContentV2 content={GENESIGHT_ICP_MARKDOWN} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// V2 Markdown renderer matching production app
function MarkdownContentV2({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentListType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

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

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={elements.length} className="bg-bg-tertiary p-5 rounded-2xl overflow-x-auto my-6 border border-border-light">
            <code className="text-sm text-text-primary font-light">{codeBlockContent.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // H1 (Page title) - V2 Display heading
    if (line.startsWith("# ")) {
      flushList();
      const text = line.substring(2);
      elements.push(
        <h1 key={elements.length} className="heading-display text-4xl text-primary mb-6 pb-4 border-b-2 border-primary">
          {text}
        </h1>
      );
      continue;
    }

    // H2 (Main sections) - V2 Section heading with secondary (blue-green) accent bar
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

    // H3 (Subsections) - V2 with primary color
    if (line.startsWith("### ")) {
      flushList();
      const text = line.substring(4);
      elements.push(
        <h3 key={elements.length} className="text-xl font-medium text-primary mb-4 mt-8">
          {text}
        </h3>
      );
      continue;
    }

    // H4 (Sub-subsections)
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

    // Horizontal rule - V2 gradient
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

    // Regular paragraph - V2 light weight
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

  flushList(); // Flush any remaining list

  return <div className="prose-v2 max-w-none">{elements}</div>;
}

// V2 Format inline markdown (bold, italic, links, inline code)
function formatInlineMarkdownV2(text: string): string {
  // Inline code - V2 warm styling
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="bg-bg-tertiary px-2 py-1 rounded-lg text-sm text-primary border border-border-light">$1</code>'
  );

  // Bold - V2 medium weight
  text = text.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-medium text-text-primary">$1</strong>'
  );

  // Italic - V2 light italic
  text = text.replace(
    /\*([^*]+)\*/g,
    '<em class="italic font-light text-text-secondary">$1</em>'
  );

  // Links - V2 primary color with underline
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary hover:text-primary-dark underline decoration-primary/30 hover:decoration-primary transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return text;
}

const GENESIGHT_ICP_MARKDOWN = `
# GeneSight Ideal Customer Profile: Final Document

## Executive Summary

GeneSight targets adults with depression, anxiety, ADHD, or other psychiatric conditions who have experienced treatment failures with standard psychiatric medications. These patients are exhausted by years of trial-and-error medication cycles, traumatized by severe side effects from medications that don't work, and desperate for a scientific explanation for why nothing seems to help them. They represent a highly motivated segment willing to invest in genetic testing that promises to end the medication roulette and identify compatible treatments based on their unique biology.

---

## Core Demographics

**Primary Avatar:** Adults struggling with ineffective psychiatric medications

**Age Range:** 18-75 years old

**Geographic:** All U.S. states (nationwide availability)

**Socioeconomic:** Diverse backgrounds, with significant concern about healthcare costs and insurance coverage

**Clinical Profile:**
- 2-3+ failed medication trials (typical trigger point)
- Depression, anxiety, ADHD, or co-occurring psychiatric conditions
- Treatment duration: Often 1-20+ years seeking effective medication
- Current status: Either cycling through medications or avoiding them due to past trauma

**Psychographic Traits:**
- Value scientific evidence and data-driven decision making
- Exhausted by lack of progress with standard treatment
- Feel unheard by healthcare providers who rush through appointments
- Desperate for hope but wary after repeated disappointments
- Seeking biological explanations, not platitudes about "trying harder"

---

## The Journey to GeneSight: Critical Pain Points

### 1. The Endless Medication Roulette (Universal Pain Point)

**The Experience:**
Patients endure 6-8 weeks on each medication trial, waiting to see if it works, only to discover it doesn't—or it causes intolerable side effects. They then taper off (often with brutal withdrawal symptoms), wait for the drug to clear their system, and start the cycle again with a different medication. This repeats 5, 10, or even 15+ times over years or decades.

**Impact Frequency:** Mentioned in 69 of 69 Reddit posts analyzed (100%)

**Statistical Reality:**
- 67% fail first antidepressant treatment
- 50% don't achieve clinically significant response with initial medication
- 36% require multiple trials (some exceeding 3+ attempts)
- 6-8 weeks per trial means months lost for each failed attempt

**Patient Language:**
- "trial and error" (120+ mentions)
- "medication roulette"
- "running out of options"
- "medication carousel"

**Core Insight:** Without genetic data, doctors are making educated guesses. Every medication switch is gambling with months of a patient's life.

### 2. Severe Side Effects from Medications That Don't Even Work

**The Experience:**
Patients endure debilitating side effects—30-pound weight gain, complete sexual dysfunction, emotional numbness ("zombie effect"), cognitive impairment, constant fatigue—while continuing to experience their original depression or anxiety symptoms. The treatment becomes worse than the disease.

**Impact Frequency:** Mentioned in 65 of 69 posts (94%)

**Most Damaging Side Effects:**
1. **Weight gain** (30+ pounds typical) that creates vicious cycle of depression
2. **Emotional blunting** - loss of personality, inability to feel joy
3. **Sexual dysfunction** - often permanent (Post-SSRI Sexual Dysfunction lasting years after discontinuation)
4. **Cognitive decline** - memory loss, difficulty concentrating, "brain fog"
5. **Brutal withdrawal symptoms** - "brain zaps" lasting months or years, physical illness

**Patient Language:**
- "zombie" effect (60+ mentions)
- "brain zaps" (70+ mentions)
- "worse than the condition"
- "blank canvas piece of soggy cardboard"

**Core Insight:** Patients are sacrificing quality of life for medications that aren't helping. They need to know which medications will cause severe reactions BEFORE trying them.

### 3. Doctors Who Don't Listen or Provide Adequate Care

**The Experience:**
10-minute appointments where doctors use generic questionnaires, dismiss patient concerns about side effects, and prescribe whatever medication is currently popular—without considering the patient's unique biology or past treatment failures. Patients feel like numbers on an assembly line.

**Impact Frequency:** Mentioned in 55+ of 69 posts (80%)

**Specific Complaints:**
- Rushed appointments (30-second to 10-minute consultations)
- Dismissive of patient concerns about side effects
- No explanation for why medications aren't working
- Prescribing "what's in" rather than personalizing treatment
- Poor medical record coordination between providers

**Patient Language:**
- "doesn't listen" (80+ mentions)
- "10-minute appointments"
- "no one listens until shit hits the fan"

**Core Insight:** Patients don't feel heard or believed. They crave validation that their struggles are real and biological, not psychological weakness.

### 4. Loss of Hope and Fear of Permanent Dysfunction

**The Ultimate Fear:**
Never finding relief from debilitating mental health symptoms and being forced to accept a diminished quality of life permanently. Many patients fear they've permanently damaged their brain or body through years of failed medication trials.

**Life Impact:**
- 5x more likely to miss work due to illness
- 4.78x more likely to be on disability
- 7-11 years reduction in life expectancy (similar to lifetime smokers)
- Relationships destroyed, careers derailed, decades lost

**Patient Language:**
- "wasted my entire life"
- "wonder how far I could have gone if depression hadn't crippled me"
- "don't even remember most of my teenage years because of the medication"

**Core Insight:** Time is the ultimate cost. Years lost to ineffective treatment are years patients will never recover.

---

## What They Want: Primary Goals

### 1. Find Medication That Works WITHOUT Severe Side Effects
**Frequency:** 69 of 69 posts (universal need)

The dream: A medication that resolves symptoms while allowing them to feel like themselves—maintaining personality, libido, cognitive function, and stable weight.

### 2. Avoid Years of Trial-and-Error Medication Cycles
**Frequency:** 62 of 69 posts

They want to skip the medication carousel entirely. If genetic testing can eliminate even 3-5 failed trials, it's worth any cost.

### 3. Understand WHY Medications Don't Work for Them
**Frequency:** High across all conversations

Patients need biological validation. They want to hear: "See, you're not crazy—your genes explain why these medications failed." This transforms their experience from personal failure to biological reality.

### 4. Function Normally in Daily Life
**Frequency:** 55 of 69 posts

Basic functionality—working, parenting, maintaining relationships, self-care—feels impossible when medications either don't work or cause debilitating side effects. They want their life back.

### 5. Avoid Dangerous Side Effects Before They Happen

Patients want to know which medications will cause weight gain, sexual dysfunction, cognitive impairment, or withdrawal nightmares BEFORE putting them in their body. Prevention, not damage control.

---

## Decision Triggers: When They Realize They Need GeneSight

### Primary Trigger: After 2-3 Failed Medication Trials

The moment patients realize trial-and-error isn't working. They've given the system a fair chance—6-8 weeks per medication, 2-3 attempts—and nothing has worked. They question: "Why doesn't anything work for me?"

### Secondary Triggers:

**Traumatic Side Effect Experience**
Weight gain of 30+ pounds, persistent sexual dysfunction, emotional numbness so severe they can't feel love for their children, or withdrawal symptoms so brutal they required emergency medical care.

**Doctor Dismissiveness Breaking Point**
After being rushed through another 10-minute appointment where concerns are dismissed, they decide to take control of their own healthcare and demand better answers.

**Years Lost, Time Running Out**
Patients in their 30s-40s realize they've spent their entire adult life trying to find effective treatment. They can't afford to waste another decade.

**Success Stories from Others**
Hearing about someone who used GeneSight and found effective medication quickly—after years of trial-and-error—creates urgency and hope.

---

## Major Objections and Barriers

### 1. Cost and Insurance Coverage Concerns

**The Objection:**
"Will insurance cover this? What if I get a surprise $3,000 bill?"

**Patient Anxiety:**
Healthcare costs are unpredictable. They've been burned by surprise medical bills before and can't afford unexpected expenses while already struggling financially due to their condition.

**The Reality:**
- $3,962 net annual savings per patient after test cost
- Savings driven by avoiding failed trials, hospitalizations, disability
- Long-term ROI of 3:1 within 6 months, 5:1 by end of first year

**Messaging Opportunity:**
Transparent pricing, insurance verification upfront, financial assistance programs, and emphasizing long-term cost savings from avoiding failed treatments.

### 2. "The Test Only Shows Metabolism, Not Effectiveness"

**The Objection:**
"This test doesn't tell you which medication will work—it just shows how you metabolize drugs. It's not predictive of effectiveness."

**Source:**
Mentioned in 45+ of 69 posts, often by medical professionals (psychiatrists, pharmacists) and scientifically-informed patients.

**The Reality:**
Valid concern. GeneSight identifies gene-drug interactions and metabolism patterns but doesn't guarantee therapeutic response. However:
- 1.71x greater likelihood of remission with pharmacogenomic-guided treatment
- 50%+ relative improvement in remission rates vs standard care
- 21% fewer adverse drug reactions
- 80% symptom improvement when medications adjusted post-testing (Mayo Clinic)

**Messaging Opportunity:**
Set realistic expectations while emphasizing significant improvement in outcomes. Frame as "eliminating bad options" rather than "guaranteeing the perfect medication." Emphasize reduction in harmful side effects and failed trials.

### 3. Fear of Trying New Medications After Past Trauma

**The Objection:**
"I'm terrified of trying anything new. I've been hurt too many times."

**Patient Anxiety:**
Medication trauma creates paralysis. They'd rather stay in their current suffering than risk another catastrophic side effect experience.

**Frequency:** 32+ posts

**Messaging Opportunity:**
Position genetic testing as protection AGAINST trauma. "Know before you try" messaging. Emphasize preventing the experiences that traumatized them in the first place—no more surprises, no more guinea pig experiments.

### 4. Lack of FDA Approval and Medical Professional Skepticism

**The Objection:**
"The FDA issued warnings about these tests. My psychiatrist says they're not evidence-based."

**Reality:**
Some medical professionals remain skeptical due to lack of FDA approval and clinical guidelines not recommending routine use (yet).

**Counter-Evidence:**
- 7 peer-reviewed studies supporting effectiveness
- 1,100+ participants in GUIDED study (largest in field)
- 3,000,000+ tests completed
- $18 million NIMH grant for treatment-resistant depression research

**Messaging Opportunity:**
Emphasize robust clinical evidence, patient testimonials, and growing adoption. Position as cutting-edge but validated science.

### 5. Side Effects Not Worth Any Potential Benefit

**The Objection:**
"Even if a medication works somewhat, the side effects aren't worth it."

**Frequency:** 55+ of 69 posts (top objection to medication in general)

**Patient Calculus:**
If the choice is between "depressed but still myself" vs "slightly less depressed but 40 pounds heavier, no libido, and emotionally numb," they choose the former.

**Messaging Opportunity:**
GeneSight helps identify medications with lower side effect profiles for their genetic makeup. Frame as finding medications that work WITH their biology, not against it.

---

## What They've Already Tried and Why It Failed

### 1. Sequential SSRI Trials Based on Doctor's Best Guess

**What happened:** Tried Prozac, then Zoloft, then Lexapro, then Celexa—each for 6-8 weeks—based on standard protocol.

**Why it failed:** Without genetic data, these were educated guesses. Many discovered through GeneSight they were ultra-rapid or poor metabolizers, meaning multiple medications were biologically incapable of working at standard doses. Years wasted on drugs their genetics indicated would fail.

### 2. Enduring Severe Side Effects Because "It Gets Better"

**What happened:** Continued taking medications despite 30-pound weight gain, sexual dysfunction, emotional numbness, or cognitive impairment because doctors said side effects would diminish after 4-6 weeks.

**Why it failed:** Many side effects worsen over time (weight gain starts at 4-6 months, after clinical trials end). Some become permanent (Post-SSRI Sexual Dysfunction lasting years after discontinuation). They sacrificed quality of life for medications that ultimately didn't work.

### 3. Switching Doctors Repeatedly

**What happened:** Changed psychiatrists 2-4 times hoping a "better" doctor would prescribe the right medication.

**Why it failed:** The problem wasn't doctor expertise—it was absence of biological data. Every doctor was guessing without genetic information. Switching doctors meant starting trial-and-error over from scratch, adding months or years to suffering.

### 4. Lifestyle-Only Approaches (Exercise, Diet, Meditation, Supplements)

**What happened:** Attempted to manage depression naturally through rigorous exercise, elimination diets, meditation, supplements, therapy—either avoiding medication entirely or after being traumatized by failed trials.

**Why it failed:** While lifestyle interventions support mental health, they cannot correct significant neurochemical imbalances in moderate-to-severe depression. After months or years of adherence, core symptoms persisted. By the time they accepted medication was necessary, they'd lost years to untreated illness.

### 5. Brutal Withdrawal Cycles to Switch Medications

**What happened:** Tapered off medications that weren't working, endured severe withdrawal (brain zaps, nausea, vertigo, mood crashes lasting weeks to months), then started a new medication from scratch.

**Why it failed:** Without genetic guidance, the new medication was just another guess. They endured traumatic withdrawals—brain zaps resembling seizures, physical illness requiring ER visits—only to start a medication that also failed. This cycle repeated 5-15+ times over decades, with some experiencing brain zaps for years after discontinuation.

---

## The GeneSight Solution: Value Proposition

### What GeneSight Delivers

**1. Biological Validation**
Answers the question "Why don't medications work for me?" with genetic data. Transforms treatment failures from personal inadequacy to biological reality.

**2. Risk Reduction**
Identifies medications likely to cause severe side effects BEFORE patients try them. Prevents traumatic experiences that create medication resistance.

**3. Time Savings**
Eliminates months or years of trial-and-error by narrowing options to genetically compatible medications upfront.

**4. Cost Savings**
$3,962 net annual savings per patient by avoiding failed trials, hospitalizations, and disability costs.

**5. Treatment Optimization**
1.71x greater likelihood of remission compared to standard care, with 50%+ relative improvement in remission rates in clinical studies.

### The Proven Process Advantage

**Speed:** Results in 2 days (vs. 6-8 weeks per traditional medication trial)

**Simplicity:** Non-invasive cheek swab (in-office or at-home)

**Comprehensiveness:** 60+ medications analyzed in single test

**Clarity:** Traffic-light categorization system (green/yellow/red) makes decision-making straightforward

**Personalization:** Accounts for individual factors like smoking status that affect metabolism

### Clinical Evidence That Matters

**Patient Outcomes:**
- 1.71x greater likelihood of symptom remission
- 50%+ relative improvement in remission rates
- 80% symptom improvement when medications adjusted post-testing
- 21% fewer adverse drug reactions

**Economic Outcomes:**
- $3,962 net annual savings per patient
- 3:1 ROI within 6 months
- 5:1 ROI by end of first year
- $956 million projected U.S. healthcare system savings

**Validation:**
- 7 peer-reviewed studies
- 1,100+ participants in GUIDED study (largest in field)
- 3,000,000+ patients tested
- $18 million NIMH grant for treatment-resistant depression research

---

## Competitive Context: The Market Reality

### The Problem Scale

**280 million people** globally living with major depressive disorder

**16 million U.S. adults** (ages 15-44) affected by depression

**1 in 5 U.S. adults** affected by mental health conditions annually

**400% increase** in antidepressant use over last 20 years, yet outcomes haven't improved proportionally

### The Treatment Failure Crisis

**67%+ fail first antidepressant treatment** - standard care is failing most patients

**33% remission rate** for first-line antidepressants

**36% require multiple trials**, with some attempting 10-15+ medications over decades

**15% of treatment costs** spent on inadequate treatment unlikely to produce results

**$210.5 billion annual economic burden** of depression in the U.S.

### The Clinical Knowledge Gap

**70-80% of psychiatric prescriptions** written by non-psychiatrists (family medicine, primary care, internal medicine, OB/GYN) who have minimal pharmacogenomic training

**Only 2 of 90 U.S./Canada medical schools** offer dedicated pharmacogenomic courses

**51.4% of board-certified physicians** feel inadequately informed about genetic testing

**22% of physicians** received no prior pharmacogenomic education

**Only 22% of enrolled providers** had previously ordered pharmacogenomic testing before participating in studies

**The Opportunity:** Most doctors want better tools for medication selection but lack training and awareness. GeneSight provides the data they need to make evidence-based decisions.

---

## Key Messaging Themes

### 1. "You're Not Broken—Your Medications Are"

Reframe treatment failures as biological mismatch, not personal inadequacy. Genetics explain why medications failed—it's not willpower, mindset, or effort.

**Patient Quote:** "I'll never forget my psychiatrist saying 'see, you're not crazy!' to me when she showed me my results."

### 2. "Stop the Medication Roulette"

Position GeneSight as ending the guessing game. Years of trial-and-error compressed into a 2-day genetic analysis.

**Patient Quote:** "wish i did the test sooner. went through so many medicines trying to find one that worked, finally did the test and results back all of the meds i had already previously tried were ones that my body wouldnt have metabolized well anyways"

### 3. "Know Before You Try"

Emphasize prevention of traumatic side effects. Identify medications that will cause weight gain, sexual dysfunction, or emotional blunting BEFORE putting them in your body.

**Patient Quote:** "I'd love to know what my body can and can't tolerate before regularly putting anything like this into it"

### 4. "Science, Not Guesswork"

Leverage the clinical evidence. 7 peer-reviewed studies, 3 million tests, 1.71x greater remission likelihood.

### 5. "Get Your Life Back"

Focus on restoration—not just symptom reduction, but return to functional life: working, parenting, relationships, feeling like themselves again.

**Patient Quote:** "I just want my old life back and my former self... I missed me"

---

## Psychographic Deep Dive: Emotional States

### Before GeneSight

**Exhaustion:** "I'm so tired of trying"
- Mental, physical, and emotional depletion from years of failed attempts

**Desperation:** "I just want to be able to function!"
- Life is falling apart—can't work, parent, maintain relationships

**Hopelessness:** "Nothing will ever work for me"
- Belief they're uniquely broken or resistant to all treatments

**Anger:** "No one listens until shit hits the fan"
- Frustration with dismissive doctors and broken healthcare system

**Self-Blame:** "Why can't I just get better?"
- Internalizing treatment failures as personal weakness

**Trauma:** "I'm terrified of trying new medications"
- Past experiences have created genuine PTSD around medication trials

**Isolation:** "No one understands what I'm going through"
- Feeling alone in their struggle, misunderstood by loved ones and doctors

### After Finding GeneSight (Aspirational State)

**Hope:** "Maybe there's an answer"
- First time in years they see a potential path forward

**Validation:** "It's not my fault"
- Genetic explanation transforms self-blame into biological understanding

**Empowerment:** "I'm taking control of my healthcare"
- Proactive step that feels like agency after years of passivity

**Relief:** "Finally, someone is listening"
- Genetic test "speaks" for them to skeptical doctors

**Anticipation:** "This could change everything"
- Genuine excitement about possibility of effective treatment

### After Successful Treatment (Success Stories)

**Restoration:** "I feel like myself again"
- Return to baseline personality, functionality, relationships

**Gratitude:** "I wish I'd done this sooner"
- Recognition of years lost to trial-and-error

**Regret:** "How different could my life have been?"
- Mourning lost time but grateful for current improvement

**Advocacy:** "Everyone should know about this"
- Becoming evangelists for genetic testing to prevent others' suffering

---

## Target Audience Segmentation

### Segment 1: "The Exhausted Veteran" (Primary Target)

**Profile:**
- 5-15+ years of failed medication trials
- 30-50 years old (peak productive years lost)
- Multiple conditions (depression + anxiety, or depression + ADHD)
- Has tried 5-10+ different medications
- Significant side effect history (weight gain, sexual dysfunction, withdrawal trauma)

**Motivation:** Desperate for answers after years of suffering. Time urgency high.

**Objections:** Cost concerns, skepticism ("nothing will work"), medication trauma

**Messaging:** "You've suffered enough. Get answers in 2 days, not 2 more years."

### Segment 2: "The Early Failure" (High-Value Preventive Target)

**Profile:**
- 2-3 failed medication trials (just entering trial-and-error cycle)
- 20-35 years old (entire life ahead of them)
- Recent diagnosis or early treatment experience
- Motivated to avoid what they see others endure

**Motivation:** Prevention. Don't want to become "The Exhausted Veteran."

**Objections:** Cost, lack of urgency ("maybe next medication will work")

**Messaging:** "Stop the cycle before it starts. Decades of your life are at stake."

### Segment 3: "The Traumatized Avoider" (Re-engagement Target)

**Profile:**
- Had catastrophic medication experience (severe side effects, hospitalization, permanent dysfunction)
- Currently avoiding all medications due to fear
- Untreated or undertreated as a result
- High suicide risk due to untreated symptoms

**Motivation:** Need evidence it's "safe" to try again. Want protection from repeat trauma.

**Objections:** Fear, distrust of medical system, concern test can't truly predict safety

**Messaging:** "Never be a guinea pig again. Know what's safe for YOUR body before you try."

### Segment 4: "The Provider-Frustrated" (Advocacy-Driven Target)

**Profile:**
- Feels unheard by doctors
- Has researched extensively (Reddit, forums, medical journals)
- Wants to bring data TO their doctor
- Often has comorbid conditions doctors don't take seriously

**Motivation:** Seeking evidence to advocate for themselves with dismissive providers.

**Objections:** Doctor may not order test or may dismiss results

**Messaging:** "Bring your doctor the answers they've been guessing at. Data they can't ignore."

---

## Business Implications

### Critical Success Factors

**1. Transparent Pricing and Insurance Navigation**
Cost anxiety is pervasive. Upfront insurance verification, clear out-of-pocket maximums, and financial assistance programs are essential to conversion.

**2. Realistic Expectation Setting**
Avoid over-promising. Frame as "significantly improves your chances" not "guarantees success." Address the "only shows metabolism" objection honestly while emphasizing clinical evidence of improved outcomes.

**3. Speed to Results**
The 2-day turnaround is a massive competitive advantage vs. 6-8 weeks per traditional trial. Emphasize this heavily.

**4. Provider Education and Partnership**
51.4% of physicians feel inadequately informed about genetic testing. Provider education programs and easy-to-interpret reports are critical to adoption.

**5. Patient Success Stories**
Testimonials from patients who found relief after years of suffering are the most powerful marketing tool. Authentic voices resonate deeply.

### Growth Opportunities

**1. Early Intervention**
Target patients after their first or second medication failure (prevention positioning) rather than waiting until they've suffered for years.

**2. Provider Outreach to Non-Psychiatrists**
70-80% of psychiatric medications are prescribed by primary care, family medicine, internal medicine, and OB/GYN. These doctors are least equipped to navigate complex medication decisions and most likely to benefit from genetic guidance.

**3. Alternative Treatment Gateway**
Position testing as documentation for insurance approval of TMS, ketamine, or other advanced therapies when medications fail. Expands value proposition beyond initial medication selection.

**4. Long-Term Patient Value**
Patients may need re-testing if new medications enter market or if their clinical situation changes. Consider subscription or update models.

---

## Final Strategic Insights

### The Core Tension

Patients are caught between two fears:
1. **Fear of continuing to suffer** with untreated or inadequately treated mental health conditions
2. **Fear of trying new medications** due to past traumatic experiences

GeneSight resolves this tension by providing a path forward that feels safer (data-driven) and more hopeful (proven outcomes) than pure trial-and-error.

### The Window of Opportunity

**Optimal Intervention Point:** After 2-3 failed medication trials

Too early (first medication failure): Patients still have faith in standard process
Too late (10+ years of failures): Patients have given up entirely or developed such severe medication trauma they won't try anything

**The Sweet Spot:** Patients who realize standard care isn't working but haven't completely lost hope.

### The Trust Gap

Patients have been disappointed repeatedly—by doctors, by medications, by the healthcare system. Building trust requires:
- **Realistic promises** (no over-claiming)
- **Transparent pricing** (no surprise bills)
- **Clinical evidence** (not just marketing)
- **Patient testimonials** (authentic voices)
- **Provider partnerships** (doctors they trust recommend it)

### The Time Value

Every 6-8 week medication trial is:
- **2 months** of life lost to ineffective treatment
- **2 months** of career stagnation, relationship strain, parenting challenges
- **2 months** closer to complete hopelessness
- **2 months** of accumulating economic and social costs

For patients who've been cycling for 5-15+ years, time is the most valuable commodity GeneSight offers—not just better outcomes, but getting those outcomes NOW instead of years from now.

### The Ultimate Value Proposition

**GeneSight doesn't just help patients find better medications faster.**

**It gives them their life back.**

Relationships restored. Careers rebuilt. Decades reclaimed. Hope renewed.

That's the promise—and the responsibility.

---

## Appendix: Supporting Data Summary

### Clinical Efficacy Statistics
- 1.71x greater likelihood of symptom remission with pharmacogenomic-guided treatment
- 50%+ relative improvement in remission rates vs standard care (GUIDED study)
- 80% symptom improvement when medications adjusted post-testing (Mayo Clinic)
- 21% fewer adverse drug reactions in pharmacogenomic testing studies
- 35% remission rate at week 12 (pharmacogenetic-guided) vs 13% (standard care)

### Economic Statistics
- $3,962 net annual savings per patient (after test cost)
- $5,962 annual per-patient savings before test cost
- 3:1 ROI within six months
- 5:1 ROI by end of first year
- $956 million projected U.S. healthcare system savings by avoiding ineffective treatments

### Treatment Failure Statistics
- 67%+ of patients fail first antidepressant treatment
- 50% don't achieve clinically significant response with initial medication
- 36% require multiple trials (22% = 2 trials, 8% = 3 trials, 5% = 3+ trials)
- 6-8 weeks required per trial to assess effectiveness
- 20% prescribed antidepressants with substantial gene-drug interaction potential

### Disease Burden Statistics
- 280 million people globally living with major depressive disorder
- 1 in 5 U.S. adults affected by mental health conditions annually
- 7-11 years reduction in life expectancy for those with major depressive disorder
- 5x more likely to miss work due to illness
- 4.78x more likely to be on disability
- $210.5 billion annual economic burden of depression in the U.S.

### Validation Statistics
- 7 peer-reviewed studies supporting GeneSight effectiveness
- 1,100+ participants in GUIDED Study (largest in field)
- 3,000,000+ patients tested
- 60+ medications analyzed in single test
- $18 million NIMH grant for treatment-resistant depression research

---

**Document Version:** Final (Stage 4)
**Session:** genesight_com
**Created:** 2025-11-17
**Sources Synthesized:** setup_eos.md, icp_prompt1.md, icp_prompt2.md, icp_prompt3.md, Reddit analysis (69 posts, 4,946+ comments), Clinical statistics (68 filtered sources)
`;

export { GENESIGHT_ICP_MARKDOWN };
