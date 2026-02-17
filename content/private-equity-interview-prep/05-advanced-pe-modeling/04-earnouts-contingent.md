---
id: earnouts-contingent
title: Earnouts and Contingent Consideration
order: 4
estimated_minutes: 35
---

# Earnouts and Contingent Consideration

## Learning Objectives

- Structure and model earnout arrangements tied to performance milestones
- Understand how contingent consideration bridges valuation gaps between buyers and sellers
- Analyze the accounting and cash flow implications of earnouts
- Evaluate earnout risks and common structural protections

## Written Guide

### Bridging the Valuation Gap

Buyers and sellers frequently disagree on value. The seller believes their company is worth $500 million based on projected growth. The buyer, skeptical of those projections, offers $400 million based on current performance. This gap can kill a deal—unless both parties agree to share the risk through contingent consideration.

Earnouts make a portion of the purchase price contingent on future performance. The buyer pays $400 million upfront, with an additional $100 million payable if the company achieves specified EBITDA targets over the next two years. The seller gets their full valuation if projections materialize. The buyer limits downside if projections prove optimistic.

As an associate, you will model earnout scenarios to understand how they affect returns under various outcomes—and you will need to explain these dynamics clearly.

### Common Earnout Structures

Earnouts tie payments to measurable milestones, typically financial metrics or operational achievements. The structure must be precise enough to avoid disputes while aligning incentives appropriately.

**Revenue-based earnouts** trigger payments when revenue hits specified thresholds. A software company acquisition might include $20 million payable if Year 1 revenue exceeds $80 million, with another $20 million if Year 2 revenue exceeds $100 million. Revenue is relatively objective and hard to manipulate, making it a common choice.

**EBITDA-based earnouts** tie payments to profitability. This aligns incentives around profitable growth rather than top-line expansion at any cost. However, EBITDA calculations become contentious—does the earnout adjust for one-time costs? How are synergies treated? Who controls cost allocation? Sophisticated agreements define "Earnout EBITDA" precisely.

**Milestone-based earnouts** pay upon achieving specific operational goals: regulatory approval, customer contract execution, product launch, or technology development. Life sciences and technology deals frequently use milestone payments tied to clinical trial results or commercial milestones.

**Tiered structures** provide graduated payments. Rather than a binary $50 million payment at exactly $100 million EBITDA, the earnout might pay $10 million for each $20 million of EBITDA above $80 million, capped at $50 million. This smooths the payout profile and reduces gaming around threshold boundaries.

### Modeling Earnout Scenarios

Your LBO model must capture earnout mechanics across scenarios. The key considerations:

**Timing**: When are earnout payments due? Immediately upon achieving the milestone, or at the end of a measurement period? Cash flow timing affects IRR materially.

**Maximum and minimum payments**: Most earnouts are capped to limit buyer exposure. Some include floors if specific thresholds are met. Your model should bound the earnout range appropriately.

**Probability weighting**: Base case might assume full earnout achievement. Downside cases might assume partial or no payment. Expected value analysis weights these scenarios by probability.

**Impact on returns**: An earnout reduces upfront purchase price, lowering initial equity requirement and improving IRR if the earnout is never paid. Conversely, earnout payments reduce exit proceeds dollar-for-dollar.

Consider a $300 million acquisition with $50 million contingent earnout:

- **No earnout achieved**: Effective purchase price is $250 million. If exit proceeds are $500 million, total return is 2.0x on lower initial investment.
- **Full earnout achieved**: Effective purchase price is $300 million. If the $50 million earnout is paid from operating cash flow in Year 2, it reduces capital available for debt paydown and potentially compresses returns.

### Accounting and Cash Flow Implications

Under acquisition accounting, contingent consideration is recognized at fair value on the acquisition date. The acquirer estimates the probability-weighted expected payment and records a liability.

Subsequent changes in fair value flow through the income statement. If earnout achievement becomes more likely, the liability increases and the company records expense. If achievement becomes unlikely, the liability decreases and the company records income. This creates earnings volatility unrelated to operating performance.

For cash flow modeling, earnout payments are typically treated as financing activities (if equity-linked) or operating activities (if tied to ongoing employment). The classification affects how cash flows are categorized but not the underlying economics.

From a returns perspective, treat earnouts as part of total consideration. Your sources and uses should reflect maximum potential consideration, with earnout contingency noted. The cash flow projection should model earnout payments in the relevant periods.

### Structural Protections and Dispute Resolution

Earnouts create inherent conflicts. The buyer controls the business post-acquisition and can influence whether earnout thresholds are achieved—potentially manipulating results to avoid payment. Sellers seek structural protections against this risk.

**Operating covenants** require the buyer to operate the business in a manner consistent with historical practice and conducive to achieving earnout targets. The buyer cannot gut the sales force or slash marketing if those actions undermine earnout achievement.

**Accounting conventions** specify how earnout metrics are calculated. The agreement might require GAAP-consistent accounting, exclude specific one-time items, or establish an independent accounting firm to resolve disputes.

**Acceleration provisions** pay earnouts immediately if the buyer sells the business before the earnout period ends. This prevents buyers from flipping companies quickly while arguing earnout conditions were never triggered.

**Dispute resolution mechanisms** establish procedures for disagreements, from negotiation to arbitration. Litigation over earnouts is costly and slow—well-drafted agreements minimize this risk.

### When Earnouts Make Sense

Earnouts are most appropriate when:

- Valuation disagreement centers on achievable performance projections
- Sellers will remain involved in operations and can influence outcomes
- Metrics are objective and difficult to manipulate
- The earnout period is relatively short (one to three years)

Earnouts work poorly when buyers will dramatically change operations, when metrics are subjective, or when seller involvement ends at closing. In these cases, the buyer has too much control over earnout achievement, creating potential for disputes.

In interviews, demonstrate understanding of when earnouts are appropriate tools versus when they merely defer unresolvable disagreements.

## Key Takeaways

- Earnouts bridge valuation gaps by making purchase price contingent on future performance, sharing risk between buyers and sellers
- Common structures include revenue-based, EBITDA-based, and milestone-based payments, often with tiered payouts and caps
- Model earnouts across scenarios to understand their impact on effective purchase price, cash flows, and returns under various achievement levels
- Structural protections including operating covenants and defined accounting conventions help prevent buyer manipulation and reduce dispute risk
- Earnouts work best when performance metrics are objective, seller involvement continues, and both parties genuinely believe targets are achievable
