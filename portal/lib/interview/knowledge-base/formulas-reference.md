# Finance Formulas Quick Reference

> Master formula sheet for Investment Banking interview preparation.
> Organized by topic for quick lookup.

---

## Accounting Formulas

### Balance Sheet
```
Assets = Liabilities + Shareholders' Equity
```

### Working Capital
```
Working Capital = Current Assets - Current Liabilities

Operating Working Capital = (Current Assets - Cash) - (Current Liabilities - Short-term Debt)

Simplified: Operating WC = Accounts Receivable + Inventory - Accounts Payable
```

### Working Capital Metrics
```
Days Sales Outstanding (DSO) = (Accounts Receivable / Revenue) × 365

Days Inventory Outstanding (DIO) = (Inventory / COGS) × 365

Days Payable Outstanding (DPO) = (Accounts Payable / COGS) × 365

Cash Conversion Cycle = DSO + DIO - DPO
```

### Depreciation
```
Straight-Line Depreciation = (Cost - Salvage Value) / Useful Life

Double-Declining Balance Rate = 2 × (1 / Useful Life)
DDB Depreciation = Book Value × DDB Rate
```

---

## Profitability Formulas

### Margin Ratios
```
Gross Margin = Gross Profit / Revenue

Operating Margin = Operating Income (EBIT) / Revenue

EBITDA Margin = EBITDA / Revenue

Net Profit Margin = Net Income / Revenue
```

### Return Ratios
```
Return on Equity (ROE) = Net Income / Shareholders' Equity

Return on Assets (ROA) = Net Income / Total Assets

Return on Invested Capital (ROIC) = NOPAT / Invested Capital
  where NOPAT = EBIT × (1 - Tax Rate)
  and Invested Capital = Total Debt + Shareholders' Equity - Cash
```

### DuPont Analysis
```
3-Step ROE = Profit Margin × Asset Turnover × Financial Leverage
           = (NI/Revenue) × (Revenue/Assets) × (Assets/Equity)

5-Step ROE = Tax Burden × Interest Burden × Operating Margin × Asset Turnover × Leverage
           = (NI/EBT) × (EBT/EBIT) × (EBIT/Revenue) × (Revenue/Assets) × (Assets/Equity)
```

---

## Liquidity & Leverage Formulas

### Liquidity Ratios
```
Current Ratio = Current Assets / Current Liabilities

Quick Ratio = (Current Assets - Inventory) / Current Liabilities

Cash Ratio = Cash / Current Liabilities
```

### Leverage Ratios
```
Debt-to-Equity = Total Debt / Total Equity

Debt-to-Capital = Total Debt / (Total Debt + Total Equity)

Debt-to-EBITDA = Total Debt / EBITDA

Net Debt-to-EBITDA = (Total Debt - Cash) / EBITDA
```

### Coverage Ratios
```
Interest Coverage Ratio = EBIT / Interest Expense

Fixed Charge Coverage = (EBIT + Lease Payments) / (Interest + Lease Payments + Principal)

Debt Service Coverage = EBITDA / (Interest + Principal)
```

---

## Valuation Formulas

### Equity Value
```
Equity Value = Share Price × Diluted Shares Outstanding
```

### Enterprise Value
```
Enterprise Value = Equity Value + Total Debt - Cash + Preferred Stock + Minority Interest

Simplified: EV = Equity Value + Net Debt
```

### Diluted Shares - Treasury Stock Method
```
Dilutive Shares from Options = Options × (Share Price - Strike Price) / Share Price

Only applies if Strike Price < Share Price (in-the-money)
```

### Valuation Multiples
```
EV/Revenue = Enterprise Value / Revenue

EV/EBITDA = Enterprise Value / EBITDA

EV/EBIT = Enterprise Value / EBIT

P/E = Price per Share / Earnings per Share = Equity Value / Net Income

P/B = Price per Share / Book Value per Share = Equity Value / Book Value

PEG = P/E Ratio / Earnings Growth Rate
```

---

## DCF Formulas

### Unlevered Free Cash Flow
```
UFCF = EBIT × (1 - Tax Rate)
     + Depreciation & Amortization
     - Capital Expenditures
     - Increase in Net Working Capital

Alternative (from Net Income):
UFCF = Net Income
     + Interest Expense × (1 - Tax Rate)
     + D&A
     - CapEx
     - Increase in NWC
```

