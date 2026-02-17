---
id: options-private-valuation
title: Options and Private Company Valuation
order: 4
estimated_minutes: 25
---

# Options and Private Company Valuation

## Learning Objectives

- Master the treasury stock method for option dilution in acquisition contexts
- Understand how private company valuations differ from public company approaches
- Navigate the complexities of private company capital structures including preferred stock and participation rights
- Apply appropriate valuation methodologies for private targets in LBO analysis

## Written Guide

### Options in Acquisition Contexts

When a private equity firm acquires a company—public or private—it must account for the dilutive impact of stock options and other equity compensation. The treatment differs meaningfully between a going-concern valuation and an acquisition scenario, and understanding this distinction is critical for accurate LBO modeling.

In a going-concern analysis (trading comparables, for instance), the treasury stock method assumes the company would repurchase shares with proceeds from option exercises at the current market price. This makes sense because the company would continue operating and could execute such repurchases.

In an acquisition scenario, the analysis changes. The target company will not continue repurchasing shares post-acquisition because it will cease to exist as an independent public entity. The acquirer effectively "takes out" all option holders at the offer price, paying the intrinsic value (offer price minus strike price) in cash.

This has direct implications for Sources and Uses. The cash paid to option holders becomes an additional use of funds—a cost of acquiring the business beyond the basic equity purchase price.

### The Acquisition Method for Options

Consider a target company with the following option pool:

- Options outstanding: 5 million
- Weighted average strike price: $25
- Offer price: $60

Under the traditional treasury stock method (going-concern):
- Gross shares from exercise: 5 million
- Proceeds from exercise: $125 million
- Shares repurchased at $60: 2.08 million
- Net dilutive shares: 2.92 million

In an acquisition, the calculation focuses on cash outflow:
- Intrinsic value per option: $60 - $25 = $35
- Total cash to option holders: 5 million × $35 = $175 million

This $175 million appears in Uses as "cash paid to option holders" or "option cancellation payments." It does not create new shares because the options are being cashed out, not exercised.

Some deals allow option holders to roll their options into the new capital structure. In this case, the rolled options would be excluded from the cash payment calculation but would create future dilution in the pro forma capitalization.

### Options by Tranche

Real-world option pools are not uniform. Options are granted at different times with different strike prices. An accurate analysis requires tranche-by-tranche calculation:

| Tranche | Shares (M) | Strike | Intrinsic Value | Total Value ($M) |
|---------|------------|--------|-----------------|------------------|
| 2019    | 1.0        | $15    | $45             | $45              |
| 2020    | 1.5        | $20    | $40             | $60              |
| 2021    | 1.5        | $30    | $30             | $45              |
| 2022    | 1.0        | $40    | $20             | $20              |
| **Total** | **5.0**  |        |                 | **$170M**        |

Out-of-the-money options (strike price above offer price) have no intrinsic value and require no cash payment. They simply expire worthless in the acquisition.

### Private Company Valuation Fundamentals

Private company valuations in LBO contexts differ from public company analysis in several important ways. There is no market price to anchor the valuation, the capital structure is often more complex, and information availability is typically more limited.

The primary valuation approaches for private companies include:

**Precedent Transactions**: Analyze multiples paid in comparable acquisitions. This is often the most relevant approach because it captures control premiums and strategic value inherent in M&A transactions. You might find that software companies with similar characteristics have traded at 12-15x EBITDA in recent deals.

**Comparable Public Companies**: Identify publicly traded peers and apply their trading multiples, adjusting for size, growth, profitability, and the control premium. If comparable public companies trade at 10x EBITDA, a private company might transact at 11-13x after applying a 20-30% control premium.

**Discounted Cash Flow**: Project free cash flows and discount at the weighted average cost of capital. DCF is particularly useful when the company's growth profile differs significantly from comparables or when cash flow projections are the basis for negotiation.

**LBO Analysis**: Work backward from target returns. If the sponsor needs 20% IRR and can support 5x leverage, what entry multiple can they pay? This analysis directly informs bid pricing.

### Private Company Capital Structure Complexity

