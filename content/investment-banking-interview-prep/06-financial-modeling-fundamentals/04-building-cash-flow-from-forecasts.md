---
id: building-cash-flow-from-forecasts
title: Building Cash Flow from Forecasts
order: 4
estimated_minutes: 40
---

# Building Cash Flow from Forecasts

## Learning Objectives

- Derive the cash flow statement from the income statement and balance sheet
- Understand the indirect method of cash flow construction
- Link operating, investing, and financing activities to balance sheet changes
- Verify that ending cash reconciles to the balance sheet

## Written Guide

### Why Build Cash Flow from Forecasts?

In a three-statement model, you don't forecast the cash flow statement directly. Instead, you **derive** it from the income statement and balance sheet changes. This ensures the statements are fully integrated—any change in assumptions automatically flows through all three statements.

The cash flow statement answers: "Where did cash come from, and where did it go?"

### The Indirect Method

The **indirect method** starts with net income and adjusts for non-cash items and working capital changes to arrive at cash from operations. This is the standard approach in financial modeling (and required under US GAAP for operating cash flow).

**Cash Flow from Operations (CFO)**:
```
Net Income
+ Depreciation & Amortization (non-cash expense)
+ Other Non-Cash Charges (stock comp, deferred taxes, etc.)
- Increase in Working Capital Assets (uses cash)
+ Increase in Working Capital Liabilities (sources cash)
= Cash Flow from Operations
```

**Cash Flow from Investing (CFI)**:
```
- Capital Expenditures (CapEx)
- Acquisitions
+ Asset Sales
= Cash Flow from Investing
```

**Cash Flow from Financing (CFF)**:
```
+ Debt Issuance
- Debt Repayment
+ Equity Issuance
- Share Repurchases
- Dividends Paid
= Cash Flow from Financing
```

**Net Change in Cash** = CFO + CFI + CFF

**Ending Cash** = Beginning Cash + Net Change in Cash

### Step 1: Start with Net Income

Net income is the starting point because it represents the accounting profit for the period. However, net income includes non-cash items and doesn't reflect the timing of cash receipts and payments.

### Step 2: Add Back Non-Cash Expenses

**Depreciation & Amortization**: These reduce net income but don't require cash outflow. The cash was spent when the asset was purchased (CapEx). Add D&A back to net income.

**Stock-Based Compensation**: An expense that doesn't require cash (the company issues shares instead). Add back.

**Deferred Taxes**: If the company records tax expense but doesn't actually pay it all in cash (due to timing differences), the deferred portion is added back.

**Amortization of Debt Issuance Costs**: A non-cash expense; add back.

### Step 3: Adjust for Working Capital Changes

Working capital changes reflect the difference between when revenue/expenses are recorded and when cash is received/paid.

