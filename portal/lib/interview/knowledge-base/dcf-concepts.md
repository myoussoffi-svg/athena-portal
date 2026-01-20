# DCF Concepts Knowledge Base

> Comprehensive technical reference for Investment Banking interview preparation.
> Sources: BIWS 400 Questions, iBanking Insider, Wall Street Prep RedBook, 10X EBITDA Core Technicals, CFI Interview Guide

---

## 1. DCF Overview

### What is a DCF?
A Discounted Cash Flow analysis values a company based on the present value of its expected future cash flows.

**Core Principle:**
A dollar today is worth more than a dollar tomorrow due to:
- Time value of money
- Risk/uncertainty
- Opportunity cost

### Basic Formula
```
Enterprise Value = Σ (Cash Flow_t / (1 + WACC)^t) + Terminal Value / (1 + WACC)^n
```

### DCF Process (5 Steps)

1. **Project Free Cash Flows** (typically 5-10 years)
2. **Calculate Terminal Value** (value beyond projection period)
3. **Determine Discount Rate** (WACC)
4. **Discount Cash Flows** to present value
5. **Calculate Enterprise Value** (sum of PVs)

### When to Use / Not Use DCF

**Good candidates for DCF:**
- Stable, predictable cash flows
- Mature businesses
- Established companies with history
- Capital-intensive businesses

**Poor candidates for DCF:**
- Startups / early-stage companies
- Highly cyclical businesses
- Financial institutions (use DDM instead)
- Companies with negative/volatile cash flows
- Distressed companies

---

## 2. Free Cash Flow

### Unlevered Free Cash Flow (UFCF)
Cash available to ALL capital providers (debt + equity).

**Formula (starting from EBIT):**
```
UFCF = EBIT × (1 - Tax Rate)
     + Depreciation & Amortization
     - Capital Expenditures
     - Increase in Net Working Capital
```

**Alternative formula (starting from EBITDA):**
```
UFCF = EBITDA × (1 - Tax Rate)
     + D&A × Tax Rate
     - Capital Expenditures
     - Increase in Net Working Capital
```

**Alternative formula (starting from Net Income):**
```
UFCF = Net Income
     + Interest Expense × (1 - Tax Rate)
     + Depreciation & Amortization
     - Capital Expenditures
     - Increase in Net Working Capital
```

### Levered Free Cash Flow (LFCF)
Cash available to EQUITY holders only (after debt service).

**Formula:**
```
LFCF = Net Income
     + Depreciation & Amortization
     - Capital Expenditures
     - Increase in Net Working Capital
     - Mandatory Debt Repayments
```

### UFCF vs LFCF

| Aspect | UFCF | LFCF |
|--------|------|------|
| Available to | All capital providers | Equity only |
| Discount rate | WACC | Cost of Equity |
| Result | Enterprise Value | Equity Value |
| Interest | Excluded (tax-affected EBIT) | Included (after-tax) |
| Debt repayment | Excluded | Included |

**In LBOs, use LFCF** because it represents cash available for debt repayment.

---

## 3. Projection Period

### Why 5-10 Years?
- Far enough to capture growth trajectory
- Close enough to forecast reasonably
- Beyond 10 years, forecasts become unreliable

### Revenue Projections

**Bottom-Up Approach:**
- Project unit volumes × price per unit
- Build from product lines/segments
- More detailed, more defensible

**Top-Down Approach:**
- Start with market size
- Apply market share
- Apply growth rates

**Year-over-Year Approach:**
- Apply growth rate to prior year
- Simplest method
- Good for stable businesses

### Expense Projections
- Often modeled as % of revenue
- Distinguish fixed vs variable costs
- Consider operating leverage
- Historical margins as guide

### Working Capital Projections
- Model using days metrics (DSO, DIO, DPO)
- Or as % of revenue
- Watch for seasonality

### CapEx Projections
- Maintenance CapEx: Replace existing assets
- Growth CapEx: Expand capacity
- Often modeled as % of revenue or D&A

---

## 4. Terminal Value

### Why Terminal Value?
- Can't project cash flows forever
- Typically 60-80% of total DCF value
- Captures value beyond projection period

