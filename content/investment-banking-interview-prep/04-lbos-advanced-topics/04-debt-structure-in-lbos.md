---
id: debt-structure-in-lbos
title: Debt Structure in LBOs
order: 4
estimated_minutes: 40
video:
  provider: vimeo
  id: "1164444147"
---

# Debt Structure in LBOs

## Learning Objectives

- Explain the different types of debt used in LBOs and their characteristics
- Understand the seniority structure: secured vs. unsecured, senior vs. subordinated
- Describe typical debt terms: interest rates, maturity, covenants, amortization
- Evaluate why LBOs use multiple layers of debt (the "debt stack")
- Understand PIK interest mechanics and when it's used
- Calculate mezzanine returns including equity kickers

## Written Guide

### Why LBOs Use Multiple Types of Debt

LBOs are financed with several types of debt, each with different characteristics, costs, and risks. This "debt stack" allows the buyer to:

- Maximize leverage (lower equity contribution)
- Match debt terms to cash flow profile (some debt amortizes, some doesn't)
- Balance cost and risk (senior debt is cheaper but more restrictive)

The debt stack is layered by **seniority**: in a default or bankruptcy, senior debt gets repaid first, then subordinated debt, and equity holders are last.

### The Debt Stack: From Senior to Junior

**1. Revolving Credit Facility (Revolver)**:
- A flexible line of credit (e.g., $50M available, but not necessarily drawn)
- Used for working capital or short-term needs
- **Senior secured** (first lien on assets)
- Lowest interest rate (SOFR + 200-300 bps)
- Short maturity (3-5 years)
- Often undrawn at closing

**2. Term Loan A (TLA)**:
- Amortizing loan (principal is paid down over time)
- **Senior secured** (first lien)
- Lower interest rate (SOFR + 250-350 bps)
- Moderate maturity (5-7 years)
- Stricter covenants

**3. Term Loan B (TLB)**:
- Longer maturity (7-8 years)
- Bullet repayment (principal paid at maturity, not amortized)
- **Senior secured** (first lien or second lien)
- Higher interest rate than TLA (SOFR + 350-500 bps)
- Fewer covenants ("covenant-lite")
- Often sold to institutional investors (CLOs, hedge funds)

**4. Senior Notes / High-Yield Bonds**:
- **Unsecured** (no collateral)
- Higher interest rate (6-10%+, fixed or floating)
- Longer maturity (8-10 years)
- Traded in the bond market
- Fewer covenants, but often include call protection (restrictions on early repayment)

**5. Subordinated Debt / Mezzanine Debt**:
- **Unsecured and subordinated** (repaid after senior debt in a default)
- Highest interest rate (10-15%+)
- May include equity kickers (warrants or equity participation)
- Used to bridge the gap between senior debt and equity
- Less common in recent years due to availability of covenant-lite TLBs

### PIK Interest (Payment-in-Kind)

**PIK interest** is a form of interest payment where instead of paying cash, the borrower "pays" by adding the interest amount to the principal balance. This preserves cash in the early years when the company may need it for operations or growth.

**How PIK Works**:
- Year 1: $100M loan at 10% PIK → No cash interest paid, but principal grows to $110M
- Year 2: $110M × 10% = $11M added → Principal becomes $121M
- The interest compounds, increasing total debt over time

**PIK vs. Cash Interest**:

```calculation
title: "PIK vs. Cash Interest Comparison"
given:
  - "Cash Interest: Cash outflow each period, debt balance stays constant"
  - "PIK Interest: No cash outflow (deferred), debt balance grows over time"
steps:
  - "Cash Interest total cost: Lower (no compounding effect)"
  - "PIK Interest total cost: Higher (due to compounding on growing balance)"
  - "Cash Interest used when: Strong cash flow available"
  - "PIK Interest used when: Cash-constrained or high-growth situations"
result: "PIK preserves near-term cash flow but increases total debt and interest cost over time"
```

**PIK Toggle**: Some instruments have a "PIK toggle" allowing the borrower to choose between paying cash interest or PIK in any given period, providing flexibility.

**Where PIK Appears**: Common in mezzanine debt, subordinated notes, and holdco debt (debt at the sponsor level, not the operating company).

### Mezzanine Returns and Equity Kickers

Mezzanine lenders accept higher risk than senior lenders but lower risk than equity. To compensate, they receive:

1. **High cash interest rate** (8-12%)
2. **PIK component** (additional 2-4%)
3. **Equity participation** (warrants or co-invest rights)

**Typical Mezzanine Structure**:
- Cash coupon: 10%
- PIK coupon: 4%
- Warrants for 2-5% of equity

**Mezzanine Returns Calculation**:

If a mezzanine lender invests $50M with 10% cash + 4% PIK + warrants worth $10M at exit over 5 years:

- Cash interest: $50M × 10% × 5 years = $25M
- PIK (compounded): Principal grows from $50M to ~$61M
- Warrant value at exit: $10M
- Total return: $25M cash + $61M principal + $10M = $96M on $50M invested
- MOIC: 1.9×, IRR: ~14%

This blended return (between debt and equity) is why mezzanine is called "mezz"—it sits in the middle of the capital structure.

### Secured vs. Unsecured

**Secured Debt**:
- Backed by collateral (assets of the company)
- If the company defaults, secured lenders can seize assets
- Lower interest rates due to lower risk
- Examples: Revolver, Term Loan A, Term Loan B

**Unsecured Debt**:
- Not backed by specific collateral
- Higher risk → higher interest rates
- Examples: High-yield bonds, subordinated debt

### Covenants

**Covenants** are terms in the debt agreement that restrict the borrower's actions and protect lenders. They fall into two categories:

**1. Maintenance Covenants**:
- Require the company to maintain certain financial ratios (e.g., Debt/EBITDA < 5.0×, Interest Coverage > 3.0×)
- Tested quarterly
- Common in Term Loan A and revolvers
- Breach can trigger default

**2. Incurrence Covenants**:
- Restrict specific actions (e.g., can't incur additional debt, make acquisitions, or pay dividends beyond certain limits)
- Only tested if the company takes the restricted action
- Common in high-yield bonds and covenant-lite loans

**Covenant-lite loans** have fewer or no maintenance covenants, giving the borrower more flexibility. They became common after the financial crisis and are now standard for Term Loan B and high-yield bonds.

### Amortization vs. Bullet Repayment

**Amortization**:
- Principal is repaid gradually over the life of the loan
- Reduces outstanding debt and interest expense over time
- Common in Term Loan A

**Bullet Repayment**:
- Principal is repaid in full at maturity
- No amortization during the life of the loan
- Common in Term Loan B, high-yield bonds, and subordinated debt

LBOs often use a mix: some debt amortizes (reducing leverage over time), and some is bullet (preserving cash for growth or other uses).

### Why the Debt Stack Exists

The debt stack allows the borrower to:

- **Maximize leverage**: By using multiple types of debt, the company can borrow more than it could with a single lender
- **Optimize cost**: Senior secured debt is cheap; subordinated debt is expensive. Use more senior debt to lower the blended cost
- **Match cash flow**: Amortizing debt (TLA) reduces leverage steadily; bullet debt (TLB, bonds) defers repayment until exit

Lenders accept this structure because each layer has different risk/return profiles. Senior lenders have collateral and first claim on cash flows. Subordinated lenders accept higher risk in exchange for higher returns.

### Typical LBO Debt Structure (Example)

For a $1,000M LBO:

- Revolver: $50M (5%) - undrawn at close
- Term Loan A: $150M (15%)
- Term Loan B: $300M (30%)
- Senior Notes: $200M (20%)
- Sponsor Equity: $300M (30%)

Total Debt: $700M (70%)
Total Equity: $300M (30%)

### Common Mistakes

**Confusing seniority with security**: "Senior" means it's repaid first. "Secured" means it's backed by collateral. Senior unsecured debt exists (e.g., senior notes).

**Not understanding covenant-lite**: Covenant-lite loans are common now, especially for Term Loan B. Don't assume all loans have maintenance covenants.

**Forgetting that revolvers are often undrawn**: A revolver provides liquidity but may not be drawn at closing. It's a source of funds (committed), but not necessarily a use.

**Thinking all debt amortizes**: Most LBO debt is bullet (TLB, bonds). Only TLA and sometimes revolver amortize.

