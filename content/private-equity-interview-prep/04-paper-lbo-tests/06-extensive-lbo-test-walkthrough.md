---
id: extensive-lbo-test-walkthrough
title: Extensive LBO Test Walkthrough
order: 6
estimated_minutes: 50
---

This lesson walks through building a complete take-home LBO model from start to finish. We'll use a realistic example with enough complexity to mirror what you'd face in an actual PE interview. Follow along in Excel to internalize the workflow.

## The Case Setup

You've received materials for HealthServ Inc., a healthcare services company:

**Historical Financials (Year 0):**
- Revenue: $200M
- Gross Margin: 45%
- SG&A: $40M (20% of revenue)
- D&A: $10M
- Interest Expense: $5M (existing debt of $50M at 10%)
- Tax Rate: 25%
- Current Assets (ex-cash): $35M
- Current Liabilities (ex-debt): $25M
- Capex: $12M

**Transaction Assumptions:**
- Entry Multiple: 9x EBITDA
- Leverage: 5.5x EBITDA (Senior at 4x, Subordinated at 1.5x)
- Senior Interest Rate: 6%
- Subordinated Interest Rate: 10%
- Senior Amortization: 5% annually
- Management Rollover: 10% of exit equity
- Transaction Fees: 2% of enterprise value

**Projections:**
- Revenue Growth: 6% annually
- Gross Margin: flat at 45%
- SG&A: 19% of revenue (slight operating leverage)
- D&A: flat at $10M
- Capex: $12M annually
- Working Capital: stable as percentage of revenue

## Step 1: Calculate Entry EBITDA and Transaction Structure

First, derive entry EBITDA from the historicals.

Revenue: $200M
Gross Profit: $200M times 45% equals $90M
SG&A: $40M
EBITDA: $90M minus $40M equals $50M

Now build sources and uses.

**Uses:**
- Purchase Price: $50M EBITDA times 9x equals $450M
- Transaction Fees: 2% of $450M equals $9M
- Refinance Existing Debt: $50M
- Total Uses: $509M

**Sources:**
- Senior Debt: 4x times $50M equals $200M
- Subordinated Debt: 1.5x times $50M equals $75M
- Total Debt: $275M
- Sponsor Equity: $509M minus $275M equals $234M
- Total Sources: $509M

Your entry equity check: Total debt of $275M represents 5.5x leverage on $50M EBITDA. Entry equity is $234M.

## Step 2: Build the Operating Model

Project revenue, costs, and EBITDA for Years 1-5.

**Year 1:**
- Revenue: $200M times 1.06 equals $212M
- Gross Profit: $212M times 45% equals $95.4M
- SG&A: $212M times 19% equals $40.3M
- EBITDA: $95.4M minus $40.3M equals $55.1M

Continue this for Years 2-5:

| Year | Revenue | Gross Profit | SG&A | EBITDA |
|------|---------|--------------|------|--------|
| 1 | $212M | $95.4M | $40.3M | $55.1M |
| 2 | $225M | $101.1M | $42.7M | $58.4M |
| 3 | $238M | $107.2M | $45.3M | $61.9M |
| 4 | $253M | $113.6M | $48.0M | $65.6M |
| 5 | $268M | $120.4M | $50.9M | $69.5M |

EBITDA grows from $50M to $69.5M, a 39% increase driven by revenue growth and margin improvement from operating leverage on SG&A.

## Step 3: Build the Debt Schedule

Model senior and subordinated debt separately.

**Senior Debt Schedule:**
- Beginning Balance Year 1: $200M
- Mandatory Amortization: 5% of original equals $10M annually
- Calculate interest on average balance for accuracy, or beginning balance for simplicity

Year 1:
- Beginning: $200M
- Interest (6%): $12M
- Amortization: $10M
- Ending: $190M

Continue through Year 5, ending at $150M ($200M minus 5 times $10M).

**Subordinated Debt Schedule:**
- Subordinated debt typically has no amortization (bullet maturity)
- Beginning Balance Year 1: $75M
- Interest (10%): $7.5M annually
- Ending: $75M (unchanged)

