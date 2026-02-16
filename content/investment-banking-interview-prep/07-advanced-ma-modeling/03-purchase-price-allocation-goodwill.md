---
id: purchase-price-allocation-goodwill
title: Purchase Price Allocation and Goodwill
order: 3
estimated_minutes: 40
---

# Purchase Price Allocation and Goodwill

## Learning Objectives

- Understand the purchase price allocation (PPA) process
- Calculate goodwill as the residual in an acquisition
- Apply fair value adjustments to acquired assets and liabilities
- Model deferred tax impacts from PPA

## Written Guide

### What Is Purchase Price Allocation?

When a company acquires another, it doesn't just record the purchase price as a single asset. Instead, accounting rules (ASC 805 / IFRS 3) require the buyer to allocate the purchase price across:

1. **Identifiable tangible assets** at fair value
2. **Identifiable intangible assets** at fair value
3. **Liabilities assumed** at fair value
4. **Goodwill** (the residual)

This process is called **Purchase Price Allocation (PPA)**.

### The PPA Framework

```
Purchase Price (Equity Value)
+ Liabilities Assumed (at fair value)
= Total Consideration

Total Consideration
- Fair Value of Identifiable Assets
- Fair Value of Identifiable Intangibles
= Goodwill
```

Alternatively:
```
Goodwill = Purchase Price - Fair Value of Net Identifiable Assets
```

### Step 1: Determine Purchase Price

The purchase price is the total consideration transferred:

```calculation
title: "Total Purchase Price Determination"
given:
  - "Cash paid: $2,250M"
  - "Fair value of stock issued: $2,250M"
  - "Contingent consideration (at fair value): $0"
steps:
  - "Total Purchase Price = Cash paid + Stock issued + Contingent consideration"
  - "Total Purchase Price = $2,250M + $2,250M + $0"
result: "Total Purchase Price = $4,500M"
```

If the acquirer assumes target debt:
```
Enterprise Value = Equity Purchase Price + Assumed Debt
```

### Step 2: Fair Value Adjustments to Assets

The target's book values often differ from fair values. Common adjustments:

**Inventory**
- Book value: $100M (at cost)
- Fair value: $115M (at selling price less costs to sell)
- **Write-up: $15M**

**Property, Plant & Equipment**
- Book value: $200M (historical cost less depreciation)
- Fair value: $250M (appraised value)
- **Write-up: $50M**

**Accounts Receivable**
- Usually at fair value already (net of allowance)
- May need adjustment for credit risk

**Deferred Revenue**
- Book value includes profit element
- Fair value = cost to fulfill + reasonable margin
- Often **written down** in PPA

### Step 3: Identify Intangible Assets

PPA requires separate recognition of identifiable intangibles:

```calculation
title: "Identifiable Intangible Assets"
given:
  - "Customer relationships: $300M (15 years useful life)"
  - "Trade names/brands: $150M (Indefinite useful life)"
  - "Developed technology: $100M (7 years useful life)"
  - "Non-compete agreements: $25M (3 years useful life)"
steps:
  - "Total = $300M + $150M + $100M + $25M"
result: "Total Intangibles = $575M"
note: "An intangible is identifiable if it arises from contractual/legal rights OR is separable (can be sold or licensed separately)"
```

**Key Point**: These intangibles didn't appear on the target's balance sheet (internally developed). PPA creates them.

### Step 4: Calculate Goodwill

Goodwill is the plug—what's left after allocating to identifiable assets:

**PPA Summary**

```calculation
title: "Purchase Price Allocation Summary"
given:
  - "Assets at Book Value:"
  - "  Cash: $50M (FV Adj: none) -> Fair Value: $50M"
  - "  Receivables: $200M (FV Adj: none) -> Fair Value: $200M"
  - "  Inventory: $100M (FV Adj: +$15M) -> Fair Value: $115M"
  - "  PP&E: $200M (FV Adj: +$50M) -> Fair Value: $250M"
  - "  Intangibles: $0 (FV Adj: +$575M) -> Fair Value: $575M"
  - "  Total Assets: $550M -> Fair Value: $1,190M"
  - "Liabilities at Book Value:"
  - "  Payables: ($75M) (FV Adj: none) -> Fair Value: ($75M)"
  - "  Debt: ($500M) (FV Adj: none) -> Fair Value: ($500M)"
  - "  Deferred Revenue: ($50M) (FV Adj: +$10M) -> Fair Value: ($40M)"
  - "  Deferred Tax Liability: $0 (FV Adj: ($150M)) -> Fair Value: ($150M)"
  - "  Total Liabilities: ($625M) -> Fair Value: ($765M)"
steps:
  - "Net Identifiable Assets = Total Assets (FV) + Total Liabilities (FV)"
  - "Net Identifiable Assets = $1,190M - $765M = $425M"
  - "Goodwill = Purchase Price - Net Identifiable Assets"
  - "Goodwill = $4,500M - $425M"
result: "Goodwill = $4,075M"
```

