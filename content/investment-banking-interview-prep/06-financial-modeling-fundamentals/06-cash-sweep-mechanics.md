---
id: cash-sweep-mechanics
title: Cash Sweep Mechanics
order: 6
estimated_minutes: 35
---

# Cash Sweep Mechanics

## Learning Objectives

- Understand what a cash sweep is and why it's used in leveraged finance
- Model mandatory versus optional debt repayment
- Build a cash sweep waterfall that prioritizes debt paydown
- Calculate the impact of cash sweeps on returns and credit metrics

## Written Guide

### What Is a Cash Sweep?

A **cash sweep** is a mechanism that uses excess cash flow to automatically pay down debt. It's a standard feature in leveraged loans and LBO financing.

After covering operating needs, mandatory debt payments, and minimum cash requirements, any remaining cash "sweeps" to debt reduction rather than accumulating on the balance sheet.

**Why Lenders Require It**: Cash sweeps reduce lender risk by accelerating debt paydown. If the company performs well, lenders get repaid faster. If performance deteriorates, there's less debt outstanding.

**Why Sponsors Accept It**: PE sponsors accept cash sweep provisions to secure financing. The faster debt paydown also increases equity returns by reducing interest expense over time.

### Excess Cash Flow Definition

Credit agreements define **Excess Cash Flow (ECF)** specifically. A typical definition:

```
Excess Cash Flow =
  EBITDA
  - Cash Interest Paid
  - Cash Taxes Paid
  - Mandatory Debt Amortization
  - Capital Expenditures (or Maintenance CapEx)
  - Increase in Working Capital
  - Other Permitted Uses
```

This is similar to unlevered free cash flow, but with specific adjustments per the credit agreement.

### Cash Sweep Percentage

Not all excess cash flow goes to debt repayment. The **sweep percentage** varies based on leverage:

| Leverage (Debt / EBITDA) | Sweep % |
|--------------------------|---------|
| > 4.5× | 75% |
| 3.5× - 4.5× | 50% |
| < 3.5× | 25% or 0% |

As leverage decreases, a smaller portion of ECF goes to debt paydown. This rewards equity sponsors for improving the company's credit profile.

### The Cash Sweep Waterfall

When excess cash is available for debt repayment, it flows through a **waterfall** based on the credit agreement:

**Typical Priority Order**:

1. **Revolver** (if drawn, repay first)
2. **Term Loan A** (pro rata with TLB, or priority)
3. **Term Loan B** (after TLA, unless pro rata)
4. **Second Lien / Mezzanine** (if applicable)
5. **Remaining cash** to balance sheet (or dividends if permitted)

Some credit agreements require **pro rata** prepayment across term loans, while others allow the borrower to direct prepayments.

### Building the Cash Sweep Model

**Step 1: Calculate Cash Available for Sweep**

Start with cash flow after all required items:

```
Cash Available =
  Cash from Operations
  - Mandatory Debt Amortization (already in CFF)
  - Capital Expenditures
  - Minimum Cash Requirement
  + Beginning Cash (above minimum)
```

**Step 2: Apply the Sweep Percentage**

```
Sweep Amount = MAX(0, Cash Available × Sweep Percentage)
```

The MAX function ensures you don't have a negative sweep (you can't "un-repay" debt).

**Step 3: Allocate to Debt Tranches**

Work through the waterfall:

```
Revolver Paydown = MIN(Revolver Balance, Sweep Amount)
Remaining Sweep = Sweep Amount - Revolver Paydown

TLA Paydown = MIN(TLA Balance, Remaining Sweep)
Remaining Sweep = Remaining Sweep - TLA Paydown

TLB Paydown = MIN(TLB Balance, Remaining Sweep)
Remaining Sweep = Remaining Sweep - TLB Paydown

Excess Cash to Balance Sheet = Remaining Sweep
```

### Cash Sweep Example

**Assumptions**:
- EBITDA: $100M
- Cash Interest: $35M
- Cash Taxes: $15M
- Mandatory Amortization: $10M
- CapEx: $20M
- Working Capital Increase: $5M
- Leverage: 5.0× (75% sweep)

**Calculate Excess Cash Flow**:
```
ECF = $100M - $35M - $15M - $10M - $20M - $5M = $15M
```

**Apply Sweep Percentage**:
```
Sweep Amount = $15M × 75% = $11.25M
```

**Allocate Through Waterfall**:

| Tranche | Beginning Balance | Sweep Allocation | Ending Balance |
|---------|------------------|------------------|----------------|
| Revolver | $20M | $11.25M | $8.75M |
| Term Loan A | $100M | $0 | $100M |
| Term Loan B | $200M | $0 | $200M |