Total interest Year 1: $12M plus $7.5M equals $19.5M

## Step 4: Calculate Free Cash Flow

For each year, calculate free cash flow available for additional debt paydown.

**Year 1:**
- EBITDA: $55.1M
- Less D&A: $10M (for EBIT)
- EBIT: $45.1M
- Less Interest: $19.5M
- EBT: $25.6M
- Less Tax (25%): $6.4M
- Net Income: $19.2M
- Add D&A: $10M
- Less Capex: $12M
- Less Working Capital Change: (calculate from revenue growth)
- Working Capital Year 0: $35M minus $25M equals $10M (5% of revenue)
- Working Capital Year 1: 5% of $212M equals $10.6M
- WC Change: $0.6M outflow
- FCF: $19.2M plus $10M minus $12M minus $0.6M equals $16.6M

This FCF first covers mandatory amortization ($10M), leaving $6.6M for optional debt paydown. Apply this to senior debt.

Repeat for Years 2-5. FCF grows as EBITDA increases and interest declines.

## Step 5: Cash Sweep and Final Debt Balances

After mandatory amortization, remaining FCF pays down senior debt.

Simplifying the full calculation, cumulative excess FCF over 5 years totals approximately $45M. Combined with $50M mandatory amortization, senior debt declines from $200M to approximately $105M.

Subordinated debt remains at $75M.

Total debt at exit: $105M plus $75M equals $180M.

## Step 6: Calculate Exit Returns

**Exit Enterprise Value:**
- Year 5 EBITDA: $69.5M
- Exit Multiple: 9x (same as entry)
- Exit EV: $625.5M (round to $625M)

**Exit Equity:**
- Exit EV: $625M
- Less Debt: $180M
- Exit Equity: $445M

**Management and Sponsor Split:**
- Management gets 10% of exit equity: $44.5M
- Sponsor gets 90%: $400.5M

**Sponsor Returns:**
- Entry Equity: $234M
- Exit Equity: $400.5M
- MOIC: $400.5M divided by $234M equals 1.71x

Wait, that seems low. Let me verify. A 1.7x over 5 years is only about 11% IRR. Let's check if we missed something.

Reviewing: The high entry multiple (9x) and significant transaction fees ($9M) hurt returns. Also, management rollover effectively dilutes sponsor returns at exit.

Actually, let me recalculate management rollover. If management rolls 10% of exit equity, they're co-investing at entry. Let me assume instead that management receives 10% of exit equity as promote/carried interest, not rollover.

Under that interpretation:
- Sponsor entry equity: $234M
- Sponsor share of exit (90%): $400.5M
- MOIC: 1.71x, IRR approximately 11%

This illustrates an important lesson: not every deal hits a 20% return. At 9x entry with moderate growth, returns are compressed. To hit 20%, you'd need either multiple expansion, higher growth, or a lower entry price.

Present this finding: "The deal generates approximately 1.7x and 11% IRR, below typical hurdle rates. To achieve 20% returns, we'd need to either pay 7x entry (implying $350M EV, $150M less) or achieve exit multiples of 11-12x."

## Step 7: Build Sensitivities

Create a two-way table varying entry multiple (7x to 10x) and exit multiple (7x to 11x).

|Entry \ Exit| 7x | 8x | 9x | 10x | 11x |
|------------|-----|-----|-----|-----|-----|
| 7x | 1.4x | 1.8x | 2.3x | 2.7x | 3.1x |
| 8x | 1.2x | 1.6x | 2.0x | 2.3x | 2.7x |
| 9x | 1.1x | 1.4x | 1.7x | 2.0x | 2.3x |
| 10x | 1.0x | 1.2x | 1.5x | 1.8x | 2.1x |

This shows you need significant multiple expansion or a lower entry to generate attractive returns.

## The Deliverable

Your memo should conclude: "At the proposed 9x entry, HealthServ generates a 1.7x MOIC and 11% IRR, below our 20% target. I recommend either negotiating entry to 7-7.5x or passing unless we identify operational improvements driving 10%+ EBITDA CAGR."

This demonstrates you completed the model AND applied investment judgment.