**The Rule**:
- **Increase in asset** = **Use of cash** (you bought something or are owed more)
- **Decrease in asset** = **Source of cash** (you sold something or collected what was owed)
- **Increase in liability** = **Source of cash** (you owe more but haven't paid yet)
- **Decrease in liability** = **Use of cash** (you paid down what you owed)

**Accounts Receivable**:
- Revenue is recorded when earned, but cash isn't received until customers pay
- ↑ AR means you recorded revenue but didn't collect cash → **subtract** the increase

**Inventory**:
- Buying inventory uses cash, but the cost isn't expensed until goods are sold
- ↑ Inventory means you spent cash building stock → **subtract** the increase

**Accounts Payable**:
- COGS is expensed when goods are sold, but cash isn't paid until you pay suppliers
- ↑ AP means you recorded expense but haven't paid cash → **add** the increase

**Working Capital Change Formula**:

Change in NWC = (AR₁ - AR₀) + (Inventory₁ - Inventory₀) - (AP₁ - AP₀)

On the cash flow statement, subtract the change in NWC:
- If NWC increased, it's a use of cash (subtract)
- If NWC decreased, it's a source of cash (add)

### Step 4: Calculate Cash Flow from Operations

**Example CFO Calculation**:

```calculation
title: "Cash Flow from Operations (Year 2)"
given:
  - "Net Income: $78M"
steps:
  - "+ Depreciation: $20M"
  - "+ Stock-Based Compensation: $5M"
  - "- Increase in Accounts Receivable: ($4.6M)"
  - "- Increase in Inventory: ($1.7M)"
  - "+ Increase in Accounts Payable: $2.9M"
  - "+ Increase in Accrued Expenses: $1.0M"
result: "Cash Flow from Operations = $100.6M"
```

### Step 5: Cash Flow from Investing

**Capital Expenditures**: Link to the PP&E schedule. CapEx is a use of cash.

CapEx = Ending PP&E - Beginning PP&E + Depreciation

Or simply pull from your CapEx assumption in the balance sheet forecast.

**Acquisitions**: If the company acquires another business, the purchase price (net of cash acquired) is a use of cash.

**Asset Sales**: Proceeds from selling assets are a source of cash.

**Example CFI**:

```calculation
title: "Cash Flow from Investing (Year 2)"
given:
  - "Capital Expenditures: ($32M)"
  - "Acquisitions: $0"
result: "Cash Flow from Investing = ($32M)"
```

### Step 6: Cash Flow from Financing

**Debt Activity**:
- Debt issuance = source of cash
- Debt repayment = use of cash
- Link to debt schedule (mandatory amortization, optional prepayments)

**Equity Activity**:
- Equity issuance = source of cash
- Share repurchases = use of cash

**Dividends**: Cash paid to shareholders. Link to your dividend assumption.

**Example CFF**:

```calculation
title: "Cash Flow from Financing (Year 2)"
given:
  - "Debt Issuance: $0"
  - "Debt Repayment: ($10M)"
  - "Dividends Paid: ($39M)"
  - "Share Repurchases: $0"
result: "Cash Flow from Financing = ($49M)"
```

### Step 7: Calculate Net Change in Cash

**Net Change in Cash** = CFO + CFI + CFF

Using our example:
Net Change = $100.6M + ($32M) + ($49M) = **$19.6M**

### Step 8: Verify Ending Cash

**Ending Cash** = Beginning Cash + Net Change in Cash

If Beginning Cash = $50M and Net Change = $19.6M:
Ending Cash = $50M + $19.6M = **$69.6M**

This ending cash **must match** the cash line on your balance sheet. If it doesn't, you have an error in your model.

### Complete Cash Flow Statement Example

```calculation
title: "Complete Cash Flow Statement (Year 1 / Year 2 / Year 3)"
given:
  - "Operating Activities"
  - "Net Income: $68M / $78M / $88M"
  - "Depreciation & Amortization: $20M / $20M / $21M"
  - "Stock-Based Compensation: $4M / $5M / $5M"
steps:
  - "Change in Accounts Receivable: ($3M) / ($5M) / ($4M)"
  - "Change in Inventory: ($2M) / ($2M) / ($3M)"
  - "Change in Accounts Payable: $2M / $3M / $2M"
  - "Change in Accrued Expenses: $1M / $1M / $1M"
  - "Cash from Operations: $90M / $100M / $110M"
  - "Investing Activities"
  - "Capital Expenditures: ($30M) / ($32M) / ($34M)"
  - "Cash from Investing: ($30M) / ($32M) / ($34M)"
  - "Financing Activities"
  - "Debt Repayment: ($10M) / ($10M) / ($10M)"
  - "Dividends Paid: ($34M) / ($39M) / ($44M)"
  - "Cash from Financing: ($44M) / ($49M) / ($54M)"
  - "Net Change in Cash: $16M / $19M / $22M"
  - "Beginning Cash: $34M / $50M / $69M"
result: "Ending Cash = $50M / $69M / $91M"
```

### The Cash Reconciliation Check

Include this check in your model:

**Cash Check** = Balance Sheet Cash - (Beginning Cash + Net Change in Cash)

This should equal zero. If it doesn't, your statements aren't properly linked.

### Linking the Three Statements

Here's how everything connects:

**Income Statement → Cash Flow Statement**:
- Net income is the starting point for CFO
- D&A expense is added back in CFO

**Income Statement → Balance Sheet**:
- Net income flows to retained earnings

**Balance Sheet → Cash Flow Statement**:
- Working capital changes flow to CFO
- CapEx flows to CFI (and PP&E rollforward)
- Debt changes flow to CFF

**Cash Flow Statement → Balance Sheet**:
- Ending cash flows to balance sheet cash line

When these links are properly built, changing any assumption automatically updates all three statements.

### Common Mistakes

**Sign errors on working capital**: Remember: increase in asset = subtract; increase in liability = add. This is the most common source of errors.

**Forgetting to link ending cash**: The ending cash from the cash flow statement must equal the balance sheet cash line.

**Double-counting CapEx**: CapEx should appear in the cash flow statement AND in the PP&E rollforward (but it's the same number, not two separate uses of cash).

**Not including all non-cash items**: Stock compensation, deferred taxes, and other non-cash charges must be added back.

