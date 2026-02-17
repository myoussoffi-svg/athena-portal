---
id: revolver-modeling
title: Revolver Modeling and Liquidity Management
order: 3
estimated_minutes: 30
---

# Revolver Modeling and Liquidity Management

## Learning Objectives

- Understand the unique characteristics of revolving credit facilities in LBO structures
- Model revolver draws and repayments based on cash needs
- Calculate commitment fees and drawn interest correctly
- Implement the revolver as a "plug" to balance the cash flow statement
- Handle minimum cash balance constraints in revolver logic

## Written Guide

### The Role of the Revolver in LBO Capital Structures

The revolving credit facility occupies a unique position in LBO capital structures. Unlike term loans that provide a fixed amount of capital at closing, the revolver functions as a flexible liquidity backstop that companies can draw upon when cash needs exceed cash generation. Think of it as a corporate credit card with a predetermined limit, available for working capital fluctuations, seasonal needs, or unexpected cash requirements.

In a well-performing LBO, the revolver often remains undrawn or minimally used. The company generates sufficient cash flow to fund operations, service debt, and build cash balances without tapping the facility. However, the revolver's presence provides crucial flexibility and lender confidence that short-term liquidity needs can be met without distress.

From a modeling perspective, the revolver presents unique challenges because its balance is not predetermined. While term loan balances follow predictable amortization schedules, the revolver balance depends on the company's cash position, which is itself the output of the model. This creates a second layer of circularity beyond the interest calculation circularity discussed earlier.

### Revolver Mechanics and Terms

Revolving credit facilities have several key terms that affect modeling:

**Commitment Amount**: The maximum the company can borrow, typically sized based on expected peak working capital needs plus a cushion. Common sizing is 1-2x annual working capital swings or 10-15% of total debt.

**Drawn Rate**: The interest rate on borrowed amounts, usually floating at SOFR plus a spread. Spreads typically range from 200-450 basis points depending on credit quality and leverage.

**Commitment Fee**: An annual fee paid on the undrawn portion of the facility, compensating lenders for keeping capital available. Typical commitment fees range from 25-50 basis points.

**Maturity**: Usually 5 years with no amortization; the full commitment remains available until maturity.

**Borrowing Base**: For some facilities, particularly asset-based loans, borrowing capacity is limited to a percentage of eligible receivables and inventory rather than a fixed commitment.

### Modeling the Revolver as a Cash Flow Plug

The revolver serves as the "plug" that balances the cash flow statement. The modeling logic follows this sequence:

1. Calculate all operating cash flows, capital expenditures, and mandatory debt service
2. Determine the preliminary ending cash position before any revolver activity
3. Compare this position to the minimum cash balance requirement
4. If preliminary cash exceeds the minimum, apply excess to revolver repayment
5. If preliminary cash falls below the minimum, draw on the revolver to cover the shortfall

The formula for revolver change in a given period is:

Revolver Draw / (Repayment) = MAX(0, Minimum Cash - Preliminary Cash) - MIN(Beginning Revolver Balance, MAX(0, Preliminary Cash - Minimum Cash))

This formula first checks if a draw is needed (preliminary cash below minimum) and then checks if repayment is possible (preliminary cash above minimum, with repayment limited to the outstanding balance).

### Implementing Minimum Cash Balance Logic

Most LBO models incorporate a minimum cash balance that the company must maintain for operational needs. This balance represents the cash required to run day-to-day operations without relying on the revolver for routine transactions.

The minimum cash balance creates a floor below which the revolver must be drawn. The logic flow is:

**If Preliminary Ending Cash < Minimum Cash**:
- Revolver Draw = Minimum Cash - Preliminary Ending Cash
- Ending Cash = Minimum Cash

**If Preliminary Ending Cash >= Minimum Cash AND Revolver is Drawn**:
- Revolver Repayment = MIN(Beginning Revolver Balance, Preliminary Ending Cash - Minimum Cash)
- Ending Cash = Preliminary Ending Cash - Revolver Repayment