### Deferred Taxes in PPA

Fair value adjustments create **temporary differences** between book and tax basis:

**Example**: PP&E written up by $50M
- Book basis: $250M (fair value)
- Tax basis: $200M (carryover from target)
- Temporary difference: $50M

This creates a **deferred tax liability** (DTL):
```
DTL = Temporary Difference × Tax Rate = $50M × 25% = $12.5M
```

**Why?** The company will have higher depreciation expense for books than for taxes, meaning it will pay more tax in the future than book expense suggests.

**Total DTL from PPA**:

```calculation
title: "Total Deferred Tax Liability from PPA"
given:
  - "Tax Rate: 25%"
steps:
  - "Inventory write-up: $15M x 25% = $3.75M DTL"
  - "PP&E write-up: $50M x 25% = $12.50M DTL"
  - "Intangibles write-up: $575M x 25% = $143.75M DTL"
  - "Deferred Revenue write-down: ($10M) x 25% = ($2.50M) DTL"
result: "Total DTL = $157.50M"
note: "DTL is a liability, which reduces net assets and increases goodwill"
```

### Goodwill: What Does It Represent?

Goodwill captures value not attributable to identifiable assets:

- **Synergies**: Value of combining the businesses
- **Assembled workforce**: Trained employees (can't be separated)
- **Going concern value**: Value of the business as an operating entity
- **Premium paid**: Overpayment by the acquirer

Goodwill often represents 50-80% of purchase price in acquisitions, reflecting the value of intangibles and synergies.

### Goodwill vs. Other Intangibles

```calculation
title: "Goodwill vs. Identifiable Intangibles Comparison"
given:
  - "Goodwill: Not amortized | Identifiable Intangibles: Amortized over useful life"
  - "Goodwill: Tested annually for impairment | Identifiable Intangibles: Amortized + tested for impairment"
steps:
  - "Goodwill: Cannot be sold separately | Identifiable Intangibles: Can be sold or licensed"
  - "Goodwill: Residual calculation | Identifiable Intangibles: Specifically identified and valued"
result: "Goodwill is the residual plug; identifiable intangibles are specifically valued and amortized"
```

### Impact on Future Financials

**Intangible Amortization**

Identified intangibles with finite lives are amortized:

```calculation
title: "Annual Intangible Amortization Schedule"
given:
  - "Customer relationships: $300M over 15 years"
  - "Developed technology: $100M over 7 years"
  - "Non-compete agreements: $25M over 3 years"
steps:
  - "Customer relationships: $300M / 15 yrs = $20M per year"
  - "Developed technology: $100M / 7 yrs = $14.3M per year"
  - "Non-compete: $25M / 3 yrs = $8.3M per year"
result: "Total Annual Amortization = $42.6M"
note: "This amortization expense reduces GAAP net income but is non-cash"
```

**Inventory Step-Up**

The inventory write-up flows through COGS when inventory is sold (usually in the first quarter after close):

- One-time COGS increase of $15M
- Non-recurring—adjust for when calculating "normalized" earnings

**PP&E Step-Up**

Higher PP&E means higher depreciation expense going forward:

- If PP&E increased by $50M and remaining life is 10 years:
- Additional depreciation: $5M per year

### PPA in the Merger Model

In your model, PPA creates:

1. **New balance sheet line items**:
   - Identified intangibles
   - Goodwill
   - Deferred tax liability (from write-ups)

2. **New income statement expenses**:
   - Intangible amortization
   - Additional depreciation (from PP&E step-up)
   - Inventory step-up (one-time COGS hit)

3. **Adjustments to eliminate**:
   - Target's historical goodwill (if any)
   - Target's historical equity

### Common Interview Questions

**"Walk me through how you calculate goodwill in an acquisition."**

Goodwill equals purchase price minus the fair value of net identifiable assets. You start with the target's balance sheet, adjust assets and liabilities to fair value, add any identifiable intangibles not on the books (customer relationships, technology, etc.), and subtract this net asset value from the purchase price. The residual is goodwill.

**"What's the difference between goodwill and other intangibles?"**

Identifiable intangibles can be specifically identified and valued—things like customer relationships, patents, or trade names. They're amortized over their useful lives. Goodwill is the residual after allocating to everything identifiable. It's not amortized but tested annually for impairment. Goodwill captures synergies, assembled workforce, and any premium paid.

**"Why do fair value adjustments create deferred taxes?"**

Fair value adjustments create differences between book basis and tax basis. For example, if you write up PP&E, book depreciation will be higher than tax depreciation. This means the company will pay more tax than the books suggest, creating a deferred tax liability. The DTL represents future taxes owed.

