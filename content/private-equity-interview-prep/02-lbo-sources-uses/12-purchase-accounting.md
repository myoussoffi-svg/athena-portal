---
id: purchase-accounting
title: Purchase Accounting in LBO Transactions
order: 12
estimated_minutes: 30
---

# Purchase Accounting in LBO Transactions

## Learning Objectives

- Understand the conceptual framework of purchase accounting under ASC 805
- Apply fair value adjustments to target company assets and liabilities
- Identify common purchase price allocation adjustments in LBO transactions
- Connect purchase accounting to the opening balance sheet and ongoing financial statements

## Written Guide

### The Purpose of Purchase Accounting

When a private equity sponsor acquires a company, accounting rules require revaluing the target's assets and liabilities to fair value on the acquisition date. This process, governed by ASC 805 (Business Combinations), creates a new basis of accounting that reflects what the acquirer actually paid for each component of value.

Purchase accounting matters for LBO modeling because it determines the opening balance sheet—the starting point for all projections. It affects depreciation and amortization going forward, which impacts taxable income and net income. And it creates goodwill, which appears prominently on the balance sheet and may be subject to impairment testing.

Understanding purchase accounting demonstrates technical sophistication. Many interview candidates can calculate IRR, but fewer can articulate how purchase accounting adjustments flow through the financial statements.

### The Purchase Accounting Framework

The fundamental equation of purchase accounting is:

**Purchase Price = Fair Value of Identifiable Net Assets + Goodwill**

Or rearranged:

**Goodwill = Purchase Price - Fair Value of Identifiable Net Assets**

The acquirer must allocate the purchase price to each identifiable asset and liability at its fair value. Whatever remains after this allocation is goodwill—the residual premium paid beyond the fair value of what was acquired.

"Identifiable" means the asset or liability can be separated from the business (sold, licensed, transferred) or arises from contractual or legal rights. Goodwill, by contrast, is not separable—it represents synergies, assembled workforce, going concern value, and other intangible benefits of the acquisition.

### Step 1: Identify Existing Assets and Liabilities

Start with the target company's historical balance sheet. This provides the baseline before purchase accounting adjustments.

**Historical Balance Sheet Example:**

| Assets | Book Value |
|--------|------------|
| Cash | $50M |
| Receivables | $80M |
| Inventory | $40M |
| PP&E | $200M |
| Intangibles | $20M |
| **Total Assets** | **$390M** |

| Liabilities & Equity | Book Value |
|---------------------|------------|
| Payables | $50M |
| Accrued Expenses | $30M |
| Debt | $150M |
| Shareholders' Equity | $160M |
| **Total Liabilities & Equity** | **$390M** |

### Step 2: Revalue to Fair Value

Each asset and liability is adjusted to fair value. Common adjustments include:

**Inventory:** May be written up to reflect market value rather than cost. For raw materials, fair value approximates book value. For finished goods, fair value may include a portion of the expected profit margin.

**Property, Plant & Equipment:** Fair value is determined through appraisal. If book value reflects historical cost less accumulated depreciation, fair value may be higher (if assets have appreciated) or lower (if assets are impaired).

**Intangible Assets:** Under purchase accounting, the acquirer must recognize all identifiable intangible assets at fair value, even if they were not recorded on the target's books. Common intangibles include:
- Customer relationships
- Technology and patents
- Trade names and trademarks
- Backlog and contracts
- Non-compete agreements

**Deferred Revenue:** If the target has deferred revenue (customer prepayments for future services), fair value may differ from book value. The fair value of assumed liabilities reflects only the cost to fulfill the obligation plus a reasonable margin—not the full revenue amount. This often creates a "haircut" to deferred revenue, which affects post-acquisition revenue recognition.

**Debt:** If the target has below-market debt (issued when rates were lower), it is recorded at fair value, which may be lower than face value. If debt is above-market, fair value exceeds face value.

### Step 3: Recognize New Intangible Assets

A critical step in purchase accounting is recognizing intangible assets that do not appear on the target's balance sheet. These "hidden" intangibles are often the largest purchase price allocation adjustments.

**Customer Relationships:** Valued using income approaches (discounted cash flows from the customer base) or market approaches. Useful life depends on expected customer attrition. Amortized over 5-15 years typically.

**Technology:** Includes developed technology, software, and patents. Valued based on replacement cost or income approaches. Amortized over useful life, often 5-10 years.

**Trade Names:** Brand value can be substantial. May have indefinite life (not amortized) or definite life (amortized). Depends on how long the brand is expected to generate value.

**Backlog:** The value of unfulfilled orders or contracts. Amortized over the expected fulfillment period, often 1-2 years.

