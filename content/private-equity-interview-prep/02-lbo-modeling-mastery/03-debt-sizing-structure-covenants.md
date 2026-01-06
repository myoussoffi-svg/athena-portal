---
id: debt-sizing-structure-covenants
title: Debt Sizing, Structure, and Covenant Considerations
order: 3
estimated_minutes: 35
---

# Debt Sizing, Structure, and Covenant Considerations

## Learning Objectives

- Explain how to size debt in an LBO and understand constraints on leverage
- Understand debt structure (revolvers, term loans, bonds) and how to model each tranche
- Evaluate covenant considerations and how they affect debt capacity
- Defend debt structure choices when challenged in interviews

## Written Guide

### How Much Debt Can You Raise?

Debt capacity depends on several factors:

**Cash flow coverage**: Lenders require that EBITDA or cash flow can cover interest payments by a comfortable margin. **Interest coverage ratios** (EBITDA / Interest Expense) typically need to be 2.0× or higher.

**Leverage multiples**: Lenders limit total debt to a multiple of EBITDA, typically **5.0-6.0× Total Debt/EBITDA** for LBOs. Senior secured debt (term loans) might be capped at 3.0-4.0× EBITDA.

**Asset base**: Secured lenders require collateral. If the company has limited hard assets (PP&E), secured debt capacity is constrained.

**Cash flow stability**: Cyclical or volatile businesses get less leverage than stable, predictable cash flow businesses.

**Market conditions**: In strong credit markets, leverage can exceed 6.0× EBITDA. In tight markets, lenders pull back to 4.0-5.0×.

### Typical LBO Debt Structure

A standard LBO uses multiple debt tranches:

**Revolver (5-10% of total capital)**:
- Short-term working capital facility (3-5 year maturity)
- Drawn as needed; often undrawn at closing
- Lowest interest rate (SOFR + 200-300 bps)
- Senior secured (first lien)

**Term Loan A (TLA) (15-20%)**:
- Amortizing (pays down principal over time)
- 5-7 year maturity
- SOFR + 250-350 bps
- Senior secured (first lien)
- Maintenance covenants (tested quarterly)

**Term Loan B (TLB) (30-40%)**:
- Bullet repayment (principal due at maturity)
- 7-8 year maturity
- SOFR + 350-500 bps
- Senior secured (first or second lien)
- Covenant-lite (no maintenance covenants)

**Senior Notes / High-Yield Bonds (10-20%)**:
- Unsecured
- 8-10 year maturity
- Fixed rate (6-10%)
- Incurrence covenants only

**Equity (30-40%)**:
- Sponsor contribution
- No repayment obligation; highest risk, highest return

Example for a $1B LBO:
- Revolver: $50M (5%)
- TLA: $150M (15%)
- TLB: $350M (35%)
- Senior Notes: $150M (15%)
- Equity: $300M (30%)

Total Debt: $700M (70% leverage)

### Modeling Debt in an LBO

For each debt tranche, model:

**Interest expense**:
- Floating rate debt: (Avg Balance) × (SOFR + Spread)
- Fixed rate debt: (Balance) × (Coupon Rate)
- Link total interest expense to the income statement

**Mandatory amortization**:
- TLA typically amortizes 5-10% per year
- TLB and bonds: minimal or no amortization

**Optional prepayments (cash sweeps)**:
- Excess cash flow (after CapEx, working capital, mandatory amortization) is used to pay down debt
- Pay down highest-cost debt first (usually senior notes, then TLB, then TLA)
- Ensure cash sweep logic is correct: only prepay if excess cash is available

**Revolver dynamics**:
- Model the revolver as a plug for working capital needs
- If cash is negative, draw on revolver; if cash is excess, pay down revolver

### Covenant Considerations

**Maintenance covenants** (tested quarterly):
- **Leverage covenant**: Total Debt / EBITDA < X (e.g., 5.5×)
- **Interest coverage covenant**: EBITDA / Interest Expense > Y (e.g., 2.5×)
- **Fixed charge coverage**: (EBITDA - CapEx) / (Interest + Principal Payments) > Z

If the company breaches a maintenance covenant, it's a default. Lenders can accelerate repayment or renegotiate terms.

**Incurrence covenants** (tested only when taking specific actions):
- Restrict additional debt, dividends, or acquisitions unless certain conditions are met
- Common in high-yield bonds and covenant-lite loans

In an interview model, you typically don't need to model covenants explicitly unless asked. But you should be aware of them and able to discuss how they constrain the company.

### How to Size Debt in an Interview

When building an LBO model, you may be told the debt structure (e.g., "Use 70% debt") or asked to determine it yourself.

**If given leverage**:
- Calculate total debt = Leverage % × Purchase Price
- Allocate across tranches based on typical structure

**If not given leverage**:
- Use a conservative leverage multiple (5.0-6.0× EBITDA)
- Check that interest coverage is adequate (EBITDA / Interest > 2.0×)
- If interest coverage is too low, reduce leverage

**Rule of thumb**: If you're unsure, use **60% debt / 40% equity** or **6.0× Total Debt/EBITDA**.

### Defending Your Debt Structure

Interviewers may ask: "Why did you use 6.0× leverage?" or "Could you raise more debt?"

**Strong answer**:

"I used 6.0× Total Debt/EBITDA, which is in line with recent sponsor-backed LBOs in this sector. At this leverage level, interest coverage is 2.5×, which provides comfortable headroom for lenders. I could potentially raise another 0.5-1.0× of debt, but that would reduce interest coverage and increase default risk if EBITDA underperforms. I prefer to maintain flexibility."

**Avoid**:
- "I just guessed 70% debt."
- "I didn't check if interest coverage was sufficient."

### Common Mistakes

**Not checking interest coverage**: If EBITDA / Interest < 2.0×, lenders won't provide that much debt.

**Ignoring amortization**: Forgetting to model TLA amortization underestimates cash outflows and overstates debt paydown.

**Not prioritizing debt paydown**: Pay down the highest-cost debt first (typically senior notes, then TLB).

**Overcomplicating the structure**: In an interview, you don't need six tranches. Three or four is sufficient.

## Video Placeholder

**Video Title**: Debt Sizing, Structure, and Covenants in LBOs

**Outline**:
- How to size debt: interest coverage, leverage multiples, asset base, cash flow stability
- Typical LBO debt structure: revolver, TLA, TLB, senior notes, equity
- Modeling debt: interest expense, amortization, cash sweeps, revolver dynamics
- Covenant considerations: maintenance vs. incurrence covenants
- How to size debt in an interview: use 60%/40% or 6.0× EBITDA if not specified
- Defending your debt structure when challenged
- Common mistakes: not checking coverage, ignoring amortization, wrong paydown priority

**Suggested Length**: 14 minutes

## Key Takeaways

- Debt capacity is determined by interest coverage (EBITDA / Interest > 2.0×) and leverage multiples (Total Debt/EBITDA = 5.0-6.0×)
- Typical LBO structure: 60-70% debt (revolver, TLA, TLB, bonds) and 30-40% equity
- Model interest expense, mandatory amortization, and optional prepayments (cash sweeps) for each tranche
- Maintenance covenants (leverage, interest coverage) are tested quarterly; breach triggers default
- If not given leverage, use 60% debt / 40% equity or 6.0× Total Debt/EBITDA as a default
- Defend your debt structure by referencing interest coverage, market comps, and downside protection
