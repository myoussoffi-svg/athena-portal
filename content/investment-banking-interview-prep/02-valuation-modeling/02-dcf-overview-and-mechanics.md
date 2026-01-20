---
id: dcf-overview-and-mechanics
title: DCF Overview and Mechanics
order: 2
estimated_minutes: 35
---

# DCF Overview and Mechanics

## Learning Objectives

- Explain the conceptual foundation of a DCF and why it's considered the most theoretically sound valuation method
- Walk through the key steps of building a DCF model
- Understand how to project free cash flows and discount them to present value
- Explain the relationship between DCF output (enterprise value) and equity value

## Written Guide

### What Is a DCF?

A **Discounted Cash Flow (DCF)** analysis values a company based on the present value of its projected future cash flows. It rests on the principle that a company is worth the cash it'll generate for investors over time, adjusted for the time value of money and risk.

The DCF is considered the most rigorous valuation methodology because it's based on fundamentals (cash generation) rather than market sentiment or comparable company multiples.

### Why DCF Is Used

In investment banking, the DCF is one of the core valuation tools. It's used to:

- Value a company in M&A or capital raising transactions
- Provide a "floor" or intrinsic value estimate independent of market multiples
- Sensitize assumptions (growth, margins, discount rate) to understand valuation drivers

However, a DCF is only as good as its assumptions. Small changes in growth rates or discount rates can significantly affect value.

### The DCF Framework: From Cash Flows to Enterprise Value

A DCF model follows these steps:

1. **Project Free Cash Flows**: Forecast the company's unlevered free cash flows (UFCF) over a projection period, typically 5-10 years.
2. **Calculate Terminal Value**: Estimate the value of cash flows beyond the projection period.
3. **Discount to Present Value**: Discount projected cash flows and terminal value to present value using the weighted average cost of capital (WACC).
4. **Sum to Get Enterprise Value**: Add the present value of projected cash flows and terminal value to get EV.
5. **Bridge to Equity Value**: Subtract net debt (and add/subtract other items) to arrive at equity value.

### Step 1: Project Unlevered Free Cash Flow (UFCF)

**Unlevered Free Cash Flow (UFCF)** represents cash available to all investors (debt and equity holders) before debt payments. It's calculated as:

UFCF = EBIT × (1 - Tax Rate) + D&A - CapEx - Increase in Net Working Capital

Or, alternatively:

UFCF = NOPAT + D&A - CapEx - Increase in NWC

Where **NOPAT** (Net Operating Profit After Tax) = EBIT × (1 - Tax Rate)

**Why unlevered?** We use unlevered cash flows because we're valuing the entire business (enterprise value), not just equity. Debt and equity holders will be compensated separately.

To project UFCF, you need to forecast:

- **Revenue growth**: Based on historical trends, market conditions, and management guidance
- **Operating margins (EBIT margin)**: Based on historical performance and expected efficiency
- **Tax rate**: Typically the statutory corporate tax rate or the company's effective rate
- **CapEx**: Investments required to maintain and grow the business
- **Net working capital (NWC)**: Changes in receivables, inventory, and payables

### Step 2: Calculate Terminal Value

The projection period (e.g., 5 years) captures only part of the company's value. The **terminal value (TV)** represents the value of all cash flows beyond the projection period.

There are two common methods for calculating terminal value (covered in detail in the next lesson):

1. **Perpetuity Growth Method**: Assumes cash flows grow at a constant rate forever.
2. **Exit Multiple Method**: Applies a valuation multiple (e.g., EV/EBITDA) to the final year's metric.

Terminal value is calculated in year 5 (or the final projection year) and must be discounted back to present value along with the projected cash flows.

### Step 3: Discount Cash Flows to Present Value

Cash flows in the future are worth less than cash flows today due to the time value of money and risk. We discount future cash flows using the **WACC (weighted average cost of capital)**, which represents the blended cost of debt and equity financing.

**Present Value of Year N Cash Flow**:

PV = Cash Flow / (1 + WACC)^N

We discount each year's UFCF and the terminal value back to today (Year 0).

### Step 4: Sum to Get Enterprise Value

**Enterprise Value (EV)** = PV of Projected Cash Flows + PV of Terminal Value

Terminal value typically represents 60-80% of total EV in a DCF, which is why assumptions about terminal growth or exit multiples are critical.

### Step 5: Bridge to Equity Value

Once you have EV, subtract net debt to arrive at equity value:

Equity Value = EV - Net Debt - Preferred Stock - Minority Interest + Investments in Affiliates

Divide by shares outstanding to get **implied share price**, which you can compare to the current market price.

### Example Walkthrough (Simplified)

**Assumptions**:
- Year 1-5 UFCF: $100M, $110M, $120M, $130M, $140M
- Terminal value (calculated in year 5): $2,000M
- WACC: 10%
- Net debt: $300M
- Shares outstanding: 50M

**Step 1: Discount cash flows**

PV(Year 1) = $100M / (1.10)^1 = $90.9M
PV(Year 2) = $110M / (1.10)^2 = $90.9M
PV(Year 3) = $120M / (1.10)^3 = $90.2M
PV(Year 4) = $130M / (1.10)^4 = $88.8M
PV(Year 5) = $140M / (1.10)^5 = $86.9M

**PV of projected cash flows** = $447.7M

**PV of terminal value** = $2,000M / (1.10)^5 = $1,241.8M

**Step 2: Calculate EV**

EV = $447.7M + $1,241.8M = $1,689.5M

**Step 3: Bridge to equity value**

Equity Value = $1,689.5M - $300M = $1,389.5M

**Implied share price** = $1,389.5M / 50M = $27.79

### Common Mistakes

**Using levered cash flows instead of unlevered**: For enterprise value, use unlevered FCF (before debt payments).

**Forgetting to discount terminal value**: Terminal value is calculated in the final year and must be discounted back to present value.

**Not understanding that DCF is sensitive to assumptions**: Small changes in terminal growth rate or WACC can swing valuation significantly. Always run sensitivities.

**Confusing UFCF with cash flow from operations**: UFCF subtracts CapEx and working capital changes. CFO doesn't subtract CapEx.

## Video Placeholder

**Video Title**: DCF Valuation: Mechanics and Methodology

**Outline**:
- What a DCF is and why it's the most rigorous valuation method
- The five-step framework: project cash flows, terminal value, discount to PV, sum to EV, bridge to equity value
- How to calculate unlevered free cash flow (UFCF)
- Discounting cash flows using WACC
- Example walkthrough: from cash flow projections to implied share price

**Suggested Length**: 15 minutes

## Key Takeaways

- DCF values a company based on the present value of projected future cash flows
- Use unlevered free cash flow (UFCF) to value enterprise value (EV)
- UFCF = EBIT × (1 - Tax Rate) + D&A - CapEx - Increase in NWC
- Terminal value represents cash flows beyond the projection period and is a large component of total value
- Discount cash flows and terminal value using WACC to arrive at EV
- Subtract net debt from EV to get equity value and divide by shares outstanding for implied price
