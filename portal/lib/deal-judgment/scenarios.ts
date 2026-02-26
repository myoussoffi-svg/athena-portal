export interface DealTeaser {
  id: string;
  codename: string;
  industry: string;
  industryIcon: string;
  difficulty: 'moderate' | 'challenging' | 'advanced';

  teaser: {
    companyOverview: string;
    financials: {
      revenue: string;
      ebitda: string;
      ebitdaMargin: string;
      revenueGrowth: string;
      additionalMetrics?: string[];
    };
    dealTerms: string;
    keyConsiderations: string[];
  };

  hiddenContext: {
    correctDecision: 'invest' | 'pass';
    keyRisks: string[];
    redFlags: string[];
    strongThesisPoints: string[];
    modelAnswer: string;
  };
}

export const DEAL_SCENARIOS: DealTeaser[] = [
  {
    id: 'project-atlas',
    codename: 'Project Atlas',
    industry: 'Healthcare Services',
    industryIcon: '🏥',
    difficulty: 'moderate',
    teaser: {
      companyOverview: 'Atlas is a regional physician practice management (PPM) platform operating 45 clinics across three states in the Southeast. The company provides back-office support, billing, compliance, and IT infrastructure to affiliated physician groups, primarily in orthopedics and pain management. Founded in 2015, Atlas has grown through a combination of organic expansion and 12 tuck-in acquisitions.',
      financials: { revenue: '$180M LTM', ebitda: '$36M LTM', ebitdaMargin: '20%', revenueGrowth: '18% (3-year CAGR, acquisition-adjusted organic ~6%)' },
      dealTerms: 'Sponsor acquiring at 11x LTM EBITDA. Management rollover of 20%. 5.5x leverage available from lenders.',
      keyConsiderations: [
        'Strong organic growth in orthopedics driven by aging demographics',
        'Proven acquisition playbook with 12 completed tuck-ins at 5-7x EBITDA',
        'Top 3 physicians generate 25% of total revenue',
        'Recent regulatory scrutiny of PPM models in two states',
        'Non-compete agreements with key physicians expire in 2-3 years',
        'Payor mix: 40% Medicare, 35% commercial, 25% Medicaid',
      ],
    },
    hiddenContext: {
      correctDecision: 'pass',
      keyRisks: ['Key physician concentration (25% of revenue from 3 doctors)', 'Non-compete expirations create walk-away risk', 'Regulatory risk in PPM model', 'High Medicare exposure limits pricing power', 'Organic growth lower than headline suggests'],
      redFlags: ['Non-compete expiration timing coincides with hold period', 'Key man risk is extreme — losing even one top physician significantly impacts EBITDA', '40% Medicare concentration with reimbursement rate cuts expected'],
      strongThesisPoints: ['Recognition that acquisition-adjusted organic growth is only 6%', 'Identification of key man risk and non-compete timing', 'Understanding that 11x entry multiple on potentially inflated earnings is aggressive', 'Regulatory awareness around PPM models'],
      modelAnswer: 'Pass. While Atlas has an attractive acquisition platform and benefits from favorable demographic tailwinds, the risk profile is too concentrated. Three physicians generating 25% of revenue creates unacceptable key man risk, especially with non-competes expiring during the hold period. At 11x EBITDA, you\'re paying for growth that is largely acquisition-driven (organic is only ~6%), and the 40% Medicare payor mix limits pricing power amid expected reimbursement cuts. The regulatory overhang on PPM models adds further risk. Would need to see physician lock-ups extended 5+ years and a lower entry multiple (8-9x) to revisit.',
    },
  },
  {
    id: 'project-beacon',
    codename: 'Project Beacon',
    industry: 'B2B Software',
    industryIcon: '💻',
    difficulty: 'moderate',
    teaser: {
      companyOverview: 'Beacon is a vertical SaaS platform serving mid-market property management companies. The software handles tenant management, maintenance workflows, lease administration, and financial reporting. The company serves 800+ customers managing a combined 250,000 residential units. 92% of revenue is recurring (annual subscriptions), with net revenue retention of 115%.',
      financials: { revenue: '$85M ARR', ebitda: '$22M LTM', ebitdaMargin: '26%', revenueGrowth: '28% (organic)', additionalMetrics: ['CAC payback: 14 months', 'LTV/CAC: 5.2x', 'Gross margin: 78%'] },
      dealTerms: 'Sponsor acquiring at 14x LTM EBITDA (4.4x ARR). Growth equity structure with 3x leverage. Management retaining 30% equity.',
      keyConsiderations: [
        'Dominant position in an underserved vertical with low software penetration (~15%)',
        'Net revenue retention of 115% driven by upsell of add-on modules',
        'No single customer represents more than 1.5% of ARR',
        'Recent launch of payments product (early traction: 50 customers)',
        'Two well-funded competitors raised $100M+ each in last 18 months',
        'Rule of 40 score: 54 (28% growth + 26% margin)',
      ],
    },
    hiddenContext: {
      correctDecision: 'invest',
      keyRisks: ['Competitive intensity increasing with well-funded entrants', 'High entry multiple requires sustained growth', 'Payments product is early and unproven at scale'],
      redFlags: [],
      strongThesisPoints: ['Vertical SaaS in low-penetration market has significant TAM runway', 'Unit economics are exceptional (5.2x LTV/CAC, 14-month payback)', 'Net retention above 110% indicates strong product-market fit and expansion potential', 'Diversified customer base eliminates concentration risk', 'Payments can become a second growth engine with significant take rate upside'],
      modelAnswer: 'Invest. Beacon represents a classic vertical SaaS opportunity with exceptional unit economics and a long growth runway. The 15% software penetration rate in property management means significant TAM remains. Net revenue retention of 115% and LTV/CAC of 5.2x indicate strong product-market fit with room to expand wallet share. While the competitive environment is intensifying, Beacon\'s 800+ customer base and established integrations create meaningful switching costs. The payments product is an optionality kicker — even modest adoption could add 5-10% to growth. At 4.4x ARR for a Rule of 40 company growing 28% organically, the valuation is fair. Key diligence items: competitive win/loss rates, payments product unit economics, and customer churn by cohort.',
    },
  },
  {
    id: 'project-cascade',
    codename: 'Project Cascade',
    industry: 'Specialty Manufacturing',
    industryIcon: '🏭',
    difficulty: 'challenging',
    teaser: {
      companyOverview: 'Cascade manufactures precision-engineered components for aerospace and defense (A&D) end markets. The company operates two facilities and serves as a Tier 2 supplier to major A&D primes. Approximately 65% of revenue comes from defense programs with multi-year contracts, while 35% is commercial aerospace tied to narrowbody production rates. Cascade has been family-owned for 30 years and is selling for succession reasons.',
      financials: { revenue: '$220M LTM', ebitda: '$44M LTM', ebitdaMargin: '20%', revenueGrowth: '8% (3-year CAGR)', additionalMetrics: ['Backlog: $180M (10 months visibility)', 'CapEx: 7% of revenue'] },
      dealTerms: 'Sponsor acquiring at 9.5x LTM EBITDA. Family selling 100% with no rollover. 5x leverage available. Target: 20%+ IRR over 5 years.',
      keyConsiderations: [
        'Long-term defense contracts provide revenue visibility (10-month backlog)',
        'Aerospace recovery: narrowbody production rates returning to pre-COVID levels',
        'Single-source supplier on 3 critical defense programs',
        'Two aging facilities will require $25-30M combined CapEx over next 3 years',
        'No ERP system — runs on spreadsheets and tribal knowledge',
        'CEO (founder\'s son) departing post-close; COO willing to stay',
      ],
    },
    hiddenContext: {
      correctDecision: 'invest',
      keyRisks: ['Facility CapEx requirements ($25-30M) reduce near-term FCF', 'CEO departure and lack of systems create transition risk', 'Defense budget risk / contract re-compete risk', 'High capital intensity (7% CapEx/revenue)'],
      redFlags: ['No ERP system is unusual for a company this size and creates operational risk during transition'],
      strongThesisPoints: ['Single-source positions on defense programs create pricing power and high barriers to switching', 'Aerospace recovery provides secular tailwind', 'Operational improvement opportunity: ERP implementation, lean manufacturing, facility consolidation could expand margins 300-500bps', '9.5x for a defense supplier with 20% margins and 10-month backlog is reasonable', 'No rollover is a yellow flag but succession sale context makes it understandable'],
      modelAnswer: 'Invest, with conditions. Cascade has the hallmarks of a strong PE investment: mission-critical products (single-source on defense programs), contracted revenue, and meaningful operational improvement opportunity. The lack of ERP and aging facilities represent both risks and value creation levers — a PE owner can implement modern systems and optimize operations to expand margins from 20% to 23-25%. The 9.5x entry multiple is fair for defense-oriented manufacturing with this margin profile. Key risks to underwrite: (1) the CEO transition — need strong conviction in the COO, (2) the facility CapEx is real and must be modeled conservatively, (3) defense contract re-compete timelines during the hold period. The no-rollover is acceptable given succession context but would want strong management incentive alignment through option pool.',
    },
  },
  {
    id: 'project-delta',
    codename: 'Project Delta',
    industry: 'Consumer Retail',
    industryIcon: '🛍️',
    difficulty: 'moderate',
    teaser: {
      companyOverview: 'Delta is a fast-casual restaurant chain with 120 locations across the Midwest and South. The concept focuses on healthy, customizable bowls and wraps. The brand has strong consumer sentiment (4.5+ stars across locations) and has grown unit count 25% annually for the past three years, primarily through franchising (80 franchise / 40 corporate).',
      financials: { revenue: '$140M system-wide sales ($65M company-owned)', ebitda: '$12M LTM (company-operated + franchise fees)', ebitdaMargin: '18% on company revenue', revenueGrowth: '25% unit growth; 3% same-store sales growth' },
      dealTerms: 'Sponsor acquiring at 15x LTM EBITDA. Management rolling 25%. 4x leverage.',
      keyConsiderations: [
        '25% annual unit growth with pipeline of 30 signed franchise agreements',
        'Same-store sales growth of 3% — in line with industry but decelerating from 7% two years ago',
        'Franchise model provides asset-light growth with royalty income',
        'Food cost inflation running 8% YoY, partially offset by menu price increases',
        'Three franchisees (operating 35 locations) have expressed dissatisfaction with royalty structure',
        'CEO is charismatic founder; no clear #2 executive',
      ],
    },
    hiddenContext: {
      correctDecision: 'pass',
      keyRisks: ['15x EBITDA is aggressive for a restaurant concept with decelerating SSS', 'Food cost inflation squeezing margins', 'Franchise relationship issues could slow growth', 'Key man risk with founder CEO'],
      redFlags: ['Same-store sales decelerating from 7% to 3% suggests concept maturation', 'Franchisee dissatisfaction is a serious leading indicator — if 35 locations underperform or churn, pipeline value evaporates', '15x EBITDA entry on $12M requires enormous growth to generate PE returns'],
      strongThesisPoints: ['Recognition that SSS deceleration questions the growth narrative', 'Identification that franchisee dissatisfaction could impair the growth engine', 'Understanding that $12M EBITDA at 15x requires near-flawless execution', 'Noting the food cost inflation headwind without clear structural offset'],
      modelAnswer: 'Pass. While the Delta concept has consumer appeal and unit growth has been impressive, the risk/reward at 15x EBITDA on $12M is unfavorable. Same-store sales deceleration from 7% to 3% suggests the concept may be maturing, and food cost inflation is pressuring margins with limited pass-through ability in a competitive fast-casual market. Most critically, three franchisees operating 35 locations (29% of the system) are dissatisfied — this is a serious leading indicator that could impair the franchise growth engine that underpins the investment thesis. At 15x on a small EBITDA base, there is very little margin for error. Would need to see SSS stabilize above 5%, franchise issues resolved, and a lower entry multiple (10-12x) to reconsider.',
    },
  },
  {
    id: 'project-evergreen',
    codename: 'Project Evergreen',
    industry: 'Environmental Services',
    industryIcon: '♻️',
    difficulty: 'challenging',
    teaser: {
      companyOverview: 'Evergreen is a regional environmental services company providing hazardous waste disposal, site remediation, and environmental consulting to industrial customers. The company operates across 8 states with a fleet of 150 vehicles and 3 permitted waste transfer stations. 70% of revenue is recurring (maintenance contracts and compliance-driven services), with the remainder from project-based remediation work.',
      financials: { revenue: '$250M LTM', ebitda: '$50M LTM', ebitdaMargin: '20%', revenueGrowth: '10% (3-year CAGR)', additionalMetrics: ['Contract renewal rate: 94%', 'Fleet age: 4.2 years average'] },
      dealTerms: 'Sponsor acquiring at 10x LTM EBITDA. Management rolling 15%. 5.5x leverage. Active M&A pipeline with 8 identified targets at 5-7x.',
      keyConsiderations: [
        'High regulatory barriers to entry (permits take 3-5 years to obtain)',
        'Recurring compliance-driven demand with 94% renewal rate',
        'Active tuck-in acquisition pipeline in a fragmented market',
        'PFAS (forever chemicals) remediation is a growing $5B+ market',
        'Pending EPA regulation changes could expand addressable market 30%+',
        'Working capital intensive: DSO of 75 days, some government customers pay in 90-120 days',
      ],
    },
    hiddenContext: {
      correctDecision: 'invest',
      keyRisks: ['Working capital intensity limits FCF conversion', 'Project-based revenue (30%) is lumpy and less predictable', 'Environmental liability exposure from past work', 'Acquisition integration risk with 8 targets'],
      redFlags: [],
      strongThesisPoints: ['Regulatory moat through permits is genuine and durable', 'PFAS remediation is a massive secular tailwind with multi-decade runway', 'Recurring revenue base (70%) with 94% retention is high quality', 'Acquisition strategy at 5-7x with platform at 10x creates immediate value', 'Pending EPA regulation provides asymmetric upside'],
      modelAnswer: 'Invest. Evergreen represents a compelling platform investment with regulatory moat, secular tailwinds, and a clear buy-and-build value creation plan. The permit barriers (3-5 years) create a genuine competitive advantage that is difficult to replicate. PFAS remediation is a generational growth opportunity that is still in early innings, and pending EPA regulations provide meaningful upside optionality. The recurring revenue base (70% at 94% renewal) provides stability, while the M&A pipeline at 5-7x versus 10x platform multiple creates immediate accretion. Key diligence: environmental liability tail risk (request reps and insurance analysis), working capital cycle management, and integration capacity for the acquisition pipeline. The 5.5x leverage is supportable given the recurring revenue quality.',
    },
  },
  {
    id: 'project-falcon',
    codename: 'Project Falcon',
    industry: 'Financial Services',
    industryIcon: '🏦',
    difficulty: 'advanced',
    teaser: {
      companyOverview: 'Falcon is a specialty insurance managing general agent (MGA) focused on commercial liability lines. The company underwrites policies on behalf of 4 carrier partners and earns commission income plus profit-sharing on underwriting results. Falcon has built proprietary pricing algorithms using 10 years of claims data, resulting in loss ratios 800bps better than industry average.',
      financials: { revenue: '$95M (gross written premium: $400M)', ebitda: '$30M LTM', ebitdaMargin: '32%', revenueGrowth: '15% (3-year CAGR)', additionalMetrics: ['Loss ratio: 55% vs. 63% industry avg', 'Carrier partners: 4', 'Renewal rate: 88%'] },
      dealTerms: 'Sponsor acquiring at 16x LTM EBITDA. Founder rolling 40%. No leverage (typical for MGA transactions).',
      keyConsiderations: [
        'Proprietary pricing algorithms with 800bps loss ratio advantage',
        'Asset-light model with 95%+ FCF conversion',
        'Carrier partner concentration: top carrier represents 55% of GWP',
        'Founder (CEO) is the key relationship holder with all carrier partners',
        'Insurance cycle currently in hard market — favorable pricing environment',
        'Recent hire of CTO to modernize tech stack and expand into new commercial lines',
      ],
    },
    hiddenContext: {
      correctDecision: 'invest',
      keyRisks: ['Carrier concentration — 55% of GWP from one partner', 'Founder key man risk on carrier relationships', 'Hard market cycle will eventually turn, compressing premium growth', 'No leverage means all returns come from growth and multiple expansion'],
      redFlags: ['Carrier concentration is a real risk but mitigated by 40% founder rollover alignment'],
      strongThesisPoints: ['MGA model with proprietary data advantage is exceptionally valuable', 'Asset-light with 95%+ FCF conversion is rare in insurance', 'Founder rolling 40% provides strong alignment and de-risks the key man concern', 'Loss ratio advantage is structural (data-driven) not cyclical', '16x EBITDA is market for high-quality MGAs; justified by the margin profile and growth'],
      modelAnswer: 'Invest. Falcon is a high-quality MGA with genuine competitive advantages. The 800bps loss ratio improvement over industry is extraordinary and driven by proprietary data algorithms — this is structural, not cyclical. The asset-light model with 95%+ FCF conversion makes this an efficient compounder. While carrier concentration (55% from one partner) and founder key man risk are legitimate concerns, the 40% founder rollover meaningfully de-risks both — the founder is strongly incentivized to maintain relationships and diversify. The hard market tailwind will eventually moderate, but Falcon\'s underwriting advantage means it wins in both hard and soft markets. Key diligence: carrier contract terms and renewal mechanics, founder succession planning timeline, and claims reserve adequacy. At 16x with no leverage, returns depend on growth — need conviction in the commercial lines expansion and carrier diversification roadmap.',
    },
  },
  {
    id: 'project-granite',
    codename: 'Project Granite',
    industry: 'Business Services',
    industryIcon: '📋',
    difficulty: 'challenging',
    teaser: {
      companyOverview: 'Granite is a commercial testing and inspection company serving infrastructure, energy, and construction end markets. Services include materials testing, structural inspections, and environmental assessments. The company operates 25 labs and field offices across 6 states. Revenue is driven by infrastructure spending, with 40% tied to government-funded projects (DOT, municipal).',
      financials: { revenue: '$160M LTM', ebitda: '$28M LTM', ebitdaMargin: '17.5%', revenueGrowth: '12% (3-year CAGR)', additionalMetrics: ['Government backlog: $45M', 'Lab utilization: 72%'] },
      dealTerms: 'Sponsor acquiring at 9x LTM EBITDA. Management rolling 20%. 4.5x leverage. Identified $8M of run-rate cost synergies from lab consolidation.',
      keyConsiderations: [
        'Infrastructure Investment & Jobs Act provides multi-year federal funding tailwind',
        'Recurring testing mandated by building codes and regulations',
        'Lab utilization at 72% suggests room for margin improvement without incremental CapEx',
        'Fragmented market with 500+ regional players — strong tuck-in opportunity',
        '$8M identified cost synergies from consolidating overlapping labs',
        'Tight labor market for certified technicians — wage inflation running 6% annually',
      ],
    },
    hiddenContext: {
      correctDecision: 'invest',
      keyRisks: ['Labor cost inflation (6%) in a tight market for skilled technicians', 'Government project dependency (40%) subjects revenue to budget cycles', 'Cost synergies need validation — $8M on $28M EBITDA is aggressive'],
      redFlags: [],
      strongThesisPoints: ['Federal infrastructure spending provides unprecedented multi-year tailwind', 'Regulatory-mandated testing creates non-discretionary demand', 'Low lab utilization (72%) means margin expansion opportunity without CapEx', '9x entry for a services business with infrastructure tailwinds is fair', 'Tuck-in strategy in a 500+ player market is proven PE playbook'],
      modelAnswer: 'Invest. Granite is a well-positioned platform for a classic PE services roll-up. The federal infrastructure tailwind from IIJA provides multi-year revenue visibility rarely available in services businesses. Testing and inspection is regulatory-mandated, making demand non-discretionary — a highly attractive characteristic. The 72% lab utilization represents a clear margin improvement lever: additional volume drops through at high incremental margins. At 9x EBITDA, entry valuation is reasonable for a platform with these growth characteristics. Key diligence: validate the $8M synergy figure (seems aggressive at 29% of EBITDA), assess technician recruiting capacity to support growth, and confirm government project pipeline and contract terms. The labor inflation risk (6%) is manageable if revenue growth outpaces it, which infrastructure spending should enable.',
    },
  },
  {
    id: 'project-harbor',
    codename: 'Project Harbor',
    industry: 'Logistics',
    industryIcon: '🚛',
    difficulty: 'advanced',
    teaser: {
      companyOverview: 'Harbor is a temperature-controlled logistics company operating 12 cold storage warehouses and a fleet of 200 refrigerated trucks across the Eastern US. Customers include food manufacturers, grocery chains, and pharmaceutical distributors. The company has invested heavily in automation over the past 3 years, deploying robotic picking systems in 4 facilities.',
      financials: { revenue: '$320M LTM', ebitda: '$48M LTM', ebitdaMargin: '15%', revenueGrowth: '6% (3-year CAGR)', additionalMetrics: ['Warehouse occupancy: 88%', 'Fleet utilization: 79%', 'Top 5 customers: 45% of revenue'] },
      dealTerms: 'Sponsor acquiring at 12x LTM EBITDA. No management rollover — PE-backed sale from prior sponsor (4-year hold). 5x leverage.',
      keyConsiderations: [
        'Cold chain logistics is capacity-constrained nationally — barrier to entry through real estate and permitting',
        'Automation investments improving labor productivity 30% in deployed facilities',
        'Pharmaceutical cold chain is highest-growth segment (25% of revenue, growing 15%+)',
        'Top 5 customer concentration at 45% — largest customer is 18% of revenue',
        'Prior sponsor acquired at 8x four years ago; selling at 12x after limited organic growth',
        'Two warehouse leases expire in 18 months with landlord seeking 25% rent increases',
      ],
    },
    hiddenContext: {
      correctDecision: 'pass',
      keyRisks: ['Buying a secondary at 12x from a prior sponsor who bought at 8x — the easy value creation has been done', 'Lease renewal risk — 25% rent increases will directly compress margins', 'Customer concentration with 18% from one customer', 'Limited organic growth (6%) despite favorable industry dynamics suggests operational issues'],
      redFlags: ['Prior sponsor selling after limited organic growth at a 50% multiple markup — classic secondary pass-the-parcel risk', 'No management rollover from the exit means limited alignment and potentially flagging management fatigue', 'Lease expirations at 25% increases were likely known but not addressed by current sponsor'],
      strongThesisPoints: ['Recognition that secondary buyout dynamics inflate entry price', 'Identification of lease renewal risk as a near-term margin headwind', 'Questioning why organic growth was only 6% in a growing market', 'No management rollover is a significant red flag in a secondary context'],
      modelAnswer: 'Pass. While cold chain logistics has structural tailwinds, this specific deal has multiple red flags. The prior sponsor is exiting at 12x after buying at 8x with only 6% organic growth — this is a multiple arbitrage exit, not a value creation exit. The limited organic growth despite favorable industry dynamics (capacity-constrained, pharma tailwind) raises questions about operational execution or market position. No management rollover in a secondary context is concerning — if management doesn\'t want to re-invest, what do they know? Most immediately, the two warehouse lease expirations with 25% rent increases will directly compress EBITDA by $2-3M in the near term. At 12x on potentially peak margins, there\'s significant downside risk. Would need to see a lower entry multiple (9-10x) and management commitment to rollover to reconsider.',
    },
  },
];
