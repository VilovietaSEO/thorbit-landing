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

            {/* Additional Platform Features - 3 Column Grid */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-8 text-center">Additional Platform Features</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Website & Competitor Scraping */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">Website & Competitor Scraping</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Complete content analysis of your site and competitors. <span className="font-bold text-primary">Sitemap scraping</span>, publishing frequency tracking, full-site content capture.
                  </p>
                  <button
                    onClick={() => openModal('scraping')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                </div>

                {/* Cannibalization Audit */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">Cannibalization Audit</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Identify pages competing against each other for the same rankings. Visual detection with specific recommendations on which pages to consolidate, redirect, or differentiate.
                  </p>
                  <button
                    onClick={() => openModal('cannibalization')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                      {/* Header Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-lg">⚠️</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Cannibalized Queries</span>
                          </div>
                          <p className="text-2xl font-black text-text-primary">214</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-lg">📄</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Affected Pages</span>
                          </div>
                          <p className="text-2xl font-black text-text-primary">53</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-lg">✨</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Est. Diluted Clicks</span>
                          </div>
                          <p className="text-2xl font-black text-text-primary">30</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-lg">💰</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Recovery Potential</span>
                          </div>
                          <p className="text-2xl font-black text-text-primary">$1.2K/mo</p>
                        </div>
                      </div>

                      {/* Cannibalized Queries Table */}
                      <div className="bg-white rounded-xl p-5 border border-border-light mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-black text-text-primary">Cannibalized Queries</h4>
                          <span className="text-xs text-text-tertiary">Sorted by impressions</span>
                        </div>

                        <div className="space-y-3">
                          {/* Query 1: "law firm seo" */}
                          <div className="border border-border-light rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="bg-bg-secondary p-4">
                              <div className="flex items-center justify-between mb-3">
                                <p className="font-bold text-text-primary text-base">"law firm seo"</p>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">2 pages competing</span>
                              </div>
                              <div className="grid grid-cols-4 gap-4 text-center text-sm">
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Impressions</p>
                                  <p className="font-black text-text-primary">2,630</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Clicks</p>
                                  <p className="font-black text-text-primary">0</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Avg Position</p>
                                  <p className="font-black text-low">59.4</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Potential</p>
                                  <p className="font-black text-high">184 clicks</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 space-y-3 bg-white">
                              <div className="flex items-start justify-between p-3 bg-high/5 rounded-lg border border-high/20">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-high">✓ Keep as Primary</span>
                                  </div>
                                  <p className="text-xs text-text-tertiary mb-2">/</p>
                                  <div className="grid grid-cols-4 gap-4 text-xs">
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Impressions</p>
                                      <p className="font-bold text-text-primary">433</p>
                                    </div>
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Clicks</p>
                                      <p className="font-bold text-text-primary">0</p>
                                    </div>
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Position</p>
                                      <p className="font-bold text-high">6.3</p>
                                    </div>
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Status</p>
                                      <span className="text-high bg-high/20 px-2 py-0.5 rounded font-bold">Strong</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start justify-between p-3 bg-low/5 rounded-lg border border-low/20">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-low">→ Consolidate or Redirect</span>
                                  </div>
                                  <p className="text-xs text-text-tertiary mb-2">/blog/law-firm-seo-how-to...</p>
                                  <div className="grid grid-cols-4 gap-4 text-xs">
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Impressions</p>
                                      <p className="font-bold text-text-primary">2,197</p>
                                    </div>
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Clicks</p>
                                      <p className="font-bold text-text-primary">0</p>
                                    </div>
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Position</p>
                                      <p className="font-bold text-low">80.5</p>
                                    </div>
                                    <div>
                                      <p className="text-text-tertiary mb-0.5">Recommended</p>
                                      <span className="text-low bg-low/20 px-2 py-0.5 rounded font-bold">Merge</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Query 2: "seo for lawyers" */}
                          <div className="border border-border-light rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="bg-bg-secondary p-4">
                              <div className="flex items-center justify-between mb-3">
                                <p className="font-bold text-text-primary text-base">"seo for lawyers"</p>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">3 pages competing</span>
                              </div>
                              <div className="grid grid-cols-4 gap-4 text-center text-sm">
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Impressions</p>
                                  <p className="font-black text-text-primary">2,273</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Clicks</p>
                                  <p className="font-black text-text-primary">0</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Avg Position</p>
                                  <p className="font-black text-low">80.5</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Potential</p>
                                  <p className="font-black text-high">159 clicks</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 space-y-2 bg-white">
                              <div className="flex items-start justify-between p-2 bg-high/5 rounded border border-high/20">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-high">✓ Primary</span>
                                    <span className="text-xs text-text-tertiary">/services/law-firm-seo</span>
                                  </div>
                                  <div className="grid grid-cols-4 gap-2 text-xs mt-1">
                                    <p className="text-text-tertiary">Pos: 12.4</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start justify-between p-2 bg-low/5 rounded border border-low/20">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-low">→ Merge</span>
                                    <span className="text-xs text-text-tertiary">/blog/lawyer-seo-guide</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start justify-between p-2 bg-low/5 rounded border border-low/20">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-low">→ Merge</span>
                                    <span className="text-xs text-text-tertiary">/blog/seo-strategies...</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Query 3: "attorney marketing" */}
                          <div className="border border-border-light rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="bg-bg-secondary p-4">
                              <div className="flex items-center justify-between mb-3">
                                <p className="font-bold text-text-primary text-base">"attorney marketing"</p>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">2 pages competing</span>
                              </div>
                              <div className="grid grid-cols-4 gap-4 text-center text-sm">
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Impressions</p>
                                  <p className="font-black text-text-primary">1,842</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Clicks</p>
                                  <p className="font-black text-text-primary">3</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Avg Position</p>
                                  <p className="font-black" style={{color: 'var(--medium)'}}>42.1</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Potential</p>
                                  <p className="font-black text-high">126 clicks</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation Summary */}
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <h4 className="text-base font-black text-text-primary mb-3">Quick Actions</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-3 p-3 bg-high/5 rounded-lg border border-high/20">
                            <span className="text-xl">✓</span>
                            <p className="text-text-primary"><span className="font-bold">Keep 15 pages</span> as primary for their cannibalized queries</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-low/5 rounded-lg border border-low/20">
                            <span className="text-xl">→</span>
                            <p className="text-text-primary"><span className="font-bold">Consolidate 38 pages</span> into stronger pages (301 redirects recommended)</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="text-xl">✏️</span>
                            <p className="text-text-primary"><span className="font-bold">Differentiate 12 pages</span> by targeting distinct long-tail variations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Opportunity Analysis */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">Content Opportunity Analysis</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Automated identification of gaps where you have no content addressing valuable topics. <span className="font-bold text-primary">Close-to-ranking opportunities</span> for existing pages.
                  </p>
                  <button
                    onClick={() => openModal('opportunity')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                    <div
                      className="mt-4 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-border-light cursor-pointer"
                      onClick={() => toggleFeature('opportunity')}
                    >
                      {/* Header Stats Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                              <span className="text-lg">📊</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Pages Analyzed</span>
                          </div>
                          <p className="text-2xl font-black text-text-primary">54</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-lg">🔥</span>
                            </div>
                            <span className="text-sm text-text-tertiary">High Opportunity</span>
                          </div>
                          <p className="text-2xl font-black text-low">8</p>
                          <p className="text-xs text-text-tertiary">100+ clicks each</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-lg">⚡</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Medium Opportunity</span>
                          </div>
                          <p className="text-2xl font-black" style={{color: 'var(--medium)'}}>12</p>
                          <p className="text-xs text-text-tertiary">50-99 clicks each</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-border-light">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-lg">✅</span>
                            </div>
                            <span className="text-sm text-text-tertiary">Low Opportunity</span>
                          </div>
                          <p className="text-2xl font-black text-high">34</p>
                          <p className="text-xs text-text-tertiary">&lt;50 clicks each</p>
                        </div>
                      </div>

                      {/* Close-to-Ranking Pages Table */}
                      <div className="bg-white rounded-xl p-5 border border-border-light mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-black text-text-primary">Close-to-Ranking Opportunities</h4>
                          <span className="text-xs text-text-tertiary">Position 11-20, high impressions</span>
                        </div>

                        <div className="space-y-3">
                          {/* Opportunity 1 */}
                          <div className="border border-border-light rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="bg-bg-secondary p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-text-primary">/blog/lawyer-marketing-strategies</p>
                                <span className="text-xs bg-red-50 text-low px-3 py-1 rounded-full font-bold">HIGH (142 clicks)</span>
                              </div>
                              <p className="text-xs text-text-tertiary mb-3">Primary query: "lawyer marketing strategies" (8.2K impressions, pos 12.3)</p>
                              <div className="grid grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Current Clicks</p>
                                  <p className="font-black text-text-primary">18</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Impressions</p>
                                  <p className="font-black text-text-primary">12,847</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Avg Position</p>
                                  <p className="font-black" style={{color: 'var(--medium)'}}>14.2</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Potential</p>
                                  <p className="font-black text-low">+142 clicks</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">To Position</p>
                                  <p className="font-black text-high">Top 3</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 bg-white">
                              <p className="text-xs font-bold text-text-primary mb-2">Recommended Actions:</p>
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-primary">•</span>
                                  <p className="text-text-secondary">Add "digital marketing" entity (missing, 89% competitor coverage)</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-primary">•</span>
                                  <p className="text-text-secondary">Internal link from /services/attorney-seo (authority transfer)</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-primary">•</span>
                                  <p className="text-text-secondary">Update title: move "strategies" earlier for better CTR</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Opportunity 2 */}
                          <div className="border border-border-light rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="bg-bg-secondary p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-text-primary">/blog/content-marketing-for-law-firms</p>
                                <span className="text-xs bg-yellow-50 px-3 py-1 rounded-full font-bold" style={{color: 'var(--medium)'}}>MEDIUM (87 clicks)</span>
                              </div>
                              <p className="text-xs text-text-tertiary mb-3">Primary query: "law firm content marketing" (4.1K impressions, pos 15.8)</p>
                              <div className="grid grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Current Clicks</p>
                                  <p className="font-black text-text-primary">12</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Impressions</p>
                                  <p className="font-black text-text-primary">6,234</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Avg Position</p>
                                  <p className="font-black" style={{color: 'var(--medium)'}}>16.4</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Potential</p>
                                  <p className="font-black" style={{color: 'var(--medium)'}}>+87 clicks</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">To Position</p>
                                  <p className="font-black text-high">Top 5</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Opportunity 3 */}
                          <div className="border border-border-light rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="bg-bg-secondary p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-text-primary">/services/legal-seo</p>
                                <span className="text-xs bg-yellow-50 px-3 py-1 rounded-full font-bold" style={{color: 'var(--medium)'}}>MEDIUM (74 clicks)</span>
                              </div>
                              <p className="text-xs text-text-tertiary mb-3">Primary query: "legal seo services" (3.8K impressions, pos 13.1)</p>
                              <div className="grid grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Current Clicks</p>
                                  <p className="font-black text-text-primary">23</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Impressions</p>
                                  <p className="font-black text-text-primary">5,289</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Avg Position</p>
                                  <p className="font-black" style={{color: 'var(--medium)'}}>13.1</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">Potential</p>
                                  <p className="font-black" style={{color: 'var(--medium)'}}>+74 clicks</p>
                                </div>
                                <div>
                                  <p className="text-xs text-text-tertiary mb-1">To Position</p>
                                  <p className="font-black text-high">Top 5</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Missing Topics Section */}
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-black text-text-primary">Missing Topic Opportunities</h4>
                          <span className="text-xs text-text-tertiary">Queries with no ranking pages</span>
                        </div>
                        <p className="text-sm text-text-secondary mb-4">23 missing topics identified | Est. 127 potential clicks/mo</p>

                        <div className="border border-border-light rounded-lg overflow-hidden">
                          <div className="bg-bg-secondary p-3 grid grid-cols-7 gap-3 text-xs font-bold text-text-primary">
                            <div>UNIQUE WORD</div>
                            <div className="col-span-2">PRIMARY KEYWORD</div>
                            <div className="text-center">CLICKS</div>
                            <div className="text-center">IMPRESSIONS</div>
                            <div className="text-center">AVG POSITION</div>
                            <div className="text-center">PRIORITY</div>
                          </div>
                          <div className="divide-y divide-border-light text-xs">
                            <div className="p-3 grid grid-cols-7 gap-3 items-center hover:bg-bg-secondary">
                              <div className="font-bold text-low">pricing</div>
                              <div className="col-span-2 text-text-secondary">lawyer seo pricing</div>
                              <div className="text-center text-text-primary font-bold">0</div>
                              <div className="text-center text-text-tertiary">342</div>
                              <div className="text-center text-high font-bold">8.2</div>
                              <div className="text-center"><span className="bg-low/20 text-low px-2 py-1 rounded font-bold">HIGH</span></div>
                            </div>
                            <div className="p-3 grid grid-cols-7 gap-3 items-center hover:bg-bg-secondary">
                              <div className="font-bold text-low">local</div>
                              <div className="col-span-2 text-text-secondary">local seo for attorneys</div>
                              <div className="text-center text-text-primary font-bold">0</div>
                              <div className="text-center text-text-tertiary">287</div>
                              <div className="text-center text-high font-bold">9.7</div>
                              <div className="text-center"><span className="bg-low/20 text-low px-2 py-1 rounded font-bold">HIGH</span></div>
                            </div>
                            <div className="p-3 grid grid-cols-7 gap-3 items-center hover:bg-bg-secondary">
                              <div className="font-bold" style={{color: 'var(--medium)'}}>cost</div>
                              <div className="col-span-2 text-text-secondary">how much does lawyer seo cost</div>
                              <div className="text-center text-text-primary font-bold">0</div>
                              <div className="text-center text-text-tertiary">156</div>
                              <div className="text-center" style={{color: 'var(--medium)'}} className="font-bold">14.3</div>
                              <div className="text-center"><span className="px-2 py-1 rounded font-bold" style={{backgroundColor: 'rgba(212, 165, 90, 0.2)', color: 'var(--medium)'}}>MEDIUM</span></div>
                            </div>
                            <div className="p-3 grid grid-cols-7 gap-3 items-center hover:bg-bg-secondary">
                              <div className="font-bold" style={{color: 'var(--medium)'}}>directory</div>
                              <div className="col-span-2 text-text-secondary">lawyer directory listings seo</div>
                              <div className="text-center text-text-primary font-bold">0</div>
                              <div className="text-center text-text-tertiary">94</div>
                              <div className="text-center" style={{color: 'var(--medium)'}} className="font-bold">18.9</div>
                              <div className="text-center"><span className="px-2 py-1 rounded font-bold" style={{backgroundColor: 'rgba(212, 165, 90, 0.2)', color: 'var(--medium)'}}>MEDIUM</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* On-Page Analysis */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">On-Page Analysis</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Entity-focused optimization identifying unique topics covered in search results. <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>Topical flow scoring</span>, audience language analysis from forums and reviews.
                  </p>
                  <button
                    onClick={() => openModal('onpage')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                    <div
                      className="mt-4 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-border-light cursor-pointer"
                      onClick={() => toggleFeature('onpage')}
                    >
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <h4 className="text-base font-black text-text-primary mb-4">On-Page Analysis: /services/plumbing</h4>

                        <div className="space-y-4">
                          <div className="p-4 bg-high/5 rounded-lg border border-high/20">
                            <p className="text-sm font-bold text-high mb-2">✓ Entity Coverage Analysis</p>
                            <div className="space-y-2 text-xs">
                              <p className="text-text-secondary">• Add "emergency plumber" entity (missing, 89% competitor coverage)</p>
                              <p className="text-text-secondary">• Add "drain cleaning" entity (missing, 76% competitor coverage)</p>
                              <p className="text-text-secondary">• Current coverage: 12/18 core entities (67%)</p>
                            </div>
                          </div>

                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-sm font-bold text-purple-700 mb-2">✓ Audience Language Analysis</p>
                            <div className="space-y-2 text-xs">
                              <p className="text-text-secondary">• Include pricing transparency language from Reddit/r/plumbing</p>
                              <p className="text-text-secondary">• Add "same-day service" emphasis (high intent signal from forums)</p>
                              <p className="text-text-secondary">• Address "licensed and insured" concern (mentioned in 84% of reviews)</p>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm font-bold text-yellow-700 mb-2">✓ Topical Flow Scoring</p>
                            <div className="space-y-2 text-xs">
                              <p className="text-text-secondary">• Current flow score: 0.72 (Target: 0.85+)</p>
                              <p className="text-text-secondary">• Add "water heater" section after services list</p>
                              <p className="text-text-secondary">• Connect "pipe repair" to "leak detection" semantically</p>
                            </div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm font-bold text-blue-700 mb-2">✓ SERP Gap Analysis</p>
                            <div className="space-y-2 text-xs">
                              <p className="text-text-secondary">• Top 3 competitors average 2,400 words (you: 850 words)</p>
                              <p className="text-text-secondary">• 67% of top results include FAQ schema (you: missing)</p>
                              <p className="text-text-secondary">• 100% include service area maps (you: missing)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Console Integration */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30 col-span-full">
                  <h4 className="text-lg font-black text-text-primary mb-3">Search Console Integration</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Unified dashboard with KPIs and performance graphs. <span className="font-bold text-primary">Branded vs. non-branded analysis</span>, guides vs. questions breakdowns.
                  </p>
                  <button
                    onClick={() => openModal('searchconsole')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                    <div
                      className="mt-4 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-border-light cursor-pointer"
                      onClick={() => toggleFeature('searchconsole')}
                    >
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white rounded-xl p-4 border border-border-light">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-lg">🌐</span>
                          </div>
                          <span className="text-sm text-text-tertiary">Total Sites</span>
                        </div>
                        <p className="text-2xl font-black text-text-primary">5</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-border-light">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-lg">✨</span>
                          </div>
                          <span className="text-sm text-text-tertiary">Total Clicks</span>
                        </div>
                        <p className="text-2xl font-black text-text-primary">6,441</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-border-light">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-lg">👁</span>
                          </div>
                          <span className="text-sm text-text-tertiary">Total Impressions</span>
                        </div>
                        <p className="text-2xl font-black text-text-primary">1,935,615</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-border-light">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-lg">📅</span>
                          </div>
                          <span className="text-sm text-text-tertiary">Date Range</span>
                        </div>
                        <p className="text-2xl font-black text-text-primary">28 Days</p>
                      </div>
                    </div>

                    {/* Site Cards Row */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Example Site 1 */}
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                <span className="text-xs">🌐</span>
                              </div>
                              <h5 className="text-base font-bold text-text-primary">example1.com</h5>
                            </div>
                            <p className="text-xs text-text-tertiary">siteFullUser</p>
                          </div>
                          <span className="text-text-tertiary">→</span>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">✨ Clicks</p>
                            <p className="text-lg font-black text-text-primary">3,074</p>
                            <p className="text-xs text-red-600">↓ -19.0%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">👁 Impressions</p>
                            <p className="text-lg font-black text-text-primary">50.6K</p>
                            <p className="text-xs text-red-600">↓ -18.8%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">📊 CTR</p>
                            <p className="text-lg font-black text-text-primary">6.1%</p>
                            <p className="text-xs text-red-600">↓ -0.0%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">📍 Avg Position</p>
                            <p className="text-lg font-black text-text-primary">49.0</p>
                            <p className="text-xs text-high">↑ +4.6% better</p>
                          </div>
                        </div>

                        {/* Query Count by Ranking */}
                        <div className="mb-3">
                          <p className="text-xs text-text-tertiary mb-2">📊 Query Count by Ranking</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div className="bg-green-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-green-800">1-3</p>
                              <p className="text-sm font-black text-text-primary">76</p>
                              <p className="text-xs text-red-600">-16</p>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-blue-800">4-10</p>
                              <p className="text-sm font-black text-text-primary">101</p>
                              <p className="text-xs text-red-600">-10</p>
                            </div>
                            <div className="bg-amber-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-amber-800">11-20</p>
                              <p className="text-sm font-black text-text-primary">189</p>
                              <p className="text-xs text-red-600">-104</p>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-gray-800">21+</p>
                              <p className="text-sm font-black text-text-primary">4,634</p>
                              <p className="text-xs text-high">+130</p>
                            </div>
                          </div>
                        </div>

                        {/* Performance Chart */}
                        <div className="bg-bg-secondary rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-text-tertiary">📊 Performance</p>
                            <div className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                                <span className="text-text-tertiary">Clicks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                                <span className="text-text-tertiary">Impr</span>
                              </div>
                            </div>
                          </div>
                          <svg viewBox="0 0 200 60" className="w-full h-20">
                            {/* Grid lines */}
                            <line x1="0" y1="15" x2="200" y2="15" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="0" y1="30" x2="200" y2="30" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="0" y1="45" x2="200" y2="45" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>

                            {/* Impressions line (blue) */}
                            <polyline
                              points="0,45 25,40 50,35 75,38 100,32 125,28 150,30 175,25 200,22"
                              fill="none"
                              stroke="var(--secondary)"
                              strokeWidth="2"
                              opacity="0.8"
                            />

                            {/* Clicks line (orange) */}
                            <polyline
                              points="0,50 25,48 50,45 75,47 100,42 125,40 150,38 175,35 200,30"
                              fill="none"
                              stroke="var(--primary)"
                              strokeWidth="2"
                            />
                          </svg>
                          <div className="flex justify-between text-xs text-text-tertiary mt-1">
                            <span>Nov 21</span>
                            <span>Dec 4</span>
                          </div>
                        </div>
                      </div>

                      {/* Example Site 2 */}
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs">🌐</span>
                              </div>
                              <h5 className="text-base font-bold text-text-primary">example2.com</h5>
                            </div>
                            <p className="text-xs text-text-tertiary">siteFullUser</p>
                          </div>
                          <span className="text-text-tertiary">→</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">✨ Clicks</p>
                            <p className="text-lg font-black text-text-primary">1,236</p>
                            <p className="text-xs text-high">↑ +5.3%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">👁 Impressions</p>
                            <p className="text-lg font-black text-text-primary">832.2K</p>
                            <p className="text-xs text-high">↑ +37.2%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">📊 CTR</p>
                            <p className="text-lg font-black text-text-primary">0.1%</p>
                            <p className="text-xs text-red-600">↓ -0.0%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">📍 Avg Position</p>
                            <p className="text-lg font-black text-text-primary">26.6</p>
                            <p className="text-xs text-high">↑ +6.8% better</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-text-tertiary mb-2">📊 Query Count by Ranking</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div className="bg-green-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-green-800">1-3</p>
                              <p className="text-sm font-black text-text-primary">1,508</p>
                              <p className="text-xs text-red-600">-38</p>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-blue-800">4-10</p>
                              <p className="text-sm font-black text-text-primary">765</p>
                              <p className="text-xs text-red-600">-91</p>
                            </div>
                            <div className="bg-amber-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-amber-800">11-20</p>
                              <p className="text-sm font-black text-text-primary">342</p>
                              <p className="text-xs text-red-600">-48</p>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-gray-800">21+</p>
                              <p className="text-sm font-black text-text-primary">2,385</p>
                              <p className="text-xs text-high">+177</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-bg-secondary rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-text-tertiary">📊 Performance</p>
                            <div className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                                <span className="text-text-tertiary">Clicks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                                <span className="text-text-tertiary">Impr</span>
                              </div>
                            </div>
                          </div>
                          <svg viewBox="0 0 200 60" className="w-full h-20">
                            {/* Grid lines */}
                            <line x1="0" y1="15" x2="200" y2="15" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="0" y1="30" x2="200" y2="30" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="0" y1="45" x2="200" y2="45" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>

                            {/* Impressions line (blue) - trending up */}
                            <polyline
                              points="0,50 25,48 50,45 75,42 100,40 125,35 150,32 175,28 200,25"
                              fill="none"
                              stroke="var(--secondary)"
                              strokeWidth="2"
                              opacity="0.8"
                            />

                            {/* Clicks line (orange) - trending up */}
                            <polyline
                              points="0,52 25,50 50,48 75,45 100,43 125,40 150,38 175,35 200,32"
                              fill="none"
                              stroke="var(--primary)"
                              strokeWidth="2"
                            />
                          </svg>
                          <div className="flex justify-between text-xs text-text-tertiary mt-1">
                            <span>Nov 21</span>
                            <span>Dec 4</span>
                          </div>
                        </div>
                      </div>

                      {/* Example Site 3 */}
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                                <span className="text-xs">🌐</span>
                              </div>
                              <h5 className="text-base font-bold text-text-primary">example3.com</h5>
                            </div>
                            <p className="text-xs text-text-tertiary">siteFullUser</p>
                          </div>
                          <span className="text-text-tertiary">→</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">✨ Clicks</p>
                            <p className="text-lg font-black text-text-primary">1,235</p>
                            <p className="text-xs text-high">↑ +5.2%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">👁 Impressions</p>
                            <p className="text-lg font-black text-text-primary">832.2K</p>
                            <p className="text-xs text-high">↑ +37.2%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">📊 CTR</p>
                            <p className="text-lg font-black text-text-primary">0.1%</p>
                            <p className="text-xs text-red-600">↓ -0.0%</p>
                          </div>
                          <div className="bg-bg-secondary rounded-lg p-3">
                            <p className="text-xs text-text-tertiary mb-1">📍 Avg Position</p>
                            <p className="text-lg font-black text-text-primary">26.6</p>
                            <p className="text-xs text-high">↑ +6.8% better</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-text-tertiary mb-2">📊 Query Count by Ranking</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div className="bg-green-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-green-800">1-3</p>
                              <p className="text-sm font-black text-text-primary">1,508</p>
                              <p className="text-xs text-red-600">-38</p>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-blue-800">4-10</p>
                              <p className="text-sm font-black text-text-primary">765</p>
                              <p className="text-xs text-red-600">-91</p>
                            </div>
                            <div className="bg-amber-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-amber-800">11-20</p>
                              <p className="text-sm font-black text-text-primary">342</p>
                              <p className="text-xs text-red-600">-48</p>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-2 text-center">
                              <p className="text-xs font-bold text-gray-800">21+</p>
                              <p className="text-sm font-black text-text-primary">2,385</p>
                              <p className="text-xs text-high">+177</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-bg-secondary rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-text-tertiary">📊 Performance</p>
                            <div className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                                <span className="text-text-tertiary">Clicks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                                <span className="text-text-tertiary">Impr</span>
                              </div>
                            </div>
                          </div>
                          <svg viewBox="0 0 200 60" className="w-full h-20">
                            {/* Grid lines */}
                            <line x1="0" y1="15" x2="200" y2="15" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="0" y1="30" x2="200" y2="30" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="0" y1="45" x2="200" y2="45" stroke="#E0D8CC" strokeWidth="0.5" opacity="0.3"/>

                            {/* Impressions line (blue) - similar to site 2 */}
                            <polyline
                              points="0,50 25,48 50,46 75,43 100,41 125,36 150,33 175,29 200,26"
                              fill="none"
                              stroke="var(--secondary)"
                              strokeWidth="2"
                              opacity="0.8"
                            />

                            {/* Clicks line (orange) - similar to site 2 */}
                            <polyline
                              points="0,52 25,50 50,49 75,46 100,44 125,41 150,39 175,36 200,33"
                              fill="none"
                              stroke="var(--primary)"
                              strokeWidth="2"
                            />
                          </svg>
                          <div className="flex justify-between text-xs text-text-tertiary mt-1">
                            <span>Nov 21</span>
                            <span>Dec 4</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </div>

                {/* Internal Link Automation */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">Internal Link Automation</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Strategic linking recommendations based on entity relationships. <span className="font-bold" style={{ color: 'var(--primary)', textDecoration: 'underline', textDecorationColor: 'var(--primary)' }}>Three options per opportunity</span> with exact pages, anchor text, and placement guidance.
                  </p>
                  <button
                    onClick={() => openModal('linking')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                    <div
                      className="mt-4 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-border-light cursor-pointer"
                      onClick={() => toggleFeature('linking')}
                    >
                      <div className="bg-white rounded-xl p-5 border border-border-light">
                        <h4 className="text-base font-black text-text-primary mb-4">Internal Link Recommendations: /services/plumbing</h4>
                        <div className="space-y-3">
                          <div className="bg-high/5 rounded-lg p-4 border border-high/20">
                            <p className="font-bold text-high mb-2">Option 1: Entity-based Link</p>
                            <p className="text-xs text-text-tertiary mb-1">To: /water-heater-repair</p>
                            <p className="text-sm text-text-secondary mb-1">Anchor: "water heater repair services"</p>
                            <p className="text-sm text-primary">→ Add in paragraph 3 after pricing mention</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <p className="font-bold text-purple-700 mb-2">Option 2: Topical Cluster Link</p>
                            <p className="text-xs text-text-tertiary mb-1">To: /emergency-plumbing</p>
                            <p className="text-sm text-text-secondary mb-1">Anchor: "24/7 emergency plumbers"</p>
                            <p className="text-sm text-primary">→ Add in intro section</p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="font-bold text-blue-700 mb-2">Option 3: Service Hub Link</p>
                            <p className="text-xs text-text-tertiary mb-1">To: /services</p>
                            <p className="text-sm text-text-secondary mb-1">Anchor: "all plumbing services"</p>
                            <p className="text-sm text-primary">→ Add in footer of page</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WordPress Integration */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">WordPress Integration</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Edit content, pages, posts, and schema directly in platform. Manage internal links and <span className="font-bold text-primary">bulk operations</span> without switching tools.
                  </p>
                  <button
                    onClick={() => openModal('wordpress')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                    <div
                      className="mt-4 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-border-light cursor-pointer"
                      onClick={() => toggleFeature('wordpress')}
                    >
                    <div className="bg-white rounded-lg border border-border-light overflow-hidden">
                      {/* Header */}
                      <div className="p-4 flex items-center justify-between border-b border-border-light">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-text-primary">Thorbit</h4>
                            <p className="text-xs text-text-tertiary">forwardpush.com ↗</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-high/10 text-high px-3 py-1 rounded-full border border-high/30">
                          <div className="w-2 h-2 rounded-full bg-high"></div>
                          <span className="text-sm font-bold">Connected</span>
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="flex gap-2 px-4 py-2 bg-bg-secondary text-xs border-b border-border-light">
                        <button className="px-3 py-2 text-text-tertiary hover:text-text-primary">⚙️ Overview</button>
                        <button className="px-3 py-2 bg-primary text-white rounded font-bold flex items-center gap-1">
                          📄 Pages <span className="bg-white/20 px-1.5 rounded">125</span>
                        </button>
                        <button className="px-3 py-2 text-text-tertiary hover:text-text-primary">⚡ Plans</button>
                        <button className="px-3 py-2 text-text-tertiary hover:text-text-primary">🔗 Internal Links</button>
                        <button className="px-3 py-2 text-text-tertiary hover:text-text-primary">📤 Publishing</button>
                        <button className="px-3 py-2 text-text-tertiary hover:text-text-primary">📊 Activity</button>
                      </div>

                      {/* Table */}
                      <div className="p-4">
                        <div className="border border-border-light rounded-lg overflow-hidden">
                          <div className="bg-bg-secondary p-2 grid grid-cols-7 gap-2 text-xs font-bold text-text-primary">
                            <div className="col-span-2">Title</div>
                            <div>Type</div>
                            <div>Words</div>
                            <div>Coverage</div>
                            <div>Schema</div>
                            <div>Status</div>
                          </div>
                          <div className="divide-y divide-border-light text-xs">
                            <div className="p-2 grid grid-cols-7 gap-2 items-center hover:bg-bg-secondary">
                              <div className="col-span-2">
                                <p className="font-bold text-text-primary">Home</p>
                                <p className="text-text-tertiary text-xs">https://forwardpush.com/ ↗</p>
                              </div>
                              <div><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Page</span></div>
                              <div className="text-text-primary">357</div>
                              <div className="text-text-tertiary">None</div>
                              <div>
                                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">WebSite</span>
                                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold ml-1">Organization</span>
                              </div>
                              <div className="text-text-tertiary">Not Analyzed</div>
                            </div>
                            <div className="p-2 grid grid-cols-7 gap-2 items-center hover:bg-bg-secondary">
                              <div className="col-span-2">
                                <p className="font-bold text-text-primary">Accessibility Statement</p>
                                <p className="text-text-tertiary text-xs">https://forwardpush.com/accessibility...</p>
                              </div>
                              <div><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Page</span></div>
                              <div className="text-text-primary">334</div>
                              <div className="text-text-tertiary">None</div>
                              <div className="text-text-tertiary">-</div>
                              <div className="text-text-tertiary">Not Analyzed</div>
                            </div>
                            <div className="p-2 grid grid-cols-7 gap-2 items-center hover:bg-bg-secondary">
                              <div className="col-span-2">
                                <p className="font-bold text-text-primary">Our Responsible AI Policy</p>
                                <p className="text-text-tertiary text-xs">https://forwardpush.com/ai-policy...</p>
                              </div>
                              <div><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Page</span></div>
                              <div className="text-text-primary">457</div>
                              <div className="text-text-tertiary">None</div>
                              <div className="text-text-tertiary">-</div>
                              <div className="text-text-tertiary">Not Analyzed</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </div>

                {/* AI Strategy Assistant */}
                <div className="bg-bg-primary rounded-xl p-6 border-2 border-border-light transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                  <h4 className="text-lg font-black text-text-primary mb-3">AI Strategy Assistant</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Context-aware chat with access to all your intelligence: ICP, knowledge graph, briefs, competitive analysis, on-page recommendations, Search Console data.
                  </p>
                  <button
                    onClick={() => openModal('assistant')}
                    className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                  >
                    + See Example
                  </button>
                    <div
                      className="mt-4 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-border-light cursor-pointer"
                      onClick={() => toggleFeature('assistant')}
                    >
                    <div className="bg-white rounded-lg border border-border-light overflow-hidden">
                      {/* Chat Header */}
                      <div className="bg-bg-secondary border-b border-border-light p-4 flex items-center justify-between">
                        <h4 className="text-sm font-black text-text-primary">AI Strategy Assistant</h4>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <span className="w-2 h-2 bg-high rounded-full"></span>
                          <span>Active</span>
                        </div>
                      </div>

                      {/* Chat Messages Area */}
                      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                        {/* User Message */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">You</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-bg-secondary rounded-lg p-3 border border-border-light">
                              <p className="text-sm text-text-primary">how many critical entities are there?</p>
                            </div>
                          </div>
                        </div>

                        {/* AI Response with Reasoning */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-teal">AI</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            {/* Expandable Reasoning Section */}
                            <div className="bg-teal/5 rounded-lg border border-teal/20 overflow-hidden">
                              <div className="p-3 bg-teal/10 border-b border-teal/20 flex items-center justify-between">
                                <p className="text-xs font-bold text-teal">View AI reasoning & actions</p>
                                <span className="text-xs text-teal">↓</span>
                              </div>
                              <div className="p-3 space-y-2">
                                <div className="text-xs text-text-secondary">
                                  <p className="font-medium text-text-primary mb-1">Analyzing knowledge graph...</p>
                                  <p className="text-xs leading-relaxed">Querying entity database for tier classification. Filtering by importance level: critical. Cross-referencing with ICP alignment scores.</p>
                                </div>
                                <div className="bg-bg-secondary rounded p-2 text-xs font-mono text-text-secondary">
                                  → Graph Query: SELECT entities WHERE tier='critical'<br/>
                                  → Found: 47 entities<br/>
                                  → ICP Aligned: 42 entities (89%)
                                </div>
                              </div>
                            </div>

                            {/* AI Answer */}
                            <div className="bg-white rounded-lg p-3 border border-border-light">
                              <p className="text-sm text-text-primary leading-relaxed">
                                There are <span className="font-bold text-teal">47 critical entities</span> in your knowledge graph. Of these, 42 are highly aligned with your ICP (89% alignment rate).
                              </p>
                              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                                Your top coverage gaps are in: "law firm marketing" (0% coverage), "attorney SEO" (12% coverage), and "legal content strategy" (18% coverage). All three are critical-tier entities with high ICP alignment.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Available Tools Panel */}
                        <div className="bg-bg-secondary/50 rounded-lg border border-border-light p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-text-primary">Available Tools</p>
                            <p className="text-xs text-text-tertiary">Use ↑↓ Tab Enter</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded p-2 border border-border-light hover:border-primary/30 transition-colors">
                              <p className="text-xs font-bold text-text-primary">Capture Screenshot</p>
                              <p className="text-xs text-text-tertiary">Visual page analysis</p>
                            </div>
                            <div className="bg-white rounded p-2 border border-border-light hover:border-primary/30 transition-colors">
                              <p className="text-xs font-bold text-text-primary">Deep Research</p>
                              <p className="text-xs text-text-tertiary">Multi-source queries</p>
                            </div>
                            <div className="bg-white rounded p-2 border border-border-light hover:border-primary/30 transition-colors">
                              <p className="text-xs font-bold text-text-primary">Search Web</p>
                              <p className="text-xs text-text-tertiary">Live web search</p>
                            </div>
                            <div className="bg-white rounded p-2 border border-border-light hover:border-primary/30 transition-colors">
                              <p className="text-xs font-bold text-text-primary">Scrape Page</p>
                              <p className="text-xs text-text-tertiary">Extract content</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Input Field */}
                      <div className="border-t border-border-light p-4">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Type / for tools • Enter to send • Shift+Enter for new line"
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-border-light focus:outline-none focus:border-primary/50 text-sm text-text-primary placeholder:text-text-tertiary"
                            disabled
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button className="text-xs text-text-tertiary hover:text-primary transition-colors">
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
