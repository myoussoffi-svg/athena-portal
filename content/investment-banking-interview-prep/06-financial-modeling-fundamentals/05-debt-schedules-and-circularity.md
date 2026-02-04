---
id: debt-schedules-and-circularity
title: Debt Schedules and Interest Circularity
order: 5
estimated_minutes: 45
---

# Debt Schedules and Interest Circularity

## Learning Objectives

- Build a debt schedule that tracks balances, interest, and repayments
- Understand the circular reference between interest expense and cash/debt
- Implement solutions for circularity (iteration or copy-paste macro)
- Model a revolving credit facility that flexes based on cash needs

## Written Guide

### Why Debt Schedules Matter

A debt schedule is the engine of your model's financing section. It tracks:

- Beginning and ending balances for each debt tranche
- Mandatory amortization (scheduled repayments)
- Optional prepayments (from excess cash)
- Interest expense (which flows to the income statement)

Without a proper debt schedule, your model can't accurately capture how a company's capital structure evolves over time.

### Anatomy of a Debt Schedule

For each debt instrument, track:

| Row | Description |
|-----|-------------|
| Beginning Balance | Prior period's ending balance |
| (+) Draws | New borrowings (if applicable) |
| (-) Mandatory Amortization | Scheduled principal repayments |
| (-) Optional Prepayment | Discretionary repayments from excess cash |
| (=) Ending Balance | Remaining debt at period end |
| Interest Rate | The rate used to calculate interest |
| Interest Expense | Calculated from average balance × rate |

### Interest Expense Calculation

Interest expense is typically calculated on the **average balance** during the period:

Interest Expense = (Beginning Balance + Ending Balance) / 2 × Interest Rate

Or on the **beginning balance** (simpler but less accurate):

Interest Expense = Beginning Balance × Interest Rate

The average balance method is more accurate because it reflects that repayments (which reduce the balance) happen throughout the year.

### The Circularity Problem

Here's where it gets tricky. In an integrated model:

1. **Interest expense** depends on **debt balances**
2. **Debt balances** depend on **cash available** for repayment
3. **Cash available** depends on **net income**
4. **Net income** depends on **interest expense**

This creates a **circular reference**: A → B → C → D → A

```
Interest Expense → Net Income → Cash Flow → Debt Repayment → Debt Balance → Interest Expense
```

If you build formulas that follow this logic, Excel will either show an error or calculate incorrectly (depending on settings).

### Solution 1: Enable Iterative Calculations

Excel can solve circular references through iteration:

1. Go to **File → Options → Formulas**
2. Check **Enable iterative calculation**
3. Set Maximum Iterations to 100-1000
4. Set Maximum Change to 0.0001

Excel will now recalculate the circular formulas multiple times until the values converge (stop changing).

**Pros**: Simple to implement, works automatically
**Cons**: Can slow down large models, can cause instability if formulas have errors

### Solution 2: Circuit Breaker

Add a toggle that breaks the circularity when needed:

Create a cell called "Circularity Switch" with values:
- 1 = Circularity ON (normal operation)
- 0 = Circularity OFF (breaks the loop)

Modify your interest expense formula:

```
=IF(CircularitySwitch=1, AverageDebt * InterestRate, 0)
```

When the switch is OFF, interest expense is zero, breaking the loop. Use this to troubleshoot errors or reset the model.

### Solution 3: Copy-Paste Macro

Some banks use a macro approach:

1. Build the model without the circular link (interest uses prior period debt)
2. Run a macro that copies and pastes values, then recalculates
3. Repeat until values stabilize

This avoids Excel's iterative calculation but requires VBA.

### Building a Simple Debt Schedule

Let's build a schedule for a term loan with mandatory amortization:

**Assumptions**:
- Beginning Balance: $100M
- Interest Rate: 5%
- Mandatory Amortization: $10M per year
- Term: 10 years

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Beginning Balance | $100M | $90M | $80M | $70M | $60M |
| Mandatory Amortization | ($10M) | ($10M) | ($10M) | ($10M) | ($10M) |
| Ending Balance | $90M | $80M | $70M | $60M | $50M |
| Average Balance | $95M | $85M | $75M | $65M | $55M |
| Interest Rate | 5.0% | 5.0% | 5.0% | 5.0% | 5.0% |
| **Interest Expense** | **$4.75M** | **$4.25M** | **$3.75M** | **$3.25M** | **$2.75M** |

Interest expense declines as the debt is paid down.

### Modeling a Revolving Credit Facility

A **revolver** is a flexible credit line that can be drawn or repaid as needed. It's often used as the "plug" to balance a model:

- If the company has excess cash → repay the revolver
- If the company needs cash → draw on the revolver

**Revolver Logic**:

```
Available to Draw = Revolver Capacity - Beginning Balance
Cash Available = CFO + CFI + Other CFF Items + Beginning Cash - Minimum Cash
```

If Cash Available > 0:
- Revolver Paydown = MIN(Beginning Revolver Balance, Cash Available)
- Excess Cash = Cash Available - Revolver Paydown (goes to balance sheet cash)

If Cash Available < 0:
- Revolver Draw = MIN(Available to Draw, ABS(Cash Available))
- If still short, you have a funding gap (model may need equity or additional debt)

**Revolver Schedule Example**:

| | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Revolver Capacity | $50M | $50M | $50M |
| Beginning Balance | $20M | $15M | $5M |
| Draw / (Paydown) | ($5M) | ($10M) | ($5M) |
| Ending Balance | $15M | $5M | $0M |
| Average Balance | $17.5M | $10M | $2.5M |
| Interest Rate | 6.0% | 6.0% | 6.0% |
| Interest Expense | $1.05M | $0.6M | $0.15M |
| Commitment Fee (on unused) | $0.10M | $0.12M | $0.15M |

**Commitment Fee**: Revolvers often charge a fee (0.25-0.50%) on the unused portion.

Unused = Capacity - Average Balance
Commitment Fee = Unused × Fee Rate

### Multiple Debt Tranches

LBO and M&A models often have multiple debt tranches with different terms:

| Tranche | Amount | Rate | Amortization | Maturity |
|---------|--------|------|--------------|----------|
| Revolver | $50M | L + 300 | None | 5 years |
| Term Loan A | $100M | L + 275 | 5% annual | 5 years |
| Term Loan B | $200M | L + 350 | 1% annual | 7 years |
| Senior Notes | $150M | 8.0% fixed | None (bullet) | 8 years |

Each tranche needs its own schedule. Total interest expense is the sum across all tranches.

### Debt Repayment Waterfall

When the company has excess cash, debt is typically repaid in order of seniority (or as required by credit agreements):

1. **Revolver** (most flexible, usually repaid first)
2. **Term Loan A** (amortizing, often has prepayment incentives)
3. **Term Loan B** (minimal amortization, prepayment may have fees)
4. **Bonds** (often callable at premium or non-callable)

Model optional prepayments flowing through this waterfall.

### Interest Rate Considerations

**Fixed Rate Debt**: Interest rate stays constant. Easy to model.

**Floating Rate Debt**: Interest rate varies with a benchmark (SOFR, Prime).

Floating Rate = Benchmark + Spread

For projections, you need to assume future benchmark rates. Options:
- Use forward curve from market data
- Assume flat benchmark (current rate continues)
- Model scenarios (rates up 100bps, rates down 100bps)

### Linking to the Financial Statements

**Debt Schedule → Income Statement**:
- Total interest expense flows to the income statement

**Debt Schedule → Balance Sheet**:
- Ending balances flow to the balance sheet
- Current portion (due within 1 year) is a current liability
- Remaining balance is long-term debt

**Debt Schedule → Cash Flow Statement**:
- Draws are a source of cash (CFF)
- Repayments (mandatory + optional) are uses of cash (CFF)

### Error Checking

Include checks in your debt schedule:

**Revolver Check**: Ending balance should never exceed capacity
```
=IF(EndingBalance > Capacity, "ERROR", "OK")
```

**Negative Balance Check**: Debt can't be negative
```
=IF(EndingBalance < 0, "ERROR", "OK")
```

**Interest Rate Check**: Rate should be within reasonable range
```
=IF(OR(Rate < 0, Rate > 0.20), "CHECK", "OK")
```

## Video Placeholder

**Video Title**: Building Debt Schedules and Handling Circularity

**Outline**:
- Why debt schedules matter in financial models
- Structure of a debt schedule: balances, amortization, interest
- The circularity problem: interest → cash → debt → interest
- Solutions: iterative calculations, circuit breaker, copy-paste macro
- Modeling a revolving credit facility as the cash plug
- Multiple debt tranches and the repayment waterfall
- Linking debt schedules to the three statements

**Suggested Length**: 22 minutes

## Key Takeaways

- Debt schedules track balances, repayments, and interest for each debt tranche
- Interest expense = Average Balance × Interest Rate (average is more accurate than beginning)
- Circularity occurs because interest affects cash, which affects debt, which affects interest
- Enable iterative calculation in Excel or use a circuit breaker to handle circularity
- The revolver often serves as the model's plug: draw when short on cash, repay when excess
- Multiple debt tranches have different terms; model each separately and sum interest
- Debt repayments follow a waterfall based on seniority and credit agreement requirements
- Link debt schedule outputs to the income statement, balance sheet, and cash flow statement
