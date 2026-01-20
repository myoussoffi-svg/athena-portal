# Accounting Concepts Knowledge Base

> Comprehensive technical reference for Investment Banking interview preparation.
> Sources: BIWS 400 Questions, iBanking Insider, Wall Street Prep RedBook, 10X EBITDA Core Technicals, CFI Interview Guide

---

## 1. The Three Financial Statements

### Income Statement
The Income Statement shows a company's profitability over a period of time (quarter or year).

**Structure (top to bottom):**
- **Revenue** (Net Sales)
- (-) Cost of Goods Sold (COGS)
- = **Gross Profit**
- (-) Operating Expenses (SG&A, R&D)
- = **Operating Income (EBIT)**
- (-) Interest Expense
- (+) Interest Income
- = **Pre-Tax Income (EBT)**
- (-) Income Taxes
- = **Net Income**

**Key Metrics:**
- **Gross Margin** = Gross Profit / Revenue
- **Operating Margin** = EBIT / Revenue
- **Net Profit Margin** = Net Income / Revenue
- **EBITDA** = EBIT + Depreciation + Amortization

**EBITDA Limitations:**
- Excludes CapEx requirements (Buffett: "Does management think the tooth fairy pays for capital expenditures?")
- Ignores working capital changes
- Can be manipulated through capitalization policies
- Not a true measure of cash flow

### Balance Sheet
The Balance Sheet is a snapshot at a point in time showing what a company owns, owes, and the residual equity.

**Fundamental Equation:**
```
Assets = Liabilities + Shareholders' Equity
```

**Assets (in order of liquidity):**
- **Current Assets:** Cash, Marketable Securities, Accounts Receivable, Inventory, Prepaid Expenses
- **Non-Current Assets:** PP&E (net of depreciation), Intangible Assets, Goodwill, Long-term Investments

**Liabilities:**
- **Current Liabilities:** Accounts Payable, Accrued Expenses, Deferred Revenue, Short-term Debt, Current Portion of Long-term Debt
- **Non-Current Liabilities:** Long-term Debt, Deferred Tax Liabilities, Pension Obligations

**Shareholders' Equity:**
- Common Stock (par value)
- Additional Paid-In Capital (APIC)
- Retained Earnings
- Treasury Stock (contra account, reduces equity)
- Accumulated Other Comprehensive Income (AOCI)

### Cash Flow Statement
Shows actual cash movements over a period, reconciling Net Income to Cash.

**Three Sections:**

**1. Cash Flow from Operations (CFO):**
- Start with Net Income
- Add back non-cash expenses (D&A, stock-based comp, deferred taxes)
- Adjust for changes in working capital
- Result: Cash generated/used by core operations

**2. Cash Flow from Investing (CFI):**
- Capital Expenditures (negative)
- Acquisitions (negative)
- Asset sales (positive)
- Investment purchases/sales

**3. Cash Flow from Financing (CFF):**
- Debt issuance (positive) / repayment (negative)
- Equity issuance (positive) / buybacks (negative)
- Dividends paid (negative)

**Key Formula:**
```
Ending Cash = Beginning Cash + CFO + CFI + CFF
```

---

## 2. How the Statements Link

### The Golden Connections

1. **Net Income** flows from Income Statement to:
   - Cash Flow Statement (starting point for CFO)
   - Balance Sheet (increases Retained Earnings)

2. **Depreciation** appears on:
   - Income Statement (expense reducing Net Income)
   - Cash Flow Statement (added back as non-cash expense)
   - Balance Sheet (reduces PP&E via accumulated depreciation)

3. **Capital Expenditures:**
   - Cash Flow Statement (CFI outflow)
   - Balance Sheet (increases PP&E)

4. **Debt Changes:**
   - Cash Flow Statement (CFF inflow/outflow)
   - Balance Sheet (changes Debt balance)
   - Income Statement (affects Interest Expense)

5. **Working Capital Changes:**
   - Balance Sheet (Current Assets and Current Liabilities)
   - Cash Flow Statement (adjustments in CFO)

### Classic Interview Question: "$10 of Depreciation"

**Q: Walk me through how $10 of depreciation flows through the statements.**

**A:** Assuming a 25% tax rate:

**Income Statement:**
- Depreciation expense increases by $10
- Pre-tax income decreases by $10
- Tax expense decreases by $2.50 (tax shield)
- Net Income decreases by $7.50

**Cash Flow Statement:**
- Net Income down $7.50
- Add back $10 depreciation (non-cash)
- Net change in cash: +$2.50

