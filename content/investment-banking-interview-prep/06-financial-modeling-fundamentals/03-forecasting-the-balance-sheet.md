---
id: forecasting-the-balance-sheet
title: Forecasting the Balance Sheet
order: 3
estimated_minutes: 45
---

# Forecasting the Balance Sheet

## Learning Objectives

- Project working capital accounts using days-based metrics
- Forecast PP&E and capital expenditures
- Model debt and equity changes on the balance sheet
- Ensure the balance sheet balances through the cash plug or revolver

## Written Guide

### Balance Sheet Forecasting Overview

The balance sheet captures a company's financial position at a point in time. Unlike the income statement (which shows flows over a period), the balance sheet shows stocks—the accumulated balances of assets, liabilities, and equity.

Forecasting the balance sheet requires understanding what drives each line item and how it connects to the income statement and cash flow statement.

### The Balance Sheet Structure

**Assets** = **Liabilities** + **Shareholders' Equity**

This equation must always hold. If it doesn't, your model has an error.

**Current Assets** (convert to cash within 1 year):
- Cash and cash equivalents
- Accounts receivable
- Inventory
- Prepaid expenses

**Non-Current Assets** (long-term):
- Property, plant & equipment (PP&E)
- Intangible assets
- Goodwill
- Investments

**Current Liabilities** (due within 1 year):
- Accounts payable
- Accrued expenses
- Short-term debt
- Current portion of long-term debt

**Non-Current Liabilities** (long-term):
- Long-term debt
- Deferred tax liabilities
- Pension obligations

**Shareholders' Equity**:
- Common stock
- Retained earnings
- Additional paid-in capital (APIC)
- Treasury stock

### Forecasting Working Capital

Working capital accounts (receivables, inventory, payables) are typically forecast using **days-based metrics** that tie to revenue or COGS.

**Days Sales Outstanding (DSO)** — Accounts Receivable

DSO measures how many days of revenue are tied up in receivables.

DSO = (Accounts Receivable / Revenue) × 365

To forecast:

Accounts Receivable = (DSO / 365) × Revenue

**Example**: If DSO is 45 days and projected revenue is $500M:
AR = (45 / 365) × $500M = $61.6M

**Days Inventory Outstanding (DIO)** — Inventory

DIO measures how many days of COGS are held in inventory.

DIO = (Inventory / COGS) × 365

To forecast:

Inventory = (DIO / 365) × COGS

**Days Payable Outstanding (DPO)** — Accounts Payable

DPO measures how many days the company takes to pay suppliers.

DPO = (Accounts Payable / COGS) × 365

To forecast:

Accounts Payable = (DPO / 365) × COGS

**The Cash Conversion Cycle**

CCC = DSO + DIO - DPO

The cash conversion cycle measures how long cash is tied up in operations. A lower CCC means faster cash conversion.

### Working Capital Forecast Example

```calculation
title: Working Capital Assumptions
given:
  - "DSO (Historical): 42 days"
  - "DIO (Historical): 60 days"
  - "DPO (Historical): 35 days"
steps:
  - "DSO (Projection): 42 days (hold constant)"
  - "DIO (Projection): 58 days (slight improvement)"
  - "DPO (Projection): 36 days (slight increase)"
result: "Days metrics used to project working capital accounts"
```

```calculation
title: Working Capital Forecast (Year 1 - Year 3)
given:
  - "Revenue: Year 1 = $500M, Year 2 = $540M, Year 3 = $572M"
  - "COGS: Year 1 = $300M, Year 2 = $321M, Year 3 = $338M"
steps:
  - "Accounts Receivable: Year 1 = $57.5M, Year 2 = $62.1M, Year 3 = $65.8M"
  - "Inventory: Year 1 = $49.3M, Year 2 = $51.0M, Year 3 = $53.7M"
  - "Accounts Payable: Year 1 = $28.8M, Year 2 = $31.7M, Year 3 = $33.3M"
result: "Working capital accounts projected using DSO, DIO, and DPO assumptions"
```

**Net Working Capital** = Current Assets - Current Liabilities

For modeling, we often focus on **operating working capital**:
Operating NWC = Receivables + Inventory - Payables

### Other Current Assets and Liabilities

**Prepaid Expenses**: Often projected as a percentage of operating expenses or held flat.

**Accrued Expenses**: Projected as a percentage of operating expenses (represents expenses incurred but not yet paid).

**Other Current Assets/Liabilities**: Review what's included and project based on historical patterns or hold constant.

### Forecasting PP&E and CapEx

**Property, Plant & Equipment (PP&E)** represents the company's long-term physical assets. The PP&E balance changes based on:

Ending PP&E = Beginning PP&E + CapEx - Depreciation

**Capital Expenditures (CapEx)** can be forecast several ways:

1. **Percentage of Revenue**: CapEx as % of revenue based on historical average
2. **Percentage of Depreciation**: Maintenance CapEx often approximates depreciation
3. **Explicit Schedule**: Build out specific capital projects if known

**Depreciation** is typically forecast as:

- Percentage of beginning PP&E
- Based on useful life assumptions
- Or linked to a detailed depreciation schedule

**Example PP&E Rollforward**:

```calculation
title: PP&E Rollforward (Year 1 - Year 3)
given:
  - "CapEx: 6% of revenue"
  - "Depreciation: 10% of beginning PP&E"
steps:
  - "Beginning PP&E: Year 1 = $200M, Year 2 = $210M, Year 3 = $222M"
  - "+ CapEx: Year 1 = $30M, Year 2 = $32M, Year 3 = $34M"
  - "- Depreciation: Year 1 = ($20M), Year 2 = ($20M), Year 3 = ($21M)"
result: "Ending PP&E: Year 1 = $210M, Year 2 = $222M, Year 3 = $235M"
```

Where:
- CapEx = 6% of revenue
- Depreciation = 10% of beginning PP&E

### Forecasting Intangibles and Goodwill

**Intangible Assets** (patents, software, customer relationships):
- Amortize over useful life
- Add any new acquisitions or capitalized development costs

**Goodwill**:
- Does not amortize under US GAAP/IFRS
- Stays constant unless impaired or additional acquisitions occur
- For projection purposes, typically hold constant

### Forecasting Debt

Debt forecasting depends on your model's purpose:

**Simple Approach**: Hold debt constant at current levels (or per management guidance)

**Dynamic Approach**: Model debt changes based on:
- Scheduled amortization (mandatory repayments)
- Cash sweep (optional prepayments from excess cash)
- New issuances (if the company is raising debt)

The detailed debt schedule is covered in a later lesson. For now, understand that:

- Long-term debt sits on the balance sheet
- Current portion of long-term debt (due within 1 year) is a current liability
- Interest expense on the income statement is calculated from debt balances

### Forecasting Equity

**Retained Earnings** rolls forward each period:

Ending Retained Earnings = Beginning RE + Net Income - Dividends

This is how the income statement connects to the balance sheet. Net income flows into retained earnings, increasing equity.

**Common Stock and APIC**: Typically held constant unless the company issues new equity or repurchases shares.

**Treasury Stock**: Increases with share repurchases (reduces total equity).

**Dividends**: Project based on:
- Historical payout ratio (Dividends / Net Income)
- Or explicit dividend per share × shares outstanding
- Or management's stated dividend policy

### Making the Balance Sheet Balance

After projecting all line items independently, your balance sheet likely won't balance. You need a **balancing mechanism**:

**Option 1: Cash as the Plug**

If Assets > Liabilities + Equity before adding cash:
- The difference represents excess cash generated
- Add this to the cash line to make the balance sheet balance

If Assets < Liabilities + Equity before adding cash:
- The company needs to fund a deficit
- Either reduce cash or add debt

**Option 2: Revolver as the Plug**

Many models use a revolving credit facility (revolver) as the plug:
- If the company has excess cash → pay down the revolver (or build cash if revolver is zero)
- If the company needs cash → draw on the revolver

This is more realistic because companies typically maintain target cash balances and use revolvers for working capital fluctuations.

### The Balance Check

Always include a balance check in your model:

Balance Check = Total Assets - Total Liabilities - Total Equity

This should equal zero. If it doesn't, you have an error.

Color this cell red if non-zero so errors are immediately visible.

### Example Projected Balance Sheet

```calculation
title: Projected Balance Sheet (Year 1 - Year 3)
given:
  - "Assets"
  - "Cash: Year 1 = $50M, Year 2 = $65M, Year 3 = $82M"
  - "Accounts Receivable: Year 1 = $58M, Year 2 = $62M, Year 3 = $66M"
  - "Inventory: Year 1 = $49M, Year 2 = $51M, Year 3 = $54M"
  - "Total Current Assets: Year 1 = $157M, Year 2 = $178M, Year 3 = $202M"
  - "PP&E, net: Year 1 = $210M, Year 2 = $222M, Year 3 = $235M"
  - "Goodwill: Year 1 = $100M, Year 2 = $100M, Year 3 = $100M"
  - "Total Assets: Year 1 = $467M, Year 2 = $500M, Year 3 = $537M"
steps:
  - "Liabilities"
  - "Accounts Payable: Year 1 = $29M, Year 2 = $32M, Year 3 = $33M"
  - "Accrued Expenses: Year 1 = $15M, Year 2 = $16M, Year 3 = $17M"
  - "Current Portion of Debt: Year 1 = $10M, Year 2 = $10M, Year 3 = $10M"
  - "Total Current Liabilities: Year 1 = $54M, Year 2 = $58M, Year 3 = $60M"
  - "Long-Term Debt: Year 1 = $100M, Year 2 = $90M, Year 3 = $80M"
  - "Total Liabilities: Year 1 = $154M, Year 2 = $148M, Year 3 = $140M"
  - "Equity"
  - "Common Stock: Year 1 = $50M, Year 2 = $50M, Year 3 = $50M"
  - "Retained Earnings: Year 1 = $263M, Year 2 = $302M, Year 3 = $347M"
  - "Total Equity: Year 1 = $313M, Year 2 = $352M, Year 3 = $397M"
result: "Total Liab + Equity: Year 1 = $467M, Year 2 = $500M, Year 3 = $537M"
note: "Balance Check: $0 across all years (Assets = Liabilities + Equity)"
```

### Common Balance Sheet Forecasting Mistakes

**Forgetting to roll forward retained earnings**: Net income must flow into retained earnings each period.

**Not linking CapEx to PP&E**: If you forecast CapEx on the cash flow statement, it must also appear in the PP&E rollforward.

**Inconsistent working capital assumptions**: If DSO suddenly jumps from 40 to 60 days, that's a red flag—make sure changes are intentional and justified.

**Not including a balance check**: Without this check, errors can go unnoticed and corrupt your entire model.

