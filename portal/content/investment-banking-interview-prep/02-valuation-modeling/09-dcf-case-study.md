---
title: "DCF Model Walkthrough"
subtitle: "Build an intrinsic valuation from scratch"
type: case-study
---

The discounted cash flow analysis is the cornerstone of intrinsic valuation. Unlike trading comps or precedent transactions, a DCF forces you to make explicit assumptions about a company's future—and defend them. Interviewers use DCF questions to test whether you understand valuation mechanics and can think critically about what drives a company's value.

This case study walks through a complete DCF from projection to implied share price, using a realistic scenario you might encounter in an interview or on the job.

---

## The Setup

You're working on a sell-side M&A engagement. The MD asks you to build a quick DCF for the client to establish a valuation baseline before marketing the company.

**TechServices Inc. — DCF Valuation**

**Company Overview:**
- B2B software services company
- LTM Revenue: $200 million
- LTM EBITDA: $40 million (20% margin)
- Stable, recurring revenue model

**Given Information:**
- Revenue growth: 10% Year 1, 8% Year 2, 6% Years 3-5
- EBITDA margin: Stable at 20%
- D&A: 5% of revenue (equals capex, so no net investment)
- Working capital: Negligible change
- Tax rate: 25%
- No debt currently (all-equity capital structure for simplicity)

**Market Data:**
- Risk-free rate: 4.5%
- Equity risk premium: 6.0%
- Company beta: 1.1
- Shares outstanding: 20 million

**Question:** What is the implied share price using a DCF with a 3% terminal growth rate?

Work through this yourself before revealing each solution. The muscle memory matters.

---

## Step-by-Step Walkthrough

```accordion-step
id: step-1-revenue
stepNumber: 1
title: Project Revenue and EBITDA
challenge: |
  Using the given growth rates (10% Year 1, 8% Year 2, 6% Years 3-5), build out the 5-year revenue and EBITDA forecast.

  Start with LTM Revenue of $200M and EBITDA margin of 20%.

  What is the Year 5 revenue and EBITDA?
hint: For Year 5 revenue, calculate $200M × 1.10 × 1.08 × 1.06³
solution: |
  ```calculation
  title: Revenue and EBITDA Projection
  given:
    - "LTM Revenue: $200M"
    - "LTM EBITDA: $40M (20% margin)"
    - "Revenue Growth: 10% Year 1, 8% Year 2, 6% Years 3-5"
    - "EBITDA Margin: 20% (stable)"
  steps:
    - "Year 1 Revenue: $200M x 1.10 = $220M"
    - "Year 1 EBITDA: $220M x 20% = $44M"
    - "Year 2 Revenue: $220M x 1.08 = $238M"
    - "Year 2 EBITDA: $238M x 20% = $48M"
    - "Year 3 Revenue: $238M x 1.06 = $252M"
    - "Year 3 EBITDA: $252M x 20% = $50M"
    - "Year 4 Revenue: $252M x 1.06 = $267M"
    - "Year 4 EBITDA: $267M x 20% = $53M"
    - "Year 5 Revenue: $267M x 1.06 = $283M"
    - "Year 5 EBITDA: $283M x 20% = $57M"
  result: "Year 5 Revenue = $283M, Year 5 EBITDA = $57M"
  note: "Quick math tip: For Year 5 revenue, $200M x 1.10 x 1.08 x 1.06^3 ~ $283M. In an interview, rounding to $280-285M is fine."
  ```

  **Quick math tip:** For Year 5 revenue, $200M × 1.10 × 1.08 × 1.06³ ≈ $283M. In an interview, rounding to $280-285M is fine.
```

