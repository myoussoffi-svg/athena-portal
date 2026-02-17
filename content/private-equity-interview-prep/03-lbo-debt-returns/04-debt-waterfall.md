---
id: debt-waterfall
title: Debt Repayment Waterfall and Priority
order: 4
estimated_minutes: 30
---

# Debt Repayment Waterfall and Priority

## Learning Objectives

- Understand how debt repayment priority affects cash allocation in LBO models
- Model complex waterfalls with multiple tranches and varying priorities
- Handle prepayment premiums and call protection in debt schedules
- Recognize how waterfall structure affects returns and covenant flexibility
- Apply waterfall logic to calculate debt balances at exit

## Written Guide

### The Concept of Payment Priority

In any leveraged capital structure, not all debt is created equal. When a company generates excess cash or faces distress, the order in which creditors receive payment is governed by a strict hierarchy known as the debt waterfall. Understanding this waterfall is essential for both modeling accuracy and investment decision-making.

The payment waterfall operates on a simple principle: senior claims must be satisfied before junior claims receive anything. This applies both to ongoing operations (interest and principal payments) and to liquidation scenarios. In an LBO context, the waterfall determines how excess cash flow is allocated to debt repayment and, at exit, how sale proceeds are distributed among capital providers.

### The Standard LBO Debt Waterfall

A typical LBO capital structure creates the following payment priority:

**1. Revolving Credit Facility**: As the most senior tranche with direct access to working capital assets, the revolver is repaid first from excess cash. Many credit agreements require the revolver to be "cleaned down" (fully repaid) for a period each year.

**2. Term Loan A / First Lien Term Loan**: Senior secured term debt is next in priority. Mandatory amortization is paid first, followed by optional prepayments from cash sweeps.

**3. Term Loan B / Second Lien Term Loan**: If the structure includes a second lien tranche, it sits behind the first lien debt. Second lien debt typically cannot be prepaid until first lien debt is fully retired, absent specific carve-outs.

**4. Senior Unsecured Notes**: High-yield bonds or senior notes rank below secured debt but above subordinated instruments.

**5. Subordinated Debt / Mezzanine**: Junior debt receives payment only after senior obligations are satisfied. Mezzanine instruments often include equity kickers to compensate for subordination.

**6. Preferred Equity**: Though technically equity, preferred stock has priority over common equity for dividend payments and liquidation proceeds.

**7. Common Equity**: The PE sponsor's equity is the most junior claim, receiving distributions only after all debt and preferred obligations are met.

### Modeling the Waterfall in Excel

Implementing the waterfall requires a systematic approach that allocates available cash according to priority. The logic flows as follows:

Start with total cash available for debt service after operating needs:

Cash Available = EBITDA - Cash Interest - Cash Taxes - CapEx - Delta NWC - Minimum Cash

Then allocate according to the waterfall:

**Step 1 - Revolver**: Repay any drawn revolver balance
- Revolver Repayment = MIN(Revolver Balance, Cash Available)
- Remaining Cash = Cash Available - Revolver Repayment

**Step 2 - Term Loan A Mandatory Amortization**: Pay required amortization
- TLA Amort = MIN(TLA Scheduled Amortization, Remaining Cash, TLA Balance)
- Remaining Cash = Remaining Cash - TLA Amort

**Step 3 - Term Loan A Optional Prepayment**: Apply excess to TLA
- TLA Prepay = MIN(Remaining Cash, TLA Balance - TLA Amort)
- Remaining Cash = Remaining Cash - TLA Prepay

**Step 4 - Term Loan B Mandatory Amortization**: Pay TLB amortization
- TLB Amort = MIN(TLB Scheduled Amortization, Remaining Cash, TLB Balance)
- Remaining Cash = Remaining Cash - TLB Amort

**Step 5 - Term Loan B Optional Prepayment**: Apply to TLB if TLA is retired
- TLB Prepay = MIN(Remaining Cash, TLB Balance - TLB Amort) if TLA Balance = 0

Continue down the waterfall until cash is exhausted or all debt is repaid.

### Call Protection and Prepayment Premiums

Many debt instruments include call protection that either prohibits or penalizes early repayment. These provisions protect lenders from having their high-yielding loans repaid when interest rates fall. Modeling call protection requires tracking not just whether prepayment is permitted but also the cost.

