---
id: synergy-modeling-contribution-analysis
title: Synergy Modeling and Contribution Analysis
order: 5
estimated_minutes: 40
---

# Synergy Modeling and Contribution Analysis

## Learning Objectives

- Model revenue and cost synergies with realistic phase-in schedules
- Calculate synergies needed to break even on a dilutive deal
- Perform contribution analysis to assess deal fairness
- Understand synergy sources and how to validate estimates

## Written Guide

### Types of Synergies

Synergies are the value created by combining two companies that wouldn't exist if they remained separate.

**Cost Synergies** (more common, more achievable):
- Headcount reduction (redundant roles)
- Facility consolidation
- Procurement leverage (better supplier terms)
- IT systems consolidation
- Shared services (finance, HR, legal)

**Revenue Synergies** (less common, harder to achieve):
- Cross-selling products to each other's customers
- Geographic expansion
- Combined product offerings
- Pricing power from market share

**Financial Synergies**:
- Lower cost of debt (stronger combined credit)
- Tax savings (NOL utilization)
- Working capital optimization

### Synergy Phase-In

Synergies don't appear immediately. Model realistic ramp-up:

**Typical Phase-In Schedule**:

```calculation
title: Typical Synergy Phase-In Schedule
given:
  - "Cost Synergies: Year 1 25-50%, Year 2 75-100%, Year 3+ 100%"
  - "Revenue Synergies: Year 1 0-25%, Year 2 25-50%, Year 3+ 75-100%"
steps:
  - "Cost synergies can be actioned quickly (layoffs, facility closures)"
  - "Revenue synergies require integration, sales training, and customer adoption"
result: "Cost synergies ramp faster than revenue synergies"
```

**Why the Difference?**

Cost synergies can be actioned quickly (layoffs, facility closures). Revenue synergies require integration, sales training, and customer adoption—they take longer.

### Modeling Cost Synergies

**Step 1: Identify Sources**

```calculation
title: Cost Synergy Sources
given:
  - "Corporate overhead: Target $50M, Acquirer $80M"
  - "Sales force: Target $100M, Acquirer $150M"
  - "Facilities: Target $40M, Acquirer $60M"
  - "Procurement: Target $200M, Acquirer $400M"
  - "IT systems: Target $30M, Acquirer $50M"
steps:
  - "Corporate overhead: Combined $100M vs. $130M standalone = $30M synergy"
  - "Sales force: Combined $200M vs. $250M standalone = $50M synergy"
  - "Facilities: Combined $70M vs. $100M standalone = $30M synergy"
  - "Procurement: Combined $540M vs. $600M standalone = $60M synergy"
  - "IT systems: Combined $60M vs. $80M standalone = $20M synergy"
result: "Total Cost Synergies: $30M + $50M + $30M + $60M + $20M = $190M"
```

**Step 2: Apply Phase-In**

```calculation
title: Cost Synergy Phase-In
given:
  - "Full Run-Rate Synergies: $190M"
  - "Phase-In: 40% Year 1, 80% Year 2, 100% Year 3"
steps:
  - "Year 1 Realized Synergies: $190M x 40% = $76M"
  - "Year 2 Realized Synergies: $190M x 80% = $152M"
  - "Year 3 Realized Synergies: $190M x 100% = $190M"
result: "Full run-rate of $190M achieved by Year 3"
```

**Step 3: Account for Integration Costs**

Achieving synergies requires investment:

```calculation
title: Integration Costs
given:
  - "Severance: $40M (Year 1)"
  - "Facility closure costs: $20M (Year 1)"
  - "Systems integration: $30M (Years 1-2)"
  - "Rebranding: $10M (Year 1)"
steps:
  - "Year 1 costs: $40M + $20M + $15M + $10M = $85M"
  - "Year 2 costs: $15M (remaining systems integration)"
result: "Total Integration Costs: $100M"
note: "Rule of thumb - Integration costs often equal 50-100% of Year 1 run-rate synergies"
```

### Modeling Revenue Synergies

Revenue synergies are harder to quantify. Build from specific initiatives:

**Cross-Selling Analysis**:

```calculation
title: Revenue Synergy Cross-Selling Analysis
given:
  - "Sell Target products to Acquirer customers: 5% adoption, $10K avg"
  - "Sell Acquirer products to Target customers: 3% adoption, $15K avg"
  - "Combined solution premium: 2% price increase on 50% of combined revenue"
steps:
  - "Target products to Acquirer customers: 5% adoption x $10K avg = $25M"
  - "Acquirer products to Target customers: 3% adoption x $15K avg = $15M"
  - "Combined solution premium: 2% price increase on 50% of combined = $20M"
result: "Total Revenue Synergies: $25M + $15M + $20M = $60M"
```

Apply margin to get EBIT impact:
- If margin on incremental revenue is 30%
- EBIT synergy = $60M × 30% = $18M

### Synergies Needed to Break Even

A key analysis: how much in synergies are needed to make a dilutive deal neutral?

**Formula**:

```
Pre-Tax Synergies Needed = (Dilution × Pro Forma Shares) / (1 - Tax Rate)
```

**Example**:
- Deal is $0.15 dilutive
- Pro forma shares: 260M
- Tax rate: 25%

```
Total After-Tax Dilution = $0.15 × 260M = $39M
Pre-Tax Synergies Needed = $39M / (1 - 0.25) = $52M
```

The deal needs $52M in annual pre-tax synergies to break even on EPS.

**Is This Achievable?**

Compare to:
- Management's synergy estimate
- Peer transaction synergies (as % of combined EBITDA)
- Specific identified initiatives

If management claims $150M of synergies, and you only need $52M to break even, there's significant cushion.

### Contribution Analysis

**Contribution analysis** compares what each company brings to the combination versus what shareholders receive.

