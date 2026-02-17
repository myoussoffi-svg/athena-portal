---
id: common-modeling-mistakes
title: Common Modeling Mistakes
order: 8
estimated_minutes: 35
---

Every modeling mistake I describe in this lesson has cost candidates offers. Some errors are technical, breaking formulas or producing nonsensical outputs. Others are conceptual, revealing gaps in understanding that concern interviewers. Learn these mistakes now so you don't make them when it matters.

## Mistake 1: Circular Reference Errors

LBO models contain inherent circularity: interest expense depends on debt balance, debt balance depends on cash flow, cash flow depends on interest expense. Excel handles this with iterative calculation, but only if you enable it.

The symptom: you enter a formula and Excel throws a circular reference error, or your model shows zero interest expense when it should have millions.

The fix: Before your test, enable iterative calculations in Excel (File > Options > Formulas > Enable iterative calculation). Set maximum iterations to 100 and maximum change to 0.001. This allows Excel to solve circular references through iteration.

The conceptual understanding: When asked about circularity in an interview, explain that you're aware interest depends on debt, debt depends on cash available for paydown, and cash depends on interest. State that you handle this through iterative calculation and can implement a manual "toggle" if needed (a cell that switches between circular and non-circular modes for auditing).

## Mistake 2: Cash Flow Sign Convention Errors

Cash flow sign conventions confuse many candidates. Uses of cash should be negative; sources of cash should be positive. Mixing conventions produces nonsensical cash balances.

The symptom: Your ending cash is negative by billions, or your debt mysteriously increases when it should decrease.

The fix: Establish consistent conventions and stick to them. I recommend: cash inflows positive, cash outflows negative. Then your ending cash equals beginning cash plus sum of all cash flows.

Check your logic: If net income is $50M (positive), D&A adds back $10M (positive), capex is $15M outflow (negative), and debt paydown is $20M (negative), your free cash flow is $50M + $10M - $15M - $20M = $25M. If your formula gives a different answer, you have a sign error.

## Mistake 3: Mishandling Working Capital

Working capital changes trip up many candidates. The rule is simple but easy to forget: increases in current assets are uses of cash; increases in current liabilities are sources of cash.

The symptom: Your cash flow is dramatically wrong because working capital flows have the wrong sign.

The fix: Calculate working capital as current assets minus current liabilities. A positive change in working capital (WC increases) means you invested cash into working capital, so it's a cash outflow. A negative change (WC decreases) means you released cash, so it's an inflow.

In your model: Cash Flow from Working Capital = -(Change in Working Capital). If working capital went from $50M to $60M, the change is +$10M, and cash flow impact is -$10M.

Alternatively, model components separately: Change in AR is negative (growing AR ties up cash), change in AP is positive (growing payables provides cash).

## Mistake 4: Forgetting Transaction Fees

Many candidates calculate sources and uses with just purchase price and debt, forgetting that transaction fees add to uses.

The symptom: Your model underestimates equity required and overstates returns.

The fix: Uses should include purchase price plus estimated transaction fees (typically 1-3% of enterprise value for financing and advisory fees, plus legal and accounting costs). These additional uses are funded with equity.

For a $500M deal, 2% fees add $10M to uses. That $10M comes from sponsor equity, reducing returns. Missing this inflates your IRR by a percentage point or more.

## Mistake 5: Incorrect IRR Calculation

IRR requires proper cash flow timing. Many candidates miscalculate by using the IRR function incorrectly or confusing entry year with exit year.

The symptom: IRR seems impossibly high or low relative to your multiple.

The fix: Use XIRR rather than IRR. XIRR accepts explicit dates, eliminating timing ambiguity. Your cash flows should be:
- Date 0 (entry): Negative equity invested
- Date 5 (exit): Positive exit proceeds

For a standard 5-year hold with no interim distributions: if you invested $100M at time 0 and received $250M at time 5, your IRR is approximately 20% (2.5x over 5 years). If your XIRR shows 40%, you have an error.

Common mistakes: entering exit proceeds as negative, using an additional year (6 periods instead of 5), or forgetting the initial investment.

## Mistake 6: Ignoring the Cash Build

In an LBO, excess cash flow pays down debt. But once debt is fully repaid, cash accumulates on the balance sheet. Many models let debt go negative, which is nonsensical.

The symptom: Your debt schedule shows negative debt balances.

The fix: Implement a MIN function to cap debt paydown at the remaining balance. In Excel: Debt Paydown = MIN(Cash Available for Paydown, Beginning Debt Balance). Once debt is zero, excess cash adds to the cash balance rather than further reducing debt.

At exit, this accumulated cash effectively increases equity value (it reduces net debt). Make sure your exit equity calculation accounts for cash on balance sheet.

## Mistake 7: Confusing Gross and Net Debt

Entry and exit calculations must be consistent about debt versus net debt (debt minus cash).

The symptom: Inconsistent treatment inflates or deflates returns.

The fix: Typically, LBO models use gross debt for entry (you borrow $500M regardless of target's cash balance) and gross debt for calculating exit equity (subtract remaining debt from EV). However, if the target has significant cash at acquisition, some deal structures have the target's cash reduce the purchase price or fund fees.

Be explicit about your treatment. If asked, explain whether you're using gross or net debt and why. Consistency matters more than which convention you choose.

## Mistake 8: Unrealistic Assumptions

Technical accuracy means nothing if assumptions are unreasonable. Interviewers are evaluating your judgment, not just your formulas.

The symptom: Your model "works" but produces 50% IRRs that would never occur in reality.

Common issues:
- Growth rates above what the industry supports (assuming 15% growth for a mature manufacturing business)
- Margin expansion without operational justification
- Exit multiples higher than entry without a clear thesis
- Leverage above lender limits (assuming 8x leverage when banks max out at 6x)

The fix: Sense-check every assumption. Ask: would a senior PE professional find this reasonable? If 5% revenue growth is the CIM projection but industry growth is 2%, acknowledge the gap. If you're assuming margin expansion, articulate what operational improvement drives it.

Your base case should be defensible. Aggressive assumptions belong in upside scenarios, not the primary returns calculation.

## Mistake 9: Insufficient Sensitivity Analysis

A single-point estimate is not an investment recommendation. PE professionals want to understand the range of outcomes.

The symptom: Your model shows one IRR with no context about how sensitive that return is to key assumptions.

The fix: Include at minimum a two-variable sensitivity table showing returns across different entry multiples and exit multiples. Better analyses also show sensitivity to EBITDA growth and leverage levels.

State which assumptions most affect returns. "The investment is highly sensitive to exit multiple; a one-turn compression drops IRR from 20% to 14%." This demonstrates you think like an investor, not just a modeler.

## The Meta-Mistake: Not Checking Your Work

Many errors would be caught with a 5-minute sanity check. Yet candidates submit without reviewing because they're rushed.

Build review time into your schedule. Before submitting, ask:
- Does the balance sheet balance?
- Is debt declining as expected?
- Is IRR in a sensible range for the entry multiple?
- Do growth rates match stated assumptions?
- Does the memo conclusion match the model output?

One careful review catches more errors than hours of rushing through additional complexity. Always check your work.
