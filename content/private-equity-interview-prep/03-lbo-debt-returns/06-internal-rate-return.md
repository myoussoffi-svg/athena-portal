---
id: internal-rate-return
title: Internal Rate of Return - Deep Dive
order: 6
estimated_minutes: 45
---

# Internal Rate of Return - Deep Dive

## Learning Objectives

- Master IRR calculation methodology and the underlying mathematics
- Develop mental math techniques for quick IRR estimation in interviews
- Understand the relationship between IRR, MOIC, and holding period
- Recognize IRR limitations and when other metrics are more appropriate
- Solve complex IRR interview questions including backward-solving problems

## Written Guide

### The Foundation: What IRR Really Measures

The internal rate of return represents the discount rate at which the net present value of all cash flows equals zero. In simpler terms, IRR is the annualized return that makes your initial investment grow to your final proceeds over the holding period. It is the single most important metric in private equity because it captures both the magnitude of returns and the time required to achieve them.

The IRR formula solves for r in the equation:

**0 = -Initial Investment + CF1/(1+r)^1 + CF2/(1+r)^2 + ... + CFn/(1+r)^n**

For a simple LBO with no interim cash flows (dividends or add-on investments), this simplifies to:

**Initial Investment x (1 + IRR)^n = Exit Proceeds**

Rearranging:

**IRR = (Exit Proceeds / Initial Investment)^(1/n) - 1**

Or equivalently:

**IRR = MOIC^(1/n) - 1**

This relationship between IRR, MOIC, and holding period is fundamental to PE mental math.

### The IRR-MOIC-Time Relationship

Understanding how these three variables interact is essential for interviews. Given any two, you can solve for the third:

**Given MOIC and Time, solve for IRR**:
IRR = MOIC^(1/n) - 1

Example: 2.5x MOIC over 4 years
IRR = 2.5^(1/4) - 1 = 2.5^0.25 - 1 = 1.257 - 1 = 25.7%

**Given IRR and Time, solve for MOIC**:
MOIC = (1 + IRR)^n

Example: 20% IRR over 5 years
MOIC = 1.20^5 = 2.49x

**Given IRR and MOIC, solve for Time**:
n = ln(MOIC) / ln(1 + IRR)

Example: 25% IRR and 3.0x MOIC
n = ln(3.0) / ln(1.25) = 1.099 / 0.223 = 4.9 years

### Mental Math: The Essential Skill

PE interviewers expect candidates to calculate approximate IRRs without a calculator. This skill demonstrates both technical competence and the intuitive feel for returns that characterizes strong investors.

**Memorize Key Benchmarks**:

For a **2.0x MOIC**:
- 3 years: 26% IRR
- 4 years: 19% IRR
- 5 years: 15% IRR
- 6 years: 12% IRR

For a **2.5x MOIC**:
- 3 years: 36% IRR
- 4 years: 26% IRR
- 5 years: 20% IRR
- 6 years: 16% IRR

For a **3.0x MOIC**:
- 3 years: 44% IRR
- 4 years: 32% IRR
- 5 years: 25% IRR
- 6 years: 20% IRR

**The Rule of 72**: Time to double = 72 / IRR. At 20% IRR, money doubles in 3.6 years. At 25% IRR, it doubles in 2.9 years.

**Interpolation Technique**: For MOICs between benchmarks, interpolate. A 2.25x over 4 years is halfway between 2.0x (19%) and 2.5x (26%), so approximately 22-23% IRR.

**Compounding Intuition**: Each additional year at the same IRR increases MOIC by (1 + IRR). At 20% IRR: Year 3 MOIC = 1.73x, Year 4 = 2.07x, Year 5 = 2.49x.

### Worked Example: Complete IRR Calculation

A PE firm acquires a company for $500 million enterprise value, using $300 million of debt and $200 million of equity. After 5 years, the company is sold for $900 million enterprise value. Debt at exit is $180 million (after $120 million of paydown).

**Step 1 - Calculate equity proceeds**:
Exit EV: $900 million
Less: Exit Debt: ($180 million)
Equity Proceeds: $720 million

**Step 2 - Calculate MOIC**:
MOIC = $720 million / $200 million = 3.6x

**Step 3 - Calculate IRR**:
IRR = 3.6^(1/5) - 1 = 3.6^0.2 - 1

Mental math approach: 3.0x over 5 years is 25%. 4.0x over 5 years would be about 32%. 3.6x is 60% of the way from 3.0x to 4.0x, so approximately 25% + (0.6 x 7%) = 29%.

Exact calculation: 3.6^0.2 = 1.292, so IRR = 29.2%

### Sources of Returns: Decomposing IRR

In interviews, you may be asked to decompose returns into their sources. The three primary drivers are:

**1. EBITDA Growth**: Operating improvement increases enterprise value
**2. Multiple Expansion**: Selling at a higher EV/EBITDA multiple than entry
**3. Debt Paydown**: Reducing debt increases equity's share of enterprise value

Consider the previous example. Entry was at $500 million EV with $100 million EBITDA (5.0x entry multiple). Exit was at $900 million EV.

