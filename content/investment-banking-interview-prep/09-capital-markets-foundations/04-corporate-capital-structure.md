---
id: corporate-capital-structure
title: Corporate Capital Structure
order: 4
estimated_minutes: 40
---

# Corporate Capital Structure

## Learning Objectives

- Understand what determines a company's optimal capital structure
- Calculate and interpret WACC in the context of capital structure decisions
- Analyze how leverage affects value, returns, and risk
- Apply capital structure concepts to real-world financing decisions

## Written Guide

### What Is Capital Structure?

**Capital structure** refers to the mix of debt and equity a company uses to finance its operations and growth. It's typically expressed as:

- Debt-to-Equity Ratio (D/E)
- Debt-to-Total Capitalization (D/(D+E))
- Net Debt / EBITDA

The central question: What's the right balance between debt and equity?

### The Capital Structure Debate

**Modigliani-Miller Theorem (1958)**: In a perfect world (no taxes, no bankruptcy costs, perfect information), capital structure doesn't matter. Value comes from assets, not how they're financed.

**Reality**: Taxes, bankruptcy costs, and other frictions make capital structure very much matter.

**Trade-Off Theory**: Optimal capital structure balances:
- **Benefits of debt**: Tax shield, discipline
- **Costs of debt**: Financial distress, bankruptcy risk

### The Tax Shield Benefit

Debt creates value through the tax shield:

```
Value of Tax Shield = Debt × Tax Rate (simplified, perpetual debt)
```

**Example**:
- Company with $500M debt
- Tax rate: 25%
- Tax Shield Value ≈ $500M × 25% = $125M

This suggests adding debt increases company value—up to a point.

### Costs of Financial Distress

Too much debt creates costs:

**Direct Costs**:
- Legal and administrative fees in bankruptcy
- Advisor fees (restructuring, legal)

**Indirect Costs** (often larger):
- Customers avoid distressed companies (warranty concerns)
- Suppliers demand cash payment
- Employees leave for more stable firms
- Management distracted from operations
- Forced asset sales at unfavorable prices

### Optimal Capital Structure

The **optimal capital structure** maximizes firm value by balancing tax benefits against distress costs:

```
Firm Value = Unlevered Value + PV(Tax Shield) - PV(Distress Costs)
```

**Visualization**:

At low debt: Adding debt increases value (tax shield > distress costs)
At high debt: Adding debt decreases value (distress costs > tax shield)
Optimal: Where marginal benefit = marginal cost

### WACC and Capital Structure

**Weighted Average Cost of Capital (WACC)** is minimized at the optimal capital structure:

```
WACC = (E/V) × Re + (D/V) × Rd × (1-T)
```

Where:
- E/V = Equity weight
- D/V = Debt weight
- Re = Cost of equity
- Rd = Cost of debt
- T = Tax rate

**How Leverage Affects WACC**:

As debt increases:
- Debt weight increases (lower cost component)
- But cost of equity increases (higher financial risk)
- And cost of debt increases (higher credit risk)

**Initially**: WACC decreases as cheap debt replaces expensive equity
**Eventually**: WACC increases as distress risk drives up costs
**Optimal**: WACC is minimized

### Leverage and Equity Returns

Leverage amplifies returns (good and bad):

**Unlevered Company**:

```calculation
title: "Unlevered Company Returns"
given:
  - "Equity: $1B"
  - "Debt: $0"
  - "Tax Rate: 25%"
steps:
  - "Good Scenario: EBIT = $150M, Net Income = $113M, ROE = 11.3%"
  - "Expected Scenario: EBIT = $100M, Net Income = $75M, ROE = 7.5%"
  - "Bad Scenario: EBIT = $50M, Net Income = $38M, ROE = 3.8%"
result: "ROE ranges from 3.8% to 11.3% with no leverage"
note: "Assumes $1B equity, 25% tax rate"
```

**Levered Company** (50% debt at 6%):

```calculation
title: "Levered Company Returns (50% Debt at 6%)"
given:
  - "Equity: $500M"
  - "Debt: $500M at 6%"
  - "Interest Expense: $30M"
  - "Tax Rate: 25%"
steps:
  - "Good Scenario: EBIT = $150M, Interest = $30M, Pre-Tax = $120M, Net Income = $90M, ROE = 18.0%"
  - "Expected Scenario: EBIT = $100M, Interest = $30M, Pre-Tax = $70M, Net Income = $53M, ROE = 10.5%"
  - "Bad Scenario: EBIT = $50M, Interest = $30M, Pre-Tax = $20M, Net Income = $15M, ROE = 3.0%"
result: "ROE ranges from 3.0% to 18.0% — leverage amplifies both upside and downside"
note: "Assumes $500M equity, $500M debt"
```

