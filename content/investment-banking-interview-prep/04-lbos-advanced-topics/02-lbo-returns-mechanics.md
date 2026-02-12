---
id: lbo-returns-mechanics
title: LBO Returns Mechanics and Calculation
order: 2
estimated_minutes: 30
video:
  provider: vimeo
  id: "1164207537"
---

# LBO Returns Mechanics and Calculation

## Learning Objectives

- Calculate the equity return and IRR for an LBO investment
- Understand the relationship between entry multiple, exit multiple, and returns
- Explain how debt paydown contributes to equity value at exit
- Evaluate return sensitivity to key assumptions (EBITDA growth, leverage, exit multiple)

## Written Guide

### How LBO Returns Are Calculated

Private equity firms measure returns in two ways:

1. **Multiple of Invested Capital (MOIC)**: Also called the "equity multiple" or "money multiple"
   - MOIC = Ending Equity Value / Initial Equity Investment
   - Example: Invest $100M, exit at $300M → MOIC = 3.0×

2. **Internal Rate of Return (IRR)**: The annualized return, accounting for the timing of cash flows
   - IRR is the discount rate that makes the NPV of cash flows equal to zero
   - Example: 3.0× return over 5 years ≈ 25% IRR

PE firms target **20-30%+ IRR** or **2.5-3.0× MOIC** over a 5-year hold.

### LBO Returns Framework

To calculate returns, follow these steps:

1. **Calculate Entry Enterprise Value (EV)** = Entry Multiple × Entry EBITDA
2. **Calculate Equity Invested** = EV - Debt Raised
3. **Project EBITDA growth** over the hold period
4. **Calculate Exit EV** = Exit Multiple × Exit EBITDA
5. **Subtract Remaining Debt** to get Ending Equity Value
6. **Calculate MOIC and IRR** using initial equity and ending equity value

### Step-by-Step Example

**Entry (Year 0)**:
- EBITDA: $100M
- Entry Multiple: 10.0× EV/EBITDA
- Entry EV = $100M × 10.0 = $1,000M
- Debt: $700M (70% leverage)
- Equity Invested: $1,000M - $700M = $300M

**Hold Period (5 years)**:
- EBITDA grows at 8% per year
- Exit EBITDA (Year 5) = $100M × (1.08)^5 = $146.9M
- Assume $200M of debt is paid down over 5 years (from cash flow)
- Remaining Debt = $700M - $200M = $500M

**Exit (Year 5)**:
- Exit Multiple: 10.0× EV/EBITDA (same as entry)
- Exit EV = $146.9M × 10.0 = $1,469M
- Ending Equity Value = Exit EV - Remaining Debt = $1,469M - $500M = $969M

**Returns**:
- MOIC = $969M / $300M = 3.23×
- IRR ≈ 26.4% (calculated using financial calculator or Excel: IRR over 5 years)

### Decomposing the Return: What Drove the 3.23× MOIC?

Let's break down the sources of return:

**1. EBITDA Growth**:
- EBITDA grew from $100M to $146.9M (47% growth)
- At the same 10.0× multiple, EV grew from $1,000M to $1,469M (47% growth)
- This contributed to equity value growth

**2. Debt Paydown**:
- Debt decreased from $700M to $500M ($200M paid down)
- This increased equity value at exit (less debt to subtract from EV)

**3. Leverage**:
- By investing only $300M (30% equity) rather than $1,000M (100% equity), the return on equity is amplified
- If there were no leverage, the equity return would be much lower

**4. Multiple Expansion**:
- In this example, the exit multiple = entry multiple (10.0×), so there's no multiple expansion
- If the exit multiple were higher (e.g., 11.0×), returns would be even higher

### Sensitivity to Key Assumptions

LBO returns are highly sensitive to:

**Exit Multiple**:
- If the exit multiple increases from 10.0× to 11.0×, exit EV = $146.9M × 11.0 = $1,615.9M
- Ending Equity Value = $1,615.9M - $500M = $1,115.9M
- MOIC = $1,115.9M / $300M = 3.72× (up from 3.23×)

**EBITDA Growth**:
- If EBITDA grows at 10% instead of 8%, exit EBITDA = $161.1M
- Exit EV = $161.1M × 10.0 = $1,611M
- Ending Equity Value = $1,611M - $500M = $1,111M
- MOIC = $1,111M / $300M = 3.70×

**Debt Paydown**:
- If the company pays down $300M instead of $200M, remaining debt = $400M
- Ending Equity Value = $1,469M - $400M = $1,069M
- MOIC = $1,069M / $300M = 3.56×

PE firms run sensitivity tables to understand how returns change under different scenarios.

### When Is an LBO Attractive?

An LBO is attractive when:

- The company can support leverage (stable cash flows)
- There are opportunities to grow EBITDA (operational improvements, revenue growth)
- The entry multiple is reasonable (lower is better for returns)
- The exit environment is favorable (high multiples, strong M&A market)

### Common Mistakes

**Forgetting to subtract remaining debt at exit**: Equity value = Exit EV - Remaining Debt. Many candidates forget the debt subtraction.

**Confusing MOIC with IRR**: MOIC is the total return (3.0× = tripled your money). IRR is the annualized return (e.g., 25% per year).

**Not understanding that leverage amplifies both upside and downside**: If EBITDA declines, leverage can destroy equity value quickly.

**Assuming the exit multiple will always be higher than entry**: Multiple contraction (exit < entry multiple) can kill returns, even if EBITDA grows.

## Video Placeholder

**Video Title**: Calculating LBO Returns: MOIC, IRR, and Return Drivers

**Outline**:
- How PE firms measure returns: MOIC and IRR
- Step-by-step LBO returns calculation example
- Decomposing returns: EBITDA growth, debt paydown, leverage, multiple expansion
- Sensitivity analysis: how returns change with exit multiple, EBITDA growth, and debt paydown
- When is an LBO attractive?

**Suggested Length**: 12 minutes

## Key Takeaways

- LBO returns are measured by MOIC (equity multiple) and IRR (annualized return)
- MOIC = Ending Equity Value / Initial Equity Investment
- Returns are driven by EBITDA growth, debt paydown, leverage, and multiple expansion
- Ending Equity Value = Exit EV - Remaining Debt
- LBO returns are highly sensitive to exit multiple, EBITDA growth, and leverage
- PE firms target 20-30%+ IRR or 2.5-3.0× MOIC over 5 years
