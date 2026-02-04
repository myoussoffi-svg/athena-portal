---
title: "Accretion/Dilution Analysis"
subtitle: "Determine if an acquisition creates or destroys EPS"
type: case-study
---

When a public company announces an acquisition, one of the first questions analysts ask is: "Is this deal accretive or dilutive?" In plain terms, will the combined company's earnings per share go up or down after the transaction? This analysis is a staple of M&A advisory work and a guaranteed interview topic.

The mechanics are straightforward, but the judgment around what drives accretion—and whether it even matters—separates good candidates from great ones.

---

## The Setup

You're on a live deal. The client (a public company) is considering acquiring a smaller competitor. The CFO wants to know the EPS impact before the board meeting tomorrow.

**Acquirer: TechCorp Inc.**
- Stock Price: $50
- Shares Outstanding: 100 million
- Net Income: $500 million
- P/E Ratio: 10.0x
- EPS: $5.00

**Target: DataSoft LLC**
- Purchase Price: $300 million (equity value)
- Net Income: $25 million
- Implied P/E: 12.0x

**Deal Terms:**
- 100% stock deal (Acquirer issues new shares)
- No synergies assumed (conservative case)
- Ignore transaction costs and taxes for simplicity

**Question:** Is this deal accretive or dilutive to TechCorp's EPS?

Work through this before reading the solution. The intuition matters as much as the math.

---

## Step-by-Step Walkthrough

```accordion-step
id: step-1-shares-issued
stepNumber: 1
title: Calculate Shares Issued
challenge: |
  In a stock deal, the acquirer issues new shares to pay for the target. How many new shares will TechCorp issue?

  You know:
  - Purchase Price: $300 million
  - TechCorp Stock Price: $50

  Calculate the number of new shares issued.
hint: Shares Issued = Purchase Price / Acquirer Stock Price
solution: |
  **Shares Issued = Purchase Price / Acquirer Stock Price**

  ```
  Shares Issued = $300M / $50
  Shares Issued = 6 million new shares
  ```

  Write this down first. Interviewers want to see you anchor on the share count before anything else.
```

```accordion-step
id: step-2-pro-forma-shares
stepNumber: 2
title: Calculate Pro Forma Shares Outstanding
challenge: |
  Now calculate the total shares outstanding after the deal closes.

  - TechCorp's existing shares: 100 million
  - New shares issued: (from Step 1)

  What are the pro forma shares outstanding?
hint: Pro Forma Shares = Existing Shares + New Shares Issued
solution: |
  **Pro Forma Shares = Existing Shares + New Shares Issued**

  ```
  Pro Forma Shares = 100M + 6M
  Pro Forma Shares = 106 million shares
  ```
```

```accordion-step
id: step-3-pro-forma-income
stepNumber: 3
title: Calculate Pro Forma Net Income
challenge: |
  Combine the earnings of both companies to get pro forma net income.

  - TechCorp Net Income: $500 million
  - DataSoft Net Income: $25 million
  - Synergies: $0 (conservative case)

  What is the pro forma net income?
hint: Pro Forma Net Income = Acquirer NI + Target NI + Synergies
solution: |
  **Pro Forma Net Income = Acquirer NI + Target NI**

  ```
  Pro Forma Net Income = $500M + $25M
  Pro Forma Net Income = $525 million
  ```

  Note: In the real world, you'd also add after-tax synergies and subtract incremental interest expense (if using debt) or financing costs.
```

```accordion-step
id: step-4-pro-forma-eps
stepNumber: 4
title: Calculate Pro Forma EPS
challenge: |
  Now calculate the pro forma EPS.

  - Pro Forma Net Income: $525 million
  - Pro Forma Shares: 106 million

  What is the pro forma EPS?
hint: Pro Forma EPS = Pro Forma Net Income / Pro Forma Shares
solution: |
  **Pro Forma EPS = Pro Forma Net Income / Pro Forma Shares**

  ```
  Pro Forma EPS = $525M / 106M
  Pro Forma EPS = $4.95
  ```
```

```accordion-step
id: step-5-accretion-dilution
stepNumber: 5
title: Determine Accretion or Dilution
challenge: |
  Compare the pro forma EPS to TechCorp's original EPS.

  - Original EPS: $5.00
  - Pro Forma EPS: $4.95

  Is the deal accretive or dilutive? By how much (in dollars and percentage)?
hint: If Pro Forma EPS > Original EPS, it's accretive. If Pro Forma EPS < Original EPS, it's dilutive.
solution: |
  **Accretion/(Dilution) Analysis:**

  ```
  Original EPS:    $5.00
  Pro Forma EPS:   $4.95
  Change:          -$0.05 (-1.0%)
  ```

  **The deal is 1% dilutive to EPS.**

  TechCorp's EPS drops from $5.00 to $4.95, a decrease of $0.05 or 1%. Despite adding $25M of earnings, the deal destroys EPS because TechCorp is paying a higher P/E multiple (12x) than its own (10x).
```

