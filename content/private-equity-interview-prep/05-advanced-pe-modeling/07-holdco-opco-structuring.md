---
id: holdco-opco-structuring
title: HoldCo/OpCo Structuring and Debt Push-Down
order: 7
estimated_minutes: 40
---

# HoldCo/OpCo Structuring and Debt Push-Down

## Learning Objectives

- Understand why sponsors use holdco/opco structures and the strategic rationale behind each layer
- Model separate debt schedules at holdco and opco levels with intercompany cash flows
- Analyze debt push-down mechanics and their tax implications
- Evaluate thin capitalization rules and their constraints on interest deductibility
- Explain holdco/opco dynamics in an interview setting with precision

## Written Guide

### Why Two Entities Instead of One?

Every PE-backed company involves at least some legal structuring, but the deliberate separation of a holding company (holdco) from an operating company (opco) is a specific design choice with meaningful financial consequences. When your VP tells you to "model the holdco debt separately," they are not asking you to create a cosmetic distinction. They are asking you to build a capital structure with two distinct cash flow profiles, two separate debt service obligations, and two different risk profiles for lenders.

The core logic is straightforward: opco generates cash flow and holds operating assets. Holdco sits above opco, owns the equity of opco, and exists primarily as a financing vehicle. By placing debt at both levels, sponsors can increase total leverage beyond what a single-entity structure would support, because the two tranches serve different lender constituencies with different risk-return expectations.

### The Structural Mechanics

In a typical holdco/opco LBO, the capital structure looks like this from bottom to top:

**At opco**: Senior secured debt (term loans, revolver), secured by the operating assets and cash flows of the business. This is the lowest-risk debt in the structure, priced accordingly—typically SOFR plus 400-600 basis points depending on credit quality. Opco lenders have first claim on operating cash flow and assets.

**At holdco**: Holdco notes or PIK facilities, structurally subordinated to all opco debt. Holdco debt has no direct claim on opco assets or cash flows. Its recovery depends entirely on the residual equity value of opco after opco debt is satisfied. This structural subordination commands a significant premium—holdco debt typically prices at 10-14% all-in, often with substantial PIK components.

**Above holdco debt**: Sponsor equity, including any preferred instruments, co-invest vehicles, and management rollover.

The critical concept is **structural subordination**. Holdco debt is not merely contractually subordinated (a legal agreement to stand behind senior debt). It is structurally subordinated because it sits in a different legal entity. Opco's creditors must be satisfied in full before any value flows up to holdco. Holdco creditors then get paid before equity. This is a harder form of subordination—there is no intercreditor agreement to negotiate because the priority is embedded in the corporate structure itself.

### Why Sponsors Choose This Structure

The most direct motivation is **incremental leverage**. A business with $100 million of EBITDA might support 5.0x of senior debt at opco ($500 million). Adding 1.5x of holdco debt ($150 million) brings total leverage to 6.5x. The opco lenders are comfortable because their leverage is only 5.0x, and their recovery is protected by the structural buffer above them. Holdco lenders accept higher risk for higher return.

This additional leverage directly boosts equity returns. With $650 million of total debt on a $1 billion enterprise value, the equity check is $350 million (ignoring fees). Without holdco debt, the equity check would be $500 million. The smaller equity base amplifies returns on a percentage basis.

**Tax optimization** is the second major driver. Acquisition debt interest is tax-deductible, and maximizing deductible interest reduces the company's tax burden, effectively transferring value from the government to the equity holders. The holdco/opco structure allows interest to be deducted at the appropriate entity level, and in cross-border transactions, the placement of holdco in a tax-efficient jurisdiction (Luxembourg, Netherlands, Ireland) can reduce withholding taxes on intercompany dividends and interest.

**Ring-fencing risk** is a third consideration. If the sponsor holds multiple portfolio companies, each under its own holdco, the liabilities of one company cannot contaminate the others. Opco creditors cannot reach holdco assets beyond the opco equity, and holdco creditors of one portfolio company cannot access another.

### Modeling HoldCo/OpCo: The Practical Framework

Building a holdco/opco model requires tracking two separate but linked financial structures. Here is how it flows.

**Opco model**: Build the standard three-statement model with opco debt schedules. Calculate free cash flow after opco debt service (interest plus mandatory amortization). Apply the cash sweep to opco debt per the credit agreement waterfall. Whatever cash remains after opco debt service and any required cash reserves represents **distributable cash flow to holdco**.

**Intercompany dividends**: Opco pays dividends or management fees to holdco from distributable cash flow. This is the only cash link between the two entities. Opco's credit agreement will restrict these dividends—typically allowing distributions only after maintaining minimum cash balances, satisfying leverage tests, and staying current on all opco obligations.

**Holdco model**: Holdco receives dividends from opco. If holdco debt is cash-pay, service it from these dividends. If holdco debt is PIK (more common), the principal balance accretes and holdco needs minimal cash. Holdco's only material costs are debt service and minor administrative expenses.