### Method 1: Gordon Growth Model (Perpetuity Growth)

**Formula:**
```
Terminal Value = Final Year UFCF × (1 + g) / (WACC - g)
```

Where:
- g = Perpetual growth rate (typically 2-4%)
- WACC = Weighted Average Cost of Capital

**Key Considerations:**
- Growth rate should not exceed long-term GDP growth
- Higher growth = Higher TV (very sensitive)
- Growth rate should be below WACC (otherwise infinite value)

### Method 2: Exit Multiple

**Formula:**
```
Terminal Value = Final Year EBITDA × Exit Multiple
```

**Key Considerations:**
- Exit multiple based on comparable companies
- Often use current trading multiples
- More common in investment banking
- Less "theoretical" than Gordon Growth

### Which Method to Use?

**Gordon Growth:**
- More theoretically sound
- Requires perpetual growth assumption
- Good for stable, mature businesses

**Exit Multiple:**
- More practical / market-based
- Doesn't require growth assumption
- Good when reliable comparable data exists
- Circular (uses multiples to derive multiples)

**Best Practice:** Use both and compare results.

### Terminal Value as % of Total Value
- If TV > 75% of total value, projections may be too short
- Or growth rate/multiple may be too aggressive
- Sanity check your assumptions

---

## 5. WACC (Weighted Average Cost of Capital)

### What is WACC?
The blended cost of a company's capital, weighted by the proportion of each source.

### Formula
```
WACC = (E/V) × Re + (D/V) × Rd × (1 - T)
```

Where:
- E = Market value of equity
- D = Market value of debt
- V = E + D (total capital)
- Re = Cost of equity
- Rd = Cost of debt
- T = Corporate tax rate

### Why Tax-Affect Debt?
Interest payments are tax-deductible, creating a "tax shield."
After-tax cost of debt = Pre-tax cost × (1 - Tax Rate)

---

## 6. Cost of Equity (CAPM)

### Capital Asset Pricing Model

**Formula:**
```
Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium
```

**Components:**

**Risk-Free Rate:**
- 10-year or 30-year US Treasury yield
- Represents return on "riskless" investment
- Currently ~4-5% (varies with market conditions)

**Beta:**
- Measures systematic risk (market correlation)
- Beta = 1: Same volatility as market
- Beta > 1: More volatile than market
- Beta < 1: Less volatile than market
- Beta = 0: No correlation with market
- Negative Beta: Inverse correlation (rare)

**Equity Risk Premium (ERP):**
- Expected excess return of market over risk-free rate
- Historical range: 4-7%
- Commonly use 5-6%

### Example Calculation
```
Risk-Free Rate: 4%
Beta: 1.2
Equity Risk Premium: 6%

Cost of Equity = 4% + 1.2 × 6% = 11.2%
```

---

## 7. Beta: Levering and Unlevering

### Why Lever/Unlever Beta?
- Published betas reflect company's capital structure
- Different companies have different leverage
- To compare apples-to-apples, unlever to remove leverage effect
- Then relever to reflect target company's capital structure

### Unlevering Beta

**Formula (Hamada):**
```
Unlevered Beta = Levered Beta / [1 + (1 - Tax Rate) × (Debt/Equity)]
```

### Relevering Beta

**Formula:**
```
Levered Beta = Unlevered Beta × [1 + (1 - Tax Rate) × (Debt/Equity)]
```

### Process for DCF
1. Find levered betas of comparable companies
2. Unlever each using their D/E ratios
3. Calculate median unlevered beta
4. Relever using target company's D/E ratio
5. Use relevered beta in CAPM

---

## 8. Cost of Debt

### Determination Methods

**For public debt:**
- Yield to Maturity (YTM) on existing bonds
- Credit spread over treasuries

**For private/no public debt:**
- Based on credit rating
- Comparable company debt yields
- Bank loan pricing

### Pre-Tax vs After-Tax
- Use pre-tax rate in formula
- Tax adjustment applied via (1 - T) factor
- After-tax cost reflects actual cash burden

---

## 9. Discounting Cash Flows

### Basic Present Value

**Formula:**
```
PV = Future Value / (1 + r)^n
```

