---
id: consolidating-financial-statements
title: Consolidating Financial Statements
order: 4
estimated_minutes: 45
---

# Consolidating Financial Statements

## Learning Objectives

- Combine acquirer and target balance sheets with deal adjustments
- Consolidate income statements with synergies and new expenses
- Handle intercompany eliminations
- Build a consolidated cash flow statement

## Written Guide

### The Consolidation Process

After setting up standalone models and completing PPA, you consolidate the financial statements. Consolidation combines the acquirer and target's financials while making all deal-related adjustments.

The goal: show what the combined company looks like post-close.

### Consolidating the Balance Sheet

The pro forma balance sheet at close combines:
- Acquirer's balance sheet
- Target's balance sheet (at fair value)
- Deal adjustments

**Day 1 Balance Sheet Framework**:

```
Pro Forma Asset = Acquirer Asset + Target Asset (FV) + Deal Adjustments
Pro Forma Liability = Acquirer Liability + Target Liability (FV) + Deal Adjustments
Pro Forma Equity = Acquirer Equity + Deal Adjustments (target equity eliminated)
```

### Balance Sheet Adjustments

**Cash Adjustments**:

```calculation
title: "Cash Adjustments in Consolidation"
given:
  - "Cash used to fund deal: (Decrease)"
  - "New debt proceeds: Increase"
steps:
  - "Transaction fees paid: (Decrease)"
  - "Target's cash acquired: No change (already on combined BS)"
result: "Net cash impact depends on deal funding mix"
```

**Debt Adjustments**:

```calculation
title: "Debt Adjustments in Consolidation"
given:
  - "New acquisition debt: Increase"
  - "Target debt assumed: Already included"
steps:
  - "Target debt refinanced: Remove old, add new"
  - "Debt issuance costs: Asset (amortized over debt life)"
result: "Total debt reflects new acquisition financing plus assumed obligations"
```

**Equity Adjustments**:

```calculation
title: "Equity Adjustments in Consolidation"
given:
  - "Eliminate target's equity: Remove entirely"
steps:
  - "New shares issued: Increase common stock/APIC"
  - "Transaction fees (expensed): Reduce retained earnings"
result: "Pro forma equity reflects acquirer equity plus new shares minus target equity elimination"
```

**PPA Adjustments**:

```calculation
title: "PPA Adjustments in Consolidation"
given:
  - "Asset write-ups: Increase assets"
  - "Identified intangibles: Increase assets"
steps:
  - "Goodwill: Increase assets"
  - "Deferred tax liability: Increase liabilities"
result: "PPA adjustments add new intangibles, goodwill, and DTL to the combined balance sheet"
```

### Pro Forma Balance Sheet Example

```calculation
title: "Pro Forma Balance Sheet at Close"
given:
  - "ASSETS:"
  - "  Cash — Acquirer: $500M | Target (Book): $50M | FV Adj: — | Deal Adj: ($2,200M)* | Pro Forma: ($1,650M)**"
  - "  Receivables — Acquirer: $800M | Target (Book): $200M | FV Adj: — | Deal Adj: — | Pro Forma: $1,000M"
  - "  Inventory — Acquirer: $400M | Target (Book): $100M | FV Adj: +$15M | Deal Adj: — | Pro Forma: $515M"
  - "  PP&E — Acquirer: $1,500M | Target (Book): $200M | FV Adj: +$50M | Deal Adj: — | Pro Forma: $1,750M"
  - "  Intangibles — Acquirer: $100M | Target (Book): $0 | FV Adj: +$575M | Deal Adj: — | Pro Forma: $675M"
  - "  Goodwill — Acquirer: $200M | Target (Book): $0 | FV Adj: — | Deal Adj: +$4,075M | Pro Forma: $4,275M"
  - "  Total Assets — Acquirer: $3,500M | Target (Book): $550M | FV Adj: +$640M | Deal Adj: +$1,875M | Pro Forma: $6,565M"
steps:
  - "LIABILITIES:"
  - "  Payables — Acquirer: $300M | Target (Book): $75M | FV Adj: — | Deal Adj: — | Pro Forma: $375M"
  - "  Debt — Acquirer: $800M | Target (Book): $500M | FV Adj: — | Deal Adj: +$2,000M | Pro Forma: $3,300M"
  - "  Deferred Tax — Acquirer: $150M | Target (Book): $0 | FV Adj: +$160M | Deal Adj: — | Pro Forma: $310M"
  - "  Total Liabilities — Acquirer: $1,250M | Target (Book): $575M | FV Adj: +$160M | Deal Adj: +$2,000M | Pro Forma: $3,985M"
  - "EQUITY:"
  - "  Common Stock/APIC — Acquirer: $1,000M | Target (Book): $200M | FV Adj: — | Deal Adj: +$2,050M*** | Pro Forma: $3,050M"
  - "  Retained Earnings — Acquirer: $1,250M | Target (Book): ($225M) | FV Adj: +$480M | Deal Adj: ($125M)**** | Pro Forma: $1,530M"
  - "  Total Equity — Acquirer: $2,250M | Target (Book): ($25M) | FV Adj: +$480M | Deal Adj: +$1,925M | Pro Forma: $2,580M"
result: "Total L+E — Acquirer: $3,500M | Target (Book): $550M | FV Adj: +$640M | Deal Adj: +$1,875M | Pro Forma: $6,565M"
note: "*Cash used: $2,250M cash consideration - $50M target cash acquired + $50M fees. **Would draw on revolver or show negative; adjusted via financing. ***New shares issued ($2,250M) - eliminate target equity ($200M). ****Eliminate target RE ($225M) - transaction fees expensed ($100M) + FV adj."
```

