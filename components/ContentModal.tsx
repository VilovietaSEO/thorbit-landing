"use client";

import { useEffect, useRef, useState } from "react";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const EXAMPLE_ARTICLE_MARKDOWN = `# How GeneSight Testing Works: Your Complete Guide

*Published on January 15, 2025 | 12 min read*

---

## Introduction

Making decisions about mental health treatment can feel overwhelming, especially when medications don't work as expected. If you've tried multiple antidepressants or mood stabilizers without relief, you're not alone—and there may be a scientific reason why some medications haven't worked for you.

GeneSight is a pharmacogenomic test that analyzes how your genes may affect your response to mental health medications. By examining your DNA, GeneSight provides your healthcare provider with insights that can help guide medication selection, potentially reducing the trial-and-error process of finding the right treatment.

In this comprehensive guide, we'll explain exactly how GeneSight testing works, what to expect during the process, and how the results can inform your treatment decisions.

---

## What Is GeneSight Testing?

### The Science Behind Pharmacogenomics

Pharmacogenomics is the study of how your genes affect your body's response to medications. Your genetic makeup influences how you metabolize drugs—some people process certain medications too quickly (reducing effectiveness), while others process them too slowly (increasing side effect risk).

GeneSight testing examines specific genes that affect how your body processes mental health medications, including:

- **Antidepressants** (SSRIs, SNRIs, tricyclics)
- **Antipsychotics** (atypical and typical)
- **Mood stabilizers**
- **Stimulants** (for ADHD)
- **Anxiolytics** (anti-anxiety medications)

### How GeneSight Differs from Other Tests

Unlike traditional mental health assessments that rely solely on symptoms and patient history, GeneSight provides biological data about how your body processes medications. This genetic information remains constant throughout your life, making it a one-time test with lasting value.

The test analyzes genes in two primary categories:

1. **Pharmacokinetic genes**: How your body absorbs, distributes, metabolizes, and eliminates medications
2. **Pharmacodynamic genes**: How medications interact with targets in your body (like neurotransmitter receptors)

---

## The GeneSight Testing Process

### Step 1: Consultation with Your Healthcare Provider

GeneSight testing begins with a conversation with your healthcare provider. During this consultation, your provider will:

- Review your mental health history and current symptoms
- Discuss previous medications you've tried and their effectiveness
- Explain how GeneSight results could inform your treatment plan
- Determine if GeneSight testing is appropriate for your situation

**Who is a good candidate for GeneSight?**
- Patients who haven't responded well to at least one mental health medication
- Those experiencing significant side effects from current medications
- People with complex medication regimens
- Individuals who want to make more informed treatment decisions

### Step 2: Simple Cheek Swab Collection

If you and your provider decide GeneSight testing is right for you, the actual sample collection is remarkably simple:

1. **No needles required**: GeneSight uses a painless cheek swab (buccal swab) to collect DNA
2. **Takes less than 5 minutes**: Your provider or their staff will swab the inside of your cheeks
3. **No fasting or preparation needed**: You can eat, drink, and take medications normally before the test
4. **Sample is sent to the lab**: The swab is packaged and sent to the GeneSight laboratory for analysis

### Step 3: Laboratory Analysis

Once your sample reaches the GeneSight laboratory, sophisticated genetic analysis begins:

- **DNA extraction**: Genetic material is extracted from the cells collected on the swab
- **Gene sequencing**: Specific genes known to affect medication response are analyzed
- **Data interpretation**: Results are compared against extensive pharmacogenomic databases
- **Report generation**: A comprehensive report is created for your healthcare provider

**Timeline**: Results are typically available within 2 business days after the lab receives your sample.

### Step 4: Results Review with Your Provider

Your GeneSight report goes directly to your healthcare provider, who will schedule a follow-up appointment to discuss the results with you. This consultation is crucial for interpreting what the genetic data means for your specific situation.

---

## Understanding Your GeneSight Results

### The Color-Coded System

GeneSight reports use an intuitive color-coded system to categorize medications:

#### 🟢 Green Bin: "Use as Directed"
Medications in the green category have no significant gene-drug interactions detected. Your genetic profile suggests you're likely to respond to these medications as expected, with a standard side effect risk.

**What this means**: These medications may be good first-line options for your treatment, though individual response can still vary.

#### 🟡 Yellow Bin: "Moderate Gene-Drug Interaction"
Medications in the yellow category show moderate gene-drug interactions. This means your genetic profile suggests you may need dose adjustments, have altered medication processing, or face moderate side effect risks.

**What this means**: These medications can still be used, but your provider may start with different doses, monitor you more closely, or consider alternative options if available.

#### 🔴 Red Bin: "Significant Gene-Drug Interaction"
Medications in the red category have significant gene-drug interactions detected. Your genetic profile suggests increased risk of side effects or reduced effectiveness.

**What this means**: Your provider will carefully weigh whether these medications are appropriate for you, consider alternative options, or implement special monitoring if they're necessary for your treatment.

### Additional Genetic Insights

Beyond the color-coded medication bins, your GeneSight report may include:

- **Metabolizer status**: Whether you're an ultra-rapid, normal, intermediate, or poor metabolizer for specific drug pathways
- **Specific gene variants**: Which genetic variations were detected and how they affect medication processing
- **Medication-specific guidance**: Detailed notes about how your genetics may affect individual medications

### What GeneSight Results Don't Tell You

It's important to understand the limitations of genetic testing:

- **Not a diagnosis**: GeneSight doesn't diagnose mental health conditions
- **Not a prescription**: Results don't dictate which medication you must take
- **Not the only factor**: Your provider considers genetics alongside symptoms, medical history, drug interactions, and other clinical factors
- **Not predictive of efficacy**: A medication in the green bin isn't guaranteed to work, and one in the red bin isn't impossible to use successfully

---

## How Results Inform Treatment Decisions

### Collaborative Decision-Making

Your GeneSight results become one tool among many that you and your provider use to make informed treatment decisions. Here's how they typically integrate into your care:

1. **Starting a new medication**: If you haven't tried medication before, results can help identify good starting options
2. **Switching medications**: If your current medication isn't working, results can guide selection of alternatives
3. **Explaining past experiences**: Results may explain why certain medications caused side effects or didn't work
4. **Optimizing current treatment**: Even if your current medication is working, results might suggest dose adjustments

### Real-World Example

Consider Sarah, a patient who tried three different SSRIs for depression without success and experienced significant side effects. Her GeneSight test revealed:

- **All three SSRIs she'd tried were in the red or yellow bins** due to her being a poor metabolizer of CYP2D6 (a key enzyme)
- **Several medications in the green bin** that she hadn't tried yet
- **Her genetic profile suggested SNRIs might be better metabolized** than SSRIs

Armed with this information, Sarah's provider prescribed an SNRI from the green bin. Within weeks, Sarah experienced symptom improvement without the side effects she'd encountered before.

### When Providers Might Choose Red Bin Medications

Sometimes, a medication in the red bin is still the best choice despite gene-drug interactions. Your provider might choose a red bin medication when:

- It's uniquely effective for your specific condition
- Alternatives have failed or aren't appropriate
- Benefits outweigh risks with careful monitoring
- Drug interactions can be managed with dose adjustments

GeneSight provides information, but clinical judgment remains essential.

---

## Cost, Coverage, and Accessibility

### Insurance Coverage

GeneSight has worked to make testing accessible through various insurance plans:

- **Many commercial insurance plans cover GeneSight** partially or fully
- **Medicare covers GeneSight** for eligible patients
- **Medicaid coverage varies by state**
- **Prior authorization** may be required by some insurers

### Out-of-Pocket Costs

If your insurance doesn't cover the test or you're paying without insurance:

- **Maximum out-of-pocket**: GeneSight offers a $330 cap for most patients paying out-of-pocket
- **Financial assistance**: Programs are available for those facing financial hardship
- **Payment plans**: Options may be available to spread costs over time

**Important**: GeneSight recommends asking your provider about costs before testing and contacting GeneSight's billing support if you have questions.

### Getting Access to Testing

To get GeneSight testing:

1. **Ask your provider**: Many psychiatrists, psychiatric nurse practitioners, and primary care providers offer GeneSight
2. **Provider locator**: Use the GeneSight website to find providers in your area who offer the test
3. **Telehealth options**: Some providers offer GeneSight through telemedicine appointments

---

## The Evidence: Does GeneSight Work?

### Clinical Studies

Research on pharmacogenomic testing like GeneSight has shown promising results:

- **The GUIDED trial** (2019) found that patients whose treatment was guided by pharmacogenomic testing were 50% more likely to achieve symptom improvement compared to standard care
- **Multiple studies** have demonstrated that genetic testing can reduce time to finding an effective medication
- **Real-world data** from over 1.2 million GeneSight tests shows clinical utility in diverse patient populations

### What Healthcare Providers Say

Many clinicians report that GeneSight helps them:

- Start with more informed medication choices
- Reduce trial-and-error prescribing
- Explain to patients why certain medications didn't work
- Build patient confidence in treatment plans
- Avoid medications likely to cause side effects

### Limitations of the Evidence

It's important to note:

- **Individual variation**: Genetics is one factor; lifestyle, environment, and other variables matter too
- **Ongoing research**: Pharmacogenomics is an evolving field with new discoveries regularly
- **Not a guarantee**: Even with genetic guidance, finding the right medication can take time

---

## Making the Decision: Is GeneSight Right for You?

### Questions to Ask Your Provider

Before deciding on GeneSight testing, consider discussing:

1. How might my genetic profile affect medications we're considering?
2. Have I tried enough medications to make genetic testing worthwhile?
3. What would you do differently with my treatment if we had GeneSight results?
4. Will my insurance cover the test, and what might I pay out-of-pocket?
5. How long would we wait for results before making medication changes?

### When GeneSight May Be Most Valuable

GeneSight testing often provides the most value when:

- You've tried multiple medications without adequate response
- You've experienced severe side effects from mental health medications
- You're considering starting medication and want to make an informed choice
- You have a family history of medication difficulties
- You're taking multiple medications and want to understand potential interactions

### When Other Approaches Might Be Better

GeneSight testing might not be the priority if:

- You're responding well to your current medication
- You haven't tried any medications yet and want to start with standard first-line treatment
- Cost is a significant barrier and financial assistance isn't available
- Your provider doesn't have experience interpreting pharmacogenomic results

---

## Taking the Next Step

If you're struggling to find the right mental health medication, GeneSight testing offers a scientifically-backed approach to personalizing your treatment. By analyzing how your genes affect medication processing, GeneSight provides valuable insights that can guide your healthcare provider's decisions.

**Remember**: GeneSight is a tool to support—not replace—the collaborative relationship between you and your provider. The test results work best when combined with your provider's clinical expertise, your treatment history, and your personal preferences.

**Ready to explore GeneSight testing?**

1. **Talk to your current provider** about whether GeneSight is appropriate for your situation
2. **Find a GeneSight provider** using the locator on the GeneSight website if your current provider doesn't offer it
3. **Contact GeneSight** directly with questions about coverage, costs, or the testing process

Your journey to better mental health treatment doesn't have to be guided by trial and error alone. With GeneSight, you can bring the power of genetic science into your treatment decisions.

---

*Disclaimer: This article is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider about your mental health treatment options.*`;

