---
id: walking-through-an-lbo
title: Walking Through an LBO
order: 5
estimated_minutes: 40
video:
  provider: vimeo
  id: "1164445421"
---

# Walking Through an LBO

## Learning Objectives

- Walk through a complete LBO from entry to exit in a structured, step-by-step manner
- Explain how to calculate entry valuation, sources and uses, returns, and IRR
- Show you can answer "Walk me through an LBO" in an interview setting
- Understand the key assumptions and sensitivities in an LBO model
- Monitor credit ratios (Debt/EBITDA, Interest Coverage) and understand covenant implications

## Written Guide

### Why "Walk Me Through an LBO" Is Asked

"Walk me through an LBO" is one of the most common private equity and investment banking interview questions. It tests:

- Your understanding of LBO mechanics
- Your ability to think through a transaction step-by-step
- Your fluency with valuation, leverage, and returns

A strong answer is structured, concise, and shows that you understand the inputs, process, and outputs of an LBO.

### The Framework: 7 Steps to Walk Through an LBO

Use this framework to answer the question clearly:

1. **Determine Entry Valuation**
2. **Build Sources and Uses**
3. **Project the Business (EBITDA Growth, Cash Flow)**
4. **Model Debt Paydown**
5. **Determine Exit Valuation**
6. **Calculate Ending Equity Value**
7. **Calculate Returns (MOIC and IRR)**

### Step 1: Determine Entry Valuation

Start by calculating the **entry enterprise value (EV)**.

**Method 1: Multiple-Based**
- Entry EV = Entry EBITDA × Entry Multiple
- Example: $100M EBITDA × 10.0× = $1,000M EV

**Method 2: Given Purchase Price**
- If the purchase price (equity value) is given, add net debt to get EV
- EV = Equity Value + Net Debt

For interview purposes, assume you're given an entry EBITDA and entry multiple.

### Step 2: Build Sources and Uses

Determine how the deal is financed.

**Uses**:
- Purchase Equity
- Refinance Existing Debt (if applicable)
- Transaction Fees (assume 2-3% of EV)

**Sources**:
- Debt (assume 60-70% of total)
- Sponsor Equity (30-40%)

**Example**:

Entry EV = $1,000M
- Assume 70% debt: $700M
- Assume 30% equity: $300M
- Transaction fees: $30M (3% of EV)

Total Uses = $1,000M (purchase) + $30M (fees) = $1,030M
Total Sources = $700M (debt) + $330M (equity) = $1,030M ✓

**Sponsor equity invested = $330M**

### Step 3: Project the Business

Project EBITDA and free cash flow over the hold period (typically 5 years).

**Example**:
- Entry EBITDA: $100M
- Assume 8% annual growth
- Year 5 EBITDA = $100M × (1.08)^5 = $146.9M

To calculate free cash flow:
- EBITDA
- Less: Taxes (assume 25% tax rate on EBIT, if EBIT ≈ EBITDA for simplicity)
- Less: CapEx (assume 3% of revenue or flat amount)
- Less: Increase in Net Working Capital
- = Free Cash Flow (available to pay down debt)

For interview purposes, you can simplify: assume free cash flow is a percentage of EBITDA (e.g., 60% of EBITDA).

### Step 4: Model Debt Paydown

Use free cash flow to pay down debt over the hold period.

**Example**:
- Starting Debt: $700M
- Assume $40M/year in free cash flow available for debt paydown
- After 5 years: Debt paid down = $40M × 5 = $200M
- Ending Debt = $700M - $200M = $500M

### Credit Ratios and Covenant Compliance

Lenders require the company to maintain certain **credit ratios** throughout the hold period. These are tested quarterly (maintenance covenants) or when taking specific actions (incurrence covenants). Key ratios include:

**Leverage Ratios**:
- **Total Debt / EBITDA**: Measures overall leverage. LBOs often start at 5-7× and must decline over time.
- **Senior Debt / EBITDA**: Measures senior leverage only. Typically 3-4× at entry.
- **Net Debt / EBITDA**: Adjusts for cash on hand.

**Coverage Ratios**:
- **Interest Coverage (EBITDA / Interest Expense)**: Measures ability to pay interest. Minimum typically 2.0-3.0×.
- **Fixed Charge Coverage ((EBITDA - CapEx) / (Interest + Debt Amortization))**: More stringent, includes mandatory debt payments.
- **Debt Service Coverage (EBITDA / (Interest + Principal))**: Comprehensive measure of debt service ability.