### Target Equity Elimination

Critical concept: **Target's equity disappears** in consolidation.

When you acquire a company, you're buying its net assets. The target's equity (what belonged to old shareholders) is replaced by:
- Cash paid to target shareholders
- Stock issued to target shareholders
- Goodwill (the premium over fair value of net assets)

**Elimination Entry**:
```
Debit: Target's Equity (eliminate)
Debit: Goodwill (plug)
Debit: Fair Value Adjustments (write-ups)
Credit: Cash (consideration paid)
Credit: Stock Issued (consideration paid)
Credit: Deferred Tax Liability (from PPA)
```

### Intercompany Eliminations

If acquirer and target had business relationships before the deal, eliminate them:

**Intercompany Receivables/Payables**:
If Acquirer had $10M receivable from Target, and Target had $10M payable to Acquirer:
- Eliminate both—they net to zero within the combined company

**Intercompany Revenue/Expense**:
If Acquirer sold $50M of goods to Target:
- Eliminate revenue from Acquirer
- Eliminate cost from Target
- Net impact: zero

In most merger models, this is immaterial or non-existent, but check for it.

### Consolidating the Income Statement

The pro forma income statement combines:
- Acquirer's projected income statement
- Target's projected income statement
- Synergies (revenue and cost)
- New expenses from the deal

**Pro Forma Income Statement Framework**:

```
Acquirer Revenue + Target Revenue + Revenue Synergies = Pro Forma Revenue
Acquirer COGS + Target COGS - Cost Synergies + Inventory Step-up = Pro Forma COGS
... continue through net income ...
```

### Income Statement Adjustments

**Revenue Synergies**:
- Cross-selling opportunities
- Geographic expansion
- New product capabilities

Phase in over time (often 0% Year 1, 50% Year 2, 100% Year 3+)

**Cost Synergies**:
- Headcount reductions (redundant roles)
- Facility consolidation
- Procurement savings
- IT systems consolidation

Phase in over time (often 50% Year 1, 100% Year 2+)

**New Expenses from Deal**:

```calculation
title: "New Expenses from Deal Structure"
given:
  - "Intangible amortization: From PPA (Ongoing, by useful life)"
  - "Additional depreciation: From PP&E step-up (Ongoing)"
  - "Inventory step-up: One-time COGS hit (Year 1 only)"
steps:
  - "Interest expense: On new debt (Ongoing)"
  - "Integration costs: One-time charges (Year 1)"
  - "D&A of debt issuance costs: Amortize financing fees (Ongoing)"
result: "Total new expenses reduce pro forma earnings but some are non-cash and/or non-recurring"
note: "Foregone interest income on cash used for the deal should also be accounted for"
```

### Pro Forma Income Statement Example

