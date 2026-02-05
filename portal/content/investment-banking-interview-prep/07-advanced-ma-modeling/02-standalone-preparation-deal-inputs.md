---
id: standalone-preparation-deal-inputs
title: Standalone Preparation and Deal Inputs
order: 2
estimated_minutes: 40
---

# Standalone Preparation and Deal Inputs

## Learning Objectives

- Prepare acquirer and target standalone financial models for merger analysis
- Set up comprehensive transaction assumptions
- Build a sources and uses table
- Structure financing alternatives and scenarios

## Written Guide

### Preparing Standalone Models

Before any merger analysis, you need working financial models for both companies:

**Acquirer Standalone Model**:
- 3-5 years of historical financials
- 5+ years of projected financials
- Fully integrated three statements
- Key metrics: revenue growth, margins, working capital, CapEx

**Target Standalone Model**:
- Same structure as acquirer
- Often less detailed (especially if target is private or smaller)
- May need to normalize for one-time items
- Key metrics same as acquirer

**Why "Standalone"?**

These models show each company's performance assuming no deal happens. The merger analysis compares combined results to these standalone projections.

### Normalizing the Target

Before acquisition analysis, normalize the target's financials:

**Remove One-Time Items**:
- Restructuring charges
- Litigation settlements
- Unusual gains/losses
- Non-recurring revenue

**Adjust for Owner-Specific Items** (private companies):
- Above-market owner compensation
- Personal expenses run through the business
- Related-party transactions at non-market rates

**Pro Forma Adjustments**:
- What would financials look like under new ownership?
- Remove costs that will be eliminated (redundant overhead)
- Adjust for required investments

### Transaction Assumptions Section

Create a dedicated section with all deal inputs:

**Purchase Price Assumptions**

```calculation
title: Purchase Price Assumptions
given:
  - "Offer Price per Share: $45.00"
  - "Target Shares Outstanding: 100M"
  - "Current Share Price: $36.00"
steps:
  - "Implied Equity Value: $45.00 x 100M = $4,500M"
  - "Target Net Debt: $500M"
  - "Implied Enterprise Value: $4,500M + $500M = $5,000M"
result: "Premium to Current: ($45.00 - $36.00) / $36.00 = 25.0%"
```

**Consideration Mix**

```calculation
title: Consideration Mix
given:
  - "Total Consideration: $4,500M"
steps:
  - "Cash: $2,250M (50%)"
  - "Stock: $2,250M (50%)"
result: "Total Consideration: $4,500M (100%)"
```

**Stock Consideration Details**

```calculation
title: Stock Consideration Details
given:
  - "Acquirer Share Price: $75.00"
  - "Target Shares Outstanding: 100M"
steps:
  - "Exchange Ratio: $45.00 / $75.00 = 0.60x (target shareholders get 0.60 acquirer shares per target share)"
result: "New Shares Issued: 100M target shares x 0.60 = 60M"
```

**Financing Assumptions**

```calculation
title: Financing Assumptions
given:
  - "Revolver: $250M at SOFR + 200, 5 years"
  - "Term Loan: $1,500M at SOFR + 250, 7 years"
  - "Senior Notes: $500M at 6.5% fixed, 10 years"
steps:
  - "Total Debt Raised: $250M + $1,500M + $500M = $2,250M"
result: "Financing structured across three tranches with varying rates and terms"
```

**Fee Assumptions**

```calculation
title: Fee Assumptions
given:
  - "Advisory Fees: 1.0% of EV"
  - "Debt Financing Fees: 2.0% of debt raised"
  - "Legal & Other: $15M"
steps:
  - "Advisory Fees: 1.0% x $5,000M = $50M"
  - "Debt Financing Fees: 2.0% x $2,250M = $45M"
result: "Total Fees: $50M + $45M + $15M = $110M"
```

**Synergy Assumptions**

```calculation
title: Synergy Assumptions
given:
  - "Cost Synergies: $150M annually, Phase-In 50% Year 1, 100% Year 2+"
  - "Revenue Synergies: $50M annually, Phase-In 0% Year 1, 50% Year 2, 100% Year 3+"
  - "Integration Costs: ($75M), 100% Year 1"
steps:
  - "Year 1 Net Synergies: ($150M x 50%) + ($50M x 0%) - $75M = $0M"
  - "Year 2 Net Synergies: ($150M x 100%) + ($50M x 50%) = $175M"
  - "Year 3+ Net Synergies: ($150M x 100%) + ($50M x 100%) = $200M"
result: "Full Run-Rate Synergies: $200M annually (Year 3+)"
```

### Building the Sources and Uses Table

The sources and uses table shows where money comes from and where it goes:

**Uses of Funds**

```calculation
title: Uses of Funds
given:
  - "Purchase Equity Value: $4,500M"
  - "Refinance Target Debt: $500M"
steps:
  - "Advisory Fees: $50M"
  - "Debt Financing Fees: $45M"
  - "Other Fees: $15M"
result: "Total Uses: $4,500M + $500M + $50M + $45M + $15M = $5,110M"
```

**Sources of Funds**

```calculation
title: Sources of Funds
given:
  - "Acquirer Cash: $360M"
  - "New Term Loan: $1,500M"
  - "New Senior Notes: $500M"
steps:
  - "New Equity (Stock Issued): $2,250M"
  - "Revolver Draw: $500M"
result: "Total Sources: $360M + $1,500M + $500M + $2,250M + $500M = $5,110M"
```

