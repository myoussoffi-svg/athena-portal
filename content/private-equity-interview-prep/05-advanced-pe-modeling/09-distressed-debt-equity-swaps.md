---
id: distressed-debt-equity-swaps
title: "Distressed PE: Debt-to-Equity Swaps and Restructuring"
order: 9
estimated_minutes: 45
---

# Distressed PE: Debt-to-Equity Swaps and Restructuring

## Learning Objectives

- Understand the mechanics and rationale for debt-to-equity conversions in distressed situations
- Model restructuring scenarios including debt write-downs, equity ownership shifts, and recovery analysis
- Compare recovery outcomes for creditors across restructuring alternatives (swap vs. liquidation)
- Analyze new money injections and their dilutive impact on existing stakeholders
- Calculate returns for distressed debt investors and distinguish old money from new money economics

## Written Guide

### When the Capital Structure Breaks

Everything you have learned about LBO modeling assumes the deal works—EBITDA grows, debt is repaid, equity value compounds. But sometimes the investment thesis breaks down. Revenue declines, margins compress, and the company cannot service its debt. When the enterprise value falls below total debt, equity is effectively worthless, and the existing capital structure must be reorganized.

This is where distressed private equity enters. Rather than buying equity in a healthy company, distressed investors acquire debt at a discount and convert it into equity ownership through a restructuring process. The fundamental skill is the same—valuing a business and structuring capital—but the context is inverted. Instead of leveraging up, you are deleveraging. Instead of modeling growth, you are modeling survival.

Understanding restructuring mechanics is increasingly relevant in PE interviews, particularly at firms with credit or special situations strategies. Even traditional buyout shops encounter distressed situations in their own portfolios.

### The Logic of a Debt-to-Equity Swap

When a company's enterprise value is $400 million but it carries $600 million of debt, the math is simple: there is not enough value to repay all creditors, and equity holders are wiped out. The question becomes how to allocate the $400 million of value among creditors.

A **debt-to-equity swap** resolves this by converting some or all of the debt into equity ownership of the reorganized company. Creditors exchange their debt claims (which cannot be repaid in full) for ownership stakes. The company emerges with a manageable capital structure, and the former creditors become the new equity holders.

The basic mechanics:

**Pre-restructuring**:
- Enterprise Value: $400M
- Senior Secured Debt: $350M
- Unsecured Debt: $250M
- Total Debt: $600M
- Equity Value: $0 (underwater)

**Post-restructuring** (illustrative):
- Enterprise Value: $400M
- New Senior Debt: $200M (retained by senior creditors)
- New Equity Value: $200M (distributed to creditors)
- Senior Secured Recovery: $200M cash (debt retained) + $150M equity = $350M → 100% recovery
- Unsecured Recovery: $50M equity = $50M → 20% recovery
- Old Equity Recovery: $0 → 0% recovery

The **absolute priority rule** governs these allocations: senior creditors must be made whole before junior creditors receive anything, and all creditors must be satisfied before equity retains any value. In practice, negotiations often deviate from strict absolute priority (junior creditors may receive some recovery to avoid protracted litigation), but the principle anchors every restructuring analysis.

### Establishing Debt Capacity of the Distressed Business

Before you can structure a swap, you must determine how much debt the reorganized company can actually support. This is the single most important analytical step—it sets the boundary between debt that stays as debt and debt that converts to equity.

The framework mirrors healthy company debt capacity analysis but with a critical difference: you must use sustainable, not peak, earnings.

**Step 1 — Normalize EBITDA**: Strip out one-time charges, restructuring costs, and any unsustainable revenue. What is the company's run-rate EBITDA under realistic operating assumptions? Be conservative—the business just failed under its previous capital structure.

**Step 2 — Set sustainable leverage**: Distressed businesses emerging from restructuring typically carry 2.0-4.0x leverage, well below the 5.0-6.5x common in performing LBOs. Lenders and creditors want a cushion. If normalized EBITDA is $60 million, sustainable debt capacity might be $150-200 million (2.5-3.3x).

**Step 3 — Determine the "fulcrum security"**: The fulcrum security is the most senior class of debt that is impaired—meaning it will not be repaid in full. Everything above the fulcrum recovers 100%. Everything below recovers partially or not at all. Identifying the fulcrum security tells you who ends up owning the reorganized company.