These intangibles can easily represent hundreds of millions of dollars in value for a large acquisition. They create amortization expense that reduces taxable income and net income throughout the holding period.

### Applying Purchase Accounting: An Example

Consider an acquisition where the sponsor pays $600 million enterprise value for the target above:

**Step 1: Historical Book Value of Equity:** $160 million

**Step 2: Fair Value Adjustments:**

| Adjustment | Amount |
|------------|--------|
| Inventory write-up | +$5M |
| PP&E write-up | +$30M |
| Customer relationships (new) | +$120M |
| Technology (new) | +$40M |
| Trade name (new) | +$25M |
| Deferred revenue haircut | +$10M |
| Deferred tax liability | -$50M |
| **Total Fair Value Adjustments** | **+$180M** |

**Step 3: Fair Value of Identifiable Net Assets:**
$160M + $180M = $340M

**Step 4: Goodwill Calculation:**
Purchase Price (Equity Value): $600M - $150M existing debt = $450M
Goodwill: $450M - $340M = $110M

(Or using EV: $600M - $150M debt - $340M FV = $110M)

### Deferred Tax Implications

Purchase accounting adjustments create deferred tax liabilities and assets:

**Deferred Tax Liabilities (DTL):** When fair value exceeds tax basis. For example, if you write up PP&E by $30 million but the tax basis remains unchanged, you create a DTL of $30M × tax rate.

**Deferred Tax Assets (DTA):** When tax basis exceeds fair value. This can occur with items like inventory write-downs or certain liabilities.

The net deferred tax effect of purchase accounting adjustments reduces the fair value of identifiable net assets, which increases goodwill.

In the example above, if intangibles increased by $185M and the tax rate is 25%, the DTL increases by approximately $46M, offsetting some of the intangible value.

### Impact on Post-Acquisition Financials

Purchase accounting adjustments affect financial statements throughout the holding period:

**Depreciation:** Higher PP&E fair value means higher depreciation expense, reducing taxable income and net income.

**Amortization:** New intangible assets generate amortization expense. A $120M customer relationship amortized over 10 years creates $12M annual amortization expense.

**Revenue Recognition:** The deferred revenue haircut creates a "black hole" where revenue that would otherwise be recognized is lost. If you haircut deferred revenue by $10M, you recognize $10M less revenue post-acquisition.

**Tax Benefits:** Higher D&A creates larger tax deductions, increasing cash flow. The tax shield partially offsets the negative impact on net income.

These effects must be modeled in the LBO projections. Higher amortization reduces reported net income but is a non-cash expense that does not affect free cash flow directly.

### Interview Applications

Purchase accounting questions test conceptual understanding:

"What is purchase accounting and why does it matter?"
Purchase accounting requires revaluing the target's assets and liabilities to fair value at acquisition. It matters because it determines the opening balance sheet, creates new intangible assets that generate amortization, and establishes goodwill. The resulting D&A affects taxable income and net income throughout the holding period.

"Walk me through how goodwill is calculated."
Goodwill equals purchase price minus the fair value of identifiable net assets. You start with book equity, apply fair value adjustments (write-ups, write-downs, new intangibles, deferred taxes), and the remainder is goodwill.

"What are common purchase price allocation adjustments?"
Inventory write-ups, PP&E revaluations, and most importantly, recognition of intangible assets like customer relationships, technology, trade names, and backlog. These intangibles often represent the largest adjustments.

## Video Placeholder

**Video Title**: Purchase Accounting in LBO Transactions

**Outline**:
- Purpose of purchase accounting under ASC 805
- The fundamental equation: Purchase Price = FV Net Assets + Goodwill
- Step 1: Identify existing assets and liabilities
- Step 2: Revalue each item to fair value
- Step 3: Recognize new intangible assets (customer relationships, technology, trade names)
- Deferred tax implications of purchase accounting adjustments
- Impact on post-acquisition financials: depreciation, amortization, revenue
- Worked example with all adjustments
- Interview questions on purchase accounting

**Suggested Length**: 18 minutes

## Key Takeaways

- Purchase accounting (ASC 805) requires revaluing target assets and liabilities to fair value and recognizing all identifiable intangible assets
- Goodwill = Purchase Price - Fair Value of Identifiable Net Assets (it is the residual premium)
- Common adjustments include inventory write-ups, PP&E revaluations, and recognition of customer relationships, technology, and trade names
- Fair value adjustments create deferred tax liabilities (when FV > tax basis) or assets (when tax basis > FV)
- New intangible assets create amortization expense that reduces taxable income and net income but does not affect cash flow
- The deferred revenue haircut reduces post-acquisition revenue recognition—a common issue in subscription businesses
