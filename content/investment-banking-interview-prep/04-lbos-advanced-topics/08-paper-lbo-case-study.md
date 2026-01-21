---
title: "Paper LBO Case Study"
subtitle: "Master the napkin math that wins interviews"
type: case-study
---

The paper LBO is the single most common technical exercise in investment banking and private equity interviews. Unlike a full Excel model, you're expected to work through this on paper or a whiteboard in 5-10 minutes. Interviewers aren't testing your ability to build complex models—they're testing whether you understand LBO mechanics intuitively.

This case study walks through the exact approach senior bankers expect, with multiple scenarios to practice.

---

## The Setup

You're in a first-round interview at a middle-market PE fund. The interviewer slides a piece of paper across the table:

**TargetCo Acquisition**

- Purchase Price: $500 million (10.0x Entry Multiple)
- LTM EBITDA: $50 million
- Debt / EBITDA: 5.0x at entry
- Interest Rate: 8% on all debt
- EBITDA Growth: 5% annually
- No capex, working capital changes, or taxes (keep it simple)
- Exit Multiple: 10.0x (same as entry)
- Holding Period: 5 years

**Question:** What is the approximate IRR to the equity sponsor?

Take a moment before reading further. Work through this yourself—it's the only way to build the intuition.

---

## Step-by-Step Walkthrough

```accordion-step
id: step-1-sources
stepNumber: 1
title: Calculate the Sources (Debt and Equity)
challenge: |
  Start with how the deal is financed. This is the foundation of every LBO.

  Given:
  - Purchase Price: $500 million
  - Debt / EBITDA: 5.0x
  - LTM EBITDA: $50 million

  Calculate the debt and equity used to fund the acquisition.
hint: Debt = Leverage Multiple × EBITDA. Equity = Purchase Price − Debt.
solution: |
  **Debt:** 5.0x EBITDA = 5.0 × $50M = **$250M of debt**

  **Equity:** Purchase price minus debt = $500M − $250M = **$250M of equity**

  Write this down first. Interviewers want to see you anchor on the capital structure.

  **Sanity check:** 50% debt / 50% equity is reasonable for a middle-market LBO. If leverage were 7x+, you'd expect less equity; if 3x, more equity.
```

```accordion-step
id: step-2-ebitda-growth
stepNumber: 2
title: Project EBITDA at Exit
challenge: |
  The company grows EBITDA at 5% annually for 5 years.

  Starting EBITDA: $50 million

  What is EBITDA at the end of Year 5?
hint: You can compound ($50M × 1.05^5) or use the approximation that 5% × 5 years ≈ 25-28% growth with compounding.
solution: |
  **Option A: Rule of 72 shortcut**

  At 5% growth, EBITDA roughly increases by 25-28% over 5 years (5% × 5 = 25%, plus compounding). Call it ~$63-64M.

  **Option B: Quick compound math**

  - Year 1: $50.0M × 1.05 = $52.5M
  - Year 2: $52.5M × 1.05 = $55.1M
  - Year 3: $55.1M × 1.05 = $57.9M
  - Year 4: $57.9M × 1.05 = $60.8M
  - Year 5: $60.8M × 1.05 = **$63.8M**

  Use whichever is faster for you. In an interview, approximating $64M is perfectly fine.
```

```accordion-step
id: step-3-exit-ev
stepNumber: 3
title: Calculate Exit Enterprise Value
challenge: |
  Apply the exit multiple to Year 5 EBITDA.

  - Year 5 EBITDA: ~$64 million
  - Exit Multiple: 10.0x

  What is the Exit Enterprise Value?
hint: Exit EV = Exit Multiple × Exit EBITDA
solution: |
  **Exit EV = Exit Multiple × Year 5 EBITDA**

  Exit EV = 10.0x × $63.8M = **$638M**

  (Using $64M gives $640M—both are acceptable in interviews)
```

