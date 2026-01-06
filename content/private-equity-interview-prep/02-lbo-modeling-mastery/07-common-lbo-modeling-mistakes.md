---
id: common-lbo-modeling-mistakes
title: Common LBO Modeling Mistakes and How to Avoid Them
order: 7
estimated_minutes: 25
---

# Common LBO Modeling Mistakes and How to Avoid Them

## Learning Objectives

- Identify the most common technical errors in LBO models and how to prevent them
- Understand which mistakes are disqualifying vs. minor
- Develop a checklist to review your model before submitting
- Explain how to recover from mistakes during an interview

## Written Guide

### Why Mistakes Matter

In a PE interview, small modeling errors can cascade and produce nonsensical outputs (negative equity, IRR errors, circular references). Interviewers understand that no one is perfect under time pressure, but certain mistakes signal lack of preparation or understanding.

**Disqualifying mistakes**:
- Broken links (interest expense not flowing to income statement)
- Wrong signs (adding debt instead of subtracting)
- IRR or MOIC formula errors
- Not paying down debt or paying it down incorrectly

**Minor mistakes** (forgivable if caught and explained):
- Small arithmetic errors
- Formatting issues
- Missing a minor line item

The key is to **check your work** before submitting and be able to **explain your logic** if challenged.

### Category 1: Structural and Linking Errors

**Mistake 1: Interest expense not linked from debt schedule**

- Problem: You calculate interest in the debt schedule but forget to link it to the income statement
- Result: Net income is overstated; debt paydown is wrong
- Fix: Always link interest from debt schedule to income statement. Use cell references, not hardcoded numbers.

**Mistake 2: D&A not flowing to balance sheet**

- Problem: D&A reduces net income but doesn't reduce PP&E on balance sheet
- Result: Balance sheet doesn't balance
- Fix: If modeling a balance sheet, ensure D&A reduces PP&E (via accumulated depreciation)

**Mistake 3: Circular references with revolver**

- Problem: The revolver is a plug for cash needs, but cash depends on the revolver balance, creating circularity
- Result: Excel errors or incorrect balances
- Fix: Use Excel's iterative calculation feature (File → Options → Formulas → Enable iterative calculation) or simplify by not modeling a revolver

**Mistake 4: Not linking debt paydown to cash flow**

- Problem: Debt balances decline arbitrarily instead of being driven by free cash flow
- Fix: Calculate free cash flow (EBITDA - taxes - CapEx - ΔWC - mandatory amortization) and use it to pay down debt

### Category 2: Debt Schedule Errors

**Mistake 5: Wrong interest expense calculation**

- Problem: Calculating interest on beginning balance when you should use average balance (beginning + ending) / 2
- Fix: For quarterly or annual periods, use average balance to be more accurate

**Mistake 6: Not prioritizing debt paydown correctly**

- Problem: Paying down low-cost debt (TLA) before high-cost debt (senior notes)
- Fix: Pay down debt with the highest interest rate first (typically senior notes, then TLB, then TLA)

**Mistake 7: Forgetting mandatory amortization**

- Problem: TLA typically has mandatory amortization (5-10% per year), but you model it as fully optional
- Fix: Include mandatory amortization for TLA; only excess cash flow is optional

**Mistake 8: Negative debt balances**

- Problem: Your cash sweep logic pays down more debt than exists
- Result: Negative debt balance (impossible)
- Fix: Add a check: MIN(cash available, remaining debt balance)

### Category 3: Returns Calculation Errors

**Mistake 9: Not subtracting remaining debt at exit**

- Problem: Calculating exit equity value as Exit EV instead of Exit EV - Remaining Debt
- Result: Returns are massively overstated
- Fix: Always subtract remaining debt (and add cash, if modeled) to get ending equity value

**Mistake 10: Wrong MOIC or IRR formula**

- MOIC = Ending Equity Value / Initial Equity Invested
- IRR = Excel IRR function or XIRR function with cash flows
- Common error: Using wrong cell references or including wrong years
- Fix: Double-check your formula and test with a simple example

**Mistake 11: Wrong sign on equity in IRR calculation**

