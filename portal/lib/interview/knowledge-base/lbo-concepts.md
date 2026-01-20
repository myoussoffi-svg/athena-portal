# LBO Concepts Knowledge Base

> Comprehensive technical reference for Investment Banking interview preparation.
> Sources: BIWS 400 Questions, iBanking Insider, Wall Street Prep RedBook, 10X EBITDA Core Technicals, CFI Interview Guide

---

## 1. LBO Overview

### What is an LBO?
A Leveraged Buyout is the acquisition of a company using a significant amount of borrowed money (debt) to fund the purchase price, with the company's assets and cash flows serving as collateral.

### Basic Structure
```
Purchase Price = Debt + Equity
```

**Typical capital structure:**
- 1980s: 90% debt / 10% equity
- Today: 50-70% debt / 30-50% equity

### Why Use Leverage?

1. **Amplifies Returns:**
   - Less equity invested means higher return on that equity
   - Debt is cheaper than equity (lower required return)

2. **Tax Shield:**
   - Interest payments are tax-deductible
   - Reduces effective cost of debt

3. **Discipline:**
   - Debt service forces operational efficiency
   - No "excess" cash for poor investments

### LBO as Valuation Methodology
LBO analysis establishes a "floor valuation" - the maximum price a PE firm would pay to achieve target returns (20-25% IRR).

---

## 2. Ideal LBO Candidate

### Characteristics

**Strong, Predictable Cash Flows:**
- Stable revenue base
- Recurring revenue / long-term contracts
- Low cyclicality
- Cash flow to service debt

**Low Capital Requirements:**
- Minimal maintenance CapEx
- Asset-light business model
- Low working capital needs

**Defensible Market Position:**
- Strong competitive moat
- Pricing power
- High barriers to entry
- Leading market share

**Operational Improvement Opportunities:**
- Cost reduction potential
- Margin expansion opportunities
- Underutilized capacity
- Inefficient operations

**Strong Management Team:**
- Capable of executing value creation plan
- Aligned incentives (management rollover/options)

**Favorable Valuation:**
- Reasonable entry multiple
- Potential for multiple expansion at exit

### Industries with Good LBO Candidates
- Business services
- Healthcare services
- Food & beverage
- Consumer products (staples)
- Industrial distributors
- Software (especially B2B/SaaS)

### Industries with Poor LBO Candidates
- Highly cyclical (commodities, airlines)
- Capital-intensive (heavy manufacturing)
- Highly regulated with uncertainty
- High technology risk

---

## 3. LBO Returns

### Key Metrics

**IRR (Internal Rate of Return):**
- Annualized return on investment
- Target: 20-25% for most PE firms
- Accounts for timing of cash flows

**MOIC (Multiple on Invested Capital):**
- Exit proceeds / Initial equity investment
- Also called "cash-on-cash" return
- Doesn't account for timing

**Relationship between IRR and MOIC:**
```
IRR = (MOIC)^(1/years) - 1
```

### IRR/MOIC Approximation Table

| MOIC | 3 Years | 5 Years | 7 Years |
|------|---------|---------|---------|
| 2.0x | ~25% | ~15% | ~10% |
| 2.5x | ~35% | ~20% | ~14% |
| 3.0x | ~45% | ~25% | ~17% |
| 3.5x | ~52% | ~28% | ~20% |

### Rule of 72 (Doubling Time)
```
Years to Double = 72 / IRR%
```
Example: At 20% IRR, money doubles in ~3.6 years

### Rule of 115 (Tripling Time)
```
Years to Triple = 115 / IRR%
```
Example: At 25% IRR, money triples in ~4.6 years

---

## 4. Value Creation Levers

### Three Primary Sources of Returns

**1. EBITDA Growth**
- Revenue growth (organic or acquisition)
- Margin expansion (cost reduction)
- Operational improvements
- Contributes most sustainably to returns

**2. Debt Paydown (Deleveraging)**
- Free cash flow used to repay debt
- Reduces debt, increases equity value
- "Free" equity creation from operations
- Most reliable return component

**3. Multiple Expansion**
- Exit at higher multiple than entry
- Due to: growth, scale, reduced risk, market timing
- Least controllable, often opportunistic

### Example Value Bridge

```
Entry: $100M EBITDA × 8x = $800M EV
  - Initial Debt: $500M
  - Initial Equity: $300M

Exit (Year 5): $150M EBITDA × 9x = $1,350M EV
  - Exit Debt: $250M (paid down $250M)
  - Exit Equity: $1,100M

MOIC = $1,100M / $300M = 3.7x
IRR ≈ 30%
```

**Value Creation Attribution:**
- EBITDA growth: $400M (50% increase × 8x original multiple)
- Multiple expansion: $150M (1x increase × $150M EBITDA)
- Debt paydown: $250M

---

## 5. Sources and Uses

