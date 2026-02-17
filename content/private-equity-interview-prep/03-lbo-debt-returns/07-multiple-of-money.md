---
id: multiple-of-money
title: Multiple of Money - Deep Dive
order: 7
estimated_minutes: 40
---

# Multiple of Money - Deep Dive

## Learning Objectives

- Master MOIC calculation including treatment of interim cash flows
- Understand when MOIC is more relevant than IRR for investment decisions
- Calculate gross versus net MOIC and understand the difference
- Develop quick mental math for MOIC in various scenarios
- Apply MOIC analysis to interview questions involving complex capital structures

## Written Guide

### Understanding Multiple of Money

Multiple of money, also called multiple of invested capital (MOIC) or simply "the multiple," measures how many times an investor gets back their original investment. It is the most intuitive return metric: a 3.0x MOIC means the investor receives three dollars for every dollar invested.

The basic MOIC formula is:

**MOIC = Total Distributions / Total Invested Capital**

For a simple investment with no interim cash flows:

**MOIC = Exit Equity Proceeds / Initial Equity Investment**

Unlike IRR, MOIC ignores the time dimension entirely. A 3.0x return is a 3.0x return whether achieved in 2 years or 10 years. This simplicity is both a strength and a limitation, which we will explore throughout this lesson.

### MOIC with Interim Cash Flows

When an investment generates dividends or requires additional capital during the holding period, MOIC calculation must account for all cash movements:

**MOIC = (Sum of All Distributions) / (Sum of All Investments)**

Consider this example:
- Year 0: Invest $100 million
- Year 2: Invest additional $20 million (add-on acquisition)
- Year 3: Receive $30 million dividend
- Year 5: Exit for $280 million

Total Investments: $100M + $20M = $120M
Total Distributions: $30M + $280M = $310M
MOIC: $310M / $120M = 2.58x

Note that MOIC does not consider the timing of these cash flows. The $30 million dividend received in Year 3 is treated the same as if it were received at exit. This is where MOIC differs from IRR, which would value the earlier dividend more highly.

### Gross MOIC vs. Net MOIC

Private equity returns are reported both gross and net of fees and carried interest. Understanding this distinction is essential for both modeling and interviews.

**Gross MOIC**: Returns before management fees and carried interest. This is the fund's investment performance before GP compensation.

**Net MOIC**: Returns after management fees and carried interest. This is what limited partners actually receive.

The relationship depends on fee structure, but a typical conversion:

If Gross MOIC = 2.5x with 2% annual management fee and 20% carry above an 8% preferred return:

Step 1 - Calculate gross proceeds: $100M invested becomes $250M gross
Step 2 - Deduct management fees: Approximately $100M x 2% x 5 years = $10M
Step 3 - Calculate carry: ($250M - $100M - $10M - preferred return) x 20%

The exact calculation is complex because carry is typically calculated on a deal-by-deal or fund-level basis with various catch-up and clawback provisions. For interview purposes, a rough rule of thumb is:

**Net MOIC is approximately Gross MOIC minus 0.3-0.5x** for typical fee structures.

A 2.5x gross MOIC might translate to approximately 2.0-2.2x net MOIC.

### The MOIC Mental Math Framework

Developing quick mental math for MOIC is essential for PE interviews. The calculation breaks down into three components: entry equity, value creation, and debt paydown.

**Framework**:
1. Entry Equity = Entry EV - Entry Debt
2. Exit Equity = Exit EV - Exit Debt
3. MOIC = Exit Equity / Entry Equity

**Worked Example**:

Entry: $400M EV at 8x EBITDA ($50M EBITDA), 60% LTV ($240M debt)
Entry Equity: $400M - $240M = $160M

Exit (5 years): EBITDA grows to $70M, exit at 8x (no multiple change)
Exit EV: $70M x 8 = $560M
Debt paydown: $100M (debt at exit = $140M)
Exit Equity: $560M - $140M = $420M

MOIC: $420M / $160M = 2.63x

### Decomposing MOIC into Value Creation Sources

Like IRR decomposition, MOIC can be broken into components. This analysis reveals where returns came from:

Using the example above:

**EBITDA Growth Contribution**:
Additional EBITDA: $70M - $50M = $20M
At constant 8x multiple: $20M x 8 = $160M of EV increase
Contribution to equity: $160M (assuming no change in debt from this component)

**Multiple Expansion Contribution**:
If exit multiple were 9x instead of 8x:
Additional EV: $70M x (9 - 8) = $70M
This entire amount flows to equity.

**Debt Paydown Contribution**:
Debt reduced from $240M to $140M: $100M
This directly increases equity value by $100M.

**Total from components**: $160M (EBITDA) + $0M (no multiple expansion) + $100M (debt) = $260M
This equals Exit Equity ($420M) minus Entry Equity ($160M).

### MOIC vs. IRR: When Each Matters More

PE professionals use both metrics, but they matter differently in different contexts.

**MOIC is more important when**:

1. **Evaluating total value creation**: LPs ultimately care about total dollars returned. A 2.5x on $500M creates more value than a 3.0x on $100M.

2. **Comparing investments of similar duration**: If two investments both have 5-year holds, MOIC directly compares the multiplication of capital.