**Balance Sheet:**
- Cash increases by $2.50
- PP&E decreases by $10 (accumulated depreciation)
- Retained Earnings decreases by $7.50
- Assets down $7.50, Equity down $7.50 → Balanced

---

## 3. Working Capital

### Definition
```
Working Capital = Current Assets - Current Liabilities
```

**Operating Working Capital (more common in banking):**
```
Operating WC = (Current Assets - Cash) - (Current Liabilities - Debt)
```
Or simplified:
```
Operating WC = Accounts Receivable + Inventory - Accounts Payable
```

### Cash Flow Impact
**Increase in Working Capital = Cash Outflow**
- A/R increases → sold goods but haven't collected cash
- Inventory increases → bought inventory but haven't sold it
- A/P decreases → paid suppliers

**Decrease in Working Capital = Cash Inflow**
- A/R decreases → collected cash from customers
- Inventory decreases → sold inventory
- A/P increases → delaying payments to suppliers

### Negative Working Capital
Common in certain industries (grocery, restaurants) where:
- Customers pay immediately (low/no A/R)
- Inventory turns quickly
- Suppliers give 30+ day payment terms

**Interpretation:**
- In retail/grocery: Sign of efficiency
- In other industries: May signal financial distress

### Key Ratios
- **Days Sales Outstanding (DSO)** = (A/R / Revenue) × 365
- **Days Inventory Outstanding (DIO)** = (Inventory / COGS) × 365
- **Days Payable Outstanding (DPO)** = (A/P / COGS) × 365
- **Cash Conversion Cycle** = DSO + DIO - DPO

---

## 4. Depreciation & Amortization

### Depreciation
Allocation of tangible asset cost over its useful life.

**Methods:**
1. **Straight-Line:** Equal expense each year
   - Annual Depreciation = (Cost - Salvage Value) / Useful Life

2. **Accelerated (Double-Declining Balance):**
   - Higher depreciation in early years
   - Rate = 2 × (1 / Useful Life)
   - Creates tax shield earlier (higher NPV of tax savings)

**Book vs Tax Depreciation:**
- Companies often use straight-line for books, accelerated for tax
- Creates **Deferred Tax Liability** (DTL) when book depreciation < tax depreciation
- DTL reverses in later years when book depreciation > tax depreciation

### Amortization
Same concept for intangible assets with definite lives.
- Patents, licenses, customer relationships
- Goodwill is NOT amortized (tested for impairment annually)

---

## 5. Deferred Taxes

### Deferred Tax Liability (DTL)
Created when:
- Tax expense (on income statement) > Taxes actually paid
- Company paid less in taxes now, will pay more later

**Common causes:**
- Accelerated depreciation for tax purposes
- Revenue recognized for book before tax
- Asset write-ups in M&A

### Deferred Tax Asset (DTA)
Created when:
- Taxes paid > Tax expense on income statement
- Company paid more in taxes now, will pay less later

**Common causes:**
- Accrued expenses recognized for book but not deductible until paid
- Net Operating Losses (NOLs)
- Asset write-downs

### NOL Treatment
- Can carry forward to offset future taxable income
- Section 382 limits annual usage in acquisitions:
  ```
  Annual Limit = Equity Purchase Price × Long-term Tax-Exempt Rate
  ```

---

## 6. Revenue Recognition & Accrual Accounting

### Accrual vs Cash Basis
**Accrual:** Revenue recognized when earned, expenses when incurred (regardless of cash movement)
**Cash:** Revenue/expenses recognized only when cash changes hands

### Revenue Recognition Criteria
Revenue is recognized when:
1. Performance obligation is satisfied
2. Risks and rewards have transferred
3. Amount can be reliably measured
4. Collection is probable

### Deferred Revenue
- Cash received before service/product delivered
- Liability on balance sheet
- Recognized as revenue when performance obligation satisfied

### Accounts Receivable
- Revenue recognized but cash not yet collected
- Asset on balance sheet

---

## 7. Capitalize vs Expense

### Capitalize If:
- Asset provides benefit for MORE than one year
- Creates an asset on balance sheet
- Depreciated/amortized over useful life
- Example: Equipment purchase, building

### Expense If:
- Benefit consumed within one year
- Immediately hits income statement
- Reduces current period Net Income
- Example: Repairs, utilities, wages

### R&D Treatment
- Generally expensed under US GAAP
- Some development costs capitalized under IFRS
- Capitalizing R&D: Increases EBITDA, may increase Net Income (depends on amortization)