### End-of-Year Convention
- Assumes cash flows occur at year end
- Discount periods: 1, 2, 3, 4, 5

### Mid-Year Convention
- Assumes cash flows occur throughout year
- More realistic
- Discount periods: 0.5, 1.5, 2.5, 3.5, 4.5
- Results in higher present value

**Adjustment factor for Terminal Value with mid-year convention:**
- Terminal Value at end of year 5
- Discount by 5 years (not 4.5)

### Stub Period
If valuing mid-year, first period may be partial year.
Discount period = Days remaining / 365

---

## 10. From Enterprise Value to Equity Value

### Bridge from EV to Equity

```
Equity Value = Enterprise Value
             - Total Debt
             + Cash
             - Preferred Stock
             - Minority Interest
```

### Per Share Value

```
Implied Share Price = Equity Value / Diluted Shares Outstanding
```

### Premium/Discount to Current Price

```
Premium = (Implied Price - Current Price) / Current Price
```

---

## 11. Sensitivity Analysis

### Why Sensitivity Analysis?
- DCF heavily dependent on assumptions
- Small changes can significantly impact value
- Shows range of possible outcomes
- Identifies key value drivers

### Common Sensitivity Tables

**Table 1: Terminal Value Sensitivity**
- Rows: Terminal growth rate (1%, 2%, 3%, 4%)
- Columns: Exit multiple (6x, 7x, 8x, 9x)

**Table 2: WACC vs Growth**
- Rows: WACC (8%, 9%, 10%, 11%)
- Columns: Perpetual growth (1%, 2%, 3%, 4%)

**Table 3: Revenue Growth vs Margin**
- Rows: Revenue growth assumptions
- Columns: EBITDA margin assumptions

### Key Drivers to Sensitize
- Revenue growth rate
- EBITDA/Operating margins
- Terminal growth rate
- Exit multiple
- WACC
- Tax rate

---

## 12. DCF Variations

### Dividend Discount Model (DDM)
Used for financial institutions where debt is part of operations.

**Formula:**
```
Equity Value = Σ (Dividends / (1 + Cost of Equity)^t) + Terminal Value
```

Terminal Value = Final Dividend × (1 + g) / (Cost of Equity - g)

### Adjusted Present Value (APV)
Separates operating value from financing effects.

**Formula:**
```
APV = NPV of Unlevered Firm + NPV of Financing Effects
```

Financing effects include:
- Tax shields from debt
- Costs of financial distress

### Economic Profit / EVA Model
Based on returns above cost of capital.

**Formula:**
```
Value = Invested Capital + Present Value of Economic Profits
Economic Profit = NOPAT - (Invested Capital × WACC)
```

---

## 13. Common DCF Interview Questions

### "Walk me through a DCF"
1. Project free cash flows 5-10 years
2. Calculate terminal value (Gordon Growth or Exit Multiple)
3. Discount at WACC
4. Sum to get Enterprise Value
5. Subtract debt, add cash for Equity Value

### "What's the relationship between WACC and valuation?"
Lower WACC = Higher valuation (inverse relationship)
- Lower discount rate means future cash flows worth more today

### "Why might DCF give different value than trading multiples?"
- DCF captures company-specific assumptions
- Market may be over/under-valuing sector
- DCF includes growth trajectory, market prices current state
- Different assumptions about synergies, margins, growth

### "Perpetuity value is infinite, how can company be valued?"
The denominator (WACC - g) prevents infinite value as long as g < WACC.
Present value of growing perpetuity is finite when discount rate exceeds growth rate.

### "What if WACC equals growth rate?"
Formula breaks (division by zero).
Value would theoretically be infinite.
This signals unrealistic assumptions - growth can't equal cost of capital forever.

### "How do you handle negative cash flows?"
- Project until cash flows turn positive
- Extend projection period if needed
- May need alternative valuation method
- Still discount negative cash flows

### "Terminal value is 80% of DCF value - is this a problem?"
Not necessarily, but warrants scrutiny:
- Check if growth rate is reasonable
- Check if projection period is long enough
- Compare terminal multiple to current trading
- Run sensitivity analysis
