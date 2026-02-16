---
id: ma-accretion-dilution
title: M&A Accretion/Dilution Analysis
order: 7
estimated_minutes: 50
---

# M&A Accretion/Dilution Analysis

## Learning Objectives

- Explain what accretion and dilution mean in the context of an M&A transaction
- Calculate pro forma EPS to determine whether a deal is accretive or dilutive
- Understand the factors that drive accretion or dilution (P/E, cost of financing, synergies)
- Calculate synergies needed to break even on a dilutive deal
- Perform contribution analysis to assess deal fairness
- Construct a pro forma balance sheet with purchase accounting adjustments
- Answer interview questions involving accretion/dilution scenarios

## Written Guide

### What Is Accretion/Dilution?

In an M&A transaction, **accretion** and **dilution** refer to the impact of the deal on the acquirer's **earnings per share (EPS)**.

- **Accretive**: The deal increases the acquirer's EPS
- **Dilutive**: The deal decreases the acquirer's EPS
- **Neutral**: EPS remains unchanged

Accretion/dilution analysis is a key output in merger models and is often a factor in whether a deal is attractive to the acquirer's shareholders.

### Why Accretion/Dilution Matters

Acquirer management and boards care about EPS because:

- **Stock price sensitivity**: EPS is a key driver of stock prices (through P/E multiples)
- **Shareholder perception**: Dilutive deals can be unpopular with investors, even if they create long-term value
- **Executive compensation**: Management incentives are often tied to EPS targets

However, **accretion/dilution isn't the same as value creation**. A deal can be accretive but destroy value (e.g., overpaying for a target), or dilutive but create value (e.g., a strategic acquisition that pays off over time).

### The Accretion/Dilution Framework

To determine whether a deal is accretive or dilutive:

1. **Calculate the acquirer's standalone EPS** (without the deal)
2. **Calculate the target's earnings contribution** (net income the acquirer will gain)
3. **Account for the cost of the acquisition** (interest on debt or dilution from issuing stock)
4. **Calculate pro forma EPS** (combined company EPS after the deal)
5. **Compare**: If pro forma EPS > standalone EPS, the deal is accretive. If pro forma EPS < standalone EPS, it's dilutive.

### Step-by-Step Example: All-Cash Deal

**Acquirer**:
- Net income: $100M
- Shares outstanding: 50M
- EPS: $100M / 50M = $2.00

**Target**:
- Net income: $20M
- Purchase price: $300M (all cash, financed with debt at 5% interest)

**Step 1: Standalone EPS**

Acquirer EPS = $2.00

**Step 2: Target's earnings contribution**

Target contributes $20M in net income.

**Step 3: Cost of acquisition**

Interest expense on $300M debt at 5% = $15M/year

After-tax interest expense (assume 25% tax rate) = $15M × (1 - 0.25) = $11.25M

**Step 4: Pro forma net income**

Pro Forma Net Income = Acquirer NI + Target NI - After-Tax Interest

= $100M + $20M - $11.25M = $108.75M

**Step 5: Pro forma EPS**

Shares outstanding remain 50M (no new shares issued in a cash deal).

Pro Forma EPS = $108.75M / 50M = $2.175

**Accretion/Dilution**:

Pro Forma EPS ($2.175) > Standalone EPS ($2.00)

The deal is **accretive by $0.175 per share**, or 8.75%.

### Step-by-Step Example: All-Stock Deal

**Acquirer**:
- Net income: $100M
- Shares outstanding: 50M
- Stock price: $40
- EPS: $2.00

**Target**:
- Net income: $20M
- Purchase price: $300M (all stock)

**Step 1: Calculate shares issued**

Shares issued = Purchase Price / Acquirer Stock Price = $300M / $40 = 7.5M shares

**Step 2: Pro forma net income**

No debt is issued, so there's no interest expense.

Pro Forma Net Income = $100M + $20M = $120M

**Step 3: Pro forma shares outstanding**

Pro Forma Shares = 50M + 7.5M = 57.5M

**Step 4: Pro forma EPS**

Pro Forma EPS = $120M / 57.5M = $2.087

**Accretion/Dilution**:

Pro Forma EPS ($2.087) > Standalone EPS ($2.00)

The deal is **accretive by $0.087 per share**, or 4.35%.

### What Drives Accretion or Dilution?

**P/E Ratio Comparison**:

If the acquirer's P/E ratio is **higher** than the target's P/E ratio, the deal is more likely to be accretive (the acquirer is using "expensive" stock to buy "cheap" earnings).

If the acquirer's P/E is **lower** than the target's, the deal is more likely to be dilutive.

**Cost of Financing**:

- **Cash (debt-financed)**: The cost is the after-tax interest rate. If the target's earnings yield exceeds the after-tax cost of debt, the deal is likely accretive.
- **Stock**: The cost is the dilution from issuing new shares. If the acquirer's P/E is high, stock is "cheaper" (less dilution per dollar).

**Synergies**:

Cost synergies (reducing combined expenses) or revenue synergies (increasing combined revenue) improve pro forma earnings and increase accretion.

### Synergies Needed to Break Even

A key interview question is: "How much in synergies would be needed for this deal to break even?" This asks what level of synergies would make a dilutive deal neutral (pro forma EPS = standalone EPS).