---

## 8. Inventory Accounting

### FIFO (First In, First Out)
- Oldest inventory costs flow to COGS first
- Ending inventory reflects recent prices
- **In rising price environment:**
  - Lower COGS → Higher Net Income
  - Higher Inventory value on balance sheet

### LIFO (Last In, First Out)
- Newest inventory costs flow to COGS first
- Ending inventory reflects older prices
- **In rising price environment:**
  - Higher COGS → Lower Net Income → Lower Taxes
  - Lower Inventory value on balance sheet
- Not permitted under IFRS

### Inventory Write-Down Impact
**Income Statement:**
- Expense (COGS or separate line) increases
- Net Income decreases

**Balance Sheet:**
- Inventory asset decreases
- Retained Earnings decreases

**Cash Flow Statement:**
- Added back to CFO (non-cash expense)
- But already captured in working capital change, so no double counting

---

## 9. Goodwill & Intangibles

### Goodwill Creation
```
Goodwill = Purchase Price - Fair Market Value of Net Identifiable Assets
```

**When created:**
- Acquiring company pays premium over fair value of assets
- Represents synergies, brand value, customer relationships, workforce

### Impairment Testing
- Tested annually (not amortized)
- If fair value of reporting unit < carrying value, impairment recognized
- Write-down flows through Income Statement
- Non-cash, added back on Cash Flow Statement

### Other Intangibles
**Definite life:** Patents, licenses, customer contracts → Amortized
**Indefinite life:** Trademarks, brand names → Impairment tested (not amortized)

---

## 10. Stock-Based Compensation

### Accounting Treatment
- Recognized as expense on Income Statement
- Non-cash, added back on Cash Flow Statement
- Creates additional shares (dilution)

### Impact on Free Cash Flow
- Some analysts add back SBC to FCF
- Others argue it's a real economic cost (dilution)
- Important to be consistent in valuation

---

## 11. Key Financial Ratios

### Profitability
- **Gross Margin** = Gross Profit / Revenue
- **Operating Margin** = Operating Income / Revenue
- **Net Margin** = Net Income / Revenue
- **ROA** = Net Income / Total Assets
- **ROE** = Net Income / Shareholders' Equity
- **ROIC** = NOPAT / Invested Capital

### Liquidity
- **Current Ratio** = Current Assets / Current Liabilities
- **Quick Ratio** = (Current Assets - Inventory) / Current Liabilities
- **Cash Ratio** = Cash / Current Liabilities

### Leverage
- **Debt/Equity** = Total Debt / Total Equity
- **Debt/Capital** = Total Debt / (Total Debt + Total Equity)
- **Debt/EBITDA** = Total Debt / EBITDA
- **Net Debt/EBITDA** = (Total Debt - Cash) / EBITDA

### Coverage
- **Interest Coverage** = EBIT / Interest Expense
- **Fixed Charge Coverage** = (EBIT + Lease Payments) / (Interest + Lease Payments)

### DuPont Analysis (3-Step)
```
ROE = (Net Income/Revenue) × (Revenue/Assets) × (Assets/Equity)
    = Profit Margin × Asset Turnover × Financial Leverage
```

### DuPont Analysis (5-Step)
```
ROE = (Net Income/EBT) × (EBT/EBIT) × (EBIT/Revenue) × (Revenue/Assets) × (Assets/Equity)
    = Tax Burden × Interest Burden × Operating Margin × Asset Turnover × Leverage
```

---

## 12. Additional Topics for Potential New Lessons

### Lease Accounting (Post-2019)
**Finance Lease:**
- Asset and liability on balance sheet
- Depreciation on Income Statement
- Interest expense on debt portion

**Operating Lease:**
- Now also on balance sheet (right-of-use asset, lease liability)
- Single lease expense on Income Statement
- Still distinguished from finance lease in disclosures

### Intercompany Investments
**< 20% ownership:** Securities (marked to market or at cost)
**20-50% ownership:** Equity Method (proportional share of earnings)
**> 50% ownership:** Full Consolidation (100% of financials, minority interest for portion not owned)

### PIK (Payment-In-Kind) Interest
- Interest paid by issuing additional debt instead of cash
- Increases debt balance over time
- Non-cash expense, added back on Cash Flow Statement
- Still taxable as interest expense

### Original Issue Discount (OID)
- Bond issued below face value
- Discount amortized as additional interest expense over life
- Non-cash portion added back on Cash Flow Statement
