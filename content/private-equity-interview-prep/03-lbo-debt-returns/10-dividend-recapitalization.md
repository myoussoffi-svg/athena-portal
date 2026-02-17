---
id: dividend-recapitalization
title: Dividend Recapitalizations
order: 10
estimated_minutes: 30
---

# Dividend Recapitalizations

## Learning Objectives

- Understand the mechanics and rationale for dividend recapitalizations
- Model the impact of dividend recaps on IRR, MOIC, and remaining equity value
- Analyze when dividend recaps make strategic and financial sense
- Recognize the risks and limitations of recapitalization strategies
- Calculate returns with interim dividends and additional leverage

## Written Guide

### What Is a Dividend Recapitalization?

A dividend recapitalization occurs when a portfolio company takes on additional debt and uses the proceeds to pay a special dividend to equity holders. The company's enterprise value remains unchanged, but the capital structure shifts: debt increases, and equity decreases by the amount of the dividend.

From a PE sponsor's perspective, the dividend recap serves several purposes. It returns capital to investors before exit, improving IRR by accelerating cash returns. It reduces "money at risk" in the investment, de-risking the position while maintaining ownership and upside potential. And it provides liquidity to LPs who can reinvest the returned capital elsewhere.

Dividend recaps became increasingly common during periods of low interest rates and aggressive credit markets, though they remain controversial among some market participants who view them as financial engineering that benefits sponsors at the expense of company health.

### The Mechanics: How It Works

Consider a company acquired three years ago with the following current position:

- Enterprise Value: $600 million
- Existing Debt: $250 million
- Equity Value: $350 million
- Original Equity Investment: $200 million
- Current MOIC: 1.75x (unrealized)

The sponsor arranges a $100 million dividend recapitalization:

**Step 1 - New debt issuance**: Company raises $100 million of additional term debt

**Step 2 - Dividend payment**: $100 million is distributed to equity holders (the sponsor)

**Step 3 - Post-recap capital structure**:
- Enterprise Value: $600 million (unchanged)
- Total Debt: $350 million ($250M existing + $100M new)
- Equity Value: $250 million ($350M - $100M dividend)

**Step 4 - Updated investment metrics**:
- Cash returned: $100 million
- Remaining equity value: $250 million
- Total value: $350 million
- Remaining MOIC (on paper): $350M / $200M = 1.75x (unchanged)

The total value to the sponsor remains $350 million, but $100 million has been converted from unrealized gains to cash in hand.

### Impact on Returns: IRR Boost

The primary financial benefit of a dividend recap is the acceleration of cash returns, which improves IRR. Because IRR is a time-weighted metric, receiving $100 million in Year 3 is more valuable than receiving that same amount at exit in Year 5.

**Before Dividend Recap (Exit Year 5)**:
- Year 0: Invest $200 million
- Year 5: Receive $450 million (assuming continued growth)
- MOIC: 2.25x
- IRR: 17.6%

**After Dividend Recap (Dividend Year 3, Exit Year 5)**:
- Year 0: Invest $200 million
- Year 3: Receive $100 million dividend
- Year 5: Receive $300 million (exit proceeds after higher debt payoff)
- Total returned: $400 million
- MOIC: 2.00x
- IRR: 20.5%

Note that MOIC actually decreased (from 2.25x to 2.00x) because the additional debt costs reduced total value. But IRR increased from 17.6% to 20.5% because cash was received earlier.

This illustrates the fundamental trade-off: dividend recaps often sacrifice some MOIC to boost IRR.

### Calculating the Break-Even

The dividend recap makes sense when the IRR improvement outweighs the MOIC reduction. The key question is whether the incremental cost of the new debt (interest expense reducing exit proceeds) is offset by the time value of receiving the dividend earlier.

**Break-Even Analysis Framework**:

Let D = dividend amount
Let r = interest rate on new debt
Let n = years from dividend to exit
Let i = investor's required return (or opportunity cost)

The dividend is NPV-positive if:
D x (1 + i)^n > D + (D x r x n)

Simplifying:
(1 + i)^n > 1 + r x n

**Example**: $100M dividend, 8% debt cost, 2 years to exit, 15% investor hurdle

Left side: (1.15)^2 = 1.32
Right side: 1 + (0.08 x 2) = 1.16

1.32 > 1.16, so the recap is NPV-positive

The dividend grows to $132M at the investor's hurdle rate, exceeding the $116M cost (principal plus interest). The recap creates value.

