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

```calculation
title: "Debt Schedule Row Structure"
given:
  - "Beginning Balance: Prior period's ending balance"
  - "(+) Draws: New borrowings (if applicable)"
steps:
  - "(-) Mandatory Amortization: Scheduled principal repayments"
  - "(-) Optional Prepayment: Discretionary repayments from excess cash"
  - "(=) Ending Balance: Remaining debt at period end"
  - "Interest Rate: The rate used to calculate interest"
result: "Interest Expense: Calculated from average balance x rate"
```

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

```calculation
title: "Term Loan Debt Schedule (Years 1-5)"
given:
  - "Beginning Balance: $100M"
  - "Interest Rate: 5.0%"
  - "Mandatory Amortization: $10M per year"
steps:
  - "Year 1: Beginning Balance = $100M, Amortization = ($10M), Ending Balance = $90M, Average Balance = $95M, Interest Expense = $4.75M"
  - "Year 2: Beginning Balance = $90M, Amortization = ($10M), Ending Balance = $80M, Average Balance = $85M, Interest Expense = $4.25M"
  - "Year 3: Beginning Balance = $80M, Amortization = ($10M), Ending Balance = $70M, Average Balance = $75M, Interest Expense = $3.75M"
  - "Year 4: Beginning Balance = $70M, Amortization = ($10M), Ending Balance = $60M, Average Balance = $65M, Interest Expense = $3.25M"
  - "Year 5: Beginning Balance = $60M, Amortization = ($10M), Ending Balance = $50M, Average Balance = $55M, Interest Expense = $2.75M"
result: "Interest expense declines each year as the debt is paid down"
note: "Interest Expense = Average Balance x Interest Rate"
```

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

```calculation
title: "Revolving Credit Facility Schedule (Years 1-3)"
given:
  - "Revolver Capacity: $50M"
  - "Interest Rate: 6.0%"
  - "Beginning Balance (Year 1): $20M"
steps:
  - "Year 1: Beginning Balance = $20M, Draw / (Paydown) = ($5M), Ending Balance = $15M, Average Balance = $17.5M, Interest Expense = $1.05M, Commitment Fee (on unused) = $0.10M"
  - "Year 2: Beginning Balance = $15M, Draw / (Paydown) = ($10M), Ending Balance = $5M, Average Balance = $10M, Interest Expense = $0.6M, Commitment Fee (on unused) = $0.12M"
  - "Year 3: Beginning Balance = $5M, Draw / (Paydown) = ($5M), Ending Balance = $0M, Average Balance = $2.5M, Interest Expense = $0.15M, Commitment Fee (on unused) = $0.15M"
result: "Revolver is fully repaid by Year 3 as excess cash pays down the balance"
note: "Commitment Fee is charged on the unused portion (Capacity - Average Balance) at 0.25-0.50%"
```

**Commitment Fee**: Revolvers often charge a fee (0.25-0.50%) on the unused portion.

Unused = Capacity - Average Balance
Commitment Fee = Unused × Fee Rate

### Multiple Debt Tranches

LBO and M&A models often have multiple debt tranches with different terms:

```calculation
title: "Debt Tranche Summary"
given:
  - "Revolver: Amount = $50M, Rate = L + 300, Amortization = None, Maturity = 5 years"
  - "Term Loan A: Amount = $100M, Rate = L + 275, Amortization = 5% annual, Maturity = 5 years"
steps:
  - "Term Loan B: Amount = $200M, Rate = L + 350, Amortization = 1% annual, Maturity = 7 years"
  - "Senior Notes: Amount = $150M, Rate = 8.0% fixed, Amortization = None (bullet), Maturity = 8 years"
result: "Total Debt = $500M across four tranches with varying terms"
note: "Each tranche needs its own schedule. Total interest expense is the sum across all tranches."
```

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

