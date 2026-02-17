---
id: returns-sensitivities
title: Returns Sensitivity Analysis and Key Drivers
order: 8
estimated_minutes: 35
---

# Returns Sensitivity Analysis and Key Drivers

## Learning Objectives

- Identify the key drivers that most significantly impact LBO returns
- Build and interpret sensitivity tables for IRR and MOIC
- Understand how changes in entry valuation, growth, margins, leverage, and exit affect returns
- Develop intuition for which variables matter most in different scenarios
- Apply sensitivity analysis to interview discussions and investment recommendations

## Written Guide

### Why Sensitivity Analysis Matters

Private equity investments are built on projections that inevitably contain uncertainty. Revenue growth may exceed or fall short of expectations. Margins may expand or compress. Exit multiples may differ from entry assumptions. Sensitivity analysis provides a framework for understanding how returns change as these variables move from their base case assumptions.

Beyond mechanical calculation, sensitivity analysis reveals which assumptions drive the investment thesis and where the risks lie. An investment where returns swing wildly with small changes in exit multiple is fundamentally different from one where returns are robust across multiple scenarios. Understanding these dynamics is essential for investment committee presentations and PE interviews.

### The Primary Return Drivers

LBO returns are driven by five primary variables, each with different degrees of impact depending on the specific investment:

**1. Entry Valuation (Purchase Multiple)**: The price paid relative to EBITDA. Lower entry multiples mean less equity required for the same enterprise value, directly improving returns.

**2. Revenue Growth**: Top-line expansion drives EBITDA growth (assuming stable margins) and increases enterprise value at exit.

**3. Margin Expansion**: Operational improvements that increase EBITDA margins multiply the impact of revenue growth on profitability.

**4. Exit Multiple**: The valuation multiple achieved at sale. Multiple expansion from entry to exit provides a significant return boost.

**5. Leverage and Debt Paydown**: Higher initial leverage reduces equity required, while debt paydown during the hold transfers value from debt to equity.

### Building a Sensitivity Table: Entry Multiple vs. Exit Multiple

The most common sensitivity analysis examines entry and exit multiples because these represent the valuation parameters that sponsors can partly control (entry) and partly predict (exit).

**Base Case Setup**:
- Entry EBITDA: $100 million
- Entry Multiple: 10.0x (EV = $1,000 million)
- Debt: $600 million (60% LTV)
- Equity: $400 million
- Exit EBITDA (Year 5): $150 million
- Exit Multiple: 10.0x (no expansion)
- Debt at Exit: $400 million
- Exit EV: $1,500 million
- Exit Equity: $1,100 million
- MOIC: 2.75x
- IRR: 22.4%

**Sensitivity Table (MOIC)**:

| Entry \ Exit | 8.0x | 9.0x | 10.0x | 11.0x | 12.0x |
|-------------|------|------|-------|-------|-------|
| **8.0x**    | 2.67x| 3.17x| 3.67x | 4.17x | 4.67x |
| **9.0x**    | 2.20x| 2.63x| 3.07x | 3.50x | 3.93x |
| **10.0x**   | 1.83x| 2.21x| 2.58x | 2.96x | 3.33x |
| **11.0x**   | 1.54x| 1.87x| 2.21x | 2.54x | 2.88x |
| **12.0x**   | 1.30x| 1.60x| 1.90x | 2.20x | 2.50x |

This table reveals several insights:

1. **Diagonal represents no multiple change**: Entry at 10x, exit at 10x yields 2.58x MOIC purely from EBITDA growth and debt paydown.

2. **Each row shows exit sensitivity**: At 10x entry, MOIC ranges from 1.83x (8x exit) to 3.33x (12x exit), a 1.5x swing from exit multiple alone.

3. **Each column shows entry sensitivity**: At 10x exit, MOIC ranges from 3.67x (8x entry) to 1.90x (12x entry), demonstrating the power of buying cheap.

### EBITDA Growth Sensitivity

EBITDA growth is often the largest return driver because sponsors can influence it through operational improvements, add-ons, and revenue initiatives.

**Sensitivity: EBITDA Growth CAGR vs. Holding Period**

Using the base case (10x entry and exit, 60% initial leverage):

| Growth CAGR \ Years | 3 Years | 4 Years | 5 Years | 6 Years |
|---------------------|---------|---------|---------|---------|
| **5%**              | 1.57x   | 1.70x   | 1.84x   | 1.99x   |
| **8%**              | 1.73x   | 1.96x   | 2.22x   | 2.51x   |
| **10%**             | 1.86x   | 2.15x   | 2.50x   | 2.90x   |
| **12%**             | 1.99x   | 2.36x   | 2.82x   | 3.35x   |
| **15%**             | 2.20x   | 2.70x   | 3.32x   | 4.08x   |

Key observations:

1. **Growth compounds**: The difference between 8% and 12% growth widens significantly over time (0.26x difference at Year 3 vs. 0.60x at Year 5).

2. **Longer holds magnify operational gains**: 15% EBITDA CAGR generates 2.20x over 3 years but 4.08x over 6 years.

3. **Low growth is tolerable with short holds**: 5% growth still generates 1.57x over 3 years if you can exit quickly.

### Leverage Sensitivity

Initial leverage affects both the amount of equity required and the debt service burden during the hold.

**Sensitivity: Initial Leverage vs. IRR**

Assuming 10% EBITDA CAGR, 10x entry and exit, 5-year hold:

| Leverage (Debt/EV) | Entry Equity | Exit Equity | MOIC  | IRR   |
|-------------------|--------------|-------------|-------|-------|
| **40%**           | $600M        | $1,210M     | 2.02x | 15.1% |
| **50%**           | $500M        | $1,110M     | 2.22x | 17.3% |
| **60%**           | $400M        | $1,010M     | 2.53x | 20.4% |
| **70%**           | $300M        | $910M       | 3.03x | 24.8% |

