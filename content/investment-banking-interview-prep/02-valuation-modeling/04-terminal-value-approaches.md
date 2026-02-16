---
id: terminal-value-approaches
title: Terminal Value Approaches
order: 4
estimated_minutes: 30
---

# Terminal Value Approaches

## Learning Objectives

- Explain why terminal value is necessary and what it represents in a DCF
- Calculate terminal value using the perpetuity growth method
- Calculate terminal value using the exit multiple method
- Understand the advantages and limitations of each approach
- Evaluate the sensitivity of DCF valuations to terminal value assumptions

## Written Guide

### Why Terminal Value Matters

In a DCF, we project cash flows for a finite period—typically 5 to 10 years. But companies don't stop generating cash after year 5. The **terminal value (TV)** represents the present value of all cash flows beyond the projection period.

Terminal value typically accounts for **60-80% of total enterprise value** in a DCF. This makes terminal value assumptions—growth rates or exit multiples—critical drivers of valuation.

Small changes in terminal assumptions can have outsized effects on value, which is why DCF results are often presented with sensitivity tables.

### Two Methods for Calculating Terminal Value

There are two standard approaches:

1. **Perpetuity Growth Method** (also called the Gordon Growth Model)
2. **Exit Multiple Method**

Both calculate the terminal value as of the final year of projections (e.g., Year 5), which must then be discounted back to present value.

### Method 1: Perpetuity Growth Method

The **perpetuity growth method** assumes that the company's free cash flows will grow at a constant rate forever.

**Formula**:

Terminal Value = (Final Year UFCF × (1 + g)) / (WACC - g)

Where:
- **Final Year UFCF** = Unlevered free cash flow in the last projection year (e.g., Year 5)
- **g** = Perpetual growth rate
- **WACC** = Discount rate

**Intuition**: This formula values a growing perpetuity. If cash flows grow at **g** forever and the required return is **WACC**, the present value (as of Year 5) is given by the formula above.

**Choosing the growth rate (g)**:

The perpetual growth rate should be conservative and sustainable. Common choices:

- **GDP growth rate**: 2-3% for developed economies
- **Inflation rate**: 2-3%
- **Industry-specific long-term growth**: If the industry is expected to grow faster or slower than GDP

**Important**: The growth rate **must be lower than WACC**. If g >= WACC, the formula breaks down (division by zero or negative denominator).

**Example**:

- Year 5 UFCF = $140M
- Perpetual growth rate (g) = 2.5%
- WACC = 9%

Terminal Value (Year 5) = ($140M × 1.025) / (0.09 - 0.025) = $143.5M / 0.065 = $2,207.7M

This terminal value is as of Year 5, so we must discount it back to present value:

PV of Terminal Value = $2,207.7M / (1.09)^5 = $1,434.2M

### Method 2: Exit Multiple Method

The **exit multiple method** applies a valuation multiple (typically **EV/EBITDA**) to the company's final year metric.

**Formula**:

Terminal Value = Final Year EBITDA × Exit Multiple

Where:
- **Final Year EBITDA** = EBITDA in the last projection year (e.g., Year 5)
- **Exit Multiple** = EV/EBITDA multiple, often based on comparable companies or industry averages

**Choosing the exit multiple**:

The exit multiple is typically based on:

- **Current comparable company trading multiples** (e.g., median EV/EBITDA of peers)
- **Historical multiples** for the company or industry
- **Precedent transaction multiples**, if the assumption is that the company will be sold

**Example**:

- Year 5 EBITDA = $200M
- Exit multiple = 10.0× (based on comps)

Terminal Value (Year 5) = $200M × 10.0 = $2,000M

PV of Terminal Value = $2,000M / (1.09)^5 = $1,299.9M

### Perpetuity Growth vs. Exit Multiple: When to Use Each

**Perpetuity Growth Method**:
- Best for mature, stable companies with predictable long-term growth
- Avoids reliance on market multiples, which can be volatile
- Requires a reasonable assumption for perpetual growth

**Exit Multiple Method**:
- Common in M&A contexts, where the assumption is that the company will be sold
- Easier to benchmark against current market conditions
- Can be circular if you're using comps to value comps

In practice, many DCF models calculate terminal value using **both methods** and present a range or average.

### Sensitivity of DCF to Terminal Value

Because terminal value represents the majority of enterprise value, small changes in assumptions can significantly affect valuation.

**Example sensitivities**:

- Increasing the perpetual growth rate from 2% to 3% might increase EV by 10-15%
- Changing the exit multiple from 9.0× to 10.0× might increase EV by 8-12%

Bankers typically present **sensitivity tables** showing how EV changes across a range of growth rates or multiples.

### Common Mistakes

**Using an unrealistic growth rate**: A 5% perpetual growth rate is aggressive for most companies. Long-term growth shouldn't exceed GDP growth by much.

**Forgetting to discount terminal value**: Terminal value is calculated in Year 5 (or the final year), so it must be discounted back to present value.

**Using the wrong multiple**: If using the exit multiple method, make sure the multiple is appropriate (e.g., EV/EBITDA for operating companies, P/E for financials).

**Assuming g = WACC**: If the growth rate equals WACC, the formula breaks. Growth must be lower than the discount rate.