**Calculation**:

Synergies Needed = Dilution Amount × Shares Outstanding / (1 - Tax Rate)

**Example**:
- Deal is dilutive by $0.10 per share
- Acquirer has 50M shares outstanding
- Tax rate: 25%

Total after-tax dilution = $0.10 × 50M = $5M

Pre-tax synergies needed = $5M / (1 - 0.25) = $6.67M

The deal needs $6.67M in annual pre-tax synergies (cost savings or revenue improvements) to break even on EPS.

**Why This Matters**: Management often presents synergy estimates to justify a dilutive deal. Analysts test whether those synergies are realistic by calculating the breakeven threshold.

### Contribution Analysis

**Contribution analysis** examines what percentage each company contributes to the combined entity across various metrics. It helps assess whether the deal terms (ownership split) are fair.

**Key Metrics to Compare**:
- Revenue contribution
- EBITDA contribution
- Net income contribution
- Enterprise value contribution

**Example**:

```calculation
title: "Contribution Analysis: Acquirer vs. Target"
given:
  - "Revenue: Acquirer $500M, Target $200M"
  - "EBITDA: Acquirer $100M, Target $50M"
  - "Net Income: Acquirer $60M, Target $25M"
steps:
  - "Revenue Contribution: Acquirer 71%, Target 29%"
  - "EBITDA Contribution: Acquirer 67%, Target 33%"
  - "Net Income Contribution: Acquirer 71%, Target 29%"
result: "Target contributes 29-33% of combined earnings across key metrics"
note: "If target shareholders receive 25% ownership but contribute 29-33% of earnings, they may be undervalued in the deal terms"
```

If the target's shareholders receive 25% of the combined company's equity but contribute 29-33% of earnings, they may be "undervalued" in the deal terms. This analysis supports negotiation on exchange ratios.

**Interview Application**: "The target contributes 30% of combined EBITDA but is receiving 20% ownership—this suggests the target's shareholders are getting a below-fair deal, or the acquirer is paying a low premium."

### Pro Forma Balance Sheet

In a full merger model, you construct a **pro forma balance sheet** showing the combined company immediately after the transaction closes. This is critical for understanding the new capital structure and any leverage constraints.

**Pro Forma Balance Sheet Construction**:

1. **Start with both companies' balance sheets** at fair value
2. **Add deal adjustments**:
   - Cash used for purchase (reduces acquirer's cash)
   - New debt raised (increases liabilities)
   - New shares issued (increases equity)
   - Transaction fees (reduce cash or retained earnings)
3. **Purchase price allocation**:
   - Write up/down target's assets to fair value
   - Record identifiable intangibles
   - Record goodwill (residual)
4. **Eliminate target's equity** (replaced by purchase price)
5. **Add Non-Controlling Interest** if partial acquisition

**Example Pro Forma Adjustments**:

```calculation
title: "Pro Forma Balance Sheet Adjustments"
given:
  - "Acquirer Cash: $200M"
  - "Target Cash: $50M"
  - "Deal Price: $300M (funded with $200M new debt + $100M stock)"
  - "Fair Value Adjustment on PP&E: +$20M"
  - "Goodwill Created: $180M"
steps:
  - "Cash: Acquirer $200M + Target $50M - $300M deal + $200M debt = $150M"
  - "PP&E: Acquirer $400M + Target $100M + $20M FV adj = $520M"
  - "Goodwill: Acquirer $50M + Target $0 + $180M new = $230M"
  - "Total Assets: $900M"
  - "Debt: Acquirer $100M + Target $50M + $200M new = $350M"
  - "Equity: Acquirer $550M + Target ($100M eliminated) + $100M stock issued = $550M"
result: "Pro Forma Total Assets = $900M, Debt = $350M, Equity = $550M"
note: "Leverage ratios, financing constraints, and balance sheet strength must be assessed on the pro forma balance sheet"
```

**Why It Matters**:
- **Leverage ratios**: Lenders and rating agencies assess Debt/EBITDA on the pro forma balance sheet
- **Financing constraints**: Some deals are constrained by how much debt the combined company can support
- **Balance sheet strength**: Acquirers want to ensure sufficient liquidity and manageable debt post-close

### Interview Question: "Is a Deal More Likely to Be Accretive with Cash or Stock?"

The answer depends on the **cost of financing**:

- **Cash (debt)**: If the acquirer can borrow at a low after-tax rate (e.g., 4%) and the target's earnings yield is higher, cash is more accretive.
- **Stock**: If the acquirer's P/E is very high (stock is "expensive"), using stock can be more accretive because less dilution is required.

**General rule**: If the acquirer's P/E > target's P/E, stock is likely more accretive. If the after-tax cost of debt < target's earnings yield, cash is likely more accretive.

### Common Mistakes

**Confusing accretion with value creation**: A deal can be accretive due to financial engineering (low cost of debt, high P/E) but still overpay for the target and destroy value.

**Forgetting the tax shield on interest**: Interest expense reduces taxes, so the effective cost is after-tax.

**Not accounting for synergies**: Synergies improve pro forma earnings and make deals more accretive.

**Using the wrong share count**: In a stock deal, the acquirer's share count increases by the shares issued to the target's shareholders.