```accordion-step
id: step-2-ufcf
stepNumber: 2
title: Calculate Unlevered Free Cash Flow
challenge: |
  Given that D&A equals CapEx (5% of revenue) and working capital is negligible, calculate the Unlevered Free Cash Flow for each year.

  Remember the UFCF formula and think about what simplifications apply when D&A = CapEx.

  What is UFCF for Year 1 and Year 5?
hint: When D&A = CapEx and NWC is flat, UFCF = EBIT × (1 - Tax Rate). EBIT = EBITDA - D&A.
solution: |
  **UFCF Formula:**

  EBITDA - D&A (to get EBIT) - Taxes on EBIT + D&A (add back non-cash) - CapEx - Δ Working Capital = UFCF

  Since D&A equals CapEx and working capital is negligible, this simplifies to:
  **UFCF = EBIT × (1 − Tax Rate)**

  ```calculation
  title: Unlevered Free Cash Flow Calculation
  given:
    - "EBITDA: $44M (Y1), $48M (Y2), $50M (Y3), $53M (Y4), $57M (Y5)"
    - "D&A: 5% of Revenue"
    - "Tax Rate: 25%"
    - "D&A = CapEx, Working Capital change = $0"
  steps:
    - "Year 1: EBITDA $44M - D&A ($11M) = EBIT $33M, Taxes ($8M), UFCF = $25M"
    - "Year 2: EBITDA $48M - D&A ($12M) = EBIT $36M, Taxes ($9M), UFCF = $27M"
    - "Year 3: EBITDA $50M - D&A ($13M) = EBIT $37M, Taxes ($9M), UFCF = $28M"
    - "Year 4: EBITDA $53M - D&A ($13M) = EBIT $40M, Taxes ($10M), UFCF = $30M"
    - "Year 5: EBITDA $57M - D&A ($14M) = EBIT $43M, Taxes ($11M), UFCF = $32M"
  result: "UFCF Year 1 = $25M, UFCF Year 5 = $32M"
  note: "Since D&A equals CapEx and working capital is stable, UFCF simplifies to EBIT after-tax."
  ```

  **Interview shortcut:** State this assumption to save time: "Since D&A equals CapEx and working capital is stable, I'll calculate UFCF as EBIT after-tax."
```

```accordion-step
id: step-3-wacc
stepNumber: 3
title: Calculate WACC
challenge: |
  Using the CAPM formula, calculate the cost of equity and WACC.

  Given: Risk-free rate = 4.5%, Equity risk premium = 6.0%, Beta = 1.1, No debt.

  What is the WACC?
hint: Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium. With no debt, WACC = Cost of Equity.
solution: |
  **Cost of Equity (CAPM):**

  Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium
  Cost of Equity = 4.5% + 1.1 × 6.0%
  Cost of Equity = 4.5% + 6.6%
  **Cost of Equity = 11.1%**

  **WACC:** With 100% equity financing, **WACC = 11.1%** (round to 11% for simplicity).

  Note: If the company had debt, you'd calculate:
  WACC = (E/V × Cost of Equity) + (D/V × Cost of Debt × (1 − Tax Rate))
```

```accordion-step
id: step-4-terminal
stepNumber: 4
title: Calculate Terminal Value
challenge: |
  Using the perpetuity growth method with a 3% terminal growth rate, calculate the terminal value.

  Remember: Terminal Value = Final Year UFCF × (1 + g) / (WACC − g)

  What is the terminal value?
hint: TV = $32M × 1.03 / (0.11 - 0.03)
solution: |
  **Perpetuity Growth Method:**

  Terminal Value = Final Year UFCF × (1 + g) / (WACC − g)
  Terminal Value = $32M × (1.03) / (0.11 − 0.03)
  Terminal Value = $33M / 0.08
  **Terminal Value = $412.5M**

  **Sanity check:** Terminal growth should not exceed long-term GDP growth (2-3%). A company can't grow faster than the economy forever. If your terminal growth rate is above 3%, you need a compelling reason.

  Alternative using Exit Multiple Method:
  Terminal Value = Year 5 EBITDA × Exit Multiple = $57M × 8.0x = $456M
```

```accordion-step
id: step-5-discount
stepNumber: 5
title: Discount Cash Flows to Present Value
challenge: |
  Discount each year's UFCF and the terminal value back to today using WACC = 11%.

  Discount factor formula: 1 / (1 + WACC)^n

  What is the Enterprise Value?
hint: Year 5 discount factor = 1 / 1.11^5 ≈ 0.593. Sum the PV of all cash flows plus PV of terminal value.
solution: |
  Using WACC = 11%:

  ```calculation
  title: Present Value of Cash Flows
  given:
    - "WACC: 11%"
    - "Discount Factor Formula: 1 / (1 + WACC)^n"
  steps:
    - "Year 1: UFCF $25M x (1 / 1.11^1 = 0.901) = PV $22.5M"
    - "Year 2: UFCF $27M x (1 / 1.11^2 = 0.812) = PV $21.9M"
    - "Year 3: UFCF $28M x (1 / 1.11^3 = 0.731) = PV $20.5M"
    - "Year 4: UFCF $30M x (1 / 1.11^4 = 0.659) = PV $19.8M"
    - "Year 5: UFCF $32M x (1 / 1.11^5 = 0.593) = PV $19.0M"
    - "Terminal Value: $412.5M x 0.593 = PV $244.6M"
    - "Sum of PV of Cash Flows: $22.5 + $21.9 + $20.5 + $19.8 + $19.0 = $103.7M"
    - "PV of Terminal Value: $244.6M"
  result: "Enterprise Value = $103.7M + $244.6M = $348.3M"
  ```

  **Sum of PV of Cash Flows:** $22.5 + $21.9 + $20.5 + $19.8 + $19.0 = **$103.7M**

  **PV of Terminal Value:** **$244.6M**

  **Enterprise Value:** $103.7M + $244.6M = **$348.3M**
```