**The Question**: Is the ownership split fair given each company's contribution?

**Key Metrics to Compare**:

```calculation
title: Contribution Analysis - Key Metrics
given:
  - "Acquirer Revenue: $5,000M"
  - "Target Revenue: $1,000M"
  - "Acquirer EBITDA: $1,200M"
  - "Target EBITDA: $200M"
  - "Acquirer Net Income: $713M"
  - "Target Net Income: $90M"
  - "Acquirer Enterprise Value (pre-deal standalone): $12,000M"
  - "Target Enterprise Value (pre-deal standalone): $5,000M"
steps:
  - "Revenue Contribution: Acquirer 83%, Target 17%"
  - "EBITDA Contribution: Acquirer 86%, Target 14%"
  - "Net Income Contribution: Acquirer 89%, Target 11%"
  - "Enterprise Value Contribution: Acquirer 71%, Target 29%"
result: "Target contributes 11-29% across metrics depending on measure used"
```

**Ownership Analysis**:

```calculation
title: Pro Forma Ownership Analysis
given:
  - "Acquirer shareholders: 200M shares"
  - "Target shareholders: 60M shares (new shares from exchange ratio)"
steps:
  - "Total pro forma shares: 200M + 60M = 260M"
  - "Acquirer ownership: 200M / 260M = 77%"
  - "Target ownership: 60M / 260M = 23%"
result: "Acquirer shareholders own 77%, Target shareholders own 23%"
```

**Interpretation**:

Target shareholders receive 23% of the combined company but contribute:
- 17% of revenue
- 14% of EBITDA
- 11% of net income
- 29% of enterprise value

The target is receiving **more ownership than its earnings contribution** but **less than its value contribution**. This could suggest:
- The premium is reasonable (paying for value, not just earnings)
- Or the acquirer is overpaying (ownership > contribution across most metrics)

### Using Contribution Analysis in Negotiations

**If You're Advising the Target**:
- Emphasize metrics where target contributes more than ownership received
- "We're contributing 17% of revenue but only getting 23% ownership"
- Argue for higher premium or exchange ratio

**If You're Advising the Acquirer**:
- Emphasize metrics where target contributes less than ownership received
- "Target contributes only 11% of net income but gets 23% ownership"
- Argue for lower premium

### Synergy Attribution

Who "owns" the synergies? This affects fairness analysis.

**If synergies attributed to combined company**:
- Neither side "owns" them pre-deal
- Just compare standalone contributions

**If synergies split proportionally**:
- Add synergy value to each side based on contribution
- Then compare ownership to adjusted contributions

**Example**:

$150M of synergies valued at 6× = $900M synergy value

```calculation
title: Synergy Attribution Analysis
given:
  - "Acquirer Standalone Value: $12,000M"
  - "Target Standalone Value: $5,000M"
  - "Total Synergy Value: $900M ($150M x 6x multiple)"
  - "Synergy Attribution: 75% Acquirer / 25% Target (based on EBITDA contribution)"
steps:
  - "Acquirer Synergy Share: $900M x 75% = $675M"
  - "Target Synergy Share: $900M x 25% = $225M"
  - "Acquirer Total Value: $12,000M + $675M = $12,675M (74% of total)"
  - "Target Total Value: $5,000M + $225M = $5,225M (26% of total)"
result: "Target contributes 26% of value including synergies but receives 23% ownership - slightly favorable to acquirer"
```

### Sensitivity: Synergies vs. Accretion

Build a sensitivity table showing how synergies affect accretion:

```calculation
title: "Sensitivity: Synergies vs. Accretion"
given:
  - "Synergy levels tested: $0, $75M, $150M, $225M"
  - "Years analyzed: Year 1, Year 2, Year 3"
steps:
  - "$0 Synergies: (20%) Year 1, (18%) Year 2, (16%) Year 3"
  - "$75M Synergies: (12%) Year 1, (8%) Year 2, (5%) Year 3"
  - "$150M Synergies: (4%) Year 1, 2% Year 2, 6% Year 3"
  - "$225M Synergies: 4% Year 1, 12% Year 2, 18% Year 3"
result: "Deal becomes accretive by Year 2 with $150M+ in synergies"
note: "This shows management and boards how sensitive the deal is to synergy delivery"
```

### Validating Synergy Estimates

Synergy estimates are often aggressive. Validate by:

**Peer Comparisons**:
- What did similar deals achieve?
- Synergies as % of combined EBITDA (typically 3-10%)

**Bottom-Up Build**:
- Specific initiatives with identified savings
- Headcount × average cost
- Facilities × annual expense

**Management Track Record**:
- Has this management team delivered synergies before?
- How did their estimates compare to actual results?

**Third-Party Validation**:
- Consultant estimates
- Customer/supplier interviews
- Industry expert opinions

## Video Placeholder

**Video Title**: Synergy Modeling and Contribution Analysis

**Outline**:
- Types of synergies: cost, revenue, financial
- Building synergy estimates with phase-in schedules
- Integration costs and payback
- Calculating synergies needed to break even
- Contribution analysis framework
- Using contribution analysis in negotiations
- Validating synergy estimates

**Suggested Length**: 20 minutes

## Key Takeaways

- Cost synergies (headcount, facilities, procurement) are more achievable than revenue synergies
- Phase in synergies realistically: cost synergies faster, revenue synergies slower
- Integration costs often equal 50-100% of Year 1 run-rate synergies
- Break-even synergies = (Dilution × Shares) / (1 - Tax Rate)
- Contribution analysis compares what each company contributes vs. ownership received
- Use contribution analysis to support or challenge the proposed deal terms
- Validate synergies through peer comparisons, bottom-up builds, and management track records
- Sensitivity tables show how synergy delivery affects accretion—important for board discussions