**Returns waterfall at exit**: Enterprise value flows first to opco debt, then the residual opco equity value flows up to holdco. Holdco debt (including accrued PIK) is repaid next. Whatever remains is sponsor equity value.

The key modeling trap is the **dividend restriction**. Your opco credit agreement will almost certainly limit upstream distributions. If your model shows holdco receiving $50 million per year in dividends, but the opco restricted payments covenant only allows $20 million, you have a problem. Build the covenant test into your model and ensure holdco cash flow is based on what opco can actually distribute, not what it theoretically earns.

### Debt Push-Down

Debt push-down is the process of moving acquisition debt from holdco to opco, typically post-closing. The rationale is almost always tax-driven: interest on debt held at opco is deductible against opco's taxable income. If the acquisition debt sits at holdco, that interest may not be deductible against opco's earnings unless specific intercompany arrangements are in place.

The mechanics work as follows: holdco lends to opco (an intercompany loan), and opco uses the proceeds to pay a dividend back to holdco, which uses the cash to repay holdco's external acquisition debt. After this circular set of transactions, the debt effectively sits at opco, the interest is deductible against opco income, and the economic position is unchanged—but the tax position is improved.

In practice, debt push-down faces several constraints:

**Thin capitalization rules** limit the amount of intercompany debt that is tax-deductible. Many jurisdictions restrict interest deductions when the debt-to-equity ratio of the borrowing entity exceeds a threshold (often 3:1 or 4:1). Debt beyond this ratio generates non-deductible interest, eliminating the tax benefit.

**Transfer pricing requirements** mandate that intercompany loans carry arm's-length interest rates. You cannot charge 0% on an intercompany note and claim it is a legitimate debt instrument. Tax authorities will recharacterize the arrangement if the terms do not reflect market conditions.

**Local law restrictions** in certain jurisdictions may limit the ability of opco to incur debt for the purpose of funding distributions to holdco. Financial assistance rules, particularly in European jurisdictions, can restrict or prohibit these structures.

For modeling purposes, debt push-down means your opco debt schedule includes the pushed-down acquisition debt alongside operating debt. The tax shield calculation should apply only to the deductible portion of interest, accounting for any thin capitalization limitations.

### Cross-Border Considerations

International deals add complexity because holdco and opco may sit in different tax jurisdictions. The structure might include multiple intermediate holding companies, each serving a specific tax or legal purpose.

A simplified cross-border structure might look like: US Sponsor → Luxembourg Holdco → Dutch Intermediate → UK Opco. Luxembourg offers favorable holding company tax treatment and an extensive treaty network. The Dutch intermediate may provide efficient conduit for interest and dividend flows. Each layer must have genuine economic substance—tax authorities increasingly challenge structures that exist solely for tax avoidance.

When modeling these structures, you must consider withholding taxes on cross-border interest and dividend payments, FX exposure if holdco debt and opco cash flows are in different currencies, and the net tax benefit after accounting for all jurisdictional frictions.

### Interview Application

**"Walk me through a holdco/opco structure and why we would use it."**

Start with the purpose: "A holdco/opco structure separates the acquisition financing vehicle from the operating business. We place senior secured debt at opco, leveraging operating assets and cash flows. Additional debt—typically PIK or high-yield—sits at holdco, structurally subordinated to opco debt. This lets us achieve higher total leverage than a single-entity structure because opco lenders are insulated from holdco debt. The trade-off is higher blended cost of capital, but the incremental leverage amplifies equity returns."

**"How does cash flow between holdco and opco?"**

"Opco generates cash flow and services its own debt. After opco debt service and maintaining required reserves, distributable cash flows to holdco as dividends, subject to restricted payment covenants in opco's credit agreement. Holdco uses these dividends to service its own debt, though holdco debt is often PIK, requiring minimal current cash. At exit, proceeds flow through the waterfall: opco debt first, then residual value to holdco, holdco debt next, then equity."

**"What is debt push-down and why do sponsors do it?"**

"Debt push-down moves acquisition debt from holdco to opco, typically through an intercompany loan and dividend mechanism. The primary benefit is tax efficiency—interest on opco-level debt is deductible against operating income, reducing the company's tax burden. However, thin capitalization rules limit the deductible amount, and transfer pricing requirements mandate arm's-length terms on intercompany debt."

## Key Takeaways

- Holdco/opco structures enable incremental leverage by placing structurally subordinated debt at holdco, above opco's senior secured debt
- Structural subordination is stronger than contractual subordination—holdco creditors have no direct claim on opco assets or cash flows
- Model holdco and opco as linked but separate entities, with restricted dividend payments as the sole cash flow link
- Debt push-down moves acquisition debt to opco for tax deductibility, constrained by thin capitalization rules and transfer pricing requirements
- Cross-border structures add layers for tax optimization but require genuine economic substance in each jurisdiction
- In interviews, emphasize both the mechanics and the strategic rationale—higher leverage, tax efficiency, and risk ring-fencing