**Observations**:
- Expected ROE higher with leverage (10.5% vs. 7.5%)
- Good scenario: much higher ROE (18% vs. 11.3%)
- Bad scenario: much lower ROE (3% vs. 3.8%)

**Leverage amplifies both upside and downside.**

### Factors Affecting Optimal Capital Structure

**Industry Characteristics**:

```calculation
title: "Industry Characteristics and Debt Capacity"
given:
  - "Category: Factor and Implication for Debt"
steps:
  - "Stable cash flows: Can support more debt"
  - "Tangible assets: Better collateral, more debt"
  - "High growth: Need flexibility, less debt"
  - "Cyclical industry: More volatility, less debt"
result: "Stable cash flows and tangible assets increase debt capacity; growth and cyclicality reduce it"
```

**Company-Specific Factors**:

```calculation
title: "Company-Specific Factors Affecting Capital Structure"
given:
  - "Category: Factor and Implication"
steps:
  - "Profitability: Profitable = tax shield valuable"
  - "Asset tangibility: More tangible = more debt capacity"
  - "Growth opportunities: High growth = less debt (flexibility needed)"
  - "Management attitude: Conservative vs. aggressive"
result: "Company-specific factors like profitability, assets, growth, and management style shape optimal leverage"
```

**Market Conditions**:
- Low interest rates → debt more attractive
- High equity valuations → equity cheaper
- Credit market conditions → availability of debt

### Industry Capital Structure Norms

Capital structure varies significantly by industry:

```calculation
title: "Industry Capital Structure Norms"
given:
  - "Category: Industry, Typical D/E, Rationale"
steps:
  - "Utilities: 1.0-1.5x D/E — Stable cash flows, regulated"
  - "REITs: 0.5-1.0x D/E — Hard assets, predictable income"
  - "Industrials: 0.3-0.6x D/E — Cyclical, moderate leverage"
  - "Technology: 0-0.2x D/E — High growth, intangible assets"
  - "Pharmaceuticals: 0.1-0.3x D/E — R&D intensive, uncertain outcomes"
result: "Utilities carry the most debt; technology the least — driven by cash flow stability and asset tangibility"
```

### Credit Ratings and Capital Structure

**Credit ratings** constrain capital structure choices:

```calculation
title: "Credit Ratings and Leverage Levels"
given:
  - "Category: Rating, D/EBITDA, Description"
steps:
  - "AAA/AA: <1.0x D/EBITDA — Minimal debt, maximum flexibility"
  - "A: 1.0-2.0x D/EBITDA — Low leverage, strong credit"
  - "BBB: 2.0-3.5x D/EBITDA — Investment grade floor"
  - "BB: 3.5-5.0x D/EBITDA — High yield, higher cost"
  - "B: 5.0-7.0x D/EBITDA — Leveraged, significant risk"
  - "CCC: >7.0x D/EBITDA — Distressed"
result: "Companies often target BBB rating (2.0-3.5x D/EBITDA) as the investment grade floor"
```

Companies often target a specific rating (commonly BBB) and set leverage to maintain it.

### Practical Application: Financing Decision

**Scenario**: Company needs $500M for an acquisition

**Current State**:
- Market cap: $2B
- Debt: $500M
- EBITDA: $400M
- Net Debt/EBITDA: 1.25×

**Option A: 100% Debt**
- New Debt/EBITDA: 2.5×
- Maintains equity value
- Higher interest expense
- May risk rating downgrade

**Option B: 100% Equity**
- Dilutes shareholders by 25%
- Maintains conservative leverage
- No new interest expense
- Higher cost of capital

**Option C: 50/50 Mix**
- Debt/EBITDA: 1.875×
- Moderate dilution (12.5%)
- Balanced risk profile
- Maintains investment grade

**Decision Factors**:
- What's the current leverage vs. target?
- How stable are cash flows?
- What are market conditions?
- What do rating agencies expect?

### Common Interview Questions

**"What's the optimal capital structure?"**

The optimal capital structure maximizes firm value by balancing the tax benefits of debt against the costs of financial distress. It's where WACC is minimized. The optimal level depends on the company's industry, asset tangibility, cash flow stability, and growth prospects. There's no single right answer—it varies by company.

**"How does leverage affect WACC?"**

Initially, adding debt lowers WACC because debt is cheaper than equity (due to tax deductibility and lower required returns). But as leverage increases, both the cost of equity and cost of debt rise due to higher financial risk. At some point, these increases outweigh the benefit of cheap debt, and WACC starts rising. The optimal capital structure minimizes WACC.

**"Why do technology companies have less debt than utilities?"**

Technology companies have intangible assets (hard to collateralize), high growth (need financial flexibility), and volatile cash flows (can't reliably service debt). Utilities have tangible assets, regulated stable cash flows, and limited growth opportunities—ideal characteristics for supporting debt.