### Strategic Considerations

Beyond the financial mathematics, dividend recaps involve strategic considerations:

**De-Risking the Investment**: After returning $100 million, the sponsor has only $100 million remaining "at risk" ($200M original minus $100M returned). Even if the remaining equity becomes worthless, the sponsor has recovered half the investment.

**LP Distributions**: LPs benefit from receiving cash that can be reinvested in other opportunities. In a rising market, returning capital early allows LPs to participate in new deals.

**Signaling**: A dividend recap signals that the sponsor believes the company can handle additional leverage, which implies confidence in future cash flows. However, it can also signal that the sponsor prefers to extract cash rather than reinvest in growth.

**Covenant and Capacity Constraints**: Dividend recaps are limited by existing debt covenants (which may restrict dividends or additional leverage) and by the company's debt capacity (lenders' willingness to provide incremental financing).

### Risks and Limitations

**Increased Financial Risk**: Higher leverage means higher interest expense, less cushion for downturns, and greater risk of financial distress. If the business underperforms after a recap, the equity cushion may be eliminated.

**Covenant Pressure**: Additional debt may tighten covenant headroom, limiting operational flexibility and increasing the risk of technical default.

**Reputational Considerations**: Some market participants view aggressive dividend recaps negatively, particularly when companies subsequently struggle. This can affect future deal sourcing and LP relationships.

**Market Timing Risk**: Recaps are most attractive when credit markets are accommodative. Attempting a recap in tight credit conditions may be impossible or prohibitively expensive.

### Modeling Dividend Recaps in LBO Returns

When building an LBO model with a potential dividend recap, incorporate the following:

**Debt Schedule**: Add a new debt tranche at the recap date with the appropriate terms. Calculate incremental interest expense and include it in projections.

**Cash Flow Statement**: Model the dividend payment as a cash outflow in the period it occurs.

**Returns Calculation**: Calculate IRR using the cash flow series: negative initial investment, positive dividend(s), positive exit proceeds.

**Equity Bridge**: Track how the dividend reduces equity value on paper while generating actual cash returns.

**Scenario Analysis**: Build scenarios with and without the dividend recap to quantify the IRR/MOIC trade-off.

### Interview Application

**"The company has $50M of EBITDA and $200M of debt. Can we do a dividend recap?"**

Evaluate leverage capacity: Current leverage is 4.0x. If lenders will extend to 5.0x, additional debt capacity is $50M x 1.0 = $50M. If lenders will go to 5.5x, capacity is $75M.

Consider cash flow: If EBITDA is $50M and interest is $20M (10% on $200M), free cash flow might be $15-20M. Adding $50M of debt at 10% costs $5M annually. This is serviceable but tight.

"Based on 5x leverage capacity and the company's cash flow profile, we could likely support a $40-50M dividend recap, though this would reduce our covenant cushion and increase interest expense by approximately $4-5M annually."

**"How does a dividend recap affect our returns?"**

Walk through the mechanics: the dividend provides immediate cash return, improving IRR. But additional debt service reduces exit proceeds, potentially lowering MOIC. Quantify both effects.

"A $50M dividend in Year 2 would improve our IRR by approximately 3-4 percentage points by accelerating cash returns. However, the incremental interest expense of $5M annually for three years plus principal repayment would reduce our exit proceeds by approximately $15-20M, lowering MOIC by about 0.1x. The IRR improvement likely outweighs the MOIC reduction, but we should stress-test under downside scenarios."

**"What are the risks of doing a dividend recap here?"**

Address leverage, covenants, and strategic concerns: "The primary risks are increased financial vulnerability if revenue or margins decline, reduced covenant headroom limiting operational flexibility, and the signal it sends about our priorities for the business. We should ensure the company has sufficient cash flow cushion post-recap to weather a moderate downturn without covenant breach."

## Key Takeaways

- Dividend recapitalizations involve raising additional debt to pay a special dividend to equity holders, returning capital before exit
- Recaps typically improve IRR (earlier cash) but may reduce MOIC (debt service costs), creating a trade-off
- The break-even depends on comparing the time value of early cash return against the cost of incremental debt
- Strategic benefits include de-risking the investment and providing LP liquidity; risks include increased leverage and covenant pressure
- Interview discussions should quantify both the IRR improvement and MOIC impact while addressing leverage capacity and risks
- Dividend recaps are opportunistic strategies dependent on credit market conditions and company debt capacity
