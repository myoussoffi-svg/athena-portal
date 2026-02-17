---
id: debt-schedule-mechanics
title: Debt Schedule Mechanics and Construction
order: 2
estimated_minutes: 35
---

# Debt Schedule Mechanics and Construction

## Learning Objectives

- Master the mechanical construction of debt schedules in LBO models
- Understand how different debt tranches interact within the capital structure
- Calculate interest expense using beginning, ending, and average balance methods
- Model mandatory amortization, optional prepayments, and cash sweeps
- Handle the circularity inherent in debt schedule calculations

## Written Guide

### The Architecture of a Debt Schedule

A properly constructed debt schedule serves as the backbone of any LBO model. It must track each debt tranche separately while capturing the interactions between tranches, particularly when it comes to repayment priority. The schedule typically flows from left to right across the projection period, with each column representing a fiscal year or quarter.

For each debt tranche, the schedule tracks five core elements: beginning balance, new borrowings (if applicable), mandatory amortization, optional prepayments, and ending balance. Interest expense is calculated based on these balances and the applicable interest rate. The resulting cash interest expense feeds into the cash flow statement, which in turn determines the cash available for debt repayment, creating the circular reference that characterizes LBO models.

### Interest Calculation Methods

Interest expense calculation seems straightforward but involves methodological choices that can affect model accuracy. The three primary approaches are beginning balance, ending balance, and average balance methods.

**Beginning Balance Method**: Interest equals the beginning debt balance multiplied by the annual interest rate. This approach is simple and avoids circularity but understates interest when debt is drawn during the period and overstates interest when debt is repaid.

**Ending Balance Method**: Interest equals the ending debt balance multiplied by the rate. This creates circularity because ending balance depends on cash available for prepayment, which depends on interest expense. The method understates interest when debt increases and overstates it when debt decreases.

**Average Balance Method**: Interest equals the average of beginning and ending balances multiplied by the rate. This is the most accurate approach for reflecting mid-period changes but introduces circularity. The formula is:

Interest = (Beginning Balance + Ending Balance) / 2 x Interest Rate

In practice, most LBO models use the average balance method and solve the circularity through Excel's iterative calculation feature. For interview purposes, you should be comfortable with all three methods and understand when each is appropriate. Quick mental math typically uses beginning balances for simplicity.

### Modeling Mandatory Amortization

Mandatory amortization represents contractually required principal payments, typically expressed as a percentage of the original loan amount. Term Loan A facilities often amortize 5-10% annually, while Term Loan B facilities typically amortize only 1% per year with the remainder due at maturity.

The amortization schedule is straightforward to model. If a $200 million Term Loan B requires 1% annual amortization, the company pays $2 million per year regardless of performance. However, you must ensure the model does not amortize more than the remaining balance. The formula typically includes a MIN function:

Amortization = MIN(Original Principal x Amortization Rate, Beginning Balance)

This prevents the model from showing negative debt balances in the final years if cumulative amortization exceeds the original principal.

### Optional Prepayments and Cash Sweeps

Beyond mandatory amortization, most LBO debt structures require or permit optional prepayments from excess cash flow. The cash sweep mechanism is a key feature of leveraged loans, requiring borrowers to apply a percentage of excess cash flow to debt reduction.

**Excess Cash Flow** is typically defined as EBITDA minus cash interest, minus cash taxes, minus capital expenditures, minus working capital increases, minus mandatory amortization. The sweep percentage often starts at 50-75% of excess cash flow, stepping down as leverage ratios improve.

Modeling the cash sweep requires calculating available cash after all operating needs and mandatory debt service. The formula follows this logic:

Cash Available for Optional Prepayment = EBITDA - Cash Interest - Cash Taxes - CapEx - Change in NWC - Mandatory Amortization - Minimum Cash Balance

This available cash is then applied to debt tranches according to the payment waterfall, which we will explore in detail in a subsequent lesson. For now, understand that senior debt typically receives prepayments before subordinated debt, and certain tranches may have prepayment restrictions or call premiums.

### Handling Circularity

The circular reference in LBO models arises because interest expense affects cash flow, cash flow determines debt paydown, debt paydown affects ending balances, and ending balances affect interest expense. This creates a loop that Excel cannot solve without iterative calculation.

To enable iteration in Excel, navigate to File > Options > Formulas and check "Enable iterative calculation." Set maximum iterations to 100 and maximum change to 0.001. The model will then solve the circular reference through successive approximation.

During interviews, you may be asked to explain this circularity and how to resolve it. The key insight is that the circularity exists because we are trying to calculate interest on debt that is being paid down with cash that depends on that interest. The average balance method captures this dynamic more accurately than simpler approaches, justifying the additional complexity.

### Constructing a Complete Debt Schedule: Worked Example

Consider an LBO with the following debt structure at close:

- Revolver: $50 million commitment, $0 drawn initially, SOFR + 400 bps
- Term Loan B: $300 million, 1% annual amortization, SOFR + 450 bps
- Senior Notes: $150 million, bullet maturity, 8.5% fixed rate

Assume SOFR is 5%, so the revolver rate is 9% and the TLB rate is 9.5%. Year 1 cash available for debt service (after interest and mandatory amortization) is $45 million.

**Term Loan B Schedule (Year 1)**:
- Beginning Balance: $300 million
- Mandatory Amortization: $300 million x 1% = $3 million
- Optional Prepayment: First priority after mandatory amort
- Ending Balance: $300 million - $3 million - $42 million = $255 million
- Average Balance: ($300 million + $255 million) / 2 = $277.5 million
- Interest Expense: $277.5 million x 9.5% = $26.4 million

**Senior Notes Schedule (Year 1)**:
- Beginning Balance: $150 million
- Mandatory Amortization: $0 (bullet maturity)
- Optional Prepayment: $0 (subordinate to TLB in waterfall)
- Ending Balance: $150 million
- Interest Expense: $150 million x 8.5% = $12.75 million

Note that the optional prepayment of $42 million on the TLB equals the $45 million available minus the $3 million mandatory amortization. All excess cash is applied to the senior-most tranche before moving down the waterfall.

### Common Interview Questions on Debt Mechanics

Interviewers frequently test debt schedule understanding with questions like:

"Walk me through how you would build a debt schedule in an LBO model."

Your answer should cover: identifying each tranche and its terms, setting up the roll-forward structure (beginning balance, changes, ending balance), calculating interest using average balances, modeling mandatory amortization with MIN functions to prevent negative balances, calculating cash available for optional prepayment from the cash flow statement, applying prepayments according to the waterfall, and enabling iterative calculation to solve circularity.

"What happens to returns if we add more senior debt to the structure?"

More senior debt typically means lower interest rates (senior is cheaper) but more mandatory amortization and stricter covenants. The impact on returns depends on whether the interest savings exceed the reduced flexibility. If the company can service the debt comfortably, lower rates improve cash flow and returns. If the amortization burden constrains growth investment, returns may suffer.

## Key Takeaways

- Debt schedules track beginning balance, borrowings, amortization, prepayments, and ending balance for each tranche
- The average balance method for interest calculation is most accurate but creates circularity requiring iterative calculation
- Mandatory amortization is contractual and must be modeled with MIN functions to prevent negative balances
- Optional prepayments flow from excess cash after operating needs and mandatory debt service
- Understanding the circular relationship between interest, cash flow, and debt paydown is essential for interviews
- Senior debt is cheaper but comes with amortization and covenants that affect operational flexibility