---

## The P/E Shortcut

Here's the intuition that separates strong candidates:

```accordion-step
id: step-6-pe-rule
stepNumber: 6
title: The P/E Rule — Quick Accretion Test
challenge: |
  There's a shortcut to determine accretion/dilution without running the full calculation.

  Given:
  - Acquirer P/E: 10.0x
  - Target implied P/E: 12.0x (paying $300M for $25M of earnings)

  What's the rule? Why does it work?
hint: Think about what P/E represents—how much investors pay for $1 of earnings. If you pay MORE per dollar of earnings than your own stock commands, what happens?
solution: |
  **The P/E Rule:**
  - If Acquirer P/E > Target P/E → Deal is **accretive**
  - If Acquirer P/E < Target P/E → Deal is **dilutive**
  - If Acquirer P/E = Target P/E → Deal is **neutral**

  (Assumes 100% stock deal with no synergies)

  **Why does this work?**

  Think of it this way: The acquirer is "buying" earnings.
  - TechCorp's P/E of 10x means investors pay $10 for every $1 of TechCorp's earnings
  - Paying 12x for DataSoft means TechCorp pays $12 for every $1 of DataSoft's earnings
  - TechCorp is paying *more* per dollar of earnings than its own stock commands
  - Therefore, EPS must decline

  **In our example:**
  - Acquirer P/E: 10.0x
  - Target implied P/E: 12.0x
  - 10x < 12x → Dilutive ✓

  This shortcut lets you answer instantly in interviews: "Without running the numbers, this deal is likely dilutive because the acquirer is paying a higher P/E than its own multiple."
```

---

## Adding Synergies

Most deals include expected synergies. Let's see how they affect the analysis.

```accordion-step
id: step-7-synergies
stepNumber: 7
title: Impact of Synergies
challenge: |
  Same deal, but now assume **$15 million of pre-tax synergies** (cost savings).

  Assume 25% tax rate, so after-tax synergies = $15M × (1 - 25%) = $11.25M

  Recalculate the pro forma EPS. Is the deal still dilutive?
hint: Add after-tax synergies to pro forma net income before dividing by shares.
solution: |
  **Revised Calculation:**

  ```
  Pro Forma Net Income = Acquirer NI + Target NI + After-Tax Synergies
  Pro Forma Net Income = $500M + $25M + $11.25M
  Pro Forma Net Income = $536.25 million

  Pro Forma EPS = $536.25M / 106M shares
  Pro Forma EPS = $5.06
  ```

  **Result with synergies:**

  ```
  Original EPS:    $5.00
  Pro Forma EPS:   $5.06
  Change:          +$0.06 (+1.2%)
  ```

  **With $15M of synergies, the deal becomes 1.2% accretive.**

  The synergies more than offset the P/E differential, turning a dilutive deal into an accretive one.
```

---

## Cash vs. Stock: Financing Matters

The funding mix significantly impacts accretion/dilution.

```accordion-step
id: step-8-financing-comparison
stepNumber: 8
title: Compare Financing Scenarios
challenge: |
  Calculate the EPS impact under three financing scenarios:

  **Scenario A: 100% Cash Deal**
  - TechCorp borrows $300M at 5% interest
  - Tax rate: 25%
  - No new shares issued

  **Scenario B: 100% Stock Deal** (already calculated)

  **Scenario C: 50% Cash / 50% Stock**
  - $150M cash (borrowed at 5%)
  - $150M stock

  Which financing structure is most accretive? Why?
hint: For cash deals, calculate after-tax interest cost: Interest × (1 - Tax Rate). This reduces net income but you don't issue new shares. Compare the trade-off.
solution: |
  **Scenario A: 100% Cash Deal**

  ```
  Interest Expense = $300M × 5% = $15M
  After-Tax Interest Cost = $15M × (1 - 25%) = $11.25M

  Pro Forma Net Income = $500M + $25M - $11.25M = $513.75M
  Pro Forma Shares = 100M (no new shares issued)
  Pro Forma EPS = $513.75M / 100M = $5.14
  ```

  **Cash deal result:** +2.8% accretive

  **Scenario B: 100% Stock Deal** (from above)

  ```
  Pro Forma EPS = $4.95
  ```

  **Stock deal result:** -1.0% dilutive

  **Scenario C: 50% Cash / 50% Stock**

  ```
  Cash portion: $150M at 5% = $7.5M interest → $5.625M after-tax
  Shares issued: $150M / $50 = 3M new shares

  Pro Forma Net Income = $500M + $25M - $5.625M = $519.375M
  Pro Forma Shares = 100M + 3M = 103M
  Pro Forma EPS = $519.375M / 103M = $5.04
  ```

  **Mixed deal result:** +0.8% accretive

  **Summary:**

  | Financing | Pro Forma EPS | Accretion/(Dilution) |
  |-----------|---------------|----------------------|
  | 100% Stock | $4.95 | (1.0%) |
  | 50/50 Mix | $5.04 | +0.8% |
  | 100% Cash | $5.14 | +2.8% |

  **Cash deals are generally more accretive** when borrowing costs are low. Why? The "cost" of cash (after-tax interest at 3.75%) is lower than the cost of issuing expensive equity (10% earnings yield, which is 1/P/E = 1/10).
```