### Sources of Funds

**Debt:**
- Revolving Credit Facility (usually undrawn at close)
- Term Loan A (TLA)
- Term Loan B (TLB)
- Senior Notes / High-Yield Bonds
- Subordinated Notes
- Mezzanine Debt

**Equity:**
- Sponsor equity (PE firm)
- Management rollover
- Co-investors

### Uses of Funds

- Purchase of equity (to selling shareholders)
- Refinance existing debt
- Transaction fees (M&A advisory, financing, legal)
- Cash to balance sheet (minimum operating cash)

### Sources = Uses
The table must balance. If sources > uses, excess goes to cash or reduces equity needed.

### Example Sources & Uses

**Sources:**
| Source | Amount | Multiple |
|--------|--------|----------|
| Revolving Credit | $0 | 0.0x |
| Term Loan B | $300M | 4.0x |
| Senior Notes | $150M | 2.0x |
| Sponsor Equity | $225M | 3.0x |
| Management Rollover | $25M | 0.3x |
| **Total Sources** | **$700M** | **9.3x** |

**Uses:**
| Use | Amount |
|-----|--------|
| Purchase Equity | $650M |
| Refinance Debt | $30M |
| Transaction Fees | $15M |
| Cash to B/S | $5M |
| **Total Uses** | **$700M** |

---

## 6. Debt in LBOs

### Debt Hierarchy (Senior to Junior)

| Type | Security | Rate | Amortization | Covenants |
|------|----------|------|--------------|-----------|
| Revolver | Senior Secured | L+150-300 | None | Maintenance |
| Term Loan A | Senior Secured | L+200-350 | 5-10% annual | Maintenance |
| Term Loan B | Senior Secured | L+250-450 | 1% annual | Incurrence |
| Senior Notes | Senior Unsecured | 6-10% fixed | None (bullet) | Incurrence |
| Sub Notes | Subordinated | 8-12% fixed | None (bullet) | Light |
| Mezzanine | Subordinated | 12-18% (often PIK) | None | Light |

### Bank Debt vs High-Yield

**Bank Debt (Term Loans):**
- Lower interest rate
- Secured by assets
- Shorter maturity (5-7 years)
- Amortization required
- Maintenance covenants
- Prepayable without penalty
- Held by banks, CLOs

**High-Yield Bonds:**
- Higher interest rate
- Usually unsecured
- Longer maturity (7-10 years)
- No amortization (bullet maturity)
- Incurrence covenants
- Non-call period, then prepayable with premium
- Held by institutional investors

### Covenants

**Maintenance Covenants:**
- Tested regularly (quarterly)
- Must maintain specific ratios
- If breached, technical default
- Example: Debt/EBITDA < 5.0x tested quarterly

**Incurrence Covenants:**
- Only tested when taking specific action
- Must meet ratio to incur more debt
- More PE-friendly
- Example: Can only incur new debt if Debt/EBITDA < 6.0x after issuance

### Common Credit Metrics

**Leverage Ratios:**
- Total Debt / EBITDA
- Senior Debt / EBITDA
- Net Debt / EBITDA

**Coverage Ratios:**
- Interest Coverage = EBITDA / Interest Expense
- Fixed Charge Coverage = (EBITDA - CapEx) / (Interest + Mandatory Amortization)

---

## 7. LBO Model Mechanics

### Step 1: Entry Valuation
- Determine purchase price (usually EV/EBITDA multiple)
- For public company: Premium to current stock price
- For private company: Negotiated multiple

### Step 2: Sources and Uses
- Size debt tranches based on leverage capacity
- Equity = Total Uses - Total Debt Sources
- Balance the table

### Step 3: Adjust Balance Sheet

**Opening Balance Sheet Adjustments:**
- Write off existing equity (to zero)
- Remove old debt, add new debt
- Adjust cash for uses
- Create new Sponsor Equity
- Goodwill created = Purchase Price - Book Value of Net Assets

### Step 4: Project Financials
- Build Income Statement projection
- Focus on EBITDA growth, margins
- Calculate interest expense based on debt schedule
- Project tax and net income

### Step 5: Build Debt Schedule
- Track each debt tranche
- Mandatory amortization
- Cash sweep for optional paydown
- Calculate interest expense

**Cash Sweep Logic:**
```
Available Cash = LFCF - Mandatory Amortization
Optional Paydown = Min(Available Cash, Outstanding Debt)
```

### Step 6: Calculate Returns
- Project exit value (EBITDA × Exit Multiple)
- Subtract remaining debt
- Calculate Equity Value at exit
- Compute IRR and MOIC

---

## 8. Circular Reference in LBO

### The Circularity

```
Net Income → depends on Interest Expense
Interest Expense → depends on Debt Balance
Debt Balance → depends on Debt Paydown
Debt Paydown → depends on Free Cash Flow
Free Cash Flow → depends on Net Income
```