If exit EBITDA is $140 million (40% growth) at a 6.0x exit multiple:
- EBITDA Growth contribution: ($140M - $100M) x 5.0x = $200 million
- Multiple Expansion contribution: $140M x (6.0x - 5.0x) = $140 million
- Debt Paydown contribution: $120 million

Total value creation: $200M + $140M + $120M = $460 million (which equals the increase in equity from $200M to $660M, with $60M discrepancy due to cross-terms between EBITDA and multiple)

Understanding these components helps in investment analysis and interview discussions.

### Backward-Solving: A Critical Interview Skill

Interviewers frequently ask backward-solving questions where you must determine what operating performance is required to achieve a target IRR.

**Example**: "We are acquiring a company for 8x EBITDA with $100M of current EBITDA, using 5x debt. What exit EBITDA do we need to generate a 25% IRR over 5 years, assuming the exit multiple is 7x and we pay down $150M of debt?"

**Step 1 - Determine entry equity**:
Enterprise Value: $100M x 8x = $800M
Debt: $100M x 5x = $500M
Equity: $800M - $500M = $300M

**Step 2 - Determine required exit equity for 25% IRR over 5 years**:
Required MOIC = (1.25)^5 = 3.05x
Required Equity Proceeds = $300M x 3.05 = $915M

**Step 3 - Determine required exit EV**:
Exit Debt = $500M - $150M = $350M
Required Exit EV = $915M + $350M = $1,265M

**Step 4 - Determine required EBITDA**:
Required EBITDA = $1,265M / 7x = $181M

**Step 5 - Express as growth**:
EBITDA must grow from $100M to $181M, an 81% increase or approximately 12.6% CAGR over 5 years.

### IRR Limitations and Alternative Metrics

While IRR is the primary PE metric, it has limitations that interviewers may test:

**Reinvestment Assumption**: IRR assumes interim cash flows can be reinvested at the IRR rate, which may be unrealistic for high-IRR investments. A 40% IRR assumes dividends can be reinvested at 40%, which is rarely achievable.

**Scale Insensitivity**: IRR does not account for investment size. A 50% IRR on $10 million creates less value than a 25% IRR on $500 million.

**Timing Manipulation**: IRR can be gamed by timing cash flows. Early dividends boost IRR even if total returns are modest.

**Multiple IRR Problem**: Projects with alternating cash flow signs can have multiple IRRs, though this is rare in standard LBOs.

**Modified IRR (MIRR)**: Addresses the reinvestment assumption by specifying reinvestment and financing rates separately.

**Public Market Equivalent (PME)**: Compares PE returns to what would have been earned investing in public markets over the same period.

### Common Interview Questions

**"What IRR do you need to triple your money in 4 years?"**

MOIC = 3.0x, n = 4 years
IRR = 3.0^(1/4) - 1 = 3.0^0.25 - 1 = 1.316 - 1 = 31.6%

Mental math: 3.0x in 4 years is roughly 32% IRR.

**"If we achieve a 2.5x MOIC with a 3-year hold, what is the IRR? What if the hold extends to 5 years?"**

3 years: IRR = 2.5^(1/3) - 1 = 36%
5 years: IRR = 2.5^(1/5) - 1 = 20%

This illustrates how IRR erodes with time for the same MOIC.

**"An investment returns 2.0x at a 20% IRR. How long was the holding period?"**

n = ln(2.0) / ln(1.20) = 0.693 / 0.182 = 3.8 years

Mental math: At 20% IRR, Rule of 72 says doubling takes 72/20 = 3.6 years. The answer is approximately 3.6-4 years.

**"We need a 25% IRR with a 4-year hold. What MOIC do we need?"**

MOIC = (1.25)^4 = 2.44x

### Advanced: IRR with Interim Cash Flows

When there are interim dividends or additional investments, IRR must be calculated iteratively. The formula becomes:

0 = -Initial + D1/(1+r)^1 + D2/(1+r)^2 + ... + (Dn + Exit)/(1+r)^n

Where D represents interim dividends (positive) or additional investments (negative).

Early dividends increase IRR because money returned sooner is worth more. This is why dividend recapitalizations can boost IRR even if total cash returned is unchanged.

For interview purposes, understand that early dividends increase IRR more than late dividends of equal size, and that a recapitalization in Year 2 returning 0.5x will significantly boost IRR compared to receiving that same 0.5x at exit.

## Key Takeaways

- IRR is the discount rate that makes NPV equal zero; for simple LBOs, IRR = MOIC^(1/n) - 1
- Memorize key benchmarks: 2.0x over 5 years is 15% IRR; 3.0x over 5 years is 25% IRR
- The Rule of 72 provides quick doubling time estimates: divide 72 by the IRR percentage
- Backward-solving questions require working from target IRR to required operating performance
- IRR limitations include the reinvestment assumption, scale insensitivity, and timing manipulation potential
- Early cash flows (dividends, recaps) have an outsized positive impact on IRR compared to exit proceeds