Private companies, especially those with venture capital or earlier PE backing, often have complex capital structures that materially affect the LBO analysis.

**Preferred Stock**: Venture-backed companies typically have multiple series of preferred stock with different liquidation preferences, participation rights, and conversion ratios. In an LBO exit scenario, you must waterfall the proceeds through each series.

For example, a company might have:
- Series A: $10M liquidation preference, 1x non-participating
- Series B: $25M liquidation preference, 1x participating
- Series C: $50M liquidation preference, 1x participating with 3x cap

When calculating the equity purchase price, you must determine what each class receives based on the enterprise value and their specific terms. Participating preferred holders might receive their liquidation preference plus a pro-rata share of remaining proceeds. Non-participating holders choose between their preference and conversion.

**Earnouts and Contingent Payments**: Private company acquisitions frequently include earnout provisions where a portion of the purchase price is contingent on future performance. The Sources and Uses should separate the upfront payment from the contingent component. The contingent payments may also affect the projected returns if they are material.

**Seller Notes**: Some private company sellers may accept a portion of proceeds in the form of a promissory note, effectively providing financing for the acquisition. Seller notes appear in Sources (as debt) and reduce the cash Uses.

### Waterfall Analysis Example

Consider a venture-backed company being acquired for $200 million equity value:

Capital Structure:
- Series C Preferred: $50M invested, 1x participating, 30% ownership on converted basis
- Series B Preferred: $25M invested, 1x participating, 25% ownership on converted basis
- Series A Preferred: $10M invested, 1x non-participating, 15% ownership on converted basis
- Common Stock: 30% ownership
- Option Pool: 10% ownership (assume all in-the-money)

Waterfall Calculation:

Step 1 - Series C gets $50M liquidation preference
Step 2 - Series B gets $25M liquidation preference
Step 3 - Series A chooses between $10M preference or converted value

Remaining after liquidation preferences: $200M - $50M - $25M = $125M

Series A converted value: 15% × $200M = $30M (exceeds $10M preference, so they convert)

Participating in remaining proceeds:
- Series C: 30% × $125M = $37.5M (plus $50M pref = $87.5M total)
- Series B: 25% × $125M = $31.25M (plus $25M pref = $56.25M total)
- Series A: 15% × $125M = $18.75M (converted, no separate pref)
- Common: 30% × $125M = $37.5M
- Options: 10% × $125M = $12.5M

This granular analysis determines exactly how much goes to each shareholder class, which is essential for negotiating the acquisition price and structuring management rollover.

### Interview Implications

Questions about private company valuation test your ability to navigate real-world complexity. Be prepared to explain:

- How you would value a private company without public market prices
- The difference between trading multiples and transaction multiples (control premium)
- How to handle complex cap tables with multiple preferred series
- Why earnouts exist and how they affect transaction structuring

Demonstrating comfort with these concepts shows you can contribute to actual deal work where private company acquisitions are common.

## Video Placeholder

**Video Title**: Options in Acquisitions and Private Company Valuation

**Outline**:
- How option treatment differs between going-concern and acquisition scenarios
- Calculating cash payments to option holders in LBOs
- Analyzing options by tranche for accurate valuation
- Private company valuation approaches: precedent transactions, comps, DCF, LBO analysis
- Navigating complex cap tables: preferred stock, participation rights, liquidation preferences
- Waterfall analysis walkthrough
- Earnouts and contingent consideration in private deals

**Suggested Length**: 15 minutes

## Key Takeaways

- In acquisitions, options are typically cashed out at intrinsic value (offer price minus strike price) rather than exercised under the treasury stock method
- Option cash payments appear in Uses as an additional cost beyond the basic equity purchase price
- Private company valuations rely on precedent transactions, comparable companies (with control premium), DCF, and LBO analysis
- Complex cap tables require waterfall analysis through each series of preferred stock with their specific liquidation preferences and participation rights
- Participating preferred holders receive liquidation preference plus pro-rata share of remaining proceeds; non-participating holders choose between preference and conversion
- Earnouts and seller notes are common features in private company acquisitions that affect both Sources and Uses structuring