The entire sweep goes to the revolver since its balance exceeded the sweep amount.

### Modeling Cash Sweep in Excel

Here's how the formulas work in practice:

**Row: Cash Available for Sweep**
```
= CFO - CapEx - Mandatory Amort + MAX(0, Beginning Cash - Min Cash)
```

**Row: Sweep Percentage**
```
= IF(Leverage > 4.5, 0.75, IF(Leverage > 3.5, 0.50, 0.25))
```

**Row: Total Sweep Amount**
```
= MAX(0, Cash Available × Sweep Percentage)
```

**Row: Revolver Sweep**
```
= MIN(Revolver Beginning Balance, Total Sweep Amount)
```

**Row: TLA Sweep**
```
= MIN(TLA Beginning Balance, Total Sweep Amount - Revolver Sweep)
```

**Row: TLB Sweep**
```
= MIN(TLB Beginning Balance, Total Sweep Amount - Revolver Sweep - TLA Sweep)
```

### Impact on Debt Schedules

The cash sweep amounts flow into each debt tranche's schedule as optional prepayments:

| | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| **Term Loan A** | | | |
| Beginning Balance | $100M | $85M | $65M |
| Mandatory Amortization | ($5M) | ($5M) | ($5M) |
| Cash Sweep Prepayment | ($10M) | ($15M) | ($12M) |
| Ending Balance | $85M | $65M | $48M |

Without the cash sweep, Year 3 ending balance would be $85M. The sweep accelerates paydown by $37M over three years.

### Cash Sweep vs. Dividend Recapitalization

Cash sweeps and dividend recaps represent opposite uses of cash:

**Cash Sweep**: Excess cash pays down debt, benefiting lenders and improving credit metrics. Common in early years when leverage is high.

**Dividend Recap**: Once leverage falls below certain thresholds, sponsors may refinance or take dividends to return capital to investors. Only permitted when leverage covenants allow.

**The Tradeoff**: Aggressive cash sweeps reduce equity returns in the near term (cash goes to lenders, not sponsors) but can enable earlier dividend recaps or refinancing at better terms.

### Credit Metric Impact

Cash sweeps improve credit metrics over time:

**Without Sweep**:
| Year | Debt | EBITDA | Debt/EBITDA |
|------|------|--------|-------------|
| 0 | $400M | $80M | 5.0× |
| 3 | $370M | $95M | 3.9× |

**With 50% Sweep**:
| Year | Debt | EBITDA | Debt/EBITDA |
|------|------|--------|-------------|
| 0 | $400M | $80M | 5.0× |
| 3 | $320M | $95M | 3.4× |

The sweep reduces leverage by 0.5× faster, potentially unlocking refinancing or dividend opportunities earlier.

### Common Interview Questions

**"Walk me through how a cash sweep works."**

A cash sweep uses excess cash flow to automatically pay down debt. After the company covers operating costs, taxes, interest, mandatory debt payments, and CapEx, remaining cash flows to debt reduction based on a percentage (often 50-75% when leverage is high). The sweep typically pays down debt in order of seniority—revolver first, then term loans.

**"Why do lenders require cash sweeps?"**

Lenders want their money back faster to reduce risk. If the company outperforms, sweeps accelerate repayment. If performance deteriorates, there's less debt outstanding, improving recovery prospects.

**"How does a cash sweep affect sponsor returns?"**

It's mixed. In the short term, sweeps reduce cash available for dividends, hurting returns. But faster debt paydown reduces interest expense and can enable earlier refinancing or dividend recaps, potentially improving long-term returns.

## Video Placeholder

**Video Title**: Cash Sweep Mechanics in LBO Models

**Outline**:
- What a cash sweep is and why it exists
- Excess cash flow definition and sweep percentages
- The debt repayment waterfall
- Building cash sweep formulas in Excel
- Impact on debt schedules and credit metrics
- Cash sweep vs. dividend recapitalization
- Common interview questions

**Suggested Length**: 18 minutes

## Key Takeaways

- Cash sweeps automatically use excess cash flow to pay down debt
- Sweep percentage varies with leverage: higher leverage = higher sweep (75% vs. 25%)
- Excess Cash Flow = EBITDA - Cash Interest - Taxes - CapEx - Mandatory Amort - ΔNWC
- Sweeps flow through a waterfall: revolver first, then term loans by seniority
- Model sweep allocation using MIN functions to cap paydown at outstanding balance
- Cash sweeps accelerate deleveraging, improving credit metrics faster
- Once leverage improves, sponsors may prefer dividend recaps over further debt paydown