### Solutions

**1. Iterative Calculation:**
- Enable iterative calculations in Excel
- Model converges to solution

**2. Macro:**
- VBA macro to toggle circularity
- Copy/paste values to break circle

**3. Avoid Circularity:**
- Use beginning-of-period debt for interest calculation
- Slightly less accurate but no circularity

---

## 9. Exit Strategies

### Sale to Strategic Buyer
- Often highest valuation (synergies)
- Clean exit for sponsor
- Most common exit route

### Sale to Another PE Firm (Secondary Buyout)
- Sponsor-to-sponsor transaction
- May signal limited strategic interest
- Common in current market

### IPO
- Partial exit initially
- Sponsor retains stake, sells down over time
- More complex, longer timeline
- Requires public market conditions

### Dividend Recapitalization
- Company borrows debt to pay dividend to sponsor
- Partial return of capital
- Not a full exit
- Increases leverage

---

## 10. Paper LBO / Mental Math

### Quick LBO Framework

**Given:**
- Entry multiple: 8x EBITDA
- EBITDA: $100M
- Leverage: 5x EBITDA ($500M debt)
- Exit multiple: 8x EBITDA
- Hold period: 5 years
- EBITDA growth: 5% per year

**Calculate:**

**Entry:**
```
EV = $100M × 8x = $800M
Debt = $100M × 5x = $500M
Equity = $800M - $500M = $300M
```

**Exit:**
```
Year 5 EBITDA = $100M × (1.05)^5 = $128M
Exit EV = $128M × 8x = $1,024M
```

**Estimate Debt Paydown:**
- Assume ~$50M annual free cash flow
- 5 years × $50M = $250M debt paydown
- Remaining debt: $250M

**Exit Equity:**
```
Exit Equity = $1,024M - $250M = $774M
MOIC = $774M / $300M = 2.6x
```

**Estimate IRR:**
- 2.6x in 5 years ≈ 21% IRR

### Quick IRR Shortcuts

- 2x in 3 years ≈ 26% IRR
- 2x in 5 years ≈ 15% IRR
- 3x in 5 years ≈ 25% IRR
- 2x in 4 years ≈ 19% IRR

---

## 11. Advanced LBO Topics

### Management Equity / Option Pool
- Management typically receives 5-15% of equity
- Through options, restricted stock, or co-investment
- Aligns incentives with sponsor
- Creates significant wealth if successful

### Add-On Acquisitions
- Acquiring smaller companies during hold period
- "Buy and build" strategy
- Often at lower multiples than platform
- Creates multiple arbitrage

### Multiple Arbitrage
```
Entry: 6x EBITDA (small company)
Exit: 8x EBITDA (larger, scaled platform)
```
- Scale commands premium multiple
- Risk reduction as company grows
- Strategy often seen in fragmented industries

### Equity Cure Rights
- Sponsor can inject equity to cure covenant breach
- Prevents technical default
- Protects investment during temporary downturns

### PIK (Payment-In-Kind) Interest
- Interest paid by issuing more debt instead of cash
- Preserves cash flow for operations
- Debt balance grows over time
- Higher total interest cost

---

## 12. Common LBO Interview Questions

### "Walk me through an LBO"
1. A PE firm acquires a company using mostly debt
2. Company's cash flows service and pay down debt
3. After 5-7 years, PE exits via sale or IPO
4. Returns driven by: EBITDA growth, debt paydown, multiple expansion

### "Why does leverage increase returns?"
- Less equity invested for same total purchase price
- Returns concentrated on smaller equity base
- Example: $100M company, 80% leverage = $20M equity
  - If company doubles, equity goes from $20M to $120M = 6x return
  - Without leverage (100% equity), return would only be 2x

### "Can leverage decrease returns?"
Yes, if:
- Company underperforms and can't service debt
- Bankruptcy wipes out equity entirely
- Interest costs exceed operating profits
- Company value declines (equity hit first)

### "Why 20-25% target IRR?"
- Compensates for illiquidity (capital locked up 5-7 years)
- Higher risk than public markets
- Limited partners expect premium returns
- Covers management fees (2% annual, 20% carry)

### "How do you determine debt capacity?"
- Based on cash flow to service debt
- Typical leverage: 4-6x EBITDA
- Interest coverage: minimum 2.0x
- Banks determine maximum they'll lend

### "What happens to EV if you add debt?"
Nothing - EV stays the same (for same operating business).
Adding debt just shifts value from equity to debt holders.
More debt = Lower equity value, but EV unchanged.

### "What if there's no EBITDA growth or multiple expansion?"
You can still generate returns through debt paydown alone.
Example:
- Entry: $500M debt, $300M equity = $800M EV
- Exit (same EV): $200M debt, $600M equity (paid down $300M)
- MOIC: 2.0x purely from deleveraging