Increasing leverage from 50% to 60% boosts IRR by 3.1 percentage points. This illustrates why sponsors push for maximum leverage, though higher debt also increases risk if the company underperforms.

### Margin Sensitivity

Operating margin improvements multiply through the P&L to EBITDA:

**Scenario**: $500M revenue company with 20% EBITDA margin ($100M EBITDA)

| Margin Change | New Margin | EBITDA    | Impact  |
|---------------|------------|-----------|---------|
| -200 bps      | 18%        | $90M      | -10%    |
| -100 bps      | 19%        | $95M      | -5%     |
| Base          | 20%        | $100M     | -       |
| +100 bps      | 21%        | $105M     | +5%     |
| +200 bps      | 22%        | $110M     | +10%    |
| +300 bps      | 23%        | $115M     | +15%    |

Each 100 basis points of margin improvement adds 5% to EBITDA. Over a 5-year hold with growth, the compounding effect is substantial.

**Interview Insight**: Margin improvement is particularly valuable because it requires no additional capital (unlike revenue growth, which may require working capital and CapEx). A business that can expand margins through operational efficiency delivers "free" EBITDA growth.

### Scenario Analysis: Base, Upside, Downside

Beyond sensitivity tables, sponsors build discrete scenarios to understand the range of outcomes:

**Base Case**: Management plan assumptions
- Revenue CAGR: 6%
- EBITDA margin: Stable at 22%
- Exit multiple: 10x (same as entry)
- Result: 2.4x MOIC, 19% IRR

**Upside Case**: Thesis plays out better than expected
- Revenue CAGR: 9% (market share gains)
- EBITDA margin: Expands to 25% (operating leverage)
- Exit multiple: 11x (strategic premium)
- Result: 3.8x MOIC, 31% IRR

**Downside Case**: Key risks materialize
- Revenue CAGR: 2% (customer losses)
- EBITDA margin: Compresses to 18% (pricing pressure)
- Exit multiple: 8x (multiple contraction)
- Result: 1.3x MOIC, 5% IRR

**Floor Case**: Stress test
- Revenue declines 10% cumulative
- EBITDA margin: 15%
- Exit multiple: 6x
- Result: 0.6x MOIC (capital loss)

This scenario framework reveals that the investment can generate strong returns in the base case but risks significant loss if multiple factors deteriorate simultaneously.

### Interview Application: Discussing Sensitivities

Interviewers test sensitivity understanding through questions like:

**"What is the most important driver of returns in this LBO?"**

Your answer should identify the primary driver based on the specific situation:

"In a stable, mature business with limited organic growth, the most important driver is typically the exit multiple because EBITDA will not grow significantly during the hold. In a high-growth business, revenue growth and margin expansion dominate because they compound over the holding period. For highly leveraged deals, the entry multiple and debt paydown become critical because small changes in value have magnified effects on the smaller equity base."

**"How would you stress test this investment?"**

"I would build three scenarios: base case using management projections, downside case with 20-30% reduction in EBITDA assumptions, and a floor case testing the debt capacity of the business. The key question is whether the investment returns capital (MOIC > 1.0x) even in the downside case, and what would have to go wrong to hit the floor case. If the downside still generates reasonable returns and the floor case requires multiple low-probability events occurring simultaneously, the risk profile is acceptable."

**"The exit multiple is 10x in your base case. What if it compresses to 8x?"**

Calculate the impact: 20% multiple contraction on exit EBITDA directly reduces exit enterprise value by 20%. The impact on equity is magnified by leverage. If exit EV falls from $1,500M to $1,200M (20% decline) but debt remains $400M, equity falls from $1,100M to $800M (27% decline). MOIC drops from 2.75x to 2.00x.

"Multiple compression of 2 turns would reduce our MOIC from 2.75x to approximately 2.0x, a 27% reduction in equity proceeds despite only a 20% reduction in enterprise value. This illustrates why we focus heavily on entry valuation discipline and businesses with defensible characteristics that support exit valuations."

### Building Intuition: Rules of Thumb

**Entry multiple**: Each turn of entry multiple reduction (e.g., 10x to 9x) typically improves MOIC by 0.3-0.5x, depending on leverage.

**Exit multiple**: Each turn of exit multiple improvement typically improves MOIC by 0.3-0.4x.

**EBITDA growth**: 5% additional EBITDA CAGR over 5 years typically adds 0.3-0.5x to MOIC.

**Leverage**: 10% additional leverage (50% to 60% debt/EV) typically adds 0.2-0.3x to MOIC and 2-3% to IRR.

**Holding period**: Extending the hold by 1 year at constant IRR adds approximately (MOIC x IRR) to the multiple.

These rules of thumb enable quick mental math during interviews and investment discussions.

## Key Takeaways

- Sensitivity analysis reveals how returns change as key assumptions vary, identifying both opportunities and risks
- The five primary return drivers are entry valuation, revenue growth, margin expansion, exit multiple, and leverage/debt paydown
- Entry and exit multiple sensitivities show how valuation assumptions affect returns, with leverage magnifying the impact
- EBITDA growth is often the most controllable driver; its impact compounds significantly over longer holding periods
- Scenario analysis (base, upside, downside, floor) provides a framework for understanding the range of potential outcomes
- Develop rules of thumb for quick mental math: each turn of entry multiple reduction typically adds 0.3-0.5x to MOIC
- The ability to discuss which drivers matter most in specific situations demonstrates investment judgment valued in interviews
