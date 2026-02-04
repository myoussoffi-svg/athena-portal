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
| Adjustment | Impact on Cash |
|------------|----------------|
| Cash used to fund deal | (Decrease) |
| New debt proceeds | Increase |
| Transaction fees paid | (Decrease) |
| Target's cash acquired | No change (already on combined BS) |

**Debt Adjustments**:
| Adjustment | Impact |
|------------|--------|
| New acquisition debt | Increase |
| Target debt assumed | Already included |
| Target debt refinanced | Remove old, add new |
| Debt issuance costs | Asset (amortized over debt life) |

**Equity Adjustments**:
| Adjustment | Impact |
|------------|--------|
| Eliminate target's equity | Remove entirely |
| New shares issued | Increase common stock/APIC |
| Transaction fees (expensed) | Reduce retained earnings |

**PPA Adjustments**:
| Adjustment | Impact |
|------------|--------|
| Asset write-ups | Increase assets |
| Identified intangibles | Increase assets |
| Goodwill | Increase assets |
| Deferred tax liability | Increase liabilities |

### Pro Forma Balance Sheet Example

| Line Item | Acquirer | Target (Book) | FV Adj | Deal Adj | Pro Forma |
|-----------|----------|---------------|--------|----------|-----------|
| **Assets** | | | | | |
| Cash | $500M | $50M | — | ($2,200M)* | ($1,650M)** |
| Receivables | $800M | $200M | — | — | $1,000M |
| Inventory | $400M | $100M | +$15M | — | $515M |
| PP&E | $1,500M | $200M | +$50M | — | $1,750M |
| Intangibles | $100M | $0 | +$575M | — | $675M |
| Goodwill | $200M | $0 | — | +$4,075M | $4,275M |
| **Total Assets** | $3,500M | $550M | +$640M | +$1,875M | $6,565M |
| | | | | | |
| **Liabilities** | | | | | |
| Payables | $300M | $75M | — | — | $375M |
| Debt | $800M | $500M | — | +$2,000M | $3,300M |
| Deferred Tax | $150M | $0 | +$160M | — | $310M |
| **Total Liabilities** | $1,250M | $575M | +$160M | +$2,000M | $3,985M |
| | | | | | |
| **Equity** | | | | | |
| Common Stock/APIC | $1,000M | $200M | — | +$2,050M*** | $3,050M |
| Retained Earnings | $1,250M | ($225M) | +$480M | ($125M)**** | $1,530M |
| **Total Equity** | $2,250M | ($25M) | +$480M | +$1,925M | $2,580M |
| | | | | | |
| **Total L+E** | $3,500M | $550M | +$640M | +$1,875M | $6,565M |

*Cash used: $2,250M cash consideration - $50M target cash acquired + $50M fees
**Would draw on revolver or show negative; adjusted via financing
***New shares issued ($2,250M) - eliminate target equity ($200M)
****Eliminate target RE ($225M) - transaction fees expensed ($100M) + FV adj

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

| Expense | Description | Duration |
|---------|-------------|----------|
| Intangible amortization | From PPA | Ongoing (by useful life) |
| Additional depreciation | From PP&E step-up | Ongoing |
| Inventory step-up | One-time COGS hit | Year 1 only |
| Interest expense | On new debt | Ongoing |
| Integration costs | One-time charges | Year 1 |
| D&A of debt issuance costs | Amortize financing fees | Ongoing |

**Foregone Interest Income**:
Cash used for the deal was previously earning interest. Account for lost interest income.

### Pro Forma Income Statement Example

| Line Item | Acquirer | Target | Synergies | Deal Adj | Pro Forma |
|-----------|----------|--------|-----------|----------|-----------|
| Revenue | $5,000M | $1,000M | +$50M | — | $6,050M |
| COGS | ($3,000M) | ($600M) | +$50M | ($15M)* | ($3,565M) |
| **Gross Profit** | $2,000M | $400M | +$100M | ($15M) | $2,485M |
| SG&A | ($800M) | ($200M) | +$100M | — | ($900M) |
| D&A | ($200M) | ($50M) | — | ($48M)** | ($298M) |
| **EBIT** | $1,000M | $150M | +$200M | ($63M) | $1,287M |
| Interest Expense | ($50M) | ($30M) | — | ($140M)*** | ($220M) |
| **Pre-Tax Income** | $950M | $120M | +$200M | ($203M) | $1,067M |
| Tax (25%) | ($238M) | ($30M) | ($50M) | +$51M | ($267M) |
| **Net Income** | $713M | $90M | +$150M | ($152M) | $800M |

*Inventory step-up (Year 1 only)
**Intangible amort ($43M) + additional PP&E depreciation ($5M)
***Interest on $2B new debt at 7%

### Accretion/Dilution from Consolidated IS

Once you have pro forma net income, calculate EPS:

| Metric | Standalone | Pro Forma |
|--------|------------|-----------|
| Net Income | $713M | $800M |
| Shares Outstanding | 200M | 260M* |
| EPS | $3.57 | $3.08 |
| **Accretion/(Dilution)** | | **(13.7%)** |

*200M original + 60M new shares issued

In this example, despite $150M of net synergies, the deal is dilutive due to shares issued and new interest expense.

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

| Line | Amount |
|------|--------|
| Consolidated Net Income | $100M |
| Less: NCI (20%) | ($20M) |
| Net Income to Parent | $80M |

Use $80M for EPS calculation.

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