**Example Credit Ratio Trajectory**:

```calculation
title: "Credit Ratio Trajectory Over Hold Period"
given:
  - "Entry EBITDA: $100M, growing ~8% annually"
  - "Starting Total Debt: $700M"
  - "Debt paydown: ~$40M per year from free cash flow"
steps:
  - "Year 0: EBITDA $100M, Debt $700M, Debt/EBITDA 7.0x, Interest $42M, Coverage 2.4x"
  - "Year 1: EBITDA $108M, Debt $660M, Debt/EBITDA 6.1x, Interest $40M, Coverage 2.7x"
  - "Year 3: EBITDA $125M, Debt $580M, Debt/EBITDA 4.6x, Interest $35M, Coverage 3.6x"
  - "Year 5: EBITDA $147M, Debt $500M, Debt/EBITDA 3.4x, Interest $30M, Coverage 4.9x"
result: "Leverage declines from 7.0x to 3.4x; coverage improves from 2.4x to 4.9x over 5 years"
note: "Both EBITDA growth and debt paydown contribute to improving credit ratios over the hold period"
```

**Why Credit Ratios Matter**:
- **Covenant breach** can trigger default, allowing lenders to accelerate repayment
- **Refinancing**: Better ratios enable the company to refinance at lower rates
- **Dividend recaps**: PE sponsors often can't take dividends until leverage falls below a threshold (e.g., 4.5× Debt/EBITDA)
- **Exit valuation**: Buyers will underwrite to similar leverage levels, so improving credit metrics can signal a healthy, de-risked business

### Step 5: Determine Exit Valuation

Calculate the **exit enterprise value** using an exit multiple.

**Exit EV = Exit EBITDA × Exit Multiple**

**Example**:
- Exit EBITDA (Year 5): $146.9M
- Exit Multiple: 10.0× (assume same as entry)
- Exit EV = $146.9M × 10.0 = $1,469M

### Step 6: Calculate Ending Equity Value

Subtract the remaining debt from exit EV.

**Ending Equity Value = Exit EV - Remaining Debt**

**Example**:
- Exit EV: $1,469M
- Remaining Debt: $500M
- Ending Equity Value = $1,469M - $500M = $969M

### Step 7: Calculate Returns

**MOIC**:

MOIC = Ending Equity Value / Sponsor Equity Invested

= $969M / $330M = 2.94×

**IRR**:

IRR is the annualized return over 5 years. For a 2.94× return over 5 years, IRR ≈ 24%.

(Use a financial calculator or Excel: -$330M at Year 0, +$969M at Year 5)

### Putting It All Together: Sample Interview Answer

**Interviewer**: "Walk me through an LBO."

**Candidate**:

"Sure. I'll walk through a simplified LBO step-by-step.

First, I'd determine the entry valuation. Let's say the company has $100 million in EBITDA, and we're acquiring it at a 10× multiple, so the entry enterprise value is $1 billion.

Next, I'd build the sources and uses. On the uses side, we're purchasing the equity and paying transaction fees—let's assume $30 million in fees. On the sources side, we'll finance the deal with 70% debt ($700 million) and 30% equity ($330 million from the sponsor). So total uses are $1.03 billion, and total sources are $1.03 billion.

Then I'd project the business over a 5-year hold. Assume EBITDA grows at 8% per year, so by Year 5, EBITDA is about $147 million. I'd also project free cash flow—let's say the company generates $40 million per year in cash available to pay down debt.

Over 5 years, we pay down $200 million of debt, so the remaining debt at exit is $500 million.

At exit, I'd calculate the exit enterprise value. Using the same 10× multiple on Year 5 EBITDA of $147 million, the exit EV is $1.47 billion.

To get ending equity value, I subtract the remaining debt: $1.47 billion minus $500 million equals $969 million.

Finally, I'd calculate returns. The MOIC is $969 million divided by $330 million, which is about 2.9×. The IRR over 5 years is approximately 24%.

That's the basic framework for walking through an LBO."

### Common Mistakes

**Forgetting transaction fees**: Fees are part of the uses and increase the equity required.

**Not paying down debt**: Debt paydown is a key driver of returns. Don't forget to model it.

**Confusing enterprise value with equity value**: At exit, subtract remaining debt from EV to get equity value.

**Not calculating IRR**: MOIC is important, but interviewers often want to know IRR as well.

**Being too detailed or too vague**: Find the right balance. Don't build a full model in your head, but don't skip key steps either.