- Problem: IRR requires initial equity as a negative (outflow) and ending equity as positive (inflow)
- If both are positive or both negative, IRR will be wrong
- Fix: Ensure Year 0 equity is negative (-$300M) and exit equity is positive (+$1,000M)

### Category 4: Assumption and Logic Errors

**Mistake 12: Unrealistic assumptions**

- Problem: 20% revenue growth, 600 bps margin expansion, 12× exit multiple on an 8× entry
- Result: Interviewers will challenge you; shows lack of judgment
- Fix: Be conservative. Use realistic growth rates, modest margin improvements, and flat or lower exit multiples

**Mistake 13: Ignoring working capital**

- Problem: Modeling revenue growth but not modeling the cash tied up in working capital
- Result: Free cash flow is overstated
- Fix: Model NWC as % of revenue; increases in NWC are uses of cash

**Mistake 14: Modeling CapEx too low or ignoring it**

- Problem: Setting CapEx at 1% of revenue for a capital-intensive business
- Result: Free cash flow is overstated
- Fix: Use case guidance; if not provided, assume 3-5% of revenue for most businesses

### Category 5: Presentation and Organization Errors

**Mistake 15: Messy formatting or unlabeled sections**

- Problem: Interviewers can't follow your model
- Result: Even if mechanics are correct, they may assume errors
- Fix: Label sections clearly ("Assumptions", "Debt Schedule", "Returns"), use headers, bold key outputs

**Mistake 16: Not highlighting key outputs**

- Problem: Interviewer has to hunt for MOIC and IRR
- Fix: Bold, border, or color-code MOIC and IRR so they're easy to find

**Mistake 17: Overcomplicating the model**

- Problem: Building unnecessary tabs, scenarios, or detail
- Result: You run out of time and make errors
- Fix: Build the simplest model that works. Add complexity only if you have time.

### How to Check Your Model

Before submitting, run through this checklist:

1. **Does the model produce reasonable outputs?** (MOIC = 2.5-3.5×, IRR = 20-30% is typical)
2. **Is interest expense linked from debt schedule to income statement?**
3. **Does debt pay down over time?** (Remaining debt should be lower than starting debt)
4. **Is ending equity value = Exit EV - Remaining Debt?**
5. **Are MOIC and IRR formulas correct?**
6. **Are assumptions reasonable?** (Growth, margins, leverage, exit multiple)
7. **Are key outputs labeled and easy to find?**

### How to Recover from a Mistake

If you realize you made an error during the interview:

1. **Acknowledge it**: "I think I made an error in my debt paydown logic. Let me correct that."
2. **Fix it quickly**: Don't spend 10 minutes debugging. Fix the most obvious issue and move on.
3. **Explain your thinking**: "The issue was that I wasn't linking interest properly. I've corrected it, and the IRR is now 24% instead of 30%."

Interviewers respect candidates who catch and fix their own mistakes.

## Video Placeholder

**Video Title**: Common LBO Modeling Mistakes and How to Avoid Them

**Outline**:
- Why mistakes matter: disqualifying vs. minor errors
- Structural errors: broken links, circular references, debt paydown not linked to cash flow
- Debt schedule errors: wrong interest calculation, wrong paydown priority, negative balances
- Returns errors: not subtracting remaining debt, wrong MOIC/IRR formulas
- Assumption errors: unrealistic assumptions, ignoring working capital or CapEx
- Presentation errors: messy formatting, unlabeled outputs, overcomplicating
- Model review checklist before submitting
- How to recover from mistakes during an interview

**Suggested Length**: 10 minutes

## Key Takeaways

- Disqualifying mistakes: broken links (interest, debt paydown), wrong returns calculation, not subtracting remaining debt at exit
- Common structural errors: circular references, interest not flowing to income statement, debt not linked to cash flow
- Common debt schedule errors: wrong interest calculation, wrong paydown priority, forgetting mandatory amortization
- Common returns errors: not subtracting remaining debt, wrong MOIC/IRR formulas, wrong sign on equity
- Check your model before submitting: reasonable outputs, links correct, debt paying down, returns formulas accurate
- If you catch a mistake during the interview, acknowledge it, fix it quickly, and explain your thinking