### Levered Free Cash Flow
```
LFCF = Net Income
     + D&A
     - CapEx
     - Increase in NWC
     - Mandatory Debt Repayments
```

### Present Value
```
PV = Future Value / (1 + r)^n

PV of Growing Perpetuity = Cash Flow / (r - g)
  where r = discount rate, g = growth rate
```

### Terminal Value - Gordon Growth
```
Terminal Value = (Final Year UFCF × (1 + g)) / (WACC - g)
```

### Terminal Value - Exit Multiple
```
Terminal Value = Final Year EBITDA × Exit Multiple
```

### WACC
```
WACC = (E/V) × Re + (D/V) × Rd × (1 - T)

where:
E = Market Value of Equity
D = Market Value of Debt
V = E + D (Total Capital)
Re = Cost of Equity
Rd = Cost of Debt
T = Tax Rate
```

### Cost of Equity (CAPM)
```
Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium

Re = Rf + β × (Rm - Rf)
```

### Beta Formulas
```
Unlevered Beta = Levered Beta / [1 + (1 - T) × (D/E)]

Levered Beta = Unlevered Beta × [1 + (1 - T) × (D/E)]
```

---

## LBO Formulas

### Basic LBO Equation
```
Purchase Price = Debt + Sponsor Equity
```

### Sources = Uses
```
Total Sources (Debt + Equity) = Total Uses (Purchase + Fees + Cash to B/S)
```

### IRR Approximation
```
IRR ≈ (MOIC)^(1/n) - 1

where n = holding period in years
```

### Quick IRR Table
```
2x in 3 years ≈ 26% IRR
2x in 4 years ≈ 19% IRR
2x in 5 years ≈ 15% IRR
2.5x in 5 years ≈ 20% IRR
3x in 5 years ≈ 25% IRR
```

### Rules of 72 and 115
```
Years to Double = 72 / IRR%
Years to Triple = 115 / IRR%
```

### Cash Available for Debt Paydown
```
Cash for Optional Paydown = LFCF - Mandatory Amortization
```

### LBO Equity Value at Exit
```
Exit Equity = Exit Enterprise Value - Remaining Debt
            = (Exit EBITDA × Exit Multiple) - Remaining Debt

MOIC = Exit Equity / Initial Equity Investment
```

---

## M&A Formulas

### Accretion/Dilution
```
Pro Forma EPS = Pro Forma Net Income / Pro Forma Shares Outstanding

Accretion/(Dilution) % = (Pro Forma EPS - Standalone EPS) / Standalone EPS
```

### Pro Forma Net Income Adjustments
```
Pro Forma NI = Acquirer NI
             + Target NI
             + Synergies × (1 - T)
             - Foregone Interest Income × (1 - T)
             - New Interest Expense × (1 - T)
             - Incremental D&A × (1 - T)
```

### Exchange Ratio
```
Exchange Ratio = Offer Price per Target Share / Acquirer Stock Price
```

### Goodwill
```
Goodwill = Purchase Price - Fair Value of Net Identifiable Assets
```

### Deferred Taxes in M&A
```
DTL from Write-Up = Asset Write-Up × Tax Rate
DTA from Write-Down = Asset Write-Down × Tax Rate
```

### Control Premium
```
Control Premium = (Offer Price - Current Stock Price) / Current Stock Price

Typical Range: 25% - 50%
```

### Synergy Valuation (Perpetuity)
```
PV of Synergies = Annual Synergies / WACC
```

### Section 382 NOL Limitation
```
Annual NOL Usage Limit = Equity Purchase Price × Long-term Tax-Exempt Rate
```

---

## Quick Reference: Common Values

### Typical Ranges
```
WACC: 8-12%
Cost of Equity: 10-15%
Cost of Debt: 4-8%
Risk-Free Rate: 3-5%
Equity Risk Premium: 5-7%
Terminal Growth Rate: 2-4%
Tax Rate: 21-25% (US corporate)

EV/EBITDA: 6-12x (varies by industry)
P/E: 15-25x (varies by growth)

LBO Leverage: 4-6x EBITDA
LBO Target IRR: 20-25%
LBO Hold Period: 3-7 years
Control Premium: 25-50%
```