Using the example above: senior secured at $350 million recovers in full (through a mix of retained debt and equity). Unsecured at $250 million is the fulcrum—it receives whatever residual value exists after senior claims. Old equity is out of the money entirely.

### Modeling Multiple Scenarios

Distressed analysis always requires scenario modeling because the outcome depends heavily on assumptions about the business's recovery trajectory. Build three cases:

**Base case**: Revenue stabilizes, margins recover modestly. EBITDA reaches $65 million in Year 2. The company supports $200 million of new debt and generates steady free cash flow.

**Upside case**: Revenue inflects positively, new management drives operational improvement. EBITDA reaches $80 million by Year 2. The company supports $250 million of debt, and equity value grows meaningfully.

**Downside case**: Revenue continues to decline, cost cuts partially offset but margins remain depressed. EBITDA stabilizes at $45 million. The company supports only $120 million of debt, and a second restructuring may be necessary.

For each scenario, calculate the recovery for each creditor class and the resulting equity ownership split. The negotiation between creditor classes centers on which scenario is most realistic—senior creditors argue downside to maximize their recovery share, while junior creditors argue upside to claim more equity.

### Structuring the Debt Write-Down

The write-down allocation follows the capital structure waterfall. Determine total debt capacity, then work top-down:

**Total pre-restructuring debt**: $600M
**Sustainable new debt**: $200M
**Total debt to be eliminated**: $400M

**Senior secured ($350M)**: Retains $200M as new senior debt. The remaining $150M converts to equity. Senior creditors own 75% of post-restructuring equity ($150M / $200M total equity value).

**Unsecured ($250M)**: The entire $250M claim is eliminated as debt. Receives $50M of equity value. Unsecured creditors own 25% of post-restructuring equity ($50M / $200M).

**Old equity**: Wiped out. 0% ownership post-restructuring.

These percentages become the negotiation. In practice, unsecured creditors often receive warrants or options rather than straight equity, providing upside if the recovery exceeds expectations while limiting dilution to senior creditors in the base case.

### Recovery Analysis: Swap vs. Liquidation

Every restructuring negotiation involves comparing the proposed plan against the alternative: liquidation. If creditors would recover more in a liquidation, they have no incentive to agree to a swap.

**Liquidation analysis** estimates asset values in a forced sale: inventory at 50-70% of book, receivables at 80-90%, PP&E at 30-50% of book, intangibles at minimal value. Administrative costs (legal, advisory, wind-down) consume 5-10% of gross proceeds.

**Example comparison**:

| | Debt-to-Equity Swap | Liquidation |
|---|---|---|
| Senior Secured Recovery | $350M (100%) | $300M (86%) |
| Unsecured Recovery | $50M (20%) | $15M (6%) |
| Old Equity Recovery | $0 (0%) | $0 (0%) |
| Timeline | 3-6 months | 12-18 months |

The swap delivers better recovery for every creditor class and resolves faster. This comparison is the analytical backbone of any restructuring proposal—you must demonstrate that the plan of reorganization delivers superior or equivalent recovery compared to alternatives.

### New Money Injections

Sometimes the reorganized company needs fresh capital to fund operations during the restructuring, invest in the turnaround plan, or simply maintain liquidity. This **new money** raises critical questions about priority and returns.

New money investors demand protection because they are investing into a distressed situation. Typical protections include:

**Super-senior priority**: New money debt ranks ahead of all existing claims, secured by first-priority liens. This means new money gets repaid before any pre-existing creditor in a subsequent liquidation.

**Equity with anti-dilution**: New money equity comes with full-ratchet anti-dilution protection or at a significant discount to the implied equity value, compensating for the turnaround risk.

**Minimum return hurdles**: New money may negotiate guaranteed minimum returns (e.g., 2.0x MOIC or 20% IRR) before other equity holders participate in upside.

Modeling new money requires careful attention to dilution. If the post-restructuring company is worth $200 million of equity and a new investor contributes $50 million at a pre-money valuation of $200 million, they own 20% of the company ($50M / $250M post-money). But if they negotiate a lower entry valuation of $150 million (reflecting turnaround risk), they own 25% ($50M / $200M post-money). Existing creditor-turned-equity-holders are diluted accordingly.

### Old Money vs. New Money Returns