**Non-Call Periods**: Some debt cannot be prepaid during an initial period, typically 1-3 years after issuance. During this period, the waterfall skips that tranche, moving available cash to the next tranche or leaving it as balance sheet cash.

**Call Premiums**: After the non-call period, prepayment may be permitted but at a premium to par. A typical high-yield bond call schedule might be:

- Year 1-2: Non-callable
- Year 3: 104% of par (4% premium)
- Year 4: 102% of par (2% premium)
- Year 5+: 100% of par (no premium)

When modeling prepayment of callable debt, the cash outflow equals the prepaid principal plus the call premium. If prepaying $50 million at 103%, the cash required is $51.5 million, and the premium of $1.5 million flows through the income statement as a loss on extinguishment.

### Make-Whole Provisions

Some instruments, particularly investment-grade bonds, include make-whole provisions instead of fixed call schedules. A make-whole requires the borrower to pay the present value of remaining interest payments plus principal, discounted at a spread over Treasury rates.

Make-whole provisions effectively prohibit prepayment because the cost exceeds any benefit. In practice, make-whole debt is refinanced rather than prepaid, typically when the borrower can replace it with cheaper financing that more than offsets any make-whole payment.

For LBO modeling purposes, make-whole debt is generally assumed to remain outstanding until its stated maturity or refinancing.

### Exit Waterfall and Proceeds Distribution

At exit, the waterfall determines how sale proceeds are distributed. This calculation is crucial for returns analysis because it determines equity proceeds after satisfying all debt claims.

The exit waterfall follows the same priority as ongoing payments:

1. Repay revolver in full
2. Repay first lien term debt in full (plus any call premiums)
3. Repay second lien debt in full
4. Repay subordinated debt in full
5. Pay preferred equity accumulated dividends and liquidation preference
6. Distribute remaining proceeds to common equity

**Example Calculation**:

Exit Enterprise Value: $800 million
Less: Exit Debt Balances
- Revolver: ($0)
- Term Loan B: ($180 million)
- Senior Notes: ($150 million)
- Total Debt at Exit: ($330 million)
Equity Proceeds: $470 million

If the sponsor invested $200 million of initial equity, the MOIC is $470 million / $200 million = 2.35x.

### Intercreditor Agreements and Subordination

The waterfall mechanics are documented in intercreditor agreements that specify exactly how payments flow between creditors. These agreements establish:

**Payment Subordination**: Junior lenders agree to receive payment only after senior claims are satisfied.

**Lien Subordination**: Junior secured lenders agree that senior lenders have first priority on collateral proceeds.

**Standstill Provisions**: Junior lenders may be prohibited from taking enforcement action while senior debt is outstanding.

**Turnover Provisions**: If a junior lender receives payment in violation of the waterfall, they must "turn over" those funds to senior lenders.

Understanding these agreements matters for PE investors because they affect flexibility to refinance, amend covenants, or make distributions during the holding period.

### Interview Applications

"Walk me through how you would allocate $100 million of excess cash flow in an LBO with multiple debt tranches."

Start by identifying the priority order, then allocate sequentially. First, repay any revolver balance. Second, make mandatory amortization payments on each tranche in order. Third, apply remaining cash to optional prepayment starting with the most senior tranche that permits prepayment. Continue until cash is exhausted. Remember to account for call premiums if prepaying callable debt.

"How does the debt waterfall affect returns?"

The waterfall determines how quickly each tranche is repaid, which affects interest expense over the holding period. Aggressive first lien paydown reduces interest costs and accelerates equity value creation. However, if the waterfall prevents prepayment of expensive subordinated debt due to call protection, the benefit is limited. The structure should be analyzed holistically to understand the true cost of capital over the investment horizon.

## Key Takeaways

- The debt waterfall establishes strict payment priority from senior secured debt down to common equity
- Modeling requires sequential allocation of cash to each tranche according to priority
- Call protection and prepayment premiums affect the economics and timing of debt reduction
- The exit waterfall determines equity proceeds by subtracting all debt claims from enterprise value
- Intercreditor agreements document the waterfall mechanics and affect sponsor flexibility
- Understanding waterfall priority is essential for calculating returns and evaluating capital structure alternatives