```accordion-step
id: step-4-debt-paydown
stepNumber: 4
title: Determine Debt Paydown
challenge: |
  This is where candidates often slip up. Calculate how much debt remains at exit.

  In this simplified scenario with no capex, taxes, or working capital, all EBITDA converts to free cash flow available for debt paydown (minus interest).

  Given:
  - Starting Debt: $250 million
  - Interest Rate: 8%
  - EBITDA grows from $50M to $64M over 5 years

  Estimate the debt remaining at exit.
hint: Each year, cash available for paydown = EBITDA − Interest. Interest decreases as debt is paid down. For a paper LBO, use a simplified average approach.
solution: |
  **Annual interest expense (Year 1):** $250M × 8% = $20M

  **Detailed approach (if time permits):**

  | Year | EBITDA | Interest | Cash for Paydown |
  |------|--------|----------|------------------|
  | 1 | $52.5M | $20.0M | $32.5M |
  | 2 | $55.1M | $17.4M* | $37.7M |
  | 3 | $57.9M | $14.4M* | $43.5M |
  | 4 | $60.8M | $10.9M* | $49.9M |
  | 5 | $63.8M | $6.9M* | $56.9M |

  *Interest decreases as debt is paid down.

  **Simplified approach (acceptable in interviews):**

  Average EBITDA over 5 years ≈ $57M. Average interest ≈ $15M (debt balance declining). Average annual paydown ≈ $40M. Total paydown ≈ $200M.

  **Debt at exit:** $250M − $200M = **~$50M remaining**

  **Interview tip:** State your simplifying assumptions out loud. "I'm going to assume roughly $40M of annual debt paydown given declining interest expense—does that work for a quick estimate?" This shows you understand the mechanics even when approximating.
```

```accordion-step
id: step-5-exit-equity
stepNumber: 5
title: Calculate Exit Equity Value
challenge: |
  Now calculate the equity value at exit.

  - Exit Enterprise Value: ~$638 million
  - Remaining Debt: ~$50 million

  What is the Exit Equity Value?
hint: Exit Equity = Exit EV − Remaining Debt
solution: |
  **Exit Equity Value = Exit EV − Remaining Debt**

  Exit Equity = $638M − $50M = **~$588M**
```

```accordion-step
id: step-6-returns
stepNumber: 6
title: Calculate the Return (MoM and IRR)
challenge: |
  Calculate the Multiple of Money (MoM) and approximate IRR.

  - Equity Invested: $250 million
  - Equity at Exit: ~$588 million
  - Holding Period: 5 years

  What is the MoM? What is the approximate IRR?
hint: MoM = Exit Equity / Entry Equity. For IRR, use these benchmarks: 2.0x in 5 years ≈ 15%, 2.5x ≈ 20%, 3.0x ≈ 25%.
solution: |
  **Multiple of Money (MoM):**

  MoM = Exit Equity / Entry Equity
  MoM = $588M / $250M = **2.35x**

  **IRR Approximation:**

  For a 5-year hold, use these benchmarks:
  - 2.0x in 5 years ≈ 15% IRR
  - 2.5x in 5 years ≈ 20% IRR
  - 3.0x in 5 years ≈ 25% IRR

  **2.35x falls between 2.0x and 2.5x → approximately 18-19% IRR**

  **The answer:** "Based on the assumptions provided, the sponsor would generate approximately a **2.3-2.4x MoM** and an **18-19% IRR** over the 5-year hold. The return is driven roughly equally by EBITDA growth and debt paydown, with no multiple expansion."
```

---

## Value Creation Bridge

The best candidates frame returns in terms of the three LBO value drivers:

```accordion-step
id: step-7-value-bridge
stepNumber: 7
title: Decompose the Value Creation
challenge: |
  Break down where the ~$340M of equity value creation came from:

  - Entry Equity: $250M
  - Exit Equity: $588M
  - Value Created: $338M

  How much came from:
  1. EBITDA growth?
  2. Debt paydown?
  3. Multiple expansion?
hint: EBITDA growth adds EV at the exit multiple. Debt paydown flows directly to equity. Multiple expansion = (Exit Multiple − Entry Multiple) × Exit EBITDA.
solution: |
  **1. EBITDA Growth Contribution:**

  EBITDA grew from $50M to $64M = $14M increase
  Value at 10x exit multiple = $14M × 10 = **$140M from EBITDA growth**

  **2. Debt Paydown Contribution:**

  Debt reduced from $250M to $50M = **$200M from debt paydown**

  **3. Multiple Expansion Contribution:**

  Exit multiple = Entry multiple (both 10x) = **$0 from multiple expansion**

  **Total:** $140M + $200M + $0M = $340M ✓

  **This is what separates strong candidates:** Being able to articulate *where the return comes from*. In this case, it's roughly 40% EBITDA growth and 60% debt paydown.
```

---

## Practice Variations

