---
id: net-working-capital
title: Net Working Capital in LBO Analysis
order: 11
estimated_minutes: 25
---

# Net Working Capital in LBO Analysis

## Learning Objectives

- Calculate net working capital correctly for LBO analysis
- Understand how working capital changes impact free cash flow
- Model working capital using days-based or percentage-based approaches
- Navigate working capital adjustments in purchase agreements

## Written Guide

### Net Working Capital Fundamentals

Net working capital represents the operating capital required to run the business on a day-to-day basis. It is the difference between current operating assets (receivables, inventory, prepaid expenses) and current operating liabilities (payables, accrued expenses, deferred revenue). Understanding net working capital is essential because changes in working capital directly impact free cash flow.

The standard formula is:

**Net Working Capital = Current Operating Assets - Current Operating Liabilities**

Or more specifically:

**NWC = Accounts Receivable + Inventory + Prepaid Expenses + Other Current Assets - Accounts Payable - Accrued Expenses - Deferred Revenue - Other Current Liabilities**

Note that cash and debt are excluded—these are financing items, not operating items. Similarly, the current portion of long-term debt is excluded from working capital calculations.

### Why Working Capital Matters in LBOs

Working capital impacts LBOs in two critical ways:

**At Transaction Close:** The purchase agreement typically includes a net working capital adjustment. If the target's working capital at closing differs from an agreed target level, the purchase price adjusts accordingly. Higher working capital means the buyer pays more; lower working capital means the buyer pays less.

**During the Holding Period:** Changes in working capital consume or release cash. As revenue grows, working capital typically grows proportionally—receivables and inventory increase, requiring cash investment. This cash requirement reduces free cash flow available for debt paydown.

A company that requires significant working capital investment to grow is less attractive as an LBO candidate than one that generates working capital as it grows. This is why businesses with negative working capital cycles (receiving cash before paying suppliers, like subscription businesses) are particularly attractive.

### Modeling Working Capital

There are two primary approaches to modeling working capital:

**Days-Based Approach:** Calculate receivables, inventory, and payables based on their typical collection, holding, and payment periods.

- Accounts Receivable = (Revenue / 365) × Days Sales Outstanding (DSO)
- Inventory = (COGS / 365) × Days Inventory Outstanding (DIO)
- Accounts Payable = (COGS / 365) × Days Payable Outstanding (DPO)

This approach connects working capital to operational drivers. If DSO is 45 days and revenue is $365 million, receivables are $45 million.

**Percentage of Revenue Approach:** Calculate each working capital line item as a percentage of revenue (or the appropriate cost base).

- Accounts Receivable: 12% of revenue
- Inventory: 8% of COGS
- Accounts Payable: 6% of COGS

This approach is simpler but less precise. It works well when detailed operational data is unavailable.

**Hybrid Approach:** Use the days-based approach for major items (receivables, inventory, payables) and percentage-based for smaller items (prepaids, accruals).

### The Cash Conversion Cycle

The cash conversion cycle (CCC) measures how long cash is tied up in working capital:

**CCC = DSO + DIO - DPO**

A company with:
- DSO: 45 days
- DIO: 60 days
- DPO: 30 days

Has a CCC of 75 days. This means the company must fund 75 days of operations before collecting cash from customers.

Lower CCC is better for LBOs because less cash is tied up in operations. Sponsors often target CCC improvement as a value creation lever:

**Reducing DSO:** Improve collections, offer early payment discounts, tighten credit policies
**Reducing DIO:** Improve inventory management, just-in-time practices, SKU rationalization
**Increasing DPO:** Negotiate longer payment terms with suppliers, use supply chain financing

A 10-day improvement in CCC for a company with $400 million revenue frees up approximately $11 million of cash—real value creation.

### Working Capital Build vs. Release

The change in working capital, not the absolute level, impacts free cash flow:

**Working Capital Build (Increase):** Cash outflow. When working capital increases, cash is consumed. This occurs when revenue grows faster than operational efficiency improves.

**Working Capital Release (Decrease):** Cash inflow. When working capital decreases, cash is freed. This occurs when revenue declines, or when efficiency improves faster than revenue grows.

In the free cash flow calculation:
- Increase in NWC is subtracted (cash consumed)
- Decrease in NWC is added (cash released)

**Example:**
| | Year 1 | Year 2 | Change |
|---|--------|--------|--------|
| Revenue | $100M | $120M | +$20M |
| NWC (15% of revenue) | $15M | $18M | +$3M |