```calculation
title: "Pro Forma Consolidated Income Statement"
given:
  - "Revenue — Acquirer: $5,000M | Target: $1,000M | Synergies: +$50M | Deal Adj: — | Pro Forma: $6,050M"
  - "COGS — Acquirer: ($3,000M) | Target: ($600M) | Synergies: +$50M | Deal Adj: ($15M)* | Pro Forma: ($3,565M)"
  - "Gross Profit — Acquirer: $2,000M | Target: $400M | Synergies: +$100M | Deal Adj: ($15M) | Pro Forma: $2,485M"
  - "SG&A — Acquirer: ($800M) | Target: ($200M) | Synergies: +$100M | Deal Adj: — | Pro Forma: ($900M)"
  - "D&A — Acquirer: ($200M) | Target: ($50M) | Synergies: — | Deal Adj: ($48M)** | Pro Forma: ($298M)"
steps:
  - "EBIT — Acquirer: $1,000M | Target: $150M | Synergies: +$200M | Deal Adj: ($63M) | Pro Forma: $1,287M"
  - "Interest Expense — Acquirer: ($50M) | Target: ($30M) | Synergies: — | Deal Adj: ($140M)*** | Pro Forma: ($220M)"
  - "Pre-Tax Income — Acquirer: $950M | Target: $120M | Synergies: +$200M | Deal Adj: ($203M) | Pro Forma: $1,067M"
  - "Tax (25%) — Acquirer: ($238M) | Target: ($30M) | Synergies: ($50M) | Deal Adj: +$51M | Pro Forma: ($267M)"
result: "Net Income — Acquirer: $713M | Target: $90M | Synergies: +$150M | Deal Adj: ($152M) | Pro Forma: $800M"
note: "*Inventory step-up (Year 1 only). **Intangible amort ($43M) + additional PP&E depreciation ($5M). ***Interest on $2B new debt at 7%."
```

### Accretion/Dilution from Consolidated IS

Once you have pro forma net income, calculate EPS:

```calculation
title: "Accretion/Dilution Analysis"
given:
  - "Standalone Net Income: $713M"
  - "Pro Forma Net Income: $800M"
  - "Original Shares Outstanding: 200M"
  - "New shares issued: 60M"
steps:
  - "Standalone EPS = $713M / 200M = $3.57"
  - "Pro Forma Shares = 200M + 60M = 260M"
  - "Pro Forma EPS = $800M / 260M = $3.08"
  - "Accretion/(Dilution) = ($3.08 - $3.57) / $3.57"
result: "Accretion/(Dilution) = (13.7%) — Deal is dilutive"
note: "Despite $150M of net synergies, the deal is dilutive due to shares issued and new interest expense"
```

### Consolidating Cash Flow Statement

The pro forma cash flow statement derives from the consolidated IS and BS:

**Adjustments to CFO**:
- Add back new amortization (intangibles, debt issuance costs)
- Add back additional depreciation
- Inventory step-up is non-recurring
- Working capital based on combined balance sheet changes

**Adjustments to CFF**:
- New debt issuance/repayment
- Dividends on new share base

**Integration Costs**:
One-time costs (often $50-100M) in Year 1, flowing through EBITDA and CFO.

### Minority Interest (Non-Controlling Interest)

If acquiring less than 100%, Non-Controlling Interest (NCI) applies:

- Consolidate 100% of target's assets, liabilities, revenue, expenses
- Record NCI in equity (minority shareholders' claim)
- Subtract NCI's share of net income to get "Net Income to Parent"

**Example**: Acquire 80% of target

```calculation
title: "Non-Controlling Interest (NCI) Example"
given:
  - "Ownership acquired: 80%"
  - "Consolidated Net Income: $100M"
steps:
  - "NCI share (20%): ($20M)"
  - "Net Income to Parent = $100M - $20M"
result: "Net Income to Parent = $80M (use this for EPS calculation)"
```

### Balance Check

After consolidation, verify:

```
Pro Forma Assets = Pro Forma Liabilities + Pro Forma Equity
```

If this doesn't balance, trace through your adjustments to find the error.

## Video Placeholder

**Video Title**: Consolidating Financial Statements in a Merger Model

**Outline**:
- Framework for consolidating balance sheets
- Key adjustments: cash, debt, equity elimination, PPA
- Building the pro forma balance sheet
- Consolidating income statements with synergies and deal expenses
- Calculating accretion/dilution from consolidated results
- Cash flow statement consolidation
- Handling minority interest
- Balance checks

**Suggested Length**: 22 minutes

## Key Takeaways

- Pro forma balance sheet = Acquirer + Target (at FV) + Deal Adjustments
- Target's equity is eliminated and replaced by consideration paid + goodwill
- Intercompany balances are eliminated in consolidation
- Pro forma income statement adds synergies and subtracts deal-related expenses
- Deal expenses include: intangible amortization, additional D&A, new interest, integration costs
- Inventory step-up is a one-time COGS hit in Year 1
- Calculate accretion/dilution using consolidated net income and new share count
- If <100% acquired, consolidate 100% but subtract NCI's share of net income
- Always verify pro forma balance sheet balances