```accordion-step
id: variation-a-higher-leverage
stepNumber: 8
title: Variation A — Higher Leverage
challenge: |
  Same setup, but **Debt / EBITDA is 6.0x** instead of 5.0x.

  What happens to returns?
hint: More debt = less equity invested = higher returns (but more risk). Also means higher interest expense, so slightly less debt paydown.
solution: |
  **New capital structure:**

  - Debt: 6.0x × $50M = $300M
  - Equity: $500M − $300M = $200M

  Higher debt means higher interest (~$24M Year 1), but also less equity invested.

  Assuming ~$180M total debt paydown (less than before due to higher interest burden):

  - Debt at exit: $300M − $180M = $120M
  - Exit Equity: $638M − $120M = $518M
  - MoM: $518M / $200M = **2.6x** (higher than base case)
  - IRR: ~**21%**

  **Takeaway:** Higher leverage amplifies returns when the deal works, but increases risk.
```

```accordion-step
id: variation-b-no-growth
stepNumber: 9
title: Variation B — No Growth
challenge: |
  Same base case setup, but **EBITDA is flat at $50M** for all 5 years.

  What's the return?
hint: Without EBITDA growth, the only return driver is debt paydown. This significantly reduces returns.
solution: |
  - Exit EV: 10.0x × $50M = $500M (same as entry)
  - Debt paydown: ~$150M (lower EBITDA means less cash for paydown)
  - Debt at exit: $250M − $150M = $100M
  - Exit Equity: $500M − $100M = $400M
  - MoM: $400M / $250M = **1.6x**
  - IRR: ~**10%**

  **Takeaway:** Without growth, debt paydown is the only return driver. This deal wouldn't meet fund hurdles.
```

```accordion-step
id: variation-c-multiple-compression
stepNumber: 10
title: Variation C — Multiple Compression
challenge: |
  Same base case, but **exit multiple compresses to 8.0x** (vs. 10.0x entry).

  What happens?
hint: Multiple compression destroys equity value. Calculate the new exit EV and see the impact on returns.
solution: |
  - Exit EV: 8.0x × $63.8M = $510M
  - Debt at exit: ~$50M (same as base case)
  - Exit Equity: $510M − $50M = $460M
  - MoM: $460M / $250M = **1.84x**
  - IRR: ~**13%**

  **Takeaway:** Multiple compression destroys returns even with solid EBITDA growth. This is why entry price discipline matters.
```

```accordion-step
id: variation-d-working-backwards
stepNumber: 11
title: Variation D — Working Backwards
challenge: |
  Using the base case, what **exit multiple** would you need to achieve a **25% IRR** (approximately 3.0x MoM)?
hint: Work backwards from target return. 3.0x × $250M entry equity = $750M exit equity needed. Add back remaining debt to get required exit EV. Divide by exit EBITDA.
solution: |
  **Target exit equity:** $250M × 3.0 = $750M

  **Required exit EV:** $750M + $50M remaining debt = $800M

  **Required exit multiple:** $800M / $63.8M = **12.5x**

  **Takeaway:** You'd need 25% multiple expansion from 10.0x to 12.5x. That's aggressive—interviewers will probe whether that's realistic for the industry.
```

---

## What Interviewers Listen For

### 1. Value Creation Bridges

The best candidates frame returns in terms of the three LBO value drivers:
- **EBITDA growth:** Operational improvement, revenue growth
- **Debt paydown:** Using cash flow to reduce debt
- **Multiple expansion:** Exiting at a higher multiple than entry

### 2. Sensitivity Awareness

After you answer, expect follow-ups like:
- "What if we could only get 4.0x leverage?" (Less debt = more equity = lower returns)
- "What if EBITDA is flat?" (Returns compress significantly)
- "What exit multiple would we need for a 25% IRR?" (Work backwards from target return)

### 3. Realistic Grounding

Interviewers may push on whether this is a "good" deal:
- 18-19% IRR is *acceptable* but not exceptional for PE
- Most funds target 20%+ net IRR to LPs
- This deal would need operating improvements, add-on acquisitions, or multiple expansion to be compelling

---

## Key Takeaways

- Paper LBOs test intuition, not precision—round numbers and state assumptions
- Always break down returns into EBITDA growth, debt paydown, and multiple expansion
- Higher leverage amplifies returns but increases risk
- Multiple compression is the silent killer of PE returns
- Work backwards from target returns to understand what needs to go right

---

## Practice Until Automatic

The goal is to complete a paper LBO in under 5 minutes without hesitation. Run through these steps daily until the mechanics are second nature:

1. Calculate debt and equity from leverage ratio
2. Grow EBITDA to exit
3. Apply exit multiple for exit EV
4. Estimate debt paydown (EBITDA minus interest)
5. Exit equity = Exit EV minus remaining debt
6. MoM = Exit equity / Entry equity
7. Map MoM to IRR using benchmarks

When you can do this while maintaining eye contact and thinking out loud, you're ready.
