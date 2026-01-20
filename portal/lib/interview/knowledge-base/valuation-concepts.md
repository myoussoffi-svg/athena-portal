# Valuation Concepts Knowledge Base

> Comprehensive technical reference for Investment Banking interview preparation.
> Sources: BIWS 400 Questions, iBanking Insider, Wall Street Prep RedBook, 10X EBITDA Core Technicals, CFI Interview Guide

---

## 1. Enterprise Value vs Equity Value

### Equity Value (Market Capitalization)
The value attributable to equity holders only.

**Formula:**
```
Equity Value = Share Price × Diluted Shares Outstanding
```

**What it represents:**
- Market's assessment of the value of equity claims
- What you'd pay to buy all outstanding shares
- Can never be negative (stock price can't go below $0)

### Enterprise Value
The value of the entire business, available to all capital providers.

**Basic Formula:**
```
Enterprise Value = Equity Value + Net Debt + Preferred Stock + Minority Interest
```

**Extended Formula (more complete):**
```
Enterprise Value = Equity Value
  + Total Debt
  - Cash & Cash Equivalents
  + Preferred Stock
  + Minority Interest (Non-controlling Interest)
  + Unfunded Pension Obligations
  + Capital Leases
  - NOLs (arguable)
  - Equity Investments (arguable)
```

### Why Add Debt, Subtract Cash?
- **Debt:** If you buy a company, you assume its obligations. Debt holders have claims that must be paid.
- **Cash:** If you buy a company, you get its cash. It's like getting a "rebate" on the purchase price.

### Why Add Preferred Stock?
- Preferred stock is a hybrid security (debt-like features)
- Preferred holders have priority over common equity
- Their claims must be satisfied before common shareholders

### Why Add Minority Interest?
- Financial statements consolidate 100% of subsidiary revenue/EBITDA
- But parent only owns a portion
- Minority interest represents the value owed to minority owners
- Must add to EV for consistency with consolidated metrics

### Can Equity Value > Enterprise Value?
Yes, when a company has net cash (cash > debt) and minimal/no preferred stock or minority interest.

### Can Enterprise Value Be Negative?
Technically yes, if cash significantly exceeds all debt and claims. Rare in practice.

---

## 2. Diluted Shares Outstanding

### Basic vs Diluted Shares
- **Basic:** Actual shares currently outstanding
- **Diluted:** Includes potential shares from options, warrants, convertibles, RSUs

### Treasury Stock Method (TSM)
Used to calculate dilution from options and warrants.

**Logic:** Assumes in-the-money options are exercised, and proceeds are used to repurchase shares at market price.

**Formula:**
```
Dilutive Shares = Options Outstanding - (Options × Strike Price / Current Share Price)
```

**Simplified:**
```
Dilutive Shares = Options × (Share Price - Strike Price) / Share Price
```

**Example:**
- 1,000 options with $50 strike price
- Current share price: $100
- Dilutive shares = 1,000 × ($100 - $50) / $100 = 500 shares

**Key Points:**
- Only in-the-money options are dilutive
- Out-of-the-money options (strike > current price) are ignored
- TSM assumes proceeds used to buy back shares at current price

### Convertible Securities
**In-the-money convertibles:** Add all converted shares to diluted count
**Out-of-the-money convertibles:** Ignore

**Conversion calculation:**
```
Shares from Convertible = Face Value of Convertible / Conversion Price
```

---

## 3. Valuation Methodologies

### Overview of Main Methods

| Method | Type | Based On |
|--------|------|----------|
| Comparable Companies | Relative | Current trading multiples |
| Precedent Transactions | Relative | M&A transaction multiples |
| DCF | Intrinsic | Future cash flows |
| LBO Analysis | Intrinsic | PE return requirements |
| Liquidation | Asset-based | Liquidation value of assets |

### When to Use Each

**Comparable Companies:**
- Public companies with trading data
- Quick "sanity check" on value
- Good for ranges

**Precedent Transactions:**
- M&A context (includes control premium)
- Industry-specific transaction multiples
- May be dated or reflect unique circumstances

**DCF:**
- Stable, predictable cash flows
- Not for early-stage or distressed companies
- Most "theoretically correct" but assumption-sensitive

**LBO Analysis:**
- Establishes "floor value" (minimum PE would pay)
- Based on required returns (20-25% IRR)
- Useful for understanding sponsor universe

**Liquidation:**
- Distressed companies
- Asset-heavy businesses
- Floor value if operations cease

### Valuation Hierarchy (Typical)

Generally (not always):
```
Precedent Transactions > DCF > Comparable Companies > LBO
```

**Why?**
- Precedent transactions include control premium
- DCF can show synergy value
- Trading comps reflect minority discount
- LBO is floor (sponsor return requirement)

---

## 4. Valuation Multiples

### Enterprise Value Multiples
Used when comparing enterprise value to pre-capital-structure metrics.

**EV/Revenue:**
- For companies without positive EBITDA
- High-growth tech companies
- Industry comparison (SaaS, biotech)
- Typical range: 0.5x - 10x+ (highly variable)

**EV/EBITDA:**
- Most common multiple
- Removes D&A differences
- Typical range: 6x - 12x (varies by industry)

**EV/EBIT:**
- Accounts for D&A (capital intensity)
- Buffett's preferred multiple
- More comparable across capital structures

**EV/Unlevered Free Cash Flow:**
- Theoretically most correct
- Hard to normalize across companies

### Equity Value Multiples
Used when comparing equity value to post-capital-structure metrics.

**P/E (Price to Earnings):**
- Most intuitive for investors
- Net Income is after interest and taxes
- Affected by capital structure, tax rates
- Typical range: 10x - 25x

**P/B (Price to Book):**
- Common for financial institutions
- Book value = Shareholders' Equity
- P/B > 1 means market values company above book

**PEG Ratio:**
```
PEG = P/E Ratio / Earnings Growth Rate
```
- Adjusts P/E for growth
- PEG < 1 may indicate undervaluation

### Matching Principle
**Critical:** Numerator and denominator must be consistent.

| If numerator is... | Denominator must be... |
|-------------------|------------------------|
| Enterprise Value | Revenue, EBITDA, EBIT, UFCF |
| Equity Value | Net Income, EPS, Book Value |

**Why?**
- EV represents value to all stakeholders
- EBITDA, EBIT, Revenue are pre-interest
- Net Income is after interest (equity holders only)

### LTM vs NTM Multiples

**LTM (Last Twelve Months):**
- Historical, actual data
- No forecasting risk
- May not reflect future performance

**NTM (Next Twelve Months):**
- Forward-looking
- Based on analyst estimates
- More relevant for growth companies
- Subject to forecast error

---

## 5. Comparable Companies Analysis

### Selection Criteria

**Business Profile:**
- Same industry/sector
- Similar products/services
- Similar business model
- Similar end markets

**Financial Profile:**
- Similar size (revenue, market cap)
- Similar growth rates
- Similar margins
- Similar capital structure

### Process

1. **Select comparable universe**
2. **Gather financial data** (from filings, Bloomberg, CapIQ)
3. **Spread the comps** (standardize presentation)
4. **Calculate multiples** (EV/EBITDA, P/E, etc.)
5. **Benchmark against target**
6. **Apply multiples to target metrics**

### Adjustments to Consider
- Non-recurring items
- Stock-based compensation
- Different fiscal year ends
- Different accounting policies
- Recent acquisitions/divestitures

### Advantages
- Market-based (reflects current sentiment)
- Objective data
- Easy to update

### Disadvantages
- Finding truly comparable companies difficult
- Market may be over/undervalued
- Doesn't account for company-specific factors
- No control premium

---

## 6. Precedent Transactions Analysis

### Selection Criteria

**Transaction Characteristics:**
- Same industry
- Similar transaction size
- Recent (usually within 3-5 years)
- Similar deal type (strategic vs financial)
- Similar geography

**Target Characteristics:**
- Similar business profile
- Similar financial profile to your target

### Process

1. **Identify relevant transactions**
2. **Gather transaction details** (price, consideration, metrics)
3. **Calculate implied multiples**
4. **Analyze and apply to target**

### Control Premium
Precedent transactions typically include 25-50% control premium over trading price.

**Why?**
- Buyer gains control of operations
- Potential for synergies
- Eliminates agency costs

### Advantages
- Includes control premium
- Real transactions (actual prices paid)
- Good for M&A valuation

### Disadvantages
- Historical (market conditions may have changed)
- Limited universe of deals
- Deal-specific circumstances affect multiples
- Synergy assumptions may differ

---

## 7. Industry-Specific Multiples

### Technology
- **EV/Revenue** (for pre-profit companies)
- **EV/ARR** (Annual Recurring Revenue for SaaS)
- **EV/Subscribers** or **EV/Users**

### Financial Institutions
- **P/E** and **P/B** (primary)
- **P/TBV** (Price to Tangible Book Value)
- Don't use EV/EBITDA (debt is part of operations)

### REITs
- **P/FFO** (Price to Funds From Operations)
- **P/AFFO** (Adjusted FFO)
- **NAV** (Net Asset Value)

### Retail
- **EV/EBITDAR** (adds back rent expense)
- **EV/Store**
- Same-store sales growth

### Oil & Gas
- **EV/EBITDAX** (adds back exploration expense)
- **EV/BOE** (Barrels of Oil Equivalent)
- **EV/Reserves** or **P/NAV**

### Airlines
- **EV/EBITDAR** (rent-adjusted)
- **EV/ASM** (Available Seat Mile)

---

## 8. Football Field Analysis

### Purpose
Visual summary of valuation ranges from different methodologies.

### Components
Horizontal bar chart showing:
- 52-week trading range
- Comparable companies range
- Precedent transactions range
- DCF range
- LBO analysis range

### Interpretation
- Look for convergence across methodologies
- Identify outliers and understand drivers
- Supports negotiation positioning

---

## 9. Private Company Valuation

### Adjustments Required

**Illiquidity Discount (10-30%):**
- No public market for shares
- Harder to sell ownership stake
- Typical range: 10-15% for control, 20-30% for minority

**Control Premium (if applicable):**
- Add premium if valuing control stake
- Typically 20-40%

**Size Discount:**
- Smaller companies = higher risk
- May warrant additional discount

### Challenges
- Limited financial disclosure
- No market price reference
- Harder to find comparable transactions
- More subjective

---

## 10. Valuation in Special Situations

### Negative Earnings Companies
- Use revenue multiples (EV/Revenue)
- Look at path to profitability
- May use discounted revenue model
- Consider industry norms for early-stage

### Distressed Companies
- Liquidation analysis primary
- Recovery analysis for creditors
- EV may equal debt value in restructuring
- Look at asset values, not earnings

### High-Growth Companies
- Higher multiples justified
- Use NTM or further forward multiples
- PEG ratio to normalize for growth
- Revenue multiples more common

### Cyclical Companies
- Use normalized/mid-cycle earnings
- Average multiples over cycle
- Don't use peak or trough metrics