```accordion-step
id: step-6-equity
stepNumber: 6
title: Bridge to Equity Value and Share Price
challenge: |
  Convert Enterprise Value to Equity Value and calculate the implied share price.

  The company has no debt and no cash given. Shares outstanding = 20 million.

  What is the implied share price?
hint: Equity Value = EV + Cash - Debt. Share Price = Equity Value / Shares Outstanding.
solution: |
  **Equity Value Bridge:**

  Enterprise Value: $348.3M
  Plus: Cash: $0 (not given, assume zero)
  Less: Debt: $0 (company has no debt)
  **Equity Value: $348.3M**

  **Implied Share Price:**

  Equity Value / Shares Outstanding = $348.3M / 20M shares = **$17.42 per share**
```

---

## The Answer

"Based on a DCF with 5-year projections, an 11% WACC, and a 3% terminal growth rate, TechServices has an implied enterprise value of approximately **$350 million** and an implied share price of roughly **$17.50**.

Note that terminal value represents about 70% of total value ($245M of $348M), which is typical for a DCF. I'd want to sensitivity-test the WACC and terminal growth assumptions given their impact on valuation."

---

## Sensitivity Analysis

A DCF is only as good as its assumptions. Interviewers expect you to understand which inputs matter most.

### WACC vs. Terminal Growth Sensitivity

```calculation
title: WACC vs. Terminal Growth Rate Sensitivity (Enterprise Value)
given:
  - "WACC Range: 10.0% to 12.0%"
  - "Terminal Growth Rate (TGR) Range: 2.0% to 3.5%"
steps:
  - "10.0% WACC: $362M (2.0% TGR), $387M (2.5% TGR), $418M (3.0% TGR), $456M (3.5% TGR)"
  - "10.5% WACC: $340M (2.0% TGR), $362M (2.5% TGR), $388M (3.0% TGR), $420M (3.5% TGR)"
  - "11.0% WACC: $320M (2.0% TGR), $338M (2.5% TGR), $361M (3.0% TGR), $388M (3.5% TGR)"
  - "11.5% WACC: $302M (2.0% TGR), $318M (2.5% TGR), $338M (3.0% TGR), $361M (3.5% TGR)"
  - "12.0% WACC: $286M (2.0% TGR), $300M (2.5% TGR), $318M (3.0% TGR), $338M (3.5% TGR)"
result: "Valuation range from $286M (12.0% WACC, 2.0% TGR) to $456M (10.0% WACC, 3.5% TGR)"
note: "A 1% change in WACC or terminal growth can swing value by 15-20%. This is why bankers present DCF valuations as ranges, not point estimates."
```

**Key insight:** A 1% change in WACC or terminal growth can swing value by 15-20%. This is why bankers present DCF valuations as ranges, not point estimates.

---

## What Interviewers Listen For

### 1. Mechanical Fluency

Can you walk through the DCF formula without hesitation?
- Revenue → EBITDA → EBIT → NOPAT → UFCF
- CAPM for cost of equity
- Terminal value calculation
- Discounting mechanics

### 2. Conceptual Understanding

Do you know *why* each step matters?
- "Why do we use unlevered free cash flow?" (Cash to all capital holders, agnostic to capital structure)
- "Why add back D&A then subtract CapEx?" (D&A is non-cash; CapEx is real cash out)
- "Why does terminal value dominate?" (Most of a company's value comes from long-term cash flows)

### 3. Practical Judgment

Can you critique your own output?
- "70% terminal value is high but reasonable for a stable growth company"
- "11% WACC assumes market beta—this company might warrant a size premium"
- "3% terminal growth is aggressive for a tech services company—I'd test 2-2.5%"

### 4. Sensitivity Awareness

What are the key value drivers?
- Terminal growth rate has the biggest impact
- WACC assumptions matter significantly
- Near-term revenue growth matters less than terminal assumptions

---

## Key Takeaways

- DCF values a company based on projected free cash flows discounted to present value
- UFCF = EBIT × (1 − Tax Rate) + D&A − CapEx − Δ NWC
- WACC = weighted average of cost of equity (CAPM) and after-tax cost of debt
- Terminal value typically represents 60-80% of DCF value—scrutinize these assumptions
- Always sensitivity-test WACC and terminal growth rate
- DCF provides intrinsic value; comps provide market value—they often differ