The $3 million increase in NWC is subtracted from Year 2 free cash flow. This working capital investment is required to support the higher revenue level.

### Working Capital Adjustments in Transactions

Purchase agreements include working capital adjustment mechanisms to ensure the buyer receives the expected operational capital. Here is how they work:

**Target Working Capital:** The buyer and seller agree on a target NWC level, typically based on a trailing average or a normalized level. This is the "peg."

**Closing Working Capital:** Actual NWC is calculated at closing.

**Adjustment:** If closing NWC exceeds the target, the buyer pays the difference (receiving more working capital than expected). If closing NWC is below target, the purchase price is reduced.

**Example:**
- Agreed purchase price: $500 million
- Target NWC: $30 million
- Actual NWC at closing: $25 million
- Adjustment: -$5 million
- Final purchase price: $495 million

Sellers are incentivized to maximize working capital before closing (collecting receivables quickly, delaying payables). Buyers must carefully monitor working capital during the transition period.

### Seasonality and Working Capital

Many businesses have seasonal working capital patterns. A retailer might build inventory before the holiday season, consuming cash in Q3 and Q4. A construction company might see receivables spike in summer months when projects are active.

For LBO modeling, consider:

**Closing Date Selection:** The working capital adjustment uses the closing date balance. Closing at a seasonal low point reduces the required purchase price.

**Projection Methodology:** Annual projections may obscure seasonal swings. If cash is tight, consider quarterly or monthly projections to capture working capital fluctuations.

**Revolver Utilization:** Seasonal working capital needs often drive revolver drawings. Ensure the revolver capacity is sized for peak seasonal requirements.

### Negative Working Capital

Some businesses operate with negative working capital—current operating liabilities exceed current operating assets. This occurs when:

- Customers pay upfront (subscriptions, deposits)
- Payment terms with suppliers are extended
- Inventory turns rapidly

Negative working capital is attractive because growth generates cash rather than consuming it. As revenue increases, liabilities (customer payments) increase faster than assets (receivables, inventory). This working capital release augments free cash flow.

**Example: Subscription Business**
| | Year 1 | Year 2 | Change |
|---|--------|--------|--------|
| Revenue | $100M | $120M | +$20M |
| Deferred Revenue | $20M | $24M | +$4M |
| Receivables | $5M | $6M | +$1M |
| NWC | -$15M | -$18M | -$3M |

The $3 million decrease in NWC (it becomes more negative) is a cash inflow, added to free cash flow. This is why subscription businesses command premium valuations in LBOs.

### Interview Implications

Working capital questions appear frequently in technical interviews:

"Walk me through how working capital affects free cash flow."
When working capital increases—say, receivables grow because revenue grows—cash is consumed. The increase in receivables means you have sold goods but not yet collected cash. This cash is tied up in working capital rather than available for debt paydown. So an increase in NWC is subtracted in the free cash flow calculation.

"What is the cash conversion cycle and why does it matter?"
CCC equals DSO plus DIO minus DPO. It measures how long cash is tied up in operations. Lower CCC means less cash is required to fund the business, which means more free cash flow and higher debt capacity. Improving CCC is a common value creation lever for PE sponsors.

"Why might a company with negative working capital be a good LBO candidate?"
Because growth generates cash rather than consuming it. As revenue grows, customer prepayments and payables grow faster than receivables and inventory. This working capital release adds to free cash flow, supporting higher leverage and faster debt paydown.

## Video Placeholder

**Video Title**: Net Working Capital in LBO Analysis

**Outline**:
- Net working capital definition and components
- Why working capital matters: transaction adjustments and free cash flow
- Modeling approaches: days-based vs. percentage-based
- The cash conversion cycle and how to improve it
- Working capital build vs. release: impact on cash
- Transaction mechanics: target NWC, closing adjustments
- Seasonality considerations and revolver utilization
- Negative working capital businesses and why they are attractive
- Interview questions on working capital

**Suggested Length**: 15 minutes

## Key Takeaways

- Net Working Capital = Current Operating Assets - Current Operating Liabilities (excluding cash and debt)
- Changes in working capital directly impact free cash flow: increases consume cash, decreases release cash
- Model working capital using days (DSO, DIO, DPO) or percentage of revenue approaches based on data availability
- The cash conversion cycle (DSO + DIO - DPO) measures days of cash tied up in operations—lower is better
- Purchase agreements include NWC adjustments: buyer pays more if closing NWC exceeds target, pays less if below
- Businesses with negative working capital generate cash as they grow, making them particularly attractive LBO candidates