Distressed debt investors may play both sides—buying existing debt at a discount ("old money") and injecting new capital ("new money"). Analyzing returns for each position separately is essential.

**Old money example**: An investor buys $100 million face value of unsecured debt at $0.20 on the dollar, paying $20 million. In the restructuring, that $100 million claim converts to 10% equity ownership (worth $20 million on day one). If the company's equity doubles over three years, the investor's 10% stake is worth $40 million.

- Investment: $20M
- Exit Value: $40M
- MOIC: 2.0x
- IRR: 26% (over 3 years)

**New money example**: The same investor injects $30 million of new equity at a $200 million pre-money valuation, receiving 13% ownership. The combined ownership is 23% (10% old + 13% new).

- Total investment: $50M ($20M old + $30M new)
- Exit value (at 2x equity appreciation): $92M (23% of $400M)
- Blended MOIC: 1.84x
- Blended IRR: 22.5%

Note the blended returns are lower than the old money standalone because new money was invested at a higher effective valuation. Distressed investors track these returns separately—old money returns justify the credit research, while new money returns must clear the fund's equity hurdle rate independently.

### The Restructuring Timeline

Understanding the process matters for modeling the timing of cash flows:

**Months 1-2**: Company misses debt payments or breaches covenants. Forbearance agreement buys time while parties negotiate.

**Months 2-4**: Financial advisors engaged, restructuring proposals exchanged. Creditor committees form. The analytical work (recovery analysis, debt capacity, scenario modeling) happens here.

**Months 4-6**: Plan of reorganization negotiated. If consensual (all major creditors agree), the process moves quickly. If contested, litigation can extend the timeline by 6-12 months.

**Month 6+ (Chapter 11 or equivalent)**: Court-supervised process to confirm the plan, approve the swap, and discharge old claims. DIP financing may be needed to fund operations during the process.

For return modeling purposes, the "entry" date for new money is typically at plan confirmation or emergence, not when the company first became distressed.

### Interview Application

**"A portfolio company's EBITDA has declined and it can no longer service its debt. Walk me through the restructuring options."**

"First, I would establish the company's sustainable debt capacity based on normalized EBITDA and conservative leverage targets—probably 2.5-3.5x for a business emerging from distress. The difference between current debt and sustainable debt capacity must be converted to equity. I would identify the fulcrum security, model recovery scenarios for each creditor class under both a restructuring and a liquidation, and demonstrate that the proposed plan delivers superior recovery. The negotiation centers on which operating scenario is realistic and how to allocate equity between impaired creditor classes."

**"How would you structure a debt-to-equity swap?"**

"Start from sustainable debt capacity—say $200 million on $60 million of EBITDA. The remaining $400 million of debt must convert. Senior secured creditors retain the new debt and receive equity for the remainder. Junior creditors receive equity based on residual value after senior claims. The equity split is negotiated, but anchored by the absolute priority rule. I would build a waterfall model that allocates enterprise value through the capital structure and calculates each class's recovery percentage, then compare that to liquidation recoveries to validate the plan."

**"An investor is considering buying distressed debt at 40 cents on the dollar. How do you evaluate the return?"**

"The return depends on what that debt converts to in the restructuring. If $100 million face value of senior debt at $0.40 converts to $100 million of new debt at par (100% recovery for seniors), the investor doubles their money immediately—2.5x MOIC. If the same debt converts to 50% debt retention and 50% equity, the return depends on the equity value trajectory. I would model the post-restructuring equity value under base, upside, and downside scenarios and calculate the IRR across each, factoring in the expected timeline from purchase to emergence."

## Key Takeaways

- Debt-to-equity swaps resolve unsustainable capital structures by converting impaired debt claims into equity ownership of the reorganized company
- The fulcrum security is the most senior impaired class—identifying it tells you who will own the reorganized equity
- Sustainable debt capacity of the distressed business determines the boundary between retained debt and converted equity
- Always compare restructuring recovery against liquidation recovery to validate the proposed plan
- New money injections demand super-senior priority and anti-dilution protections, diluting existing creditor-turned-equity-holders
- Distressed debt investors track old money and new money returns separately—old money benefits from the purchase discount, new money must clear equity hurdle rates independently
- Scenario analysis is non-negotiable in distressed modeling—recovery percentages shift dramatically across base, upside, and downside cases