3. **Assessing downside protection**: In stressed scenarios, MOIC below 1.0x means capital loss. A 0.7x MOIC loses 30% of capital regardless of IRR.

4. **Fund-level analysis**: LPs evaluate funds partly on total capital returned. Funds that generate high IRRs by returning capital quickly but with modest MOICs may underperform funds with lower IRRs but higher MOICs.

**IRR is more important when**:

1. **Time is variable**: If one deal achieves 2.5x in 3 years and another achieves 2.5x in 6 years, IRR differentiates them (36% vs. 16%).

2. **Comparing against hurdle rates**: PE economics involve preferred returns (hurdles) expressed as IRR, typically 8%. Deals must clear the hurdle before carry is earned.

3. **Opportunity cost analysis**: IRR reflects the compounding rate, making it comparable to other investment opportunities.

4. **Interim cash flow decisions**: Whether to dividend or reinvest depends on IRR analysis, not MOIC.

### Interview Scenario: Trade-Off Analysis

A common interview question explores the MOIC-IRR trade-off:

"We can exit an investment today for 2.2x or hold another 2 years and likely exit at 2.8x. Current holding period is 3 years. Which do you recommend?"

**Analysis**:

Exit today:
- MOIC: 2.2x
- IRR: 2.2^(1/3) - 1 = 30%

Hold 2 more years:
- MOIC: 2.8x
- IRR: 2.8^(1/5) - 1 = 23%

**Framework for recommendation**:

The question tests whether you recognize the trade-off. Exiting today generates a higher IRR (30% vs. 23%) but lower total value (2.2x vs. 2.8x).

Your answer should address:

1. **Certainty**: Is the 2.8x reasonably certain or speculative? What could go wrong in 2 years?

2. **Reinvestment opportunity**: If we exit and return capital to LPs, can they redeploy at attractive rates? If we exit and redeploy in the fund, what opportunities exist?

3. **Fund dynamics**: Where is the fund in its life? Early in the fund, taking a high IRR exit and recycling capital may make sense. Late in the fund, maximizing MOIC may be more important.

4. **LP preferences**: Some LPs prefer cash back (favoring exit), while others prefer long-term compounding (favoring hold).

A thoughtful answer acknowledges both perspectives: "The higher IRR from exiting reflects stronger time-weighted returns, but the additional 0.6x of MOIC represents $X million of incremental value. Given [specific factors], I would recommend [exit/hold] because..."

### MOIC in Complex Capital Structures

When capital structures include preferred equity, management incentives, or sponsor debt, MOIC calculations become more nuanced.

**Preferred Equity Scenario**:

A sponsor invests $100M common equity and $50M preferred equity (with 10% PIK dividend). After 5 years, exit equity proceeds are $300M.

Preferred value at exit: $50M x 1.10^5 = $80.5M
Common equity proceeds: $300M - $80.5M = $219.5M

MOIC on common only: $219.5M / $100M = 2.20x
MOIC on total sponsor investment: $300M / $150M = 2.00x

The preferred acts as downside protection and earns its return before common, but the common equity MOIC differs from the blended MOIC.

**Management Rollover Scenario**:

Management rolls $20M of equity alongside the sponsor's $180M. Exit proceeds are $500M. Management has 10% carry above 2.0x MOIC.

First, calculate blended MOIC: $500M / $200M = 2.5x

Management carry calculation:
Proceeds above 2.0x threshold: $500M - ($200M x 2.0) = $100M
Management carry: $100M x 10% = $10M

Distribution:
Management receives: ($20M / $200M) x $500M + $10M carry = $50M + $10M = $60M
Management MOIC: $60M / $20M = 3.0x

Sponsor receives: $500M - $60M = $440M
Sponsor MOIC: $440M / $180M = 2.44x

The promote structure means management's MOIC exceeds the sponsor's MOIC when the deal outperforms.

### Quick Reference: MOIC Benchmarks

**Outstanding**: 3.0x+ (top quartile performance)
**Strong**: 2.5x-3.0x (solid, fundable returns)
**Acceptable**: 2.0x-2.5x (meets typical fund targets)
**Mediocre**: 1.5x-2.0x (below target, may be okay for some deals)
**Disappointing**: 1.0x-1.5x (capital preserved but weak returns)
**Loss**: Below 1.0x (capital impairment)

For fund-level returns, net MOIC of 2.0x or higher is typically considered strong performance.

## Key Takeaways

- MOIC measures total return as a multiple of invested capital, ignoring time: MOIC = Total Distributions / Total Investments
- Unlike IRR, MOIC treats all cash flows equally regardless of timing, making it a pure measure of capital multiplication
- Gross MOIC (before fees) typically exceeds Net MOIC (after fees) by 0.3-0.5x depending on fee structure
- MOIC decomposition reveals sources of value creation: EBITDA growth, multiple expansion, and debt paydown
- The MOIC-IRR trade-off is a common interview topic: higher IRR (time-weighted) vs. higher MOIC (total value)
- Complex structures with preferred equity or promotes require careful parsing of proceeds to each capital tranche
- Fund-level MOIC targets typically range from 2.0-2.5x net, with 3.0x+ representing top-quartile performance