**If Preliminary Ending Cash >= Minimum Cash AND Revolver is Zero**:
- Cash accumulates on the balance sheet
- Optional prepayment of term debt may occur per the debt waterfall

This logic ensures the company always maintains operational liquidity while using excess cash productively to reduce borrowing costs.

### Calculating Revolver Interest and Fees

The revolver generates two types of costs: interest on drawn amounts and commitment fees on undrawn amounts. Both must be captured in the model.

**Drawn Interest**: Calculate using the average drawn balance multiplied by the drawn rate. Using our earlier example with a $50 million facility at SOFR + 400 bps (9% total rate):

If beginning balance is $10 million and ending balance is $5 million:
Average Balance = ($10 million + $5 million) / 2 = $7.5 million
Drawn Interest = $7.5 million x 9% = $675,000

**Commitment Fee**: Calculate on the average undrawn amount multiplied by the commitment fee rate:

Average Undrawn = $50 million - $7.5 million = $42.5 million
Commitment Fee = $42.5 million x 0.375% = $159,375

Total revolver cost = $675,000 + $159,375 = $834,375

The commitment fee is often overlooked in quick calculations but can be material for large, lightly utilized facilities.

### Handling Revolver Circularity

The revolver introduces circularity beyond the standard interest circularity. The revolver balance affects interest expense, which affects cash flow, which affects the revolver balance. This circular reference layers on top of the term debt interest circularity.

The solution remains the same: enable iterative calculation in Excel. However, be aware that adding revolver logic increases the model's sensitivity to iteration settings. If the model does not converge (shows different values each time you press F9), try increasing maximum iterations or decreasing the maximum change threshold.

In interviews, you might be asked to explain this double circularity. The key insight is that both layers of circularity arise because we are trying to calculate interest on debt whose balance depends on cash flow that depends on that interest. The revolver adds complexity because its balance is not just being paid down from cash flow; it can also be drawn based on cash needs.

### Practical Revolver Modeling Tips

**Start with revolver at zero**: In a clean LBO model at transaction close, the revolver is typically undrawn. Any working capital needs at close are funded from term debt or equity.

**Build the preliminary cash calculation first**: Before implementing revolver logic, ensure your cash flow statement correctly calculates what ending cash would be without revolver activity. This preliminary number drives all revolver decisions.

**Use helper rows**: Break the revolver logic into steps: preliminary cash, shortfall/excess versus minimum, draw needed, repayment capacity, net change. This makes the model easier to audit and debug.

**Test with scenarios**: After building the revolver logic, test it with scenarios that should trigger draws (reduced EBITDA, increased CapEx) and scenarios that should trigger repayments (improved performance). Verify the model behaves as expected.

### Common Interview Questions

"How does the revolver affect LBO returns?"

In a well-performing deal, the revolver has minimal impact because it remains undrawn. However, if the company experiences cash flow stress, revolver draws increase interest expense and reduce cash available for term debt paydown, hurting returns. The revolver provides downside protection by ensuring the company can meet obligations, but its use signals underperformance versus plan.

"Why is the revolver modeled differently from term debt?"

Term debt has known beginning balances that amortize on a set schedule. The revolver balance is determined by the company's cash needs, which are the output of the model rather than an input. This makes the revolver a dependent variable that must be solved iteratively.

## Key Takeaways

- The revolver functions as a liquidity backstop and cash flow "plug" in LBO models
- Revolver costs include drawn interest on borrowed amounts and commitment fees on undrawn capacity
- Modeling requires comparing preliminary cash to minimum cash balance requirements to determine draws or repayments
- The revolver introduces an additional layer of circularity beyond term debt interest circularity
- In well-performing LBOs, the revolver remains undrawn; utilization signals cash flow stress
- Helper rows and scenario testing are essential for building robust revolver logic