export default function ContentModal({ isOpen, onClose }: ContentModalProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate TOC from markdown headings
  useEffect(() => {
    if (!isOpen) return;

    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(EXAMPLE_ARTICLE_MARKDOWN)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [isOpen]);

  // Track active section on scroll
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const headings = contentRef.current.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [isOpen, tocItems]);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
        <div className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex overflow-hidden shadow-2xl border-2 border-accent/30 pointer-events-auto">
          {/* Table of Contents Sidebar */}
          <aside className="w-72 flex-shrink-0 border-r border-border-light bg-[var(--bg-secondary)] p-6 overflow-y-auto">
            <div className="sticky top-0">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-accent/20">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">Published Article</h3>
                  <p className="text-xs text-text-secondary">Example Output</p>
                </div>
              </div>

              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      item.level === 2 ? "font-medium" : "font-normal pl-6"
                    } ${
                      activeSection === item.id
                        ? "bg-accent/10 text-accent font-semibold border-l-2 border-accent"
                        : "text-text-secondary hover:bg-accent/5 hover:text-text-primary"
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-border-light bg-white px-12 py-6 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase tracking-wide">
                      Published Content
                    </span>
                    <span className="text-sm text-text-secondary">GeneSight Pharmacogenomics</span>
                  </div>
                  <h2 className="text-2xl font-black text-text-primary mb-2">
                    How GeneSight Testing Works: Your Complete Guide
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Comprehensive educational article derived from strategic brief, optimized for SEO and ICP alignment
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-6 w-10 h-10 rounded-xl bg-bg-secondary hover:bg-border-light transition-colors flex items-center justify-center group flex-shrink-0"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto content-modal-content bg-[var(--bg-primary)]"
            >
              <div className="p-12">
                <MarkdownContentV2 content={EXAMPLE_ARTICLE_MARKDOWN} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Markdown Content Component with V2 Styling
function MarkdownContentV2({ content }: { content: string }) {
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // H1
      if (line.startsWith("# ")) {
        const text = line.slice(2);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h1 key={i} id={id} className="text-4xl font-black text-text-primary mb-6 leading-tight">
            {text}
          </h1>
        );
        i++;
        continue;
      }

      // H2
      if (line.startsWith("## ")) {
        const text = line.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2 key={i} id={id} className="text-3xl font-black text-text-primary mt-12 mb-6 leading-tight scroll-mt-6">
            {text}
          </h2>
        );
        i++;
        continue;
      }

      // H3
      if (line.startsWith("### ")) {
        const text = line.slice(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h3 key={i} id={id} className="text-2xl font-bold text-text-primary mt-8 mb-4 leading-tight scroll-mt-6">
            {text}
          </h3>
        );
        i++;
        continue;
      }

      // H4
      if (line.startsWith("#### ")) {
        const text = line.slice(5);
        elements.push(
          <h4 key={i} className="text-xl font-bold text-accent mt-6 mb-3 leading-tight flex items-center gap-2">
            {text.includes("Green Bin") && "🟢"}
            {text.includes("Yellow Bin") && "🟡"}
            {text.includes("Red Bin") && "🔴"}
            {text.replace(/[🟢🟡🔴]/g, "").trim()}
          </h4>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === "---") {
        elements.push(<hr key={i} className="my-8 border-t border-border-light" />);
        i++;
        continue;
      }

      // Bold text paragraphs
      if (line.startsWith("**") && line.endsWith("**")) {
        const text = line.slice(2, -2);
        elements.push(
          <p key={i} className="text-base font-bold text-text-primary mb-3 leading-relaxed">
            {text}
          </p>
        );
        i++;
        continue;
      }

      // Italic text paragraphs
      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        const text = line.slice(1, -1);
        elements.push(
          <p key={i} className="text-sm italic text-text-secondary mb-4 leading-relaxed">
            {text}
          </p>
        );
        i++;
        continue;
      }

      // Unordered lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={i} className="list-none space-y-2 mb-6 ml-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-base text-text-primary leading-relaxed">
                <span className="text-accent mt-1.5 flex-shrink-0">▸</span>
                <span dangerouslySetInnerHTML={{ __html: processBoldItalic(item) }} />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered lists
      if (/^\d+\./.test(line)) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\./.test(lines[i])) {
          listItems.push(lines[i].replace(/^\d+\.\s*/, ""));
          i++;
        }
        elements.push(
          <ol key={i} className="list-decimal list-inside space-y-2 mb-6 ml-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-base text-text-primary leading-relaxed" dangerouslySetInnerHTML={{ __html: processBoldItalic(item) }} />
            ))}
          </ol>
        );
        continue;
      }

      // Regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={i} className="text-base text-text-primary mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processBoldItalic(line) }} />
        );
      } else {
        elements.push(<div key={i} className="h-2" />);
      }

      i++;
    }

    return elements;
  };

  const processBoldItalic = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-text-primary">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  };

  return <div className="markdown-content-v2">{renderMarkdown(content)}</div>;
}