---

## The Breakeven Analysis

Interviewers love asking: "At what price does the deal become accretive?"

```accordion-step
id: step-9-breakeven
stepNumber: 9
title: Calculate Breakeven Price and Synergies
challenge: |
  For a 100% stock deal with no synergies:

  1. What is the **maximum purchase price** TechCorp can pay and still break even on EPS?

  2. At the $300M purchase price, **how much in synergies** are needed to break even?
hint: For breakeven price: If you pay your own P/E multiple, EPS is unchanged. For breakeven synergies: Calculate how much additional income offsets the dilution.
solution: |
  **Finding the Breakeven Purchase Price:**

  For a 100% stock deal with no synergies, the breakeven is when you pay your own P/E:

  ```
  Breakeven Price = Target Net Income × Acquirer P/E
  Breakeven Price = $25M × 10.0x
  Breakeven Price = $250 million
  ```

  At $250M, the deal is neutral. Below $250M, it's accretive. Above $250M (like our $300M), it's dilutive.

  **Finding Breakeven Synergies:**

  ```
  Current dilution: $0.05 per share × 106M shares = $5.3M total

  Required after-tax synergies to offset: $5.3M
  Pre-tax synergies needed: $5.3M / (1 - 25%) = $7.1M
  ```

  With ~$7M of pre-tax synergies, the deal breaks even.
```

---

## Practice Variations

```accordion-step
id: variation-a-accretive-stock
stepNumber: 10
title: Practice Variation A — Accretive Stock Deal
challenge: |
  **Acquirer:** P/E of 20x, 50M shares, $40 stock price, $100M Net Income
  **Target:** $50M purchase price, $5M Net Income

  Is this deal accretive or dilutive? Calculate the exact percentage.
hint: First use the P/E rule for a quick check: Acquirer P/E = 20x, Target implied P/E = $50M / $5M = 10x. Then run the full calculation.
solution: |
  **Quick P/E check:**
  - Acquirer P/E: 20x
  - Target implied P/E: $50M / $5M = 10x
  - 20x > 10x → **Accretive**

  **Full calculation:**

  ```
  Shares issued: $50M / $40 = 1.25M
  Pro forma shares: 50M + 1.25M = 51.25M
  Pro forma NI: $100M + $5M = $105M
  Pro forma EPS: $105M / 51.25M = $2.05
  Original EPS: $100M / 50M = $2.00
  ```

  **Accretion: +2.5%**

  When a high P/E company buys a low P/E company with stock, it's almost always accretive. This is "P/E arbitrage" and one reason high-multiple companies are serial acquirers.
```

```accordion-step
id: variation-b-target-debt
stepNumber: 11
title: Practice Variation B — Target Has Debt
challenge: |
  Same as original scenario, but **Target has $50M of debt at 6% interest.**

  The acquirer will pay $300M for equity and assume the $50M debt. How does this change the analysis?
hint: The target's existing interest expense is already reflected in its Net Income. Think about what happens if the acquirer refinances at a different rate.
solution: |
  **Key insight:** The target's existing debt service is already reflected in its Net Income. When the acquirer assumes the debt, no incremental interest expense is added—it's already baked in.

  The $50M debt appears on the acquirer's balance sheet, but the P&L impact is already in the target's $25M NI.

  **If the acquirer refinances at a lower rate:**

  ```
  Target's current interest: $50M × 6% = $3M
  New interest at 5%: $50M × 5% = $2.5M
  Pre-tax savings: $0.5M
  After-tax savings: $0.375M
  ```

  Small boost to accretion.

  **If asked about enterprise value:**

  ```
  Equity value: $300M
  Plus debt assumed: $50M
  Enterprise value: $350M
  ```
```

