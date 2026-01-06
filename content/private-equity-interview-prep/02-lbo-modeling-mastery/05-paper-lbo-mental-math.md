---
id: paper-lbo-mental-math
title: Paper LBO and Mental Math Techniques
order: 5
estimated_minutes: 35
---

# Paper LBO and Mental Math Techniques

## Learning Objectives

- Execute a paper LBO (calculating returns without Excel) within 20-30 minutes
- Master mental math shortcuts for LBO calculations
- Understand which calculations to do precisely and which to estimate
- Defend your work and explain your approach under time pressure

## Written Guide

### What Is a Paper LBO?

A **paper LBO** is a simplified LBO analysis done by hand or with a basic calculator, without Excel. It tests:

- LBO intuition and understanding of mechanics
- Ability to work under extreme time pressure (20-45 minutes)
- Mental math skills
- Structured thinking

Paper LBOs are common in first-round interviews, especially at mega-funds.

### Typical Paper LBO Setup

You'll be given a one-page case with:

- **Entry EBITDA**: $100M
- **Entry Multiple**: 8.0× EV/EBITDA
- **Leverage**: 5.0× Total Debt/EBITDA
- **Revenue and EBITDA growth**: 5% annual revenue growth, 100 bps margin expansion
- **CapEx and NWC**: CapEx = 4% of revenue, NWC = 10% of revenue
- **Exit assumptions**: Exit in Year 5 at 8.0× EBITDA
- **Tax rate**: 25%

You're asked to calculate: **MOIC and IRR**.

### The Paper LBO Framework

Follow this step-by-step framework:

**Step 1: Calculate Entry Valuation and Capital Structure**

- Entry EV = Entry EBITDA × Entry Multiple = $100M × 8.0 = $800M
- Total Debt = Leverage Multiple × Entry EBITDA = 5.0 × $100M = $500M
- Equity = Entry EV - Debt = $800M - $500M = $300M

**Step 2: Project Exit EBITDA**

- Year 5 EBITDA depends on revenue growth and margin expansion
- If not given explicitly, estimate using: Exit EBITDA = Entry EBITDA × (1 + growth)^5
- Example: If EBITDA grows 8% annually: $100M × (1.08)^5 ≈ $147M

**Quick math for (1.08)^5**:
- (1.08)^5 ≈ 1.47 (memorize common growth factors)

If margin expansion is given:
- Calculate Year 5 revenue: Revenue₀ × (1 + revenue growth)^5
- Apply exit margin to get exit EBITDA

**Step 3: Calculate Free Cash Flow and Debt Paydown**

This is the hardest part in a paper LBO. You need to estimate cumulative free cash flow.

**Simplified approach**:

- Start with EBITDA each year
- Subtract taxes (use EBIT × tax rate as a rough proxy, or EBITDA × tax rate if you're rushing)
- Subtract CapEx (% of revenue)
- Subtract change in NWC (% of revenue growth)
- = Free Cash Flow per year
- Sum FCF over 5 years
- This is total debt paydown

**Even simpler approach (if desperate)**:

Assume the company generates 60-70% of EBITDA as free cash flow (after CapEx, NWC, taxes). Multiply cumulative EBITDA by 0.65 to estimate total debt paydown.

Example:
- Cumulative EBITDA over 5 years ≈ $600M (rough average of $120M/year)
- Debt paydown ≈ $600M × 0.65 = $390M

This is rough but gets you in the ballpark.

**Step 4: Calculate Exit Equity Value**

- Exit EV = Exit EBITDA × Exit Multiple
- Exit Equity Value = Exit EV - Remaining Debt
- Remaining Debt = Entry Debt - Debt Paydown

Example:
- Exit EBITDA = $147M
- Exit Multiple = 8.0×
- Exit EV = $147M × 8.0 = $1,176M
- Remaining Debt = $500M - $200M = $300M (assuming you estimated $200M paydown)
- Exit Equity Value = $1,176M - $300M = $876M

**Step 5: Calculate MOIC**

MOIC = Exit Equity Value / Initial Equity

= $876M / $300M = 2.92×

**Step 6: Estimate IRR**

IRR is harder without Excel. Use approximations:

**Rule of Thumb**:
- 2.0× over 5 years ≈ 15% IRR
- 2.5× over 5 years ≈ 20% IRR
- 3.0× over 5 years ≈ 25% IRR
- 3.5× over 5 years ≈ 28% IRR

For 2.92×, IRR ≈ 24%.

**More precise formula** (if you have time):

IRR ≈ (MOIC^(1/Years) - 1) × 100

For 2.92× over 5 years:
IRR ≈ (2.92^0.2 - 1) × 100 ≈ 24%

Calculating 2.92^0.2 by hand is hard. Use the rule of thumb table.

### Mental Math Shortcuts

**Memorize growth factors**:
- (1.05)^5 = 1.28
- (1.08)^5 = 1.47
- (1.10)^5 = 1.61
- (1.12)^5 = 1.76

**Memorize MOIC-to-IRR conversions** (5-year hold):
- 2.0× ≈ 15% IRR
- 2.5× ≈ 20% IRR
- 3.0× ≈ 25% IRR
- 4.0× ≈ 32% IRR

**Simplify fractions**:
- Instead of calculating $876M / $300M precisely, estimate: $900M / $300M = 3.0×, then adjust down slightly

**Round aggressively**:
- Don't waste time on exact decimals. $147.3M ≈ $150M is fine for a paper LBO.

### How to Present Your Work

Organize your paper clearly:

1. Write down given assumptions at the top
2. Show each step with labels: "Entry EV", "Debt", "Equity", "Exit EBITDA", etc.
3. Circle or box your final answers: MOIC and IRR
4. Show your work so interviewers can follow your logic

If you make a mistake, cross it out neatly and redo it. Don't scribble illegibly.

### Common Mistakes

**Spending too much time on precision**: Paper LBOs reward speed and structure, not perfection.

**Not estimating debt paydown**: Many candidates skip this or get stuck. Use the 60-70% of EBITDA heuristic if you're short on time.

**Forgetting to subtract remaining debt at exit**: Exit equity value = Exit EV - Remaining Debt. This is a common error.

**Poor organization**: If your work is messy, interviewers can't follow. Label everything.

**Panicking**: Paper LBOs are hard. Stay calm, work through the framework, and show your thinking.

## Video Placeholder

**Video Title**: Mastering Paper LBOs and Mental Math

**Outline**:
- What a paper LBO is and why funds use it
- The paper LBO framework: entry valuation, exit EBITDA, debt paydown, exit equity, MOIC, IRR
- Step-by-step example walkthrough
- Mental math shortcuts: growth factors, MOIC-to-IRR, rounding
- How to estimate debt paydown quickly (60-70% of cumulative EBITDA)
- How to present your work clearly
- Common mistakes: over-precision, skipping debt paydown, forgetting remaining debt

**Suggested Length**: 14 minutes

## Key Takeaways

- Paper LBOs test LBO intuition and mental math under time pressure (20-45 minutes)
- Follow the framework: calculate entry valuation → project exit EBITDA → estimate debt paydown → calculate exit equity value → MOIC and IRR
- Estimate debt paydown as 60-70% of cumulative EBITDA if you're short on time
- Memorize growth factors (1.08^5 = 1.47) and MOIC-to-IRR conversions (3.0× over 5 years ≈ 25% IRR)
- Organize your work clearly: label each step, circle final answers, show your logic
- Round aggressively and prioritize structure over precision