**Critical Check**: Sources = Uses (always!)

### Sources and Uses: Key Decisions

**Cash vs. Stock**

The mix of cash and stock affects:
- Accretion/dilution (more cash = more accretive if acquirer's P/E > target's)
- Risk to acquirer shareholders (cash is certain; stock value may change)
- Target shareholder participation in upside
- Acquirer's leverage and credit profile

**Debt Capacity**

How much debt can the combined company support? Consider:
- Pro forma leverage (Debt/EBITDA)
- Interest coverage (EBITDA/Interest)
- Rating agency thresholds
- Covenant headroom

**Refinancing Target Debt**

Often, acquirer refinances target's existing debt because:
- Change of control triggers acceleration
- Acquirer can get better rates
- Simplifies capital structure

If not refinancing, the target's debt stays on the combined balance sheet.

### Structuring Scenarios

Build flexibility to toggle between scenarios:

**Scenario 1: All Cash**
- Maximum debt, no new equity
- Highest accretion (no share dilution)
- Highest leverage risk

**Scenario 2: All Stock**
- No new debt, 100% stock
- No balance sheet impact from debt
- Maximum share dilution

**Scenario 3: 50/50 Mix**
- Balanced approach
- Moderate accretion and moderate leverage

**Scenario Toggle**

Create a dropdown that changes the mix:

```
=IF(Scenario="All Cash", CashAmount, IF(Scenario="50/50", CashAmount/2, 0))
```

### Exchange Ratio Mechanics

In a stock deal, the **exchange ratio** determines how many acquirer shares target shareholders receive:

```
Exchange Ratio = Offer Price per Target Share / Acquirer Share Price
```

**Example**:
- Offer: $45 per target share
- Acquirer price: $75
- Exchange Ratio: $45 / $75 = 0.60×

Each target shareholder gets 0.60 acquirer shares for each target share they own.

**Fixed vs. Floating Exchange Ratio**

```calculation
title: Fixed vs. Floating Exchange Ratio
given:
  - "Fixed: Ratio stays constant regardless of acquirer price changes"
  - "Floating: Ratio adjusts to maintain fixed value"
  - "Collar: Ratio floats within a range, fixed outside"
steps:
  - "Fixed Risk Allocation: Target bears acquirer stock risk"
  - "Floating Risk Allocation: Acquirer bears its own stock risk"
  - "Collar Risk Allocation: Shared risk"
result: "Choice depends on which party bears stock price volatility risk"
```

### Tax Considerations (Overview)

The deal structure affects tax treatment:

**Stock Deal (Tax-Free Reorganization)**:
- Target shareholders don't recognize gain immediately
- Deferred tax until they sell acquirer shares
- Must meet IRS requirements for "reorganization"

**Cash Deal (Taxable)**:
- Target shareholders recognize gain immediately
- Target shareholders pay capital gains tax
- May require higher premium to compensate

**Mixed Consideration**:
- Cash portion is taxable
- Stock portion may be tax-deferred

### Premium Analysis

Analyze the premium being paid:

**Premium to Current Price**: Most common reference point
```
Premium = (Offer Price - Current Price) / Current Price
```

**Premium to 52-Week High**: Shows premium to recent peak
**Premium to Analyst Target**: Premium to consensus value
**Premium to DCF Value**: Premium to intrinsic value estimate

**Typical Premiums**:
- 20-40% is common for strategic deals
- Higher for hostile or competitive situations
- Lower for distressed targets

### Sensitivity: Purchase Price vs. Financing Mix

Build a table showing how different combinations affect outcomes:

```calculation
title: "Sensitivity: Purchase Price vs. Financing Mix"
given:
  - "Offer prices tested: $40, $45, $50"
  - "Financing structures tested: 100% Cash, 50/50 Mix, 100% Stock"
steps:
  - "$40 Offer: 5% accretive (100% Cash), 3% accretive (50/50), 1% dilutive (100% Stock)"
  - "$45 Offer: 2% accretive (100% Cash), Neutral (50/50), 3% dilutive (100% Stock)"
  - "$50 Offer: 1% dilutive (100% Cash), 3% dilutive (50/50), 6% dilutive (100% Stock)"
result: "Higher price and more stock = more dilutive; lower price and more cash = more accretive"
note: "This shows the tradeoff between price and structure"
```

## Video Placeholder

**Video Title**: Setting Up Transaction Assumptions and Sources & Uses

**Outline**:
- Preparing standalone models for acquirer and target
- Normalizing target financials
- Transaction assumptions: price, premium, consideration mix
- Building the sources and uses table
- Financing structure decisions
- Exchange ratio mechanics
- Scenario analysis setup

**Suggested Length**: 20 minutes

## Key Takeaways

- Standalone models for both companies are prerequisites—these show "no deal" performance
- Normalize target financials by removing one-time items and owner-specific costs
- Transaction assumptions include price, premium, consideration mix, financing terms, synergies, and fees
- Sources and Uses table must balance: equity value + fees + refi = cash + debt + stock
- Cash deals are more accretive but increase leverage; stock deals dilute but preserve balance sheet
- Exchange ratio = Offer Price / Acquirer Price; determines new shares issued
- Build scenario flexibility to compare all-cash, all-stock, and mixed structures
- Premium analysis compares offer price to current price, 52-week high, and intrinsic value