```accordion-step
id: variation-c-target-cash
stepNumber: 12
title: Practice Variation C — Target Has Cash
challenge: |
  **Target has $40M of cash on its balance sheet.** Purchase price is still $300M equity value.

  How does this affect the accretion/dilution analysis?
hint: Think about the "effective" purchase price. If you're buying a company for $300M and it has $40M of cash sitting there, what's your net outlay?
solution: |
  **The cash offsets the effective purchase price:**

  ```
  Equity Purchase Price:    $300M
  Less: Target's Cash:      ($40M)
  Net Effective Price:      $260M
  ```

  **Revised shares issued:** $260M / $50 = 5.2M (vs. 6M before)

  Or equivalently: The acquirer gets the target's cash, which can pay down debt or reduce cash used.

  **New calculation:**

  ```
  Pro forma shares: 100M + 5.2M = 105.2M
  Pro forma NI: $525M (unchanged)
  Pro forma EPS: $525M / 105.2M = $4.99
  ```

  **Dilution reduced from -1.0% to -0.2%**

  Fewer shares issued → less dilution.
```

```accordion-step
id: variation-d-working-backwards
stepNumber: 13
title: Practice Variation D — Working Backwards
challenge: |
  The board says the deal must be at least **5% accretive**. What's the maximum price TechCorp can pay (100% stock, no synergies)?
hint: Target EPS = $5.00 × 1.05 = $5.25. Set up the equation: $5.25 = (Acquirer NI + Target NI) / (Acquirer Shares + Shares Issued) and solve for purchase price.
solution: |
  **Target pro forma EPS:** $5.00 × 1.05 = $5.25

  **Set up the equation:**

  ```
  Pro Forma EPS = (Acquirer NI + Target NI) / (Acquirer Shares + P/$50)

  $5.25 = ($500M + $25M) / (100M + P/$50)
  $5.25 = $525M / (100M + P/50)
  ```

  **Solve:**

  ```
  100M + P/50 = $525M / $5.25
  100M + P/50 = 100M
  P/50 = 0
  P = $0
  ```

  This means for 5% accretion with these numbers and no synergies, you'd need to pay essentially nothing—which is unrealistic.

  **Reality check:** A 5% accretive deal with stock requires either:
  1. Paying a much lower P/E than your own
  2. Significant synergies
  3. Using cash instead of stock

  **Maximum price for breakeven:** $250M (10x target NI)

  For 5% accretion, you'd need synergies on top of a lower price, or a different financing structure.
```

---

## The Goodwill Question

Interviewers often ask about goodwill and intangibles. Here's what you need to know:

**When an acquirer pays more than book value, the excess becomes:**
1. **Identifiable intangibles** (customer relationships, technology, brand) — amortized over useful life
2. **Goodwill** (the residual) — not amortized, but tested for impairment

**Impact on accretion/dilution:**
- Amortization of intangibles is a real GAAP expense that reduces Net Income
- This makes deals *more dilutive* than the simple analysis suggests
- Many companies report "Adjusted EPS" excluding amortization to show a cleaner picture

**Example:**

```
Purchase price:           $300M
Target book value:        $100M
Excess:                   $200M
  - Intangibles (10yr):   $150M → $15M annual amortization
  - Goodwill:             $50M → No amortization

After-tax amortization impact: $15M × (1 - 25%) = $11.25M hit to NI annually
```

This would make our deal even more dilutive: another ~$0.11 EPS headwind.

---

## What Interviewers Listen For

### 1. The P/E Intuition

Don't just calculate—explain the logic:

"This deal is dilutive because we're paying 12x for the target's earnings while our stock only trades at 10x. We're effectively paying more per dollar of earnings than our own investors pay for ours. For this to work, we'd need synergies or we'd need to believe the target's earnings will grow faster than ours."

### 2. Financing Trade-offs

Show you understand the cash vs. stock decision:

"Cash deals tend to be more accretive because the after-tax cost of debt is usually lower than our earnings yield. But cash deals increase leverage and financial risk. Stock deals preserve the balance sheet but dilute existing shareholders. The right mix depends on the acquirer's leverage capacity and stock price."

### 3. When Accretion Doesn't Matter

This is the advanced insight:

"Accretion/dilution is a short-term metric that can be misleading. A deal that's 5% dilutive in Year 1 but creates significant strategic value—new markets, technology, or long-term synergies—could be far more valuable than an accretive deal buying a declining business. The market often rewards dilutive deals if the strategy is sound."

### 4. Real-World Complications

Be ready for these:
- "What about transaction costs?" (One-time hit to NI)
- "What about amortization of intangibles?" (Creates ongoing non-cash expense)
- "What if the target has debt?" (Acquirer may assume or refinance it)
- "What about the target's cash?" (Reduces effective purchase price)

---

## Key Takeaways

- Accretion/dilution measures whether pro forma EPS is higher or lower than standalone EPS
- Quick rule: If Acquirer P/E > Target P/E, stock deal is accretive (and vice versa)
- Cash deals are typically more accretive than stock deals when interest rates are low
- Synergies can flip a dilutive deal to accretive—calculate the breakeven amount
- Accretion isn't everything: a strategically sound but dilutive deal can create value
- Amortization of intangibles creates additional ongoing dilution in GAAP earnings
- Always be ready to explain the intuition, not just run the numbers
